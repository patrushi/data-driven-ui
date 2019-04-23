'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectWithStyles = require('./SelectWithStyles');

var _SelectWithStyles2 = _interopRequireDefault(_SelectWithStyles);

var _debounce = require('../core/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var LongSelect = function (_PureComponent) {
    _inherits(LongSelect, _PureComponent);

    function LongSelect(props) {
        _classCallCheck(this, LongSelect);

        var _this2 = _possibleConstructorReturn(this, (LongSelect.__proto__ || Object.getPrototypeOf(LongSelect)).call(this, props));

        _this2.setValue = function (value) {
            _this2.value = value;
            _this2.key = value == null ? null : Array.isArray(value) ? value.map(function (e) {
                return e.value;
            }) : value.value;
        };

        _this2.setKey = function (key) {
            _this2.key = key;
        };

        _this2.loadOptionsFunc = function () {
            if (_this2.dataSource) {
                return (0, _debounce2.default)(function (inputValue, callback) {
                    return _this2.dataSource.getLongSelect(_this2.props, inputValue, callback);
                }, 200);
            }
        };

        _this2.compareValue = function (v1, v2) {
            if (v1 === null || v2 === null || v1 === v2) {
                return v1 === v2;
            } else if (Array.isArray(v1) && Array.isArray(v2)) {
                return v1.length === v2.length && v1.sort().every(function (value, index) {
                    return value === v2.sort()[index];
                });
            } else {
                return v1 === v2;
            }
        };

        _this2.setValueFromProps = function (value) {
            if (!value || Array.isArray(value) && value.length === 0) {
                _this2.setValue(null);
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value) || Array.isArray(value) && _typeof(value[0]) === 'object') {
                _this2.setValue(value);
            } else {
                if (_this2.compareValue(_this2.key, value)) {
                    return;
                }
                var _this = _this2;

                _this2.setKey(value);
                _this2.dataSource.getLongSelect(_this2.props, Array.isArray(value) ? value : [value], function (data) {
                    _this.setValue(data);
                });
            }
        };

        _this2.onChange = function (value) {
            _this2.setValue(value);
            if (_this2.props.onChange) {
                _this2.props.onChange(_this2.key);
            }
        };

        _this2.componentDidMount = function () {
            _this2.setValueFromProps(_this2.props.value);
        };

        _this2.componentDidUpdate = function () {
            _this2.setValueFromProps(_this2.props.value);
        };

        _this2.value = undefined;
        _this2.key = undefined;

        if (_this2.props.meta.dataSource) {
            var dataSource = _this2.props.meta.dataSource;
            var globalMeta = _this2.props.globalMeta.dataSourceTypes[dataSource.type || _this2.props.globalMeta.dataSourceTypes.default];
            _this2.dataSource = new globalMeta.class({ meta: dataSource, globalMeta: globalMeta });
        }
        return _this2;
    }

    _createClass(LongSelect, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                componentMeta = _props.componentMeta,
                value = _props.value,
                onChange = _props.onChange,
                extraData = _props.extraData,
                components = _props.components,
                disabled = _props.disabled,
                clearable = _props.clearable,
                rest = _objectWithoutProperties(_props, ['componentMeta', 'value', 'onChange', 'extraData', 'components', 'disabled', 'clearable']);

            if (extraData) {
                if (components === undefined) components = {};
                components.Option = function (props) {
                    return _react2.default.createElement(_MenuItem2.default, _extends({
                        buttonRef: props.innerRef,
                        selected: props.isFocused,
                        component: 'div',
                        style: {
                            fontWeight: props.isSelected ? 500 : 400,
                            maxHeight: '100px',
                            height: 'auto'
                        }
                    }, props.innerProps), _react2.default.createElement('div', null, props.children, props.data && props.data.extraData ? _react2.default.createElement('div', { style: { fontSize: 10 } }, extraData(props.data.extraData)) : null));
                };
            }

            return _react2.default.createElement(_SelectWithStyles2.default, _extends({}, componentMeta, {
                onChange: this.onChange,
                value: this.value,
                fullWidth: true,
                loadOptions: this.loadOptionsFunc(),
                components: components
            }, rest, {
                isClearable: clearable === false ? false : true,
                isDisabled: disabled
            }));
        }
    }]);

    return LongSelect;
}(_react.PureComponent);

exports.default = LongSelect;