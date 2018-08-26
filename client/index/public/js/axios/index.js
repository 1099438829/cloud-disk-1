import axios from 'axios'
import NProgress from 'nprogress'
import Promise from 'bluebird';
import {message} from 'antd';

window.Promise = Promise;
Promise.config({
    longStackTraces: true,
    warnings: false // note, run node with --trace-warnings to see full stack traces for warnings
});

// 默认服务地址，数组类型
// axios.defaults.baseURI = defUrl[0];
// 请求头参考
// https://www.jianshu.com/p/c81ec1a547ad
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // Form Data 模式
// axios.defaults.headers.post['Content-Type'] = 'application/json'; // Request Payload 模式
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; // Form Data 文件流模式(与x-www-form-urlencoded相似)
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("Authorization");
// 允许服务端下发cookie
axios.defaults.withCredentials = true;
/**
 * lw get统一请求
 * @param url 地址 例如：'/api/getList?page=1&index=1' Query String Parameters 模式，参数可使用qs将json转换成"page=1&index=1"格式
 * @param config 配置
 * @param tp 拼接地址类型 地址默认在index.html配置，defUrl是地址数组，如有需要传此参数区分不同服务
 */
function get(url, config, tp) {
    let getUrl = defUrl[0] + url;
    if (tp && tp > 0) {
        getUrl = defUrl[tp] + url;
    }
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5);
        NProgress.inc();
        axios.get(getUrl).then(res => {
            NProgress.done();
            resolve(res.data);
        }).catch(function (error) {
            NProgress.done();
            if (error.response) {
                switch (error.response.status) {
                    case 500:
                        message.error(error.response.data.error);
                        break;
                    case 401:
                        message.warn('用户信息失效！请先登录', 2, () => {
                            window.location.href = '#/login';
                        });
                        break;
                    case 405:
                        message.warn('找不到请求！');
                        break;
                    default:
                        message.error('连接错误！');
                        break;
                }
            } else {
                message.error('连接超时！');
            }
            reject()
        });
    })
}

/**
 * lw post 统一请求
 * @param url 地址 例如：'/api/getList'
 * @param parms 支持 Query String Parameters、Form Data、Request Payload
 * @param config 配置
 * @param tp 拼接地址类型 地址默认在index.html配置，defUrl是地址数组，如有需要传此参数区分不同服务
 */
function post(url, parms, config, tp) {
    console.log(parms);
    let postUrl = defUrl[0] + url;
    if (tp && tp > 0) {
        postUrl = defUrl[tp] + url;
    }
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5);
        NProgress.inc();
        axios.post(postUrl, parms).then(res => {
            NProgress.done();
            resolve(res.data);
        }).catch(function (error) {
            NProgress.done();
            if (error.response) {
                switch (error.response.status) {
                    case 500:
                        message.error(error.response.data.error);
                        break;
                    case 401:
                        message.warn('用户信息失效！请先登录', 2, () => {
                            window.location.href = '#/login';
                        });
                        break;
                    case 405:
                        message.warn('找不到请求！');
                        break;
                    default:
                        message.error('连接错误！');
                        break;
                }
            } else {
                message.error('连接超时！');
            }
            reject()
        });
    })
}


function setAuthorization(token) {
    axios.defaults.headers.common['Authorization'] = token;
}

function setPostContentType(contentType) {
    axios.defaults.headers.post['Content-Type'] = contentType;
}

export {
    get,
    post,
    setAuthorization,
    setPostContentType
}
