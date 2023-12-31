var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-group-queue-pair/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_1.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-group-queue-pair/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-group-queue-pair/formSchema.ts", ["require", "exports", "@scom/scom-network-picker"], function (require, exports, scom_network_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chainIds = [1, 56, 137, 250, 97, 80001, 43113, 43114, 42161, 421613];
    const networks = chainIds.map(v => { return { chainId: v }; });
    exports.default = {
        dataSchema: {
            type: 'object',
            properties: {
                networks: {
                    type: 'array',
                    required: true,
                    items: {
                        type: 'object',
                        properties: {
                            chainId: {
                                type: 'number',
                                enum: chainIds,
                                required: true
                            }
                        }
                    }
                },
            }
        },
        uiSchema: {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/networks',
                    options: {
                        detail: {
                            type: 'VerticalLayout'
                        }
                    }
                }
            ]
        },
        customControls() {
            return {
                '#/properties/networks/properties/chainId': {
                    render: () => {
                        const networkPicker = new scom_network_picker_1.default(undefined, {
                            type: 'combobox',
                            networks
                        });
                        return networkPicker;
                    },
                    getData: (control) => {
                        return control.selectedNetwork?.chainId;
                    },
                    setData: (control, value) => {
                        control.setNetworkByChainId(value);
                    }
                }
            };
        }
    };
});
define("@scom/scom-group-queue-pair/store/core.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.coreAddress = void 0;
    exports.coreAddress = {
        56: {
            WrappedNativeToken: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            OAXDEX_Governance: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
            GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
            OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
            OSWAP_HybridRouterRegistry: "0xcc44c3617e46b2e946d61499ff8f4cda721ff178",
        },
        97: {
            WrappedNativeToken: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
            OAXDEX_Governance: "0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
            GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
            OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
            OSWAP_HybridRouterRegistry: "0x8e5Afed779B56888ca267284494f23aFe158EA0B",
        },
        137: {
            WrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
            OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
            OSWAP_HybridRouterRegistry: "0x728DbD968341eb7aD11bDabFE775A13aF901d6ac",
        },
        80001: {
            WrappedNativeToken: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            OAXDEX_Governance: "0x198b150E554F46aee505a7fb574F5D7895889772",
            GOV_TOKEN: "0xb0AF504638BDe5e53D6EaE1119dEd13411c35cF2",
            OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
            OSWAP_HybridRouterRegistry: "0x68C229a3772dFebD0fD51df36B7029fcF75424F7",
        },
        43113: {
            WrappedNativeToken: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
            OAXDEX_Governance: "0xC025b30e6D4cBe4B6978a1A71a86e6eCB9F87F92",
            GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
            OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
            OSWAP_HybridRouterRegistry: "0xCd370BBbC84AB66a9e0Ff9F533E11DeC87704736",
        },
        43114: {
            WrappedNativeToken: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            OAXDEX_Governance: "0x845308010c3b699150cdd54dcf0e7c4b8653e6b2",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
            OSWAP_HybridRouterRegistry: "0xEA6A56086e66622208fa8e7B743Bad3FF47aD40c",
        },
        42161: {
            WrappedNativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0x408aAf94BD851eb991dA146dFc7C290aA42BA70f",
            OSWAP_HybridRouterRegistry: "0xD5f2e1bb65d7AA483547D1eDF1B59edCa296F6D3",
        },
        421613: {
            WrappedNativeToken: "0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f",
            OAXDEX_Governance: "0x6f460B0Bf633E22503Efa460429B0Ab32d655B9D",
            GOV_TOKEN: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            OSWAP_RestrictedFactory: "0x6f641f4F5948954F7cd675f3D874Ac60b193bA0d",
            OSWAP_HybridRouterRegistry: "0x7422408d5211a512f18fd55c49d5483d24c9ed6a",
        }
    };
});
define("@scom/scom-group-queue-pair/store/utils.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-token-list", "@scom/scom-group-queue-pair/store/core.ts"], function (require, exports, components_2, eth_wallet_1, scom_network_list_1, scom_token_list_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWETH = exports.isClientWalletConnected = exports.State = void 0;
    class State {
        constructor(options) {
            this.infuraId = '';
            this.networkMap = {};
            this.rpcWalletId = '';
            this.networkMap = (0, scom_network_list_1.default)();
            this.initData(options);
        }
        initData(options) {
            if (options.infuraId) {
                this.infuraId = options.infuraId;
            }
            if (options.networks) {
                this.setNetworkList(options.networks, options.infuraId);
            }
        }
        initRpcWallet(defaultChainId) {
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(components_2.application.store?.networkMap || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: components_2.application.store?.infuraId,
                multicalls: components_2.application.store?.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_1.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            return instanceId;
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_1.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet?.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet?.chainId;
        }
        setNetworkList(networkList, infuraId) {
            const wallet = eth_wallet_1.Wallet.getClientInstance();
            this.networkMap = {};
            const defaultNetworkList = (0, scom_network_list_1.default)();
            const defaultNetworkMap = defaultNetworkList.reduce((acc, cur) => {
                acc[cur.chainId] = cur;
                return acc;
            }, {});
            for (let network of networkList) {
                const networkInfo = defaultNetworkMap[network.chainId];
                if (!networkInfo)
                    continue;
                if (infuraId && network.rpcUrls && network.rpcUrls.length > 0) {
                    for (let i = 0; i < network.rpcUrls.length; i++) {
                        network.rpcUrls[i] = network.rpcUrls[i].replace(/{InfuraId}/g, infuraId);
                    }
                }
                this.networkMap[network.chainId] = {
                    ...networkInfo,
                    ...network
                };
                wallet.setNetworkInfo(this.networkMap[network.chainId]);
            }
        }
        getAddresses(chainId) {
            return core_1.coreAddress[chainId || this.getChainId()];
        }
        getGovToken(chainId) {
            let govToken;
            let address = this.getAddresses(chainId).GOV_TOKEN;
            if (chainId == 43113 || chainId == 43114 || chainId == 42161 || chainId == 421613 || chainId == 80001 || chainId == 137) {
                govToken = { address: address, decimals: 18, symbol: "veOSWAP", name: 'Vote-escrowed OSWAP' };
            }
            else {
                govToken = { address: address, decimals: 18, symbol: "OSWAP", name: 'OpenSwap' };
            }
            return govToken;
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
    const getWETH = (chainId) => {
        let wrappedToken = scom_token_list_1.WETHByChainId[chainId];
        return wrappedToken;
    };
    exports.getWETH = getWETH;
});
define("@scom/scom-group-queue-pair/store/index.ts", ["require", "exports", "@scom/scom-token-list", "@scom/scom-group-queue-pair/store/utils.ts"], function (require, exports, scom_token_list_2, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTokenSymbol = exports.getTokenIcon = void 0;
    const getToken = (chainId, address) => {
        const tokenMap = scom_token_list_2.tokenStore.getTokenMapByChainId(chainId);
        const tokenObject = address ? tokenMap[address.toLowerCase()] : scom_token_list_2.ChainNativeTokenByChainId[chainId];
        return tokenObject;
    };
    const getTokenIcon = (chainId, address) => {
        if (address == null)
            return '';
        const tokenObject = getToken(chainId, address);
        const path = scom_token_list_2.assets.tokenPath(tokenObject, chainId);
        return path;
    };
    exports.getTokenIcon = getTokenIcon;
    const getTokenSymbol = (chainId, address) => {
        if (address == null)
            return '';
        const tokenObject = getToken(chainId, address);
        return tokenObject.symbol;
    };
    exports.getTokenSymbol = getTokenSymbol;
    __exportStar(utils_1, exports);
});
define("@scom/scom-group-queue-pair/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-group-queue-pair/data.json.ts'/> 
    exports.default = {
        "infuraId": "adc596bf88b648e2a8902bc9093930c5",
        "networks": [
            {
                "chainId": 97,
                "explorerTxUrl": "https://testnet.bscscan.com/tx/",
                "explorerAddressUrl": "https://testnet.bscscan.com/address/"
            },
            {
                "chainId": 43113,
                "explorerTxUrl": "https://testnet.snowtrace.io/tx/",
                "explorerAddressUrl": "https://testnet.snowtrace.io/address/"
            }
        ],
        "defaultBuilderData": {
            "defaultChainId": 43113,
            "networks": [
                {
                    "chainId": 43113
                },
                {
                    "chainId": 97
                }
            ],
            "wallets": [
                {
                    "name": "metamask"
                }
            ],
            "showHeader": true,
            "showFooter": true
        }
    };
});
define("@scom/scom-group-queue-pair/api.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/oswap-openswap-contract", "@scom/scom-token-list"], function (require, exports, components_3, eth_wallet_2, oswap_openswap_contract_1, scom_token_list_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uploadImageToIPFS = exports.isPairRegistered = exports.getFreezedStakeAmount = exports.stakeOf = exports.getVotingValue = exports.getGroupQueuePairs = exports.isGroupQueueOracleSupported = exports.doCreatePair = exports.nullAddress = void 0;
    //call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
    exports.nullAddress = "0x0000000000000000000000000000000000000000";
    async function doCreatePair(state, tokenA, tokenB) {
        let receipt = null;
        let pairAddress;
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        try {
            let token0;
            let token1;
            if (new eth_wallet_2.BigNumber(tokenA.toLowerCase()).lt(tokenB.toLowerCase())) {
                token0 = tokenA;
                token1 = tokenB;
            }
            else {
                token0 = tokenB;
                token1 = tokenA;
            }
            let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;
            const factoryContract = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
            receipt = await factoryContract.createPair({ tokenA: token0, tokenB: token1 });
            let event = factoryContract.parsePairCreatedEvent(receipt)[0];
            pairAddress = event.pair;
        }
        catch (error) {
            return { receipt: null, pairAddress, error: error };
        }
        return { receipt, pairAddress, error: null };
    }
    exports.doCreatePair = doCreatePair;
    async function isGroupQueueOracleSupported(state, tokenA, tokenB) {
        const wallet = state.getRpcWallet();
        let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;
        let oracleAddress = await new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress).oracles({ param1: tokenA, param2: tokenB });
        return oracleAddress != exports.nullAddress;
    }
    exports.isGroupQueueOracleSupported = isGroupQueueOracleSupported;
    async function getGroupQueuePairs(state) {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const nativeToken = scom_token_list_3.ChainNativeTokenByChainId[chainId];
        const WETH9Address = state.getAddresses().WrappedNativeToken;
        let factoryAddress = state.getAddresses().OSWAP_RestrictedFactory;
        let pairs = [];
        const addPair = (pairAddress, token0Address, token1Address) => {
            const token0 = token0Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token0Address.toLowerCase();
            const token1 = token1Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token1Address.toLowerCase();
            pairs.push({ address: pairAddress, fromToken: token0, toToken: token1 });
            pairs.push({ address: pairAddress, fromToken: token1, toToken: token0 });
        };
        const factoryContract = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
        let allPairsLength = (await factoryContract.allPairsLength()).toNumber();
        let factoryCalls = [];
        for (let i = 0; i < allPairsLength; i++) {
            factoryCalls.push({
                contract: factoryContract,
                methodName: 'allPairs',
                params: [i.toString()],
                to: factoryAddress
            });
        }
        let restrictedPairAddresses = await wallet.doMulticall(factoryCalls);
        let restrictedPairCalls = [];
        for (let i = 0; i < restrictedPairAddresses.length; i++) {
            let pairAddress = restrictedPairAddresses[i];
            let restrictedPair = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedPair(wallet, pairAddress);
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
        return pairs;
    }
    exports.getGroupQueuePairs = getGroupQueuePairs;
    async function getVotingValue(state, param1) {
        let result = {};
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const address = state.getAddresses(chainId)?.OAXDEX_Governance;
        if (address) {
            const govContract = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, address);
            const params = await govContract.getVotingParams(eth_wallet_2.Utils.stringToBytes32(param1));
            result = {
                minExeDelay: params.minExeDelay.toNumber(),
                minVoteDuration: params.minVoteDuration.toNumber(),
                maxVoteDuration: params.maxVoteDuration.toNumber(),
                minOaxTokenToCreateVote: Number(eth_wallet_2.Utils.fromDecimals(params.minOaxTokenToCreateVote).toFixed()),
                minQuorum: Number(eth_wallet_2.Utils.fromDecimals(params.minQuorum).toFixed())
            };
        }
        return result;
    }
    exports.getVotingValue = getVotingValue;
    async function stakeOf(state) {
        let result = new eth_wallet_2.BigNumber(0);
        try {
            const wallet = state.getRpcWallet();
            const chainId = state.getChainId();
            const gov = state.getAddresses(chainId).OAXDEX_Governance;
            const govContract = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, gov);
            let stakeOf = await govContract.stakeOf(wallet.account.address);
            result = eth_wallet_2.Utils.fromDecimals(stakeOf, state.getGovToken(chainId).decimals || 18);
        }
        catch (err) { }
        return result;
    }
    exports.stakeOf = stakeOf;
    async function getFreezedStakeAmount(state) {
        let amount = new eth_wallet_2.BigNumber(0);
        try {
            const wallet = state.getRpcWallet();
            const chainId = state.getChainId();
            const gov = state.getAddresses(chainId).OAXDEX_Governance;
            const govContract = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, gov);
            let result = await govContract.freezedStake(wallet.account.address);
            amount = eth_wallet_2.Utils.fromDecimals(result.amount, state.getGovToken(chainId).decimals || 18);
        }
        catch (err) { }
        return amount;
    }
    exports.getFreezedStakeAmount = getFreezedStakeAmount;
    async function isPairRegistered(state, pairAddress) {
        let isRegistered = false;
        try {
            const wallet = state.getRpcWallet();
            const chainId = state.getChainId();
            const registry = new oswap_openswap_contract_1.Contracts.OSWAP_HybridRouterRegistry(wallet, state.getAddresses(chainId).OSWAP_HybridRouterRegistry);
            const { token0, token1 } = await registry.getPairTokens([pairAddress]);
            isRegistered = token0.length > 0 && token1.length > 0;
        }
        catch (err) {
            console.error(err);
        }
        return isRegistered;
    }
    exports.isPairRegistered = isPairRegistered;
    async function uploadImageToIPFS(file) {
        let dir = await components_3.IPFS.hashFiles([file]);
        let uploadUrl = await components_3.application.getUploadUrl(dir);
        if (file.cid?.cid && uploadUrl[file.cid.cid]) {
            let result = await components_3.application.upload(uploadUrl[file.cid.cid], file);
            if (uploadUrl[dir.cid]) {
                let result = await components_3.application.upload(uploadUrl[dir.cid], JSON.stringify(dir));
            }
            ;
        }
        return `/ipfs/${dir.cid}/${file.name}`;
    }
    exports.uploadImageToIPFS = uploadImageToIPFS;
});
define("@scom/scom-group-queue-pair/flow/initialSetup.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-token-list", "@scom/scom-group-queue-pair/store/index.ts", "@scom/scom-group-queue-pair/api.ts"], function (require, exports, components_4, eth_wallet_3, scom_token_list_4, index_1, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomGroupQueuePairFlowInitialSetup = class ScomGroupQueuePairFlowInitialSetup extends components_4.Module {
        constructor() {
            super(...arguments);
            this.walletEvents = [];
            this.minThreshold = 0;
            this.isPairReady = false;
            this.customTokens = {};
        }
        get state() {
            return this._state;
        }
        set state(value) {
            this._state = value;
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        get chainId() {
            return this.executionProperties.chainId || this.executionProperties.defaultChainId;
        }
        get pairs() {
            return this._pairs;
        }
        set pairs(value) {
            this._pairs = value;
        }
        async resetRpcWallet() {
            await this.state.initRpcWallet(this.chainId);
        }
        async setData(value) {
            this.executionProperties = value.executionProperties;
            this.tokenRequirements = value.tokenRequirements;
            this.btnStart.enabled = false;
            this.customTokens = {};
            this.customTokens[this.chainId] = [];
            await this.resetRpcWallet();
            await this.initializeWidgetConfig();
        }
        async initWallet() {
            try {
                const rpcWallet = this.rpcWallet;
                await rpcWallet.init();
            }
            catch (err) {
                console.log(err);
            }
        }
        async initializeWidgetConfig() {
            const connected = (0, index_1.isClientWalletConnected)();
            this.updateConnectStatus(connected);
            await this.initWallet();
            this.fromTokenInput.chainId = this.chainId;
            this.toTokenInput.chainId = this.chainId;
            const tokens = scom_token_list_4.tokenStore.getTokenList(this.chainId);
            this.fromTokenInput.tokenDataListProp = tokens;
            this.toTokenInput.tokenDataListProp = tokens;
            this.pairs = await (0, api_1.getGroupQueuePairs)(this.state);
            this.isPairReady = true;
            const paramValueObj = await (0, api_1.getVotingValue)(this.state, 'vote');
            this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
            this.btnStart.enabled = this.isPairReady && !!(this.fromTokenInput?.token && this.toTokenInput?.token);
        }
        async connectWallet() {
            if (!(0, index_1.isClientWalletConnected)()) {
                if (this.mdWallet) {
                    await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                    this.mdWallet.networks = this.executionProperties.networks;
                    this.mdWallet.wallets = this.executionProperties.wallets;
                    this.mdWallet.showModal();
                }
            }
        }
        updateConnectStatus(connected) {
            if (connected) {
                this.lblConnectedStatus.caption = 'Connected with ' + eth_wallet_3.Wallet.getClientInstance().address;
                this.btnConnectWallet.visible = false;
            }
            else {
                this.lblConnectedStatus.caption = 'Please connect your wallet first';
                this.btnConnectWallet.visible = true;
            }
        }
        registerEvents() {
            let clientWallet = eth_wallet_3.Wallet.getClientInstance();
            this.walletEvents.push(clientWallet.registerWalletEvent(this, eth_wallet_3.Constants.ClientWalletEvent.AccountsChanged, async (payload) => {
                const { account } = payload;
                let connected = !!account;
                this.updateConnectStatus(connected);
            }));
        }
        onHide() {
            let clientWallet = eth_wallet_3.Wallet.getClientInstance();
            for (let event of this.walletEvents) {
                clientWallet.unregisterWalletEvent(event);
            }
            this.walletEvents = [];
        }
        init() {
            super.init();
            this.fromTokenInput.style.setProperty('--input-background', '#232B5A');
            this.fromTokenInput.style.setProperty('--input-font_color', '#fff');
            this.toTokenInput.style.setProperty('--input-background', '#232B5A');
            this.toTokenInput.style.setProperty('--input-font_color', '#fff');
            this.registerEvents();
        }
        onSelectFromToken(token) {
            this.handleSelectToken(true);
        }
        onSelectToToken(token) {
            this.handleSelectToken(false);
        }
        handleSelectToken(isFrom) {
            let fromToken = (this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol)?.toLowerCase();
            let toToken = (this.toTokenInput.token?.address || this.toTokenInput.token?.symbol)?.toLowerCase();
            if (fromToken && toToken && fromToken === toToken) {
                if (isFrom) {
                    this.toTokenInput.token = null;
                }
                else {
                    this.fromTokenInput.token = null;
                }
            }
            this.btnStart.enabled = this.isPairReady && !!(this.fromTokenInput?.token && this.toTokenInput?.token);
        }
        updateStepStatus(message) {
            if (this.state.handleUpdateStepStatus) {
                this.state.handleUpdateStepStatus({
                    status: "Completed",
                    color: Theme.colors.success.main,
                    message
                });
            }
        }
        async handleClickStart() {
            if (!this.fromTokenInput.token || !this.toTokenInput.token)
                return;
            const fromToken = this.fromTokenInput.token.address || this.fromTokenInput.token.symbol;
            const toToken = this.toTokenInput.token.address || this.toTokenInput.token.symbol;
            const fromPairToken = fromToken?.toLowerCase();
            const toPairToken = toToken?.toLowerCase();
            const pair = this.pairs.find(pair => pair.fromToken.toLowerCase() === fromPairToken && pair.toToken.toLowerCase() === toPairToken);
            const strPair = `${this.fromTokenInput.token.symbol}/${this.toTokenInput.token.symbol}`;
            this.executionProperties.isFlow = true;
            this.executionProperties.fromToken = fromToken;
            this.executionProperties.toToken = toToken;
            this.executionProperties.customTokens = this.customTokens;
            if (pair) {
                if (this.state.handleJumpToStep) {
                    let isRegistered = await (0, api_1.isPairRegistered)(this.state, pair.address);
                    if (!isRegistered) {
                        this.updateStepStatus(`Pair ${strPair} is not registered on Hybrid Router Registry`);
                        this.state.handleJumpToStep({
                            widgetName: 'scom-pair-registry',
                            executionProperties: {
                                tokenIn: fromToken,
                                tokenOut: toToken,
                                customTokens: this.customTokens,
                                isFlow: true
                            }
                        });
                    }
                    else {
                        this.updateStepStatus(`Pair ${strPair} is already created in the Group Queues`);
                        this.state.handleJumpToStep({
                            widgetName: 'scom-liquidity-provider',
                            executionProperties: {
                                tokenIn: fromToken,
                                tokenOut: toToken,
                                customTokens: this.customTokens,
                                isCreate: true,
                                isFlow: true
                            }
                        });
                    }
                }
            }
            else {
                this.btnStart.rightIcon.spin = true;
                this.btnStart.rightIcon.visible = true;
                const WETH9 = (0, index_1.getWETH)(this.chainId);
                const isSupported = await (0, api_1.isGroupQueueOracleSupported)(this.state, this.fromTokenInput.token.address ? this.fromTokenInput.token.address : WETH9.address, this.toTokenInput.token.address ? this.toTokenInput.token.address : WETH9.address);
                if (isSupported) {
                    this.updateStepStatus(strPair);
                    if (this.state.handleNextFlowStep) {
                        this.state.handleNextFlowStep({
                            tokenRequirements: this.tokenRequirements,
                            executionProperties: this.executionProperties
                        });
                    }
                }
                else {
                    if (this.state.handleJumpToStep) {
                        const votingBalance = await (0, api_1.stakeOf)(this.state);
                        if (votingBalance.lt(this.minThreshold)) {
                            const freezeStakeAmount = await (0, api_1.getFreezedStakeAmount)(this.state);
                            if (freezeStakeAmount.plus(votingBalance).gte(this.minThreshold)) {
                                this.updateStepStatus(`Pair ${strPair} is not registered in the Oracle, governance required`);
                                this.state.handleJumpToStep({
                                    widgetName: 'scom-governance-unlock-staking',
                                    executionProperties: {
                                        fromToken: fromToken,
                                        toToken: toToken,
                                        customTokens: this.customTokens,
                                        isFlow: true
                                    }
                                });
                            }
                            else {
                                let value = new eth_wallet_3.BigNumber(this.minThreshold).minus(votingBalance).toFixed();
                                this.updateStepStatus(`Pair ${strPair} is not registered in the Oracle, governance required`);
                                this.state.handleJumpToStep({
                                    widgetName: 'scom-governance-staking',
                                    executionProperties: {
                                        tokenInputValue: value,
                                        action: "add",
                                        fromToken: fromToken,
                                        toToken: toToken,
                                        customTokens: this.customTokens,
                                        isFlow: true
                                    }
                                });
                            }
                        }
                        else {
                            this.updateStepStatus(`Pair ${strPair} is not registered in the Oracle, governance required`);
                            this.state.handleJumpToStep({
                                widgetName: 'scom-governance-proposal',
                                executionProperties: {
                                    fromToken: fromToken,
                                    toToken: toToken,
                                    customTokens: this.customTokens,
                                    isFlow: true
                                }
                            });
                        }
                    }
                }
                this.btnStart.rightIcon.spin = false;
                this.btnStart.rightIcon.visible = false;
            }
        }
        openTokenModal() {
            this.mdImportToken.visible = true;
        }
        onCloseTokenModal() {
            this.edtTokenAddress.value = "";
            this.uploader.clear();
            this.edtLogoUrl.value = "";
        }
        onImageChanged() {
            this.isImageChanged = true;
        }
        async uploadImage(file) {
            let imageUrl = (0, api_1.uploadImageToIPFS)(file);
            return imageUrl;
        }
        async getTokenObjectByAddress(address) {
            let token;
            try {
                let erc20 = new eth_wallet_3.Erc20(this.rpcWallet, address);
                let name = await erc20.name;
                let decimals = await erc20.decimals;
                let symbol = await erc20.symbol;
                token = {
                    chainId: this.chainId,
                    address: address,
                    name,
                    decimals,
                    symbol
                };
            }
            catch (err) {
                console.log(err);
            }
            return token;
        }
        async importToken() {
            this.btnImportToken.rightIcon.spin = true;
            this.btnImportToken.rightIcon.visible = true;
            const customTokens = this.customTokens[this.chainId];
            const tokenAddress = this.edtTokenAddress.value;
            let logoUrl = this.edtLogoUrl.value;
            const file = this.uploader.fileList?.[0];
            const token = await this.getTokenObjectByAddress(tokenAddress);
            this.pnlErrMsg.visible = !token;
            if (!token) {
                this.btnImportToken.rightIcon.spin = false;
                this.btnImportToken.rightIcon.visible = false;
                return;
            }
            if (this.isImageChanged && file) {
                logoUrl = await this.uploadImage(file);
            }
            token.logoURI = logoUrl;
            const tokenIdx = customTokens.findIndex(t => t.address === tokenAddress);
            if (tokenIdx === -1) {
                customTokens.push(token);
            }
            else {
                customTokens[tokenIdx] = token;
            }
            const tokens = scom_token_list_4.tokenStore.getTokenList(this.chainId);
            this.fromTokenInput.tokenDataListProp = [...tokens, ...customTokens];
            this.toTokenInput.tokenDataListProp = [...tokens, ...customTokens];
            this.btnImportToken.rightIcon.spin = false;
            this.btnImportToken.rightIcon.visible = false;
            this.mdImportToken.visible = false;
        }
        render() {
            return (this.$render("i-vstack", { gap: "1rem", padding: { top: 10, bottom: 10, left: 20, right: 20 } },
                this.$render("i-label", { caption: "Get Ready to Create Pair" }),
                this.$render("i-vstack", { gap: '1rem' },
                    this.$render("i-label", { id: "lblConnectedStatus" }),
                    this.$render("i-hstack", null,
                        this.$render("i-button", { id: "btnConnectWallet", caption: 'Connect Wallet', font: { color: Theme.colors.primary.contrastText }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, onClick: this.connectWallet }))),
                this.$render("i-label", { caption: "Select a Pair" }),
                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", wrap: 'wrap', gap: 10 },
                    this.$render("i-scom-token-input", { id: "fromTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectFromToken.bind(this) }),
                    this.$render("i-label", { caption: "to", font: { size: "1rem" } }),
                    this.$render("i-scom-token-input", { id: "toTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectToToken.bind(this) })),
                this.$render("i-panel", null,
                    this.$render("i-label", { display: "inline", caption: "Click " }),
                    this.$render("i-label", { class: "pointer", display: "inline", caption: "here", font: { color: Theme.colors.primary.main, weight: 600 }, onClick: this.openTokenModal.bind(this) }),
                    this.$render("i-label", { display: "inline", caption: " to import custom token" })),
                this.$render("i-hstack", { horizontalAlignment: 'center' },
                    this.$render("i-button", { id: "btnStart", caption: "Start", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText, size: '1.5rem' }, onClick: this.handleClickStart.bind(this) })),
                this.$render("i-modal", { id: "mdImportToken", width: 640, padding: { top: "1rem", bottom: "1rem", left: "1.5rem", right: "1.5rem" }, border: { radius: '0.5rem' }, title: "Import Token", closeIcon: { name: "times" }, closeOnBackdropClick: false, onClose: this.onCloseTokenModal.bind(this) },
                    this.$render("i-vstack", { padding: { top: "1.5rem" }, gap: "1rem" },
                        this.$render("i-vstack", { gap: "0.5rem" },
                            this.$render("i-panel", null,
                                this.$render("i-label", { display: "inline", caption: "Token Address " }),
                                this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                            this.$render("i-input", { id: "edtTokenAddress", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } })),
                        this.$render("i-vstack", { gap: "0.5rem" },
                            this.$render("i-label", { caption: "Token Logo" }),
                            this.$render("i-upload", { id: "uploader", accept: "image/*", draggable: true, margin: { top: 0, bottom: 0 }, showFileList: false, onChanged: this.onImageChanged.bind(this) }),
                            this.$render("i-label", { class: "text-center", caption: "- or -", font: { size: '14px', color: Theme.text.secondary }, margin: { top: '-1rem', bottom: '0.35rem' } }),
                            this.$render("i-input", { id: "edtLogoUrl", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 }, placeholder: "Enter Image URL" })),
                        this.$render("i-hstack", { id: "pnlErrMsg", gap: "0.25rem", verticalAlignment: "center", visible: false },
                            this.$render("i-icon", { height: 14, width: 14, fill: Theme.colors.error.main, name: "exclamation-triangle" }),
                            this.$render("i-label", { caption: "Token Not Found", font: { size: "12px", color: Theme.colors.error.main, bold: true } })),
                        this.$render("i-hstack", { horizontalAlignment: "end", verticalAlignment: "center" },
                            this.$render("i-button", { id: "btnImportToken", height: 40, minWidth: 120, caption: "Confirm", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText }, onClick: this.importToken.bind(this) })))),
                this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] })));
        }
        async handleFlowStage(target, stage, options) {
            let widget = this;
            if (!options.isWidgetConnected) {
                let properties = options.properties;
                let tokenRequirements = options.tokenRequirements;
                this.state.handleNextFlowStep = options.onNextStep;
                this.state.handleAddTransactions = options.onAddTransactions;
                this.state.handleJumpToStep = options.onJumpToStep;
                this.state.handleUpdateStepStatus = options.onUpdateStepStatus;
                await this.setData({
                    executionProperties: properties,
                    tokenRequirements
                });
            }
            return { widget };
        }
    };
    ScomGroupQueuePairFlowInitialSetup = __decorate([
        (0, components_4.customElements)('i-scom-group-queue-pair-flow-initial-setup')
    ], ScomGroupQueuePairFlowInitialSetup);
    exports.default = ScomGroupQueuePairFlowInitialSetup;
});
define("@scom/scom-group-queue-pair", ["require", "exports", "@ijstech/components", "@scom/scom-group-queue-pair/assets.ts", "@scom/scom-group-queue-pair/formSchema.ts", "@scom/scom-group-queue-pair/store/index.ts", "@scom/scom-group-queue-pair/data.json.ts", "@ijstech/eth-wallet", "@scom/scom-token-list", "@scom/scom-group-queue-pair/api.ts", "@scom/scom-group-queue-pair/flow/initialSetup.tsx"], function (require, exports, components_5, assets_1, formSchema_1, index_2, data_json_1, eth_wallet_4, scom_token_list_5, api_2, initialSetup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomGroupQueuePair = class ScomGroupQueuePair extends components_5.Module {
        get chainId() {
            return this.state.getChainId();
        }
        get defaultChainId() {
            return this._data.defaultChainId;
        }
        set defaultChainId(value) {
            this._data.defaultChainId = value;
        }
        get wallets() {
            return this._data.wallets ?? [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            return this._data.networks ?? [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            return this._data.showHeader ?? true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
        }
        get pairs() {
            return this._pairs;
        }
        set pairs(value) {
            this._pairs = value;
        }
        get isFlow() {
            return this._data.isFlow ?? false;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                wallets: [],
                networks: []
            };
            this.isReadyToCreate = false;
            this.tag = {};
            this.initWallet = async () => {
                try {
                    await eth_wallet_4.Wallet.getClientInstance().init();
                    const rpcWallet = this.state.getRpcWallet();
                    await rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.initializeWidgetConfig = async () => {
                setTimeout(async () => {
                    const chainId = this.chainId;
                    await this.initWallet();
                    if (!(0, index_2.isClientWalletConnected)()) {
                        this.btnCreate.caption = "Connect Wallet";
                        this.btnCreate.enabled = true;
                    }
                    else if (!this.state.isRpcWalletConnected()) {
                        this.btnCreate.caption = "Switch Network";
                        this.btnCreate.enabled = true;
                    }
                    else {
                        this.btnCreate.caption = "Create";
                        this.btnCreate.enabled = this.isReadyToCreate;
                    }
                    this.fromTokenInput.chainId = chainId;
                    this.toTokenInput.chainId = chainId;
                    const tokens = scom_token_list_5.tokenStore.getTokenList(chainId);
                    const customTokens = this._data.customTokens?.[this.chainId] ?? [];
                    const tokenList = [...tokens, ...customTokens];
                    this.fromTokenInput.tokenDataListProp = tokenList;
                    this.toTokenInput.tokenDataListProp = tokenList;
                    if (this.isFlow) {
                        this.fromPairToken = this.toPairToken = "";
                        if (this._data.fromToken) {
                            const fromToken = this._data.fromToken.toLowerCase();
                            this.fromTokenInput.token = tokenList.find(t => t.symbol.toLowerCase() === fromToken || t.address?.toLowerCase() === fromToken);
                        }
                        if (this._data.toToken) {
                            const toToken = this._data.toToken.toLowerCase();
                            this.toTokenInput.token = tokenList.find(t => t.symbol.toLowerCase() === toToken || t.address?.toLowerCase() === toToken);
                        }
                    }
                    if (!this.pairs) {
                        this.fromTokenInput.tokenReadOnly = true;
                        this.toTokenInput.tokenReadOnly = true;
                        this.pairs = await (0, api_2.getGroupQueuePairs)(this.state);
                        this.fromTokenInput.tokenReadOnly = this.isFlow;
                        this.toTokenInput.tokenReadOnly = this.isFlow;
                    }
                    if (this.isFlow && this.fromTokenInput.token && this.toTokenInput.token) {
                        this.selectToken(this.fromTokenInput.token, true);
                    }
                });
            };
            this.showResultMessage = (status, content) => {
                if (!this.txStatusModal)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                this.txStatusModal.message = { ...params };
                this.txStatusModal.showModal();
            };
            this.connectWallet = async () => {
                if (!(0, index_2.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_5.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!this.state.isRpcWalletConnected()) {
                    const clientWallet = eth_wallet_4.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(this.chainId);
                }
            };
            this.state = new index_2.State(data_json_1.default);
        }
        removeRpcWalletEvents() {
            const rpcWallet = this.state.getRpcWallet();
            if (rpcWallet)
                rpcWallet.unregisterAllWalletEvents();
        }
        onHide() {
            this.dappContainer.onHide();
            this.removeRpcWalletEvents();
        }
        isEmptyData(value) {
            return !value || !value.networks || value.networks.length === 0;
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const networks = this.getAttribute('networks', true);
                const wallets = this.getAttribute('wallets', true);
                const defaultChainId = this.getAttribute('defaultChainId', true);
                const showHeader = this.getAttribute('showHeader', true);
                const data = {
                    networks,
                    wallets,
                    defaultChainId,
                    showHeader
                };
                if (!this.isEmptyData(data)) {
                    await this.setData(data);
                }
            }
            this.loadingElm.visible = false;
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
        }
        _getActions(category) {
            const actions = [];
            if (category && category !== 'offers') {
                actions.push({
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = {
                            wallets: [],
                            networks: []
                        };
                        let oldTag = {};
                        return {
                            execute: () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { networks } = userInputData;
                                const themeSettings = {};
                                this._data.networks = networks;
                                this._data.defaultChainId = this._data.networks[0].chainId;
                                this.resetRpcWallet();
                                this.refreshUI();
                                if (builder?.setData)
                                    builder.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder?.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(themeSettings);
                            },
                            undo: () => {
                                this._data = JSON.parse(JSON.stringify(oldData));
                                this.refreshUI();
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder?.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls()
                });
            }
            return actions;
        }
        getProjectOwnerActions() {
            const actions = [
                {
                    name: 'Settings',
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls()
                }
            ];
            return actions;
        }
        getConfigurators() {
            return [
                {
                    name: 'Project Owner Configurator',
                    target: 'Project Owners',
                    getProxySelectors: async (chainId) => {
                        return [];
                    },
                    getActions: () => {
                        return this.getProjectOwnerActions();
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        await this.setData(data);
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: this._getActions.bind(this),
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData({ ...defaultData, ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Embedder Configurator',
                    target: 'Embedders',
                    getData: async () => {
                        return { ...this._data };
                    },
                    setData: async (properties, linkParams) => {
                        let resultingData = {
                            ...properties
                        };
                        if (!properties.defaultChainId && properties.networks?.length) {
                            resultingData.defaultChainId = properties.networks[0].chainId;
                        }
                        await this.setData(resultingData);
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.resetRpcWallet();
            await this.refreshUI();
        }
        async getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.tag[prop] = newValue[prop];
                }
            }
            if (this.dappContainer)
                this.dappContainer.setTag(this.tag);
        }
        resetRpcWallet() {
            this.removeRpcWalletEvents();
            const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.state.getRpcWallet();
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.fromTokenInput.token = null;
                this.toTokenInput.token = null;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
                this.fromPairToken = this.toPairToken = "";
                this.fromTokenInput.tokenReadOnly = true;
                this.toTokenInput.tokenReadOnly = true;
                this.pairs = await (0, api_2.getGroupQueuePairs)(this.state);
                this.fromTokenInput.tokenReadOnly = this.isFlow;
                this.toTokenInput.tokenReadOnly = this.isFlow;
                this.refreshUI();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.refreshUI();
            });
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if (this.dappContainer?.setData)
                this.dappContainer.setData(data);
        }
        async refreshUI() {
            await this.initializeWidgetConfig();
        }
        onSelectFromToken(token) {
            this.selectToken(token, true);
        }
        onSelectToToken(token) {
            this.selectToken(token, false);
        }
        async selectToken(token, isFrom) {
            this.isReadyToCreate = false;
            const targetToken = (token.address || token.symbol)?.toLowerCase();
            let fromToken = (this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol)?.toLowerCase();
            let toToken = (this.toTokenInput.token?.address || this.toTokenInput.token?.symbol)?.toLowerCase();
            if (isFrom && targetToken === this.fromPairToken)
                return;
            if (!isFrom && targetToken === this.toPairToken)
                return;
            if (fromToken && toToken && fromToken === toToken) {
                if (isFrom) {
                    this.toTokenInput.token = null;
                    toToken = "";
                }
                else {
                    this.fromTokenInput.token = null;
                    fromToken = "";
                }
            }
            this.fromPairToken = fromToken;
            this.toPairToken = toToken;
            if (!this.fromTokenInput.token || !this.toTokenInput.token) {
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
                this.isReadyToCreate = false;
                return;
            }
            const isPairExisted = this.pairs?.length && this.pairs.some(pair => pair.fromToken.toLowerCase() === this.fromPairToken && pair.toToken.toLowerCase() === this.toPairToken);
            if (isPairExisted) {
                this.pnlInfo.visible = true;
                this.msgCreatePair.visible = true;
                this.linkGov.visible = false;
                this.msgCreatePair.caption = 'This pair is already created in the Group Queues.';
                this.isReadyToCreate = false;
            }
            else {
                this.fromTokenInput.tokenReadOnly = true;
                this.toTokenInput.tokenReadOnly = true;
                const WETH9 = (0, index_2.getWETH)(this.chainId);
                this.fromPairToken = this.fromTokenInput.token.address ? this.fromTokenInput.token.address : WETH9.address;
                this.toPairToken = this.toTokenInput.token.address ? this.toTokenInput.token.address : WETH9.address;
                const isSupported = await (0, api_2.isGroupQueueOracleSupported)(this.state, this.fromPairToken, this.toPairToken);
                this.isReadyToCreate = isSupported;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = !isSupported;
                if (!isSupported) {
                    this.msgCreatePair.caption = 'Pair is not registered in the Oracle, please register the pair in the Oracle.';
                }
                this.fromTokenInput.tokenReadOnly = this.isFlow;
                this.toTokenInput.tokenReadOnly = this.isFlow;
            }
            if ((0, index_2.isClientWalletConnected)() && this.state.isRpcWalletConnected()) {
                this.btnCreate.enabled = this.isReadyToCreate;
            }
        }
        async onCreatePair() {
            try {
                if (!this.state.isRpcWalletConnected()) {
                    this.connectWallet();
                    return;
                }
                if (!this.fromTokenInput.token || !this.toTokenInput.token)
                    return;
                this.showResultMessage('warning', 'Creating a new pair');
                this.fromTokenInput.tokenReadOnly = true;
                this.toTokenInput.tokenReadOnly = true;
                this.btnCreate.rightIcon.spin = true;
                this.btnCreate.rightIcon.visible = true;
                const chainId = this.chainId;
                const fromToken = this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol;
                const toToken = this.toTokenInput.token?.address || this.toTokenInput.token?.symbol;
                const { receipt, pairAddress, error } = await (0, api_2.doCreatePair)(this.state, this.fromPairToken, this.toPairToken);
                if (error) {
                    this.showResultMessage('error', error);
                }
                else {
                    this.fromPairToken = '';
                    this.toPairToken = '';
                }
                if (receipt) {
                    if (this.state.handleUpdateStepStatus) {
                        this.state.handleUpdateStepStatus({
                            status: "Completed",
                            color: Theme.colors.success.main,
                            message: `${this.fromTokenInput.token.symbol}/${this.toTokenInput.token.symbol}`
                        });
                    }
                    if (this.state.handleAddTransactions) {
                        const timestamp = await this.state.getRpcWallet().getBlockTimestamp(receipt.blockNumber.toString());
                        const transactionsInfoArr = [
                            {
                                desc: 'Create Pair',
                                chainId: chainId,
                                fromToken: null,
                                toToken: null,
                                fromTokenAmount: '',
                                toTokenAmount: '-',
                                hash: receipt.transactionHash,
                                timestamp,
                                value: `${this.fromTokenInput.token.symbol}/${this.toTokenInput.token.symbol}`
                            }
                        ];
                        this.state.handleAddTransactions({
                            list: transactionsInfoArr
                        });
                    }
                    let isRegistered = await (0, api_2.isPairRegistered)(this.state, pairAddress);
                    if (this.state.handleJumpToStep) {
                        this.state.handleJumpToStep({
                            widgetName: isRegistered ? 'scom-liquidity-provider' : 'scom-pair-registry',
                            executionProperties: {
                                tokenIn: fromToken,
                                tokenOut: toToken,
                                customTokens: this._data.customTokens,
                                isCreate: true,
                                isFlow: true
                            }
                        });
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this.fromTokenInput.tokenReadOnly = this.isFlow;
                this.toTokenInput.tokenReadOnly = this.isFlow;
                this.btnCreate.rightIcon.spin = false;
                this.btnCreate.rightIcon.visible = false;
            }
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-panel", { background: { color: Theme.background.main } },
                    this.$render("i-panel", null,
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-vstack", { width: "100%", height: "100%", padding: { top: "1rem", bottom: "1rem", left: "1.5rem", right: "1.5rem" } },
                            this.$render("i-label", { caption: "Create a new Pair", font: { size: '1.25rem', weight: 700, color: Theme.colors.primary.main }, margin: { bottom: '2rem' } }),
                            this.$render("i-vstack", { width: "100%", height: "100%", maxWidth: 360, horizontalAlignment: "center", margin: { left: 'auto', right: 'auto' }, gap: "1.5rem" },
                                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", wrap: 'wrap', gap: 10 },
                                    this.$render("i-scom-token-input", { id: "fromTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectFromToken.bind(this) }),
                                    this.$render("i-label", { caption: "to", font: { size: "1rem" } }),
                                    this.$render("i-scom-token-input", { id: "toTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectToToken.bind(this) })),
                                this.$render("i-vstack", { id: "pnlInfo", gap: "0.5rem", visible: false },
                                    this.$render("i-label", { id: "msgCreatePair", class: "text-center", visible: false }),
                                    this.$render("i-label", { id: "linkGov", class: "text-center", caption: " Go to Governance", visible: false, link: { href: 'https://www.openswap.xyz/#/governance', target: '_blank' } })),
                                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", margin: { top: "0.5rem" } },
                                    this.$render("i-button", { id: "btnCreate", width: 150, caption: "Create", font: { size: '1rem', weight: 600, color: '#ffff' }, lineHeight: 1.5, background: { color: Theme.background.gradient }, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, border: { radius: '0.65rem' }, enabled: false, onClick: this.onCreatePair.bind(this) }))))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
        async handleFlowStage(target, stage, options) {
            let widget;
            if (stage === 'initialSetup') {
                widget = new initialSetup_1.default();
                target.appendChild(widget);
                await widget.ready();
                widget.state = this.state;
                await widget.handleFlowStage(target, stage, options);
            }
            else {
                widget = this;
                if (!options.isWidgetConnected) {
                    target.appendChild(widget);
                    await widget.ready();
                }
                let properties = options.properties;
                let tag = options.tag;
                this.state.handleNextFlowStep = options.onNextStep;
                this.state.handleAddTransactions = options.onAddTransactions;
                this.state.handleJumpToStep = options.onJumpToStep;
                this.state.handleUpdateStepStatus = options.onUpdateStepStatus;
                await this.setData(properties);
                if (tag) {
                    this.setTag(tag);
                }
            }
            return { widget };
        }
    };
    ScomGroupQueuePair = __decorate([
        (0, components_5.customElements)('i-scom-group-queue-pair')
    ], ScomGroupQueuePair);
    exports.default = ScomGroupQueuePair;
});
