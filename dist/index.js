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
    const chainIds = [1, 56, 137, 250, 97, 80001, 43113, 43114];
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
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Category',
                            label: 'Networks',
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
                    ]
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
            OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
        },
        97: {
            OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
        }
    };
});
define("@scom/scom-group-queue-pair/store/utils.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-group-queue-pair/store/core.ts"], function (require, exports, components_2, eth_wallet_1, scom_network_list_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isClientWalletConnected = exports.State = void 0;
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
            return core_1.coreAddress[chainId || this.getChainId()] || {};
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
});
define("@scom/scom-group-queue-pair/store/index.ts", ["require", "exports", "@scom/scom-token-list", "@scom/scom-group-queue-pair/store/utils.ts"], function (require, exports, scom_token_list_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTokenSymbol = exports.getTokenIcon = void 0;
    const getToken = (chainId, address) => {
        const tokenMap = scom_token_list_1.tokenStore.tokenMap;
        const tokenObject = address ? tokenMap[address.toLowerCase()] : scom_token_list_1.ChainNativeTokenByChainId[chainId];
        return tokenObject;
    };
    const getTokenIcon = (chainId, address) => {
        if (address == null)
            return '';
        const tokenObject = getToken(chainId, address);
        const path = scom_token_list_1.assets.tokenPath(tokenObject, chainId);
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
    };
});
define("@scom/scom-group-queue-pair/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.primaryButtonStyle = exports.tokenInputStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.tokenInputStyle = components_3.Styles.style({
        background: Theme.input.background,
        $nest: {
            '#gridTokenInput': {
                transition: 'none'
            },
            '#btnToken': {
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: 1.5,
                alignSelf: 'center',
                textAlign: 'center',
                opacity: 1,
                color: Theme.input.fontColor,
            },
        }
    });
    exports.primaryButtonStyle = components_3.Styles.style({
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
        verticalAlign: 'middle',
        color: Theme.colors.primary.contrastText,
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
                opacity: 1
            },
        }
    });
});
define("@scom/scom-group-queue-pair", ["require", "exports", "@ijstech/components", "@scom/scom-group-queue-pair/assets.ts", "@scom/scom-group-queue-pair/formSchema.ts", "@scom/scom-group-queue-pair/store/index.ts", "@scom/scom-group-queue-pair/data.json.ts", "@ijstech/eth-wallet", "@scom/scom-token-list", "@scom/scom-group-queue-pair/index.css.ts"], function (require, exports, components_4, assets_1, formSchema_1, index_1, data_json_1, eth_wallet_2, scom_token_list_2, index_css_1) {
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
            this.tag = {};
            this.initWallet = async () => {
                try {
                    await eth_wallet_2.Wallet.getClientInstance().init();
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
                    }
                    else if (!this.state.isRpcWalletConnected()) {
                        this.btnCreate.caption = "Switch Network";
                    }
                    else {
                        this.btnCreate.caption = "Create";
                    }
                    const tokens = scom_token_list_2.tokenStore.getTokenList(chainId);
                    this.fromTokenInput.tokenDataListProp = tokens;
                    this.toTokenInput.tokenDataListProp = tokens;
                    if (this.fromTokenInput.chainId !== chainId) {
                        this.fromTokenInput.chainId = chainId;
                    }
                });
            };
        }
        get chainId() {
            return this.state.getChainId();
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
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
        removeRpcWalletEvents() {
            const rpcWallet = this.state.getRpcWallet();
            if (rpcWallet)
                rpcWallet.unregisterAllWalletEvents();
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
                await this.setData(data);
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
                    },
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls()
                });
            }
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
                        await this.setData(data);
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
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_2.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_2.Constants.RpcWalletEvent.Connected, async (connected) => {
            });
            if (rpcWallet.instanceId) {
                if (this.fromTokenInput)
                    this.fromTokenInput.rpcWalletId = rpcWallet.instanceId;
                if (this.toTokenInput)
                    this.toTokenInput.rpcWalletId = rpcWallet.instanceId;
            }
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
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-panel", { background: { color: Theme.background.main } },
                    this.$render("i-panel", null,
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-vstack", { width: "100%", height: "100%", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, gap: "1.5rem" },
                            this.$render("i-label", { caption: "Create a new Pair", font: { size: '1.25rem', weight: 700, color: Theme.colors.primary.main } }),
                            this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", wrap: 'wrap', gap: 10 },
                                this.$render("i-scom-token-input", { id: "fromTokenInput", type: "combobox", class: index_css_1.tokenInputStyle, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 } }),
                                this.$render("i-label", { caption: "to", font: { size: "1rem" } }),
                                this.$render("i-scom-token-input", { id: "toTokenInput", type: "combobox", class: index_css_1.tokenInputStyle, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 } })),
                            this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", margin: { top: "0.5rem" } },
                                this.$render("i-button", { id: "btnCreate", class: index_css_1.primaryButtonStyle, width: 150, caption: "Create" })))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    ScomGroupQueuePair = __decorate([
        (0, components_4.customElements)('i-scom-group-queue-pair')
    ], ScomGroupQueuePair);
    exports.default = ScomGroupQueuePair;
});
