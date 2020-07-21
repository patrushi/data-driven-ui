import React, { useCallback, useRef } from 'react';
import {InlineDatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CalendarIcon from "@material-ui/icons/InsertInvitation";
import moment from "moment";
//import "moment/locale/ru";
//moment.locale(window.data_driven_ui_locale);

export interface Props {
    value: Date | null | undefined;
    onChange: (date: Date | null) => void;
    label: string;
    format: string;
    disabled: boolean;
    nullable: boolean;
    withTime: boolean;
}

export default function DateField({value, onChange, label, format, disabled, nullable, withTime}: Props) {
    //let { meta, globalMeta, componentMeta, component, onChange, value, notClearable, format, label, propsGetter, ...rest } = props;
    console.log({value, onChange, label, format, disabled, nullable, withTime});

    const pickerRef: any = useRef(null);

    const openPicker = useCallback(
        e => {
            if (pickerRef.current) {
                pickerRef.current.open(e);
            }
        },
        []
    );

    let convertToDate = (value: any) => {
        return !value ? value : moment(value).startOf('day')
    }

    let lFormat = withTime ? "DD.MM.YYYY HH:mm:ss" : "DD.MM.YYYY"
    let width = withTime ? '210px' : '160px'

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
            <InlineDatePicker
                //{...rest}
                //{...(propsGetter ? propsGetter() : undefined)}
                style={{width: width}}
                onlyCalendar
                keyboard
                clearable={nullable}
                label={label}
                value={value || null}
                format={format || lFormat}
                onChange={(d) => onChange(convertToDate(d))}
                autoComplete="off"
                disableOpenOnEnter={true}
                InputLabelProps={{ shrink: true }}
                ref={pickerRef}
                InputProps={nullable ? {
                    endAdornment:
                        <React.Fragment>
                            <IconButton onClick={openPicker} style={{padding: '3px'}} disabled={disabled}>
                                <CalendarIcon />
                            </IconButton>
                            <IconButton onClick={() => onChange(null)} style={{padding: '3px'}} disabled={disabled}>
                                <ClearIcon />
                            </IconButton>
                        </React.Fragment>
                } : undefined}
            />
        </MuiPickersUtilsProvider>
    );
}