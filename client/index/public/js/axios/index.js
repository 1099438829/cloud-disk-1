import axios from 'axios'
import NProgress from 'nprogress'
import Promise from 'bluebird';
import {message} from 'antd';
window.Promise = Promise;

/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5)
        NProgress.inc()
        axios.get(url).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            switch (error.response.status){
                case 500:
                    message.error(error.response.data.error);
                    NProgress.done();
                    break;
                case 401:
                    message.warn('用户信息失效！');
                    NProgress.done();
                    window.location = '/login'
                    break;
                default:
                    message.warn('一个错误！');
                    console.log(JSON.stringify(error));
                    break;
            }
            reject()
        });
    })
}

function post(url, parms) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5)
        NProgress.inc()
        axios.post(url, parms).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            switch (error.response.status){
                case 500:
                    message.error(error.response.data.error);
                    NProgress.done();
                    break;
                case 401:
                    message.warn('用户信息失效！');
                    NProgress.done();
                    window.location = '/login'
                    break;
                default:
                    message.warn('一个错误！');
                    console.log(JSON.stringify(error));
                    break;
            }
            reject()
        });
    })
}

export {
    get,
    post
}
