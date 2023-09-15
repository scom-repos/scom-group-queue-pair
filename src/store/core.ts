export interface CoreAddress {
    OSWAP_RestrictedFactory: string
}
export const coreAddress: { [chainId: number]: { [contract: string]: string } } = {
    56: { // BSC
        WETH9: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
    },
    97: { // BSC Testnet
        WETH9: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
    },
    43113: {//Avalanche FUJI C-Chain                      
        WETH9: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
    },
}