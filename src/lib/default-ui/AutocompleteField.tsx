// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from '../core/debounce';
import { FieldProps } from '../core/CommonTypes'

interface ValueType {
    [x: string]: any;
}

export interface Props extends FieldProps<ValueType | ValueType[]> {
    multiple: boolean,
    fetchUrlFunc: ((inputValue: string) => string);
    parseResultFunc: ((result: any) => ValueType[]) | null | undefined;
    keyName: string;
    labelName: string | null | undefined;
    labelFunc: (value: ValueType) => {} | undefined;
    options: ValueType[] | undefined
}

export default function AutocompleteField({ options: sourseOptions, nullable = true, disabled, fetchUrlFunc, parseResultFunc, multiple = true, keyName = "Id", labelName, labelFunc, label, value, onChange }: Props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<ValueType[]>([]);
    //const [value, setValue] = React.useState<ValueType[]>([]);
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>('');
    const loading = open && fetching;

    const debounceFetchData = React.useCallback(debounce(async (inputValue: string, active: boolean) => {
        const response = await fetch(fetchUrlFunc(inputValue) as string);
        const result = await response.json();

        if (active) 
        {
            setOptions(parseResultFunc ? parseResultFunc(result) : (result.value ? result.value as ValueType[] : []));
            setFetching(false);
        }
    }, 200), []);

    React.useEffect(() => {
        let active = true;

        if (sourseOptions || !open || inputValue === '') {
            return undefined;
        }

        setFetching(true)
        debounceFetchData(inputValue, active);

        return () => {
            active = false;
        };
    }, [open, inputValue, debounceFetchData]);

    return (
        <Autocomplete
            fullWidth
            multiple={multiple}
            size="small"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => value ? option[keyName] === value[keyName] : false}
            getOptionLabel={labelFunc ? (option) => labelFunc(option) : (option) => option[labelName as string]}
            options={sourseOptions || options}
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