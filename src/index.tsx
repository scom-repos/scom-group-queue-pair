import { Button, ControlElement, customElements, Label, Module, Panel, Styles, VStack } from '@ijstech/components';
import ScomDappContainer from '@scom/scom-dapp-container';
import Assets from './assets';
import { IGroupQueuePair, Pair } from './interface';
import formSchema from './formSchema';
import { getWETH, isClientWalletConnected, State } from './store/index';
import configData from './data.json';
import { INetworkConfig } from '@scom/scom-network-picker';
import ScomWalletModal, { IWalletPlugin } from '@scom/scom-wallet-modal';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import ScomTokenInput from '@scom/scom-token-input';
import { Constants, Wallet } from '@ijstech/eth-wallet';
import { ITokenObject, tokenStore } from '@scom/scom-token-list';
import { primaryButtonStyle, tokenInputStyle } from './index.css';
import { getGroupQueuePairs, isGroupQueueOracleSupported } from './api';

const Theme = Styles.Theme.ThemeVars;

interface ScomGroupQueuePairElement extends ControlElement {
    lazyLoad?: boolean;
    networks: INetworkConfig[];
    wallets: IWalletPlugin[];
    defaultChainId?: number;
    showHeader?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-group-queue-pair']: ScomGroupQueuePairElement;
        }
    }
}

@customElements('i-scom-group-queue-pair')
export default class ScomGroupQueuePair extends Module {
    private dappContainer: ScomDappContainer;
    private loadingElm: Panel;
    private fromTokenInput: ScomTokenInput;
    private toTokenInput: ScomTokenInput;
    private pnlInfo: VStack;
    private msgCreatePair: Label;
    private linkGov: Label;
    private btnCreate: Button;
    private txStatusModal: ScomTxStatusModal;
    private mdWallet: ScomWalletModal;
    private state: State;
    private _data: IGroupQueuePair = {
        wallets: [],
        networks: []
    };
    private _pairs: Pair[] = [];
    tag: any = {};

    private get chainId() {
        return this.state.getChainId();
    }

    get defaultChainId() {
        return this._data.defaultChainId;
    }

    set defaultChainId(value: number) {
        this._data.defaultChainId = value;
    }

    get wallets() {
        return this._data.wallets ?? [];
    }
    set wallets(value: IWalletPlugin[]) {
        this._data.wallets = value;
    }

    get networks() {
        return this._data.networks ?? [];
    }
    set networks(value: INetworkConfig[]) {
        this._data.networks = value;
    }

    get showHeader() {
        return this._data.showHeader ?? true;
    }
    set showHeader(value: boolean) {
        this._data.showHeader = value;
    }

    get pairs() {
        return this._pairs;
    }

    set pairs(value: Pair[]) {
        this._pairs = value;
    }

    removeRpcWalletEvents() {
        const rpcWallet = this.state.getRpcWallet();
        if (rpcWallet) rpcWallet.unregisterAllWalletEvents();
    }

    async init() {
        this.isReadyCallbackQueued = true;
        super.init();
        this.state = new State(configData);
        const lazyLoad = this.getAttribute('lazyLoad', true, false);
        if (!lazyLoad) {
            const networks = this.getAttribute('networks', true);
            const wallets = this.getAttribute('wallets', true);
            const defaultChainId = this.getAttribute('defaultChainId', true);
            const showHeader = this.getAttribute('showHeader', true);
            const data: IGroupQueuePair = {
                networks,
                wallets,
                defaultChainId,
                showHeader
            }
            await this.setData(data);
        }
        this.loadingElm.visible = false;
        this.isReadyCallbackQueued = false;
        this.executeReadyCallback();
    }

    private _getActions(category?: string) {
        const actions: any[] = [];
        if (category && category !== 'offers') {
            actions.push({
                name: 'Edit',
                icon: 'edit',
                command: (builder: any, userInputData: any) => {
                },
                userInputDataSchema: formSchema.dataSchema,
                userInputUISchema: formSchema.uiSchema,
                customControls: formSchema.customControls()
            })
        }
    }

