'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var errorHandler = exports.errorHandler = undefined;

var ErrorPanel = function (_PureComponent) {
    _inherits(ErrorPanel, _PureComponent);

    function ErrorPanel(props) {
        _classCallCheck(this, ErrorPanel);

        var _this = _possibleConstructorReturn(this, (ErrorPanel.__proto__ || Object.getPrototypeOf(ErrorPanel)).call(this, props));

        _this.state = {
            error: null,
            open: false
        };

        exports.errorHandler = errorHandler = function errorHandler(error) {
            _this.setState({ error: error, open: true });
        };
        return _this;
    }

    _createClass(ErrorPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _core.Dialog,
                { open: this.state.open, onClose: function onClose() {
                        return _this2.setState({ open: false });
                    }, 'aria-labelledby': 'form-dialog-title' },
                _react2.default.createElement(
                    _core.DialogTitle,
                    { id: 'form-dialog-title' },
                    this.props.title
                ),
                _react2.default.createElement(
                    _core.DialogContent,
                    null,
                    this.state.error ? this.state.error.toString() : null
                ),
                _react2.default.createElement(
                    _core.DialogActions,
                    null,
                    _react2.default.createElement(
                        _core.Button,
                        { onClick: function onClick() {
                                return _this2.setState({ open: false });
                            } },
                        'OK ...'
                    )
                )
            );
        }
    }]);

    return ErrorPanel;
}(_react.PureComponent);

exports.default = ErrorPanel;