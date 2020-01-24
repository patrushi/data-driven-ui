"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Menu = require("@material-ui/core/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _MoreVert = require("@material-ui/icons/MoreVert");

var _MoreVert2 = _interopRequireDefault(_MoreVert);

var _KeyboardArrowDown = require("@material-ui/icons/KeyboardArrowDown");

var _KeyboardArrowDown2 = _interopRequireDefault(_KeyboardArrowDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuButton = function (_PureComponent) {
    _inherits(MenuButton, _PureComponent);

    function MenuButton(props) {
        _classCallCheck(this, MenuButton);

        var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, props));

        _this.onOpen = function (event) {
            event.stopPropagation();
            _this.setState({ anchorEl: event.currentTarget });
        };

        _this.onClose = function () {
            _this.setState({ anchorEl: null });
        };

        _this.state = {
            anchorEl: null
        };
        return _this;
    }

    _createClass(MenuButton, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var children = !this.props.children ? null : _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.isValidElement(child) ? _react2.default.cloneElement(child, {
                    onClick: function onClick(event) {
                        _this2.onClose();child.props.onClick(event);
                    }
                }) : child;
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.title ? _react2.default.createElement(
                    _Button2.default,
                    { onClick: this.onOpen, disabled: this.props.disabled },
                    this.props.title,
                    " ",
                    _react2.default.createElement(_KeyboardArrowDown2.default, { style: { marginRight: '5px' } })
                ) : _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.onOpen, disabled: this.props.disabled, title: this.props.popupTitle },
                    _react2.default.createElement(_MoreVert2.default, null)
                ),
                _react2.default.createElement(
                    _Menu2.default,
                    {
                        anchorEl: this.state.anchorEl,
                        open: Boolean(this.state.anchorEl),
                        onClose: this.onClose,
                        getContentAnchorEl: null,
                        anchorOrigin: { vertical: "bottom", horizontal: "center" } },
                    children
                )
            );
        }
    }]);

    return MenuButton;
}(_react.PureComponent);

exports.default = MenuButton;