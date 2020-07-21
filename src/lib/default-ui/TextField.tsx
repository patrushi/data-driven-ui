import * as React from 'react';
import ExtTextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import {FieldProps} from '../core/CommonTypes'

export interface Props extends FieldProps<string> {
}

export default function TextField({value = null, onChange, label, editable = true, nullable = true, required}: Props) {
    console.log({value, label, editable, nullable, required})
    return <ExtTextField
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                id="standard-full-width"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={nullable ? {
                    endAdornment: (
                        <IconButton onClick={() => onChange(null)} style={{padding: '3px'}}>
                            <ClearIcon />
                        </IconButton>
                    )
                } : undefined}
            />
}