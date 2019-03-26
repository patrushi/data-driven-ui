import React, { PureComponent } from 'react';
import LongSelectWithStyles from './LongSelectWithStyles';
import debounce from '../core/debounce'; 

export default class LongSelect extends PureComponent {
    loadOptionsFunc = () => {
        var dataSourceMetadata = this.props.metadata.dataSource;
        var dataSourceType = dataSourceMetadata.type || this.props.defaults.dataSourceTypes.default;
        var dataSource = this.props.defaults.dataSourceTypes[dataSourceType];
        return debounce((inputValue, callback) => dataSource.getLongSelect({...this.props, inputValue, callback}), 200);
    }

    render() {
        return (
            <LongSelectWithStyles {...this.props} 
                loadOptions={this.loadOptionsFunc()} />
        );
    }
}