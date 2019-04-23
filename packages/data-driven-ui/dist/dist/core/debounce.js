"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;
// ==============================
// Debounce (https://github.com/jashkenas/underscore)
// ==============================
function debounce(func, wait, immediate) {
    var timeout = void 0;
    return function () {
        var context = this,
            args = arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}