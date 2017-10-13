import React from 'react';
import css from '../index/index.scss'
import fooCss from './footer.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        setInterval(()=>{
            this.setState({time: new Date()})
        }, 1000)
    }

    render() {
        const {time} = this.state;
        return <div className={`${css.footer} ${fooCss.foo}`}>
            this Footer <span>now time: {time.toLocaleString()}</span>
        </div>;
    }
}