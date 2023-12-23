/**
 * Renders Product Search Refinement Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    try {
        return renderComponent(context)
    } catch (e) {
        const Logger = require('api/Logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent(context) {
    const URLUtils = require('dw/web/URLUtils');
    const url = URLUtils.url('Search-Refinements');
    // @todo move into method/module
    const queryParameters = request.custom.model.httpParameter;
    Object.keys(queryParameters)
        .filter((key) => (key.indexOf('cgid') > -1 || key.indexOf('pref') > -1 
            || key.indexOf('q') > -1 || key.indexOf('pm') > -1))
        .forEach((key) => {
        url.append(key,queryParameters[key])      
    });

    return `<wainclude url="${url.toString()}">`;
};
