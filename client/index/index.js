import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom'

import Bundle from './bundle';
import Index from './components/index'
import Main from './components/main'
import AboutController from 'bundle-loader?lazy&name=about!./components/about'

const About = (props) => (
    <Bundle load={AboutController}>
        {(About) => <About {...props}/>}
    </Bundle>
);

ReactDOM.render(
    (<Router>
        <Index>
            <Route path="/" component={Main}/>
            <Route path="/about" component={About}/>
        </Index>
    </Router>),
    document.getElementById("app")
);