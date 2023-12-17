// The Default controller doesn't use server.js (express, sfra-style)
// As it would require special handling there 

exports.Start = (args) => {
    var URLUtils = require('dw/web/URLUtils');
    const cacheTime = new Date();
    cacheTime.setHours(cacheTime.getHours() + 24);
    response.setExpires(cacheTime);
    response.redirect(URLUtils.url('Home-Show'));
};
exports.Start.public = true;

exports.Offline = () => {
    const cacheTime = new Date();
    cacheTime.setHours(cacheTime.getHours() + 24);
    response.setExpires(cacheTime);
    ISML.renderTemplate('error/siteoffline');
};
exports.Offline.public = true;
