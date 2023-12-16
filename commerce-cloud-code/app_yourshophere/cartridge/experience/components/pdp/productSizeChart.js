/**
 * Renders a Product Rating Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    try {
        return renderComponent()
    } catch (e) {
        const Logger = require('model').get('logger');
        Logger.error('Exception on rendering page designer component: ' + e);
    }
}

function renderComponent() {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef

    return new Template('experience/components/more_pd/pdp/productSizeChart').render(model).text;
};
