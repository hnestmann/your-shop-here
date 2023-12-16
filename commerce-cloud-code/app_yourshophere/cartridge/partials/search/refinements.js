/**
 * Render search refinements
 * 
 * @returns 
 */
exports.createModel = () => {
    const Resource = require('dw/web/Resource');
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const searchModel = new ProductSearchModel();
    const parameterMap = request.httpParameterMap;

    // set refinements from URL
    if (parameterMap.cgid.submitted){
        searchModel.setCategoryID(parameterMap.cgid.value)
    }
    if (parameterMap.pmin.submitted){
        searchModel.setPriceMin(parameterMap.pmin.doubleValue)
    }
    if (parameterMap.pmax.submitted){
        searchModel.setPriceMax(parameterMap.pmax.doubleValue)
    }
    if (parameterMap.q.submitted){
        searchModel.setSearchPhrase(parameterMap.q.stringValue)
    }
    parameterMap.getParameterMap('prefn').getParameterNames().toArray().forEach((index => {
        searchModel.addRefinementValues(parameterMap[`prefn${index}`].stringValue,parameterMap[`prefv${index}`].stringValue);
    }))
    searchModel.search();
    const category = searchModel.getCategory();
    const refinements = searchModel.getRefinements()

    // [
    //     {
    //         name: "By Category",
    //         values: [{
    //             id: "a",
    //             name: "Mens",
    //             selected: false
    //         },{
    //             id: "b",
    //             name: "Womens",
    //             selected: true
    //         }]
    //     }
    // ]

    // @TODO Implement cutoff, implement color swatches
    return {
        refinements: refinements.getRefinementDefinitions().toArray().map((refinement) => {
            var refinementValues = [];
            if (refinement.categoryRefinement) {
                refinementValues = refinements.getNextLevelCategoryRefinementValues(category).toArray();
            } else {
                refinementValues = refinements.getRefinementValues(refinement).toArray()
            }

            return {
                id: refinement.getAttributeID(),
                name: refinement.getDisplayName(),
                category: refinement.categoryRefinement,
                price: refinement.priceRefinement,
                promotions: refinement.promotionRefinement,
                values: refinementValues.map(refinementValue => {
                        var url = '';
                        const cssClasses = [];
                        if(refinement.categoryRefinement) {
                            if(searchModel.isRefinedByCategory() && searchModel.canRelax() && parameterMap.cgid.value === refinementValue.getValue()){
                                url = searchModel.urlRelaxCategory('Search-Show');
                                cssClasses.push('selected');
                            } else {
                                url = searchModel.urlRefineCategory('Search-Show',refinementValue.getValue())
                            }
                        }else if(refinement.priceRefinement) {
                            if(searchModel.isRefinedByPriceRange(refinementValue.getValueFrom(),refinementValue.getValueTo())){
                                url = searchModel.urlRelaxPrice('Search-Show');
                                cssClasses.push('selected');
                            } else {
                                url = searchModel.urlRefinePrice('Search-Show',refinementValue.getValueFrom(),refinementValue.getValueTo());
                            }
                        }else if(refinement.promotionRefinement) {
                            // url = searchModel.urlRefinePrice('Search-Show',refinementValue.getValueFrom(),refinementValue.getValueTo());
                        } else {
                            if(searchModel.isRefinedByAttributeValue(refinementValue.getID(),refinementValue.getValue())){
                                url = searchModel.urlRelaxAttributeValue('Search-Show',refinementValue.getID(),refinementValue.getValue())
                                cssClasses.push('selected');
                            } else {
                                throw new Error('Unexpected Refinement Type detected');
                            }
                        }
                        return {
                            id: refinementValue.getValue(),
                            name: refinementValue.getDisplayValue(),
                            hitCount: refinementValue.getHitCount(),
                            url: url.toString(),
                            hxUrl: url.append('hx','main').toString(),
                            cssClasses: cssClasses.join(' ')
                        };
                    })
            }
        }).map((refinement) => {
            // prepend "back to <parent>" to category refinements
            if(refinement.category && category && category.getParent() && category.getParent().ID != 'root') {
                const parentCategory = category.getParent();
                const url = searchModel.urlRefineCategory('Search-Show',parentCategory.ID);
                refinement.values.unshift({
                    id: "backtoparent",
                    name: Resource.msgf('back_to','translations','Back to {0}',parentCategory.displayName),
                    hitCount: 0,
                    url: url.toString(),
                    hxUrl: url.append('hx','main').toString(),
                    cssClasses: 'backtoparent'
                });
            }
            return refinement;
        })
    };
}

exports.template = (model) => `<div class="refinements">
    ${model.refinements.map((refinement) => 
    `<div>
        <h3>${refinement.name}</h3>
        <ul role="navigation">
        ${refinement.values.map((value) => 
            `<li><a href="${value.url}"${(value.cssClasses?` class="${value.cssClasses}"`:'')}
                    hx-push-url="${value.url}"
                    hx-get="${value.hxUrl}"
                    hx-target="main" hx-indicator=".progress">
                ${value.name}
            </a></li>`).join('')}
        </ul>
    </div>
    `).join('')}</div>`;
