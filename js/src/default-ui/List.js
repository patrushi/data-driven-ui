import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.props.meta.selectable && (this.props.meta.selectable.type === 'row&checkbox' || this.props.meta.selectable.type === 'checkbox' || (this.props.meta.selectable.type === undefined && this.props.meta.selectable.isMulti)) ? <TableCell style={{padding: '0px', textAlign: 'center'}}>
                                {this.props.meta.selectable.isMulti ? <Checkbox
                                indeterminate={this.props.data.selected.length > 0 && this.props.data.selected.length < this.props.data.items.length}
                                checked={this.props.data.selected.length !== 0 && this.props.data.selected.length === this.props.data.items.length}
                                onChange={this.props.functions.selectAll}
                                color="default"/> : (null)}
                            </TableCell> : (null)}
                        {this.props.meta.columns.map((item, idx) => (
                            <TableCell key={item.name} style={{width: Math.round(100/this.props.meta.columns.length)+'%'}}>
                                {item.isOrderable 
                                    ? <TableSortLabel 
                                        direction={this.props.data.columnOrders[item.name] === 'asc' ? 'desc' : this.props.data.columnOrders[item.name] === 'desc' ? 'asc' : undefined}
                                        active={!(this.props.data.columnOrders[item.name] === undefined)}
                                        onClick={() => this.props.functions.changeColumnOrder(item)}>{this.props.functions.renderColumnTitle(item)}</TableSortLabel>
                                    : this.props.functions.renderColumnTitle(item)}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.data.items.map((item, rowIdx) => {
                        var key = item[this.props.meta.key];
                        var tableRowProps = this.props.meta.selectable && (this.props.meta.selectable.type === 'row&checkbox' || this.props.meta.selectable.type === 'row' || this.props.meta.selectable.type === undefined)
                            ? {
                                hover: true,
                                onClick: event => this.props.functions.select(key, event),
                                role: "checkbox",
                                tabIndex: -1,
                                selected: this.props.functions.isSelected(key)
                            } : null;
                        return <TableRow key={rowIdx} {...tableRowProps}>
                        {this.props.meta.selectable && (this.props.meta.selectable.type === 'row&checkbox' || this.props.meta.selectable.type === 'checkbox' || (this.props.meta.selectable.type === undefined && this.props.meta.selectable.isMulti)) ? <TableCell padding="checkbox">
                            <Checkbox color="default" checked={this.props.functions.isSelected(key)} onClick={event => this.props.functions.select(key, event)} />
                        </TableCell> : (null)}
                        {this.props.meta.columns.map((meta, columnIdx) => (
                            <TableCell key={meta.name}>
                                {this.props.functions.renderCell(meta, item, rowIdx, columnIdx)}
                            </TableCell>
                        ))}
                        </TableRow>
                    }
                    )}
                    </TableBody>
                </Table>
                {!this.props.meta.paging
                    ? (null)
                    :
                    <TablePagination
                        count={this.props.data.count}
                        rowsPerPage={this.props.data.paging.perPage}
                        page={this.props.data.paging.page}
                        onChangePage = {(event, page) => this.props.functions.changePage(page)}
                        onChangeRowsPerPage = {(event) => this.props.functions.changePerPage(event.target.value)}
                        rowsPerPageOptions={this.props.data.paging.perPageOptions}
                        component="div"
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        labelRowsPerPage={this.props.meta.paging.labelRowsPerPage ? this.props.meta.paging.labelRowsPerPage : "Показывать по: "}
                        labelDisplayedRows={this.props.meta.paging.labelDisplayedRows ? this.props.meta.paging.labelDisplayedRows : ({ from, to, count }) => `${from}-${to} из ${count}`}
                    />}
            </React.Fragment>
        );
    }
}