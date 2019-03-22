import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';

export default class FilterPanel extends PureComponent {

    getField = (meta) => {
        var fieldMeta = this.props.globalMeta.filterTypes[meta.type] || this.props.globalMeta.filterTypes[this.props.globalMeta.filterTypes.default];
        var functions = {
            onChange: (value) => this.props.functions.changeFilter(meta, value)
        };
        let data = {
            value: this.props.data.filters[meta.name]
        };
        var props = {meta, functions, data, label: meta.title || meta.name}
        return React.createElement(fieldMeta.component, props);
    }

    render() {
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
                empty.push(<Grid item xs />);
            }
            return <React.Fragment>
                {
                    filterLines.map((filters, rowIdx) => (
                        <Grid container key={rowIdx} spacing={8}>
                            {
                                filters.map((filter, idx) => (
                                    <Grid item xs key={idx}>{this.getField(filter)}</Grid>
                                )).concat(rowIdx+1 === linesCnt ? empty : [])
                            }
                        </Grid>
                    )
                )}
            </React.Fragment>;
        }
    }
}
