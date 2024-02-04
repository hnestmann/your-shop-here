
const server = require('server');

server.get('Show', (req, res, next) => {
    res.page('checkout');
    next();
});

server.post('SaveAddresses', (req, res, next) => {
    const BasketMgr = require('dw/order/BasketMgr');
    const Transaction = require('dw/system/Transaction');
    const HookMgr = require('dw/system/HookMgr');
    Transaction.wrap(() => {
        const basket = BasketMgr.getCurrentOrNewBasket();
        HookMgr.callHook('dw.order.calculate', 'calculate', basket);
    });
    const hxPartial = request.httpParameterMap.hxpartial;
    if (hxPartial.submitted) {
        res.renderPartial(hxPartial.stringValue);
    } else {
        res.page('checkout');
    }

    next();
});

module.exports = server.exports();
