/**
 * Renders a Product productName Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    try {
        return renderComponent()
    } catch (e) {
        const Logger = require('api/Logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent() {
    const hookMgr = require('*/cartridge/utils/hookMgr');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef

    return `
        ${hookMgr.callHook('wishlist.template', 'productIcon', model.product.ID)}
        ${hookMgr.callHook('wishlist.template', 'refreshState', model.product.ID)}
    `;
};
