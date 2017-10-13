webpackJsonp([3],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	__webpack_require__.e/* require.ensure */(0).then((function(require) {
		cb(__webpack_require__(116));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	__webpack_require__.e/* require.ensure */(2).then((function(require) {
		cb(__webpack_require__(117));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"menu":"index_2JS3_menu","footer":"index_3hWy_footer","box":"index_3CBP_box"};

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bundle = function (_React$Component) {
    _inherits(Bundle, _React$Component);

    function Bundle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Bundle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bundle.__proto__ || Object.getPrototypeOf(Bundle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Bundle, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.load(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.load !== this.props.load) {
                this.load(nextProps);
            }
        }
    }, {
        key: 'load',
        value: function load(props) {
            var _this2 = this;

            this.setState({
                mod: null
            });
            props.load(function (mod) {
                _this2.setState({
                    // handle both es imports and cjs
                    mod: mod.default ? mod.default : mod
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.mod) return false;
            return this.props.children(this.state.mod);
        }
    }]);

    return Bundle;
}(_react2.default.Component);

exports.default = Bundle;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(10);

__webpack_require__(86);

var _index = __webpack_require__(87);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_index2.default, null)
), document.getElementById("app"));

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _head = __webpack_require__(88);

var _head2 = _interopRequireDefault(_head);

var _footer = __webpack_require__(90);

var _footer2 = _interopRequireDefault(_footer);

var _index = __webpack_require__(23);

var _index2 = _interopRequireDefault(_index);

var _reactRouterDom = __webpack_require__(10);

var _bundle = __webpack_require__(44);

var _bundle2 = _interopRequireDefault(_bundle);

var _home = __webpack_require__(92);

var _home2 = _interopRequireDefault(_home);

var _main = __webpack_require__(112);

var _main2 = _interopRequireDefault(_main);

var _about = __webpack_require__(113);

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ReactTransitionGroup from 'react-addons-transition-group'

var Home = function Home(props) {
    return _react2.default.createElement(
        _bundle2.default,
        { load: _home2.default },
        function (A) {
            return _react2.default.createElement(A, props);
        }
    );
};
var Main = function Main(props) {
    return _react2.default.createElement(
        _bundle2.default,
        { load: _main2.default },
        function (A) {
            return _react2.default.createElement(A, props);
        }
    );
};
var About = function About(props) {
    return _react2.default.createElement(
        _bundle2.default,
        { load: _about2.default },
        function (A) {
            return _react2.default.createElement(A, props);
        }
    );
};

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            var firstChild = function firstChild(props) {
                var childrenArray = _react2.default.Children.toArray(props.children);
                return childrenArray[0] || null;
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_head2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: _index2.default.box },
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: Home }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/main', component: Main }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: About })
                ),
                _react2.default.createElement(_footer2.default, null)
            );
        }
    }]);

    return Index;
}(_react2.default.Component);

exports.default = Index;

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _menu = __webpack_require__(89);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_menu2.default, null)
            );
        }
    }]);

    return Index;
}(_react2.default.Component);

exports.default = Index;

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(10);

var _index = __webpack_require__(23);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: _index2.default.menu },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/' },
                    '\u4E3B\u9875'
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/main' },
                    'Main'
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/about' },
                    'About'
                )
            );
        }
    }]);

    return Index;
}(_react2.default.Component);

exports.default = Index;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(23);

var _index2 = _interopRequireDefault(_index);

var _footer = __webpack_require__(91);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {
            time: new Date()
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setInterval(function () {
                _this2.setState({ time: new Date() });
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var time = this.state.time;

            return _react2.default.createElement(
                'div',
                { className: _index2.default.footer + ' ' + _footer2.default.foo },
                'this Footer ',
                _react2.default.createElement(
                    'span',
                    null,
                    'now time: ',
                    time.toLocaleString()
                )
            );
        }
    }]);

    return Index;
}(_react2.default.Component);

exports.default = Index;

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"foo":"footer_3jYr_foo"};

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	__webpack_require__.e/* require.ensure */(1).then((function(require) {
		cb(__webpack_require__(115));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ })

},[45]);
//# sourceMappingURL=index.bundle.js.map