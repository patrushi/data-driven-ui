import React, { PureComponent } from 'react';
import SelectWithStyles from './SelectWithStyles';
import debounce from '../core/debounce'; 

export default class LongSelect extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };

        if (this.props.meta.dataSource) {
            let globalMeta = this.props.globalMeta.dataSourceTypes[this.props.meta.dataSource.type || this.props.globalMeta.dataSourceTypes.default];
            this.dataSource = new globalMeta.class({meta: this.props.meta.dataSource, globalMeta: globalMeta});
        }
    }

    loadOptionsFunc = () => {
        if (this.dataSource) {
            return debounce((inputValue, callback) => this.dataSource.getLongSelect(this.props, inputValue, callback), 200);
        }
    }

    render() {
        let {componentMeta, value, onChange, ...rest} = this.props;
        return (
            <SelectWithStyles {...componentMeta}
                onChange={onChange}
                value={value}
                fullWidth
                loadOptions={this.loadOptionsFunc()}
                {...rest}
                />
        );
    }
}