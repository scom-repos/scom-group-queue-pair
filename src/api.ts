import { application, IPFS } from "@ijstech/components";
import { BigNumber, IMulticallContractCall, TransactionReceipt, Utils, Wallet } from "@ijstech/eth-wallet"
import { Contracts } from '@scom/oswap-openswap-contract';
import { ChainNativeTokenByChainId } from "@scom/scom-token-list";
import { Pair } from "./interface";
import { getWETH, State } from "./store/index";

//call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
export const nullAddress = "0x0000000000000000000000000000000000000000";

export async function doCreatePair(state: State, tokenA: string, tokenB: string): Promise<{
    receipt: TransactionReceipt | null;
    pairAddress: string | null;
    error: Record<string, string> | null;
}> {
    let receipt: TransactionReceipt | null = null;
    let pairAddress: string;
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
        let event = factoryContract.parsePairCreatedEvent(receipt)[0];
        pairAddress = event.pair;
    } catch (error) {
        return { receipt: null, pairAddress, error: error as any };
    }
    return { receipt, pairAddress, error: null };
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

    const addPair = (pairAddress: string, token0Address: string, token1Address: string) => {
        const token0 = token0Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token0Address.toLowerCase();
        const token1 = token1Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token1Address.toLowerCase();
        pairs.push({ address: pairAddress, fromToken: token0, toToken: token1 });
        pairs.push({ address: pairAddress, fromToken: token1, toToken: token0 });
    }

    const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
    let allPairsLength = (await factoryContract.allPairsLength()).toNumber();
    let factoryCalls: IMulticallContractCall[] = [];
    for (let i = 0; i < allPairsLength; i++) {
        factoryCalls.push({
            contract: factoryContract,
            methodName: 'allPairs',
            params: [i.toString()],
            to: factoryAddress
        });
    }
    let restrictedPairAddresses = await wallet.doMulticall(factoryCalls);
    let restrictedPairCalls: IMulticallContractCall[] = [];
    for (let i = 0; i < restrictedPairAddresses.length; i++) {
        let pairAddress = restrictedPairAddresses[i];
        let restrictedPair = new Contracts.OSWAP_RestrictedPair(wallet, pairAddress);
        restrictedPairCalls.push({
            contract: restrictedPair,
            methodName: 'token0',
            params: [],
            to: pairAddress
        });
        restrictedPairCalls.push({
            contract: restrictedPair,
            methodName: 'token1',
            params: [],
            to: pairAddress
        });
    }
    let restrictedPairCallResults = await wallet.doMulticall(restrictedPairCalls);
    for (let i = 0; i < restrictedPairAddresses.length; i++) {
        let pairAddress = restrictedPairAddresses[i];
        let token0Address = restrictedPairCallResults[i * 2];
        let token1Address = restrictedPairCallResults[i * 2 + 1];
        addPair(pairAddress, token0Address, token1Address);
    }

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

export async function stakeOf(state: State) {
    let result = new BigNumber(0);
    try {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const gov = state.getAddresses(chainId).OAXDEX_Governance;
        const govContract = new Contracts.OAXDEX_Governance(wallet, gov);
        let stakeOf = await govContract.stakeOf(wallet.account.address);
        result = Utils.fromDecimals(stakeOf, state.getGovToken(chainId).decimals || 18);
    } catch (err) { }
    return result;
}

export async function getFreezedStakeAmount(state: State) {
    let amount = new BigNumber(0);
    try {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const gov = state.getAddresses(chainId).OAXDEX_Governance;
        const govContract = new Contracts.OAXDEX_Governance(wallet, gov);
        let result = await govContract.freezedStake(wallet.account.address);
        amount = Utils.fromDecimals(result.amount, state.getGovToken(chainId).decimals || 18);
    } catch (err) { }
    return amount;
}

export async function isPairRegistered(state: State, pairAddress: string) {
    let isRegistered = false;
    try {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const registry = new Contracts.OSWAP_HybridRouterRegistry(wallet, state.getAddresses(chainId).OSWAP_HybridRouterRegistry);
        const { token0, token1 } = await registry.getPairTokens([pairAddress]);
        isRegistered = token0.length > 0 && token1.length > 0;
    } catch (err) {
        console.error(err);
    }
    return isRegistered;
}
export async function uploadImageToIPFS(file: any) {
    let dir = await IPFS.hashFiles([file]);
    let uploadUrl = await application.getUploadUrl(dir);
    if (file.cid?.cid && uploadUrl[file.cid.cid]) {
      let result = await application.upload(
        uploadUrl[file.cid.cid],
        file
      );
      if (uploadUrl[dir.cid]) {
        let result = await application.upload(uploadUrl[dir.cid], JSON.stringify(dir));
      };
    }
    return `/ipfs/${dir.cid}/${file.name}`;
  }