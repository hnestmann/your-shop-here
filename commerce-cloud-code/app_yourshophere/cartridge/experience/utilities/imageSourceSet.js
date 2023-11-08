const URLUtils = require('dw/web/URLUtils');
const layoutCache = require('dw/system/CacheMgr').getCache('Layout');

module.exports = function createSourceSet(image, context) {
    
    const imageDisVariants = layoutCache.get(`${context}/imageDisVariants` + context, () => {
        return require(`*/cartridge/layout/${context}/imageDisVariants.json`);
    });
    const sharedAttributes = layoutCache.get(`${context}/imageSharedAttributes` + context, () => {
        return require(`*/cartridge/layout/${context}/imageSharedAttributes.json`);
    });

    const srcset = imageDisVariants.sizes.map(width => `${image.file.getImageURL({scaleWidth: width})} ${width}w`).join(', \n');
    const defaultsize = image.file.getImageURL({scaleWidth: imageDisVariants.default});
    const mini = image.file.getImageURL({scaleWidth: imageDisVariants.miniplaceholder, format: 'png'});
    const aspectRatio = `${image.metaData.getWidth()} / ${image.metaData.getHeight()}`
    const sizes = sharedAttributes.sizes;

    return {srcset: srcset, defaultsize: defaultsize, aspectRatio: aspectRatio, mini: mini, sizes: sizes};
};
