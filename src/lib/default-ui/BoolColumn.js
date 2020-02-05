import React from 'react';
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

export default function BoolColumn(props) {
    return props.meta.threeState
        ? (props.value === true ? <Check/> : props.value === false ? <Clear/> : null)
        : (props.value ? <Check/> : null);
}