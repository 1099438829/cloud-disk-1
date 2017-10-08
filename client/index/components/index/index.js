import React from 'react';
import {Link} from 'react-router-dom'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>
            react16-koa2 <br/>
            <Link to="/">main</Link><br/>
            <Link to="/about">about</Link><br/>
            {this.props.children}
        </div>
    }
}