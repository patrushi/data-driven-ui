import React, { PureComponent } from 'react';
import LongSelectWithStyles from './LongSelectWithStyles';
import debounce from '../core/debounce'; 

export default class LongSelect extends PureComponent {
    loadOptionsFunc = () => {
        var dataSourseMetadata = this.props.metadata.dataSourse;
        var dataSourseType = dataSourseMetadata.type || this.props.defaults.dataSourseTypes.default;
        var dataSourse = this.props.defaults.dataSourseTypes[dataSourseType];
        return debounce((inputValue, callback) => dataSourse.getLongSelect({...this.props, inputValue, callback}), 200);
    }

    render() {
        return (
            <LongSelectWithStyles {...this.props} 
                loadOptions={this.loadOptionsFunc()} />
        );
    }
}