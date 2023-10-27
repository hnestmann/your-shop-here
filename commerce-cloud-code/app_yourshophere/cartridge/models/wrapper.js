module.exports = function(instance, apiObject){
    instance.object = apiObject;
    instance.__noSuchMethod__ = function (methodName, methodArgs) {
        if (methodName in this.object && 'function' === typeof this.object[methodName]) {
            return this.object[methodName].apply(this.object, methodArgs);
        }
        // If the method cannot be found.
        dw.system.Logger.error('Method "{0}" does not exist for {1}',methodName,this.object.class);
        throw new TypeError();
    }
    Object.keys(apiObject).forEach(key => {
        instance[key] = apiObject[key]
    }) 
}