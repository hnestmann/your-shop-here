const Logger = require('dw/system/Logger');
const MyLogger = {};
const logCache = require('dw/system/CacheMgr').getCache('LogCache');

function unseal(object) {
    return JSON.parse(JSON.stringify(object))
}

MyLogger.__noSuchMethod__ = function (methodName, methodArgs) {
    if (methodName === 'getLogger') {
        return new MyLogger(methodArgs[0], methodArgs[1])
    }
    let stack
    try {
        throw new Error('')
    } catch (e) {
        stack = e.stack;
    }
    var mainRequestID = request.requestID.match(/(.*)-([0-9]-[0-9]{2})$/)
    var existingMessages = unseal(logCache.get('entry') || []);
    existingMessages.push({ 
        requestId: mainRequestID[1],
        nesting: mainRequestID[2],
        url: request.httpURL.toString(), 
        level: methodName, 
        message: methodArgs.map((arg) => arg.toString()).join(','), 
        stack: stack.split('\n').map(entry => entry.replace('\tat ','')).splice(1)
    });
    logCache.put('entry', existingMessages)
    return Logger[methodName].apply(Logger, methodArgs);
}
module.exports = MyLogger;