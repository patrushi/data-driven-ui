import React, { PureComponent } from 'react';
import ExtTextField from '@material-ui/core/TextField';

export default class TextField extends PureComponent {
    render() {
        return (
            <ExtTextField {...this.props} onChange={(e) => this.props.functions.onChange(e.target.value)} value={this.props.data.value} />
        );
    }
}