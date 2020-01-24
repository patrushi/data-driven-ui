import React, { PureComponent } from 'react';
import DateField from './DateField';
import RemoveIcon from "@material-ui/icons/Remove";

export default class DatePeriodField extends PureComponent {
    render() {
        let {label, placeholder, onChange, value, required, ...rest} = this.props;
        if (!value) value = {};
        return (
            <React.Fragment>
                <DateField 
                    {...rest}
                    required = {required}
                    label={label}
                    value={value.from}
                    placeholder={placeholder}
                    onChange={v => onChange(v === undefined && value.till === undefined ? undefined : {from: v, till: value.till})} />
                <RemoveIcon style={label ? {marginTop: '16px'} : undefined} />
                <DateField
                    {...rest}
                    label={label ? ' ' : undefined}
                    value={value.till}
                    onChange={v => onChange(v === undefined && value.from === undefined ? undefined : {from: value.from, till: v})} />
            </React.Fragment>
        );
    }
}