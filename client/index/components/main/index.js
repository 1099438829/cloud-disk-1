import React from 'react';
import wdp from '../../img/wdp.png'
import css from './index.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            this main
            <div className={css.img}>
                <img src={wdp} alt=""/>
            </div>
        </div>;
    }
}