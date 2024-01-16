function renderComponent() {
    // const model = request.custom.model;

    // @TODO implement promotion messaging
    return 'Get 20% off';
}

/**
 * Renders a Product productPromo Component
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
};
