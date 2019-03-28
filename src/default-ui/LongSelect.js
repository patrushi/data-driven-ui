import React, { PureComponent } from 'react';
import SelectWithStyles from './SelectWithStyles';
import debounce from '../core/debounce'; 

export default class LongSelect extends PureComponent {
    loadOptionsFunc = () => {
        var dataSourceMeta = this.props.globalMeta.dataSourceTypes[this.props.meta.dataSource.type || this.props.globalMeta.dataSourceTypes.default];
        return debounce((inputValue, callback) => new dataSourceMeta.class({meta: dataSourceMeta}).getLongSelect(this.props, inputValue, callback), 200);
    }

    render() {
        let {componentMeta, value, onChange} = this.props;
        return (
            <SelectWithStyles {...componentMeta}
                onChange={onChange}
                value={value}
                fullWidth
                loadOptions={this.loadOptionsFunc()}
                />
        );
    }
}