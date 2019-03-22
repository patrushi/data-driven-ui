import buildQuery from 'odata-query';

export default class OData {
    constructor(props) {
        this.props = props;
    }

    getExpand(meta) {
        var expand = meta.columns.filter(e => e.dataSourse && e.dataSourse.path)
            .map(e => e.dataSourse.path.slice(0, e.dataSourse.path.length - 1).reduce((path, a) => path + '/' + a));
        return expand.length === 0
            ? null
            : expand;
    }

    getSelect(meta) {
        return meta.columns
            .map(e => e.dataSourse && e.dataSourse.path ? e.dataSourse.path.reduce((path, a) => path + '/' + a) : e.name);
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
                .map(e => e.meta.dataSourse && e.meta.dataSourse.path ? e.meta.dataSourse.path.reduce((path, a) => path + '/' + a) + e.order: e.meta.name + e.order);;
    }

    getFilter(settings, meta, data) {
        var filters = [];
        for (var name in data.filters) {
            if (data.filters[name]) {
                var m = this.getByName(meta.filters, name);
                var f = (m.dataSourse || {}).func || settings.filters[m.type] || settings.filters.default;
                filters.push(f(name, data.filters[name]));
            }
        }
        return filters.length === 0
            ? null
            : filters;
    }

    getList(needCount, meta, data, globalMeta, callbackFunc) {
        const settings = globalMeta.dataSourseTypes['odata'];
        const path = meta.dataSourse.path || settings.basePath + '/' + meta.dataSourse.shortPath;
        const count = needCount;
        const top = data.paging && data.paging.perPage;
        const skip = data.paging && data.paging.perPage * data.paging.page;
        const filter = this.getFilter(settings, meta, data);
        const expand = this.getExpand(meta);
        const select = meta.dataSourse.selectAll ? null : this.getSelect(meta);
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
        const settings = props.globalMeta.dataSourseTypes['odata'];
        var meta = props.meta.filters[props.name];
        const filter = {[`toLower(${meta.dataSourse.value})`]: { contains: props.inputValue == null ? null : props.inputValue.toLowerCase()}}
        const top = meta.count || 10;
        const query = buildQuery({ filter, top }); 
        fetch(`${meta.dataSourse.path || settings.basePath + '/' + meta.dataSourse.shortPath}${query}`, {})
            .then(response => response.json())
            .then(data => {
                props.callback(data.value.map(function (v) { return { label: v[meta.dataSourse.value], value: v[meta.dataSourse.key], additionalData: v } }));
            })
            .catch(e => console.log(e));
    }
}