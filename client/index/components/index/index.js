import React from 'react';
import css from './index.scss'
import {Axios} from 'Public';
import {Route, Redirect, Switch as RouterSwitch, Link} from 'react-router-dom'
import logo from '../../public/img/logo.png'

import {Layout, Menu, Icon, Switch, Breadcrumb} from 'antd';

const {SubMenu} = Menu;
const { Sider, Content} = Layout;
import Bundle from '../../bundle';

import HomeController from 'bundle-loader?lazy&name=home!../home'
import MainController from 'bundle-loader?lazy&name=main!../main'
import AboutController from 'bundle-loader?lazy&name=about!../about'

const Home = (props) => <Bundle load={HomeController}>{(A) => <A {...props}/>}</Bundle>;
const Main = (props) => <Bundle load={MainController}>{(A) => <A {...props}/>}</Bundle>;
const About = (props) => <Bundle load={AboutController}>{(A) => <A {...props}/>}</Bundle>;

const breadcrumbNameMap = {
    '/main': '控制中心',
    '/about': 'about',
    '/main/min': 'Min子页面',
};

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sta: false,
            collapsed: false,
            themeSta: true
        }
    }

    componentDidMount() {
        Axios.post('/api/user').then(ret => {
            user = ret;
            this.setState({sta: true})
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    changeTheme = () => {
        this.setState({themeSta: !this.state.themeSta})
    }

    changeMenu = (dat) => {
        this.props.history.push(dat.key);
    }

    render() {
        const {sta, themeSta, collapsed} = this.state;
        let selectedKeys = '/';
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            selectedKeys = url;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">React16-Koa2</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);

        console.log(selectedKeys);

        // return sta ? <div className={css.box}><Layout>
        //     <Sider
        //         // breakpoint="lg"
        //         // collapsedWidth="64"
        //         style={{background: themeSta ? '#404040' : '#fff'}}
        //         trigger={null}
        //         collapsible
        //         collapsed={collapsed}
        //     >
        //         <div className={css.logo}>
        //             <img src={logo} alt=""/>
        //             {!collapsed ? <span>React16-Koa2</span> : null}
        //         </div>
        //         <Menu style={{height: 'calc(100vh - 82px)', borderRight: 0}}
        //               theme={themeSta ? 'dark' : 'light'}
        //               mode="inline"
        //               onClick={this.changeMenu}
        //               selectedKeys={[selectedKeys]}
        //               defaultSelectedKeys={['/']}>
        //             <Menu.Item key="/">
        //                 <Icon type="user"/>
        //                 <span>数据中心</span>
        //             </Menu.Item>
        //             <SubMenu key="sub1" title={<span><Icon type="appstore"/><span>控制中心</span></span>}>
        //                 <Menu.Item key="/main">控制中心</Menu.Item>
        //                 <Menu.Item key="/about">Option 5</Menu.Item>
        //                 <Menu.Item key="6">Option 6</Menu.Item>
        //             </SubMenu>
        //             <Menu.Item key="3">
        //                 <Icon type="upload"/>
        //                 <span>设置</span>
        //             </Menu.Item>
        //         </Menu>
        //         <div className={css.change_theme}>
        //             <Switch onChange={this.changeTheme}/> {!collapsed ? <span>Change Theme</span> : null}
        //         </div>
        //     </Sider>
        //     <div className={css.box}>
        //         <Header style={{background: '#fff', padding: 0}}>
        //             <div className={css.change_theme_btn} onClick={this.toggle}>
        //                 <Icon
        //                     className="trigger"
        //                     type={collapsed ? 'menu-unfold' : 'menu-fold'}
        //                 />
        //             </div>
        //         </Header>
        //
        //         <Content style={{background: '#ececec', height: 'calc(100vh - 84px)'}}>
        //             <div className={css.nav}>
        //                 <Breadcrumb>
        //                     {breadcrumbItems}
        //                 </Breadcrumb>
        //             </div>
        //             <div className={css.content}>
        //                 <RouterSwitch>
        //                     <Route exact path="/" component={Home}/>
        //                     <Route path="/main" component={Main}/>
        //                     <Route path="/about" component={About}/>
        //                     <Redirect to="/404"/>
        //                 </RouterSwitch>
        //             </div>
        //             <div className={css.agreement}>
        //                 Copyright © 2017 react16-koa2
        //             </div>
        //         </Content>
        //     </div>
        // </Layout></div> : null
        return <div className={css.box}>
            <div className={css.head}>
                <img src={logo} alt=""/>
            </div>
            <div>
                <div className={css.menu}>
                    <ul>
                        <li className={css.menu_active}><Link to="/">主页</Link></li>
                        <li><Link to="/main">内容</Link></li>
                        <li><Link to="/about">关于</Link></li>
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