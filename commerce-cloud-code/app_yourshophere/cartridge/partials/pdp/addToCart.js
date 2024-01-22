exports.createModel = function createModel(product) {
    const Resource = require('dw/web/Resource');
    const URLUtils = require('dw/web/URLUtils');

    const model = {
        id: product.ID,
        disabled: false,
        title: Resource.msg('add_to_bag', 'translations', null),
        url: URLUtils.url('Cart-Add', 'pid', product.ID, 'hx', 'main'),
    }; // eslint-disable-line no-undef

    // @todo use template function
    return model;
};

/**
 * Renders a Product productName Component
 *
 */
exports.template = model => `
    <div id="cart-modal" />
    <button class="add-to-cart btn btn-primary"
        data-pid="${model.id}"
        ${model.disabled ? 'disabled' : ''}
        hx-get="${model.url}"
        hx-target="#cart-modal"
        hx-include="form[name=pdp-actions]"
        hx-trigger="click"
        hx-indicator=".progress">
        ${model.title}
    </button>`;
