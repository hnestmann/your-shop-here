/**
 * Render search refinements
 * 
 * @returns 
 */
exports.createModel = () => {
    const Resource = require('dw/web/Resource');

    const HttpSearchParams = require('api/URLSearchParams')
    const httpParams = new HttpSearchParams(request.httpParameterMap)

    const refinementSearch = require('api/ProductSearchModel').get(httpParams);
    refinementSearch.search();

    const category = refinementSearch.getCategory();
    const refinements = refinementSearch.getRefinements()

    // @TODO Implement cutoff, implement color swatches
    const result = {
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
                    // @todo provide nice api for the different types and relaxability
                    var url = '';
                    const cssClasses = [];
                    if (refinement.categoryRefinement) {
                        if (refinementSearch.isRefinedByCategory() && refinementSearch.canRelax() && httpParams.get('cgid').value === refinementValue.getValue()) {
                            url = refinementSearch.urlRelaxCategory('Search-Show');
                            cssClasses.push('selected');
                        } else {
                            url = refinementSearch.urlRefineCategory('Search-Show', refinementValue.getValue())
                        }
                    } else if (refinement.priceRefinement) {
                        if (refinementSearch.isRefinedByPriceRange(refinementValue.getValueFrom(), refinementValue.getValueTo())) {
                            url = refinementSearch.urlRelaxPrice('Search-Show');
                            cssClasses.push('selected');
                        } else {
                            url = refinementSearch.urlRefinePrice('Search-Show', refinementValue.getValueFrom(), refinementValue.getValueTo());
                        }
                    } else if (refinement.promotionRefinement) {
                        url = refinementSearch.urlRefinePromotion('Search-Show',refinementValue.getValue());
                    } else if (refinement.attributeRefinement) {
                        if (refinementSearch.isRefinedByAttributeValue(refinementValue.getID(), refinementValue.getValue())) {
                            url = refinementSearch.urlRelaxAttributeValue('Search-Show', refinementValue.getID(), refinementValue.getValue())
                            cssClasses.push('selected');
                        }
                        url = refinementSearch.urlRefineAttributeValue('Search-Show', refinementValue.getID(), refinementValue.getValue())
                    } else {
                        throw new Error('Unexpected Refinement Type');
                    }
                    return {
                        id: refinementValue.getValue(),
                        name: refinementValue.getDisplayValue(),
                        hitCount: refinementValue.getHitCount(),
                        url: url.toString(),
                        hxUrl: url.append('hx', 'main').toString(),
                        cssClasses: cssClasses.join(' ')
                    };
                })
            }
        }).map((refinement) => {
            // prepend "back to <parent>" to category refinements
            if (refinement.category && category && category.getParent() && category.getParent().ID != 'root') {
                const parentCategory = category.getParent();
                const url = refinementSearch.urlRefineCategory('Search-Show', parentCategory.ID);
                // @todo move Resource.msg to page designer / translate wrapper
                refinement.values.unshift({
                    id: "backtoparent",
                    name: Resource.msgf('back_to', 'translations', 'Back to {0}', parentCategory.displayName),
                    hitCount: 0,
                    url: url.toString(),
                    hxUrl: url.append('hx', 'main').toString(),
                    cssClasses: 'backtoparent'
                });
            }
            return refinement;
        })
    };
    return result;
}

exports.template = (model) => `<div class="refinements">
    ${model.refinements.map((refinement) =>
    `<div>
        <h3>${refinement.name}</h3>
        <ul role="navigation">
        ${refinement.values.map((value) =>
        `<li><a href="${value.url}"${(value.cssClasses ? ` class="${value.cssClasses}"` : '')}
                    hx-push-url="${value.url}"
                    hx-get="${value.hxUrl}"
                    hx-target="main" hx-indicator=".progress">
                ${value.name}
            </a></li>`).join('')}
        </ul>
    </div>
    `).join('')}</div>`;
