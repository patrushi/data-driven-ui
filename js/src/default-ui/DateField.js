import React, { PureComponent } from 'react';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import { IconButton, InputAdornment } from "@material-ui/core";
import {
    Clear as ClearIcon,
    InsertInvitation as CalendarIcon
} from "@material-ui/icons";

export default class DateField extends PureComponent {
    state = {};
    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <nobr>
                    <InlineDatePicker
                        //style={{ width: '100%' }}
                        onlyCalendar
                        keyboard
                        clearable
                        invalidDateMessage={this.props.invalidDateMessage}
                        label={this.props.label}
                        value={this.props.data.value || null}
                        format={this.props.format || "DD/MM/YYYY"}
                        onChange={this.props.functions.onChange}
                        autoComplete="off"
                        disableOpenOnEnter={true}
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
                    <IconButton onClick={() => this.props.functions.onChange(null)} style={{ padding: '0px 0px 5px 0px', verticalAlign: 'bottom', borderBottom: '1px solid', borderRadius: '0%' }}>
                        <ClearIcon />
                    </IconButton></nobr>
            </MuiPickersUtilsProvider>
        );
    }
}