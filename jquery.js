/*! For license information please see jquery.color.min.js.LICENSE.txt */
!function(r, n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? module.exports = n(require("jquery")) : n(r.jQuery)
}(this, (function(r, n) {
    var t, e = {}, o = e.toString, a = /^([\-+])=\s*(\d+\.?\d*)/, i = [{
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(r) {
            return [r[1], r[2], r[3], r[4]]
        }
    }, {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(r) {
            return [2.55 * r[1], 2.55 * r[2], 2.55 * r[3], r[4]]
        }
    }, {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
        parse: function(r) {
            return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16), r[4] ? (parseInt(r[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
        parse: function(r) {
            return [parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16), r[4] ? (parseInt(r[4] + r[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function(r) {
            return [r[1], r[2] / 100, r[3] / 100, r[4]]
        }
    }], s = r.Color = function(n, t, e, o) {
        return new r.Color.fn.parse(n,t,e,o)
    }
    , u = {
        rgba: {
            props: {
                red: {
                    idx: 0,
                    type: "byte"
                },
                green: {
                    idx: 1,
                    type: "byte"
                },
                blue: {
                    idx: 2,
                    type: "byte"
                }
            }
        },
        hsla: {
            props: {
                hue: {
                    idx: 0,
                    type: "degrees"
                },
                saturation: {
                    idx: 1,
                    type: "percent"
                },
                lightness: {
                    idx: 2,
                    type: "percent"
                }
            }
        }
    }, l = {
        byte: {
            floor: !0,
            max: 255
        },
        percent: {
            max: 1
        },
        degrees: {
            mod: 360,
            floor: !0
        }
    }, f = s.support = {}, c = r("<p>")[0], p = r.each;
    function d(r) {
        return null == r ? r + "" : "object" == typeof r ? e[o.call(r)] || "object" : typeof r
    }
    function h(r, n, t) {
        var e = l[n.type] || {};
        return null == r ? t || !n.def ? null : n.def : (r = e.floor ? ~~r : parseFloat(r),
        isNaN(r) ? n.def : e.mod ? (r + e.mod) % e.mod : Math.min(e.max, Math.max(0, r)))
    }
    function b(n) {
        var e = s()
          , o = e._rgba = [];
        return n = n.toLowerCase(),
        p(i, (function(r, t) {
            var a, i = t.re.exec(n), s = i && t.parse(i), l = t.space || "rgba";
            if (s)
                return a = e[l](s),
                e[u[l].cache] = a[u[l].cache],
                o = e._rgba = a._rgba,
                !1
        }
        )),
        o.length ? ("0,0,0,0" === o.join() && r.extend(o, t.transparent),
        e) : t[n]
    }
    function g(r, n, t) {
        return 6 * (t = (t + 1) % 1) < 1 ? r + (n - r) * t * 6 : 2 * t < 1 ? n : 3 * t < 2 ? r + (n - r) * (2 / 3 - t) * 6 : r
    }
    c.style.cssText = "background-color:rgba(1,1,1,.5)",
    f.rgba = -1 < c.style.backgroundColor.indexOf("rgba"),
    p(u, (function(r, n) {
        n.cache = "_" + r,
        n.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        }
    }
    )),
    r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(r, n) {
        e["[object " + n + "]"] = n.toLowerCase()
    }
    )),
    s.fn = r.extend(s.prototype, {
        parse: function(e, o, a, i) {
            if (e === n)
                return this._rgba = [null, null, null, null],
                this;
            (e.jquery || e.nodeType) && (e = r(e).css(o),
            o = n);
            var l = this
              , f = d(e)
              , c = this._rgba = [];
            return o !== n && (e = [e, o, a, i],
            f = "array"),
            "string" === f ? this.parse(b(e) || t._default) : "array" === f ? (p(u.rgba.props, (function(r, n) {
                c[n.idx] = h(e[n.idx], n)
            }
            )),
            this) : "object" === f ? (p(u, e instanceof s ? function(r, n) {
                e[n.cache] && (l[n.cache] = e[n.cache].slice())
            }
            : function(n, t) {
                var o = t.cache;
                p(t.props, (function(r, n) {
                    if (!l[o] && t.to) {
                        if ("alpha" === r || null == e[r])
                            return;
                        l[o] = t.to(l._rgba)
                    }
                    l[o][n.idx] = h(e[r], n, !0)
                }
                )),
                l[o] && r.inArray(null, l[o].slice(0, 3)) < 0 && (null == l[o][3] && (l[o][3] = 1),
                t.from && (l._rgba = t.from(l[o])))
            }
            ),
            this) : void 0
        },
        is: function(r) {
            var n = s(r)
              , t = !0
              , e = this;
            return p(u, (function(r, o) {
                var a, i = n[o.cache];
                return i && (a = e[o.cache] || o.to && o.to(e._rgba) || [],
                p(o.props, (function(r, n) {
                    if (null != i[n.idx])
                        return t = i[n.idx] === a[n.idx]
                }
                ))),
                t
            }
            )),
            t
        },
        _space: function() {
            var r = []
              , n = this;
            return p(u, (function(t, e) {
                n[e.cache] && r.push(t)
            }
            )),
            r.pop()
        },
        transition: function(r, n) {
            var t = (f = s(r))._space()
              , e = u[t]
              , o = 0 === this.alpha() ? s("transparent") : this
              , a = o[e.cache] || e.to(o._rgba)
              , i = a.slice()
              , f = f[e.cache];
            return p(e.props, (function(r, t) {
                var e = t.idx
                  , o = a[e]
                  , s = f[e]
                  , u = l[t.type] || {};
                null !== s && (null === o ? i[e] = s : (u.mod && (u.mod / 2 < s - o ? o += u.mod : u.mod / 2 < o - s && (o -= u.mod)),
                i[e] = h((s - o) * n + o, t)))
            }
            )),
            this[t](i)
        },
        blend: function(n) {
            if (1 === this._rgba[3])
                return this;
            var t = this._rgba.slice()
              , e = t.pop()
              , o = s(n)._rgba;
            return s(r.map(t, (function(r, n) {
                return (1 - e) * o[n] + e * r
            }
            )))
        },
        toRgbaString: function() {
            var n = "rgba("
              , t = r.map(this._rgba, (function(r, n) {
                return null != r ? r : 2 < n ? 1 : 0
            }
            ));
            return 1 === t[3] && (t.pop(),
            n = "rgb("),
            n + t.join() + ")"
        },
        toHslaString: function() {
            var n = "hsla("
              , t = r.map(this.hsla(), (function(r, n) {
                return null == r && (r = 2 < n ? 1 : 0),
                n && n < 3 && (r = Math.round(100 * r) + "%"),
                r
            }
            ));
            return 1 === t[3] && (t.pop(),
            n = "hsl("),
            n + t.join() + ")"
        },
        toHexString: function(n) {
            var t = this._rgba.slice()
              , e = t.pop();
            return n && t.push(~~(255 * e)),
            "#" + r.map(t, (function(r) {
                return 1 === (r = (r || 0).toString(16)).length ? "0" + r : r
            }
            )).join("")
        },
        toString: function() {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }
    }),
    s.fn.parse.prototype = s.fn,
    u.hsla.to = function(r) {
        if (null == r[0] || null == r[1] || null == r[2])
            return [null, null, null, r[3]];
        var n = r[0] / 255
          , t = r[1] / 255
          , e = r[2] / 255
          , o = r[3]
          , a = Math.max(n, t, e)
          , i = Math.min(n, t, e)
          , s = a - i
          , u = a + i
          , l = .5 * u
          , f = i === a ? 0 : n === a ? 60 * (t - e) / s + 360 : t === a ? 60 * (e - n) / s + 120 : 60 * (n - t) / s + 240
          , c = 0 == s ? 0 : l <= .5 ? s / u : s / (2 - u);
        return [Math.round(f) % 360, c, l, null == o ? 1 : o]
    }
    ,
    u.hsla.from = function(r) {
        if (null == r[0] || null == r[1] || null == r[2])
            return [null, null, null, r[3]];
        var n = r[0] / 360
          , t = r[1]
          , e = r[2]
          , o = r[3]
          , a = e <= .5 ? e * (1 + t) : e + t - e * t
          , i = 2 * e - a;
        return [Math.round(255 * g(i, a, n + 1 / 3)), Math.round(255 * g(i, a, n)), Math.round(255 * g(i, a, n - 1 / 3)), o]
    }
    ,
    p(u, (function(r, t) {
        var e = t.props
          , o = t.cache
          , i = t.to
          , u = t.from;
        s.fn[r] = function(r) {
            if (i && !this[o] && (this[o] = i(this._rgba)),
            r === n)
                return this[o].slice();
            var t, a = d(r), l = "array" === a || "object" === a ? r : arguments, f = this[o].slice();
            return p(e, (function(r, n) {
                var t = l["object" === a ? r : n.idx];
                null == t && (t = f[n.idx]),
                f[n.idx] = h(t, n)
            }
            )),
            u ? ((t = s(u(f)))[o] = f,
            t) : s(f)
        }
        ,
        p(e, (function(n, t) {
            s.fn[n] || (s.fn[n] = function(e) {
                var o, i = d(e), s = "alpha" === n ? this._hsla ? "hsla" : "rgba" : r, u = this[s](), l = u[t.idx];
                return "undefined" === i ? l : ("function" === i && (i = d(e = e.call(this, l))),
                null == e && t.empty ? this : ("string" === i && (o = a.exec(e)) && (e = l + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)),
                u[t.idx] = e,
                this[s](u)))
            }
            )
        }
        ))
    }
    )),
    s.hook = function(n) {
        var t = n.split(" ");
        p(t, (function(n, t) {
            r.cssHooks[t] = {
                set: function(n, e) {
                    var o, a, i = "";
                    if ("transparent" !== e && ("string" !== d(e) || (o = b(e)))) {
                        if (e = s(o || e),
                        !f.rgba && 1 !== e._rgba[3]) {
                            for (a = "backgroundColor" === t ? n.parentNode : n; ("" === i || "transparent" === i) && a && a.style; )
                                try {
                                    i = r.css(a, "backgroundColor"),
                                    a = a.parentNode
                                } catch (n) {}
                            e = e.blend(i && "transparent" !== i ? i : "_default")
                        }
                        e = e.toRgbaString()
                    }
                    try {
                        n.style[t] = e
                    } catch (n) {}
                }
            },
            r.fx.step[t] = function(n) {
                n.colorInit || (n.start = s(n.elem, t),
                n.end = s(n.end),
                n.colorInit = !0),
                r.cssHooks[t].set(n.elem, n.start.transition(n.end, n.pos))
            }
        }
        ))
    }
    ,
    s.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),
    r.cssHooks.borderColor = {
        expand: function(r) {
            var n = {};
            return p(["Top", "Right", "Bottom", "Left"], (function(t, e) {
                n["border" + e + "Color"] = r
            }
            )),
            n
        }
    },
    t = r.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    }
}
));
