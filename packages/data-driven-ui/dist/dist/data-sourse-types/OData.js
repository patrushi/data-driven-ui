'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _odataQuery = require('odata-query');

var _odataQuery2 = _interopRequireDefault(_odataQuery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

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

var OData = function () {
    function OData(props) {
        _classCallCheck(this, OData);

        this.getByName = function (list, name) {
            return list.filter(function (e) {
                return e.name === name;
            })[0];
        };

        this.props = props;
    }

    _createClass(OData, [{
        key: 'getExpand',
        value: function getExpand(meta) {
            var expand = meta.columns.filter(function (e) {
                return e.dataSource && e.dataSource.path;
            }).map(function (e) {
                return e.dataSource.path.slice(0, e.dataSource.path.length - 1).reduce(function (path, a) {
                    return path + '/' + a;
                });
            });
            return expand.length === 0 ? null : expand;
        }
    }, {
        key: 'getSelect',
        value: function getSelect(meta) {
            return meta.columns.map(function (e) {
                return e.dataSource && e.dataSource.path ? e.dataSource.path.reduce(function (path, a) {
                    return path + '/' + a;
                }) : e.name;
            });
        }
    }, {
        key: 'getOrderBy',
        value: function getOrderBy(meta, data) {
            var orderedColumns = [];
            for (var name in data.orders) {
                var columnMeta = this.getByName(meta.columns, name);
                if (data.orders[name] !== undefined) {
                    orderedColumns.push({ meta: columnMeta, order: data.orders[name] === 'desc' ? ' desc' : '' });
                }
            }
            return orderedColumns.length === 0 ? null : orderedColumns.map(function (e) {
                return e.meta.dataSource && e.meta.dataSource.path ? e.meta.dataSource.path.reduce(function (path, a) {
                    return path + '/' + a;
                }) + e.order : e.meta.name + e.order;
            });
        }
    }, {
        key: 'getFilter',
        value: function getFilter(meta, data, props) {
            var filters = [];
            for (var name in data.filters) {
                if (data.filters[name]) {
                    var m = this.getByName(meta.filters, name);
                    var f = (m.dataSource || {}).func || this.props.globalMeta.filters[m.type] || this.props.globalMeta.filters[this.props.globalMeta.filters.default];
                    filters.push(f(name, data.filters[name]));
                }
            }
            if (meta.propsFilters && props) {
                filters = [].concat(_toConsumableArray(filters), [meta.propsFilters(props)]);
            }
            return filters.length === 0 ? null : filters;
        }
    }, {
        key: 'getList',
        value: function getList(needCount, meta, data, globalMeta, callbackFunc, props) {
            var _this = this;

            var path = meta.dataSource.path || this.props.globalMeta.basePath + '/' + meta.dataSource.shortPath;
            var count = needCount;
            var top = data.paging && data.paging.perPage;
            var skip = data.paging && data.paging.perPage * data.paging.page;
            var filter = this.getFilter(meta, data, props);
            var expand = this.getExpand(meta);
            var select = meta.dataSource.selectAll ? null : this.getSelect(meta);
            var orderBy = this.getOrderBy(meta, data);
            if (needCount && this.props.globalMeta.separateQueryForCount) {
                var cf = function cf(countValue) {
                    return _this.fetchQuery(path, { select: select, expand: expand, filter: filter, top: top, skip: skip, orderBy: orderBy, format: _this.props.globalMeta.format }, function (value) {
                        return callbackFunc(_extends({}, value, { count: countValue.count }));
                    });
                };
                this.fetchQuery(path, { count: count, filter: filter, format: this.props.globalMeta.format }, cf);
            } else {
                this.fetchQuery(path, { count: count, select: select, expand: expand, filter: filter, top: top, skip: skip, orderBy: orderBy, format: this.props.globalMeta.format }, callbackFunc);
            }
        }
    }, {
        key: 'fetchQuery',
        value: function fetchQuery(path, queryProps, callbackFunc) {
            var query = (0, _odataQuery2.default)(queryProps);
            this.props.globalMeta.get('' + path + query, function (data) {
                var value = {};
                if (data["@odata.count"] !== undefined) {
                    value.count = data["@odata.count"];
                }
                if (data.value !== undefined) {
                    value.items = data.value;
                }
                callbackFunc(value);
            }, function () {
                callbackFunc(null);
            });
        }
    }, {
        key: 'getLongSelect',
        value: function getLongSelect(props, inputValue, callback) {
            var filter = null;
            if (Array.isArray(inputValue)) {
                filter = { or: inputValue.map(function (e) {
                        return _defineProperty({}, props.componentMeta.dataSource.key, e);
                    }) };
            } else {
                filter = _defineProperty({}, 'tolower(' + props.componentMeta.dataSource.value + ')', { contains: inputValue == null ? null : inputValue.toLowerCase() });
                var top = props.componentMeta.dataSource.count || 10;
            }
            var format = this.props.globalMeta.format;
            var query = (0, _odataQuery2.default)({ filter: filter, top: top, format: format });
            this.props.globalMeta.get('' + (props.componentMeta.dataSource.path || this.props.globalMeta.basePath + '/' + props.componentMeta.dataSource.shortPath) + query, function (data) {
                callback(data.value.map(function (v) {
                    return { label: v[props.componentMeta.dataSource.value], value: v[props.componentMeta.dataSource.key], extraData: v };
                }));
            });
        }
    }]);

    return OData;
}();

exports.default = OData;