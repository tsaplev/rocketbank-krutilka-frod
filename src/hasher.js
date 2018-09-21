export default function hashScore(scores) {
    var fn = [17, 10, 18, 13, 9, 6, 19, 12, 21, 7, 11, 5, 15, 2, 14, 1, 0, 4, 16, 3, 8, 20];
    var pn = [104, 57, 66, 71, 75, 83, 99, 80, 82, 88, 83, 122, 101, 57, 77, 122, 109, 81, 51, 88, 122, 122];
    var dn = "0123456789abcdefghijklmnopqrstuvwxyz";
    var hn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var vn = "=";

    function T(e) {
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e[n].toString(16);
            1 == r.length && (r = "0" + r),
                t += r
        }
        return t
    }
    function C(e, t) {
        return e.reduce(function (e, n, r) {
            return e[n] = t[r],
                e
        }, []).map(function (e) {
            return String.fromCharCode(e - 1)
        }).join("")
    }
    function M(e) {
        var t, n, r = "";
        for (t = 0; t + 3 <= e.length; t += 3)
            n = parseInt(e.substring(t, t + 3), 16),
                r += hn.charAt(n >> 6) + hn.charAt(63 & n);
        if (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16),
            r += hn.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16),
                r += hn.charAt(n >> 2) + hn.charAt((3 & n) << 4)),
            vn)
            for (; (3 & r.length) > 0;)
                r += vn;
        return r
    }
    function P(e) {
        return dn.charAt(e)
    }
    function O(e) {
        var t, n, r, o = "", i = 0;
        for (t = 0; t < e.length && e.charAt(t) != vn; ++t)
            (r = hn.indexOf(e.charAt(t))) < 0 || (0 == i ? (o += P(r >> 2),
                n = 3 & r,
                i = 1) : 1 == i ? (o += P(n << 2 | r >> 4),
                    n = 15 & r,
                    i = 2) : 2 == i ? (o += P(n),
                        o += P(r >> 2),
                        n = 3 & r,
                        i = 3) : (o += P(n << 2 | r >> 4),
                            o += P(15 & r),
                            i = 0));
        return 1 == i && (o += P(n << 2)),
            o
    }
    function N(e) {
        var t, n = O(e), r = new Array;
        for (t = 0; 2 * t < n.length; ++t)
            r[t] = parseInt(n.substring(2 * t, 2 * t + 2), 16);
        return r
    }
    function A(e) {
        for (var t = encodeURIComponent(e), n = "", r = 0; r < t.length; r++)
            "%" == t[r] ? (n += t.substr(r, 3),
                r += 2) : n = n + "%" + L(t[r]);
        return n
    }
    function I(e) {
        return e.replace(/%/g, "")
    }
    function R(e) {
        return M(I(A(e)))
    }
    function F(e) {
        return N(R(e))
    }
    function T(e) {
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e[n].toString(16);
            1 == r.length && (r = "0" + r),
                t += r
        }
        return t
    }
    function j(e) {
        for (var t = new Array, n = 0; n < e.length; n++)
            t[n] = e.charCodeAt(n);
        return t
    }
    function L(e) {
        return T(j(e))
    }
    function S(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    /* Generating hash */
    var randomString = [].concat(S(Array(30))).map(function () {
        return (~~(36 * Math.random())).toString(36)
    }).join("");
    var fcfnpnArray = [108, 121, 56, 87, 80, 121, 82, 87, 121, 74, 56, 82, 79, 70, 76, 100, 50, 103, 65, 98, 121, 81];
    function hmac(firstArg, secondArg) {
        var i = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
        function t(e, t, n, r, o) {
            for (var a, u, c, s, l, f, p, d, h, v, m, y, g; o >= 64;) {
                for (a = t[0],
                    u = t[1],
                    c = t[2],
                    s = t[3],
                    l = t[4],
                    f = t[5],
                    p = t[6],
                    d = t[7],
                    v = 0; v < 16; v++)
                    m = r + 4 * v,
                        e[v] = (255 & n[m]) << 24 | (255 & n[m + 1]) << 16 | (255 & n[m + 2]) << 8 | 255 & n[m + 3];
                for (v = 16; v < 64; v++)
                    h = e[v - 2],
                        y = (h >>> 17 | h << 15) ^ (h >>> 19 | h << 13) ^ h >>> 10,
                        h = e[v - 15],
                        g = (h >>> 7 | h << 25) ^ (h >>> 18 | h << 14) ^ h >>> 3,
                        e[v] = (y + e[v - 7] | 0) + (g + e[v - 16] | 0);
                for (v = 0; v < 64; v++)
                    y = (((l >>> 6 | l << 26) ^ (l >>> 11 | l << 21) ^ (l >>> 25 | l << 7)) + (l & f ^ ~l & p) | 0) + (d + (i[v] + e[v] | 0) | 0) | 0,
                        g = ((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10)) + (a & u ^ a & c ^ u & c) | 0,
                        d = p,
                        p = f,
                        f = l,
                        l = s + y | 0,
                        s = c,
                        c = u,
                        u = a,
                        a = y + g | 0;
                t[0] += a,
                    t[1] += u,
                    t[2] += c,
                    t[3] += s,
                    t[4] += l,
                    t[5] += f,
                    t[6] += p,
                    t[7] += d,
                    r += 64,
                    o -= 64
            }
            return r
        }
        var a = function () {
            function n() {
                this.digestLength = 32,
                    this.blockSize = 64,
                    this.state = new Int32Array(8),
                    this.temp = new Int32Array(64),
                    this.buffer = new Uint8Array(128),
                    this.bufferLength = 0,
                    this.bytesHashed = 0,
                    this.finished = !1,
                    this.reset()
            }
            return n.prototype.reset = function () {
                return this.state[0] = 1779033703,
                    this.state[1] = 3144134277,
                    this.state[2] = 1013904242,
                    this.state[3] = 2773480762,
                    this.state[4] = 1359893119,
                    this.state[5] = 2600822924,
                    this.state[6] = 528734635,
                    this.state[7] = 1541459225,
                    this.bufferLength = 0,
                    this.bytesHashed = 0,
                    this.finished = !1,
                    this
            }
                ,
                n.prototype.clean = function () {
                    for (var e = 0; e < this.buffer.length; e++)
                        this.buffer[e] = 0;
                    for (var e = 0; e < this.temp.length; e++)
                        this.temp[e] = 0;
                    this.reset()
                }
                ,
                n.prototype.update = function (e, n) {
                    if (void 0 === n && (n = e.length),
                        this.finished)
                        throw new Error("SHA256: can't update because hash was finished.");
                    var r = 0;
                    if (this.bytesHashed += n,
                        this.bufferLength > 0) {
                        for (; this.bufferLength < 64 && n > 0;)
                            this.buffer[this.bufferLength++] = e[r++],
                                n--;
                        64 === this.bufferLength && (t(this.temp, this.state, this.buffer, 0, 64),
                            this.bufferLength = 0)
                    }
                    for (n >= 64 && (r = t(this.temp, this.state, e, r, n),
                        n %= 64); n > 0;)
                        this.buffer[this.bufferLength++] = e[r++],
                            n--;
                    return this
                }
                ,
                n.prototype.finish = function (e) {
                    if (!this.finished) {
                        var n = this.bytesHashed
                            , r = this.bufferLength
                            , o = n / 536870912 | 0
                            , i = n << 3
                            , a = n % 64 < 56 ? 64 : 128;
                        this.buffer[r] = 128;
                        for (var u = r + 1; u < a - 8; u++)
                            this.buffer[u] = 0;
                        this.buffer[a - 8] = o >>> 24 & 255,
                            this.buffer[a - 7] = o >>> 16 & 255,
                            this.buffer[a - 6] = o >>> 8 & 255,
                            this.buffer[a - 5] = o >>> 0 & 255,
                            this.buffer[a - 4] = i >>> 24 & 255,
                            this.buffer[a - 3] = i >>> 16 & 255,
                            this.buffer[a - 2] = i >>> 8 & 255,
                            this.buffer[a - 1] = i >>> 0 & 255,
                            t(this.temp, this.state, this.buffer, 0, a),
                            this.finished = !0
                    }
                    for (var u = 0; u < 8; u++)
                        e[4 * u + 0] = this.state[u] >>> 24 & 255,
                            e[4 * u + 1] = this.state[u] >>> 16 & 255,
                            e[4 * u + 2] = this.state[u] >>> 8 & 255,
                            e[4 * u + 3] = this.state[u] >>> 0 & 255;
                    return this
                }
                ,
                n.prototype.digest = function () {
                    var e = new Uint8Array(this.digestLength);
                    return this.finish(e),
                        e
                }
                ,
                n.prototype._saveState = function (e) {
                    for (var t = 0; t < this.state.length; t++)
                        e[t] = this.state[t]
                }
                ,
                n.prototype._restoreState = function (e, t) {
                    for (var n = 0; n < this.state.length; n++)
                        this.state[n] = e[n];
                    this.bytesHashed = t,
                        this.finished = !1,
                        this.bufferLength = 0
                }
                ,
                n
        }();
        var u = function () {
            function e(e) {
                this.inner = new a,
                    this.outer = new a,
                    this.blockSize = this.inner.blockSize,
                    this.digestLength = this.inner.digestLength;
                var t = new Uint8Array(this.blockSize);
                if (e.length > this.blockSize)
                    (new a).update(e).finish(t).clean();
                else
                    for (var n = 0; n < e.length; n++)
                        t[n] = e[n];
                for (var n = 0; n < t.length; n++)
                    t[n] ^= 54;
                this.inner.update(t);
                for (var n = 0; n < t.length; n++)
                    t[n] ^= 106;
                this.outer.update(t),
                    this.istate = new Uint32Array(8),
                    this.ostate = new Uint32Array(8),
                    this.inner._saveState(this.istate),
                    this.outer._saveState(this.ostate);
                for (var n = 0; n < t.length; n++)
                    t[n] = 0
            }
            return e.prototype.reset = function () {
                return this.inner._restoreState(this.istate, this.inner.blockSize),
                    this.outer._restoreState(this.ostate, this.outer.blockSize),
                    this
            }
                ,
                e.prototype.clean = function () {
                    for (var e = 0; e < this.istate.length; e++)
                        this.ostate[e] = this.istate[e] = 0;
                    this.inner.clean(),
                        this.outer.clean()
                }
                ,
                e.prototype.update = function (e) {
                    return this.inner.update(e),
                        this
                }
                ,
                e.prototype.finish = function (e) {
                    return this.outer.finished ? this.outer.finish(e) : (this.inner.finish(e),
                        this.outer.update(e, this.digestLength).finish(e)),
                        this
                }
                ,
                e.prototype.digest = function () {
                    var e = new Uint8Array(this.digestLength);
                    return this.finish(e),
                        e
                }
                ,
                e
        }();
        var n = new u(firstArg).update(secondArg)
            , r = n.digest();
        return n.clean(),
            r
    }

    return scores + "_" + randomString + "_" + T(hmac(fcfnpnArray, F(scores + randomString)));
}