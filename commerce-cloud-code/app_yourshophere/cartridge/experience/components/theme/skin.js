'use strict';

var Template = require('dw/util/Template');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var HashMap = require('dw/util/HashMap');
var HashSet = require('dw/util/HashSet');

var fontMap = {
    'Salesforce Sans': 'components/fonts/salesforcesans',
    'Roboto': 'components/fonts/roboto',
    'Nunito Sans': 'components/fonts/nunito',
}

function getFontAttributes() {
    var metaDefinition = require('*/cartridge/experience/components/theme/skin.json');
    var fontGroup = metaDefinition['attribute_definition_groups'].filter(function(element) {return element.id === 'fonts'});  
    return fontGroup.pop()['attribute_definitions'].map(function(element) {return element.id});
}

/**
 * Render logic for theming component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var content = context.content;
    content.editMode = PageRenderHelper.isInEditMode();
    var model = new HashMap();
    var fontAttributes = getFontAttributes();
    var fonts = new HashSet()
    content.keySet().toArray().forEach(function(element) {
        model[element] = content[element];
        if (fontAttributes.indexOf(element) > -1 && fontMap[content[element]]) {
            fonts.add1(fontMap[content[element]]);
        }  
    });
    model.fonts = fonts.toArray();

    return new Template('experience/components/decorator/skin').render(model).text;
};
