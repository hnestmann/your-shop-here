/**
 * Renders a Product Quantity And Optionts Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    return require('partials').html('pdp/options')({
        product: request.custom.model.product,
        settings: context.content,
    });
};

