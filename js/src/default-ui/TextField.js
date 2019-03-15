import React, { PureComponent } from 'react';
import ExtTextField from '@material-ui/core/TextField';

export default class TextField extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <ExtTextField {...this.props} />
        );
    }
}