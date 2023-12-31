"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * TinyMCE version 6.1.2 (2022-07-29)
 */
(function () {
  'use strict';

  var Cell = function Cell(initial) {
    var value = initial;

    var get = function get() {
      return value;
    };

    var set = function set(v) {
      value = v;
    };

    return {
      get: get,
      set: set
    };
  };

  var global$2 = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var get$5 = function get$5(fullscreenState) {
    return {
      isFullscreen: function isFullscreen() {
        return fullscreenState.get() !== null;
      }
    };
  };

  var hasProto = function hasProto(v, constructor, predicate) {
    var _a;

    if (predicate(v, constructor.prototype)) {
      return true;
    } else {
      return ((_a = v.constructor) === null || _a === void 0 ? void 0 : _a.name) === constructor.name;
    }
  };

  var typeOf = function typeOf(x) {
    var t = _typeof(x);

    if (x === null) {
      return 'null';
    } else if (t === 'object' && Array.isArray(x)) {
      return 'array';
    } else if (t === 'object' && hasProto(x, String, function (o, proto) {
      return proto.isPrototypeOf(o);
    })) {
      return 'string';
    } else {
      return t;
    }
  };

  var isType$1 = function isType$1(type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };

  var isSimpleType = function isSimpleType(type) {
    return function (value) {
      return _typeof(value) === type;
    };
  };

  var eq$1 = function eq$1(t) {
    return function (a) {
      return t === a;
    };
  };

  var isString = isType$1('string');
  var isArray = isType$1('array');
  var isNull = eq$1(null);
  var isBoolean = isSimpleType('boolean');

  var isNullable = function isNullable(a) {
    return a === null || a === undefined;
  };

  var isNonNullable = function isNonNullable(a) {
    return !isNullable(a);
  };

  var isFunction = isSimpleType('function');
  var isNumber = isSimpleType('number');

  var noop = function noop() {};

  var compose = function compose(fa, fb) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return fa(fb.apply(null, args));
    };
  };

  var compose1 = function compose1(fbc, fab) {
    return function (a) {
      return fbc(fab(a));
    };
  };

  var constant = function constant(value) {
    return function () {
      return value;
    };
  };

  function curry(fn) {
    for (var _len2 = arguments.length, initialArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      initialArgs[_key2 - 1] = arguments[_key2];
    }

    return function () {
      for (var _len3 = arguments.length, restArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        restArgs[_key3] = arguments[_key3];
      }

      var all = initialArgs.concat(restArgs);
      return fn.apply(null, all);
    };
  }

  var never = constant(false);
  var always = constant(true);

  var Optional =
  /*#__PURE__*/
  function () {
    function Optional(tag, value) {
      _classCallCheck(this, Optional);

      this.tag = tag;
      this.value = value;
    }

    _createClass(Optional, [{
      key: "fold",
      value: function fold(onNone, onSome) {
        if (this.tag) {
          return onSome(this.value);
        } else {
          return onNone();
        }
      }
    }, {
      key: "isSome",
      value: function isSome() {
        return this.tag;
      }
    }, {
      key: "isNone",
      value: function isNone() {
        return !this.tag;
      }
    }, {
      key: "map",
      value: function map(mapper) {
        if (this.tag) {
          return Optional.some(mapper(this.value));
        } else {
          return Optional.none();
        }
      }
    }, {
      key: "bind",
      value: function bind(binder) {
        if (this.tag) {
          return binder(this.value);
        } else {
          return Optional.none();
        }
      }
    }, {
      key: "exists",
      value: function exists(predicate) {
        return this.tag && predicate(this.value);
      }
    }, {
      key: "forall",
      value: function forall(predicate) {
        return !this.tag || predicate(this.value);
      }
    }, {
      key: "filter",
      value: function filter(predicate) {
        if (!this.tag || predicate(this.value)) {
          return this;
        } else {
          return Optional.none();
        }
      }
    }, {
      key: "getOr",
      value: function getOr(replacement) {
        return this.tag ? this.value : replacement;
      }
    }, {
      key: "or",
      value: function or(replacement) {
        return this.tag ? this : replacement;
      }
    }, {
      key: "getOrThunk",
      value: function getOrThunk(thunk) {
        return this.tag ? this.value : thunk();
      }
    }, {
      key: "orThunk",
      value: function orThunk(thunk) {
        return this.tag ? this : thunk();
      }
    }, {
      key: "getOrDie",
      value: function getOrDie(message) {
        if (!this.tag) {
          throw new Error(message !== null && message !== void 0 ? message : 'Called getOrDie on None');
        } else {
          return this.value;
        }
      }
    }, {
      key: "getOrNull",
      value: function getOrNull() {
        return this.tag ? this.value : null;
      }
    }, {
      key: "getOrUndefined",
      value: function getOrUndefined() {
        return this.value;
      }
    }, {
      key: "each",
      value: function each(worker) {
        if (this.tag) {
          worker(this.value);
        }
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return this.tag ? [this.value] : [];
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.tag ? "some(".concat(this.value, ")") : 'none()';
      }
    }], [{
      key: "some",
      value: function some(value) {
        return new Optional(true, value);
      }
    }, {
      key: "none",
      value: function none() {
        return Optional.singletonNone;
      }
    }, {
      key: "from",
      value: function from(value) {
        return isNonNullable(value) ? Optional.some(value) : Optional.none();
      }
    }]);

    return Optional;
  }();

  Optional.singletonNone = new Optional(false);

  var singleton = function singleton(doRevoke) {
    var subject = Cell(Optional.none());

    var revoke = function revoke() {
      return subject.get().each(doRevoke);
    };

    var clear = function clear() {
      revoke();
      subject.set(Optional.none());
    };

    var isSet = function isSet() {
      return subject.get().isSome();
    };

    var get = function get() {
      return subject.get();
    };

    var set = function set(s) {
      revoke();
      subject.set(Optional.some(s));
    };

    return {
      clear: clear,
      isSet: isSet,
      get: get,
      set: set
    };
  };

  var unbindable = function unbindable() {
    return singleton(function (s) {
      return s.unbind();
    });
  };

  var value = function value() {
    var subject = singleton(noop);

    var on = function on(f) {
      return subject.get().each(f);
    };

    return _objectSpread({}, subject, {
      on: on
    });
  };

  var first = function first(fn, rate) {
    var timer = null;

    var cancel = function cancel() {
      if (!isNull(timer)) {
        clearTimeout(timer);
        timer = null;
      }
    };

    var throttle = function throttle() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (isNull(timer)) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(null, args);
        }, rate);
      }
    };

    return {
      cancel: cancel,
      throttle: throttle
    };
  };

  var nativePush = Array.prototype.push;

  var map = function map(xs, f) {
    var len = xs.length;
    var r = new Array(len);

    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i);
    }

    return r;
  };

  var each$1 = function each$1(xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i);
    }
  };

  var filter$1 = function filter$1(xs, pred) {
    var r = [];

    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];

      if (pred(x, i)) {
        r.push(x);
      }
    }

    return r;
  };

  var findUntil = function findUntil(xs, pred, until) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];

      if (pred(x, i)) {
        return Optional.some(x);
      } else if (until(x, i)) {
        break;
      }
    }

    return Optional.none();
  };

  var find$1 = function find$1(xs, pred) {
    return findUntil(xs, pred, never);
  };

  var flatten = function flatten(xs) {
    var r = [];

    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!isArray(xs[i])) {
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      }

      nativePush.apply(r, xs[i]);
    }

    return r;
  };

  var bind$3 = function bind$3(xs, f) {
    return flatten(map(xs, f));
  };

  var get$4 = function get$4(xs, i) {
    return i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
  };

  var head = function head(xs) {
    return get$4(xs, 0);
  };

  var findMap = function findMap(arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var _r = f(arr[i], i);

      if (_r.isSome()) {
        return _r;
      }
    }

    return Optional.none();
  };

  var keys = Object.keys;

  var each = function each(obj, f) {
    var props = keys(obj);

    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i);
    }
  };

  var contains = function contains(str, substr) {
    return str.indexOf(substr) !== -1;
  };

  var isSupported$1 = function isSupported$1(dom) {
    return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
  };

  var fromHtml = function fromHtml(html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;

    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      var message = 'HTML does not have a single root node';
      console.error(message, html);
      throw new Error(message);
    }

    return fromDom(div.childNodes[0]);
  };

  var fromTag = function fromTag(tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };

  var fromText = function fromText(text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };

  var fromDom = function fromDom(node) {
    if (node === null || node === undefined) {
      throw new Error('Node cannot be null or undefined');
    }

    return {
      dom: node
    };
  };

  var fromPoint = function fromPoint(docElm, x, y) {
    return Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
  };

  var SugarElement = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };
  typeof window !== 'undefined' ? window : Function('return this;')();
  var DOCUMENT = 9;
  var DOCUMENT_FRAGMENT = 11;
  var ELEMENT = 1;
  var TEXT = 3;

  var type = function type(element) {
    return element.dom.nodeType;
  };

  var isType = function isType(t) {
    return function (element) {
      return type(element) === t;
    };
  };

  var isElement = isType(ELEMENT);
  var isText = isType(TEXT);
  var isDocument = isType(DOCUMENT);
  var isDocumentFragment = isType(DOCUMENT_FRAGMENT);

  var is = function is(element, selector) {
    var dom = element.dom;

    if (dom.nodeType !== ELEMENT) {
      return false;
    } else {
      var elem = dom;

      if (elem.matches !== undefined) {
        return elem.matches(selector);
      } else if (elem.msMatchesSelector !== undefined) {
        return elem.msMatchesSelector(selector);
      } else if (elem.webkitMatchesSelector !== undefined) {
        return elem.webkitMatchesSelector(selector);
      } else if (elem.mozMatchesSelector !== undefined) {
        return elem.mozMatchesSelector(selector);
      } else {
        throw new Error('Browser lacks native selectors');
      }
    }
  };

  var bypassSelector = function bypassSelector(dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
  };

  var all$1 = function all$1(selector, scope) {
    var base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), SugarElement.fromDom);
  };

  var eq = function eq(e1, e2) {
    return e1.dom === e2.dom;
  };

  var owner = function owner(element) {
    return SugarElement.fromDom(element.dom.ownerDocument);
  };

  var documentOrOwner = function documentOrOwner(dos) {
    return isDocument(dos) ? dos : owner(dos);
  };

  var parent = function parent(element) {
    return Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
  };

  var parents = function parents(element, isRoot) {
    var stop = isFunction(isRoot) ? isRoot : never;
    var dom = element.dom;
    var ret = [];

    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var p = SugarElement.fromDom(rawParent);
      ret.push(p);

      if (stop(p) === true) {
        break;
      } else {
        dom = rawParent;
      }
    }

    return ret;
  };

  var siblings$2 = function siblings$2(element) {
    var filterSelf = function filterSelf(elements) {
      return filter$1(elements, function (x) {
        return !eq(element, x);
      });
    };

    return parent(element).map(children).map(filterSelf).getOr([]);
  };

  var children = function children(element) {
    return map(element.dom.childNodes, SugarElement.fromDom);
  };

  var isShadowRoot = function isShadowRoot(dos) {
    return isDocumentFragment(dos) && isNonNullable(dos.dom.host);
  };

  var supported = isFunction(Element.prototype.attachShadow) && isFunction(Node.prototype.getRootNode);
  var isSupported = constant(supported);
  var getRootNode = supported ? function (e) {
    return SugarElement.fromDom(e.dom.getRootNode());
  } : documentOrOwner;

  var getShadowRoot = function getShadowRoot(e) {
    var r = getRootNode(e);
    return isShadowRoot(r) ? Optional.some(r) : Optional.none();
  };

  var getShadowHost = function getShadowHost(e) {
    return SugarElement.fromDom(e.dom.host);
  };

  var getOriginalEventTarget = function getOriginalEventTarget(event) {
    if (isSupported() && isNonNullable(event.target)) {
      var el = SugarElement.fromDom(event.target);

      if (isElement(el) && isOpenShadowHost(el)) {
        if (event.composed && event.composedPath) {
          var composedPath = event.composedPath();

          if (composedPath) {
            return head(composedPath);
          }
        }
      }
    }

    return Optional.from(event.target);
  };

  var isOpenShadowHost = function isOpenShadowHost(element) {
    return isNonNullable(element.dom.shadowRoot);
  };

  var inBody = function inBody(element) {
    var dom = isText(element) ? element.dom.parentNode : element.dom;

    if (dom === undefined || dom === null || dom.ownerDocument === null) {
      return false;
    }

    var doc = dom.ownerDocument;
    return getShadowRoot(SugarElement.fromDom(dom)).fold(function () {
      return doc.body.contains(dom);
    }, compose1(inBody, getShadowHost));
  };

  var getBody = function getBody(doc) {
    var b = doc.dom.body;

    if (b === null || b === undefined) {
      throw new Error('Body is not available yet');
    }

    return SugarElement.fromDom(b);
  };

  var rawSet = function rawSet(dom, key, value) {
    if (isString(value) || isBoolean(value) || isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };

  var set = function set(element, key, value) {
    rawSet(element.dom, key, value);
  };

  var get$3 = function get$3(element, key) {
    var v = element.dom.getAttribute(key);
    return v === null ? undefined : v;
  };

  var remove = function remove(element, key) {
    element.dom.removeAttribute(key);
  };

  var internalSet = function internalSet(dom, property, value) {
    if (!isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }

    if (isSupported$1(dom)) {
      dom.style.setProperty(property, value);
    }
  };

  var setAll = function setAll(element, css) {
    var dom = element.dom;
    each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };

  var get$2 = function get$2(element, property) {
    var dom = element.dom;
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
  };

  var getUnsafeProperty = function getUnsafeProperty(dom, property) {
    return isSupported$1(dom) ? dom.style.getPropertyValue(property) : '';
  };

  var mkEvent = function mkEvent(target, x, y, stop, prevent, kill, raw) {
    return {
      target: target,
      x: x,
      y: y,
      stop: stop,
      prevent: prevent,
      kill: kill,
      raw: raw
    };
  };

  var fromRawEvent = function fromRawEvent(rawEvent) {
    var target = SugarElement.fromDom(getOriginalEventTarget(rawEvent).getOr(rawEvent.target));

    var stop = function stop() {
      return rawEvent.stopPropagation();
    };

    var prevent = function prevent() {
      return rawEvent.preventDefault();
    };

    var kill = compose(prevent, stop);
    return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
  };

  var handle = function handle(filter, handler) {
    return function (rawEvent) {
      if (filter(rawEvent)) {
        handler(fromRawEvent(rawEvent));
      }
    };
  };

  var binder = function binder(element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom.addEventListener(event, wrapped, useCapture);
    return {
      unbind: curry(unbind, element, event, wrapped, useCapture)
    };
  };

  var bind$2 = function bind$2(element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };

  var unbind = function unbind(element, event, handler, useCapture) {
    element.dom.removeEventListener(event, handler, useCapture);
  };

  var filter = always;

  var bind$1 = function bind$1(element, event, handler) {
    return bind$2(element, event, filter, handler);
  };

  var cached = function cached(f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;

        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        r = f.apply(null, args);
      }

      return r;
    };
  };

  var DeviceType = function DeviceType(os, browser, userAgent, mediaMatch) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isMobile = os.isiOS() || os.isAndroid();
    var isTouch = isMobile || mediaMatch('(pointer:coarse)');
    var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
    var isPhone = isiPhone || isMobile && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    var isDesktop = !isPhone && !isTablet && !iOSwebview;
    return {
      isiPad: constant(isiPad),
      isiPhone: constant(isiPhone),
      isTablet: constant(isTablet),
      isPhone: constant(isPhone),
      isTouch: constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: constant(iOSwebview),
      isDesktop: constant(isDesktop)
    };
  };

  var firstMatch = function firstMatch(regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];

      if (x.test(s)) {
        return x;
      }
    }

    return undefined;
  };

  var find = function find(regexes, agent) {
    var r = firstMatch(regexes, agent);

    if (!r) {
      return {
        major: 0,
        minor: 0
      };
    }

    var group = function group(i) {
      return Number(agent.replace(r, '$' + i));
    };

    return nu$2(group(1), group(2));
  };

  var detect$3 = function detect$3(versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();

    if (versionRegexes.length === 0) {
      return unknown$2();
    }

    return find(versionRegexes, cleanedAgent);
  };

  var unknown$2 = function unknown$2() {
    return nu$2(0, 0);
  };

  var nu$2 = function nu$2(major, minor) {
    return {
      major: major,
      minor: minor
    };
  };

  var Version = {
    nu: nu$2,
    detect: detect$3,
    unknown: unknown$2
  };

  var detectBrowser$1 = function detectBrowser$1(browsers, userAgentData) {
    return findMap(userAgentData.brands, function (uaBrand) {
      var lcBrand = uaBrand.brand.toLowerCase();
      return find$1(browsers, function (browser) {
        var _a;

        return lcBrand === ((_a = browser.brand) === null || _a === void 0 ? void 0 : _a.toLowerCase());
      }).map(function (info) {
        return {
          current: info.name,
          version: Version.nu(parseInt(uaBrand.version, 10), 0)
        };
      });
    });
  };

  var detect$2 = function detect$2(candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return find$1(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };

  var detectBrowser = function detectBrowser(browsers, userAgent) {
    return detect$2(browsers, userAgent).map(function (browser) {
      var version = Version.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };

  var detectOs = function detectOs(oses, userAgent) {
    return detect$2(oses, userAgent).map(function (os) {
      var version = Version.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;

  var checkContains = function checkContains(target) {
    return function (uastring) {
      return contains(uastring, target);
    };
  };

  var browsers = [{
    name: 'Edge',
    versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
    search: function search(uastring) {
      return contains(uastring, 'edge/') && contains(uastring, 'chrome') && contains(uastring, 'safari') && contains(uastring, 'applewebkit');
    }
  }, {
    name: 'Chromium',
    brand: 'Chromium',
    versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
    search: function search(uastring) {
      return contains(uastring, 'chrome') && !contains(uastring, 'chromeframe');
    }
  }, {
    name: 'IE',
    versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
    search: function search(uastring) {
      return contains(uastring, 'msie') || contains(uastring, 'trident');
    }
  }, {
    name: 'Opera',
    versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
    search: checkContains('opera')
  }, {
    name: 'Firefox',
    versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
    search: checkContains('firefox')
  }, {
    name: 'Safari',
    versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
    search: function search(uastring) {
      return (contains(uastring, 'safari') || contains(uastring, 'mobile/')) && contains(uastring, 'applewebkit');
    }
  }];
  var oses = [{
    name: 'Windows',
    search: checkContains('win'),
    versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
  }, {
    name: 'iOS',
    search: function search(uastring) {
      return contains(uastring, 'iphone') || contains(uastring, 'ipad');
    },
    versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
  }, {
    name: 'Android',
    search: checkContains('android'),
    versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
  }, {
    name: 'macOS',
    search: checkContains('mac os x'),
    versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
  }, {
    name: 'Linux',
    search: checkContains('linux'),
    versionRegexes: []
  }, {
    name: 'Solaris',
    search: checkContains('sunos'),
    versionRegexes: []
  }, {
    name: 'FreeBSD',
    search: checkContains('freebsd'),
    versionRegexes: []
  }, {
    name: 'ChromeOS',
    search: checkContains('cros'),
    versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
  }];
  var PlatformInfo = {
    browsers: constant(browsers),
    oses: constant(oses)
  };
  var edge = 'Edge';
  var chromium = 'Chromium';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';

  var unknown$1 = function unknown$1() {
    return nu$1({
      current: undefined,
      version: Version.unknown()
    });
  };

  var nu$1 = function nu$1(info) {
    var current = info.current;
    var version = info.version;

    var isBrowser = function isBrowser(name) {
      return function () {
        return current === name;
      };
    };

    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge),
      isChromium: isBrowser(chromium),
      isIE: isBrowser(ie),
      isOpera: isBrowser(opera),
      isFirefox: isBrowser(firefox),
      isSafari: isBrowser(safari)
    };
  };

  var Browser = {
    unknown: unknown$1,
    nu: nu$1,
    edge: constant(edge),
    chromium: constant(chromium),
    ie: constant(ie),
    opera: constant(opera),
    firefox: constant(firefox),
    safari: constant(safari)
  };
  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var macos = 'macOS';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var chromeos = 'ChromeOS';

  var unknown = function unknown() {
    return nu({
      current: undefined,
      version: Version.unknown()
    });
  };

  var nu = function nu(info) {
    var current = info.current;
    var version = info.version;

    var isOS = function isOS(name) {
      return function () {
        return current === name;
      };
    };

    return {
      current: current,
      version: version,
      isWindows: isOS(windows),
      isiOS: isOS(ios),
      isAndroid: isOS(android),
      isMacOS: isOS(macos),
      isLinux: isOS(linux),
      isSolaris: isOS(solaris),
      isFreeBSD: isOS(freebsd),
      isChromeOS: isOS(chromeos)
    };
  };

  var OperatingSystem = {
    unknown: unknown,
    nu: nu,
    windows: constant(windows),
    ios: constant(ios),
    android: constant(android),
    linux: constant(linux),
    macos: constant(macos),
    solaris: constant(solaris),
    freebsd: constant(freebsd),
    chromeos: constant(chromeos)
  };

  var detect$1 = function detect$1(userAgent, userAgentDataOpt, mediaMatch) {
    var browsers = PlatformInfo.browsers();
    var oses = PlatformInfo.oses();
    var browser = userAgentDataOpt.bind(function (userAgentData) {
      return detectBrowser$1(browsers, userAgentData);
    }).orThunk(function () {
      return detectBrowser(browsers, userAgent);
    }).fold(Browser.unknown, Browser.nu);
    var os = detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
    var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };

  var PlatformDetection = {
    detect: detect$1
  };

  var mediaMatch = function mediaMatch(query) {
    return window.matchMedia(query).matches;
  };

  var platform = cached(function () {
    return PlatformDetection.detect(navigator.userAgent, Optional.from(navigator.userAgentData), mediaMatch);
  });

  var detect = function detect() {
    return platform();
  };

  var r = function r(left, top) {
    var translate = function translate(x, y) {
      return r(left + x, top + y);
    };

    return {
      left: left,
      top: top,
      translate: translate
    };
  };

  var SugarPosition = r;

  var get$1 = function get$1(_DOC) {
    var doc = _DOC !== undefined ? _DOC.dom : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return SugarPosition(x, y);
  };

  var get = function get(_win) {
    var win = _win === undefined ? window : _win;

    if (detect().browser.isFirefox()) {
      return Optional.none();
    } else {
      return Optional.from(win.visualViewport);
    }
  };

  var bounds = function bounds(x, y, width, height) {
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      right: x + width,
      bottom: y + height
    };
  };

  var getBounds = function getBounds(_win) {
    var win = _win === undefined ? window : _win;
    var doc = win.document;
    var scroll = get$1(SugarElement.fromDom(doc));
    return get(win).fold(function () {
      var html = win.document.documentElement;
      var width = html.clientWidth;
      var height = html.clientHeight;
      return bounds(scroll.left, scroll.top, width, height);
    }, function (visualViewport) {
      return bounds(Math.max(visualViewport.pageLeft, scroll.left), Math.max(visualViewport.pageTop, scroll.top), visualViewport.width, visualViewport.height);
    });
  };

  var bind = function bind(name, callback, _win) {
    return get(_win).map(function (visualViewport) {
      var handler = function handler(e) {
        return callback(fromRawEvent(e));
      };

      visualViewport.addEventListener(name, handler);
      return {
        unbind: function unbind() {
          return visualViewport.removeEventListener(name, handler);
        }
      };
    }).getOrThunk(function () {
      return {
        unbind: noop
      };
    });
  };

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global = tinymce.util.Tools.resolve('tinymce.Env');

  var fireFullscreenStateChanged = function fireFullscreenStateChanged(editor, state) {
    editor.dispatch('FullscreenStateChanged', {
      state: state
    });
    editor.dispatch('ResizeEditor');
  };

  var option = function option(name) {
    return function (editor) {
      return editor.options.get(name);
    };
  };

  var register$2 = function register$2(editor) {
    var registerOption = editor.options.register;
    registerOption('fullscreen_native', {
      processor: 'boolean',
      "default": false
    });
  };

  var getFullscreenNative = option('fullscreen_native');

  var getFullscreenRoot = function getFullscreenRoot(editor) {
    var elem = SugarElement.fromDom(editor.getElement());
    return getShadowRoot(elem).map(getShadowHost).getOrThunk(function () {
      return getBody(owner(elem));
    });
  };

  var getFullscreenElement = function getFullscreenElement(root) {
    if (root.fullscreenElement !== undefined) {
      return root.fullscreenElement;
    } else if (root.msFullscreenElement !== undefined) {
      return root.msFullscreenElement;
    } else if (root.webkitFullscreenElement !== undefined) {
      return root.webkitFullscreenElement;
    } else {
      return null;
    }
  };

  var getFullscreenchangeEventName = function getFullscreenchangeEventName() {
    if (document.fullscreenElement !== undefined) {
      return 'fullscreenchange';
    } else if (document.msFullscreenElement !== undefined) {
      return 'MSFullscreenChange';
    } else if (document.webkitFullscreenElement !== undefined) {
      return 'webkitfullscreenchange';
    } else {
      return 'fullscreenchange';
    }
  };

  var requestFullscreen = function requestFullscreen(sugarElem) {
    var elem = sugarElem.dom;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    }
  };

  var exitFullscreen = function exitFullscreen(sugarDoc) {
    var doc = sugarDoc.dom;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    }
  };

  var isFullscreenElement = function isFullscreenElement(elem) {
    return elem.dom === getFullscreenElement(owner(elem).dom);
  };

  var ancestors$1 = function ancestors$1(scope, predicate, isRoot) {
    return filter$1(parents(scope, isRoot), predicate);
  };

  var siblings$1 = function siblings$1(scope, predicate) {
    return filter$1(siblings$2(scope), predicate);
  };

  var all = function all(selector) {
    return all$1(selector);
  };

  var ancestors = function ancestors(scope, selector, isRoot) {
    return ancestors$1(scope, function (e) {
      return is(e, selector);
    }, isRoot);
  };

  var siblings = function siblings(scope, selector) {
    return siblings$1(scope, function (e) {
      return is(e, selector);
    });
  };

  var attr = 'data-ephox-mobile-fullscreen-style';
  var siblingStyles = 'display:none!important;';
  var ancestorPosition = 'position:absolute!important;';
  var ancestorStyles = 'top:0!important;left:0!important;margin:0!important;padding:0!important;width:100%!important;height:100%!important;overflow:visible!important;';
  var bgFallback = 'background-color:rgb(255,255,255)!important;';
  var isAndroid = global.os.isAndroid();

  var matchColor = function matchColor(editorBody) {
    var color = get$2(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };

  var clobberStyles = function clobberStyles(dom, container, editorBody) {
    var gatherSiblings = function gatherSiblings(element) {
      return siblings(element, '*:not(.tox-silver-sink)');
    };

    var clobber = function clobber(clobberStyle) {
      return function (element) {
        var styles = get$3(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();

        if (backup === clobberStyle) {
          return;
        } else {
          set(element, attr, backup);
          setAll(element, dom.parseStyle(clobberStyle));
        }
      };
    };

    var ancestors$1 = ancestors(container, '*');
    var siblings$1 = bind$3(ancestors$1, gatherSiblings);
    var bgColor = matchColor(editorBody);
    each$1(siblings$1, clobber(siblingStyles));
    each$1(ancestors$1, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };

  var restoreStyles = function restoreStyles(dom) {
    var clobberedEls = all('[' + attr + ']');
    each$1(clobberedEls, function (element) {
      var restore = get$3(element, attr);

      if (restore !== 'no-styles') {
        setAll(element, dom.parseStyle(restore));
      } else {
        remove(element, 'style');
      }

      remove(element, attr);
    });
  };

  var DOM = global$1.DOM;

  var getScrollPos = function getScrollPos() {
    return getBounds(window);
  };

  var setScrollPos = function setScrollPos(pos) {
    return window.scrollTo(pos.x, pos.y);
  };

  var viewportUpdate = get().fold(function () {
    return {
      bind: noop,
      unbind: noop
    };
  }, function (visualViewport) {
    var editorContainer = value();
    var resizeBinder = unbindable();
    var scrollBinder = unbindable();

    var refreshScroll = function refreshScroll() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    var refreshVisualViewport = function refreshVisualViewport() {
      window.requestAnimationFrame(function () {
        editorContainer.on(function (container) {
          return setAll(container, {
            top: visualViewport.offsetTop + 'px',
            left: visualViewport.offsetLeft + 'px',
            height: visualViewport.height + 'px',
            width: visualViewport.width + 'px'
          });
        });
      });
    };

    var update = first(function () {
      refreshScroll();
      refreshVisualViewport();
    }, 50);

    var bind$1 = function bind$1(element) {
      editorContainer.set(element);
      update.throttle();
      resizeBinder.set(bind('resize', update.throttle));
      scrollBinder.set(bind('scroll', update.throttle));
    };

    var unbind = function unbind() {
      editorContainer.on(function () {
        resizeBinder.clear();
        scrollBinder.clear();
      });
      editorContainer.clear();
    };

    return {
      bind: bind$1,
      unbind: unbind
    };
  });

  var toggleFullscreen = function toggleFullscreen(editor, fullscreenState) {
    var body = document.body;
    var documentElement = document.documentElement;
    var editorContainer = editor.getContainer();
    var editorContainerS = SugarElement.fromDom(editorContainer);
    var fullscreenRoot = getFullscreenRoot(editor);
    var fullscreenInfo = fullscreenState.get();
    var editorBody = SugarElement.fromDom(editor.getBody());
    var isTouch = global.deviceType.isTouch();
    var editorContainerStyle = editorContainer.style;
    var iframe = editor.iframeElement;
    var iframeStyle = iframe.style;

    var handleClasses = function handleClasses(handler) {
      handler(body, 'tox-fullscreen');
      handler(documentElement, 'tox-fullscreen');
      handler(editorContainer, 'tox-fullscreen');
      getShadowRoot(editorContainerS).map(function (root) {
        return getShadowHost(root).dom;
      }).each(function (host) {
        handler(host, 'tox-fullscreen');
        handler(host, 'tox-shadowhost');
      });
    };

    var cleanup = function cleanup() {
      if (isTouch) {
        restoreStyles(editor.dom);
      }

      handleClasses(DOM.removeClass);
      viewportUpdate.unbind();
      Optional.from(fullscreenState.get()).each(function (info) {
        return info.fullscreenChangeHandler.unbind();
      });
    };

    if (!fullscreenInfo) {
      var fullscreenChangeHandler = bind$1(owner(fullscreenRoot), getFullscreenchangeEventName(), function (_evt) {
        if (getFullscreenNative(editor)) {
          if (!isFullscreenElement(fullscreenRoot) && fullscreenState.get() !== null) {
            toggleFullscreen(editor, fullscreenState);
          }
        }
      });
      var newFullScreenInfo = {
        scrollPos: getScrollPos(),
        containerWidth: editorContainerStyle.width,
        containerHeight: editorContainerStyle.height,
        containerTop: editorContainerStyle.top,
        containerLeft: editorContainerStyle.left,
        iframeWidth: iframeStyle.width,
        iframeHeight: iframeStyle.height,
        fullscreenChangeHandler: fullscreenChangeHandler
      };

      if (isTouch) {
        clobberStyles(editor.dom, editorContainerS, editorBody);
      }

      iframeStyle.width = iframeStyle.height = '100%';
      editorContainerStyle.width = editorContainerStyle.height = '';
      handleClasses(DOM.addClass);
      viewportUpdate.bind(editorContainerS);
      editor.on('remove', cleanup);
      fullscreenState.set(newFullScreenInfo);

      if (getFullscreenNative(editor)) {
        requestFullscreen(fullscreenRoot);
      }

      fireFullscreenStateChanged(editor, true);
    } else {
      fullscreenInfo.fullscreenChangeHandler.unbind();

      if (getFullscreenNative(editor) && isFullscreenElement(fullscreenRoot)) {
        exitFullscreen(owner(fullscreenRoot));
      }

      iframeStyle.width = fullscreenInfo.iframeWidth;
      iframeStyle.height = fullscreenInfo.iframeHeight;
      editorContainerStyle.width = fullscreenInfo.containerWidth;
      editorContainerStyle.height = fullscreenInfo.containerHeight;
      editorContainerStyle.top = fullscreenInfo.containerTop;
      editorContainerStyle.left = fullscreenInfo.containerLeft;
      cleanup();
      setScrollPos(fullscreenInfo.scrollPos);
      fullscreenState.set(null);
      fireFullscreenStateChanged(editor, false);
      editor.off('remove', cleanup);
    }
  };

  var register$1 = function register$1(editor, fullscreenState) {
    editor.addCommand('mceFullScreen', function () {
      toggleFullscreen(editor, fullscreenState);
    });
  };

  var makeSetupHandler = function makeSetupHandler(editor, fullscreenState) {
    return function (api) {
      api.setActive(fullscreenState.get() !== null);

      var editorEventCallback = function editorEventCallback(e) {
        return api.setActive(e.state);
      };

      editor.on('FullscreenStateChanged', editorEventCallback);
      return function () {
        return editor.off('FullscreenStateChanged', editorEventCallback);
      };
    };
  };

  var register = function register(editor, fullscreenState) {
    var onAction = function onAction() {
      return editor.execCommand('mceFullScreen');
    };

    editor.ui.registry.addToggleMenuItem('fullscreen', {
      text: 'Fullscreen',
      icon: 'fullscreen',
      shortcut: 'Meta+Shift+F',
      onAction: onAction,
      onSetup: makeSetupHandler(editor, fullscreenState)
    });
    editor.ui.registry.addToggleButton('fullscreen', {
      tooltip: 'Fullscreen',
      icon: 'fullscreen',
      onAction: onAction,
      onSetup: makeSetupHandler(editor, fullscreenState)
    });
  };

  var Plugin = function Plugin() {
    global$2.add('fullscreen', function (editor) {
      var fullscreenState = Cell(null);

      if (editor.inline) {
        return get$5(fullscreenState);
      }

      register$2(editor);
      register$1(editor, fullscreenState);
      register(editor, fullscreenState);
      editor.addShortcut('Meta+Shift+F', '', 'mceFullScreen');
      return get$5(fullscreenState);
    });
  };

  Plugin();
})();