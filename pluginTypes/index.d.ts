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
    export interface IGroupQueuePair {
        chainId: number;
        tokenFrom: string;
        tokenTo: string;
    }
}
/// <amd-module name="@scom/scom-group-queue-pair/formSchema.ts" />
declare module "@scom/scom-group-queue-pair/formSchema.ts" {
    import ScomNetworkPicker from '@scom/scom-network-picker';
    import ScomTokenInput from "@scom/scom-token-input";
    const _default_1: {
        dataSchema: {
            type: string;
            properties: {
                chainId: {
                    type: string;
                    required: boolean;
                };
                tokenFrom: {
                    type: string;
                };
                tokenTo: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: {
                type: string;
                scope: string;
            }[];
        };
        customControls(rpcWalletId: string): {
            '#/properties/chainId': {
                render: () => ScomNetworkPicker;
                getData: (control: ScomNetworkPicker) => number;
                setData: (control: ScomNetworkPicker, value: number) => void;
            };
            '#/properties/tokenFrom': {
                render: () => ScomTokenInput;
                getData: (control: ScomTokenInput) => string;
                setData: (control: ScomTokenInput, value: string) => void;
            };
            '#/properties/tokenTo': {
                render: () => ScomTokenInput;
                getData: (control: ScomTokenInput) => string;
                setData: (control: ScomTokenInput, value: string) => void;
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
}
/// <amd-module name="@scom/scom-group-queue-pair/store/index.ts" />
declare module "@scom/scom-group-queue-pair/store/index.ts" {
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
/// <amd-module name="@scom/scom-group-queue-pair" />
declare module "@scom/scom-group-queue-pair" {
    import { ControlElement, Module } from '@ijstech/components';
    interface ScomGroupQueuePairElement extends ControlElement {
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
        private emptyStack;
        private infoStack;
        private state;
        private _data;
        tag: any;
        private get chainId();
        private get rpcWallet();
        init(): Promise<void>;
        private _getActions;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: any;
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
        }[];
        private getData;
        private setData;
        getTag(): Promise<any>;
        private updateTag;
        private setTag;
        render(): any;
    }
}
