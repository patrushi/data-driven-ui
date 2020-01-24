import React, { useCallback, useRef } from 'react';
import {InlineDatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CalendarIcon from "@material-ui/icons/InsertInvitation";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export default function DateField(props) {
    let { meta, globalMeta, componentMeta, component, onChange, value, notClearable, format, label, ...rest } = props;

    const pickerRef = useRef(null);

    const openPicker = useCallback(
        e => {
            if (pickerRef.current) {
                pickerRef.current.open(e);
            }
        },
        [pickerRef.current]
    );

    let convertToDate = (value) => {
        return !value ? value : moment(value).startOf('day')
    }

    let lFormat = componentMeta.time ? "DD.MM.YYYY HH:mm:ss" : "DD.MM.YYYY"
    let width = componentMeta.time ? '210px' : '160px'

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
            <InlineDatePicker
                {...rest}
                style={{width: width}}
                onlyCalendar
                keyboard
                clearable={!notClearable}
                label={label}
                value={value || null}
                format={format || lFormat}
                onChange={(d) => onChange(convertToDate(d))}
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
                            <IconButton onClick={() => onChange(undefined)} style={{padding: '3px'}} disabled={props.disabled}>
                                <ClearIcon />
                            </IconButton>
                        </React.Fragment>
                } : undefined}
            />
        </MuiPickersUtilsProvider>
    );
}