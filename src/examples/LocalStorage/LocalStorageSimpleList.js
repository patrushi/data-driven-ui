import React, { PureComponent } from "react";
import { List } from "../../lib";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { storages } from "./storages";

var GlobalMeta = require('../../lib/DefaultUiMeta').default;
GlobalMeta.dataSourceTypes.local.storages = storages

export class LocalStorageSimpleList extends PureComponent {
  constructor(props) {
    super(props);

    this.meta = {
      columns: [
        { name: "OrderID" },
        { name: "CustomerID" },
        { name: "OrderDate", type: "date" },
        { name: "RequiredDate", type: "date" },
        { name: "ShippedDate", type: "date" },
        { name: "ShipCountry" },
        { name: "Boolean", type: "bool", threeState: true, render: (meta, item, rowIdx, columnIdx) => {return item.CustomerID === "VINET" ? true : item.CustomerID === "VICTE" ? false : null}}
      ],
      key: "OrderID",
      orderable: {initial: {
        OrderDate: 'asc'
      }},
      filters: [
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
      dataSource: { type: "local", storage: `Order` },
      //propsFilters: props => {return [(i) => i.Customer && i.Customer.CompanyName === props.customerCompanyName]}
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
          customerCompanyName='Alfreds Futterkiste'
        />
      </Paper>
    );
  }
}

export default withRouter(LocalStorageSimpleList);
