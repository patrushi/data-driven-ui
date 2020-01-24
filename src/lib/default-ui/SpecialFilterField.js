import React, { PureComponent } from 'react';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

export default class SpecialFilterField extends PureComponent {
    render() {
        let { onChange, value } = this.props;
        return value == null ? null : (
            <Tooltip title={value == null ? null : typeof value === 'string' ? value : JSON.stringify(value)}><Chip
                label="Установлен специальный фильтр"
                onDelete={() => onChange(null)}
                style={{backgroundColor: '#DEB887'}}
            /></Tooltip>
        );
    }
}