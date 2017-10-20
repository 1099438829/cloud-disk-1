import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'
import './public/css/nprogress.css'
import Index from './components/index'

import Bundle from './bundle';

import LoginController from 'bundle-loader?lazy&name=login!./components/login'
import RegisterController from 'bundle-loader?lazy&name=register!./components/register'
import FzfController from 'bundle-loader?lazy&name=fzf!./components/fzf'

const Login = (props) => <Bundle load={LoginController}>{(A) => <A {...props}/>}</Bundle>;
const Register = (props) => <Bundle load={RegisterController}>{(A) => <A {...props}/>}</Bundle>;
const Fzf = (props) => <Bundle load={FzfController}>{(A) => <A {...props}/>}</Bundle>;

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/404" component={Fzf}/>
                <Route path="/" component={Index}/>
            </Switch>
        </div>
    </Router>, document.getElementById("app")
);