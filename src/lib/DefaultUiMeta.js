import React from 'react';

import OData from './data-sourse-types/OData';
import Local from './data-sourse-types/Local';

import {get} from './data-sourse-types/Fetch'

import AddressBarParsHolder from './pars-holders/AddressBarParsHolder';

import List from './default-ui/List';
import Card from './default-ui/Card';
import TextField from './default-ui/TextField';
import LongSelect from './default-ui/LongSelect';
import ShortSelect from './default-ui/ShortSelect';
import LongProcessPanel from './default-ui/LongProcessPanel.js';
import FilterPanel from './default-ui/FilterPanel';
import DateField from './default-ui/DateField';
import BoolField from './default-ui/BoolField';
import DatePeriodField from './default-ui/DatePeriodField';
import SpecialFilterField from './default-ui/SpecialFilterField';

import ErrorPanel, { errorHandler } from './default-ui/ErrorPanel';

import CircularProgress from '@material-ui/core/CircularProgress';

import {modifierKeys} from './core/modifier-keys';

import moment from "moment";
import BoolColumn from './default-ui/BoolColumn';
import ColorColumn from './default-ui/ColorColumn';

import {formatNumber} from './core/formatters'

import './core/data_driven_ui'

export default {
    components: {
        list: {component: List},
        card: {component: Card},
        filterPanel: {component: FilterPanel},
        longProcessPanel: {component: LongProcessPanel},
        errorPanel: {component: ErrorPanel, 
            props: {
                propsGetter: () => {return {title: window.data_driven_ui.getCurrentLocale().errorPanel.title}}
            }
        }
    },
    paging: {
        perPage: 10,
        perPageOptions: [10, 100],
        propsGetter: () => {
            return {
            labelRowsPerPage: window.data_driven_ui.getCurrentLocale().paging.labelRowsPerPage,
            labelDisplayedRows: window.data_driven_ui.getCurrentLocale().paging.labelDisplayedRows
        }}
    },
    parsHolderTypes: {
        addressBar: {
            class: AddressBarParsHolder,
            filters: {
                string: {serialize: (value) => JSON.stringify(value), deserialize: (value) => JSON.parse(value)},
                default: 'string'
            }
        },
        default: 'addressBar'
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
                specialfilter: (name, value) => {return value == null ? null : typeof value === 'string' ? JSON.parse(value) : value},
                date: (name, value) => {return value == null ? null : {[name]: new Date(value)}},
                dateperiod: (name, value) => {
                    if (value == null || (value.from == null && value.till == null)) return null;
                    let r = [];
                    if (value.from != null) r.push({[name] : {ge: new Date(value.from)}});
                    if (value.till != null) {
                        let dt = new Date(value.till);
                        dt.setDate(dt.getDate() + 1);
                        r.push({[name] : {lt: dt}});
                    }
                    return r;
                },
                number: (name, value) => {return {[name]: Number(value)}},
                longselect: (name, value) => {
                    return Array.isArray(value)
                        ? {or: value.map(function (e) {return { [name]: e };})}
                        : {[name]: value}
                },
                default: 'string'
            },
            basePath: 'https://services.odata.org/V4/Northwind/Northwind.svc',
            get: (url, callback, errorCallback) => get(url, {}, callback, (error) => {errorHandler(error); if (errorCallback) errorCallback(error);})
        },
        local: {
            class: Local,
            filters: {
                string: (itemValue, filterValue) => !filterValue ? true : itemValue === filterValue,
                text: (itemValue, filterValue) => !filterValue ? true : !itemValue ? false : itemValue.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1,
                dateperiod: (itemValue, filterValue) => !filterValue || (!filterValue.from && !filterValue.till) 
                    ? true
                    : !itemValue || (filterValue.from && filterValue.from > moment(itemValue)) || (filterValue.till && filterValue.till < moment(itemValue)) 
                        ? false
                        : true,
                number: (itemValue, filterValue) => !filterValue ? true : itemValue === filterValue,
                longselect: (itemValue, filterValue) => {
                    return (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) 
                        ? true 
                        : Array.isArray(filterValue)
                            ? filterValue.some(e => e === itemValue)
                            : filterValue === itemValue;
                },
                default: 'string'
            },
        },
        default: 'odata'
    },
    filterTypes: {
        string: {component: TextField, debounce: true},
        longselect: {component: LongSelect, 
            props: {propsGetter: () => {return {loadingMessage: () => <CircularProgress style={{margin: 5}} />, noOptionsMessage: () => window.data_driven_ui.getCurrentLocale().longSelectField.notFoundByText}}}
        },
        shortselect: {component: ShortSelect},
        specialfilter: {component: SpecialFilterField},
        date: {component: DateField, 
            props: {propsGetter: () => {return {invalidDateMessage: window.data_driven_ui.getCurrentLocale().dateField.wrongDateFormat}}}
        },
        dateperiod: {component: DatePeriodField,
            props: {propsGetter: () => {return {invalidDateMessage: window.data_driven_ui.getCurrentLocale().dateField.wrongDateFormat}}},
            setFromColumn: (value, item, event, current) => {return modifierKeys.altRight ? {from: current && current.from, till: moment(value)} : {from: moment(value), till: current && current.till}}},
        bool: {component: BoolField},
        default: 'string'
    },
    fieldTypes: {
        string: {component: TextField},
        date: {component: DateField, 
            props: {propsGetter: () => {return {invalidDateMessage: window.data_driven_ui.getCurrentLocale().dateField.wrongDateFormat}}}
        },
        dateperiod: {component: DatePeriodField,
            props: {propsGetter: () => {return {invalidDateMessage: window.data_driven_ui.getCurrentLocale().dateField.wrongDateFormat}}}
        },
        longselect: {component: LongSelect, 
            props: {propsGetter: () => {return {loadingMessage: () => <CircularProgress style={{margin: 5}} />, noOptionsMessage: () => window.data_driven_ui.getCurrentLocale().longSelectField.notFoundByText}}}
        },
        shortselect: {component: ShortSelect},
        bool: {component: BoolField},
        default: 'string'
    },
    columnTypes: {
        date: {renderFunc: (name, value, meta) => {return !value ? null : moment(value).format("DD.MM.YYYY")}},
        datetime: {renderFunc: (name, value, meta) => {return !value ? null : moment(value).format("DD.MM.YYYY HH:mm:ss")}},
        number: {
            renderFunc: (name, value, meta, componentMeta) => {return <div style={{width: '100%', textAlign: 'right', whiteSpace: 'nowrap'}}>{formatNumber(value, meta, {midpointRounding: 2, split: true})}</div>},
            headerProps: (meta, componentMeta) => {return {style: {textAlign: 'right'}}}
        },
        bool: {renderFunc: (name, value, meta) => {return <BoolColumn value={value} meta={meta} />}},
        backgroundColor: {renderFunc: (name, value, meta) => {return <ColorColumn backgroundColor={value} type="backgroundColor" />}},
        color: {renderFunc: (name, value, meta) => {return <ColorColumn color={value} type="color" />}},
        default: 'string'
    },
    types: {
        Date: {columnType: 'date'}
    },
    filters: {
        label: true,
        //placeholder: true
    },
    fields: {
        label: true,
        //placeholder: true
    },
    columns: {
        filterSetFromColumn: {default: true, altKey: true}
    }
}