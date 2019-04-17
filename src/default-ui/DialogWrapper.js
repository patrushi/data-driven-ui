import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { PureComponent } from 'react';

export default class DialogWrapper extends PureComponent {
    render() {
        return (
            <Dialog open={Boolean(this.props.open)} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
            </Dialog>
        );
    }
}