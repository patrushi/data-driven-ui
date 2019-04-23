import qs from 'query-string';

export default class AddressBarParsHolder {
    constructor(props) {
        this.props = props;
    }

    serializePars = (meta, data) => {
        var pars = {};

        // paging
        if (data.paging) {
            if (data.paging.page) pars.page = data.paging.page;
            if (data.paging.perPage !== 10) pars.perPage = data.paging.perPage;
        }

        // orders
        if (data.orders) {
            pars.orders = Object.keys(data.orders)
                .filter(k => data.orders[k] !== undefined)
                .map(k => k + (data.orders[k] === 'desc' ? ' desc' : ''))
                .join(',');
        }

        // filters
        if (data.filters) {
            for (let name in data.filters) {
                if (data.filters[name]) {
                    let filterMeta = meta.filters.filter(f => f.name === name)[0];
                    let globalFilterMeta = this.props.globalMeta.filters[filterMeta.type] || this.props.globalMeta.filters[this.props.globalMeta.filters.default];
                    pars[name] = globalFilterMeta.serialize(data.filters[name]);
                }
            }
        }

        let outPars = {};
        for (let k in pars) {
            if (pars[k]) outPars[k] = pars[k];
        }
        return outPars;
    }

    deserializePars = (meta, pars) => {
        if (!pars) return null;
        let data = {};

        // paging
        data.paging = {page: isNaN(pars.page) ? 0 : Number(pars.page), perPage: isNaN(pars.perPage) ? 10 : Number(pars.perPage)};
        
        // orders
        if (pars.orders) {
            let orders = {};
            pars.orders.split(',').forEach(i => {
                let c = i.split(' ');
                orders[c[0]] = c[1] === undefined ? 'asc' : c[1]
            });
            if (orders !== {}) data.orders = orders;
        }

        // filters
        if (meta.filters) {
            data.filters = {};
            for (let k in meta.filters) {
                let name = meta.filters[k].name;
                if (pars[name]) {
                    let filterMeta = meta.filters.filter(f => f.name === name)[0];
                    let globalFilterMeta = this.props.globalMeta.filters[filterMeta.type] || this.props.globalMeta.filters[this.props.globalMeta.filters.default];
                    data.filters[name] = globalFilterMeta.deserialize(pars[name]);
                }
            }
        }

        return data;
    }

    savePars = (pars) => {
        if (this.props.meta.history == null) return;
        let locationSearch = qs.stringify(pars);
        locationSearch = locationSearch ? '?' + locationSearch : locationSearch;
        if (this.locationSearch === locationSearch) return;
        this.locationSearch = locationSearch;
        this.props.meta.history.push(this.props.meta.history.location.pathname + locationSearch);
    }

    loadPars = () => {
        if (this.props.meta.history == null) return;
        if (this.props.meta.history.location.search === this.locationSearch) return;
        this.locationSearch = this.props.meta.history.location.search;
        return qs.parse(this.locationSearch);
    }
}