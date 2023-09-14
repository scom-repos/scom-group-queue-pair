import { ControlElement, customElements, Module, Panel, Styles, VStack } from '@ijstech/components';
import ScomDappContainer from '@scom/scom-dapp-container';
import Assets from './assets';
import { IGroupQueuePair } from './interface';
import formSchema from './formSchema';
import { getTokenIcon, getTokenSymbol, State } from './store/index';
import configData from './data.json';
import { groupQueuePairStyle } from './index.css';
import { tokenStore } from '@scom/scom-token-list';
const Theme = Styles.Theme.ThemeVars;

interface ScomGroupQueuePairElement extends ControlElement {
    lazyLoad?: boolean;
    chainId?: number;
    tokenFrom?: string;
    tokenTo?: string;
    defaultChainId?: number;
    showHeader?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-group-queue-pair']: ScomGroupQueuePairElement;
        }
    }
}

@customElements('i-scom-group-queue-pair')
export default class ScomGroupQueuePair extends Module {
    private dappContainer: ScomDappContainer;
    private loadingElm: Panel;
    private emptyStack: VStack;
    private infoStack: VStack;
    private state: State;
    private _data: IGroupQueuePair = {
        chainId: 0,
        tokenFrom: '',
        tokenTo: ''
    };
    tag: any = {};

    private get chainId() {
        return this.state.getChainId();
    }

    private get rpcWallet() {
        return this.state.getRpcWallet();
    }

    async init() {
        this.isReadyCallbackQueued = true;
        super.init();
        this.state = new State(configData);
        const lazyLoad = this.getAttribute('lazyLoad', true, false);
        if (!lazyLoad) {
            const chainId = this.getAttribute('chainId', true, 0);
            const tokenFrom = this.getAttribute('tokenFrom', true, '');
            const tokenTo = this.getAttribute('tokenTo', true, '');
            const defaultChainId = this.getAttribute('defaultChainId', true);
            const showHeader = this.getAttribute('showHeader', true);
            const data: IGroupQueuePair = {
                chainId,
                tokenFrom,
                tokenTo,
                defaultChainId,
                showHeader
            }
            await this.setData(data);
        }
        this.loadingElm.visible = false;
        this.isReadyCallbackQueued = false;
        this.executeReadyCallback();
    }

    private renderPair() {
        this.infoStack.clearInnerHTML();
        const { chainId, tokenFrom, tokenTo } = this._data;
        if (!chainId || !tokenFrom || !tokenTo) {
            this.infoStack.visible = false;
            this.emptyStack.visible = true;
        } else {
            this.infoStack.appendChild(
                <i-vstack class={groupQueuePairStyle} horizontalAlignment="center" verticalAlignment="center">
                    <i-label padding={{ top: 16 }} caption={`${getTokenSymbol(chainId, tokenFrom)} to ${getTokenSymbol(chainId, tokenTo)}`} font={{ bold: true }} />
                    <i-hstack padding={{ bottom: 16, top: 16, left: 16, right: 16 }} horizontalAlignment="center" verticalAlignment="center">
                        <i-image width={75} url={getTokenIcon(chainId, tokenFrom)} />
                        <i-image width={75} class="icon-right" url={getTokenIcon(chainId, tokenTo)} />
                    </i-hstack>
                </i-vstack>
            )
            this.infoStack.visible = true;
            this.emptyStack.visible = false;
        }
    }

    private _getActions(category?: string) {
        const actions: any[] = [];
        if (category && category !== 'offers') {
            actions.push({
                name: 'Edit',
                icon: 'edit',
                command: (builder: any, userInputData: any) => {
                },
                userInputDataSchema: formSchema.dataSchema,
                userInputUISchema: formSchema.uiSchema,
                customControls: formSchema.customControls(this.rpcWallet?.instanceId)
            })
        }
    }

    getConfigurators() {
        return [
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: this._getActions.bind(this),
                getData: this.getData.bind(this),
                setData: async (data: any) => {
                    await this.setData(data);
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ]
    }

    private getData() {
        return this._data;
    }

    private async setData(data: IGroupQueuePair) {
        this._data = data;
        tokenStore.updateTokenMapData(this._data.chainId || this.chainId);
        this.renderPair();
    }

    async getTag() {
        return this.tag;
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private setTag(value: any) {
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
        return (
            <i-scom-dapp-container id="dappContainer">
                <i-panel background={{ color: Theme.background.main }}>
                    <i-panel margin={{ left: 'auto', right: 'auto' }}>
                        <i-vstack id="loadingElm" class="i-loading-overlay">
                            <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
                                <i-icon
                                    class="i-loading-spinner_icon"
                                    image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
                                />
                                <i-label
                                    caption="Loading..." font={{ color: '#FD4A4C', size: '1.5em' }}
                                    class="i-loading-spinner_text"
                                />
                            </i-vstack>
                        </i-vstack>
                        <i-vstack id="emptyStack" visible={false} minHeight={320} margin={{ top: 10, bottom: 10 }} verticalAlignment="center" horizontalAlignment="center">
                            <i-panel width="100%" height="100%">
                                <i-vstack height="100%" background={{ color: Theme.background.main }} verticalAlignment="center">
                                    <i-vstack gap={10} verticalAlignment="center" horizontalAlignment="center">
                                        <i-image url={Assets.fullPath('img/TrollTrooper.svg')} />
                                        <i-label caption="No Pairs" />
                                    </i-vstack>
                                </i-vstack>
                            </i-panel>
                        </i-vstack>
                        <i-vstack id="infoStack" width="100%" height="100%"></i-vstack>
                    </i-panel>
                </i-panel>
            </i-scom-dapp-container>
        )
    }
}