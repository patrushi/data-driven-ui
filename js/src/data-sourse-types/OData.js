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

export function getList(needCount, metadata, data, defaults, callbackFunc) {
    const settings = defaults.dataSourseTypes['odata'];
    const path = metadata.dataSourse.path || settings.basePath + '/' + metadata.dataSourse.shortPath;
    const count = needCount;
    const top = data.paging.perPage;
    const skip = data.paging.perPage * data.paging.page;
    /* var orderBy = Object.keys(this.getState().order).map(k => this.getState().order[k])
        .filter(e => e.direction != null)
        .sort((a,b) => b.orderIndex - a.orderIndex)
        .map((e) => {return e.orderAttrName != null ? `${e.orderAttrName} ${e.direction}` : `${e.name} ${e.direction}`});
    if (this.props.additionalOrder) orderBy = [...orderBy, ...this.props.additionalOrder]; */
    //orderBy = orderBy.length == 0 ? null : orderBy;
    /* var filter = this.getFilterForQuery();
    if (this.props.additionalFilter) filter = [...filter, ...this.props.additionalFilter];
    const expand = this.props.expand; */
    //const query = buildQuery({ count, top, skip, orderBy, expand, filter });
    const expand = getExpand(metadata);
    const select = metadata.dataSourse.selectAll ? null : getSelect(metadata.columns);
    const orderBy = getOrderBy(metadata, data);
    const query = buildQuery({ count, select, expand, top, skip, orderBy, format: settings.format });
    //if (this.props.onStartRequest) this.props.onStartRequest();
    fetch(`${path}${query}`, {})
        .then(response => response.json())
        .then(data => {
            var value = {items: data.value};
            if (needCount)
            {
                value.count = data["@odata.count"];
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