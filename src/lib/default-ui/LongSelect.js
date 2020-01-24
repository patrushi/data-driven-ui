import React, { PureComponent } from 'react';
import SelectWithStyles from './SelectWithStyles';
import debounce from '../core/debounce';
import MenuItem from '@material-ui/core/MenuItem';
var equal = require('fast-deep-equal');

export default class LongSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.value = undefined;
        this.key = undefined;

        if (this.props.withoutDatasource !== true && this.props.meta.dataSource) {
            let dataSource = this.props.meta.dataSource;
            let globalMeta = this.props.globalMeta.dataSourceTypes[dataSource.type || this.props.globalMeta.dataSourceTypes.default];
            this.dataSource = new globalMeta.class({meta: dataSource, globalMeta: globalMeta});
        }

        this.state = {
            defaultOptions: []
        }
    }

    setValue = (value) => {
        if (equal(this.value, value)) return;
        this.value = value;
        this.key = value == null 
            ? null
            : Array.isArray(value) 
                ? value.map(e => e.value)
                : value.value;
        this.setState({value: this.value});
    }

    setKey = (key) => {
        this.key = key;
    }

    loadOptionsFunc = () => {
        if (this.dataSource) {
            return debounce((inputValue, callback) => this.dataSource.getLongSelect(this.props, inputValue, callback), 200);
        }
    }

    compareValue = (v1, v2) => {
        if (v1 === null || v2 === null || v1 === v2) {
            return v1 === v2;
        }
        else if (Array.isArray(v1) && Array.isArray(v2)) {
            return v1.length === v2.length && v1.sort().every(function (value, index) { return value === v2.sort()[index] });
        }
        else {
            return v1 === v2;
        }
    }

    setValueFromProps = (value) => {
        if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
            this.setValue(null);
        } else if ((typeof(value) === 'object' && !Array.isArray(value)) || (Array.isArray(value) && typeof(value[0]) === 'object')) {
            this.setValue(value);
        } else {
            if (this.compareValue(this.key, value)) {
                return;
            }
            var _this = this;

            this.setKey(value);
            if (this.dataSource)
            {
                this.dataSource.getLongSelect(this.props, Array.isArray(value) ? value : [value], data => {
                    _this.setValue(data);
                });
             } else if (this.props.defaultOptions) _this.setValue(this.props.defaultOptions.filter(o => o.value === value)[0]);
        }
    }

    onChange = (value) => {
        this.setValue(value);
        if (this.props.onChange) {
            this.props.onChange(this.key);
        }
    }

    componentDidMount = () => {
        this.setValueFromProps(this.props.value);
        var _this = this;
        if (this.props.componentMeta.preInit) {
            this.dataSource.getLongSelect(this.props, '', data => {
                _this.setState({defaultOptions: data});
            });
        }
        else if (this.props.defaultOptions) {
            _this.setState({defaultOptions: this.props.defaultOptions});
        };
    }

    componentDidUpdate = () => {
        this.setValueFromProps(this.props.value);
    }

    render() {
        let {componentMeta, value, onChange, extraData, components, disabled, clearable, ...rest} = this.props;

        if (extraData) {
            if (components === undefined) components = {};
            components.Option = (props) => {
                return (
                    <MenuItem
                        buttonRef={props.innerRef}
                        selected={props.isFocused}
                        component="div"
                        style={{
                            fontWeight: props.isSelected ? 500 : 400,
                            maxHeight: '100px',
                            height: 'auto'
                        }}
                        {...props.innerProps}
                    >
                        <div>
                            {props.children}
                            {props.data && props.data.extraData ? <div style={{fontSize: 10}}>
                                {extraData(props.data.extraData)}
                            </div> : (null)}
                        </div>                
                    </MenuItem>
                );
            }
        }

        return (
            <SelectWithStyles {...componentMeta}
                onChange={this.onChange}
                value={this.state.value}
                fullWidth={this.props.fullWidth === false ? false : true}
                loadOptions={this.loadOptionsFunc()}
                components={components}
                {...rest}
                isClearable={clearable === false ? false : true}
                isDisabled={disabled}
                defaultOptions={this.state.defaultOptions}
                />
        );
    }
}