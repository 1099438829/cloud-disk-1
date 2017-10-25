import React from 'react';
import {Popup, Axios} from 'Public'
import css from './home.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sta: false,
            index: 0,
            indexUrl: [],
            catalog: []
        }
    }

    componentWillMount() {
        const {index} = this.state;
        this.getCatalog(index)
    }

    getCatalog = (index, name) => {
        Axios.post('/api/catalog', {name: name}).then(ret => {
            this.setState({catalog: ret})
        })
    }

    open = (dat) => {
        let {index, indexUrl} = this.state;
        indexUrl[index] = dat;
        index++;
        this.setState({indexUrl: indexUrl, index: index})
        if (indexUrl.length) {
            dat = indexUrl.join("/");
            console.log(dat);
        }
        this.getCatalog(index, dat)
    }

    ret = () => {
        const {index, indexUrl} = this.state;
        let copyIndex = index;
        let copyIndexUrl = indexUrl;
        let dat = '';
        if (indexUrl.length) {
            copyIndexUrl.splice(copyIndexUrl.length-1, 1)
            copyIndex--;
            dat = copyIndexUrl.join("/");
            this.state.index = copyIndex;
        }
        this.getCatalog(index, dat)
    }

    colse = () => {
        console.log('a')
        this.setState({sta: false})
    }

    render() {
        const {sta, catalog} = this.state;
        console.log();
        return <div>

            <button onClick={this.ret}>返回上一个</button>

            <div className={css.cat}>
                <ul>
                    {catalog.length ? catalog.map((item, i) => {
                        return <li onClick={this.open.bind(this, item)} key={i}>{item}</li>
                    }) : '这个文件夹是空的'}
                </ul>
            </div>

            <button onClick={() => {this.setState({sta: true})}}>open</button>

            <Popup size={[200, 200]} sta={sta} title={'A'} close={this.colse}></Popup>
        </div>;
    }
}