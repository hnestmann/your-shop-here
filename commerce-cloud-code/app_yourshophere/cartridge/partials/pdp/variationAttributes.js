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

    return ;
}

exports.createModel = function createModel(product) {
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

    return model;
};

/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.template = model => `${model.variationAttributes.map(attribute => `
    <div>
        <label for="va-${attribute.id}">Select ${attribute.name}</label>
        <select name="va-${attribute.id}" id="va-${attribute.id}">
            ${attribute.values.map(value => `
            <option value="${value.value}">${value.displayValue}</option>
            `).join('')}
        </select>
    </div>
`).join('')}`;
