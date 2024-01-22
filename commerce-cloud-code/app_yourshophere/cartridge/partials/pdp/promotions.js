exports.createModel = function createModel(options) {
    const PromotionMgr = require('dw/campaign/PromotionMgr');

    // @todo cache somewhere as it is expensive
    const promotionPlan = PromotionMgr.getActiveCustomerPromotions();
    const promotions = promotionPlan.getProductPromotions(options.product).toArray();
    const model = {
        promotions: promotions.map(promotion => ({
            message: promotion.getCalloutMsg(),
        })),
    };

    return model;
};

exports.template = model => `<ul>
    ${model.promotions.map(promotion => `<li>${promotion.message}</li>`).join('\n')}
</ul>`;
