import React from 'react';
import OData from '../data-sourse-types/OData';
import List from '../default-ui/List';
import TextField from '../default-ui/TextField';
import LongSelect from '../default-ui/LongSelect';
import ShortSelect from '../default-ui/ShortSelect';
import LongProcessPanel from '../default-ui/LongProcessPanel.js';
import FilterPanel from '../default-ui/FilterPanel';
import DateField from '../default-ui/DateField';
import DatePeriodField from '../default-ui/DatePeriodField';

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
            //separateQueryForCount: true,
            filters: {
                string: (name, value) => {return {[name]: value}},
                text: (name, value) => {return value == null ? null : {[`tolower(${name})`]: { contains: value.toLowerCase()}}},
                date: (name, value) => {return value == null ? null : `${name} eq ${moment(value).format("YYYY-MM-DD") + "T00:00:00Z"}`},
                dateperiod: (name, value) => {
                    if (value == null || (value.from == null && value.till == null)) return null;
                    let r = [];
                    if (value.from != null) r.push(`${name} ge ${moment(value.from).format("YYYY-MM-DD") + "T00:00:00Z"}`);
                    if (value.till != null) r.push(`${name} le ${moment(value.till).format("YYYY-MM-DD") + "T00:00:00Z"}`);
                    return r;
                },
                default: 'string'
            },
            basePath: 'https://services.odata.org/V4/Northwind/Northwind.svc'
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
    columnTypes: {
        date: {renderFunc: (name, value) => {return moment(value).format("DD.MM.YYYY")}},
        number: {renderFunc: (name, value) => {return <div style={{width: '100%', textAlign: 'right'}}>{value}</div>}}
    },
    types: {
        Date: {columnType: 'date'}
    },
    filters: {
        //label: true,
        placeholder: true
    }
}