const CatalogMgr = require('dw/catalog/CatalogMgr');
function CategoryModel(apiCategory) {
    const wrapper = require('*/cartridge/models/wrapper.js');
    wrapper(this, apiCategory);

    Object.defineProperty(this, 'hidden', {
        get: function () {
            return !apiCategory.custom.yshShowInMenu;
        }
    });

    Object.defineProperty(this, 'children', {
        get: function () {
            return apiCategory.onlineSubCategories.toArray(0,50).map(category => new CategoryModel(category))
        }
    });
    
    Object.defineProperty(this, 'url', {
        get: function () {
            return dw.web.URLUtils.url('Search-Show','cgid', this.ID)
        }
    });
}

exports.init = function (parameter) {
    var obj = null;
    if (typeof parameter === 'string') {
        obj = CatalogMgr.getCategory(parameter);
    } else if (typeof parameter === 'object') {
        obj = parameter;
    }
    return new CategoryModel(obj);
};