import OData from './data-sourse-types/OData';
import List from './default-ui/List';
import TextField from './default-ui/TextField';
import LongSelect from './default-ui/LongSelect';
import ShortSelect from './default-ui/ShortSelect';
import LongProcessPanel from './default-ui/LongProcessPanel.js';
import FilterPanel from './default-ui/FilterPanel';
import DateField from './default-ui/DateField';
import DatePeriodField from './default-ui/DatePeriodField';

import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

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
    dataSourceTypes: {
        odata: {
            class: OData,
            format: 'json',
            debounceInterval: 200,
            separateQueryForCount: true,
            filters: {
                string: (name, value) => {return {[name]: value}},
                text: (name, value) => {return {[`tolower(${name})`]: { contains: value == null ? null : value.toLowerCase()}}},
                date: (name, value) => {return `${name} eq ${value == null ? null : moment(value._d).format("YYYY-MM-DD") + "T00:00:00Z"}`},
                default: 'string'
            },
            basePath: 'https://services.odata.org/V4/Northwind/Northwind.svc/'
        },
        default: 'odata'
    },
    filterTypes: {
        text: {component: TextField},
        longselect: {component: LongSelect},
        shortselect: {component: ShortSelect},
        date: {component: DateField, invalidDateMessage: 'Неверный формат даты'},
        dateperiod: {component: DatePeriodField},
        default: 'text'
    },
    filters: {
        //label: true,
        placeholder: true
    }
}