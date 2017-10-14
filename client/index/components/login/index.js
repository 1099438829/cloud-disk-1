import React from 'react';
import {Axios} from 'Public'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.sessionStorage.getItem('token') ? this.props.history.push("/dashboard") : null;
    }

    login = () => {
        Axios.get('/api/login').then(ret => {
            window.sessionStorage.setItem('token', ret);
            this.props.history.push("/dashboard");
        })
    }

    render() {
        return <div>
            login
            <button onClick={this.login}>Login</button>
        </div>
    }
}