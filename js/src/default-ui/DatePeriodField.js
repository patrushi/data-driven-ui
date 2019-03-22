import React, { PureComponent } from 'react';
import DateField from './DateField';

export default class DatePeriodField extends PureComponent {
    render() {
        let {component, dataSource, name, type, onChange, label, placeholder, value, ...rest} = this.props;
        return (
            <React.Fragment>
                <DateField 
                    {...rest}
                    label={this.props.label || ' '}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange} /> - 
                <DateField
                    {...rest}
                    value={this.props.value}
                    onChange={this.props.onChange} />
            </React.Fragment>
        );
    }
}