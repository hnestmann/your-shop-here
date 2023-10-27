'use strict';
var CatalogMgr = require('dw/catalog/CatalogMgr');

var server = require('server');
var models = require('model');

var cache = require('*/cartridge/middleware/cache');

server.get('HeaderMenu', cache.applyDefaultCache, server.middleware.include, (req, res, next) => {
    var rootCategory = models.get('category').init('root');
    res.render('/components/header/menu', {root: rootCategory});
    next();
});

module.exports = server.exports();
