import React from 'react';
import SelectField from './SelectField'
import { FieldProps } from '../core/CommonTypes'

export interface Props extends FieldProps<boolean | boolean[]> {
    multiple?: boolean;
    nullable?: boolean;
}

export default function BoolField({ nullable = true, multiple = false, ...props }: Props) {
    let options: Array<{value: boolean | null, label: string}> = [{value: true, label: 'Да'}, {value: false, label: 'Нет'}]
    if (nullable) options.push({value: null, label: '<Не задано>'})
    return (
        <SelectField
            {...props}
            //onChange = {onChange}
            //style={{minWidth: '100px'}}
            //{...props}
            //fullWidth={false}
            nullable = {nullable}
            multiple = {multiple}
            labelName = "label"
            keyName = "value"
            options = {options}
            />
    );
}