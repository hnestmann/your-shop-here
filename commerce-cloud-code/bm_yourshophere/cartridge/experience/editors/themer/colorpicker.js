
'use strict';
/**
 * Init for the color picker custom editor
 */
module.exports.init = function (editor) {
    var args = arguments;
    var req = request;
    editor.configuration.put('clientid', request.httpHeaders.get('x-dw-client-id')); // eslint-disable-line no-undef
    editor.configuration.put('siteid', Site.getCurrent().ID);
    editor.configuration.put('typefilter', ['products-in-a-category']);
};
