import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class ShortSelect extends PureComponent {
    render() {
        return (
            <TextField onChange={(e) => this.props.functions.onChange(e.target.value)} value={this.props.data.value}
                id="standard-full-width"
                fullWidth
                select
                label={this.props.label}
                InputLabelProps={{shrink:this.props.data.value ? true : false}}
            >
                {this.props.meta.options.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                    {option.value || option.key}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}