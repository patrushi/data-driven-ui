'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterPanel = function (_PureComponent) {
    _inherits(FilterPanel, _PureComponent);

    function FilterPanel() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FilterPanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilterPanel.__proto__ || Object.getPrototypeOf(FilterPanel)).call.apply(_ref, [this].concat(args))), _this), _this.getField = function (meta) {
            var globalMeta = _this.props.globalMeta.filterTypes[meta.type] || _this.props.globalMeta.filterTypes[_this.props.globalMeta.filterTypes.default];
            var props = _extends({
                meta: _this.props.meta,
                globalMeta: _this.props.globalMeta,
                componentMeta: meta,
                onChange: function onChange(value) {
                    return _this.props.functions.changeFilter(meta, value);
                },
                value: _this.props.data.filters[meta.name],
                label: _this.props.globalMeta.filters.label ? meta.title || meta.name : null,
                placeholder: _this.props.globalMeta.filters.placeholder ? meta.title || meta.name : null
            }, globalMeta.props, meta.props);
            var component = meta.component || globalMeta.component;
            return _react2.default.createElement(component, props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FilterPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (!this.props.meta.filters || !this.props.open) return null;

            var filtersLayout = this.props.meta.filtersLayout;


            if (!filtersLayout || !filtersLayout.type || filtersLayout.type === 'default') {
                var perLine = filtersLayout && filtersLayout.perLine || 3;
                var linesCnt = Math.floor((this.props.meta.filters.length - 1) / perLine) + 1;
                var filterLines = [];
                for (var i = 0; i < linesCnt; i++) {
                    filterLines.push(this.props.meta.filters.slice(i * perLine, (i + 1) * perLine));
                }
                var empty = [];
                if (linesCnt > 1) for (var _i = 0; _i < perLine * linesCnt - this.props.meta.filters.length; _i++) {
                    empty.push(_react2.default.createElement(_Grid2.default, { item: true, xs: true, key: 100 + _i }));
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'filter' },
                    filterLines.map(function (filters, rowIdx) {
                        return _react2.default.createElement(
                            _Grid2.default,
                            { container: true, key: rowIdx, spacing: 1 },
                            filters.map(function (filter, idx) {
                                return _react2.default.createElement(
                                    _Grid2.default,
                                    { item: true, xs: true, key: idx, style: { display: 'flex', alignItems: 'flex-begin' } },
                                    _this2.getField(filter)
                                );
                            }).concat(rowIdx + 1 === linesCnt ? empty : [])
                        );
                    })
                );
            }
        }
    }]);

    return FilterPanel;
}(_react.PureComponent);

exports.default = FilterPanel;