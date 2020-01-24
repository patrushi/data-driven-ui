'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultValue = "<>";

var ShortSelect = function (_PureComponent) {
    _inherits(ShortSelect, _PureComponent);

    function ShortSelect(props) {
        _classCallCheck(this, ShortSelect);

        var _this = _possibleConstructorReturn(this, (ShortSelect.__proto__ || Object.getPrototypeOf(ShortSelect)).call(this, props));

        _this.componentDidMount = function () {
            var componentMeta = _this.props.componentMeta;

            if (componentMeta.options) {
                _this.setState({ options: componentMeta.options });
            } else if (componentMeta.dataSource) {
                _this.dataSource.getLongSelect(_this.props, '', function (values) {
                    _this.setState({ options: values.map(function (v) {
                            return { key: v.label, value: v.value };
                        }) });
                });
            }
        };

        if (_this.props.meta.dataSource) {
            var dataSource = _this.props.meta.dataSource;
            var globalMeta = _this.props.globalMeta.dataSourceTypes[dataSource.type || _this.props.globalMeta.dataSourceTypes.default];
            _this.dataSource = new globalMeta.class({ meta: dataSource, globalMeta: globalMeta });
        }

        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(ShortSelect, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                meta = _props.meta,
                globalMeta = _props.globalMeta,
                componentMeta = _props.componentMeta,
                component = _props.component,
                _onChange = _props.onChange,
                value = _props.value,
                notClearable = _props.notClearable,
                rest = _objectWithoutProperties(_props, ['meta', 'globalMeta', 'componentMeta', 'component', 'onChange', 'value', 'notClearable']);

            return _react2.default.createElement(
                _TextField2.default,
                _extends({}, rest, {
                    onChange: function onChange(e) {
                        return _onChange(e.target.value === defaultValue ? null : e.target.value);
                    },
                    value: value || defaultValue,
                    id: 'standard-full-width',
                    fullWidth: true,
                    select: true,
                    InputLabelProps: { shrink: true }
                }),
                _react2.default.createElement(_MenuItem2.default, { key: defaultValue, value: defaultValue }),
                this.state.options.map(function (option) {
                    return _react2.default.createElement(
                        _MenuItem2.default,
                        { key: option.key, value: option.key },
                        option.value || option.key
                    );
                })
            );
        }
    }]);

    return ShortSelect;
}(_react.PureComponent);

exports.default = ShortSelect;