'use strict';


function productIcon(pid) {
    return require('*/cartridge/partials/wishlist/heartIcon').template(pid);
}

function refreshState(){
    return `
    <script type="module">
        (function() {
            refreshWishlistStates()
        })();
    </script>
    `
}

module.exports = {
    productIcon: productIcon,
    refreshState: refreshState
};
