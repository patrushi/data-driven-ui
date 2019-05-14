import React, {Component} from 'react';

export default class FieldComponentWrapper extends Component {
    render() {
        let {input, wrappedComponent, ...rest} = this.props;
        const element = React.createElement(wrappedComponent, {
            ...rest,
            name: input.name,
            value: input.value,
            onChange: input.onChange
        });
        return element;
    }
}
