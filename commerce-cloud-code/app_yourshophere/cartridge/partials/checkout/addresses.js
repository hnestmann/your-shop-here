
exports.createModel = function createModel() {
    const BasketMgr = require('dw/order/BasketMgr');
    const basket = BasketMgr.getCurrentOrNewBasket();
    const URLUtils = require('dw/web/URLUtils');
    const model = {};
    model.filled = false;
    model.actionUrl = URLUtils.url('Checkout-SaveAddresses');

    // self-reference, so Checkout Save Addresses comes back here.
    // If you base your own pd components on this, dont copy and paste this without swapping the partial
    model.hxActionUrl = URLUtils.url('Checkout-SaveAddresses').append('hxpartial', 'checkout/addresses');
    const Form = require('api/Form');
    model.rows = new Form('address').rows();
    if (basket.billingAddress) {
        model.filled = true;
        model.address = basket.billingAddress;
    }
    return model;
};

function input(field) {
    return `<input type="${field.type}" name="${field.fieldId}"/>`;
}

function inputRow(row) {
    return `<div class="grid">
    ${(row).map((field) => input(field)).join('')}
    </div>`;
}

function form(model) {
    const fields = model.rows.map((row) => inputRow(row)).join('');
    return `<form hx-post="${model.hxActionUrl}" hx-target="this" hx-swap="outerHTML" method="post" action="${model.actionUrl}">
      ${fields}
      <button>Submit</button
      </form>`;
}

function miniaddress(model) {
    return model.address.address1;
}

exports.template = (model) => (!model.filled ? form(model) : miniaddress(model));
