const COMPONENTS = {
    product: {
        image:{},
        name:{},
        price:{},
        tile:{}
    }
}

/**
 * Renders the given component
 * 
 * @param {String} id ID of the component (i.e. 'product/name')
 * @returns 
 */
exports.render = (id) => {return (params) => {
    const cmp = require(`*/cartridge/components/${id}`);
    response.getWriter().print(cmp.template(cmp.createModel(params)));
    return '';
}};

/**
 * Returns the render methods for all components in a group
 * 
 * @param {String} componentGroup the component group, i.e. 'product'
 * @returns {Object} the render functions for each component
 */
exports.get = (componentGroup) => {
    var components = {};
    if(COMPONENTS[componentGroup]){
        Object.keys(COMPONENTS[componentGroup]).forEach((key => components[key] = exports.render(`${componentGroup}/${key}`)));
    }
    return components;
}