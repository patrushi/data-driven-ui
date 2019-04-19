import React, { PureComponent } from 'react';
import {FilterList} from '@material-ui/icons'
import {IconButton, MenuItem} from '@material-ui/core'
import MenuButton from './MenuButton'
import Grid from '@material-ui/core/Grid';

export default class HeaderPanel extends PureComponent {
    render() {
        return <React.Fragment>
            <Grid container spacing={8}>
                <Grid item xs>
                    {this.props.title ? <h3>{this.props.title}</h3> : (null)}
                </Grid>
                <Grid item xs="20" justify="flex-end" alignContent="flex-end" alignItems="flex-end">
                    {this.props.onFilterPanelClick ? <IconButton onClick={this.props.onFilterPanelClick}><FilterList/></IconButton> : (null)}
                    {this.props.actions ? <MenuButton>
                        {this.props.actions.map((action, idx) => (
                            <MenuItem key={idx} onClick={action.onClick} disabled={action.disabled}>{action.title}</MenuItem>
                        ))}
                    </MenuButton> : (null)}
                </Grid>
            </Grid>
        </React.Fragment>;
    }
}
