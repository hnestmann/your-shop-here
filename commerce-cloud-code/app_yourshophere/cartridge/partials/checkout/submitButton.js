
exports.createModel = function createModel(input) {
    const BasketMgr = require('dw/order/BasketMgr');
    const basket = BasketMgr.getCurrentOrNewBasket();
    const URLUtils = require('dw/web/URLUtils');
    const model = {};
    // self-reference, so Checkout Save Addresses comes back here.
    session.privacy.submitPartialId = 'checkout/submitButton';

    model.actionUrl = URLUtils.url('Checkout-Submit');
    const hasShippingmethod = !!basket.defaultShipment.shippingMethod;
    const hasBillingAddress = !!basket.billingAddress;
    const hasShippingAddress = !!basket.defaultShipment.shippingAddress;
    model.isReady = hasBillingAddress && hasShippingAddress && hasShippingmethod && hasPaymentMethod;
    model.outOfBandSwap = input.outOfBandSwap;
    return model;
};

exports.template = function (model) {
    return `<form method="post" id="submitOrder" ${model.outOfBandSwap ? 'hx-swap-oob="outerHTML"' : ''} action="${model.actionUrl}">
      <button ${!model.isReady ? 'disabled' : ''}>Submit Order</button>
    </form>`;
};
