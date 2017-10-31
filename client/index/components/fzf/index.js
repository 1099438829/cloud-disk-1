import React from 'react';
import css from './fzf.scss'
import fzfImg from '../../public/img/fzf.svg'

export default class Index extends React.Component {
    goIndex = () => this.props.history.push("/");
    goBack = () => window.history.back();

    render() {
        return <div className={css.full_screen}>
            <img className={css.rotating} src={fzfImg} alt=""/>
            <div className={css.full_btn}>
                <button className={css.info_btn} onClick={this.goIndex}>回到主页</button>
                <button className={css.def_btn} onClick={this.goBack}>去上一页</button>
            </div>
        </div>
    }
}
