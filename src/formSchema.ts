import ScomNetworkPicker from '@scom/scom-network-picker';
import ScomTokenInput from "@scom/scom-token-input";
import { tokenStore } from "@scom/scom-token-list";

export default {
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
    customControls(rpcWalletId: string) {
        let networkPicker: ScomNetworkPicker;
        let tokenFromInput: ScomTokenInput;
        let tokenToInput: ScomTokenInput;
        const setTokenData = (control: ScomTokenInput, value: string) => {
            if (!value) {
                const chainId = networkPicker?.selectedNetwork?.chainId;
                const tokens = tokenStore.getTokenList(chainId);
                let token = tokens.find(token => !token.address);
                control.token = token;
            } else {
                control.address = value;
            }
        };
        return {
            '#/properties/chainId': {
                render: () => {
                    networkPicker = new ScomNetworkPicker(undefined, {
                        type: 'combobox',
                        networks: [1, 56, 137, 250, 97, 80001, 43113, 43114].map(v => { return { chainId: v } }),
                        onCustomNetworkSelected: () => {
                            const chainId = networkPicker.selectedNetwork?.chainId;
                            tokenFromInput.chainId = chainId;
                            tokenToInput.chainId = chainId;
                        }
                    });
                    return networkPicker;
                },
                getData: (control: ScomNetworkPicker) => {
                    return control.selectedNetwork?.chainId;
                },
                setData: (control: ScomNetworkPicker, value: number) => {
                    control.setNetworkByChainId(value);
                    if (tokenFromInput) tokenFromInput.chainId = value;
                    if (tokenToInput) tokenToInput.chainId = value;
                }
            },
            '#/properties/tokenFrom': {
                render: () => {
                    tokenFromInput = new ScomTokenInput(undefined, {
                        type: 'combobox',
                        isBalanceShown: false,
                        isBtnMaxShown: false,
                        isInputShown: false
                    });
                    tokenFromInput.rpcWalletId = rpcWalletId;
                    const chainId = networkPicker?.selectedNetwork?.chainId;
                    if (chainId && tokenFromInput.chainId !== chainId) {
                        tokenFromInput.chainId = chainId;
                    }
                    return tokenFromInput;
                },
                getData: (control: ScomTokenInput) => {
                    return control.token?.address || "";
                },
                setData: setTokenData
            },
            '#/properties/tokenTo': {
                render: () => {
                    tokenToInput = new ScomTokenInput(undefined, {
                        type: 'combobox',
                        isBalanceShown: false,
                        isBtnMaxShown: false,
                        isInputShown: false
                    });
                    tokenToInput.rpcWalletId = rpcWalletId;
                    const chainId = networkPicker?.selectedNetwork?.chainId;
                    if (chainId && tokenToInput.chainId !== chainId) {
                        tokenToInput.chainId = chainId;
                    }
                    return tokenToInput;
                },
                getData: (control: ScomTokenInput) => {
                    return control.token?.address || "";
                },
                setData: setTokenData
            }
        }
    }
}