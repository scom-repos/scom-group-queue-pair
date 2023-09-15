import { Wallet } from "@ijstech/eth-wallet"
import { Contracts } from '@scom/oswap-openswap-contract';
import { ChainNativeTokenByChainId, ITokenObject } from "@scom/scom-token-list";
import { Pair } from "./interface";
import { getWETH, State } from "./store/index";

//call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
export const nullAddress = "0x0000000000000000000000000000000000000000";

const getAddressByKey = (state: State, key: string) => {
    let Address = state.getAddresses();
    return Address[key];
}

const mapTokenObjectSet = (state: State, obj: any) => {
    let chainId = state.getChainId();
    const WETH9 = getWETH(chainId);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key]?.address) obj[key] = WETH9;
        }
    }
    return obj;
}

export async function doCreatePair(wallet: Wallet, restrictedFactory: string, tokenA: string, tokenB: string) {
    const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, restrictedFactory);
    const receipt = await factoryContract.createPair({ tokenA, tokenB });
    return receipt;
}

export async function isGroupQueueOracleSupported(state: State, tokenA: string, tokenB: string) {
    const wallet = state.getRpcWallet();
    let factoryAddress = getAddressByKey(state, 'OSWAP_RestrictedFactory');
    let oracleAddress = await new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress).oracles({ param1: tokenA, param2: tokenB });
    return oracleAddress != nullAddress;
}

export async function getGroupQueuePairs(state: State) {
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    const nativeToken = ChainNativeTokenByChainId[chainId];
    const WETH9Address = getAddressByKey(state, 'WETH9');
    let factoryAddress = getAddressByKey(state, 'OSWAP_RestrictedFactory');

    let pairs: Pair[] = [];

    const addPair = (token0Address: string, token1Address: string) => {
        const token0 = token0Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token0Address.toLowerCase();
        const token1 = token1Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token1Address.toLowerCase();
        pairs.push({ fromToken: token0, toToken: token1 });
        pairs.push({ fromToken: token1, toToken: token0 });
    }

    const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
    let allPairsLength = (await factoryContract.allPairsLength()).toNumber();
    let tasks: Promise<void>[] = [];
    for (let i = 0; i < allPairsLength; i++) {
        tasks.push((async () => {
            let pairAddress = await factoryContract.allPairs(i);
            let groupPair = new Contracts.OSWAP_RestrictedPair(wallet, pairAddress);
            let token0Address = await groupPair.token0();
            let token1Address = await groupPair.token1();
            addPair(token0Address, token1Address);
        })());
    }
    await Promise.all(tasks);

    return pairs
}