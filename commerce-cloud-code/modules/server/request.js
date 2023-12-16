'use strict';

/**
 * Retrieves session locale info
 *
 * @param {string} locale - Session locale code, xx_XX
 * @param {dw.util.Currency} currency - Session currency
 * @return {Object} - Session locale info
 */
function getCurrentLocale(locale, currency) {
    return {
        id: locale,
        currency: {
            currencyCode: currency.currencyCode,
            defaultFractionDigits: currency.defaultFractionDigits,
            name: currency.name,
            symbol: currency.symbol
        }
    };
}

/**
 * get a local instance of the geo location object
 * @param {Object} request - Global request object
 * @returns {Object} object containing geo location information
 */
function getGeolocationObject(request) {
    var Locale = require('dw/util/Locale');
    var currentLocale = Locale.getLocale(request.locale);

    return {
        countryCode: request.geolocation ? request.geolocation.countryCode : currentLocale.country,
        latitude: request.geolocation ? request.geolocation.latitude : 90.0000,
        longitude: request.geolocation ? request.geolocation.longitude : 0.0000
    };
}

/**
 * Get request body as string if it is a POST or PUT
 * @param {Object} request - Global request object
 * @returns {string|Null} the request body as string
 */
function getRequestBodyAsString(request) {
    var result = null;

    if (request
        && (request.httpMethod === 'POST' || request.httpMethod === 'PUT')
        && request.httpParameterMap
    ) {
        result = request.httpParameterMap.requestBodyAsString;
    }

    return result;
}

/**
 * Get a local instance of the pageMetaData object
 * @param {Object} pageMetaData - Global request pageMetaData object
 * @returns {Object} object containing pageMetaData information
 */
function getPageMetaData(pageMetaData) {
    var pageMetaDataObject = {
        title: pageMetaData.title,
        description: pageMetaData.description,
        keywords: pageMetaData.keywords,
        pageMetaTags: pageMetaData.pageMetaTags,
        addPageMetaTags: function (pageMetaTags) {
            pageMetaData.addPageMetaTags(pageMetaTags);
        },
        setTitle: function (title) {
            pageMetaData.setTitle(title);
        },
        setDescription: function (description) {
            pageMetaData.setDescription(description);
        },
        setKeywords: function (keywords) {
            pageMetaData.setKeywords(keywords);
        }
    };

    return pageMetaDataObject;
}

/**
 * @constructor
 * @classdesc Local instance of request object with customer object in it
 *
 * Translates global request and customer object to local one
 * @param {Object} request - Global request object
 * @param {dw.customer.Customer} customer - Global customer object
 * @param {dw.system.Session} session - Global session object
 */
function Request(request, customer, session) {
    this.setLocale = function (localeID) {
        return request.setLocale(localeID);
    };

    Object.defineProperty(this, 'raw', {
        get: function () {
            return request;
        }
    });

    Object.defineProperty(this, 'httpParameterMap', {
        get: function () {
            return request.httpParameterMap;
        }
    });

    Object.defineProperty(this, 'body', {
        get: function () {
            return getRequestBodyAsString(request);
        }
    });

    Object.defineProperty(this, 'geolocation', {
        get: function () {
            return getGeolocationObject(request);
        }
    });

    Object.defineProperty(this, 'locale', {
        get: function () {
            return getCurrentLocale(request.locale, session.currency);
        }
    });

    Object.defineProperty(this, 'remoteAddress', {
        get: function () {
            return request.getHttpRemoteAddress();
        }
    });

    Object.defineProperty(this, 'referer', {
        get: function () {
            return request.getHttpReferer();
        }
    });

    Object.defineProperty(this, 'pageMetaData', {
        get: function () {
            return getPageMetaData(request.pageMetaData);
        }
    });
}
module.exports = Request;
