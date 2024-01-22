exports.getVariationModel = function getVariationModel(product) {
    const HttpSearchParams = require('api/URLSearchParams');

    const variationModel = product.variationModel;
    const variationParameterMap = (new HttpSearchParams(request.custom.model.httpParameter)).allowList([/dwvar_[^_]*_/]);
    variationParameterMap.forEach((value, name) => variationModel.setSelectedAttributeValue(name.split('_').pop(), value));

    return variationModel;
};

exports.createModel = function createModel(product) {
    const URLUtils = require('dw/web/URLUtils');

    const variationModel = exports.getVariationModel(product);

    const model = {
        variationAttributes: variationModel.productVariationAttributes.toArray().map(((attribute) => {
            const selectedValue = variationModel.getSelectedValue(attribute);
            return {
                id: attribute.ID,
                name: attribute.displayName,
                values: variationModel.getAllValues(attribute).toArray().map(value => ({
                    id: value.ID,
                    value: value.value,
                    displayValue: value.displayValue,
                    selected: ((selectedValue && selectedValue.value === value.value) ? 'selected' : ''),
                })),
                url: URLUtils.url('Product-Show', 'pid', variationModel.master.ID, 'hx', 'main'),
                selectName: `dwvar_${variationModel.master.ID}_${attribute.ID}`,
            };
        })),
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
        <select name="${attribute.selectName}" id="va-${attribute.id}"
            hx-get="${attribute.url}"
            hx-target="main"
            hx-include="form[name=pdp-actions]"
            hx-trigger="change"
            hx-indicator=".progress">
            ${attribute.values.map(value => `
            <option value="${value.value}" ${value.selected}>${value.displayValue}</option>
            `).join('')}
        </select>
    </div>
`).join('')}`;
