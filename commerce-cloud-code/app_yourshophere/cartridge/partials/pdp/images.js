exports.createModel = function createModel(options) {
    const variationModel = require('./variationAttributes').getVariationModel(options.product);

    const model = {
        images: variationModel.getImages(options.settings.viewType).toArray()
            .slice(0, options.settings.imageCount).map((image, index) => ({
            .slice(0, options.settings.imageCount).map((image, index) => ({
                url: image.url,
                alt: image.alt,
                id: `slide-${index + 1}`, // Add unique ID for each slide
                id: `slide-${index + 1}`, // Add unique ID for each slide
            })),
    };
    return model;
};

exports.template = model => `
    <div class="image-slider">
        <div class="slider-viewport">
            <ul class="slider-track">
                ${model.images.map(image => `
                    <li class="slide" id="${image.id}">
                        <input type="radio" name="slider" id="${image.id}-radio" ${image.id === 'slide-1' ? 'checked' : ''}>
                        <img src="${image.url}" alt="${image.alt}" />
                    </li>
                `).join('\n')}
            </ul>
        </div>
        <div class="slider-nav">
            ${model.images.map(image => `
                <label for="${image.id}-radio" class="nav-dot"></label>
            `).join('\n')}
        </div>
    </div>
`;
