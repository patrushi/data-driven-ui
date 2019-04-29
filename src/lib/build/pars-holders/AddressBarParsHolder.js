'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddressBarParsHolder = function AddressBarParsHolder(props) {
    var _this = this;

    _classCallCheck(this, AddressBarParsHolder);

    this.serializePars = function (meta, data) {
        var pars = {};

        // paging
        if (data.paging) {
            if (data.paging.page) pars.page = data.paging.page;
            if (data.paging.perPage !== 10) pars.perPage = data.paging.perPage;
        }

        // orders
        if (data.orders) {
            pars.orders = Object.keys(data.orders).filter(function (k) {
                return data.orders[k] !== undefined;
            }).map(function (k) {
                return k + (data.orders[k] === 'desc' ? ' desc' : '');
            }).join(',');
        }

        // filters
        if (data.filters) {
            var _loop = function _loop(name) {
                if (data.filters[name]) {
                    var filterMeta = meta.filters.filter(function (f) {
                        return f.name === name;
                    })[0];
                    var globalFilterMeta = _this.props.globalMeta.filters[filterMeta.type] || _this.props.globalMeta.filters[_this.props.globalMeta.filters.default];
                    pars[name] = globalFilterMeta.serialize(data.filters[name]);
                }
            };

            for (var name in data.filters) {
                _loop(name);
            }
        }

        var outPars = {};
        for (var k in pars) {
            if (pars[k]) outPars[k] = pars[k];
        }
        return outPars;
    };

    this.deserializePars = function (meta, pars) {
        if (!pars) return null;
        var data = {};

        // paging
        data.paging = { page: isNaN(pars.page) ? 0 : Number(pars.page), perPage: isNaN(pars.perPage) ? 10 : Number(pars.perPage) };

        // orders
        if (pars.orders) {
            var orders = {};
            pars.orders.split(',').forEach(function (i) {
                var c = i.split(' ');
                orders[c[0]] = c[1] === undefined ? 'asc' : c[1];
            });
            if (orders !== {}) data.orders = orders;
        }

        // filters
        if (meta.filters) {
            data.filters = {};

            var _loop2 = function _loop2(k) {
                var name = meta.filters[k].name;
                if (pars[name]) {
                    var filterMeta = meta.filters.filter(function (f) {
                        return f.name === name;
                    })[0];
                    var globalFilterMeta = _this.props.globalMeta.filters[filterMeta.type] || _this.props.globalMeta.filters[_this.props.globalMeta.filters.default];
                    data.filters[name] = globalFilterMeta.deserialize(pars[name]);
                }
            };

            for (var k in meta.filters) {
                _loop2(k);
            }
        }

        return data;
    };

    this.savePars = function (pars) {
        if (_this.props.meta.history == null) return;
        var locationSearch = _queryString2.default.stringify(pars);
        locationSearch = locationSearch ? '?' + locationSearch : locationSearch;
        if (_this.locationSearch === locationSearch) return;
        _this.locationSearch = locationSearch;
        _this.props.meta.history.push(_this.props.meta.history.location.pathname + locationSearch);
    };

    this.loadPars = function () {
        if (_this.props.meta.history == null) return;
        if (_this.props.meta.history.location.search === _this.locationSearch) return;
        _this.locationSearch = _this.props.meta.history.location.search;
        return _queryString2.default.parse(_this.locationSearch);
    };

    this.props = props;
};

exports.default = AddressBarParsHolder;