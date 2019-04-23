'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Local = function () {
    function Local(props) {
        _classCallCheck(this, Local);

        this.filter = function () {};

        this.props = props;
    }

    _createClass(Local, [{
        key: 'getList',
        value: function getList(needCount, meta, data, globalMeta, callbackFunc, props) {
            var _this = this;

            var items = [].concat(_toConsumableArray(this.props.globalMeta.storages[meta.dataSource.storage]));
            var expands = this.props.globalMeta.expands && this.props.globalMeta.expands[meta.dataSource.storage];
            if (expands) {
                for (var i in items) {
                    var _loop = function _loop(e) {
                        var expand = expands[e];
                        var li = items[i];
                        var f = function f(item) {
                            return expand.func(item, li);
                        };
                        items[i][expand.name] = _this.props.globalMeta.storages[expand.expandStorage].filter(f)[0];
                    };

                    for (var e in expands) {
                        _loop(e);
                    }
                }
            }

            if (data.filters) {
                var _loop2 = function _loop2(name) {
                    var filterMeta = meta.filters.filter(function (e) {
                        return e.name === name;
                    })[0];
                    var globalFilterMeta = _this.props.globalMeta.filters[filterMeta.type] || _this.props.globalMeta.filters[_this.props.globalMeta.filters.default];
                    items = items.filter(function (i) {
                        return globalFilterMeta(i[name], data.filters[name]);
                    });
                };

                for (var name in data.filters) {
                    _loop2(name);
                }
            }

            if (meta.propsFilters && props) {
                var propsFilters = meta.propsFilters(props);

                var _loop3 = function _loop3(k) {
                    var kv = Object.entries(propsFilters[k])[0];
                    items = items.filter(function (i) {
                        return i[kv[0]] === kv[1];
                    });
                };

                for (var k in propsFilters) {
                    _loop3(k);
                }
            }

            if (data.orders) {
                var orderFunc = function orderFunc(a, b) {
                    for (var name in data.orders) {
                        if (!data.orders[name]) continue;
                        var sign = data.orders[name] === 'asc' ? -1 : 1;
                        if (a[name] < b[name]) return sign;
                        if (a[name] > b[name]) return -sign;
                    }
                    return 0;
                };
                items = items.sort(orderFunc);
            }

            var count = items.length;

            if (data.paging) {
                var from = data.paging.page * data.paging.perPage;
                var till = (data.paging.page + 1) * data.paging.perPage;
                items = items.slice(from, till);
            }

            callbackFunc({
                items: items,
                count: needCount ? count : undefined
            });
        }
    }, {
        key: 'getLongSelect',
        value: function getLongSelect(props, inputValue, callback) {
            var items = [].concat(_toConsumableArray(this.props.globalMeta.storages[props.componentMeta.dataSource.shortPath]));
            if (Array.isArray(inputValue)) {
                items = items.filter(function (i) {
                    return inputValue.some(function (e) {
                        return i[props.componentMeta.dataSource.key] === e;
                    });
                });
            } else {
                var top = props.componentMeta.dataSource.count || 10;
                items = items.filter(function (i) {
                    return i[props.componentMeta.dataSource.value].toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
                });
                items = items.slice(0, top);
            }
            callback(items.map(function (v) {
                return { label: v[props.componentMeta.dataSource.value], value: v[props.componentMeta.dataSource.key], extraData: v };
            }));
        }
    }]);

    return Local;
}();

exports.default = Local;