import React, { PureComponent } from 'react';
import ExtTextField from '@material-ui/core/TextField';
import { IconButton } from "@material-ui/core";
import {Clear as ClearIcon} from "@material-ui/icons";

export default class TextField extends PureComponent {
    render() {
        let { component, dataSource, name, type, onChange, value, ...rest } = this.props;
        console.log(rest);
        return (
            <ExtTextField
                {...rest}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                id="standard-full-width"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => onChange(null)} style={{margin: 0, padding: 0}}>
                            <ClearIcon />
                        </IconButton>
                    )
                }}
            />
        );
    }
}