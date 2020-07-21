import * as React from 'react';
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

export interface Props {
    value: boolean;
    threeState: boolean;
}

export default function BoolColumn({value, threeState}: Props) {
    console.log(threeState, value)
    return threeState
        ? (value === true ? <Check /> : value === false ? <Clear /> : null)
        : (value ? <Check /> : null);
}