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

        // columnOrders
        if (data.columnOrders) {
            pars.orders = Object.keys(data.columnOrders)
                .filter(k => data.columnOrders[k] !== undefined)
                .map(k => k + (data.columnOrders[k] === 'desc' ? ' desc' : ''))
                .join(',');
        }

        // filters
        if (data.filters) {
            for (let k in data.filters) {
                if (data.filters[k]) {
                    pars[k] = JSON.stringify(data.filters[k]);
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
        
        // columnOrders
        if (pars.orders) {
            let columnOrders = {};
            pars.orders.split(',').forEach(i => {
                let c = i.split(' ');
                columnOrders[c[0]] = c[1] === undefined ? 'asc' : c[1]
            });
            if (columnOrders !== {}) data.columnOrders = columnOrders;
        }

        // filters
        if (meta.filters) {
            data.filters = {};
            for (let k in meta.filters) {
                let name = meta.filters[k].name;
                if (pars[name]) {
                    data.filters[name] = JSON.parse(pars[name]);
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