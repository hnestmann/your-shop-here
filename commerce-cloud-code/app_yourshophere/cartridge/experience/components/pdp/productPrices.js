function renderComponent() {
    const StringUtils = require('dw/util/StringUtils');

    const model = request.custom.model; // eslint-disable-line no-undef

    // @todo implement proper price logic
    const product = model.product.master ? model.product.variants[0] : model.product;

    return `${StringUtils.formatMoney(product.priceModel.price)}`;
}

/**
 * Renders a Product productPrices Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    try {
        return renderComponent();
    } catch (e) {
        const Logger = require('api/Logger');

        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
};
