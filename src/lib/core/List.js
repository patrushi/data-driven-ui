import React, { PureComponent } from 'react';
import debounce from './debounce'; 
import HeaderPanel from '../default-ui/HeaderPanel';
const qs = require('query-string');
/* const equal = require('fast-deep-equal'); */
const merge = require('deepmerge')

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          // eslint-disable-next-line
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

export default class List extends PureComponent {
    constructor(props) {
        super(props);

        this.currentProps = props;

        this.state = {
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
            this.state.paging = {
                page: props.meta.paging.page || (props.globalMeta.paging && props.globalMeta.paging.page) || 0,
                perPage: props.meta.paging.perPage || (props.globalMeta.paging && props.globalMeta.paging.perPage) || 10,
                perPageOptions: props.meta.paging.perPageOptions || (props.globalMeta.paging && props.globalMeta.paging.perPageOptions) || [10, 100]
            }
        }

        this.refreshWithDebounce = debounce(this.refresh, 200);

        if (this.props.meta.parsHolder)
        {
            let globalMeta = this.props.globalMeta.parsHolderTypes[this.props.meta.parsHolder.type || this.props.globalMeta.parsHolderTypes.default];
            this.parsHolder = new globalMeta.class({meta: this.props.meta.parsHolder, globalMeta: globalMeta});
        }

        if (this.props.meta.dataSource)
        {
            let globalMeta = this.props.globalMeta.dataSourceTypes[this.props.meta.dataSource.type || this.props.globalMeta.dataSourceTypes.default];
            this.dataSource = new globalMeta.class({meta: this.props.meta.dataSource, globalMeta: globalMeta});
        }
    }

    changeShowKeyColumn = () => {
        this.setState({showKeyColumn: !this.state.showKeyColumn});
    }

    componentDidMount() {
        let _this = this;
        this.initialize(() => {
            if (this.props.setRef) this.props.setRef(this);
            if (!this.parsHolder) {
                if (this.props.onAfterInitialize) this.props.onAfterInitialize(this);
                if (_this.props.autoRefresh !== false || _this.props.refreshOnInit !== false) _this.refresh(true);
            } else {
                this.deserializePars(() => {
                    if (this.props.onAfterInitialize) this.props.onAfterInitialize(this);
                    if (_this.props.autoRefresh !== false || _this.props.refreshOnInit !== false) _this.refresh(true);
                }, true);
            }
        });
    }

    initialize(callback) {
        let filters = {};
        for (let fk in Object.filter(this.props.meta.filters, f => f.initial !== undefined)) {
            var filter = this.props.meta.filters[fk];
            filters[filter.name] = filter.initial;
        }
        let orders = (this.props.meta.orderable || {}).initial;
        this.setState({
            filters: {...this.state.filters, ...filters},
            orders: {...this.state.orders, ...orders}
        }, callback);
    }

    componentDidUpdate() {
        /* let _this = this;

        if (!equal(this.currentProps, this.props)) {
            this.currentProps = this.props;
            this.refresh(true);
        }

        this.deserializePars(() => {
            if (_this.props.autoRefresh !== false) _this.refresh(true);
        }); */
    }

    getFiltersQueryString = (filters) => {
        let fs = filters ? filters : Object.keys(this.state.filters);
        let pars = {};
        for (var f in fs) {
            let name = fs[f];
            if (this.state.filters[name]) pars[name] = JSON.stringify(this.state.filters[name]);
        }
        return qs.stringify(pars);
    }

    getFilterForQueryUrl = () => {
        return this.dataSource.getFilterForQueryUrl(this.props.meta, this.state, this.props);
    };

    componentWillUnmount() {
        if (this.props.setRef) this.props.setRef(null);
    }

    renderColumnTitle = (meta) => {
        return !meta.title ? meta.name : meta.title;
    }
 
    renderCell = (meta, item, rowIdx, columnIdx) => {
        let value = meta.render
            ? meta.render(meta, item, rowIdx, columnIdx)
            : meta.dataSource && meta.dataSource.path
                ? this.getValueFromPath(item, meta.dataSource.path, 0)
                : item[meta.name];
        
        var type = meta.type;

        var columnTypeMeta = this.props.globalMeta.columnTypes[type];

        if (columnTypeMeta) {
            if (columnTypeMeta.renderFunc) {
                value = columnTypeMeta.renderFunc(meta.name, value, meta, this.props.meta);
            }
        }

        if (meta.afterRender) {
            value = meta.afterRender(meta, item, rowIdx, columnIdx, value)
            console.log(value)
        }

        return value;
    }

    getCellStyle = (meta, item, rowIdx, columnIdx) => {
        let style = this.canCellClick(meta, item, rowIdx, columnIdx)
            ? {cursor: 'pointer'}
            : {};

        if (this.props.meta.row && this.props.meta.row.styleForCells) {
            style = {...style, ...this.props.meta.row.style(item, rowIdx)}
        }

        if (meta.style) {
            style = {...style, ...meta.style(meta, item, rowIdx, columnIdx)}
        }

        if (meta.type) {
            //style = {...style, paddingRight: '20px'}
        }
                            
        return style;
    }

