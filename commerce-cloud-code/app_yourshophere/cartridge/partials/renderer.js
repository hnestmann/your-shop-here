/**
 * Renders the given component
 * 
 * @param {String} id ID of the component (i.e. 'product/name')
 * @returns 
 */
exports.render = (id) => {
    return (params) => {
        const partial = require(`*/cartridge/partials/${id}`);
        let model;
        const Logger = require('api/logger');
        try {
            model = partial.createModel(params)
        } catch (e) {
            Logger.error(`Model creation for partial '${id}' failed. Reason: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
        }

        try {
            response.getWriter().print(partial.template(model));
        } catch (e) {
            Logger.error(`Rendering for partial '${id}' failed. Reason: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
        }
        return '';
    }
};