webpackJsonp([1],{30:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(0),u=r(o),a=n(21),l=r(a),i=n(12),c=n(73),f=r(c),s=n(74),p=r(s),d=n(75),b=r(d),y=n(76),h=r(y),m=function(e){return u.default.createElement(f.default,{load:h.default},function(t){return u.default.createElement(t,e)})};l.default.render(u.default.createElement(i.BrowserRouter,null,u.default.createElement(p.default,null,u.default.createElement(i.Route,{path:"/",component:b.default}),u.default.createElement(i.Route,{path:"/about",component:m}))),document.getElementById("app"))},73:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(l),c=function(e){function t(){var e,n,u,a;r(this,t);for(var l=arguments.length,i=Array(l),c=0;c<l;c++)i[c]=arguments[c];return n=u=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),u.state={mod:null},a=n,o(u,a)}return u(t,e),a(t,[{key:"componentWillMount",value:function(){this.load(this.props)}},{key:"componentWillReceiveProps",value:function(e){e.load!==this.props.load&&this.load(e)}},{key:"load",value:function(e){var t=this;this.setState({mod:null}),e.load(function(e){t.setState({mod:e.default?e.default:e})})}},{key:"render",value:function(){return!!this.state.mod&&this.props.children(this.state.mod)}}]),t}(i.default.Component);t.default=c},74:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(l),c=n(12),f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return u(t,e),a(t,[{key:"render",value:function(){return i.default.createElement("div",null,"react16-koa2 ",i.default.createElement("br",null),i.default.createElement(c.Link,{to:"/"},"main"),i.default.createElement("br",null),i.default.createElement(c.Link,{to:"/about"},"about"),i.default.createElement("br",null),this.props.children)}}]),t}(i.default.Component);t.default=f},75:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(l),c=function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return u(t,e),a(t,[{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement("div",null,"main"))}}]),t}(i.default.Component);t.default=c},76:function(e,t,n){e.exports=function(e){n.e(0).then(function(t){e(n(78))}.bind(null,n)).catch(n.oe)}}},[30]);