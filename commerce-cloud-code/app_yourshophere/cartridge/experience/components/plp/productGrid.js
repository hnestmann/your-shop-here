const URLUtils = require('dw/web/URLUtils');
const HashMap = require('dw/util/HashMap');
/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    var model = createViewModel();
    return template(model);
};

function addGridParameters(url, queryParameters) {
    // @todo add pagination
    Object.keys(queryParameters)
        .filter((key) => (key.indexOf('cgid') > -1 || key.indexOf('pref') > -1
            || key.indexOf('q') > -1 || key.indexOf('pm') > -1))
        .forEach((key) => {
            url.append(key, queryParameters[key])
        });
    return url;
}

function createViewModel() {
    var model = new HashMap();
    model = request.custom.model; // eslint-disable-line no-undef

    // @todo move into method/module
    const URLUtils = require('dw/web/URLUtils');

    const url = addGridParameters(URLUtils.url('Search-Grid'), request.custom.model.httpParameter)

    model.gridUrl = url;
    return model;
}

function template(model) {
    return `<wainclude url="${model.gridUrl}"/>`
}