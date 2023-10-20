import {
    application,
    Button,
    Control,
    ControlElement,
    customElements,
    Label,
    Modal,
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
    private mdAlert: Modal;
    private lblTitle: Label;
    private lblContent: Label;
    private mdWallet: ScomWalletModal;
    private _state: State;
    private tokenRequirements: any;
    private executionProperties: any;
    private walletEvents: IEventBusRegistry[] = [];
    private _pairs: Pair[];
    private minThreshold: number = 0;
    private isPairReady: boolean = false;

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
    private async resetRpcWallet() {
        await this.state.initRpcWallet(this.chainId);
    }
    async setData(value: any) {
        this.executionProperties = value.executionProperties;
        this.tokenRequirements = value.tokenRequirements;
        this.btnStart.enabled = false;
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
        this.isPairReady = true;
        const paramValueObj = await getVotingValue(this.state, 'vote');
        this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
        this.btnStart.enabled = this.isPairReady && !!(this.fromTokenInput?.token && this.toTokenInput?.token);
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
        this.btnStart.enabled = this.isPairReady && !!(this.fromTokenInput?.token && this.toTokenInput?.token);
    }
    private closeModal() {
        this.mdAlert.visible = false;
    }
    private alert(value: { title?: string, content?: string, onClose?: any }) {
        const { title, content, onClose } = value;
        this.lblTitle.caption = title || "";
        this.lblTitle.visible = !!title;
        this.lblContent.caption = content || "";
        this.lblContent.visible = !!content;
        this.mdAlert.onClose = onClose;
        this.mdAlert.visible = true;
    }
    private updateStepStatus() {
        if (this.state.handleUpdateStepStatus) {
            this.state.handleUpdateStepStatus({
                caption: "Completed",
                color: Theme.colors.success.main
            });
        }
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
                this.alert({
                    content: "This pair is already created in the Group Queues.",
                    onClose: () => {
                        this.updateStepStatus();
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
                })
            }
        } else {
            this.btnStart.rightIcon.spin = true;
            this.btnStart.rightIcon.visible = true;
            const isSupported = await isGroupQueueOracleSupported(this.state, fromPairToken, toPairToken);
            if (isSupported) {
                this.updateStepStatus();
                if (this.state.handleNextFlowStep) {
                    this.state.handleNextFlowStep({
                        tokenRequirements: this.tokenRequirements,
                        executionProperties: this.executionProperties
                    });
                }
            } else {
                if (this.state.handleJumpToStep) {
                    const votingBalance = (await stakeOf(this.state, this.rpcWallet.account.address)).toNumber();
                    if (votingBalance < this.minThreshold) {
                        let value = (this.minThreshold - votingBalance).toString();
                        this.alert({
                            title: "Insufficient Voting Balance",
                            onClose: () => {
                                this.updateStepStatus();
                                this.state.handleJumpToStep({
                                    widgetName: 'scom-governance-staking',
                                    executionProperties: {
                                        tokenInputValue: value,
                                        action: "add",
                                        fromToken: fromToken,
                                        toToken: toToken,
                                        isFlow: true,
                                        prevStep: 'scom-group-queue-pair'
                                    }
                                });
                            }
                        })
                    } else {
                        this.alert({
                            content: "Pair is not registered in the Oracle, please create pair executive proposal.",
                            onClose: () => {
                                this.updateStepStatus();
                                this.state.handleJumpToStep({
                                    widgetName: 'scom-governance-proposal',
                                    executionProperties: {
                                        fromToken: fromToken,
                                        toToken: toToken,
                                        isFlow: true
                                    }
                                })
                            }
                        })
                    }
                }
            }
            this.btnStart.rightIcon.spin = false;
            this.btnStart.rightIcon.visible = false;
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
                <i-modal id="mdAlert" maxWidth="400px">
                    <i-panel
                        width="100%"
                        padding={{ top: "1.5rem", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}
                    >
                        <i-vstack horizontalAlignment="center" gap="1.75rem">
                            <i-icon
                                width={55}
                                height={55}
                                name="exclamation"
                                fill={Theme.colors.warning.main}
                                padding={{ top: "0.6rem", bottom: "0.6rem", left: "0.6rem", right: "0.6rem" }}
                                border={{ width: 2, style: 'solid', color: Theme.colors.warning.main, radius: '50%' }}
                            ></i-icon>
                            <i-vstack class="text-center" horizontalAlignment="center" gap="0.75rem" lineHeight={1.5}>
                                <i-label id="lblTitle" font={{ size: '1.25rem', bold: true }} visible={false}></i-label>
                                <i-label id="lblContent" overflowWrap='anywhere' visible={false}></i-label>
                            </i-vstack>
                            <i-hstack verticalAlignment='center' gap="0.5rem">
                                <i-button
                                    padding={{ top: "0.5rem", bottom: "0.5rem", left: "2rem", right: "2rem" }}
                                    caption="Ok"
                                    font={{ color: Theme.colors.secondary.contrastText }}
                                    background={{ color: Theme.colors.secondary.main }}
                                    onClick={this.closeModal.bind(this)}
                                ></i-button>
                            </i-hstack>
                        </i-vstack>
                    </i-panel>
                </i-modal>
                <i-scom-wallet-modal id="mdWallet" wallets={[]} />
            </i-vstack>
        )
    }
    async handleFlowStage(target: Control, stage: string, options: any) {
        let widget: ScomGroupQueuePairFlowInitialSetup = this;
        if (!options.isWidgetConnected) {
            let properties = options.properties;
            let tokenRequirements = options.tokenRequirements;
            this.state.handleNextFlowStep = options.onNextStep;
            this.state.handleAddTransactions = options.onAddTransactions;
            this.state.handleJumpToStep = options.onJumpToStep;
            this.state.handleUpdateStepStatus = options.onUpdateStepStatus;
            await this.setData({ 
                executionProperties: properties, 
                tokenRequirements
            });
        }
        return { widget }
    }
}