import React, { PureComponent } from 'react';

export default class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    getComponent = (field) => {
        let {wrappedComponent, ...rest} = this.props.functions.getComponentProps(field);
        let component = React.createElement(wrappedComponent, {
            ...rest,
        });

        return component;
    }

    render() {
        return (
            <React.Fragment>
                {this.props.meta.fields.map((field, idx) => {
                    return <div key={field.name} style={{paddingTop: 5}}>{this.getComponent(field)}</div>
                })}
            </React.Fragment>
        );
    }
}