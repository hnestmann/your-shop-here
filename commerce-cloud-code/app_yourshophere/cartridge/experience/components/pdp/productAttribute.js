/**
 * Renders a Product Attribute. Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef

    model.display = {
        attributeTitle: context.content.attributeTitle,
        attributeID: context.content.attributeID,
        divExpandedOrCompress: context.content.divExpandedOrCompress
    };

    return new Template('experience/components/more_pd/pdp/productAttribute').render(model).text;
};