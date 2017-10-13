import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import 'nprogress/nprogress.css'
import Index from './components/index'

ReactDOM.render(
    <Router>
        <Index/>
    </Router>, document.getElementById("app")
);