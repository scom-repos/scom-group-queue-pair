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
define("@scom/scom-group-queue-pair", ["require", "exports", "@ijstech/components", "@scom/scom-group-queue-pair/assets.ts"], function (require, exports, components_2, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomGroupQueuePair = class ScomGroupQueuePair extends components_2.Module {
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.infoStack.visible = false;
            this.emptyStack.visible = true;
            this.loadingElm.visible = false;
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
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
        (0, components_2.customElements)('i-scom-group-queue-pair')
    ], ScomGroupQueuePair);
    exports.default = ScomGroupQueuePair;
});
