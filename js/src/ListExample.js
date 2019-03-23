import React, { PureComponent } from 'react';
import List from './core/List';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';

export default class ListExample extends PureComponent {
    constructor(props) {
        super(props);

        this.meta = {
            columns: [
                {name: 'OrderID', isOrderable: true},
                {name: 'CustomerID'},
                {name: 'OrderDate'},
                {name: 'RequiredDate'},
                {name: 'ShippedDate'},
                {name: 'ShipCountry'},
            ],
            key: 'OrderID',
            filters: [
               //{name: 'Gender', type: 'shortselect', options: [{key: 'Male'}, {key: 'Female'}], dataSource: {type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', func: (name, value) => {return `${name} eq Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'${value}'`}}},
               {name: 'ShipCountry', type: 'text', dataSource: {refresh: 'debounce'}},
               {name: 'OrderDate', type: 'dateperiod'},
            ],
            //filtersLayout: {type: 'default', perLine: 2},
            paging: {},
            selectable: {type: 'row&checkbox', isMulti: false},
            dataSource: {type: 'odata', shortPath: `Orders`, selectAll: true}
        };

/*         OrderID	10248
CustomerID	"VINET"
EmployeeID	5
OrderDate	"1996-07-04T00:00:00"
RequiredDate	"1996-08-01T00:00:00"
ShippedDate	"1996-07-16T00:00:00"
ShipVia	3
Freight	"32.3800"
ShipName	"Vins et alcools Chevalier"
ShipAddress	"59 rue de l'Abbaye"
ShipCity	"Reims"
ShipRegion	null
ShipPostalCode	"51100"
ShipCountry	"France" */

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