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
        { name: "OrderID", orderable: true },
        { name: "CustomerID" },
        { name: "OrderDate", type: "date" },
        { name: "RequiredDate", type: "date" },
        { name: "ShippedDate", type: "date" },
        { name: "ShipCountry" }
      ],
      key: "OrderID",
      orderable: true,
      filters: [
        { name: "ShipCountry", type: "text" },
        { name: "OrderDate", type: "dateperiod" },
        { name: "RequiredDate", type: "dateperiod" },
        { name: "ShippedDate", type: "dateperiod" }
      ],
      paging: {},
      selectable: { type: "row&checkbox", isMulti: true },
      parsHolder: {
        type: "addressBar",
        prefix: "",
        history: this.props.history
      },
      dataSource: { type: "odata", shortPath: `Orders`, selectAll: true }
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
        />
      </Paper>
    );
  }
}

export default withRouter(ListExample);
