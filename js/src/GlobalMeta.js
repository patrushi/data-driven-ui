import OData from './data-sourse-types/OData';
import List from './default-ui/List';
import TextField from './default-ui/TextField';
import LongSelect from './default-ui/LongSelect';
import LongProcessPanel from './default-ui/LongProcessPanel.js';
import FilterPanel from './default-ui/FilterPanel';

export default {
    components: {
        list: {component: List},
        filterPanel: {component: FilterPanel},
        longProcessPanel: {component: LongProcessPanel}
    },
    paging: {
        perPage: 10,
        perPageOptions: [10, 100]
    },
    dataSourseTypes: {
        odata: {
            class: OData,
            format: 'json',
            debounceInterval: 200,
            separateQueryForCount: true,
            filters: {
                string: (name, value) => {return {[name]: value}},
                text: (name, value) => {return {[`tolower(${name})`]: { contains: value == null ? null : value.toLowerCase()}}},
                default: 'string'
            },
            basePath: 'https://services.odata.org/TripPinRESTierService'
        },
        default: 'odata'
    },
    filterTypes: {
        text: {component: TextField},
        longselect: {component: LongSelect},
        default: 'text'
    }
}