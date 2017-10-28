import React from 'react';
import {Popup, Axios} from 'Public'
import css from './home.scss'
import Upload from '../upload'
import {Icon, Checkbox} from 'antd'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUp: false,              // 拖拽上传界面状态
            catalog: [],                // 文件夹列表容器
            addFolderModelSta: false,   // 模态框状态
            allCheckSta: false,         // 全选
        }
    }

    componentWillMount() {
        this.getCatalog('')
    }

    // 获取文件列表
    getCatalog = (route) => {
        if(route === '--Refresh'){
            const {catalog} = this.state;
            route = catalog.url ? catalog.url : '';
        }
        Axios.post('/api/catalog', {name: route}).then(ret => {
            this.setState({catalog: ret, allCheckSta: false})
        })
    }

    // 返回上一级
    ret = () => {
        const {catalog} = this.state;
        let catalogUrl = catalog.url ? catalog.url.split('/') : [];
        let route = '';
        if (catalogUrl.length > 1) {
            catalogUrl.splice(catalogUrl.length - 1, 1);
            route = catalogUrl.join('/')
        }
        this.getCatalog(route)
    }

    // 关闭模态框
    colse = () => {
        this.setState({addFolderModelSta: false})
    }

    // 打开模态框
    openModel = (name) => {
        this.setState({[name]: true})
    }

    // 新建文件夹
    add = () => {
        const {catalog} = this.state;
        let name = this.refs.folderName.value;
        if (catalog.url) {
            name = catalog.url + '/' + name;
        }
        // TODO: 文件名称验证
        if (name.length) {
            Axios.post('/api/addFolder', {name: name}).then(ret => {
                if (ret) {
                    this.state.addFolderModelSta = false;
                    this.getCatalog(catalog.url)
                }
            })
        }
    }

    // 拖拽进入退出
    upSta = (sta) => {
        console.log(sta);
        this.setState({showUp: sta})
    }

    // 删除文件或文件夹
    del = () => {
        let {catalog} = this.state;
        let delList = [];
        if (catalog && catalog.list) {
            catalog.list.map(item => {
                if (item.check) {
                    let filePath = catalog.url ? catalog.url+'/'+item.name : item.name;
                    filePath ? delList.push(filePath) : null;
                }
            })
        }
        if (delList.length) {
            delList.map(item => {
                Axios.post('/api/delFolder', {name: item}).then(ret => {
                    console.log(ret);
                    if (ret) {
                        const {catalog} = this.state;
                        this.getCatalog(catalog.url)
                    }
                })
            })
        }else{
            console.log('还没有可以删除的项哦!');
        }
    }

    showFile = (dat) => {
        console.log('文件：'+dat);
    }

    checkAll = (e) => {
        let {catalog} = this.state;
        let check = e.target.checked;
        if (catalog.list && catalog.list.length) {
            catalog.list.map(item => {
                item.check = check;
            })
        }
        this.setState({allCheckSta: check, catalog: catalog})
    }

    check = (e, dat, i) => {
        let {catalog} = this.state;
        dat.check = e.target.checked;
        catalog[i] = dat;
        this.setState({catalog: catalog})
    }

    render() {
        const {catalog, addFolderModelSta, showUp, allCheckSta} = this.state;
        let catalogUrl = catalog.url ? catalog.url.split('/') : [];
        let checkNum = 0;
        if (catalog && catalog.list) {
            catalog.list.map(item => {
                if (item.check) {
                    checkNum++;
                }
            });
        }

        return <div className={css.box} onDragEnter={this.upSta.bind(this, true)}>
            {/*操作*/}
            <div className={css.oper}>
                <button className={css.info_btn}><Icon type="upload"/>&nbsp;上传</button>
                <button className={css.def_btn} onClick={() => this.openModel('addFolderModelSta')}><Icon type="folder-add"/>&nbsp;创建文件夹</button>
                <button className={css.def_btn}><Icon type="edit"/>&nbsp;修改名称</button>
                <button className={css.def_btn} onClick={this.del}><Icon type="delete"/>&nbsp;删除</button>
            </div>
            {/*路径*/}
            <div className={css.path}>
                {catalogUrl.length ? <span><a onClick={this.ret} href="javascript:">返回上一级</a> | <a onClick={() => this.getCatalog('')} href="javascript:">全部文件</a> > </span> : '全部文件'}
                {catalogUrl.map((item, i) => {
                    let url = catalogUrl.slice(0, i+1);
                    let urlStr = url.join('/');
                    return <span key={i}>
                        {catalogUrl.length - 1 > i ? <a onClick={() => this.getCatalog(urlStr)} href="javascript:">{item}</a> : item}
                        {catalogUrl.length - 1 > i ? ' > ' : null}
                        </span>
                })}
            </div>
            {/*列表*/}
            <div className={css.cat}>
                <div className={css.list_base}>
                    <div className={css.sel}>
                        <Checkbox checked={allCheckSta} onChange={this.checkAll}/>
                    </div>
                    {checkNum ? <div className={css.check_txt}>已选中{checkNum}个文件/文件夹</div> : null}
                </div>
                {catalog.list && catalog.list.length ? catalog.list.map((item, i) => {
                    let url = catalog.url ? catalog.url+'/'+item.name : item.name;
                    return <div className={css.list} key={i}>
                        <div className={css.sel}>
                            <Checkbox checked={item.check} onChange={(e) => this.check(e, item, i)}/>
                        </div>
                        {item.isDirectory ?
                        <div className={css.name} onClick={() => this.getCatalog(url)}>
                            <Icon type="folder"/>
                            {item.name}
                        </div> : <div className={css.name} onClick={() => this.showFile(url)}>
                            <Icon type="file-text"/>
                            {item.name}
                        </div>}
                    </div>
                }) : <div className={css.empty}><Icon type="frown-o" />&nbsp;哎呀,这个文件夹是空的!</div>}
            </div>
            {/*新建*/}
            <Popup size={[480, 150]} sta={addFolderModelSta} title="新建文件夹" close={this.colse}>
                <div>
                    <div className={css.add_box}>
                        <input className={css.add_input} ref="folderName" placeholder="请输入文件夹名"/>
                        <button className={css.info_btn} onClick={this.add}>确定</button>
                        <button className={css.def_btn} onClick={this.colse}>取消</button>
                    </div>
                </div>
            </Popup>
            {/*上传*/}
            <Upload getCatalog={this.getCatalog} showUp={showUp} upSta={this.upSta}/>
        </div>;
    }
}