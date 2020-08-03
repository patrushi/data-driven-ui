import * as React from 'react';
import DateField from './DateField';
import RemoveIcon from "@material-ui/icons/Remove";
import {FieldProps} from '../core/CommonTypes'

export interface Props extends FieldProps<{from: Date | null, till: Date | null}> {
    format?: string | null;
    withTime?: boolean | null;
}

export default function DatePeriodField({value = null, onChange, label, disabled, nullable = true, required, format, withTime}: Props) {
    let lValue = value ? value : {from: null, till: null};
    return (
        <React.Fragment>
            <DateField 
                format = {format}
                withTime = {withTime}
                required = {required}
                disabled = {disabled}
                nullable = {nullable}
                label = {label}
                value = {lValue.from}
                onChange = {v => onChange(!v && !lValue.till ? null : {from: v, till: lValue.till})} />
            <RemoveIcon style={label ? {marginTop: '16px'} : undefined} />
            <DateField
                format = {format}
                withTime = {withTime}
                disabled = {disabled}
                nullable = {nullable}
                required = {required}
                label = ' '
                value = {lValue.till}
                onChange={v => onChange(!v && !lValue.from ? null : {from: lValue.from, till: v})} />
        </React.Fragment>
    );
}