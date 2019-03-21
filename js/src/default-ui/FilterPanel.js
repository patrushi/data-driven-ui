import React, { PureComponent } from 'react';

export default class FilterPanel extends PureComponent {

    getField = (meta, data) => {
        var fieldMeta = this.props.globalMeta.filterTypes[meta.type] || this.props.globalMeta.filterTypes['default'];
        var functions = {
            onChange: (value) => this.props.functions.changeFilter(meta, value)
        };
        var data = {
            value: this.props.data.filters[meta.name]
        };
        var props = {...this.props, functions, data}
        return React.createElement(fieldMeta, props);
    }

    render() {
        return <React.Fragment>
            {Object.keys(this.props.meta.filters).map(k => {return {...this.props.meta.filters[k], name: k}}).map((item, idx) => (
                <div key={idx}>{item.title || item.name}: {this.getField(item, '')}</div>
            ))}
        </React.Fragment>;
    }
}
