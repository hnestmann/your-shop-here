var modelDefinitionCache = require('dw/system/CacheMgr').getCache('Models');


module.exports = function (type, instance, apiObject) {
    instance.object = apiObject;
    instance.__noSuchMethod__ = function (methodName, methodArgs) {
        if (methodName in this.object && 'function' === typeof this.object[methodName]) {
            return this.object[methodName].apply(this.object, methodArgs);
        }
        // If the method cannot be found.
        dw.system.Logger.error('Method "{0}" does not exist for {1}', methodName, this.object.class);
        throw new TypeError();
    }

    modelDefinitionCache
    let keys = modelDefinitionCache.get(type, () => {
        let cacheableKeys = [];
        if ('describe' in apiObject) {
            const definition = apiObject.describe();
            let hasCustom = false;
            cacheableKeys = definition.getAttributeDefinitions().toArray().filter(attributeDefinition => {
                if (!attributeDefinition.system) {
                    hasCustom = true;
                }
                return attributeDefinition.system;
            }).map(attributeDefinition => attributeDefinition.ID);
            if (hasCustom) {
                cacheableKeys.push('custom')
            }
        } else {
            cacheableKeys = Object.keys(apiObject).filter(key => {
                var exportKey = false;
                try {
                    if (typeof apiObject[key] !== 'function') {
                        exportKey = true;
                    }
                } catch (e) {
                    dw.system.Logger.debug('Cannot access property {0} of {1} - {2}', key, type, e)
                }
                return exportKey;
            });
        }
        return cacheableKeys;
    });
    keys.forEach(key => {
        Object.defineProperty(instance, key, {
            get: function () {
                return apiObject[key]
            }
        });
    })


}