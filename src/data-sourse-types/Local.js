var Enumerable = require('linq');

export default class Local {
    constructor(props) {
        this.props = props;
    }

    filter = () => {

    }

    getList(needCount, meta, data, globalMeta, callbackFunc) {
        let items = this.props.meta.storages[meta.dataSource.storage];

        let expands = this.props.meta.expands && this.props.meta.expands[meta.dataSource.storage];
        if (expands) {
            for (let i in items) {
                for (let e in expands) {
                    let expand = expands[e];
                    items[i][expand.name] = this.props.meta.storages[expand.expandStorage].filter(item => expand.func(item, items[i]))[0];
                }
            }
        }

        if (data.filters) {
            for (var name in data.filters) {
                let filterMeta = meta.filters.filter(e => e.name === name)[0];
                items = Enumerable.from(items).where(i => i.ShipCountry === data.filters[name]).toArray();
            }
        }

        if (data.paging) {
            var from = data.paging.page * data.paging.perPage;
            var till = (data.paging.page + 1) * data.paging.perPage;
            items = items.slice(from, till);
        }
        
        callbackFunc({
            items: items,
            count: needCount ? this.props.meta.storages[meta.dataSource.storage].length : undefined
        });
    }
}