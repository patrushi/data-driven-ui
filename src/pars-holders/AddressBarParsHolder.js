import qs from 'query-string';

export default class AddressBarParsHolder {
    constructor(props) {
        this.props = props;
    }

    serializePars = (meta, data) => {
        var pars = {};
        if (data.paging) {
            if (data.paging.page) pars.page = data.paging.page;
            if (data.paging.perPage) pars.perPage = data.paging.perPage;
        }
        return pars;
    }

    deserializePars = (meta, pars) => {
        if (!pars) return null;
        var data = {};
        if (pars.page !== undefined || pars.perPage !== undefined) {
            data.paging = {page: isNaN(pars.page) ? 0 : Number(pars.page), perPage: isNaN(pars.perPage) ? 10 : Number(pars.perPage)}
        }
        return data;
    }

    savePars = (pars) => {
        if (this.props.meta.history == null) return;
        let locationSearch = '?' + qs.stringify(pars);
        if (this.locationSearch === locationSearch) return;
        this.locationSearch = locationSearch;
        let path = this.props.meta.history.location.pathname + locationSearch;
        this.props.meta.history.push(path);
    }

    loadPars = () => {
        if (this.props.meta.history == null) return;
        if (this.props.meta.history.location.search === this.locationSearch) return null;
        this.locationSearch = this.props.meta.history.location.search;
        return qs.parse(this.locationSearch);
    }
}