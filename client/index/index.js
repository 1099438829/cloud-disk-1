import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'
import './public/css/nprogress.css'
import Index from './components/index'
// import Login from './components/login'
// import Register from './components/register'

import Bundle from './bundle';

import LoginController from 'bundle-loader?lazy&name=login!./components/login'
import RegisterController from 'bundle-loader?lazy&name=register!./components/register'

const Login = (props) => <Bundle load={LoginController}>{(A) => <A {...props}/>}</Bundle>;
const Register = (props) => <Bundle load={RegisterController}>{(A) => <A {...props}/>}</Bundle>;

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/dashboard" component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Redirect to="/dashboard"/>
            </Switch>
        </div>
    </Router>, document.getElementById("app")
);