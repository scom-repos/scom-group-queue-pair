export interface IGroupQueuePair {
    chainId: number;
    tokenFrom: string;
    tokenTo: string;
    defaultChainId?: number;
    showHeader?: boolean;
}