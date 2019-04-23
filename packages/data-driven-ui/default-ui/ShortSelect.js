import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

let defaultValue = "<>";

export default class ShortSelect extends PureComponent {
    render() {
        let { meta, globalMeta, componentMeta, component, onChange, value, notClearable, ...rest } = this.props;
        return (
            <TextField 
                {...rest}
                onChange={(e) => onChange(e.target.value === defaultValue ? null : e.target.value)}
                value={value || defaultValue}
                id="standard-full-width"
                fullWidth
                select
                InputLabelProps={{shrink: true}}
            >
                <MenuItem key={defaultValue} value={defaultValue}></MenuItem>
                {componentMeta.options.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                    {option.value || option.key}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}