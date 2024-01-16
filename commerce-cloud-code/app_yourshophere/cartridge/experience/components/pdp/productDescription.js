function renderComponent(context) {
    const product = request.custom.model.product;
    const model = {
        descriptionTitle: context.content.descriptionTitle,
        description: (context.content.shortOrLongDescription === 'Short_Description') ? product.shortDescription : product.longDescription,
        divExpandedOrCompress: context.content.divExpandedOrCompress,

    };

    return `${model.descriptionTitle?`<h2>${model.descriptionTitle}</h2>`:''}
            <div class="description">${model.description}</div>`;
}

/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    try {
        return renderComponent(context);
    } catch (e) {
        const Logger = require('api/Logger');

        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
    }
    return '';
};
