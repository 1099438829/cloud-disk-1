import React from 'react';
import {Popup, Axios} from 'Public'
import css from './home.scss'
import Upload from '../upload'
import {Icon} from 'antd'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUp: false,
            index: 0,
            indexUrl: [],
            catalog: [],
            addFolderModelSta: false,
        }
    }

    componentWillMount() {
        this.getCatalog('')
    }

    getCatalog = (route) => {
        Axios.post('/api/catalog', {name: route}).then(ret => {
            this.setState({catalog: ret})
        })
    }

    open = (dat) => {
        let {indexUrl} = this.state;
        if (dat) {
            indexUrl.push(dat)
        }
        this.setState({indexUrl: indexUrl})
        let route = '';
        if (indexUrl.length) {
            route = indexUrl.join("/");
        }
        this.getCatalog(route)
    }

    ret = () => {
        const {indexUrl} = this.state;
        let copyIndexUrl = indexUrl;
        let route = '';
        if (copyIndexUrl.length) {
            copyIndexUrl.splice(copyIndexUrl.length - 1, 1)
            route = copyIndexUrl.join("/");
        }
        this.getCatalog(route)
    }

    colse = () => {
        this.setState({addFolderModelSta: false})
    }

    openModel = (name) => {
        console.log(name);
        this.setState({[name]: true})
    }

    add = () => {
        console.log(this.refs.folderName.value);
        let name = this.refs.folderName.value;
        // TODO: 文件名称验证
        if (name.length) {
            Axios.post('/api/addFolder', {name: name}).then(ret => {
                console.log(ret);
                if (ret) {
                    this.setState({addFolderModelSta: false})
                    let {index, indexUrl} = this.state;
                    this.open(indexUrl[index - 1])
                }
            })
        }
    }

    // 拖拽进入退出
    upSta = (sta) => {
        console.log(sta);
        this.setState({showUp: sta})
    }

    // 删除
    del = (dat) => {
        console.log(dat);
        Axios.post('/api/delFolder', {name: dat}).then(ret => {
            console.log(ret);
            if (ret) {
                this.getCatalog('--Refresh')
            }
        })
    }

    render() {
        const {catalog, addFolderModelSta, indexUrl, showUp} = this.state;
        return <div className={css.box} onDragEnter={this.upSta.bind(this, true)}>
            <div className={css.oper}>
                {indexUrl.length ?
                    <button className={css.btn} onClick={this.ret}><Icon type="left" /></button> : null}
                <button className={css.btn} onClick={() => this.openModel('addFolderModelSta')}>创建文件夹</button>
            </div>

            <div className={css.path}><Icon type="home" /><Icon type="double-right" />
                {indexUrl.map((item, i) => {
                    return <span key={i}>{item}{indexUrl.length - 1 > i ? <Icon type="double-right" /> : null}</span>
                })}
            </div>

            <div className={css.cat}>
                <div className={css.list_base}>
                    <div className={css.sel}>
                        <input type="checkbox"/>
                    </div>
                </div>
                {catalog.length ? catalog.map((item, i) => {
                    return <div className={css.list} key={i}>
                        <div className={css.sel}>
                            <input type="checkbox"/>
                        </div>
                        <div className={css.name} onClick={() => this.open(item)}>{item}</div>
                        <div className={css.operation}>
                            <span onClick={() => this.del(item)}>删除</span>
                        </div>
                    </div>
                }) : <div className={css.empty}><Icon type="frown-o" />这个文件夹是空的</div>}
            </div>
            <Popup size={[480, 150]} sta={addFolderModelSta} title="新建文件夹" close={this.colse}>
                <div>
                    <div className={css.add_box}>
                        <input className={css.add_input} ref="folderName" placeholder="请输入文件夹名"/>
                        <button className={css.btn} onClick={this.add}>确定</button>
                        <button onClick={this.colse}>取消</button>
                    </div>
                </div>
            </Popup>
            <Upload getCatalog={this.getCatalog} showUp={showUp} upSta={this.upSta}/>
        </div>;
    }
}