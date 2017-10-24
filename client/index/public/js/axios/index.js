import axios from 'axios'
import NProgress from 'nprogress'
import Promise from 'bluebird';

// window.Promise = Promise;


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
            console.log(error);
            reject(error)
            window.location = '/login'
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
            console.log(error);
            reject(error)
            window.location = '/login'
        });
    })
}

export {
    get,
    post
}
