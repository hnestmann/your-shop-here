function renderComponent(context) {
    const product = request.custom.model.product;
    const model = {
        images: product.getImages(context.content.viewType).toArray()
            .slice(0, context.content.imageCount).map(image => ({
                url: image.url,
                alt: image.alt,
            })),
    };

    return model.images.map(image => `<img src="${image.url}" alt="${image.alt}">`).join('\n');
}

/**
 * Renders a Product productImages Component
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
};
