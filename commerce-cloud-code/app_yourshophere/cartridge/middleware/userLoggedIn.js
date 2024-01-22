'use strict';

var URLUtils = require('dw/web/URLUtils');

/**
 * Middleware validating if user logged in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateLoggedIn(req, res, next) {
    if (!customer.registered) {
        res.redirect(URLUtils.url('Login-Show', 'rurl', request.httpURL));
    }
    next();
}

module.exports = {
    validateLoggedIn: validateLoggedIn,
    validateLoggedInAjax: validateLoggedInAjax
};
