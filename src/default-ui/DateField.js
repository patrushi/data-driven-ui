import React, { useCallback, useRef } from 'react';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import { IconButton } from "@material-ui/core";
import { Clear as ClearIcon, InsertInvitation as CalendarIcon } from "@material-ui/icons";

export default function DateField(props) {

    let { component, dataSource, name, type, onChange, label, value, format, notClearable, ...rest } = props;

    const pickerRef = useRef(null);

    const openPicker = useCallback(
        e => {
            if (pickerRef.current) {
                pickerRef.current.open(e);
            }
        },
        [pickerRef.current]
    );

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <InlineDatePicker
                {...rest}
                onlyCalendar
                keyboard
                clearable={!notClearable}
                label={label || ' '}
                value={value || null}
                format={format || "DD.MM.YYYY"}
                onChange={(d) => onChange(d._d)}
                autoComplete="off"
                disableOpenOnEnter={true}
                InputLabelProps={{ shrink: true }}
                ref={pickerRef}
                InputProps={!notClearable ? {
                    endAdornment:
                        <React.Fragment>
                            <IconButton onClick={openPicker} style={{padding: '3px'}} disabled={props.disabled}>
                                <CalendarIcon />
                            </IconButton>
                            <IconButton onClick={() => onChange(null)} style={{padding: '3px'}} disabled={props.disabled}>
                                <ClearIcon />
                            </IconButton>
                        </React.Fragment>
                } : undefined}
            />
        </MuiPickersUtilsProvider>
    );
}