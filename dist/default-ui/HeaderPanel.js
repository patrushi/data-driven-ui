'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FilterList = require('@material-ui/icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _Refresh = require('@material-ui/icons/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

var _VpnKey = require('@material-ui/icons/VpnKey');

var _VpnKey2 = _interopRequireDefault(_VpnKey);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuButton = require('./MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _ConfirmationDialog = require('./ConfirmationDialog');

var _ConfirmationDialog2 = _interopRequireDefault(_ConfirmationDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderPanel = function (_PureComponent) {
    _inherits(HeaderPanel, _PureComponent);

    function HeaderPanel(props) {
        _classCallCheck(this, HeaderPanel);

        var _this = _possibleConstructorReturn(this, (HeaderPanel.__proto__ || Object.getPrototypeOf(HeaderPanel)).call(this, props));

        _this.confirm = function (action) {
            _this.setState({
                confirmationDialogOpen: true,
                confirmationDialogOnConfirm: action.onClick,
                confirmationDialogTitle: action.confirm.title ? action.confirm.title : 'Подтверждение',
                confirmationDialogMessage: action.confirm.message ? action.confirm.message : 'Вы уверены?'
            });
        };

        _this.state = {
            confirmationDialogOpen: false
        };
        return _this;
    }

    _createClass(HeaderPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = [];
            if (this.props.actions) children.push(_react2.default.createElement(
                _MenuButton2.default,
                { key: 'actions', popupTitle: '\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F ...' },
                this.props.actions.map(function (action, idx) {
                    var onClick = action.confirm ? function () {
                        return _this2.confirm(action);
                    } : action.onClick;
                    return _react2.default.createElement(
                        _MenuItem2.default,
                        { key: idx, onClick: onClick, disabled: action.disabled },
                        action.title
                    );
                })
            ));
            if (this.props.onKey) children.push(_react2.default.createElement(
                _IconButton2.default,
                { key: 'onKey', onClick: this.props.onKey, title: '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C/\u0441\u043A\u0440\u044B\u0442\u044C ID' },
                _react2.default.createElement(_VpnKey2.default, null)
            ));
            if (this.props.onFilterPanelClick) children.push(_react2.default.createElement(
                _IconButton2.default,
                { key: 'onFilterPanelClick', onClick: this.props.onFilterPanelClick, title: '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C/\u0441\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432' },
                _react2.default.createElement(_FilterList2.default, null)
            ));
            if (this.props.onRefresh) children.push(_react2.default.createElement(
                _IconButton2.default,
                { key: 'onRefresh', onClick: this.props.onRefresh, title: '\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C' },
                _react2.default.createElement(_Refresh2.default, null)
            ));
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'table',
                    { style: { width: '100%' } },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'td',
                                null,
                                this.props.title ? _react2.default.createElement(
                                    'h3',
                                    null,
                                    this.props.title
                                ) : null
                            ),
                            _react2.default.createElement(
                                'td',
                                { align: 'right' },
                                _react2.default.createElement(
                                    'div',
                                    { style: { marginRight: '-12px', position: 'relative' } },
                                    this.props.renderHeaderActions ? this.props.renderHeaderActions(children) : children
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _ConfirmationDialog2.default,
                    { open: this.state.confirmationDialogOpen, onClose: function onClose() {
                            return _this2.setState({ confirmationDialogOpen: false, confirmationDialogOnConfirm: null });
                        }, onConfirm: this.state.confirmationDialogOnConfirm, title: this.state.confirmationDialogTitle },
                    this.state.confirmationDialogMessage
                )
            );
        }
    }]);

    return HeaderPanel;
}(_react.PureComponent);

exports.default = HeaderPanel;