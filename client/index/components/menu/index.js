import React from 'react';
import {Link} from 'react-router-dom'
import css from '../index/index.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={css.menu}>
            <Link to="/dashboard">主页</Link>
            <Link to="/dashboard/main">Main</Link>
            <Link to="/dashboard/about">About</Link>
        </div>
    }
}