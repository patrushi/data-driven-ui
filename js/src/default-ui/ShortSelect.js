import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

let defaultValue = "<>";

export default class ShortSelect extends PureComponent {
    render() {
        let {component, dataSource, name, type, value, onChange, ...rest} = this.props;
        return (
            <TextField 
                {...rest}
                onChange={(e) => this.props.onChange(e.target.value == defaultValue ? null : e.target.value)}
                value={this.props.value || defaultValue}
                id="standard-full-width"
                fullWidth
                select
                InputLabelProps={{shrink: true}}
            >
                <MenuItem key={defaultValue} value={defaultValue}></MenuItem>
                {this.props.options.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                    {option.value || option.key}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}