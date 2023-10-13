import {
    application,
    Button,
    Container,
    ControlElement,
    customElements,
    IEventBus,
    Label,
    Module,
    Styles
} from "@ijstech/components";
import { Constants, IEventBusRegistry, Wallet } from "@ijstech/eth-wallet";
import ScomTokenInput from "@scom/scom-token-input";
import { ITokenObject, tokenStore } from "@scom/scom-token-list";
import ScomWalletModal from "@scom/scom-wallet-modal";
import { isClientWalletConnected, State } from "../store/index";
import { Pair } from "../interface";
import { getGroupQueuePairs, getVotingValue, isGroupQueueOracleSupported, stakeOf } from "../api";

const Theme = Styles.Theme.ThemeVars;

interface ScomGroupQueuePairFlowInitialSetupElement extends ControlElement {
    data?: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-group-queue-pair-flow-initial-setup']: ScomGroupQueuePairFlowInitialSetupElement;
        }
    }
}

@customElements('i-scom-group-queue-pair-flow-initial-setup')
export default class ScomGroupQueuePairFlowInitialSetup extends Module {
    private lblConnectedStatus: Label;
    private btnConnectWallet: Button;
    private fromTokenInput: ScomTokenInput;
    private toTokenInput: ScomTokenInput;
    private btnStart: Button;
    private mdWallet: ScomWalletModal;
    private _state: State;
    private tokenRequirements: any;
    private executionProperties: any;
    private walletEvents: IEventBusRegistry[] = [];
    private _pairs: Pair[];
    private minThreshold: number = 0;
    private votingBalance: number = 0;

    get state(): State {
        return this._state;
    }
    set state(value: State) {
        this._state = value;
    }
    private get rpcWallet() {
        return this.state.getRpcWallet();
    }
    private get chainId() {
        return this.executionProperties.chainId || this.executionProperties.defaultChainId;
    }
    private get pairs() {
        return this._pairs;
    }
    private set pairs(value: Pair[]) {
        this._pairs = value;
    }
    private get hasEnoughStake() {
        return this.votingBalance >= this.minThreshold;
    }
    private async resetRpcWallet() {
        await this.state.initRpcWallet(this.chainId);
    }
    async setData(value: any) {
        this.executionProperties = value.executionProperties;
        this.tokenRequirements = value.tokenRequirements;
        this.btnStart.enabled = !!(this.fromTokenInput?.token && this.toTokenInput?.token);
        await this.resetRpcWallet();
        await this.initializeWidgetConfig();
    }
    private async initWallet() {
        try {
            const rpcWallet = this.rpcWallet;
            await rpcWallet.init();
        } catch (err) {
            console.log(err);
        }
    }
    private async initializeWidgetConfig() {
        const connected = isClientWalletConnected();
        this.updateConnectStatus(connected);
        await this.initWallet();
        this.fromTokenInput.chainId = this.chainId;
        this.toTokenInput.chainId = this.chainId;
        const tokens = tokenStore.getTokenList(this.chainId);
        this.fromTokenInput.tokenDataListProp = tokens;
        this.toTokenInput.tokenDataListProp = tokens;
        this.pairs = await getGroupQueuePairs(this.state);
        const paramValueObj = await getVotingValue(this.state, 'vote');
        this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
        this.votingBalance = (await stakeOf(this.state, this.rpcWallet.account.address)).toNumber();
    }
    async connectWallet() {
        if (!isClientWalletConnected()) {
            if (this.mdWallet) {
                await application.loadPackage('@scom/scom-wallet-modal', '*');
                this.mdWallet.networks = this.executionProperties.networks;
                this.mdWallet.wallets = this.executionProperties.wallets;
                this.mdWallet.showModal();
            }
        }
    }
    private updateConnectStatus(connected: boolean) {
        if (connected) {
            this.lblConnectedStatus.caption = 'Connected with ' + Wallet.getClientInstance().address;
            this.btnConnectWallet.visible = false;
        } else {
            this.lblConnectedStatus.caption = 'Please connect your wallet first';
            this.btnConnectWallet.visible = true;
        }
    }
    private registerEvents() {
        let clientWallet = Wallet.getClientInstance();
        this.walletEvents.push(clientWallet.registerWalletEvent(this, Constants.ClientWalletEvent.AccountsChanged, async (payload: Record<string, any>) => {
            const { account } = payload;
            let connected = !!account;
            this.updateConnectStatus(connected);
        }));
    }
    onHide() {
        let clientWallet = Wallet.getClientInstance();
        for (let event of this.walletEvents) {
            clientWallet.unregisterWalletEvent(event);
        }
        this.walletEvents = [];
    }
    init() {
        super.init();
        this.fromTokenInput.style.setProperty('--input-background', '#232B5A');
        this.fromTokenInput.style.setProperty('--input-font_color', '#fff');
        this.toTokenInput.style.setProperty('--input-background', '#232B5A');
        this.toTokenInput.style.setProperty('--input-font_color', '#fff');
        this.registerEvents();
    }
    private onSelectFromToken(token: ITokenObject) {
        this.handleSelectToken(true);
    }