    getHeaderCellProps = (meta) => {
        let props = meta.headerProps || {}
        var defaultColumnMeta = this.props.globalMeta.columnTypes[meta.type || this.props.globalMeta.columnTypes.default]
        if (defaultColumnMeta && defaultColumnMeta.headerProps) {
            props.style = {...props.style, ...defaultColumnMeta.headerProps(meta, this.props.meta).style }
        }
        return props
    }

    getRowStyle = (item, rowIdx) => {
        let style = this.props.meta.row && this.props.meta.row.style && !this.props.meta.row.styleForCells
            ? this.props.meta.row.style(item, rowIdx)
            : {};

        return style;
    }

    getValueFromPath = (item, path, i) => {
        return i+1 >= path.length || !item[path[i]]
            ? item[path[i]]
            : this.getValueFromPath(item[path[i]], path, i+1);
    }

    changeColumnOrder = (meta) => {
        var currentOrder = this.state.orders[meta.name];
        var newOrder = currentOrder === undefined
            ? 'asc'
            : currentOrder === 'asc'
                ? 'desc'
                : undefined;
        this.setState({
            orders: {...this.state.orders, [meta.name]: newOrder},
            ordersModified: {...this.state.ordersModified, [meta.name]: true},
            paging: {...this.state.paging, page: 0}
        }, () => this.refresh(false));
    }

    changePage = (page) => {
        this.setState({paging: {...this.state.paging, page}}, () => this.refresh(false));
    }

    changePerPage = (perPage) => {
        this.setState({paging: {...this.state.paging, perPage}}, () => this.refresh(false));
    }

    changeFilter = (meta, value) => {
        if (this.state.filters[meta.name] === value) return;

        let globalMetaFilter = this.props.globalMeta.filterTypes[meta.type] || this.props.globalMeta.filterTypes[this.props.globalMeta.filterTypes.default]

        this.setState({
            filters: {...this.state.filters, [meta.name]: value},
            filtersModified: {...this.state.filtersModified, [meta.name]: true},
            paging: {...this.state.paging, page: 0}
        }, () => {
            if (this.props.globalMeta.filters.autoRefresh !== false)
            {
                if (globalMetaFilter.debounce) this.refreshWithDebounce(true)
                else this.refresh(true);
            }
            if (this.props.onChangeFilter) this.props.onChangeFilter(meta, value);
        });
    }

