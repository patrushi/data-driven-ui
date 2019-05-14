import React, { PureComponent } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';

export var errorHandler;

export default class ErrorPanel extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            open: false
        };

        errorHandler = (error) => {
            this.setState({error: error, open: true});       
        }
    }

    render() {
        return (
            <Dialog open={this.state.open} onClose={() => this.setState({open: false})} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.state.error ? this.state.error.toString() : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({open: false})}>OK ...</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
