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
    const cmp = require(`*/cartridge/partials/${id}`);
    var model;
    try{
        model = cmp.createModel(params)
    }catch(e){
        require('dw/system/Logger').error(`Model creation for component '${id}' failed. Reason: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
    try{
        response.getWriter().print(cmp.template(model));
    }catch(e){
        require('dw/system/Logger').error(`Rendering for component '${id}' failed. Reason: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
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