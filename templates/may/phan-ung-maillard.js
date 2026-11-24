/* Mô hình: CARAMEL HÓA VÀ PHẢN ỨNG MAILLARD – bài CNTP-Ngay10, Cảnh 3.2 (slide "Biến đổi hóa học khi cô đặc").
   NGUỒN BÀI (chỉ những điều này là khẳng định của bài): caramel hóa tạo sản phẩm màu đen, vị đắng; sẫm màu còn do phản ứng giữa acid amin (nhóm –NH2) và đường khử (nhóm –CHO) tạo melanoidin
   (phản ứng Maillard); tránh bằng khuấy, nhiệt độ thấp (chân không), rút ngắn thời gian, làm nguội nhanh.
   KIẾN THỨC NỀN (đã tra, chỉ để vẽ đúng, KHÔNG thành khẳng định của bài): Maillard bắt đầu khi nhóm amin (nucleophile) cộng vào cacbon của nhóm carbonyl C=O của đường khử, tách một phân tử nước,
   tạo base Schiff / glycosylamine rồi chuyển vị Amadori (giai đoạn đầu không màu, không mùi); giai đoạn cuối là các polymer nâu khối lượng phân tử lớn gọi là melanoidin
   (Maillard Reaction review, Foods 2025, PMC12154226; ScienceDirect Topics "Maillard reaction"; Byju's). Caramel hóa là đường tự bị nhiệt (không cần acid amin): mất nước, chuyển vị, phân mảnh,
   trùng hợp thành các sản phẩm sẫm màu (BakerPedia; Science of Cooking; Wikipedia "Caramelization"). Hình dạng phân tử rút gọn: glycine làm đại diện acid amin, glucose mạch hở làm đại diện đường khử,
   bỏ các H gắn trên cacbon của đường. Cấu trúc melanoidin/caramel là cụm minh họa, không phải cấu trúc thật (thật ra phức tạp, chưa xác định rõ). Thời gian, màu, rung nhiệt là cách vẽ của album. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['phan-ung-maillard'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  var mC = can(0x6B7078), mH = can(0xF2F5F7), mO = can(0xE53935), mN = can(0x3F6FE0), mB = can(0xB9C0C7);
  var RAD = { C: 0.2, H: 0.11, O: 0.2, N: 0.2 }, MAT = { C: mC, H: mH, O: mO, N: mN };
  var L1 = 1.45, L2 = -1.45, CX = -0.9, CH = 14;
  var XS1 = -1.4, XS2 = -2.6, NDOCK = XS1 - 0.8;                 // x cacbon C1 đường (hàng 1, hàng 2), x của N khi đã gắn
  function atom(g, el, p) { var m = U.sphere(RAD[el], MAT[el], p); g.add(m); return m; }
  function bond(g, a, b, arr, kep) {
    var list = [];
    if (kep) { list.push(U.tube([a[0], a[1], a[2] + 0.05], [b[0], b[1], b[2] + 0.05], 0.028, mB)); list.push(U.tube([a[0], a[1], a[2] - 0.05], [b[0], b[1], b[2] - 0.05], 0.028, mB)); }
    else list.push(U.tube(a, b, 0.035, mB));
    list.forEach(function (t) { g.add(t); if (arr) arr.push(t); });
  }
  // acid amin (glycine rút gọn): H2N–CH2–COOH, N ở gốc tọa độ, mạch kéo về phía –x
  function acidAmin() {
    var g = new T.Group(), hide = [], s = -1;
    function P(x, y, z) { return [x * s, y, z]; }
    var N = P(0, 0, 0), Ca = P(0.75, -0.1, 0), Cc = P(1.5, 0.35, 0), Oc = P(1.5, 1.0, 0), Oh = P(2.25, 0.0, 0);
    var h1 = [0.1, 0.5, 0.25], h2 = [0.1, -0.5, 0.25];
    atom(g, 'N', N); atom(g, 'C', Ca); atom(g, 'C', Cc); atom(g, 'O', Oc); atom(g, 'O', Oh);
    atom(g, 'H', P(2.5, 0.35, 0)); atom(g, 'H', P(0.95, -0.55, 0.4)); atom(g, 'H', P(0.95, -0.45, -0.45));
    hide.push(atom(g, 'H', h1), atom(g, 'H', h2));
    bond(g, N, Ca); bond(g, Ca, Cc); bond(g, Cc, Oc, null, true); bond(g, Cc, Oh); bond(g, Oh, P(2.5, 0.35, 0));
    bond(g, Ca, P(0.95, -0.55, 0.4)); bond(g, Ca, P(0.95, -0.45, -0.45));
    bond(g, N, h1, hide); bond(g, N, h2, hide);
    // liên kết C=N mới (hiện sau khi ngưng tụ), nối N với C1 của đường cách 0,8 về phía +x
    var cn = []; bond(g, [0.05, 0.05, 0], [0.78, 0.05, 0], cn, true); cn.forEach(function (t) { t.visible = false; });
    g.userData.hide = hide; g.userData.cn = cn; return g;
  }
  // đường khử (glucose mạch hở, rút gọn): C1 là nhóm –CHO ở gốc tọa độ, mạch kéo về +x
  function duongKhu() {
    var g = new T.Group(), hide = [], C = [], i;
    for (i = 0; i < 6; i++) { C.push([0.68 * i, 0.3 * (i % 2), 0]); atom(g, 'C', C[i]); if (i) bond(g, C[i - 1], C[i]); }
    var oc = [-0.35, -0.62, 0], hc = [-0.3, 0.5, 0.3];
    hide.push(atom(g, 'O', oc)); bond(g, C[0], oc, hide, true);
    atom(g, 'H', hc); bond(g, C[0], hc);
    for (i = 1; i <= 4; i++) { var up = (i % 2) ? 1 : -1, o = [C[i][0], C[i][1] + up * 0.55, 0.3], h = [C[i][0] + 0.12, C[i][1] + up * 0.88, 0.5]; atom(g, 'O', o); atom(g, 'H', h); bond(g, C[i], o); bond(g, o, h); }
    var o6 = [C[5][0] + 0.5, C[5][1] + 0.45, 0], h6 = [C[5][0] + 0.8, C[5][1] + 0.7, 0.1]; atom(g, 'O', o6); atom(g, 'H', h6); bond(g, C[5], o6); bond(g, o6, h6);
    g.userData.hide = hide; return g;
  }
  function nuoc() { // một phân tử H2O
    var g = new T.Group(); atom(g, 'O', [0, 0, 0]); atom(g, 'H', [-0.28, -0.2, 0]); atom(g, 'H', [0.28, -0.2, 0]); bond(g, [0, 0, 0], [-0.28, -0.2, 0]); bond(g, [0, 0, 0], [0.28, -0.2, 0]); return g;
  }
  // cụm polymer minh họa: melanoidin (nâu sẫm, tròn) và sản phẩm caramel (đen, góc cạnh)
  function cum(kieu) {
    var g = new T.Group(), pts = [], k, mt = kieu === 'mel' ? [can(0x6B3A18), can(0x55290F), can(0x7E4A22)] : [can(0x1D1612), can(0x2A1F18), can(0x120D0A)];
    for (k = 0; k < 18; k++) {
      var a = k * 2.399, r = 0.5 + 0.95 * Math.abs(Math.sin(k * 1.7)), p = [Math.cos(a) * r * 1.5, Math.sin(k * 0.9) * 0.55, Math.sin(a) * r * 0.7];
      pts.push(p); var sz = 0.2 + 0.2 * Math.abs(Math.sin(k * 2.3));
      var m = kieu === 'mel' ? U.sphere(sz, mt[k % 3], p) : U.box(sz * 1.5, sz * 1.5, sz * 1.5, mt[k % 3], p);
      if (kieu !== 'mel') m.rotation.set(k, k * 1.3, k * 0.7); g.add(m);
    }
    for (k = 0; k < pts.length; k++) { g.add(U.tube(pts[k], pts[(k + 1) % pts.length], 0.06, mt[0])); }
    return g;
  }
  // ----- các phần
  var aa = acidAmin(), su1 = duongKhu(), su2 = duongKhu(), mel = cum('mel'), car = cum('car');
  var wA = nuoc(), w2 = [nuoc(), nuoc(), nuoc()];
  var amin = new T.Group(); amin.add(aa);
  var duongkhu = new T.Group(); duongkhu.add(su1);
  var melan = new T.Group(); melan.add(mel);
  var caram = new T.Group(); caram.add(car);
  // ----- trang trí: hai ô dung dịch trong suốt, bếp, đế
  var tt = new T.Group();
  function oDd(y) { var m = can(0xCFE8F5, { transparent: true, opacity: 0.12, depthWrite: false }); var b = U.box(9.2, 2.3, 1.6, m, [CX, y, 0]); tt.add(b); return m; }
  var dd1 = oDd(L1), dd2 = oDd(L2);
  function bep(y) { var m = can(0x3A2A26, { emissive: 0xFF5A1F, emissiveIntensity: 0.05 }); tt.add(U.box(9.4, 0.14, 1.8, m, [CX, y - 1.27, 0])); return m; }
  var bp1 = bep(L1), bp2 = bep(L2);
  tt.add(U.box(11, 0.1, 3, can(0x1E262E), [CX, -2.95, 0]));
  tt.add(su2); tt.add(wA); w2.forEach(function (w) { tt.add(w); });
  // vị trí ban đầu
  su2.position.set(XS2, L2, 0); wA.visible = false; w2.forEach(function (w) { w.visible = false; });
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var cC = new T.Color(), cT = new T.Color(0xCFE8F5), cA = new T.Color(0xE8B04A), cE1 = new T.Color(0x4A2511), cE2 = new T.Color(0x16100C);
  function mauDd(m, p, cuoi) { if (p < 0.5) cC.copy(cT).lerp(cA, p * 2); else cC.copy(cA).lerp(cuoi, (p - 0.5) * 2); m.color.copy(cC); m.opacity = 0.12 + 0.3 * p; }
  var boPhan = [
    { so: 1, id: 'amin', ten: 'Acid amin (nhóm –NH₂)', obj: amin, neo: [NDOCK - 1.0, L1 + 1.4, 0], tach: [-1.2, 0.9, 0], chucNang: 'Có nhóm –NH₂; phản ứng với nhóm –CHO của đường khử.' },
    { so: 2, id: 'duongkhu', ten: 'Đường khử (nhóm –CHO)', obj: duongkhu, neo: [XS1 + 2.2, L1 + 1.45, 0], tach: [1.0, 0.9, 0], chucNang: 'Có nhóm –CHO; phản ứng với nhóm –NH₂ của acid amin.' },
    { so: 3, id: 'melanoidin', ten: 'Melanoidin', obj: melan, neo: [CX, L1 - 1.4, 0.9], tach: [0, 0.6, 0.8], chucNang: 'Sản phẩm của phản ứng Maillard, làm dung dịch sẫm màu.' },
    { so: 4, id: 'caramel', ten: 'Sản phẩm caramel hóa', obj: caram, neo: [CX, L2 - 1.4, 0.9], tach: [0, -0.4, 0.8], chucNang: 'Sản phẩm màu đen, vị đắng của caramel hóa.' },
  ];
  var bpBy = {}; boPhan.forEach(function (b) { bpBy[b.id] = b; });
  function capNhat(tg) {
    var u = (tg % CH) / CH, uc = u >= 0.92 ? 0 : u;
    var Tn = u < 0.18 ? sm((u - 0.04) / 0.14) : u < 0.7 ? 1 : u < 0.85 ? 1 - 0.9 * sm((u - 0.7) / 0.15) : 0.1 * (1 - sm((u - 0.9) / 0.1));
    var rung = 0.06 * Tn, jx = Math.sin(tg * 7.1) * rung, jy = Math.sin(tg * 5.3 + 1) * rung, jz = Math.sin(tg * 6.2 + 2) * rung;
    var dx = uc < 0.05 ? -1.0 : uc < 0.25 ? -1.0 * (1 - sm((uc - 0.05) / 0.2)) : 0, docked = uc >= 0.25 ? 1 : 0, react = uc >= 0.28;
    var wob = (1 - docked) * 0.12 * Tn * Math.sin(tg * 4.2);
    var sc = u < 0.45 ? 1 : u < 0.7 ? 1 - sm((u - 0.45) / 0.25) : u < 0.92 ? 0 : sm((u - 0.92) / 0.08); sc = Math.max(sc, 0.001);
    var ml = u < 0.45 ? 0 : u < 0.7 ? sm((u - 0.45) / 0.25) : u < 0.88 ? 1 : u < 0.95 ? 1 - sm((u - 0.88) / 0.07) : 0; ml = Math.max(ml, 0.001);
    // hàng 1: Maillard
    aa.position.set(NDOCK + dx + jx, L1 + jy + wob, jz); su1.position.set(XS1 + jx, L1 + jy, jz);
    aa.scale.setScalar(sc); su1.scale.setScalar(sc);
    aa.userData.hide.concat(su1.userData.hide).forEach(function (m) { m.visible = !react; });
    aa.userData.cn.forEach(function (m) { m.visible = react; });
    var uw = (uc - 0.28) / 0.2; wA.visible = uw >= 0 && uw < 1 && u < 0.92;
    if (wA.visible) { wA.position.set(NDOCK + 0.55, L1 + 0.8 + 1.5 * uw, 0.1); wA.scale.setScalar(1 - uw * uw); wA.rotation.z = uw * 2; }
    mel.position.set(CX + jx, L1 + jy, jz); mel.scale.setScalar(ml);
    // hàng 2: caramel hóa (đường tự chịu nhiệt, mất nước, hóa đen)
    var s2 = u < 0.3 ? 1 : u < 0.62 ? 1 - sm((u - 0.3) / 0.32) : u < 0.92 ? 0 : sm((u - 0.92) / 0.08); s2 = Math.max(s2, 0.001);
    var c2 = u < 0.3 ? 0 : u < 0.62 ? sm((u - 0.3) / 0.32) : u < 0.88 ? 1 : u < 0.95 ? 1 - sm((u - 0.88) / 0.07) : 0; c2 = Math.max(c2, 0.001);
    su2.position.set(XS2 + jx, L2 + jy, jz); su2.scale.setScalar(s2); car.position.set(CX + jx, L2 + jy, jz); car.scale.setScalar(c2);
    w2.forEach(function (w, k) { var a = (u - (0.18 + 0.12 * k)) / 0.2; w.visible = a >= 0 && a < 1; if (w.visible) { w.position.set(XS2 + 0.9 + 0.9 * k, L2 + 0.9 + 1.5 * a, 0.1); w.scale.setScalar(1 - a * a); w.rotation.z = a * 2; } });
    // màu dung dịch và bếp
    var fade = u < 0.88 ? 1 : 1 - sm((u - 0.88) / 0.1);
    mauDd(dd1, sm((u - 0.28) / 0.47) * fade, cE1); mauDd(dd2, sm((u - 0.2) / 0.45) * fade, cE2);
    bp1.emissiveIntensity = bp2.emissiveIntensity = 0.05 + 1.2 * Tn;
    // nhãn đi theo phân tử
    bpBy.amin.neo[0] = aa.position.x - 1.0; bpBy.duongkhu.neo[0] = su1.position.x + 2.2;
  }
  capNhat(0);
  return {
    ten: 'Caramel hóa và phản ứng Maillard', camera: { pos: [CX + 0.6, 0.4, 13.8], target: [CX, -0.05, 0] }, khoangCachMax: 20,
    boPhan: boPhan, trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#E8B04A', 'Dung dịch bắt đầu sẫm màu'], ['#4A2511', 'Sản phẩm sẫm màu (melanoidin, caramel)']],
    buoc: [
      { ten: 'Nhóm –NH₂ của acid amin gặp nhóm –CHO của đường khử', pha: [], bp: 'amin' },
      { ten: 'Gia nhiệt: hai nhóm kết hợp và tách ra một phân tử nước', pha: [], bp: 'duongkhu' },
      { ten: 'Phản ứng tiếp diễn tạo melanoidin làm dung dịch sẫm màu', pha: [], bp: 'melanoidin' },
      { ten: 'Caramel hóa: đường chịu nhiệt tạo sản phẩm đen, vị đắng', pha: [], bp: 'caramel' },
      { ten: 'Làm nguội nhanh: phản ứng chậm lại, màu không đậm thêm', pha: [] },
    ],
  };
};
