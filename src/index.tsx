import { Button, ControlElement, customElements, Module, Panel, Styles, VStack } from '@ijstech/components';
import ScomDappContainer from '@scom/scom-dapp-container';
import Assets from './assets';
import { IGroupQueuePair } from './interface';
import formSchema from './formSchema';
import { isClientWalletConnected, State } from './store/index';
import configData from './data.json';
import { INetworkConfig } from '@scom/scom-network-picker';
import ScomWalletModal, { IWalletPlugin } from '@scom/scom-wallet-modal';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import ScomTokenInput from '@scom/scom-token-input';
import { Constants, Wallet } from '@ijstech/eth-wallet';
import { tokenStore } from '@scom/scom-token-list';
import { primaryButtonStyle, tokenInputStyle } from './index.css';

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
    private btnCreate: Button;
	private txStatusModal: ScomTxStatusModal;
	private mdWallet: ScomWalletModal;
    private state: State;
    private _data: IGroupQueuePair = {
		wallets: [],
		networks: []
    };
    tag: any = {};

    private get chainId() {
        return this.state.getChainId();
    }

    private get rpcWallet() {
        return this.state.getRpcWallet();
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
		});
		const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
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
            const tokens = tokenStore.getTokenList(chainId);
            this.fromTokenInput.tokenDataListProp = tokens;
            this.toTokenInput.tokenDataListProp = tokens;
            if (this.fromTokenInput.chainId !== chainId) {
                this.fromTokenInput.chainId = chainId;
            }
        })
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
                                ></i-scom-token-input>
                            </i-hstack>
                            <i-hstack horizontalAlignment="center" verticalAlignment="center" margin={{ top: "0.5rem" }}>
                                <i-button id="btnCreate" class={primaryButtonStyle} width={150} caption="Create"></i-button>
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