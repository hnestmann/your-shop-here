/**
 * Renders a Product productImages Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    return require('partials').html('pdp/images')({
        product: request.custom.model.product,
        settings: context.content,
    });
};
