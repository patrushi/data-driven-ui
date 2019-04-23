import React, { PureComponent } from 'react';
import {FilterList} from '@material-ui/icons'
import {IconButton, MenuItem} from '@material-ui/core'
import MenuButton from './MenuButton'

export default class HeaderPanel extends PureComponent {
    render() {
        return <React.Fragment>
            <table style={{width: '100%'}}><tbody><tr>
                <td>
                    {this.props.title ? <h3>{this.props.title}</h3> : (null)}
                </td>
                <td align="right">
                    {this.props.onFilterPanelClick ? <IconButton onClick={this.props.onFilterPanelClick}><FilterList/></IconButton> : (null)}
                    {this.props.actions ? <MenuButton>
                        {this.props.actions.map((action, idx) => (
                            <MenuItem key={idx} onClick={action.onClick} disabled={action.disabled}>{action.title}</MenuItem>
                        ))}
                    </MenuButton> : (null)}
                </td>
            </tr></tbody></table>
        </React.Fragment>;
    }
}
