import React, { PureComponent } from 'react';
import ExtTextField from '@material-ui/core/TextField';
import { IconButton } from "@material-ui/core";
import {Clear as ClearIcon} from "@material-ui/icons";

export default class TextField extends PureComponent {
    render() {
        let { meta, globalMeta, componentMeta, component, onChange, value, notClearable, ...rest } = this.props;
        return (
            <ExtTextField
                {...rest}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                id="standard-full-width"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={!notClearable ? {
                    endAdornment: (
                        <IconButton onClick={() => onChange(undefined)} style={{padding: '3px'}}>
                            <ClearIcon />
                        </IconButton>
                    )
                } : undefined}
            />
        );
    }
}