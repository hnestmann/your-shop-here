module.exports = [{
    scope: { country: 'IE' },
    fields: {
        // @todo get realistic regexps
        firstName: {
            type: 'string',
            rowid: 'name',
            validation: (fieldValue) => /[a-zA-Z]{1,20}/.test(fieldValue),
        },
        lastName: {
            type: 'string',
            rowid: 'name',
            validation: (fieldValue) => /[a-zA-Z]{1,20}/.test(fieldValue),
        },
        houseNumber: {
            type: 'string',
            rowid: 'street_house_no',
            mapping: (fieldValue, businessObject) => { businessObject.custom.houseNumber = fieldValue; },
            validation: (fieldValue) => /[a-zA-Z]{1,20}/.test(fieldValue),
        },
        address1: {
            type: 'string',
            rowid: 'street_house_no',
            validation: (fieldValue) => /[0-9]{1,2}/.test(fieldValue),
        },
        address2: {
            type: 'string',
            validation: (fieldValue) => /[0-9]{1,2}/.test(fieldValue),
        },
        postalCode: {
            type: 'string',
            rowid: 'postal_city',
            validation: (fieldValue) => /[0-9]{5}/.test(fieldValue),
        },
        city: {
            type: 'string',
            rowid: 'postal_city',
            validation: (fieldValue) => /[a-zA-Z]{1,20}/.test(fieldValue),
        },
    },
}];
