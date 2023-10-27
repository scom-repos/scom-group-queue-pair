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
    fromToken: string
    toToken: string
}