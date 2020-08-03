import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import DateField from "../../lib/default-ui/DateField";
import DatePeriodField from "../../lib/default-ui/DatePeriodField";
import TextField from "../../lib/default-ui/TextField";
import SelectField from "../../lib/default-ui/SelectField";
import BoolField from "../../lib/default-ui/BoolField";
import fetch from 'cross-fetch';

export class FieldsExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DateFieldValue: null,
            DatePeriodFieldValue: {from: new Date(2010, 0, 1), till: null},
            TextFieldValue: null,
            AutocompleteFieldSingleValue: 1,
            AutocompleteFieldMultipleValue: [1, 2],
            AutocompleteFieldValue2: null,
            BoolFieldValue: false
        }
    }

    getODataValue = async (getByInputValueUrlFunc, parseResultFunc, inputValue, callback) => {
        const response = await fetch(getByInputValueUrlFunc(inputValue));
        const result = await response.json();
        callback(parseResultFunc ? parseResultFunc(result) : result);
    }

    componentDidMount() {
        if (this.state.AutocompleteFieldMultipleValue) {
            this.getODataValue(
                keys => `https://services.odata.org/V4/Northwind/Northwind.svc/Employees?$select=EmployeeID,LastName,FirstName&$filter=(${keys.map(k => `EmployeeID eq ${k}`).join(" or ")})&$top=10&$orderby=LastName&$format=json`,
                result => result.value,
                this.state.AutocompleteFieldMultipleValue,
                result => this.setState({AutocompleteFieldMultipleValue: result})
            );
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
            <SelectField label='Single' value={this.state.AutocompleteFieldSingleValue} onChange={(v) => { this.setState({ AutocompleteFieldValue: v }) }} 
                getByInputValueFunc = {(inputValue, callback) => this.getODataValue(
                    inputValue => `https://services.odata.org/V4/Northwind/Northwind.svc/Employees?$select=EmployeeID,LastName,FirstName&$filter=contains(tolower(LastName),%27${inputValue}%27)&$top=10&$orderby=LastName&$format=json`,
                    result => result.value,
                    inputValue,
                    callback
                )}
                keyName = "EmployeeID"
                labelName = "LastName"
                nullable={false}
                multiple = {false}
                options = {[{EmployeeID: 1, FirstName: 'Test1'}, {EmployeeID: 2, FirstName: 'Test2'}]}
                labelFunc = {options => `${options.FirstName} ${options.LastName || ''}`} /><br/>
            <SelectField label='Multiple' value={this.state.AutocompleteFieldMultipleValue} onChange={(v) => { this.setState({ AutocompleteFieldMultipleValue: v }) }} 
                getByInputValueFunc = {(inputValue, callback) => this.getODataValue(
                    (inputValue) => `https://services.odata.org/V4/Northwind/Northwind.svc/Employees?$select=EmployeeID,LastName,FirstName&$filter=contains(tolower(LastName),%27${inputValue}%27)&$top=10&$orderby=LastName&$format=json`,
                    result => result.value,
                    inputValue,
                    callback
                )}
                keyName = "EmployeeID"
                labelName = "LastName"
                nullable={false}
                multiple = {true}
                //options = {this.state.AutocompleteFieldMultipleRawValue}
                labelFunc = {options => `${options.FirstName} ${options.LastName || ''}`} /><br/>
            <SelectField label='Example' value={this.state.AutocompleteFieldValue2} onChange={(v) => { this.setState({ AutocompleteFieldValue2: v }) }} 
                getByInputValueFunc = {(inputValue, callback) => this.getODataValue(
                    (inputValue) => `https://country.register.gov.uk/records.json?page-size=5000`,
                    countries => Object.keys(countries).map((key) => countries[key].item[0]),
                    inputValue,
                    callback
                )}
                keyName = "name"
                labelName = "name"/><br/>
                <BoolField label='Boolean' value={this.state.BoolFieldValue} onChange={(v) => { this.setState({ BoolFieldValue: v }) }}/><br/>
            <div>
                {JSON.stringify(this.state, 4)}
            </div>
        </React.Fragment>
    }
}

export default withRouter(FieldsExample);