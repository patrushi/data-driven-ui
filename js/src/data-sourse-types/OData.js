import buildQuery from 'odata-query';

function getExpand(metadata) {
    var expand = metadata.columns.filter(e => e.dataSourse && e.dataSourse.path)
        .map(e => e.dataSourse.path.slice(0, e.dataSourse.path.length - 1).reduce((path, a) => path + '/' + a));
    return expand.length == 0
        ? null
        : expand;
}

function getSelect(columns) {
    return columns
        .map(e => e.dataSourse && e.dataSourse.path ? e.dataSourse.path.reduce((path, a) => path + '/' + a) : e.name);
}

function getOrderBy(metadata, data) {
    var orderedColumns = [];
    for (var name in data.columnOrders) {
        if (data.columnOrders[name] !== undefined) {
            orderedColumns.push({metadata: metadata.columns.filter(e => e.name == name)[0], order: data.columnOrders[name] == 'desc' ? ' desc' : ''});
        }
    }
    return orderedColumns.length == 0
        ? null
        : orderedColumns
            .map(e => e.metadata.dataSourse && e.metadata.dataSourse.path ? e.metadata.dataSourse.path.reduce((path, a) => path + '/' + a) + e.order: e.metadata.name + e.order);;
}

function getFilter(settings, metadata, data) {
    var filters = [];
    for (var name in data.filters) {
        if (data.filters[name]) {
            var m = metadata.filters[name];
            var f = (m.dataSourse || {}).func || settings.filters[m.type] || settings.filters.default;
            filters.push(f(name, data.filters[name]));
        }
    }
    return filters.length == 0
        ? null
        : filters;
}

export function getList(needCount, metadata, data, defaults, callbackFunc) {
    const settings = defaults.dataSourseTypes['odata'];
    const path = metadata.dataSourse.path || settings.basePath + '/' + metadata.dataSourse.shortPath;
    const count = needCount;
    const top = data.paging.perPage;
    const skip = data.paging.perPage * data.paging.page;
    const filter = getFilter(settings, metadata, data);
    const expand = getExpand(metadata);
    const select = metadata.dataSourse.selectAll ? null : getSelect(metadata.columns);
    const orderBy = getOrderBy(metadata, data);
    if (needCount && settings.separateQueryForCount)
    {
        var cf = (countValue) => fetchQuery(path, { select, expand, filter, top, skip, orderBy, format: settings.format }, (value) => callbackFunc({...value, count: countValue.count}));
        fetchQuery(path, { count, filter, format: settings.format }, cf);
    }
    else {
        fetchQuery(path, { count, select, expand, filter, top, skip, orderBy, format: settings.format }, callbackFunc);
    }
}

function fetchQuery(path, queryProps, callbackFunc) {
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

export function getLongSelect(props) {
    const settings = props.defaults.dataSourseTypes['odata'];
    var metadata = props.metadata.filters[props.name];
    var _this = this;
    const filter = {[`toLower(${metadata.dataSourse.value})`]: { contains: props.inputValue == null ? null : props.inputValue.toLowerCase()}}
    const top = metadata.count || 10;
    const query = buildQuery({ filter, top }); 
    fetch(`${metadata.dataSourse.path || settings.basePath + '/' + metadata.dataSourse.shortPath}${query}`, {})
        .then(response => response.json())
        .then(data => {
            props.callback(data.value.map(function (v) { return { label: v[metadata.dataSourse.value], value: v[metadata.dataSourse.key], additionalData: v } }));
        })
        .catch(e => console.log(e));
}