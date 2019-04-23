'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var DialogWrapper = function (_PureComponent) {
    _inherits(DialogWrapper, _PureComponent);

    function DialogWrapper() {
        _classCallCheck(this, DialogWrapper);

        return _possibleConstructorReturn(this, (DialogWrapper.__proto__ || Object.getPrototypeOf(DialogWrapper)).apply(this, arguments));
    }

    _createClass(DialogWrapper, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Dialog2.default, { open: Boolean(this.props.open), onClose: this.props.onClose, 'aria-labelledby': 'form-dialog-title' }, _react2.default.createElement(_DialogTitle2.default, { id: 'form-dialog-title' }, this.props.title ? this.props.title : ''), _react2.default.createElement(_DialogContent2.default, null, this.props.children));
        }
    }]);

    return DialogWrapper;
}(_react.PureComponent);

exports.default = DialogWrapper;