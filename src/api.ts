import { Wallet } from "@ijstech/eth-wallet"
import { Contracts } from '@scom/oswap-openswap-contract';

//call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
export async function doCreatePair(wallet: Wallet, restrictedFactoryAddress: string, tokenAAddress: string, tokenBAddress: string) {
    const factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, restrictedFactoryAddress);
    const receipt = await factoryContract.createPair({ tokenA: tokenAAddress, tokenB: tokenBAddress });
    return receipt;
}