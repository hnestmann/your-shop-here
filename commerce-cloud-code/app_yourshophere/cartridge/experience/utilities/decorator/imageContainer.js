var HashMap = require('dw/util/HashMap');

module.exports = function (object, content) {
    Object.defineProperty(object, 'imageContainer', {
        enumerable: true,
        value: (function () {
            var overlayTextClasses = [];
            var model = new HashMap();
            var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
            var colorMap = {
                Primary: '-primary',
                'Page Background': '-bgcolor',
                'Link Color': '-interation ',
                'Menu Background': '-menucolor'
            };
            model.heading = content.heading ? content.heading : null;
            model.ITCText = content.ITCText ? content.ITCText : null;
            model.image = content.image.file;
            model.link = content.link;
            model.ITCText = content.ITCText ? content.ITCText : null;
            model.image = ImageTransformation.getScaledImage(content.image);
            model.link = content.ITCLink ? content.ITCLink : '#';
            model.alt = content.alt ? content.alt : null;
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
            return model;
        }())
    });
};
