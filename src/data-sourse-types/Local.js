export default class Local {
    constructor(props) {
        this.props = props;
    }

    filter = () => {

    }

    getList(needCount, meta, data, globalMeta, callbackFunc) {
        let items = [...this.props.globalMeta.storages[meta.dataSource.storage]];

        let expands = this.props.globalMeta.expands && this.props.globalMeta.expands[meta.dataSource.storage];
        if (expands) {
            for (let i in items) {
                for (let e in expands) {
                    let expand = expands[e];
                    items[i][expand.name] = this.props.globalMeta.storages[expand.expandStorage].filter(item => expand.func(item, items[i]))[0];
                }
            }
        }

        if (data.filters) {
            for (var name in data.filters) {
                let filterMeta = meta.filters.filter(e => e.name === name)[0];
                let globalFilterMeta = this.props.globalMeta.filters[filterMeta.type] || this.props.globalMeta.filters[this.props.globalMeta.filters.default];
                items = items.filter(i => globalFilterMeta(i[name], data.filters[name]));
            }
        }

        if (data.columnOrders) {
            let orderFunc = (a, b) => {
                for (let name in data.columnOrders) {
                    if (!data.columnOrders[name]) continue;
                    let sign = data.columnOrders[name] === 'asc' ? -1 : 1;
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
        console.log(props);
        const top = props.componentMeta.dataSource.count || 10;
        let items = [...this.props.globalMeta.storages[props.componentMeta.dataSource.shortPath]];
        items = items.filter(i => i[props.componentMeta.dataSource.value].toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
        items = items.slice(0, top);
        callback(items.map(function (v) { return { label: v[props.componentMeta.dataSource.value], value: v[props.componentMeta.dataSource.key], additionalData: v } }));
    }
}