
const Site = require('dw/system/Site')
'use strict';
/**
 * Init for the color picker custom editor
 */
module.exports.init = function (editor) {
    const args = arguments;
    const req = request;
    editor.configuration.put('clientid', request.httpHeaders.get('x-dw-client-id')); // eslint-disable-line no-undef
    editor.configuration.put('siteid', Site.getCurrent().ID);
    editor.configuration.put('typefilter', ['products-in-a-category']);
};
