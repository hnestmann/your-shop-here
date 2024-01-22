/**
 * Renders a Product productBreadcrumbs Component
 *
 */
exports.render = function render() {
    return require('partials').html('pdp/breadcrumbs')(request.custom.model.product);
};
