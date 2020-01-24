import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'

export default function ConfirmationDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button onClick={() => {props.onConfirm(); props.onClose();}}>Да</Button>
                <Button onClick={props.onClose}>Нет</Button>
            </DialogActions>
        </Dialog>
    );
}
