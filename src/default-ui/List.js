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
                            {this.props.functions.selection.isCheckboxSelectable() ? <TableCell style={{padding: '0px', textAlign: 'center'}}>
                                {this.props.functions.selection.isMultiSelectable() ? <Checkbox
                                indeterminate={this.props.functions.selection.isSelectedAny()}
                                checked={this.props.functions.selection.isSelectedAll()}
                                onChange={this.props.functions.selection.selectAll}
                                color="default"/> : (null)}
                            </TableCell> : (null)}
                        {this.props.functions.getColumns().map((item, idx) => (
                            <TableCell key={this.props.functions.getColumnKey(item, idx)} style={{width: Math.round(100/this.props.functions.getColumns().length)+'%'}}>
                                {item.orderable || (item.orderable === undefined && this.props.meta.orderable) 
                                    ? <TableSortLabel 
                                        direction={this.props.data.orders[item.name] === 'asc' ? 'desc' : this.props.data.orders[item.name] === 'desc' ? 'asc' : undefined}
                                        active={!(this.props.data.orders[item.name] === undefined)}
                                        onClick={() => this.props.functions.changeColumnOrder(item)}>{this.props.functions.renderColumnTitle(item)}</TableSortLabel>
                                    : this.props.functions.renderColumnTitle(item)}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.data.items.map((item, rowIdx) => {
                        var key = this.props.functions.getRowKey(item, rowIdx);
                        var tableRowProps = this.props.functions.selection.isRowSelectable()
                            ? {
                                hover: true,
                                onClick: event => this.props.functions.selection.select(key, event),
                                role: "checkbox",
                                tabIndex: -1,
                                selected: this.props.functions.selection.isSelected(key)
                            } : null;
                        return <TableRow key={rowIdx} {...tableRowProps} style={this.props.functions.getRowStyle(item, rowIdx)}>
                        {this.props.functions.selection.isCheckboxSelectable() ? <TableCell padding="checkbox">
                            <Checkbox color="default" checked={this.props.functions.selection.isSelected(key)} onClick={event => this.props.functions.selection.select(key, event)} />
                        </TableCell> : (null)}
                        {this.props.functions.getColumns().map((meta, columnIdx) => {
                            let canCellClick = this.props.functions.canCellClick(meta, item, rowIdx, columnIdx);
                            return (
                            <TableCell style={this.props.functions.getCellStyle(meta, item, rowIdx, columnIdx)} key={this.props.functions.getColumnKey(meta, columnIdx)} onClick={canCellClick ? (event) => this.props.functions.onCellClick(meta, item, rowIdx, columnIdx, event) : undefined}>
                                    {this.props.functions.renderCell(meta, item, rowIdx, columnIdx)}
                                </TableCell>
                            )})}
                        </TableRow>
                    }
                    )}
                    </TableBody>
                </Table>
                {!this.props.meta.paging || (!this.props.data.count) || (this.props.meta.paging.showIfSingle === false && this.props.data.count <= this.props.data.paging.perPage)
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
                        {...this.props.globalMeta.paging.props}
                    />}
            </React.Fragment>
        );
    }
}