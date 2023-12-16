/**
 * Renders a Product productImages Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    try {
        return renderComponent(context)
    } catch (e) {
        const Logger = require('model').get('logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent(context) {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef
    model.viewType = context.content.viewType;
    model.imageCount = context.content.imageCount;
    return new Template('experience/components/pdp/productimages').render(model).text;
};
