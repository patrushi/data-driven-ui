import React, { PureComponent } from 'react';
import List from '../core/List';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
//import ProductFilter from './ProductFilter';

export class Example extends PureComponent {
    constructor(props) {
        super(props);

        this.meta = {
            attrs: [
                {name: 'OrderID', column: false},
                {name: 'CustomerID'},
                {name: 'OrderDate', type: 'date', filter: {type: 'dateperiod'}},
                {name: 'RequiredDate', type: 'date'},
                {name: 'ShippedDate', type: 'date'},
                {name: 'ShipCountry', filter: {}},
                {type: 'number', title: 'Custom', 
                    column: {render: (meta, item, rowIdx, columnIdx) => {return rowIdx}, style: (meta, item, rowIdx, columnIdx) => {return item.ShipCountry === 'USA' ? {backgroundColor: 'green'} : undefined}}}
            ],
            key: 'OrderID',
            //dataSource: {type: 'odata', shortPath: `Orders`, selectAll: true},
            dataSource: {type: 'local', storage: `Orders`},
            actions: [
                {type: 'delete'}
            ],
            parsHolder: {type: 'addressBar', prefix: '', history: this.props.history},
            list: {
                orderable: true,
                //filtersLayout: {type: 'default', perLine: 2},
                paging: {},
                selectable: {checkbox: true, row: true, isMulti: false},
                row: {
                    style: (item, rowIdx) => {return item.ShipCountry === 'France' || item.ShipCountry === 'USA' ? {color: 'red'} : undefined},
                    styleForCells: true
                }
            }
        };

        this.metaDetail = {
            attrs: [
                {name: 'OrderID'},
                {name: 'ProductID', title: 'Product', dataSource: {path: ['Product', 'ProductName']},
                    filter: {
                        type: 'longselect',
                        props: {extraData: (extraData) => {return <div style={{color: 'red'}}>QuantityPerUnit: {extraData.QuantityPerUnit}</div>}},
                        dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, 
                        isMulti: false,
                    }
                },// filter: {name: 'ProductID', func: item => item.ProductID, replace: true}},
                {name: 'UnitPrice', type: 'number', filter: {}},
                {name: 'Quantity', type: 'number'},
                {name: 'Discount', type: 'number'},
            ],
            keyFunc: e => `${e.OrderID}_${e.ProductID}`,
            list: {
                orderable: true,
                filtersLayout: {type: 'default', perLine: 2},
                paging: {showIfSingle: false},
                selectable: {checkbox: true, row: true, isMulti: true},
            },
            //dataSource: {type: 'odata', shortPath: `Order_Details`, selectAll: true}
            dataSource: {type: 'local', storage: `Order_Details`},
            actions: [
                {type: 'delete', isMulti: true},
                {type: 'edit'}
            ]
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
            <List meta={this.metaDetail} globalMeta={GlobalMeta} autoRefresh={false} setRef={(ref) => this.setState({listDetailRef: ref})} />
        </Paper>
    }
}

export default withRouter(Example);