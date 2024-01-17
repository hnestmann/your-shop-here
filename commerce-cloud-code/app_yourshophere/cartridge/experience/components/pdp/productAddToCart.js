
/**
 * Renders a Product productName Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    return require('*/cartridge/partials/renderer').html('pdp/addToCart')(request.custom.model.product);
};
