import React from 'react';
import Head from '../head'
import Footer from '../footer'
import css from './index.scss'
import {Axios} from 'Public';
import {Route} from 'react-router-dom'

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
        this.state = {
            sta: false
        }
    }

    componentDidMount() {
        Axios.post('/api/user').then(ret => {
            user = ret;
            this.setState({sta: true})
        })
    }

    render() {
        const {sta} = this.state;
        return sta ? <div>
            <Head/>
            <div className={css.box}>
                <Route exact path="/dashboard" component={Home}/>
                <Route path="/dashboard/main" component={Main}/>
                <Route path="/dashboard/about" component={About}/>
            </div>
            <Footer/>
        </div> : null
    }
}