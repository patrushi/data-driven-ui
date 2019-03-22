import React, { PureComponent } from 'react';

export default class FilterPanel extends PureComponent {

    getField = (meta) => {
        var fieldMeta = this.props.globalMeta.filterTypes[meta.type] || this.props.globalMeta.filterTypes[this.props.globalMeta.filterTypes.default];
        var functions = {
            onChange: (value) => this.props.functions.changeFilter(meta, value)
        };
        let data = {
            value: this.props.data.filters[meta.name]
        };
        var props = {meta, functions, data, label: meta.title || meta.name}
        return React.createElement(fieldMeta.component, props);
    }

    render() {
        return <React.Fragment>
            {this.props.meta.filters.map((item, idx) => (
                <div key={idx}>{this.getField(item)}</div>
            ))}
        </React.Fragment>;
    }
}
