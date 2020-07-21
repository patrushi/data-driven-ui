import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import DateField from "../../lib/default-ui/DateField";
import DatePeriodField from "../../lib/default-ui/DatePeriodField";
import TextField from "../../lib/default-ui/TextField";

export class FieldsExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DateFieldValue: null,
            DatePeriodFieldValue: {from: new Date(2010, 0, 1), till: null},
            TextFieldValue: 'test',
        }
    }

    render() {
        return <React.Fragment>
            <DateField label='Default' value={this.state.DateFieldValue} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Not Nullable' value={this.state.DateFieldValue} nullable={false} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Not Editable' editable={false} value={this.state.DateFieldValue} nullable={false} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DatePeriodField label='Default' value={this.state.DatePeriodFieldValue} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Not Nullable' required={true} value={this.state.DatePeriodFieldValue} nullable={false} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Not Editable' editable={false} value={this.state.DatePeriodFieldValue} nullable={false} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <TextField label='Default' value={this.state.TextFieldValue} onChange={(v) => { this.setState({ TextFieldValue: v }) }} /><br/>
        </React.Fragment>
    }
}

export default withRouter(FieldsExample);