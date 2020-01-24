import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

let defaultValue = "<>";

export default class ShortSelect extends PureComponent {
    constructor(props) {
        super(props);
        
        if (this.props.meta.dataSource) {
            let dataSource = this.props.meta.dataSource;
            let globalMeta = this.props.globalMeta.dataSourceTypes[dataSource.type || this.props.globalMeta.dataSourceTypes.default];
            this.dataSource = new globalMeta.class({meta: dataSource, globalMeta: globalMeta});
        }

        this.state = {
            options: []
        };
    }

    componentDidMount = () => {
        let {componentMeta} = this.props;
        if (componentMeta.options) {
            this.setState({options: componentMeta.options})
        } else if (componentMeta.dataSource) {
            this.dataSource.getLongSelect(this.props, '', (values) => {
                this.setState({options: values.map(v => {return {key: v.label, value: v.value}})})
            });
        }
    }

    render() {
        let { meta, globalMeta, componentMeta, component, onChange, value, notClearable, ...rest } = this.props;
        return (
            <TextField 
                {...rest}
                onChange={(e) => onChange(e.target.value === defaultValue ? null : e.target.value)}
                value={value || defaultValue}
                id="standard-full-width"
                fullWidth
                select
                InputLabelProps={{shrink: true}}
            >
                <MenuItem key={defaultValue} value={defaultValue}></MenuItem>
                {this.state.options.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                    {option.value || option.key}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}