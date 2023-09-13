import { ControlElement, customElements, Module, Panel, Styles, VStack } from '@ijstech/components';
import ScomDappContainer from '@scom/scom-dapp-container';
import Assets from './assets';
const Theme = Styles.Theme.ThemeVars;

interface ScomGroupQueuePairElement extends ControlElement {
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