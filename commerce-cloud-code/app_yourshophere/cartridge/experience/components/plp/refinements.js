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

    const HttpSearchParams = require('api/URLSearchParams');
    const searchParams = (new HttpSearchParams(request.custom.model.httpParameter)).allowList(require('api/ProductSearchModel').constants.urlAllowListBase);
    searchParams.sort();
    const queryString = searchParams.toString();

    const urlString = `${url.toString()}?${queryString}`;

    return `<wainclude url="${urlString}">`;
};
