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
            AutocompleteFieldValue: {EmployeeID: 1},
            AutocompleteFieldValue2: null
        }
    }

    render() {
        return <React.Fragment>
            <DateField label='Default' value={this.state.DateFieldValue} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Not Nullable' value={this.state.DateFieldValue} nullable={false} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DateField label='Disabled' disabled={true} value={this.state.DateFieldValue} onChange={(v) => { this.setState({ DateFieldValue: v }) }} /><br/>
            <DatePeriodField label='Default' value={this.state.DatePeriodFieldValue} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Not Nullable' required={true} value={this.state.DatePeriodFieldValue} nullable={false} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <DatePeriodField label='Disabled' disabled={true} value={this.state.DatePeriodFieldValue} onChange={(v) => { this.setState({ DatePeriodFieldValue: v }) }} /><br/>
            <TextField label='Default' value={this.state.TextFieldValue} onChange={(v) => { this.setState({ TextFieldValue: v }) }} /><br/>
            <AutocompleteField label='Default' value={this.state.AutocompleteFieldValue} onChange={(v) => { this.setState({ AutocompleteFieldValue: v }) }} 
                fetchUrlFunc = {(inputValue) => `https://services.odata.org/V4/Northwind/Northwind.svc/Employees?$select=EmployeeID,LastName,FirstName&$filter=contains(tolower(LastName),%27${inputValue}%27)&$top=10&$orderby=LastName&$format=json`}
                keyName = "EmployeeID"
                labelName = "LastName"
                nullable={false}
                multiple = {false}
                options = {[{EmployeeID: 1, FirstName: 'Test1'}, {EmployeeID: 2, FirstName: 'Test2'}]}
                labelFunc = {options => `${options.FirstName} ${options.LastName || ''}`} /><br/>
            <AutocompleteField label='Example' value={this.state.AutocompleteFieldValue2} onChange={(v) => { this.setState({ AutocompleteFieldValue2: v }) }} 
                fetchUrlFunc = {(inputValue) => `https://country.register.gov.uk/records.json?page-size=5000`}
                parseResultFunc = {countries => Object.keys(countries).map((key) => countries[key].item[0])}
                keyName = "name"
                labelName = "name"/><br/>
            <div>
                {JSON.stringify(this.state, 4)}
            </div>
        </React.Fragment>
    }
}

export default withRouter(FieldsExample);