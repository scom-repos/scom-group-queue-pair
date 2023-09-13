export default {
    dataSchema: {
        type: 'object',
        properties: {
            tokenFrom: {
                type: 'string',
                required: true
            },
            tokenTo: {
                type: 'string',
                required: true
            }
        }
    },
    uiSchema: {
        type: 'VerticalLayout',
        elements: [
            {
                type: 'Control',
                scope: '#/properties/tokenFrom'
            },
            {
                type: 'Control',
                scope: '#/properties/tokenTo'
            }
        ]
    }
}