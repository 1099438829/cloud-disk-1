import React from 'react';
import {Axios, getCookie} from 'Public'
import {Link} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox, Carousel, message} from 'antd';
import css from './login.scss'
const bg1 = require('../../public/img/bg1.jpg')
import bg2 from '../../public/img/bg2.jpg'
import bg3 from '../../public/img/bg3.jpg'
import bg4 from '../../public/img/bg4.jpg'
import leftquote from '../../public/img/leftquote.png'
import rightquote from '../../public/img/rightquote.png'
import logo from '../../public/img/logo.png'

const FormItem = Form.Item;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        getCookie('token') ? this.props.history.push("/") : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                Axios.post('/api/login', values).then(ret => {
                    if (ret.state) {
                        this.props.history.push("/");
                    }else {
                        message.error(ret.message)
                    }
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className={css.boxs}>
            <div className={css.login_logo}>
                <div>
                    <img src={logo} alt=""/>
                </div>
                <div className={css.login_manu}>
                    <ul>
                        <li className={css.txt_danger}>百度网盘严打违规文件和盗版侵权传播</li>
                        <li>百度首页</li>
                        <li>客户端下载</li>
                        <li>官方贴吧</li>
                        <li>官方微博</li>
                        <li>问题反馈</li>
                        <li className={css.vip}>会员中心</li>
                    </ul>
                </div>
            </div>
            <div>
                <Carousel autoplay effect="fade">
                    <div className={css.car_list}>
                        <img src={bg1} alt=""/>
                        <div className={css.car_item}>
                            <div>
                                <div className={css.car_l}>
                                    <img src={leftquote} alt=""/>
                                </div>
                                <div className={css.car_c}>安全存储</div>
                                <div className={css.car_r}>
                                    &nbsp;
                                </div>
                            </div>
                            <div>
                                <div className={css.car_l}>
                                    &nbsp;
                                </div>
                                <div className={css.car_c}>生活井井有条</div>
                                <div className={css.car_r}>
                                    <img src={rightquote} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.car_list}>
                        <img src={bg2} alt=""/>
                        <div className={css.car_item}>
                            <div>
                                <div className={css.car_l}>
                                    <img src={leftquote} alt=""/>
                                </div>
                                <div className={css.car_c}>在线预览</div>
                                <div className={css.car_r}>
                                    &nbsp;
                                </div>
                            </div>
                            <div>
                                <div className={css.car_l}>
                                    &nbsp;
                                </div>
                                <div className={css.car_c}>文件即开即看</div>
                                <div className={css.car_r}>
                                    <img src={rightquote} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.car_list}>
                        <img src={bg3} alt=""/>
                        <div className={css.car_item}>
                            <div>
                                <div className={css.car_l}>
                                    <img src={leftquote} alt=""/>
                                </div>
                                <div className={css.car_c}>多端并用</div>
                                <div className={css.car_r}>
                                    &nbsp;
                                </div>
                            </div>
                            <div>
                                <div className={css.car_l}>
                                    &nbsp;
                                </div>
                                <div className={css.car_c}>数据随身携带</div>
                                <div className={css.car_r}>
                                    <img src={rightquote} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.car_list}>
                        <img src={bg4} alt=""/>
                        <div className={css.car_item}>
                            <div>
                                <div className={css.car_l}>
                                    <img src={leftquote} alt=""/>
                                </div>
                                <div className={css.car_c}>好友分享</div>
                                <div className={css.car_r}>
                                    &nbsp;
                                </div>
                            </div>
                            <div>
                                <div className={css.car_l}>
                                    &nbsp;
                                </div>
                                <div className={css.car_c}>共度幸福时光</div>
                                <div className={css.car_r}>
                                    <img src={rightquote} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className={css.box}>
                <h2 className={css.title}>账号密码登录</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a href="">忘记密码</a>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        或 <Link to="/register">去注册</Link>
                    </FormItem>
                </Form>
            </div>
            <div className={css.agreement}>
                Copyright © 2017 react16-koa2
            </div>
        </div>
    }
}

const Indexs = Form.create()(Index);
export default Indexs