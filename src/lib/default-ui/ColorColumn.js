import React from 'react';

export default function ColorColumn(props) {
    return props.type === 'backgroundColor' 
        ? !props.backgroundColor ? null : <div style={{backgroundColor: props.backgroundColor, color: props.color}}>{props.backgroundColor}</div>
        : !props.color ? null : <div style={{backgroundColor: props.backgroundColor, color: props.color}}>{props.color}</div>
}