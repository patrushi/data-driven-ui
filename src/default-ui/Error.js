import React, { PureComponent } from 'react';

export default class Error extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            errorText: null,
            isOpen: false
        };
    }

    render() {
        return null;
    }
}
