import QueueAnim from 'rc-queue-anim';
import React from 'react';
import css from './index.scss'
import {Axios} from 'Public';
import {Route, Redirect, Switch as RouterSwitch, Link} from 'react-router-dom'
import Bundle from '../../bundle';
import {menu} from '../../config'
import {Icon, Switch, message} from 'antd'
import io from 'socket.io-client';

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
            sta: false,
            card: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Axios.post('/api/user/info').then(ret => {
                if (ret.code === 200) {
                    user = {...user, ...ret.data};
                    this.setState({sta: true})
                } else {
                    message.error(ret.message)
                }
            }).catch(e => {
                this.setState({sta: true})
            })
        }, 500)
        // window.socket = io.connect(':4000', {reconnection: true, secure: true})
        // socket.on('number', function (n) {
        //     console.log(n, ' 人在线');
        // })
    }

    cardSta = (sta) => {
        this.setState({card: sta})
    };

    out = () => {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
        this.props.history.push("/login");
    };

    changeTheme = () => {
        let el = document.querySelector('#theme-link');
        console.log(el.href);
        if (el.href.indexOf('theme_dark') > -1) {
            el.href = 'https://i.bstu.cn/cloud-disk/css/theme_light.bundle.css';
        } else {
            el.href = 'https://i.bstu.cn/cloud-disk/css/theme_dark.bundle.css';
        }
    };

    render() {
        const {sta, card} = this.state;
        return sta ? <QueueAnim type="alpha">
            <div key={1} className={css.bg}>
                <div className={css.head}>
                    <dl>
                        <dt className={css.logo}><img src="https://i.bstu.cn/img/logo.png" alt=""/></dt>
                        <dt className={css.info}>
                            <span>网盘</span>
                            <span>分享</span>
                            <span>更多</span>
                        </dt>
                        <dd className={css.user}>
                            <span className={css.mess} onMouseMove={() => this.cardSta(true)} onMouseLeave={() => this.cardSta(false)}>
                                <span><img src={user.headImg}/></span>
                                <span>{user.name}</span>
                                <span><Icon type="pay-circle-o" /></span>
                                <span><Icon className={card ? css.card_up_active : css.card_up} type="up" /></span>
                                {card ?
                                <div className={css.mess_card} onMouseMove={this.move}>
                                    <div className={css.seat}>&nbsp;</div>
                                    <div className={css.mess_card_info}>
                                        <span><img src={user.headImg}/></span>
                                        <span>{user.name}</span>
                                        <span><Icon type="pay-circle-o" /></span>
                                    </div>
                                    <div>
                                        <span>超级会员尊享15项特权：</span>
                                        <a className={css.vip} href="">会员中心</a>
                                    </div>
                                    <div>
                                        <span><img src={user.headImg}/></span>
                                        <span><img src={user.headImg}/></span>
                                        <span><img src={user.headImg}/></span>
                                        <span><img src={user.headImg}/></span>
                                        <span><img src={user.headImg}/></span>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>个人资料</li>
                                            <li>设置二级密码</li>
                                            <li>帮助中心</li>
                                            <li onClick={this.out}>退出</li>
                                        </ul>
                                    </div>
                                </div> : null}
                            </span>
                            <span>|</span>
                            <a className={css.download} href="">客户端下载</a>
                            <span><Icon type="bell"/></span>
                            <span><Icon type="book"/></span>
                            <span><Icon type="skin"/></span>
                            <a className={css.vip} href="">会员中心</a>
                        </dd>
                    </dl>
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
                        <div className={css.theme_box}>
                            <Switch onChange={this.changeTheme} checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
                        </div>
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
                                Copyright © 2017-2018 cloud-disk
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim> : null;
    }
}