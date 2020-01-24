import React, { PureComponent } from 'react';
import FilterList from '@material-ui/icons/FilterList'
import Refresh from '@material-ui/icons/Refresh'
import Key from '@material-ui/icons/VpnKey'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuButton from './MenuButton'
import ConfirmationDialog from './ConfirmationDialog'

export default class HeaderPanel extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            confirmationDialogOpen: false
        };
    }

    confirm = (action) => {
        this.setState({
            confirmationDialogOpen: true, 
            confirmationDialogOnConfirm: action.onClick,
            confirmationDialogTitle: action.confirm.title ? action.confirm.title : 'Подтверждение',
            confirmationDialogMessage: action.confirm.message ? action.confirm.message : 'Вы уверены?',
        });
    }

    render() {
        let children = [];
        if (this.props.actions) children.push(<MenuButton key="actions" popupTitle="Дополнительные действия ...">
                {this.props.actions.map((action, idx) => {
                    let onClick = action.confirm ? () => this.confirm(action) : action.onClick;
                    return <MenuItem key={idx} onClick={onClick} disabled={action.disabled}>{action.title}</MenuItem>
                })}
            </MenuButton>);
        if (this.props.onKey) children.push(<IconButton key="onKey" onClick={this.props.onKey} title="Показать/скрыть ID"><Key/></IconButton>)
        if (this.props.onFilterPanelClick) children.push(<IconButton key="onFilterPanelClick" onClick={this.props.onFilterPanelClick} title="Показать/скрыть панель фильтров"><FilterList/></IconButton>);
        if (this.props.onRefresh) children.push(<IconButton key="onRefresh" onClick={this.props.onRefresh} title="Обновить"><Refresh/></IconButton>)
        return <React.Fragment>
            <table style={{width: '100%'}}><tbody><tr>
                <td>
                    {this.props.title ? <h3>{this.props.title}</h3> : (null)}
                </td>
                <td align="right">
                    <div style={{marginRight: '-12px', position: 'relative'}}>
                    {this.props.renderHeaderActions ? this.props.renderHeaderActions(children) : children}
                    </div>
                </td>
            </tr></tbody></table>
            <ConfirmationDialog open={this.state.confirmationDialogOpen} onClose={() => this.setState({confirmationDialogOpen: false, confirmationDialogOnConfirm: null})} onConfirm={this.state.confirmationDialogOnConfirm} title={this.state.confirmationDialogTitle}>
                {this.state.confirmationDialogMessage}
            </ConfirmationDialog>
        </React.Fragment>;
    }
}
