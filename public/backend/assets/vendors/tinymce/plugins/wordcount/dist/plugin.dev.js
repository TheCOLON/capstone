"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * TinyMCE version 6.1.2 (2022-07-29)
 */
(function () {
  'use strict';

  var global$2 = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var eq = function eq(t) {
    return function (a) {
      return t === a;
    };
  };

  var isNull = eq(null);

  var identity = function identity(x) {
    return x;
  };

  var zeroWidth = "\uFEFF";

  var removeZwsp$1 = function removeZwsp$1(s) {
    return s.replace(/\uFEFF/g, '');
  };

  var map = function map(xs, f) {
    var len = xs.length;
    var r = new Array(len);

    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i);
    }

    return r;
  };

  var punctuationStr = "[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]";
  var regExps = {
    aletter: "[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F3\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1A00-\u1A16\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BC0-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u303B\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790\uA791\uA7A0-\uA7A9\uA7FA-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]",
    midnumlet: "[-'\\.\u2018\u2019\u2024\uFE52\uFF07\uFF0E]",
    midletter: "[:\xB7\xB7\u05F4\u2027\uFE13\uFE55\uFF1A]",
    midnum: "[\xB1+*/,;;\u0589\u060C\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]",
    numeric: "[0-9\u0660-\u0669\u066B\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9]",
    cr: '\\r',
    lf: '\\n',
    newline: "[\x0B\f\x85\u2028\u2029]",
    extend: "[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2\u1DC0-\u1DE6\u1DFC-\u1DFF\u200C\u200D\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26\uFF9E\uFF9F]",
    format: "[\xAD\u0600-\u0603\u06DD\u070F\u17B4\u17B5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]",
    katakana: "[\u3031-\u3035\u309B\u309C\u30A0-\u30FA\u30FC-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF9D]",
    extendnumlet: "[=_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F\u2200-\u22FF<>]",
    punctuation: punctuationStr
  };
  var characterIndices = {
    ALETTER: 0,
    MIDNUMLET: 1,
    MIDLETTER: 2,
    MIDNUM: 3,
    NUMERIC: 4,
    CR: 5,
    LF: 6,
    NEWLINE: 7,
    EXTEND: 8,
    FORMAT: 9,
    KATAKANA: 10,
    EXTENDNUMLET: 11,
    AT: 12,
    OTHER: 13
  };
  var SETS$1 = [new RegExp(regExps.aletter), new RegExp(regExps.midnumlet), new RegExp(regExps.midletter), new RegExp(regExps.midnum), new RegExp(regExps.numeric), new RegExp(regExps.cr), new RegExp(regExps.lf), new RegExp(regExps.newline), new RegExp(regExps.extend), new RegExp(regExps.format), new RegExp(regExps.katakana), new RegExp(regExps.extendnumlet), new RegExp('@')];
  var EMPTY_STRING$1 = '';
  var PUNCTUATION$1 = new RegExp('^' + regExps.punctuation + '$');
  var WHITESPACE$1 = /^\s+$/;
  var SETS = SETS$1;
  var OTHER = characterIndices.OTHER;

  var getType = function getType(_char) {
    var type = OTHER;
    var setsLength = SETS.length;

    for (var j = 0; j < setsLength; ++j) {
      var set = SETS[j];

      if (set && set.test(_char)) {
        type = j;
        break;
      }
    }

    return type;
  };

  var memoize = function memoize(func) {
    var cache = {};
    return function (_char2) {
      if (cache[_char2]) {
        return cache[_char2];
      } else {
        var result = func(_char2);
        cache[_char2] = result;
        return result;
      }
    };
  };

  var classify = function classify(characters) {
    var memoized = memoize(getType);
    return map(characters, memoized);
  };

  var isWordBoundary = function isWordBoundary(map, index) {
    var type = map[index];
    var nextType = map[index + 1];

    if (index < 0 || index > map.length - 1 && index !== 0) {
      return false;
    }

    if (type === characterIndices.ALETTER && nextType === characterIndices.ALETTER) {
      return false;
    }

    var nextNextType = map[index + 2];

    if (type === characterIndices.ALETTER && (nextType === characterIndices.MIDLETTER || nextType === characterIndices.MIDNUMLET || nextType === characterIndices.AT) && nextNextType === characterIndices.ALETTER) {
      return false;
    }

    var prevType = map[index - 1];

    if ((type === characterIndices.MIDLETTER || type === characterIndices.MIDNUMLET || nextType === characterIndices.AT) && nextType === characterIndices.ALETTER && prevType === characterIndices.ALETTER) {
      return false;
    }

    if ((type === characterIndices.NUMERIC || type === characterIndices.ALETTER) && (nextType === characterIndices.NUMERIC || nextType === characterIndices.ALETTER)) {
      return false;
    }

    if ((type === characterIndices.MIDNUM || type === characterIndices.MIDNUMLET) && nextType === characterIndices.NUMERIC && prevType === characterIndices.NUMERIC) {
      return false;
    }

    if (type === characterIndices.NUMERIC && (nextType === characterIndices.MIDNUM || nextType === characterIndices.MIDNUMLET) && nextNextType === characterIndices.NUMERIC) {
      return false;
    }

    if (type === characterIndices.EXTEND || type === characterIndices.FORMAT || prevType === characterIndices.EXTEND || prevType === characterIndices.FORMAT || nextType === characterIndices.EXTEND || nextType === characterIndices.FORMAT) {
      return false;
    }

    if (type === characterIndices.CR && nextType === characterIndices.LF) {
      return false;
    }

    if (type === characterIndices.NEWLINE || type === characterIndices.CR || type === characterIndices.LF) {
      return true;
    }

    if (nextType === characterIndices.NEWLINE || nextType === characterIndices.CR || nextType === characterIndices.LF) {
      return true;
    }

    if (type === characterIndices.KATAKANA && nextType === characterIndices.KATAKANA) {
      return false;
    }

    if (nextType === characterIndices.EXTENDNUMLET && (type === characterIndices.ALETTER || type === characterIndices.NUMERIC || type === characterIndices.KATAKANA || type === characterIndices.EXTENDNUMLET)) {
      return false;
    }

    if (type === characterIndices.EXTENDNUMLET && (nextType === characterIndices.ALETTER || nextType === characterIndices.NUMERIC || nextType === characterIndices.KATAKANA)) {
      return false;
    }

    if (type === characterIndices.AT) {
      return false;
    }

    return true;
  };

  var EMPTY_STRING = EMPTY_STRING$1;
  var WHITESPACE = WHITESPACE$1;
  var PUNCTUATION = PUNCTUATION$1;

  var isProtocol = function isProtocol(str) {
    return str === 'http' || str === 'https';
  };

  var findWordEnd = function findWordEnd(characters, startIndex) {
    var i;

    for (i = startIndex; i < characters.length; i++) {
      if (WHITESPACE.test(characters[i])) {
        break;
      }
    }

    return i;
  };

  var findUrlEnd = function findUrlEnd(characters, startIndex) {
    var endIndex = findWordEnd(characters, startIndex + 1);
    var peakedWord = characters.slice(startIndex + 1, endIndex).join(EMPTY_STRING);
    return peakedWord.substr(0, 3) === '://' ? endIndex : startIndex;
  };

  var findWords = function findWords(chars, sChars, characterMap, options) {
    var words = [];
    var word = [];

    for (var i = 0; i < characterMap.length; ++i) {
      word.push(chars[i]);

      if (isWordBoundary(characterMap, i)) {
        var ch = sChars[i];

        if ((options.includeWhitespace || !WHITESPACE.test(ch)) && (options.includePunctuation || !PUNCTUATION.test(ch))) {
          var startOfWord = i - word.length + 1;
          var endOfWord = i + 1;
          var str = sChars.slice(startOfWord, endOfWord).join(EMPTY_STRING);

          if (isProtocol(str)) {
            var endOfUrl = findUrlEnd(sChars, i);
            var url = chars.slice(endOfWord, endOfUrl);
            Array.prototype.push.apply(word, url);
            i = endOfUrl;
          }

          words.push(word);
        }

        word = [];
      }
    }

    return words;
  };

  var getDefaultOptions = function getDefaultOptions() {
    return {
      includeWhitespace: false,
      includePunctuation: false
    };
  };

  var getWords$1 = function getWords$1(chars, extract, options) {
    options = _objectSpread({}, getDefaultOptions(), {}, options);
    var filteredChars = [];
    var extractedChars = [];

    for (var i = 0; i < chars.length; i++) {
      var ch = extract(chars[i]);

      if (ch !== zeroWidth) {
        filteredChars.push(chars[i]);
        extractedChars.push(ch);
      }
    }

    var characterMap = classify(extractedChars);
    return findWords(filteredChars, extractedChars, characterMap, options);
  };

  var getWords = getWords$1;
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

  var getText = function getText(node, schema) {
    var blockElements = schema.getBlockElements();
    var voidElements = schema.getVoidElements();

    var isNewline = function isNewline(node) {
      return blockElements[node.nodeName] || voidElements[node.nodeName];
    };

    var textBlocks = [];
    var txt = '';
    var treeWalker = new global$1(node, node);

    while (node = treeWalker.next()) {
      if (node.nodeType === 3) {
        txt += removeZwsp$1(node.data);
      } else if (isNewline(node) && txt.length) {
        textBlocks.push(txt);
        txt = '';
      }
    }

    if (txt.length) {
      textBlocks.push(txt);
    }

    return textBlocks;
  };

  var removeZwsp = function removeZwsp(text) {
    return text.replace(/\u200B/g, '');
  };

  var strLen = function strLen(str) {
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
  };

  var countWords = function countWords(node, schema) {
    var text = removeZwsp(getText(node, schema).join('\n'));
    return getWords(text.split(''), identity).length;
  };

  var countCharacters = function countCharacters(node, schema) {
    var text = getText(node, schema).join('');
    return strLen(text);
  };

  var countCharactersWithoutSpaces = function countCharactersWithoutSpaces(node, schema) {
    var text = getText(node, schema).join('').replace(/\s/g, '');
    return strLen(text);
  };

  var createBodyCounter = function createBodyCounter(editor, count) {
    return function () {
      return count(editor.getBody(), editor.schema);
    };
  };

  var createSelectionCounter = function createSelectionCounter(editor, count) {
    return function () {
      return count(editor.selection.getRng().cloneContents(), editor.schema);
    };
  };

  var createBodyWordCounter = function createBodyWordCounter(editor) {
    return createBodyCounter(editor, countWords);
  };

  var get = function get(editor) {
    return {
      body: {
        getWordCount: createBodyWordCounter(editor),
        getCharacterCount: createBodyCounter(editor, countCharacters),
        getCharacterCountWithoutSpaces: createBodyCounter(editor, countCharactersWithoutSpaces)
      },
      selection: {
        getWordCount: createSelectionCounter(editor, countWords),
        getCharacterCount: createSelectionCounter(editor, countCharacters),
        getCharacterCountWithoutSpaces: createSelectionCounter(editor, countCharactersWithoutSpaces)
      },
      getCount: createBodyWordCounter(editor)
    };
  };

  var open = function open(editor, api) {
    editor.windowManager.open({
      title: 'Word Count',
      body: {
        type: 'panel',
        items: [{
          type: 'table',
          header: ['Count', 'Document', 'Selection'],
          cells: [['Words', String(api.body.getWordCount()), String(api.selection.getWordCount())], ['Characters (no spaces)', String(api.body.getCharacterCountWithoutSpaces()), String(api.selection.getCharacterCountWithoutSpaces())], ['Characters', String(api.body.getCharacterCount()), String(api.selection.getCharacterCount())]]
        }]
      },
      buttons: [{
        type: 'cancel',
        name: 'close',
        text: 'Close',
        primary: true
      }]
    });
  };

  var register$1 = function register$1(editor, api) {
    editor.addCommand('mceWordCount', function () {
      return open(editor, api);
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
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
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

  var global = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var fireWordCountUpdate = function fireWordCountUpdate(editor, api) {
    editor.dispatch('wordCountUpdate', {
      wordCount: {
        words: api.body.getWordCount(),
        characters: api.body.getCharacterCount(),
        charactersWithoutSpaces: api.body.getCharacterCountWithoutSpaces()
      }
    });
  };

  var updateCount = function updateCount(editor, api) {
    fireWordCountUpdate(editor, api);
  };

  var setup = function setup(editor, api, delay) {
    var debouncedUpdate = first(function () {
      return updateCount(editor, api);
    }, delay);
    editor.on('init', function () {
      updateCount(editor, api);
      global.setEditorTimeout(editor, function () {
        editor.on('SetContent BeforeAddUndo Undo Redo ViewUpdate keyup', debouncedUpdate.throttle);
      }, 0);
      editor.on('remove', debouncedUpdate.cancel);
    });
  };

  var register = function register(editor) {
    var onAction = function onAction() {
      return editor.execCommand('mceWordCount');
    };

    editor.ui.registry.addButton('wordcount', {
      tooltip: 'Word count',
      icon: 'character-count',
      onAction: onAction
    });
    editor.ui.registry.addMenuItem('wordcount', {
      text: 'Word count',
      icon: 'character-count',
      onAction: onAction
    });
  };

  var Plugin = function Plugin() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    global$2.add('wordcount', function (editor) {
      var api = get(editor);
      register$1(editor, api);
      register(editor);
      setup(editor, api, delay);
      return api;
    });
  };

  Plugin();
})();