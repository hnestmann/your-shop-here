// allows the middleware known by express-style controllers to be used in Page-Designer 
// or conditional such as with personalized search

const server = require('server')
const cache = require('*/cartridge/middleware/cache');

exports.apply = function applyCache(name) {
    const applyCacheFn = server.applyCache;
    const res = {base: response};
    cache[`apply${name}`]({}, res, (() => applyCacheFn({}, res)));
};