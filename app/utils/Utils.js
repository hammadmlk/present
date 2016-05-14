// Utils shared accross the app

var Utils = {
    isTouchDevice: function() {
        return 'ontouchstart' in window;
    },
}

module.exports = Utils;