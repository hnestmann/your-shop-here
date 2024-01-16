function renderComponent() {
    const product = request.custom.model.product;

    // @TODO implement options
    const model = {
        hasOptions: product.optionProduct,
    };
    return model.hasOptions ? 'Wow, this product has options' : '';
}

/**
 * Renders a Product Quantity And Optionts Component
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
};

