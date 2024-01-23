'use strict';

const server = require('server');

server.use('Show', (req, res, next) => {
    res.page('cart', {});
    next();
});

server.use('Add', (req, res, next) => {
    const BasketMgr = require('dw/order/BasketMgr');
    const Transaction = require('dw/system/Transaction');
    const HookMgr = require('dw/system/HookMgr');
    const ProductMgr = require('dw/catalog/ProductMgr');

    const basket = BasketMgr.getCurrentOrNewBasket();

    const pid = req.httpParameterMap.pid.stringValue;
    const qty = req.httpParameterMap.qty.submitted ? req.httpParameterMap.qty.doubleValue : 1;
    let lineitem;
    if (pid) {
        const variationModel = require('*/cartridge/partials/pdp/variationAttributes').getVariationModel(ProductMgr.getProduct(pid));

        const product = variationModel.selectedVariant;

        lineitem = basket.getProductLineItems(product.ID).toArray().pop();
        Transaction.wrap(() => {
            if (!lineitem) {
                lineitem = basket.createProductLineItem(product.ID, basket.defaultShipment);
                lineitem.quantityValue = qty;
            } else {
                lineitem.quantityValue += qty;
            }
            // @todo fill mini cart session.privacy.cartItemCount; session.privacy.cartItemValue
            HookMgr.callHook('dw.order.calculate', 'calculate', basket);
        });
    } else {
        // @todo error handling
    }

    if (req.httpParameterMap.hx.stringValue === 'cart-modal') {
        res.renderPartial('cart/addtocart', { object: { lineitem } });
    } else {
        res.redirect('Cart-Show');
    }
    next();
});

server.use('Delete', (req, res, next) => {
    // @todo confirm with a dialog
    const BasketMgr = require('dw/order/BasketMgr');
    const Transaction = require('dw/system/Transaction');
    const HookMgr = require('dw/system/HookMgr');

    const basket = BasketMgr.getCurrentBasket();
    const uuid = req.httpParameterMap.id.stringValue;
    let lineitem;
    if (uuid && basket) {
        lineitem = basket.getProductLineItems().toArray().filter(item => uuid === item.UUID).pop();
        Transaction.wrap(() => {
            if (lineitem) {
                basket.removeProductLineItem(lineitem);
            }
            HookMgr.callHook('dw.order.calculate', 'calculate', basket);
        });
    } else {
        // @todo error handling
    }

    res.redirect('Cart-Show');

    next();
});

module.exports = server.exports();
