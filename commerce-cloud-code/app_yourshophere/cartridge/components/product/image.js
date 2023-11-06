exports.createModel = (tileProduct) => {
    return {
        largeUrl: tileProduct.product.getImages('large')[0].url,
        name: tileProduct.product.name,
        width: '300'
    };
}

exports.template = (model) => `<img alt="${model.name}" src="${model.largeUrl}?sw=${model.width}" />`;