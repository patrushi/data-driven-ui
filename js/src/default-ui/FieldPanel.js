import React, { PureComponent } from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

export default class FieldPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    getField = (metadata, data) => {
        var render = this.props.defaults.filterTypes[metadata.type] || this.props.defaults.filterTypes['default'];
        var functions = {
            onChange: (value) => this.props.functions.changeFilter(metadata, value)
        };
        var data = {
            value: this.props.data.filters[metadata.name]
        };
        var props = {...this.props, functions, data}
        return render(props).render();
    }

    render() {
        return <React.Fragment>
            {Object.keys(this.props.metadata.filters).map(k => {return {...this.props.metadata.filters[k], name: k}}).map((item, idx) => (
                <div key={idx}>{item.title || item.name}: {this.getField(item, '')}</div>
            ))}
        </React.Fragment>;
    }
}
