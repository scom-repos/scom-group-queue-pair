export interface CoreAddress {
    WrappedNativeToken: string;
    OAXDEX_Governance: string;
    GOV_TOKEN: string;
    OSWAP_RestrictedFactory: string;
}
export const coreAddress: { [chainId: number]: CoreAddress } = {
    56: { // BSC
        WrappedNativeToken: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        OAXDEX_Governance: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
        GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
        OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
    },
    97: { // BSC Testnet
        WrappedNativeToken: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        OAXDEX_Governance: "0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
        GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
        OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
    },
    137: { // Polygon
        WrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
        GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
        OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
    },
    80001: {// Polygon testnet
        WrappedNativeToken: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        OAXDEX_Governance: "0x198b150E554F46aee505a7fb574F5D7895889772",
        GOV_TOKEN: "0xb0AF504638BDe5e53D6EaE1119dEd13411c35cF2",
        OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
    },
    43113: {//Avalanche FUJI C-Chain                      
        WrappedNativeToken: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        OAXDEX_Governance: "0xC025b30e6D4cBe4B6978a1A71a86e6eCB9F87F92",
        GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
        OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
    },
    43114: { //Avalanche Mainnet C-Chain
        WrappedNativeToken: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        OAXDEX_Governance: "0x845308010c3b699150cdd54dcf0e7c4b8653e6b2",
        GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
        OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
    },
    42161: { // Arbitrum Mainnet
        WrappedNativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
        GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
        OSWAP_RestrictedFactory: "0x408aAf94BD851eb991dA146dFc7C290aA42BA70f",
    },
    421613: { //Arbitrum Goerli Testnet
        WrappedNativeToken: "0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f",
        OAXDEX_Governance: "0x6f460B0Bf633E22503Efa460429B0Ab32d655B9D",
        GOV_TOKEN: "0x5580B68478e714C02850251353Cc58B85D4033C3",
        OSWAP_RestrictedFactory: "0x6f641f4F5948954F7cd675f3D874Ac60b193bA0d",
    }
}