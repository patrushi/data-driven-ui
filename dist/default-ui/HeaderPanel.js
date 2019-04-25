'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('@material-ui/icons');

var _core = require('@material-ui/core');

var _MenuButton = require('./MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderPanel = function (_PureComponent) {
    _inherits(HeaderPanel, _PureComponent);

    function HeaderPanel() {
        _classCallCheck(this, HeaderPanel);

        return _possibleConstructorReturn(this, (HeaderPanel.__proto__ || Object.getPrototypeOf(HeaderPanel)).apply(this, arguments));
    }

    _createClass(HeaderPanel, [{
        key: 'render',
        value: function render() {
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
                                this.props.onFilterPanelClick ? _react2.default.createElement(
                                    _core.IconButton,
                                    { onClick: this.props.onFilterPanelClick },
                                    _react2.default.createElement(_icons.FilterList, null)
                                ) : null,
                                this.props.actions ? _react2.default.createElement(
                                    _MenuButton2.default,
                                    null,
                                    this.props.actions.map(function (action, idx) {
                                        return _react2.default.createElement(
                                            _core.MenuItem,
                                            { key: idx, onClick: action.onClick, disabled: action.disabled },
                                            action.title
                                        );
                                    })
                                ) : null
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HeaderPanel;
}(_react.PureComponent);

exports.default = HeaderPanel;