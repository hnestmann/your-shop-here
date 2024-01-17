/**
 * Renders a Product productBreadcrumbs Component
 *
 */
exports.render = function render() {
    return require('*/cartridge/partials/renderer').html('pdp/breadcrumbs')(request.custom.model.product);
};
