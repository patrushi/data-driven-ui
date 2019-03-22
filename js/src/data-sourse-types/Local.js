import {toArray} from '../core/metadataHelper';

export default class Local {
    constructor(props) {
        this.props = props;
    }

    getOrderBy(meta, data) {
        var orderedColumns = [];
        for (var name in data.columnOrders) {
            if (data.columnOrders[name] !== undefined) {
                orderedColumns.push({meta: meta.columns[name], order: data.columnOrders[name] === 'desc' ? ' desc' : ''});
            }
        }
        return orderedColumns.length === 0
            ? null
            : orderedColumns
                .map(e => e.meta.dataSource && e.meta.dataSource.path ? e.meta.dataSource.path.reduce((path, a) => path + '/' + a) + e.order: e.meta.name + e.order);;
    }

    getFilter(settings, meta, data) {
        var filters = [];
        for (var name in data.filters) {
            if (data.filters[name]) {
                var m = meta.filters[name];
                var f = (m.dataSource || {}).func || settings.filters[m.type] || settings.filters.default;
                filters.push(f(name, data.filters[name]));
            }
        }
        return filters.length === 0
            ? null
            : filters;
    }

    getList(needCount, meta, data, globalMeta, callbackFunc) {
        const settings = globalMeta.dataSourceTypes['odata'];
        const path = meta.dataSource.path || settings.basePath + '/' + meta.dataSource.shortPath;
        const count = needCount;
        const top = data.paging.perPage;
        const skip = data.paging.perPage * data.paging.page;
        const filter = this.getFilter(settings, meta, data);
        const expand = this.getExpand(meta);
        const select = meta.dataSource.selectAll ? null : this.getSelect(meta);
        const orderBy = this.getOrderBy(meta, data);
        if (needCount && settings.separateQueryForCount)
        {
            var cf = (countValue) => this.fetchQuery(path, { select, expand, filter, top, skip, orderBy, format: settings.format }, (value) => callbackFunc({...value, count: countValue.count}));
            this.fetchQuery(path, { count, filter, format: settings.format }, cf);
        }
        else {
            this.fetchQuery(path, { count, select, expand, filter, top, skip, orderBy, format: settings.format }, callbackFunc);
        }
    }

    fetchQuery(path, queryProps, callbackFunc) {
        var query = buildQuery(queryProps); 
        fetch(`${path}${query}`, {})
            .then(response => response.json())
            .then(data => {
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
            })
            .catch(e => console.log(e));
    }

   getLongSelect(props) {
        const settings = props.globalMeta.dataSourceTypes['odata'];
        var meta = props.meta.filters[props.name];
        const filter = {[`toLower(${meta.dataSource.value})`]: { contains: props.inputValue == null ? null : props.inputValue.toLowerCase()}}
        const top = meta.count || 10;
        const query = buildQuery({ filter, top }); 
        fetch(`${meta.dataSource.path || settings.basePath + '/' + meta.dataSource.shortPath}${query}`, {})
            .then(response => response.json())
            .then(data => {
                props.callback(data.value.map(function (v) { return { label: v[meta.dataSource.value], value: v[meta.dataSource.key], additionalData: v } }));
            })
            .catch(e => console.log(e));
    }
}