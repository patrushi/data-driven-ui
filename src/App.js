import React, { Component } from 'react';
import Demo from './examples/List/Demo.js';
import { Route, BrowserRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={Demo} />
            </BrowserRouter>
        );
    }
}