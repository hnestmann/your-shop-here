function callHook(extensionPoint, functionName, args) {
    var HookManager = require('dw/system/HookMgr');
    return HookManager.hasHook(extensionPoint) ?  HookManager.callHook(extensionPoint, functionName, args) : '';
}

module.exports.callHook = callHook;