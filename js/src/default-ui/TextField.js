import React, { PureComponent } from 'react';
import ExtTextField from '@material-ui/core/TextField';

export default class TextField extends PureComponent {
    render() {
        let {component, dataSource, name, type, onChange, ...rest} = this.props;
        return (
            <ExtTextField 
                {...rest}
                onChange={(e) => this.props.onChange(e.target.value)}
                id="standard-full-width"
                fullWidth
                InputLabelProps={{shrink: true}}
            />
        );
    }
}