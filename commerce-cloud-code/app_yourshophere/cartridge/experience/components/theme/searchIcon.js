'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var SVG = require('*/cartridge/scripts/theming/svg.js');

/**
 * Component which renders an icon with inline search - ideally used in the main page header
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The rendered template to be displayed
 */
exports.render = function render (context) {
    try {
        return renderComponent (context)
    } catch (e) {
        const Logger = require('model').get('logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent (context) {
    var model = new HashMap();
    var content = context.content;
    model.content = content;
    if (content.icon) {
        if (content.icon) {
            var iconInfo = SVG.getInlinableContent(content.icon.file);
            model.type = iconInfo.type;
            model.content = iconInfo.content;
        }
    }

    model.componentColor = '';
    if (context.content.color) {
        model.componentColor += 'background-color: ' + context.content.color.value;
    }
    if (context.content.brightness) {
        model.componentColor += ';opacity: ' + context.content.brightness + '%';
    }

    return new Template('experience/components/decorator/searchicon').render(model).text;
};
