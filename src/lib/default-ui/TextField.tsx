import * as React from 'react';
import ExtTextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import {FieldProps} from '../core/CommonTypes'

export interface Props extends FieldProps<string> {
}

export default function TextField({value = null, onChange, label, disabled, notNullable, required}: Props) {
    return <ExtTextField
                label = {label}
                value = {value || ''}
                onChange = {(e) => onChange(e.target.value)}
                fullWidth
                disabled = {disabled}
                InputLabelProps={{ shrink: true }}
                InputProps={!notNullable ? {
                    endAdornment: (
                        <IconButton onClick={() => onChange(null)} style={{padding: '3px'}}>
                            <ClearIcon />
                        </IconButton>
                    )
                } : undefined}
            />
}