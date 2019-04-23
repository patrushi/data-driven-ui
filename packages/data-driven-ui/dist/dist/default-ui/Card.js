'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _reactFinalForm = require('react-final-form');

var _DialogWrapper = require('./DialogWrapper');

var _DialogWrapper2 = _interopRequireDefault(_DialogWrapper);

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

var Card = function (_PureComponent) {
    _inherits(Card, _PureComponent);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var component = !this.props.open ? null : _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_reactFinalForm.Form, {
                onSubmit: function onSubmit(values) {
                    _this2.props.onClose();_this2.props.onSubmit(values);
                },
                initialValues: this.props.item
                //validate={validate}
                , render: function render(_ref) {
                    var handleSubmit = _ref.handleSubmit,
                        pristine = _ref.pristine,
                        invalid = _ref.invalid;
                    return _react2.default.createElement('form', { onSubmit: handleSubmit }, _this2.props.meta.fields.map(function (field, idx) {
                        var key = _this2.props.functions.getFieldKey(field, idx);
                        return _react2.default.createElement('div', { key: key }, _react2.default.createElement(_reactFinalForm.Field, _extends({
                            name: key,
                            component: _this2.props.functions.getComponent(field)
                        }, _this2.props.functions.getComponentProps(field))));
                    }), _react2.default.createElement('button', { type: 'submit', disabled: pristine || invalid }, 'Submit'));
                }
            }));

            if (!component) return null;

            if (this.props.wrapped === 'card') {
                return _react2.default.createElement(_DialogWrapper2.default, { open: this.props.open, onClose: this.props.onClose }, component);
            } else {
                return component;
            }
        }
    }]);

    return Card;
}(_react.PureComponent);

exports.default = Card;