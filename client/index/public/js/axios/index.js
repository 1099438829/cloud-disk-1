import axios from 'axios'
import NProgress from 'nprogress'
import Promise from 'bluebird';
window.Promise = Promise;

function setToken() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    axios.defaults.headers.Authorization = token;
}
/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    NProgress.start();
    NProgress.set(0.5)
    NProgress.inc()
    setToken()
    return new Promise(resolve => {
        axios.get(url).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            console.log(error);
            window.location = '/login'
        });
    })
}

function post(url, parms) {
    NProgress.start();
    NProgress.set(0.5)
    NProgress.inc()
    setToken()
    return new Promise(resolve => {
        axios.post(url, parms).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            console.log(error);
            window.location = '/login'
        });
    })
}

export {
    get,
    post
}
