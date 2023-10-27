/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-group-queue-pair/assets.ts" />
declare module "@scom/scom-group-queue-pair/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-group-queue-pair/interface.ts" />
declare module "@scom/scom-group-queue-pair/interface.ts" {
    import { INetworkConfig } from "@scom/scom-network-picker";
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    export interface IGroupQueuePair {
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        defaultChainId?: number;
        showHeader?: boolean;
        fromToken?: string;
        toToken?: string;
        isFlow?: boolean;
    }
    export type Pair = {
        address: string;
        fromToken: string;
        toToken: string;
    };
}
/// <amd-module name="@scom/scom-group-queue-pair/formSchema.ts" />
declare module "@scom/scom-group-queue-pair/formSchema.ts" {
    import ScomNetworkPicker from '@scom/scom-network-picker';
    const _default_1: {
        dataSchema: {
            type: string;
            properties: {
                networks: {
                    type: string;
                    required: boolean;
                    items: {
                        type: string;
                        properties: {
                            chainId: {
                                type: string;
                                enum: number[];
                                required: boolean;
                            };
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: {
                type: string;
                scope: string;
                options: {
                    detail: {
                        type: string;
                    };
                };
            }[];
        };
        customControls(): {
            '#/properties/networks/properties/chainId': {
                render: () => ScomNetworkPicker;
                getData: (control: ScomNetworkPicker) => number;
                setData: (control: ScomNetworkPicker, value: number) => void;
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-group-queue-pair/store/core.ts" />
declare module "@scom/scom-group-queue-pair/store/core.ts" {
    export interface CoreAddress {
        WrappedNativeToken: string;
        OAXDEX_Governance: string;
        GOV_TOKEN: string;
        OSWAP_RestrictedFactory: string;
        OSWAP_HybridRouterRegistry: string;
    }
    export const coreAddress: {
        [chainId: number]: CoreAddress;
    };
}
/// <amd-module name="@scom/scom-group-queue-pair/store/utils.ts" />
declare module "@scom/scom-group-queue-pair/store/utils.ts" {
    import { INetwork } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export class State {
        infuraId: string;
        networkMap: {
            [key: number]: INetwork;
        };
        rpcWalletId: string;
        handleNextFlowStep: (data: any) => Promise<void>;
        handleAddTransactions: (data: any) => Promise<void>;
        handleJumpToStep: (data: any) => Promise<void>;
        handleUpdateStepStatus: (data: any) => Promise<void>;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
        private setNetworkList;
        getAddresses(chainId?: number): import("@scom/scom-group-queue-pair/store/core.ts").CoreAddress;
        getGovToken(chainId: number): ITokenObject;
    }
    export function isClientWalletConnected(): boolean;
    export const getWETH: (chainId: number) => ITokenObject;
}
/// <amd-module name="@scom/scom-group-queue-pair/store/index.ts" />
declare module "@scom/scom-group-queue-pair/store/index.ts" {
    export const getTokenIcon: (chainId: number, address: string) => string;
    export const getTokenSymbol: (chainId: number, address: string) => string;
    export * from "@scom/scom-group-queue-pair/store/utils.ts";
}
/// <amd-module name="@scom/scom-group-queue-pair/data.json.ts" />
declare module "@scom/scom-group-queue-pair/data.json.ts" {
    const _default_2: {
        infuraId: string;
        networks: {
            chainId: number;
            explorerTxUrl: string;
            explorerAddressUrl: string;
        }[];
        defaultBuilderData: {
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
            showHeader: boolean;
            showFooter: boolean;
        };
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-group-queue-pair/api.ts" />
declare module "@scom/scom-group-queue-pair/api.ts" {
    import { BigNumber, TransactionReceipt } from "@ijstech/eth-wallet";
    import { Pair } from "@scom/scom-group-queue-pair/interface.ts";
    import { State } from "@scom/scom-group-queue-pair/store/index.ts";
    export const nullAddress = "0x0000000000000000000000000000000000000000";
    export function doCreatePair(state: State, tokenA: string, tokenB: string): Promise<{
        receipt: TransactionReceipt | null;
        error: Record<string, string> | null;
    }>;
    export function isGroupQueueOracleSupported(state: State, tokenA: string, tokenB: string): Promise<boolean>;
    export function getGroupQueuePairs(state: State): Promise<Pair[]>;
    export function getVotingValue(state: State, param1: any): Promise<{
        minExeDelay?: number;
        minVoteDuration?: number;
        maxVoteDuration?: number;
        minOaxTokenToCreateVote?: number;
        minQuorum?: number;
    }>;
    export function stakeOf(state: State): Promise<BigNumber>;
    export function getFreezedStakeAmount(state: State): Promise<BigNumber>;
    export function isPairRegistered(state: State, pairAddress: string): Promise<boolean>;
}
/// <amd-module name="@scom/scom-group-queue-pair/flow/initialSetup.tsx" />
declare module "@scom/scom-group-queue-pair/flow/initialSetup.tsx" {
    import { Control, ControlElement, Module } from "@ijstech/components";
    import { State } from "@scom/scom-group-queue-pair/store/index.ts";
    interface ScomGroupQueuePairFlowInitialSetupElement extends ControlElement {
        data?: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-group-queue-pair-flow-initial-setup']: ScomGroupQueuePairFlowInitialSetupElement;
            }
        }
    }
    export default class ScomGroupQueuePairFlowInitialSetup extends Module {
        private lblConnectedStatus;
        private btnConnectWallet;
        private fromTokenInput;
        private toTokenInput;
        private btnStart;
        private mdWallet;
        private _state;
        private tokenRequirements;
        private executionProperties;
        private walletEvents;
        private _pairs;
        private minThreshold;
        private isPairReady;
        get state(): State;
        set state(value: State);
        private get rpcWallet();
        private get chainId();
        private get pairs();
        private set pairs(value);
        private resetRpcWallet;
        setData(value: any): Promise<void>;
        private initWallet;
        private initializeWidgetConfig;
        connectWallet(): Promise<void>;
        private updateConnectStatus;
        private registerEvents;
        onHide(): void;
        init(): void;
        private onSelectFromToken;
        private onSelectToToken;
        private handleSelectToken;
        private updateStepStatus;
        private handleClickStart;
        render(): any;
        handleFlowStage(target: Control, stage: string, options: any): Promise<{
            widget: ScomGroupQueuePairFlowInitialSetup;
        }>;
    }
}
/// <amd-module name="@scom/scom-group-queue-pair" />
declare module "@scom/scom-group-queue-pair" {
    import { Container, Control, ControlElement, Module } from '@ijstech/components';
    import { IGroupQueuePair, Pair } from "@scom/scom-group-queue-pair/interface.ts";
    import { INetworkConfig } from '@scom/scom-network-picker';
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomGroupQueuePairElement extends ControlElement {
        lazyLoad?: boolean;
        networks: INetworkConfig[];
        wallets: IWalletPlugin[];
        defaultChainId?: number;
        showHeader?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-group-queue-pair']: ScomGroupQueuePairElement;
            }
        }
    }
    export default class ScomGroupQueuePair extends Module {
        private dappContainer;
        private loadingElm;
        private fromTokenInput;
        private toTokenInput;
        private pnlInfo;
        private msgCreatePair;
        private linkGov;
        private btnCreate;
        private txStatusModal;
        private mdWallet;
        private state;
        private _data;
        private _pairs;
        private fromPairToken;
        private toPairToken;
        private isReadyToCreate;
        tag: any;
        private get chainId();
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        get pairs(): Pair[];
        set pairs(value: Pair[]);
        private get isFlow();
        constructor(parent?: Container, options?: ControlElement);
        removeRpcWalletEvents(): void;
        onHide(): void;
        isEmptyData(value: IGroupQueuePair): boolean;
        init(): Promise<void>;
        private _getActions;
        private getProjectOwnerActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getProxySelectors: (chainId: number) => Promise<any[]>;
            getActions: () => any[];
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getActions: any;
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
            getProxySelectors?: undefined;
        } | {
            name: string;
            target: string;
            getData: () => Promise<{
                wallets: IWalletPlugin[];
                networks: INetworkConfig[];
                defaultChainId?: number;
                showHeader?: boolean;
                fromToken?: string;
                toToken?: string;
                isFlow?: boolean;
            }>;
            setData: (properties: IGroupQueuePair, linkParams?: Record<string, any>) => Promise<void>;
            getTag: any;
            setTag: any;
            getProxySelectors?: undefined;
            getActions?: undefined;
        })[];
        private getData;
        private setData;
        getTag(): Promise<any>;
        private updateTag;
        private setTag;
        private resetRpcWallet;
        private refreshUI;
        private initWallet;
        private initializeWidgetConfig;
        private onSelectFromToken;
        private onSelectToToken;
        private selectToken;
        private showResultMessage;
        private connectWallet;
        private onCreatePair;
        render(): any;
        handleFlowStage(target: Control, stage: string, options: any): Promise<{
            widget: any;
        }>;
    }
}
