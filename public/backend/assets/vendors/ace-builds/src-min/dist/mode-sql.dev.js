"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define("ace/mode/sql_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    var e = "select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|when|then|else|end|type|left|right|join|on|outer|desc|asc|union|create|table|primary|key|if|foreign|not|references|default|null|inner|cross|natural|database|drop|grant|distinct",
        t = "true|false",
        n = "avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|format|coalesce|ifnull|isnull|nvl",
        r = "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|money|real|number|integer",
        i = this.createKeywordMapper({
      "support.function": n,
      keyword: e,
      "constant.language": t,
      "storage.type": r
    }, "identifier", !0);
    this.$rules = {
      start: [{
        token: "comment",
        regex: "--.*$"
      }, {
        token: "comment",
        start: "/\\*",
        end: "\\*/"
      }, {
        token: "string",
        regex: '".*?"'
      }, {
        token: "string",
        regex: "'.*?'"
      }, {
        token: "string",
        regex: "`.*?`"
      }, {
        token: "constant.numeric",
        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
      }, {
        token: i,
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      }, {
        token: "keyword.operator",
        regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
      }, {
        token: "paren.lparen",
        regex: "[\\(]"
      }, {
        token: "paren.rparen",
        regex: "[\\)]"
      }, {
        token: "text",
        regex: "\\s+"
      }]
    }, this.normalizeRules();
  };

  r.inherits(s, i), t.SqlHighlightRules = s;
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
  "use strict";

  var r = e("../../lib/oop"),
      i = e("../../range").Range,
      s = e("./fold_mode").FoldMode,
      o = t.FoldMode = function (e) {
    e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)));
  };

  r.inherits(o, s), function () {
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
      var r = e.getLine(n);
      if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";

      var i = this._getFoldWidgetBase(e, t, n);

      return !i && this.startRegionRe.test(r) ? "start" : i;
    }, this.getFoldWidgetRange = function (e, t, n, r) {
      var i = e.getLine(n);
      if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
      var s = i.match(this.foldingStartMarker);

      if (s) {
        var o = s.index;
        if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
        var u = e.getCommentFoldRange(n, o + s[0].length, 1);
        return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u;
      }

      if (t === "markbegin") return;
      var s = i.match(this.foldingStopMarker);

      if (s) {
        var o = s.index + s[0].length;
        return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1);
      }
    }, this.getSectionRange = function (e, t) {
      var n = e.getLine(t),
          r = n.search(/\S/),
          s = t,
          o = n.length;
      t += 1;
      var u = t,
          a = e.getLength();

      while (++t < a) {
        n = e.getLine(t);
        var f = n.search(/\S/);
        if (f === -1) continue;
        if (r > f) break;
        var l = this.getFoldWidgetRange(e, "all", t);

        if (l) {
          if (l.start.row <= s) break;
          if (l.isMultiLine()) t = l.end.row;else if (r == f) break;
        }

        u = t;
      }

      return new i(s, o, u, e.getLine(u).length);
    }, this.getCommentRegionBlock = function (e, t, n) {
      var r = t.search(/\s*$/),
          s = e.getLength(),
          o = n,
          u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
          a = 1;

      while (++n < s) {
        t = e.getLine(n);
        var f = u.exec(t);
        if (!f) continue;
        f[1] ? a-- : a++;
        if (!a) break;
      }

      var l = n;
      if (l > o) return new i(o, r, l, t.length);
    };
  }.call(o.prototype);
}), define("ace/mode/folding/sql", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/cstyle"], function (e, t, n) {
  "use strict";

  var r = e("../../lib/oop"),
      i = e("./cstyle").FoldMode,
      s = t.FoldMode = function () {};

  r.inherits(s, i), function () {}.call(s.prototype);
}), define("ace/mode/sql", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/sql_highlight_rules", "ace/mode/folding/sql"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./sql_highlight_rules").SqlHighlightRules,
      o = e("./folding/sql").FoldMode,
      u = function u() {
    this.HighlightRules = s, this.foldingRules = new o(), this.$behaviour = this.$defaultBehaviour;
  };

  r.inherits(u, i), function () {
    this.lineCommentStart = "--", this.blockComment = {
      start: "/*",
      end: "*/"
    }, this.$id = "ace/mode/sql", this.snippetFileId = "ace/snippets/sql";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  window.require(["ace/mode/sql"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();