import React from 'react';
import Check from "@material-ui/icons/Check";

export default function BoolColumn(props) {
    return props.value ? <Check/> : null;
}