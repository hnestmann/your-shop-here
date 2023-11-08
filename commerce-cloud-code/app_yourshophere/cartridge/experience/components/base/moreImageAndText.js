

'use strict';

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const imageContainerDecorator = require('*/cartridge/experience/utilities/decorator/imageContainer.js');


/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const content = context.content;
    const tmpModel = Object.create(null);
    imageContainerDecorator(tmpModel, content);
    const model = tmpModel.imageContainer;
    model.heading = model.heading.replace('<p>','');
    model.heading = model.heading.replace(new RegExp('</p>$'),'');
    const hxdebug = model.link.includes('?');
    model.hxlink = `${model.link}${(model.link.includes('?') ? '&' : '?')}hx=main`;
    return print(model);
};

function print(model) {
    return `
        <figure class="image-component ${model.mainClass}">
            <a href="${model.link}" aria-label="${model.alt}">
                <img class="common-image-component"
                    style="
                        aspect-ratio: ${model.image.aspectRatio};
                        background-image: url(${model.image.mini});
                    "
                    loading="lazy"
                    srcset="${model.image.srcset}"
                    sizes="${model.image.sizes}"
                    src="${model.image.defaultsize}"
                    alt="${model.alt}" title="${model.alt}" 
                />
            </a>
            <figcaption>
                ${!empty(model.heading) ? (`
                    <span class="image-on ${model.overlayTextClass} ${model.verticalAlign} ${model.containerHAlign}">
                        <a href="${model.link}" hx-push-url="${model.link}"
                            aria-label="${model.alt}" hx-get="${model.hxlink}" hx-target="main" hx-indicator=".progress">
                            ${model.heading}
                        </a>
                    </span>
                `) : ''}
                ${!empty(model.ITCText) ? (`
                    <span class="image-below">
                        ${model.ITCText}
                    </span>
                `) : ''}
            
            </figcaption>
        </figure>
    `
}
