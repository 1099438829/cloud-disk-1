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
            <Link to="/">主页</Link>
            <Link to="/main">Main</Link>
            <Link to="/about">About</Link>
        </div>
    }
}