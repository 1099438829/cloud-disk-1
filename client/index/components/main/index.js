import React from 'react';
import wdp from '../../public/img/wdp.png'
import css from './main.scss'
import {Route, Link} from 'react-router-dom'
import {Axios} from 'Public'

import Bundle from '../../bundle';
import MinController from 'bundle-loader?lazy&name=min!../min'

const Min = (props) => <Bundle load={MinController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    message = () => {
        Axios.get('https://domainapi.aliyun.com/onsale/search?fetchSearchTotal=true&token=tdomain-aliyun-com:z3RarzN9vabgoJW43AAEIyWrlC96u8Cs&currentPage=1&pageSize=50&suffix=com&keyWord=awei1&searchIntro=false&keywordAsPrefix=false&keywordAsSuffix=false&exKeywordAsPrefix=false&exKeywordAsSuffix=false&exKeywordAsPrefix2=false&exKeywordAsSuffix2=false&callback=jQuery11110613241475257184_1507797749664&_=1507797749674').then(ret => {
            console.log(ret);
        })
    }
    render() {
        const name = 'name Min';
        return <div>
            this main
            <button onClick={this.message}>message</button>
            <p><Link to={`/main/min/${name}`}>Min</Link></p>
            <div className={css.img}>
                <img src={wdp} alt=""/>
            </div>
            <Route path="/main/min/:name" component={Min}/>
        </div>;
    }
}