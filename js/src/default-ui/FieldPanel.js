import React, { PureComponent } from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

export default class FieldPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    getField = (metadata, data) => {
        var render = this.props.defaults.filterTypes[metadata.type] || this.props.defaults.filterTypes['default'];
        return render({...this.props, name: metadata.name}).render();
    }

    render() {
        return <React.Fragment>
            {Object.keys(this.props.metadata.filters).map(k => ({...this.props.metadata.filters[k], name: k})).map((item, idx) => (
                <div key={idx}>{item.title || item.name}: {this.getField(item, '')}</div>
            ))}
        </React.Fragment>;
    }
}
