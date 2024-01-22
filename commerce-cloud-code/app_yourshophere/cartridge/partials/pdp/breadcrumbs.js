exports.createModel = function createModel(product) {
    const model = {
        name: product.name,
    };

    return model;
};

exports.template = model => `<a href="">Home</a> > <a href="">Category</a> > <a href="">${model.name}</a>`;
