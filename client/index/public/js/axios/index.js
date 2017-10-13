import axios from 'axios'
import NProgress from 'nprogress'

/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    NProgress.start();
    return new Promise(resolve => {
        axios.get(url).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    })
}

function post(url, parms) {
    // NProgress.start();
    return new Promise(resolve => {
        axios.post(url, parms).then(res => {
            // NProgress.done();
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
