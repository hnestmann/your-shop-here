'use strict';

/**
 * @namespace Home
 */
const server = require('server');
const cache = require('*/cartridge/middleware/cache');

server.get('Show', cache.applyDefaultCache, (req, res, next) => {

    res.renderPartial('search/refinements');
    
    next();
});

module.exports = server.exports();
