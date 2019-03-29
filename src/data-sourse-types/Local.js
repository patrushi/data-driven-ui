export default class Local {
    constructor(props) {
        this.props = props;
    }
    getList(needCount, meta, data, globalMeta, callbackFunc) {
        let items = this.props.meta.storages[meta.dataSource.storage];
        if (data.paging)
        {
            var from = data.paging.page * data.paging.perPage;
            var till = (data.paging.page + 1) * data.paging.perPage;
            items = items.slice(from, till);
        }
        let expands = this.props.meta.expands && this.props.meta.expands[meta.dataSource.storage];
        
        if (expands) {
            for (let i in items) {
                for (let e in expands) {
                    let expand = expands[e];
                    items[i][expand.name] = this.props.meta.storages[expand.expandStorage].filter(item => expand.func(item, items[i]))[0];
                }
            }
        }
        
        callbackFunc({
            items: items,
            count: needCount ? this.props.meta.storages[meta.dataSource.storage].length : undefined
        });
    }
}