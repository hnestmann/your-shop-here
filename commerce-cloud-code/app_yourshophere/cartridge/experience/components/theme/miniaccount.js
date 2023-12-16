'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var SVG = require('*/cartridge/experience/utilities/svg.js');

/**
 * Component which renders minicart
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
exports.render = function render (context) {
    try {
        return renderComponent (context)
    } catch (e) {
        const Logger = require('api/logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent (context) {
    var model = new HashMap();
    var content = context.content;
    model.width = content.width || '100%';
    if (content.image) {
        var iconInfo = SVG.getInlinableContent(content.image.file);
        if (iconInfo.type === 'IMG') {
            model.imageHtml = `<img src="${iconInfo.content}" style="width:${model.width}; margin-left:auto;"/>`;
        }
        if (iconInfo.type === 'SVG') {
            model.imageHtml = `${iconInfo.content}`;
            model.imageHtml = model.imageHtml.replace('<svg ', `<svg style="width:${model.width};" `)
        }
    }
    model.label = content.label;
    return new Template('experience/components/decorator/miniaccount').render(model).text;
};
