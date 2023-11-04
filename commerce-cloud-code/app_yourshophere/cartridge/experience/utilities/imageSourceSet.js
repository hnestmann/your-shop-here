var ImageTransformation = {};
const imageSizes = require('*/cartridge/experience/imageSizes.json');

module.exports = function createSourceSet(image) {
    const srcset = imageSizes.sizes.map(width => `${image.file.getImageURL({scaleWidth: width})} ${width}px`).join(',');
    const defaultsize = image.file.getImageURL({scaleWidth: imageSizes.default});
    return {srcset: srcset, defaultsize: defaultsize};
};
