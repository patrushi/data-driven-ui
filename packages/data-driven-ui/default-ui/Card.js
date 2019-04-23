import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import DialogWrapper from './DialogWrapper';

export default class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let component = !this.props.open ? null : (
            <React.Fragment>
                <Form
                    onSubmit={(values) => {this.props.onClose(); this.props.onSubmit(values);}}
                    initialValues={this.props.item}
                    //validate={validate}
                    render={({ handleSubmit, pristine, invalid }) => (
                        <form onSubmit={handleSubmit}>
                            {this.props.meta.fields.map((field, idx) => {
                                let key = this.props.functions.getFieldKey(field, idx);
                                return <div key={key}><Field 
                                    name={key}
                                    component={this.props.functions.getComponent(field)}
                                    {...this.props.functions.getComponentProps(field)}
                                /></div>
                            })}
                            <button type="submit" disabled={pristine || invalid}>
                                Submit
                            </button>
                        </form>
                    )}
                />
            </React.Fragment>
        );

        if (!component) return null;

        if (this.props.wrapped === 'card') {
            return (
                <DialogWrapper open={this.props.open} onClose={this.props.onClose}>
                    {component}
                </DialogWrapper>
            );
        } else {
            return component;
        }
    }
}