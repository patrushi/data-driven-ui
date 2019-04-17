import React, { Component } from 'react';
import './App.css';
import ListExample from './examples/ListExample';
import CardExample from './examples/CardExample';
import { Route, BrowserRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={ListExample} />
            </BrowserRouter>
        );
    }
}

