import React from 'react';
import Head from '../head'
import Footer from '../footer'
import css from './index.scss'
import {Route} from 'react-router-dom'
// import ReactTransitionGroup from 'react-addons-transition-group'

import Bundle from '../../bundle';

import HomeController from 'bundle-loader?lazy&name=home!../home'
import MainController from 'bundle-loader?lazy&name=main!../main'
import AboutController from 'bundle-loader?lazy&name=about!../about'

const Home = (props) => <Bundle load={HomeController}>{(A) => <A {...props}/>}</Bundle>;
const Main = (props) => <Bundle load={MainController}>{(A) => <A {...props}/>}</Bundle>;
const About = (props) => <Bundle load={AboutController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const firstChild = props => {
            const childrenArray = React.Children.toArray(props.children);
            return childrenArray[0] || null;
        };
        return <div>
            <Head/>
            <div className={css.box}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/about" component={About}/>
            </div>
            <Footer/>
        </div>
    }
}