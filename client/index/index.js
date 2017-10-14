import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import 'nprogress/nprogress.css'
import Index from './components/index'
import Login from './components/login'

ReactDOM.render(
    <Router>
        <div>
            <Route path="/dashboard" component={Index}/>
            <Route path="/login" component={Login}/>
        </div>
    </Router>, document.getElementById("app")
);