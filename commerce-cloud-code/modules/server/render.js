
/**
 * Render an ISML template
 * @param {string} view - Path to an ISML template
 * @param {Object} viewData - Data to be passed as pdict
 * @returns {void}
*/
function template(view, viewData) {
    var ISML = require('dw/template/ISML');
    // create a shallow copy of the data
    var data = viewData;
    data.translate = function(key) {
        return dw.web.Resource.msg(key, 'translations', 'Translation missing: ' + key);
    }
    data.lang = require('dw/util/Locale').getLocale(request.getLocale()).getLanguage();
    try {
        ISML.renderTemplate(view, data);
    } catch (e) {
        throw new Error(`${e.javaMessage} \n ${e.stack} ${e.fileName} ${e.lineNumber}`);
    }
}

/**
 * Render JSON as an output
 * @param {Object} data - Object to be turned into JSON
 * @param {Object} response - Response object
 * @returns {void}
 */
function json(data, response) {
    response.setContentType('application/json');
    response.base.writer.print(JSON.stringify(data, null, 2));
}

/**
 * Render a page designer page
 * @param {string} pageID - Path to an ISML template
 * @param {dw.util.HashMap} aspectAttributes - aspectAttributes to be passed to the PageMgr
 * @param {Object} data - Data to be passed
 * @returns {void}
 */
function page(pageID, aspectAttributes, data) {
    const PageMgr = require('dw/experience/PageMgr');
    if (aspectAttributes && !aspectAttributes.isEmpty()) {
        response.writer.print(PageMgr.renderPage(pageID, aspectAttributes, JSON.stringify(data)));
    } else {
        response.writer.print(PageMgr.renderPage(pageID, JSON.stringify(data)));
    }
}

/**
 * Determines what to render
 * @param {Object} res - Response object
 * @returns {void}
 */
function applyRenderings(res) {
    if (res.renderings.length) {
        res.renderings.forEach(function (element) {
            if (element.type === 'render') {
                switch (element.subType) {
                    case 'partial':
                        var resp = res;
                        require('*/cartridge/partials/renderer').render(element.view)(res.viewData.object);
                        break;
                    case 'isml':
                        template(element.view, res.viewData);
                        break;
                    case 'json':
                        json(res.viewData, res);
                        break;
                    case 'xml':
                        xml(res.viewData, res);
                        break;
                    case 'page':
                        page(element.page, element.aspectAttributes, res.viewData, res);
                        break;
                    default:
                        throw new Error('Cannot render template without name or data');
                }
            } else if (element.type === 'print') {
                res.base.writer.print(element.message);
            } else {
                throw new Error('Cannot render template without name or data');
            }
        });
    } else {
        throw new Error('Cannot render template without name or data');
    }
}

module.exports = {
    applyRenderings: applyRenderings
};
