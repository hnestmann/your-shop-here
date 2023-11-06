var ImageTransformation = {};
var URLUtils = require('dw/web/URLUtils');
const imageSizes = require('*/cartridge/experience/imageSizes.json');

module.exports = function createSourceSet(image) {
    const srcset = imageSizes.sizes.map(width => `${image.file.getImageURL({scaleWidth: width})} ${width}w`).join(', \n');
    const defaultsize = image.file.getImageURL({scaleWidth: imageSizes.default});
    const aspectRatio = `${image.metaData.getWidth()} / ${image.metaData.getHeight()}`
    return {srcset: srcset, defaultsize: defaultsize, aspectRatio: aspectRatio};
};
