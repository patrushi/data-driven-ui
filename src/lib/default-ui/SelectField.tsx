// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from '../core/debounce';
import { FieldProps } from '../core/CommonTypes'

export interface Props extends FieldProps<any | any[]> {
    multiple?: boolean,
    getByInputValueFunc?: ((inputValue: string, callback: (result: any) => void) => void);
    keyName?: string;
    labelName?: string;
    labelFunc?: (value: any) => string;
    options?: any[]
}

export default function SelectField({ getByInputValueFunc, options: sourceOptions, nullable = true, disabled, multiple = true, keyName = "Id", labelName, labelFunc, label, value, onChange }: Props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>(sourceOptions || []);
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>('');
    const loading = open && fetching;

    const debounceFetchData = React.useCallback(debounce(async (inputValue: string, active: boolean) => {
        getByInputValueFunc!(inputValue, result => {
            if (active) 
            {
                setOptions(result);
                setFetching(false);
            }
        })
    }, 200), []);

    React.useEffect(() => {
        let active = true;

        if (sourceOptions || !getByInputValueFunc || !open || inputValue === '') {
            return undefined;
        }

        setFetching(true)
        debounceFetchData(inputValue, active);

        return () => {
            active = false;
        };
    }, [open, inputValue, debounceFetchData, getByInputValueFunc, sourceOptions]);

    console.log('value = ', value, 'sourceOptions = ', sourceOptions)

    return (
        <Autocomplete
            fullWidth
            multiple={multiple}
            size="small"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            getOptionSelected={(option, value) => value ? option[keyName] === value[keyName] : false}
            getOptionLabel={labelFunc ? (option) => labelFunc!(option) : (option) => option[labelName as string]}
            options={sourceOptions || options}
            loading={loading}
            value={value || undefined}
            onChange={(event, newValue) => onChange(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            disableClearable={!nullable}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}