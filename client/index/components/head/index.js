import React from 'react';
import Menu from '../menu'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>
            <Menu/>
        </div>
    }
}