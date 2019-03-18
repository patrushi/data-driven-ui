import React, { PureComponent } from 'react';
import LongProcessPanel from '../default-ui/LongProcessPanel.js';
import FieldPanel from '../default-ui/FieldPanel';
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
            }
        };

        this.refreshWithDebounce = debounce(this.refresh, 200);
    }

    componentDidMount() {
        this.refresh(true);
    }

    renderColumnTitle = (metadata) => {
        return !metadata.title ? metadata.name : metadata.title;
    }

    renderCell = (metadata, item, rowIdx, columnIdx) => {
        return metadata.dataSourse && metadata.dataSourse.path
            ? this.getValueFromPath(item, metadata.dataSourse.path, 0)
            : item[metadata.name];
    }

    getValueFromPath = (item, path, i) => {
        return i+1 >= path.length
            ? item[path[i]]
            : this.getValueFromPath(item[path[i]], path, i+1);
    }

    changeColumnOrder = (metadata) => {
        var currentOrder = this.state.columnOrders[metadata.name];
        var newOrder = currentOrder === undefined
            ? 'asc'
            : currentOrder === 'asc'
                ? 'desc'
                : undefined;
        this.setState({
            columnOrders: {...this.state.columnOrders, [metadata.name]: newOrder},
            paging: {...this.state.paging, page: 0}
        }, () => this.refresh(false));
    }

    changePage = (page) => {
        this.setState({paging: {...this.state.paging, page}}, () => this.refresh(false));
    }

    changePerPage = (perPage) => {
        this.setState({paging: {...this.state.paging, perPage}}, () => this.refresh(false));
    }

    changeFilter = (metadata, value) => {
        this.setState({
            filters: {...this.state.filters, [metadata.name]: value}
        }, (metadata.dataSourse || {}).debounceInterval
            ? this.refreshWithDebounce()//debounce(() => this.refreshWithCount(), metadata.dataSourse.debounceInterval) 
            : () => this.refresh(true));
    }

    refresh = (needCount) => {
        this.setState({isLoading: true});
        var dataSourse = this.props.defaults.dataSourseTypes[this.props.metadata.dataSourse.type];
        dataSourse.getList(needCount, this.props.metadata, this.state, this.props.defaults, this.refreshCallback);
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
                changeFilter: this.changeFilter
            },
        };
        const component = this.props.component
            ? this.props.component.render(props)
            : this.props.defaults.listType.initFunc(props).render();
        return <React.Fragment>
                <LongProcessPanel isLoading={this.state.isLoading}>
                    <FieldPanel {...props} />
                    {component}
                </LongProcessPanel>
            </React.Fragment>;
    }
}
