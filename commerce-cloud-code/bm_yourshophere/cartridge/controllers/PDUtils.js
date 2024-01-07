
/**
 * Stores a component configuration in a file, so we can read in the storefront
 */
const store = function store() {
    const File = require('dw/io/File');
    const FileWriter = require('dw/io/FileWriter');
    let libId = request.httpParameterMap.libId.stringValue;
    if (libId === 'Library') {
        libId = request.httpParameterMap.siteId.stringValue;
    }
    const path = `${File.LIBRARIES}/${libId}/default/experience/settings/components`;
    const folder = new File(path);
    folder.mkdirs();
    const componentId = request.httpParameterMap.componentId.stringValue;
    const file = new File(`${path}/${componentId}.json`);
    if (!file.exists()) {
        file.createNewFile();
    }
    const fileWriter = new FileWriter(file, 'UTF-8', false);
    fileWriter.write(request.httpParameterMap.settings.stringValue);
    fileWriter.flush();
    fileWriter.close();
    response.writer.print('');
};
store.public = true;

exports.Store = store;
