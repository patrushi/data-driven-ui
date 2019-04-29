export default class Local {
    constructor(props) {
        this.props = props;
    }

    filter = () => {

    }

    getList(needCount, meta, data, globalMeta, callbackFunc, props) {
        let items = [...this.props.globalMeta.storages[meta.dataSource.storage]];
        let expands = this.props.globalMeta.expands && this.props.globalMeta.expands[meta.dataSource.storage];
        if (expands) {
            for (let i in items) {
                for (let e in expands) {
                    const expand = expands[e];
                    const li = items[i];
                    const f = (item) => expand.func(item, li);
                    items[i][expand.name] = this.props.globalMeta.storages[expand.expandStorage].filter(f)[0];
                }
            }
        }

        if (data.filters) {
            for (let name in data.filters) {
                let filterMeta = meta.filters.filter(e => e.name === name)[0];
                let globalFilterMeta = this.props.globalMeta.filters[filterMeta.type] || this.props.globalMeta.filters[this.props.globalMeta.filters.default];
                items = items.filter(i => globalFilterMeta(i[name], data.filters[name]));
            }
        }

        if (meta.propsFilters && props) {
            let propsFilters = meta.propsFilters(props);
            for (let k in propsFilters) {
                let kv = Object.entries(propsFilters[k])[0];
                items = items.filter(i => i[kv[0]] === kv[1]);
            }
        }

        if (data.orders) {
            let orderFunc = (a, b) => {
                for (let name in data.orders) {
                    if (!data.orders[name]) continue;
                    let sign = data.orders[name] === 'asc' ? -1 : 1;
                    if (a[name] < b[name]) return sign;
                    if (a[name] > b[name]) return -sign;
                }
                return 0;
            }
            items = items.sort(orderFunc); 
        }

        let count = items.length;

        if (data.paging) {
            var from = data.paging.page * data.paging.perPage;
            var till = (data.paging.page + 1) * data.paging.perPage;
            items = items.slice(from, till);
        }
        
        callbackFunc({
            items: items,
            count: needCount ? count : undefined
        });
    }

    getLongSelect(props, inputValue, callback) {
        let items = [...this.props.globalMeta.storages[props.componentMeta.dataSource.shortPath]];
        if (Array.isArray(inputValue)) {
            items = items.filter(i => inputValue.some(e => i[props.componentMeta.dataSource.key] === e))
        } else {
            const top = props.componentMeta.dataSource.count || 10;
            items = items.filter(i => i[props.componentMeta.dataSource.value].toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
            items = items.slice(0, top);
        }
        callback(items.map(function (v) { return { label: v[props.componentMeta.dataSource.value], value: v[props.componentMeta.dataSource.key], extraData: v } }));
    }
}