var FileReader = require('dw/io/FileReader');
var File = require('dw/io/File');

/**
 * Returns the string contents of a file. Limited to 4096Bytes to ensure SVG is used consistently
 * @param {dw.io.File} file the file object to convert
 *
 * @returns {string} the file contents
 */
function getContentsByFile(file) {
    if (file.length > 4096) {
        throw new Error('Exceeded File Size Limit of 4kB ' + file + ' ' + file.length);
    }
    var reader = new FileReader(file, 'UTF-8');
    return reader.readLines().join('\n');
}
/**
 * Parses media file url into file object and returns it file contents
 * @param {dw.content.MediaFile} mediaFile - the mediafile to convert
 *
 * @returns {string} the file contents
 */
function getContentsByMediaFile(mediaFile) {
    // parse url from media file instance
    var url = mediaFile.URL.toString();
    var urlMatches = url.match(/\/on\/demandware.static\/-\/Library-Sites-([a-zA-Z0-9-_]*)\/([a-zA-Z0-9_]*)\/[a-z0-9]*\/(.*\.svg)/);
    if(!urlMatches) {
        urlMatches = url.match(/\/on\/demandware.static\/-\/Sites-([a-zA-Z0-9-_]*)-Library\/([a-zA-Z0-9_]*)\/[a-z0-9]*\/(.*\.svg)/);
    }

    var file = new File(File.LIBRARIES + File.SEPARATOR + urlMatches[1] + File.SEPARATOR + urlMatches[2] + File.SEPARATOR + urlMatches[3]);
    return getContentsByFile(file);
}

/**
 * Checks if file can be inlined and returns file contents if so. If not, url will be returned
 * @param {dw.content.MediaFile} mediaFile - the mediafile to convert
 *
 * @returns {Object} object containing file type and url / filecontents
 */
function getInlinableContent(mediaFile) {
    var iconInfo = {};
    if (mediaFile.URL.toString().substr(-4) === '.svg') {
        iconInfo.type = 'SVG';
        iconInfo.content = getContentsByMediaFile(mediaFile);
    } else {
        iconInfo.type = 'IMG';
        iconInfo.content = mediaFile.URL;
    }
    return iconInfo;
}


exports.getContentsByFile = getContentsByFile;
exports.getContentsByMediaFile = getContentsByMediaFile;
exports.getInlinableContent = getInlinableContent;