    private getProjectOwnerActions() {
        const actions: any[] = [
            {
                name: 'Settings',
                userInputDataSchema: formSchema.dataSchema,
                userInputUISchema: formSchema.uiSchema,
                customControls: formSchema.customControls()
            }
        ];
        return actions;
    }

    getConfigurators() {
        return [
            {
                name: 'Project Owner Configurator',
                target: 'Project Owners',
                getProxySelectors: async (chainId: number) => {
                    return [];
                },
                getActions: () => {
                    return this.getProjectOwnerActions();
                },
                getData: this.getData.bind(this),
                setData: async (data: any) => {
                    await this.setData(data);
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            },
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: this._getActions.bind(this),
                getData: this.getData.bind(this),
                setData: async (data: any) => {
                    await this.setData(data);
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ]
    }

    private getData() {
        return this._data;
    }

    private async setData(data: IGroupQueuePair) {
        this._data = data;
        this.resetRpcWallet();
        await this.refreshUI();
    }

    async getTag() {
        return this.tag;
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private setTag(value: any) {
        const newValue = value || {};
        for (let prop in newValue) {
            if (newValue.hasOwnProperty(prop)) {
                if (prop === 'light' || prop === 'dark')
                    this.updateTag(prop, newValue[prop]);
                else
                    this.tag[prop] = newValue[prop];
            }
        }
        if (this.dappContainer)
            this.dappContainer.setTag(this.tag);
    }

    private resetRpcWallet() {
        this.removeRpcWalletEvents();
        const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
        const rpcWallet = this.state.getRpcWallet();
        const chainChangedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.ChainChanged, async (chainId: number) => {
            this.refreshUI();
        });
        const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
            this.refreshUI();
        });
        if (rpcWallet.instanceId) {
            if (this.fromTokenInput) this.fromTokenInput.rpcWalletId = rpcWallet.instanceId;
            if (this.toTokenInput) this.toTokenInput.rpcWalletId = rpcWallet.instanceId;
        }
        const data: any = {
            defaultChainId: this.defaultChainId,
            wallets: this.wallets,
            networks: this.networks,
            showHeader: this.showHeader,
            rpcWalletId: rpcWallet.instanceId
        };
        if (this.dappContainer?.setData) this.dappContainer.setData(data);
    }

    private async refreshUI() {
        await this.initializeWidgetConfig();
    }

    private initWallet = async () => {
        try {
            await Wallet.getClientInstance().init();
            const rpcWallet = this.state.getRpcWallet();
            await rpcWallet.init();
        } catch (err) {
            console.log(err);
        }
    }

    private initializeWidgetConfig = async () => {
        setTimeout(async () => {
            const chainId = this.chainId;
            await this.initWallet();
            if (!isClientWalletConnected()) {
                this.btnCreate.caption = "Connect Wallet";
            } else if (!this.state.isRpcWalletConnected()) {
                this.btnCreate.caption = "Switch Network";
            } else {
                this.btnCreate.caption = "Create";
            }
            if (this.state.isRpcWalletConnected()) {
                this.pairs = await getGroupQueuePairs(this.state);
            }
            const tokens = tokenStore.getTokenList(chainId);
            this.fromTokenInput.tokenDataListProp = tokens;
            this.toTokenInput.tokenDataListProp = tokens;
            if (this.fromTokenInput.chainId !== chainId) {
                this.fromTokenInput.chainId = chainId;
                this.fromTokenInput.token = null;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
            }
            if (this.toTokenInput.chainId !== chainId) {
                this.toTokenInput.chainId = chainId;
                this.toTokenInput.token = null;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
            }
        })
    }

