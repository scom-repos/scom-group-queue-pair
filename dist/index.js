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
define("@scom/scom-group-queue-pair/formSchema.ts", ["require", "exports", "@scom/scom-network-picker", "@scom/scom-token-input", "@scom/scom-token-list"], function (require, exports, scom_network_picker_1, scom_token_input_1, scom_token_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        dataSchema: {
            type: 'object',
            properties: {
                chainId: {
                    type: 'number',
                    required: true
                },
                tokenFrom: {
                    type: 'string'
                },
                tokenTo: {
                    type: 'string'
                }
            }
        },
        uiSchema: {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/chainId'
                },
                {
                    type: 'Control',
                    scope: '#/properties/tokenFrom'
                },
                {
                    type: 'Control',
                    scope: '#/properties/tokenTo'
                }
            ]
        },
        customControls(rpcWalletId) {
            let networkPicker;
            let tokenFromInput;
            let tokenToInput;
            const setTokenData = (control, value) => {
                var _a;
                if (!value) {
                    const chainId = (_a = networkPicker === null || networkPicker === void 0 ? void 0 : networkPicker.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                    const tokens = scom_token_list_1.tokenStore.getTokenList(chainId);
                    let token = tokens.find(token => !token.address);
                    control.token = token;
                }
                else {
                    control.address = value;
                }
            };
            return {
                '#/properties/chainId': {
                    render: () => {
                        networkPicker = new scom_network_picker_1.default(undefined, {
                            type: 'combobox',
                            networks: [1, 56, 137, 250, 97, 80001, 43113, 43114].map(v => { return { chainId: v }; }),
                            onCustomNetworkSelected: () => {
                                var _a;
                                const chainId = (_a = networkPicker.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                                tokenFromInput.chainId = chainId;
                                tokenToInput.chainId = chainId;
                            }
                        });
                        return networkPicker;
                    },
                    getData: (control) => {
                        var _a;
                        return (_a = control.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                    },
                    setData: (control, value) => {
                        control.setNetworkByChainId(value);
                        if (tokenFromInput)
                            tokenFromInput.chainId = value;
                        if (tokenToInput)
                            tokenToInput.chainId = value;
                    }
                },
                '#/properties/tokenFrom': {
                    render: () => {
                        var _a;
                        tokenFromInput = new scom_token_input_1.default(undefined, {
                            type: 'combobox',
                            isBalanceShown: false,
                            isBtnMaxShown: false,
                            isInputShown: false
                        });
                        tokenFromInput.rpcWalletId = rpcWalletId;
                        const chainId = (_a = networkPicker === null || networkPicker === void 0 ? void 0 : networkPicker.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                        if (chainId && tokenFromInput.chainId !== chainId) {
                            tokenFromInput.chainId = chainId;
                        }
                        return tokenFromInput;
                    },
                    getData: (control) => {
                        var _a;
                        return ((_a = control.token) === null || _a === void 0 ? void 0 : _a.address) || "";
                    },
                    setData: setTokenData
                },
                '#/properties/tokenTo': {
                    render: () => {
                        var _a;
                        tokenToInput = new scom_token_input_1.default(undefined, {
                            type: 'combobox',
                            isBalanceShown: false,
                            isBtnMaxShown: false,
                            isInputShown: false
                        });
                        tokenToInput.rpcWalletId = rpcWalletId;
                        const chainId = (_a = networkPicker === null || networkPicker === void 0 ? void 0 : networkPicker.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                        if (chainId && tokenToInput.chainId !== chainId) {
                            tokenToInput.chainId = chainId;
                        }
                        return tokenToInput;
                    },
                    getData: (control) => {
                        var _a;
                        return ((_a = control.token) === null || _a === void 0 ? void 0 : _a.address) || "";
                    },
                    setData: setTokenData
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
    exports.State = void 0;
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
});
define("@scom/scom-group-queue-pair/store/index.ts", ["require", "exports", "@scom/scom-group-queue-pair/store/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-group-queue-pair/store/index.ts'/> 
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
define("@scom/scom-group-queue-pair", ["require", "exports", "@ijstech/components", "@scom/scom-group-queue-pair/assets.ts", "@scom/scom-group-queue-pair/formSchema.ts", "@scom/scom-group-queue-pair/store/index.ts", "@scom/scom-group-queue-pair/data.json.ts"], function (require, exports, components_3, assets_1, formSchema_1, index_1, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomGroupQueuePair = class ScomGroupQueuePair extends components_3.Module {
        constructor() {
            super(...arguments);
            this._data = {
                chainId: 0,
                tokenFrom: '',
                tokenTo: ''
            };
            this.tag = {};
        }
        get chainId() {
            return this.state.getChainId();
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.state = new index_1.State(data_json_1.default);
            this.infoStack.visible = false;
            this.emptyStack.visible = true;
            this.loadingElm.visible = false;
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
        }
        _getActions(category) {
            var _a;
            const actions = [];
            if (category && category !== 'offers') {
                actions.push({
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                    },
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls((_a = this.rpcWallet) === null || _a === void 0 ? void 0 : _a.instanceId)
                });
            }
        }
        getConfigurators() {
            return [
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
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-panel", { background: { color: Theme.background.main } },
                    this.$render("i-panel", { margin: { left: 'auto', right: 'auto' } },
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-vstack", { id: "emptyStack", visible: false, minHeight: 320, margin: { top: 10, bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                            this.$render("i-panel", { width: "100%", height: "100%" },
                                this.$render("i-vstack", { height: "100%", background: { color: Theme.background.main }, verticalAlignment: "center" },
                                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "center" },
                                        this.$render("i-image", { url: assets_1.default.fullPath('img/TrollTrooper.svg') }),
                                        this.$render("i-label", { caption: "No Pairs" }))))),
                        this.$render("i-vstack", { id: "infoStack", width: "100%", height: "100%" })))));
        }
    };
    ScomGroupQueuePair = __decorate([
        (0, components_3.customElements)('i-scom-group-queue-pair')
    ], ScomGroupQueuePair);
    exports.default = ScomGroupQueuePair;
});
