/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
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
    }
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
                elements: {
                    type: string;
                    label: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                }[];
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
        OSWAP_RestrictedFactory: string;
    }
    export const coreAddress: {
        [chainId: number]: CoreAddress;
    };
}
/// <amd-module name="@scom/scom-group-queue-pair/store/utils.ts" />
declare module "@scom/scom-group-queue-pair/store/utils.ts" {
    import { INetwork } from "@ijstech/eth-wallet";
    export class State {
        infuraId: string;
        networkMap: {
            [key: number]: INetwork;
        };
        rpcWalletId: string;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
        private setNetworkList;
        getAddresses(chainId?: number): {};
    }
    export function isClientWalletConnected(): boolean;
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
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-group-queue-pair/index.css.ts" />
declare module "@scom/scom-group-queue-pair/index.css.ts" {
    export const tokenInputStyle: string;
    export const primaryButtonStyle: string;
}
/// <amd-module name="@scom/scom-group-queue-pair" />
declare module "@scom/scom-group-queue-pair" {
    import { ControlElement, Module } from '@ijstech/components';
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
        private btnCreate;
        private txStatusModal;
        private mdWallet;
        private state;
        private _data;
        tag: any;
        private get chainId();
        private get rpcWallet();
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        removeRpcWalletEvents(): void;
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
        render(): any;
    }
}
