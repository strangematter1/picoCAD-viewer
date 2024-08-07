!function() {
    "use strict";
    var t = "undefined" != typeof Float32Array ? Float32Array : Array;
    Math.hypot || (Math.hypot = function() {
        for (var t = 0, e = arguments.length; e--; )
            t += arguments[e] * arguments[e];
        return Math.sqrt(t)
    }
    );
    var e = function(t, e, r, n, i) {
        var o, a = 1 / Math.tan(e / 2);
        return t[0] = a / r,
        t[1] = 0,
        t[2] = 0,
        t[3] = 0,
        t[4] = 0,
        t[5] = a,
        t[6] = 0,
        t[7] = 0,
        t[8] = 0,
        t[9] = 0,
        t[11] = -1,
        t[12] = 0,
        t[13] = 0,
        t[15] = 0,
        null != i && i !== 1 / 0 ? (o = 1 / (n - i),
        t[10] = (i + n) * o,
        t[14] = 2 * i * n * o) : (t[10] = -1,
        t[14] = -2 * n),
        t
    };
    function r() {
        var e = new t(3);
        return t != Float32Array && (e[0] = 0,
        e[1] = 0,
        e[2] = 0),
        e
    }
    r();
    const n = [[0, 0, 0], [29, 43, 83], [126, 37, 83], [0, 135, 81], [171, 82, 54], [95, 87, 79], [194, 195, 199], [255, 241, 232], [255, 0, 77], [255, 163, 0], [255, 236, 39], [0, 228, 54], [41, 173, 255], [131, 118, 156], [255, 119, 168], [255, 204, 170]];
    class i {
        constructor(t, e={}) {
            this.objects = t,
            this.name = e.name,
            this.backgroundIndex = e.backgroundIndex ?? 0,
            this.alphaIndex = e.alphaIndex ?? 0,
            this.zoomLevel = e.zoomLevel,
            this.texture = e.texture
        }
        backgroundColor() {
            return n[this.backgroundIndex]
        }
        alphaColor() {
            return n[this.alphaIndex]
        }
        textureAsImage(t) {
            null == t && (t = n);
            const e = new ImageData(128,128)
              , r = e.data
              , i = this.texture
              , o = this.alphaIndex;
            let a = 0
              , s = 0;
            for (let e = 0; e < 120; e++)
                for (let e = 0; e < 128; e++) {
                    const e = i[a];
                    if (e !== o) {
                        const n = t[e];
                        r[s] = n[0],
                        r[s + 1] = n[1],
                        r[s + 2] = n[2],
                        r[s + 3] = 255
                    }
                    a++,
                    s += 4
                }
            return e
        }
    }
    class o {
        constructor(t, e, r, n, i) {
            this.name = t,
            this.position = e,
            this.rotation = r,
            this.vertices = n,
            this.faces = i
        }
    }
    class a {
        constructor(t, e, r, n={}) {
            this.indices = t,
            this.colorIndex = e,
            this.uvs = r,
            this.shading = n.shading ?? !0,
            this.texture = n.texture ?? !0,
            this.doubleSided = n.doubleSided ?? !1,
            this.renderFirst = n.renderFirst ?? !1
        }
        color() {
            return n[this.colorIndex]
        }
    }
    class s {
        constructor(t, e={}) {
            this.gl = t,
            this.cull = e.cull ?? !0,
            this.shading = e.shading ?? !0,
            this.texture = e.texture ?? !0,
            this.clearDepth = e.clearDepth ?? !1,
            this.vertices = [],
            this.normals = [],
            this.uvs = [],
            this.colorUVs = [],
            this.triangles = []
        }
        save() {
            const t = this.gl;
            this.vertexCount = this.triangles.length,
            this.isEmpty() || (this.vertexBuffer = t.createBuffer(),
            this.uvBuffer = t.createBuffer(),
            this.colorUVBuffer = t.createBuffer(),
            this.triangleBuffer = t.createBuffer(),
            this.normalBuffer = t.createBuffer(),
            t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.vertices), t.STATIC_DRAW),
            t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.uvs), t.STATIC_DRAW),
            t.bindBuffer(t.ARRAY_BUFFER, this.colorUVBuffer),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.colorUVs), t.STATIC_DRAW),
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.triangleBuffer),
            t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.triangles), t.STATIC_DRAW),
            t.bindBuffer(t.ARRAY_BUFFER, this.normalBuffer),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.normals), t.STATIC_DRAW)),
            this.uvs = null,
            this.colorUVs = null,
            this.normals = null,
            this.vertices = null,
            this.triangles = null
        }
        isEmpty() {
            return 0 === this.vertexCount
        }
        free() {
            const t = this.gl;
            t.deleteBuffer(this.vertexBuffer),
            t.deleteBuffer(this.uvBuffer),
            t.deleteBuffer(this.colorUVBuffer),
            t.deleteBuffer(this.triangleBuffer),
            t.deleteBuffer(this.normalBuffer)
        }
    }
    class l {
        constructor(t) {
            this.gl = t,
            this.vertices = []
        }
        save() {
            const t = this.gl;
            this.vertexCount = Math.floor(this.vertices.length / 3),
            this.vertexBuffer = t.createBuffer(),
            t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.vertices), t.STATIC_DRAW),
            this.vertices = null
        }
        free() {
            this.gl.deleteBuffer(this.vertexBuffer)
        }
    }
    function u(t, e, r) {
        const {passes: n, wireframe: i} = function(t, e, r) {
            const n = [];
            for (let e = 0; e < 16; e++) {
                const r = e % 2 < 1
                  , i = e % 4 < 2
                  , o = e % 8 < 4;
                n.push(new s(t,{
                    cull: !r,
                    shading: i,
                    texture: o,
                    clearDepth: 8 === e
                }))
            }
            const i = new l(t)
              , o = i.vertices;
            for (const t of e.objects) {
                const e = t.position
                  , i = t.vertices.map((t=>[-t[0] - e[0], -t[1] - e[1], t[2] + e[2]]));
                for (const e of t.faces) {
                    const t = e.indices
                      , a = e.uvs
                      , s = n[(e.doubleSided ? 0 : 1) + (e.shading ? 0 : 2) + (e.texture ? 0 : 4) + (e.renderFirst ? 0 : 8)]
                      , l = s.vertices
                      , u = s.triangles
                      , f = s.normals
                      , d = s.uvs
                      , m = s.colorUVs
                      , g = .03125 + e.colorIndex / 16
                      , p = 0
                      , x = Math.floor(l.length / 3)
                      , v = []
                      , _ = [];
                    for (let e = 0; e < t.length; e++) {
                        const r = i[t[e]]
                          , n = i[t[0 === e ? t.length - 1 : e - 1]]
                          , s = a[e];
                        v.push(r),
                        o.push(r[0], r[1], r[2], n[0], n[1], n[2]),
                        _.push([s[0] / 16, s[1] / 16])
                    }
                    const T = c(v);
                    if (4 === t.length && e.texture && r > 1) {
                        const t = v[0]
                          , e = v[1]
                          , n = v[2]
                          , i = v[3]
                          , o = _[0]
                          , a = _[1]
                          , s = _[2]
                          , c = _[3];
                        for (let u = 0; u <= r; u++) {
                            const x = u / r
                              , v = [h(t[0], e[0], x), h(t[1], e[1], x), h(t[2], e[2], x), h(o[0], a[0], x), h(o[1], a[1], x)]
                              , _ = [h(i[0], n[0], x), h(i[1], n[1], x), h(i[2], n[2], x), h(c[0], s[0], x), h(c[1], s[1], x)];
                            for (let t = 0; t <= r; t++) {
                                const e = t / r;
                                l.push(h(v[0], _[0], e), h(v[1], _[1], e), h(v[2], _[2], e)),
                                d.push(h(v[3], _[3], e), h(v[4], _[4], e)),
                                m.push(g, p),
                                f.push(T[0], T[1], T[2])
                            }
                        }
                        for (let t = 0; t < r; t++)
                            for (let e = 0; e < r; e++) {
                                const n = e * (r + 1)
                                  , i = x + n + t + 1
                                  , o = x + n + t + r + 1;
                                u.push(x + n + t, i, o, o, i, x + n + t + r + 2)
                            }
                    } else {
                        for (const t of v)
                            l.push(t[0], t[1], t[2]),
                            f.push(T[0], T[1], T[2]);
                        for (let t = 0; t < _.length; t++)
                            if (m.push(g, p),
                            e.texture) {
                                const e = _[t];
                                d.push(e[0], e[1])
                            } else
                                d.push(g, p);
                        for (let e = 0, r = t.length - 2; e < r; e++)
                            u.push(x + 1 + e, x, x + 2 + e)
                    }
                }
            }
            for (const t of n)
                t.save();
            return i.save(),
            {
                passes: n,
                wireframe: i
            }
        }(t, e, r + 1);
        return {
            passes: n,
            wireframe: i,
            textureIndices: function(t, e) {
                const r = Array(16384).fill(255);
                for (let n = 0; n < t.length; n++) {
                    const i = t[n];
                    r[n] = i === e ? 255 : i
                }
                for (let t = 0; t < 16; t++)
                    r[16256 + t] = t;
                return r
            }(e.texture, e.alphaIndex)
        }
    }
    function h(t, e, r) {
        return t + (e - t) * r
    }
    function c(t) {
        for (let n = 0; n < t.length; n++) {
            const i = t[n]
              , o = t[(n + 1) % t.length]
              , a = t[(n + 2) % t.length]
              , s = [i[0] - o[0], i[1] - o[1], i[2] - o[2]]
              , l = [o[0] - a[0], o[1] - a[1], o[2] - a[2]]
              , u = (r = s,
            [(e = l)[1] * r[2] - e[2] * r[1], e[2] * r[0] - e[0] * r[2], e[0] * r[1] - e[1] * r[0]])
              , h = f(u);
            if (h > 0)
                return [u[0] / h, u[1] / h, u[2] / h]
        }
        var e, r;
        return [1, 0, 0]
    }
    function f(t) {
        return Math.hypot(t[0], t[1], t[2])
    }
    class d {
        constructor(t, e, r) {
            this.gl = t;
            const n = this.createShader(t.VERTEX_SHADER, e)
              , i = this.createShader(t.FRAGMENT_SHADER, r);
            if (this.program = t.createProgram(),
            t.attachShader(this.program, n),
            t.attachShader(this.program, i),
            t.linkProgram(this.program),
            t.deleteShader(n),
            t.deleteShader(i),
            !t.getProgramParameter(this.program, t.LINK_STATUS)) {
                const e = t.getProgramInfoLog(this.program);
                throw t.deleteProgram(this.program),
                Error("program compilation failed: " + e)
            }
            this.vertexLocation = this.getAttribLocation("vertex")
        }
        createShader(t, e) {
            const r = this.gl
              , n = r.createShader(t);
            if (r.shaderSource(n, e),
            r.compileShader(n),
            !r.getShaderParameter(n, r.COMPILE_STATUS)) {
                const e = r.getShaderInfoLog(n);
                throw r.deleteShader(n),
                Error(`${t === r.FRAGMENT_SHADER ? "fragment" : "vertex"} shader compilation failed: ${e}`)
            }
            return n
        }
        getAttribLocation(t) {
            return this.gl.getAttribLocation(this.program, t)
        }
        getUniformLocation(t) {
            return this.gl.getUniformLocation(this.program, t)
        }
        use() {
            this.gl.useProgram(this.program)
        }
        free() {
            this.gl.deleteProgram(this.program)
        }
    }
    function m() {
        return function(t, e, r) {
            const i = new ImageData(t,e)
              , o = i.data
              , a = t * e;
            let s = 0;
            for (let t = 0; t < a; t++) {
                const e = n[parseInt(r.charAt(t), 16)];
                o[s] = e[0],
                o[s + 1] = e[1],
                o[s + 2] = e[2],
                o[s + 3] = 255,
                s += 4
            }
            return i
        }(32, 4, "00112233445566778899aabbccddeeff0010213542516d768294a9b3cdd5e8fe000011552211dd6622449933dd55889900000011110055dd1122445555112244")
    }
    function g(t) {
        return function(t) {
            let e = 0;
            return n();
            function r() {
                const r = t.charAt(e);
                if ("{" === r)
                    return n();
                if ("'" === r)
                    return i();
                if ("-" === r || "." === r || r >= "0" && r <= "9")
                    return o();
                throw Error("Unkown value (" + e + '): "' + r + '" = ' + r.charCodeAt(0))
            }
            function n() {
                e++;
                const n = {
                    array: [],
                    dict: Object.create(null)
                };
                for (a(); ; ) {
                    const i = t.charAt(e);
                    if ("}" === i) {
                        e++;
                        break
                    }
                    let o;
                    if (i >= "a" && i <= "z") {
                        let r = e;
                        for (e++; ; ) {
                            if ("=" === t.charAt(e))
                                break;
                            e++
                        }
                        o = t.slice(r, e),
                        e++
                    }
                    const s = r();
                    null == o ? n.array.push(s) : n.dict[o] = s,
                    a();
                    "," === t.charAt(e) && (e++,
                    a())
                }
                return n
            }
            function i() {
                const r = e
                  , n = t.indexOf("'", e + 1);
                if (n < 0)
                    throw Error("No end!!!");
                if (e = n + 1,
                e === r)
                    throw Error("!!!!");
                return t.slice(r + 1, n)
            }
            function o() {
                const r = e;
                for (; ; ) {
                    const r = t.charAt(e);
                    if (!("-" === r || "." === r || r >= "0" && r <= "9"))
                        break;
                    e++
                }
                if (e === r)
                    throw Error("!!!!");
                return Number(t.slice(r, e))
            }
            function a() {
                for (; ; ) {
                    const r = t.charAt(e);
                    if (" " !== r && "\n" !== r && "\r" !== r && "\t" !== r)
                        break;
                    e++
                }
            }
        }(t)
    }
    function p(t) {
        let e = 0
          , r = t.length;
        for (; e < t.length; ) {
            const n = t.charAt(e);
            if (e++,
            "\n" === n) {
                r = e - 1;
                break
            }
            if ("\r" === n) {
                r = e - 1,
                "\n" === t.charAt(e) && e++;
                break
            }
        }
        return [t.slice(0, r), t.slice(e)]
    }
    function x(t) {
        if (!t.startsWith("picocad;"))
            throw Error("Not a picoCAD file.");
        const [e,r] = p(t)
          , n = e.split(";")
          , s = n[1]
          , [l,u,h] = n.slice(2).map((t=>Number(t)))
          , [c,f] = function(t, e) {
            const r = t.indexOf(e);
            return r < 0 ? [t, ""] : [t.slice(0, r), t.slice(r + e.length)]
        }(r, "%")
          , d = g(c)
          , m = d.array.map((t=>{
            const e = t.dict.name
              , r = t.dict.pos.array
              , n = t.dict.rot.array
              , i = t.dict.v.array.map((t=>t.array))
              , s = t.dict.f.array.map((t=>{
                const e = t.array.map((t=>t - 1))
                  , r = t.dict.c
                  , n = t.dict.uv.array
                  , i = [];
                for (let t = 1; t < n.length; t += 2)
                    i.push([n[t - 1], n[t]]);
                return new a(e,r,i,{
                    shading: 1 !== t.dict.noshade,
                    texture: 1 !== t.dict.notex,
                    doubleSided: 1 === t.dict.dbl,
                    renderFirst: 1 === t.dict.prio
                })
            }
            ));
            return new o(e,r,n,i,s)
        }
        ));
        const x = function(t) {
            const e = Array(15360);
            let r, n = 0;
            for (let i = 0; i < 120; i++) {
                [r,t] = p(t);
                for (let t = 0; t < 128; t++)
                    e[n] = Number.parseInt(r.charAt(t), 16),
                    n++
            }
            return e
        }(p(f)[1]);
        return new i(m,{
            name: s,
            alphaIndex: h,
            backgroundIndex: u,
            zoomLevel: l,
            texture: x
        })
    }
    function v(t) {
        return (t.length < 4 ? 4278190080 : function(t, e) {
            for (let r = 0; r < e; r++)
                t *= 2;
            return t
        }(t[3], 24)) + (t[2] << 16) + (t[1] << 8) + t[0]
    }
    function _(t) {
        return t.map((t=>Math.floor(255.999 * t)))
    }
    function T(t, e, r) {
        return .2126 * t + .7152 * e + .0722 * r
    }
    const b = "R0lGODdhgACAAIAAAAAAAP///yH5BAkKAAAALAAAAACAAIAAAAL/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC5vBHBtBcitz/ty859PpaIgdjngIFgE/pvMIxTWaRpAy+UwibVtnM9sDM7tVLOP7FQOHVDJZfLWp3cLzMV2PYsow6oQvJ4GGV1NoeIiYqLgYJoUGBhg3tpBWKUQogrnkeIfUZaaVt0kpCmr1h9pWyhVB2Pba+mkXsuP5dtk6tarGS6E5CiH5CJu7KjkruMu4zNzs/BwTOUiMRR14h10k61ucXa1sueSnDFf+uDsNzinlHaptPRauBc9dr70OfI1OKs7/bewvXzxy7Qa+K6jP4LyACgUydKgOmsSJFCtaRHXx2TE6/0P0LDzo0UvBSOXYhGTVL6U7h8IG7TvH7l5MkP9qJuTiZxy+m7xawhQojFTOnShtNiyKdCVPkvA+bRyqMmnGqVSrWr3KzOmZnz24TupIUw5Uo0GbIpspMpg5oniGsZ1jslTbsxWkgQXI1o3XhPLQmqq7Ne/Dr0DfqBo59ySlbVgbO34M+aE0lzLDHiUsFvHYpRwVb077NzPLwRsllxy5Nljn0KClao07+qSlz8eEvsUV++1et6Np98pL+aNwzrRXix7eOjnjyMybO6cIaI5Ts76rI3xd+ULZ2wCtR01+sy9ruKgPW4brvbBXWZWo+8V8HChu5EwZJn6/l/zd+PA5G/8zrNl+4f3yXIEGHghNLUYEwSA7Cl6jU1g0bDFZOw/GUwtNF5qiIBENYrggD56AkiFOWWw44Q98XFjFhAOpWJktInYoUoMLEuYiXxSWCKKJLZbYoQ8zgkjhPULi5CGNNYrlYogimsFjj8OlKGFaP5a04pAmInnjhygCyRo96UQl5Iw/sqjXLQiuyWab0UQJB48b+gIkjTZuCaFn2eTw5BR8yuiNk8qRyKArS/I1SpRwvtLkkrYQCeNKHormZYplZngnhhza10mfmiT5Z5Za9hepF4XqcmeOSvTF53Gt/jbPiBDKCacgdT6Y6aQ8NXSkO08S6Gawwg7rQK2QEIrdrlj/dhLaorSStMmIigp4qShyLnZmdGYShOieyZrZZ0zAliqXPkr+idxM65mbh3l5LuWPihHKpwunEGmqnKFQMqsUns1O56m8weXjbLTLEYtwwm6+Wg2j+xYlr1polsFeng6TySsboFocSJmEdmWwjJFue+KKGg95BcWrvvtqy4mixXC4fymJ3qrQenqiI0du7LKp4f76xMj4Dv3VqOi+e+xiscqk66Mdw0dx0bbd+KJc2ppltcJab621TuCSy2XD5wHLwZxJMSoziR5RGaOuHTMs8T71zrxop75GayTeSPM6ZthICtgatKfJHXSSe/eaWqPqchxxRPaO3Z7BesD999H0/Yptmb5rG8t15543N++/Rdr9MKnTihurwP2orl62X+vtd6Jm95Q67GkP9Utb48z7865Co8QV5U/nKKW4igKoduxh0hUetXNn18u6OSetZm7K6xiFNdOhs9vn3n8PeiyC40XcjvYdX30ddZPur+zRUb90vOYam7sdYBev7Hz9sjt9vWDzpjzhCWx373kepmBWusEMb3AGFEfa4MW+SfCueiTb39SsJaoraexe4OugByWSwXeMDkb3K96XVNYM8cyChLnpndw+NB5sbWCAIvxdfFxIu/j5hYbQQwrNiqVAVlmJf/rZYXccV5dnDWxTOEpT4zbnLtHR44NUrGJGCgAAOw==";
    let A = !1
      , E = null;
    function y() {
        return A || (A = !0,
        async function() {
            return new Promise(((t,e)=>{
                let r = new Image;
                r.onload = ()=>t(r),
                r.onerror = ()=>e("could not load PICO-8 font"),
                r.src = "data:image/gif;base64," + b
            }
            ))
        }().then((t=>E = t))),
        E
    }
    /*
   * @license
   * Adapted from lzwCompress.js
   *
   * Copyright (c) 2012-2021 floydpink
   * Licensed under the MIT license.
   */
    const w = {};
    function R(t) {
        const e = function(t) {
            function e(t) {
                t = t.toLowerCase();
                for (let e = 0; e < t.length; e++) {
                    const r = M.indexOf(t.charAt(e));
                    r > 0 && s(r, 6)
                }
                s(0, 6)
            }
            function r(t) {
                for (const e of t)
                    n(e)
            }
            function n(t) {
                const e = Math.round(64 * t) / 64;
                if (e >= -16 && e <= 15.75 && Number.isInteger(4 * e))
                    u.push(192 + 4 * e);
                else {
                    const r = 8192 + 64 * e;
                    if (r >= 32768)
                        throw Error(`can't encode float "${t}"`);
                    u.push((65280 & r) >> 8),
                    u.push(255 & r)
                }
            }
            let i = 0
              , o = 0;
            function a() {
                o > 0 && u.push(i),
                i = 0,
                o = 0
            }
            function s(t, e) {
                for (let r = 0; r < e; r++) {
                    l((t & 1 << r) >> r)
                }
            }
            function l(t) {
                i += t << o,
                o++,
                o >= 8 && (u.push(i),
                o = 0,
                i = 0)
            }
            const u = [];
            if (u.push(U),
            e(t.name),
            s(t.zoomLevel, 7),
            s(t.backgroundIndex, 4),
            s(t.alphaIndex, 4),
            a(),
            t.objects.length >= 256)
                throw Error("Too many objects");
            u.push(t.objects.length);
            for (const n of t.objects) {
                if (e(n.name),
                a(),
                r(n.position),
                n.vertices.length >= 256)
                    throw Error("Too many vertices on object");
                u.push(n.vertices.length);
                for (const t of n.vertices)
                    r(t);
                const t = k(n.vertices.length - 1);
                if (n.faces.length >= 256)
                    throw Error("Too many faces on object");
                u.push(n.faces.length);
                for (const e of n.faces) {
                    s(e.colorIndex, 4),
                    l(e.texture ? 1 : 0),
                    l(e.shading ? 1 : 0),
                    l(e.doubleSided ? 1 : 0),
                    l(e.renderFirst ? 1 : 0);
                    for (const r of e.indices)
                        s(r, t);
                    if (s(e.indices[0], t),
                    e.texture)
                        for (const t of e.uvs)
                            s(32 + 4 * t[0], 7),
                            s(32 + 4 * t[1], 7)
                }
                a()
            }
            let h = t.texture.length - 1;
            const c = t.texture[h];
            for (; h >= 1 && t.texture[h - 1] === c; )
                h--;
            const f = [];
            for (let e = 0; e <= h; ) {
                const r = t.texture[e];
                let n = 0;
                for (e++; e <= h && t.texture[e] === r && (e++,
                n++,
                15 != n); )
                    ;
                f.push((r << 4) + n)
            }
            if (f.length < h / 2) {
                u.push(L);
                for (const t of f)
                    u.push(t)
            } else {
                u.push(D),
                h % 2 == 0 && h++;
                for (let e = 1; e <= h; e += 2)
                    u.push((t.texture[e - 1] << 4) + t.texture[e])
            }
            return u
        }(t);
        console.log("binary: " + e.length + " bytes");
        const r = function(t) {
            const e = [];
            let r = 0
              , n = 0
              , i = 512
              , o = 9;
            for (let a = 0; a < t.length; a++) {
                256 + a >= i && (o++,
                i *= 2);
                const s = t[a];
                for (let t = 0; t < o; t++) {
                    r += (s & 1 << t) >> t << n,
                    n++,
                    n >= 8 && (e.push(r),
                    n = 0,
                    r = 0)
                }
            }
            n > 0 && e.push(r);
            return e
        }(function(t) {
            if (!t || !0 === t || t instanceof Date)
                return t;
            let e = t;
            return "object" == typeof t && (e = w.KeyOptimize.pack(JSON.stringify(t))),
            w.LZWCompress.pack(e)
        }(F(e)));
        let n = btoa(F(r))
          , i = n.indexOf("=", n.length - 4);
        return i >= 0 && (n = n.slice(0, i)),
        n
    }
    function B(t) {
        const e = function(t) {
            const e = [];
            let r = 0
              , n = 0
              , i = 512
              , o = 9;
            for (let a = 0; a < t.length; a++) {
                const s = t[a];
                for (let t = 0; t < 8; t++) {
                    r += (s & 1 << t) >> t << n,
                    n++,
                    n >= o && (e.push(r),
                    n = 0,
                    r = 0,
                    256 + e.length >= i && (o++,
                    i *= 2))
                }
            }
            return e
        }(C(atob(t)));
        return function(t) {
            function e() {
                let t = "";
                for (; ; ) {
                    const e = c(6);
                    if (0 === e)
                        break;
                    if (e >= M.length)
                        throw Error("invalid encoded string");
                    t += M.charAt(e)
                }
                return t
            }
            function r() {
                if (f < t.length)
                    return t[f++];
                throw Error("unexpected of input")
            }
            function n() {
                return f < t.length ? t[f++] : -1
            }
            function s() {
                const t = r();
                if (t >= 128)
                    return ((127 & t) - 64) / 4;
                return ((t << 8) + r() - 8192) / 64
            }
            function l(t) {
                const e = Array(t);
                for (let r = 0; r < t; r++)
                    e[r] = s();
                return e
            }
            let u = 0;
            function h() {
                u > 0 && (f++,
                u = 0)
            }
            function c(e) {
                let r = t[f]
                  , n = 0;
                for (let i = 0; i < e; i++) {
                    if (n += (r & 1 << u) >> u << i,
                    u++,
                    u >= 8) {
                        if (u = 0,
                        f++,
                        f >= t.length)
                            throw Error("Unexpected end of input");
                        r = t[f]
                    }
                }
                return n
            }
            let f = 0;
            const d = r();
            if (d !== U)
                throw Error(`invalid encoding version ${d}`);
            const m = e()
              , g = c(7)
              , p = c(4)
              , x = c(4);
            h();
            const v = r()
              , _ = Array(v);
            for (let t = 0; t < v; t++) {
                const n = e();
                h();
                const i = l(3)
                  , s = r()
                  , u = Array(s);
                for (let t = 0; t < s; t++)
                    u[t] = l(3);
                const f = k(s - 1)
                  , d = r()
                  , m = Array(d);
                for (let t = 0; t < d; t++) {
                    const e = c(4)
                      , r = 1 === c(1)
                      , n = 1 === c(1)
                      , i = 1 === c(1)
                      , o = 1 === c(1)
                      , s = c(f)
                      , l = [s];
                    for (; ; ) {
                        const t = c(f);
                        if (t === s)
                            break;
                        l.push(t)
                    }
                    const u = l.length;
                    let h = Array(u);
                    if (r)
                        for (let t = 0; t < u; t++) {
                            const e = c(7)
                              , r = c(7);
                            h[t] = [(e - 32) / 4, (r - 32) / 4]
                        }
                    else
                        for (let t = 0; t < u; t++)
                            h[t] = [0, 0];
                    m[t] = new a(l,e,h,{
                        texture: r,
                        shading: n,
                        doubleSided: i,
                        renderFirst: o
                    })
                }
                h(),
                _[t] = new o(n,i,[0, 0, 0],u,m)
            }
            const T = r();
            let b = [];
            if (T === L)
                for (let t = 0; t <= 15360; ) {
                    const t = n();
                    if (t < 0)
                        break;
                    const e = (240 & t) >> 4
                      , r = 1 + (15 & t);
                    for (let t = 0; t < r; t++)
                        b.push(e)
                }
            else {
                if (T !== D)
                    throw Error(`Invalid texture encoding code: ${T}`);
                for (let t = 0; t < 7680; t++) {
                    const t = n();
                    if (t < 0)
                        break;
                    b.push((240 & t) >> 4, 15 & t)
                }
            }
            if (b.length < 15360) {
                const t = b[b.length - 1];
                for (; b.length < 15360; )
                    b.push(t)
            }
            return new i(_,{
                name: m,
                alphaIndex: x,
                backgroundIndex: p,
                zoomLevel: g,
                texture: b
            })
        }(C(function(t) {
            if (!t || !0 === t || t instanceof Date)
                return t;
            let e, r = w.LZWCompress.unpack(t);
            try {
                e = JSON.parse(r)
            } catch (t) {
                return r
            }
            return "object" == typeof e && (r = w.KeyOptimize.unpack(e)),
            r
        }(e)))
    }
    function F(t) {
        let e = "";
        for (const r of t)
            e += String.fromCharCode(r);
        return e
    }
    function C(t) {
        const e = Array(t.length);
        for (let r = 0; r < t.length; r++)
            e[r] = t.charCodeAt(r);
        return e
    }
    !function(t) {
        let e = [];
        const r = function(t) {
            return function(e) {
                return e === t
            }
        }
          , n = function(t, e, r) {
            (function(t, e) {
                for (let r = 0; r < t.length; r++)
                    if (e(t[r]))
                        return !0;
                return !1
            }
            )(t, r) || t.push(e)
        }
          , i = function(t) {
            if ("object" == typeof t)
                for (let o in t)
                    Array.isArray(t) || n(e, o, r(o)),
                    i(t[o])
        }
          , o = function(t) {
            if ("object" != typeof t)
                return t;
            for (let r in t)
                Array.isArray(t) ? t[r] = o(t[r]) : t.hasOwnProperty(r) && (t[e.indexOf(r)] = o(t[r]),
                delete t[r]);
            return t
        }
          , a = function(t) {
            if ("object" != typeof t)
                return t;
            for (let r in t)
                Array.isArray(t) ? t[r] = a(t[r]) : t.hasOwnProperty(r) && e[r] && (t[e[r]] = a(t[r]),
                delete t[r]);
            return t
        };
        t.KeyOptimize = {
            pack: function(t) {
                e = [];
                const r = JSON.parse(t);
                return i(r),
                JSON.stringify({
                    __k: e,
                    __v: o(r)
                })
            },
            unpack: function(t) {
                const r = t;
                return "object" != typeof r ? t : r.hasOwnProperty("__k") ? (e = r.__k,
                a(r.__v)) : JSON.stringify(r)
            }
        }
    }(w),
    w.LZWCompress = {
        pack: function(t) {
            if ("string" != typeof t)
                return t;
            let e;
            const r = Object.create(null);
            let n, i, o = "";
            const a = [];
            let s = 256;
            for (e = 0; e < 256; e += 1)
                r[String.fromCharCode(e)] = e;
            for (e = 0; e < t.length; e += 1)
                if (n = t.charAt(e),
                i = o + n,
                r[i])
                    o = i;
                else {
                    if (void 0 === r[o])
                        return t;
                    a.push(r[o]),
                    r[i] = s++,
                    o = String(n)
                }
            return "" !== o && a.push(r[o]),
            a
        },
        unpack: function(t) {
            if (!Array.isArray(t))
                return t;
            let e;
            const r = [];
            let n, i, o, a = "", s = 256;
            for (e = 0; e < 256; e += 1)
                r[e] = String.fromCharCode(e);
            for (n = String.fromCharCode(t[0]),
            i = n,
            e = 1; e < t.length; e += 1) {
                if (o = t[e],
                r[o])
                    a = r[o];
                else {
                    if (o !== s)
                        return null;
                    a = n + n.charAt(0)
                }
                i += a,
                r[s++] = n + a.charAt(0),
                n = a
            }
            return i
        }
    };
    const U = 1
      , M = "\0abcdefghijklmnopqrstuvwxyz0123456789_ "
      , L = 0
      , D = 1
      , I = new Uint16Array(1);
    function k(t) {
        return Math.floor(Math.log2(t) + 1)
    }
    new Uint8Array(I.buffer);
    const S = document.getElementById("texture")
      , N = document.getElementById("texture-hd")
      , O = document.getElementById("viewport")
      , P = document.getElementById("input-resolution")
      , z = document.getElementById("input-auto-turn")
      , G = document.getElementById("input-wireframe")
      , Y = document.getElementById("input-wireframe-color")
      , W = document.getElementById("input-render-mode")
      , X = document.getElementById("input-background-color")
      , j = document.getElementById("input-background-color-enabled")
      , H = document.getElementById("input-background-transparent")
      , V = document.getElementById("input-shading")
      , K = document.getElementById("input-fov")
      , q = document.getElementById("hd-controls")
      , Q = document.getElementById("input-hd-steps")
      , Z = document.getElementById("input-hd-ambient")
      , J = document.getElementById("btn-show-controls")
      , $ = document.getElementById("input-gif-fps")
      , tt = document.getElementById("input-outline-size")
      , et = document.getElementById("input-outline-color")
      , rt = document.getElementById("input-watermark")
      , nt = document.getElementById("btn-record-gif")
      , it = document.getElementById("gif-status")
      , ot = document.getElementById("popup-controls")
      , at = document.getElementById("popup-image-options")
      , st = document.getElementById("stats");
    let lt = new Worker("worker.js")
      , ut = !1;
    lt.onmessage = t=>{
        let e = t.data;
        "gif" === e.type && (it.hidden = !0,
        function(t) {
            const e = `${ht.model.name}.gif`
              , r = new File([t],e,{
                type: "image/gif"
            })
              , n = URL.createObjectURL(r)
              , i = document.createElement("a");
            i.href = n,
            i.download = e,
            document.body.append(i),
            i.click(),
            i.remove(),
            URL.revokeObjectURL(n),
            console.log(`downloaded ${e} ${r.size / 1024}kb`)
        }(e.data)),
        ut || (ut = !0,
        nt.disabled = !1)
    }
    ;
    const ht = new class {
        constructor(t={}) {
            this.canvas = t.canvas,
            null == this.canvas && (this.canvas = document.createElement("canvas"));
            const e = this.gl = this.canvas.getContext("webgl", {
                antialias: !1,
                preserveDrawingBuffer: t.preserveDrawingBuffer ?? !1
            });
            e.enable(e.BLEND),
            e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
            this.cameraPosition = {
                x: 0,
                y: 0,
                z: 0
            },
            this.cameraRotation = {
                x: 0,
                y: 0,
                z: 0
            },
            this.cameraFOV = t.fov ?? 90,
            this.loaded = !1,
            this.model = null,
            this.shading = t.shading ?? !0,
            this.renderMode = t.renderMode ?? "texture",
            this.backgroundColor = null,
            this.outlineColor = [0, 0, 0, 1],
            this.outlineSize = 0,
            this._watermarkText = null,
            this._watermarkSize = null,
            this._watermarkBuffer = null,
            this._watermarkTriangleCount = 0,
            this.drawWireframe = t.drawWireframe ?? !1,
            this.wireframeXray = t.wireframeXray ?? !0,
            this.wireframeColor = t.wireframeColor ?? [1, 1, 1],
            this.tesselationCount = t.tesselationCount ?? 3,
            this.lightDirection = t.lightDirection ?? {
                x: 1,
                y: -1,
                z: 0
            },
            this.hdOptions = {
                shadingSteps: 4,
                shadingColor: [.1, .1, .1]
            },
            this._passes = [],
            this._colorIndexTex = this._createTexture(null, this.gl.LUMINANCE, this.gl.LUMINANCE, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), 16, 1),
            this._indexTex = null,
            this._fontTex = null,
            this.resetLightMap(),
            this._programTexture = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\t\tattribute vec3 normal;\n\t\tattribute vec2 uv;\n\n\t\tvarying highp vec2 v_uv;\n\t\tvarying highp vec3 v_normal;\n\n\t\tuniform mat4 mvp;\n\n\t\tvoid main() {\n\t\t\tv_normal = normal;\n\t\t\tv_uv = uv;\n\t\t\tgl_Position = mvp * vertex;\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\tvarying highp vec3 v_normal;\n\t\t\n\t\tuniform sampler2D indexTex;\n\t\tuniform sampler2D lightMap;\n\t\tuniform highp vec3 lightDir;\n\t\tuniform highp float lightMapOffset;\n\t\tuniform highp float lightMapGradient;\n\n\t\tvoid main() {\n\t\t\thighp float index = texture2D(indexTex, v_uv).r;\n\t\t\tif (index == 1.0) discard;\n\t\t\thighp float intensity = clamp(lightMapGradient * abs(dot(v_normal, lightDir)) + lightMapOffset, 0.0, 1.0);\n\t\t\tgl_FragColor = texture2D(lightMap, vec2(0.015625 + index * 15.9375 + mod(gl_FragCoord.x + gl_FragCoord.y, 2.0) * 0.03125, 1.0 - intensity));\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        uv: e.getAttribLocation("uv"),
                        normal: e.getAttribLocation("normal"),
                        indexTex: e.getUniformLocation("indexTex"),
                        lightMap: e.getUniformLocation("lightMap"),
                        lightDir: e.getUniformLocation("lightDir"),
                        mvp: e.getUniformLocation("mvp"),
                        lightMapOffset: e.getUniformLocation("lightMapOffset"),
                        lightMapGradient: e.getUniformLocation("lightMapGradient")
                    }
                }
            }(e),
            this._programUnlitTexture = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\t\tattribute vec2 uv;\n\n\t\tvarying highp vec2 v_uv;\n\n\t\tuniform mat4 mvp;\n\n\t\tvoid main() {\n\t\t\tv_uv = uv;\n\t\t\tgl_Position = mvp * vertex;\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\t\n\t\tuniform sampler2D indexTex;\n\t\tuniform sampler2D lightMap;\n\n\t\tvoid main() {\n\t\t\thighp float index = texture2D(indexTex, v_uv).r;\n\t\t\tif (index == 1.0) discard;\n\t\t\tgl_FragColor = texture2D(lightMap, vec2(0.015625 + index * 15.9375, 0.0));\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        uv: e.getAttribLocation("uv"),
                        mvp: e.getUniformLocation("mvp"),
                        indexTex: e.getUniformLocation("indexTex"),
                        lightMap: e.getUniformLocation("lightMap")
                    }
                }
            }(e),
            this._programHDTexture = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\t\tattribute vec3 normal;\n\t\tattribute vec2 uv;\n\n\t\tvarying highp vec2 v_uv;\n\t\tvarying highp vec3 v_normal;\n\n\t\tuniform mat4 mvp;\n\n\t\tvoid main() {\n\t\t\tv_uv = uv;\n\t\t\tv_normal = normal;\n\t\t\tgl_Position = mvp * vertex;\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\tvarying highp vec3 v_normal;\n\t\t\n\t\tuniform highp float lightSteps;\n\t\tuniform sampler2D mainTex;\n\t\tuniform highp vec3 lightDir;\n\t\tuniform highp vec3 lightAmbient;\n\n\t\tvoid main() {\n\t\t\thighp vec4 col = texture2D(mainTex, v_uv);\n\t\t\tif (col.a != 1.0) discard;\n\t\t\thighp float pixel = mod(gl_FragCoord.x + gl_FragCoord.y, 2.0);\n\t\t\thighp float intensity = abs(dot(v_normal, lightDir)) * 2.2 - 0.2;\n\t\t\tintensity = floor(intensity * (lightSteps + 0.5) + pixel/2.0) / lightSteps;\n\t\t\tintensity = clamp(intensity, 0.0, 1.0);\n\t\t\tgl_FragColor = vec4(mix(col.rgb * lightAmbient, col.rgb, intensity), 1.0);\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        uv: e.getAttribLocation("uv"),
                        normal: e.getAttribLocation("normal"),
                        mvp: e.getUniformLocation("mvp"),
                        lightSteps: e.getUniformLocation("lightSteps"),
                        lightAmbient: e.getUniformLocation("lightAmbient"),
                        mainTex: e.getUniformLocation("mainTex"),
                        lightDir: e.getUniformLocation("lightDir")
                    }
                }
            }(e),
            this._wireframe = null,
            this._programWireframe = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\n\t\tuniform mat4 mvp;\n\n\t\tvoid main() {\n\t\t\tgl_Position = mvp * vertex;\n\t\t}\n\t","\n\t\tuniform lowp vec4 color;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = color;\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        mvp: e.getUniformLocation("mvp"),
                        color: e.getUniformLocation("color")
                    }
                }
            }(e),
            this._programText = function(t) {
                const e = new d(t,"\n\t\tattribute vec2 vertex;\n\t\tattribute vec2 uv;\n\n\t\tvarying highp vec2 v_uv;\n\n\t\tuniform highp vec4 data;\n\n\t\tvoid main() {\n\t\t\tv_uv = uv;\n\t\t\tgl_Position = vec4((data.xy + vertex) * data.zw, 0.0, 1.0);\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\t\n\t\tuniform sampler2D mainTex;\n\t\tuniform lowp vec4 color;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(mainTex, v_uv) * color;\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        uv: e.getAttribLocation("uv"),
                        data: e.getUniformLocation("data"),
                        mainTex: e.getUniformLocation("mainTex"),
                        color: e.getUniformLocation("color")
                    }
                }
            }(e),
            this._programFramebuffer = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\n\t\tvarying highp vec2 v_uv;\n\n\t\tvoid main() {\n\t\t\tv_uv = 0.5 + vertex.xy * 0.5;\n\t\t\tgl_Position = vertex;\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\t\n\t\tuniform sampler2D mainTex;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(mainTex, v_uv);\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        mainTex: e.getUniformLocation("mainTex")
                    }
                }
            }(e),
            this._programOutline = function(t) {
                const e = new d(t,"\n\t\tattribute vec4 vertex;\n\n\t\tvarying highp vec2 v_uv;\n\n\t\tvoid main() {\n\t\t\tv_uv = 0.5 + vertex.xy * 0.5;\n\t\t\tgl_Position = vertex;\n\t\t}\n\t","\n\t\tvarying highp vec2 v_uv;\n\t\t\n\t\tuniform sampler2D mainTex;\n\t\tuniform highp vec2 pixel;\n\t\tuniform lowp vec4 outlineColor;\n\n\t\tvoid main() {\n\t\t\tlowp float a = 1.0 - texture2D(mainTex, v_uv).a;\n\t\t\tlowp float b = texture2D(mainTex, v_uv + vec2(pixel.x, 0.0)).a + texture2D(mainTex, v_uv - vec2(pixel.x, 0.0)).a + texture2D(mainTex, v_uv + vec2(0.0, pixel.y)).a + texture2D(mainTex, v_uv - vec2(0.0, pixel.y)).a;\n\t\t\tgl_FragColor = mix(\n\t\t\t\tmix(\n\t\t\t\t\ttexture2D(mainTex, v_uv),\n\t\t\t\t\tvec4(0.0, 0.0, 0.0, 0.0),\n\t\t\t\t\ta\n\t\t\t\t),\n\t\t\t\toutlineColor,\n\t\t\t\tmin(1.0, a * b)\n\t\t\t);\n\t\t}\n\t");
                return {
                    program: e,
                    locations: {
                        mainTex: e.getUniformLocation("mainTex"),
                        pixel: e.getUniformLocation("pixel"),
                        outlineColor: e.getUniformLocation("outlineColor")
                    }
                }
            }(e),
            this._depthBuffer = e.createRenderbuffer(),
            this._frameBuffer = e.createFramebuffer(),
            this._frameBuffer2 = e.createFramebuffer(),
            this._framebufferCurrent = null,
            this._screenQuads = e.createBuffer(),
            e.bindBuffer(e.ARRAY_BUFFER, this._screenQuads),
            e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), e.STATIC_DRAW);
            const r = t.resolution;
            null == r ? this.setResolution(128, 128, 1) : this.setResolution(r.width, r.height, r.scale ?? 1),
            e.enable(e.DEPTH_TEST),
            e.depthFunc(e.LEQUAL),
            e.pixelStorei(e.UNPACK_ALIGNMENT, 1)
        }
        setResolution(t, e, r=1) {
            if (null != this._resolution && this._resolution[0] === t && this._resolution[1] === e && this._resolution[2] === r)
                return;
            this._resolution = [t, e, r, 0, 0];
            const n = t * r
              , i = e * r
              , o = this.gl
              , a = this.canvas;
            a.width = n,
            a.height = i,
            this._frameBufferTex = this._createTexture(this._frameBufferTex, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, null, t, e),
            this._frameBufferTex2 = this._createTexture(this._frameBufferTex2, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, null, t, e),
            o.bindRenderbuffer(o.RENDERBUFFER, this._depthBuffer),
            o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_COMPONENT16, t, e),
            o.bindFramebuffer(o.FRAMEBUFFER, this._frameBuffer),
            o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, this._frameBufferTex, 0),
            o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_ATTACHMENT, o.RENDERBUFFER, this._depthBuffer),
            o.bindFramebuffer(o.FRAMEBUFFER, this._frameBuffer2),
            o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, this._frameBufferTex2, 0),
            a.style.width = `${n}px`,
            a.style.height = `${i}px`
        }
        getResolution() {
            return {
                width: this._resolution[0],
                height: this._resolution[1],
                scale: this._resolution[2]
            }
        }
        get modelTexture() {
            return this.getModelTexture()
        }
        getModelTexture() {
            return this.model.textureAsImage(this._lightMapColors)
        }
        resetLightMap() {
            null != this._lightMapTex && this.gl.deleteTexture(this._lightMapTex),
            this._lightMapTex = this._createTexture(null, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, m()),
            this._lightMapColors = n.slice()
        }
        getPalette() {
            let t = this._lightMapColors.map((t=>[t[0], t[1], t[2], 255]));
            if (this.drawWireframe) {
                const e = _(this.wireframeColor);
                4 != e.length && e.push(255),
                t.push(e)
            }
            if (this.outlineSize >= 1) {
                const e = _(this.outlineColor);
                4 != e.length && e.push(255),
                t.push(e)
            }
            if (null != this.backgroundColor) {
                const e = _(this.backgroundColor);
                4 != e.length && e.push(255),
                t.push(e)
            }
            return t
        }
        getRenderedBackgroundColor() {
            if (null == this.backgroundColor) {
                const t = this._lightMapColors[this.model.backgroundIndex];
                return [t[0], t[1], t[2], 255]
            }
            return [Math.floor(255.999 * this.backgroundColor[0]), Math.floor(255.999 * this.backgroundColor[1]), Math.floor(255.999 * this.backgroundColor[2]), this.backgroundColor.length <= 3 ? 255 : Math.floor(255.999 * this.backgroundColor[3])]
        }
        _getLightMapColors(t) {
            const e = t.data
              , r = Array(16)
              , n = new Set;
            for (let t = 0; t < 16; t++) {
                let i = 8 * t
                  , o = e[i]
                  , a = e[i + 1]
                  , s = e[i + 2]
                  , l = [o, a, s];
                r[t] = l,
                n.add(o + 256 * a + 65536 * s)
            }
            for (let t = 0; t < e.length; t += 4) {
                let i = e[t]
                  , o = e[t + 1]
                  , a = e[t + 2]
                  , s = i + 256 * o + 65536 * a;
                n.has(s) || (n.add(s),
                r.push([i, o, a]))
            }
            return r
        }
        setLightMap(t) {
            null != this._lightMapTex && this.gl.deleteTexture(this._lightMapTex),
            this._lightMapColors = this._getLightMapColors(t),
            this._lightMapTex = this._createTexture(null, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, t)
        }
        _freeMainTexture() {
            null != this._indexTex && (this.gl.deleteTexture(this._indexTex),
            this._indexTex = null)
        }
        setIndexTexture(t, e, r) {
            let i, o;
            if (t instanceof ImageData) {
                i = t;
                const e = i.width * i.height;
                o = new Uint8Array(e);
                const r = new Map(n.map((([t,e,r],n)=>[4278190080 | r << 16 | e << 8 | t, this.model.alphaIndex === n ? 255 : n])))
                  , a = new Int32Array(t.data.buffer);
                for (let t = 0; t < e; t++) {
                    const e = a[t];
                    o[t] = r.get(e) ?? 0
                }
            } else {
                o = t instanceof Uint8Array ? t : new Uint8Array(t),
                i = new ImageData(e,r);
                const a = i.data;
                let s = 0;
                for (let t = 0; t < r; t++)
                    for (let t = 0; t < e; t++) {
                        const [t,e,r] = n[s] ?? n[0];
                        a[s++] = t,
                        a[s++] = e,
                        a[s++] = r,
                        a[s++] = 255
                    }
            }
            this._freeMainTexture(),
            this._indexTex = this._createTexture(this._indexTex, this.gl.LUMINANCE, this.gl.LUMINANCE, this.gl.UNSIGNED_BYTE, o, i.width, i.height)
        }
        setHDTexture(t) {
            null != t ? this._hdTex = this._createTexture(this._hdTex, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, t) : this.removeHDTexture()
        }
        hasHDTexture() {
            return null != this._hdTex
        }
        removeHDTexture() {
            null != this._hdTex && (this.gl.deleteTexture(this._hdTex),
            this._hdTex = null)
        }
        getWatermark() {
            return this._watermarkText
        }
        setWatermark(t) {
            if (null != t && 0 !== t.trim().length || (t = null),
            t !== this._watermarkText && (this._watermarkText = t,
            t)) {
                let e = []
                  , r = {
                    "▮": 16,
                    "■": 17,
                    "□": 18,
                    "⁙": 19,
                    "⁘": 20,
                    "‖": 21,
                    "◀": 22,
                    "▶": 23,
                    "「": 24,
                    "」": 25,
                    "¥": 26,
                    "•": 27,
                    "、": 28,
                    "。": 29,
                    "゛": 30,
                    "゜": 31,
                    "○": 127,
                    "█": 128,
                    "▒": 129,
                    "🐱": 130,
                    "⬇️": 131,
                    "░": 132,
                    "✽": 133,
                    "●": 134,
                    "♥": 135,
                    "❤": 135,
                    "☉": 136,
                    "웃": 137,
                    "🧍‍♀️": 137,
                    "🧍‍♂️": 137,
                    "⌂": 138,
                    "🏠": 138,
                    "⬅️": 139,
                    "🙂": 140,
                    "😐": 140,
                    "♪": 141,
                    "🎵": 141,
                    "🅾️": 142,
                    "◆": 143,
                    "…": 144,
                    "➡️": 145,
                    "★": 146,
                    "⧗": 147,
                    "⏳": 147,
                    "⬆️": 148,
                    "ˇ": 149,
                    "∧": 150,
                    "❎": 151,
                    "▤": 152,
                    "▥": 153,
                    "ー": 254
                };
                for (let n of t) {
                    let t = 32;
                    if (r.hasOwnProperty(n))
                        t = r[n];
                    else if (1 === n.length) {
                        let r = n.charCodeAt(0);
                        r >= 65 && r <= 90 ? t = r - 65 + 97 : r >= 97 && r <= 122 ? t = r - 97 + 65 : r < 128 ? t = r : r >= 65280 && r <= 65374 ? t = r - 65280 + 32 : r >= 12352 && r <= 12543 && (t = 154,
                        r >= 12448 && (r -= 96,
                        t = 204),
                        r <= 12362 ? t += Math.floor((r - 12353) / 2) : 12387 === r ? t += 46 : r <= 12393 ? (r > 12387 && r--,
                        r -= 12363,
                        t += 5 + Math.floor(r / 2),
                        r % 2 == 1 && (e.push(t),
                        t = 30)) : r <= 12398 ? t += r - 12394 + 20 : r <= 12413 ? (r -= 12399,
                        t += 25 + Math.floor(r / 3),
                        r % 3 == 1 && (e.push(t),
                        t = 30),
                        r % 3 == 2 && (e.push(t),
                        t = 31)) : r <= 12418 ? t += r - 12414 + 30 : r <= 12424 ? (r -= 12419,
                        t += 35 + Math.floor(r / 2),
                        r % 2 == 0 && (t += 12)) : r <= 12429 ? t += r - 12425 + 38 : r <= 12431 ? t += 43 : 12434 === r ? t += 44 : 12435 === r && (t += 45))
                    }
                    e.push(t)
                }
                let n = new Float32Array(24 * e.length)
                  , i = 0
                  , o = 0
                  , a = 0
                  , s = 0
                  , l = (t,e,r,o)=>{
                    n[i++] = t,
                    n[i++] = e,
                    n[i++] = r,
                    n[i++] = o
                }
                ;
                for (let t = 0; t < e.length; t++) {
                    let r = e[t]
                      , n = 35 == r ? 6 : r < 128 ? 4 : 8
                      , i = 5
                      , u = o + n
                      , h = a + i
                      , c = r % 16 / 16
                      , f = Math.floor(r / 16) / 16
                      , d = c + n / 128
                      , m = f + i / 128;
                    l(o, a, c, f),
                    l(o, h, c, m),
                    l(u, h, d, m),
                    l(o, a, c, f),
                    l(u, h, d, m),
                    l(u, a, d, f),
                    o += n,
                    s += n,
                    0 == t && s--
                }
                const u = this.gl;
                null == this._watermarkBuffer && (this._watermarkBuffer = u.createBuffer()),
                u.bindBuffer(u.ARRAY_BUFFER, this._watermarkBuffer),
                u.bufferData(u.ARRAY_BUFFER, n, u.STATIC_DRAW),
                this._watermarkSize = [s, 5],
                this._watermarkTriangleCount = 6 * e.length
            }
        }
        _createTexture(t, e, r, n, i, o, a) {
            const s = this.gl;
            return null == t && (t = s.createTexture()),
            s.bindTexture(s.TEXTURE_2D, t),
            null == o ? s.texImage2D(s.TEXTURE_2D, 0, e, r, n, i) : s.texImage2D(s.TEXTURE_2D, 0, e, o, a, 0, r, n, i),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.NEAREST),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.NEAREST),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE),
            t
        }
        async load(t) {
            if ("string" == typeof t)
                t.startsWith("picocad;") ? this._loadString(t) : await this._loadUrl(t);
            else if (t instanceof URL)
                await this._loadUrl(t);
            else if (t instanceof Blob)
                await this._loadBlob(t);
            else {
                if (!(t instanceof i))
                    throw TypeError();
                this._loadModel(t)
            }
            return this.model
        }
        async _loadUrl(t) {
            const e = await fetch(String(t));
            if (!e.ok)
                throw Error(`${e.status}: ${e.statusText}`);
            this._loadString(await e.text())
        }
        _loadBlob(t) {
            return new Promise(((e,r)=>{
                if (!t.type.startsWith("text"))
                    throw Error("picoCAD file must be a text file");
                const n = new FileReader;
                n.onload = ()=>{
                    e(this._loadString(n.result))
                }
                ,
                n.onerror = ()=>{
                    r(n.error)
                }
                ,
                n.readAsText(t)
            }
            ))
        }
        _loadString(t) {
            this._loadModel(x(t))
        }
        _loadModel(t) {
            const e = this.gl;
            if (this.loaded = !1,
            this.model = null,
            this.loaded) {
                for (const t of this._passes)
                    t.free();
                this._passes = [],
                this._wireframe.free(),
                e.deleteTexture(this._indexTex),
                this._indexTex = null
            }
            const r = u(e, t, this.tesselationCount);
            this._passes = r.passes,
            this._wireframe = r.wireframe,
            this._indexTex = this._createTexture(this._indexTex, e.LUMINANCE, e.LUMINANCE, e.UNSIGNED_BYTE, new Uint8Array(r.textureIndices), 128, 128),
            this.loaded = !0,
            this.model = t
        }
        draw() {
            const r = "none" !== this.renderMode
              , n = "color" === this.renderMode;
            if (!this.loaded || !r && !this.drawWireframe)
                return;
            const i = this.gl
              , o = this.canvas;
            i.bindFramebuffer(i.FRAMEBUFFER, this._frameBuffer),
            i.viewport(0, 0, this._resolution[0], this._resolution[1]),
            i.clearColor(0, 0, 0, 0),
            i.clearDepth(1),
            i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT);
            const a = (s = new t(16),
            t != Float32Array && (s[1] = 0,
            s[2] = 0,
            s[3] = 0,
            s[4] = 0,
            s[6] = 0,
            s[7] = 0,
            s[8] = 0,
            s[9] = 0,
            s[11] = 0,
            s[12] = 0,
            s[13] = 0,
            s[14] = 0),
            s[0] = 1,
            s[5] = 1,
            s[10] = 1,
            s[15] = 1,
            s);
            var s;
            e(a, this.cameraFOV * Math.PI / 180, this._resolution[0] / this._resolution[1], .1, 400),
            function(t, e, r) {
                var n = Math.sin(r)
                  , i = Math.cos(r)
                  , o = e[4]
                  , a = e[5]
                  , s = e[6]
                  , l = e[7]
                  , u = e[8]
                  , h = e[9]
                  , c = e[10]
                  , f = e[11];
                e !== t && (t[0] = e[0],
                t[1] = e[1],
                t[2] = e[2],
                t[3] = e[3],
                t[12] = e[12],
                t[13] = e[13],
                t[14] = e[14],
                t[15] = e[15]),
                t[4] = o * i + u * n,
                t[5] = a * i + h * n,
                t[6] = s * i + c * n,
                t[7] = l * i + f * n,
                t[8] = u * i - o * n,
                t[9] = h * i - a * n,
                t[10] = c * i - s * n,
                t[11] = f * i - l * n
            }(a, a, this.cameraRotation.x),
            function(t, e, r) {
                var n = Math.sin(r)
                  , i = Math.cos(r)
                  , o = e[0]
                  , a = e[1]
                  , s = e[2]
                  , l = e[3]
                  , u = e[8]
                  , h = e[9]
                  , c = e[10]
                  , f = e[11];
                e !== t && (t[4] = e[4],
                t[5] = e[5],
                t[6] = e[6],
                t[7] = e[7],
                t[12] = e[12],
                t[13] = e[13],
                t[14] = e[14],
                t[15] = e[15]),
                t[0] = o * i - u * n,
                t[1] = a * i - h * n,
                t[2] = s * i - c * n,
                t[3] = l * i - f * n,
                t[8] = o * n + u * i,
                t[9] = a * n + h * i,
                t[10] = s * n + c * i,
                t[11] = l * n + f * i
            }(a, a, this.cameraRotation.y),
            function(t, e, r) {
                var n = Math.sin(r)
                  , i = Math.cos(r)
                  , o = e[0]
                  , a = e[1]
                  , s = e[2]
                  , l = e[3]
                  , u = e[4]
                  , h = e[5]
                  , c = e[6]
                  , f = e[7];
                e !== t && (t[8] = e[8],
                t[9] = e[9],
                t[10] = e[10],
                t[11] = e[11],
                t[12] = e[12],
                t[13] = e[13],
                t[14] = e[14],
                t[15] = e[15]),
                t[0] = o * i + u * n,
                t[1] = a * i + h * n,
                t[2] = s * i + c * n,
                t[3] = l * i + f * n,
                t[4] = u * i - o * n,
                t[5] = h * i - a * n,
                t[6] = c * i - s * n,
                t[7] = f * i - l * n
            }(a, a, this.cameraRotation.z),
            function(t, e, r) {
                var n, i, o, a, s, l, u, h, c, f, d, m, g = r[0], p = r[1], x = r[2];
                e === t ? (t[12] = e[0] * g + e[4] * p + e[8] * x + e[12],
                t[13] = e[1] * g + e[5] * p + e[9] * x + e[13],
                t[14] = e[2] * g + e[6] * p + e[10] * x + e[14],
                t[15] = e[3] * g + e[7] * p + e[11] * x + e[15]) : (n = e[0],
                i = e[1],
                o = e[2],
                a = e[3],
                s = e[4],
                l = e[5],
                u = e[6],
                h = e[7],
                c = e[8],
                f = e[9],
                d = e[10],
                m = e[11],
                t[0] = n,
                t[1] = i,
                t[2] = o,
                t[3] = a,
                t[4] = s,
                t[5] = l,
                t[6] = u,
                t[7] = h,
                t[8] = c,
                t[9] = f,
                t[10] = d,
                t[11] = m,
                t[12] = n * g + s * p + c * x + e[12],
                t[13] = i * g + l * p + f * x + e[13],
                t[14] = o * g + u * p + d * x + e[14],
                t[15] = a * g + h * p + m * x + e[15])
            }(a, a, [this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z]);
            const l = function(t) {
                let e = Math.hypot(t.x, t.y, t.z);
                0 === e && (e = 1);
                return {
                    x: t.x / e,
                    y: t.y / e,
                    z: t.z / e
                }
            }(this.lightDirection);
            if (r)
                for (const t of this._passes) {
                    if (t.clearDepth && i.clear(i.DEPTH_BUFFER_BIT),
                    t.isEmpty())
                        continue;
                    const e = n || !t.texture
                      , r = null == this._hdTex || e ? this.shading && t.shading ? this._programTexture : this._programUnlitTexture : this._programHDTexture;
                    r.program.use(),
                    i.uniformMatrix4fv(r.locations.mvp, !1, a),
                    i.bindBuffer(i.ARRAY_BUFFER, t.vertexBuffer),
                    i.vertexAttribPointer(r.program.vertexLocation, 3, i.FLOAT, !1, 0, 0),
                    i.enableVertexAttribArray(r.program.vertexLocation),
                    i.bindBuffer(i.ARRAY_BUFFER, e ? t.colorUVBuffer : t.uvBuffer),
                    i.vertexAttribPointer(r.locations.uv, 2, i.FLOAT, !1, 0, 0),
                    i.enableVertexAttribArray(r.locations.uv),
                    r === this._programUnlitTexture ? (i.activeTexture(i.TEXTURE0),
                    i.bindTexture(i.TEXTURE_2D, e ? this._colorIndexTex : this._indexTex),
                    i.uniform1i(r.locations.indexTex, 0),
                    i.activeTexture(i.TEXTURE1),
                    i.bindTexture(i.TEXTURE_2D, this._lightMapTex),
                    i.uniform1i(r.locations.lightMap, 1)) : r === this._programTexture ? (i.activeTexture(i.TEXTURE0),
                    i.bindTexture(i.TEXTURE_2D, e ? this._colorIndexTex : this._indexTex),
                    i.uniform1i(r.locations.indexTex, 0),
                    i.activeTexture(i.TEXTURE1),
                    i.bindTexture(i.TEXTURE_2D, this._lightMapTex),
                    i.uniform1i(r.locations.lightMap, 1),
                    i.uniform1f(r.locations.lightMapOffset, -.3571428571428572),
                    i.uniform1f(r.locations.lightMapGradient, 2.857142857142857),
                    i.uniform3f(r.locations.lightDir, l.x, l.y, l.z),
                    i.bindBuffer(i.ARRAY_BUFFER, t.normalBuffer),
                    i.vertexAttribPointer(r.locations.normal, 3, i.FLOAT, !1, 0, 0),
                    i.enableVertexAttribArray(r.locations.normal)) : r === this._programHDTexture && (i.activeTexture(i.TEXTURE0),
                    i.bindTexture(i.TEXTURE_2D, this._hdTex),
                    i.uniform1i(r.locations.mainTex, 0),
                    i.uniform3f(r.locations.lightDir, l.x, l.y, l.z),
                    i.uniform1f(r.locations.lightSteps, this.hdOptions.shadingSteps),
                    i.uniform3f(r.locations.lightAmbient, this.hdOptions.shadingColor[0], this.hdOptions.shadingColor[1], this.hdOptions.shadingColor[2]),
                    i.bindBuffer(i.ARRAY_BUFFER, t.normalBuffer),
                    i.vertexAttribPointer(r.locations.normal, 3, i.FLOAT, !1, 0, 0),
                    i.enableVertexAttribArray(r.locations.normal)),
                    t.cull ? i.enable(i.CULL_FACE) : i.disable(i.CULL_FACE),
                    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.triangleBuffer),
                    i.drawElements(i.TRIANGLES, t.vertexCount, i.UNSIGNED_SHORT, 0),
                    i.disableVertexAttribArray(r.program.vertexLocation),
                    i.disableVertexAttribArray(r.locations.uv),
                    r === this._programTexture && i.disableVertexAttribArray(r.locations.normal)
                }
            this.drawWireframe && (r && this.wireframeXray && i.clear(i.DEPTH_BUFFER_BIT),
            this._programWireframe.program.use(),
            i.uniformMatrix4fv(this._programWireframe.locations.mvp, !1, a),
            i.uniform4fv(this._programWireframe.locations.color, [this.wireframeColor[0], this.wireframeColor[1], this.wireframeColor[2], 1]),
            i.bindBuffer(i.ARRAY_BUFFER, this._wireframe.vertexBuffer),
            i.vertexAttribPointer(this._programWireframe.program.vertexLocation, 3, i.FLOAT, !1, 0, 0),
            i.enableVertexAttribArray(this._programWireframe.program.vertexLocation),
            i.drawArrays(i.LINES, 0, this._wireframe.vertexCount));
            let u = this._frameBufferTex
              , h = this.outlineSize;
            if (h > 0 && (i.bindFramebuffer(i.FRAMEBUFFER, this._frameBuffer2),
            i.clear(i.COLOR_BUFFER_BIT)),
            h > 0) {
                let t = this._programOutline;
                t.program.use(),
                i.uniform2f(t.locations.pixel, 1 / this._resolution[0], 1 / this._resolution[1]),
                i.uniform4f(t.locations.outlineColor, this.outlineColor[0], this.outlineColor[1], this.outlineColor[2], this.outlineColor[3] ?? 1),
                i.bindBuffer(i.ARRAY_BUFFER, this._screenQuads),
                i.vertexAttribPointer(t.program.vertexLocation, 2, i.FLOAT, !1, 0, 0),
                i.enableVertexAttribArray(t.program.vertexLocation);
                for (let e = 0; e < h; e++) {
                    let e;
                    u === this._frameBufferTex ? (i.bindFramebuffer(i.FRAMEBUFFER, this._frameBuffer2),
                    e = this._frameBufferTex2) : (i.bindFramebuffer(i.FRAMEBUFFER, this._frameBuffer),
                    e = this._frameBufferTex),
                    i.activeTexture(i.TEXTURE0),
                    i.bindTexture(i.TEXTURE_2D, u),
                    i.uniform1i(t.locations.mainTex, 0),
                    i.drawArrays(i.TRIANGLES, 0, 6),
                    u = e
                }
            }
            if (this._framebufferCurrent = u === this._frameBufferTex ? this._frameBuffer : this._frameBuffer2,
            this._watermarkText) {
                if (!this._fontTex) {
                    let t = y();
                    t && (this._fontTex = this._createTexture(this._fontTex, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t))
                }
                if (this._fontTex) {
                    let t = this._programText;
                    t.program.use(),
                    i.bindBuffer(i.ARRAY_BUFFER, this._watermarkBuffer),
                    i.vertexAttribPointer(t.program.vertexLocation, 2, i.FLOAT, !1, 16, 0),
                    i.enableVertexAttribArray(t.program.vertexLocation),
                    i.vertexAttribPointer(t.locations.uv, 2, i.FLOAT, !1, 16, 8),
                    i.enableVertexAttribArray(t.locations.uv);
                    let e, r = 2;
                    i.uniform4f(t.locations.data, this._resolution[0] / 2 - this._watermarkSize[0] - r, this._resolution[1] / 2 - this._watermarkSize[1] - r, 2 / this._resolution[0], -2 / this._resolution[1]);
                    let n = this.backgroundColor;
                    if (n) {
                        let t = T(n[0], n[1], n[2]) > .5
                          , r = null;
                        for (let n of this._lightMapColors) {
                            let i = T(n[0] / 255, n[1] / 255, n[2] / 255);
                            t && (i = 1 - i),
                            (!e || i > r) && (e = n,
                            r = i)
                        }
                    } else
                        e = this._lightMapColors[(this.model.backgroundIndex + 8) % 16];
                    i.uniform4f(t.locations.color, e[0] / 255, e[1] / 255, e[2] / 255, 1),
                    i.activeTexture(i.TEXTURE0),
                    i.bindTexture(i.TEXTURE_2D, this._fontTex),
                    i.uniform1i(t.locations.mainTex, 0),
                    i.drawArrays(i.TRIANGLES, 0, this._watermarkTriangleCount)
                }
            }
            if (i.bindFramebuffer(i.FRAMEBUFFER, null),
            i.viewport(0, 0, o.width, o.height),
            null == this.backgroundColor) {
                const t = this._lightMapColors[this.model.backgroundIndex];
                i.clearColor(t[0] / 255, t[1] / 255, t[2] / 255, 1)
            } else
                i.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3] ?? 1);
            i.clear(i.COLOR_BUFFER_BIT);
            let c = this._programFramebuffer;
            c.program.use(),
            i.activeTexture(i.TEXTURE0),
            i.bindTexture(i.TEXTURE_2D, u),
            i.uniform1i(c.locations.mainTex, 0),
            i.bindBuffer(i.ARRAY_BUFFER, this._screenQuads),
            i.vertexAttribPointer(c.program.vertexLocation, 2, i.FLOAT, !1, 0, 0),
            i.enableVertexAttribArray(c.program.vertexLocation),
            i.drawArrays(i.TRIANGLES, 0, 6)
        }
        startDrawLoop(t, e) {
            let r = performance.now()
              , n = r;
            const i = ()=>{
                if (null != t) {
                    const e = performance.now();
                    t((e - r) / 1e3),
                    r = e
                }
                if (this.draw(),
                null != e) {
                    const t = performance.now();
                    e((t - n) / 1e3),
                    n = t
                }
                this._rafID = requestAnimationFrame(i)
            }
            ;
            this._rafID = requestAnimationFrame(i)
        }
        stopDrawLoop() {
            null != this._rafID && cancelAnimationFrame(this._rafID)
        }
        getCameraRight() {
            return this._transformDirection(1, 0, 0)
        }
        getCameraUp() {
            return this._transformDirection(0, -1, 0)
        }
        getCameraForward() {
            return this._transformDirection(0, 0, -1)
        }
        setLightDirectionFromCamera() {
            const t = this.getCameraUp()
              , e = this.getCameraForward();
            this.lightDirection = {
                x: e.x - .4 * t.x,
                y: e.y - .4 * t.y,
                z: e.z - .4 * t.z
            }
        }
        getTextureColorCount(t=!1) {
            const e = Array(16).fill(!1);
            let r = 0;
            for (const t of this.model.texture)
                e[t] || (e[t] = !0,
                r++);
            return r
        }
        getTriangleCount() {
            let t = 0;
            for (const e of this._passes)
                t += Math.floor(e.vertexCount / 3);
            return t
        }
        getDrawCallCount() {
            let t = 1;
            for (const e of this._passes)
                e.isEmpty() || t++;
            return this.drawWireframe && t++,
            t += this.outlineSize,
            t
        }
        _transformDirection(t, e, n) {
            const i = r();
            !function(t, e, r, n) {
                t[0] = e,
                t[1] = r,
                t[2] = n
            }(i, t, e, n);
            const o = ((a = r())[0] = 0,
            a[1] = 0,
            a[2] = 0,
            a);
            var a;
            return function(t, e, r, n) {
                var i = []
                  , o = [];
                i[0] = e[0] - r[0],
                i[1] = e[1] - r[1],
                i[2] = e[2] - r[2],
                o[0] = i[0],
                o[1] = i[1] * Math.cos(n) - i[2] * Math.sin(n),
                o[2] = i[1] * Math.sin(n) + i[2] * Math.cos(n),
                t[0] = o[0] + r[0],
                t[1] = o[1] + r[1],
                t[2] = o[2] + r[2]
            }(i, i, o, Math.PI + this.cameraRotation.x),
            function(t, e, r, n) {
                var i = []
                  , o = [];
                i[0] = e[0] - r[0],
                i[1] = e[1] - r[1],
                i[2] = e[2] - r[2],
                o[0] = i[2] * Math.sin(n) + i[0] * Math.cos(n),
                o[1] = i[1],
                o[2] = i[2] * Math.cos(n) - i[0] * Math.sin(n),
                t[0] = o[0] + r[0],
                t[1] = o[1] + r[1],
                t[2] = o[2] + r[2]
            }(i, i, o, this.cameraRotation.y),
            function(t, e, r, n) {
                var i = []
                  , o = [];
                i[0] = e[0] - r[0],
                i[1] = e[1] - r[1],
                i[2] = e[2] - r[2],
                o[0] = i[0] * Math.cos(n) - i[1] * Math.sin(n),
                o[1] = i[0] * Math.sin(n) + i[1] * Math.cos(n),
                o[2] = i[2],
                t[0] = o[0] + r[0],
                t[1] = o[1] + r[1],
                t[2] = o[2] + r[2]
            }(i, i, o, Math.PI + this.cameraRotation.z),
            {
                x: i[0],
                y: i[1],
                z: i[2]
            }
        }
        setTurntableCamera(t, e, r, n={
            x: 0,
            y: 1.5,
            z: 0
        }) {
            const i = Math.PI - e;
            r = -r,
            this.cameraPosition = {
                x: t * Math.cos(r) * Math.sin(i) - n.x,
                y: t * Math.sin(r) - n.y,
                z: t * Math.cos(r) * Math.cos(i) - n.z
            },
            this.cameraRotation = {
                y: e,
                x: -r,
                z: 0
            }
        }
        getPixels() {
            const t = this.gl
              , [e,r] = this._resolution
              , n = new Uint8Array(4 * (e * r));
            return t.bindFramebuffer(t.FRAMEBUFFER, this._framebufferCurrent),
            t.readPixels(0, 0, e, r, t.RGBA, t.UNSIGNED_BYTE, n),
            t.bindFramebuffer(t.FRAMEBUFFER, null),
            n
        }
        getPixelIndices(t=1) {
            const e = this.gl
              , [r,n] = this._resolution
              , i = r * n
              , o = r * t
              , a = o * t
              , s = t * t;
            t = Math.max(1, Math.floor(t));
            const l = new Uint8Array(4 * i);
            e.bindFramebuffer(e.FRAMEBUFFER, this._framebufferCurrent),
            e.readPixels(0, 0, r, n, e.RGBA, e.UNSIGNED_BYTE, l),
            e.bindFramebuffer(e.FRAMEBUFFER, null);
            const u = this.getPalette()
              , h = new Map(u.map(((t,e)=>[v(t), e])));
            h.set(0, this.backgroundColor ? u.length - 1 : this.model.backgroundIndex);
            const c = new Uint32Array(l.buffer)
              , f = new Uint8Array(i * s);
            let d = i - r
              , m = 0;
            for (let e = 0; e < n; e++) {
                let e = d
                  , n = m;
                for (let i = 0; i < r; i++) {
                    const r = c[e]
                      , i = h.get(r) ?? 0;
                    if (1 === t)
                        f[n] = i;
                    else {
                        let e = n;
                        for (let r = 0; r < t; r++) {
                            for (let r = 0; r < t; r++)
                                f[e + r] = i;
                            e += o
                        }
                    }
                    n += t,
                    e++
                }
                d -= r,
                m += a
            }
            return f
        }
        free() {
            const t = this.gl;
            this.stopDrawLoop();
            for (const t of this._passes)
                t.free();
            this._passes = [],
            t.deleteTexture(this._lightMapTex),
            t.deleteTexture(this._indexTex),
            this._lightMapTex = null,
            this._indexTex = null,
            this._programTexture.program.free(),
            this._programWireframe.program.free(),
            this._programTexture = null,
            this._programWireframe = null,
            t.deleteFramebuffer(this._frameBuffer),
            t.deleteFramebuffer(this._frameBuffer2),
            t.deleteTexture(this._frameBufferTex),
            t.deleteTexture(this._frameBufferTex2),
            t.deleteBuffer(this._screenQuads),
            t.deleteRenderbuffer(this._depthBuffer),
            this._programFramebuffer.program.free(),
            this._frameBuffer = null,
            this._frameBuffer2 = null,
            this._framebufferCurrent = null,
            this._frameBufferTex = null,
            this._frameBufferTex2 = null,
            this._screenQuads = null,
            this._depthBuffer = null,
            this._programFramebuffer = null,
            this._programText.program.free(),
            this._watermarkBuffer && (t.deleteBuffer(this._watermarkBuffer),
            this._watermarkBuffer = null),
            this._fontTex && (t.deleteTexture(this._fontTex),
            this._fontTex = null)
        }
    }
    ({
        canvas: O
    });
    window.viewer = ht;
    let ct = -Math.PI / 2
      , ft = .2
      , dt = 12
      , mt = .75
      , gt = {
        x: 0,
        y: 1.5,
        z: 0
    }
      , pt = !0
      , xt = 0;
    async function vt(t, e=!0) {
        const r = await ht.load(t);
        window.model = r,
        console.log(`=== load "${r.name}" ===`),
        O.classList.add("loaded"),
        dt = r.zoomLevel,
        S.hidden = !1,
        N.hidden = !0,
        At.putImageData(ht.getModelTexture(), 0, 0),
        ht.removeHDTexture();
        const n = r.objects.reduce(((t,e)=>t + e.faces.length), 0);
        for (; null != st.lastChild; )
            st.lastChild.remove();
        st.append(Ht("li", {
            class: "filename"
        }, ht.model.name), Ht("br"));
        const i = {
            Objects: r.objects.length,
            Faces: n
        };
        console.log(`${ht.getTriangleCount()} triangles, ${ht.getDrawCallCount()} draw calls`);
        for (const [t,e] of Object.entries(i))
            st.append(Ht("li", {}, ` ${t}: ${e}`));
        if (e) {
            const t = R(r);
            history.pushState(null, "", "#" + t),
            console.log(`lzw base64: ${t.length} bytes`)
        }
    }
    function _t(t=!0) {
        vt("./example.txt", t)
    }
    let Tt = null;
    function bt(t) {
        null != Tt && URL.revokeObjectURL(Tt),
        Tt = URL.createObjectURL(t);
        const e = new Image;
        e.onload = ()=>{
            const t = document.createElement("canvas");
            t.id = "image-drop-preview",
            t.width = e.naturalWidth,
            t.height = e.naturalHeight;
            const r = t.getContext("2d");
            r.drawImage(e, 0, 0);
            const i = r.getImageData(0, 0, t.width, t.height)
              , o = function(t) {
                const e = new Set(n.map((([t,e,r])=>function(t, e, r) {
                    return 4278190080 | r << 16 | e << 8 | t
                }(t, e, r))))
                  , r = new Int32Array(t.data.buffer);
                for (let t = 0, n = r.length; t < n; t++) {
                    const n = r[t];
                    if (!e.has(n))
                        return !1
                }
                return !0
            }(i)
              , a = [];
            if (32 === i.width && a.push(["Light-map", 0, ()=>{
                ht.setLightMap(i),
                At.putImageData(ht.getModelTexture(), 0, 0)
            }
            ]),
            a.push(["Texture", 0, ()=>{
                S.hidden = !0,
                N.hidden = !1,
                N.src = Tt,
                o ? (q.hidden = !0,
                ht.removeHDTexture(),
                ht.setIndexTexture(i)) : (q.hidden = !1,
                ht.setHDTexture(i))
            }
            ]),
            1 === a.length)
                return void a[0][2]();
            at.hidden = !1;
            const s = at.firstElementChild;
            s.innerHTML = "",
            s.append(t, Ht("p", {}, "How should this image be used?"));
            for (const [t,e,r] of a) {
                const n = Ht("div", {
                    class: "lil-btn"
                }, t);
                n.style.marginLeft = 30 * e + "px",
                n.onclick = ()=>{
                    r(),
                    at.hidden = !0
                }
                ,
                s.append(n)
            }
        }
        ,
        e.src = Tt
    }
    const At = S.getContext("2d");
    document.querySelectorAll(".popup").forEach((t=>{
        t.addEventListener("click", (e=>{
            e.target === t && (t.hidden = !t.hidden)
        }
        ))
    }
    )),
    J.onclick = ()=>{
        ot.hidden = !ot.hidden
    }
    ,
    ot.querySelectorAll("kbd").forEach((t=>{
        t.onclick = ()=>Ct(t.textContent.toLowerCase())
    }
    ));
    let Et = .02
      , yt = !1
      , wt = 0
      , Rt = 0;
    function Bt() {
        yt ? Ft() : (yt = !0,
        wt = 0,
        Rt = ct,
        nt.textContent = "Recording GIF...",
        nt.classList.add("recording"),
        O.classList.add("recording"),
        $.disabled = !0)
    }
    function Ft() {
        yt = !1,
        nt.textContent = "Record GIF",
        nt.classList.remove("recording"),
        O.classList.remove("recording"),
        $.disabled = !1,
        it.hidden = !1;
        let t = ht.getResolution()
          , e = ht.getRenderedBackgroundColor()
          , r = null
          , n = -1;
        ht.hasHDTexture() || (r = ht.getPalette(),
        r.length > 256 ? r = null : null != ht.backgroundColor && ht.backgroundColor[3] < 1 && (n = r.length - 1)),
        lt.postMessage({
            type: "generate",
            width: t.width,
            height: t.height,
            scale: t.scale,
            delay: Math.round(1e3 * Et),
            background: e,
            palette: r,
            transparentIndex: n
        })
    }
    function Ct(t) {
        "r" === t ? Nt(!ht.drawWireframe) : "t" === t ? Ot(!pt) : "m" === t ? zt("texture" === W.value ? "color" : "texture") : "l" === t ? Gt(!V.checked) : "/" === t || "?" === t ? _t() : "g" === t ? Bt() : "pause" === t && (ht.stopDrawLoop(),
        O.style.opacity = "0.5")
    }
    const Ut = Object.create(null);
    window.onkeydown = t=>{
        if (t.target === document.body && !t.ctrlKey && !t.metaKey) {
            t.preventDefault();
            const e = t.key.toLowerCase();
            Ut[e] = !0,
            Ct(e)
        }
    }
    ,
    window.onkeyup = t=>{
        t.ctrlKey || t.metaKey || (t.preventDefault(),
        Ut[t.key.toLowerCase()] = !1)
    }
    ,
    O.ondblclick = ()=>{
        ht.loaded && (document.activeElement?.blur(),
        O.requestPointerLock())
    }
    ,
    O.oncontextmenu = t=>{
        t.preventDefault()
    }
    ,
    document.onpointerlockchange = t=>{
        xt = document.pointerLockElement === O ? 1 : 0
    }
    ;
    let Mt = Array(5).fill(!1)
      , Lt = Array(5).fill(!1)
      , Dt = [0, 0];
    window.onmousedown = t=>{
        const e = t.button
          , r = t.target == O;
        Mt[e] = !0,
        Lt[e] = r,
        r && (t.preventDefault(),
        O.classList.add("grabbing"),
        0 === xt && 0 === e && Ot(!1))
    }
    ,
    window.onmouseup = t=>{
        const e = t.button;
        Mt[e] = !1,
        Lt[e] = !1,
        O.classList.remove("grabbing")
    }
    ,
    window.onmousemove = t=>{
        const e = [t.clientX, t.clientY]
          , r = [e[0] - Dt[0], e[1] - Dt[1]];
        if (1 === xt && document.pointerLockElement === O) {
            const e = .003;
            ct += t.movementX * e,
            ft += t.movementY * e
        } else if (0 == xt)
            if (Lt[0]) {
                const t = .005;
                ct += r[0] * t,
                ft += r[1] * t
            } else if (Lt[1] || Lt[2]) {
                const t = .005
                  , e = ht.getCameraUp()
                  , n = ht.getCameraRight()
                  , i = r[0] * t
                  , o = -r[1] * t;
                gt.x += n.x * i + e.x * o,
                gt.y += n.y * i + e.y * o,
                gt.z += n.z * i + e.z * o
            }
        Dt = e
    }
    ,
    O.onwheel = t=>{
        t.preventDefault();
        const e = jt(-6, 6, t.deltaY);
        1 === xt || 0 === xt && t.altKey ? St(ht.cameraFOV + e) : 0 === xt && (dt = jt(0, 200, dt + .5 * e))
    }
    ;
    let It = [0, 0, -1]
      , kt = !1;
    document.addEventListener("touchstart", (t=>{
        kt = t.target == O;
        const e = t.changedTouches[0];
        It = [e.clientX, e.clientY, e.identifier],
        kt && (t.preventDefault(),
        Ot(!1))
    }
    ), {
        passive: !1
    }),
    document.addEventListener("touchmove", (t=>{
        const e = Array.from(t.changedTouches).find((t=>t.identifier === It[2]));
        if (null != e) {
            const t = [e.clientX, e.clientY, e.identifier];
            if (kt) {
                const e = [t[0] - It[0], t[1] - It[1]]
                  , r = .01;
                ct += e[0] * r,
                ft += e[1] * r
            }
            It = t
        }
    }
    )),
    document.addEventListener("touchend", (t=>{
        null != Array.from(t.changedTouches).find((t=>t.identifier === It[2])) && (kt = !1)
    }
    )),
    window.innerWidth < 700 && (P.value = "128,128,2"),
    Vt(P, (t=>{
        const [e,r,n] = t.split(",").map((t=>Number(t)));
        ht.setResolution(e, r, n)
    }
    ));
    const St = Vt(K, (()=>{
        ht.cameraFOV = K.valueAsNumber,
        K.nextElementSibling.textContent = K.value
    }
    ))
      , Nt = Vt(G, (()=>{
        ht.drawWireframe = G.checked
    }
    ))
      , Ot = Vt(z, (()=>{
        pt = z.checked
    }
    ));
    function Pt() {
        H.checked ? ht.backgroundColor = [0, 0, 0, 0] : ht.backgroundColor = j.checked ? Kt(X.value) : null
    }
    Vt(Y, (t=>{
        ht.wireframeColor = Kt(t)
    }
    )),
    Vt(j, Pt),
    Vt(X, Pt),
    Vt(H, Pt);
    const zt = Vt(W, (t=>{
        ht.renderMode = t
    }
    ))
      , Gt = Vt(V, (()=>{
        ht.shading = V.checked
    }
    ));
    Vt(Q, (()=>{
        ht.hdOptions.shadingSteps = Q.valueAsNumber,
        Q.nextElementSibling.textContent = Q.value
    }
    )),
    Vt(Z, (t=>{
        ht.hdOptions.shadingColor = Kt(t)
    }
    )),
    Vt($, (t=>{
        Et = Number(t) / 100
    }
    )),
    Vt(tt, (()=>{
        ht.outlineSize = tt.valueAsNumber
    }
    )),
    Vt(et, (t=>{
        ht.outlineColor = Kt(t)
    }
    )),
    Vt(rt, (t=>{
        ht.setWatermark(t)
    }
    )),
    nt.onclick = ()=>{
        Bt()
    }
    ,
    ht.startDrawLoop((t=>{
        const e = 1.2 * t;
        let r = 0
          , n = 0
          , i = 0
          , o = 0
          , a = 0;
        if (Ut.w && (n += 1),
        Ut.s && (n -= 1),
        Ut.a && (r -= 1),
        Ut.d && (r += 1),
        (Ut.q || Ut.shift || Ut.control) && (i -= 1),
        (Ut.e || Ut[" "]) && (i += 1),
        Ut.arrowleft && (o -= 1),
        Ut.arrowright && (o += 1),
        Ut.arrowup && (a -= 1),
        Ut.arrowdown && (a += 1),
        0 === xt)
            ft += (n + a) * e,
            gt.y += 3 * i * t,
            pt ? (mt -= 2 * (r + o) * t,
            mt = jt(-2, 2, mt),
            ct += mt * t) : ct += (r + o) * e,
            ht.setTurntableCamera(dt, ct, ft, gt);
        else if (1 === xt && (ct += o * e,
        ft += a * e,
        ft = jt(-Math.PI / 2, Math.PI / 2, ft),
        ht.cameraRotation.x = ft,
        ht.cameraRotation.y = ct,
        0 !== r || 0 !== i || 0 !== n)) {
            const e = 6 * t
              , o = ht.getCameraRight()
              , a = ht.getCameraUp()
              , s = ht.getCameraForward()
              , l = ht.cameraPosition;
            l.x += (o.x * r + s.x * n + a.x * i) * e,
            l.y += (o.y * r + s.y * n + a.y * i) * e,
            l.z += (o.z * r + s.z * n + a.z * i) * e
        }
        ht.setLightDirectionFromCamera()
    }
    ), (t=>{
        if (yt) {
            const e = wt;
            wt += t,
            wt >= 30 || z && Math.abs(Rt - ct) >= 2 * Math.PI ? Ft() : 0 !== e && Math.floor(e / Et) === Math.floor(wt / Et) || function() {
                let t = ht.getPixels();
                lt.postMessage({
                    type: "frame",
                    data: t
                }, [t.buffer])
            }()
        }
    }
    )),
    window.addEventListener("dragover", (t=>{
        t.preventDefault()
    }
    ));
    let Yt = 0;
    function Wt() {
        document.body.classList.remove("drag")
    }
    function Xt(t) {
        const e = t.name.lastIndexOf(".")
          , r = e < 0 ? "" : t.name.slice(e + 1).toLowerCase();
        "png" === r || "jpg" === r || "jpeg" === r || "bmp" === r || "gif" === r ? bt(t) : vt(t)
    }
    function jt(t, e, r) {
        return r < t ? t : r > e ? e : r
    }
    function Ht(t, e, ...r) {
        if (t = t instanceof HTMLElement ? t : document.createElement(t),
        null != e)
            for (const r in e)
                t.setAttribute(r, e[r]);
        return t.append(...r),
        t
    }
    function Vt(t, e) {
        function r() {
            e(t.value, !1)
        }
        return t[t instanceof HTMLSelectElement ? "onchange" : "oninput"] = r,
        e(t.value, !0),
        t instanceof HTMLInputElement ? e=>{
            t.disabled || ("boolean" == typeof e ? t.checked = e : t.value = e,
            r())
        }
        : e=>{
            t.disabled || (t.value = e,
            r())
        }
    }
    function Kt(t) {
        return [t.slice(1, 3), t.slice(3, 5), t.slice(5, 7)].map((t=>parseInt(t, 16) / 255))
    }
    function qt() {
        if (location.hash.length > 1)
            return vt(B(location.hash.slice(1)), !1),
            !0
    }
    window.addEventListener("dragenter", (t=>{
        0 === Yt && t.dataTransfer.types.includes("Files") && document.body.classList.add("drag"),
        Yt++
    }
    )),
    window.addEventListener("dragleave", (t=>{
        Yt--,
        0 === Yt && Wt()
    }
    )),
    window.addEventListener("drop", (t=>{
        t.preventDefault(),
        Yt = 0,
        Wt();
        const e = t.dataTransfer.files[0];
        null != e && Xt(e)
    }
    )),
    document.body.addEventListener("paste", (t=>{
        const e = t.clipboardData.getData("text/plain");
        if (null != e && e.length > 0)
            vt(e);
        else {
            const e = t.clipboardData.files[0];
            null != e && Xt(e)
        }
    }
    )),
    qt() || _t(!1),
    onhashchange = t=>{
        qt()
    }
    ,
    window.loadModel = vt
}();