    private onSelectToToken(token: ITokenObject) {
        this.handleSelectToken(false);
    }
    private handleSelectToken(isFrom: boolean) {
        let fromToken = (this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol)?.toLowerCase();
        let toToken = (this.toTokenInput.token?.address || this.toTokenInput.token?.symbol)?.toLowerCase();
        if (fromToken && toToken && fromToken === toToken) {
            if (isFrom) {
                this.toTokenInput.token = null;
            } else {
                this.fromTokenInput.token = null;
            }
        }
        this.btnStart.enabled = !!(this.fromTokenInput?.token && this.toTokenInput?.token);
    }
    private handleClickStart = async () => {
        if (!this.fromTokenInput.token || !this.toTokenInput.token) return;
        const fromToken = this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol;
        const toToken = this.toTokenInput.token?.address || this.toTokenInput.token?.symbol;
        const fromPairToken = fromToken?.toLowerCase();
        const toPairToken = toToken?.toLowerCase();
        const isPairExisted = this.pairs.some(pair => pair.fromToken.toLowerCase() === fromPairToken && pair.toToken.toLowerCase() === toPairToken);
        this.executionProperties.isFlow = true;
        this.executionProperties.fromToken = fromToken;
        this.executionProperties.toToken = toToken;
        if (isPairExisted) {
            if (this.state.handleJumpToStep) {
                this.state.handleJumpToStep({
                    widgetName: 'scom-liquidity-provider',
                    executionProperties: {
                        tokenIn: fromToken,
                        tokenOut: toToken,
                        isCreate: true,
                        isFlow: true
                    }
                })
            }
        } else {
            const isSupported = await isGroupQueueOracleSupported(this.state, fromPairToken, toPairToken);
            if (isSupported) {
                if (this.state.handleNextFlowStep)
                    this.state.handleNextFlowStep({
                        tokenRequirements: this.tokenRequirements,
                        executionProperties: this.executionProperties
                    });
            } else {
                if (this.state.handleJumpToStep) {
                    if (!this.hasEnoughStake) {
                        let value = (this.minThreshold - this.votingBalance).toString();
                        this.state.handleJumpToStep({
                            widgetName: 'scom-governance-staking',
                            executionProperties: {
                                tokenInputValue: value,
                                action: "add",
                                fromToken: fromToken,
                                toToken: toToken,
                                isFlow: true
                            }
                        })
                    } else {
                        this.state.handleJumpToStep({
                            widgetName: 'scom-governance-proposal',
                            executionProperties: {
                                fromToken: fromToken,
                                toToken: toToken,
                                isFlow: true
                            }
                        })
                    }
                }
            }
        }
    }
    render() {
        return (
            <i-vstack gap="1rem" padding={{ top: 10, bottom: 10, left: 20, right: 20 }}>
                <i-label caption="Get Ready to Create Pair"></i-label>

                <i-vstack gap='1rem'>
                    <i-label id="lblConnectedStatus"></i-label>
                    <i-hstack>
                        <i-button
                            id="btnConnectWallet"
                            caption='Connect Wallet'
                            font={{ color: Theme.colors.primary.contrastText }}
                            padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
                            onClick={this.connectWallet}
                        ></i-button>
                    </i-hstack>
                </i-vstack>
                <i-label caption="Select a Pair"></i-label>
                <i-hstack horizontalAlignment="center" verticalAlignment="center" wrap='wrap' gap={10}>
                    <i-scom-token-input
                        id="fromTokenInput"
                        type="combobox"
                        isBalanceShown={false}
                        isBtnMaxShown={false}
                        isInputShown={false}
                        border={{ radius: 12 }}
                        onSelectToken={this.onSelectFromToken.bind(this)}
                    ></i-scom-token-input>
                    <i-label caption="to" font={{ size: "1rem" }}></i-label>
                    <i-scom-token-input
                        id="toTokenInput"
                        type="combobox"
                        isBalanceShown={false}
                        isBtnMaxShown={false}
                        isInputShown={false}
                        border={{ radius: 12 }}
                        onSelectToken={this.onSelectToToken.bind(this)}
                    ></i-scom-token-input>
                </i-hstack>
                <i-hstack horizontalAlignment='center'>
                    <i-button
                        id="btnStart"
                        caption="Start"
                        padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
                        font={{ color: Theme.colors.primary.contrastText, size: '1.5rem' }}
                        onClick={this.handleClickStart}
                    ></i-button>
                </i-hstack>
                <i-scom-wallet-modal id="mdWallet" wallets={[]} />
            </i-vstack>
        )
    }
}