'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DateField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiPickers = require('material-ui-pickers');

var _moment = require('@date-io/moment');

var _moment2 = _interopRequireDefault(_moment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Clear = require('@material-ui/icons/Clear');

var _Clear2 = _interopRequireDefault(_Clear);

var _InsertInvitation = require('@material-ui/icons/InsertInvitation');

var _InsertInvitation2 = _interopRequireDefault(_InsertInvitation);

var _moment3 = require('moment');

var _moment4 = _interopRequireDefault(_moment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//import "moment/locale/ru";
_moment4.default.locale(window.data_driven_ui_locale);

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

    var convertToDate = function convertToDate(value) {
        return !value ? value : (0, _moment4.default)(value).startOf('day');
    };

    var lFormat = componentMeta.time ? "DD.MM.YYYY HH:mm:ss" : "DD.MM.YYYY";
    var width = componentMeta.time ? '210px' : '160px';

    return _react2.default.createElement(
        _materialUiPickers.MuiPickersUtilsProvider,
        { utils: _moment2.default, locale: 'ru' },
        _react2.default.createElement(_materialUiPickers.InlineDatePicker, _extends({}, rest, {
            style: { width: width },
            onlyCalendar: true,
            keyboard: true,
            clearable: !notClearable,
            label: label,
            value: value || null,
            format: format || lFormat,
            onChange: function onChange(d) {
                return _onChange(convertToDate(d));
            },
            autoComplete: 'off',
            disableOpenOnEnter: true,
            InputLabelProps: { shrink: true },
            ref: pickerRef,
            InputProps: !notClearable ? {
                endAdornment: _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _IconButton2.default,
                        { onClick: openPicker, style: { padding: '3px' }, disabled: props.disabled },
                        _react2.default.createElement(_InsertInvitation2.default, null)
                    ),
                    _react2.default.createElement(
                        _IconButton2.default,
                        { onClick: function onClick() {
                                return _onChange(undefined);
                            }, style: { padding: '3px' }, disabled: props.disabled },
                        _react2.default.createElement(_Clear2.default, null)
                    )
                )
            } : undefined
        }))
    );
}