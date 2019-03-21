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
            paging: {
                page: 0,
                perPage: 10
            },
            selected: []
        };

        this.refreshWithDebounce = debounce(this.refresh, 200);
    }

    componentDidMount() {
        this.refresh(true);
    }

    renderColumnTitle = (meta) => {
        return !meta.title ? meta.name : meta.title;
    }
 
    renderCell = (meta, item, rowIdx, columnIdx) => {
        return meta.dataSourse && meta.dataSourse.path
            ? this.getValueFromPath(item, meta.dataSourse.path, 0)
            : item[meta.name];
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
        this.setState({
            filters: {...this.state.filters, [meta.name]: value}
        }, (meta.dataSourse || {}).refresh === 'debounce'
            ? () => this.refreshWithDebounce(true)
            : () => this.refresh(true));
    }

    refresh = (needCount) => {
        this.setState({isLoading: true});
        var dataSourseMeta = this.props.globalMeta.dataSourseTypes[this.props.meta.dataSourse.type || this.props.globalMeta.dataSourseTypes.default];
        new dataSourseMeta.class({meta: dataSourseMeta}).getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback);
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

    select = (id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

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

        this.setState({ selected: newSelected });
    };

    selectAll = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.state.items.map(n => n[this.props.meta.key]) }));
            return;
        }
        this.setState({ selected: [] });
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
                selectAll: this.selectAll
            },
        };

        const list = React.createElement(this.props.globalMeta.components.list, props);

        const filterPanel = React.createElement(this.props.globalMeta.components.filterPanel, props);

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel, {isLoading: this.state.isLoading}, [filterPanel, list]);

        return <React.Fragment>
                {longProcessPanel}
            </React.Fragment>;
    }
}
