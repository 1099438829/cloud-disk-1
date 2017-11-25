import React from 'react';
import css from './index.scss'
import {Axios} from 'Public';

import {Progress, Icon} from 'antd'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            themeSta: true,
            showUp: false,
            upModelSta: false,
            fileList: [],
            thenFile: {},
            first: 0,
            moreFile: [],
        }
    }

    componentDidMount() {
        this.state.showUp = this.props.showUp;
        // 禁止浏览器内退拽
        document.ondragstart = function () {
            return false;
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.showUp, this.props.showUp, this.state.showUp);
        if (nextProps.showUp !== this.props.showUp || this.props.showUp !== this.state.showUp) {
            this.setState({showUp: nextProps.showUp})
        }
        if (nextProps.file.length) {
            let fileList = this.state.fileList;
            let i = 1;
            nextProps.file.map(item => {
                item.index = fileList.length + i;
                i++;
            });
            this.setState({upModelSta: true, fileList: [...this.state.fileList, ...nextProps.file]}, () =>{

                this.upFile(nextProps.file);
                // nextProps.file.map(item => {
                //     new Promise((resolve, reject) => {
                //         this.upFile(item);
                //         resolve(true)
                //     })
                // })
            })
        }
    }

    // 拖拽进入退出
    upSta = (sta) => {
        console.log(sta);
        this.props.upSta(sta)
        // this.setState({showUp: sta})
    };

    // 拖拽释放
    upDrop = (e) => {
        this.setState({showUp: false})
        if (e.dataTransfer.files.length) {
            let dat = {
                name: e.dataTransfer.files[0].name,
                size: e.dataTransfer.files[0].size,
                loading: 0,
                status: 'active',
                timeStamp: 0,
                data: e.dataTransfer.files[0],
                index: this.state.fileList.length + 1
            };
            this.setState({fileList: [...this.state.fileList, dat], upModelSta: true}, () =>{
                this.upFile(dat);
            })
        }
    };

    // 上传
    upFile = (dat) => {
        let file = dat;
        if (dat.length) {
            this.state.moreFile = dat;
            file = dat[this.state.first]
        }
        if (file) {
            file.status = 'active';
            this.state.upIng = true;
            this.state.thenFile = file;
            let url = "/multer/upload";
            let form = new FormData();
            form.append('file', file.data);
            let xhr = new XMLHttpRequest();
            xhr.open("post", url, true);
            xhr.onload = this.uploadComplete; //请求完成
            xhr.onerror = this.uploadFailed; //请求失败
            xhr.upload.onprogress = this.progressFunction;
            xhr.send(form);
        }
    };

    // 上传进度
    progressFunction = (evt) => {
        let loading = Math.round(evt.loaded / evt.total * 100);
        let timeStamp = (evt.timeStamp).toFixed(2) + 'KB/s';
        let {thenFile, fileList} = this.state;
        fileList.map(item => {
            if (item.index === thenFile.index) {
                item.loading = loading;
                item.timeStamp = timeStamp;
            }
        });
        this.setState({fileList: fileList})
    };

    // 上传成功
    uploadComplete = (evt) => {
        this.props.getCatalog('--Refresh')
        this.props.upSta(false);
        // console.log(evt);
        // 服务断接收完文件返回的结果
        // alert(evt.target.responseText);
        let {thenFile, fileList} = this.state;
        console.log("上传成功！", thenFile);
        fileList.map(item => {
            if (item.index === thenFile.index) {
                item.status = 'success';
            }
        });
        this.setState({fileList: fileList, upIng: false}, () => {
            if (this.state.moreFile.length > 0 && this.state.first < this.state.moreFile.length) {
                this.state.first++;
                this.upFile(this.state.moreFile)
            }
        })
    };

    // 上传失败
    uploadFailed = (evt) => {
        console.log(evt);
        let {thenFile, fileList} = this.state;
        fileList.map(item => {
            if (item.index === thenFile.index) {
                item.status = 'exception';
            }
        });
        this.setState({fileList: fileList, upIng: false})
    };

    render() {
        const {showUp, upModelSta, fileList, upIng} = this.state;
        return <div>
            {showUp ?
                <div id="dropbox" className={css.up_box} onDrop={this.upDrop}
                     onDragLeave={this.upSta.bind(this, false)}>
                    <div className={css.up_box_sty}>
                        <div>释放上传文件</div>
                    </div>
                    <input id="inputarea" className={css.up_file} type="file" name="file" multiple="multiple"
                           accept="*"/>
                </div> : null
            }
            <div className={css.file_model}>
                <div className={css.colse} onClick={() => {this.setState({upModelSta: !this.state.upModelSta})}}>
                    <i className={css.colse_t}/>
                    <Icon className={css.colse_i} type={upModelSta ? 'up' : 'down'} />
                </div>
                {upModelSta ?
                <div className={css.up_file_model}>
                    {fileList.length ?
                    <table>
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>文件名</th>
                            <th>大小</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fileList.map((item, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td><span title={item.name}>{item.name.substring(0, 10)}</span></td>
                                <td>{(item.size / 1024).toFixed(2)}KB</td>
                                <td><Progress percent={item.loading} status={item.status}/>{item.timeStamp}</td>
                                <td>
                                    {item.status === 'active' ? (upIng ?
                                        <span><Icon type="loading"/>&nbsp;上传中...</span> :
                                        <button className={css.info_btn} onClick={this.upFile.bind(this, item)}>上传</button>) :
                                        item.status === 'exception' ?
                                            <button className={css.warn_btn} onClick={this.upFile.bind(this, item)}>重试</button> :
                                            <span className={css.success_hover}>上传成功！</span>}
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table> : null}
                </div> : null}
            </div>
        </div>
    }
}