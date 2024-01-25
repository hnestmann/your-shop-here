exports.createModel = function createModel(options) {
    const StringUtils = require('dw/util/StringUtils');
    const URLUtils = require('dw/web/URLUtils');

    const lineitem = options.lineitem;

    const model = {
        quantity: lineitem.quantityValue,
        text: lineitem.lineItemText,
        price: StringUtils.formatMoney(lineitem.price),
        cartUrl: URLUtils.url('Cart-Show'),
        itemCount: options.basket.productQuantityTotal,
    };

    return model;
};

// @todo get icon from skin PD page, instead hard coding here
exports.template = model => `<dialog open>
<article>
    <a href="#close"
        aria-label="Close"
        class="close"
        data-target="modal-example"
        onClick="document.getElementById('cart-modal').innerHTML=''">
    </a>
  <h3>Your product has been added to cart</h3>
  <p>
    ${model.quantity}x - ${model.text} - ${model.price}
  </p>
  <footer>
    <a href="" role="button" class="secondary" onClick="document.getElementById('cart-modal').innerHTML=''">Continue Shopping</a>
    <a href="${model.cartUrl}" role="button">Go to cart</a>
  </footer>
</article>
</dialog>
<div hx-swap-oob="innerHTML:.experience-theme-minicart">
  <a href="/on/demandware.store/Sites-YourShopHere-Site/default/Cart-Show" class="pill" role="button">
  <svg style="width:35px;" viewBox="0 0 24 24" id="cart" xmlns="http://www.w3.org/2000/svg"><g><path d="M9.3 12h11c.3 0 .7-.2.7-.6l2-7.1c.2-.5-.2-.9-.7-.9h-17l-.3-1c-.1-.6-.6-.9-1-.9H2.1C1.5 1.5 1 2 .9 2.6c0 .6.5 1.2 1.1 1.2h1.1l3.5 11.8c.1.6.6.9 1.1.9h13c.6 0 1.1-.5 1.2-1.1 0-.6-.5-1.2-1.1-1.2H9.3c-.5 0-.9-.3-1-.8-.3-.7.3-1.4 1-1.4z"></path><circle cx="9.508" cy="20.585" r="1.846"></circle><circle cx="18.508" cy="20.585" r="1.846"></circle></g></svg>
    ${model.itemCount}
  </a>
</div>`;
