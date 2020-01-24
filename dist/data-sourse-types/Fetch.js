"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
function get(url, headers, callback, errorCallback) {
    fetch(url, headers).then(function (response) {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.json();
    }).then(function (data) {
        return callback(data);
    }).catch(function (e) {
        return errorCallback(e);
    });
}