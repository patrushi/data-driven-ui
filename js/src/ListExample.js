import React, { PureComponent } from 'react';
import List from './core/List';
import Defaults from './Defaults'

export default class ListExample extends PureComponent {
    constructor(props) {
        super(props);

        this.metadata = {
            columns: [
                {name: 'Name', title: 'Название', isOrderable: true},
                {name: 'State', title: 'Состояние'},
                {name: 'PartialPlan', title: 'Частный план'},
                {name: 'PlannedDateStart', title: 'Дата начала', type: 'date'},
                {name: 'PlannedDateEnd', title: 'Дата конца', type: 'date'}
            ],
            filters: {
                PartialPlan: {title: 'Частный план', type: 'longselect', dataSourse: {path: `http://modeus-local-dev/periodplanning/api/PartialPlan`, key: 'Id', value: 'Name'}}
            },
            paging: {},
            dataSourse: {type: 'odata', path: `http://modeus-local-dev/periodplanning/api/CourseUnitRealization`, selectAll: true}
        };

        this.state = {};
    }

    render() {
        return <List metadata={this.metadata} defaults={Defaults} />
    }
}

/* this.metadata = {
    columns: [
        {name: 'Name', title: 'Название', isOrderable: true},
        {name: 'State', title: 'Состояние', dataSourse: {path: [, 'Name']}},
        {name: 'PartialPlan', title: 'Частный план', dataSourse: {path: [, 'Name']}},
        {name: 'DateFrom', title: 'Дата начала', type: 'date'},
        {name: 'DateTill', title: 'Дата конца', type: 'date'}
    ],
    filters: [
        {name: 'PartialPlan', title: 'Частный план', type: 'longlist'},
        {name: 'State', title: 'Состояние', type: 'shortlist'}
    ],
    paging: {},
    dataSourse: {type: 'odata', path: `https://dev2.modeus.me/periodplanning/api/CourseUnitRealization`}
}; */

/*
this.metadata = {
            columns: [
                {name: 'CustomerID', title: 'Customer', dataSourse: {path: ['Customer', 'CompanyName']}, isOrderable: true},
                {name: 'EmployeeID', title: 'Employee', dataSourse: {path: ['Employee', 'LastName']}},
                {name: 'OrderDate', type: 'date', isOrderable: true},
                {name: 'ShipName'},
                {name: 'Freight', type: 'number'},
            ],
            filters: {
                CustomerID: {title: 'Заказчик', type: 'longselect', dataSourse: {type: 'odata', shortPath: `Customers`, key: 'CustomerID', value: 'ContactName'}},
                EmployeeID: {type: 'shortselect'}
            },
            paging: {},
            dataSourse: {type: 'odata', shortPath: `Orders`}
        };
*/