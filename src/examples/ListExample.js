import React, { PureComponent } from 'react';
//import List from '../core/List';
import List from 'data-driven-ui/dist/core/List';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import SmartPanel from '../core/SmartPanel';
import Card from '../core/Card';
//import ProductFilter from './ProductFilter';

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
                {type: 'number', title: 'Custom', render: (meta, item, rowIdx, columnIdx) => {return rowIdx}, style: (meta, item, rowIdx, columnIdx) => {return item.ShipCountry === 'USA' ? {backgroundColor: 'green'} : undefined}}
            ],
            key: 'OrderID',
            orderable: true,
            filters: [
               //{name: 'Gender', type: 'shortselect', options: [{key: 'Male'}, {key: 'Female'}], dataSource: {type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', func: (name, value) => {return `${name} eq Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'${value}'`}}},
               {name: 'ShipCountry', type: 'text'},
               //{name: 'OrderDate', type: 'date'},
               {name: 'OrderDate', type: 'dateperiod'},
            ],
            //filtersLayout: {type: 'default', perLine: 2},
            paging: {},
            selectable: {type: 'row&checkbox', isMulti: true},
            parsHolder: {type: 'addressBar', prefix: '', history: this.props.history},
            //dataSource: {type: 'odata', shortPath: `Orders`, selectAll: true},
            dataSource: {type: 'local', storage: `Orders`},
            actions: [
                {type: 'delete', onClick: (selected) => alert(selected)}
            ],
            rowActions: [
                {type: 'delete', onClick: (selected) => alert(selected)},
                {type: 'edit', onClick: (selected) => alert(selected)}
            ],
            row: {
                style: (item, rowIdx) => {return item.ShipCountry === 'France' || item.ShipCountry === 'USA' ? {color: 'red'} : undefined},
                styleForCells: true
            }
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
               {name: 'ProductID', type: 'longselect', /*component: ProductFilter,*/ props: {extraData: (extraData) => {return <div style={{color: 'red'}}>QuantityPerUnit: {extraData.QuantityPerUnit}</div>}}, dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, isMulti: false},
               {name: 'UnitPrice', type: 'number'},
            ],
            propsFilters: (props) => {return props.masterKey ? [{OrderID: props.masterKey}] : undefined},
            filtersLayout: {type: 'default', perLine: 2},
            paging: {showIfSingle: false},
            selectable: {type: 'row&checkbox', isMulti: true},
            //dataSource: {type: 'odata', shortPath: `Order_Details`, selectAll: true},
            dataSource: {type: 'local', storage: `Order_Details`},
            actions: [
                {type: 'delete', isMulti: true},
            ],
            rowActions: [
                {type: 'delete', onClick: (selected) => alert(selected)},
                {type: 'edit', onClick: (selected) => alert(selected)}
            ],
        };

        this.cardMeta = {
            fields: [
                {name: 'OrderID'},
                {name: 'CustomerID'},
                {name: 'OrderDate', type: 'date'},
                {name: 'RequiredDate', type: 'date'},
                {name: 'ShippedDate', type: 'date'},
                {name: 'ShipCountry'},
                /*{name: 'ProductID', type: 'longselect',
                    props: {extraData: (extraData) => {return <div style={{color: 'red'}}>QuantityPerUnit: {extraData.QuantityPerUnit}</div>}}, dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, isMulti: false},
                {type: 'number', title: 'Custom', render: (meta, item, rowIdx, columnIdx) => {return rowIdx}, style: (meta, item, rowIdx, columnIdx) => {return item.ShipCountry === 'USA' ? {backgroundColor: 'green'} : undefined}}*/
            ],
            key: 'OrderID'
        };

        this.cardDetailMeta = {
            fields: [
                {name: 'OrderID'},
                {name: 'ProductID', title: 'Product', type: 'longselect', /*component: ProductFilter,*/ props: {extraData: (extraData) => {return <div style={{color: 'red'}}>QuantityPerUnit: {extraData.QuantityPerUnit}</div>}}, dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, isMulti: false},
                {name: 'UnitPrice', type: 'number'},
                {name: 'Quantity', type: 'number'},
                {name: 'Discount', type: 'number'},
            ],
            keyFunc: e => `${e.OrderID}_${e.ProductID}`,
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
        this.setState({masterKey: selectKey});
    }

    render() {
        return <Paper style={{ margin: 15, padding: 15 }}>
            <SmartPanel type='master-detail'
                master={
                    <SmartPanel type='list-card'
                        list={<List meta={this.meta} globalMeta={GlobalMeta} onSelect={this.onSelect} onSingleSelect={this.onSingleSelect} parentProps={this.props} />}
                        card={<Card meta={this.cardMeta} wrapped="card" globalMeta={GlobalMeta} onSubmit={(values) => console.log(values)} />}
                    />
                }
                detail={
                    <SmartPanel type='list-card'
                        list={<List meta={this.metaDetail} masterKey={this.state.masterKey} globalMeta={GlobalMeta} autoRefresh={false} setRef={(ref) => this.setState({listDetailRef: ref})} />}
                        card={<Card meta={this.cardDetailMeta} wrapped="card" globalMeta={GlobalMeta} onSubmit={(values) => console.log(values)} />}
                    />
                } 
            />
        </Paper>
    }
}

export default withRouter(ListExample);