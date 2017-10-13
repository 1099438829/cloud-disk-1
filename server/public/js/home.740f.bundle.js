webpackJsonp([1],{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Public = __webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.colse = function () {
            console.log('a');
            _this.setState({ sta: false });
        };

        _this.state = {
            sta: false
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var sta = this.state.sta;

            return _react2.default.createElement(
                'div',
                null,
                'this home',
                _react2.default.createElement(
                    'button',
                    { onClick: function onClick() {
                            _this2.setState({ sta: true });
                        } },
                    'open'
                ),
                _react2.default.createElement(_Public.Popup, { size: [200, 200], sta: sta, title: 'A', close: this.colse })
            );
        }
    }]);

    return Index;
}(_react2.default.Component);

exports.default = Index;

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Popup = exports.Date = exports.Axios = undefined;

var _axios = __webpack_require__(119);

var Axios = _interopRequireWildcard(_axios);

var _date = __webpack_require__(121);

var Date = _interopRequireWildcard(_date);

var _popup = __webpack_require__(122);

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Axios = Axios;
exports.Date = Date;
exports.Popup = _popup2.default;

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = exports.get = undefined;

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _nprogress = __webpack_require__(120);

var _nprogress2 = _interopRequireDefault(_nprogress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    _nprogress2.default.start();
    return new Promise(function (resolve) {
        _axios2.default.get(url).then(function (res) {
            _nprogress2.default.done();
            resolve(res.data);
        }).catch(function (error) {
            console.log(error);
        });
    });
}

function post(url, parms) {
    // NProgress.start();
    return new Promise(function (resolve) {
        _axios2.default.post(url, parms).then(function (res) {
            // NProgress.done();
            resolve(res.data);
        }).catch(function (error) {
            console.log(error);
        });
    });
}

exports.get = get;
exports.post = post;

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @param {String} string
 * @param {Number} targetLength
 * @return {String}             Return convert result
 */
function addZeros(str) {
    var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    while (str.length < targetLength) {
        str = '0' + str;
    }

    return str;
}

/**
 * @param  {Number} timestamp
 * @param  {String} format
 * @return {String}           Return format result
 */
function formatDate(timestamp) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';

    var date = new Date(timestamp),
        year = '' + date.getFullYear(),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        hours = '' + date.getHours(),
        minutes = '' + date.getMinutes(),
        seconds = '' + date.getSeconds(),
        rMatch = /Y+|M+|D+|h+|m+|s+|S+/g;

    return format.replace(rMatch, function (match) {
        var len = match.length;

        switch (match[0]) {
            case 'Y':
                return year.slice(-len);
            case 'M':
                return addZeros(month).slice(-len);
            case 'D':
                return addZeros(day).slice(-len);
            case 'h':
                return addZeros(hours).slice(-len);
            case 'm':
                return addZeros(minutes).slice(-len);
            case 's':
                return addZeros(seconds).slice(-len);
        }
    });
}

/**
 * @param  {String} dateStr
 * @return {Number}         Return timestamp
 */
function parseDate(dateStr) {
    var rShortMatch = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/,
        rLongMatch = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})\s*$/;
    var match = void 0;

    if (match = dateStr.match(rShortMatch)) {
        return +new Date(+match[1], +match[2] - 1, +match[3]);
    } else if (match = dateStr.match(rLongMatch)) {
        return +new Date(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6]);
    }
}

exports.formatDate = formatDate;
exports.parseDate = parseDate;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _popup = __webpack_require__(123);

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by awei on 2017/9/20.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Popup = function (_Component) {
    _inherits(Popup, _Component);

    function Popup() {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this));

        _this.handRemove = function (e) {
            var _this$refs = _this.refs,
                title = _this$refs.title,
                box = _this$refs.box;

            var s = box.style;
            var x = void 0,
                y = void 0,
                p = 'onmousemove',
                d = document;
            title.style.cursor = 'move';
            e = e || event;
            x = e.clientX - box.offsetLeft;
            y = e.clientY - box.offsetTop;
            d[p] = function (e) {
                e = e || event;

                var left = e.clientX - x;
                var top = e.clientY - y;

                if (left <= 0) {
                    left = 0;
                } else if (left >= d.documentElement.clientWidth - box.offsetWidth) {
                    left = d.documentElement.clientWidth - box.offsetWidth;
                }
                if (top <= 0) {
                    top = 0;
                } else if (top >= d.documentElement.clientHeight - box.offsetHeight) {
                    top = d.documentElement.clientHeight - box.offsetHeight;
                }

                s.left = left + 'px';
                s.top = top + 'px';
            };
            d.onmouseup = function () {
                d[p] = null;
                title.style.cursor = 'default';
            };
        };

        _this.state = {
            stas: false
        };
        return _this;
    }

    _createClass(Popup, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // console.log('will');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // console.log('did');
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (!nextProps.sta) {
                setTimeout(function () {
                    _this2.setState({ stas: false });
                }, 350);
            } else {
                this.state.stas = nextProps.sta;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            var _props = this.props,
                sta = _props.sta,
                title = _props.title,
                children = _props.children,
                close = _props.close;
            var size = this.props.size;

            size ? size = [450, 220] : null;
            var stas = this.state.stas;

            var popSty = {
                width: size[0] + 'px',
                height: size[1] + 'px',
                top: 'calc(50% - ' + size[1] / 2 + 'px)',
                left: 'calc(50% - ' + size[0] / 2 + 'px)'
            };
            var mask = _react2.default.createElement('div', { className: _popup2.default.mask, onClick: function onClick() {
                    close();
                } });
            var html = _react2.default.createElement(
                'div',
                { ref: 'box', style: popSty, className: sta ? _popup2.default.popup + ' ' + _popup2.default.in : _popup2.default.popup + ' ' + _popup2.default.out },
                _react2.default.createElement(
                    'div',
                    { ref: 'title', onMouseDown: this.handRemove.bind(this), className: _popup2.default.title },
                    title || '提示'
                ),
                children,
                _react2.default.createElement(
                    'div',
                    { className: _popup2.default.close_box, onClick: function onClick() {
                            close();
                        } },
                    _react2.default.createElement('span', { className: _popup2.default.close })
                )
            );
            return _react2.default.createElement(
                'div',
                null,
                sta ? mask : null,
                sta ? html : stas ? html : null
            );
        }
    }]);

    return Popup;
}(_react.Component);

exports.default = Popup;

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"in":"popup_35d9_in","ain":"popup_3qkN_ain","out":"popup_2NiN_out","aout":"popup_34Gb_aout","close_box":"popup_2APC_close_box","close":"popup_3s04_close","mask":"popup_A8dm_mask","popup":"popup_3QaL_popup","title":"popup_bZtJ_title"};

/***/ })

});
//# sourceMappingURL=home.740f.bundle.js.map