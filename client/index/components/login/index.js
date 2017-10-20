import React from 'react';
import {Axios} from 'Public'
import {Link} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import css from './login.scss'

const FormItem = Form.Item;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.localStorage.getItem('token') ? this.props.history.push("/") : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                Axios.post('/api/login', values).then(ret => {
                    window.localStorage.setItem('token', ret);
                    this.props.history.push("/");
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className={css.box}>
            <h1 className={css.title}>React16-Koa2</h1>
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
    }
}

const Indexs = Form.create()(Index);
export default Indexs