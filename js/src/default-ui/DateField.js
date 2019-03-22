import React, { PureComponent } from 'react';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import { IconButton } from "@material-ui/core";
import {Clear as ClearIcon} from "@material-ui/icons";

export default class DateField extends PureComponent {
    render() {
        let {component, dataSource, name, type, onChange, label, value, format, ...rest} = this.props;
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <nobr>
                    <InlineDatePicker
                        //style={{ width: '100%' }}
                        {...rest}
                        onlyCalendar
                        keyboard
                        clearable
                        label={this.props.label || ' '}
                        value={this.props.value || null}
                        format={this.props.format || "DD/MM/YYYY"}
                        onChange={this.props.onChange}
                        autoComplete="off"
                        disableOpenOnEnter={true}
                        InputLabelProps={{shrink: true}}
                    /* InputProps={{
                        endAdornment: this.props.data.value ? (
                            <IconButton onClick={() => this.props.functions.onChange(null)}>
                              <ClearIcon />
                            </IconButton>
                        ) : (
                            <IconButton>
                              <CalendarIcon />
                            </IconButton>
                        )
                      }} */
                    />
                    <IconButton onClick={() => this.props.onChange(null)} style={{ padding: '0px 0px 5px 0px', verticalAlign: 'bottom', borderBottom: '1px solid', borderRadius: '0%', borderColor: "#949494" }}>
                        <ClearIcon />
                    </IconButton></nobr>
            </MuiPickersUtilsProvider>
        );
    }
}