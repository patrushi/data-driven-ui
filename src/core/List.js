import React, { PureComponent } from 'react';
import debounce from './debounce'; 

export default class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columnOrders: [],
            filters: {},
            count: 100,
            items: [],
            selected: []
        };

        if (props.meta.paging) {
            this.state.paging = {
                page: props.meta.paging.page || (props.globalMeta.paging && props.globalMeta.paging.page) || 0,
                perPage: props.meta.paging.perPage || (props.globalMeta.paging && props.globalMeta.paging.perPage) || 10,
                perPageOptions: props.meta.paging.perPageOptions || (props.globalMeta.paging && props.globalMeta.paging.perPageOptions) || [10, 100]
            }
        }

        this.refreshWithDebounce = debounce(this.refresh, 200);
    }

    componentDidMount() {
        if (this.props.setRef) this.props.setRef(this);
        if (!this.props.notAutoRefresh) this.refresh(true);
    }

    componentWillUnmount() {
        if (this.props.setRef) this.props.setRef(null);
    }

    renderColumnTitle = (meta) => {
        return !meta.title ? meta.name : meta.title;
    }
 
    renderCell = (meta, item, rowIdx, columnIdx) => {
        let value = meta.dataSource && meta.dataSource.path
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

    getValueFromPath = (item, path, i) => {
        return i+1 >= path.length
            ? item[path[i]]
            : this.getValueFromPath(item[path[i]], path, i+1);
    }

    changeColumnOrder = (meta) => {
        var currentOrder = this.state.columnOrders[meta.name];
        var newOrder = currentOrder === undefined
            ? 'asc'
            : currentOrder === 'asc'
                ? 'desc'
                : undefined;
        this.setState({
            columnOrders: {...this.state.columnOrders, [meta.name]: newOrder},
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
        console.log(meta.name, value);
        if (this.state.filters[meta.name] === value) return;

        this.setState({
            filters: {...this.state.filters, [meta.name]: value}
        }, (meta.dataSource || {}).refresh === 'debounce'
            ? () => this.refreshWithDebounce(true)
            : () => this.refresh(true));
    }

    refresh = (needCount) => {
        this.setState({isLoading: true});
        var dataSourceMeta = this.props.globalMeta.dataSourceTypes[this.props.meta.dataSource.type || this.props.globalMeta.dataSourceTypes.default];
        new dataSourceMeta.class({meta: dataSourceMeta}).getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback);
    }

    getKey = (item, idx) => {
        return this.props.meta.key
            ? item[this.props.meta.key]
            : this.props.meta.keyFunc
                ? this.props.meta.keyFunc(item)
                : idx;
    }

    refreshCallback = (data) => {
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
            ? this.state.items.map((n, i) => this.getKey(n, i))
            : []
        this.setState({selected});
        if (this.props.onSelect) this.props.onSelect(event.target.checked, selected, selected)
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    
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
                getKey: this.getKey
            },
        };

        const list = React.createElement(this.props.globalMeta.components.list.component, {...props, key: 'List'});

        const filterPanel = React.createElement(this.props.globalMeta.components.filterPanel.component, {...props, key: 'FilterPanel'});

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel.component, {isLoading: this.state.isLoading}, [filterPanel, list]);

        return <React.Fragment>
                {longProcessPanel}
            </React.Fragment>;
    }
}
