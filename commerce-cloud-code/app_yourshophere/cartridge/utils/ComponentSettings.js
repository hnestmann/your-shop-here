const CacheMgr = require('dw/system/CacheMgr');
const cache = CacheMgr.getCache('ComponentSettings')
exports.get = function getComponentSettings(componentID) {
    return cache.get(componentID, () => {
        const CustomObjectMgr = require('dw/object/CustomObjectMgr');
        const customObject = CustomObjectMgr.getCustomObject('ComponentSettings', componentID);
        return JSON.parse(customObject.custom.settingsJSON);
    });
}