function Form(name) {
    this.name = name;
    const Locale = require('dw/util/Locale');
    this.scope = {};
    this.scope.country = Locale.getLocale(request.locale).getCountry();

    this.scope.language = Locale.getLocale(request.locale).getLanguage();

    require('*/cartridge/forms/address').forEach((definition) => {
        if (!this.definition) {
            this.definition = definition.fields;
        }
        // @todo add language support for lookup and define

        if (this.scope.country === definition.scope.county) {
            this.definition = definition.fields;
        }
    });
}

Form.prototype.rows = function () {
    const CacheMgr = require('dw/system/CacheMgr');
    const rowCache = CacheMgr.getCache('Form');
    const cachedRows = rowCache.get(this.name + JSON.stringify(this.scope), () => {
        const rowMap = {};
        const rowArray = [];
        Object.keys(this.definition).forEach((fieldId) => {
            const field = this.definition[fieldId];
            field.fieldId = fieldId;
            if (field.rowid) {
                if (!rowMap[field.rowid]) {
                    rowMap[field.rowid] = [];
                    rowArray.push(rowMap[field.rowid]);
                }

                rowMap[field.rowid].push(field);
            } else {
                rowMap[fieldId] = [field];
                rowArray.push(rowMap[fieldId]);
            }
        });
        return rowArray;
    });

    return cachedRows;
};

module.exports = Form;
