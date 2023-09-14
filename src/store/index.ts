import { ChainNativeTokenByChainId, tokenStore, assets } from '@scom/scom-token-list';

const getToken = (chainId: number, address: string) => {
    const tokenMap = tokenStore.tokenMap;
    const tokenObject = address ? tokenMap[address.toLowerCase()] : ChainNativeTokenByChainId[chainId];
    return tokenObject;
}

export const getTokenIcon = (chainId: number, address: string) => {
    if (address == null) return '';
    const tokenObject = getToken(chainId, address);
    const path = assets.tokenPath(tokenObject, chainId);
    return path;
}

export const getTokenSymbol = (chainId: number, address: string) => {
    if (address == null) return '';
    const tokenObject = getToken(chainId, address);
    return tokenObject.symbol;
}

export * from './utils';