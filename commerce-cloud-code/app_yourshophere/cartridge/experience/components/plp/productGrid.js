/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var model = new HashMap();

    model = request.custom.model; // eslint-disable-line no-undef

    // @todo move into method/module
    const URLUtils = require('dw/web/URLUtils');
    const url = URLUtils.url('Search-Grid');
    const queryParameters = request.custom.model.httpParameter;

    // @todo move into named function for readability
    Object.keys(queryParameters)
        .filter((key) => (key.indexOf('cgid') > -1 || key.indexOf('pref') > -1 
            || key.indexOf('q') > -1 || key.indexOf('pm') > -1))
        .forEach((key) => {
        url.append(key,queryParameters[key])      
    });
    model.gridUrl = url;

    return new Template('experience/components/plp/expgrid').render(model).text;
};
