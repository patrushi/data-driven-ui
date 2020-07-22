import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import DateField from "../../lib/default-ui/DateField";
import DatePeriodField from "../../lib/default-ui/DatePeriodField";
import TextField from "../../lib/default-ui/TextField";
import AutocompleteField from "../../lib/default-ui/AutocompleteField";

export class FieldsExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DateFieldValue: null,
            DatePeriodFieldValue: {from: new Date(2010, 0, 1), till: null},
            TextFieldValue: null,
            AutocompleteFieldValue: null
        }
    }

    render() {
        return <React.Fragment>
            <DateField label='Default' value={this.state.DateFieldValue} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Not Nullable' value={this.state.DateFieldValue} notNullable={true} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Disabled' disabled={true} value={this.state.DateFieldValue} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DatePeriodField label='Default' value={this.state.DatePeriodFieldValue} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Not Nullable' required={true} value={this.state.DatePeriodFieldValue} notNullable={true} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Disabled' disabled={true} value={this.state.DatePeriodFieldValue} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <TextField label='Default' value={this.state.TextFieldValue} onChange={(v) => { this.setState({ TextFieldValue: v }) }} /><br/>
            <AutocompleteField label='Default' value={this.state.AutocompleteFieldValue} onChange={(v) => { this.setState({ AutocompleteFieldValue: v }) }} fetchUrlFunc = {(inputValue) => `https://services.odata.org/V4/Northwind/Northwind.svc/Employees?$select=EmployeeID,LastName,FirstName&$filter=contains(tolower(LastName),%27${inputValue}%27)&$top=10&$orderby=LastName&$format=json`}
                keyName = "EmployeeID"
                labelName = "LastName"
                labelFunc = {options => `${options.FirstName} ${options.LastName}`} /><br/>
        </React.Fragment>
    }
}

export default withRouter(FieldsExample);