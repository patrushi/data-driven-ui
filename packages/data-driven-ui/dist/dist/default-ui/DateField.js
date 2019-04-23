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

exports.default = DateField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiPickers = require('material-ui-pickers');

var _moment = require('@date-io/moment');

var _moment2 = _interopRequireDefault(_moment);

var _core = require('@material-ui/core');

var _icons = require('@material-ui/icons');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

function DateField(props) {
    var meta = props.meta,
        globalMeta = props.globalMeta,
        componentMeta = props.componentMeta,
        component = props.component,
        _onChange = props.onChange,
        value = props.value,
        notClearable = props.notClearable,
        format = props.format,
        label = props.label,
        rest = _objectWithoutProperties(props, ['meta', 'globalMeta', 'componentMeta', 'component', 'onChange', 'value', 'notClearable', 'format', 'label']);

    var pickerRef = (0, _react.useRef)(null);

    var openPicker = (0, _react.useCallback)(function (e) {
        if (pickerRef.current) {
            pickerRef.current.open(e);
        }
    }, [pickerRef.current]);

    return _react2.default.createElement(_materialUiPickers.MuiPickersUtilsProvider, { utils: _moment2.default }, _react2.default.createElement(_materialUiPickers.InlineDatePicker, _extends({}, rest, {
        onlyCalendar: true,
        keyboard: true,
        clearable: !notClearable,
        label: label,
        value: value || null,
        format: format || "DD.MM.YYYY",
        onChange: function onChange(d) {
            return _onChange(d._d);
        },
        autoComplete: 'off',
        disableOpenOnEnter: true,
        InputLabelProps: { shrink: true },
        ref: pickerRef,
        InputProps: !notClearable ? {
            endAdornment: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_core.IconButton, { onClick: openPicker, style: { padding: '3px' }, disabled: props.disabled }, _react2.default.createElement(_icons.InsertInvitation, null)), _react2.default.createElement(_core.IconButton, { onClick: function onClick() {
                    return _onChange(undefined);
                }, style: { padding: '3px' }, disabled: props.disabled }, _react2.default.createElement(_icons.Clear, null)))
        } : undefined
    })));
}