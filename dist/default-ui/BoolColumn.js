"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BoolColumn;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Check = require("@material-ui/icons/Check");

var _Check2 = _interopRequireDefault(_Check);

var _Clear = require("@material-ui/icons/Clear");

var _Clear2 = _interopRequireDefault(_Clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BoolColumn(props) {
    return props.meta.threeState ? props.value === true ? _react2.default.createElement(_Check2.default, null) : props.value === false ? _react2.default.createElement(_Clear2.default, null) : null : props.value ? _react2.default.createElement(_Check2.default, null) : null;
}