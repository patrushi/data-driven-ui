// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from '../core/debounce';
import {FieldProps} from '../core/CommonTypes'

interface ValueType {
    [x:string]: any;
}

export interface Props extends FieldProps<ValueType[]> {
  fetchUrlFunc: (inputValue: string) => {} | null | undefined;
  keyName: string;
  labelName: string | null | undefined;
  labelFunc: (value: ValueType) => {} | undefined;
}

export default function AutocompleteField({fetchUrlFunc, keyName = "Id", labelName, labelFunc, label, value, onChange}: Props) {
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
            setOptions(result.value ? result.value as ValueType[] : []);
            setFetching(false);
        }
    }, 200), []);

    React.useEffect(() => {
        let active = true;

        if (!open || inputValue === '') {
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
            multiple
            size="small"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option[keyName] === value[keyName]}
            getOptionLabel={(option) => labelFunc ? labelFunc(option) : option[labelName as string]}
            options={options}
            loading={loading}
            value={value || []}
            onChange={(event: any, newValue: ValueType[]) => onChange(newValue)}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
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