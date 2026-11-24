/* Mô hình: OXY HÓA LIPID THEO CƠ CHẾ GỐC TỰ DO – bài D010, Cảnh 3.1.
   NGUỒN BÀI (khẳng định của bài, Labuza 1971): oxy hóa lipid là phản ứng của oxy với axit béo không bão hòa theo cơ chế gốc tự do, được kim loại xúc tác, gây ôi, mùi và vị lạ; gốc tự do có thể phản ứng với protein và vitamin tan trong chất béo.
   KIẾN THỨC NỀN (đã tra, chỉ để vẽ đúng, KHÔNG thành khẳng định của bài): chuỗi phản ứng gốc tự do gồm khởi đầu (tạo gốc L•), lan truyền (L• + O2 → gốc peroxyl LOO•; LOO• lấy một H của phân tử axit béo kế tiếp → hydroperoxide LOOH
   và tạo gốc L• mới) và tắt mạch (PMC2868362 "An update on products and mechanisms of lipid peroxidation"; Yin 2011 Chem Rev 111:5944). Mỗi phân tử vẽ 8 cacbon, một nối đôi, một H hoạt động; ba phân tử xếp hàng; kim loại là một ion
   đại diện; thời gian là cách vẽ của album. Không vẽ giai đoạn tắt mạch, chất chống oxy hóa, protein hay vitamin. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['oxy-hoa-lipid'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  var mC = can(0x8A9099), mH = can(0xF2F5F7), mO = can(0xE53935), mB = can(0xB9C0C7), mFe = can(0xB5651D, { metalness: 0.5, roughness: 0.35 }), mG = can(0xFFEB3B, { emissive: 0xFFC107, emissiveIntensity: 0.9 });
  var Y = [1.4, 0, -1.4], X0 = -1.75, DX = 0.5, AL = 2;                  // hàng, x cacbon đầu, bước, chỉ số cacbon cạnh nối đôi (có H hoạt động)
  var TR = [[0.14, 0.16, 0.28, 0.30, 0.40], [0.40, 0.42, 0.54, 0.56, 0.66], [0.66, 0.68, 0.78, 9, 9]]; // [gốc bật, O2 bắt đầu, O2 xong, H bắt đầu, H xong]
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function lerp3(a, b, p) { return [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p]; }
  var axit = new T.Group(), oxy = new T.Group(), kimloai = new T.Group(), goc = new T.Group();
  var H = [], O2 = [], MK = [], LK = [], k, i;
  function cx(i) { return X0 + i * DX; }
  for (k = 0; k < 3; k++) {
    var prev = null;
    for (i = 0; i < 8; i++) { var p = [cx(i), Y[k] + (i % 2 ? 0.14 : -0.14), 0]; axit.add(U.sphere(0.13, mC, p)); if (prev) axit.add(U.tube(prev, p, 0.04, mB)); if (i === 4 && prev) axit.add(U.tube([prev[0], prev[1], 0.07], [p[0], p[1], 0.07], 0.03, mB)); prev = p; }
    var hs = U.sphere(0.08, mH, [0, 0, 0]); axit.add(hs); H.push(hs);
    var o = new T.Group(), o1 = U.sphere(0.12, mO, [0, 0, 0]), o2 = U.sphere(0.12, mO, [0.32, 0.3, 0]); o.add(o1); o.add(o2); o.add(U.tube([0, 0, 0], [0.32, 0.3, 0], 0.035, mB)); oxy.add(o); O2.push(o);
    var m = U.sphere(0.17, mG, [0, 0, 0]); goc.add(m); MK.push(m);
    var lk = U.tube(cpos(k), o1End(k), 0.035, mB); lk.visible = false; axit.add(lk); LK.push(lk);
  }
  var fe = U.sphere(0.24, mFe, [0, 0, 0]); kimloai.add(fe);
  var tt = new T.Group(); tt.add(U.box(9.2, 4.6, 1.6, can(0xF3E7A8, { transparent: true, opacity: 0.1, depthWrite: false }), [0, 0, 0])); tt.add(U.box(11, 0.1, 3, can(0x1E262E), [0, -2.95, 0]));
  function cpos(k) { return [cx(AL), Y[k] + (AL % 2 ? 0.14 : -0.14), 0]; }           // cacbon hoạt động của phân tử k
  function o1End(k) { var c = cpos(k); return [c[0], c[1] + 0.42, 0.05]; }
  function oTerm(k) { var c = o1End(k); return [c[0] + 0.32, c[1] + 0.3, 0.05]; }
  function hHome(k) { var c = cpos(k); return [c[0], c[1] + 0.3, 0.22]; }
  function oFrom(k) { return [3.6, Y[k] + 1.0, 0.2]; }
  function capNhat(tg) {
    var u = (tg % 16) / 16, uc = u < 0.92 ? u : 0, f = u < 0.86 ? 1 : u < 0.92 ? 1 - sm((u - 0.86) / 0.06) : sm((u - 0.92) / 0.08), k, p, t;
    // kim loại tới phân tử 1 (khởi đầu)
    var pf = sm((uc - 0.04) / 0.1), c0 = cpos(0); fe.position.set.apply(fe.position, lerp3([-3.9, 2.1, 0.2], [c0[0] - 0.3, c0[1] + 0.85, 0.1], pf)); fe.scale.setScalar(Math.max(0.001, f));
    for (k = 0; k < 3; k++) {
      t = TR[k];
      // O2 lại gần và gắn vào cacbon hoạt động
      p = sm((uc - t[1]) / (t[2] - t[1])); var jit = Math.sin(tg * 3 + k) * 0.05 * (1 - p), a = lerp3(oFrom(k), o1End(k), p);
      O2[k].position.set(a[0], a[1] + jit, a[2]); O2[k].scale.setScalar(Math.max(0.001, f)); LK[k].visible = p > 0.98 && f > 0.5;
      // H hoạt động: phân tử 1 mất H lúc khởi đầu; phân tử 2, 3 đưa H cho gốc peroxyl của phân tử đứng trước
      var h = hHome(k);
      if (k === 0) { var pl = sm((uc - 0.1) / 0.05); H[0].position.set(h[0] - pl * 0.6, h[1] + pl * 0.9, h[2]); H[0].scale.setScalar(Math.max(0.001, (1 - pl) * f)); }
      else { var tp = TR[k - 1], ph = sm((uc - tp[3]) / (tp[4] - tp[3])), d = lerp3(h, oTerm(k - 1), ph); H[k].position.set(d[0], d[1], d[2]); H[k].scale.setScalar(Math.max(0.001, f)); }
      // gốc tự do: ở cacbon rồi chuyển sang O cuối khi O2 gắn xong; tắt khi đã nhận H
      var on = uc >= t[0] && (k === 2 || uc < t[4]), mp = uc >= t[2] ? oTerm(k) : cpos(k);
      MK[k].visible = on; MK[k].position.set(mp[0], mp[1], mp[2] + 0.15); MK[k].scale.setScalar(Math.max(0.001, f) * (1 + 0.15 * Math.sin(tg * 6 + k)));
    }
    boPhan[3].neo = MK[uc < 0.40 ? 0 : uc < 0.66 ? 1 : 2].position.toArray(); boPhan[3].neo = [boPhan[3].neo[0] + 0.3, boPhan[3].neo[1] + 0.6, 0];
  }
  var boPhan = [
    { so: 1, id: 'axitbeo', ten: 'Axit béo không bão hòa', obj: axit, neo: [-2.9, 1.9, 0], tach: [-0.8, 0.5, 0], chucNang: 'Có nối đôi; bị oxy tấn công theo cơ chế gốc tự do (Labuza, 1971).' },
    { so: 2, id: 'oxy', ten: 'Oxy', obj: oxy, neo: [3.7, 2.0, 0], tach: [0.8, 0.5, 0], chucNang: 'Phản ứng với axit béo không bão hòa gây oxy hóa lipid.' },
    { so: 3, id: 'kimloai', ten: 'Kim loại xúc tác', obj: kimloai, neo: [-3.9, 2.8, 0], tach: [-0.6, 0.8, 0], chucNang: 'Kim loại xúc tác phản ứng oxy hóa lipid.' },
    { so: 4, id: 'goctudo', ten: 'Gốc tự do', obj: goc, neo: [0, 0, 0], tach: [0, 0.6, 0.6], chucNang: 'Phản ứng theo cơ chế gốc tự do làm lan truyền oxy hóa; gốc tự do còn có thể phản ứng với protein và vitamin.' },
  ];
  capNhat(0);
  return {
    ten: 'Oxy hóa lipid theo gốc tự do', camera: { pos: [0.2, 0.3, 13.8], target: [0, 0, 0] }, khoangCachMax: 20,
    boPhan: boPhan, trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFEB3B', 'Gốc tự do (nguyên tử có electron lẻ)'], ['#E53935', 'Oxy']],
    buoc: [
      { ten: 'Kim loại xúc tác, axit béo không bão hòa mất H và thành gốc tự do', pha: [], bp: 'kimloai' },
      { ten: 'Gốc tự do gặp oxy và gắn oxy vào', pha: [], bp: 'oxy' },
      { ten: 'Gốc mới lấy H của phân tử axit béo kế tiếp', pha: [], bp: 'goctudo' },
      { ten: 'Phân tử kế tiếp thành gốc tự do, phản ứng lan truyền thành chuỗi', pha: [], bp: 'axitbeo' },
    ],
  };
};
