import React, { PureComponent } from 'react';
import LongSelectWithStyles from './LongSelectWithStyles';

export default class LongSelect extends PureComponent {
    constructor(props) {
        super(props);
    }

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

// ==============================
// Debounce (https://github.com/jashkenas/underscore)
// ==============================
export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}