import React from 'react';
import css from './index.scss'
import {Axios} from 'Public';
import {Route, Redirect, Switch as RouterSwitch, Link} from 'react-router-dom'
import logo from '../../public/img/logo.png'
import Bundle from '../../bundle';
import {menu} from '../../config'
import {Icon} from 'antd'

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

    componentDidMount() {
        Axios.post('/api/user').then(ret => {
            user = ret;
        })
    }

    render() {
        return <div className={css.box}>
            <div className={css.head}>
                <img src={logo} alt=""/>
            </div>
            <div>
                <div className={css.menu}>
                    <ul>
                        {menu.map((item, i) => {
                            return <li key={i} className={window.location.pathname === item.url ? css.menu_active : null}>
                                <Link to={item.url}><Icon type={item.icon}/>&nbsp;{item.val}</Link>
                            </li>
                        })}
                    </ul>
                </div>
                <div className={css.content_box}>
                    <div className={css.content}>
                        <RouterSwitch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/main" component={Main}/>
                            <Route path="/about" component={About}/>
                            <Redirect to="/404"/>
                        </RouterSwitch>
                    </div>
                    <div className={css.agreement}>
                        Copyright © 2017 react16-koa2
                    </div>
                </div>
            </div>
        </div>
    }
}