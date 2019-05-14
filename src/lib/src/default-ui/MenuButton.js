import React, { PureComponent } from 'react';
import { IconButton, Button, Menu } from "@material-ui/core";
import { MoreVert, KeyboardArrowDown } from "@material-ui/icons";

export default class MenuButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    onOpen = (event) => {
        event.stopPropagation();
        this.setState({anchorEl: event.currentTarget})
    }

    onClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        let children = !this.props.children ? null : React.Children.map(this.props.children, child => {
            return React.isValidElement(child) ? React.cloneElement(child, {
                onClick: (event) => {this.onClose(); child.props.onClick(event);}
            }) : child;
        })

        return (
            <React.Fragment>
                {this.props.title ? (
                    <Button onClick={this.onOpen} disabled={this.props.disabled}>
                        {this.props.title} <KeyboardArrowDown style={{marginRight: '5px'}} />
                    </Button>
                ) : (
                <IconButton onClick={this.onOpen} disabled={this.props.disabled}>
                    <MoreVert />
                </IconButton>)}
                <Menu 
                    anchorEl={this.state.anchorEl} 
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.onClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                    {children}
                </Menu>
            </React.Fragment>
        );
    }
}