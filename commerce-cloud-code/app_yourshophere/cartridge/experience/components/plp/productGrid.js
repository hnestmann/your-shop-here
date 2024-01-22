const URLUtils = require('dw/web/URLUtils');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

function makeSettingsAvailableInRemoteInclude(context) {
    const CustomObjectMgr = require('dw/object/CustomObjectMgr');
    let co = CustomObjectMgr.getCustomObject('ComponentSettings', context.component.ID);

    if (!co || PageRenderHelper.isInEditMode()) {
        const cache = require('dw/system/CacheMgr').getCache('ComponentSettings');
        const remoteIncludeAccessibleSettings = {};
        context.content.keySet().toArray().forEach((key) => {
            // @todo remove this prefix. harddisk space is cheap according to danny
            if (key.indexOf('remote') === 0) {
                remoteIncludeAccessibleSettings[key] = context.content.get(key);
            }
        });
        const Transaction = require('dw/system/Transaction');
        try {
            Transaction.wrap(() => {
                if (!co) {
                    co = CustomObjectMgr.createCustomObject('ComponentSettings', context.component.ID);
                }
                co.custom.settingsJSON = JSON.stringify(remoteIncludeAccessibleSettings);
            });
        } catch (e) {
            const Logger = require('api/Logger');
            Logger.warn(`Unable to create settings custom object: ${e.message} at '${e.fileName}:${e.lineNumber}'`);
        }
        cache.put(context.component.ID, remoteIncludeAccessibleSettings);
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

function addGridParameters(url, queryParameters) {
    // @todo add pagination
    // @todo find alternative for indexOf > -1 / either it should start with these or we use includes, which misses the point if we have a single character parameter
    Object.keys(queryParameters)
        .filter((key) => (key.indexOf('cgid') > -1 
            || key.indexOf('pref') > -1
            || key.indexOf('q') > -1
            || key.indexOf('sz') > -1 
            || key.indexOf('start') > -1 
            || key.indexOf('pm') > -1))
        .forEach((key) => {
            url.append(key, queryParameters[key]);
        });
    return url;
}

function createViewModel(context) {
    let model = new HashMap();
    model = request.custom.model; // eslint-disable-line no-undef
    const URLUtils = require('dw/web/URLUtils');

    const url = addGridParameters(URLUtils.url('Search-Grid'), request.custom.model.httpParameter);
    url.append('component', context.component.ID)
    
    model.gridUrl = url;
    return model;
}

function template(model) {
    return `<wainclude url="${model.gridUrl}"/>`;
}
