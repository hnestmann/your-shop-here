'use strict';

var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');

module.exports = {
    /**
     * Assembles the page meta data.
     *
     * @param {dw.experience.Page} page The page object
     *
     * @returns {dw.web.PageMetaData} The page meta data
     */
    getPageMetaData: function getPageMetaData(page) {
        var computedMetaData = {
            title: page.pageTitle,
            description: page.pageDescription,
            keywords: page.pageKeywords,
            pageMetaTags: []
        };

        request.pageMetaData.pageMetaTags.forEach(function (item) {
            if (item.title) {
                computedMetaData.title = item.content;
            } else if (item.name && item.ID === 'description') {
                computedMetaData.description = item.content;
            } else if (item.name && item.ID === 'keywords') {
                computedMetaData.keywords = item.content;
            } else {
                computedMetaData.pageMetaTags.push(item);
            }
        });

        return computedMetaData;
    },

    /**
     * Returns the RegionModel registry for a given container (Page or Component).
     *
     * @param {dw.experience.Page|dw.experience.Component} container a component or page object
     * @param {string} containerType components or pages
     *
     * @returns {experience.utilities.RegionModelRegistry} The container regions
     */
    getRegionModelRegistry: function getRegionModelRegistry(container) {
        var containerType;
        if (container && container instanceof dw.experience.Page) {
            containerType = 'pages';
        } else if (container && container instanceof dw.experience.Component) {
            containerType = 'components';
        } else {
            return null;
        }
        var metaDefinition = require('*/cartridge/experience/' + containerType + '/' + container.typeID.replace(/\./g, '/') + '.json');

        return new RegionModelRegistry(container, metaDefinition);
    },

    /**
     * Returns true if page is rendered via editor UI and false in the storefront
     * @returns {boolean} The container regions
     */
    isInEditMode: function isInEditMode() {
        return request.httpPath.indexOf('__SYSTEM__Page-Show') > 0;
    },

    /**
     * Returns a css safe string of a given input string
     * @param {string} input a css class name.
     * @return {string} css
     */
    safeCSSClass: function (input) {
        return encodeURIComponent(input.toLowerCase()).replace(/%[0-9A-F]{2}/gi, '');
    },

    /**
     * We use the page description field to submit some dynamic params to the page.
     * This method will return an object as result from the parsed JSON string in the page description
     *
     * The placeholder look as follows: {{"editorPreviewContextId":"73910432M","foo":"bar"}}
     * and has to be valid JSON in the inner curlies
     *
     * @param {dw.experience.PageScriptContext} context The page script context object.
     * @return {dw/util/HashMap} previewParams HashMap or null
     */
    getPreviewParams: function (context) {
        var previewParams;
        var desc = context.page.description;
        if (desc && desc.indexOf('{{') !== -1 && desc.indexOf('}}') !== -1) {
            var jsonString = desc.substring(desc.indexOf('{{') + 1, desc.indexOf('}}') + 1);
            try {
                previewParams = JSON.parse(jsonString);
            } catch (error) {
                var Logger = require('api/Logger');
                Logger.warn('Found JSON in page description, but failed to parse it');
            }
        }
        return (previewParams || null);
    }

};
