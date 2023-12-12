/**
 * Render search refinements
 * 
 * @returns 
 */
exports.createModel = () => {
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
    parameterMap.getParameterMap('prefn').getParameterNames().toArray().forEach((index => {
        searchModel.addRefinementValues(parameterMap[`prefn${index}`].stringValue,parameterMap[`prefv${index}`].stringValue);
    }))
    searchModel.search();
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

    // @TODO Implement cutoff
    return {
        title: "Refinements",
        refinements: refinements.getRefinementDefinitions().toArray().map((refinement) => {
            return {
                id: refinement.getAttributeID(),
                name: refinement.getDisplayName(),
                category: refinement.categoryRefinement,
                price: refinement.priceRefinement,
                promotions: refinement.promotionRefinement,
                values: refinements.getRefinementValues(refinement).toArray().map(refinementValue => {
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
                                url = searchModel.urlRefineAttributeValue('Search-Show',refinementValue.getID(),refinementValue.getValue())
                            }
                        }
                        return {
                            id: refinementValue.getValue(),
                            name: refinementValue.getDisplayValue(),
                            hitCount: refinementValue.getHitCount(),
                            url: url.toString(),
                            cssClasses: cssClasses.join(' ')
                        };
                    })
            }
        })
    };
}

exports.template = (model) => `<div class="refinements">
    <h2>${model.title}</h2>
    ${model.refinements.map((refinement) => 
    `<div>
        <h3>${refinement.name}</h3>
        <ul role="navigation">
        ${refinement.values.map((value) => 
            `<li><a href="${value.url}"${(value.cssClasses?` class="${value.cssClasses}"`:'')}>
                ${value.name}
            </a></li>`).join('')}
        </ul>
    </div>
    `).join('')}</div>`;