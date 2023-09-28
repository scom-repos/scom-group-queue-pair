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
                        var _a;
                        return (_a = control.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
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
            OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
        },
        97: {
            WrappedNativeToken: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
            OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
        },
        137: {
            WrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
            OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
        },
        80001: {
            WrappedNativeToken: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
        },
        43113: {
            WrappedNativeToken: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
            OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
        },
        43114: {
            WrappedNativeToken: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
        },
        42161: {
            WrappedNativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            OSWAP_RestrictedFactory: "0x408aAf94BD851eb991dA146dFc7C290aA42BA70f",
        },
        421613: {
            WrappedNativeToken: "0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f",
            OSWAP_RestrictedFactory: "0x6f641f4F5948954F7cd675f3D874Ac60b193bA0d",
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
            var _a, _b, _c;
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(((_a = components_2.application.store) === null || _a === void 0 ? void 0 : _a.networkMap) || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: (_b = components_2.application.store) === null || _b === void 0 ? void 0 : _b.infuraId,
                multicalls: (_c = components_2.application.store) === null || _c === void 0 ? void 0 : _c.multicalls
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
            return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
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
                this.networkMap[network.chainId] = Object.assign(Object.assign({}, networkInfo), network);
                wallet.setNetworkInfo(this.networkMap[network.chainId]);
            }
        }
        getAddresses(chainId) {
            return core_1.coreAddress[chainId || this.getChainId()];
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
        const tokenMap = scom_token_list_2.tokenStore.tokenMap;
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
define("@scom/scom-group-queue-pair/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.primaryButtonStyle = exports.tokenInputStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.tokenInputStyle = components_3.Styles.style({
        width: 160,
        $nest: {
            '> * > *': {
                margin: '0 !important',
                padding: '0 !important'
            },
            '#gridTokenInput': {
                height: 48,
                padding: '0 !important',
                transition: 'none'
            },
            '#btnToken': {
                width: '100% !important',
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: 1.5,
                alignSelf: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
                opacity: 1,
                color: Theme.input.fontColor,
                padding: '0.25rem 0.75rem !important'
            },
            '#pnlSelection': {
                height: '100%'
            },
            '#pnlSelection > *': {
                height: '100%'
            },
            '#mdCbToken': {
                minWidth: '160px !important',
                maxWidth: '160px !important',
            },
            '#mdCbToken .modal': {
                minWidth: '160px !important'
            },
        }
    });
    exports.primaryButtonStyle = components_3.Styles.style({
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
        verticalAlign: 'middle',
        background: Theme.background.gradient,
        color: '#fff',
        borderRadius: '0.65rem',
        padding: '0.5rem 0.75rem',
        transition: 'background .3s ease',
        opacity: 1,
        $nest: {
            '&:not(.disabled):not(.is-spinning):hover': {
                boxShadow: 'none',
                opacity: .9
            },
            '&:not(.disabled):not(.is-spinning):focus': {
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
                opacity: .9
            },
            '&.disabled': {
                opacity: 1,
                color: '#fff',
            },
        }
    });
});
define("@scom/scom-group-queue-pair/api.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/oswap-openswap-contract", "@scom/scom-token-list"], function (require, exports, eth_wallet_2, oswap_openswap_contract_1, scom_token_list_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGroupQueuePairs = exports.isGroupQueueOracleSupported = exports.doCreatePair = exports.nullAddress = void 0;
    //call OSWAP_RestrictedFactory.createPair(address tokenA, address tokenB)
    exports.nullAddress = "0x0000000000000000000000000000000000000000";
    async function doCreatePair(state, tokenA, tokenB) {
        let receipt = null;
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
        }
        catch (error) {
            return { receipt: null, error: error };
        }
        return { receipt, error: null };
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
        const addPair = (token0Address, token1Address) => {
            const token0 = token0Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token0Address.toLowerCase();
            const token1 = token1Address.toLowerCase() == WETH9Address.toLowerCase() ? nativeToken.symbol : token1Address.toLowerCase();
            pairs.push({ fromToken: token0, toToken: token1 });
            pairs.push({ fromToken: token1, toToken: token0 });
        };
        const factoryContract = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
        let allPairsLength = (await factoryContract.allPairsLength()).toNumber();
        let tasks = [];
        for (let i = 0; i < allPairsLength; i++) {
            tasks.push((async () => {
                let pairAddress = await factoryContract.allPairs(i);
                let groupPair = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedPair(wallet, pairAddress);
                let token0Address = await groupPair.token0();
                let token1Address = await groupPair.token1();
                addPair(token0Address, token1Address);
            })());
        }
        await Promise.all(tasks);
        return pairs;
    }
    exports.getGroupQueuePairs = getGroupQueuePairs;
});
define("@scom/scom-group-queue-pair", ["require", "exports", "@ijstech/components", "@scom/scom-group-queue-pair/assets.ts", "@scom/scom-group-queue-pair/formSchema.ts", "@scom/scom-group-queue-pair/store/index.ts", "@scom/scom-group-queue-pair/data.json.ts", "@ijstech/eth-wallet", "@scom/scom-token-list", "@scom/scom-group-queue-pair/index.css.ts", "@scom/scom-group-queue-pair/api.ts"], function (require, exports, components_4, assets_1, formSchema_1, index_1, data_json_1, eth_wallet_3, scom_token_list_4, index_css_1, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomGroupQueuePair = class ScomGroupQueuePair extends components_4.Module {
        constructor() {
            super(...arguments);
            this._data = {
                wallets: [],
                networks: []
            };
            this._pairs = [];
            this.tag = {};
            this.initWallet = async () => {
                try {
                    await eth_wallet_3.Wallet.getClientInstance().init();
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
                    if (!(0, index_1.isClientWalletConnected)()) {
                        this.btnCreate.caption = "Connect Wallet";
                        this.btnCreate.enabled = true;
                    }
                    else if (!this.state.isRpcWalletConnected()) {
                        this.btnCreate.caption = "Switch Network";
                        this.btnCreate.enabled = true;
                    }
                    else {
                        this.btnCreate.caption = "Create";
                        this.btnCreate.enabled = false;
                    }
                    this.fromTokenInput.chainId = chainId;
                    this.toTokenInput.chainId = chainId;
                    const tokens = scom_token_list_4.tokenStore.getTokenList(chainId);
                    this.fromTokenInput.tokenDataListProp = tokens;
                    this.toTokenInput.tokenDataListProp = tokens;
                    if (this.state.isRpcWalletConnected()) {
                        this.pairs = await (0, api_1.getGroupQueuePairs)(this.state);
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
                this.txStatusModal.message = Object.assign({}, params);
                this.txStatusModal.showModal();
            };
            this.connectWallet = async () => {
                if (!(0, index_1.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!this.state.isRpcWalletConnected()) {
                    const clientWallet = eth_wallet_3.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(this.chainId);
                }
            };
        }
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
            var _a;
            return (_a = this._data.wallets) !== null && _a !== void 0 ? _a : [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            var _a;
            return (_a = this._data.networks) !== null && _a !== void 0 ? _a : [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            var _a;
            return (_a = this._data.showHeader) !== null && _a !== void 0 ? _a : true;
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
            this.state = new index_1.State(data_json_1.default);
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
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(themeSettings);
                            },
                            undo: () => {
                                this._data = JSON.parse(JSON.stringify(oldData));
                                this.refreshUI();
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
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
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Embedder Configurator',
                    target: 'Embedders',
                    getData: async () => {
                        return Object.assign({}, this._data);
                    },
                    setData: async (properties, linkParams) => {
                        var _a;
                        let resultingData = Object.assign({}, properties);
                        if (!properties.defaultChainId && ((_a = properties.networks) === null || _a === void 0 ? void 0 : _a.length)) {
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
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
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
            var _a;
            this.removeRpcWalletEvents();
            const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.state.getRpcWallet();
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_3.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.fromTokenInput.token = null;
                this.toTokenInput.token = null;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = false;
                this.fromPairToken = this.toPairToken = "";
                this.refreshUI();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_3.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.refreshUI();
            });
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.setData)
                this.dappContainer.setData(data);
        }
        async refreshUI() {
            await this.initializeWidgetConfig();
        }
        onSelectFromToken(token) {
            this.onSelectToken(token, true);
        }
        onSelectToToken(token) {
            this.onSelectToken(token, false);
        }
        async onSelectToken(token, isFrom) {
            var _a, _b, _c, _d, _e, _f, _g;
            const targetToken = (_a = (token.address || token.symbol)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            let fromToken = (_d = (((_b = this.fromTokenInput.token) === null || _b === void 0 ? void 0 : _b.address) || ((_c = this.fromTokenInput.token) === null || _c === void 0 ? void 0 : _c.symbol))) === null || _d === void 0 ? void 0 : _d.toLowerCase();
            let toToken = (_g = (((_e = this.toTokenInput.token) === null || _e === void 0 ? void 0 : _e.address) || ((_f = this.toTokenInput.token) === null || _f === void 0 ? void 0 : _f.symbol))) === null || _g === void 0 ? void 0 : _g.toLowerCase();
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
                this.btnCreate.enabled = false;
                return;
            }
            const isPairExisted = this.pairs.some(pair => pair.fromToken.toLowerCase() === this.fromPairToken && pair.toToken.toLowerCase() === this.toPairToken);
            if (isPairExisted) {
                this.pnlInfo.visible = true;
                this.msgCreatePair.visible = true;
                this.linkGov.visible = false;
                this.msgCreatePair.caption = 'This pair is already created in the Group Queues.';
            }
            else {
                this.fromTokenInput.tokenReadOnly = true;
                this.toTokenInput.tokenReadOnly = true;
                const WETH9 = (0, index_1.getWETH)(this.chainId);
                this.fromPairToken = this.fromTokenInput.token.address ? this.fromTokenInput.token.address : WETH9.address || this.fromTokenInput.token.address;
                this.toPairToken = this.toTokenInput.token.address ? this.toTokenInput.token.address : WETH9.address || this.toTokenInput.token.address;
                const isSupported = await (0, api_1.isGroupQueueOracleSupported)(this.state, this.fromPairToken, this.toPairToken);
                this.btnCreate.enabled = isSupported;
                this.pnlInfo.visible = this.msgCreatePair.visible = this.linkGov.visible = !isSupported;
                if (!isSupported) {
                    this.msgCreatePair.caption = 'Pair is not registered in the Oracle, please register the pair in the oracle.';
                }
                this.fromTokenInput.tokenReadOnly = false;
                this.toTokenInput.tokenReadOnly = false;
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
                const { error } = await (0, api_1.doCreatePair)(this.state, this.fromPairToken, this.toPairToken);
                if (error) {
                    this.showResultMessage('error', error);
                }
                else {
                    this.fromPairToken = '';
                    this.toPairToken = '';
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this.fromTokenInput.tokenReadOnly = false;
                this.toTokenInput.tokenReadOnly = false;
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
                                    this.$render("i-scom-token-input", { id: "fromTokenInput", type: "combobox", class: index_css_1.tokenInputStyle, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectFromToken.bind(this) }),
                                    this.$render("i-label", { caption: "to", font: { size: "1rem" } }),
                                    this.$render("i-scom-token-input", { id: "toTokenInput", type: "combobox", class: index_css_1.tokenInputStyle, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 }, onSelectToken: this.onSelectToToken.bind(this) })),
                                this.$render("i-vstack", { id: "pnlInfo", gap: "0.5rem", visible: false },
                                    this.$render("i-label", { id: "msgCreatePair", class: "text-center", visible: false }),
                                    this.$render("i-label", { id: "linkGov", class: "text-center", caption: " Go to Governance", visible: false, link: { href: 'https://www.openswap.xyz/#/governance', target: '_blank' } })),
                                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", margin: { top: "0.5rem" } },
                                    this.$render("i-button", { id: "btnCreate", class: index_css_1.primaryButtonStyle, width: 150, caption: "Create", enabled: false, onClick: this.onCreatePair.bind(this) }))))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    ScomGroupQueuePair = __decorate([
        (0, components_4.customElements)('i-scom-group-queue-pair')
    ], ScomGroupQueuePair);
    exports.default = ScomGroupQueuePair;
});
