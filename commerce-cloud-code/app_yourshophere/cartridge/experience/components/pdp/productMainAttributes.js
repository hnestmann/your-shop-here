function renderComponent() {
    const product = request.custom.model.product;
    const variationModel = product.variationModel;

    const model = {
        variationAttributes: variationModel.productVariationAttributes.toArray().map((attribute =>
            ({
                id: attribute.ID,
                name: attribute.displayName,
                values: variationModel.getAllValues(attribute).toArray().map(value => ({
                    id: value.ID,
                    value: value.value,
                    displayValue: value.displayValue,
                })),
            }))),
    };

    return `<ul>
                ${model.variationAttributes.map(attribute => `
                <li>${attribute.name}
                    <ul>
                        ${attribute.values.map(value => `
                        <li>${value.displayValue}</li>
                        `).join('')}
                    </ul>
                </li>
                `).join('')}
            </ul>`;
}

/**
 * Renders a Product productMainAttributes Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    try {
        return renderComponent();
    } catch (e) {
        const Logger = require('api/Logger');

        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
    }

    return '';
};
