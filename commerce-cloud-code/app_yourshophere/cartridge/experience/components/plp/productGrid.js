const URLUtils = require('dw/web/URLUtils');
const HashMap = require('dw/util/HashMap');
/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    var model = createViewModel();
    return template(model);
};

function createViewModel() {
    var model = new HashMap();
    model = request.custom.model; // eslint-disable-line no-undef
    model.gridUrl = URLUtils.url('Search-Grid','cgid', model.httpParameter.cgid, 'pagination', true, 'viewType', )
    return model;
}

function template(model) {
    return `<wainclude url="${model.gridUrl}"/>`
}