import React, { PureComponent } from "react";
import { List } from "../lib";
import { DefaultUiMeta as GlobalMeta } from "../lib";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";

export class ListExample extends PureComponent {
  constructor(props) {
    super(props);

    this.meta = {
      columns: [
        { name: "OrderID", headerProps: {style: {width: '20px'}} },
        { name: "CustomerID" },
        { name: "OrderDate", type: "date" },
        { name: "RequiredDate", type: "date" },
        { name: "ShippedDate", type: "date" },
        { name: "ShipCountry" },
        { name: "EmployeeID", title: 'Employee', dataSource: {path: ['Employee', 'LastName']}, render: (meta, item) => `${item.Employee.FirstName} ${item.Employee.LastName}` },
        { name: "Boolean", type: "bool", threeState: true, render: (meta, item, rowIdx, columnIdx) => {return item.CustomerID === "VINET" ? true : item.CustomerID === "VICTE" ? false : null}}
      ],
      key: "OrderID",
      orderable: {initial: {
        OrderDate: 'asc'
      }},
      filters: [
        { name: "EmployeeID", title: 'Employee', type: 'longselect', dataSource: {shortPath: 'Employees', key: 'EmployeeID', value: 'LastName', 
          debounce: true}, isMulti: true},
        { name: "ShipCountry", type: "text", initial: 'fra' },
        { name: "OrderDate", type: "dateperiod" },
      ],
      paging: {},
      selectable: true,
      //checkable: true,
      parsHolder: {
        type: "addressBar",
        prefix: "",
        history: this.props.history
      },
      dataSource: { type: "odata", shortPath: `Orders`, selectAll: true },
      //propsFilters: props => {return [{OrderID: props.orderId}]},
      rowActions: [
        {title: 'Action1', onClick: (item) => alert('Action1'), hidden: (item) => item.CustomerID === "VINET"},
        {title: 'Action2', onClick: (item) => alert('Action2'), disabled: (item) => item.CustomerID === "VINET"},
        {title: 'Action3', onClick: (item) => alert('Action3')}

      ]
    };
  }

  render() {
    return (
      <Paper style={{ margin: 15, padding: 15 }}>
        <List
          meta={this.meta}
          title="Orders"
          globalMeta={GlobalMeta}
          onSelect={this.onSelect}
          onSingleSelect={this.onSingleSelect}
          parentProps={this.props}
          //orderId={10248}
        />
      </Paper>
    );
  }
}

export default withRouter(ListExample);
