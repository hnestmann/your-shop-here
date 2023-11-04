

'use strict';

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const imageSourceSet = require('*/cartridge/experience/utilities/imageSourceSet.js');

/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const content = context.content;
    
    const overlayTextClasses = [];
    const model = new HashMap();
    const colorMap = {
        Primary: '-primary',
        'Page Background': '-bgcolor',
        'Link Color': '-interation ',
        'Menu Background': '-menucolor'
    };
    model.heading = content.heading ? content.heading : '';
    model.ITCText = content.ITCText ? content.ITCText : '';
    model.link = content.link;
    model.ITCText = content.ITCText ? content.ITCText : '';
    model.link = content.ITCLink ? content.ITCLink : '#';
    model.alt = content.alt ? content.alt : '';
    model.brightness = content.Brightness ? content.Brightness : 100;
    if (content.textContrast === 'Drop Shadow') {
        overlayTextClasses.push('drop-shadow-contrast');
    }
    if (content.textContrast === 'Background Color') {
        overlayTextClasses.push('bg' + colorMap[content.textBackground]);
    }
    if (content.textColor && colorMap[content.textColor]) {
        overlayTextClasses.push(' fg' + colorMap[content.textColor]);
    }
    if (content.textHAlign) {
        overlayTextClasses.push('text-' + content.textHAlign);
        model.containerHAlign = 'halign-' + content.textHAlign;
    } else {
        overlayTextClasses.push('text-center');
        model.containerHAlign = 'halign-center';
    }

    if (content.textVAlign) {
        model.verticalAlign = 'valign-' + content.textVAlign;
    } else {
        model.verticalAlign = 'valign-middle';
    }

    model.overlayTextClass = overlayTextClasses.join(' ');
    model.mainClass = (content.textContrast === 'Gradient') ? 'gradient-contrast' : '';

    model.image = imageSourceSet(content.image);
    model.heading = model.heading.replace('<p>','');
    model.heading = model.heading.replace(new RegExp('</p>$'),'');

    model.hxlink = `${model.link}${(model.link.includes('?') ? '&' : '?')}hx=main`;
    return new Template('experience/components/base/moreImageAndText').render(model).text;
};
