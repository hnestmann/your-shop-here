function renderComponent() {
    const product = request.custom.model.product;
    const model = {
        id: product.ID,
        disabled: false,
        title: dw.web.Resource.msg('add_to_bag', 'translations', null)
    }; // eslint-disable-line no-undef

    return `<button class="add-to-cart btn btn-primary"
                data-pid="${model.id}"
                ${model.disabled ? 'disabled' : ''}>
                ${model.title}
            </button>`;
}

/**
 * Renders a Product productName Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render() {
    try {
        return renderComponent();
    } catch (e) {
        const Logger = require('api/Logger');

        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
    }

    return '';
};
