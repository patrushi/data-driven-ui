import React, { PureComponent } from 'react';
import List from '../core/List';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";

export class ListExample extends PureComponent {
    constructor(props) {
        super(props);

        this.meta = {
            columns: [
                {name: 'OrderID', orderable: true},
                {name: 'CustomerID'},
                {name: 'OrderDate', type: 'date'},
                {name: 'RequiredDate', type: 'date'},
                {name: 'ShippedDate', type: 'date'},
                {name: 'ShipCountry'},
            ],
            key: 'OrderID',
            orderable: true,
            filters: [
               //{name: 'Gender', type: 'shortselect', options: [{key: 'Male'}, {key: 'Female'}], dataSource: {type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', func: (name, value) => {return `${name} eq Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'${value}'`}}},
               {name: 'ShipCountry', type: 'text', dataSource: {refresh: 'debounce'}},
               //{name: 'OrderDate', type: 'date'},
               {name: 'OrderDate', type: 'dateperiod'},
            ],
            //filtersLayout: {type: 'default', perLine: 2},
            paging: {},
            selectable: {type: 'row&checkbox', isMulti: false},
            parsHolder: {type: 'addressBar', prefix: '', history: this.props.history},
            //dataSource: {type: 'odata', shortPath: `Orders`, selectAll: true},
            dataSource: {type: 'local', storage: `Orders`}
        };

        this.metaDetail = {
            columns: [
                {name: 'OrderID', isOrderable: true},
                {name: 'ProductID', title: 'Product', dataSource: {path: ['Product', 'ProductName']}},// filter: {name: 'ProductID', func: item => item.ProductID, replace: true}},
                {name: 'UnitPrice', type: 'number'},
                {name: 'Quantity', type: 'number'},
                {name: 'Discount', type: 'number'},
            ],
            keyFunc: e => `${e.OrderID}_${e.ProductID}`,
            orderable: true,
            filters: [
               {name: 'ProductID', type: 'longselect', dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, isMulti: true},
               {name: 'UnitPrice', type: 'number'},
            ],
            filtersLayout: {type: 'default', perLine: 2},
            paging: {showIfSingle: false},
            selectable: {type: 'row&checkbox', isMulti: true},
            //dataSource: {type: 'odata', shortPath: `Order_Details`, selectAll: true}
            dataSource: {type: 'local', storage: `Order_Details`}
        };

        this.state = {
            selected: [],
            listDetailRef: null
        };
    }

    onSelect = (isSelect, lastSelectKeys, allSelectKeys, lastSelectItems, allSelectItems) => {
        //console.log(isSelect, lastSelect, allSelect);
    }

    onSingleSelect = (selectKey) => {
        this.metaDetail.dataSource.extraFilters = [{OrderID: selectKey}];
        if (this.state.listDetailRef) this.state.listDetailRef.refresh(true);
    }

    render() {
        return <Paper style={{ margin: 15, padding: 15 }}>
            <List meta={this.meta} globalMeta={GlobalMeta} onSelect={this.onSelect} onSingleSelect={this.onSingleSelect} parentProps={this.props} />
            <List meta={this.metaDetail} autoRefresh={false} setRef={(ref) => this.setState({listDetailRef: ref})} globalMeta={GlobalMeta} />
        </Paper>
    }
}

export default withRouter(ListExample);