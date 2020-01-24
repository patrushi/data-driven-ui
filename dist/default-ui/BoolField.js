'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BoolField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LongSelect = require('./LongSelect');

var _LongSelect2 = _interopRequireDefault(_LongSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BoolField(props) {
    return _react2.default.createElement(_LongSelect2.default, _extends({
        style: { minWidth: '100px' }
    }, props, {
        withoutDatasource: true,
        fullWidth: false,
        defaultOptions: [{ value: true, label: 'Да' }, { value: false, label: 'Нет' }]
    }));
}