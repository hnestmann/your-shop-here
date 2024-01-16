/**
 * Renders a Product productBreadcrumbs Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */

function renderComponent() {
    const model = request.custom.model; // eslint-disable-line no-undef

    return `<a href="">Home</a> > <a href="">Category</a> > <a href="">${model.product.name}</a>`;
}

exports.render = function render() {
    try {
        return renderComponent();
    } catch (e) {
        const Logger = require('api/Logger');

        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
};
