import { BigNumber, TransactionReceipt, Utils, Wallet } from "@ijstech/eth-wallet"
import { Contracts } from '@scom/oswap-openswap-contract';
import { ChainNativeTokenByChainId } from "@scom/scom-token-list";
import { Pair } from "./interface";
import { getWETH, State } from "./store/index";

//call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
export const nullAddress = "0x0000000000000000000000000000000000000000";

export async function doCreatePair(state: State, tokenA: string, tokenB: string): Promise<{
    receipt: TransactionReceipt | null;
    error: Record<string, string> | null;
}> {
    let receipt: TransactionReceipt | null = null;
    const wallet: any = Wallet.getClientInstance();
    try {
        let token0: string
        let token1: string
        if (new BigNumber(tokenA.toLowerCase()).lt(tokenB.toLowerCase())) {
            token0 = tokenA;
            token1 = tokenB;
        } else {
            token0 = tokenB;
            token1 = tokenA;
        }
        let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;
        const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
        receipt = await factoryContract.createPair({ tokenA: token0, tokenB: token1 });
    } catch (error) {
        return { receipt: null, error: error as any };
    }
    return { receipt, error: null };
}

export async function isGroupQueueOracleSupported(state: State, tokenA: string, tokenB: string) {
    const wallet = state.getRpcWallet();
    let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;
    let oracleAddress = await new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress).oracles({ param1: tokenA, param2: tokenB });
    return oracleAddress != nullAddress;
}

export async function getGroupQueuePairs(state: State) {
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    const nativeToken = ChainNativeTokenByChainId[chainId];
    const WETH9Address = state.getAddresses().WrappedNativeToken;
    let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;

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

export async function getVotingValue(state: State, param1: any) {
    let result: {
        minExeDelay?: number;
        minVoteDuration?: number;
        maxVoteDuration?: number;
        minOaxTokenToCreateVote?: number;
        minQuorum?: number;
    } = {};
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    const address = state.getAddresses(chainId)?.OAXDEX_Governance;
    if (address) {
        const govContract = new Contracts.OAXDEX_Governance(wallet, address);
        const params = await govContract.getVotingParams(Utils.stringToBytes32(param1) as string);
        result = {
            minExeDelay: params.minExeDelay.toNumber(),
            minVoteDuration: params.minVoteDuration.toNumber(),
            maxVoteDuration: params.maxVoteDuration.toNumber(),
            minOaxTokenToCreateVote: Number(Utils.fromDecimals(params.minOaxTokenToCreateVote).toFixed()),
            minQuorum: Number(Utils.fromDecimals(params.minQuorum).toFixed())
        };
    }
    return result;
}

export async function stakeOf(state: State, address: string) {
    let result = new BigNumber(0);
    try {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const gov = state.getAddresses(chainId).OAXDEX_Governance;
        const govContract = new Contracts.OAXDEX_Governance(wallet, gov);
        let stakeOf = await govContract.stakeOf(address);
        result = Utils.fromDecimals(stakeOf, state.getGovToken(chainId).decimals || 18);
    } catch (err) {}
    return result;
}