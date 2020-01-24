import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';

export default class FilterPanel extends PureComponent {

    getField = (meta) => {
        var globalMeta = this.props.globalMeta.filterTypes[meta.type] || this.props.globalMeta.filterTypes[this.props.globalMeta.filterTypes.default];
        var props = {
            meta: this.props.meta,
            globalMeta: this.props.globalMeta,
            componentMeta: meta, 
            onChange: (value) => this.props.functions.changeFilter(meta, value), 
            value: this.props.data.filters[meta.name], 
            label: this.props.globalMeta.filters.label ? meta.title || meta.name : null,
            placeholder: this.props.globalMeta.filters.placeholder ? meta.title || meta.name : null,
            ...globalMeta.props,
            ...meta.props
        }
        let component = meta.component || globalMeta.component;
        return React.createElement(component, props);
    }

    render() {
        if (!this.props.meta.filters || !this.props.open) return null;

        var {filtersLayout} = this.props.meta;

        if (!filtersLayout || !filtersLayout.type || filtersLayout.type === 'default')
        {
            var perLine = (filtersLayout && filtersLayout.perLine) || 3;
            var linesCnt = Math.floor((this.props.meta.filters.length - 1)/perLine) + 1;
            var filterLines = [];
            for (let i = 0; i < linesCnt; i++)
            {
                filterLines.push(this.props.meta.filters.slice(i * perLine, (i + 1) * perLine));
            }
            var empty = [];
            if (linesCnt > 1) for (let i = 0; i < perLine * linesCnt - this.props.meta.filters.length; i++)
            {
                empty.push(<Grid item xs key={100+i} />);
            }
            return <div className="filter" style={{margin: '0px -4px 0px -4px'}}>
                {
                    filterLines.map((filters, rowIdx) => (
                        <Grid container key={rowIdx} spacing={0}>
                            {
                                filters.map((filter, idx) => (
                                    <Grid item xs key={idx} style={{display: 'flex', alignItems: 'flex-begin', padding: '4px'}}>{this.getField(filter)}</Grid>
                                )).concat(rowIdx+1 === linesCnt ? empty : [])
                            }
                        </Grid>
                    )
                )}
            </div>;
        }
    }
}
