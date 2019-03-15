import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
                        {this.props.metadata.columns.map((item, idx) => (
                            <TableCell key={item.name} style={{width: Math.round(100/this.props.metadata.columns.length)+'%'}}>
                                {item.isOrderable 
                                    ? <TableSortLabel 
                                        direction={this.props.data.columnOrders[item.name] == 'asc' ? 'desc' : this.props.data.columnOrders[item.name] == 'desc' ? 'asc' : undefined}
                                        active={!(this.props.data.columnOrders[item.name] == undefined)}
                                        onClick={() => this.props.functions.changeColumnOrder(item)}>{this.props.functions.renderColumnTitle(item)}</TableSortLabel>
                                    : this.props.functions.renderColumnTitle(item)}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.data.items.map((item, rowIdx) => (
                        <TableRow key={rowIdx}>
                        {this.props.metadata.columns.map((metadata, columnIdx) => (
                            <TableCell key={metadata.name}>
                                {this.props.functions.renderCell(metadata, item, rowIdx, columnIdx)}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {!this.props.metadata.paging
                    ? (null)
                    :
                    <TablePagination
                        count={this.props.data.count}
                        rowsPerPage={this.props.data.paging.perPage}
                        page={this.props.data.paging.page}
                        onChangePage = {(event, page) => this.props.functions.changePage(page)}
                        onChangeRowsPerPage = {(event) => this.props.functions.changePerPage(event.target.value)}
                        rowsPerPageOptions={[10, 100]}
                        component="div"
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        labelRowsPerPage={this.props.metadata.paging.labelRowsPerPage ? this.props.metadata.paging.labelRowsPerPage : "Показывать по: "}
                        labelDisplayedRows={this.props.metadata.paging.labelDisplayedRows ? this.props.metadata.paging.labelDisplayedRows : ({ from, to, count }) => `${from}-${to} из ${count}`}
                    />}
            </React.Fragment>
        );
    }
}