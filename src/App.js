import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SimpleList from './examples/SimpleList';
import LocalStorageSimpleList from './examples/LocalStorage/LocalStorageSimpleList';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={SimpleList} />
                <Route path='/SimpleList' component={SimpleList} />
                <Route path='/LocalStorageSimpleList' component={LocalStorageSimpleList} />
            </BrowserRouter>
        );
    }
}