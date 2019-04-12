import React, { Component } from 'react';
import './App.css';
import Example from './examples/Example';
import { Route, BrowserRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={Example} />
            </BrowserRouter>
        );
    }
}

