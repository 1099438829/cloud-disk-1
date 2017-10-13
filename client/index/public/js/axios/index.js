import axios from 'axios'
import NProgress from 'nprogress'

function setToken() {
    const token = window.sessionStorage.getItem('token');
    console.log(token);
    axios.defaults.headers.Authorization = token;
}
/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    NProgress.start();
    setToken()
    return new Promise(resolve => {
        axios.get(url).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            console.log(error);
            window.location = '/'
        });
    })
}

function post(url, parms) {
    NProgress.start();
    setToken()
    return new Promise(resolve => {
        axios.post(url, parms).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    })
}

export {
    get,
    post
}
