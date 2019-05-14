import React, { PureComponent } from 'react';
import debounce from './debounce'; 

import HeaderPanel from '../default-ui/HeaderPanel'

var equal = require('fast-deep-equal');

export default class List extends PureComponent {
    constructor(props) {
        super(props);

        this.currentProps = props;

        this.state = {
            orders: [],
            filters: {},
            items: [],
            selected: [],
            isFilterPanelOpen: true,
            isEditCardOpen: false,
            currentItem: null
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

    componentDidMount() {
        if (this.props.setRef) this.props.setRef(this);
        let _this = this;
        this.deserializePars(() => {
            if (_this.props.autoRefresh !== false) _this.refresh(true);
        })
    }

    componentDidUpdate() {
        let _this = this;

        if (!equal(this.currentProps, this.props)) {
            this.currentProps = this.props;
            this.refresh(true);
        }

        this.deserializePars(() => {
            if (_this.props.autoRefresh !== false) _this.refresh(true);
        });
    }

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
                value = columnTypeMeta.renderFunc(meta.name, value);
            }
        }

        return value;
    }

    getCellStyle = (meta, item, rowIdx, columnIdx) => {
        let style = meta.style 
            ? meta.style(meta, item, rowIdx, columnIdx)
            : {};

        if (this.canCellClick(meta, item, rowIdx, columnIdx)) {
            style = {...style, cursor: 'pointer'}
        }

        if (this.props.meta.row && this.props.meta.row.styleForCells) {
            style = {...style, ...this.props.meta.row.style(item, rowIdx)}
        }
                            
        return style;
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
            filters: {...this.state.filters, [meta.name]: value}
        }, globalMetaFilter.debounce
            ? () => this.refreshWithDebounce(true)
            : () => this.refresh(true));
    }

    refresh = (needCount) => {
        this.setState({isLoading: true});
        this.serializePars();
        if (this.dataSource) {
            this.dataSource.getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback, this.props);
        }
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

    select = (id, event) => {
        event.stopPropagation();

        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (this.props.meta.selectable.isMulti) {
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
        } else {
            if (selectedIndex === -1) {
                newSelected = [id];
            } else {
                newSelected = [];
            }
        }

        this.setState({ selected: newSelected });
        if (this.props.onSelect) this.props.onSelect(selectedIndex === -1, [id], newSelected);
        if (this.props.onSingleSelect) this.props.onSingleSelect(selectedIndex === -1 ? id : null);
    };

    selectAll = event => {
        if (!this.props.meta.selectable.isMulti) return;
        const selected = event.target.checked
            ? this.state.items.map((n, i) => this.getRowKey(n, i))
            : []
        this.setState({selected});
        if (this.props.onSelect) this.props.onSelect(event.target.checked, selected, selected)
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

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

    deserializePars = (setStateCallback) => {
        if (!this.parsHolder) return;
        var pars = this.parsHolder.loadPars();
        var newState = this.parsHolder.deserializePars(this.props.meta, pars);
        if (newState) this.setState(newState, setStateCallback);
    }

    onFilterPanelClick = () => {
        this.setState({isFilterPanelOpen: !this.state.isFilterPanelOpen});
    }

    getActions = () => {
        if (!this.props.meta.actions) return null;
        let actions = [];
        for (var k in this.props.meta.actions) {
            let action = this.props.meta.actions[k];
            if (action.type === 'delete') actions.push({title: 'Удалить', onClick: () => action.onClick(this.state.selected), disabled: this.state.selected.length === 0});
            if (action.type === 'create') actions.push({title: 'Создать', onClick: () => action.onClick(this.state.selected)});
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
            if (action.type === 'edit') actions.push({title: 'Редактировать', onClick: (item, event) => {event.stopPropagation(); this.props.onEdit(item)}});
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
                changeColumnOrder: this.changeColumnOrder,
                changePage: this.changePage,
                changePerPage: this.changePerPage,
                changeFilter: this.changeFilter,
                isSelected: this.isSelected,
                select: this.select,
                selectAll: this.selectAll,
                getRowKey: this.getRowKey,
                getColumnKey: this.getColumnKey,
                onCellClick: this.onCellClick,
                canCellClick: this.canCellClick,
                getCellStyle: this.getCellStyle,
                getRowStyle: this.getRowStyle,
                getRowActions: this.getRowActions,
                hasRowActions: this.hasRowActions
            },
        };

        const headerPanel = <HeaderPanel key="header" title="Orders" onFilterPanelClick={this.onFilterPanelClick} actions={this.getActions()} />

        const list = React.createElement(this.props.globalMeta.components.list.component, {...props, key: 'List'});

        const filterPanel = React.createElement(this.props.globalMeta.components.filterPanel.component, {...props, key: 'FilterPanel', open: this.state.isFilterPanelOpen});

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel.component, {isLoading: this.state.isLoading},
            [headerPanel, filterPanel, list]);

        const errorPanel = React.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props)

        return <React.Fragment>
                {longProcessPanel}
                {errorPanel}
            </React.Fragment>;
    }
}
