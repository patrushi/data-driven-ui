import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form'

export default class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <Form
                    onSubmit={this.props.onSubmit}
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
    }
}