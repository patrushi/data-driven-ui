import React from 'react';
import LongSelect from './LongSelect'

export default function BoolField(props: any) {
    return (
        <LongSelect
            style={{minWidth: '100px'}}
            {...props}
            withoutDatasource={true}
            fullWidth={false}
            defaultOptions = {[{value: true, label: 'Да'}, {value: false, label: 'Нет'}]}
            >
        </LongSelect>
    );
}