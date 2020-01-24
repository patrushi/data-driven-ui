'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ConfirmationDialog;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfirmationDialog(props) {
    return _react2.default.createElement(
        _Dialog2.default,
        { open: props.open, onClose: props.onClose, 'aria-labelledby': 'form-dialog-title' },
        _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'form-dialog-title' },
            props.title
        ),
        _react2.default.createElement(
            _DialogContent2.default,
            null,
            props.children
        ),
        _react2.default.createElement(
            _DialogActions2.default,
            { style: { justifyContent: 'center' } },
            _react2.default.createElement(
                _Button2.default,
                { onClick: function onClick() {
                        props.onConfirm();props.onClose();
                    } },
                '\u0414\u0430'
            ),
            _react2.default.createElement(
                _Button2.default,
                { onClick: props.onClose },
                '\u041D\u0435\u0442'
            )
        )
    );
}