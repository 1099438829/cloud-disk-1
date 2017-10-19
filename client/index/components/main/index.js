import React from 'react';
import wdp from '../../public/img/wdp.png'
import css from './main.scss'
import {Route, Link} from 'react-router-dom'
import {Axios} from 'Public'
import {message} from 'antd'

import Bundle from '../../bundle';
import MinController from 'bundle-loader?lazy&name=min!../min'

const Min = (props) => <Bundle load={MinController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined
        }
    }

    look = () => {
        Axios.get('/api/look/123').then(ret => {
            this.setState({token: ret})
        })
    }

    delToken = () => {
        window.localStorage.clear('token');
        message.success('localStorage已删除！')
    }

    render() {
        const {token} = this.state;
        console.log(token);
        const name = '12';
        return <div>
            <p>this main</p>
            <div>
                <button onClick={this.look}>模拟请求，无token跳转到主页，有则返回token用户信息</button>
            </div>
            <div>
                <button onClick={this.delToken}>删除localStorage的token</button>
            </div>
            <div>
                {JSON.stringify(token)}
            </div>
            <p><Link to={`/dashboard/main/min/${name}`}>Main 下面的 Min 子页面</Link></p>
            <div className={css.img}>
                <img src={wdp} alt=""/>
            </div>
            <Route path="/dashboard/main/min/:name" component={Min}/>
        </div>;
    }
}