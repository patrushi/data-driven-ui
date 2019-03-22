import React, { PureComponent } from 'react';
import List from './core/List';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';

export default class ListExample extends PureComponent {
    constructor(props) {
        super(props);

        this.meta = {
            columns: [
                {name: 'FirstName', isOrderable: true},
                {name: 'LastName', title: 'Last Name'},
            ],
            key: 'FirstName',
            filters: [
               {name: 'Gender', type: 'shortselect', options: [{key: 'Male'}, {key: 'Female'}], dataSource: {type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', func: (name, value) => {return `${name} eq Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'${value}'`}}},
               {name: 'FirstName', type: 'text', dataSource: {refresh: 'debounce'}},
               {name: 'LastName', type: 'text', dataSource: {refresh: 'debounce'}},
               {name: 'Date', type: 'date'},
               {name: 'DatePeriod', type: 'dateperiod'}
            ],
            //filtersLayout: {type: 'default', perLine: 2},
            paging: {},
            selectable: {type: 'row&checkbox', isMulti: false},
            dataSource: {type: 'odata', shortPath: `People`, selectAll: true}
        };

        this.state = {};
    }

    onSelect = (isSelect, lastSelect, allSelect) => {
        //console.log(isSelect, lastSelect, allSelect);
    }

    onSingleSelect = (select) => {
        //console.log(select);
    }

    render() {
        return <Paper style={{ margin: 15, padding: 15 }}>
            <List meta={this.meta} globalMeta={GlobalMeta} onSelect={this.onSelect} onSingleSelect={this.onSingleSelect} />
        </Paper>
    }
}