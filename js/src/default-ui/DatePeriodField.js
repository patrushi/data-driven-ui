import React, { PureComponent } from 'react';
import DateField from './DateField';

export default class DatePeriodField extends PureComponent {
    render() {
        let {component, dataSource, name, type, onChange, label, placeholder, value, ...rest} = this.props;
        if (value === undefined) value = {};
        return (
            <React.Fragment>
                <DateField 
                    {...rest}
                    label={label || ' '}
                    value={value.from}
                    placeholder={placeholder}
                    onChange={v => onChange({from: v, till: value.till})} /> - 
                <DateField
                    {...rest}
                    value={value.till}
                    onChange={v => onChange({from: value.from, till: v})} />
            </React.Fragment>
        );
    }
}