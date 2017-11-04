import QueueAnim from 'rc-queue-anim';
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
import PopController from 'bundle-loader?lazy&name=about!../pop'

const Home = (props) => <Bundle load={HomeController}>{(A) => <A {...props}/>}</Bundle>;
const Main = (props) => <Bundle load={MainController}>{(A) => <A {...props}/>}</Bundle>;
const About = (props) => <Bundle load={AboutController}>{(A) => <A {...props}/>}</Bundle>;
const Pop = (props) => <Bundle load={PopController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sta: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Axios.post('/api/user').then(ret => {
                user = ret;
                this.setState({sta: true})
            })
        }, 500)
    }

    render() {
        const {sta} = this.state;
        return sta ? <QueueAnim type="alpha">
            <div key={1} className={css.box}>
                <div className={css.head}>
                    <img src={logo} alt=""/>
                </div>
                <div>
                    <div className={css.menu}>
                        <ul>
                            {menu.map((item, i) => {
                                return <li key={i}
                                           className={window.location.pathname === item.url ? css.menu_active : null}>
                                    <Link to={item.url}><Icon type={item.icon}/>&nbsp;{item.val}</Link>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={css.content_box}>
                        <div className={css.content}>
                            <RouterSwitch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/pop" component={Pop}/>
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
        </QueueAnim> : <QueueAnim type="alpha">
            <div key={1} className={css.box}>
                <div className={css.loading}>
                    <div className={css.container}>
                        <p className={css.container_txt}>安全验证中...</p>
                        <div className={css.progress}>
                            <div className={css.progress_bar}>
                                <div className={css.progress_shadow}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    }
}