'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _HeaderPanel = require('../default-ui/HeaderPanel');

var _HeaderPanel2 = _interopRequireDefault(_HeaderPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var qs = require('query-string');
/* const equal = require('fast-deep-equal'); */
var merge = require('deepmerge');

Object.filter = function (obj, predicate) {
    return Object.keys(obj).filter(function (key) {
        return predicate(obj[key]);
    })
    // eslint-disable-next-line
    .reduce(function (res, key) {
        return res[key] = obj[key], res;
    }, {});
};

var List = function (_PureComponent) {
    _inherits(List, _PureComponent);

    function List(props) {
        _classCallCheck(this, List);

        var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this2.changeShowKeyColumn = function () {
            _this2.setState({ showKeyColumn: !_this2.state.showKeyColumn });
        };

        _this2.getFiltersQueryString = function (filters) {
            var fs = filters ? filters : Object.keys(_this2.state.filters);
            var pars = {};
            for (var f in fs) {
                var name = fs[f];
                if (_this2.state.filters[name]) pars[name] = JSON.stringify(_this2.state.filters[name]);
            }
            return qs.stringify(pars);
        };

        _this2.getFilterForQueryUrl = function () {
            return _this2.dataSource.getFilterForQueryUrl(_this2.props.meta, _this2.state, _this2.props);
        };

        _this2.renderColumnTitle = function (meta) {
            return !meta.title ? meta.name : meta.title;
        };

        _this2.renderCell = function (meta, item, rowIdx, columnIdx) {
            var value = meta.render ? meta.render(meta, item, rowIdx, columnIdx) : meta.dataSource && meta.dataSource.path ? _this2.getValueFromPath(item, meta.dataSource.path, 0) : item[meta.name];

            var type = meta.type;

            var columnTypeMeta = _this2.props.globalMeta.columnTypes[type];

            if (columnTypeMeta) {
                if (columnTypeMeta.renderFunc) {
                    value = columnTypeMeta.renderFunc(meta.name, value, meta);
                }
            }

            return value;
        };

        _this2.getCellStyle = function (meta, item, rowIdx, columnIdx) {
            var style = meta.style ? meta.style(meta, item, rowIdx, columnIdx) : {};

            if (_this2.canCellClick(meta, item, rowIdx, columnIdx)) {
                style = _extends({}, style, { cursor: 'pointer' });
            }

            if (_this2.props.meta.row && _this2.props.meta.row.styleForCells) {
                style = _extends({}, style, _this2.props.meta.row.style(item, rowIdx));
            }

            return style;
        };

        _this2.getRowStyle = function (item, rowIdx) {
            var style = _this2.props.meta.row && _this2.props.meta.row.style && !_this2.props.meta.row.styleForCells ? _this2.props.meta.row.style(item, rowIdx) : {};

            return style;
        };

        _this2.getValueFromPath = function (item, path, i) {
            return i + 1 >= path.length || !item[path[i]] ? item[path[i]] : _this2.getValueFromPath(item[path[i]], path, i + 1);
        };

        _this2.changeColumnOrder = function (meta) {
            var currentOrder = _this2.state.orders[meta.name];
            var newOrder = currentOrder === undefined ? 'asc' : currentOrder === 'asc' ? 'desc' : undefined;
            _this2.setState({
                orders: _extends({}, _this2.state.orders, _defineProperty({}, meta.name, newOrder)),
                ordersModified: _extends({}, _this2.state.ordersModified, _defineProperty({}, meta.name, true)),
                paging: _extends({}, _this2.state.paging, { page: 0 })
            }, function () {
                return _this2.refresh(false);
            });
        };

        _this2.changePage = function (page) {
            _this2.setState({ paging: _extends({}, _this2.state.paging, { page: page }) }, function () {
                return _this2.refresh(false);
            });
        };

        _this2.changePerPage = function (perPage) {
            _this2.setState({ paging: _extends({}, _this2.state.paging, { perPage: perPage }) }, function () {
                return _this2.refresh(false);
            });
        };

        _this2.changeFilter = function (meta, value) {
            if (_this2.state.filters[meta.name] === value) return;

            var globalMetaFilter = _this2.props.globalMeta.filterTypes[meta.type] || _this2.props.globalMeta.filterTypes[_this2.props.globalMeta.filterTypes.default];

            _this2.setState({
                filters: _extends({}, _this2.state.filters, _defineProperty({}, meta.name, value)),
                filtersModified: _extends({}, _this2.state.filtersModified, _defineProperty({}, meta.name, true)),
                paging: _extends({}, _this2.state.paging, { page: 0 })
            }, function () {
                if (_this2.props.globalMeta.filters.autoRefresh !== false) {
                    if (globalMetaFilter.debounce) _this2.refreshWithDebounce(true);else _this2.refresh(true);
                }
                if (_this2.props.onChangeFilter) _this2.props.onChangeFilter(meta, value);
            });
        };

        _this2.refresh = function (needCount) {
            if (_this2.props.onRefreshBefore) _this2.props.onRefreshBefore();
            _this2.setState({ isLoading: true });
            _this2.serializePars();
            if (_this2.dataSource) {
                _this2.dataSource.getList(needCount, _this2.props.meta, _this2.state, _this2.props.globalMeta, _this2.refreshCallback, _this2.props);
            }
            if (_this2.props.onRefreshAfter) _this2.props.onRefreshAfter();
        };

        _this2.getRowKey = function (item, idx) {
            return _this2.props.meta.key ? item[_this2.props.meta.key] : _this2.props.meta.keyFunc ? _this2.props.meta.keyFunc(item) : idx;
        };

        _this2.getColumnKey = function (meta, idx) {
            return meta.name ? meta.name : idx;
        };

        _this2.getColumns = function () {
            return _this2.state.showKeyColumn ? [{ name: _this2.props.meta.key, title: 'ID' }].concat(_toConsumableArray(_this2.props.meta.columns)) : _this2.props.meta.columns;
        };

        _this2.refreshCallback = function (data) {
            if (!data) {
                _this2.setState({ isLoading: false });
                return;
            }

            if (data.count !== undefined && data.items !== undefined) {
                _this2.setState({ count: data.count, items: data.items, isLoading: false });
            } else if (data.count !== undefined) {
                _this2.setState({ count: data.count, isLoading: false });
            } else if (data.items !== undefined) {
                _this2.setState({ items: data.items, isLoading: false });
            }
            if (_this2.props.onChangeItems) _this2.props.onChangeItems(data);
        };

        _this2.check = function (id, event, item) {
            event.stopPropagation();

            var checked = _this2.state.checked;

            var checkedIndex = checked.indexOf(id);
            var newChecked = [];

            if (checkedIndex === -1) {
                newChecked = newChecked.concat(checked, id);
            } else if (checkedIndex === 0) {
                newChecked = newChecked.concat(checked.slice(1));
            } else if (checkedIndex === checked.length - 1) {
                newChecked = newChecked.concat(checked.slice(0, -1));
            } else if (checkedIndex > 0) {
                newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));
            }

            _this2.setState({ checked: newChecked });
            if (_this2.props.onCheck) _this2.props.onCheck(checkedIndex === -1, [id], newChecked, item);
        };

        _this2.checkAll = function (event) {
            var checked = event.target.checked ? _this2.state.items.map(function (n, i) {
                return _this2.getRowKey(n, i);
            }) : [];
            _this2.setState({ checked: checked });
            if (_this2.props.onCheck) _this2.props.onCheck(event.target.checked, checked, checked);
        };

        _this2.isChecked = function (id) {
            return _this2.state.checked.indexOf(id) !== -1;
        };

        _this2.select = function (id, event, item) {
            //event.stopPropagation();

            _this2.setState({ selected: id });

            if (_this2.props.onSelect) _this2.props.onSelect(id, item);
        };

        _this2.isSelected = function (id) {
            return _this2.state.selected === id;
        };

        _this2.onCellClick = function (meta, item, rowIdx, columnIdx, event) {
            var filterSetFromColumn = _this2.props.globalMeta.columns.filterSetFromColumn;
            if (meta.filter === false || !filterSetFromColumn || !filterSetFromColumn.default || !_this2.props.meta.filters.some(function (e) {
                return e.name === meta.name;
            })) return;

            if (filterSetFromColumn.altKey && !event.altKey) return;

            if (filterSetFromColumn.stopPropagation !== false) event.stopPropagation();

            var metaFilter = meta.filter ? meta.filter : {};
            var filterName = metaFilter.name || meta.name;
            var filterMeta = _this2.props.meta.filters.filter(function (e) {
                return e.name === filterName;
            })[0];
            var filterMetaType = _this2.props.globalMeta.filterTypes[filterMeta.type] || _this2.props.globalMeta.filterTypes[_this2.props.globalMeta.filterTypes.default];
            var filterCurrentValue = _this2.state.filters[filterName];
            var func = metaFilter.setFromColumn || filterMetaType.setFromColumn || function (value) {
                return value;
            };
            var filterValues = func(item[meta.name], item, event, filterCurrentValue);
            _this2.changeFilter(filterMeta, filterMeta.isMulti ? [filterValues] : filterValues);
        };

        _this2.canCellClick = function (meta, item, rowIdx, columnIdx) {
            var filterSetFromColumn = _this2.props.globalMeta.columns.filterSetFromColumn;
            return meta.filter || filterSetFromColumn && filterSetFromColumn.default && _this2.props.meta.filters.some(function (e) {
                return e.name === meta.name;
            });
        };

        _this2.serializePars = function () {
            if (!_this2.parsHolder) return;
            var pars = _this2.parsHolder.serializePars(_this2.props.meta, _this2.state);
            _this2.parsHolder.savePars(pars);
        };

        _this2.deserializePars = function (setStateCallback, refreshAlways) {
            if (!_this2.parsHolder) return;
            var pars = _this2.parsHolder.loadPars();
            var newState = _this2.parsHolder.deserializePars(_this2.props.meta, pars);
            if (newState) _this2.setState(merge(_this2.state, newState), setStateCallback);else if (refreshAlways) setStateCallback();
        };

        _this2.onFilterPanelClick = function () {
            _this2.setState({ isFilterPanelOpen: !_this2.state.isFilterPanelOpen });
        };

        _this2.getActions = function () {
            if (!_this2.props.meta.actions) return null;
            var actions = [];

            var _loop = function _loop() {
                var action = _this2.props.meta.actions[k];
                if (!action) return 'continue';
                if (action.type === 'delete') actions.push({ title: 'Удалить', onClick: function onClick() {
                        return action.onClick(_this2.state.checked);
                    }, disabled: _this2.state.checked.length === 0 });else if (action.type === 'create') actions.push({ title: 'Создать', onClick: function onClick() {
                        return action.onClick(_this2.state.checked);
                    } });else actions.push(action);
            };

            for (var k in _this2.props.meta.actions) {
                var _ret = _loop();

                if (_ret === 'continue') continue;
            }
            return actions;
        };

        _this2.hasRowActions = function () {
            return _this2.props.meta.rowActions;
        };

        _this2.getRowActions = function (item) {
            if (!_this2.props.meta.rowActions) return null;
            var actions = [];

            var _loop2 = function _loop2() {
                var action = _this2.props.meta.rowActions[k];
                if (action.type === 'delete') actions.push({ title: 'Удалить', onClick: function onClick(item, event) {
                        event.stopPropagation();action.onClick(item);
                    } });else if (action.type === 'edit') actions.push({ title: 'Редактировать', onClick: function onClick(item, event) {
                        event.stopPropagation();_this2.props.onEdit(item);
                    } });else actions.push(action);
            };

            for (var k in _this2.props.meta.rowActions) {
                _loop2();
            }
            return actions;
        };

        _this2.currentProps = props;

        _this2.state = {
            orders: [],
            ordersModified: {},
            filters: {},
            filtersModified: {},
            items: [],
            checked: [],
            selected: null,
            isFilterPanelOpen: true,
            isEditCardOpen: false,
            currentItem: null,
            showKeyColumn: false
        };

        if (props.meta.paging) {
            _this2.state.paging = {
                page: props.meta.paging.page || props.globalMeta.paging && props.globalMeta.paging.page || 0,
                perPage: props.meta.paging.perPage || props.globalMeta.paging && props.globalMeta.paging.perPage || 10,
                perPageOptions: props.meta.paging.perPageOptions || props.globalMeta.paging && props.globalMeta.paging.perPageOptions || [10, 100]
            };
        }

        _this2.refreshWithDebounce = (0, _debounce2.default)(_this2.refresh, 200);

        if (_this2.props.meta.parsHolder) {
            var globalMeta = _this2.props.globalMeta.parsHolderTypes[_this2.props.meta.parsHolder.type || _this2.props.globalMeta.parsHolderTypes.default];
            _this2.parsHolder = new globalMeta.class({ meta: _this2.props.meta.parsHolder, globalMeta: globalMeta });
        }

        if (_this2.props.meta.dataSource) {
            var _globalMeta = _this2.props.globalMeta.dataSourceTypes[_this2.props.meta.dataSource.type || _this2.props.globalMeta.dataSourceTypes.default];
            _this2.dataSource = new _globalMeta.class({ meta: _this2.props.meta.dataSource, globalMeta: _globalMeta });
        }
        return _this2;
    }

    _createClass(List, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var _this = this;
            this.initialize(function () {
                if (_this3.props.setRef) _this3.props.setRef(_this3);
                if (!_this3.parsHolder) {
                    if (_this3.props.onAfterInitialize) _this3.props.onAfterInitialize(_this3);
                    if (_this.props.autoRefresh !== false || _this.props.refreshOnInit !== false) _this.refresh(true);
                } else {
                    _this3.deserializePars(function () {
                        if (_this3.props.onAfterInitialize) _this3.props.onAfterInitialize(_this3);
                        if (_this.props.autoRefresh !== false || _this.props.refreshOnInit !== false) _this.refresh(true);
                    }, true);
                }
            });
        }
    }, {
        key: 'initialize',
        value: function initialize(callback) {
            var filters = {};
            for (var fk in Object.filter(this.props.meta.filters, function (f) {
                return f.initial !== undefined;
            })) {
                var filter = this.props.meta.filters[fk];
                filters[filter.name] = filter.initial;
            }
            var orders = (this.props.meta.orderable || {}).initial;
            this.setState({
                filters: _extends({}, this.state.filters, filters),
                orders: _extends({}, this.state.orders, orders)
            }, callback);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /* let _this = this;
              if (!equal(this.currentProps, this.props)) {
                this.currentProps = this.props;
                this.refresh(true);
            }
              this.deserializePars(() => {
                if (_this.props.autoRefresh !== false) _this.refresh(true);
            }); */
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.setRef) this.props.setRef(null);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var props = _extends({}, this.props, {
                data: this.state,
                functions: {
                    renderColumnTitle: this.renderColumnTitle,
                    renderCell: this.renderCell,
                    getColumns: this.getColumns,
                    changeColumnOrder: this.changeColumnOrder,
                    changePage: this.changePage,
                    changePerPage: this.changePerPage,
                    changeFilter: this.changeFilter,
                    isChecked: this.isChecked,
                    check: this.check,
                    checkAll: this.checkAll,
                    select: this.select,
                    isSelected: this.isSelected,
                    getRowKey: this.getRowKey,
                    getColumnKey: this.getColumnKey,
                    onCellClick: this.onCellClick,
                    canCellClick: this.canCellClick,
                    getCellStyle: this.getCellStyle,
                    getRowStyle: this.getRowStyle,
                    getRowActions: this.getRowActions,
                    hasRowActions: this.hasRowActions
                }
            });

            var headerPanel = _react2.default.createElement(_HeaderPanel2.default, { key: 'header', title: this.props.title, onFilterPanelClick: this.onFilterPanelClick, onRefresh: function onRefresh() {
                    return _this4.refresh(true);
                }, actions: this.getActions(), renderHeaderActions: this.props.renderHeaderActions, onKey: this.changeShowKeyColumn });

            var list = _react2.default.createElement(this.props.globalMeta.components.list.component, _extends({}, props, { key: 'List' }));

            var filterPanel = _react2.default.createElement(this.props.globalMeta.components.filterPanel.component, _extends({}, props, { key: 'FilterPanel', open: this.state.isFilterPanelOpen }));

            var longProcessPanel = _react2.default.createElement(this.props.globalMeta.components.longProcessPanel.component, { isLoading: this.state.isLoading, key: 'longProcessPanel' }, [headerPanel, filterPanel, list]);

            var errorPanel = _react2.default.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                longProcessPanel,
                errorPanel
            );
        }
    }]);

    return List;
}(_react.PureComponent);

exports.default = List;