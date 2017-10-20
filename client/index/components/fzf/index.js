import React from 'react';
import css from './fzf.scss'
import fzfImg from '../../public/img/fzf.svg'

export default class Index extends React.Component {
    render() {
        return <div className={css.full_screen}>
            <img className={css.rotating} src={fzfImg} alt=""/>
        </div>
    }
}
