
function hashmapToObject(hashMap) {
    return hashMap.keySet().toArray().reduce((accumulator, key) => {
        accumulator[key] = hashMap[key];
        return accumulator;
    }, {});
}

function makeSettingsAvailableInRemoteInclude(context) {
    const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

    const CustomObjectMgr = require('dw/object/CustomObjectMgr');
    let co = CustomObjectMgr.getCustomObject('ComponentSettings', context.component.ID);

    
    if (!co || PageRenderHelper.isInEditMode()) {
        const cache = require('dw/system/CacheMgr').getCache('ComponentSettings');
        const componentSettings = hashmapToObject(context.content);
        try {
            const Transaction = require('dw/system/Transaction');
            Transaction.wrap(() => {
                if (!co) {
                    co = CustomObjectMgr.createCustomObject('ComponentSettings', context.component.ID);
                }
                co.custom.settingsJSON = JSON.stringify(componentSettings);
            });
        } catch (e) {
            const Logger = require('api/Logger');
            Logger.warn(`Unable to create settings custom object: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
        }
        cache.put(context.component.ID, componentSettings);
    }
}

/**
 * Renders a Product Description Component
 *
 * @param {dw.experience.ComponentScriptContext} context The component context
 * @returns {string} The template to be displayed
 */
exports.render = function render(context) {
    try {
        makeSettingsAvailableInRemoteInclude(context);
        require('api/ResponseCache').apply('DefaultCache');

        return renderComponent(context);
    } catch (e) {
        const Logger = require('api/Logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
    }
};

function renderComponent(context) {
    const model = createViewModel(context);
    return template(model);
}

function createViewModel(context) {
    const HashMap = require('dw/util/HashMap');
    let model = new HashMap();
    model = request.custom.model; // eslint-disable-line no-undef
    const URLUtils = require('dw/web/URLUtils');

    const HttpSearchParams = require('api/URLSearchParams');
    const searchParams = (new HttpSearchParams(request.custom.model.httpParameter)).allowList(require('api/ProductSearchModel').constants.urlAllowListAll);
    searchParams.sort();
    const queryString = searchParams.toString();

    const url = URLUtils.url('Search-Grid');
    url.append('component', context.component.ID);

    model.gridUrl = `${url.toString()}&${queryString}`;
    return model;
}

function template(model) {
    return `<wainclude url="${model.gridUrl}"/>`;
}
