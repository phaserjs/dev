/******/ var __webpack_modules__ = ({

/***/ 8922:
/***/ (function(module) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 3896:
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ 1563:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var l = __webpack_require__(3896),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113,
    z = n ? Symbol.for("react.memo") : 60115,
    A = n ? Symbol.for("react.lazy") : 60116,
    B = "function" === typeof Symbol && Symbol.iterator;

function C(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var D = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    E = {};

function F(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

F.prototype.isReactComponent = {};

F.prototype.setState = function (a, b) {
  if ("object" !== _typeof(a) && "function" !== typeof a && null != a) throw Error(C(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function G() {}

G.prototype = F.prototype;

function H(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

var I = H.prototype = new G();
I.constructor = H;
l(I, F.prototype);
I.isPureReactComponent = !0;
var J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, c) {
  var e,
      d = {},
      g = null,
      k = null;
  if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = c;else if (1 < f) {
    for (var h = Array(f), m = 0; m < f; m++) {
      h[m] = arguments[m + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (e in f = a.defaultProps, f) {
    void 0 === d[e] && (d[e] = f[e]);
  }
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: J.current
  };
}

function N(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function O(a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var P = /\/+/g,
    Q = [];

function R(a, b, c, e) {
  if (Q.length) {
    var d = Q.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = c;
    d.context = e;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: c,
    context: e,
    count: 0
  };
}

function S(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > Q.length && Q.push(a);
}

function T(a, b, c, e) {
  var d = _typeof(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + U(d, k);
    g += T(d, f, c, e);
  } else if (null === a || "object" !== _typeof(a) ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + U(d, k++), g += T(d, f, c, e);
  } else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}

function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}

function U(a, b) {
  return "object" === _typeof(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function W(a, b) {
  a.func.call(a.context, b, a.count++);
}

function aa(a, b, c) {
  var e = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? X(a, e, c, function (a) {
    return a;
  }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
}

function X(a, b, c, e, d) {
  var g = "";
  null != c && (g = ("" + c).replace(P, "$&/") + "/");
  b = R(b, g, e, d);
  V(a, aa, b);
  S(b);
}

var Y = {
  current: null
};

function Z() {
  var a = Y.current;
  if (null === a) throw Error(C(321));
  return a;
}

var ba = {
  ReactCurrentDispatcher: Y,
  ReactCurrentBatchConfig: {
    suspense: null
  },
  ReactCurrentOwner: J,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
__webpack_unused_export__ = {
  map: function map(a, b, c) {
    if (null == a) return a;
    var e = [];
    X(a, e, null, b, c);
    return e;
  },
  forEach: function forEach(a, b, c) {
    if (null == a) return a;
    b = R(null, null, b, c);
    V(a, W, b);
    S(b);
  },
  count: function count(a) {
    return V(a, function () {
      return null;
    }, null);
  },
  toArray: function toArray(a) {
    var b = [];
    X(a, b, null, function (a) {
      return a;
    });
    return b;
  },
  only: function only(a) {
    if (!O(a)) throw Error(C(143));
    return a;
  }
};
__webpack_unused_export__ = F;
__webpack_unused_export__ = r;
__webpack_unused_export__ = u;
__webpack_unused_export__ = H;
__webpack_unused_export__ = t;
__webpack_unused_export__ = y;
__webpack_unused_export__ = ba;

__webpack_unused_export__ = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(C(267, a));
  var e = l({}, a.props),
      d = a.key,
      g = a.ref,
      k = a._owner;

  if (null != b) {
    void 0 !== b.ref && (g = b.ref, k = J.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

    for (h in b) {
      K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
    }
  }

  var h = arguments.length - 2;
  if (1 === h) e.children = c;else if (1 < h) {
    f = Array(h);

    for (var m = 0; m < h; m++) {
      f[m] = arguments[m + 2];
    }

    e.children = f;
  }
  return {
    $$typeof: p,
    type: a.type,
    key: d,
    ref: g,
    props: e,
    _owner: k
  };
};

__webpack_unused_export__ = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: w,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: v,
    _context: a
  };
  return a.Consumer = a;
};

__webpack_unused_export__ = M;

__webpack_unused_export__ = function (a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};

__webpack_unused_export__ = function () {
  return {
    current: null
  };
};

__webpack_unused_export__ = function (a) {
  return {
    $$typeof: x,
    render: a
  };
};

__webpack_unused_export__ = O;

__webpack_unused_export__ = function (a) {
  return {
    $$typeof: A,
    _ctor: a,
    _status: -1,
    _result: null
  };
};

__webpack_unused_export__ = function (a, b) {
  return {
    $$typeof: z,
    type: a,
    compare: void 0 === b ? null : b
  };
};

__webpack_unused_export__ = function (a, b) {
  return Z().useCallback(a, b);
};

__webpack_unused_export__ = function (a, b) {
  return Z().useContext(a, b);
};

__webpack_unused_export__ = function () {};

__webpack_unused_export__ = function (a, b) {
  return Z().useEffect(a, b);
};

__webpack_unused_export__ = function (a, b, c) {
  return Z().useImperativeHandle(a, b, c);
};

__webpack_unused_export__ = function (a, b) {
  return Z().useLayoutEffect(a, b);
};

__webpack_unused_export__ = function (a, b) {
  return Z().useMemo(a, b);
};

__webpack_unused_export__ = function (a, b, c) {
  return Z().useReducer(a, b, c);
};

__webpack_unused_export__ = function (a) {
  return Z().useRef(a);
};

__webpack_unused_export__ = function (a) {
  return Z().useState(a);
};

__webpack_unused_export__ = "16.14.0";

/***/ }),

/***/ 8709:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  /* unused reexport */ __webpack_require__(1563);
} else {}

/***/ }),

/***/ 9006:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
function Events() {
  // _world
  Object.defineProperty(this, '_events', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: {}
  });
  this._suspendEvents = false;
  Object.defineProperty(this, 'suspendEvents', {
    get: function get() {
      return this._suspendEvents;
    },
    set: function set(value) {
      this._suspendEvents = !!value;
    }
  });
}

Events.prototype.on = function (name, fn) {
  var events = this._events[name];

  if (events === undefined) {
    this._events[name] = [fn];
  } else {
    if (events.indexOf(fn) === -1) events.push(fn);
  }

  return new EventHandle(this, name, fn);
};

Events.prototype.once = function (name, fn) {
  var self = this;
  var evt = this.on(name, function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    fn.call(self, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    evt.unbind();
  });
  return evt;
};

Events.prototype.emit = function (name, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  if (this._suspendEvents) return;
  var events = this._events[name];
  if (!events) return this;
  events = events.slice(0);

  for (var i = 0; i < events.length; i++) {
    if (!events[i]) continue;

    try {
      events[i].call(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    } catch (ex) {
      console.info('%c%s %c(event error)', 'color: #06f', name, 'color: #f00');
      console.log(ex.stack);
    }
  }

  return this;
};

Events.prototype.unbind = function (name, fn) {
  if (name) {
    var events = this._events[name];
    if (!events) return this;

    if (fn) {
      var i = events.indexOf(fn);

      if (i !== -1) {
        if (events.length === 1) {
          delete this._events[name];
        } else {
          events.splice(i, 1);
        }
      }
    } else {
      delete this._events[name];
    }
  } else {
    this._events = {};
  }

  return this;
};

function EventHandle(owner, name, fn) {
  this.owner = owner;
  this.name = name;
  this.fn = fn;
}

EventHandle.prototype.unbind = function () {
  if (!this.owner) return;
  this.owner.unbind(this.name, this.fn);
  this.owner = null;
  this.name = null;
  this.fn = null;
};

EventHandle.prototype.call = function () {
  if (!this.fn) return;
  this.fn.call(this.owner, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
};

EventHandle.prototype.on = function (name, fn) {
  return this.owner.on(name, fn);
};

/* harmony default export */ __webpack_exports__["Z"] = (Events);

/***/ }),

/***/ 9237:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "RC": function() { return /* reexport */ binding_observers_element; }
});

// UNUSED EXPORTS: BindingBase, BindingElementToObservers, BindingTwoWay, Events, History, Observer, ObserverHistory, ObserverList

// EXTERNAL MODULE: ./src/binding/events.js
var events = __webpack_require__(9006);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(8709);
;// CONCATENATED MODULE: ./src/binding/observer.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




function Observer(data, options) {
  events/* default.call */.Z.call(this);
  options = options || {};
  this._destroyed = false;
  this._path = '';
  this._keys = [];
  this._data = {}; // array paths where duplicate entries are allowed - normally
  // we check if an array already has a value before inserting it
  // but if the array path is in here we'll allow it

  this._pathsWithDuplicates = null;

  if (options.pathsWithDuplicates) {
    this._pathsWithDuplicates = {};

    for (var i = 0; i < options.pathsWithDuplicates.length; i++) {
      this._pathsWithDuplicates[options.pathsWithDuplicates[i]] = true;
    }
  }

  this.patch(data);
  this._parent = options.parent || null;
  this._parentPath = options.parentPath || '';
  this._parentField = options.parentField || null;
  this._parentKey = options.parentKey || null;
  this._latestFn = options.latestFn || null;
  this._silent = false;

  var propagate = function propagate(evt) {
    return function (path, arg1, arg2, arg3) {
      if (!this._parent) return;
      var key = this._parentKey;

      if (!key && this._parentField instanceof Array) {
        key = this._parentField.indexOf(this);
        if (key === -1) return;
      }

      path = this._parentPath + '.' + key + '.' + path;
      var state;
      if (this._silent) state = this._parent.silence();

      this._parent.emit(path + ':' + evt, arg1, arg2, arg3);

      this._parent.emit('*:' + evt, path, arg1, arg2, arg3);

      if (this._silent) this._parent.silenceRestore(state);
    };
  }; // propagate set


  this.on('*:set', propagate('set'));
  this.on('*:unset', propagate('unset'));
  this.on('*:insert', propagate('insert'));
  this.on('*:remove', propagate('remove'));
  this.on('*:move', propagate('move'));
} // cache calls to path.split(path, '.')
// as they take considerable time especially during loading
// if there are a lot of observers like entities, assets etc.


Observer._splitPathsCache = {};

Observer._splitPath = function (path) {
  var cache = Observer._splitPathsCache;
  var result = cache[path];

  if (!result) {
    result = path.split('.');
    cache[path] = result;
  } else {
    result = result.slice();
  }

  return result;
};

Observer.prototype = Object.create(events/* default.prototype */.Z.prototype);

Observer.prototype.silence = function () {
  this._silent = true; // history hook to prevent array values to be recorded

  var historyState = this.history && this.history.enabled;
  if (historyState) this.history.enabled = false; // sync hook to prevent array values to be recorded as array root already did

  var syncState = this.sync && this.sync.enabled;
  if (syncState) this.sync.enabled = false;
  return [historyState, syncState];
};

Observer.prototype.silenceRestore = function (state) {
  this._silent = false;
  if (state[0]) this.history.enabled = true;
  if (state[1]) this.sync.enabled = true;
};

Observer.prototype._prepare = function (target, key, value, silent, remote) {
  var i;
  var state;
  var path = (target._path ? target._path + '.' : '') + key;

  var type = _typeof(value);

  target._keys.push(key);

  if (type === 'object' && value instanceof Array) {
    target._data[key] = value.slice(0);

    for (i = 0; i < target._data[key].length; i++) {
      if (_typeof(target._data[key][i]) === 'object' && target._data[key][i] !== null) {
        if (target._data[key][i] instanceof Array) {
          target._data[key][i].slice(0);
        } else {
          target._data[key][i] = new Observer(target._data[key][i], {
            parent: this,
            parentPath: path,
            parentField: target._data[key],
            parentKey: null
          });
        }
      } else {
        state = this.silence();
        this.emit(path + '.' + i + ':set', target._data[key][i], null, remote);
        this.emit('*:set', path + '.' + i, target._data[key][i], null, remote);
        this.silenceRestore(state);
      }
    }

    if (silent) state = this.silence();
    this.emit(path + ':set', target._data[key], null, remote);
    this.emit('*:set', path, target._data[key], null, remote);
    if (silent) this.silenceRestore(state);
  } else if (type === 'object' && value instanceof Object) {
    if (_typeof(target._data[key]) !== 'object') {
      target._data[key] = {
        _path: path,
        _keys: [],
        _data: {}
      };
    }

    for (i in value) {
      if (_typeof(value[i]) === 'object') {
        this._prepare(target._data[key], i, value[i], true, remote);
      } else {
        state = this.silence();
        target._data[key]._data[i] = value[i];

        target._data[key]._keys.push(i);

        this.emit(path + '.' + i + ':set', value[i], null, remote);
        this.emit('*:set', path + '.' + i, value[i], null, remote);
        this.silenceRestore(state);
      }
    }

    if (silent) state = this.silence(); // passing undefined as valueOld here
    // but we should get the old value to be consistent

    this.emit(path + ':set', value, undefined, remote);
    this.emit('*:set', path, value, undefined, remote);
    if (silent) this.silenceRestore(state);
  } else {
    if (silent) state = this.silence();
    target._data[key] = value;
    this.emit(path + ':set', value, undefined, remote);
    this.emit('*:set', path, value, undefined, remote);
    if (silent) this.silenceRestore(state);
  }

  return true;
};

Observer.prototype.set = function (path, value, silent, remote, force) {
  var _this = this;

  var i;
  var valueOld;

  var keys = Observer._splitPath(path);

  var length = keys.length;
  var key = keys[length - 1];
  var node = this;
  var nodePath = '';
  var obj = this;
  var state;

  for (i = 0; i < length - 1; i++) {
    if (node instanceof Array) {
      node = node[keys[i]];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else {
      if (i < length && _typeof(node._data[keys[i]]) !== 'object') {
        if (node._data[keys[i]]) obj.unset((node.__path ? node.__path + '.' : '') + keys[i]);
        node._data[keys[i]] = {
          _path: path,
          _keys: [],
          _data: {}
        };

        node._keys.push(keys[i]);
      }

      if (i === length - 1 && node.__path) nodePath = node.__path + '.' + keys[i];
      node = node._data[keys[i]];
    }
  }

  if (node instanceof Array) {
    var ind = parseInt(key, 10);
    if (node[ind] === value && !force) return;
    valueOld = node[ind];

    if (valueOld instanceof Observer) {
      valueOld = valueOld.json();
    } else {
      valueOld = obj.json(valueOld);
    }

    node[ind] = value;

    if (value instanceof Observer) {
      value._parent = obj;
      value._parentPath = nodePath;
      value._parentField = node;
      value._parentKey = null;
    }

    if (silent) state = obj.silence();
    obj.emit(path + ':set', value, valueOld, remote);
    obj.emit('*:set', path, value, valueOld, remote);
    if (silent) obj.silenceRestore(state);
    return true;
  } else if (node._data && !node._data.hasOwnProperty(key)) {
    if (_typeof(value) === 'object') {
      return obj._prepare(node, key, value, false, remote);
    }

    node._data[key] = value;

    node._keys.push(key);

    if (silent) state = obj.silence();
    obj.emit(path + ':set', value, null, remote);
    obj.emit('*:set', path, value, null, remote);
    if (silent) obj.silenceRestore(state);
    return true;
  }

  if (_typeof(value) === 'object' && value instanceof Array) {
    if (value.equals(node._data[key]) && !force) return false;
    valueOld = node._data[key];
    if (!(valueOld instanceof Observer)) valueOld = obj.json(valueOld);

    if (node._data[key] && node._data[key].length === value.length) {
      state = obj.silence(); // handle new array instance

      if (value.length === 0) {
        node._data[key] = value;
      }

      for (i = 0; i < node._data[key].length; i++) {
        if (node._data[key][i] instanceof Observer) {
          node._data[key][i].patch(value[i], true);
        } else if (node._data[key][i] !== value[i]) {
          node._data[key][i] = value[i];
          obj.emit(path + '.' + i + ':set', node._data[key][i], valueOld && valueOld[i] || null, remote);
          obj.emit('*:set', path + '.' + i, node._data[key][i], valueOld && valueOld[i] || null, remote);
        }
      }

      obj.silenceRestore(state);
    } else {
      node._data[key] = [];
      value.forEach(function (val) {
        _this._doInsert(node, key, val);
      });
      state = obj.silence();

      for (i = 0; i < node._data[key].length; i++) {
        obj.emit(path + '.' + i + ':set', node._data[key][i], valueOld && valueOld[i] || null, remote);
        obj.emit('*:set', path + '.' + i, node._data[key][i], valueOld && valueOld[i] || null, remote);
      }

      obj.silenceRestore(state);
    }

    if (silent) state = obj.silence();
    obj.emit(path + ':set', value, valueOld, remote);
    obj.emit('*:set', path, value, valueOld, remote);
    if (silent) obj.silenceRestore(state);
    return true;
  } else if (_typeof(value) === 'object' && value instanceof Object) {
    var changed = false;
    valueOld = node._data[key];
    if (!(valueOld instanceof Observer)) valueOld = obj.json(valueOld);
    keys = Object.keys(value);

    if (!node._data[key] || !node._data[key]._data) {
      if (node._data[key]) {
        obj.unset((node.__path ? node.__path + '.' : '') + key);
      } else {
        changed = true;
      }

      node._data[key] = {
        _path: path,
        _keys: [],
        _data: {}
      };
    }

    var c;

    for (var n in node._data[key]._data) {
      if (!value.hasOwnProperty(n)) {
        c = obj.unset(path + '.' + n, true);
        if (c) changed = true;
      } else if (node._data[key]._data.hasOwnProperty(n)) {
        if (!obj._equals(node._data[key]._data[n], value[n])) {
          c = obj.set(path + '.' + n, value[n], true);
          if (c) changed = true;
        }
      } else {
        c = obj._prepare(node._data[key], n, value[n], true, remote);
        if (c) changed = true;
      }
    }

    for (i = 0; i < keys.length; i++) {
      if (value[keys[i]] === undefined && node._data[key]._data.hasOwnProperty(keys[i])) {
        c = obj.unset(path + '.' + keys[i], true);
        if (c) changed = true;
      } else if (_typeof(value[keys[i]]) === 'object') {
        if (node._data[key]._data.hasOwnProperty(keys[i])) {
          c = obj.set(path + '.' + keys[i], value[keys[i]], true);
          if (c) changed = true;
        } else {
          c = obj._prepare(node._data[key], keys[i], value[keys[i]], true, remote);
          if (c) changed = true;
        }
      } else if (!obj._equals(node._data[key]._data[keys[i]], value[keys[i]])) {
        if (_typeof(value[keys[i]]) === 'object') {
          c = obj.set(node._data[key]._path + '.' + keys[i], value[keys[i]], true);
          if (c) changed = true;
        } else if (node._data[key]._data[keys[i]] !== value[keys[i]]) {
          changed = true;
          if (node._data[key]._keys.indexOf(keys[i]) === -1) node._data[key]._keys.push(keys[i]);
          node._data[key]._data[keys[i]] = value[keys[i]];
          state = obj.silence();
          obj.emit(node._data[key]._path + '.' + keys[i] + ':set', node._data[key]._data[keys[i]], null, remote);
          obj.emit('*:set', node._data[key]._path + '.' + keys[i], node._data[key]._data[keys[i]], null, remote);
          obj.silenceRestore(state);
        }
      }
    }

    if (changed) {
      if (silent) state = obj.silence();
      var val = obj.json(node._data[key]);
      obj.emit(node._data[key]._path + ':set', val, valueOld, remote);
      obj.emit('*:set', node._data[key]._path, val, valueOld, remote);
      if (silent) obj.silenceRestore(state);
      return true;
    }

    return false;
  }

  var data;

  if (!node.hasOwnProperty('_data') && node.hasOwnProperty(key)) {
    data = node;
  } else {
    data = node._data;
  }

  if (data[key] === value && !force) return false;
  if (silent) state = obj.silence();
  valueOld = data[key];
  if (!(valueOld instanceof Observer)) valueOld = obj.json(valueOld);
  data[key] = value;
  obj.emit(path + ':set', value, valueOld, remote);
  obj.emit('*:set', path, value, valueOld, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype.has = function (path) {
  var keys = Observer._splitPath(path);

  var node = this;

  for (var i = 0, len = keys.length; i < len; i++) {
    if (node == undefined) return undefined;

    if (node._data) {
      node = node._data[keys[i]];
    } else {
      node = node[keys[i]];
    }
  }

  return node !== undefined;
};

Observer.prototype.get = function (path, raw) {
  var keys = Observer._splitPath(path);

  var node = this;

  for (var i = 0; i < keys.length; i++) {
    if (node == undefined) return undefined;

    if (node._data) {
      node = node._data[keys[i]];
    } else {
      node = node[keys[i]];
    }
  }

  if (raw) return node;

  if (node == null) {
    return null;
  }

  return this.json(node);
};

Observer.prototype.getRaw = function (path) {
  return this.get(path, true);
};

Observer.prototype._equals = function (a, b) {
  if (a === b) {
    return true;
  } else if (a instanceof Array && b instanceof Array && a.equals(b)) {
    return true;
  }

  return false;
};

Observer.prototype.unset = function (path, silent, remote) {
  var i;

  var keys = Observer._splitPath(path);

  var key = keys[keys.length - 1];
  var node = this;
  var obj = this;

  for (i = 0; i < keys.length - 1; i++) {
    if (node instanceof Array) {
      node = node[keys[i]];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else {
      node = node._data[keys[i]];
    }
  }

  if (!node._data || !node._data.hasOwnProperty(key)) return false;
  var valueOld = node._data[key];
  if (!(valueOld instanceof Observer)) valueOld = obj.json(valueOld); // recursive

  if (node._data[key] && node._data[key]._data) {
    // do this in reverse order because node._data[key]._keys gets
    // modified as we loop
    for (i = node._data[key]._keys.length - 1; i >= 0; i--) {
      obj.unset(path + '.' + node._data[key]._keys[i], true);
    }
  }

  node._keys.splice(node._keys.indexOf(key), 1);

  delete node._data[key];
  var state;
  if (silent) state = obj.silence();
  obj.emit(path + ':unset', valueOld, remote);
  obj.emit('*:unset', path, valueOld, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype.remove = function (path, ind, silent, remote) {
  var keys = Observer._splitPath(path);

  var key = keys[keys.length - 1];
  var node = this;
  var obj = this;

  for (var i = 0; i < keys.length - 1; i++) {
    if (node instanceof Array) {
      node = node[parseInt(keys[i], 10)];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else if (node._data && node._data.hasOwnProperty(keys[i])) {
      node = node._data[keys[i]];
    } else {
      return;
    }
  }

  if (!node._data || !node._data.hasOwnProperty(key) || !(node._data[key] instanceof Array)) return;
  var arr = node._data[key];
  if (arr.length < ind) return;
  var value = arr[ind];

  if (value instanceof Observer) {
    value._parent = null;
  } else {
    value = obj.json(value);
  }

  arr.splice(ind, 1);
  var state;
  if (silent) state = obj.silence();
  obj.emit(path + ':remove', value, ind, remote);
  obj.emit('*:remove', path, value, ind, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype.removeValue = function (path, value, silent, remote) {
  var keys = Observer._splitPath(path);

  var key = keys[keys.length - 1];
  var node = this;
  var obj = this;

  for (var i = 0; i < keys.length - 1; i++) {
    if (node instanceof Array) {
      node = node[parseInt(keys[i], 10)];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else if (node._data && node._data.hasOwnProperty(keys[i])) {
      node = node._data[keys[i]];
    } else {
      return;
    }
  }

  if (!node._data || !node._data.hasOwnProperty(key) || !(node._data[key] instanceof Array)) return;
  var arr = node._data[key];
  var ind = arr.indexOf(value);

  if (ind === -1) {
    return;
  }

  if (arr.length < ind) return;
  value = arr[ind];

  if (value instanceof Observer) {
    value._parent = null;
  } else {
    value = obj.json(value);
  }

  arr.splice(ind, 1);
  var state;
  if (silent) state = obj.silence();
  obj.emit(path + ':remove', value, ind, remote);
  obj.emit('*:remove', path, value, ind, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype.insert = function (path, value, ind, silent, remote) {
  var keys = Observer._splitPath(path);

  var key = keys[keys.length - 1];
  var node = this;
  var obj = this;

  for (var i = 0; i < keys.length - 1; i++) {
    if (node instanceof Array) {
      node = node[parseInt(keys[i], 10)];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else if (node._data && node._data.hasOwnProperty(keys[i])) {
      node = node._data[keys[i]];
    } else {
      return;
    }
  }

  if (!node._data || !node._data.hasOwnProperty(key) || !(node._data[key] instanceof Array)) return;
  var arr = node._data[key];
  value = obj._doInsert(node, key, value, ind);

  if (ind === undefined) {
    ind = arr.length - 1;
  }

  var state;
  if (silent) state = obj.silence();
  obj.emit(path + ':insert', value, ind, remote);
  obj.emit('*:insert', path, value, ind, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype._doInsert = function (node, key, value, ind) {
  var arr = node._data[key];

  if (_typeof(value) === 'object' && !(value instanceof Observer) && value !== null) {
    if (value instanceof Array) {
      value = value.slice(0);
    } else {
      value = new Observer(value);
    }
  }

  var path = node._path ? "".concat(node._path, ".").concat(key) : key;

  if (value !== null && (!this._pathsWithDuplicates || !this._pathsWithDuplicates[path])) {
    if (arr.indexOf(value) !== -1) {
      return;
    }
  }

  if (ind === undefined) {
    arr.push(value);
  } else {
    arr.splice(ind, 0, value);
  }

  if (value instanceof Observer) {
    value._parent = this;
    value._parentPath = path;
    value._parentField = arr;
    value._parentKey = null;
  } else {
    value = this.json(value);
  }

  return value;
};

Observer.prototype.move = function (path, indOld, indNew, silent, remote) {
  var keys = Observer._splitPath(path);

  var key = keys[keys.length - 1];
  var node = this;
  var obj = this;

  for (var i = 0; i < keys.length - 1; i++) {
    if (node instanceof Array) {
      node = node[parseInt(keys[i], 10)];

      if (node instanceof Observer) {
        path = keys.slice(i + 1).join('.');
        obj = node;
      }
    } else if (node._data && node._data.hasOwnProperty(keys[i])) {
      node = node._data[keys[i]];
    } else {
      return;
    }
  }

  if (!node._data || !node._data.hasOwnProperty(key) || !(node._data[key] instanceof Array)) return;
  var arr = node._data[key];
  if (arr.length < indOld || arr.length < indNew || indOld === indNew) return;
  var value = arr[indOld];
  arr.splice(indOld, 1);
  if (indNew === -1) indNew = arr.length;
  arr.splice(indNew, 0, value);
  if (!(value instanceof Observer)) value = obj.json(value);
  var state;
  if (silent) state = obj.silence();
  obj.emit(path + ':move', value, indNew, indOld, remote);
  obj.emit('*:move', path, value, indNew, indOld, remote);
  if (silent) obj.silenceRestore(state);
  return true;
};

Observer.prototype.patch = function (data, removeMIssingKeys) {
  var key;
  if (_typeof(data) !== 'object') return;

  for (key in data) {
    if (_typeof(data[key]) === 'object' && !this._data.hasOwnProperty(key)) {
      this._prepare(this, key, data[key]);
    } else if (this._data[key] !== data[key]) {
      this.set(key, data[key]);
    }
  }

  if (removeMIssingKeys) {
    for (key in this._data) {
      if (!data.hasOwnProperty(key)) {
        this.unset(key);
      }
    }
  }
};

Observer.prototype.json = function (target) {
  var key, n;
  var obj = {};
  var node = target === undefined ? this : target;
  var len, nlen;

  if (node instanceof Object && node._keys) {
    len = node._keys.length;

    for (var i = 0; i < len; i++) {
      key = node._keys[i];
      var value = node._data[key];

      var type = _typeof(value);

      if (type === 'object' && value instanceof Array) {
        obj[key] = value.slice(0);
        nlen = obj[key].length;

        for (n = 0; n < nlen; n++) {
          if (_typeof(obj[key][n]) === 'object') obj[key][n] = this.json(obj[key][n]);
        }
      } else if (type === 'object' && value instanceof Object) {
        obj[key] = this.json(value);
      } else {
        obj[key] = value;
      }
    }
  } else {
    if (node === null) {
      return null;
    } else if (_typeof(node) === 'object' && node instanceof Array) {
      obj = node.slice(0);
      len = obj.length;

      for (n = 0; n < len; n++) {
        obj[n] = this.json(obj[n]);
      }
    } else if (_typeof(node) === 'object') {
      for (key in node) {
        if (node.hasOwnProperty(key)) obj[key] = node[key];
      }
    } else {
      obj = node;
    }
  }

  return obj;
};

Observer.prototype.forEach = function (fn, target, path) {
  var node = target || this;
  path = path || '';

  for (var i = 0; i < node._keys.length; i++) {
    var key = node._keys[i];
    var value = node._data[key];

    var type = this.schema && this.schema.has(path + key) && this.schema.get(path + key).type.name.toLowerCase() || _typeof(value);

    if (type === 'object' && value instanceof Array) {
      fn(path + key, 'array', value, key);
    } else if (type === 'object' && value instanceof Object) {
      fn(path + key, 'object', value, key);
      this.forEach(fn, value, path + key + '.');
    } else {
      fn(path + key, type, value, key);
    }
  }
};
/**
 * Returns the latest observer instance. This is important when
 * dealing with undo / redo where the observer might have been deleted
 * and/or possibly re-created.
 *
 * @returns {Observer} The latest instance of the observer.
 */


Observer.prototype.latest = function () {
  return this._latestFn ? this._latestFn() : this;
};

Observer.prototype.destroy = function () {
  if (this._destroyed) return;
  this._destroyed = true;
  this.emit('destroy');
  this.unbind();
};

Object.defineProperty(Observer.prototype, 'latestFn', {
  get: function get() {
    return this._latestFn;
  },
  set: function set(value) {
    this._latestFn = value;
  }
});
var useObserverState = function useObserverState(observer, path, json) {
  var parseFunc = function parseFunc(observerValue) {
    return json ? JSON.parse(observerValue) : observerValue;
  };

  var _useState = useState(parseFunc(observer.get(path))),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  observer.on("".concat(path, ":set"), function (value) {
    return setValue(parseFunc(value));
  });
  return value;
};
/* harmony default export */ var observer = (Observer);
;// CONCATENATED MODULE: ./src/binding/binding-base.js
function binding_base_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { binding_base_typeof = function _typeof(obj) { return typeof obj; }; } else { binding_base_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return binding_base_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (binding_base_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/**
 * @name BindingBase
 * @classdesc Base class for data binding between IBindable Elements and Observers.
 * @property {Element} element The element
 * @property {Observer[]} observers The linked observers
 * @property {string[]} paths The linked paths
 * @property {boolean} applyingChange Whether the binding is currently applying a change either to the observers or the element.
 * @property {boolean} linked Whether the binding is linked to observers.
 * @property {boolean} historyCombine If a history module is used whether to combine history actions when applying changes to observers.
 * @property {string} historyName The name of the history action when applying changes to observers.
 * @property {string} historyPrefix A string to prefix the historyName with.
 * @property {string} historyPostfix A string to postfix the historyName with.
 */

var BindingBase = /*#__PURE__*/function (_Events) {
  _inherits(BindingBase, _Events);

  var _super = _createSuper(BindingBase);

  /**
   * Creates a new binding.
   *
   * @param {object} args - The arguments.
   * @param {IBindable} [args.element] - The IBindable element.
   * @param {History} [args.history] - The history object which will be used to record undo / redo actions.
   * If none is provided then no history will be recorded.
   * @param {string} [args.historyPrefix] - A prefix that will be used for the name of every history action.
   * @param {string} [args.historyPostfix] - A postfix that will be used for the name of every history action.
   * @param {string} [args.historyName] - The name of each history action.
   * @param {boolean} [args.historyCombine] - Whether to combine history actions.
   */
  function BindingBase(args) {
    var _this;

    _classCallCheck(this, BindingBase);

    _this = _super.call(this);
    if (!args) args = {}; // the observers we are binding to

    _this._observers = null; // the paths to use for the observers

    _this._paths = null;
    _this._applyingChange = false;
    _this._element = args.element || null;
    _this._history = args.history || null;
    _this._historyPrefix = args.historyPrefix || null;
    _this._historyPostfix = args.historyPostfix || null;
    _this._historyName = args.historyName || null;
    _this._historyCombine = args.historyCombine || false;
    _this._linked = false;
    return _this;
  } // Returns the path at the specified index
  // or the path at the first index if it doesn't exist.


  _createClass(BindingBase, [{
    key: "_pathAt",
    value: function _pathAt(paths, index) {
      return paths[index] || paths[0];
    }
    /**
     * @name BindingBase#link
     * @description Links the specified observers to the specified paths.
     * @param {Observer[]|Observer} observers - The observer(s).
     * @param {string[]|string} paths - The path(s). The behaviour of the binding depends on how many paths are passed.
     * If an equal amount of paths and observers are passed then the binding will map each path to each observer at each index.
     * If more observers than paths are passed then the path at index 0 will be used for all observers.
     * If one observer and multiple paths are passed then all of the paths will be used for the observer (e.g. for curves).
     */

  }, {
    key: "link",
    value: function link(observers, paths) {
      if (this._observers) {
        this.unlink();
      }

      this._observers = Array.isArray(observers) ? observers : [observers];
      this._paths = Array.isArray(paths) ? paths : [paths];
      this._linked = true;
    }
    /**
     * @name BindingBase#unlink
     * @description Unlinks the observers and paths.
     */

  }, {
    key: "unlink",
    value: function unlink() {
      this._observers = null;
      this._paths = null;
      this._linked = false;
    }
    /**
     * @name BindingBase#clone
     * @description Clones the binding. To be implemented by derived classes.
     */

  }, {
    key: "clone",
    value: function clone() {
      throw new Error('pcui.BindingBase#clone: Not implemented');
    }
    /**
     * @name BindingBase#setValue
     * @description Sets a value to the linked observers at the linked paths.
     * @param {*} value - The value
     */

  }, {
    key: "setValue",
    value: function setValue(value) {}
    /**
     * @name BindingBase#setValues
     * @description Sets an array of values to the linked observers at the linked paths.
     * @param {Array<*>} values - The values
     */

  }, {
    key: "setValues",
    value: function setValues(values) {}
    /**
     * @name BindingBase#addValue
     * @description Adds (inserts) a value to the linked observers at the linked paths.
     * @param {*} value - The value
     */

  }, {
    key: "addValue",
    value: function addValue(value) {}
    /**
     * @name BindingBase#addValues
     * @description Adds (inserts) multiple values to the linked observers at the linked paths.
     * @param {Array<*>} values - The values
     */

  }, {
    key: "addValues",
    value: function addValues(values) {}
    /**
     * @name BindingBase#removeValue
     * @description Removes a value from the linked observers at the linked paths.
     * @param {*} value - The value
     */

  }, {
    key: "removeValue",
    value: function removeValue(value) {}
    /**
     * @name BindingBase#removeValues
     * @description Removes multiple values from the linked observers from the linked paths.
     * @param {Array<*>} values - The values
     */

  }, {
    key: "removeValues",
    value: function removeValues(values) {}
  }, {
    key: "element",
    get: function get() {
      return this._element;
    },
    set: function set(value) {
      this._element = value;
    }
  }, {
    key: "applyingChange",
    get: function get() {
      return this._applyingChange;
    },
    set: function set(value) {
      if (this._applyingChange === value) return;
      this._applyingChange = value;
      this.emit('applyingChange', value);
    }
  }, {
    key: "linked",
    get: function get() {
      return this._linked;
    }
  }, {
    key: "historyCombine",
    get: function get() {
      return this._historyCombine;
    },
    set: function set(value) {
      this._historyCombine = value;
    }
  }, {
    key: "historyName",
    get: function get() {
      return this._historyName;
    },
    set: function set(value) {
      this._historyName = value;
    }
  }, {
    key: "historyPrefix",
    get: function get() {
      return this._historyPrefix;
    },
    set: function set(value) {
      this._historyPrefix = value;
    }
  }, {
    key: "historyPostfix",
    get: function get() {
      return this._historyPostfix;
    },
    set: function set(value) {
      this._historyPostfix = value;
    }
  }, {
    key: "observers",
    get: function get() {
      return this._observers;
    }
  }, {
    key: "paths",
    get: function get() {
      return this._paths;
    }
  }]);

  return BindingBase;
}(events/* default */.Z);

/* harmony default export */ var binding_base = (BindingBase);
;// CONCATENATED MODULE: ./src/binding/binding-element-observers.js
function binding_element_observers_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { binding_element_observers_typeof = function _typeof(obj) { return typeof obj; }; } else { binding_element_observers_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return binding_element_observers_typeof(obj); }

function binding_element_observers_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function binding_element_observers_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function binding_element_observers_createClass(Constructor, protoProps, staticProps) { if (protoProps) binding_element_observers_defineProperties(Constructor.prototype, protoProps); if (staticProps) binding_element_observers_defineProperties(Constructor, staticProps); return Constructor; }

function binding_element_observers_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) binding_element_observers_setPrototypeOf(subClass, superClass); }

function binding_element_observers_setPrototypeOf(o, p) { binding_element_observers_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return binding_element_observers_setPrototypeOf(o, p); }

function binding_element_observers_createSuper(Derived) { var hasNativeReflectConstruct = binding_element_observers_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = binding_element_observers_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = binding_element_observers_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return binding_element_observers_possibleConstructorReturn(this, result); }; }

function binding_element_observers_possibleConstructorReturn(self, call) { if (call && (binding_element_observers_typeof(call) === "object" || typeof call === "function")) { return call; } return binding_element_observers_assertThisInitialized(self); }

function binding_element_observers_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function binding_element_observers_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function binding_element_observers_getPrototypeOf(o) { binding_element_observers_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return binding_element_observers_getPrototypeOf(o); }


/**
 * @name BindingElementToObservers
 * @classdesc Provides one way binding between an IBindable element and Observers. Any changes from the element
 * will be propagated to the observers.
 * @augments BindingBase
 */

var BindingElementToObservers = /*#__PURE__*/function (_BindingBase) {
  binding_element_observers_inherits(BindingElementToObservers, _BindingBase);

  var _super = binding_element_observers_createSuper(BindingElementToObservers);

  function BindingElementToObservers() {
    binding_element_observers_classCallCheck(this, BindingElementToObservers);

    return _super.apply(this, arguments);
  }

  binding_element_observers_createClass(BindingElementToObservers, [{
    key: "clone",
    value: function clone() {
      return new BindingElementToObservers({
        history: this._history,
        historyPrefix: this._historyPrefix,
        historyPostfix: this._historyPostfix,
        historyName: this._historyName,
        historyCombine: this._historyCombine
      });
    }
  }, {
    key: "_getHistoryActionName",
    value: function _getHistoryActionName(paths) {
      return "".concat(this._historyPrefix || '').concat(this._historyName || paths[0]).concat(this._historyPostfix || '');
    } // Sets the value (or values of isArrayOfValues is true)
    // to the observers

  }, {
    key: "_setValue",
    value: function _setValue(value, isArrayOfValues) {
      var _this = this;

      if (this.applyingChange) return;
      if (!this._observers) return;
      this.applyingChange = true; // make copy of observers if we are using history
      // so that we can undo on the same observers in the future

      var observers = this._observers.slice();

      var paths = this._paths.slice();

      var execute = function execute() {
        _this._setValueToObservers(observers, paths, value, isArrayOfValues);
      };

      if (this._history) {
        var previousValues = [];

        if (observers.length === 1 && paths.length > 1) {
          previousValues = paths.map(function (path) {
            return observers[0].has(path) ? observers[0].get(path) : undefined;
          });
        } else {
          previousValues = observers.map(function (observer, i) {
            var path = _this._pathAt(paths, i);

            return observer.has(path) ? observer.get(path) : undefined;
          });
        }

        this._history.add({
          name: this._getHistoryActionName(paths),
          redo: execute,
          combine: this._historyCombine,
          undo: function undo() {
            _this._setValueToObservers(observers, paths, previousValues, true);
          }
        });
      }

      execute();
      this.applyingChange = false;
    }
  }, {
    key: "_setValueToObservers",
    value: function _setValueToObservers(observers, paths, value, isArrayOfValues) {
      // special case for 1 observer with multiple paths (like curves)
      // in that case set each value for each path
      if (observers.length === 1 && paths.length > 1) {
        for (var i = 0; i < paths.length; i++) {
          var latest = observers[0].latest();
          if (!latest) continue;
          var history = false;

          if (latest.history) {
            history = latest.history.enabled;
            latest.history.enabled = false;
          }

          var path = paths[i];
          var val = value[i];

          if (value !== undefined) {
            latest.set(path, val);
          } else {
            latest.unset(path);
          }

          if (history) {
            latest.history.enabled = true;
          }
        }

        return;
      }

      for (var _i = 0; _i < observers.length; _i++) {
        var _latest = observers[_i].latest();

        if (!_latest) continue;
        var _history = false;

        if (_latest.history) {
          _history = _latest.history.enabled;
          _latest.history.enabled = false;
        }

        var _path = this._pathAt(paths, _i);

        var _val = isArrayOfValues ? value[_i] : value;

        if (value !== undefined) {
          _latest.set(_path, _val);
        } else {
          _latest.unset(_path);
        }

        if (_history) {
          _latest.history.enabled = true;
        }
      }
    }
  }, {
    key: "_addValues",
    value: function _addValues(values) {
      var _this2 = this;

      if (this.applyingChange) return;
      if (!this._observers) return;
      this.applyingChange = true; // make copy of observers if we are using history
      // so that we can undo on the same observers in the future

      var observers = this._observers.slice();

      var paths = this._paths.slice();

      var records = [];

      var _loop = function _loop(i) {
        var path = _this2._pathAt(paths, i);

        var observer = observers[i];
        values.forEach(function (value) {
          if (observer.get(path).indexOf(value) === -1) {
            records.push({
              observer: observer,
              path: path,
              value: value
            });
          }
        });
      };

      for (var i = 0; i < observers.length; i++) {
        _loop(i);
      }

      var execute = function execute() {
        for (var _i2 = 0; _i2 < records.length; _i2++) {
          var latest = records[_i2].observer.latest();

          if (!latest) continue;
          var path = records[_i2].path;
          var history = false;

          if (latest.history) {
            history = latest.history.enabled;
            latest.history.enabled = false;
          }

          latest.insert(path, records[_i2].value);

          if (history) {
            latest.history.enabled = true;
          }
        }
      };

      if (this._history && records.length) {
        this._history.add({
          name: this._getHistoryActionName(paths),
          redo: execute,
          combine: this._historyCombine,
          undo: function undo() {
            for (var _i3 = 0; _i3 < records.length; _i3++) {
              var latest = records[_i3].observer.latest();

              if (!latest) continue;
              var path = records[_i3].path;
              var history = false;

              if (latest.history) {
                history = latest.history.enabled;
                latest.history.enabled = false;
              }

              latest.removeValue(path, records[_i3].value);

              if (history) {
                latest.history.enabled = true;
              }
            }
          }
        });
      }

      execute();
      this.applyingChange = false;
    }
  }, {
    key: "_removeValues",
    value: function _removeValues(values) {
      var _this3 = this;

      if (this.applyingChange) return;
      if (!this._observers) return;
      this.applyingChange = true; // make copy of observers if we are using history
      // so that we can undo on the same observers in the future

      var observers = this._observers.slice();

      var paths = this._paths.slice();

      var records = [];

      var _loop2 = function _loop2(i) {
        var path = _this3._pathAt(paths, i);

        var observer = observers[i];
        values.forEach(function (value) {
          var ind = observer.get(path).indexOf(value);

          if (ind !== -1) {
            records.push({
              observer: observer,
              path: path,
              value: value,
              index: ind
            });
          }
        });
      };

      for (var i = 0; i < observers.length; i++) {
        _loop2(i);
      }

      var execute = function execute() {
        for (var _i4 = 0; _i4 < records.length; _i4++) {
          var latest = records[_i4].observer.latest();

          if (!latest) continue;
          var path = records[_i4].path;
          var history = false;

          if (latest.history) {
            history = latest.history.enabled;
            latest.history.enabled = false;
          }

          latest.removeValue(path, records[_i4].value);

          if (history) {
            latest.history.enabled = true;
          }
        }
      };

      if (this._history && records.length) {
        this._history.add({
          name: this._getHistoryActionName(paths),
          redo: execute,
          combine: this._historyCombine,
          undo: function undo() {
            for (var _i5 = 0; _i5 < records.length; _i5++) {
              var latest = records[_i5].observer.latest();

              if (!latest) continue;
              var path = records[_i5].path;
              var history = false;

              if (latest.history) {
                history = latest.history.enabled;
                latest.history.enabled = false;
              }

              if (latest.get(path).indexOf(records[_i5].value) === -1) {
                latest.insert(path, records[_i5].value, records[_i5].index);
              }

              if (history) {
                latest.history.enabled = true;
              }
            }
          }
        });
      }

      execute();
      this.applyingChange = false;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this._setValue(value, false);
    }
  }, {
    key: "setValues",
    value: function setValues(values) {
      // make sure we deep copy arrays because they will not be cloned when set to the observers
      values = values.slice().map(function (val) {
        return Array.isArray(val) ? val.slice() : val;
      });

      this._setValue(values, true);
    }
  }, {
    key: "addValue",
    value: function addValue(value) {
      this._addValues([value]);
    }
  }, {
    key: "addValues",
    value: function addValues(values) {
      this._addValues(values);
    }
  }, {
    key: "removeValue",
    value: function removeValue(value) {
      this._removeValues([value]);
    }
  }, {
    key: "removeValues",
    value: function removeValues(values) {
      this._removeValues(values);
    }
  }]);

  return BindingElementToObservers;
}(binding_base);

/* harmony default export */ var binding_element_observers = (BindingElementToObservers);
;// CONCATENATED MODULE: ./src/binding/binding-observers-element.js
function binding_observers_element_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { binding_observers_element_typeof = function _typeof(obj) { return typeof obj; }; } else { binding_observers_element_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return binding_observers_element_typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function binding_observers_element_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function binding_observers_element_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function binding_observers_element_createClass(Constructor, protoProps, staticProps) { if (protoProps) binding_observers_element_defineProperties(Constructor.prototype, protoProps); if (staticProps) binding_observers_element_defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = binding_observers_element_getPrototypeOf(object); if (object === null) break; } return object; }

function binding_observers_element_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) binding_observers_element_setPrototypeOf(subClass, superClass); }

function binding_observers_element_setPrototypeOf(o, p) { binding_observers_element_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return binding_observers_element_setPrototypeOf(o, p); }

function binding_observers_element_createSuper(Derived) { var hasNativeReflectConstruct = binding_observers_element_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = binding_observers_element_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = binding_observers_element_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return binding_observers_element_possibleConstructorReturn(this, result); }; }

function binding_observers_element_possibleConstructorReturn(self, call) { if (call && (binding_observers_element_typeof(call) === "object" || typeof call === "function")) { return call; } return binding_observers_element_assertThisInitialized(self); }

function binding_observers_element_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function binding_observers_element_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function binding_observers_element_getPrototypeOf(o) { binding_observers_element_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return binding_observers_element_getPrototypeOf(o); }


/**
 * @name BindingObserversToElement
 * @classdesc Provides one way binding between Observers and an IBindable element and Observers. Any changes from the observers
 * will be propagated to the element.
 * @augments BindingBase
 */

var BindingObserversToElement = /*#__PURE__*/function (_BindingBase) {
  binding_observers_element_inherits(BindingObserversToElement, _BindingBase);

  var _super = binding_observers_element_createSuper(BindingObserversToElement);

  /**
   * Creates a new BindingObserversToElement instance.
   *
   * @param {Function} customUpdate - Custom update function.
   * @param {object} args - The arguments.
   */
  function BindingObserversToElement() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        customUpdate = _ref.customUpdate,
        args = _objectWithoutProperties(_ref, ["customUpdate"]);

    binding_observers_element_classCallCheck(this, BindingObserversToElement);

    _this = _super.call(this, args);
    _this._customUpdate = customUpdate;
    _this._events = [];
    _this._updateElementHandler = _this._updateElement.bind(binding_observers_element_assertThisInitialized(_this));
    _this._updateTimeout = null;
    return _this;
  }

  binding_observers_element_createClass(BindingObserversToElement, [{
    key: "_linkObserver",
    value: function _linkObserver(observer, path) {
      this._events.push(observer.on(path + ':set', this._deferUpdateElement.bind(this)));

      this._events.push(observer.on(path + ':unset', this._deferUpdateElement.bind(this)));

      this._events.push(observer.on(path + ':insert', this._deferUpdateElement.bind(this)));

      this._events.push(observer.on(path + ':remove', this._deferUpdateElement.bind(this)));
    }
  }, {
    key: "_deferUpdateElement",
    value: function _deferUpdateElement() {
      if (this.applyingChange) return;
      this.applyingChange = true;
      this._updateTimeout = setTimeout(this._updateElementHandler);
    }
  }, {
    key: "_updateElement",
    value: function _updateElement() {
      var _this2 = this;

      if (this._updateTimeout) {
        clearTimeout(this._updateTimeout);
        this._updateTimeout = null;
      }

      this._updateTimeout = null;
      this.applyingChange = true;

      if (typeof this._customUpdate === 'function') {
        this._customUpdate(this._element, this._observers, this._paths);
      } else if (this._observers.length === 1) {
        if (this._paths.length > 1) {
          // if using multiple paths for the single observer (e.g. curves)
          // then return an array of values for each path
          this._element.value = this._paths.map(function (path) {
            return _this2._observers[0].has(path) ? _this2._observers[0].get(path) : undefined;
          });
        } else {
          this._element.value = this._observers[0].has(this._paths[0]) ? this._observers[0].get(this._paths[0]) : undefined;
        }
      } else {
        this._element.values = this._observers.map(function (observer, i) {
          var path = _this2._pathAt(_this2._paths, i);

          return observer.has(path) ? observer.get(path) : undefined;
        });
      }

      this.applyingChange = false;
    }
  }, {
    key: "link",
    value: function link(observers, paths) {
      _get(binding_observers_element_getPrototypeOf(BindingObserversToElement.prototype), "link", this).call(this, observers, paths); // don't render changes when we link


      var renderChanges = this._element.renderChanges;

      if (renderChanges) {
        this._element.renderChanges = false;
      }

      this._updateElement();

      if (renderChanges) {
        this._element.renderChanges = renderChanges;
      }

      if (this._observers.length === 1) {
        if (this._paths.length > 1) {
          for (var i = 0; i < this._paths.length; i++) {
            this._linkObserver(this._observers[0], this._paths[i]);
          }

          return;
        }
      }

      for (var _i = 0; _i < this._observers.length; _i++) {
        this._linkObserver(this._observers[_i], this._pathAt(this._paths, _i));
      }
    }
  }, {
    key: "unlink",
    value: function unlink() {
      for (var i = 0; i < this._events.length; i++) {
        this._events[i].unbind();
      }

      this._events.length = 0;

      if (this._updateTimeout) {
        clearTimeout(this._updateTimeout);
        this._updateTimeout = null;
      }

      _get(binding_observers_element_getPrototypeOf(BindingObserversToElement.prototype), "unlink", this).call(this);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new BindingObserversToElement();
    }
  }]);

  return BindingObserversToElement;
}(binding_base);

/* harmony default export */ var binding_observers_element = (BindingObserversToElement);
;// CONCATENATED MODULE: ./src/binding/binding-two-way.js
function binding_two_way_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { binding_two_way_typeof = function _typeof(obj) { return typeof obj; }; } else { binding_two_way_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return binding_two_way_typeof(obj); }

function binding_two_way_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function binding_two_way_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function binding_two_way_createClass(Constructor, protoProps, staticProps) { if (protoProps) binding_two_way_defineProperties(Constructor.prototype, protoProps); if (staticProps) binding_two_way_defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = binding_two_way_superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function binding_two_way_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { binding_two_way_get = Reflect.get; } else { binding_two_way_get = function _get(target, property, receiver) { var base = binding_two_way_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return binding_two_way_get(target, property, receiver || target); }

function binding_two_way_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = binding_two_way_getPrototypeOf(object); if (object === null) break; } return object; }

function binding_two_way_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) binding_two_way_setPrototypeOf(subClass, superClass); }

function binding_two_way_setPrototypeOf(o, p) { binding_two_way_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return binding_two_way_setPrototypeOf(o, p); }

function binding_two_way_createSuper(Derived) { var hasNativeReflectConstruct = binding_two_way_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = binding_two_way_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = binding_two_way_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return binding_two_way_possibleConstructorReturn(this, result); }; }

function binding_two_way_possibleConstructorReturn(self, call) { if (call && (binding_two_way_typeof(call) === "object" || typeof call === "function")) { return call; } return binding_two_way_assertThisInitialized(self); }

function binding_two_way_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function binding_two_way_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function binding_two_way_getPrototypeOf(o) { binding_two_way_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return binding_two_way_getPrototypeOf(o); }




/**
 * @name BindingTwoWay
 * @classdesc Provides two way data binding between Observers and IBindable elements. This means
 * that when the value of the Observers changes the IBindable will be updated and vice versa.
 * @augments BindingBase
 */

var BindingTwoWay = /*#__PURE__*/function (_BindingBase) {
  binding_two_way_inherits(BindingTwoWay, _BindingBase);

  var _super = binding_two_way_createSuper(BindingTwoWay);

  /**
   * Creates a new BindingTwoWay instance.
   *
   * @param {object} args - The arguments.
   */
  function BindingTwoWay(args) {
    var _this;

    binding_two_way_classCallCheck(this, BindingTwoWay);

    if (!args) args = {};
    _this = _super.call(this, args);
    _this._bindingElementToObservers = args.bindingElementToObservers || new binding_element_observers(args);
    _this._bindingObserversToElement = args.bindingObserversToElement || new binding_observers_element(args);
    _this._applyingChange = false;

    _this._bindingElementToObservers.on('applyingChange', function (value) {
      _this.applyingChange = value;
    });

    _this._bindingObserversToElement.on('applyingChange', function (value) {
      _this.applyingChange = value;
    });

    return _this;
  }

  binding_two_way_createClass(BindingTwoWay, [{
    key: "link",
    value: function link(observers, paths) {
      binding_two_way_get(binding_two_way_getPrototypeOf(BindingTwoWay.prototype), "link", this).call(this, observers, paths);

      this._bindingElementToObservers.link(observers, paths);

      this._bindingObserversToElement.link(observers, paths);
    }
  }, {
    key: "unlink",
    value: function unlink() {
      this._bindingElementToObservers.unlink();

      this._bindingObserversToElement.unlink();

      binding_two_way_get(binding_two_way_getPrototypeOf(BindingTwoWay.prototype), "unlink", this).call(this);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new BindingTwoWay({
        bindingElementToObservers: this._bindingElementToObservers.clone(),
        bindingObserversToElement: this._bindingObserversToElement.clone()
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this._bindingElementToObservers.setValue(value);
    }
  }, {
    key: "setValues",
    value: function setValues(values) {
      this._bindingElementToObservers.setValues(values);
    }
  }, {
    key: "addValue",
    value: function addValue(value) {
      this._bindingElementToObservers.addValue(value);
    }
  }, {
    key: "addValues",
    value: function addValues(values) {
      this._bindingElementToObservers.addValues(values);
    }
  }, {
    key: "removeValue",
    value: function removeValue(value) {
      this._bindingElementToObservers.removeValue(value);
    }
  }, {
    key: "removeValues",
    value: function removeValues(values) {
      this._bindingElementToObservers.removeValues(values);
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    },
    set: function set(value) {
      this._element = value;
      this._bindingElementToObservers.element = value;
      this._bindingObserversToElement.element = value;
    }
  }, {
    key: "applyingChange",
    get: function get() {
      return binding_two_way_get(binding_two_way_getPrototypeOf(BindingTwoWay.prototype), "applyingChange", this);
    },
    set: function set(value) {
      if (binding_two_way_get(binding_two_way_getPrototypeOf(BindingTwoWay.prototype), "applyingChange", this) === value) return;
      this._bindingElementToObservers.applyingChange = value;
      this._bindingObserversToElement.applyingChange = value;

      _set(binding_two_way_getPrototypeOf(BindingTwoWay.prototype), "applyingChange", value, this, true);
    }
  }, {
    key: "historyCombine",
    get: function get() {
      return this._bindingElementToObservers.historyCombine;
    },
    set: function set(value) {
      this._bindingElementToObservers.historyCombine = value;
    }
  }, {
    key: "historyPrefix",
    get: function get() {
      return this._bindingElementToObservers.historyPrefix;
    },
    set: function set(value) {
      this._bindingElementToObservers.historyPrefix = value;
    }
  }, {
    key: "historyPostfix",
    get: function get() {
      return this._bindingElementToObservers.historyPostfix;
    },
    set: function set(value) {
      this._bindingElementToObservers.historyPostfix = value;
    }
  }]);

  return BindingTwoWay;
}(binding_base);

/* harmony default export */ var binding_two_way = ((/* unused pure expression or super */ null && (BindingTwoWay)));
;// CONCATENATED MODULE: ./src/binding/history.js
function history_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { history_typeof = function _typeof(obj) { return typeof obj; }; } else { history_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return history_typeof(obj); }

function history_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function history_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function history_createClass(Constructor, protoProps, staticProps) { if (protoProps) history_defineProperties(Constructor.prototype, protoProps); if (staticProps) history_defineProperties(Constructor, staticProps); return Constructor; }

function history_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) history_setPrototypeOf(subClass, superClass); }

function history_setPrototypeOf(o, p) { history_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return history_setPrototypeOf(o, p); }

function history_createSuper(Derived) { var hasNativeReflectConstruct = history_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = history_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = history_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return history_possibleConstructorReturn(this, result); }; }

function history_possibleConstructorReturn(self, call) { if (call && (history_typeof(call) === "object" || typeof call === "function")) { return call; } return history_assertThisInitialized(self); }

function history_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function history_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function history_getPrototypeOf(o) { history_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return history_getPrototypeOf(o); }


/**
 * @name HistoryAction
 * @classdesc A history action
 * @property {string} name The name of the action
 * @property {Function} undo The undo function
 * @property {Function} redo The redo function
 * @property {boolean} combine Whether to combine with the previous action with the same name.
 * The effect of combining is merely changing the redo function to be the redo function of this action.
 * The original undo function is not modified.
 */

/**
 * @name History
 * @classdesc Manages history actions for undo / redo operations.
 * @property {HistoryAction} currentAction Returns the current history action
 * @property {HistoryAction} lastAction Returns the last history action
 * @property {boolean} canUndo Whether we can undo at this time.
 * @property {boolean} canRedo Whether we can redo at this time.
 * @augments Events
 */

var History = /*#__PURE__*/function (_Events) {
  history_inherits(History, _Events);

  var _super = history_createSuper(History);

  /**
   * Creates a new pcui.History.
   */
  function History() {
    var _this;

    history_classCallCheck(this, History);

    _this = _super.call(this);
    _this._actions = [];
    _this._currentActionIndex = -1;
    _this._canUndo = false;
    _this._canRedo = false;
    return _this;
  }
  /**
   * @name History#add
   * @description Adds a new history action
   * @param {HistoryAction} action - The action
   */


  history_createClass(History, [{
    key: "add",
    value: function add(action) {
      if (!action.name) {
        console.error('Trying to add history action without name');
        return;
      }

      if (!action.undo) {
        console.error('Trying to add history action without undo method', action.name);
        return;
      }

      if (!action.redo) {
        console.error('Trying to add history action without redo method', action.name);
        return;
      } // if we are adding an action
      // but we have undone some actions in the meantime
      // then we should erase the actions that come after our
      // last action before adding this


      if (this._currentActionIndex !== this._actions.length - 1) {
        this._actions = this._actions.slice(0, this._currentActionIndex + 1);
      } // if combine is true then replace the redo of the current action
      // if it has the same name


      if (action.combine && this.currentAction && this.currentAction.name === action.name) {
        this.currentAction.redo = action.redo;
      } else {
        var length = this._actions.push(action);

        this._currentActionIndex = length - 1;
      }

      this.emit('add', action.name);
      this.canUndo = true;
      this.canRedo = false;
    }
    /**
     * @name History#undo
     * @description Undo the last history action
     */

  }, {
    key: "undo",
    value: function undo() {
      if (!this.canUndo) return;
      var name = this.currentAction.name;

      try {
        this.currentAction.undo();
      } catch (ex) {
        console.info('%c(pcui.History#undo)', 'color: #f00');
        console.log(ex.stack);
        return;
      }

      this._currentActionIndex--;
      this.emit('undo', name);

      if (this._currentActionIndex < 0) {
        this.canUndo = false;
      }

      this.canRedo = true;
    }
    /**
     * @name History#redo
     * @description Redo the current history action
     */

  }, {
    key: "redo",
    value: function redo() {
      if (!this.canRedo) return;
      this._currentActionIndex++;

      try {
        this.currentAction.redo();
      } catch (ex) {
        console.info('%c(pcui.History#redo)', 'color: #f00');
        console.log(ex.stack);
        return;
      }

      this.emit('redo', this.currentAction.name);
      this.canUndo = true;

      if (this._currentActionIndex === this._actions.length - 1) {
        this.canRedo = false;
      }
    }
    /**
     * @name History#clear
     * @description Clears all history actions.
     */

  }, {
    key: "clear",
    value: function clear() {
      if (!this._actions.length) return;
      this._actions.length = 0;
      this._currentActionIndex = -1;
      this.canUndo = false;
      this.canRedo = false;
    }
  }, {
    key: "currentAction",
    get: function get() {
      return this._actions[this._currentActionIndex] || null;
    }
  }, {
    key: "lastAction",
    get: function get() {
      return this._actions[this._actions.length - 1] || null;
    }
  }, {
    key: "canUndo",
    get: function get() {
      return this._canUndo;
    },
    set: function set(value) {
      if (this._canUndo === value) return;
      this._canUndo = value;
      this.emit('canUndo', value);
    }
  }, {
    key: "canRedo",
    get: function get() {
      return this._canRedo;
    },
    set: function set(value) {
      if (this._canRedo === value) return;
      this._canRedo = value;
      this.emit('canRedo', value);
    }
  }]);

  return History;
}(events/* default */.Z);

/* harmony default export */ var binding_history = ((/* unused pure expression or super */ null && (History)));
;// CONCATENATED MODULE: ./src/binding/observer-history.js



function ObserverHistory(args) {
  events/* default.call */.Z.call(this);
  args = args || {};
  this.item = args.item;
  this._history = args.history;
  this._enabled = args.enabled || true;
  this._prefix = args.prefix || '';
  this._combine = args.combine || false;
  this._events = [];

  this._initialize();
}

ObserverHistory.prototype = Object.create(events/* default.prototype */.Z.prototype);

ObserverHistory.prototype._initialize = function () {
  var self = this;

  this._events.push(this.item.on('*:set', function (path, value, valueOld) {
    if (!self._enabled || !self._history) return; // need jsonify

    if (value instanceof observer) value = value.json(); // action

    var action = {
      name: self._prefix + path,
      combine: self._combine,
      undo: function undo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;

        if (valueOld === undefined) {
          item.unset(path);
        } else {
          item.set(path, valueOld);
        }

        item.history.enabled = true;
      },
      redo: function redo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;

        if (value === undefined) {
          item.unset(path);
        } else {
          item.set(path, value);
        }

        item.history.enabled = true;
      }
    };

    self._history.add(action);
  }));

  this._events.push(this.item.on('*:unset', function (path, valueOld) {
    if (!self._enabled || !self._history) return; // action

    var action = {
      name: self._prefix + path,
      combine: self._combine,
      undo: function undo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.set(path, valueOld);
        item.history.enabled = true;
      },
      redo: function redo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.unset(path);
        item.history.enabled = true;
      }
    };

    self._history.add(action);
  }));

  this._events.push(this.item.on('*:insert', function (path, value, ind) {
    if (!self._enabled || !self._history) return; // need jsonify
    // if (value instanceof Observer)
    //     value = value.json();
    // action

    var action = {
      name: self._prefix + path,
      combine: self._combine,
      undo: function undo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.removeValue(path, value);
        item.history.enabled = true;
      },
      redo: function redo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.insert(path, value, ind);
        item.history.enabled = true;
      }
    };

    self._history.add(action);
  }));

  this._events.push(this.item.on('*:remove', function (path, value, ind) {
    if (!self._enabled || !self._history) return; // need jsonify
    // if (value instanceof Observer)
    //     value = value.json();
    // action

    var action = {
      name: self._prefix + path,
      combine: self._combine,
      undo: function undo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.insert(path, value, ind);
        item.history.enabled = true;
      },
      redo: function redo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.removeValue(path, value);
        item.history.enabled = true;
      }
    };

    self._history.add(action);
  }));

  this._events.push(this.item.on('*:move', function (path, value, ind, indOld) {
    if (!self._enabled || !self._history) return; // action

    var action = {
      name: self._prefix + path,
      combine: self._combine,
      undo: function undo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.move(path, ind, indOld);
        item.history.enabled = true;
      },
      redo: function redo() {
        var item = self.item.latest();
        if (!item) return;
        item.history.enabled = false;
        item.move(path, indOld, ind);
        item.history.enabled = true;
      }
    };

    self._history.add(action);
  }));
};

ObserverHistory.prototype.destroy = function () {
  this._events.forEach(function (evt) {
    evt.unbind();
  });

  this._events.length = 0;
  this.item = null;
};

Object.defineProperty(ObserverHistory.prototype, 'enabled', {
  get: function get() {
    return this._enabled;
  },
  set: function set(value) {
    this._enabled = !!value;
  }
});
Object.defineProperty(ObserverHistory.prototype, 'prefix', {
  get: function get() {
    return this._prefix;
  },
  set: function set(value) {
    this._prefix = value || '';
  }
});
Object.defineProperty(ObserverHistory.prototype, 'combine', {
  get: function get() {
    return this._combine;
  },
  set: function set(value) {
    this._combine = !!value;
  }
});
/* harmony default export */ var observer_history = ((/* unused pure expression or super */ null && (ObserverHistory)));
;// CONCATENATED MODULE: ./src/binding/observer-list.js



function ObserverList(options) {
  events/* default.call */.Z.call(this);
  options = options || {};
  this.data = [];
  this._indexed = {};
  this.sorted = options.sorted || null;
  this.index = options.index || null;
}

ObserverList.prototype = Object.create(events/* default.prototype */.Z.prototype);
Object.defineProperty(ObserverList.prototype, 'length', {
  get: function get() {
    return this.data.length;
  }
});

ObserverList.prototype.get = function (index) {
  if (this.index) {
    return this._indexed[index] || null;
  }

  return this.data[index] || null;
};

ObserverList.prototype.set = function (index, value) {
  if (this.index) {
    this._indexed[index] = value;
  } else {
    this.data[index] = value;
  }
};

ObserverList.prototype.indexOf = function (item) {
  if (this.index) {
    var index = item instanceof observer && item.get(this.index) || item[this.index];
    return this._indexed[index] && index || null;
  }

  var ind = this.data.indexOf(item);
  return ind !== -1 ? ind : null;
};

ObserverList.prototype.position = function (b, fn) {
  var l = this.data;
  var min = 0;
  var max = l.length - 1;
  var cur;
  var a, i;
  fn = fn || this.sorted;

  while (min <= max) {
    cur = Math.floor((min + max) / 2);
    a = l[cur];
    i = fn(a, b);

    if (i === 1) {
      max = cur - 1;
    } else if (i === -1) {
      min = cur + 1;
    } else {
      return cur;
    }
  }

  return -1;
};

ObserverList.prototype.positionNextClosest = function (b, fn) {
  var l = this.data;
  var min = 0;
  var max = l.length - 1;
  var cur;
  var a, i;
  fn = fn || this.sorted;
  if (l.length === 0) return -1;
  if (fn(l[0], b) === 0) return 0;

  while (min <= max) {
    cur = Math.floor((min + max) / 2);
    a = l[cur];
    i = fn(a, b);

    if (i === 1) {
      max = cur - 1;
    } else if (i === -1) {
      min = cur + 1;
    } else {
      return cur;
    }
  }

  if (fn(a, b) === 1) return cur;
  if (cur + 1 === l.length) return -1;
  return cur + 1;
};

ObserverList.prototype.has = function (item) {
  if (this.index) {
    var index = item instanceof observer && item.get(this.index) || item[this.index];
    return !!this._indexed[index];
  }

  return this.data.indexOf(item) !== -1;
};

ObserverList.prototype.add = function (item) {
  if (this.has(item)) return null;
  var index = this.data.length;

  if (this.index) {
    index = item instanceof observer && item.get(this.index) || item[this.index];
    this._indexed[index] = item;
  }

  var pos = 0;

  if (this.sorted) {
    pos = this.positionNextClosest(item);

    if (pos !== -1) {
      this.data.splice(pos, 0, item);
    } else {
      this.data.push(item);
    }
  } else {
    this.data.push(item);
    pos = this.data.length - 1;
  }

  this.emit('add', item, index, pos);
  return pos;
};

ObserverList.prototype.move = function (item, pos) {
  var ind = this.data.indexOf(item);
  this.data.splice(ind, 1);

  if (pos === -1) {
    this.data.push(item);
  } else {
    this.data.splice(pos, 0, item);
  }

  this.emit('move', item, pos);
};

ObserverList.prototype.remove = function (item) {
  if (!this.has(item)) return;
  var ind = this.data.indexOf(item);
  var index = ind;

  if (this.index) {
    index = item instanceof observer && item.get(this.index) || item[this.index];
    delete this._indexed[index];
  }

  this.data.splice(ind, 1);
  this.emit('remove', item, index);
};

ObserverList.prototype.removeByKey = function (index) {
  var item;

  if (this.index) {
    item = this._indexed[index];
    if (!item) return;
    var ind = this.data.indexOf(item);
    this.data.splice(ind, 1);
    delete this._indexed[index];
    this.emit('remove', item, ind);
  } else {
    if (this.data.length < index) return;
    item = this.data[index];
    this.data.splice(index, 1);
    this.emit('remove', item, index);
  }
};

ObserverList.prototype.removeBy = function (fn) {
  var i = this.data.length;

  while (i--) {
    if (!fn(this.data[i])) continue;

    if (this.index) {
      delete this._indexed[this.data[i][this.index]];
    }

    this.data.splice(i, 1);
    this.emit('remove', this.data[i], i);
  }
};

ObserverList.prototype.clear = function () {
  var items = this.data.slice(0);
  this.data = [];
  this._indexed = {};
  var i = items.length;

  while (i--) {
    this.emit('remove', items[i], i);
  }
};

ObserverList.prototype.forEach = function (fn) {
  for (var i = 0; i < this.data.length; i++) {
    fn(this.data[i], this.index && this.data[i][this.index] || i);
  }
};

ObserverList.prototype.find = function (fn) {
  var items = [];

  for (var i = 0; i < this.data.length; i++) {
    if (!fn(this.data[i])) continue;
    var index = i;
    if (this.index) index = this.data[i][this.index];
    items.push([index, this.data[i]]);
  }

  return items;
};

ObserverList.prototype.findOne = function (fn) {
  for (var i = 0; i < this.data.length; i++) {
    if (!fn(this.data[i])) continue;
    var index = i;
    if (this.index) index = this.data[i][this.index];
    return [index, this.data[i]];
  }

  return null;
};

ObserverList.prototype.map = function (fn) {
  return this.data.map(fn);
};

ObserverList.prototype.sort = function (fn) {
  this.data.sort(fn);
};

ObserverList.prototype.array = function () {
  return this.data.slice(0);
};

ObserverList.prototype.json = function () {
  var items = this.array();

  for (var i = 0; i < items.length; i++) {
    if (items[i] instanceof observer) {
      items[i] = items[i].json();
    }
  }

  return items;
};

/* harmony default export */ var observer_list = ((/* unused pure expression or super */ null && (ObserverList)));
;// CONCATENATED MODULE: ./src/binding/index.js











/***/ }),

/***/ 9450:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-array-input{margin:6px;min-width:0}.pcui-array-input>.pcui-numeric-input{margin:0 0 6px 0}.pcui-array-input.pcui-array-empty>.pcui-numeric-input{margin:0}.pcui-array-input-item>*{margin-top:1px;margin-bottom:1px}.pcui-array-input-item>*:first-child:not(.pcui-not-flexible):not(.pcui-panel-header){flex:1}.pcui-array-input-item>.pcui-button{margin-left:-3px;margin-right:0;background-color:transparent;border:0}.pcui-array-input-item-asset>.pcui-button{margin-top:36px}.pcui-array-input.pcui-readonly .pcui-array-input-item-delete{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9599:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon,.pcui-boolean-input.pcui-boolean-input-ticked:after{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-boolean-input.pcui-boolean-input-ticked:after{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-boolean-input{display:inline-block;position:relative;box-sizing:border-box;background-color:#2c393c;color:#fff;width:14px;height:14px;line-height:1;overflow:hidden;margin:6px;transition:opacity 100ms,background-color 100ms,box-shadow 100ms}.pcui-boolean-input:focus{outline:none}.pcui-boolean-input.pcui-boolean-input-ticked{background-color:#b1b8ba}.pcui-boolean-input.pcui-boolean-input-ticked:after{content:\"\";color:#20292b;background-color:inherit;font-size:19px;display:block;margin-top:-2px;margin-left:-2px}.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly):hover,.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly):focus{cursor:pointer;background-color:#293538;box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:hover,.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:focus{background-color:#b1b8ba}.pcui-boolean-input.pcui-disabled{opacity:.4}.pcui-boolean-input.pcui-multiple-values:after{position:absolute;font-size:17px;font-weight:bold;color:#b1b8ba;left:4px;top:-3px;content:\"-\"}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9977:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-boolean-input-toggle{display:inline-block;position:relative;width:30px;height:16px;border-radius:8px;flex-shrink:0;border:1px solid #293538;box-sizing:border-box;background-color:#364346;color:#fff;line-height:1;overflow:hidden;margin:6px;transition:opacity 100ms,background-color 100ms,box-shadow 100ms}.pcui-boolean-input-toggle:focus{outline:none}.pcui-boolean-input-toggle:after{content:\" \";position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:6px;background-color:#5b7073;transition:left 100ms ease,background-color 100ms ease}.pcui-boolean-input-toggle.pcui-boolean-input-ticked{border-color:#293538}.pcui-boolean-input-toggle.pcui-boolean-input-ticked:after{left:15px;background-color:#69b875}.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):hover,.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):focus{cursor:pointer;border-color:#20292b;background-color:#20292b;box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):hover:after,.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):focus:after{background-color:#d34141}.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:hover,.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:focus{border-color:#20292b;background-color:#20292b}.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:after{background-color:#7f7}.pcui-boolean-input-toggle.pcui-readonly{opacity:.7}.pcui-boolean-input-toggle.pcui-disabled{opacity:.4}.pcui-boolean-input-toggle.pcui-multiple-values:after{left:8px;background-color:rgba(155,161,163,.25)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6287:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon,.pcui-button[data-icon]:before{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-button[data-icon]:before{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect,.pcui-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-button{font-family:inherit;display:inline-block;border:1px solid #20292b;border-radius:2px;box-sizing:border-box;background-color:#2c393c;color:#b1b8ba;padding:0 8px;margin:6px;height:28px;line-height:28px;max-height:100%;vertical-align:middle;font-size:12px;font-weight:600;text-align:center;white-space:nowrap;cursor:pointer;transition:color 100ms,opacity 100ms,box-shadow 100ms;overflow:hidden;text-overflow:ellipsis}.pcui-button[data-icon]:before{content:attr(data-icon);font-weight:100;font-size:inherit;margin-right:6px;vertical-align:middle}.pcui-button[data-icon]:empty:before{margin-right:0}.pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover,.pcui-button:not(.pcui-disabled):not(.pcui-readonly):focus{color:#fff;background-color:#2c393c;box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-button:not(.pcui-disabled):not(.pcui-readonly):active{background-color:#20292b;box-shadow:none}.pcui-button.pcui-readonly{opacity:.7;cursor:default}.pcui-button.pcui-disabled{opacity:.4;cursor:default}.pcui-button.pcui-small{height:24px;line-height:24px;font-size:10px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3367:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-code{background:#20292b;overflow:auto}.pcui-code .pcui-code-inner{color:#f60;font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:10px;white-space:pre}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7848:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-container{position:relative;min-width:0;min-height:0}.pcui-container.pcui-resizable>.pcui-resizable-handle{position:absolute;z-index:1;opacity:0;background-color:transparent}.pcui-container.pcui-resizable>.pcui-resizable-handle:hover{opacity:1}.pcui-container.pcui-resizable.pcui-resizable-resizing>.pcui-resizable-handle{opacity:1}.pcui-container.pcui-resizable.pcui-resizable-left>.pcui-resizable-handle,.pcui-container.pcui-resizable.pcui-resizable-right>.pcui-resizable-handle{top:0;bottom:0;width:1px;height:auto;cursor:ew-resize}.pcui-container.pcui-resizable.pcui-resizable-left>.pcui-resizable-handle{left:0;border-left:3px solid #20292b}.pcui-container.pcui-resizable.pcui-resizable-right>.pcui-resizable-handle{right:0;border-right:3px solid #20292b}.pcui-container.pcui-resizable.pcui-resizable-top>.pcui-resizable-handle,.pcui-container.pcui-resizable.pcui-resizable-bottom>.pcui-resizable-handle{left:0;right:0;width:auto;height:1px;cursor:ns-resize}.pcui-container.pcui-resizable.pcui-resizable-top>.pcui-resizable-handle{top:0;border-top:3px solid #20292b}.pcui-container.pcui-resizable.pcui-resizable-bottom>.pcui-resizable-handle{bottom:0;border-bottom:3px solid #20292b}.pcui-container-dragged{outline:2px solid #fff;box-sizing:border-box;opacity:.7;z-index:1}.pcui-container-dragged-child{outline:1px dotted #f60;box-sizing:border-box}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5821:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-contextmenu{box-sizing:border-box;border:1px solid #293538;border-radius:2px;background-color:#2c393c;color:#b1b8ba;font-size:12px;font-weight:400;display:none;position:fixed;z-index:9999}.pcui-contextmenu-active{display:block}.pcui-contextmenu div{background-color:#2c393c;width:150px;position:absolute}.pcui-contextmenu div:before{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;z-index:-1;box-shadow:0 0 8px rgba(0,0,0,.5)}.pcui-contextmenu-parent{cursor:auto !important}.pcui-contextmenu-parent div{display:none}.pcui-contextmenu-parent:hover div{display:block}.pcui-contextmenu-parent-active div{display:block}.pcui-contextmenu{div-font-weight:bold}.pcui-contextmenu div:hover{background-color:#364346;cursor:pointer}.pcui-contextmenu div.pcui-contextmenu-parent:after{content:\"\";font-family:\"pc-icon\";font-size:14px;text-align:center;background-color:transparent;color:#9ba1a3;line-height:14px;position:absolute;right:4px;top:50%;transform:translateY(-50%)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6616:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-divider{height:1px;background-color:#2c393c;margin:6px 0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3606:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular,.pcui-element{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}@-webkit-keyframes pcui-flash-animation{from{outline-color:#f60}to{outline-color:rgba(255,102,0,0)}}@keyframes pcui-flash-animation{from{outline-color:#f60}to{outline-color:rgba(255,102,0,0)}}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-element{border:0 solid #232e30}.pcui-element.flash{outline:1px solid #f60;-webkit-animation:pcui-flash-animation 200ms ease-in-out forwards;animation:pcui-flash-animation 200ms ease-in-out forwards}.pcui-element:focus{outline:none}.pcui-element::-moz-focus-inner{border:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5777:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-gridview{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-gridview:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-gridview{flex-direction:row;flex-wrap:wrap;align-content:flex-start}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4731:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-gridview-item{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-gridview-item:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-gridview-item{box-sizing:border-box;justify-content:center;align-items:center;flex-shrink:0;width:104px}.pcui-gridview-item:not(.pcui-disabled){cursor:pointer}.pcui-gridview-item:not(.pcui-disabled):not(.pcui-gridview-item-selected):hover{background-color:#293538}.pcui-gridview-item-selected{background-color:#20292b}.pcui-gridview-item-text{max-width:100px;font-size:12px;overflow:hidden;text-overflow:ellipsis;margin:0;padding:0 2px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon,.pcui-infobox[data-icon]:not(.pcui-hidden):before{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-infobox[data-icon]:not(.pcui-hidden):before{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-infobox{box-sizing:border-box;margin:6px;padding:12px;border:1px solid #293538;border-radius:2px;background-color:#2c393c;color:#b1b8ba;font-size:12px}.pcui-infobox :first-child{color:#fff;margin-bottom:2px}.pcui-infobox[data-icon]:not(.pcui-hidden){display:grid;grid:auto-flow/min-content 1fr}.pcui-infobox[data-icon]:not(.pcui-hidden):before{content:attr(data-icon);font-weight:100;font-size:16px;margin-right:12px;vertical-align:middle;grid-column:1;grid-row:1/3}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8555:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont,.pcui-label.pcui-multiple-values:before{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect,.pcui-label.pcui-selectable:hover{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-label{display:inline-block;box-sizing:border-box;margin:6px;vertical-align:middle;transition:opacity 100ms;color:#b1b8ba;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;user-select:none}.pcui-label.pcui-default-mousedown{user-select:initial}.pcui-label.pcui-multiple-values{position:relative;color:transparent}.pcui-label.pcui-multiple-values:before{content:\"...\";color:#b1b8ba;white-space:nowrap;font-size:12px}.pcui-label.pcui-error{color:#d34141}.pcui-label.pcui-selectable:hover{color:#f60;text-decoration:underline}.pcui-label[placeholder]{position:relative}.pcui-label[placeholder]:after{content:attr(placeholder);position:absolute;top:0;right:0;padding:0 8px;color:#999;pointer-events:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6321:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-label-group{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-label-group:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-label-group{align-items:center;flex-direction:row;flex-wrap:nowrap;margin:6px}.pcui-label-group>.pcui-label:first-child{width:100px;flex-shrink:0;margin:0}.pcui-label-group>.pcui-element:not(:first-child){margin:0 0 0 6px}.pcui-label-group>.pcui-element:nth-child(2):not(.pcui-not-flexible){flex:1}.pcui-label-group>.pcui-vector-input>.pcui-numeric-input{margin-top:0;margin-bottom:0}.pcui-label-group-align-top>.pcui-label:first-child{align-self:flex-start;margin-top:4px}.pcui-label-group.pcui-disabled>.pcui-label:first-child{opacity:.4}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4870:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-numeric-input-slider-control{display:none;position:absolute;width:10px;height:10px;right:3px;border:2px solid #20292b;background-color:#293538;border-radius:100px;z-index:9999;transform:translateY(-50%);top:50%;cursor:ew-resize}.pcui-numeric-input-slider-control:after{content:\"\";font-size:15px;font-family:\"pc-icon\";position:absolute;left:-5px;top:-5px;transform:rotateZ(90deg)}.pcui-numeric-input-slider-control:hover{opacity:50%;color:#b1b8ba}.pcui-numeric-input-slider-control-active{opacity:100% !important;color:#7f7 !important}.pcui-numeric-input-slider-control-hidden{display:none !important}.pcui-numeric-input:hover .pcui-numeric-input-slider-control{display:block}.pcui-numeric-input.pcui-disabled:hover .pcui-numeric-input-slider-control{display:none}.pcui-numeric-input.pcui-disabled .pcui-numeric-input-slider-control,.pcui-numeric-input.pcui-readonly .pcui-numeric-input-slider-control{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7817:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect,.pcui-overlay-inner{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-overlay{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-overlay:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-overlay{position:absolute;width:auto;height:auto;top:0;right:0;bottom:0;left:0;z-index:101;transition:opacity 100ms,visibility 100ms;justify-content:center;align-items:center;position:absolute}.pcui-overlay-inner{position:absolute;width:auto;height:auto;top:0;right:0;bottom:0;left:0;background-color:rgba(32,41,43,.7)}.pcui-overlay-clickable>.pcui-overlay-inner{cursor:pointer}.pcui-overlay-transparent>.pcui-overlay-inner{background-color:transparent}.pcui-overlay-content{background-color:#364346;transition:width 100ms,height 100ms,margin-left 100ms,margin-top 100ms;box-shadow:7px 7px 7px rgba(0,0,0,.15)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2383:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.pcui-panel-header-title,.pcui-panel-header,.font-icon,.pcui-panel.pcui-collapsible>.pcui-panel-header:before{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-panel.pcui-collapsible>.pcui-panel-header:before{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-panel-header>.pcui-panel-sortable-icon{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-panel-header>.pcui-panel-sortable-icon:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-panel{background-color:#364346}.pcui-panel-header{background-color:#293538;color:#fff;font-size:12px;white-space:nowrap;padding-left:10px;flex-shrink:0;align-items:center}.pcui-panel-header-title{overflow:hidden;text-overflow:ellipsis;flex:1;color:inherit;font-size:inherit;white-space:inherit;margin:0 auto 0 0}.pcui-panel-content{flex:1}.pcui-panel.pcui-collapsible{transition:height 100ms,width 100ms}.pcui-panel.pcui-collapsible>.pcui-panel-header{cursor:pointer}.pcui-panel.pcui-collapsible>.pcui-panel-header:before{left:0;content:\"\";font-size:14px;margin-right:10px;text-align:center;color:#f60}.pcui-panel.pcui-collapsible>.pcui-panel-header:hover{color:#fff}.pcui-panel.pcui-collapsible>.pcui-panel-header:hover:before{color:#fff}.pcui-panel.pcui-collapsible.pcui-panel-normal>.pcui-panel-header:before{content:\"\";font-weight:200}.pcui-panel.pcui-collapsible>.pcui-panel-content{transition:visibility 100ms}.pcui-panel.pcui-collapsible.pcui-collapsed{overflow:hidden}.pcui-panel.pcui-collapsible.pcui-collapsed>.pcui-panel-content{visibility:hidden}.pcui-panel.pcui-collapsible.pcui-collapsed>.pcui-panel-header:before{content:\"\"}.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-normal>.pcui-panel-header:before{content:\"\"}.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal>.pcui-panel-header{width:2048px;-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);transform:rotate(90deg);-webkit-transform-origin:0% 100%;-moz-transform-origin:0% 100%;-ms-transform-origin:0% 100%;-o-transform-origin:0% 100%;transform-origin:0% 100%}.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal>.pcui-panel-header:before{content:\"\"}.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal.pcui-panel-normal>.pcui-panel-header:before{content:\"\"}.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal>.pcui-panel-content{transition:none}.pcui-panel.pcui-resizable.pcui-collapsible.pcui-collapsed>.pcui-resizable-handle{display:none}.pcui-panel.pcui-resizable.pcui-resizable-resizing{transition:none}.pcui-panel.pcui-resizable.pcui-resizable-resizing>.pcui-panel-content{transition:none}.pcui-panel-header>.pcui-panel-sortable-icon{color:#5b7073;transition:color 100ms;flex-direction:row;align-items:center;margin:0 10px 0 0;height:100%}.pcui-panel-header>.pcui-panel-sortable-icon:before{content:\" \";border-left:1px solid #364346;margin-right:10px;height:calc(100% - 14px);flex-shrink:0}.pcui-panel-header>.pcui-panel-sortable-icon:after{content:\".. .. ..\";white-space:normal;width:12px;line-height:5px;overflow:hidden;height:24px;font-size:22px;letter-spacing:1px;flex-shrink:0}.pcui-panel:not(.pcui-disabled):not(.pcui-readonly)>.pcui-panel-header>.pcui-panel-sortable-icon:hover{color:#fff;cursor:move}.pcui-panel:not(.pcui-collapsible)>.pcui-panel-header>.pcui-panel-sortable-icon:before{display:none}.pcui-panel-remove{align-self:flex-end;order:100}.pcui-panel-remove:before{line-height:30px}.pcui-panel.pcui-readonly .pcui-panel-remove{display:none}.pcui-panel-header>.pcui-button{flex-shrink:0;margin:1px;background-color:transparent;border:0}.pcui-panel.pcui-disabled>.pcui-panel-header{background-color:#303d40;color:#999}.pcui-subpanel{box-sizing:border-box;margin:6px;border:1px solid #293538;border-radius:2px;background-color:#2c393c;color:#b1b8ba;font-size:12px}.pcui-subpanel .pcui-button{background-color:#364346;border-color:#293538}.pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover,.pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):focus{background-color:#364346}.pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):active{background-color:#2c393c}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3103:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-progress{height:4px;background-color:#20292b;transition:opacity 100ms;width:100%}.pcui-progress .pcui-progress-inner{width:0%;height:inherit;background:#f60;background:-webkit-gradient(left top, right bottom, color-stop(0%, #ff6600), color-stop(25%, #ff6600), color-stop(26%, #a84300), color-stop(50%, #a84300), color-stop(51%, #ff6600), color-stop(75%, #ff6600), color-stop(76%, #a84300), color-stop(100%, #a84300));background:-webkit-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);background:-moz-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);background:-ms-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);background:-o-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);background:linear-gradient(135deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);background-position:0px 0px;background-size:24px 24px;background-repeat:repeat;-webkit-animation:pcui-progress-background 1000ms linear infinite;animation:pcui-progress-background 1000ms linear infinite}.pcui-progress.pcui-error .pcui-progress-inner{background:#f60;background:-webkit-gradient(left top, right bottom, color-stop(0%, #ff7777), color-stop(25%, #ff7777), color-stop(26%, #ff2020), color-stop(50%, #ff2020), color-stop(51%, #ff7777), color-stop(75%, #ff7777), color-stop(76%, #ff2020), color-stop(100%, #ff2020));background:-webkit-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);background:-moz-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);background:-ms-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);background:-o-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);background:linear-gradient(135deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);background-position:0px 0px;background-size:24px 24px;background-repeat:repeat;-webkit-animation:none;animation:none}@-webkit-keyframes pcui-progress-background{from{background-position:0px 0}to{background-position:24px 0}}@keyframes pcui-progress-background{from{background-position:0px 0}to{background-position:24px 0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2654:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon,.pcui-select-input-create-new>.pcui-label:last-child:before,.pcui-select-input-list .pcui-label.pcui-selected:after,.pcui-select-input-icon:after{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-select-input-create-new>.pcui-label:last-child:before,.pcui-select-input-list .pcui-label.pcui-selected:after,.pcui-select-input-icon:after{font-family:\"pc-icon\"}.fixedFont,.pcui-select-input-tag>.pcui-label,.pcui-select-input-list .pcui-label,.pcui-select-input-value{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-select-input-container-value,.pcui-select-input{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-select-input-container-value:not(.pcui-hidden),.pcui-select-input:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-select-input{box-sizing:border-box;margin:6px;border-radius:2px;min-width:0}.pcui-select-input-container-value{background-color:#2c393c;transition:box-shadow 100ms,opacity 100ms}.pcui-select-input-shadow{position:absolute;width:100%;height:100%;transition:box-shadow 100ms;border-radius:2px;pointer-events:none;z-index:1}.pcui-select-input-value{margin:0;padding:0 24px 0 8px;height:24px;line-height:24px;font-size:12px;transition:background-color 100ms,color 100ms}.pcui-select-input-value:not(.pcui-hidden){display:block}.pcui-select-input-textinput{margin:0}.pcui-select-input-textinput:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error).pcui-focus,.pcui-select-input-textinput:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error):hover{box-shadow:none}.pcui-select-input-icon{position:absolute;right:6px;color:#5b7073;pointer-events:none;transition:color 100ms;margin:0;height:24px;line-height:24px}.pcui-select-input-icon:after{content:\"\";vertical-align:middle}.pcui-select-input.pcui-open .pcui-select-input-shadow{box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-select-input.pcui-open .pcui-select-input-value{color:#fff;background-color:#20292b}.pcui-select-input.pcui-open .pcui-select-input-icon:after{color:#fff;content:\"\"}.pcui-select-input-list{position:absolute;z-index:1;top:100%;width:100%;max-height:200px;overflow-y:auto;background-color:#293538}.pcui-select-input-list .pcui-label{font-size:12px;height:22px;line-height:22px;padding:0 24px 0 6px;margin:0;transition:background-color 100ms,color 100ms}.pcui-select-input-list .pcui-label:not(.pcui-hidden){display:block}.pcui-select-input-list .pcui-label.pcui-selected{color:#fff}.pcui-select-input-list .pcui-label.pcui-selected:after{content:\"\";color:#5b7073;position:absolute;right:6px}.pcui-select-input-fit-height .pcui-select-input-list{top:initial;bottom:100%}.pcui-select-input-fit-height .pcui-select-input-shadow{top:initial;bottom:0}.pcui-select-input-tags:not(.pcui-select-input-tags-empty){margin-top:1px;flex-wrap:wrap}.pcui-select-input-tag{background-color:#293538;align-items:center;border-radius:2px;border:1px solid #232e30;margin-right:2px;margin-top:2px;min-width:0;height:18px}.pcui-select-input-tag>*{margin:0;background-color:transparent;border:0}.pcui-select-input-tag>.pcui-label{padding:0 5px 0 8px}.pcui-select-input-tag>.pcui-button{padding:0 5px;height:18px;line-height:18px;flex-shrink:0}.pcui-select-input-tag>.pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover{box-shadow:none;color:#d34141}.pcui-select-input-tag-not-everywhere>.pcui-label{opacity:.5}.pcui-select-input-tag-not-everywhere>.pcui-label:before{content:\"*\";margin-right:5px}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-container-value:hover .pcui-select-input-shadow{box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-container-value:hover .pcui-select-input-icon{color:#9ba1a3}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus .pcui-select-input-shadow{box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus .pcui-select-input-icon{color:#9ba1a3}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-value:hover{color:#fff;background-color:#20292b;cursor:pointer}.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-list>*:hover,.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-list>.pcui-select-input-label-highlighted{background-color:#20292b;color:#fff;cursor:pointer}.pcui-select-input-create-new>.pcui-label{padding-right:6px}.pcui-select-input-create-new>.pcui-label:last-child{flex-shrink:0;margin-left:auto}.pcui-select-input-create-new>.pcui-label:last-child:before{content:\"\";margin-right:6px}.pcui-select-input.pcui-disabled{opacity:.4}.pcui-select-input.pcui-readonly .pcui-select-input-icon{display:none}.pcui-select-input.pcui-readonly.pcui-select-input-multi .pcui-select-input-container-value{display:none}.pcui-select-input.pcui-readonly.pcui-select-input-multi .pcui-select-input-tag>.pcui-button{display:none}.pcui-select-input.pcui-readonly.pcui-select-input-allow-input:not(.pcui-select-input-multi){opacity:.7}.pcui-select-input.pcui-readonly.pcui-select-input-allow-input:not(.pcui-select-input-multi) .pcui-select-input-textinput:after{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3366:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect,.pcui-slider{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-slider{display:inline-flex;height:24px;margin:6px;align-items:center}.pcui-slider>.pcui-numeric-input{flex:1;margin-left:0}.pcui-slider-container{flex:3}.pcui-slider-bar{position:relative;width:calc(100% - 18px);height:4px;margin:9px 8px;background-color:#2c393c;border:1px solid #293538}.pcui-slider-handle{position:absolute;top:-7px;left:0;margin-left:-9px;width:8px;height:16px;background-color:#5b7073;border:1px solid #293538;transition:left 100ms ease}.pcui-slider-handle:hover,.pcui-slider-handle:focus{outline:none}.pcui-slider-active{cursor:ew-resize}.pcui-slider-active .pcui-slider-bar{border-color:#20292b;background-color:#20292b}.pcui-slider-active .pcui-slider-handle{border-color:#20292b;background-color:#fff;transition:none}.pcui-slider:not(.pcui-disabled):not(.pcui-readonly):hover{cursor:pointer}.pcui-slider:not(.pcui-disabled):not(.pcui-readonly) .pcui-slider-handle:focus,.pcui-slider:not(.pcui-disabled):not(.pcui-readonly) .pcui-slider-handle:hover{cursor:ew-resize;outline:none;border-color:#20292b;background-color:#fff}.pcui-slider.pcui-readonly .pcui-numeric-input{flex:1}.pcui-slider.pcui-readonly .pcui-slider-bar{display:none}.pcui-slider.pcui-multiple-values .pcui-slider-handle{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8247:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-spinner{display:inline-block;margin:6px;vertical-align:middle}.pcui-spinner>path{animation-name:animation-spin;animation-duration:750ms;animation-iteration-count:infinite;animation-timing-function:linear;transform-origin:center}.pcui-spinner.pcui-error>path{animation:none;fill:#ff2020}.pcui-spinner.pcui-error>path.pcui-spinner-highlight{fill:#f77}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9940:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont,.pcui-text-area-input>textarea{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-text-area-input{min-height:48px;height:auto}.pcui-text-area-input>textarea{resize:none;height:100%;width:calc(100% - 16px);padding:0 8px;line-height:22px;color:inherit;background:transparent;border:none;outline:none;box-shadow:none;min-height:44px;min-width:172px}.pcui-text-area-input.pcui-text-area-input-resizable-none>textarea{resize:none}.pcui-text-area-input.pcui-text-area-input-resizable-both>textarea{resize:both}.pcui-text-area-input.pcui-text-area-input-resizable-horizontal>textarea{resize:horizontal}.pcui-text-area-input.pcui-text-area-input-resizable-vertical>textarea{resize:vertical}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5471:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont,.pcui-text-input.pcui-multiple-values:before,.pcui-text-input>input{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-text-input{display:inline-block;border:1px solid #293538;border-radius:2px;box-sizing:border-box;margin:6px;min-height:24px;height:24px;background-color:#2c393c;vertical-align:top;transition:color 100ms,background-color 100ms,box-shadow 100ms;position:relative;color:#b1b8ba}.pcui-text-input>input{height:100%;width:calc(100% - 16px);padding:0 6px;line-height:1;color:inherit;background:transparent;border:none;outline:none;box-shadow:none}.pcui-text-input:before{color:inherit}.pcui-text-input.pcui-multiple-values:before{position:absolute;padding:0 8px;content:\"...\";white-space:nowrap;top:5px;font-size:12px}.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly):hover{background-color:#293538;color:#fff}.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error):hover{box-shadow:0 0 2px 1px rgba(255,102,0,.3)}.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus{background-color:#20292b;box-shadow:0 0 0 1px rgba(255,102,0,.3)}.pcui-text-input.pcui-focus:after,.pcui-text-input.pcui-focus:before,.pcui-text-input:hover:after,.pcui-text-input:hover:before{display:none}.pcui-text-input.pcui-readonly{background-color:rgba(44,57,60,.7);border-color:transparent}.pcui-text-input.pcui-disabled{color:#5b7073}.pcui-text-input.pcui-error{color:#b1b8ba;box-shadow:0 0 0 1px #d34141}.pcui-text-input[placeholder]{position:relative}.pcui-text-input[placeholder]:after{content:attr(placeholder);background-color:#2c393c;position:absolute;top:0;right:0;padding:0 8px;line-height:22px;font-size:10px;font-weight:600;white-space:nowrap;color:#829193;pointer-events:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3141:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon,.pcui-treeview-item:not(.pcui-treeview-item-empty)>.pcui-treeview-item-contents:before,.pcui-treeview-item-icon:after{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon,.pcui-treeview-item:not(.pcui-treeview-item-empty)>.pcui-treeview-item-contents:before,.pcui-treeview-item-icon:after{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect,.pcui-treeview{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-treeview{min-width:max-content}.pcui-treeview-item{position:relative;padding-left:24px}.pcui-treeview-item:before{content:\" \";position:absolute;background-color:#313e41;width:2px;left:14px;top:-12px;bottom:12px}.pcui-treeview-item:last-child:before{height:25px;bottom:auto}.pcui-treeview-item.pcui-disabled>.pcui-treeview-item-contents>.pcui-treeview-item-text{opacity:.4}.pcui-treeview-item-contents{position:relative;color:#b1b8ba;margin-left:3px;border:1px solid transparent;align-items:center;height:24px;box-sizing:border-box}.pcui-treeview-item-contents:hover{cursor:pointer;color:#fff;background-color:#2c393c}.pcui-treeview-item-contents:hover>.pcui-treeview-item-icon{color:#fff}.pcui-treeview-item-icon{color:#5b7073;margin:0 2px 0 0;flex-shrink:0}.pcui-treeview-item-icon:before{content:\" \";position:absolute;background-color:#313e41;left:-12px;top:10px;width:24px;height:2px}.pcui-treeview-item-icon:after{content:\"\";display:inline-block;vertical-align:sub;width:22px;height:22px;position:relative;z-index:1;text-align:center}.pcui-treeview-item-text{margin:0;flex-shrink:0;position:relative;z-index:1;transition:opacity 100ms;padding-right:8px;color:inherit}.pcui-treeview-item-contents.pcui-treeview-item-selected{background-color:#20292b;color:#fff}.pcui-treeview-item-contents.pcui-treeview-item-selected>.pcui-treeview-item-icon{color:#fff}.pcui-treeview-item:not(.pcui-treeview-item-empty)>.pcui-treeview-item-contents:before{content:\"\";position:absolute;font-size:10px;font-weight:bold;text-align:center;color:#b1b8ba;background-color:#2c393c;top:0;left:-24px;width:16px;height:16px;line-height:16px;margin:3px;cursor:pointer;z-index:1}.pcui-treeview-item:not(.pcui-treeview-item-empty).pcui-treeview-item-open>.pcui-treeview-item-contents:before{content:\"\"}.pcui-treeview>.pcui-treeview-item{padding-left:0}.pcui-treeview>.pcui-treeview-item:before{content:none}.pcui-treeview>.pcui-treeview-item>.pcui-treeview-item-contents{margin-left:0}.pcui-treeview>.pcui-treeview-item>.pcui-treeview-item-contents>.pcui-treeview-item-icon:before{content:none}.pcui-treeview>.pcui-treeview-item>.pcui-treeview-item-contents>.pcui-treeview-item-icon:after{margin-left:0}.pcui-treeview>.pcui-treeview-item>.pcui-treeview-item{padding-left:21px}.pcui-treeview>.pcui-treeview-item>.pcui-treeview-item:before{left:11px}.pcui-treeview:not(.pcui-treeview-filtering)>.pcui-treeview-item .pcui-treeview-item:not(.pcui-treeview-item-open):not(.pcui-treeview-item-empty)>.pcui-treeview-item{display:none}.pcui-treeview-item-dragged>.pcui-treeview-item-contents{background-color:rgba(44,57,60,.5);color:#fff}.pcui-treeview-drag-handle{position:fixed;width:32px;height:20px;top:0;bottom:0;z-index:4;margin-top:-1px;margin-left:-1px}.pcui-treeview-drag-handle.before{border-top:4px solid #f60;padding-right:8px;height:24px}.pcui-treeview-drag-handle.inside{border:4px solid #f60}.pcui-treeview-drag-handle.after{border-bottom:4px solid #f60;padding-right:8px;height:24px}.pcui-treeview-item-contents:after{content:\" \";display:block;clear:both}.pcui-treeview-item.pcui-treeview-item-rename>.pcui-treeview-item-contents>.pcui-treeview-item-text{display:none}.pcui-treeview-item.pcui-treeview-item-rename>.pcui-treeview-item-contents>.pcui-text-input{margin:0;flex-grow:1;box-shadow:none !important;border:0;background-color:transparent}.pcui-treeview-item.pcui-treeview-item-rename>.pcui-treeview-item-contents>.pcui-text-input>input{font-family:inherit;font-size:14px;padding:0}.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item{padding-left:0}.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item::before{display:none}.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item:not(.pcui-treeview-filtering-result)>.pcui-treeview-item-contents{display:none}.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item-contents{margin-left:0}.pcui-treeview-filtering-result .pcui-treeview-item-contents:before,.pcui-treeview-filtering-result .pcui-treeview-item-icon:before{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8307:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex,.pcui-vector-input{flex-direction:column}.pcui-flex:not(.pcui-hidden),.pcui-vector-input:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-vector-input{flex-direction:row;align-items:center}.pcui-vector-input>.pcui-numeric-input{flex:1;margin:6px 3px}.pcui-vector-input>.pcui-numeric-input:first-child{margin-left:0}.pcui-vector-input>.pcui-numeric-input:last-child{margin-right:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2875:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(8922);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "@font-face{font-family:\"pc-icon\";src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot\");src:url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.woff\") format(\"woff\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"),url(\"https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/fonts/PlayIcons-Regular.svg\") format(\"svg\");font-weight:normal;font-style:normal}.font-smooth,.font-icon{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased}.font-thin{font-weight:100;font-style:normal}.font-light{font-weight:200;font-style:normal}.font-regular{font-weight:normal;font-style:normal}.font-bold{font-weight:bold;font-style:normal}.font-icon{font-family:\"pc-icon\"}.fixedFont{font-family:inconsolatamedium,Monaco,Menlo,\"Ubuntu Mono\",Consolas,source-code-pro,monospace;font-weight:normal;font-size:12px}.noSelect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcui-flex{flex-direction:column}.pcui-flex:not(.pcui-hidden){display:-webkit-flex;display:flex}.pcui-grid{display:-ms-grid;display:grid}.pcui-scrollable{overflow:auto}.pcui-hidden{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5980:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(9450);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 3254:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(9599);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 378:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(9977);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 5809:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(6287);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 2144:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(3367);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 3323:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(7848);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 6622:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(5821);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 4935:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(6616);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 2773:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(3606);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 6555:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(5777);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 1107:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(4731);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 1758:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(692);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 7790:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(8555);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 7036:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(6321);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 5049:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(4870);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 5199:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(7817);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 9370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(2383);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 3059:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(3103);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 8589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(2654);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 5345:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(3366);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 7864:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(8247);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 6473:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(9940);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 4922:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(5471);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 3363:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(3141);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 8146:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(8307);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 8503:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(3379);
            var content = __webpack_require__(2875);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 3379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "qt": function() { return /* reexport */ components_ArrayInput; },
  "Ki": function() { return /* reexport */ components_BooleanInput; },
  "zx": function() { return /* reexport */ components_Button; },
  "EK": function() { return /* reexport */ components_Code; },
  "W2": function() { return /* reexport */ components_Container; },
  "xV": function() { return /* reexport */ components_ContextMenu; },
  "iz": function() { return /* reexport */ components_Divider; },
  "W_": function() { return /* reexport */ components_Element; },
  "zG": function() { return /* reexport */ components_GridView; },
  "Zn": function() { return /* reexport */ components_GridViewItem; },
  "T9": function() { return /* reexport */ interfaces_IBindable; },
  "LH": function() { return /* reexport */ interfaces_ICollapsible; },
  "ik": function() { return /* reexport */ interfaces_IFocusable; },
  "Ub": function() { return /* reexport */ interfaces_IFocusable; },
  "g$": function() { return /* reexport */ interfaces_IGrid; },
  "pM": function() { return /* reexport */ interfaces_IResizable; },
  "CQ": function() { return /* reexport */ interfaces_IScrollable; },
  "vD": function() { return /* reexport */ components_InfoBox; },
  "__": function() { return /* reexport */ components_Label; },
  "ee": function() { return /* reexport */ components_LabelGroup; },
  "Af": function() { return /* reexport */ components_NumericInput; },
  "aV": function() { return /* reexport */ components_Overlay; },
  "s_": function() { return /* reexport */ components_Panel; },
  "Ex": function() { return /* reexport */ components_Progress; },
  "lq": function() { return /* reexport */ components_SelectInput; },
  "a": function() { return /* reexport */ components_SliderInput; },
  "$j": function() { return /* reexport */ components_Spinner; },
  "Fz": function() { return /* reexport */ components_TextAreaInput; },
  "oi": function() { return /* reexport */ components_TextInput; },
  "LQ": function() { return /* reexport */ components_TreeView; },
  "A7": function() { return /* reexport */ components_TreeViewItem; },
  "Uy": function() { return /* reexport */ components_VectorInput; }
});

;// CONCATENATED MODULE: ./src/interfaces/IBindable/index.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name IBindable
 * @classdesc Provides an interface for getting / setting a value for the Element.
 * @property {*} value - Gets / sets the value of the Element.
 * @property {Array<*>} values - Sets multiple values to the Element. It is up to the Element to determine how to display them.
 */
var IBindable = function IBindable() {
  _classCallCheck(this, IBindable);
};
/**
 * @event
 * @name IBindable#change
 * @description Fired when the value of the Element changes
 * @param {*} value - The new value
 */


/* harmony default export */ var interfaces_IBindable = (IBindable);
;// CONCATENATED MODULE: ./src/interfaces/IFocusable/index.js
function IFocusable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @name IFocusable
 * @classdesc Provides an interface for focusing / unfocusing an Element.
 */
var IFocusable = /*#__PURE__*/function () {
  function IFocusable() {
    IFocusable_classCallCheck(this, IFocusable);
  }

  _createClass(IFocusable, [{
    key: "focus",
    value:
    /**
     * Focus on the element
     */
    function focus() {
      throw new Error('Not implemented');
    }
    /**
     * Unfocus the element
     */

  }, {
    key: "blur",
    value: function blur() {
      throw new Error('Not implemented');
    }
  }]);

  return IFocusable;
}();
/**
 * @event
 * @name IFocusable#focus
 * @description Fired when the element is focused
 */

/**
 * @event
 * @name IFocusable#blur
 * @description Fired when the element is blurred (unfocused)
 */


/* harmony default export */ var interfaces_IFocusable = (IFocusable);
;// CONCATENATED MODULE: ./src/interfaces/ICollapsible/index.js
function ICollapsible_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name ICollapsible
 * @property {boolean} collapsible Gets / sets whether the Element is collapsible.
 * @property {boolean} collapsed Gets / sets whether the Element should be collapsed.
 * @classdesc Provides an interface to allow collapsing / expanding of an Element.
 */
var ICollapsible = function ICollapsible() {
  ICollapsible_classCallCheck(this, ICollapsible);
};
/**
 * @event
 * @name ICollapsible#collapse
 * @description Fired when the element gets collapsed
 */

/**
 * @event
 * @name ICollapsible#expand
 * @description Fired when the element gets expanded
 */


/* harmony default export */ var interfaces_ICollapsible = (ICollapsible);
;// CONCATENATED MODULE: ./src/interfaces/IGrid/index.js
function IGrid_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name IGrid
 * @property {boolean} grid Gets / sets whether the Element supports the grid layout.
 * @classdesc Provides an interface for allowing support for the grid CSS layout
 */
var IGrid = function IGrid() {
  IGrid_classCallCheck(this, IGrid);
};

/* harmony default export */ var interfaces_IGrid = (IGrid);
;// CONCATENATED MODULE: ./src/interfaces/IScrollable/index.js
function IScrollable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name IScrollable
 * @classdesc Provides an interface for allowing scrolling on an Element.
 * @property {boolean} scrollable - Gets / sets whether the Element should be scrollable.
 */
var IScrollable = function IScrollable() {
  IScrollable_classCallCheck(this, IScrollable);
};
/**
 * @event
 * @name IScrollable#scroll
 * @description Fired when the Element is scrolled.
 * @param {Event} evt - The native scroll event.
 */


/* harmony default export */ var interfaces_IScrollable = (IScrollable);
;// CONCATENATED MODULE: ./src/interfaces/IResizable/index.js
function IResizable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name IResizable
 * @classdesc Provides an interface for enabling resizing support for an Element
 * @property {number} resizeMin - Gets / sets the minimum size the Element can take when resized in pixels.
 * @property {number} resizeMax - Gets / sets the maximum size the Element can take when resized in pixels.
 * @property {string} resizable - Gets / sets whether the Element is resizable and where the resize handle is located. Can
 * be one of 'top', 'bottom', 'right', 'left'. Set to null to disable resizing.
 */
var IResizable = function IResizable() {
  IResizable_classCallCheck(this, IResizable);
};
/**
 * @event
 * @name IResizable#resize
 * @description Fired when the Element gets resized.
 */


/* harmony default export */ var interfaces_IResizable = (IResizable);
;// CONCATENATED MODULE: ./src/helpers/utils.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = {}; // utils.deepCopy

utils.deepCopy = function deepCopy(data) {
  if (data == null || _typeof(data) !== 'object') return data;

  if (data instanceof Array) {
    var arr = [];

    for (var i = 0; i < data.length; i++) {
      arr[i] = deepCopy(data[i]);
    }

    return arr;
  }

  var obj = {};

  for (var key in data) {
    if (data.hasOwnProperty(key)) obj[key] = deepCopy(data[key]);
  }

  return obj;
};

utils.isMobile = function () {
  return /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
/**
 * @name utils.implements
 * @description Adds properties and methods from the sourceClass
 * to the targetClass but only if properties with the same name do not
 * already exist in the targetClass.
 * @param {object} targetClass - The target class.
 * @param {object} sourceClass - The source class.
 * @example utils.implements(pcui.Container, pcui.IContainer);
 */


utils.implements = function (targetClass, sourceClass) {
  var properties = Object.getOwnPropertyDescriptors(sourceClass.prototype);

  for (var key in properties) {
    if (targetClass.prototype.hasOwnProperty(key)) {
      delete properties[key];
    }
  }

  Object.defineProperties(targetClass.prototype, properties);
};
/**
 * @name utils.proxy
 * @description Creates new properties on the target class that get / set
 * the properties of the member.
 * @param {object} targetClass - The target class
 * @param {string} memberName - The name of the member of the target class that properties will be proxied to.
 * @param {string[]} properties - A list of properties to be proxied.
 * @example
 * utils.proxy(pcui.SliderInput, '_numericInput', ['max', 'min', 'placeholder']);
 */


utils.proxy = function (targetClass, memberName, properties) {
  properties.forEach(function (property) {
    Object.defineProperty(targetClass.prototype, property, {
      get: function get() {
        return this[memberName][property];
      },
      set: function set(value) {
        this[memberName][property] = value;
      }
    });
  });
}; // String.startsWith


if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value(str) {
      var that = this;
      var ceil = str.length;

      for (var i = 0; i < ceil; i++) {
        if (that[i] !== str[i]) return false;
      }

      return true;
    }
  });
} // String.endsWith polyfill


if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value(str) {
      var that = this;

      for (var i = 0, ceil = str.length; i < ceil; i++) {
        if (that[i + that.length - ceil] !== str[i]) return false;
      }

      return true;
    }
  });
} // Appends query parameter to string (supposedly the string is a URL)
// automatically figuring out if the separator should be ? or &.
// Example: url.appendQuery('t=123').appendQuery('q=345');


if (!String.prototype.appendQuery) {
  Object.defineProperty(String.prototype, 'appendQuery', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value(queryParameter) {
      var separator = this.indexOf('?') !== -1 ? '&' : '?';
      return this + separator + queryParameter;
    }
  });
}

utils.arrayEquals = function (lhs, rhs) {
  if (!lhs) return false;
  if (!rhs) return false;
  if (lhs.length !== rhs.length) return false;

  for (var i = 0, l = lhs.length; i < l; i++) {
    if (this[i] instanceof Array && rhs[i] instanceof Array) {
      if (!this[i].equals(rhs[i])) return false;
    } else if (this[i] !== rhs[i]) {
      return false;
    }
  }

  return true;
}; // element.classList.add polyfill


(function () {
  var dummy = document.createElement('div'),
      dtp = DOMTokenList.prototype,
      add = dtp.add,
      rem = dtp.remove;
  dummy.classList.add('class1', 'class2'); // Older versions of the HTMLElement.classList spec didn't allow multiple
  // arguments, easy to test for

  if (!dummy.classList.contains('class2')) {
    dtp.add = function () {
      Array.prototype.forEach.call(arguments, add.bind(this));
    };

    dtp.remove = function () {
      Array.prototype.forEach.call(arguments, rem.bind(this));
    };
  }
})();

var bytesToHuman = function bytesToHuman(bytes) {
  if (isNaN(bytes) || bytes === 0) return '0 B';
  var k = 1000;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}; // todo move this into proper library
// replace the oldExtension in a path with the newExtension
// return the new path
// oldExtension and newExtension should have leading period

var swapExtension = function swapExtension(path, oldExtension, newExtension) {
  while (path.indexOf(oldExtension) >= 0) {
    path = path.replace(oldExtension, newExtension);
  }

  return path;
};
/* harmony default export */ var helpers_utils = (utils);
// EXTERNAL MODULE: ./src/components/ArrayInput/style.scss
var style = __webpack_require__(5980);
// EXTERNAL MODULE: ./src/components/Element/style.scss
var Element_style = __webpack_require__(2773);
;// CONCATENATED MODULE: ./src/class.js
var FLEX = 'pcui-flex';
var GRID = 'pcui-grid';
var HIDDEN = 'pcui-hidden';
var SCROLLABLE = 'pcui-scrollable';
var RESIZABLE = 'pcui-resizable';
var READONLY = 'pcui-readonly';
var DISABLED = 'pcui-disabled';
var COLLAPSIBLE = 'pcui-collapsible';
var COLLAPSED = 'pcui-collapsed';
var FOCUS = 'pcui-focus';
var MULTIPLE_VALUES = 'pcui-multiple-values';
var ERROR = 'pcui-error';
var FLASH = 'flash';
var NOT_FLEXIBLE = 'pcui-not-flexible';
var DEFAULT_MOUSEDOWN = 'pcui-default-mousedown';
var FONT_REGULAR = 'font-regular';
var FONT_BOLD = 'font-bold';

// EXTERNAL MODULE: ./src/binding/events.js
var events = __webpack_require__(9006);
;// CONCATENATED MODULE: ./src/components/Element/index.js
function Element_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_typeof(obj); }

function Element_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Element_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Element_createClass(Constructor, protoProps, staticProps) { if (protoProps) Element_defineProperties(Constructor.prototype, protoProps); if (staticProps) Element_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (Element_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/* global BindingBase */

/* global Observer */

var CLASS_ELEMENT = 'pcui-element'; // these are properties that are
// available as Element properties and
// can also be set through the Element constructor

var SIMPLE_CSS_PROPERTIES = ['flexDirection', 'flexGrow', 'flexBasis', 'flexShrink', 'flexWrap', 'alignItems', 'alignSelf', 'justifyContent', 'justifySelf']; // Stores Element types by name and default arguments

var ELEMENT_REGISTRY = {};
/**
 * @event
 * @name Element#enable
 * @description Fired when the Element gets enabled
 */

/**
 * @event
 * @name Element#disable
 * @description Fired when the Element gets disabled
 */

/**
 * @event
 * @name Element#hide
 * @description Fired when the Element gets hidden
 */

/**
 * @event
 * @name Element#hideToRoot
 * @description Fired when the Element or any of its parent get hidden
 */

/**
 * @event
 * @name Element#show
 * @description Fired when the Element stops being hidden
 */

/**
 * @event
 * @name Element#showToRoot
 * @description Fired when the Element and all of its parents become visible
 */

/**
 * @event
 * @name Element#readOnly
 * @param {boolean} readOnly - Whether the Element is now read only
 * @description Fired when the readOnly property of an Element changes
 */

/**
 * @event
 * @name Element#parent
 * @description Fired when the Element's parent gets set
 * @param {Element} parent - The new parent
 */

/**
 * @event
 * @name Element#click
 * @description Fired when the mouse is clicked on the Element but only if the Element is enabled.
 * @param {Event} evt - The native mouse event.
 */

/**
 * @event
 * @name Element#hover
 * @description Fired when the mouse starts hovering on the Element
 * @param {Event} evt - The native mouse event.
 */

/**
 * @event
 * @name Element#hoverend
 * @description Fired when the mouse stops hovering on the Element
 * @param {Event} evt - The native mouse event.
 */

/**
 * @event
 * @name Element#destroy
 * @description Fired after the element has been destroyed.
 * @param {HTMLElement} dom - The DOM element
 * @param {Element} element - The element
 */

/**
 * @event
 * @name Element#hoverend
 * @description Fired when the mouse stops hovering on the Element
 * @param {Event} evt - The native mouse event.
 */

/**
 * @name Element
 * @classdesc The base class for all UI elements.
 * @augments Events
 * @property {boolean} enabled=true Gets / sets whether the Element or its parent chain is enabled or not. Defaults to true.
 * @property {HTMLElement} dom Gets the root DOM node for this Element.
 * @property {Element} parent Gets the parent Element.
 * @property {boolean} hidden Gets / sets whether the Element is hidden.
 * @property {boolean} hiddenToRoot Gets whether the Element is hidden all the way up to the root. If the Element itself or any of its parents are hidden then this is true.
 * @property {boolean} readOnly Gets / sets whether the Element is read only.
 * @property {boolean} ignoreParent Gets / sets whether the Element will ignore parent events & variable states.
 * @property {number} width Gets / sets the width of the Element in pixels. Can also be an empty string to remove it.
 * @property {number} height Gets / sets the height of the Element in pixels. Can also be an empty string to remove it.
 * @property {number} tabIndex Gets / sets the tabIndex of the Element.
 * @property {boolean} error Gets / sets whether the Element is in an error state.
 * @property {BindingBase} binding Gets / sets the Binding object for the element.
 * @property {CSSStyleDeclaration} style Shortcut to pcui.Element.dom.style.
 * @property {DOMTokenList} class Shortcut to pcui.Element.dom.classList.
 */

var Element = /*#__PURE__*/function (_Events) {
  _inherits(Element, _Events);

  var _super = _createSuper(Element);

  /**
   * Creates a new Element.
   *
   * @param {HTMLElement} dom - The DOM element that this pcui.Element wraps.
   * @param {object} args - The arguments. All settable properties can also be set through the constructor.
   * @param {string} [args.id] - The desired id for the Element HTML node.
   * @param {string|string[]} [args.class] - The CSS class or classes we want to add to the element.
   * @param {boolean} [args.isRoot] - If true then this is the root element. Set this to true for the topmost Element in your page.
   */
  function Element(dom, args) {
    var _this;

    Element_classCallCheck(this, Element);

    _this = _super.call(this);
    if (!args) args = {};
    _this._destroyed = false;
    _this._parent = null;
    _this._domEventClick = _this._onClick.bind(_assertThisInitialized(_this));
    _this._domEventMouseOver = _this._onMouseOver.bind(_assertThisInitialized(_this));
    _this._domEventMouseOut = _this._onMouseOut.bind(_assertThisInitialized(_this));
    _this._eventsParent = [];
    _this._dom = dom || args.dom || document.createElement('div');

    if (args.id !== undefined) {
      _this._dom.id = args.id;
    } // add ui reference


    _this._dom.ui = _assertThisInitialized(_this); // add event listeners

    _this._dom.addEventListener('click', _this._domEventClick);

    _this._dom.addEventListener('mouseover', _this._domEventMouseOver);

    _this._dom.addEventListener('mouseout', _this._domEventMouseOut); // add element class


    _this._dom.classList.add(CLASS_ELEMENT); // add font regular class


    _this._dom.classList.add(FONT_REGULAR); // add user classes


    if (args.class) {
      if (Array.isArray(args.class)) {
        for (var i = 0; i < args.class.length; i++) {
          _this._dom.classList.add(args.class[i]);
        }
      } else {
        _this._dom.classList.add(args.class);
      }
    }

    _this.enabled = args.enabled !== undefined ? args.enabled : true;
    _this._hiddenParents = !args.isRoot;
    _this.hidden = args.hidden || false;
    _this.readOnly = args.readOnly || false;
    _this.ignoreParent = args.ignoreParent || false;

    if (args.width !== undefined) {
      _this.width = args.width;
    }

    if (args.height !== undefined) {
      _this.height = args.height;
    }

    if (args.tabIndex !== undefined) {
      _this.tabIndex = args.tabIndex;
    } // copy CSS properties from args


    for (var key in args) {
      if (args[key] === undefined) continue;

      if (SIMPLE_CSS_PROPERTIES.indexOf(key) !== -1) {
        _this[key] = args[key];
      }
    } // set the binding object


    if (args.binding) {
      _this.binding = args.binding;
    }

    _this._flashTimeout = null;
    return _this;
  }
  /**
   * @name Element#link
   * @description Links the specified observers and paths to the Element's data binding.
   * @param {Observer|Observer[]} observers - An array of observers or a single observer.
   * @param {string|string[]} paths - A path for the observer(s) or an array of paths that maps to each separate observer.
   */


  Element_createClass(Element, [{
    key: "link",
    value: function link(observers, paths) {
      if (this._binding) {
        this._binding.link(observers, paths);
      }
    }
    /**
     * @name Element#unlink
     * @description Unlinks the Element from its observers
     */

  }, {
    key: "unlink",
    value: function unlink() {
      if (this._binding) {
        this._binding.unlink();
      }
    }
    /**
     * @name Element#flash
     * @description Triggers a flash animation on the Element.
     */

  }, {
    key: "flash",
    value: function flash() {
      if (this._flashTimeout) return;
      this.classAdd(FLASH);
      this._flashTimeout = setTimeout(function () {
        this._flashTimeout = null;
        this.classRemove(FLASH);
      }.bind(this), 200);
    }
  }, {
    key: "_onClick",
    value: function _onClick(evt) {
      if (this.enabled) {
        this.emit('click', evt);
      }
    }
  }, {
    key: "_onMouseOver",
    value: function _onMouseOver(evt) {
      this.emit('hover', evt);
    }
  }, {
    key: "_onMouseOut",
    value: function _onMouseOut(evt) {
      this.emit('hoverend', evt);
    }
  }, {
    key: "_onHiddenToRootChange",
    value: function _onHiddenToRootChange(hiddenToRoot) {
      if (hiddenToRoot) {
        this.emit('hideToRoot');
      } else {
        this.emit('showToRoot');
      }
    }
  }, {
    key: "_onEnabledChange",
    value: function _onEnabledChange(enabled) {
      if (enabled) {
        this.classRemove(DISABLED);
      } else {
        this.classAdd(DISABLED);
      }

      this.emit(enabled ? 'enable' : 'disable');
    }
  }, {
    key: "_onParentDestroy",
    value: function _onParentDestroy() {
      this.destroy();
    }
  }, {
    key: "_onParentDisable",
    value: function _onParentDisable() {
      if (this._ignoreParent) return;

      if (this._enabled) {
        this._onEnabledChange(false);
      }
    }
  }, {
    key: "_onParentEnable",
    value: function _onParentEnable() {
      if (this._ignoreParent) return;

      if (this._enabled) {
        this._onEnabledChange(true);
      }
    }
  }, {
    key: "_onParentShowToRoot",
    value: function _onParentShowToRoot() {
      var oldHiddenToRoot = this.hiddenToRoot;
      this._hiddenParents = false;

      if (oldHiddenToRoot !== this.hiddenToRoot) {
        this._onHiddenToRootChange(this.hiddenToRoot);
      }
    }
  }, {
    key: "_onParentHideToRoot",
    value: function _onParentHideToRoot() {
      var oldHiddenToRoot = this.hiddenToRoot;
      this._hiddenParents = true;

      if (oldHiddenToRoot !== this.hiddenToRoot) {
        this._onHiddenToRootChange(this.hiddenToRoot);
      }
    }
  }, {
    key: "_onReadOnlyChange",
    value: function _onReadOnlyChange(readOnly) {
      if (readOnly) {
        this.classAdd(READONLY);
      } else {
        this.classRemove(READONLY);
      }

      this.emit('readOnly', readOnly);
    }
  }, {
    key: "_onParentReadOnlyChange",
    value: function _onParentReadOnlyChange(readOnly) {
      if (this._ignoreParent) return;

      if (readOnly) {
        if (!this._readOnly) {
          this._onReadOnlyChange(true);
        }
      } else {
        if (!this._readOnly) {
          this._onReadOnlyChange(false);
        }
      }
    }
    /**
     * @name Element#classAdd
     * @description Adds the specified class to the DOM element but checks if the classList contains it first.
     * @param {string} cls - The class to add
     */

  }, {
    key: "classAdd",
    value: function classAdd(cls) {
      var classList = this._dom.classList;

      if (!classList.contains(cls)) {
        classList.add(cls);
      }
    }
    /**
     * @name Element#classRemove
     * @description Removes the specified class from the DOM element but checks if the classList contains it first.
     * @param {string} cls - The class to remove
     */

  }, {
    key: "classRemove",
    value: function classRemove(cls) {
      var classList = this._dom.classList;

      if (classList.contains(cls)) {
        classList.remove(cls);
      }
    }
    /**
     * @name Element#destroy
     * @description Destroys the Element and its events.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this._destroyed = true;

      if (this.binding) {
        this.binding = null;
      } else {
        this.unlink();
      }

      if (this.parent) {
        var parent = this.parent;

        for (var i = 0; i < this._eventsParent.length; i++) {
          this._eventsParent[i].unbind();
        }

        this._eventsParent.length = 0; // remove element from parent
        // check if parent has been destroyed already
        // because we do not want to be emitting events
        // on a destroyed parent after it's been destroyed
        // as it is easy to lead to null exceptions

        if (parent.remove && !parent._destroyed) {
          parent.remove(this);
        } // set parent to null and remove from
        // parent dom just in case parent.remove above
        // didn't work because of an override or other condition


        this._parent = null; // Do not manually call removeChild for elements whose parent has already been destroyed.
        // For example when we destroy a TreeViewItem that has many child nodes, that will trigger every child Element to call dom.parentElement.removeChild(dom).
        // But we don't need to remove all these DOM elements from their parents since the root DOM element is destroyed anyway.
        // This has a big impact on destroy speed in certain cases.

        if (!parent._destroyed && this._dom && this._dom.parentElement) {
          this._dom.parentElement.removeChild(this._dom);
        }
      }

      var dom = this._dom;

      if (dom) {
        // remove event listeners
        dom.removeEventListener('click', this._domEventClick);
        dom.removeEventListener('mouseover', this._domEventMouseOver);
        dom.removeEventListener('mouseout', this._domEventMouseOut); // remove ui reference

        delete dom.ui;
        this._dom = null;
      }

      this._domEventClick = null;
      this._domEventMouseOver = null;
      this._domEventMouseOut = null;

      if (this._flashTimeout) {
        clearTimeout(this._flashTimeout);
      }

      this.emit('destroy', dom, this);
      this.unbind();
    }
    /**
     * @static
     * @param {string} type - The type we want to reference this Element by
     * @param {object} cls - The actual class of the Element
     * @param {object} [defaultArguments] - Default arguments when creating this type
     */

  }, {
    key: "enabled",
    get: function get() {
      if (this._ignoreParent) return this._enabled;
      return this._enabled && (!this._parent || this._parent.enabled);
    },
    set: function set(value) {
      if (this._enabled === value) return; // remember if enabled in hierarchy

      var enabled = this.enabled;
      this._enabled = value; // only fire event if hierarchy state changed

      if (enabled !== value) {
        this._onEnabledChange(value);
      }
    }
  }, {
    key: "ignoreParent",
    get: function get() {
      return this._ignoreParent;
    },
    set: function set(value) {
      this._ignoreParent = value;

      this._onEnabledChange(this.enabled);

      this._onReadOnlyChange(this.readOnly);
    }
  }, {
    key: "dom",
    get: function get() {
      return this._dom;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    },
    set: function set(value) {
      if (value === this._parent) return;
      var oldEnabled = this.enabled;
      var oldReadonly = this.readOnly;
      var oldHiddenToRoot = this.hiddenToRoot;

      if (this._parent) {
        for (var i = 0; i < this._eventsParent.length; i++) {
          this._eventsParent[i].unbind();
        }

        this._eventsParent.length = 0;
      }

      this._parent = value;

      if (this._parent) {
        this._eventsParent.push(this._parent.once('destroy', this._onParentDestroy.bind(this)));

        this._eventsParent.push(this._parent.on('disable', this._onParentDisable.bind(this)));

        this._eventsParent.push(this._parent.on('enable', this._onParentEnable.bind(this)));

        this._eventsParent.push(this._parent.on('readOnly', this._onParentReadOnlyChange.bind(this)));

        this._eventsParent.push(this._parent.on('showToRoot', this._onParentShowToRoot.bind(this)));

        this._eventsParent.push(this._parent.on('hideToRoot', this._onParentHideToRoot.bind(this)));

        this._hiddenParents = this._parent.hiddenToRoot;
      } else {
        this._hiddenParents = true;
      }

      this.emit('parent', this._parent);
      var newEnabled = this.enabled;

      if (newEnabled !== oldEnabled) {
        this._onEnabledChange(newEnabled);
      }

      var newReadonly = this.readOnly;

      if (newReadonly !== oldReadonly) {
        this._onReadOnlyChange(newReadonly);
      }

      var hiddenToRoot = this.hiddenToRoot;

      if (hiddenToRoot !== oldHiddenToRoot) {
        this._onHiddenToRootChange(hiddenToRoot);
      }
    }
  }, {
    key: "hidden",
    get: function get() {
      return this._hidden;
    },
    set: function set(value) {
      if (value === this._hidden) return;
      var oldHiddenToRoot = this.hiddenToRoot;
      this._hidden = value;

      if (value) {
        this.classAdd(HIDDEN);
      } else {
        this.classRemove(HIDDEN);
      }

      this.emit(value ? 'hide' : 'show');

      if (this.hiddenToRoot !== oldHiddenToRoot) {
        this._onHiddenToRootChange(this.hiddenToRoot);
      }
    }
  }, {
    key: "hiddenToRoot",
    get: function get() {
      return this._hidden || this._hiddenParents;
    }
  }, {
    key: "readOnly",
    get: function get() {
      if (this._ignoreParent) return this._readOnly;
      return this._readOnly || !!(this._parent && this._parent.readOnly);
    },
    set: function set(value) {
      if (this._readOnly === value) return;
      this._readOnly = value;

      this._onReadOnlyChange(value);
    }
  }, {
    key: "error",
    get: function get() {
      return this._hasError;
    },
    set: function set(value) {
      if (this._hasError === value) return;
      this._hasError = value;

      if (value) {
        this.classAdd(ERROR);
      } else {
        this.classRemove(ERROR);
      }
    }
  }, {
    key: "style",
    get: function get() {
      return this._dom.style;
    }
  }, {
    key: "class",
    get: function get() {
      return this._dom.classList;
    }
  }, {
    key: "width",
    get: function get() {
      return this._dom.clientWidth;
    },
    set: function set(value) {
      if (typeof value === 'number') {
        value += 'px';
      }

      this.style.width = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this._dom.clientHeight;
    },
    set: function set(value) {
      if (typeof value === 'number') {
        value += 'px';
      }

      this.style.height = value;
    }
  }, {
    key: "tabIndex",
    get: function get() {
      return this._dom.tabIndex;
    },
    set: function set(value) {
      this._dom.tabIndex = value;
    }
  }, {
    key: "binding",
    get: function get() {
      return this._binding;
    },
    set: function set(value) {
      if (this._binding === value) return;
      var prevObservers;
      var prevPaths;

      if (this._binding) {
        prevObservers = this._binding.observers;
        prevPaths = this._binding.paths;
        this.unlink();
        this._binding.element = null;
        this._binding = null;
      }

      this._binding = value;

      if (this._binding) {
        this._binding.element = this;

        if (prevObservers && prevPaths) {
          this.link(prevObservers, prevPaths);
        }
      }
    }
  }, {
    key: "destroyed",
    get: function get() {
      return this._destroyed;
    }
    /*  Backwards Compatibility */
    // we should remove those after we migrate

  }, {
    key: "disabled",
    get: function get() {
      return !this.enabled;
    },
    set: function set(value) {
      this.enabled = !value;
    }
  }, {
    key: "element",
    get: function get() {
      return this.dom;
    },
    set: function set(value) {
      this.dom = value;
    }
  }, {
    key: "innerElement",
    get: function get() {
      return this.domContent;
    },
    set: function set(value) {
      this.domContent = value;
    }
  }], [{
    key: "register",
    value: function register(type, cls, defaultArguments) {
      ELEMENT_REGISTRY[type] = {
        cls: cls,
        defaultArguments: defaultArguments
      };
    }
    /**
     * @static
     * @param {string} type - The type we want to unregister
     */

  }, {
    key: "unregister",
    value: function unregister(type) {
      delete ELEMENT_REGISTRY[type];
    }
    /**
     * @static
     * @param {string} type - The type of the Element (registered by pcui.Element#register)
     * @param {object} args - Arguments for the Element
     * @returns {Element} A new pcui.Element of the desired type
     */

  }, {
    key: "create",
    value: function create(type, args) {
      var entry = ELEMENT_REGISTRY[type];

      if (!entry) {
        console.error('Invalid type passed to pcui.Element#create', type);
        return;
      }

      var cls = entry.cls;
      var clsArgs = {};

      if (entry.defaultArguments) {
        Object.assign(clsArgs, entry.defaultArguments);
      }

      if (args) {
        Object.assign(clsArgs, args);
      }

      return new cls(clsArgs);
    }
  }]);

  return Element;
}(events/* default */.Z); // utility function to expose a CSS property
// via an Element.prototype property


function exposeCssProperty(name) {
  Object.defineProperty(Element.prototype, name, {
    get: function get() {
      return this.style[name];
    },
    set: function set(value) {
      this.style[name] = value;
    }
  });
} // expose rest of CSS properties


SIMPLE_CSS_PROPERTIES.forEach(exposeCssProperty);
/* harmony default export */ var components_Element = (Element);
// EXTERNAL MODULE: ./src/components/Container/style.scss
var Container_style = __webpack_require__(3323);
;// CONCATENATED MODULE: ./src/components/Container/index.js
function Container_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Container_typeof = function _typeof(obj) { return typeof obj; }; } else { Container_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Container_typeof(obj); }

function Container_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Container_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Container_createClass(Constructor, protoProps, staticProps) { if (protoProps) Container_defineProperties(Constructor.prototype, protoProps); if (staticProps) Container_defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Container_getPrototypeOf(object); if (object === null) break; } return object; }

function Container_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Container_setPrototypeOf(subClass, superClass); }

function Container_setPrototypeOf(o, p) { Container_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Container_setPrototypeOf(o, p); }

function Container_createSuper(Derived) { var hasNativeReflectConstruct = Container_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Container_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Container_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Container_possibleConstructorReturn(this, result); }; }

function Container_possibleConstructorReturn(self, call) { if (call && (Container_typeof(call) === "object" || typeof call === "function")) { return call; } return Container_assertThisInitialized(self); }

function Container_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Container_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Container_getPrototypeOf(o) { Container_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Container_getPrototypeOf(o); }




var RESIZE_HANDLE_SIZE = 4;
var VALID_RESIZABLE_VALUES = [null, 'top', 'right', 'bottom', 'left'];
var CLASS_RESIZING = RESIZABLE + '-resizing';
var CLASS_RESIZABLE_HANDLE = 'pcui-resizable-handle';
var CLASS_CONTAINER = 'pcui-container';
var CLASS_DRAGGED = CLASS_CONTAINER + '-dragged';
var CLASS_DRAGGED_CHILD = CLASS_DRAGGED + '-child';
/**
 * @event
 * @name Container#append
 * @description Fired when a child Element gets added to the Container
 * @param {Element} element - The element that was added
 */

/**
 * @event
 * @name Container#remove
 * @description Fired when a child Element gets removed from the Container
 * @param {Element} element - The element that was removed
 */

/**
 * @event
 * @name Container#scroll
 * @description Fired when the container is scrolled.
 * @param {Event} evt - The native scroll event.
 */

/**
 * @event
 * @name Container#resize
 * @description Fired when the container gets resized using the resize handle.
 */

/**
 * @name Container
 * @classdesc A container is the basic building block for Elements that are grouped together.
 * A container can contain any other element including other containers.
 * @augments Element
 * @mixes IContainer
 * @mixes IFlex
 * @mixes IGrid
 * @mixes IScrollable
 * @mixes IResizable
 */

var Container = /*#__PURE__*/function (_Element) {
  Container_inherits(Container, _Element);

  var _super = Container_createSuper(Container);

  /**
   * Creates a new Container.
   *
   * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
   * @param {HTMLElement} [args.dom] - The DOM element to use for the container. If unspecified a new element will be created.
   */
  function Container(args) {
    var _this;

    Container_classCallCheck(this, Container);

    if (!args) args = {};
    var dom = args.dom || document.createElement('div');
    _this = _super.call(this, dom, args);

    _this.class.add(CLASS_CONTAINER);

    _this._domEventScroll = _this._onScroll.bind(Container_assertThisInitialized(_this));
    _this.domContent = _this._dom; // scroll

    _this._scrollable = false;

    if (args.scrollable) {
      _this.scrollable = true;
    } // flex


    _this._flex = false;
    _this.flex = !!args.flex; // grid

    _this._grid = false;
    var grid = !!args.grid;

    if (grid) {
      if (_this.flex) {
        console.error('Invalid pcui.Container arguments: "grid" and "flex" cannot both be true.');
        grid = false;
      }
    }

    _this.grid = grid; // resize related

    _this._domResizeHandle = null;
    _this._domEventResizeStart = _this._onResizeStart.bind(Container_assertThisInitialized(_this));
    _this._domEventResizeMove = _this._onResizeMove.bind(Container_assertThisInitialized(_this));
    _this._domEventResizeEnd = _this._onResizeEnd.bind(Container_assertThisInitialized(_this));
    _this._domEventResizeTouchStart = _this._onResizeTouchStart.bind(Container_assertThisInitialized(_this));
    _this._domEventResizeTouchMove = _this._onResizeTouchMove.bind(Container_assertThisInitialized(_this));
    _this._domEventResizeTouchEnd = _this._onResizeTouchEnd.bind(Container_assertThisInitialized(_this));
    _this._resizeTouchId = null;
    _this._resizeData = null;
    _this._resizeHorizontally = true;
    _this.resizable = args.resizable || null;
    _this._resizeMin = 100;
    _this._resizeMax = 300;

    if (args.resizeMin !== undefined) {
      _this.resizeMin = args.resizeMin;
    }

    if (args.resizeMax !== undefined) {
      _this.resizeMax = args.resizeMax;
    }

    _this._draggedStartIndex = -1;
    return _this;
  }
  /**
   * @name Container#append
   * @description Appends an element to the container.
   * @param {Element} element - The element to append.
   * @fires 'append'
   */


  Container_createClass(Container, [{
    key: "append",
    value: function append(element) {
      var dom = this._getDomFromElement(element);

      this._domContent.appendChild(dom);

      this._onAppendChild(element);
    }
    /**
     * @name Container#appendBefore
     * @description Appends an element to the container before the specified reference element.
     * @param {Element} element - The element to append.
     * @param {Element} referenceElement - The element before which the element will be appended.
     * @fires 'append'
     */

  }, {
    key: "appendBefore",
    value: function appendBefore(element, referenceElement) {
      var dom = this._getDomFromElement(element);

      this._domContent.appendChild(dom);

      var referenceDom = referenceElement && this._getDomFromElement(referenceElement);

      this._domContent.insertBefore(dom, referenceDom);

      this._onAppendChild(element);
    }
    /**
     * @name Container#appendAfter
     * @description Appends an element to the container just after the specified reference element.
     * @param {Element} element - The element to append.
     * @param {Element} referenceElement - The element after which the element will be appended.
     * @fires 'append'
     */

  }, {
    key: "appendAfter",
    value: function appendAfter(element, referenceElement) {
      var dom = this._getDomFromElement(element);

      var referenceDom = referenceElement && this._getDomFromElement(referenceElement);

      var elementBefore = referenceDom ? referenceDom.nextSibling : null;

      if (elementBefore) {
        this._domContent.insertBefore(dom, elementBefore);
      } else {
        this._domContent.appendChild(dom);
      }

      this._onAppendChild(element);
    }
    /**
     * @name Container#prepend
     * @description Inserts an element in the beginning of the container.
     * @param {Element} element - The element to prepend.
     * @fires 'append'
     */

  }, {
    key: "prepend",
    value: function prepend(element) {
      var dom = this._getDomFromElement(element);

      var first = this._domContent.firstChild;

      if (first) {
        this._domContent.insertBefore(dom, first);
      } else {
        this._domContent.appendChild(dom);
      }

      this._onAppendChild(element);
    }
    /**
     * @name Container#remove
     * @description Removes the specified child element from the container.
     * @param {Element} element - The element to remove.
     * @fires 'remove'
     */

  }, {
    key: "remove",
    value: function remove(element) {
      if (element.parent !== this) return;

      var dom = this._getDomFromElement(element);

      this._domContent.removeChild(dom);

      this._onRemoveChild(element);
    }
    /**
     * @name Container#move
     * @description Moves the specified child at the specified index.
     * @param {Element} element - The element to move.
     * @param {number} index - The index
     */

  }, {
    key: "move",
    value: function move(element, index) {
      var idx = -1;

      for (var i = 0; i < this.dom.childNodes.length; i++) {
        if (this.dom.childNodes[i].ui === element) {
          idx = i;
          break;
        }
      }

      if (idx === -1) {
        this.appendBefore(element, this.dom.childNodes[index]);
      } else if (index !== idx) {
        this.remove(element);

        if (index < idx) {
          this.appendBefore(element, this.dom.childNodes[index]);
        } else {
          this.appendAfter(element, this.dom.childNodes[index - 1]);
        }
      }
    }
    /**
     * @name Container#clear
     * @description Clears all children from the container.
     * @fires 'remove' for each child element.
     */

  }, {
    key: "clear",
    value: function clear() {
      var i = this._domContent.childNodes.length;

      while (i--) {
        var node = this._domContent.childNodes[i];

        if (node.ui && node.ui !== this) {
          node.ui.destroy();
        }
      }

      if (this._domResizeHandle) {
        this._domResizeHandle.removeEventListener('mousedown', this._domEventResizeStart);

        this._domResizeHandle.removeEventListener('touchstart', this._domEventResizeTouchStart, {
          passive: false
        });

        this._domResizeHandle = null;
      }

      this._domContent.innerHTML = '';

      if (this.resizable) {
        this._createResizeHandle();

        this._dom.appendChild(this._domResizeHandle);
      }
    } // Used for backwards compatibility with the legacy ui framework

  }, {
    key: "_getDomFromElement",
    value: function _getDomFromElement(element) {
      if (element.dom) {
        return element.dom;
      }

      if (element.element) {
        // console.log('Legacy ui.Element passed to pcui.Container', this.class, element.class);
        return element.element;
      }

      return element;
    }
  }, {
    key: "_onAppendChild",
    value: function _onAppendChild(element) {
      element.parent = this;
      this.emit('append', element);
    }
  }, {
    key: "_onRemoveChild",
    value: function _onRemoveChild(element) {
      element.parent = null;
      this.emit('remove', element);
    }
  }, {
    key: "_onScroll",
    value: function _onScroll(evt) {
      this.emit('scroll', evt);
    }
  }, {
    key: "_createResizeHandle",
    value: function _createResizeHandle() {
      var handle = document.createElement('div');
      handle.classList.add(CLASS_RESIZABLE_HANDLE);
      handle.ui = this;
      handle.addEventListener('mousedown', this._domEventResizeStart);
      handle.addEventListener('touchstart', this._domEventResizeTouchStart, {
        passive: false
      });
      this._domResizeHandle = handle;
    }
  }, {
    key: "_onResizeStart",
    value: function _onResizeStart(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      window.addEventListener('mousemove', this._domEventResizeMove);
      window.addEventListener('mouseup', this._domEventResizeEnd);

      this._resizeStart();
    }
  }, {
    key: "_onResizeMove",
    value: function _onResizeMove(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      this._resizeMove(evt.clientX, evt.clientY);
    }
  }, {
    key: "_onResizeEnd",
    value: function _onResizeEnd(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      window.removeEventListener('mousemove', this._domEventResizeMove);
      window.removeEventListener('mouseup', this._domEventResizeEnd);

      this._resizeEnd();
    }
  }, {
    key: "_onResizeTouchStart",
    value: function _onResizeTouchStart(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];

        if (touch.target === this._domResizeHandle) {
          this._resizeTouchId = touch.identifier;
        }
      }

      window.addEventListener('touchmove', this._domEventResizeTouchMove);
      window.addEventListener('touchend', this._domEventResizeTouchEnd);

      this._resizeStart();
    }
  }, {
    key: "_onResizeTouchMove",
    value: function _onResizeTouchMove(evt) {
      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];

        if (touch.identifier !== this._resizeTouchId) {
          continue;
        }

        evt.stopPropagation();
        evt.preventDefault();

        this._resizeMove(touch.clientX, touch.clientY);

        break;
      }
    }
  }, {
    key: "_onResizeTouchEnd",
    value: function _onResizeTouchEnd(evt) {
      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];

        if (touch.identifier === this._resizeTouchId) {
          continue;
        }

        this._resizeTouchId = null;
        evt.preventDefault();
        evt.stopPropagation();
        window.removeEventListener('touchmove', this._domEventResizeTouchMove);
        window.removeEventListener('touchend', this._domEventResizeTouchEnd);

        this._resizeEnd();

        break;
      }
    }
  }, {
    key: "_resizeStart",
    value: function _resizeStart() {
      this.class.add(CLASS_RESIZING);
    }
  }, {
    key: "_resizeMove",
    value: function _resizeMove(x, y) {
      // if we haven't initialized resizeData do so now
      if (!this._resizeData) {
        this._resizeData = {
          x: x,
          y: y,
          width: this.dom.clientWidth,
          height: this.dom.clientHeight
        };
        return;
      }

      if (this._resizeHorizontally) {
        // horizontal resizing
        var offsetX = this._resizeData.x - x;

        if (this._resizable === 'right') {
          offsetX = -offsetX;
        }

        this.width = RESIZE_HANDLE_SIZE + Math.max(this._resizeMin, Math.min(this._resizeMax, this._resizeData.width + offsetX));
      } else {
        // vertical resizing
        var offsetY = this._resizeData.y - y;

        if (this._resizable === 'bottom') {
          offsetY = -offsetY;
        }

        this.height = Math.max(this._resizeMin, Math.min(this._resizeMax, this._resizeData.height + offsetY));
      }

      this.emit('resize');
    }
  }, {
    key: "_resizeEnd",
    value: function _resizeEnd() {
      this._resizeData = null;
      this.class.remove(CLASS_RESIZING);
    }
    /**
     * Resize the container
     *
     * @param {number} x - The amount of pixels to resize the width
     * @param {number} y - The amount of pixels to resize the height
     */

  }, {
    key: "resize",
    value: function resize(x, y) {
      x = x || 0;
      y = y || 0;

      this._resizeStart();

      this._resizeMove(0, 0);

      this._resizeMove(-x + RESIZE_HANDLE_SIZE, -y);

      this._resizeEnd();
    }
  }, {
    key: "_getDraggedChildIndex",
    value: function _getDraggedChildIndex(draggedChild) {
      for (var i = 0; i < this.dom.childNodes.length; i++) {
        if (this.dom.childNodes[i].ui === draggedChild) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "_onChildDragStart",
    value: function _onChildDragStart(evt, childPanel) {
      this.class.add(CLASS_DRAGGED_CHILD);
      this._draggedStartIndex = this._getDraggedChildIndex(childPanel);
      childPanel.class.add(CLASS_DRAGGED);
      this._draggedHeight = childPanel.height;
      this.emit('child:dragstart', childPanel, this._draggedStartIndex);
    }
  }, {
    key: "_onChildDragMove",
    value: function _onChildDragMove(evt, childPanel) {
      var rect = this.dom.getBoundingClientRect();
      var dragOut = evt.clientX < rect.left || evt.clientX > rect.right || evt.clientY < rect.top || evt.clientY > rect.bottom;

      var childPanelIndex = this._getDraggedChildIndex(childPanel);

      if (dragOut) {
        childPanel.class.remove(CLASS_DRAGGED);

        if (this._draggedStartIndex !== childPanelIndex) {
          this.remove(childPanel);

          if (this._draggedStartIndex < childPanelIndex) {
            this.appendBefore(childPanel, this.dom.childNodes[this._draggedStartIndex]);
          } else {
            this.appendAfter(childPanel, this.dom.childNodes[this._draggedStartIndex - 1]);
          }
        }

        return;
      }

      childPanel.class.add(CLASS_DRAGGED);
      var y = evt.clientY - rect.top;
      var ind = null; // hovered script

      for (var i = 0; i < this.dom.childNodes.length; i++) {
        var otherPanel = this.dom.childNodes[i].ui;
        var otherTop = otherPanel.dom.offsetTop;

        if (i < childPanelIndex) {
          if (y <= otherTop + otherPanel.header.height) {
            ind = i;
            break;
          }
        } else if (i > childPanelIndex) {
          if (y + childPanel.height >= otherTop + otherPanel.height) {
            ind = i;
            break;
          }
        }
      }

      if (ind !== null && childPanelIndex !== ind) {
        this.remove(childPanel);

        if (ind < childPanelIndex) {
          this.appendBefore(childPanel, this.dom.childNodes[ind]);
        } else {
          this.appendAfter(childPanel, this.dom.childNodes[ind - 1]);
        }
      }
    }
  }, {
    key: "_onChildDragEnd",
    value: function _onChildDragEnd(evt, childPanel) {
      this.class.remove(CLASS_DRAGGED_CHILD);
      childPanel.class.remove(CLASS_DRAGGED);

      var index = this._getDraggedChildIndex(childPanel);

      this.emit('child:dragend', childPanel, index, this._draggedStartIndex);
      this._draggedStartIndex = -1;
    }
  }, {
    key: "forEachChild",
    value: function forEachChild(fn) {
      for (var i = 0; i < this.dom.childNodes.length; i++) {
        var node = this.dom.childNodes[i].ui;

        if (node) {
          var result = fn(node, i);

          if (result === false) {
            // early out
            break;
          }
        }
      }
    }
    /**
     * If the current node contains a root, recursively append it's children to this node
     * and return it. Otherwise return the current node. Also add each child to the parent
     * under its keyed name.
     *
     * @param {object} node - The current element in the dom structure which must be recursively
     * traversed and appended to it's parent
     *
     * @returns {Element} - The recursively appended element node
     *
     */

  }, {
    key: "_buildDomNode",
    value: function _buildDomNode(node) {
      var _this2 = this;

      var keys = Object.keys(node);
      var rootNode;

      if (keys.includes('root')) {
        rootNode = this._buildDomNode(node.root);
        node.children.forEach(function (childNode) {
          var childNodeElement = _this2._buildDomNode(childNode);

          if (childNodeElement !== null) {
            rootNode.append(childNodeElement);
          }
        });
      } else {
        rootNode = node[keys[0]];
        this["_".concat(keys[0])] = rootNode;
      }

      return rootNode;
    }
    /**
     * Takes an array of pcui elements, each of which can contain their own child elements, and
     * appends them to this container. These child elements are traversed recursively using
     * _buildDomNode.
     *
     * @param {Array} dom - An array of child pcui elements to append to this container.
     *
     * @example
     * buildDom([
     *     {
     *         child1: pcui.Label()
     *     },
     *     {
     *         root: {
     *             container1: pcui.Container()
     *         },
     *         children: [
     *             {
     *                 child2: pcui.Label()
     *             },
     *             {
     *                 child3: pcui.Label()
     *             }
     *         ]
     *     }
     * ]);
     */

  }, {
    key: "buildDom",
    value: function buildDom(dom) {
      var _this3 = this;

      dom.forEach(function (node) {
        var builtNode = _this3._buildDomNode(node);

        _this3.append(builtNode);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this.domContent = null;

      if (this._domResizeHandle) {
        this._domResizeHandle.removeEventListener('mousedown', this._domEventResizeStart);

        window.removeEventListener('mousemove', this._domEventResizeMove);
        window.removeEventListener('mouseup', this._domEventResizeEnd);

        this._domResizeHandle.removeEventListener('touchstart', this._domEventResizeTouchStart);

        window.removeEventListener('touchmove', this._domEventResizeTouchMove);
        window.removeEventListener('touchend', this._domEventResizeTouchEnd);
      }

      this._domResizeHandle = null;
      this._domEventResizeStart = null;
      this._domEventResizeMove = null;
      this._domEventResizeEnd = null;
      this._domEventResizeTouchStart = null;
      this._domEventResizeTouchMove = null;
      this._domEventResizeTouchEnd = null;
      this._domEventScroll = null;

      _get(Container_getPrototypeOf(Container.prototype), "destroy", this).call(this);
    }
  }, {
    key: "flex",
    get: function get() {
      return this._flex;
    },
    set: function set(value) {
      if (value === this._flex) return;
      this._flex = value;

      if (value) {
        this.classAdd(FLEX);
      } else {
        this.classRemove(FLEX);
      }
    }
  }, {
    key: "grid",
    get: function get() {
      return this._grid;
    },
    set: function set(value) {
      if (value === this._grid) return;
      this._grid = value;

      if (value) {
        this.classAdd(GRID);
      } else {
        this.classRemove(GRID);
      }
    }
  }, {
    key: "scrollable",
    get: function get() {
      return this._scrollable;
    },
    set: function set(value) {
      if (this._scrollable === value) return;
      this._scrollable = value;

      if (value) {
        this.classAdd(SCROLLABLE);
      } else {
        this.classRemove(SCROLLABLE);
      }
    }
  }, {
    key: "resizable",
    get: function get() {
      return this._resizable;
    },
    set: function set(value) {
      if (value === this._resizable) return;

      if (VALID_RESIZABLE_VALUES.indexOf(value) === -1) {
        console.error('Invalid resizable value: must be one of ' + VALID_RESIZABLE_VALUES.join(','));
        return;
      } // remove old class


      if (this._resizable) {
        this.classRemove("".concat(RESIZABLE, "-").concat(this._resizable));
      }

      this._resizable = value;
      this._resizeHorizontally = value === 'right' || value === 'left';

      if (value) {
        // add resize class and create / append resize handle
        this.classAdd(RESIZABLE);
        this.classAdd("".concat(RESIZABLE, "-").concat(value));

        if (!this._domResizeHandle) {
          this._createResizeHandle();
        }

        this._dom.appendChild(this._domResizeHandle);
      } else {
        // remove resize class and resize handle
        this.classRemove(RESIZABLE);

        if (this._domResizeHandle) {
          this._dom.removeChild(this._domResizeHandle);
        }
      }
    }
  }, {
    key: "resizeMin",
    get: function get() {
      return this._resizeMin;
    },
    set: function set(value) {
      this._resizeMin = Math.max(0, Math.min(value, this._resizeMax));
    }
  }, {
    key: "resizeMax",
    get: function get() {
      return this._resizeMax;
    },
    set: function set(value) {
      this._resizeMax = Math.max(this._resizeMin, value);
    } // The internal dom element used as a the container of all children.
    // Can be overriden by derived classes

  }, {
    key: "domContent",
    get: function get() {
      return this._domContent;
    },
    set: function set(value) {
      if (this._domContent === value) return;

      if (this._domContent) {
        this._domContent.removeEventListener('scroll', this._domEventScroll);
      }

      this._domContent = value;

      if (this._domContent) {
        this._domContent.addEventListener('scroll', this._domEventScroll);
      }
    }
  }]);

  return Container;
}(components_Element);

components_Element.register('container', Container);
/* harmony default export */ var components_Container = (Container);
// EXTERNAL MODULE: ./src/components/Panel/style.scss
var Panel_style = __webpack_require__(9370);
// EXTERNAL MODULE: ./src/components/Label/style.scss
var Label_style = __webpack_require__(7790);
;// CONCATENATED MODULE: ./src/components/Label/index.js
function Label_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Label_typeof = function _typeof(obj) { return typeof obj; }; } else { Label_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Label_typeof(obj); }

function Label_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Label_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Label_createClass(Constructor, protoProps, staticProps) { if (protoProps) Label_defineProperties(Constructor.prototype, protoProps); if (staticProps) Label_defineProperties(Constructor, staticProps); return Constructor; }

function Label_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Label_setPrototypeOf(subClass, superClass); }

function Label_setPrototypeOf(o, p) { Label_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Label_setPrototypeOf(o, p); }

function Label_createSuper(Derived) { var hasNativeReflectConstruct = Label_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Label_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Label_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Label_possibleConstructorReturn(this, result); }; }

function Label_possibleConstructorReturn(self, call) { if (call && (Label_typeof(call) === "object" || typeof call === "function")) { return call; } return Label_assertThisInitialized(self); }

function Label_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Label_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Label_getPrototypeOf(o) { Label_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Label_getPrototypeOf(o); }




var CLASS_LABEL = 'pcui-label';
/**
 * @name Label
 * @classdesc The Label is a simple span element that displays some text.
 * @property {string} placeholder Gets / sets the placeholder label that appears on the right of the label.
 * @property {string} text Gets / sets the text of the Label.
 * @property {boolean} renderChanges If true then the Label will flash when its text changes.
 * @augments Element
 * @mixes IBindable
 */

var Label = /*#__PURE__*/function (_Element) {
  Label_inherits(Label, _Element);

  var _super = Label_createSuper(Label);

  /**
   * Creates a new Label.
   *
   * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
   * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
   * @param {boolean} [args.nativeTooltip] - If true then use the text of the label as the native HTML tooltip.
   * @param {boolean} [args.allowTextSelection] - If true then the label can be clicked to select text.
   */
  function Label(args) {
    var _this;

    Label_classCallCheck(this, Label);

    if (!args) args = {};
    _this = _super.call(this, args.dom ? args.dom : document.createElement('span'), args);

    _this.class.add(CLASS_LABEL);

    _this._unsafe = args.unsafe || false;
    _this.text = args.text || args.value || '';

    if (args.allowTextSelection) {
      _this.class.add(DEFAULT_MOUSEDOWN);
    }

    if (args.nativeTooltip) {
      _this.dom.title = _this.text;
    }

    _this.placeholder = args.placeholder || null;
    _this.renderChanges = args.renderChanges || false;

    _this.on('change', function () {
      if (_this.renderChanges) {
        _this.flash();
      }
    });

    return _this;
  }

  Label_createClass(Label, [{
    key: "_updateText",
    value: function _updateText(value) {
      this.class.remove(MULTIPLE_VALUES);
      if (this._text === value) return false;
      this._text = value;

      if (this._unsafe) {
        this._dom.innerHTML = value;
      } else {
        this._dom.textContent = value;
      }

      this.emit('change', value);
      return true;
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (value === undefined || value === null) {
        value = '';
      }

      var changed = this._updateText(value);

      if (changed && this._binding) {
        this._binding.setValue(value);
      }
    }
  }, {
    key: "value",
    get: function get() {
      return this.text;
    },
    set: function set(value) {
      this.text = value;
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      var different = false;
      var value = values[0];

      for (var i = 1; i < values.length; i++) {
        if (values[i] !== value) {
          different = true;
          break;
        }
      }

      if (different) {
        this._updateText('');

        this.class.add(MULTIPLE_VALUES);
      } else {
        this._updateText(values[0]);
      }
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.dom.getAttribute('placeholder');
    },
    set: function set(value) {
      if (value) {
        this.dom.setAttribute('placeholder', value);
      } else {
        this.dom.removeAttribute('placeholder');
      }
    }
  }]);

  return Label;
}(components_Element);

components_Element.register('label', Label);
/* harmony default export */ var components_Label = (Label);
// EXTERNAL MODULE: ./src/components/Button/style.scss
var Button_style = __webpack_require__(5809);
;// CONCATENATED MODULE: ./src/components/Button/index.js
function Button_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Button_typeof = function _typeof(obj) { return typeof obj; }; } else { Button_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Button_typeof(obj); }

function Button_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Button_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Button_createClass(Constructor, protoProps, staticProps) { if (protoProps) Button_defineProperties(Constructor.prototype, protoProps); if (staticProps) Button_defineProperties(Constructor, staticProps); return Constructor; }

function Button_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { Button_get = Reflect.get; } else { Button_get = function _get(target, property, receiver) { var base = Button_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return Button_get(target, property, receiver || target); }

function Button_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Button_getPrototypeOf(object); if (object === null) break; } return object; }

function Button_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Button_setPrototypeOf(subClass, superClass); }

function Button_setPrototypeOf(o, p) { Button_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Button_setPrototypeOf(o, p); }

function Button_createSuper(Derived) { var hasNativeReflectConstruct = Button_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Button_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Button_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Button_possibleConstructorReturn(this, result); }; }

function Button_possibleConstructorReturn(self, call) { if (call && (Button_typeof(call) === "object" || typeof call === "function")) { return call; } return Button_assertThisInitialized(self); }

function Button_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Button_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Button_getPrototypeOf(o) { Button_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Button_getPrototypeOf(o); }



var CLASS_BUTTON = 'pcui-button';
/**
 * @name Button
 * @classdesc Represents a button.
 * @augments Element
 * @property {string} [text=Click Me] Gets / sets the text of the button
 * @property {string} size Gets / sets the 'size' type of the button. Can be null or 'small'.
 * @property {string} [icon=E401] The CSS code for an icon for the button. e.g. E401 (notice we omit the '\' character).
 * @mixes IFocusable
 */

var Button = /*#__PURE__*/function (_Element) {
  Button_inherits(Button, _Element);

  var _super = Button_createSuper(Button);

  /**
   * Creates a new Button.
   *
   * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
   * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
   */
  function Button(args) {
    var _this;

    Button_classCallCheck(this, Button);

    if (!args) args = {};
    _this = _super.call(this, args.dom ? args.dom : document.createElement('button'), args);

    _this.class.add(CLASS_BUTTON);

    _this._unsafe = args.unsafe || false;
    _this.text = args.text || '';
    _this.size = args.size || null;
    _this.icon = args.icon || '';
    _this._domEventKeyDown = _this._onKeyDown.bind(Button_assertThisInitialized(_this));

    _this.dom.addEventListener('keydown', _this._onKeyDown.bind(Button_assertThisInitialized(_this)));

    return _this;
  } // click on enter
  // blur on escape


  Button_createClass(Button, [{
    key: "_onKeyDown",
    value: function _onKeyDown(evt) {
      if (evt.keyCode === 27) {
        this.blur();
      } else if (evt.keyCode === 13) {
        this._onClick(evt);
      }
    }
  }, {
    key: "_onClick",
    value: function _onClick(evt) {
      this.blur();
      if (this.readOnly) return;

      Button_get(Button_getPrototypeOf(Button.prototype), "_onClick", this).call(this, evt);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.dom.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.dom.blur();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this.dom.removeEventListener('keydown', this._domEventKeyDown);

      Button_get(Button_getPrototypeOf(Button.prototype), "destroy", this).call(this);
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text === value) return;
      this._text = value;

      if (this._unsafe) {
        this.dom.innerHTML = value;
      } else {
        this.dom.textContent = value;
      }
    }
  }, {
    key: "icon",
    get: function get() {
      return this._icon;
    },
    set: function set(value) {
      if (this._icon === value | !value.match(/^E[0-9]{0,4}$/)) return;
      this._icon = value;

      if (value) {
        // set data-icon attribute but first convert the value to a code point
        this.dom.setAttribute('data-icon', String.fromCodePoint(parseInt(value, 16)));
      } else {
        this.dom.removeAttribute('data-icon');
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    },
    set: function set(value) {
      if (this._size === value) return;

      if (this._size) {
        this.class.remove('pcui-' + this._size);
        this._size = null;
      }

      this._size = value;

      if (this._size) {
        this.class.add('pcui-' + this._size);
      }
    }
  }]);

  return Button;
}(components_Element);

components_Element.register('button', Button);
/* harmony default export */ var components_Button = (Button);
;// CONCATENATED MODULE: ./src/components/Panel/index.js
function Panel_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Panel_typeof = function _typeof(obj) { return typeof obj; }; } else { Panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Panel_typeof(obj); }

function Panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) Panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) Panel_defineProperties(Constructor, staticProps); return Constructor; }

function Panel_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { Panel_get = Reflect.get; } else { Panel_get = function _get(target, property, receiver) { var base = Panel_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return Panel_get(target, property, receiver || target); }

function Panel_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Panel_getPrototypeOf(object); if (object === null) break; } return object; }

function Panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Panel_setPrototypeOf(subClass, superClass); }

function Panel_setPrototypeOf(o, p) { Panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Panel_setPrototypeOf(o, p); }

function Panel_createSuper(Derived) { var hasNativeReflectConstruct = Panel_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Panel_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Panel_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Panel_possibleConstructorReturn(this, result); }; }

function Panel_possibleConstructorReturn(self, call) { if (call && (Panel_typeof(call) === "object" || typeof call === "function")) { return call; } return Panel_assertThisInitialized(self); }

function Panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Panel_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Panel_getPrototypeOf(o) { Panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Panel_getPrototypeOf(o); }







var CLASS_PANEL = 'pcui-panel';
var CLASS_PANEL_HEADER = CLASS_PANEL + '-header';
var CLASS_PANEL_HEADER_TITLE = CLASS_PANEL_HEADER + '-title';
var CLASS_PANEL_CONTENT = CLASS_PANEL + '-content';
var CLASS_PANEL_HORIZONTAL = CLASS_PANEL + '-horizontal';
var CLASS_PANEL_SORTABLE_ICON = CLASS_PANEL + '-sortable-icon';
var CLASS_PANEL_REMOVE = CLASS_PANEL + '-remove'; // TODO: document panelType

/**
 * @event
 * @name Panel#collapse
 * @description Fired when the panel gets collapsed
 */

/**
 * @event
 * @name Panel#expand
 * @description Fired when the panel gets expanded
 */

/**
 * @name Panel
 * @classdesc The Panel is a pcui.Container that itself contains a header container and a content container. The
 * respective pcui.Container functions work using the content container. One can also append elements to the header of the Panel.
 * @property {boolean} flex Gets / sets whether the container supports flex layout. Defaults to false. Cannot co-exist with grid.
 * @property {boolean} grid Gets / sets whether the container supports grid layout. Defaults to false. Cannot co-exist with flex.
 * @property {boolean} sortable Gets / sets whether the panel can be reordered
 * @property {boolean} collapseHorizontally Gets / sets whether the panel collapses horizontally - this would be the case for side panels. Defaults to false.
 * @property {boolean} removable Gets / sets whether the panel can be removed
 * @property {number} headerSize=32 The height of the header in pixels. Defaults to 32.
 * @property {string} headerText The header text of the panel. Defaults to the empty string.
 * @property {Container} header Gets the header container.
 * @property {Container} content Gets the content container.
 * @augments Container
 * @mixes IContainer
 * @mixes IFlex
 * @mixes IGrid
 * @mixes ICollapsible
 * @mixes IScrollable
 * @mixes IResizable
 */

var Panel = /*#__PURE__*/function (_Container) {
  Panel_inherits(Panel, _Container);

  var _super = Panel_createSuper(Panel);

  /**
   * Creates a new Panel.
   *
   * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
   */
  function Panel(args) {
    var _this;

    Panel_classCallCheck(this, Panel);

    if (!args) args = {};
    var panelArgs = Object.assign({}, args);
    panelArgs.flex = true;
    delete panelArgs.grid;
    delete panelArgs.flexDirection;
    delete panelArgs.scrollable;
    _this = _super.call(this, panelArgs);

    _this.class.add(CLASS_PANEL);

    if (args.panelType) {
      _this.class.add(CLASS_PANEL + '-' + args.panelType);
    } // do not call reflow on every update while
    // we are initializing


    _this._suspendReflow = true; // initialize header container

    _this._initializeHeader(args); // initialize content container


    _this._initializeContent(args); // header size


    _this.headerSize = args.headerSize !== undefined ? args.headerSize : 32;
    _this._domEvtDragStart = _this._onDragStart.bind(Panel_assertThisInitialized(_this));
    _this._domEvtDragMove = _this._onDragMove.bind(Panel_assertThisInitialized(_this));
    _this._domEvtDragEnd = _this._onDragEnd.bind(Panel_assertThisInitialized(_this)); // collapse related

    _this._reflowTimeout = null;
    _this._widthBeforeCollapse = null;
    _this._heightBeforeCollapse = null;
    _this.collapsible = args.collapsible || false;
    _this.collapsed = args.collapsed || false;
    _this.collapseHorizontally = args.collapseHorizontally || false;
    _this._iconSort = null;
    _this.sortable = args.sortable || false;
    _this._btnRemove = null;
    _this.removable = args.removable || false; // set the contents container to be the content DOM element
    // from now on calling append functions on the panel will append themn
    // elements to the contents container

    _this.domContent = _this._containerContent.dom; // execute reflow now after all fields have been initialized

    _this._suspendReflow = false;

    _this._reflow();

    return _this;
  }

  Panel_createClass(Panel, [{
    key: "_initializeHeader",
    value: function _initializeHeader(args) {
      // header container
      this._containerHeader = new components_Container({
        flex: true,
        flexDirection: 'row',
        class: [CLASS_PANEL_HEADER, FONT_BOLD]
      }); // header title

      this._labelTitle = new components_Label({
        text: args.headerText,
        class: [CLASS_PANEL_HEADER_TITLE, FONT_BOLD]
      });

      this._containerHeader.append(this._labelTitle); // use native click listener because the pcui.Element#click event is only fired
      // if the element is enabled. However we still want to catch header click events in order
      // to collapse them


      this._containerHeader.dom.addEventListener('click', this._onHeaderClick.bind(this));

      this.append(this._containerHeader);
    }
  }, {
    key: "_onHeaderClick",
    value: function _onHeaderClick(evt) {
      if (!this._collapsible) return;
      if (evt.target !== this.header.dom && evt.target !== this._labelTitle.dom) return; // toggle collapsed

      this.collapsed = !this.collapsed;
    }
  }, {
    key: "_onClickRemove",
    value: function _onClickRemove(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.emit('click:remove');
    }
  }, {
    key: "_initializeContent",
    value: function _initializeContent(args) {
      // containers container
      this._containerContent = new components_Container({
        class: CLASS_PANEL_CONTENT,
        grid: args.grid,
        flex: args.flex,
        flexDirection: args.flexDirection,
        scrollable: args.scrollable,
        dom: args.container
      });
      this.append(this._containerContent);
    } // Collapses or expands the panel as needed

  }, {
    key: "_reflow",
    value: function _reflow() {
      var _this2 = this;

      if (this._suspendReflow) {
        return;
      }

      if (this._reflowTimeout) {
        cancelAnimationFrame(this._reflowTimeout);
        this._reflowTimeout = null;
      }

      if (this.hidden || !this.collapsible) return;

      if (this.collapsed && this.collapseHorizontally) {
        this._containerHeader.style.top = -this.headerSize + 'px';
      } else {
        this._containerHeader.style.top = '';
      } // we rely on the content width / height and we have to
      // wait for 1 frame before we can get the final values back


      this._reflowTimeout = requestAnimationFrame(function () {
        _this2._reflowTimeout = null;

        if (_this2.collapsed) {
          // remember size before collapse
          if (!_this2._widthBeforeCollapse) {
            _this2._widthBeforeCollapse = _this2.style.width;
          }

          if (!_this2._heightBeforeCollapse) {
            _this2._heightBeforeCollapse = _this2.style.height;
          }

          if (_this2._collapseHorizontally) {
            _this2.height = '';
            _this2.width = _this2.headerSize;
          } else {
            _this2.height = _this2.headerSize;
          } // add collapsed class after getting the width and height
          // because if we add it before then because of overflow:hidden
          // we might get innacurate width/heights.


          _this2.class.add(COLLAPSED);
        } else {
          // remove collapsed class first and the restore width and height
          // (opposite order of collapsing)
          _this2.class.remove(COLLAPSED);

          if (_this2._collapseHorizontally) {
            _this2.height = '';

            if (_this2._widthBeforeCollapse !== null) {
              _this2.width = _this2._widthBeforeCollapse;
            }
          } else {
            if (_this2._heightBeforeCollapse !== null) {
              _this2.height = _this2._heightBeforeCollapse;
            }
          } // reset before collapse vars


          _this2._widthBeforeCollapse = null;
          _this2._heightBeforeCollapse = null;
        }
      });
    }
  }, {
    key: "_onDragStart",
    value: function _onDragStart(evt) {
      if (this.disabled || this.readOnly) return;
      evt.stopPropagation();
      evt.preventDefault();
      window.addEventListener('mouseup', this._domEvtDragEnd);
      window.addEventListener('mouseleave', this._domEvtDragEnd);
      window.addEventListener('mousemove', this._domEvtDragMove);
      this.emit('dragstart');

      if (this.parent && this.parent._onChildDragStart) {
        this.parent._onChildDragStart(evt, this);
      }
    }
  }, {
    key: "_onDragMove",
    value: function _onDragMove(evt) {
      this.emit('dragmove');

      if (this.parent && this.parent._onChildDragStart) {
        this.parent._onChildDragMove(evt, this);
      }
    }
  }, {
    key: "_onDragEnd",
    value: function _onDragEnd(evt) {
      window.removeEventListener('mouseup', this._domEvtDragEnd);
      window.removeEventListener('mouseleave', this._domEvtDragEnd);
      window.removeEventListener('mousemove', this._domEvtDragMove);

      if (this._draggedChild === this) {
        this._draggedChild = null;
      }

      this.emit('dragend');

      if (this.parent && this.parent._onChildDragStart) {
        this.parent._onChildDragEnd(evt, this);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      if (this._reflowTimeout) {
        cancelAnimationFrame(this._reflowTimeout);
        this._reflowTimeout = null;
      }

      window.removeEventListener('mouseup', this._domEvtDragEnd);
      window.removeEventListener('mouseleave', this._domEvtDragEnd);
      window.removeEventListener('mousemove', this._domEvtDragMove);

      Panel_get(Panel_getPrototypeOf(Panel.prototype), "destroy", this).call(this);
    }
  }, {
    key: "collapsible",
    get: function get() {
      return this._collapsible;
    },
    set: function set(value) {
      if (value === this._collapsible) return;
      this._collapsible = value;

      if (value) {
        this.classAdd(COLLAPSIBLE);
      } else {
        this.classRemove(COLLAPSIBLE);
      }

      this._reflow();

      if (this.collapsed) {
        this.emit(value ? 'collapse' : 'expand');
      }
    }
  }, {
    key: "collapsed",
    get: function get() {
      return this._collapsed;
    },
    set: function set(value) {
      if (this._collapsed === value) return;
      this._collapsed = value;

      this._reflow();

      if (this.collapsible) {
        this.emit(value ? 'collapse' : 'expand');
      }
    }
  }, {
    key: "sortable",
    get: function get() {
      return this._sortable;
    },
    set: function set(value) {
      if (this._sortable === value) return;
      this._sortable = value;

      if (value) {
        this._iconSort = new components_Label({
          class: CLASS_PANEL_SORTABLE_ICON
        });

        this._iconSort.dom.addEventListener('mousedown', this._domEvtDragStart);

        this.header.prepend(this._iconSort);
      } else if (this._iconSort) {
        this._iconSort.destroy();

        this._iconSort = null;
      }
    }
  }, {
    key: "removable",
    get: function get() {
      return !!this._btnRemove;
    },
    set: function set(value) {
      if (this.removable === value) return;

      if (value) {
        this._btnRemove = new components_Button({
          icon: 'E289',
          class: CLASS_PANEL_REMOVE
        });

        this._btnRemove.on('click', this._onClickRemove.bind(this));

        this.header.append(this._btnRemove);
      } else {
        this._btnRemove.destroy();

        this._btnRemove = null;
      }
    }
  }, {
    key: "collapseHorizontally",
    get: function get() {
      return this._collapseHorizontally;
    },
    set: function set(value) {
      if (this._collapseHorizontally === value) return;
      this._collapseHorizontally = value;

      if (value) {
        this.classAdd(CLASS_PANEL_HORIZONTAL);
      } else {
        this.classRemove(CLASS_PANEL_HORIZONTAL);
      }

      this._reflow();
    }
  }, {
    key: "content",
    get: function get() {
      return this._containerContent;
    }
  }, {
    key: "header",
    get: function get() {
      return this._containerHeader;
    }
  }, {
    key: "headerText",
    get: function get() {
      return this._labelTitle.text;
    },
    set: function set(value) {
      this._labelTitle.text = value;
    }
  }, {
    key: "headerSize",
    get: function get() {
      return this._headerSize;
    },
    set: function set(value) {
      this._headerSize = value;
      var style = this._containerHeader.dom.style;
      style.height = Math.max(0, value) + 'px';
      style.lineHeight = style.height;

      this._reflow();
    }
  }]);

  return Panel;
}(components_Container);

components_Element.register('panel', Panel);
/* harmony default export */ var components_Panel = (Panel);
// EXTERNAL MODULE: ./src/components/NumericInput/style.scss
var NumericInput_style = __webpack_require__(5049);
// EXTERNAL MODULE: ./src/components/TextInput/style.scss
var TextInput_style = __webpack_require__(4922);
;// CONCATENATED MODULE: ./src/components/TextInput/index.js
function TextInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TextInput_typeof = function _typeof(obj) { return typeof obj; }; } else { TextInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TextInput_typeof(obj); }

function TextInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TextInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TextInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) TextInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) TextInput_defineProperties(Constructor, staticProps); return Constructor; }

function TextInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { TextInput_get = Reflect.get; } else { TextInput_get = function _get(target, property, receiver) { var base = TextInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return TextInput_get(target, property, receiver || target); }

function TextInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = TextInput_getPrototypeOf(object); if (object === null) break; } return object; }

function TextInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TextInput_setPrototypeOf(subClass, superClass); }

function TextInput_setPrototypeOf(o, p) { TextInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TextInput_setPrototypeOf(o, p); }

function TextInput_createSuper(Derived) { var hasNativeReflectConstruct = TextInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = TextInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = TextInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return TextInput_possibleConstructorReturn(this, result); }; }

function TextInput_possibleConstructorReturn(self, call) { if (call && (TextInput_typeof(call) === "object" || typeof call === "function")) { return call; } return TextInput_assertThisInitialized(self); }

function TextInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TextInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function TextInput_getPrototypeOf(o) { TextInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TextInput_getPrototypeOf(o); }




var CLASS_TEXT_INPUT = 'pcui-text-input';
/**
 * @name TextInput
 * @classdesc The TextInput is an input element of type text.
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 * @property {string} placeholder Gets / sets the placeholder label that appears on the right of the input.
 * @property {HTMLElement} input Gets the HTML input element.
 * @property {boolean} renderChanges If true then the TextInput will flash when its text changes.
 * @property {boolean} blurOnEnter=true Gets / sets whether pressing Enter will blur (unfocus) the field. Defaults to true.
 * @property {boolean} blurOnEscape=true Gets / sets whether pressing Escape will blur (unfocus) the field. Defaults to true.
 * @property {boolean} keyChange Gets / sets whether any key up event will cause a change event to be fired.} args
 * @property {Function} onValidate A function that validates the value that is entered into the input and returns true if it is valid or false otherwise.
 * If false then the input will be set in an error state and the value will not propagate to the binding.
 */

var TextInput = /*#__PURE__*/function (_Element) {
  TextInput_inherits(TextInput, _Element);

  var _super = TextInput_createSuper(TextInput);

  /**
   * Creates a new TextInput.
   *
   * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
   */
  function TextInput(args) {
    var _this;

    TextInput_classCallCheck(this, TextInput);

    if (!args) args = {};
    _this = _super.call(this, args.dom ? args.dom : document.createElement('div'), args);

    _this.class.add(CLASS_TEXT_INPUT);

    var input = args.input;

    if (!input) {
      input = document.createElement('input');
      input.ui = TextInput_assertThisInitialized(_this);
      input.type = 'text';
      input.tabIndex = 0;
    }

    _this._domInput = input;
    _this._domEvtChange = _this._onInputChange.bind(TextInput_assertThisInitialized(_this));
    _this._domEvtFocus = _this._onInputFocus.bind(TextInput_assertThisInitialized(_this));
    _this._domEvtBlur = _this._onInputBlur.bind(TextInput_assertThisInitialized(_this));
    _this._domEvtKeyDown = _this._onInputKeyDown.bind(TextInput_assertThisInitialized(_this));
    _this._domEvtKeyUp = _this._onInputKeyUp.bind(TextInput_assertThisInitialized(_this));
    _this._domEvtCtxMenu = _this._onInputCtxMenu.bind(TextInput_assertThisInitialized(_this));

    _this._domInput.addEventListener('change', _this._domEvtChange);

    _this._domInput.addEventListener('focus', _this._domEvtFocus);

    _this._domInput.addEventListener('blur', _this._domEvtBlur);

    _this._domInput.addEventListener('keydown', _this._domEvtKeyDown);

    _this._domInput.addEventListener('contextmenu', _this._domEvtCtxMenu, false);

    _this.dom.appendChild(_this._domInput);

    _this._suspendInputChangeEvt = false;

    if (args.value !== undefined) {
      _this.value = args.value;
    }

    _this.placeholder = args.placeholder || null;
    _this.renderChanges = args.renderChanges || false;
    _this.blurOnEnter = args.blurOnEnter !== undefined ? args.blurOnEnter : true;
    _this.blurOnEscape = args.blurOnEscape !== undefined ? args.blurOnEscape : true;
    _this.keyChange = args.keyChange || false;

    if (args.onValidate) {
      _this.onValidate = args.onValidate;
    }

    _this.on('change', function () {
      if (_this.renderChanges) {
        _this.flash();
      }
    });

    _this.on('disable', _this._updateInputReadOnly.bind(TextInput_assertThisInitialized(_this)));

    _this.on('enable', _this._updateInputReadOnly.bind(TextInput_assertThisInitialized(_this)));

    _this.on('readOnly', _this._updateInputReadOnly.bind(TextInput_assertThisInitialized(_this)));

    _this._updateInputReadOnly();

    return _this;
  }

  TextInput_createClass(TextInput, [{
    key: "_onInputChange",
    value: function _onInputChange(evt) {
      if (this._suspendInputChangeEvt) return;

      if (this._onValidate) {
        var error = !this._onValidate(this.value);
        this.error = error;

        if (error) {
          return;
        }
      } else {
        this.error = false;
      }

      this.emit('change', this.value);

      if (this._binding) {
        this._binding.setValue(this.value);
      }
    }
  }, {
    key: "_onInputFocus",
    value: function _onInputFocus(evt) {
      this.class.add(FOCUS);
      this.emit('focus', evt);
    }
  }, {
    key: "_onInputBlur",
    value: function _onInputBlur(evt) {
      this.class.remove(FOCUS);
      this.emit('blur', evt);
    }
  }, {
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(evt) {
      if (evt.keyCode === 27 && this.blurOnEscape || evt.keyCode === 13 && this.blurOnEnter) {
        this._domInput.blur();
      }

      this.emit('keydown', evt);
    }
  }, {
    key: "_onInputKeyUp",
    value: function _onInputKeyUp(evt) {
      this._onInputChange(evt);

      this.emit('keyup', evt);
    }
  }, {
    key: "_onInputCtxMenu",
    value: function _onInputCtxMenu(evt) {
      this._domInput.select();
    }
  }, {
    key: "_updateInputReadOnly",
    value: function _updateInputReadOnly() {
      var readOnly = !this.enabled || this.readOnly;

      if (readOnly) {
        this._domInput.setAttribute('readonly', true);
      } else {
        this._domInput.removeAttribute('readonly');
      }
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value) {
      this.class.remove(MULTIPLE_VALUES);

      if (value && TextInput_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var isObject = false;

          for (var i = 0; i < value.length; i++) {
            if (value[i] && TextInput_typeof(value[i]) === 'object') {
              isObject = true;
              break;
            }
          }

          value = isObject ? '[Not available]' : value.map(function (val) {
            return val === null ? 'null' : val;
          }).join(',');
        } else {
          value = '[Not available]';
        }
      }

      if (value === this.value) return false;
      this._suspendInputChangeEvt = true;
      this._domInput.value = value === null || value === undefined ? '' : value;
      this._suspendInputChangeEvt = false;
      this.emit('change', value);
      return true;
    }
    /**
     * @name TextInput#focus
     * @description Focuses the Element.
     * @param {boolean} select - If true then this will also select the text after focusing.
     */

  }, {
    key: "focus",
    value: function focus(select) {
      this._domInput.focus();

      if (select) {
        this._domInput.select();
      }
    }
    /**
     * @name TextInput#blur
     * @description Blurs (unfocuses) the Element.
     */

  }, {
    key: "blur",
    value: function blur() {
      this._domInput.blur();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      this._domInput.removeEventListener('change', this._domEvtChange);

      this._domInput.removeEventListener('focus', this._domEvtFocus);

      this._domInput.removeEventListener('blur', this._domEvtBlur);

      this._domInput.removeEventListener('keydown', this._domEvtKeyDown);

      this._domInput.removeEventListener('keyup', this._domEvtKeyUp);

      this._domInput.removeEventListener('contextmenu', this._domEvtCtxMenu);

      this._domInput = null;

      TextInput_get(TextInput_getPrototypeOf(TextInput.prototype), "destroy", this).call(this);
    }
  }, {
    key: "value",
    get: function get() {
      return this._domInput.value;
    },
    set: function set(value) {
      var changed = this._updateValue(value);

      if (changed) {
        // reset error
        this.error = false;
      }

      if (changed && this._binding) {
        this._binding.setValue(value);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      var different = false;
      var value = values[0];

      for (var i = 1; i < values.length; i++) {
        if (values[i] !== value) {
          different = true;
          break;
        }
      }

      if (different) {
        this._updateValue(null);

        this.class.add(MULTIPLE_VALUES);
      } else {
        this._updateValue(values[0]);
      }
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.dom.getAttribute('placeholder');
    },
    set: function set(value) {
      if (value) {
        this.dom.setAttribute('placeholder', value);
      } else {
        this.dom.removeAttribute('placeholder');
      }
    }
  }, {
    key: "keyChange",
    get: function get() {
      return this._keyChange;
    },
    set: function set(value) {
      if (this._keyChange === value) return;
      this._keyChange = value;

      if (value) {
        this._domInput.addEventListener('keyup', this._domEvtKeyUp);
      } else {
        this._domInput.removeEventListener('keyup', this._domEvtKeyUp);
      }
    }
  }, {
    key: "input",
    get: function get() {
      return this._domInput;
    }
  }, {
    key: "onValidate",
    get: function get() {
      return this._onValidate;
    },
    set: function set(value) {
      this._onValidate = value;
    }
  }]);

  return TextInput;
}(components_Element);

components_Element.register('string', TextInput, {
  renderChanges: true
});
/* harmony default export */ var components_TextInput = (TextInput);
;// CONCATENATED MODULE: ./src/components/NumericInput/index.js
function NumericInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { NumericInput_typeof = function _typeof(obj) { return typeof obj; }; } else { NumericInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return NumericInput_typeof(obj); }

function NumericInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NumericInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NumericInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) NumericInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) NumericInput_defineProperties(Constructor, staticProps); return Constructor; }

function NumericInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { NumericInput_get = Reflect.get; } else { NumericInput_get = function _get(target, property, receiver) { var base = NumericInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return NumericInput_get(target, property, receiver || target); }

function NumericInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = NumericInput_getPrototypeOf(object); if (object === null) break; } return object; }

function NumericInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) NumericInput_setPrototypeOf(subClass, superClass); }

function NumericInput_setPrototypeOf(o, p) { NumericInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return NumericInput_setPrototypeOf(o, p); }

function NumericInput_createSuper(Derived) { var hasNativeReflectConstruct = NumericInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = NumericInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = NumericInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return NumericInput_possibleConstructorReturn(this, result); }; }

function NumericInput_possibleConstructorReturn(self, call) { if (call && (NumericInput_typeof(call) === "object" || typeof call === "function")) { return call; } return NumericInput_assertThisInitialized(self); }

function NumericInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function NumericInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function NumericInput_getPrototypeOf(o) { NumericInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return NumericInput_getPrototypeOf(o); }





var CLASS_NUMERIC_INPUT = 'pcui-numeric-input';
var CLASS_NUMERIC_INPUT_SLIDER_CONTROL = CLASS_NUMERIC_INPUT + '-slider-control';
var CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE = CLASS_NUMERIC_INPUT_SLIDER_CONTROL + '-active';
var CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN = CLASS_NUMERIC_INPUT_SLIDER_CONTROL + '-hidden';
var REGEX_COMMA = /,/g;
/**
 * @name NumericInput
 * @classdesc The NumericInput represents an input element that holds numbers.
 * @property {number} [min=0] Gets / sets the minimum value this field can take.
 * @property {number} [max=1] Gets / sets the maximum value this field can take.
 * @property {number} [precision=7] Gets / sets the maximum number of decimals a value can take.
 * @property {number} [step=0.01] Gets / sets the amount that the value will be increased or decreased when using the arrow keys. Holding Shift will use 10x the step.
 * @property {boolean} [hideSlider=true] Hide the input mouse drag slider.
 * @augments TextInput
 */

var NumericInput = /*#__PURE__*/function (_TextInput) {
  NumericInput_inherits(NumericInput, _TextInput);

  var _super = NumericInput_createSuper(NumericInput);

  /**
   * Creates a new NumericInput.
   *
   * @param {object} args - The arguments. Extends the pcui.TextInput constructor arguments.
   * @param {boolean} [args.allowNull] - Gets / sets whether the value can be null. If not then it will be 0 instead of null.
   */
  function NumericInput(args) {
    var _this;

    NumericInput_classCallCheck(this, NumericInput);

    // make copy of args
    args = Object.assign({}, args);
    var value = args.value; // delete value because we want to set it after
    // the other arguments

    delete args.value;
    var renderChanges = args.renderChanges || false;
    delete args.renderChanges;
    _this = _super.call(this, args);

    _this.class.add(CLASS_NUMERIC_INPUT);

    _this._min = args.min !== undefined ? args.min : null;
    _this._max = args.max !== undefined ? args.max : null;
    _this._allowNull = args.allowNull || false;
    _this._precision = Number.isFinite(args.precision) ? args.precision : 7;

    if (Number.isFinite(args.step)) {
      _this._step = args.step;
    } else if (Number.isFinite(args.precision)) {
      _this._step = 1 / Math.pow(10, args.precision);
    } else {
      _this._step = 1;
    }

    _this._oldValue = undefined;
    _this.value = value;
    _this._historyCombine = false;
    _this._historyPostfix = null;
    _this._sliderPrevValue = 0;
    _this.renderChanges = renderChanges;
    _this._domEvtPointerLock = null;
    _this._domEvtSliderMouseDown = null;
    _this._domEvtSliderMouseUp = null;
    _this._domEvtMouseWheel = null;

    if (!args.hideSlider) {
      _this._sliderControl = new components_Element();

      _this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL);

      _this.dom.append(_this._sliderControl.dom);

      var sliderUsed = false;

      _this._domEvtSliderMouseDown = function () {
        _this._sliderControl.dom.requestPointerLock();

        _this._sliderMovement = 0.0;
        _this._sliderPrevValue = _this.value;
        sliderUsed = true;

        if (_this.binding) {
          _this._historyCombine = _this.binding.historyCombine;
          _this._historyPostfix = _this.binding.historyPostfix;
          _this.binding.historyCombine = true;
          _this.binding.historyPostfix = "(".concat(Date.now(), ")");
        }
      };

      _this._domEvtSliderMouseUp = function () {
        document.exitPointerLock();
        if (!sliderUsed) return;
        sliderUsed = false;
        _this.value = _this._sliderPrevValue + _this._sliderMovement;

        if (_this.binding) {
          _this.binding.historyCombine = _this._historyCombine;
          _this.binding.historyPostfix = _this._historyPostfix;
          _this._historyCombine = false;
          _this._historyPostfix = null;
        }
      };

      _this._domEvtPointerLock = _this._pointerLockChangeAlert.bind(NumericInput_assertThisInitialized(_this));
      _this._domEvtMouseWheel = _this._updatePosition.bind(NumericInput_assertThisInitialized(_this));

      _this._sliderControl.dom.addEventListener('mousedown', _this._domEvtSliderMouseDown);

      _this._sliderControl.dom.addEventListener('mouseup', _this._domEvtSliderMouseUp);

      document.addEventListener('pointerlockchange', _this._domEvtPointerLock, false);
      document.addEventListener('mozpointerlockchange', _this._domEvtPointerLock, false);
    }

    return _this;
  }

  NumericInput_createClass(NumericInput, [{
    key: "_updatePosition",
    value: function _updatePosition(evt) {
      var movement = 0;

      if (evt.constructor === WheelEvent) {
        movement = evt.deltaY;
      } else if (evt.constructor === MouseEvent) {
        movement = evt.movementX;
      } // move one step every 100 pixels


      this._sliderMovement += movement / 100 * this._step;
      this.value = this._sliderPrevValue + this._sliderMovement;
    }
  }, {
    key: "_onInputChange",
    value: function _onInputChange(evt) {
      // get the content of the input and pass it
      // through our value setter
      this.value = this._domInput.value;
    }
  }, {
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(evt) {
      if (!this.enabled || this.readOnly) return NumericInput_get(NumericInput_getPrototypeOf(NumericInput.prototype), "_onInputKeyDown", this).call(this, evt); // increase / decrease value with arrow keys

      if (evt.keyCode === 38 || evt.keyCode === 40) {
        var inc = (evt.shiftKey ? 10 : 1) * (evt.keyCode === 40 ? -1 : 1);
        this.value += this.step * inc;
        return;
      }

      NumericInput_get(NumericInput_getPrototypeOf(NumericInput.prototype), "_onInputKeyDown", this).call(this, evt);
    }
  }, {
    key: "_isScrolling",
    value: function _isScrolling() {
      if (!this._sliderControl) return false;
      return document.pointerLockElement === this._sliderControl.dom || document.mozPointerLockElement === this._sliderControl.dom;
    }
  }, {
    key: "_pointerLockChangeAlert",
    value: function _pointerLockChangeAlert() {
      if (this._isScrolling()) {
        this._sliderControl.dom.addEventListener("mousemove", this._domEvtMouseWheel, false);

        this._sliderControl.dom.addEventListener("wheel", this._domEvtMouseWheel, false);

        this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE);
      } else {
        this._sliderControl.dom.removeEventListener("mousemove", this._domEvtMouseWheel, false);

        this._sliderControl.dom.removeEventListener("wheel", this._domEvtMouseWheel, false);

        this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE);
      }
    }
  }, {
    key: "_normalizeValue",
    value: function _normalizeValue(value) {
      try {
        if (typeof value === 'string') {
          // replace commas with dots (for some international keyboards)
          value = value.replace(REGEX_COMMA, '.'); // remove spaces

          value = value.replace(/\s/g, ''); // sanitize input to only allow short mathematical expressions to be evaluated

          value = value.match(/^[*/+\-0-9().]+$/);

          if (value !== null && value[0].length < 20) {
            var expression = value[0];
            var operators = ['+', '-', '/', '*'];
            operators.forEach(function (operator) {
              var expressionArr = expression.split(operator);
              expressionArr.forEach(function (_, i) {
                expressionArr[i] = expressionArr[i].replace(/^0+/, '');
              });
              expression = expressionArr.join(operator);
            }); // eslint-disable-next-line

            value = Function('"use strict";return (' + expression + ')')();
          }
        }
      } catch (error) {
        value = null;
      }

      if (value === null || isNaN(value)) {
        if (this._allowNull) {
          return null;
        }

        value = 0;
      } // clamp between min max


      if (this.min !== null && value < this.min) {
        value = this.min;
      }

      if (this.max !== null && value > this.max) {
        value = this.max;
      } // fix precision


      if (this.precision !== null) {
        value = parseFloat(Number(value).toFixed(this.precision), 10);
      }

      return value;
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value, force) {
      var different = value !== this._oldValue || force; // always set the value to the input because
      // we always want it to show an actual number or nothing

      this._oldValue = value;
      this._domInput.value = value;
      this.class.remove(MULTIPLE_VALUES);

      if (different) {
        this.emit('change', value);
      }

      return different;
    }
  }, {
    key: "value",
    get: function get() {
      var val = NumericInput_get(NumericInput_getPrototypeOf(NumericInput.prototype), "value", this);

      return val !== '' ? parseFloat(val, 10) : null;
    },
    set: function set(value) {
      value = this._normalizeValue(value);

      var forceUpdate = this.class.contains(MULTIPLE_VALUES) && value === null && this._allowNull;

      var changed = this._updateValue(value, forceUpdate);

      if (changed && this.binding) {
        this.binding.setValue(value);
      }

      if (this._sliderControl) {
        this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      var different = false;

      var value = this._normalizeValue(values[0]);

      for (var i = 1; i < values.length; i++) {
        if (value !== this._normalizeValue(values[i])) {
          different = true;
          break;
        }
      }

      if (different) {
        this._updateValue(null);

        this.class.add(MULTIPLE_VALUES);

        if (this._sliderControl) {
          this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
        }
      } else {
        this._updateValue(value);

        if (this._sliderControl) {
          this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
        }
      }
    }
  }, {
    key: "min",
    get: function get() {
      return this._min;
    },
    set: function set(value) {
      if (this._min === value) return;
      this._min = value; // reset value

      if (this._min !== null) {
        this.value = this.value; // eslint-disable-line no-self-assign
      }
    }
  }, {
    key: "max",
    get: function get() {
      return this._max;
    },
    set: function set(value) {
      if (this._max === value) return;
      this._max = value; // reset value

      if (this._max !== null) {
        this.value = this.value; // eslint-disable-line no-self-assign
      }
    }
  }, {
    key: "precision",
    get: function get() {
      return this._precision;
    },
    set: function set(value) {
      if (this._precision === value) return;
      this._precision = value; // reset value

      if (this._precision !== null) {
        this.value = this.value; // eslint-disable-line no-self-assign
      }
    }
  }, {
    key: "step",
    get: function get() {
      return this._step;
    },
    set: function set(value) {
      this._step = value;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.destroyed) return;

      if (this._domEvtSliderMouseDown) {
        this._sliderControl.dom.removeEventListener('mousedown', this._domEvtSliderMouseDown);

        this._sliderControl.dom.removeEventListener('mouseup', this._domEvtSliderMouseUp);
      }

      if (this._domEvtMouseWheel) {
        this._sliderControl.dom.removeEventListener("mousemove", this._domEvtMouseWheel, false);

        this._sliderControl.dom.removeEventListener("wheel", this._domEvtMouseWheel, false);
      }

      if (this._domEvtPointerLock) {
        document.removeEventListener('pointerlockchange', this._domEvtPointerLock, false);
        document.removeEventListener('mozpointerlockchange', this._domEvtPointerLock, false);
      }

      NumericInput_get(NumericInput_getPrototypeOf(NumericInput.prototype), "destroy", this).call(this);
    }
  }]);

  return NumericInput;
}(components_TextInput);

components_Element.register('number', NumericInput, {
  renderChanges: true
});
/* harmony default export */ var components_NumericInput = (NumericInput);
;// CONCATENATED MODULE: ./src/components/ArrayInput/index.js
function ArrayInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ArrayInput_typeof = function _typeof(obj) { return typeof obj; }; } else { ArrayInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ArrayInput_typeof(obj); }

function ArrayInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ArrayInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ArrayInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) ArrayInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) ArrayInput_defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = ArrayInput_superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ArrayInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { ArrayInput_get = Reflect.get; } else { ArrayInput_get = function _get(target, property, receiver) { var base = ArrayInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return ArrayInput_get(target, property, receiver || target); }

function ArrayInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = ArrayInput_getPrototypeOf(object); if (object === null) break; } return object; }

function ArrayInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ArrayInput_setPrototypeOf(subClass, superClass); }

function ArrayInput_setPrototypeOf(o, p) { ArrayInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ArrayInput_setPrototypeOf(o, p); }

function ArrayInput_createSuper(Derived) { var hasNativeReflectConstruct = ArrayInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ArrayInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ArrayInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ArrayInput_possibleConstructorReturn(this, result); }; }

function ArrayInput_possibleConstructorReturn(self, call) { if (call && (ArrayInput_typeof(call) === "object" || typeof call === "function")) { return call; } return ArrayInput_assertThisInitialized(self); }

function ArrayInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ArrayInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ArrayInput_getPrototypeOf(o) { ArrayInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ArrayInput_getPrototypeOf(o); }








var CLASS_ARRAY_INPUT = 'pcui-array-input';
var CLASS_ARRAY_EMPTY = 'pcui-array-empty';
var CLASS_ARRAY_SIZE = CLASS_ARRAY_INPUT + '-size';
var CLASS_ARRAY_CONTAINER = CLASS_ARRAY_INPUT + '-items';
var CLASS_ARRAY_ELEMENT = CLASS_ARRAY_INPUT + '-item';
var CLASS_ARRAY_DELETE = CLASS_ARRAY_ELEMENT + '-delete';
/**
 * @event
 * @name ArrayInput#linkElement
 * @param {Element} element - The array element
 * @param {number} index - The index of the array element
 * @param {string} path - The path linked
 * @description Fired when an array element is linked to observers
 */

/**
 * @event
 * @name ArrayInput#unlinkElement
 * @param {Element} element - The array element
 * @param {number} index - The index of the array element
 * @description Fired when an array element is unlinked from observers
 */

/**
 * @name ArrayInput
 * @classdesc Element that allows editing an array of values.
 * @property {boolean} renderChanges - If true the input will flash when changed.
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 */

var ArrayInput = /*#__PURE__*/function (_Element) {
  ArrayInput_inherits(ArrayInput, _Element);

  var _super = ArrayInput_createSuper(ArrayInput);

  /**
   * Creates a new ArrayInput.
   *
   * @param {object} args - The arguments.
   * @param {string} [args.type] - The type of values that the array can hold.
   * @param {boolean} [args.fixedSize] - If true then editing the number of elements that the array has will not be allowed.
   * @param {object} [args.elementArgs] - Arguments for each array Element.
   */
  function ArrayInput(args) {
    var _this;

    ArrayInput_classCallCheck(this, ArrayInput);

    args = Object.assign({}, args); // remove binding because we want to set it later

    var binding = args.binding;
    delete args.binding;
    var container = new components_Container({
      dom: args.dom,
      flex: true
    });
    _this = _super.call(this, container.dom, args);
    _this._container = container;
    _this._container.parent = ArrayInput_assertThisInitialized(_this);

    _this.class.add(CLASS_ARRAY_INPUT, CLASS_ARRAY_EMPTY);

    _this._usePanels = args.usePanels || false;
    _this._fixedSize = !!args.fixedSize;
    _this._inputSize = new components_NumericInput({
      class: [CLASS_ARRAY_SIZE],
      placeholder: 'Array Size',
      value: 0,
      hideSlider: true,
      step: 1,
      precision: 0,
      min: 0,
      readOnly: _this._fixedSize
    });

    _this._inputSize.on('change', _this._onSizeChange.bind(ArrayInput_assertThisInitialized(_this)));

    _this._inputSize.on('focus', _this._onFocus.bind(ArrayInput_assertThisInitialized(_this)));

    _this._inputSize.on('blur', _this._onBlur.bind(ArrayInput_assertThisInitialized(_this)));

    _this._suspendSizeChangeEvt = false;

    _this._container.append(_this._inputSize);

    _this._containerArray = new components_Container({
      class: CLASS_ARRAY_CONTAINER,
      hidden: true
    });

    _this._containerArray.on('append', function () {
      _this._containerArray.hidden = false;
    });

    _this._containerArray.on('remove', function () {
      _this._containerArray.hidden = _this._arrayElements.length == 0;
    });

    _this._container.append(_this._containerArray);

    _this._suspendArrayElementEvts = false;
    _this._arrayElementChangeTimeout = null;
    _this._getDefaultFn = args.getDefaultFn || null;
    var valueType = args.elementArgs && args.elementArgs.type || args.type;

    if (!ArrayInput.DEFAULTS.hasOwnProperty(valueType)) {
      valueType = 'string';
    }

    delete args.dom;
    _this._valueType = valueType;
    _this._elementType = args.type;
    _this._elementArgs = args.elementArgs || args;
    _this._arrayElements = []; // set binding now

    _this.binding = binding;
    _this._values = [];

    if (args.value) {
      _this.value = args.value;
    }

    _this.renderChanges = args.renderChanges || false;
    return _this;
  }

  ArrayInput_createClass(ArrayInput, [{
    key: "_onSizeChange",
    value: function _onSizeChange(size) {
      var _this2 = this;

      // if size is explicitely 0 then add empty class
      // size can also be null with multi-select so do not
      // check just !size
      if (size === 0) {
        this.class.add(CLASS_ARRAY_EMPTY);
      } else {
        this.class.remove(CLASS_ARRAY_EMPTY);
      }

      if (size === null) return;
      if (this._suspendSizeChangeEvt) return; // initialize default value for each new array element

      var defaultValue;

      var initDefaultValue = function initDefaultValue() {
        if (_this2._getDefaultFn) {
          defaultValue = _this2._getDefaultFn();
        } else {
          defaultValue = ArrayInput.DEFAULTS[_this2._valueType];

          if (_this2._valueType === 'curveset') {
            defaultValue = helpers_utils.deepCopy(defaultValue);

            if (Array.isArray(_this2._elementArgs.curves)) {
              for (var i = 0; i < _this2._elementArgs.curves.length; i++) {
                defaultValue.keys.push([0, 0]);
              }
            }
          } else if (_this2._valueType === 'gradient') {
            defaultValue = helpers_utils.deepCopy(defaultValue);

            if (_this2._elementArgs.channels) {
              for (var _i = 0; _i < _this2._elementArgs.channels; _i++) {
                defaultValue.keys.push([0, 1]);
              }
            }
          }
        }
      }; // resize array


      var values = this._values.map(function (array) {
        if (!array) {
          array = new Array(size);

          for (var i = 0; i < size; i++) {
            array[i] = helpers_utils.deepCopy(ArrayInput.DEFAULTS[_this2._valueType]);
            if (defaultValue === undefined) initDefaultValue();
            array[i] = helpers_utils.deepCopy(defaultValue);
          }
        } else if (array.length < size) {
          var newArray = new Array(size - array.length);

          for (var _i2 = 0; _i2 < newArray.length; _i2++) {
            newArray[_i2] = helpers_utils.deepCopy(ArrayInput.DEFAULTS[_this2._valueType]);
            if (defaultValue === undefined) initDefaultValue();
            newArray[_i2] = helpers_utils.deepCopy(defaultValue);
          }

          array = array.concat(newArray);
        } else {
          var _newArray = new Array(size);

          for (var _i3 = 0; _i3 < size; _i3++) {
            _newArray[_i3] = helpers_utils.deepCopy(array[_i3]);
          }

          array = _newArray;
        }

        return array;
      });

      if (!values.length) {
        var array = new Array(size);

        for (var i = 0; i < size; i++) {
          array[i] = helpers_utils.deepCopy(ArrayInput.DEFAULTS[this._valueType]);
          if (defaultValue === undefined) initDefaultValue();
          array[i] = helpers_utils.deepCopy(defaultValue);
        }

        values.push(array);
      }

      this._updateValues(values, true);
    }
  }, {
    key: "_onFocus",
    value: function _onFocus() {
      this.emit('focus');
    }
  }, {
    key: "_onBlur",
    value: function _onBlur() {
      this.emit('blur');
    }
  }, {
    key: "_createArrayElement",
    value: function _createArrayElement() {
      var _this3 = this;

      var args = Object.assign({}, this._elementArgs);

      if (args.binding) {
        args.binding = args.binding.clone();
      } else if (this._binding) {
        args.binding = this._binding.clone();
      } // set renderChanges after value is set
      // to prevent flashing on initial value set


      args.renderChanges = false;
      var container;

      if (this._usePanels) {
        container = new components_Panel({
          headerText: "[".concat(this._arrayElements.length, "]"),
          removable: !this._fixedSize,
          collapsible: true,
          class: [CLASS_ARRAY_ELEMENT, CLASS_ARRAY_ELEMENT + '-' + this._elementType]
        });
      } else {
        container = new components_Container({
          flex: true,
          flexDirection: 'row',
          alignItems: 'center',
          class: [CLASS_ARRAY_ELEMENT, CLASS_ARRAY_ELEMENT + '-' + this._elementType]
        });
      }

      if (this._elementType === 'json' && args.attributes) {
        args.attributes = args.attributes.map(function (attr) {
          if (!attr.path) return attr; // fix paths to include array element index

          attr = Object.assign({}, attr);
          var parts = attr.path.split('.');
          parts.splice(parts.length - 1, 0, _this3._arrayElements.length);
          attr.path = parts.join('.');
          return attr;
        });
      }

      var element = components_Element.create(this._elementType, args);
      container.append(element);
      element.renderChanges = this.renderChanges;
      var entry = {
        container: container,
        element: element
      };

      this._arrayElements.push(entry);

      if (!this._usePanels) {
        if (!this._fixedSize) {
          var btnDelete = new components_Button({
            icon: 'E289',
            size: 'small',
            class: CLASS_ARRAY_DELETE,
            tabIndex: -1 // skip buttons on tab

          });
          btnDelete.on('click', function () {
            _this3._removeArrayElement(entry);
          });
          container.append(btnDelete);
        }
      } else {
        container.on('click:remove', function () {
          _this3._removeArrayElement(entry);
        });
      }

      element.on('change', function (value) {
        _this3._onArrayElementChange(entry, value);
      });

      this._containerArray.append(container);

      return entry;
    }
  }, {
    key: "_removeArrayElement",
    value: function _removeArrayElement(entry) {
      var index = this._arrayElements.indexOf(entry);

      if (index === -1) return; // remove row from every array in values

      var values = this._values.map(function (array) {
        if (!array) return null;
        array.splice(index, 1);
        return array;
      });

      this._updateValues(values, true);
    }
  }, {
    key: "_onArrayElementChange",
    value: function _onArrayElementChange(entry, value) {
      var _this4 = this;

      if (this._suspendArrayElementEvts) return;

      var index = this._arrayElements.indexOf(entry);

      if (index === -1) return; // Set the value to the same row of every array in values.

      this._values.forEach(function (array) {
        if (array && array.length > index) {
          array[index] = value;
        }
      }); // use a timeout here because when our values change they will
      // first emit change events on each array element. However since the
      // whole array changed we are going to fire a 'change' event later from
      // our '_updateValues' function. We only want to emit a 'change' event
      // here when only the array element changed value and not the whole array so
      // wait a bit and fire the change event later otherwise the _updateValues function
      // will cancel this timeout and fire a change event for the whole array instead


      this._arrayElementChangeTimeout = setTimeout(function () {
        _this4._arrayElementChangeTimeout = null;

        _this4.emit('change', _this4.value);
      });
    }
  }, {
    key: "_linkArrayElement",
    value: function _linkArrayElement(element, index) {
      var observers = this._binding.observers;
      var paths = this._binding.paths;
      var useSinglePath = paths.length === 1 || observers.length !== paths.length;
      element.unlink();
      element.value = null;
      this.emit('unlinkElement', element, index);
      var path = useSinglePath ? paths[0] + ".".concat(index) : paths.map(function (path) {
        return "".concat(path, ".").concat(index);
      });
      element.link(observers, path);
      this.emit('linkElement', element, index, path);
    }
  }, {
    key: "_updateValues",
    value: function _updateValues(values, applyToBinding) {
      this._values = values || [];
      this._suspendArrayElementEvts = true;
      this._suspendSizeChangeEvt = true; // apply values to the binding

      if (applyToBinding && this._binding) {
        this._binding.setValues(values);
      } // each row of this array holds
      // all the values for that row


      var valuesPerRow = []; // holds the length of each array

      var arrayLengths = [];
      values.forEach(function (array) {
        if (!array) return;
        arrayLengths.push(array.length);
        array.forEach(function (item, i) {
          if (!valuesPerRow[i]) {
            valuesPerRow[i] = [];
          }

          valuesPerRow[i].push(item);
        });
      });
      var lastElementIndex = -1;

      for (var i = 0; i < valuesPerRow.length; i++) {
        // if the number of values on this row does not match
        // the number of arrays then stop adding rows
        if (valuesPerRow[i].length !== values.length) {
          break;
        } // create row if it doesn't exist


        if (!this._arrayElements[i]) {
          this._createArrayElement();
        } // bind to observers for that row or just display the values


        if (this._binding && this._binding.observers) {
          this._linkArrayElement(this._arrayElements[i].element, i);
        } else {
          if (valuesPerRow[i].length > 1) {
            this._arrayElements[i].element.values = valuesPerRow[i];
          } else {
            this._arrayElements[i].element.value = valuesPerRow[i][0];
          }
        }

        lastElementIndex = i;
      } // destory elements that are no longer in our values


      for (var _i4 = this._arrayElements.length - 1; _i4 > lastElementIndex; _i4--) {
        this._arrayElements[_i4].container.destroy();

        this._arrayElements.splice(_i4, 1);
      }

      this._inputSize.values = arrayLengths;
      this._suspendSizeChangeEvt = false;
      this._suspendArrayElementEvts = false;

      if (this._arrayElementChangeTimeout) {
        clearTimeout(this._arrayElementChangeTimeout);
        this._arrayElementChangeTimeout = null;
      }

      this.emit('change', this.value);
    }
  }, {
    key: "focus",
    value: function focus() {
      this._inputSize.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this._inputSize.blur();
    }
    /**
     * @name ArrayInput#forEachArrayElement
     * @description Executes the specified function for each array element.
     * @param {Function} fn - The function with signature (element, index) => bool to execute. If the function returns
     * false then the iteration will early out.
     */

  }, {
    key: "forEachArrayElement",
    value: function forEachArrayElement(fn) {
      this._containerArray.forEachChild(function (container, i) {
        return fn(container.dom.firstChild.ui, i);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this._arrayElements.length = 0;

      ArrayInput_get(ArrayInput_getPrototypeOf(ArrayInput.prototype), "destroy", this).call(this);
    }
  }, {
    key: "binding",
    get: function get() {
      return ArrayInput_get(ArrayInput_getPrototypeOf(ArrayInput.prototype), "binding", this);
    } // override binding setter to create
    // the same type of binding on each array element too
    ,
    set: function set(value) {
      _set(ArrayInput_getPrototypeOf(ArrayInput.prototype), "binding", value, this, true);

      this._arrayElements.forEach(function (entry) {
        entry.element.binding = value ? value.clone() : null;
      });
    }
  }, {
    key: "value",
    get: function get() {
      // construct value from values of array elements
      return this._arrayElements.map(function (entry) {
        return entry.element.value;
      });
    },
    set: function set(value) {
      if (!Array.isArray(value)) {
        value = [null];
      }

      var current = this.value || [];
      if (helpers_utils.arrayEquals(current, value)) return; // update values and binding

      this._updateValues(new Array(this._values.length || 1).fill(value), true);
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      if (helpers_utils.arrayEquals(this._values, values)) return; // update values but do not update binding

      this._updateValues(values, false);
    }
  }, {
    key: "renderChanges",
    get: function get() {
      return this._renderChanges;
    },
    set: function set(value) {
      this._renderChanges = value;

      this._arrayElements.forEach(function (entry) {
        entry.element.renderChanges = value;
      });
    }
  }]);

  return ArrayInput;
}(components_Element);

ArrayInput.DEFAULTS = {
  boolean: false,
  number: 0,
  string: '',
  vec2: [0, 0],
  vec3: [0, 0, 0],
  vec4: [0, 0, 0, 0]
};

for (var type in ArrayInput.DEFAULTS) {
  components_Element.register("array:".concat(type), ArrayInput, {
    type: type,
    renderChanges: true
  });
}

components_Element.register('array:select', ArrayInput, {
  type: 'select',
  renderChanges: true
});
/* harmony default export */ var components_ArrayInput = (ArrayInput);
// EXTERNAL MODULE: ./src/components/BooleanInput/style.scss
var BooleanInput_style = __webpack_require__(3254);
// EXTERNAL MODULE: ./src/components/BooleanInput/toggle-style.scss
var toggle_style = __webpack_require__(378);
;// CONCATENATED MODULE: ./src/components/BooleanInput/index.js
function BooleanInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { BooleanInput_typeof = function _typeof(obj) { return typeof obj; }; } else { BooleanInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return BooleanInput_typeof(obj); }

function BooleanInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BooleanInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BooleanInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) BooleanInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) BooleanInput_defineProperties(Constructor, staticProps); return Constructor; }

function BooleanInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { BooleanInput_get = Reflect.get; } else { BooleanInput_get = function _get(target, property, receiver) { var base = BooleanInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return BooleanInput_get(target, property, receiver || target); }

function BooleanInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = BooleanInput_getPrototypeOf(object); if (object === null) break; } return object; }

function BooleanInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) BooleanInput_setPrototypeOf(subClass, superClass); }

function BooleanInput_setPrototypeOf(o, p) { BooleanInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BooleanInput_setPrototypeOf(o, p); }

function BooleanInput_createSuper(Derived) { var hasNativeReflectConstruct = BooleanInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = BooleanInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = BooleanInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return BooleanInput_possibleConstructorReturn(this, result); }; }

function BooleanInput_possibleConstructorReturn(self, call) { if (call && (BooleanInput_typeof(call) === "object" || typeof call === "function")) { return call; } return BooleanInput_assertThisInitialized(self); }

function BooleanInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function BooleanInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function BooleanInput_getPrototypeOf(o) { BooleanInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BooleanInput_getPrototypeOf(o); }





var CLASS_BOOLEAN_INPUT = 'pcui-boolean-input';
var CLASS_BOOLEAN_INPUT_TICKED = CLASS_BOOLEAN_INPUT + '-ticked';
var CLASS_BOOLEAN_INPUT_TOGGLE = CLASS_BOOLEAN_INPUT + '-toggle';
/**
 * @name BooleanInput
 * @classdesc A checkbox element.
 * @property {boolean} renderChanges If true the input will flash when changed.
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 */

var BooleanInput = /*#__PURE__*/function (_Element) {
  BooleanInput_inherits(BooleanInput, _Element);

  var _super = BooleanInput_createSuper(BooleanInput);

  /**
   * Creates a new pcui.BooleanInput.
   *
   * @param {object} args - The arguments.
   * @param {string} [args.type] - The type of checkbox currently can be null or 'toggle'.
   */
  function BooleanInput(args) {
    var _this;

    BooleanInput_classCallCheck(this, BooleanInput);

    args = Object.assign({
      tabIndex: 0
    }, args);
    _this = _super.call(this, args.dom ? args.dom : document.createElement('div'), args);

    if (args.type === 'toggle') {
      _this.class.add(CLASS_BOOLEAN_INPUT_TOGGLE);
    } else {
      _this.class.add(CLASS_BOOLEAN_INPUT);
    }

    _this.class.add(NOT_FLEXIBLE);

    _this._domEventKeyDown = _this._onKeyDown.bind(BooleanInput_assertThisInitialized(_this));
    _this._domEventFocus = _this._onFocus.bind(BooleanInput_assertThisInitialized(_this));
    _this._domEventBlur = _this._onBlur.bind(BooleanInput_assertThisInitialized(_this));

    _this.dom.addEventListener('keydown', _this._domEventKeyDown);

    _this.dom.addEventListener('focus', _this._domEventFocus);

    _this.dom.addEventListener('blur', _this._domEventBlur);

    _this._value = null;

    if (args.value !== undefined) {
      _this.value = args.value;
    }

    _this.renderChanges = args.renderChanges;
    return _this;
  }

  BooleanInput_createClass(BooleanInput, [{
    key: "_onClick",
    value: function _onClick(evt) {
      if (this.enabled) {
        this.focus();
      }

      if (this.enabled && !this.readOnly) {
        this.value = !this.value;
      }

      return BooleanInput_get(BooleanInput_getPrototypeOf(BooleanInput.prototype), "_onClick", this).call(this, evt);
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(evt) {
      if (evt.keyCode === 27) {
        this.blur();
        return;
      }

      if (!this.enabled || this.readOnly) return;

      if (evt.keyCode === 32) {
        evt.stopPropagation();
        evt.preventDefault();
        this.value = !this.value;
      }
    }
  }, {
    key: "_onFocus",
    value: function _onFocus() {
      this.emit('focus');
    }
  }, {
    key: "_onBlur",
    value: function _onBlur() {
      this.emit('blur');
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value) {
      this.class.remove(MULTIPLE_VALUES);
      if (value === this.value) return false;
      this._value = value;

      if (value) {
        this.class.add(CLASS_BOOLEAN_INPUT_TICKED);
      } else {
        this.class.remove(CLASS_BOOLEAN_INPUT_TICKED);
      }

      if (this.renderChanges) {
        this.flash();
      }

      this.emit('change', value);
      return true;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.dom.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.dom.blur();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this.dom.removeEventListener('keydown', this._domEventKeyDown);
      this.dom.removeEventListener('focus', this._domEventFocus);
      this.dom.removeEventListener('blur', this._domEventBlur);

      BooleanInput_get(BooleanInput_getPrototypeOf(BooleanInput.prototype), "destroy", this).call(this);
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      var changed = this._updateValue(value);

      if (changed && this._binding) {
        this._binding.setValue(value);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      var different = false;
      var value = values[0];

      for (var i = 1; i < values.length; i++) {
        if (values[i] !== value) {
          different = true;
          break;
        }
      }

      if (different) {
        this._updateValue(null);

        this.class.add(MULTIPLE_VALUES);
      } else {
        this._updateValue(values[0]);
      }
    }
  }]);

  return BooleanInput;
}(components_Element);

components_Element.register('boolean', BooleanInput, {
  renderChanges: true
});
/* harmony default export */ var components_BooleanInput = (BooleanInput);
// EXTERNAL MODULE: ./src/components/Code/style.scss
var Code_style = __webpack_require__(2144);
;// CONCATENATED MODULE: ./src/components/Code/index.js
function Code_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Code_typeof = function _typeof(obj) { return typeof obj; }; } else { Code_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Code_typeof(obj); }

function Code_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Code_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Code_createClass(Constructor, protoProps, staticProps) { if (protoProps) Code_defineProperties(Constructor.prototype, protoProps); if (staticProps) Code_defineProperties(Constructor, staticProps); return Constructor; }

function Code_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Code_setPrototypeOf(subClass, superClass); }

function Code_setPrototypeOf(o, p) { Code_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Code_setPrototypeOf(o, p); }

function Code_createSuper(Derived) { var hasNativeReflectConstruct = Code_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Code_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Code_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Code_possibleConstructorReturn(this, result); }; }

function Code_possibleConstructorReturn(self, call) { if (call && (Code_typeof(call) === "object" || typeof call === "function")) { return call; } return Code_assertThisInitialized(self); }

function Code_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Code_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Code_getPrototypeOf(o) { Code_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Code_getPrototypeOf(o); }





var CLASS_ROOT = 'pcui-code';
var CLASS_INNER = CLASS_ROOT + '-inner';
/**
 * @name Code
 * @augments Container
 * @property {string} text The Text to display in the code block
 * @classdesc Represents a code block.
 */

var Code = /*#__PURE__*/function (_Container) {
  Code_inherits(Code, _Container);

  var _super = Code_createSuper(Code);

  /**
   * Creates a new spinner.
   *
   * @param {object} [args] - The arguments
   * @param {string} [args.text] - The text to display in the code block;
   */
  function Code(args) {
    var _this;

    Code_classCallCheck(this, Code);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(CLASS_ROOT);

    _this._inner = new components_Label();

    _this.append(_this._inner);

    _this._inner.class.add(CLASS_INNER);

    if (args.text) {
      _this.text = args.text;
    }

    return _this;
  }

  Code_createClass(Code, [{
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      this._text = value;
      this._inner.text = value;
    }
  }]);

  return Code;
}(components_Container);

components_Element.register('code', Code);
/* harmony default export */ var components_Code = (Code);
// EXTERNAL MODULE: ./src/components/ContextMenu/style.scss
var ContextMenu_style = __webpack_require__(6622);
;// CONCATENATED MODULE: ./src/components/ContextMenu/index.js
function ContextMenu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var CLASS_ContextMenu = 'pcui-contextmenu';
var CLASS_ContextMenu_active = CLASS_ContextMenu + '-active';
var CLASS_ContextMenu_parent = CLASS_ContextMenu + '-parent';
var CLASS_ContextMenu_child = CLASS_ContextMenu + '-child';
var CLASS_ContextMenu_parent_active = CLASS_ContextMenu_parent + '-active';
/**
 * @name ContextMenu
 * @classdesc Represents a context menu.
 */

var ContextMenu =
/**
 * Creates a new ContextMenu.
 *
 * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
 * @param {object[]} [args.items] - The array of items used to populate the array. Example item: { 'text': 'Hello World', 'onClick': () => console.log('Hello World') }.
 * @param {object} [args.dom] - The dom element to attach this context menu to.
 * @param {object} [args.triggerElement] - The dom element that will trigger the context menu to open when right clicked. If undefined args.dom will be used.
 */
function ContextMenu(args) {
  var _this = this;

  ContextMenu_classCallCheck(this, ContextMenu);

  if (!args) args = {};
  this._menu = new components_Container({
    dom: args.dom
  });
  this._menu.contextMenu = this;
  this.args = args;

  this._menu.class.add(CLASS_ContextMenu);

  var menu = this._menu;

  var removeMenu = function removeMenu() {
    _this._menu.class.remove(CLASS_ContextMenu_active);

    document.removeEventListener('click', removeMenu);
  };

  var triggerElement = args.triggerElement || args.dom.parentElement;

  if (triggerElement) {
    this._contextMenuEvent = triggerElement.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
      menu.class.add(CLASS_ContextMenu_active);
      var maxMenuHeight = args.items.length * 27.0;
      var maxMenuWidth = 150.0;
      var left = e.clientX;
      var top = e.clientY;

      if (maxMenuHeight + top > window.innerHeight) {
        var topDiff = maxMenuHeight + top - window.innerHeight;
        top -= topDiff;
      }

      if (maxMenuWidth + left > window.innerWidth) {
        var leftDiff = maxMenuWidth + left - window.innerWidth;
        left -= leftDiff;
      }

      menu.dom.setAttribute("style", "left: ".concat(left, "px; top: ").concat(top, "px"));
      document.addEventListener('click', removeMenu);
    });
    var mouseLeaveTimeout;
    menu.dom.addEventListener('mouseleave', function () {
      mouseLeaveTimeout = setTimeout(function () {
        removeMenu();
      }, 500);
    });
    menu.dom.addEventListener('mouseenter', function () {
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
    });
  }

  if (!args.items) return;
  args.items.forEach(function (menuItem, i) {
    var menuItemElement = new components_Container();
    menuItemElement.dom.setAttribute("style", "top: ".concat(i * 27.0, "px"));

    if (menuItem.onClick) {
      menuItemElement.on('click', function (e) {
        e.stopPropagation();
        removeMenu();
        menuItem.onClick(e);
      });
    }

    var menuItemLabel = new components_Label({
      text: menuItem.text
    });
    menuItemElement.append(menuItemLabel);

    _this._menu.dom.append(menuItemElement.dom);

    if (menuItem.items) {
      menuItem.items.forEach(function (childItem, j) {
        var childMenuItemElement = new components_Container({
          class: CLASS_ContextMenu_child
        });
        childMenuItemElement.dom.setAttribute("style", "top: ".concat(j * 27.0, "px; left: 150px;"));
        childMenuItemElement.on('click', function (e) {
          e.stopPropagation();
          removeMenu();
          childItem.onClick();
        });
        var childMenuItemLabel = new components_Label({
          text: childItem.text
        });
        childMenuItemElement.append(childMenuItemLabel);
        menuItemElement.append(childMenuItemElement);
      });
      menuItemElement.class.add(CLASS_ContextMenu_parent);
    }

    menuItemElement.dom.addEventListener('mouseover', function (e) {
      // if (!e.fromElement.classList.contains('pcui-contextmenu-parent')) return;
      _this._menu.forEachChild(function (node) {
        return node.class.remove(CLASS_ContextMenu_parent_active);
      });

      menuItemElement.class.add(CLASS_ContextMenu_parent_active);
      var maxMenuHeight = menuItem.items ? menuItem.items.length * 27.0 : 0.0;
      var maxMenuWidth = 150.0;
      var left = e.clientX + maxMenuWidth > window.innerWidth ? -maxMenuWidth + 2.0 : maxMenuWidth;
      var top = 0;

      if (e.clientY + maxMenuHeight > window.innerHeight) {
        top = -maxMenuHeight + 27.0;
      }

      menuItemElement.forEachChild(function (node, j) {
        if (j === 0) return;
        node.dom.setAttribute("style", "top: ".concat(top + (j - 1) * 27.0, "px; left: ").concat(left, "px;"));
      });
    });
  });
};

components_Element.register('contextmenu', ContextMenu);
/* harmony default export */ var components_ContextMenu = (ContextMenu);
// EXTERNAL MODULE: ./src/components/Divider/style.scss
var Divider_style = __webpack_require__(4935);
;// CONCATENATED MODULE: ./src/components/Divider/index.js
function Divider_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Divider_typeof = function _typeof(obj) { return typeof obj; }; } else { Divider_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Divider_typeof(obj); }

function Divider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Divider_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Divider_setPrototypeOf(subClass, superClass); }

function Divider_setPrototypeOf(o, p) { Divider_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Divider_setPrototypeOf(o, p); }

function Divider_createSuper(Derived) { var hasNativeReflectConstruct = Divider_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Divider_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Divider_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Divider_possibleConstructorReturn(this, result); }; }

function Divider_possibleConstructorReturn(self, call) { if (call && (Divider_typeof(call) === "object" || typeof call === "function")) { return call; } return Divider_assertThisInitialized(self); }

function Divider_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Divider_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Divider_getPrototypeOf(o) { Divider_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Divider_getPrototypeOf(o); }



var Divider_CLASS_ROOT = 'pcui-divider';
/**
 * @name Divider
 * @augments Element
 * @classdesc Represents a vertical division between two elements
 */

var Divider = /*#__PURE__*/function (_Element) {
  Divider_inherits(Divider, _Element);

  var _super = Divider_createSuper(Divider);

  function Divider(args) {
    var _this;

    Divider_classCallCheck(this, Divider);

    if (!args) args = {};
    _this = _super.call(this, args.dom ? args.dom : document.createElement('div'), args);

    _this.class.add(Divider_CLASS_ROOT);

    return _this;
  }

  return Divider;
}(components_Element);

components_Element.register('divider', Divider);
/* harmony default export */ var components_Divider = (Divider);
// EXTERNAL MODULE: ./src/components/InfoBox/style.scss
var InfoBox_style = __webpack_require__(1758);
;// CONCATENATED MODULE: ./src/components/InfoBox/index.js
function InfoBox_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { InfoBox_typeof = function _typeof(obj) { return typeof obj; }; } else { InfoBox_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return InfoBox_typeof(obj); }

function InfoBox_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function InfoBox_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function InfoBox_createClass(Constructor, protoProps, staticProps) { if (protoProps) InfoBox_defineProperties(Constructor.prototype, protoProps); if (staticProps) InfoBox_defineProperties(Constructor, staticProps); return Constructor; }

function InfoBox_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) InfoBox_setPrototypeOf(subClass, superClass); }

function InfoBox_setPrototypeOf(o, p) { InfoBox_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return InfoBox_setPrototypeOf(o, p); }

function InfoBox_createSuper(Derived) { var hasNativeReflectConstruct = InfoBox_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = InfoBox_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = InfoBox_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return InfoBox_possibleConstructorReturn(this, result); }; }

function InfoBox_possibleConstructorReturn(self, call) { if (call && (InfoBox_typeof(call) === "object" || typeof call === "function")) { return call; } return InfoBox_assertThisInitialized(self); }

function InfoBox_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function InfoBox_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function InfoBox_getPrototypeOf(o) { InfoBox_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return InfoBox_getPrototypeOf(o); }




var CLASS_INFOBOX = 'pcui-infobox';
/**
 * @name InfoBox
 * @classdesc Represents an information box.
 * @augments Container
 * @property {string} icon The CSS code for an icon for the info box. e.g. E401 (notice we omit the '\' character).
 * @property {string} title Gets / sets the 'title' of the info box
 * @property {string} text Gets / sets the 'text' of the info box
 */

var InfoBox = /*#__PURE__*/function (_Container) {
  InfoBox_inherits(InfoBox, _Container);

  var _super = InfoBox_createSuper(InfoBox);

  /**
   * Creates a new InfoBox.
   *
   * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
   * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the title/text. Otherwise textContent will be used instead.
   */
  function InfoBox(args) {
    var _this;

    InfoBox_classCallCheck(this, InfoBox);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(CLASS_INFOBOX);

    _this._titleElement = new components_Element();
    _this._textElement = new components_Element();

    _this.append(_this._titleElement);

    _this.append(_this._textElement);

    _this._unsafe = args.unsafe || false;
    _this.icon = args.icon || '';
    _this.title = args.title || '';
    _this.text = args.text || '';
    return _this;
  }

  InfoBox_createClass(InfoBox, [{
    key: "icon",
    get: function get() {
      return this._icon;
    },
    set: function set(value) {
      if (this._icon === value) return;
      this._icon = value;

      if (value) {
        // set data-icon attribute but first convert the value to a code point
        this.dom.setAttribute('data-icon', String.fromCodePoint(parseInt(value, 16)));
      } else {
        this.dom.removeAttribute('data-icon');
      }
    }
  }, {
    key: "title",
    get: function get() {
      return this._title;
    },
    set: function set(value) {
      if (this._title === value) return;
      this._title = value;

      if (this._unsafe) {
        this._titleElement.dom.innerHTML = value;
      } else {
        this._titleElement.dom.textContent = value;
      }
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text === value) return;
      this._text = value;

      if (this._unsafe) {
        this._textElement.dom.innerHTML = value;
      } else {
        this._textElement.dom.textContent = value;
      }
    }
  }]);

  return InfoBox;
}(components_Container);

components_Element.register('infobox', InfoBox);
/* harmony default export */ var components_InfoBox = (InfoBox);
// EXTERNAL MODULE: ./src/components/LabelGroup/style.scss
var LabelGroup_style = __webpack_require__(7036);
;// CONCATENATED MODULE: ./src/components/LabelGroup/index.js
function LabelGroup_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { LabelGroup_typeof = function _typeof(obj) { return typeof obj; }; } else { LabelGroup_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return LabelGroup_typeof(obj); }

function LabelGroup_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LabelGroup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LabelGroup_createClass(Constructor, protoProps, staticProps) { if (protoProps) LabelGroup_defineProperties(Constructor.prototype, protoProps); if (staticProps) LabelGroup_defineProperties(Constructor, staticProps); return Constructor; }

function LabelGroup_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) LabelGroup_setPrototypeOf(subClass, superClass); }

function LabelGroup_setPrototypeOf(o, p) { LabelGroup_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return LabelGroup_setPrototypeOf(o, p); }

function LabelGroup_createSuper(Derived) { var hasNativeReflectConstruct = LabelGroup_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = LabelGroup_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = LabelGroup_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return LabelGroup_possibleConstructorReturn(this, result); }; }

function LabelGroup_possibleConstructorReturn(self, call) { if (call && (LabelGroup_typeof(call) === "object" || typeof call === "function")) { return call; } return LabelGroup_assertThisInitialized(self); }

function LabelGroup_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function LabelGroup_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function LabelGroup_getPrototypeOf(o) { LabelGroup_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return LabelGroup_getPrototypeOf(o); }





var CLASS_LABEL_GROUP = 'pcui-label-group';
var CLASS_LABEL_TOP = CLASS_LABEL_GROUP + '-align-top';
/**
 * @name LabelGroup
 * @classdesc Represents a group of a Label and a Element. Useful for rows of labeled fields.
 * @augments Container
 * @property {string} text - Gets / sets the label text.
 * @property {Element} field - Gets the field. This can only be set through the constructor by passing it in the arguments.
 * @property {Element} label - Gets the label element.
 * @property {boolean} labelAlignTop - Whether to align the label at the top of the group. Defaults to false which aligns it at the center.
 */

var LabelGroup = /*#__PURE__*/function (_Container) {
  LabelGroup_inherits(LabelGroup, _Container);

  var _super = LabelGroup_createSuper(LabelGroup);

  /**
   * Creates a new LabelGroup.
   *
   * @param {object} args - The arguments. Extends the Element arguments. Any settable property can also be set through the constructor.
   * @param {boolean} [args.nativeTooltip] - If true then use the text as the HTML tooltip of the label.
   */
  function LabelGroup(args) {
    var _this;

    LabelGroup_classCallCheck(this, LabelGroup);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(CLASS_LABEL_GROUP);

    _this._label = new components_Label({
      text: args.text || 'Label',
      nativeTooltip: args.nativeTooltip
    });

    _this.append(_this._label);

    _this._field = args.field;

    if (_this._field) {
      _this.append(_this._field);
    }

    _this.labelAlignTop = args.labelAlignTop || false;
    return _this;
  }

  LabelGroup_createClass(LabelGroup, [{
    key: "label",
    get: function get() {
      return this._label;
    }
  }, {
    key: "field",
    get: function get() {
      return this._field;
    }
  }, {
    key: "text",
    get: function get() {
      return this._label.text;
    },
    set: function set(value) {
      this._label.text = value;
    }
  }, {
    key: "labelAlignTop",
    get: function get() {
      return this.class.contains(CLASS_LABEL_TOP);
    },
    set: function set(value) {
      if (value) {
        this.class.add(CLASS_LABEL_TOP);
      } else {
        this.class.remove(CLASS_LABEL_TOP);
      }
    }
  }]);

  return LabelGroup;
}(components_Container);

components_Element.register('labelgroup', LabelGroup);
/* harmony default export */ var components_LabelGroup = (LabelGroup);
// EXTERNAL MODULE: ./src/components/Overlay/style.scss
var Overlay_style = __webpack_require__(5199);
;// CONCATENATED MODULE: ./src/components/Overlay/index.js
function Overlay_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Overlay_typeof = function _typeof(obj) { return typeof obj; }; } else { Overlay_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Overlay_typeof(obj); }

function Overlay_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Overlay_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Overlay_createClass(Constructor, protoProps, staticProps) { if (protoProps) Overlay_defineProperties(Constructor.prototype, protoProps); if (staticProps) Overlay_defineProperties(Constructor, staticProps); return Constructor; }

function Overlay_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { Overlay_get = Reflect.get; } else { Overlay_get = function _get(target, property, receiver) { var base = Overlay_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return Overlay_get(target, property, receiver || target); }

function Overlay_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Overlay_getPrototypeOf(object); if (object === null) break; } return object; }

function Overlay_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Overlay_setPrototypeOf(subClass, superClass); }

function Overlay_setPrototypeOf(o, p) { Overlay_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Overlay_setPrototypeOf(o, p); }

function Overlay_createSuper(Derived) { var hasNativeReflectConstruct = Overlay_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Overlay_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Overlay_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Overlay_possibleConstructorReturn(this, result); }; }

function Overlay_possibleConstructorReturn(self, call) { if (call && (Overlay_typeof(call) === "object" || typeof call === "function")) { return call; } return Overlay_assertThisInitialized(self); }

function Overlay_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Overlay_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Overlay_getPrototypeOf(o) { Overlay_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Overlay_getPrototypeOf(o); }




var CLASS_OVERLAY = 'pcui-overlay';
var CLASS_OVERLAY_INNER = CLASS_OVERLAY + '-inner';
var CLASS_OVERLAY_CLICKABLE = CLASS_OVERLAY + '-clickable';
var CLASS_OVERLAY_TRANSPARENT = CLASS_OVERLAY + '-transparent';
var CLASS_OVERLAY_CONTENT = CLASS_OVERLAY + '-content';
/**
 * @name Overlay
 * @classdesc An overlay element.
 * @property {boolean} clickable Whether the overlay can be hidden by clicking on it.
 * @property {boolean} transparent Whether the overlay is transparent.
 * @augments Container
 */

var Overlay = /*#__PURE__*/function (_Container) {
  Overlay_inherits(Overlay, _Container);

  var _super = Overlay_createSuper(Overlay);

  /**
   * Creates a new pcui.Overlay.
   *
   * @param {object} args - The arguments.
   */
  function Overlay(args) {
    var _this;

    Overlay_classCallCheck(this, Overlay);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(CLASS_OVERLAY);

    _this._domClickableOverlay = document.createElement('div');
    _this._domClickableOverlay.ui = Overlay_assertThisInitialized(_this);
    _this._domClickableOverlay.classList = CLASS_OVERLAY_INNER;

    _this.dom.appendChild(_this._domClickableOverlay);

    _this._domEventMouseDown = _this._onMouseDown.bind(Overlay_assertThisInitialized(_this));

    _this._domClickableOverlay.addEventListener('mousedown', _this._domEventMouseDown);

    _this.domContent = document.createElement('div');
    _this.domContent.ui = Overlay_assertThisInitialized(_this);

    _this.domContent.classList.add(CLASS_OVERLAY_CONTENT);

    _this.dom.appendChild(_this.domContent);

    _this.clickable = args.clickable || false;
    _this.transparent = args.transparent || false;
    return _this;
  }

  Overlay_createClass(Overlay, [{
    key: "_onMouseDown",
    value: function _onMouseDown(evt) {
      var _this2 = this;

      if (!this.clickable) return; // some field might be in focus

      document.body.blur(); // wait till blur is done

      requestAnimationFrame(function () {
        _this2.hidden = true;
      });
      evt.preventDefault();
    }
    /**
     * @name Overlay#position
     * @description Position the overlay at specific x, y coordinates.
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */

  }, {
    key: "position",
    value: function position(x, y) {
      var area = this._domClickableOverlay.getBoundingClientRect();

      var rect = this.domContent.getBoundingClientRect();
      x = Math.max(0, Math.min(area.width - rect.width, x));
      y = Math.max(0, Math.min(area.height - rect.height, y));
      this.domContent.style.position = 'absolute';
      this.domContent.style.left = "".concat(x, "px");
      this.domContent.style.top = "".concat(y, "px");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      this._domClickableOverlay.removeEventListener('mousedown', this._domEventMouseDown);

      Overlay_get(Overlay_getPrototypeOf(Overlay.prototype), "destroy", this).call(this);
    }
  }, {
    key: "clickable",
    get: function get() {
      return this.class.contains(CLASS_OVERLAY_CLICKABLE);
    },
    set: function set(value) {
      if (value) {
        this.class.add(CLASS_OVERLAY_CLICKABLE);
      } else {
        this.class.remove(CLASS_OVERLAY_CLICKABLE);
      }
    }
  }, {
    key: "transparent",
    get: function get() {
      return this.class.contains(CLASS_OVERLAY_TRANSPARENT);
    },
    set: function set(value) {
      if (value) {
        this.class.add(CLASS_OVERLAY_TRANSPARENT);
      } else {
        this.class.remove(CLASS_OVERLAY_TRANSPARENT);
      }
    }
  }]);

  return Overlay;
}(components_Container);

components_Element.register('overlay', Overlay);
/* harmony default export */ var components_Overlay = (Overlay);
// EXTERNAL MODULE: ./src/components/Progress/style.scss
var Progress_style = __webpack_require__(3059);
;// CONCATENATED MODULE: ./src/components/Progress/index.js
function Progress_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Progress_typeof = function _typeof(obj) { return typeof obj; }; } else { Progress_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Progress_typeof(obj); }

function Progress_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Progress_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Progress_createClass(Constructor, protoProps, staticProps) { if (protoProps) Progress_defineProperties(Constructor.prototype, protoProps); if (staticProps) Progress_defineProperties(Constructor, staticProps); return Constructor; }

function Progress_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Progress_setPrototypeOf(subClass, superClass); }

function Progress_setPrototypeOf(o, p) { Progress_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Progress_setPrototypeOf(o, p); }

function Progress_createSuper(Derived) { var hasNativeReflectConstruct = Progress_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Progress_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Progress_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Progress_possibleConstructorReturn(this, result); }; }

function Progress_possibleConstructorReturn(self, call) { if (call && (Progress_typeof(call) === "object" || typeof call === "function")) { return call; } return Progress_assertThisInitialized(self); }

function Progress_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Progress_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Progress_getPrototypeOf(o) { Progress_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Progress_getPrototypeOf(o); }




var Progress_CLASS_ROOT = 'pcui-progress';
var Progress_CLASS_INNER = Progress_CLASS_ROOT + '-inner';
/**
 * @name Progress
 * @classdesc Represents a bar that can highlight progress of an activity.
 * @augments Container
 * @property {number} value Gets / sets the value of the progress bar (between 0 and 100).
 */

var Progress = /*#__PURE__*/function (_Container) {
  Progress_inherits(Progress, _Container);

  var _super = Progress_createSuper(Progress);

  function Progress(args) {
    var _this;

    Progress_classCallCheck(this, Progress);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(Progress_CLASS_ROOT);

    _this._inner = new components_Element();

    _this.append(_this._inner);

    _this._inner.class.add(Progress_CLASS_INNER);

    if (args.value !== undefined) {
      _this.value = args.value;
    }

    return _this;
  }

  Progress_createClass(Progress, [{
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(val) {
      if (this._value === val) return;
      this._value = val;
      this._inner.width = "".concat(this._value, "%");
      this.emit('change', val);
    }
  }]);

  return Progress;
}(components_Container);

components_Element.register('progress', Progress);
/* harmony default export */ var components_Progress = (Progress);
// EXTERNAL MODULE: ./src/components/SelectInput/style.scss
var SelectInput_style = __webpack_require__(8589);
;// CONCATENATED MODULE: ./src/helpers/search.js
// calculate, how many string `a`
// requires edits, to become string `b`
var searchStringEditDistance = function searchStringEditDistance(a, b) {
  // Levenshtein distance
  // https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a === b) return 0;
  var i, j;
  var matrix = [];

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }

  return matrix[b.length][a.length];
}; // calculate, how many characters string `b`
// contains of a string `a`

var searchCharsContains = function searchCharsContains(a, b) {
  if (a === b) return a.length;
  var contains = 0;
  var ind = {};
  var i;

  for (i = 0; i < b.length; i++) {
    ind[b.charAt(i)] = true;
  }

  for (i = 0; i < a.length; i++) {
    if (ind[a.charAt(i)]) contains++;
  }

  return contains;
}; // tokenize string into array of tokens

var searchStringTokenize = function searchStringTokenize(name) {
  var tokens = []; // camelCase
  // upperCASE123

  var string = name.replace(/([^A-Z])([A-Z][^A-Z])/g, '$1 $2').replace(/([A-Z0-9]{2,})/g, ' $1'); // space notation
  // dash-notation
  // underscore_notation

  var parts = string.split(/(\s|\-|_)/g); // filter valid tokens

  for (var i = 0; i < parts.length; i++) {
    parts[i] = parts[i].toLowerCase().trim();
    if (parts[i] && parts[i] !== '-' && parts[i] !== '_') tokens.push(parts[i]);
  }

  return tokens;
};

var _searchItems = function _searchItems(items, search, args) {
  var results = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i]; // direct hit

    if (item.subFull !== Infinity) {
      results.push(item);
      if (item.edits === Infinity) item.edits = 0;
      if (item.sub === Infinity) item.sub = item.subFull;
      continue;
    } else if (item.name === search || item.name.indexOf(search) === 0) {
      results.push(item);
      if (item.edits === Infinity) item.edits = 0;
      if (item.sub === Infinity) item.sub = 0;
      continue;
    } // check if name contains enough of search characters


    var contains = searchCharsContains(search, item.name);
    if (contains / search.length < args.containsCharsTolerance) continue;
    var editsCandidate = Infinity;
    var subCandidate = Infinity; // for each token

    for (var t = 0; t < item.tokens.length; t++) {
      // direct token match
      if (item.tokens[t] === search) {
        editsCandidate = 0;
        subCandidate = t;
        break;
      }

      var edits = searchStringEditDistance(search, item.tokens[t]);

      if ((subCandidate === Infinity || edits < editsCandidate) && item.tokens[t].indexOf(search) !== -1) {
        // search is a substring of a token
        subCandidate = t;
        editsCandidate = edits;
        continue;
      } else if (subCandidate === Infinity && edits < editsCandidate) {
        // new edits candidate, not a substring of a token
        if (edits / Math.max(search.length, item.tokens[t].length) <= args.editsDistanceTolerance) {
          // check if edits tolerance is satisfied
          editsCandidate = edits;
        }
      }
    } // no match candidate


    if (editsCandidate === Infinity) continue; // add new result

    results.push(item);
    item.edits = item.edits === Infinity ? editsCandidate : item.edits + editsCandidate;
    item.sub = item.sub === Infinity ? subCandidate : item.sub + subCandidate;
  }

  return results;
}; // perform search through items
// items is an array with arrays of two values
// where first value is a string to be searched by
// and second value is an object to be found
//
// [
//     [ 'camera', {object} ],
//     [ 'New Entity', {object} ],
//     [ 'Sun', {object} ]
// ]
//


var searchItems = function searchItems(items, search, args) {
  var i;
  search = (search || '').toLowerCase().trim();
  if (!search) return [];
  var searchTokens = searchStringTokenize(search);
  if (!searchTokens.length) return [];
  args = args || {};
  args.containsCharsTolerance = args.containsCharsTolerance || 0.5;
  args.editsDistanceTolerance = args.editsDistanceTolerance || 0.5;
  var records = [];

  for (i = 0; i < items.length; i++) {
    var subInd = items[i][0].toLowerCase().trim().indexOf(search);
    records.push({
      name: items[i][0],
      item: items[i][1],
      tokens: searchStringTokenize(items[i][0]),
      edits: Infinity,
      subFull: subInd !== -1 ? subInd : Infinity,
      sub: Infinity
    });
  } // search each token


  for (i = 0; i < searchTokens.length; i++) {
    records = _searchItems(records, searchTokens[i], args);
  } // sort result first by substring? then by edits number


  records.sort(function (a, b) {
    if (a.subFull !== b.subFull) {
      return a.subFull - b.subFull;
    } else if (a.sub !== b.sub) {
      return a.sub - b.sub;
    } else if (a.edits !== b.edits) {
      return a.edits - b.edits;
    }

    return a.name.length - b.name.length;
  }); // return only items without match information

  for (i = 0; i < records.length; i++) {
    records[i] = records[i].item;
  } // limit number of results


  if (args.hasOwnProperty('limitResults') && records.length > args.limitResults) {
    records = records.slice(0, args.limitResults);
  }

  return records;
};
;// CONCATENATED MODULE: ./src/components/SelectInput/index.js
function SelectInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SelectInput_typeof = function _typeof(obj) { return typeof obj; }; } else { SelectInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SelectInput_typeof(obj); }

function SelectInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SelectInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SelectInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) SelectInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) SelectInput_defineProperties(Constructor, staticProps); return Constructor; }

function SelectInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SelectInput_get = Reflect.get; } else { SelectInput_get = function _get(target, property, receiver) { var base = SelectInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SelectInput_get(target, property, receiver || target); }

function SelectInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SelectInput_getPrototypeOf(object); if (object === null) break; } return object; }

function SelectInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SelectInput_setPrototypeOf(subClass, superClass); }

function SelectInput_setPrototypeOf(o, p) { SelectInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SelectInput_setPrototypeOf(o, p); }

function SelectInput_createSuper(Derived) { var hasNativeReflectConstruct = SelectInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = SelectInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = SelectInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return SelectInput_possibleConstructorReturn(this, result); }; }

function SelectInput_possibleConstructorReturn(self, call) { if (call && (SelectInput_typeof(call) === "object" || typeof call === "function")) { return call; } return SelectInput_assertThisInitialized(self); }

function SelectInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SelectInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function SelectInput_getPrototypeOf(o) { SelectInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SelectInput_getPrototypeOf(o); }









var CLASS_SELECT_INPUT = 'pcui-select-input';
var CLASS_SELECT_INPUT_CONTAINER_VALUE = CLASS_SELECT_INPUT + '-container-value';
var CLASS_MULTI_SELECT = CLASS_SELECT_INPUT + '-multi';
var CLASS_ALLOW_INPUT = 'pcui-select-input-allow-input';
var CLASS_VALUE = CLASS_SELECT_INPUT + '-value';
var CLASS_ICON = CLASS_SELECT_INPUT + '-icon';
var CLASS_INPUT = CLASS_SELECT_INPUT + '-textinput';
var CLASS_LIST = CLASS_SELECT_INPUT + '-list';
var CLASS_TAGS = CLASS_SELECT_INPUT + '-tags';
var CLASS_TAGS_EMPTY = CLASS_SELECT_INPUT + '-tags-empty';
var CLASS_TAG = CLASS_SELECT_INPUT + '-tag';
var CLASS_TAG_NOT_EVERYWHERE = CLASS_SELECT_INPUT + '-tag-not-everywhere';
var CLASS_SHADOW = CLASS_SELECT_INPUT + '-shadow';
var CLASS_FIT_HEIGHT = CLASS_SELECT_INPUT + '-fit-height';
var CLASS_SELECTED = 'pcui-selected';
var CLASS_HIGHLIGHTED = CLASS_SELECT_INPUT + '-label-highlighted';
var CLASS_CREATE_NEW = CLASS_SELECT_INPUT + '-create-new';
var CLASS_OPEN = 'pcui-open';
var DEFAULT_BOTTOM_OFFSET = 25;
/**
 * @name SelectInput
 * @classdesc An input that allows selecting from a dropdown or entering tags.
 * @property {boolean} renderChanges If true then the input will flash when its value changes.
 * @property {string} placeholder The placeholder text to show next to the current value.
 * @property {boolean} multiSelect If true then the input value becomes an array allowing the selection of multiple options. Defaults to false.
 * @property {object[]} options The dropdown options of the input. Contains an array of objects with the following format {v: Any, t: String} where v is the value and t is the text of the option.
 * @property {Array} invalidOptions An array of values against which new values are checked before they are created. If a value is in the array it will not be created.
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 */

var SelectInput = /*#__PURE__*/function (_Element) {
  SelectInput_inherits(SelectInput, _Element);

  var _super = SelectInput_createSuper(SelectInput);

  /**
   * Creates a new SelectInput.
   *
   * @param {object} args - The arguments. Extends the pcui.Element constructor arguments.
   * @param {boolean} [args.allowNull] - If true then null is a valid input value. Defaults to false.
   * @param {boolean} [args.allowInput] - If true then a text field is shown for the user to search for values or enter new ones. Defaults to false.
   * @param {boolean} [args.allowCreate] - If true then the input allows creating new values from the text field. Only used when allowInput is true. Defaults to false.
   * @param {Function} [args.createFn] - A function to be executed when the user selects to create a new value. The function takes the new value as a parameter.
   * @param {string} [args.createLabelText] - The placeholder text to show when creating a new value. Used when allowInput and allowCreate are both true.
   * @param {string} [args.type] - The type of each value. Can be one of 'string', 'number' or 'boolean'.
   */
  function SelectInput(args) {
    var _this;

    SelectInput_classCallCheck(this, SelectInput);

    if (!args) args = {}; // main container

    var container = new components_Container({
      dom: args.dom
    });
    _this = _super.call(this, container.dom, args);
    _this._container = container;
    _this._container.parent = SelectInput_assertThisInitialized(_this);

    _this.class.add(CLASS_SELECT_INPUT);

    _this._containerValue = new components_Container({
      class: CLASS_SELECT_INPUT_CONTAINER_VALUE
    });

    _this._container.append(_this._containerValue); // focus / hover shadow element


    _this._domShadow = document.createElement('div');

    _this._domShadow.classList.add(CLASS_SHADOW);

    _this._containerValue.append(_this._domShadow);

    _this._allowInput = args.allowInput || false;

    if (_this._allowInput) {
      _this.class.add(CLASS_ALLOW_INPUT);
    }

    _this._allowCreate = args.allowCreate || false;
    _this._createFn = args.createFn;
    _this._createLabelText = args.createLabelText || null; // displays current value

    _this._labelValue = new components_Label({
      class: CLASS_VALUE,
      tabIndex: 0
    });

    _this._labelValue.on('click', _this._onValueClick.bind(SelectInput_assertThisInitialized(_this)));

    _this._containerValue.append(_this._labelValue);

    _this._timeoutLabelValueTabIndex = null; // dropdown icon

    _this._labelIcon = new components_Label({
      class: CLASS_ICON,
      hidden: args.allowInput && args.multiSelect
    });

    _this._containerValue.append(_this._labelIcon); // input for searching or adding new entries


    _this._input = new components_TextInput({
      class: CLASS_INPUT,
      blurOnEnter: false,
      keyChange: true
    });

    _this._containerValue.append(_this._input);

    _this._lastInputValue = '';
    _this._suspendInputChange = false;

    _this._input.on('change', _this._onInputChange.bind(SelectInput_assertThisInitialized(_this)));

    _this._input.on('keydown', _this._onInputKeyDown.bind(SelectInput_assertThisInitialized(_this)));

    _this._input.on('focus', _this._onFocus.bind(SelectInput_assertThisInitialized(_this)));

    _this._input.on('blur', _this._onBlur.bind(SelectInput_assertThisInitialized(_this)));

    if (args.placeholder) {
      _this.placeholder = args.placeholder;
    } // dropdown list


    _this._containerOptions = new components_Container({
      class: CLASS_LIST,
      hidden: true
    });

    _this._containerValue.append(_this._containerOptions); // tags container


    _this._containerTags = new components_Container({
      class: CLASS_TAGS,
      flex: true,
      flexDirection: 'row',
      hidden: true
    });

    _this._container.append(_this._containerTags);

    if (args.multiSelect) {
      _this.class.add(CLASS_MULTI_SELECT);

      _this._containerTags.hidden = false;
    } // events


    _this._domEvtKeyDown = _this._onKeyDown.bind(SelectInput_assertThisInitialized(_this));
    _this._domEvtFocus = _this._onFocus.bind(SelectInput_assertThisInitialized(_this));
    _this._domEvtBlur = _this._onBlur.bind(SelectInput_assertThisInitialized(_this));
    _this._domEvtMouseDown = _this._onMouseDown.bind(SelectInput_assertThisInitialized(_this));
    _this._domEvtWindowMouseDown = _this._onWindowMouseDown.bind(SelectInput_assertThisInitialized(_this));
    _this._domEvtWheel = _this._onWheel.bind(SelectInput_assertThisInitialized(_this));

    _this._labelValue.dom.addEventListener('keydown', _this._domEvtKeyDown);

    _this._labelValue.dom.addEventListener('focus', _this._domEvtFocus);

    _this._labelValue.dom.addEventListener('blur', _this._domEvtBlur);

    _this._labelValue.dom.addEventListener('mousedown', _this._domEvtMouseDown);

    _this._containerOptions.dom.addEventListener('wheel', _this._domEvtWheel, {
      passive: true
    });

    _this.on('hide', _this.close.bind(SelectInput_assertThisInitialized(_this)));

    _this._type = args.type || 'string';
    _this._optionsIndex = {};
    _this._labelsIndex = {};
    _this._labelHighlighted = null;
    _this.invalidOptions = args.invalidOptions;
    _this.options = args.options || [];
    _this._optionsFn = args.optionsFn;
    _this._allowNull = args.allowNull || false;
    _this._values = null;

    if (args.value !== undefined) {
      _this.value = args.value;
    } else if (args.defaultValue) {
      _this.value = args.defaultValue;
    } else {
      _this.value = null;
    }

    _this.renderChanges = args.renderChanges || false;

    _this.on('change', function () {
      _this._updateInputFieldsVisibility();

      if (_this.renderChanges && !_this.multiSelect) {
        _this._labelValue.flash();
      }
    });

    _this._updateInputFieldsVisibility(false);

    return _this;
  }

  SelectInput_createClass(SelectInput, [{
    key: "_initializeCreateLabel",
    value: function _initializeCreateLabel() {
      var _this2 = this;

      var container = new components_Container({
        class: CLASS_CREATE_NEW,
        flex: true,
        flexDirection: 'row'
      });
      var label = new components_Label({
        text: this._input.value,
        tabIndex: -1
      });
      container.append(label);

      var evtChange = this._input.on('change', function (value) {
        // check if label is destroyed
        // during change event
        if (label.destroyed) return;
        label.text = value;

        if (_this2.invalidOptions && _this2.invalidOptions.indexOf(value) !== -1) {
          if (!container.hidden) {
            container.hidden = true;

            _this2._resizeShadow();
          }
        } else {
          if (container.hidden) {
            container.hidden = false;

            _this2._resizeShadow();
          }
        }
      });

      container.on('click', function (e) {
        e.stopPropagation();
        var text = label.text;

        _this2.focus();

        _this2.close();

        if (_this2._createFn) {
          _this2._createFn(text);
        } else if (text) {
          _this2._onSelectValue(text);
        }
      });
      label.on('destroy', function () {
        evtChange.unbind();
        evtChange = null;
      });
      var labelCreateText = new components_Label({
        text: this._createLabelText
      });
      container.append(labelCreateText);

      this._containerOptions.append(container);

      return container;
    }
  }, {
    key: "_convertSingleValue",
    value: function _convertSingleValue(value) {
      if (value === null && this._allowNull) return value;

      if (this._type === 'string') {
        if (!value) {
          value = '';
        } else {
          value = value.toString();
        }
      } else if (this._type === 'number') {
        if (!value) {
          value = 0;
        } else {
          value = parseInt(value, 10);
        }
      } else if (this._type === 'boolean') {
        return !!value;
      }

      return value;
    }
  }, {
    key: "_convertValue",
    value: function _convertValue(value) {
      var _this3 = this;

      if (value === null && this._allowNull) return value;

      if (this.multiSelect) {
        if (!Array.isArray(value)) return value;
        return value.map(function (val) {
          return _this3._convertSingleValue(val);
        });
      }

      return this._convertSingleValue(value);
    } // toggle dropdown list

  }, {
    key: "_onValueClick",
    value: function _onValueClick() {
      if (!this.enabled || this.readOnly) return;
      this.toggle();
    } // Update our value with the specified selected option

  }, {
    key: "_onSelectValue",
    value: function _onSelectValue(value) {
      value = this._convertSingleValue(value);

      if (!this.multiSelect) {
        this.value = value;
        return;
      }

      if (this._values) {
        var dirty = false;

        this._values.forEach(function (arr) {
          if (!arr) {
            arr = [value];
            dirty = true;
          } else {
            if (arr.indexOf(value) === -1) {
              arr.push(value);
              dirty = true;
            }
          }
        });

        if (dirty) {
          this._onMultipleValuesChange(this._values);

          this.emit('change', this.value);

          if (this._binding) {
            this._binding.addValues([value]);
          }
        }
      } else {
        if (!this._value || !Array.isArray(this._value)) {
          this.value = [value];
        } else {
          if (this._value.indexOf(value) === -1) {
            this._value.push(value);

            this._addTag(value);

            this.emit('change', this.value);

            if (this._binding) {
              this._binding.addValues([value]);
            }
          }
        }
      }
    }
  }, {
    key: "_highlightLabel",
    value: function _highlightLabel(label) {
      if (this._labelHighlighted === label) return;

      if (this._labelHighlighted) {
        this._labelHighlighted.class.remove(CLASS_HIGHLIGHTED);
      }

      this._labelHighlighted = label;

      if (this._labelHighlighted) {
        this._labelHighlighted.class.add(CLASS_HIGHLIGHTED); // scroll into view if necessary


        var labelTop = this._labelHighlighted.dom.offsetTop;
        var scrollTop = this._containerOptions.dom.scrollTop;

        if (labelTop < scrollTop) {
          this._containerOptions.dom.scrollTop = labelTop;
        } else if (labelTop + this._labelHighlighted.height > this._containerOptions.height + scrollTop) {
          this._containerOptions.dom.scrollTop = labelTop + this._labelHighlighted.height - this._containerOptions.height;
        }
      }
    } // when the value is changed show the correct title

  }, {
    key: "_onValueChange",
    value: function _onValueChange(value) {
      var _this4 = this;

      if (!this.multiSelect) {
        this._labelValue.value = this._optionsIndex[value] || '';
        value = '' + value;

        for (var key in this._labelsIndex) {
          if (key === value) {
            this._labelsIndex[key].class.add(CLASS_SELECTED);
          } else {
            this._labelsIndex[key].class.remove(CLASS_SELECTED);
          }
        }
      } else {
        this._labelValue.value = '';

        this._containerTags.clear();

        this._containerTags.class.add(CLASS_TAGS_EMPTY);

        if (value && Array.isArray(value)) {
          value.forEach(function (val) {
            _this4._addTag(val);

            if (_this4._labelsIndex[val]) {
              _this4._labelsIndex[val].class.add(CLASS_SELECTED);
            }
          });

          for (var _key in this._labelsIndex) {
            if (value.indexOf(this._convertSingleValue(_key)) !== -1) {
              this._labelsIndex[_key].class.add(CLASS_SELECTED);
            } else {
              this._labelsIndex[_key].class.remove(CLASS_SELECTED);
            }
          }
        }
      }
    }
  }, {
    key: "_onMultipleValuesChange",
    value: function _onMultipleValuesChange(values) {
      var _this5 = this;

      this._labelValue.value = '';

      this._containerTags.clear();

      this._containerTags.class.add(CLASS_TAGS_EMPTY);

      var tags = {};
      var valueCounts = {};
      values.forEach(function (arr) {
        if (!arr) return;
        arr.forEach(function (val) {
          if (!tags[val]) {
            tags[val] = _this5._addTag(val);
            valueCounts[val] = 1;
          } else {
            valueCounts[val]++;
          }
        });
      }); // add special class to tags that do not exist everywhere

      for (var val in valueCounts) {
        if (valueCounts[val] !== values.length) {
          tags[val].class.add(CLASS_TAG_NOT_EVERYWHERE);

          if (this._labelsIndex[val]) {
            this._labelsIndex[val].class.remove(CLASS_SELECTED);
          }
        }
      }
    }
  }, {
    key: "_addTag",
    value: function _addTag(value) {
      var _this6 = this;

      var container = new components_Container({
        flex: true,
        flexDirection: 'row',
        class: CLASS_TAG
      });
      container.append(new components_Label({
        text: this._optionsIndex[value] || value
      }));
      var btnRemove = new components_Button({
        size: 'small',
        icon: 'E132',
        tabIndex: -1
      });
      container.append(btnRemove);
      btnRemove.on('click', function () {
        return _this6._removeTag(container, value);
      });

      this._containerTags.append(container);

      this._containerTags.class.remove(CLASS_TAGS_EMPTY);

      if (this._labelsIndex[value]) {
        this._labelsIndex[value].class.add(CLASS_SELECTED);
      }

      container.value = value;
      return container;
    }
  }, {
    key: "_removeTag",
    value: function _removeTag(tagElement, value) {
      tagElement.destroy();

      if (this._labelsIndex[value]) {
        this._labelsIndex[value].class.remove(CLASS_SELECTED);
      }

      if (this._values) {
        this._values.forEach(function (arr) {
          if (!arr) return;
          var idx = arr.indexOf(value);

          if (idx !== -1) {
            arr.splice(idx, 1);
          }
        });
      } else if (this._value && Array.isArray(this._value)) {
        var idx = this._value.indexOf(value);

        if (idx !== -1) {
          this._value.splice(idx, 1);
        }
      }

      this.emit('change', this.value);

      if (this._binding) {
        this._binding.removeValues([value]);
      }
    }
  }, {
    key: "_onInputChange",
    value: function _onInputChange(value) {
      if (this._suspendInputChange) return;
      if (this._lastInputValue === value) return;
      this.open();
      this._lastInputValue = value;

      this._filterOptions(value);
    }
  }, {
    key: "_filterOptions",
    value: function _filterOptions(filter) {
      var _this7 = this;

      // first remove all options
      // then search the options for best matches
      // and add them back in best match order
      var containerDom = this._containerOptions.dom;

      while (containerDom.firstChild) {
        containerDom.removeChild(containerDom.lastChild);
      }

      if (filter) {
        var searchOptions = this.options.map(function (option) {
          return [option.t, option.v];
        });
        var searchResults = searchItems(searchOptions, filter);
        searchResults.forEach(function (value) {
          containerDom.appendChild(_this7._labelsIndex[value].dom);
        });
      } else {
        this.options.forEach(function (option) {
          containerDom.appendChild(_this7._labelsIndex[option.v].dom);
        });
      } // append create label in the end


      if (this._createLabelContainer) {
        containerDom.appendChild(this._createLabelContainer.dom);
      }

      if (containerDom.firstChild) {
        this._highlightLabel(containerDom.firstChild.ui);
      }

      this._resizeShadow();
    }
  }, {
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(evt) {
      if (evt.keyCode === 13 && this.enabled && !this.readOnly) {
        evt.stopPropagation();
        evt.preventDefault(); // on enter

        var value;

        if (this._labelHighlighted && this._labelHighlighted._optionValue !== undefined) {
          value = this._labelHighlighted._optionValue;
        } else {
          value = this._input.value;
        }

        if (value !== undefined) {
          this.focus();
          this.close();

          if (this._optionsIndex[value]) {
            this._onSelectValue(value);
          } else if (this._allowCreate) {
            if (this._createFn) {
              this._createFn(value);
            } else {
              this._onSelectValue(value);
            }
          }

          return;
        }
      }

      this._onKeyDown(evt);
    }
  }, {
    key: "_onWindowMouseDown",
    value: function _onWindowMouseDown(evt) {
      if (this.dom.contains(evt.target)) return;
      this.close();
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(evt) {
      // close options on ESC and blur
      if (evt.keyCode === 27) {
        this.close();
        return;
      } // handle tab


      if (evt.keyCode === 9) {
        this.close();
        return;
      }

      if (!this.enabled || this.readOnly) return;

      if (evt.keyCode === 13 && !this._allowInput) {
        if (this._labelHighlighted && this._labelHighlighted._optionValue !== undefined) {
          this._onSelectValue(this._labelHighlighted._optionValue);

          this.close();
        }

        return;
      }

      if ([38, 40].indexOf(evt.keyCode) === -1) {
        return;
      }

      evt.stopPropagation();
      evt.preventDefault();

      if ((this._allowInput || this.multiSelect) && this._containerOptions.hidden) {
        this.open();
        return;
      }

      if (this._containerOptions.hidden) {
        if (!this._options.length) return;
        var index = -1;

        for (var i = 0; i < this._options.length; i++) {
          if (this._options[i].v === this.value) {
            index = i;
            break;
          }
        }

        if (evt.keyCode === 38) {
          index--;
        } else if (evt.keyCode === 40) {
          index++;
        }

        if (index >= 0 && index < this._options.length) {
          this._onSelectValue(this._options[index].v);
        }
      } else {
        if (!this._containerOptions.dom.childNodes.length) return;

        if (!this._labelHighlighted) {
          this._highlightLabel(this._containerOptions.dom.childNodes[0].ui);
        } else {
          var highlightedLabelDom = this._labelHighlighted.dom;

          do {
            if (evt.keyCode === 38) {
              highlightedLabelDom = highlightedLabelDom.previousSibling;
            } else if (evt.keyCode === 40) {
              highlightedLabelDom = highlightedLabelDom.nextSibling;
            }
          } while (highlightedLabelDom && highlightedLabelDom.ui.hidden);

          if (highlightedLabelDom) {
            this._highlightLabel(highlightedLabelDom.ui);
          }
        }
      }
    }
  }, {
    key: "_resizeShadow",
    value: function _resizeShadow() {
      this._domShadow.style.height = this._containerValue.height + this._containerOptions.height + 'px';
    }
  }, {
    key: "_onMouseDown",
    value: function _onMouseDown() {
      if (!this._allowInput) {
        this.focus();
      }
    }
  }, {
    key: "_onFocus",
    value: function _onFocus() {
      this.class.add(FOCUS);
      this.emit('focus');

      if (!this._input.hidden) {
        this.open();
      }
    }
  }, {
    key: "_onBlur",
    value: function _onBlur() {
      this.class.remove(FOCUS);
      this.emit('blur');
    }
  }, {
    key: "_onWheel",
    value: function _onWheel(evt) {
      // prevent scrolling on other stuff like the viewport
      // when we are scrolling on the select input
      evt.stopPropagation();
    }
  }, {
    key: "_updateInputFieldsVisibility",
    value: function _updateInputFieldsVisibility(focused) {
      var _this8 = this;

      var showInput = false;
      var focusInput = false;

      if (this._allowInput) {
        if (focused) {
          showInput = true;
          focusInput = true;
        } else {
          showInput = this.multiSelect || !this._labelsIndex[this.value];
        }
      }

      this._labelValue.hidden = showInput;
      this._labelIcon.hidden = showInput;
      this._input.hidden = !showInput;

      if (focusInput) {
        this._input.focus();
      }

      if (!this._labelValue.hidden) {
        // prevent label from being focused
        // right after input gets unfocused
        this._labelValue.tabIndex = -1;

        if (!this._timeoutLabelValueTabIndex) {
          this._timeoutLabelValueTabIndex = requestAnimationFrame(function () {
            _this8._timeoutLabelValueTabIndex = null;
            _this8._labelValue.tabIndex = 0;
          });
        }
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this._input.hidden) {
        this._labelValue.dom.focus();
      } else {
        this._input.focus();
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      if (this._allowInput) {
        this._input.blur();
      } else {
        this._labelValue.dom.blur();
      }
    }
    /**
     * @name SelectInput#open
     * @description Opens the dropdown menu
     */

  }, {
    key: "open",
    value: function open() {
      var _this9 = this;

      if (!this._containerOptions.hidden || !this.enabled || this.readOnly) return;

      this._updateInputFieldsVisibility(true); // auto-update options if necessary


      if (this._optionsFn) {
        this.options = this._optionsFn();
      }

      if (this._containerOptions.dom.childNodes.length === 0) return; // highlight label that displays current value

      this._containerOptions.forEachChild(function (label) {
        label.hidden = false;

        if (label._optionValue === _this9.value) {
          _this9._highlightLabel(label);
        }
      });

      if (!this._labelHighlighted) {
        this._highlightLabel(this._containerOptions.dom.childNodes[0].ui);
      } // show options


      this._containerOptions.hidden = false;
      this.class.add(CLASS_OPEN); // register keydown on entire window

      window.addEventListener('keydown', this._domEvtKeyDown); // register mousedown on entire window

      window.addEventListener('mousedown', this._domEvtWindowMouseDown); // if the dropdown list goes below the window show it above the field

      var startField = this._allowInput ? this._input.dom : this._labelValue.dom;
      var rect = startField.getBoundingClientRect();
      var fitHeight = rect.bottom + this._containerOptions.height + DEFAULT_BOTTOM_OFFSET >= window.innerHeight;

      if (fitHeight && rect.top - this._containerOptions.height < 0) {
        // if showing it above the field means that some of it will not be visible
        // then show it below instead and adjust the max height to the maximum available space
        fitHeight = false;
        this._containerOptions.style.maxHeight = window.innerHeight - rect.bottom - DEFAULT_BOTTOM_OFFSET + 'px';
      }

      if (fitHeight) {
        this.class.add(CLASS_FIT_HEIGHT);
      } else {
        this.class.remove(CLASS_FIT_HEIGHT);
      } // resize the outer shadow to fit the element and the dropdown list
      // we need this because the dropdown list is position: absolute


      this._resizeShadow();
    }
    /**
     * @name SelectInput#close
     * @description Closes the dropdown menu
     */

  }, {
    key: "close",
    value: function close() {
      // there is a potential bug here if the user has set a max height
      // themselves then this will be overriden
      this._containerOptions.style.maxHeight = '';

      this._highlightLabel(null);

      this._updateInputFieldsVisibility(false);

      this._suspendInputChange = true;
      this._input.value = '';

      if (this._lastInputValue) {
        this._lastInputValue = '';

        this._filterOptions(null);
      }

      this._suspendInputChange = false;
      if (this._containerOptions.hidden) return;
      this._containerOptions.hidden = true;
      this._domShadow.style.height = '';
      this.class.remove(CLASS_OPEN);
      window.removeEventListener('keydown', this._domEvtKeyDown);
      window.removeEventListener('mousedown', this._domEvtWindowMouseDown);
    }
    /**
     * @name SelectInput#toggle
     * @description Toggles the dropdown menu
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this._containerOptions.hidden) {
        this.open();
      } else {
        this.close();
      }
    }
  }, {
    key: "unlink",
    value: function unlink() {
      SelectInput_get(SelectInput_getPrototypeOf(SelectInput.prototype), "unlink", this).call(this);

      if (!this._containerOptions.hidden) {
        this.close();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      this._labelValue.dom.removeEventListener('keydown', this._domEvtKeyDown);

      this._labelValue.dom.removeEventListener('mousedown', this._domEvtMouseDown);

      this._labelValue.dom.removeEventListener('focus', this._domEvtFocus);

      this._labelValue.dom.removeEventListener('blur', this._domEvtBlur);

      this._containerOptions.dom.removeEventListener('wheel', this._domEvtWheel);

      window.removeEventListener('keydown', this._domEvtKeyDown);
      window.removeEventListener('mousedown', this._domEvtWindowMouseDown);

      if (this._timeoutLabelValueTabIndex) {
        cancelAnimationFrame(this._timeoutLabelValueTabIndex);
        this._timeoutLabelValueTabIndex = null;
      }

      SelectInput_get(SelectInput_getPrototypeOf(SelectInput.prototype), "destroy", this).call(this);
    }
  }, {
    key: "options",
    get: function get() {
      return this._options.slice();
    },
    set: function set(value) {
      var _this10 = this;

      if (this._options && this._options === value) return;

      this._containerOptions.clear();

      this._labelHighlighted = null;
      this._optionsIndex = {};
      this._labelsIndex = {};
      this._options = value; // store each option value -> title pair in the optionsIndex

      this._options.forEach(function (option) {
        _this10._optionsIndex[option.v] = option.t;
        if (option.v === '') return;
        var label = new components_Label({
          text: option.t,
          tabIndex: -1
        });
        label._optionValue = option.v; // store labels in an index too

        _this10._labelsIndex[option.v] = label; // on clicking an option set it as the value and close the dropdown list

        label.on('click', function (e) {
          e.stopPropagation();

          _this10._onSelectValue(option.v);

          _this10.close();
        });

        _this10._containerOptions.append(label);
      });

      this._createLabelContainer = null;

      if (this._createLabelText) {
        this._createLabelContainer = this._initializeCreateLabel();
      }

      if (this.multiSelect && this._values) {
        this._onMultipleValuesChange(this._values);
      } else {
        this._onValueChange(this.value);
      }

      if (this._lastInputValue) {
        this._filterOptions(this._lastInputValue);
      }
    }
  }, {
    key: "invalidOptions",
    get: function get() {
      return this._invalidOptions;
    },
    set: function set(value) {
      this._invalidOptions = value || null;
    }
  }, {
    key: "multiSelect",
    get: function get() {
      return this.class.contains(CLASS_MULTI_SELECT);
    }
  }, {
    key: "value",
    get: function get() {
      if (!this.multiSelect) {
        return this._value;
      } // if multi-select then construct an array
      // value from the tags that are currently visible


      var result = [];

      this._containerTags.dom.childNodes.forEach(function (dom) {
        result.push(dom.ui.value);
      });

      return result;
    },
    set: function set(value) {
      this._values = null;
      this._suspendInputChange = true;
      this._input.value = '';

      if (this._lastInputValue) {
        this._lastInputValue = '';

        this._filterOptions(null);
      }

      this._suspendInputChange = false;
      this.class.remove(MULTIPLE_VALUES);
      value = this._convertValue(value);

      if (this._value === value || this.multiSelect && this._value && this._value.equals(value)) {
        // if the value is null because we are showing multiple values
        // but someone wants to actually set the value of all observers to null
        // then make sure we do not return early
        if (value !== null || !this._allowNull || !this.class.contains(MULTIPLE_VALUES)) {
          return;
        }
      }

      this._value = value;

      this._onValueChange(value);

      this.emit('change', value);

      if (this._binding) {
        this._binding.setValue(value);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      values = values.map(this._convertValue.bind(this));
      var different = false;
      var value = values[0];
      var multiSelect = this.multiSelect;
      this._values = null;

      for (var i = 1; i < values.length; i++) {
        if (values[i] !== value && (!multiSelect || !values[i] || !values[i].equals(value))) {
          different = true;
          break;
        }
      }

      if (different) {
        this._labelValue.values = values; // show all different tags

        if (multiSelect) {
          this._values = values;
          this._value = null;

          this._onMultipleValuesChange(this._values);

          this.emit('change', this.value);
        } else {
          if (this._value !== null) {
            this._value = null;
            this.emit('change', null);
          }
        }

        this.class.add(MULTIPLE_VALUES);
      } else {
        this.value = values[0];
      }
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this._input.placeholder;
    },
    set: function set(value) {
      this._input.placeholder = value;
    }
  }]);

  return SelectInput;
}(components_Element);

components_Element.register('select', SelectInput, {
  renderChanges: true
});
components_Element.register('multiselect', SelectInput, {
  multiSelect: true,
  renderChanges: true
});
components_Element.register('tags', SelectInput, {
  allowInput: true,
  allowCreate: true,
  multiSelect: true,
  renderChanges: true
});
/* harmony default export */ var components_SelectInput = (SelectInput);
// EXTERNAL MODULE: ./src/components/SliderInput/style.scss
var SliderInput_style = __webpack_require__(5345);
;// CONCATENATED MODULE: ./src/components/SliderInput/index.js
function SliderInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SliderInput_typeof = function _typeof(obj) { return typeof obj; }; } else { SliderInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SliderInput_typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { SliderInput_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SliderInput_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SliderInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SliderInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SliderInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) SliderInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) SliderInput_defineProperties(Constructor, staticProps); return Constructor; }

function SliderInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SliderInput_get = Reflect.get; } else { SliderInput_get = function _get(target, property, receiver) { var base = SliderInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SliderInput_get(target, property, receiver || target); }

function SliderInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SliderInput_getPrototypeOf(object); if (object === null) break; } return object; }

function SliderInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SliderInput_setPrototypeOf(subClass, superClass); }

function SliderInput_setPrototypeOf(o, p) { SliderInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SliderInput_setPrototypeOf(o, p); }

function SliderInput_createSuper(Derived) { var hasNativeReflectConstruct = SliderInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = SliderInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = SliderInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return SliderInput_possibleConstructorReturn(this, result); }; }

function SliderInput_possibleConstructorReturn(self, call) { if (call && (SliderInput_typeof(call) === "object" || typeof call === "function")) { return call; } return SliderInput_assertThisInitialized(self); }

function SliderInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SliderInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function SliderInput_getPrototypeOf(o) { SliderInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SliderInput_getPrototypeOf(o); }






var CLASS_SLIDER = 'pcui-slider';
var CLASS_SLIDER_CONTAINER = CLASS_SLIDER + '-container';
var CLASS_SLIDER_BAR = CLASS_SLIDER + '-bar';
var CLASS_SLIDER_HANDLE = CLASS_SLIDER + '-handle';
var CLASS_SLIDER_ACTIVE = CLASS_SLIDER + '-active';
var IS_CHROME = /Chrome\//.test(navigator.userAgent); // fields that are proxied between the slider and the numeric input

var PROXY_FIELDS = ['allowNull', 'max', 'min', 'keyChange', 'placeholder', 'precision', 'renderChanges', 'step'];
/**
 * @name SliderInput
 * @classdesc The SliderInput shows a pcui.NumericInput and a slider widget next to it. It acts as a proxy
 * of the NumericInput.
 * @property {number} min Gets / sets the minimum value that the numeric input field can take.
 * @property {number} max Gets / sets the maximum value that the numeric input field can take.
 * @property {number} sliderMin Gets / sets the minimum value that the slider field can take.
 * @property {number} sliderMax Gets / sets the maximum value that the slider field can take.
 * @property {number} pre Gets / sets the maximum number of decimals a value can take.
 * @property {number} step Gets / sets the amount that the value will be increased or decreased when using the arrow keys. Holding Shift will use 10x the step.
 * @property {boolean} allowNull Gets / sets whether the value can be null. If not then it will be 0 instead of null.
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 */

var SliderInput = /*#__PURE__*/function (_Element) {
  SliderInput_inherits(SliderInput, _Element);

  var _super = SliderInput_createSuper(SliderInput);

  /**
   * Creates a new SliderInput.
   *
   * @param {object} args - The arguments. Extends the pcui.NumericInput constructor arguments.
   */
  function SliderInput(args) {
    var _this;

    SliderInput_classCallCheck(this, SliderInput);

    args = Object.assign({}, args);
    var inputArgs = {};
    PROXY_FIELDS.forEach(function (field) {
      inputArgs[field] = args[field];
    });

    if (inputArgs.precision === undefined) {
      inputArgs.precision = 2;
    } // binding should only go to the slider
    // and the slider will propagate changes to the numeric input


    delete inputArgs.binding;
    _this = _super.call(this, args.dom ? args.dom : document.createElement('div'), args);
    if (args.pre) _this.precision = args.pre;

    _this.class.add(CLASS_SLIDER);

    _this._historyCombine = false;
    _this._historyPostfix = null;
    _this._numericInput = new components_NumericInput(_objectSpread(_objectSpread({}, inputArgs), {}, {
      hideSlider: true
    })); // propagate change event

    _this._numericInput.on('change', _this._onValueChange.bind(SliderInput_assertThisInitialized(_this))); // propagate focus / blur events


    _this._numericInput.on('focus', function () {
      _this.emit('focus');
    });

    _this._numericInput.on('blur', function () {
      _this.emit('blur');
    });

    _this._sliderMin = args.sliderMin !== undefined ? args.sliderMin : _this.min || 0;
    _this._sliderMax = args.sliderMax !== undefined ? args.sliderMax : _this.max || 1;

    _this.dom.appendChild(_this._numericInput.dom);

    _this._numericInput.parent = SliderInput_assertThisInitialized(_this);
    _this._domSlider = document.createElement('div');

    _this._domSlider.classList.add(CLASS_SLIDER_CONTAINER);

    _this.dom.appendChild(_this._domSlider);

    _this._domBar = document.createElement('div');

    _this._domBar.classList.add(CLASS_SLIDER_BAR);

    _this._domBar.ui = SliderInput_assertThisInitialized(_this);

    _this._domSlider.appendChild(_this._domBar);

    _this._domHandle = document.createElement('div');
    _this._domHandle.ui = SliderInput_assertThisInitialized(_this);
    _this._domHandle.tabIndex = 0;

    _this._domHandle.classList.add(CLASS_SLIDER_HANDLE);

    _this._domBar.appendChild(_this._domHandle);

    _this._cursorHandleOffset = 0;
    _this._domMouseDown = _this._onMouseDown.bind(SliderInput_assertThisInitialized(_this));
    _this._domMouseMove = _this._onMouseMove.bind(SliderInput_assertThisInitialized(_this));
    _this._domMouseUp = _this._onMouseUp.bind(SliderInput_assertThisInitialized(_this));
    _this._domTouchStart = _this._onTouchStart.bind(SliderInput_assertThisInitialized(_this));
    _this._domTouchMove = _this._onTouchMove.bind(SliderInput_assertThisInitialized(_this));
    _this._domTouchEnd = _this._onTouchEnd.bind(SliderInput_assertThisInitialized(_this));
    _this._domKeyDown = _this._onKeyDown.bind(SliderInput_assertThisInitialized(_this));
    _this._touchId = null;

    _this._domSlider.addEventListener('mousedown', _this._domMouseDown);

    _this._domSlider.addEventListener('touchstart', _this._domTouchStart, {
      passive: true
    });

    _this._domHandle.addEventListener('keydown', _this._domKeyDown);

    if (args.value !== undefined) {
      _this.value = args.value;
    } // update the handle in case a 0 value has been
    // passed through the constructor


    if (_this.value === 0) {
      _this._updateHandle(0);
    }

    return _this;
  }

  SliderInput_createClass(SliderInput, [{
    key: "_onMouseDown",
    value: function _onMouseDown(evt) {
      if (evt.button !== 0 || !this.enabled || this.readOnly) return;

      this._onSlideStart(evt.pageX);
    }
  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      this._onSlideMove(evt.pageX);
    }
  }, {
    key: "_onMouseUp",
    value: function _onMouseUp(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      this._onSlideEnd(evt.pageX);
    }
  }, {
    key: "_onTouchStart",
    value: function _onTouchStart(evt) {
      if (!this.enabled || this.readOnly) return;

      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];
        if (!touch.target.ui || touch.target.ui !== this) continue;
        this._touchId = touch.identifier;

        this._onSlideStart(touch.pageX);

        break;
      }
    }
  }, {
    key: "_onTouchMove",
    value: function _onTouchMove(evt) {
      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];
        if (touch.identifier !== this._touchId) continue;
        evt.stopPropagation();
        evt.preventDefault();

        this._onSlideMove(touch.pageX);

        break;
      }
    }
  }, {
    key: "_onTouchEnd",
    value: function _onTouchEnd(evt) {
      for (var i = 0; i < evt.changedTouches.length; i++) {
        var touch = evt.changedTouches[i];
        if (touch.identifier !== this._touchId) continue;
        evt.stopPropagation();
        evt.preventDefault();

        this._onSlideEnd(touch.pageX);

        this._touchId = null;
        break;
      }
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(evt) {
      if (evt.keyCode === 27) {
        this.blur();
        return;
      }

      if (!this.enabled || this.readOnly) return; // move slider with left / right arrow keys

      if (evt.keyCode !== 37 && evt.keyCode !== 39) return;
      evt.stopPropagation();
      evt.preventDefault();
      var x = evt.keyCode === 37 ? -1 : 1;

      if (evt.shiftKey) {
        x *= 10;
      }

      this.value += x * this.step;
    }
  }, {
    key: "_updateHandle",
    value: function _updateHandle(value) {
      var left = Math.max(0, Math.min(1, ((value || 0) - this._sliderMin) / (this._sliderMax - this._sliderMin))) * 100;

      var handleWidth = this._domHandle.getBoundingClientRect().width;

      this._domHandle.style.left = "calc(".concat(left, "% + ").concat(handleWidth / 2, "px)");
    }
  }, {
    key: "_onValueChange",
    value: function _onValueChange(value) {
      this._updateHandle(value);

      this.emit('change', value);

      if (this._binding) {
        this._binding.setValue(value);
      }
    } // Calculates the distance in pixels between
    // the cursor x and the middle of the handle.
    // If the cursor is not on the handle sets the offset to 0

  }, {
    key: "_calculateCursorHandleOffset",
    value: function _calculateCursorHandleOffset(pageX) {
      // not sure why but the left side needs a margin of a couple of pixels
      // to properly determine if the cursor is on the handle (in Chrome)
      var margin = IS_CHROME ? 2 : 0;

      var rect = this._domHandle.getBoundingClientRect();

      var left = rect.left - margin;
      var right = rect.right;

      if (pageX >= left && pageX <= right) {
        this._cursorHandleOffset = pageX - (left + (right - left) / 2);
      } else {
        this._cursorHandleOffset = 0;
      }

      return this._cursorHandleOffset;
    }
  }, {
    key: "_onSlideStart",
    value: function _onSlideStart(pageX) {
      this._domHandle.focus();

      if (this._touchId === null) {
        window.addEventListener('mousemove', this._domMouseMove);
        window.addEventListener('mouseup', this._domMouseUp);
      } else {
        window.addEventListener('touchmove', this._domTouchMove);
        window.addEventListener('touchend', this._domTouchEnd);
      }

      this.class.add(CLASS_SLIDER_ACTIVE); // calculate the cursor - handle offset. If there is
      // an offset that means the cursor is on the handle so
      // do not move the handle until the cursor moves.

      if (!this._calculateCursorHandleOffset(pageX)) {
        this._onSlideMove(pageX);
      }

      if (this.binding) {
        this._historyCombine = this.binding.historyCombine;
        this._historyPostfix = this.binding.historyPostfix;
        this.binding.historyCombine = true;
        this.binding.historyPostfix = "(".concat(Date.now(), ")");
      }
    }
  }, {
    key: "_onSlideMove",
    value: function _onSlideMove(pageX) {
      var rect = this._domBar.getBoundingClientRect(); // reduce pageX by the initial cursor - handle offset


      pageX -= this._cursorHandleOffset;
      var x = Math.max(0, Math.min(1, (pageX - rect.left) / rect.width));
      var range = this._sliderMax - this._sliderMin;
      var value = x * range + this._sliderMin;
      value = parseFloat(value.toFixed(this.precision), 10);
      this.value = value;
    }
  }, {
    key: "_onSlideEnd",
    value: function _onSlideEnd(pageX) {
      // when slide ends only move the handle if the cursor is no longer
      // on the handle
      if (!this._calculateCursorHandleOffset(pageX)) {
        this._onSlideMove(pageX);
      }

      this.class.remove(CLASS_SLIDER_ACTIVE);

      if (this._touchId === null) {
        window.removeEventListener('mousemove', this._domMouseMove);
        window.removeEventListener('mouseup', this._domMouseUp);
      } else {
        window.removeEventListener('touchmove', this._domTouchMove);
        window.removeEventListener('touchend', this._domTouchEnd);
      }

      if (this.binding) {
        this.binding.historyCombine = this._historyCombine;
        this.binding.historyPostfix = this._historyPostfix;
        this._historyCombine = false;
        this._historyPostfix = null;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this._numericInput.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this._domHandle.blur();

      this._numericInput.blur();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      this._domSlider.removeEventListener('mousedown', this._domMouseDown);

      this._domSlider.removeEventListener('touchstart', this._domTouchStart);

      this._domHandle.removeEventListener('keydown', this._domKeyDown);

      this.dom.removeEventListener('mouseup', this._domMouseUp);
      this.dom.removeEventListener('mousemove', this._domMouseMove);
      this.dom.removeEventListener('touchmove', this._domTouchMove);
      this.dom.removeEventListener('touchend', this._domTouchEnd);

      SliderInput_get(SliderInput_getPrototypeOf(SliderInput.prototype), "destroy", this).call(this);
    }
  }, {
    key: "sliderMin",
    get: function get() {
      return this._sliderMin;
    },
    set: function set(value) {
      if (this._sliderMin === value) return;
      this._sliderMin = value;

      this._updateHandle(this.value);
    }
  }, {
    key: "sliderMax",
    get: function get() {
      return this._sliderMax;
    },
    set: function set(value) {
      if (this._sliderMax === value) return;
      this._sliderMax = value;

      this._updateHandle(this.value);
    }
  }, {
    key: "value",
    get: function get() {
      return this._numericInput.value;
    },
    set: function set(value) {
      this._numericInput.value = value;

      if (this._numericInput.class.contains(MULTIPLE_VALUES)) {
        this.class.add(MULTIPLE_VALUES);
      } else {
        this.class.remove(MULTIPLE_VALUES);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      this._numericInput.values = values;

      if (this._numericInput.class.contains(MULTIPLE_VALUES)) {
        this.class.add(MULTIPLE_VALUES);
      } else {
        this.class.remove(MULTIPLE_VALUES);
      }
    }
  }]);

  return SliderInput;
}(components_Element);

helpers_utils.proxy(SliderInput, '_numericInput', PROXY_FIELDS);
components_Element.register('slider', SliderInput, {
  renderChanges: true
});
/* harmony default export */ var components_SliderInput = (SliderInput);
// EXTERNAL MODULE: ./src/components/Spinner/style.scss
var Spinner_style = __webpack_require__(7864);
;// CONCATENATED MODULE: ./src/components/Spinner/index.js
function Spinner_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Spinner_typeof = function _typeof(obj) { return typeof obj; }; } else { Spinner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Spinner_typeof(obj); }

function Spinner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Spinner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Spinner_setPrototypeOf(subClass, superClass); }

function Spinner_setPrototypeOf(o, p) { Spinner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Spinner_setPrototypeOf(o, p); }

function Spinner_createSuper(Derived) { var hasNativeReflectConstruct = Spinner_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Spinner_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Spinner_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Spinner_possibleConstructorReturn(this, result); }; }

function Spinner_possibleConstructorReturn(self, call) { if (call && (Spinner_typeof(call) === "object" || typeof call === "function")) { return call; } return Spinner_assertThisInitialized(self); }

function Spinner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Spinner_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function Spinner_getPrototypeOf(o) { Spinner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Spinner_getPrototypeOf(o); }



var Spinner_CLASS_ROOT = 'pcui-spinner';

function createSmallThick(size, dom) {
  var spinner = dom || document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  spinner.classList.add('spin');
  spinner.setAttribute('width', size);
  spinner.setAttribute('height', size);
  spinner.setAttribute('viewBox', '0 0 14 14');
  spinner.setAttribute('fill', 'none');
  spinner.innerHTML = '<path d="M7 14C3.13871 14 0 10.8613 0 7C0 3.13871 3.13871 0 7 0C10.8613 0 14 3.13871 14 7C14 10.8613 10.8613 14 7 14ZM7 2.25806C4.38064 2.25806 2.25806 4.38064 2.25806 7C2.25806 9.61935 4.38064 11.7419 7 11.7419C9.61935 11.7419 11.7419 9.61935 11.7419 7C11.7419 4.38064 9.61935 2.25806 7 2.25806Z" fill="#773417"/><path class="pcui-spinner-highlight" d="M7 14V11.7419C9.61935 11.7419 11.7419 9.61935 11.7419 7H14C14 10.8613 10.8613 14 7 14Z" fill="#FF6600"/>';
  return spinner;
}
/**
 * @name Spinner
 * @augments Element
 * @classdesc Represents a spinning icon
 */


var Spinner = /*#__PURE__*/function (_Element) {
  Spinner_inherits(Spinner, _Element);

  var _super = Spinner_createSuper(Spinner);

  /**
   * Creates a new spinner.
   *
   * @param {object} [args] - The arguments
   * @param {number} [args.size=12] - The pixel size of the spinner
   */
  function Spinner(args) {
    var _this;

    Spinner_classCallCheck(this, Spinner);

    args = Object.assign({
      type: Spinner.TYPE_SMALL_THICK
    }, args);
    var dom = null;

    if (args.type === Spinner.TYPE_SMALL_THICK) {
      dom = createSmallThick(args.size || 12, args.dom);
    }

    _this = _super.call(this, dom, args);

    _this.class.add(Spinner_CLASS_ROOT);

    return _this;
  }

  return Spinner;
}(components_Element);

Spinner.TYPE_SMALL_THICK = 'small-thick'; // add more types here

/* harmony default export */ var components_Spinner = (Spinner);
// EXTERNAL MODULE: ./src/components/TextAreaInput/style.scss
var TextAreaInput_style = __webpack_require__(6473);
;// CONCATENATED MODULE: ./src/components/TextAreaInput/index.js
function TextAreaInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TextAreaInput_typeof = function _typeof(obj) { return typeof obj; }; } else { TextAreaInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TextAreaInput_typeof(obj); }

function TextAreaInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TextAreaInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TextAreaInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) TextAreaInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) TextAreaInput_defineProperties(Constructor, staticProps); return Constructor; }

function TextAreaInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TextAreaInput_setPrototypeOf(subClass, superClass); }

function TextAreaInput_setPrototypeOf(o, p) { TextAreaInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TextAreaInput_setPrototypeOf(o, p); }

function TextAreaInput_createSuper(Derived) { var hasNativeReflectConstruct = TextAreaInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = TextAreaInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = TextAreaInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return TextAreaInput_possibleConstructorReturn(this, result); }; }

function TextAreaInput_possibleConstructorReturn(self, call) { if (call && (TextAreaInput_typeof(call) === "object" || typeof call === "function")) { return call; } return TextAreaInput_assertThisInitialized(self); }

function TextAreaInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TextAreaInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function TextAreaInput_getPrototypeOf(o) { TextAreaInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TextAreaInput_getPrototypeOf(o); }




var CLASS_TEXT_AREA_INPUT = 'pcui-text-area-input';
var CLASS_TEXT_AREA_INPUT_RESIZABLE = CLASS_TEXT_AREA_INPUT + '-resizable';
var CLASS_TEXT_AREA_INPUT_RESIZABLE_NONE = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-none';
var CLASS_TEXT_AREA_INPUT_RESIZABLE_BOTH = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-both';
var CLASS_TEXT_AREA_INPUT_RESIZABLE_HORIZONTAL = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-horizontal';
var CLASS_TEXT_AREA_INPUT_RESIZABLE_VERTICAL = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-vertical';
/**
 * @name TextAreaInput
 * @classdesc The TextAreaInput wraps a textarea element. It has the same interface as pcui.TextInput.
 * @augments TextInput
 * @property {string} [resizable=none] Sets whether the size of the text area input can be modified by the user. Can be one of 'none', 'both', 'horizontal' or 'vertical'.
 */

var TextAreaInput = /*#__PURE__*/function (_TextInput) {
  TextAreaInput_inherits(TextAreaInput, _TextInput);

  var _super = TextAreaInput_createSuper(TextAreaInput);

  /**
   * Creates a new TextAreaInput.
   *
   * @param {object} args - The arguments. Extends the pcui.TextInput constructor arguments.
   */
  function TextAreaInput(args) {
    var _this;

    TextAreaInput_classCallCheck(this, TextAreaInput);

    args = Object.assign({
      input: document.createElement('textarea')
    }, args);
    _this = _super.call(this, args);

    _this.class.add(CLASS_TEXT_AREA_INPUT);

    switch (args.resizable) {
      case 'both':
        _this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_BOTH);

        break;

      case 'horizontal':
        _this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_HORIZONTAL);

        break;

      case 'vertical':
        _this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_VERTICAL);

        break;

      case 'none':
      default:
        _this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_NONE);

        break;
    }

    return _this;
  }

  TextAreaInput_createClass(TextAreaInput, [{
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(evt) {
      if (evt.keyCode === 27 && this.blurOnEscape || evt.keyCode === 13 && this.blurOnEnter && !evt.shiftKey) {
        this._domInput.blur();
      }

      this.emit('keydown', evt);
    }
  }]);

  return TextAreaInput;
}(components_TextInput);

components_Element.register('text', TextAreaInput, {
  renderChanges: true
});
/* harmony default export */ var components_TextAreaInput = (TextAreaInput);
// EXTERNAL MODULE: ./src/components/TreeView/style.scss
var TreeView_style = __webpack_require__(3363);
;// CONCATENATED MODULE: ./src/components/TreeViewItem/index.js
function TreeViewItem_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TreeViewItem_typeof = function _typeof(obj) { return typeof obj; }; } else { TreeViewItem_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TreeViewItem_typeof(obj); }

function TreeViewItem_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TreeViewItem_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TreeViewItem_createClass(Constructor, protoProps, staticProps) { if (protoProps) TreeViewItem_defineProperties(Constructor.prototype, protoProps); if (staticProps) TreeViewItem_defineProperties(Constructor, staticProps); return Constructor; }

function TreeViewItem_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { TreeViewItem_get = Reflect.get; } else { TreeViewItem_get = function _get(target, property, receiver) { var base = TreeViewItem_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return TreeViewItem_get(target, property, receiver || target); }

function TreeViewItem_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = TreeViewItem_getPrototypeOf(object); if (object === null) break; } return object; }

function TreeViewItem_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TreeViewItem_setPrototypeOf(subClass, superClass); }

function TreeViewItem_setPrototypeOf(o, p) { TreeViewItem_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TreeViewItem_setPrototypeOf(o, p); }

function TreeViewItem_createSuper(Derived) { var hasNativeReflectConstruct = TreeViewItem_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = TreeViewItem_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = TreeViewItem_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return TreeViewItem_possibleConstructorReturn(this, result); }; }

function TreeViewItem_possibleConstructorReturn(self, call) { if (call && (TreeViewItem_typeof(call) === "object" || typeof call === "function")) { return call; } return TreeViewItem_assertThisInitialized(self); }

function TreeViewItem_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TreeViewItem_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function TreeViewItem_getPrototypeOf(o) { TreeViewItem_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TreeViewItem_getPrototypeOf(o); }





/* global TreeView */

var TreeViewItem_CLASS_ROOT = 'pcui-treeview-item';
var TreeViewItem_CLASS_ICON = TreeViewItem_CLASS_ROOT + '-icon';
var CLASS_TEXT = TreeViewItem_CLASS_ROOT + '-text';
var TreeViewItem_CLASS_SELECTED = TreeViewItem_CLASS_ROOT + '-selected';
var TreeViewItem_CLASS_OPEN = TreeViewItem_CLASS_ROOT + '-open';
var CLASS_CONTENTS = TreeViewItem_CLASS_ROOT + '-contents';
var CLASS_EMPTY = TreeViewItem_CLASS_ROOT + '-empty';
var CLASS_RENAME = TreeViewItem_CLASS_ROOT + '-rename';
/**
 * @event
 * @name TreeViewItem#select
 * @description Fired when we select the TreeViewItem.
 * @param {TreeViewItem} item - The item
 */

/**
 * @event
 * @name TreeViewItem#deselect
 * @description Fired when we deselect the TreeViewItem.
 * @param {TreeViewItem} item - The item
 */

/**
 * @event
 * @name TreeViewItem#open
 * @description Fired when we open a TreeViewItem
 * @param {TreeViewItem} item - The item
 */

/**
 * @event
 * @name TreeViewItem#close
 * @description Fired when we close the TreeViewItem.
 * @param {TreeViewItem} item - The item
 */

/**
 * @name TreeViewItem
 * @classdesc Represents a Tree View Item to be added to a pcui.TreeView.
 * @mixes IFocusable
 * @property {boolean} selected Whether the item is selected.
 * @property {boolean} allowSelect=true Whether the item can be selected.
 * @property {boolean} open Whether the item is open meaning showing its children.
 * @property {boolean} parentsOpen Whether the parents of the item are open or closed.
 * @property {boolean} allowDrag=true Whether this tree item can be dragged. Only considered if the parent treeview has allowDrag true.
 * @property {boolean} allowDrop=true Whether dropping is allowed on the tree item.
 * @property {string} text The text shown by the TreeViewItem.
 * @property {number} The number of direct children.
 * @property {Label} textLabel Gets the internal label that shows the text.
 * @property {Label} iconLabel Gets the internal label that shows the icon.
 * @property {TreeView} treeView Gets / sets the parent TreeView.
 * @property {TreeViewItem} firstChild Gets the first child item.
 * @property {TreeViewItem} lastChild Gets the last child item.
 * @property {TreeViewItem} nextSibling Gets the first sibling item.
 * @property {TreeViewItem} previousSibling Gets the last sibling item.
 */

var TreeViewItem = /*#__PURE__*/function (_Container) {
  TreeViewItem_inherits(TreeViewItem, _Container);

  var _super = TreeViewItem_createSuper(TreeViewItem);

  /**
   * Creates a new TreeViewItem.
   *
   * @param {object} [args] - The arguments.
   */
  function TreeViewItem(args) {
    var _this;

    TreeViewItem_classCallCheck(this, TreeViewItem);

    if (!args) {
      args = {};
    }

    args.flex = true;
    _this = _super.call(this, args);

    _this.class.add(TreeViewItem_CLASS_ROOT, CLASS_EMPTY);

    _this._containerContents = new components_Container({
      class: CLASS_CONTENTS,
      flex: true,
      flexDirection: 'row',
      tabIndex: 0
    });

    _this.append(_this._containerContents);

    _this._containerContents.dom.draggable = true;
    _this._labelIcon = new components_Label({
      class: TreeViewItem_CLASS_ICON
    });

    _this._containerContents.append(_this._labelIcon);

    _this._labelText = new components_Label({
      class: CLASS_TEXT
    });

    _this._containerContents.append(_this._labelText);

    _this.allowSelect = args.allowSelect !== undefined ? args.allowSelect : true;
    _this.allowDrop = args.allowDrop !== undefined ? args.allowDrop : true;
    _this.allowDrag = args.allowDrag !== undefined ? args.allowDrag : true;

    if (args.text) {
      _this.text = args.text;
    }

    _this._numChildren = 0; // used the the parent treeview

    _this._treeOrder = -1;
    _this._domEvtFocus = _this._onContentFocus.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtBlur = _this._onContentBlur.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtKeyDown = _this._onContentKeyDown.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtDragStart = _this._onContentDragStart.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtMouseDown = _this._onContentMouseDown.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtMouseUp = _this._onContentMouseUp.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtMouseOver = _this._onContentMouseOver.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtClick = _this._onContentClick.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtDblClick = _this._onContentDblClick.bind(TreeViewItem_assertThisInitialized(_this));
    _this._domEvtContextMenu = _this._onContentContextMenu.bind(TreeViewItem_assertThisInitialized(_this));

    _this._containerContents.dom.addEventListener('focus', _this._domEvtFocus);

    _this._containerContents.dom.addEventListener('blur', _this._domEvtBlur);

    _this._containerContents.dom.addEventListener('keydown', _this._domEvtKeyDown);

    _this._containerContents.dom.addEventListener('dragstart', _this._domEvtDragStart);

    _this._containerContents.dom.addEventListener('mousedown', _this._domEvtMouseDown);

    _this._containerContents.dom.addEventListener('mouseover', _this._domEvtMouseOver);

    _this._containerContents.dom.addEventListener('click', _this._domEvtClick);

    _this._containerContents.dom.addEventListener('dblclick', _this._domEvtDblClick);

    _this._containerContents.dom.addEventListener('contextmenu', _this._domEvtContextMenu);

    return _this;
  }

  TreeViewItem_createClass(TreeViewItem, [{
    key: "_onAppendChild",
    value: function _onAppendChild(element) {
      TreeViewItem_get(TreeViewItem_getPrototypeOf(TreeViewItem.prototype), "_onAppendChild", this).call(this, element);

      if (!(element instanceof TreeViewItem)) return;
      this._numChildren++;
      if (this._parent !== this._treeView) this.classRemove(CLASS_EMPTY);

      if (this._treeView) {
        this._treeView._onAppendTreeViewItem(element);
      }
    }
  }, {
    key: "_onRemoveChild",
    value: function _onRemoveChild(element) {
      if (element instanceof TreeViewItem) {
        this._numChildren--;

        if (this._numChildren === 0) {
          this.classAdd(CLASS_EMPTY);
        }

        if (this._treeView) {
          this._treeView._onRemoveTreeViewItem(element);
        }
      }

      TreeViewItem_get(TreeViewItem_getPrototypeOf(TreeViewItem.prototype), "_onRemoveChild", this).call(this, element);
    }
  }, {
    key: "_onContentKeyDown",
    value: function _onContentKeyDown(evt) {
      if (evt.target.tagName.toLowerCase() === 'input') return;
      if (!this.allowSelect) return;

      if (this._treeView) {
        this._treeView._onChildKeyDown(evt, this);
      }
    }
  }, {
    key: "_onContentMouseDown",
    value: function _onContentMouseDown(evt) {
      if (!this._treeView || !this._treeView.allowDrag || !this._allowDrag) return;

      this._treeView._updateModifierKeys(evt);

      evt.stopPropagation();
    }
  }, {
    key: "_onContentMouseUp",
    value: function _onContentMouseUp(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      window.removeEventListener('mouseup', this._domEvtMouseUp);

      if (this._treeView) {
        this._treeView._onChildDragEnd(evt, this);
      }
    }
  }, {
    key: "_onContentMouseOver",
    value: function _onContentMouseOver(evt) {
      evt.stopPropagation();

      if (this._treeView) {
        this._treeView._onChildDragOver(evt, this);
      } // allow hover event


      TreeViewItem_get(TreeViewItem_getPrototypeOf(TreeViewItem.prototype), "_onMouseOver", this).call(this, evt);
    }
  }, {
    key: "_onContentDragStart",
    value: function _onContentDragStart(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      if (!this._treeView || !this._treeView.allowDrag) return;
      if (this.class.contains(CLASS_RENAME)) return;

      this._treeView._onChildDragStart(evt, this);

      window.addEventListener('mouseup', this._domEvtMouseUp);
    }
  }, {
    key: "_onContentClick",
    value: function _onContentClick(evt) {
      if (!this.allowSelect || evt.button !== 0) return;
      if (evt.target.tagName.toLowerCase() === 'input') return;
      evt.stopPropagation();

      var rect = this._containerContents.dom.getBoundingClientRect();

      if (this._numChildren > 0 && evt.clientX - rect.left < 0) {
        this.open = !this.open;
        this.focus();
      } else if (this._treeView) {
        this._treeView._onChildClick(evt, this);
      }
    }
  }, {
    key: "_onContentDblClick",
    value: function _onContentDblClick(evt) {
      if (!this._treeView || !this._treeView.allowRenaming || evt.button !== 0) return;
      if (evt.target.tagName.toLowerCase() === 'input') return;
      evt.stopPropagation();

      var rect = this._containerContents.dom.getBoundingClientRect();

      if (this.numChildren && evt.clientX - rect.left < 0) {
        return;
      }

      if (this.allowSelect) {
        this._treeView.deselect();

        this._treeView._onChildClick(evt, this);
      }

      this.rename();
    }
  }, {
    key: "_onContentContextMenu",
    value: function _onContentContextMenu(evt) {
      if (this._treeView && this._treeView._onContextMenu) {
        this._treeView._onContextMenu(evt, this);
      }
    }
  }, {
    key: "_onContentFocus",
    value: function _onContentFocus(evt) {
      this.emit('focus');
    }
  }, {
    key: "_onContentBlur",
    value: function _onContentBlur(evt) {
      this.emit('blur');
    }
  }, {
    key: "rename",
    value: function rename() {
      var _this2 = this;

      this.classAdd(CLASS_RENAME); // show text input to enter new text

      var textInput = new components_TextInput({
        renderChanges: false,
        value: this.text,
        class: FONT_REGULAR
      });
      textInput.on('blur', function () {
        textInput.destroy();
      });
      textInput.on('destroy', function () {
        _this2.classRemove(CLASS_RENAME);

        _this2.focus();
      });
      textInput.on('change', function (value) {
        value = value.trim();

        if (value) {
          _this2.text = value;
          textInput.destroy();
        }
      });
      textInput.on('disable', function () {
        // make sure text input is editable even if this
        // tree item is disabled
        textInput.input.removeAttribute('readonly');
      });

      this._containerContents.append(textInput);

      textInput.focus(true);
    }
  }, {
    key: "focus",
    value: function focus() {
      this._containerContents.dom.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this._containerContents.dom.blur();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      this._containerContents.dom.removeEventListener('focus', this._domEvtFocus);

      this._containerContents.dom.removeEventListener('blur', this._domEvtBlur);

      this._containerContents.dom.removeEventListener('keydown', this._domEvtKeyDown);

      this._containerContents.dom.removeEventListener('mousedown', this._domEvtMouseDown);

      this._containerContents.dom.removeEventListener('dragstart', this._domEvtDragStart);

      this._containerContents.dom.removeEventListener('mouseover', this._domEvtMouseOver);

      this._containerContents.dom.removeEventListener('click', this._domEvtClick);

      this._containerContents.dom.removeEventListener('dblclick', this._domEvtDblClick);

      this._containerContents.dom.removeEventListener('contextmenu', this._domEvtContextMenu);

      window.removeEventListener('mouseup', this._domEvtMouseUp);

      TreeViewItem_get(TreeViewItem_getPrototypeOf(TreeViewItem.prototype), "destroy", this).call(this);
    }
  }, {
    key: "selected",
    get: function get() {
      return this._containerContents.class.contains(TreeViewItem_CLASS_SELECTED);
    },
    set: function set(value) {
      if (value) {
        this.focus();
      }

      if (value === this.selected) return;

      if (value) {
        this._containerContents.classAdd(TreeViewItem_CLASS_SELECTED);

        this.emit('select', this);

        if (this._treeView) {
          this._treeView._onChildSelected(this);
        }
      } else {
        this._containerContents.classRemove(TreeViewItem_CLASS_SELECTED);

        this.blur();
        this.emit('deselect', this);

        if (this._treeView) {
          this._treeView._onChildDeselected(this);
        }
      }
    }
  }, {
    key: "text",
    get: function get() {
      return this._labelText.value;
    },
    set: function set(value) {
      if (this._labelText.value !== value) {
        this._labelText.value = value;

        if (this._treeView) {
          this._treeView._onChildRename(this, value);
        }
      }
    }
  }, {
    key: "textLabel",
    get: function get() {
      return this._labelText;
    }
  }, {
    key: "iconLabel",
    get: function get() {
      return this._labelIcon;
    }
  }, {
    key: "open",
    get: function get() {
      return this.class.contains(TreeViewItem_CLASS_OPEN) || this.parent === this._treeView;
    },
    set: function set(value) {
      if (this.open === value) return;

      if (value) {
        if (!this.numChildren) return;
        this.classAdd(TreeViewItem_CLASS_OPEN);
        this.emit('open', this);
      } else {
        this.classRemove(TreeViewItem_CLASS_OPEN);
        this.emit('close', this);
      }
    }
  }, {
    key: "parentsOpen",
    get: function get() {
      var parent = this.parent;

      while (parent && parent instanceof TreeViewItem) {
        if (!parent.open) return false;
        parent = parent.parent;
      }

      return true;
    },
    set: function set(value) {
      var parent = this.parent;

      while (parent && parent instanceof TreeViewItem) {
        parent.open = value;
        parent = parent.parent;
      }
    }
  }, {
    key: "allowDrop",
    get: function get() {
      return this._allowDrop;
    },
    set: function set(value) {
      this._allowDrop = value;
    }
  }, {
    key: "allowDrag",
    get: function get() {
      return this._allowDrag;
    },
    set: function set(value) {
      this._allowDrag = value;
    }
  }, {
    key: "allowSelect",
    get: function get() {
      return this._allowSelect;
    },
    set: function set(value) {
      this._allowSelect = value;
    }
  }, {
    key: "treeView",
    get: function get() {
      return this._treeView;
    },
    set: function set(value) {
      this._treeView = value;
    }
  }, {
    key: "numChildren",
    get: function get() {
      return this._numChildren;
    }
  }, {
    key: "firstChild",
    get: function get() {
      if (this._numChildren) {
        for (var i = 0; i < this.dom.childNodes.length; i++) {
          if (this.dom.childNodes[i].ui instanceof TreeViewItem) {
            return this.dom.childNodes[i].ui;
          }
        }
      }

      return null;
    }
  }, {
    key: "lastChild",
    get: function get() {
      if (this._numChildren) {
        for (var i = this.dom.childNodes.length - 1; i >= 0; i--) {
          if (this.dom.childNodes[i].ui instanceof TreeViewItem) {
            return this.dom.childNodes[i].ui;
          }
        }
      }

      return null;
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var sibling = this.dom.nextSibling;

      while (sibling && !(sibling.ui instanceof TreeViewItem)) {
        sibling = sibling.nextSibling;
      }

      return sibling && sibling.ui;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var sibling = this.dom.previousSibling;

      while (sibling && !(sibling.ui instanceof TreeViewItem)) {
        sibling = sibling.previousSibling;
      }

      return sibling && sibling.ui;
    }
  }]);

  return TreeViewItem;
}(components_Container);

/* harmony default export */ var components_TreeViewItem = (TreeViewItem);
;// CONCATENATED MODULE: ./src/components/TreeView/index.js
function TreeView_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TreeView_typeof = function _typeof(obj) { return typeof obj; }; } else { TreeView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TreeView_typeof(obj); }

function TreeView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TreeView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TreeView_createClass(Constructor, protoProps, staticProps) { if (protoProps) TreeView_defineProperties(Constructor.prototype, protoProps); if (staticProps) TreeView_defineProperties(Constructor, staticProps); return Constructor; }

function TreeView_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { TreeView_get = Reflect.get; } else { TreeView_get = function _get(target, property, receiver) { var base = TreeView_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return TreeView_get(target, property, receiver || target); }

function TreeView_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = TreeView_getPrototypeOf(object); if (object === null) break; } return object; }

function TreeView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TreeView_setPrototypeOf(subClass, superClass); }

function TreeView_setPrototypeOf(o, p) { TreeView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TreeView_setPrototypeOf(o, p); }

function TreeView_createSuper(Derived) { var hasNativeReflectConstruct = TreeView_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = TreeView_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = TreeView_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return TreeView_possibleConstructorReturn(this, result); }; }

function TreeView_possibleConstructorReturn(self, call) { if (call && (TreeView_typeof(call) === "object" || typeof call === "function")) { return call; } return TreeView_assertThisInitialized(self); }

function TreeView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TreeView_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function TreeView_getPrototypeOf(o) { TreeView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TreeView_getPrototypeOf(o); }






var TreeView_CLASS_ROOT = 'pcui-treeview';
var CLASS_DRAGGED_ITEM = TreeView_CLASS_ROOT + '-item-dragged';
var CLASS_DRAGGED_HANDLE = TreeView_CLASS_ROOT + '-drag-handle';
var CLASS_FILTERING = TreeView_CLASS_ROOT + '-filtering';
var CLASS_FILTER_RESULT = CLASS_FILTERING + '-result';
var DRAG_AREA_INSIDE = 'inside';
var DRAG_AREA_BEFORE = 'before';
var DRAG_AREA_AFTER = 'after';
/**
 * @event
 * @name TreeView#dragstart
 * @param {TreeViewItem[]} items - The dragged items
 * @description Fired when we start dragging a TreeViewItem
 */

/**
 * @event
 * @name TreeView#dragend
 * @description Fired when we stop dragging a TreeViewItem
 */

/**
 * @event
 * @name TreeView#reparent
 * @description Fired when we reparent TreeViewItems
 * @param {object[]} items - An array of items we reparented. Each array element contains an object like so: {item, newParent, newChildIndex, oldParent}.
 */

/**
 * @event
 * @name TreeView#select
 * @description Fired when we select a TreeViewItem
 * @param {TreeViewItem} item - The item
 */

/**
 * @event
 * @name TreeView#deselect
 * @description Fired when we deselect a TreeViewItem
 * @param {TreeViewItem} item - The item
 */

/**
 * @event
 * @name TreeView#rename
 * @description Fired when we rename a TreeViewItem
 * @param {TreeViewItem} item - The item
 * @param {string} name - The new name
 */

/**
 * @name TreeView
 * @classdesc A container that can show a treeview like a hierarchy. The treeview contains
 * pcui.TreeViewItems.
 * @augments Container
 * @property {boolean} allowDrag=true Whether dragging a TreeViewItem is allowed.
 * @property {boolean} allowReordering=true Whether reordering TreeViewItems is allowed.
 * @property {boolean} allowRenaming Whether renaming TreeViewItems is allowed by double clicking on them.
 * @property {boolean} isDragging Whether we are currently dragging a TreeViewItem.
 * @property {string} filter Gets / sets a filter that searches TreeViewItems and only shows the ones that are relevant to the filter.
 * @property {TreeViewItem[]} selected Gets the selected TreeViewItems.
 */

var TreeView = /*#__PURE__*/function (_Container) {
  TreeView_inherits(TreeView, _Container);

  var _super = TreeView_createSuper(TreeView);

  /**
   * Creates a new TreeView.
   *
   * @param {object} [args] - The arguments. All properties can be set through the arguments as well.
   * @param {Function} [args.onContextMenu] - A function to be called when we right click on a TreeViewItem.
   * @param {Function} [args.onReparent] - A function to be called when we try to reparent tree items. If a function is provided then the
   * tree items will not be reparented by the TreeView but instead will rely on the function to reparent them as it sees fit.
   */
  function TreeView(args) {
    var _this;

    TreeView_classCallCheck(this, TreeView);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(TreeView_CLASS_ROOT);

    _this._selectedItems = [];
    _this._dragItems = [];
    _this._allowDrag = args.allowDrag !== undefined ? args.allowDrag : true;
    _this._allowReordering = args.allowReordering !== undefined ? args.allowReordering : true;
    _this._allowRenaming = args.allowRenaming !== undefined ? args.allowRenaming : false;
    _this._dragging = false;
    _this._dragOverItem = null;
    _this._dragArea = DRAG_AREA_INSIDE;
    _this._dragScroll = 0;
    _this._dragScrollInterval = null;
    _this._dragHandle = new components_Element(document.createElement('div'), {
      class: CLASS_DRAGGED_HANDLE
    });

    _this.append(_this._dragHandle);

    _this._onContextMenu = args.onContextMenu;
    _this._onReparentFn = args.onReparent;
    _this._pressedCtrl = false;
    _this._pressedShift = false;
    _this._filter = null;
    _this._filterResults = [];
    _this._wasDraggingAllowedBeforeFiltering = _this._allowDrag;
    _this._domEvtModifierKeys = _this._updateModifierKeys.bind(TreeView_assertThisInitialized(_this));
    _this._domEvtMouseLeave = _this._onMouseLeave.bind(TreeView_assertThisInitialized(_this));
    _this._domEvtDragMove = _this._onDragMove.bind(TreeView_assertThisInitialized(_this));
    _this._domEvtMouseMove = _this._onMouseMove.bind(TreeView_assertThisInitialized(_this));
    window.addEventListener('keydown', _this._domEvtModifierKeys);
    window.addEventListener('keyup', _this._domEvtModifierKeys);
    window.addEventListener('mousedown', _this._domEvtModifierKeys);

    _this.dom.addEventListener('mouseleave', _this._domEvtMouseLeave);

    _this._dragHandle.dom.addEventListener('mousemove', _this._domEvtDragMove);

    _this._dragHandle.on('destroy', function (dom) {
      dom.removeEventListener('mousemove', _this._domEvtDragMove);
    });

    return _this;
  }

  TreeView_createClass(TreeView, [{
    key: "_updateModifierKeys",
    value: function _updateModifierKeys(evt) {
      this._pressedCtrl = evt.ctrlKey || evt.metaKey;
      this._pressedShift = evt.shiftKey;
    }
    /**
     * Finds the next tree item that is not currently hidden
     *
     * @param {TreeViewItem} currentItem - The current tree item
     * @returns {TreeViewItem} The next tree item.
     */

  }, {
    key: "_findNextVisibleTreeItem",
    value: function _findNextVisibleTreeItem(currentItem) {
      if (currentItem.numChildren > 0 && currentItem.open) {
        return currentItem.firstChild;
      }

      var sibling = currentItem.nextSibling;
      if (sibling) return sibling;
      var parent = currentItem.parent;
      if (!(parent instanceof components_TreeViewItem)) return null;
      var parentSibling = parent.nextSibling;

      while (!parentSibling) {
        parent = parent.parent;

        if (!(parent instanceof components_TreeViewItem)) {
          break;
        }

        parentSibling = parent.nextSibling;
      }

      return parentSibling;
    }
    /**
     * Finds the last visible child tree item of the specified tree item.
     *
     * @param {TreeViewItem} currentItem - The current item.
     * @returns {TreeViewItem} The last child item.
     */

  }, {
    key: "_findLastVisibleChildTreeItem",
    value: function _findLastVisibleChildTreeItem(currentItem) {
      if (!currentItem.numChildren || !currentItem.open) return null;
      var lastChild = currentItem.lastChild;

      while (lastChild && lastChild.numChildren && lastChild.open) {
        lastChild = lastChild.lastChild;
      }

      return lastChild;
    }
    /**
     * Finds the previous visible tree item of the specified tree item.
     *
     * @param {TreeViewItem} currentItem - The current tree item.
     * @returns {TreeViewItem} The previous item.
     */

  }, {
    key: "_findPreviousVisibleTreeItem",
    value: function _findPreviousVisibleTreeItem(currentItem) {
      var sibling = currentItem.previousSibling;

      if (sibling) {
        if (sibling.numChildren > 0 && sibling.open) {
          return this._findLastVisibleChildTreeItem(sibling);
        }

        return sibling;
      }

      var parent = currentItem.parent;
      if (!(parent instanceof components_TreeViewItem)) return null;
      return parent;
    }
    /**
     * Gets the visible tree items between the specified start and end tree items.
     *
     * @param {TreeViewItem} startChild - The start tree item.
     * @param {TreeViewItem} endChild - The end tree item.
     * @returns {TreeViewItem[]} The tree items.
     */

  }, {
    key: "_getChildrenRange",
    value: function _getChildrenRange(startChild, endChild) {
      var result = []; // select search results if we are currently filtering tree view items

      if (this._filterResults.length) {
        var filterResults = this.dom.querySelectorAll(".".concat(TreeView_CLASS_ROOT, "-item.").concat(CLASS_FILTER_RESULT));
        var startIndex = -1;
        var endIndex = -1;

        for (var i = 0; i < filterResults.length; i++) {
          var item = filterResults[i].ui;

          if (item === startChild) {
            startIndex = i;
          } else if (item === endChild) {
            endIndex = i;
          }

          if (startIndex !== -1 && endIndex !== -1) {
            var start = startIndex < endIndex ? startIndex : endIndex;
            var end = startIndex < endIndex ? endIndex : startIndex;

            for (var j = start; j <= end; j++) {
              result.push(filterResults[j].ui);
            }

            break;
          }
        }
      } else {
        // if we are not filtering the tree view then find the next visible tree item
        var current = startChild;
        var rectStart = startChild.dom.getBoundingClientRect();
        var rectEnd = endChild.dom.getBoundingClientRect();

        if (rectStart.top < rectEnd.top) {
          while (current && current !== endChild) {
            current = this._findNextVisibleTreeItem(current);

            if (current && current !== endChild) {
              result.push(current);
            }
          }
        } else {
          while (current && current !== endChild) {
            current = this._findPreviousVisibleTreeItem(current);

            if (current && current !== endChild) {
              result.push(current);
            }
          }
        }

        result.push(endChild);
      }

      return result;
    }
  }, {
    key: "_onAppendChild",
    value: function _onAppendChild(element) {
      TreeView_get(TreeView_getPrototypeOf(TreeView.prototype), "_onAppendChild", this).call(this, element);

      if (element instanceof components_TreeViewItem) {
        this._onAppendTreeViewItem(element);
      }
    }
  }, {
    key: "_onRemoveChild",
    value: function _onRemoveChild(element) {
      if (element instanceof components_TreeViewItem) {
        this._onRemoveTreeViewItem(element);
      }

      TreeView_get(TreeView_getPrototypeOf(TreeView.prototype), "_onRemoveChild", this).call(this, element);
    }
  }, {
    key: "_onAppendTreeViewItem",
    value: function _onAppendTreeViewItem(element) {
      var _this2 = this;

      element.treeView = this;

      if (this._filter) {
        // add new item to filtered results if it
        // satisfies the current filter
        this._searchItems([[element.text, element]], this._filter);
      } // do the same for all children of the element


      element.forEachChild(function (child) {
        if (child instanceof components_TreeViewItem) {
          _this2._onAppendTreeViewItem(child);
        }
      });
    }
  }, {
    key: "_onRemoveTreeViewItem",
    value: function _onRemoveTreeViewItem(element) {
      var _this3 = this;

      element.selected = false; // do the same for all children of the element

      element.forEachChild(function (child) {
        if (child instanceof components_TreeViewItem) {
          _this3._onRemoveTreeViewItem(child);
        }
      });
    } // Called when a key is down on a child TreeViewItem.

  }, {
    key: "_onChildKeyDown",
    value: function _onChildKeyDown(evt, element) {
      if ([9, 37, 38, 39, 40].indexOf(evt.keyCode) === -1) return;
      evt.preventDefault();
      evt.stopPropagation();

      if (evt.keyCode === 40) {
        // down - select next tree item
        if (this._selectedItems.length) {
          var next = this._findNextVisibleTreeItem(element);

          if (next) {
            if (this._pressedShift || this._pressedCtrl) {
              next.selected = true;
            } else {
              this._selectSingleItem(next);
            }
          }
        }
      } else if (evt.keyCode === 38) {
        // up - select previous tree item
        if (this._selectedItems.length) {
          var prev = this._findPreviousVisibleTreeItem(element);

          if (prev) {
            if (this._pressedShift || this._pressedCtrl) {
              prev.selected = true;
            } else {
              this._selectSingleItem(prev);
            }
          }
        }
      } else if (evt.keyCode === 37) {
        // left (close)
        if (element.parent !== this) {
          element.open = false;
        }
      } else if (evt.keyCode === 39) {
        // right (open)
        element.open = true;
      } else if (evt.keyCode === 9) {// tab
        // skip
      }
    } // Called when we click on a child TreeViewItem

  }, {
    key: "_onChildClick",
    value: function _onChildClick(evt, element) {
      if (evt.button !== 0) return;
      if (!element.allowSelect) return;

      if (this._pressedCtrl) {
        // toggle selection when Ctrl is pressed
        element.selected = !element.selected;
      } else if (this._pressedShift) {
        // on shift add to selection
        if (!this._selectedItems.length || this._selectedItems.length === 1 && this._selectedItems[0] === element) {
          element.selected = true;
          return;
        }

        var selected = this._selectedItems[this._selectedItems.length - 1];

        this._openHierarchy(selected);

        var children = this._getChildrenRange(selected, element);

        children.forEach(function (child) {
          if (child.allowSelect) {
            child.selected = true;
          }
        });
      } else {
        // deselect other items
        this._selectSingleItem(element);
      }
    }
    /**
     * Call specified function on every child TreeViewItem by traversing the hierarchy depth first.
     *
     * @param {Function} fn - The function to call. The function takes the TreeViewItem as an argument.
     */

  }, {
    key: "_traverseDepthFirst",
    value: function _traverseDepthFirst(fn) {
      function traverse(item) {
        if (!item || !(item instanceof components_TreeViewItem)) return;
        fn(item);

        if (item.numChildren) {
          for (var i = 0; i < item.dom.childNodes.length; i++) {
            traverse(item.dom.childNodes[i].ui);
          }
        }
      }

      for (var i = 0; i < this.dom.childNodes.length; i++) {
        traverse(this.dom.childNodes[i].ui);
      }
    }
    /**
     * Do a depth first traversal of all tree items
     * and assign an order to them so that we know which one
     * is above the other. Performance wise this means it traverses
     * all tree items every time however seems to be pretty fast even with 15 - 20 K entities.
     */

  }, {
    key: "_updateTreeOrder",
    value: function _updateTreeOrder() {
      var order = 0;

      this._traverseDepthFirst(function (item) {
        item._treeOrder = order++;
      });
    }
  }, {
    key: "_getChildIndex",
    value: function _getChildIndex(item, parent) {
      return Array.prototype.indexOf.call(parent.dom.childNodes, item.dom) - 1;
    } // Called when we start dragging a TreeViewItem.

  }, {
    key: "_onChildDragStart",
    value: function _onChildDragStart(evt, element) {
      if (!this.allowDrag || this._dragging) return;
      this._dragItems = []; // cannot drag root

      if (element.parent === this) return;

      if (this._selectedItems.indexOf(element) !== -1) {
        var dragged = []; // check that all selected items to be dragged are
        // at the same depth from the root

        var desiredDepth = -1;

        for (var i = 0; i < this._selectedItems.length; i++) {
          var parent = this._selectedItems[i].parent;
          var depth = 0;
          var isChild = false;

          while (parent && parent instanceof components_TreeViewItem) {
            // if parent is already in dragged items then skip
            // depth calculation for this item
            if (this._selectedItems.indexOf(parent) !== -1) {
              isChild = true;
              break;
            }

            depth++;
            parent = parent.parent;
          }

          if (!isChild) {
            if (desiredDepth === -1) {
              desiredDepth = depth;
            } else if (desiredDepth !== depth) {
              return;
            }

            dragged.push(this._selectedItems[i]);
          }
        } // add dragged class to each item


        this._dragItems = dragged;
      } else {
        element.class.add(CLASS_DRAGGED_ITEM);

        this._dragItems.push(element);
      }

      if (this._dragItems.length) {
        this._dragItems.forEach(function (item) {
          item.class.add(CLASS_DRAGGED_ITEM);
        });

        this.isDragging = true;
        this.emit('dragstart', this._dragItems.slice());
      }
    } // Called when we stop dragging a TreeViewItem.

  }, {
    key: "_onChildDragEnd",
    value: function _onChildDragEnd(evt, element) {
      var _this4 = this;

      if (!this.allowDrag || !this._dragging) return;

      this._dragItems.forEach(function (item) {
        return item.class.remove(CLASS_DRAGGED_ITEM);
      });

      if (this._dragOverItem) {
        if (this._dragItems.length > 1) {
          // sort items based on order in the hierarchy
          if (this._dragItems.length > 1) {
            this._updateTreeOrder();

            this._dragItems.sort(function (a, b) {
              return a._treeOrder - b._treeOrder;
            });
          }
        }

        if (this._dragItems.length) {
          // reparent items
          var reparented = [];
          var lastDraggedItem = this._dragOverItem;

          this._dragItems.forEach(function (item) {
            if (item.parent !== _this4._dragOverItem || _this4._dragArea !== DRAG_AREA_INSIDE) {
              var oldParent = item.parent;
              var newParent = null;

              var oldChildIndex = _this4._getChildIndex(item, oldParent);

              var newChildIndex = 0;

              if (!_this4._onReparentFn) {
                item.parent.remove(item);
              }

              if (_this4._dragArea === DRAG_AREA_BEFORE) {
                // If dragged before a TreeViewItem...
                newParent = _this4._dragOverItem.parent;

                if (!_this4._onReparentFn) {
                  _this4._dragOverItem.parent.appendBefore(item, _this4._dragOverItem);

                  newChildIndex = _this4._getChildIndex(item, newParent);
                } else {
                  newChildIndex = _this4._getChildIndex(_this4._dragOverItem, newParent);

                  if (newParent === oldParent && oldChildIndex < newChildIndex) {
                    // subtract one if old index is before new index because
                    // in this case the item hasn't been removed from its parent
                    newChildIndex--;
                  }
                }
              } else if (_this4._dragArea === DRAG_AREA_INSIDE) {
                // If dragged inside a TreeViewItem...
                newParent = _this4._dragOverItem;

                if (!_this4._onReparentFn) {
                  _this4._dragOverItem.append(item);

                  _this4._dragOverItem.open = true;
                  newChildIndex = _this4._getChildIndex(item, newParent);
                } else {
                  newChildIndex = newParent.dom.childNodes.length - 1;
                }
              } else if (_this4._dragArea === DRAG_AREA_AFTER) {
                // If dragged after a TreeViewItem...
                newParent = _this4._dragOverItem.parent;

                if (!_this4._onReparentFn) {
                  _this4._dragOverItem.parent.appendAfter(item, lastDraggedItem);

                  newChildIndex = _this4._getChildIndex(item, newParent);
                } else {
                  newChildIndex = _this4._getChildIndex(lastDraggedItem, newParent);

                  if (newParent !== oldParent || oldChildIndex > newChildIndex) {
                    newChildIndex++;
                  }
                }

                lastDraggedItem = item;
              }

              reparented.push({
                item: item,
                newParent: newParent,
                newChildIndex: newChildIndex,
                oldParent: oldParent
              });
            }
          });

          if (reparented.length) {
            if (this._onReparentFn) {
              this._onReparentFn(reparented);
            }

            this.emit('reparent', reparented);
          }
        }
      }

      this._dragItems = [];
      this.isDragging = false;
      this.emit('dragend');
    } // Called when we drag over a TreeViewItem.

  }, {
    key: "_onChildDragOver",
    value: function _onChildDragOver(evt, element) {
      if (!this._allowDrag || !this._dragging) return;

      if (element.allowDrop && this._dragItems.indexOf(element) === -1) {
        this._dragOverItem = element;
      } else {
        this._dragOverItem = null;
      }

      this._updateDragHandle();

      this._onDragMove(evt);
    } // Called when the mouse cursor leaves the tree view.

  }, {
    key: "_onMouseLeave",
    value: function _onMouseLeave(evt) {
      if (!this._allowDrag || !this._dragging) return;
      this._dragOverItem = null;

      this._updateDragHandle();
    } // Called when the mouse moves while dragging

  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(evt) {
      if (!this._dragging) return; // Determine if we need to scroll the treeview if we are dragging towards the edges

      var rect = this.dom.getBoundingClientRect();
      this._dragScroll = 0;

      if (evt.clientY - rect.top < 32 && this.dom.scrollTop > 0) {
        this._dragScroll = -1;
      } else if (rect.bottom - evt.clientY < 32 && this.dom.scrollHeight - (rect.height + this.dom.scrollTop) > 0) {
        this._dragScroll = 1;
      }
    } // Scroll treeview if we are dragging towards the edges

  }, {
    key: "_scrollWhileDragging",
    value: function _scrollWhileDragging() {
      if (!this._dragging) return;
      if (this._dragScroll === 0) return;
      this.dom.scrollTop += this._dragScroll * 8;
      this._dragOverItem = null;

      this._updateDragHandle();
    } // Called while we drag the drag handle

  }, {
    key: "_onDragMove",
    value: function _onDragMove(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!this._allowDrag || !this._dragOverItem) return;

      var rect = this._dragHandle.dom.getBoundingClientRect();

      var area = Math.floor((evt.clientY - rect.top) / rect.height * 5);
      var oldArea = this._dragArea;
      var oldDragOver = this._dragOverItem;

      if (this._dragOverItem.parent === this) {
        var parent = false;

        for (var _i = 0; _i < this._dragItems.length; _i++) {
          if (this._dragItems[_i].parent === this._dragOverItem) {
            parent = true;
            this._dragOverItem = null;
            break;
          }
        }

        if (!parent) {
          this._dragArea = DRAG_AREA_INSIDE;
        }
      } else {
        // check if we are trying to drag item inside any of its children
        var invalid = false;

        for (var _i2 = 0; _i2 < this._dragItems.length; _i2++) {
          if (this._dragItems[_i2].dom.contains(this._dragOverItem.dom)) {
            invalid = true;
            break;
          }
        }

        if (invalid) {
          this._dragOverItem = null;
        } else if (this._allowReordering && area <= 1 && this._dragItems.indexOf(this._dragOverItem.previousSibling) === -1) {
          this._dragArea = DRAG_AREA_BEFORE;
        } else if (this._allowReordering && area >= 4 && this._dragItems.indexOf(this._dragOverItem.nextSibling) === -1 && (this._dragOverItem.numChildren === 0 || !this._dragOverItem.open)) {
          this._dragArea = DRAG_AREA_AFTER;
        } else {
          var _parent = false;

          if (this._allowReordering && this._dragOverItem.open) {
            for (var i = 0; i < this._dragItems.length; i++) {
              if (this._dragItems[i].parent === this._dragOverItem) {
                _parent = true;
                this._dragArea = DRAG_AREA_BEFORE;
                break;
              }
            }
          }

          if (!_parent) this._dragArea = DRAG_AREA_INSIDE;
        }
      }

      if (oldArea !== this._dragArea || oldDragOver !== this._dragOverItem) {
        this._updateDragHandle();
      }
    } // Updates the drag handle position and size

  }, {
    key: "_updateDragHandle",
    value: function _updateDragHandle(dragOverItem, force) {
      if (!force && (!this._allowDrag || !this._dragging)) return;

      if (!dragOverItem) {
        dragOverItem = this._dragOverItem;
      }

      if (!dragOverItem || dragOverItem.hidden || !dragOverItem.parentsOpen) {
        this._dragHandle.hidden = true;
      } else {
        var rect = dragOverItem._containerContents.dom.getBoundingClientRect();

        this._dragHandle.hidden = false;

        this._dragHandle.class.remove(DRAG_AREA_AFTER, DRAG_AREA_BEFORE, DRAG_AREA_INSIDE);

        this._dragHandle.class.add(this._dragArea);

        var top = rect.top;
        var left = rect.left;
        var width = rect.width;

        if (this.dom.parentElement) {
          var parentRect = this.dom.parentElement.getBoundingClientRect();
          left = Math.max(left, parentRect.left);
          width = Math.min(width, this.dom.parentElement.clientWidth - left + parentRect.left);
        }

        this._dragHandle.style.top = top + 'px';
        this._dragHandle.style.left = left + 'px';
        this._dragHandle.style.width = width - 7 + 'px';
      }
    }
    /**
     * Opens all the parents of the specified item
     *
     * @param {TreeViewItem} endItem - The end tree view item
     */

  }, {
    key: "_openHierarchy",
    value: function _openHierarchy(endItem) {
      endItem.parentsOpen = true;
    }
    /**
     * Selects a tree view item
     *
     * @param {TreeViewItem} item - The tree view item
     */

  }, {
    key: "_selectSingleItem",
    value: function _selectSingleItem(item) {
      var i = this._selectedItems.length;
      var othersSelected = false;

      while (i--) {
        if (this._selectedItems[i] && this._selectedItems[i] !== item) {
          this._selectedItems[i].selected = false;
          othersSelected = true;
        }
      }

      if (othersSelected) {
        item.selected = true;
      } else {
        item.selected = !item.selected;
      }
    }
    /**
     * Called when a child tree view item is selected.
     *
     * @param {TreeViewItem} item - The tree view item.
     */

  }, {
    key: "_onChildSelected",
    value: function _onChildSelected(item) {
      this._selectedItems.push(item);

      this._openHierarchy(item);

      this.emit('select', item);
    }
    /**
     * Called when a child tree view item is deselected.
     *
     * @param {TreeViewItem} item - The tree view item.
     * @param {Element} element - The element.
     */

  }, {
    key: "_onChildDeselected",
    value: function _onChildDeselected(element) {
      var index = this._selectedItems.indexOf(element);

      if (index !== -1) {
        this._selectedItems.splice(index, 1);

        this.emit('deselect', element);
      }
    }
    /**
     * Called when a child tree view item is renamed.
     *
     * @param {TreeViewItem} item - The tree view item.
     * @param {string} newName - The new name.
     */

  }, {
    key: "_onChildRename",
    value: function _onChildRename(item, newName) {
      if (this._filter) {
        // unfilter this item
        item.class.remove(CLASS_FILTER_RESULT);

        var index = this._filterResults.indexOf(item);

        if (index !== -1) {
          this._filterResults.splice(index, 1);
        } // see if we can include it in the current filter


        this._searchItems([[item.text, item]], this._filter);
      }

      this.emit('rename', item, newName);
    }
  }, {
    key: "_searchItems",
    value: function _searchItems(searchArr, filter) {
      var _this5 = this;

      var results = searchItems(searchArr, filter);
      if (!results.length) return;
      results.forEach(function (item) {
        _this5._filterResults.push(item);

        item.class.add(CLASS_FILTER_RESULT);
      });
    }
    /**
     * Searches treeview
     *
     * @param {string} filter - The search filter
     */

  }, {
    key: "_applyFilter",
    value: function _applyFilter(filter) {
      this._clearFilter();

      this._wasDraggingAllowedBeforeFiltering = this._allowDrag;
      this._allowDrag = false;
      this.class.add(CLASS_FILTERING);
      var search = [];

      this._traverseDepthFirst(function (item) {
        search.push([item.text, item]);
      });

      this._searchItems(search, filter);
    }
    /**
     * Clears search filter.
     */

  }, {
    key: "_clearFilter",
    value: function _clearFilter() {
      this._filterResults.forEach(function (item) {
        if (item.destroyed) return;
        item.class.remove(CLASS_FILTER_RESULT);
      });

      this._filterResults.length = 0;
      this.class.remove(CLASS_FILTERING);
      this._allowDrag = this._wasDraggingAllowedBeforeFiltering;
    }
  }, {
    key: "showDragHandle",
    value: function showDragHandle(treeItem) {
      this._updateDragHandle(treeItem, true);
    }
    /**
     * @name TreeView#deselect
     * @description Deselects all selected tree view items.
     */

  }, {
    key: "deselect",
    value: function deselect() {
      var i = this._selectedItems.length;

      while (i--) {
        if (this._selectedItems[i]) {
          this._selectedItems[i].selected = false;
        }
      }
    }
    /**
     * @name TreeView#clearTreeItems
     * @description Removes all child tree view items
     */

  }, {
    key: "clearTreeItems",
    value: function clearTreeItems() {
      var i = this.dom.childNodes.length;

      while (i--) {
        var dom = this.dom.childNodes[i];
        if (!dom) continue;
        var ui = dom.ui;

        if (ui instanceof components_TreeViewItem) {
          ui.destroy();
        }
      }

      this._selectedItems = [];
      this._dragItems = [];
      this._allowDrag = this._wasDraggingAllowedBeforeFiltering;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      window.removeEventListener('keydown', this._domEvtModifierKeys);
      window.removeEventListener('keyup', this._domEvtModifierKeys);
      window.removeEventListener('mousedown', this._domEvtModifierKeys);
      window.removeEventListener('mousemove', this._domEvtMouseMove);
      this.dom.removeEventListener('mouseleave', this._domEvtMouseLeave);

      if (this._dragScrollInterval) {
        clearInterval(this._dragScrollInterval);
        this._dragScrollInterval = null;
      }

      TreeView_get(TreeView_getPrototypeOf(TreeView.prototype), "destroy", this).call(this);
    }
  }, {
    key: "allowDrag",
    get: function get() {
      return this._allowDrag;
    },
    set: function set(value) {
      this._allowDrag = value;

      if (this._filter) {
        this._wasDraggingAllowedBeforeFiltering = value;
      }
    }
  }, {
    key: "allowReordering",
    get: function get() {
      return this._allowReordering;
    },
    set: function set(value) {
      this._allowReordering = value;
    }
  }, {
    key: "allowRenaming",
    get: function get() {
      return this._allowRenaming;
    },
    set: function set(value) {
      this._allowRenaming = value;
    }
  }, {
    key: "isDragging",
    get: function get() {
      return this._dragging;
    },
    set: function set(value) {
      if (this._dragging === value) return;

      if (value) {
        this._dragging = true;

        this._updateDragHandle(); // handle mouse move to scroll when dragging if necessary


        if (this.scrollable) {
          window.removeEventListener('mousemove', this._domEvtMouseMove);
          window.addEventListener('mousemove', this._domEvtMouseMove);

          if (!this._dragScrollInterval) {
            this._dragScrollInterval = setInterval(this._scrollWhileDragging.bind(this), 1000 / 60);
          }
        }
      } else {
        this._dragOverItem = null;

        this._updateDragHandle();

        this._dragging = false;
        window.removeEventListener('mousemove', this._domEvtMouseMove);

        if (this._dragScrollInterval) {
          clearInterval(this._dragScrollInterval);
          this._dragScrollInterval = null;
        }
      }
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selectedItems.slice();
    }
  }, {
    key: "filter",
    get: function get() {
      return this._filter;
    },
    set: function set(value) {
      if (this._filter === value) return;
      this._filter = value;

      if (value) {
        this._applyFilter(value);
      } else {
        this._clearFilter();
      }
    }
  }, {
    key: "pressedCtrl",
    get: function get() {
      return this._pressedCtrl;
    }
  }, {
    key: "pressedShift",
    get: function get() {
      return this._pressedShift;
    }
  }]);

  return TreeView;
}(components_Container);

/* harmony default export */ var components_TreeView = (TreeView);
// EXTERNAL MODULE: ./src/binding/index.js + 8 modules
var binding = __webpack_require__(9237);
// EXTERNAL MODULE: ./src/components/GridViewItem/style.scss
var GridViewItem_style = __webpack_require__(1107);
;// CONCATENATED MODULE: ./src/components/GridViewItem/index.js
function GridViewItem_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridViewItem_typeof = function _typeof(obj) { return typeof obj; }; } else { GridViewItem_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridViewItem_typeof(obj); }

function GridViewItem_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridViewItem_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GridViewItem_createClass(Constructor, protoProps, staticProps) { if (protoProps) GridViewItem_defineProperties(Constructor.prototype, protoProps); if (staticProps) GridViewItem_defineProperties(Constructor, staticProps); return Constructor; }

function GridViewItem_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { GridViewItem_get = Reflect.get; } else { GridViewItem_get = function _get(target, property, receiver) { var base = GridViewItem_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return GridViewItem_get(target, property, receiver || target); }

function GridViewItem_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = GridViewItem_getPrototypeOf(object); if (object === null) break; } return object; }

function GridViewItem_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridViewItem_setPrototypeOf(subClass, superClass); }

function GridViewItem_setPrototypeOf(o, p) { GridViewItem_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridViewItem_setPrototypeOf(o, p); }

function GridViewItem_createSuper(Derived) { var hasNativeReflectConstruct = GridViewItem_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = GridViewItem_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = GridViewItem_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return GridViewItem_possibleConstructorReturn(this, result); }; }

function GridViewItem_possibleConstructorReturn(self, call) { if (call && (GridViewItem_typeof(call) === "object" || typeof call === "function")) { return call; } return GridViewItem_assertThisInitialized(self); }

function GridViewItem_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridViewItem_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function GridViewItem_getPrototypeOf(o) { GridViewItem_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridViewItem_getPrototypeOf(o); }





var GridViewItem_CLASS_ROOT = 'pcui-gridview-item';
var GridViewItem_CLASS_SELECTED = GridViewItem_CLASS_ROOT + '-selected';
var GridViewItem_CLASS_TEXT = GridViewItem_CLASS_ROOT + '-text';
/**
 * @name GridViewItem
 * @augments Container
 * @mixes IFocusable
 * @classdesc Represents a grid view item used in GridView.
 * @property {boolean} allowSelect - If true allow selecting the item. Defaults to true.
 * @property {boolean} selected - Whether the item is selected.
 * @property {string} text - The text of the item.
 * @property {GridViewItem} previousSibling - Returns the previous visible sibling grid view item.
 * @property {GridViewItem} nextSibling - Returns the next visible sibling grid view item.
 */

var GridViewItem = /*#__PURE__*/function (_Container) {
  GridViewItem_inherits(GridViewItem, _Container);

  var _super = GridViewItem_createSuper(GridViewItem);

  function GridViewItem(args) {
    var _this;

    GridViewItem_classCallCheck(this, GridViewItem);

    args = Object.assign({
      tabIndex: 0
    }, args);
    _this = _super.call(this, args);

    _this.class.add(GridViewItem_CLASS_ROOT);

    _this.allowSelect = args.allowSelect !== undefined ? args.allowSelect : true;
    _this._selected = false;
    _this._labelText = new components_Label({
      class: GridViewItem_CLASS_TEXT,
      binding: new binding/* BindingObserversToElement */.RC()
    });

    _this.append(_this._labelText);

    _this.text = args.text;
    _this._domEvtFocus = _this._onFocus.bind(GridViewItem_assertThisInitialized(_this));
    _this._domEvtBlur = _this._onBlur.bind(GridViewItem_assertThisInitialized(_this));

    _this.dom.addEventListener('focus', _this._domEvtFocus);

    _this.dom.addEventListener('blur', _this._domEvtBlur);

    return _this;
  }

  GridViewItem_createClass(GridViewItem, [{
    key: "_onFocus",
    value: function _onFocus() {
      this.emit('focus');
    }
  }, {
    key: "_onBlur",
    value: function _onBlur() {
      this.emit('blur');
    }
  }, {
    key: "focus",
    value: function focus() {
      this.dom.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.dom.blur();
    }
  }, {
    key: "link",
    value: function link(observers, paths) {
      this._labelText.link(observers, paths);
    }
  }, {
    key: "unlink",
    value: function unlink() {
      this._labelText.unlink();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;
      this.dom.removeEventListener('focus', this._domEvtFocus);
      this.dom.removeEventListener('blur', this._domEvtBlur);

      GridViewItem_get(GridViewItem_getPrototypeOf(GridViewItem.prototype), "destroy", this).call(this);
    }
  }, {
    key: "allowSelect",
    get: function get() {
      return this._allowSelect;
    },
    set: function set(value) {
      this._allowSelect = value;
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      if (value) {
        this.focus();
      }

      if (this._selected === value) return;
      this._selected = value;

      if (value) {
        this.classAdd(GridViewItem_CLASS_SELECTED);
        this.emit('select', this);
      } else {
        this.classRemove(GridViewItem_CLASS_SELECTED);
        this.emit('deselect', this);
      }
    }
  }, {
    key: "text",
    get: function get() {
      return this._labelText.text;
    },
    set: function set(value) {
      this._labelText.text = value;
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var sibling = this.dom.nextSibling;

      while (sibling) {
        if (sibling.ui instanceof GridViewItem && !sibling.ui.hidden) {
          return sibling.ui;
        }

        sibling = sibling.nextSibling;
      }

      return null;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var sibling = this.dom.previousSibling;

      while (sibling) {
        if (sibling.ui instanceof GridViewItem && !sibling.ui.hidden) {
          return sibling.ui;
        }

        sibling = sibling.previousSibling;
      }

      return null;
    }
  }]);

  return GridViewItem;
}(components_Container);

/* harmony default export */ var components_GridViewItem = (GridViewItem);
// EXTERNAL MODULE: ./src/components/GridView/style.scss
var GridView_style = __webpack_require__(6555);
;// CONCATENATED MODULE: ./src/components/GridView/index.js
function GridView_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridView_typeof = function _typeof(obj) { return typeof obj; }; } else { GridView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridView_typeof(obj); }

function GridView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GridView_createClass(Constructor, protoProps, staticProps) { if (protoProps) GridView_defineProperties(Constructor.prototype, protoProps); if (staticProps) GridView_defineProperties(Constructor, staticProps); return Constructor; }

function GridView_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { GridView_get = Reflect.get; } else { GridView_get = function _get(target, property, receiver) { var base = GridView_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return GridView_get(target, property, receiver || target); }

function GridView_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = GridView_getPrototypeOf(object); if (object === null) break; } return object; }

function GridView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridView_setPrototypeOf(subClass, superClass); }

function GridView_setPrototypeOf(o, p) { GridView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridView_setPrototypeOf(o, p); }

function GridView_createSuper(Derived) { var hasNativeReflectConstruct = GridView_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = GridView_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = GridView_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return GridView_possibleConstructorReturn(this, result); }; }

function GridView_possibleConstructorReturn(self, call) { if (call && (GridView_typeof(call) === "object" || typeof call === "function")) { return call; } return GridView_assertThisInitialized(self); }

function GridView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridView_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function GridView_getPrototypeOf(o) { GridView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridView_getPrototypeOf(o); }




var GridView_CLASS_ROOT = 'pcui-gridview';
/**
 * @name GridView
 * @augments Container
 * @classdesc Represents a container that shows a flexible wrappable
 * list of items that looks like a grid. Contains GridViewItem's.
 * @property {GridViewItem[]} selected Gets the selected grid view items.
 */

var GridView = /*#__PURE__*/function (_Container) {
  GridView_inherits(GridView, _Container);

  var _super = GridView_createSuper(GridView);

  /**
   * Creates new GridView.
   *
   * @param {object} [args] - The arguments
   * @param {Function} [args.filterFn] - A filter function to filter gridview items with signature (GridViewItem) => boolean.
   */
  function GridView(args) {
    var _this;

    GridView_classCallCheck(this, GridView);

    if (!args) args = {};
    _this = _super.call(this, args);

    _this.class.add(GridView_CLASS_ROOT);

    _this.on('append', _this._onAppendGridViewItem.bind(GridView_assertThisInitialized(_this)));

    _this.on('remove', _this._onRemoveGridViewItem.bind(GridView_assertThisInitialized(_this)));

    _this._filterFn = args.filterFn;
    _this._filterAnimationFrame = null;
    _this._filterCanceled = false;
    _this._selected = [];
    return _this;
  }

  GridView_createClass(GridView, [{
    key: "_onAppendGridViewItem",
    value: function _onAppendGridViewItem(item) {
      var _this2 = this;

      if (!(item instanceof components_GridViewItem)) return;
      var evtClick = item.on('click', function (evt) {
        return _this2._onClickItem(evt, item);
      });
      var evtSelect = item.on('select', function () {
        return _this2._onSelectItem(item);
      });
      var evtDeselect = item.on('deselect', function () {
        return _this2._onDeselectItem(item);
      });

      if (this._filterFn && !this._filterFn(item)) {
        item.hidden = true;
      }

      item.once('griditem:remove', function () {
        evtClick.unbind();
        evtClick = null;
        evtSelect.unbind();
        evtSelect = null;
        evtDeselect.unbind();
        evtDeselect = null;
      });
    }
  }, {
    key: "_onRemoveGridViewItem",
    value: function _onRemoveGridViewItem(item) {
      if (!(item instanceof components_GridViewItem)) return;
      item.selected = false;
      item.emit('griditem:remove');
      item.unbind('griditem:remove');
    }
  }, {
    key: "_onClickItem",
    value: function _onClickItem(evt, item) {
      if (evt.ctrlKey || evt.metaKey) {
        item.selected = !item.selected;
      } else if (evt.shiftKey) {
        var lastSelected = this._selected[this._selected.length - 1];

        if (lastSelected) {
          var comparePosition = lastSelected.dom.compareDocumentPosition(item.dom);

          if (comparePosition & Node.DOCUMENT_POSITION_FOLLOWING) {
            var sibling = lastSelected.nextSibling;

            while (sibling) {
              sibling.selected = true;
              if (sibling === item) break;
              sibling = sibling.nextSibling;
            }
          } else {
            var _sibling = lastSelected.previousSibling;

            while (_sibling) {
              _sibling.selected = true;
              if (_sibling === item) break;
              _sibling = _sibling.previousSibling;
            }
          }
        } else {
          item.selected = true;
        }
      } else {
        var othersSelected = false;
        var i = this._selected.length;

        while (i--) {
          if (this._selected[i] && this._selected[i] !== item) {
            this._selected[i].selected = false;
            othersSelected = true;
          }
        }

        if (othersSelected) {
          item.selected = true;
        } else {
          item.selected = !item.selected;
        }
      }
    }
  }, {
    key: "_onSelectItem",
    value: function _onSelectItem(item) {
      this._selected.push(item);

      this.emit('select', item);
    }
  }, {
    key: "_onDeselectItem",
    value: function _onDeselectItem(item) {
      var index = this._selected.indexOf(item);

      if (index !== -1) {
        this._selected.splice(index, 1);

        this.emit('deselect', item);
      }
    }
    /**
     * @name GridView#deselect
     * @description Deselects all selected grid view items.
     */

  }, {
    key: "deselect",
    value: function deselect() {
      var i = this._selected.length;

      while (i--) {
        if (this._selected[i]) {
          this._selected[i].selected = false;
        }
      }
    }
    /**
     * @name GridView#filter
     * @description Filters grid view items with the filter function provided in the constructor.
     */

  }, {
    key: "filter",
    value: function filter() {
      var _this3 = this;

      this.forEachChild(function (child) {
        if (child instanceof components_GridViewItem) {
          child.hidden = _this3._filterFn && !_this3._filterFn(child);
        }
      });
    }
    /**
     * @name GridView#filterAsync
     * @description Filters grid view items asynchronously by only allowing up to the specified
     * number of grid view item operations. Fires following events:
     * filter:start - When filtering starts
     * filter:end - When filtering ends
     * filter:delay - When an animation frame is requested to process another batch.
     * filter:cancel - When filtering is canceled.
     * @param {number} batchLimit - The maximum number of items to show
     * before requesting another animation frame.
     */

  }, {
    key: "filterAsync",
    value: function filterAsync(batchLimit) {
      var _this4 = this;

      var i = 0;
      batchLimit = batchLimit || 100;
      var children = this.dom.childNodes;
      var len = children.length;
      this.emit('filter:start');
      this._filterCanceled = false;

      var next = function next() {
        _this4._filterAnimationFrame = null;
        var visible = 0;

        for (; i < len && visible < batchLimit; i++) {
          if (_this4._filterCanceled) {
            _this4._filterCanceled = false;

            _this4.emit('filter:cancel');

            return;
          }

          var child = children[i].ui;

          if (child instanceof components_GridViewItem) {
            if (_this4._filterFn && !_this4._filterFn(child)) {
              child.hidden = true;
            } else {
              child.hidden = false;
              visible++;
            }
          }
        }

        if (i < len) {
          _this4.emit('filter:delay');

          _this4._filterAnimationFrame = requestAnimationFrame(next);
        } else {
          _this4.emit('filter:end');
        }
      };

      next();
    }
    /**
     * @name GridView#filterAsyncCancel
     * @description Cancels asynchronous filtering.
     */

  }, {
    key: "filterAsyncCancel",
    value: function filterAsyncCancel() {
      if (this._filterAnimationFrame) {
        cancelAnimationFrame(this._filterAnimationFrame);
        this._filterAnimationFrame = null;
      } else {
        this._filterCanceled = true;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._destroyed) return;

      if (this._filterAnimationFrame) {
        cancelAnimationFrame(this._filterAnimationFrame);
        this._filterAnimationFrame = null;
      }

      GridView_get(GridView_getPrototypeOf(GridView.prototype), "destroy", this).call(this);
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected.slice();
    }
  }]);

  return GridView;
}(components_Container);

/* harmony default export */ var components_GridView = (GridView);
// EXTERNAL MODULE: ./src/components/VectorInput/style.scss
var VectorInput_style = __webpack_require__(8146);
;// CONCATENATED MODULE: ./src/components/VectorInput/index.js
function VectorInput_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { VectorInput_typeof = function _typeof(obj) { return typeof obj; }; } else { VectorInput_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return VectorInput_typeof(obj); }

function VectorInput_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VectorInput_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VectorInput_createClass(Constructor, protoProps, staticProps) { if (protoProps) VectorInput_defineProperties(Constructor.prototype, protoProps); if (staticProps) VectorInput_defineProperties(Constructor, staticProps); return Constructor; }

function VectorInput_set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { VectorInput_set = Reflect.set; } else { VectorInput_set = function set(target, property, value, receiver) { var base = VectorInput_superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { VectorInput_defineProperty(receiver, property, value); } return true; }; } return VectorInput_set(target, property, value, receiver); }

function components_VectorInput_set(target, property, value, receiver, isStrict) { var s = VectorInput_set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function VectorInput_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function VectorInput_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { VectorInput_get = Reflect.get; } else { VectorInput_get = function _get(target, property, receiver) { var base = VectorInput_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return VectorInput_get(target, property, receiver || target); }

function VectorInput_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = VectorInput_getPrototypeOf(object); if (object === null) break; } return object; }

function VectorInput_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) VectorInput_setPrototypeOf(subClass, superClass); }

function VectorInput_setPrototypeOf(o, p) { VectorInput_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return VectorInput_setPrototypeOf(o, p); }

function VectorInput_createSuper(Derived) { var hasNativeReflectConstruct = VectorInput_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = VectorInput_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = VectorInput_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return VectorInput_possibleConstructorReturn(this, result); }; }

function VectorInput_possibleConstructorReturn(self, call) { if (call && (VectorInput_typeof(call) === "object" || typeof call === "function")) { return call; } return VectorInput_assertThisInitialized(self); }

function VectorInput_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function VectorInput_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function VectorInput_getPrototypeOf(o) { VectorInput_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return VectorInput_getPrototypeOf(o); }





var CLASS_VECTOR_INPUT = 'pcui-vector-input';
/**
 * @name VectorInput
 * @classdesc A vector input
 * @augments Element
 * @mixes IBindable
 * @mixes IFocusable
 */

var VectorInput = /*#__PURE__*/function (_Element) {
  VectorInput_inherits(VectorInput, _Element);

  var _super = VectorInput_createSuper(VectorInput);

  /**
   * Creates a new pcui.VectorInput.
   *
   * @param {object} args - The arguments.
   * @param {number} [args.dimensions=3] - The number of dimensions in the vector. Can be between 2 to 4. Defaults to 3.
   * @param {number} [args.min] - The minimum value for each vector element.
   * @param {number} [args.max] - The maximum value for each vector element.
   * @param {number} [args.precision] - The decimal precision for each vector element.
   * @param {number} [args.step] - The incremental step when using arrow keys for each vector element.
   * @param {boolean} [args.renderChanges] - If true each vector element will flash on changes.
   * @param {string[]|string} [args.placeholder] - The placeholder string for each vector element.
   */
  function VectorInput(args) {
    var _this;

    VectorInput_classCallCheck(this, VectorInput);

    args = Object.assign({}, args); // set binding after inputs have been created

    var binding = args.binding;
    delete args.binding;
    _this = _super.call(this, args.dom ? args.dom : document.createElement('div'), args);

    _this.class.add(CLASS_VECTOR_INPUT);

    var dimensions = Math.max(2, Math.min(4, args.dimensions || 3));

    var onInputChange = _this._onInputChange.bind(VectorInput_assertThisInitialized(_this));

    _this._inputs = new Array(dimensions);

    for (var i = 0; i < _this._inputs.length; i++) {
      _this._inputs[i] = new components_NumericInput({
        min: args.min,
        max: args.max,
        precision: args.precision,
        step: args.step,
        renderChanges: args.renderChanges,
        placeholder: args.placeholder ? Array.isArray(args.placeholder) ? args.placeholder[i] : args.placeholder : null
      });

      _this._inputs[i].on('change', onInputChange);

      _this._inputs[i].on('focus', function () {
        _this.emit('focus');
      });

      _this._inputs[i].on('blur', function () {
        _this.emit('blur');
      });

      _this.dom.appendChild(_this._inputs[i].dom);

      _this._inputs[i].parent = VectorInput_assertThisInitialized(_this);
    } // set the binding after the inputs have been created
    // because we rely on them in the overriden setter


    if (binding) {
      _this.binding = binding;
    }

    _this._applyingChange = false;

    if (args.value !== undefined) {
      _this.value = args.value;
    }

    return _this;
  }

  VectorInput_createClass(VectorInput, [{
    key: "_onInputChange",
    value: function _onInputChange() {
      if (this._applyingChange) return; // check if any of our inputs have the multiple_values class
      // and if so inherit it for us as well

      var showingMultipleValues = false;

      for (var i = 0; i < this._inputs.length; i++) {
        if (this._inputs[i].class.contains(MULTIPLE_VALUES)) {
          showingMultipleValues = true;
          break;
        }
      }

      if (showingMultipleValues) {
        this.class.add(MULTIPLE_VALUES);
      } else {
        this.class.remove(MULTIPLE_VALUES);
      }

      this.emit('change', this.value);
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value) {
      this.class.remove(MULTIPLE_VALUES);
      if (JSON.stringify(this.value) === JSON.stringify(value)) return false;
      this._applyingChange = true;

      for (var i = 0; i < this._inputs.length; i++) {
        // disable binding for each individual input when we use
        // the 'value' setter for the whole vector value. That is because
        // we do not want the individual inputs to emit their own binding events
        // since we are setting the whole vector value here
        var binding = this._inputs[i].binding;
        var applyingChange = false;

        if (binding) {
          applyingChange = binding.applyingChange;
          binding.applyingChange = true;
        }

        this._inputs[i].value = value && value[i] !== undefined ? value[i] : null;

        if (binding) {
          binding.applyingChange = applyingChange;
        }
      }

      this.emit('change', this.value);
      this._applyingChange = false;
      return true;
    }
  }, {
    key: "link",
    value: function link(observers, paths) {
      var _this2 = this;

      VectorInput_get(VectorInput_getPrototypeOf(VectorInput.prototype), "link", this).call(this, observers, paths);

      observers = Array.isArray(observers) ? observers : [observers];
      paths = Array.isArray(paths) ? paths : [paths];
      var useSinglePath = paths.length === 1 || observers.length !== paths.length;

      if (useSinglePath) {
        for (var i = 0; i < this._inputs.length; i++) {
          // link observers to path.i for each dimension
          this._inputs[i].link(observers, paths[0] + ".".concat(i));
        }
      } else {
        var _loop = function _loop(_i) {
          // link observers to paths[i].i for each dimension
          _this2._inputs[_i].link(observers, paths.map(function (path) {
            return "".concat(path, ".").concat(_i);
          }));
        };

        for (var _i = 0; _i < this._inputs.length; _i++) {
          _loop(_i);
        }
      }
    }
  }, {
    key: "unlink",
    value: function unlink() {
      VectorInput_get(VectorInput_getPrototypeOf(VectorInput.prototype), "unlink", this).call(this);

      for (var i = 0; i < this._inputs.length; i++) {
        this._inputs[i].unlink();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this._inputs[0].focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      for (var i = 0; i < this._inputs.length; i++) {
        this._inputs[i].blur();
      }
    }
  }, {
    key: "value",
    get: function get() {
      var value = new Array(this._inputs.length);

      for (var i = 0; i < this._inputs.length; i++) {
        value[i] = this._inputs[i].value;
      }

      return value;
    },
    set: function set(value) {
      if (typeof value === 'string') {
        try {
          // try to parse the string
          value = JSON.parse(value); // if the string could be converted to an array but some of it's values aren't numbers
          // then use a default array also

          if (Array.isArray(value) && value.some(function (i) {
            return !Number.isFinite(i);
          })) {
            throw new Error('VectorInput value set to string which doesn\'t contain an array of numbers');
          }
        } catch (e) {
          console.error(e);
          value = [];
        }
      }

      if (!Array.isArray(value)) {
        value = [];
      }

      var changed = this._updateValue(value);

      if (changed && this._binding) {
        this._binding.setValue(value);
      }
    }
    /* eslint accessor-pairs: 0 */

  }, {
    key: "values",
    set: function set(values) {
      // create an array for each dimension (e.g. one array for x one for y one for z)
      values = this._inputs.map(function (_, i) {
        return values.map(function (arr) {
          return arr[i];
        });
      });

      this._inputs.forEach(function (input, i) {
        input.values = values[i];
      });
    } // override binding setter to set a binding clone to
    // each input

  }, {
    key: "binding",
    get: // we have to override the getter too because
    // we have overriden the setter
    function get() {
      return VectorInput_get(VectorInput_getPrototypeOf(VectorInput.prototype), "binding", this);
    },
    set: function set(value) {
      components_VectorInput_set(VectorInput_getPrototypeOf(VectorInput.prototype), "binding", value, this, true);

      for (var i = 0; i < this._inputs.length; i++) {
        this._inputs[i].binding = value ? value.clone() : null;
      }
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this._inputs.map(function (input) {
        return input.placeholder;
      });
    },
    set: function set(value) {
      for (var i = 0; i < this._inputs.length; i++) {
        this._inputs[i].placeholder = value[i] || value || null;
      }
    }
  }, {
    key: "inputs",
    get: function get() {
      return this._inputs.slice();
    }
  }]);

  return VectorInput;
}(components_Element); // add proxied properties


['min', 'max', 'precision', 'step', 'renderChanges'].forEach(function (property) {
  Object.defineProperty(VectorInput.prototype, property, {
    get: function get() {
      return this._inputs[0][property];
    },
    set: function set(value) {
      for (var i = 0; i < this._inputs.length; i++) {
        this._inputs[i][property] = value;
      }
    }
  });
});
components_Element.register('vec2', VectorInput, {
  dimensions: 2,
  renderChanges: true
});
components_Element.register('vec3', VectorInput, {
  dimensions: 3,
  renderChanges: true
});
components_Element.register('vec4', VectorInput, {
  dimensions: 4,
  renderChanges: true
});
/* harmony default export */ var components_VectorInput = (VectorInput);
// EXTERNAL MODULE: ./src/scss/_pcui-hidden.scss
var _pcui_hidden = __webpack_require__(8503);
;// CONCATENATED MODULE: ./src/index.js































 // import pcui-hidden last



}();
var __webpack_exports__ArrayInput = __webpack_exports__.qt;
var __webpack_exports__BooleanInput = __webpack_exports__.Ki;
var __webpack_exports__Button = __webpack_exports__.zx;
var __webpack_exports__Code = __webpack_exports__.EK;
var __webpack_exports__Container = __webpack_exports__.W2;
var __webpack_exports__ContextMenu = __webpack_exports__.xV;
var __webpack_exports__Divider = __webpack_exports__.iz;
var __webpack_exports__Element = __webpack_exports__.W_;
var __webpack_exports__GridView = __webpack_exports__.zG;
var __webpack_exports__GridViewItem = __webpack_exports__.Zn;
var __webpack_exports__IBindable = __webpack_exports__.T9;
var __webpack_exports__ICollapsible = __webpack_exports__.LH;
var __webpack_exports__IFlex = __webpack_exports__.ik;
var __webpack_exports__IFocusable = __webpack_exports__.Ub;
var __webpack_exports__IGrid = __webpack_exports__.g$;
var __webpack_exports__IResizable = __webpack_exports__.pM;
var __webpack_exports__IScrollable = __webpack_exports__.CQ;
var __webpack_exports__InfoBox = __webpack_exports__.vD;
var __webpack_exports__Label = __webpack_exports__.__;
var __webpack_exports__LabelGroup = __webpack_exports__.ee;
var __webpack_exports__NumericInput = __webpack_exports__.Af;
var __webpack_exports__Overlay = __webpack_exports__.aV;
var __webpack_exports__Panel = __webpack_exports__.s_;
var __webpack_exports__Progress = __webpack_exports__.Ex;
var __webpack_exports__SelectInput = __webpack_exports__.lq;
var __webpack_exports__SliderInput = __webpack_exports__.a;
var __webpack_exports__Spinner = __webpack_exports__.$j;
var __webpack_exports__TextAreaInput = __webpack_exports__.Fz;
var __webpack_exports__TextInput = __webpack_exports__.oi;
var __webpack_exports__TreeView = __webpack_exports__.LQ;
var __webpack_exports__TreeViewItem = __webpack_exports__.A7;
var __webpack_exports__VectorInput = __webpack_exports__.Uy;
export { __webpack_exports__ArrayInput as ArrayInput, __webpack_exports__BooleanInput as BooleanInput, __webpack_exports__Button as Button, __webpack_exports__Code as Code, __webpack_exports__Container as Container, __webpack_exports__ContextMenu as ContextMenu, __webpack_exports__Divider as Divider, __webpack_exports__Element as Element, __webpack_exports__GridView as GridView, __webpack_exports__GridViewItem as GridViewItem, __webpack_exports__IBindable as IBindable, __webpack_exports__ICollapsible as ICollapsible, __webpack_exports__IFlex as IFlex, __webpack_exports__IFocusable as IFocusable, __webpack_exports__IGrid as IGrid, __webpack_exports__IResizable as IResizable, __webpack_exports__IScrollable as IScrollable, __webpack_exports__InfoBox as InfoBox, __webpack_exports__Label as Label, __webpack_exports__LabelGroup as LabelGroup, __webpack_exports__NumericInput as NumericInput, __webpack_exports__Overlay as Overlay, __webpack_exports__Panel as Panel, __webpack_exports__Progress as Progress, __webpack_exports__SelectInput as SelectInput, __webpack_exports__SliderInput as SliderInput, __webpack_exports__Spinner as Spinner, __webpack_exports__TextAreaInput as TextAreaInput, __webpack_exports__TextInput as TextInput, __webpack_exports__TreeView as TreeView, __webpack_exports__TreeViewItem as TreeViewItem, __webpack_exports__VectorInput as VectorInput };
