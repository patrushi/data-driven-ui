'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('@material-ui/core/Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require('@material-ui/core/TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require('@material-ui/core/TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TablePagination = require('@material-ui/core/TablePagination');

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _TableRow = require('@material-ui/core/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableSortLabel = require('@material-ui/core/TableSortLabel');

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _MenuButton = require('./MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_PureComponent) {
    _inherits(List, _PureComponent);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Table2.default,
                    { className: 'list' },
                    _react2.default.createElement(
                        _TableHead2.default,
                        null,
                        _react2.default.createElement(
                            _TableRow2.default,
                            null,
                            this.props.meta.selectable && (this.props.meta.selectable.type === 'row&checkbox' || this.props.meta.selectable.type === 'checkbox' || this.props.meta.selectable.type === undefined && this.props.meta.selectable.isMulti) ? _react2.default.createElement(
                                _TableCell2.default,
                                { style: { padding: '0px', textAlign: 'center' } },
                                this.props.meta.selectable.isMulti ? _react2.default.createElement(_Checkbox2.default, {
                                    indeterminate: this.props.data.selected.length > 0 && this.props.data.selected.length < this.props.data.items.length,
                                    checked: this.props.data.selected.length !== 0 && this.props.data.selected.length === this.props.data.items.length,
                                    onChange: this.props.functions.selectAll,
                                    color: 'default' }) : null
                            ) : null,
                            this.props.meta.columns.map(function (item, idx) {
                                return _react2.default.createElement(
                                    _TableCell2.default,
                                    { key: _this2.props.functions.getColumnKey(item, idx), style: { width: Math.round(100 / _this2.props.meta.columns.length) + '%' } },
                                    item.orderable || item.orderable === undefined && _this2.props.meta.orderable ? _react2.default.createElement(
                                        _TableSortLabel2.default,
                                        {
                                            direction: _this2.props.data.orders[item.name] === 'asc' ? 'desc' : _this2.props.data.orders[item.name] === 'desc' ? 'asc' : undefined,
                                            active: !(_this2.props.data.orders[item.name] === undefined),
                                            onClick: function onClick() {
                                                return _this2.props.functions.changeColumnOrder(item);
                                            } },
                                        _this2.props.functions.renderColumnTitle(item)
                                    ) : _this2.props.functions.renderColumnTitle(item)
                                );
                            }),
                            this.props.functions.hasRowActions() ? _react2.default.createElement(_TableCell2.default, { style: { width: '0%' } }) : null
                        )
                    ),
                    _react2.default.createElement(
                        _TableBody2.default,
                        null,
                        this.props.data.items.map(function (item, rowIdx) {
                            var key = _this2.props.functions.getRowKey(item, rowIdx);
                            var tableRowProps = _this2.props.meta.selectable && (_this2.props.meta.selectable.type === 'row&checkbox' || _this2.props.meta.selectable.type === 'row' || _this2.props.meta.selectable.type === undefined) ? {
                                hover: true,
                                onClick: function onClick(event) {
                                    return _this2.props.functions.select(key, event);
                                },
                                role: "checkbox",
                                tabIndex: -1,
                                selected: _this2.props.functions.isSelected(key)
                            } : null;
                            return _react2.default.createElement(
                                _TableRow2.default,
                                _extends({ key: rowIdx }, tableRowProps, { style: _this2.props.functions.getRowStyle(item, rowIdx) }),
                                _this2.props.meta.selectable && (_this2.props.meta.selectable.type === 'row&checkbox' || _this2.props.meta.selectable.type === 'checkbox' || _this2.props.meta.selectable.type === undefined && _this2.props.meta.selectable.isMulti) ? _react2.default.createElement(
                                    _TableCell2.default,
                                    { padding: 'checkbox' },
                                    _react2.default.createElement(_Checkbox2.default, { color: 'default', checked: _this2.props.functions.isSelected(key), onClick: function onClick(event) {
                                            return _this2.props.functions.select(key, event);
                                        } })
                                ) : null,
                                _this2.props.meta.columns.map(function (meta, columnIdx) {
                                    var canCellClick = _this2.props.functions.canCellClick(meta, item, rowIdx, columnIdx);
                                    return _react2.default.createElement(
                                        _TableCell2.default,
                                        { style: _this2.props.functions.getCellStyle(meta, item, rowIdx, columnIdx), key: _this2.props.functions.getColumnKey(meta, columnIdx), onClick: canCellClick ? function (event) {
                                                return _this2.props.functions.onCellClick(meta, item, rowIdx, columnIdx, event);
                                            } : undefined },
                                        _this2.props.functions.renderCell(meta, item, rowIdx, columnIdx)
                                    );
                                }),
                                _this2.props.functions.hasRowActions() ? _react2.default.createElement(
                                    _TableCell2.default,
                                    { className: 'actions' },
                                    _react2.default.createElement(
                                        _MenuButton2.default,
                                        null,
                                        _this2.props.functions.getRowActions().map(function (action, idx) {
                                            return _react2.default.createElement(
                                                _core.MenuItem,
                                                { key: idx, onClick: function onClick() {
                                                        return action.onClick(item);
                                                    }, disabled: action.disabled },
                                                action.title
                                            );
                                        })
                                    )
                                ) : null
                            );
                        })
                    )
                ),
                !this.props.meta.paging || !this.props.data.count || this.props.meta.paging.showIfSingle === false && this.props.data.count <= this.props.data.paging.perPage ? null : _react2.default.createElement(_TablePagination2.default, _extends({
                    count: this.props.data.count,
                    rowsPerPage: this.props.data.paging.perPage,
                    page: this.props.data.paging.page,
                    onChangePage: function onChangePage(event, page) {
                        return _this2.props.functions.changePage(page);
                    },
                    onChangeRowsPerPage: function onChangeRowsPerPage(event) {
                        return _this2.props.functions.changePerPage(event.target.value);
                    },
                    rowsPerPageOptions: this.props.data.paging.perPageOptions,
                    component: 'div',
                    backIconButtonProps: {
                        'aria-label': 'Previous Page'
                    },
                    nextIconButtonProps: {
                        'aria-label': 'Next Page'
                    }
                }, this.props.globalMeta.paging.props))
            );
        }
    }]);

    return List;
}(_react.PureComponent);

exports.default = List;