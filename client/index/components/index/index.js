import React from 'react';
import Head from '../head'
import Footer from '../footer'
import css from '../../css/index.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>
            <Head/>
            <div className={css.box}>
                {this.props.children}
            </div>
            <Footer/>
        </div>
    }
}