    refresh = (needCount) => {
        if (this.props.onRefreshBefore) this.props.onRefreshBefore();
        this.setState({isLoading: true});
        this.serializePars();
        if (this.dataSource) {
            this.dataSource.getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback, this.props);
        }
        if (this.props.onRefreshAfter) this.props.onRefreshAfter();
    }

    getRowKey = (item, idx) => {
        return this.props.meta.key
            ? item[this.props.meta.key]
            : this.props.meta.keyFunc
                ? this.props.meta.keyFunc(item)
                : idx;
    }

    getColumnKey = (meta, idx) => {
        return meta.name 
            ? meta.name
            : idx;
    }

    getColumns = () => {
        return this.state.showKeyColumn
            ? [{name: this.props.meta.key, title: 'ID'}, ...this.props.meta.columns]
            : this.props.meta.columns;
    }

    refreshCallback = (data) => {
        if (!data) {
            this.setState({isLoading: false});
            return;
        }

        if (data.count !== undefined && data.items !== undefined) {
            this.setState({count: data.count, items: data.items, isLoading: false});
        } else if (data.count !== undefined) {
            this.setState({count: data.count, isLoading: false});
        } else if (data.items !== undefined) {
            this.setState({items: data.items, isLoading: false});
        }
        if (this.props.onChangeItems) this.props.onChangeItems(data);
    }

    check = (id, event, item) => {
        event.stopPropagation();

        const { checked } = this.state;
        const checkedIndex = checked.indexOf(id);
        let newChecked = [];

        if (checkedIndex === -1) {
            newChecked = newChecked.concat(checked, id);
        } else if (checkedIndex === 0) {
            newChecked = newChecked.concat(checked.slice(1));
        } else if (checkedIndex === checked.length - 1) {
            newChecked = newChecked.concat(checked.slice(0, -1));
        } else if (checkedIndex > 0) {
            newChecked = newChecked.concat(
                checked.slice(0, checkedIndex),
                checked.slice(checkedIndex + 1),
            );
        }

        this.setState({ checked: newChecked });
        if (this.props.onCheck) this.props.onCheck(checkedIndex === -1, [id], newChecked, item);
    };

    checkAll = event => {
        const checked = event.target.checked
            ? this.state.items.map((n, i) => this.getRowKey(n, i))
            : []
        this.setState({checked});
        if (this.props.onCheck) this.props.onCheck(event.target.checked, checked, checked)
    };

    isChecked = id => this.state.checked.indexOf(id) !== -1;

    select = (id, event, item) => {
        //event.stopPropagation();

        this.setState({ selected: id });
        
        if (this.props.onSelect) this.props.onSelect(id, item);
    };

    isSelected = id => this.state.selected === id;

    onCellClick = (meta, item, rowIdx, columnIdx, event) => {
        let filterSetFromColumn = this.props.globalMeta.columns.filterSetFromColumn;
        if (meta.filter === false || !filterSetFromColumn || !filterSetFromColumn.default || !this.props.meta.filters.some(e => e.name === meta.name)) return;

        if (filterSetFromColumn.altKey && !event.altKey) return;

        if (filterSetFromColumn.stopPropagation !== false) event.stopPropagation();

        let metaFilter = meta.filter ?  meta.filter : {};
        let filterName = metaFilter.name || meta.name;
        let filterMeta = this.props.meta.filters.filter(e => e.name === filterName)[0];
        let filterMetaType = this.props.globalMeta.filterTypes[filterMeta.type] || this.props.globalMeta.filterTypes[this.props.globalMeta.filterTypes.default];
        let filterCurrentValue = this.state.filters[filterName];
        let func = metaFilter.setFromColumn || filterMetaType.setFromColumn || (value => value);
        let filterValues = func(item[meta.name], item, event, filterCurrentValue);
        this.changeFilter(filterMeta, filterMeta.isMulti ? [filterValues] : filterValues);
    }

    canCellClick = (meta, item, rowIdx, columnIdx) => {
        let filterSetFromColumn = this.props.globalMeta.columns.filterSetFromColumn;
        return meta.filter || (filterSetFromColumn && filterSetFromColumn.default && this.props.meta.filters.some(e => e.name === meta.name));
    }

    serializePars = () => {
        if (!this.parsHolder) return;
        let pars = this.parsHolder.serializePars(this.props.meta, this.state);
        this.parsHolder.savePars(pars);
    }

    deserializePars = (setStateCallback, refreshAlways) => {
        if (!this.parsHolder) return;
        var pars = this.parsHolder.loadPars();
        var newState = this.parsHolder.deserializePars(this.props.meta, pars);
        if (newState) 
            this.setState(merge(this.state, newState), setStateCallback);
        else if (refreshAlways)
            setStateCallback();
    }

    onFilterPanelClick = () => {
        this.setState({isFilterPanelOpen: !this.state.isFilterPanelOpen});
    }

    getActions = () => {
        if (!this.props.meta.actions) return null;
        let actions = [];
        for (var k in this.props.meta.actions) {
            let action = this.props.meta.actions[k];
            if (!action) continue;
            if (action.type === 'delete') actions.push({title: 'Удалить', onClick: () => action.onClick(this.state.checked), disabled: this.state.checked.length === 0});
            else if (action.type === 'create') actions.push({title: 'Создать', onClick: () => action.onClick(this.state.checked)});
            else actions.push(action);
        }
        return actions;
    }

    hasRowActions = () => {
        return this.props.meta.rowActions;
    }

    getRowActions = (item) => {
        if (!this.props.meta.rowActions) return null;
        let actions = [];
        for (var k in this.props.meta.rowActions) {
            let action = this.props.meta.rowActions[k];
            if (action.type === 'delete') actions.push({title: 'Удалить', onClick: (item, event) => {event.stopPropagation(); action.onClick(item)}});
            else if (action.type === 'edit') actions.push({title: 'Редактировать', onClick: (item, event) => {event.stopPropagation(); this.props.onEdit(item)}});
            else actions.push(action);
        }
        return actions;
    }
    
    render() {
        const props = {
            ...this.props, 
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
                hasRowActions: this.hasRowActions,
                getHeaderCellProps: this.getHeaderCellProps
            },
        };

        const headerPanel = <HeaderPanel key="header" title={this.props.title} onFilterPanelClick={this.onFilterPanelClick} onRefresh={() => this.refresh(true)} actions={this.getActions()} renderHeaderActions={this.props.renderHeaderActions} onKey={this.changeShowKeyColumn} />

        const list = React.createElement(this.props.globalMeta.components.list.component, {...props, key: 'List'});

        const filterPanel = React.createElement(this.props.globalMeta.components.filterPanel.component, {...props, key: 'FilterPanel', open: this.state.isFilterPanelOpen});

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel.component, {isLoading: this.state.isLoading, key: 'longProcessPanel'},
            [headerPanel, filterPanel, list]);

        const errorPanel = React.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props)

        return <React.Fragment>
                {longProcessPanel}
                {errorPanel}
            </React.Fragment>;
    }
}
