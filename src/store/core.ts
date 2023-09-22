export interface CoreAddress {
    WrappedNativeToken: string
    OSWAP_RestrictedFactory: string
}
export const coreAddress: { [chainId: number]: CoreAddress } = {
    56: { // BSC
        WrappedNativeToken: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
    },
    97: { // BSC Testnet
        WrappedNativeToken: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
    },
    137: { // Polygon
        WrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
    },
    80001: {// Polygon testnet
        WrappedNativeToken: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
    },
    43113: {//Avalanche FUJI C-Chain                      
        WrappedNativeToken: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
    },
    43114: { //Avalanche Mainnet C-Chain
        WrappedNativeToken: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
    },
    42161: { // Arbitrum Mainnet
        WrappedNativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        OSWAP_RestrictedFactory: "0x408aAf94BD851eb991dA146dFc7C290aA42BA70f",
    },
    421613: { //Arbitrum Goerli Testnet
        WrappedNativeToken: "0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f",
        OSWAP_RestrictedFactory: "0x6f641f4F5948954F7cd675f3D874Ac60b193bA0d",
    }
}