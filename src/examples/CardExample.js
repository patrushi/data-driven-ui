import React, { PureComponent } from 'react';
import Card from '../core/Card';
import GlobalMeta from './GlobalMeta';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";

export class CardExample extends PureComponent {
    constructor(props) {
        super(props);

        this.meta = {
            fields: [
                {name: 'OrderID', orderable: true},
                {name: 'CustomerID'},
                {name: 'OrderDate', type: 'date'},
                {name: 'RequiredDate', type: 'date'},
                {name: 'ShippedDate', type: 'date'},
                {name: 'ShipCountry'},
                {name: 'ProductID', type: 'longselect',
                    props: {extraData: (extraData) => {return <div style={{color: 'red'}}>QuantityPerUnit: {extraData.QuantityPerUnit}</div>}}, dataSource: {shortPath: 'Products', key: 'ProductID', value: 'ProductName'}, isMulti: false},
                {type: 'number', title: 'Custom', render: (meta, item, rowIdx, columnIdx) => {return rowIdx}, style: (meta, item, rowIdx, columnIdx) => {return item.ShipCountry === 'USA' ? {backgroundColor: 'green'} : undefined}}
            ],
            key: 'OrderID'
        };

        this.state = {
        };
    }

    render() {
        return <Paper style={{ margin: 15, padding: 15 }}>
            <Card meta={this.meta} globalMeta={GlobalMeta} onSubmit={(values) => console.log(values)} />
        </Paper>
    }
}

export default withRouter(CardExample);