import { Wallet } from "@ijstech/eth-wallet"
import { Contracts } from '@scom/oswap-openswap-contract';

//call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
export const nullAddress = "0x0000000000000000000000000000000000000000";

export async function doCreatePair(wallet: Wallet, restrictedFactory: string, tokenA: string, tokenB: string) {
    const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, restrictedFactory);
    const receipt = await factoryContract.createPair({ tokenA, tokenB });
    return receipt;
}

export async function isGroupQueueOracleSupported(wallet:Wallet, restrictedFactory: string, tokenA: string, tokenB: string) {
    let oracleAddress = await new Contracts.OSWAP_RestrictedFactory(wallet,restrictedFactory).oracles({ param1: tokenA, param2: tokenB });
    return oracleAddress != nullAddress;
}