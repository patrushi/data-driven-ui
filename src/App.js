import React, { Component } from 'react';
import SimpleList from './examples/SimpleList.js';
import { Route, BrowserRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={SimpleList} />
            </BrowserRouter>
        );
    }
}