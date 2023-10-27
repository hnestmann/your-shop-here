
'use strict';

/**  
 *    Allows to select users search criterial like sorting rule and filters (refinements) 
 */
module.exports.init = function (editor) {
    var sortingRules = dw.catalog.CatalogMgr.getSortingRules().toArray();
    // request.setLocale('en_DE');
    // convert into serializable array
    var sortingRuleIDs = sortingRules.map(function (element) { return element.ID; });
    editor.configuration.put('srules', sortingRuleIDs);

    var searchModel = (new dw.catalog.ProductSearchModel());
    searchModel.setCategoryID('root');
    searchModel.search();
    var filters = {};
    var refinements = searchModel.getRefinements();
    var refinementDefinitions = refinements.getRefinementDefinitions().toArray();
    refinementDefinitions.forEach(function (definition) {
        if (!definition.getAttributeID()) {
            return;
        }
        var values = refinements.getAllRefinementValues(definition).toArray();
        var allValues = [];
        values.forEach(function (value) {
            allValues.push(value.value);
        });
        filters[definition.getAttributeID()] = allValues;
    });
    // dw.system.Logger.warn(JSON.stringify(filters));
    editor.configuration.put('filters', JSON.stringify(filters));
};
