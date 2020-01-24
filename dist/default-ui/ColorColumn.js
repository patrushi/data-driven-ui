'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ColorColumn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColorColumn(props) {
    return props.type === 'backgroundColor' ? !props.backgroundColor ? null : _react2.default.createElement(
        'div',
        { style: { backgroundColor: props.backgroundColor, color: props.color } },
        props.backgroundColor
    ) : !props.color ? null : _react2.default.createElement(
        'div',
        { style: { backgroundColor: props.backgroundColor, color: props.color } },
        props.color
    );
}