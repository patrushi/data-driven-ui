import buildQuery from 'odata-query';

export default class OData {
    constructor(props) {
        this.props = props;
    }

    getExpand(meta) {
        var expand = meta.columns.filter(e => e.dataSource && e.dataSource.path)
            .map(e => e.dataSource.path.slice(0, e.dataSource.path.length - 1).reduce((path, a) => path + '/' + a));
        return expand.length === 0
            ? null
            : expand;
    }

    getSelect(meta) {
        return meta.columns
            .map(e => e.dataSource && e.dataSource.path ? e.dataSource.path.reduce((path, a) => path + '/' + a) : e.name);
    }

    getByName = (list, name) => {
        return list.filter(e => e.name === name)[0];
    }

    getOrderBy(meta, data) {
        var orderedColumns = [];
        for (var name in data.columnOrders) {
            var columnMeta = this.getByName(meta.columns, name);
            if (data.columnOrders[name] !== undefined) {
                orderedColumns.push({meta: columnMeta, order: data.columnOrders[name] === 'desc' ? ' desc' : ''});
            }
        }
        return orderedColumns.length === 0
            ? null
            : orderedColumns
                .map(e => e.meta.dataSource && e.meta.dataSource.path ? e.meta.dataSource.path.reduce((path, a) => path + '/' + a) + e.order: e.meta.name + e.order);;
    }

    getFilter(meta, data) {
        var filters = [];
        for (var name in data.filters) {
            if (data.filters[name]) {
                var m = this.getByName(meta.filters, name);
                var f = (m.dataSource || {}).func || this.props.meta.filters[m.type] || this.props.meta.filters[this.props.meta.filters.default];
                filters.push(f(name, data.filters[name]));
            }
        }
        if (meta.dataSource.filters) {
            filters = [...filters, meta.dataSource.filters];
        }
        return filters.length === 0
            ? null
            : filters;
    }

    getList(needCount, meta, data, globalMeta, callbackFunc) {
        const path = meta.dataSource.path || this.props.meta.basePath + '/' + meta.dataSource.shortPath;
        const count = needCount;
        const top = data.paging && data.paging.perPage;
        const skip = data.paging && data.paging.perPage * data.paging.page;
        const filter = this.getFilter(meta, data);
        const expand = this.getExpand(meta);
        const select = meta.dataSource.selectAll ? null : this.getSelect(meta);
        const orderBy = this.getOrderBy(meta, data);
        if (needCount && this.props.meta.separateQueryForCount)
        {
            var cf = (countValue) => this.fetchQuery(path, { select, expand, filter, top, skip, orderBy, format: this.props.meta.format }, (value) => callbackFunc({...value, count: countValue.count}));
            this.fetchQuery(path, { count, filter, format: this.props.meta.format }, cf);
        }
        else {
            this.fetchQuery(path, { count, select, expand, filter, top, skip, orderBy, format: this.props.meta.format }, callbackFunc);
        }
    }

    fetchQuery(path, queryProps, callbackFunc) {
        var query = buildQuery(queryProps); 
        this.props.meta.get(`${path}${query}`, data => {
            var value = {};
            if (data["@odata.count"] !== undefined)
            {
                value.count = data["@odata.count"];
            }
            if (data.value !== undefined)
            {
                value.items = data.value;
            }
            callbackFunc(value);
        }, () => {callbackFunc(null)});
    }

    getLongSelect(props, inputValue, callback) {
        const filter = {[`tolower(${props.componentMeta.dataSource.value})`]: { contains: inputValue == null ? null : inputValue.toLowerCase()}}
        const top = props.componentMeta.dataSource.count || 10;
        const format = this.props.meta.format;
        const query = buildQuery({ filter, top, format });
        this.props.meta.get(`${props.componentMeta.dataSource.path || this.props.meta.basePath + '/' + props.componentMeta.dataSource.shortPath}${query}`, data => {
            callback(data.value.map(function (v) { return { label: v[props.componentMeta.dataSource.value], value: v[props.componentMeta.dataSource.key], additionalData: v } }));
        });
    }
}