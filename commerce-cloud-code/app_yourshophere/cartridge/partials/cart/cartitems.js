exports.createModel = function createModel() {
    const BasketMgr = require('dw/order/BasketMgr');
    const StringUtils = require('dw/util/StringUtils');
    const URLUtils = require('dw/web/URLUtils');

    const basket = BasketMgr.getCurrentBasket();

    if (!basket || basket.getProductQuantityTotal() === 0) {
        return {
            empty: true,
            items: [],
        };
    }

    const model = {
        empty: false,
        items: basket.productLineItems.toArray().map(item => ({
            quantity: item.quantityValue,
            text: item.lineItemText,
            price: StringUtils.formatMoney(item.price),
            deleteUrl: URLUtils.url('Cart-Delete', 'id', item.UUID).toString(),
        })),
        merchandiseTotal: StringUtils.formatMoney(basket.adjustedMerchandizeTotalPrice),
        total: StringUtils.formatMoney(basket.totalGrossPrice),
    };

    return model;
};

exports.template = model => (model.empty ? 'Your cart is empty' : `<table role="grid">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Quantity</th>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Actions</th>
    </tr>
</thead>
<tbody>
${model.items.map(item => `<tr>
        <th scope="row">1</th>
        <td>${item.quantity}</td>
        <td>${item.text}</td>
        <td>${item.price}</td>
        <td><a href="${item.deleteUrl}">Delete</a></td>
    </tr>`).join('\n')}
</tbody>
<tfoot>
    <tr>
        <th scope="col"></th>
        <td scope="col"></td>
        <td scope="col"></td>
        <td scope="col">Total</td>
        <td scope="col">${model.merchandiseTotal}</td>
    </tr>
</tfoot>
</table>`);
