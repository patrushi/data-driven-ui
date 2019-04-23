'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectWithStyles = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Async = require('react-select/lib/Async');

var _Async2 = _interopRequireDefault(_Async);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Cancel = require('@material-ui/icons/Cancel');

var _Cancel2 = _interopRequireDefault(_Cancel);

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

var styles = function styles(theme) {
    return {
        root: {
            flexGrow: 1
        },
        input: {
            display: 'flex',
            padding: '0px 0px 5px 0px',
            minHeight: 28
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden'
        },
        chip: {
            margin: 2,
            height: 24
        },
        chipFocused: {
            backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
        },
        noOptionsMessage: {
            padding: 0,
            textAlign: 'left'
        },
        /* singleValue: {
            fontSize: 12,
        }, */
        placeholder: {
            position: 'absolute',
            left: 2
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: 0,
            left: 0,
            right: 0
        },
        divider: {
            height: 16
        }
    };
};

function NoOptionsMessage(props) {
    return _react2.default.createElement(_Typography2.default, _extends({
        color: 'textSecondary',
        className: props.selectProps.classes.noOptionsMessage
    }, props.innerProps), props.children);
}

function inputComponent(_ref) {
    var inputRef = _ref.inputRef,
        props = _objectWithoutProperties(_ref, ['inputRef']);

    return _react2.default.createElement('div', _extends({ ref: inputRef }, props));
}

function Control(props) {
    return _react2.default.createElement(_TextField2.default, _extends({
        fullWidth: true,
        InputProps: {
            inputComponent: inputComponent,
            inputProps: _extends({
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children
            }, props.innerProps)
        }
    }, props.selectProps.textFieldProps, {
        disabled: props.isDisabled
    }));
}

function Option(props) {
    return _react2.default.createElement(_MenuItem2.default, _extends({
        buttonRef: props.innerRef,
        selected: props.isFocused,
        component: 'div',
        style: {
            fontWeight: props.isSelected ? 500 : 400
        }
    }, props.innerProps), props.children);
}

function Placeholder(props) {
    return _react2.default.createElement(_Typography2.default, _extends({
        color: 'textSecondary',
        className: props.selectProps.classes.placeholder
    }, props.innerProps), props.children);
}

function SingleValue(props) {
    return _react2.default.createElement(_Typography2.default, _extends({ className: props.selectProps.classes.singleValue }, props.innerProps), props.children);
}

function ValueContainer(props) {
    return _react2.default.createElement('div', { className: props.selectProps.classes.valueContainer }, props.children);
}

function MultiValue(props) {
    return _react2.default.createElement(_Chip2.default, {
        tabIndex: -1,
        label: props.children,
        className: (0, _classnames2.default)(props.selectProps.classes.chip, _defineProperty({}, props.selectProps.classes.chipFocused, props.isFocused)),
        onDelete: props.removeProps.onClick,
        deleteIcon: _react2.default.createElement(_Cancel2.default, props.removeProps)
    });
}

function Menu(props) {
    return _react2.default.createElement(_Paper2.default, _extends({ square: true, className: props.selectProps.classes.paper }, props.innerProps), props.children);
}

var components = {
    Control: Control,
    Menu: Menu,
    MultiValue: MultiValue,
    NoOptionsMessage: NoOptionsMessage,
    Option: Option,
    Placeholder: Placeholder,
    SingleValue: SingleValue,
    ValueContainer: ValueContainer
};

var SelectWithStyles = exports.SelectWithStyles = function (_PureComponent) {
    _inherits(SelectWithStyles, _PureComponent);

    function SelectWithStyles() {
        _classCallCheck(this, SelectWithStyles);

        return _possibleConstructorReturn(this, (SelectWithStyles.__proto__ || Object.getPrototypeOf(SelectWithStyles)).apply(this, arguments));
    }

    _createClass(SelectWithStyles, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                theme = _props.theme;

            var selectStyles = {
                input: function input(base) {
                    return _extends({}, base, {
                        color: theme.palette.text.primary,
                        '& input': {
                            font: 'inherit'
                        }
                    });
                }
            };

            return _react2.default.createElement('div', { style: this.props.fullWidth ? { width: '100%' } : {} }, _react2.default.createElement(_Async2.default, _extends({
                classes: classes,
                styles: selectStyles,
                textFieldProps: {
                    label: this.props.label,
                    InputLabelProps: {
                        shrink: true
                    }
                }
            }, this.props, {
                components: _extends({}, components, this.props.components)
            })));
        }
    }]);

    return SelectWithStyles;
}(_react.PureComponent);

exports.default = (0, _styles.withStyles)(styles, { withTheme: true })(SelectWithStyles);