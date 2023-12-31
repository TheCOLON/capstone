"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

  var global$3 = tinymce.util.Tools.resolve('tinymce.PluginManager');

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

  var isString = isType$1('string');
  var isArray = isType$1('array');
  var isBoolean = isSimpleType('boolean');

  var isNullable = function isNullable(a) {
    return a === null || a === undefined;
  };

  var isNonNullable = function isNonNullable(a) {
    return !isNullable(a);
  };

  var isNumber = isSimpleType('number');

  var noop = function noop() {};

  var constant = function constant(value) {
    return function () {
      return value;
    };
  };

  var always = constant(true);
  var punctuationStr = "[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]";
  var punctuation$1 = constant(punctuationStr);

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
  var punctuation = punctuation$1;
  var global$2 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var nativeSlice = Array.prototype.slice;
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

  var each = function each(xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i);
    }
  };

  var eachr = function eachr(xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i);
    }
  };

  var groupBy = function groupBy(xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];

      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];

        var _type = f(x);

        if (_type !== wasType) {
          r.push(group);
          group = [];
        }

        wasType = _type;
        group.push(x);
      }

      if (group.length !== 0) {
        r.push(group);
      }

      return r;
    }
  };

  var foldl = function foldl(xs, f, acc) {
    each(xs, function (x, i) {
      acc = f(acc, x, i);
    });
    return acc;
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

  var bind = function bind(xs, f) {
    return flatten(map(xs, f));
  };

  var sort = function sort(xs, comparator) {
    var copy = nativeSlice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };

  var hasOwnProperty = Object.hasOwnProperty;

  var has = function has(obj, key) {
    return hasOwnProperty.call(obj, key);
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

  var isText$1 = isType(TEXT);

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

  var bypassSelector = function bypassSelector(dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
  };

  var all = function all(selector, scope) {
    var base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), SugarElement.fromDom);
  };

  var parent = function parent(element) {
    return Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
  };

  var children = function children(element) {
    return map(element.dom.childNodes, SugarElement.fromDom);
  };

  var spot = function spot(element, offset) {
    return {
      element: element,
      offset: offset
    };
  };

  var leaf = function leaf(element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };

  var before = function before(marker, element) {
    var parent$1 = parent(marker);
    parent$1.each(function (v) {
      v.dom.insertBefore(element.dom, marker.dom);
    });
  };

  var append = function append(parent, element) {
    parent.dom.appendChild(element.dom);
  };

  var wrap = function wrap(element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };

  var NodeValue = function NodeValue(is, name) {
    var get = function get(element) {
      if (!is(element)) {
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      }

      return getOption(element).getOr('');
    };

    var getOption = function getOption(element) {
      return is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
    };

    var set = function set(element, value) {
      if (!is(element)) {
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      }

      element.dom.nodeValue = value;
    };

    return {
      get: get,
      getOption: getOption,
      set: set
    };
  };

  var api = NodeValue(isText$1, 'text');

  var get$1 = function get$1(element) {
    return api.get(element);
  };

  var compareDocumentPosition = function compareDocumentPosition(a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };

  var documentPositionPreceding = function documentPositionPreceding(a, b) {
    return compareDocumentPosition(a, b, Node.DOCUMENT_POSITION_PRECEDING);
  };

  var descendants = function descendants(scope, selector) {
    return all(selector, scope);
  };

  var global = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

  var isSimpleBoundary = function isSimpleBoundary(dom, node) {
    return dom.isBlock(node) || has(dom.schema.getVoidElements(), node.nodeName);
  };

  var isContentEditableFalse = function isContentEditableFalse(dom, node) {
    return dom.getContentEditable(node) === 'false';
  };

  var isContentEditableTrueInCef = function isContentEditableTrueInCef(dom, node) {
    return dom.getContentEditable(node) === 'true' && dom.getContentEditableParent(node.parentNode) === 'false';
  };

  var isHidden = function isHidden(dom, node) {
    return !dom.isBlock(node) && has(dom.schema.getWhitespaceElements(), node.nodeName);
  };

  var isBoundary = function isBoundary(dom, node) {
    return isSimpleBoundary(dom, node) || isContentEditableFalse(dom, node) || isHidden(dom, node) || isContentEditableTrueInCef(dom, node);
  };

  var isText = function isText(node) {
    return node.nodeType === 3;
  };

  var nuSection = function nuSection() {
    return {
      sOffset: 0,
      fOffset: 0,
      elements: []
    };
  };

  var toLeaf = function toLeaf(node, offset) {
    return leaf(SugarElement.fromDom(node), offset);
  };

  var walk = function walk(dom, walkerFn, startNode, callbacks, endNode) {
    var skipStart = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var next = skipStart ? walkerFn(false) : startNode;

    while (next) {
      var isCefNode = isContentEditableFalse(dom, next);

      if (isCefNode || isHidden(dom, next)) {
        var stopWalking = isCefNode ? callbacks.cef(next) : callbacks.boundary(next);

        if (stopWalking) {
          break;
        } else {
          next = walkerFn(true);
          continue;
        }
      } else if (isSimpleBoundary(dom, next)) {
        if (callbacks.boundary(next)) {
          break;
        }
      } else if (isText(next)) {
        callbacks.text(next);
      }

      if (next === endNode) {
        break;
      } else {
        next = walkerFn(false);
      }
    }
  };

  var collectTextToBoundary = function collectTextToBoundary(dom, section, node, rootNode, forwards) {
    if (isBoundary(dom, node)) {
      return;
    }

    var rootBlock = dom.getParent(rootNode, dom.isBlock);
    var walker = new global(node, rootBlock);
    var walkerFn = forwards ? walker.next.bind(walker) : walker.prev.bind(walker);
    walk(dom, walkerFn, node, {
      boundary: always,
      cef: always,
      text: function text(next) {
        if (forwards) {
          section.fOffset += next.length;
        } else {
          section.sOffset += next.length;
        }

        section.elements.push(SugarElement.fromDom(next));
      }
    });
  };

  var collect = function collect(dom, rootNode, startNode, endNode, callbacks) {
    var skipStart = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var walker = new global(startNode, rootNode);
    var sections = [];
    var current = nuSection();
    collectTextToBoundary(dom, current, startNode, rootNode, false);

    var finishSection = function finishSection() {
      if (current.elements.length > 0) {
        sections.push(current);
        current = nuSection();
      }

      return false;
    };

    walk(dom, walker.next.bind(walker), startNode, {
      boundary: finishSection,
      cef: function cef(node) {
        finishSection();

        if (callbacks) {
          sections.push.apply(sections, _toConsumableArray(callbacks.cef(node)));
        }

        return false;
      },
      text: function text(next) {
        current.elements.push(SugarElement.fromDom(next));

        if (callbacks) {
          callbacks.text(next, current);
        }
      }
    }, endNode, skipStart);

    if (endNode) {
      collectTextToBoundary(dom, current, endNode, rootNode, true);
    }

    finishSection();
    return sections;
  };

  var collectRangeSections = function collectRangeSections(dom, rng) {
    var start = toLeaf(rng.startContainer, rng.startOffset);
    var startNode = start.element.dom;
    var end = toLeaf(rng.endContainer, rng.endOffset);
    var endNode = end.element.dom;
    return collect(dom, rng.commonAncestorContainer, startNode, endNode, {
      text: function text(node, section) {
        if (node === endNode) {
          section.fOffset += node.length - end.offset;
        } else if (node === startNode) {
          section.sOffset += start.offset;
        }
      },
      cef: function cef(node) {
        var sections = bind(descendants(SugarElement.fromDom(node), '*[contenteditable=true]'), function (e) {
          var ceTrueNode = e.dom;
          return collect(dom, ceTrueNode, ceTrueNode);
        });
        return sort(sections, function (a, b) {
          return documentPositionPreceding(a.elements[0].dom, b.elements[0].dom) ? 1 : -1;
        });
      }
    }, false);
  };

  var fromRng = function fromRng(dom, rng) {
    return rng.collapsed ? [] : collectRangeSections(dom, rng);
  };

  var fromNode = function fromNode(dom, node) {
    var rng = dom.createRng();
    rng.selectNode(node);
    return fromRng(dom, rng);
  };

  var fromNodes = function fromNodes(dom, nodes) {
    return bind(nodes, function (node) {
      return fromNode(dom, node);
    });
  };

  var find$2 = function find$2(text, pattern) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var finish = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : text.length;
    var regex = pattern.regex;
    regex.lastIndex = start;
    var results = [];
    var match;

    while (match = regex.exec(text)) {
      var matchedText = match[pattern.matchIndex];
      var matchStart = match.index + match[0].indexOf(matchedText);
      var matchFinish = matchStart + matchedText.length;

      if (matchFinish > finish) {
        break;
      }

      results.push({
        start: matchStart,
        finish: matchFinish
      });
      regex.lastIndex = matchFinish;
    }

    return results;
  };

  var extract = function extract(elements, matches) {
    var nodePositions = foldl(elements, function (acc, element) {
      var content = get$1(element);
      var start = acc.last;
      var finish = start + content.length;
      var positions = bind(matches, function (match, matchIdx) {
        if (match.start < finish && match.finish > start) {
          return [{
            element: element,
            start: Math.max(start, match.start) - start,
            finish: Math.min(finish, match.finish) - start,
            matchId: matchIdx
          }];
        } else {
          return [];
        }
      });
      return {
        results: acc.results.concat(positions),
        last: finish
      };
    }, {
      results: [],
      last: 0
    }).results;
    return groupBy(nodePositions, function (position) {
      return position.matchId;
    });
  };

  var find$1 = function find$1(pattern, sections) {
    return bind(sections, function (section) {
      var elements = section.elements;
      var content = map(elements, get$1).join('');
      var positions = find$2(content, pattern, section.sOffset, content.length - section.fOffset);
      return extract(elements, positions);
    });
  };

  var mark = function mark(matches, replacementNode) {
    eachr(matches, function (match, idx) {
      eachr(match, function (pos) {
        var wrapper = SugarElement.fromDom(replacementNode.cloneNode(false));
        set(wrapper, 'data-mce-index', idx);
        var textNode = pos.element.dom;

        if (textNode.length === pos.finish && pos.start === 0) {
          wrap(pos.element, wrapper);
        } else {
          if (textNode.length !== pos.finish) {
            textNode.splitText(pos.finish);
          }

          var matchNode = textNode.splitText(pos.start);
          wrap(SugarElement.fromDom(matchNode), wrapper);
        }
      });
    });
  };

  var findAndMark = function findAndMark(dom, pattern, node, replacementNode) {
    var textSections = fromNode(dom, node);
    var matches = find$1(pattern, textSections);
    mark(matches, replacementNode);
    return matches.length;
  };

  var findAndMarkInSelection = function findAndMarkInSelection(dom, pattern, selection, replacementNode) {
    var bookmark = selection.getBookmark();
    var nodes = dom.select('td[data-mce-selected],th[data-mce-selected]');
    var textSections = nodes.length > 0 ? fromNodes(dom, nodes) : fromRng(dom, selection.getRng());
    var matches = find$1(pattern, textSections);
    mark(matches, replacementNode);
    selection.moveToBookmark(bookmark);
    return matches.length;
  };

  var getElmIndex = function getElmIndex(elm) {
    var value = elm.getAttribute('data-mce-index');

    if (typeof value === 'number') {
      return '' + value;
    }

    return value;
  };

  var markAllMatches = function markAllMatches(editor, currentSearchState, pattern, inSelection) {
    var marker = editor.dom.create('span', {
      'data-mce-bogus': 1
    });
    marker.className = 'mce-match-marker';
    var node = editor.getBody();
    done(editor, currentSearchState, false);

    if (inSelection) {
      return findAndMarkInSelection(editor.dom, pattern, editor.selection, marker);
    } else {
      return findAndMark(editor.dom, pattern, node, marker);
    }
  };

  var unwrap = function unwrap(node) {
    var parentNode = node.parentNode;

    if (node.firstChild) {
      parentNode.insertBefore(node.firstChild, node);
    }

    node.parentNode.removeChild(node);
  };

  var findSpansByIndex = function findSpansByIndex(editor, index) {
    var spans = [];
    var nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));

    if (nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);

        if (nodeIndex === null || !nodeIndex.length) {
          continue;
        }

        if (nodeIndex === index.toString()) {
          spans.push(nodes[i]);
        }
      }
    }

    return spans;
  };

  var moveSelection = function moveSelection(editor, currentSearchState, forward) {
    var searchState = currentSearchState.get();
    var testIndex = searchState.index;
    var dom = editor.dom;
    forward = forward !== false;

    if (forward) {
      if (testIndex + 1 === searchState.count) {
        testIndex = 0;
      } else {
        testIndex++;
      }
    } else {
      if (testIndex - 1 === -1) {
        testIndex = searchState.count - 1;
      } else {
        testIndex--;
      }
    }

    dom.removeClass(findSpansByIndex(editor, searchState.index), 'mce-match-marker-selected');
    var spans = findSpansByIndex(editor, testIndex);

    if (spans.length) {
      dom.addClass(findSpansByIndex(editor, testIndex), 'mce-match-marker-selected');
      editor.selection.scrollIntoView(spans[0]);
      return testIndex;
    }

    return -1;
  };

  var removeNode = function removeNode(dom, node) {
    var parent = node.parentNode;
    dom.remove(node);

    if (dom.isEmpty(parent)) {
      dom.remove(parent);
    }
  };

  var escapeSearchText = function escapeSearchText(text, wholeWord) {
    var escapedText = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&').replace(/\s/g, "[^\\S\\r\\n\\uFEFF]");
    var wordRegex = '(' + escapedText + ')';
    return wholeWord ? "(?:^|\\s|".concat(punctuation(), ")") + wordRegex + "(?=$|\\s|".concat(punctuation(), ")") : wordRegex;
  };

  var find = function find(editor, currentSearchState, text, matchCase, wholeWord, inSelection) {
    var selection = editor.selection;
    var escapedText = escapeSearchText(text, wholeWord);
    var isForwardSelection = selection.isForward();
    var pattern = {
      regex: new RegExp(escapedText, matchCase ? 'g' : 'gi'),
      matchIndex: 1
    };
    var count = markAllMatches(editor, currentSearchState, pattern, inSelection);

    if (global$2.browser.isSafari()) {
      selection.setRng(selection.getRng(), isForwardSelection);
    }

    if (count) {
      var newIndex = moveSelection(editor, currentSearchState, true);
      currentSearchState.set({
        index: newIndex,
        count: count,
        text: text,
        matchCase: matchCase,
        wholeWord: wholeWord,
        inSelection: inSelection
      });
    }

    return count;
  };

  var next = function next(editor, currentSearchState) {
    var index = moveSelection(editor, currentSearchState, true);
    currentSearchState.set(_objectSpread({}, currentSearchState.get(), {
      index: index
    }));
  };

  var prev = function prev(editor, currentSearchState) {
    var index = moveSelection(editor, currentSearchState, false);
    currentSearchState.set(_objectSpread({}, currentSearchState.get(), {
      index: index
    }));
  };

  var isMatchSpan = function isMatchSpan(node) {
    var matchIndex = getElmIndex(node);
    return matchIndex !== null && matchIndex.length > 0;
  };

  var replace = function replace(editor, currentSearchState, text, forward, all) {
    var searchState = currentSearchState.get();
    var currentIndex = searchState.index;
    var currentMatchIndex,
        nextIndex = currentIndex;
    forward = forward !== false;
    var node = editor.getBody();
    var nodes = global$1.grep(global$1.toArray(node.getElementsByTagName('span')), isMatchSpan);

    for (var i = 0; i < nodes.length; i++) {
      var nodeIndex = getElmIndex(nodes[i]);
      var matchIndex = currentMatchIndex = parseInt(nodeIndex, 10);

      if (all || matchIndex === searchState.index) {
        if (text.length) {
          nodes[i].firstChild.nodeValue = text;
          unwrap(nodes[i]);
        } else {
          removeNode(editor.dom, nodes[i]);
        }

        while (nodes[++i]) {
          matchIndex = parseInt(getElmIndex(nodes[i]), 10);

          if (matchIndex === currentMatchIndex) {
            removeNode(editor.dom, nodes[i]);
          } else {
            i--;
            break;
          }
        }

        if (forward) {
          nextIndex--;
        }
      } else if (currentMatchIndex > currentIndex) {
        nodes[i].setAttribute('data-mce-index', String(currentMatchIndex - 1));
      }
    }

    currentSearchState.set(_objectSpread({}, searchState, {
      count: all ? 0 : searchState.count - 1,
      index: nextIndex
    }));

    if (forward) {
      next(editor, currentSearchState);
    } else {
      prev(editor, currentSearchState);
    }

    return !all && currentSearchState.get().count > 0;
  };

  var done = function done(editor, currentSearchState, keepEditorSelection) {
    var startContainer, endContainer;
    var searchState = currentSearchState.get();
    var nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));

    for (var i = 0; i < nodes.length; i++) {
      var nodeIndex = getElmIndex(nodes[i]);

      if (nodeIndex !== null && nodeIndex.length) {
        if (nodeIndex === searchState.index.toString()) {
          if (!startContainer) {
            startContainer = nodes[i].firstChild;
          }

          endContainer = nodes[i].firstChild;
        }

        unwrap(nodes[i]);
      }
    }

    currentSearchState.set(_objectSpread({}, searchState, {
      index: -1,
      count: 0,
      text: ''
    }));

    if (startContainer && endContainer) {
      var rng = editor.dom.createRng();
      rng.setStart(startContainer, 0);
      rng.setEnd(endContainer, endContainer.data.length);

      if (keepEditorSelection !== false) {
        editor.selection.setRng(rng);
      }

      return rng;
    }
  };

  var hasNext = function hasNext(editor, currentSearchState) {
    return currentSearchState.get().count > 1;
  };

  var hasPrev = function hasPrev(editor, currentSearchState) {
    return currentSearchState.get().count > 1;
  };

  var get = function get(editor, currentState) {
    var done$1 = function done$1(keepEditorSelection) {
      return done(editor, currentState, keepEditorSelection);
    };

    var find$1 = function find$1(text, matchCase, wholeWord) {
      var inSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return find(editor, currentState, text, matchCase, wholeWord, inSelection);
    };

    var next$1 = function next$1() {
      return next(editor, currentState);
    };

    var prev$1 = function prev$1() {
      return prev(editor, currentState);
    };

    var replace$1 = function replace$1(text, forward, all) {
      return replace(editor, currentState, text, forward, all);
    };

    return {
      done: done$1,
      find: find$1,
      next: next$1,
      prev: prev$1,
      replace: replace$1
    };
  };

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

  var value = function value() {
    var subject = singleton(noop);

    var on = function on(f) {
      return subject.get().each(f);
    };

    return _objectSpread({}, subject, {
      on: on
    });
  };

  var open = function open(editor, currentSearchState) {
    var dialogApi = value();
    editor.undoManager.add();
    var selectedText = global$1.trim(editor.selection.getContent({
      format: 'text'
    }));

    var updateButtonStates = function updateButtonStates(api) {
      api.setEnabled('next', hasNext(editor, currentSearchState));
      api.setEnabled('prev', hasPrev(editor, currentSearchState));
    };

    var updateSearchState = function updateSearchState(api) {
      var data = api.getData();
      var current = currentSearchState.get();
      currentSearchState.set(_objectSpread({}, current, {
        matchCase: data.matchcase,
        wholeWord: data.wholewords,
        inSelection: data.inselection
      }));
    };

    var disableAll = function disableAll(api, disable) {
      var buttons = ['replace', 'replaceall', 'prev', 'next'];

      var toggle = function toggle(name) {
        return api.setEnabled(name, !disable);
      };

      each(buttons, toggle);
    };

    var notFoundAlert = function notFoundAlert(api) {
      editor.windowManager.alert('Could not find the specified string.', function () {
        api.focus('findtext');
      });
    };

    var focusButtonIfRequired = function focusButtonIfRequired(api, name) {
      if (global$2.browser.isSafari() && global$2.deviceType.isTouch() && (name === 'find' || name === 'replace' || name === 'replaceall')) {
        api.focus(name);
      }
    };

    var reset = function reset(api) {
      done(editor, currentSearchState, false);
      disableAll(api, true);
      updateButtonStates(api);
    };

    var doFind = function doFind(api) {
      var data = api.getData();
      var last = currentSearchState.get();

      if (!data.findtext.length) {
        reset(api);
        return;
      }

      if (last.text === data.findtext && last.matchCase === data.matchcase && last.wholeWord === data.wholewords) {
        next(editor, currentSearchState);
      } else {
        var count = find(editor, currentSearchState, data.findtext, data.matchcase, data.wholewords, data.inselection);

        if (count <= 0) {
          notFoundAlert(api);
        }

        disableAll(api, count === 0);
      }

      updateButtonStates(api);
    };

    var initialState = currentSearchState.get();
    var initialData = {
      findtext: selectedText,
      replacetext: '',
      wholewords: initialState.wholeWord,
      matchcase: initialState.matchCase,
      inselection: initialState.inSelection
    };
    var spec = {
      title: 'Find and Replace',
      size: 'normal',
      body: {
        type: 'panel',
        items: [{
          type: 'bar',
          items: [{
            type: 'input',
            name: 'findtext',
            placeholder: 'Find',
            maximized: true,
            inputMode: 'search'
          }, {
            type: 'button',
            name: 'prev',
            text: 'Previous',
            icon: 'action-prev',
            enabled: false,
            borderless: true
          }, {
            type: 'button',
            name: 'next',
            text: 'Next',
            icon: 'action-next',
            enabled: false,
            borderless: true
          }]
        }, {
          type: 'input',
          name: 'replacetext',
          placeholder: 'Replace with',
          inputMode: 'search'
        }]
      },
      buttons: [{
        type: 'menu',
        name: 'options',
        icon: 'preferences',
        tooltip: 'Preferences',
        align: 'start',
        items: [{
          type: 'togglemenuitem',
          name: 'matchcase',
          text: 'Match case'
        }, {
          type: 'togglemenuitem',
          name: 'wholewords',
          text: 'Find whole words only'
        }, {
          type: 'togglemenuitem',
          name: 'inselection',
          text: 'Find in selection'
        }]
      }, {
        type: 'custom',
        name: 'find',
        text: 'Find',
        primary: true
      }, {
        type: 'custom',
        name: 'replace',
        text: 'Replace',
        enabled: false
      }, {
        type: 'custom',
        name: 'replaceall',
        text: 'Replace all',
        enabled: false
      }],
      initialData: initialData,
      onChange: function onChange(api, details) {
        if (details.name === 'findtext' && currentSearchState.get().count > 0) {
          reset(api);
        }
      },
      onAction: function onAction(api, details) {
        var data = api.getData();

        switch (details.name) {
          case 'find':
            doFind(api);
            break;

          case 'replace':
            if (!replace(editor, currentSearchState, data.replacetext)) {
              reset(api);
            } else {
              updateButtonStates(api);
            }

            break;

          case 'replaceall':
            replace(editor, currentSearchState, data.replacetext, true, true);
            reset(api);
            break;

          case 'prev':
            prev(editor, currentSearchState);
            updateButtonStates(api);
            break;

          case 'next':
            next(editor, currentSearchState);
            updateButtonStates(api);
            break;

          case 'matchcase':
          case 'wholewords':
          case 'inselection':
            updateSearchState(api);
            reset(api);
            break;
        }

        focusButtonIfRequired(api, details.name);
      },
      onSubmit: function onSubmit(api) {
        doFind(api);
        focusButtonIfRequired(api, 'find');
      },
      onClose: function onClose() {
        editor.focus();
        done(editor, currentSearchState);
        editor.undoManager.add();
      }
    };
    dialogApi.set(editor.windowManager.open(spec, {
      inline: 'toolbar'
    }));
  };

  var register$1 = function register$1(editor, currentSearchState) {
    editor.addCommand('SearchReplace', function () {
      open(editor, currentSearchState);
    });
  };

  var showDialog = function showDialog(editor, currentSearchState) {
    return function () {
      open(editor, currentSearchState);
    };
  };

  var register = function register(editor, currentSearchState) {
    editor.ui.registry.addMenuItem('searchreplace', {
      text: 'Find and replace...',
      shortcut: 'Meta+F',
      onAction: showDialog(editor, currentSearchState),
      icon: 'search'
    });
    editor.ui.registry.addButton('searchreplace', {
      tooltip: 'Find and replace',
      onAction: showDialog(editor, currentSearchState),
      icon: 'search'
    });
    editor.shortcuts.add('Meta+F', '', showDialog(editor, currentSearchState));
  };

  var Plugin = function Plugin() {
    global$3.add('searchreplace', function (editor) {
      var currentSearchState = Cell({
        index: -1,
        count: 0,
        text: '',
        matchCase: false,
        wholeWord: false,
        inSelection: false
      });
      register$1(editor, currentSearchState);
      register(editor, currentSearchState);
      return get(editor, currentSearchState);
    });
  };

  Plugin();
})();