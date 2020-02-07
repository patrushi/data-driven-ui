import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuButton from './MenuButton';
import MenuItem from '@material-ui/core/MenuItem'
import ConfirmationDialog from './ConfirmationDialog'

export default class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            confirmationDialogOpen: false
        };
    }

    confirm = (action, onClick) => {
        this.setState({
            confirmationDialogOpen: true, 
            confirmationDialogOnConfirm: onClick == null ? action.onClick : onClick,
            confirmationDialogTitle: action.confirm.title ? action.confirm.title : 'Подтверждение',
            confirmationDialogMessage: action.confirm.message ? action.confirm.message : 'Вы уверены?',
        });
    }

    render() {
        return (
            <React.Fragment>
                <Table className="list" size="small">
                    <TableHead>
                        <TableRow>
                            {this.props.meta.checkable ? <TableCell style={{padding: '0px', textAlign: 'center'}}>
                                <Checkbox
                                style={{padding: '0px'}}
                                indeterminate={this.props.data.checked.length > 0 && this.props.data.checked.length < this.props.data.items.length}
                                checked={this.props.data.checked.length !== 0 && this.props.data.checked.length === this.props.data.items.length}
                                onChange={this.props.functions.checkAll}
                                color="default"/>
                            </TableCell> : (null)}
                        {this.props.functions.getColumns().map((item, idx) => {
                            return (
                                <TableCell key={this.props.functions.getColumnKey(item, idx)} {...this.props.functions.getHeaderCellProps(item)}>
                                    {item.orderable || (item.orderable === undefined && this.props.meta.orderable) 
                                        ? <TableSortLabel 
                                            direction={this.props.data.orders[item.name] === 'asc' ? 'desc' : this.props.data.orders[item.name] === 'desc' ? 'asc' : undefined}
                                            active={!(this.props.data.orders[item.name] === undefined)}
                                            onClick={() => this.props.functions.changeColumnOrder(item)}>{this.props.functions.renderColumnTitle(item)}</TableSortLabel>
                                        : this.props.functions.renderColumnTitle(item)}
                                </TableCell>
                            )})
                        }
                        {this.props.functions.hasRowActions() ? <TableCell style={{width: '0%'}}></TableCell> : (null)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.data.items.map((item, rowIdx) => {
                        var key = this.props.functions.getRowKey(item, rowIdx);
                        var tableRowProps = this.props.meta.selectable
                            ? {
                                hover: true,
                                onClick: event => this.props.functions.select(key, event, item),
                                role: "checkbox",
                                tabIndex: -1,
                                selected: this.props.functions.isSelected(key)
                            } : null;
                        return <TableRow key={rowIdx} {...tableRowProps} style={this.props.functions.getRowStyle(item, rowIdx)}>
                        {this.props.meta.checkable ? <TableCell padding="checkbox">
                            <Checkbox style={{padding: '0px'}} color="default" checked={this.props.functions.isChecked(key)} onClick={event => this.props.functions.check(key, event, item)} />
                        </TableCell> : (null)}
                        {this.props.functions.getColumns().map((meta, columnIdx) => {
                            let canCellClick = this.props.functions.canCellClick(meta, item, rowIdx, columnIdx);
                            return (
                                <TableCell style={this.props.functions.getCellStyle(meta, item, rowIdx, columnIdx)} key={this.props.functions.getColumnKey(meta, columnIdx)} onClick={canCellClick ? (event) => this.props.functions.onCellClick(meta, item, rowIdx, columnIdx, event) : undefined}>
                                    {this.props.functions.renderCell(meta, item, rowIdx, columnIdx)}
                                </TableCell>
                            )})}
                        {this.props.functions.hasRowActions() ? <TableCell className="actions">
                            <MenuButton>
                                {this.props.functions.getRowActions().map((action, idx) => {
                                    if (action.hidden && action.hidden(item)) return undefined
                                    let onClick = action.confirm ? () => this.confirm(action, () => action.onClick(item)) : action.onClick;
                                    return <MenuItem key={idx} onClick={(event) => onClick(item, event)} disabled={action.disabled ? action.disabled(item) : null}>{action.title}</MenuItem>
                                })}
                            </MenuButton>
                        </TableCell> : (null)}
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
                        {...this.props.globalMeta.paging.propsGetter()}
                    />}
                <ConfirmationDialog open={this.state.confirmationDialogOpen} onClose={() => this.setState({confirmationDialogOpen: false, confirmationDialogOnConfirm: null})} onConfirm={this.state.confirmationDialogOnConfirm} title={this.state.confirmationDialogTitle}>
                    {this.state.confirmationDialogMessage}
                </ConfirmationDialog>
            </React.Fragment>
        );
    }
}