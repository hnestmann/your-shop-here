const URLUtils = require('dw/web/URLUtils');
const imageSizes = require('*/cartridge/experience/imageSizes.json');

module.exports = function createSourceSet(image) {
    const srcset = imageSizes.sizes.map(width => `${image.file.getImageURL({scaleWidth: width})} ${width}w`).join(', \n');
    const defaultsize = image.file.getImageURL({scaleWidth: imageSizes.default});
    const mini = image.file.getImageURL({scaleWidth: imageSizes.miniplaceholder, format: 'png'});
    const aspectRatio = `${image.metaData.getWidth()} / ${image.metaData.getHeight()}`
    return {srcset: srcset, defaultsize: defaultsize, aspectRatio: aspectRatio, mini: mini};
};
