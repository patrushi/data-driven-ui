'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateField = require('./DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _icons = require('@material-ui/icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePeriodField = function (_PureComponent) {
    _inherits(DatePeriodField, _PureComponent);

    function DatePeriodField() {
        _classCallCheck(this, DatePeriodField);

        return _possibleConstructorReturn(this, (DatePeriodField.__proto__ || Object.getPrototypeOf(DatePeriodField)).apply(this, arguments));
    }

    _createClass(DatePeriodField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                placeholder = _props.placeholder,
                _onChange = _props.onChange,
                value = _props.value,
                rest = _objectWithoutProperties(_props, ['label', 'placeholder', 'onChange', 'value']);

            if (!value) value = {};
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_DateField2.default, _extends({}, rest, {
                    label: label,
                    value: value.from,
                    placeholder: placeholder,
                    onChange: function onChange(v) {
                        return _onChange(v === undefined && value.till === undefined ? undefined : { from: v, till: value.till });
                    } })),
                _react2.default.createElement(_icons.Remove, { style: label ? { marginTop: '16px' } : undefined }),
                _react2.default.createElement(_DateField2.default, _extends({}, rest, {
                    label: label ? ' ' : undefined,
                    value: value.till,
                    onChange: function onChange(v) {
                        return _onChange(v === undefined && value.from === undefined ? undefined : { from: value.from, till: v });
                    } }))
            );
        }
    }]);

    return DatePeriodField;
}(_react.PureComponent);

exports.default = DatePeriodField;