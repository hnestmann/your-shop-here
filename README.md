# your-shop-here
an experimental reference storefront for Salesforce B2C Commerce.

It's a hobby project with no direct affiliation to Saleforce, Inc.

# Goals and Design Pricniples

- KISS - keep it simple stupid
- 100 Points at Lighthouse
    - Miminal Javascript, no heavy frameworks
    - minimal Dom
    - No JSON ajax
- Works with (m)any catalogs without code change
- Page Designer First design for extensiblity and drag & drop customization
- Embrace web standards like Javascript, HTML and CSS, minimal propriatrity
- No build steps
- Have Fun

## Frameworks
- HTMX
- Pico CSS
- CSG Best of Breed 

## Concessions
- No legacy browser compatibility - farewell IE
- Inline CSS is acceptable, if its element specfic
- Template localization

# Getting started

1. Copy `dw.json.example` to `dw.json` and update with your sandbox details
2. Run `npm run all` to install _Your Shop Here_

# Concepts

## Controllers

Controllers use an optimised SFRA like approach which allows for routes to be extended. Most controllers will be very basic as they just render a Page Designer page which will contain the actual page logic. 

## Partials

_Your Shop Here_ introduces the concept of partials, partials need to export two methods - `createModel` which returns an object containing the view model and `template` which renders the view model to HTML.

Example:
```
exports.createModel = function createModel(product) {
    return {
        name: product.name,
    };
};

exports.template = model => `<h1 class="product-name">${model.name}</h1>`;
```

Why partials?
- Pure Javascript
- No ISML required, less propriarity and more performance
- Great profileability, each component can be measured on model creation and HTML generation times which provides granular and actionable performance insights
- Works well with Page Designer, but components can be used standalone as well

# TODOs
- move isactivedatahead to party town