    private async onSelectToken(isFrom: boolean) {
        this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
        this.btnCreate.enabled = false;
        if (!this.fromTokenInput.token || !this.toTokenInput.token) return;
        if (this.fromTokenInput.token === this.toTokenInput.token) {
            if (isFrom) {
                this.toTokenInput.token = null;
            } else {
                this.fromTokenInput.token = null;
            }
            return;
        }
        const fromToken = (this.fromTokenInput.token.address || this.fromTokenInput.token.symbol).toLowerCase();
        const toToken = (this.toTokenInput.token.address || this.toTokenInput.token.symbol).toLowerCase();
        const isPairExisted = this.pairs.some(pair => pair.fromToken.toLowerCase() === fromToken && pair.toToken.toLowerCase() === toToken);
        if (isPairExisted) {
            this.pnlInfo.visible = true;
            this.msgCreatePair.visible = true;
            this.linkGov.visible = false;
            this.msgCreatePair.caption = 'This pair is already created in the Group Queues.';
        } else {
            this.fromTokenInput.tokenReadOnly = true;
            this.toTokenInput.tokenReadOnly = true;
            const WETH9 = getWETH(this.chainId);
            const fromPairToken = this.fromTokenInput.token.address ? this.fromTokenInput.token.address : WETH9.address || this.fromTokenInput.token.address;
            const toPairToken = this.toTokenInput.token.address ? this.toTokenInput.token.address : WETH9.address || this.toTokenInput.token.address;
            const isSupported = await isGroupQueueOracleSupported(this.state, fromPairToken, toPairToken);
            this.btnCreate.enabled = isSupported;
            this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = !isSupported;
            if (!isSupported) {
                this.msgCreatePair.caption = 'Pair is not registered in the Oracle, please register the pair in the oracle.';
            }
            this.fromTokenInput.tokenReadOnly = false;
            this.toTokenInput.tokenReadOnly = false;
        }
    }

    render() {
        return (
            <i-scom-dapp-container id="dappContainer">
                <i-panel background={{ color: Theme.background.main }}>
                    <i-panel>
                        <i-vstack id="loadingElm" class="i-loading-overlay">
                            <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
                                <i-icon
                                    class="i-loading-spinner_icon"
                                    image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
                                />
                                <i-label
                                    caption="Loading..." font={{ color: '#FD4A4C', size: '1.5em' }}
                                    class="i-loading-spinner_text"
                                />
                            </i-vstack>
                        </i-vstack>
                        <i-vstack width="100%" height="100%" padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }} gap="1.5rem">
                            <i-label caption="Create a new Pair" font={{ size: '1.25rem', weight: 700, color: Theme.colors.primary.main }}></i-label>
                            <i-hstack horizontalAlignment="center" verticalAlignment="center" wrap='wrap' gap={10}>
                                <i-scom-token-input
                                    id="fromTokenInput"
                                    type="combobox"
                                    class={tokenInputStyle}
                                    isBalanceShown={false}
                                    isBtnMaxShown={false}
                                    isInputShown={false}
                                    border={{ radius: 12 }}
                                    onSelectToken={() => this.onSelectToken(true)}
                                ></i-scom-token-input>
                                <i-label caption="to" font={{ size: "1rem" }}></i-label>
                                <i-scom-token-input
                                    id="toTokenInput"
                                    type="combobox"
                                    class={tokenInputStyle}
                                    isBalanceShown={false}
                                    isBtnMaxShown={false}
                                    isInputShown={false}
                                    border={{ radius: 12 }}
                                    onSelectToken={() => this.onSelectToken(false)}
                                ></i-scom-token-input>
                            </i-hstack>
                            <i-vstack id="pnlInfo" padding={{ left: "3rem", right: "3rem" }} gap="0.5rem" visible={false}>
                                <i-label id="msgCreatePair" class="text-center" visible={false} />
                                <i-label
                                    id="linkGov"
                                    class="text-center"
                                    caption=" Go to Governance"
                                    visible={false}
                                    link={{ href: 'https://www.openswap.xyz/#/governance', target: '_blank' }}
                                ></i-label>
                            </i-vstack>
                            <i-hstack horizontalAlignment="center" verticalAlignment="center" margin={{ top: "0.5rem" }}>
                                <i-button id="btnCreate" class={primaryButtonStyle} width={150} caption="Create" enabled={false}></i-button>
                            </i-hstack>
                        </i-vstack>
                    </i-panel>
                    <i-scom-tx-status-modal id="txStatusModal" />
                    <i-scom-wallet-modal id="mdWallet" wallets={[]} />
                </i-panel>
            </i-scom-dapp-container>
        )
    }
}