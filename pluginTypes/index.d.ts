/// <amd-module name="@scom/scom-group-queue-pair/assets.ts" />
declare module "@scom/scom-group-queue-pair/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-group-queue-pair" />
declare module "@scom/scom-group-queue-pair" {
    import { ControlElement, Module } from '@ijstech/components';
    interface ScomGroupQueuePairElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-group-queue-pair']: ScomGroupQueuePairElement;
            }
        }
    }
    export default class ScomGroupQueuePair extends Module {
        private dappContainer;
        private loadingElm;
        private emptyStack;
        private infoStack;
        init(): Promise<void>;
        render(): any;
    }
}
