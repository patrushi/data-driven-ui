# data-driven-ui

Auto created by metadata Lists and Forms

# User capabilities
## List
- Filtering, Ordering, Paging

# Developer capabilities
- Data source types
    - odata
    - local storage (js array)
    - graphql in plans
- Default UI realization in MaterialUI with many components
- You can do custom UI realization

# Simple example of list settings
```
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
        { name: "OrderDate", type: "dateperiod" }
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
```

# Examples
https://codesandbox.io/s/wandering-tdd-6zm0y
