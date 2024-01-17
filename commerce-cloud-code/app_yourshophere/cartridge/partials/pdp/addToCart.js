exports.createModel = function createModel(product) {
    const Resource = require('dw/web/Resource');

    const model = {
        id: product.ID,
        disabled: false,
        title: Resource.msg('add_to_bag', 'translations', null),
    }; // eslint-disable-line no-undef

    // @todo use template function
    return model;
};

/**
 * Renders a Product productName Component
 *
 */
exports.template = model => `
    <button class="add-to-cart btn btn-primary"
        data-pid="${model.id}"
        ${model.disabled ? 'disabled' : ''}>
        ${model.title}
    </button>`;
