/* Mô hình: VỎ HYDRAT HÓA KHI NaCl TAN – bài D006, Cảnh 5.1 (thay hoạt hình 2D vo-hydrat-hoa, vốn phẳng hai chiều).
   NGUỒN BÀI: OpenStax Biology 2e mục 2.2, Hình 2.15: nước bao quanh từng ion, O (δ−) hướng về Na⁺, H (δ+) hướng về Cl⁻; số khoảng sáu phân tử theo Kuna.
   Cách vẽ của album (không phải số đo): sáu phân tử quanh mỗi ion xếp theo sáu hướng đều nhau; mẩu tinh thể 2×2×2 tượng trưng; bán kính cầu, khoảng cách, đường đi, thời gian không đúng tỉ lệ. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['vo-hydrat-hoa-ion'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.08, roughness: 0.3 }, o || {})); }
  var mNa = can(0x9B6BF2, { emissive: 0x4A22A8, emissiveIntensity: 0.3 }), mCl = can(0x45C96A, { emissive: 0x146B2C, emissiveIntensity: 0.3 }), mO = can(0xE5484D), mH = can(0xF4F6FA), mStick = can(0xB9C2CC);
  var XN = -2.0, XC = 2.0, i, k;
  // mỗi phân tử nước: O ở gốc, hai H lệch về phía +Y, góc 104,5°
  function nuocPT() {
    var g = new T.Group(); g.add(U.sphere(0.24, mO, [0, 0, 0]));
    [-1, 1].forEach(function (s) { var a = s * 52.25 * PI / 180, p = [Math.sin(a) * 0.37, Math.cos(a) * 0.37, 0]; g.add(U.tube([0, 0, 0], p, 0.05, mStick)); g.add(U.sphere(0.14, mH, p)); });
    return g;
  }
  var HUONG = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].map(U.V);
  var Y = new T.Vector3(0, 1, 0), nuoc = new T.Group(), ds = [];
  [[XN, 1], [XC, -1]].forEach(function (ion, j) {
    for (k = 0; k < 6; k++) {
      var g = nuocPT(), h = HUONG[k], dich = new T.Vector3(ion[0], 0, 0).addScaledVector(h, 1.18);
      // quanh Na⁺: H quay ra ngoài (O vào trong). quanh Cl⁻: một liên kết O–H chĩa thẳng vào ion
      var q = new T.Quaternion();
      if (ion[1] > 0) q.setFromUnitVectors(Y, h);
      else { var a = 52.25 * PI / 180, huongH = new T.Vector3(Math.sin(a), Math.cos(a), 0); q.setFromUnitVectors(huongH, h.clone().negate()); }
      var n = j * 6 + k, th = n * 2.399963, y = ((n * 0.618) % 1) * 3.4 - 1.5;
      var xa = new T.Vector3(Math.cos(th) * (3.6 + (n % 3) * 0.35), y, Math.sin(th) * 2.4);
      var q0 = new T.Quaternion().setFromEuler(new T.Euler(n * 1.1, n * 0.7, n * 1.9));
      g.userData = { dich: dich, q: q, xa: xa, q0: q0, ion: j }; nuoc.add(g); ds.push(g);
    }
  });
  var na = new T.Group(), cl = new T.Group();
  var ionNa = U.sphere(0.46, mNa, [0, 0, 0]), ionCl = U.sphere(0.66, mCl, [0, 0, 0]); na.add(ionNa); cl.add(ionCl);
  function dau(t, x) { var cv = document.createElement('canvas'); cv.width = 192; cv.height = 96; var g = cv.getContext('2d'); g.font = '700 60px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(t, 96, 50); var sp = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthTest: false })); sp.scale.set(0.8, 0.4, 1); return sp; }
  var tNa = dau('Na⁺'), tCl = dau('Cl⁻'); na.add(tNa); cl.add(tCl);
  // mẩu tinh thể 2×2×2: hai ion chính là hai nút lưới, sáu ion còn lại mờ dần khi tan
  var tinh = new T.Group(), phu = [];
  for (i = 0; i < 8; i++) { var x = i & 1, yy = (i >> 1) & 1, z = (i >> 2) & 1; if (i === 0 || i === 1) continue; var laNa = (x + yy + z) % 2 === 0; var m = U.sphere(laNa ? 0.4 : 0.58, can(laNa ? 0x9B6BF2 : 0x45C96A, { transparent: true }), [0, 0, 0]); m.userData.p = new T.Vector3(x ? 0.5 : -0.5, yy ? 1.0 : 0, z ? -1.0 : 0); tinh.add(m); phu.push(m); }
  var vo = new T.Group(); [XN, XC].forEach(function (x) { var s = U.sphere(1.58, M.nuoc(0x7FD6FF, 0.09), [x, 0, 0]); s.castShadow = false; vo.add(s); });
  var tt = new T.Group(); tt.add(vo); tt.add(tinh); tt.add(U.box(8.8, 0.07, 4.4, can(0x1B232C), [0, -2.34, 0]));
  var DAI = 4.5;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function capNhat(tg, e) {
    var u = tg % (DAI * 4 + 3), roi = sm(u / 2.5), tach = sm((u - DAI) / 3), vNa = sm((u - DAI * 2) / 3.2), vCl = sm((u - DAI * 3) / 3.2);
    var y0 = (1 - roi) * 1.9;
    var xNa = -0.5 + (XN + 0.5) * tach, xCl = 0.5 + (XC - 0.5) * tach;
    ionNa.position.set(xNa, y0 * (1 - tach), 0); ionCl.position.set(xCl, y0 * (1 - tach), 0); tNa.position.copy(ionNa.position); tCl.position.copy(ionCl.position);
    for (var i = 0; i < phu.length; i++) { var p = phu[i].userData.p, d = new T.Vector3(p.x, p.y, p.z).multiplyScalar(1 + tach * 1.8); phu[i].position.set(d.x, d.y + y0, d.z); phu[i].material.opacity = 1 - tach; phu[i].visible = tach < 0.98; }
    for (i = 0; i < 12; i++) {
      var g = ds[i], w = g.userData, t = w.ion ? vCl : vNa, rung = (1 - t) * 0.22;
      g.position.copy(w.xa).lerp(w.dich, t); g.position.x += Math.sin(tg * 1.7 + i) * rung; g.position.y += Math.cos(tg * 1.4 + i * 2) * rung;
      g.quaternion.copy(w.q0).slerp(w.q, sm(t * 1.25));
    }
    vo.children[0].visible = vNa > 0.9; vo.children[1].visible = vCl > 0.9;
  }
  capNhat(DAI * 4 + 1);
  return {
    ten: 'Vỏ hydrat hóa quanh Na⁺ và Cl⁻', camera: { pos: [1.6, 2.2, 11.4], target: [0, 0, 0] }, khoangCachMax: 18,
    boPhan: [
      { so: 1, id: 'na', ten: 'Ion Na⁺', obj: na, neo: [XN, 0.45, 0.3], tach: [-0.9, 0, 0], chucNang: 'Ion dương.' },
      { so: 2, id: 'cl', ten: 'Ion Cl⁻', obj: cl, neo: [XC, 0.65, 0.3], tach: [0.9, 0, 0], chucNang: 'Ion âm.' },
      { so: 3, id: 'nuoc', ten: 'Phân tử nước', obj: nuoc, neo: [XN, -1.4, 0.3], tach: [0, -0.5, 1.4], chucNang: 'Bao quanh từng ion.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    buocHienTai: function (tg) { return Math.min(3, Math.floor((tg % (DAI * 4 + 3)) / DAI)); },
    chuThichMau: [['#E5484D', 'Oxy (δ−)'], ['#F4F6FA', 'Hydro (δ+)']],
    buoc: [
      { ten: 'Tinh thể NaCl rơi vào nước', pha: [], bp: 'na' },
      { ten: 'Na⁺ và Cl⁻ tách ra', pha: [], bp: 'cl' },
      { ten: 'Quanh Na⁺: đầu O hướng vào', pha: [], bp: 'nuoc' },
      { ten: 'Quanh Cl⁻: đầu H hướng vào', pha: [], bp: 'nuoc' },
    ],
  };
};
