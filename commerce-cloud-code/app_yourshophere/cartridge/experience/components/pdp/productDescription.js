/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    try {
        return renderComponent(context)
    } catch (e) {
        const Logger = require('model').get('logger');
        Logger.error('Exception on rendering page designer component: ' + e);
    }
}

function renderComponent(context) {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef

    model.display = {
        descriptionTitle: context.content.descriptionTitle,
        shortOrLongDescription: context.content.shortOrLongDescription,
        divExpandedOrCompress: context.content.divExpandedOrCompress

    };

    return new Template('experience/components/more_pd/pdp/productDescription').render(model).text;
};
