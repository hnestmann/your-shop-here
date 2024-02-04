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
    const Resource = require('dw/web/Resource');
    const cachedRows = rowCache.get(this.name + JSON.stringify(this.scope), () => {
        const rowMap = {};
        const rowArray = [];
        Object.keys(this.definition).forEach((fieldId) => {
            const field = this.definition[fieldId];
            field.fieldId = fieldId;

            field.label = Resource.msg(`forms.labels.${fieldId}`, 'translations', null);
            if (field.rowId) {
                if (!rowMap[field.rowId]) {
                    rowMap[field.rowId] = [];
                    rowArray.push(rowMap[field.rowId]);
                }

                rowMap[field.rowId].push(field);
            } else {
                rowMap[fieldId] = [field];
                rowArray.push(rowMap[fieldId]);
            }
        });
        return rowArray;
    });

    return cachedRows;
};

Form.prototype.validate = function (parameterMap) {
    const invalidFields = [];
    Object.keys(this.definition).forEach((fieldId) => {
        const field = this.definition[fieldId];

        if (field.validation && !field.validation(parameterMap[fieldId].stringValue)) {
            invalidFields.push(fieldId);
        }
    });
    return { ok: invalidFields.length === 0, invalidFields };
};

Form.prototype.persist = function (businessObject, parameterMap) {
    Object.keys(this.definition).forEach((fieldId) => {
        const field = this.definition[fieldId];

        if (field.mapping && field.mapping.persist) {
            field.mapping.persist(businessObject, parameterMap[fieldId].stringValue);
        } else {
            businessObject[fieldId] = parameterMap[fieldId].stringValue;
        }
    });
};

Form.prototype.rowValues = function (businessObject, parameterMap) {
    const result = {};
    Object.keys(this.definition).forEach((fieldId) => {
        const field = this.definition[fieldId];

        if (field.mapping && field.mapping.load) {
            result[fieldId] = field.mapping.load(businessObject);
        } else {
            result[fieldId] = businessObject[fieldId];
        }
    });
    const rows = JSON.parse(JSON.stringify(this.rows()));
    rows.forEach((row) => row.forEach((field) => {
        field.value = result[field.fieldId];
    }));
    return rows;
};

module.exports = Form;
