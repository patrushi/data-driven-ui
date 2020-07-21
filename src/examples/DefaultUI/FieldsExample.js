import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import DateField from "../../lib/default-ui/DateField";

export class FieldsExample extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
          DateFieldValue: null
      }
    }
  
    render() {
      return (
        <DateField value={this.state.DateFieldValue} onChange={(v) => {this.setState({DateFieldValue: v})}} />
      );
    }
  }
  
  export default withRouter(FieldsExample);