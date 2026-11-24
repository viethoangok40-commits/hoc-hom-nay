/* Mô hình: CHLOROPHYLL ĐỔI THÀNH PHEOPHYTIN – bài CNTP-Ngay09, Cảnh 4.1/4.3 (slide "Ảnh hưởng đến thực phẩm" phần màu và mùi, ghi chú lớp về kiềm).
   NGUỒN BÀI (chỉ những điều này là khẳng định của bài): chlorophyll trong môi trường acid hoặc có oxy bị biến đổi thành pheophytin màu vàng xanh hoặc nâu; ghi chú lớp: bổ sung kiềm vào nước chần để khắc phục
   chlorophyll phân hủy (loại kiềm chưa rõ, Cần kiểm tra).
   KIẾN THỨC NỀN (đã tra, chỉ để vẽ đúng, KHÔNG thành khẳng định của bài): chlorophyll là vòng porphyrin có ion Mg2+ ở tâm, bốn nguyên tử N bao quanh, đuôi phytol kỵ nước; trong acid yếu, H+ thế chỗ Mg2+ ở tâm
   (Mg rời đi, hai N nhận H) tạo pheophytin màu ô liu/nâu; môi trường kiềm không có H+ nên tâm Mg được giữ, màu xanh bền hơn (ScienceDirect Topics "Chlorophyllin"; Zhang 2025 PMC12248490 "Vegetable Color Stability";
   Gunawan, nghiên cứu bông cải xanh chần). Vòng, số nguyên tử và đuôi vẽ rút gọn (không đủ nhóm thế của chlorophyll a thật); ion H+/OH- bay quanh, thời gian và màu là cách vẽ của album. Không vẽ trường hợp có oxy. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['chlorophyll-pheophytin'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  var mB = can(0xB9C0C7), mN = can(0x3F6FE0), mC = can(0x6B7078), mH = can(0xF2F5F7), mMg = can(0x9BE37A, { emissive: 0x4FA03A, emissiveIntensity: 0.5 });
  var L1 = 1.45, L2 = -1.45, MX = -0.8;
  var VERDE = new T.Color(0x2E9E3A), OLIU = new T.Color(0x8C7B2B), cc = new T.Color();
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function phanTu() {
    var g = new T.Group(), ring = can(0x2E9E3A), k, i, mg = new T.Group(), hs = [], R = 0.85, r = 0.45;
    var rp = []; for (k = 0; k < 16; k++) { var a = k * Math.PI / 8; rp.push([Math.cos(a) * R, Math.sin(a) * R, 0]); g.add(U.sphere(0.09, ring, rp[k])); }
    for (k = 0; k < 16; k++) g.add(U.tube(rp[k], rp[(k + 1) % 16], 0.03, mB));
    var Np = []; for (k = 0; k < 4; k++) { var b = k * Math.PI / 2; Np.push([Math.cos(b) * r, Math.sin(b) * r, 0]); g.add(U.sphere(0.12, mN, Np[k])); g.add(U.tube(Np[k], rp[(k * 4 + 1) % 16], 0.03, mB)); g.add(U.tube(Np[k], rp[(k * 4 + 15) % 16], 0.03, mB)); }
    var bonds = []; for (k = 0; k < 4; k++) { var t = U.tube([0, 0, 0], Np[k], 0.025, mB); mg.add(t); }
    mg.add(U.sphere(0.2, mMg, [0, 0, 0])); g.add(mg);
    [1, -1].forEach(function (s) { var h = new T.Group(); h.add(U.sphere(0.07, mH, [0, s * 0.25, 0])); h.add(U.tube([0, s * 0.25, 0], [0, s * 0.45, 0], 0.025, mB)); h.visible = false; g.add(h); hs.push(h); });
    var pt = [rp[0]], tp = [0.85, 0, 0]; for (i = 1; i <= 9; i++) { var p = [0.85 + 0.3 * i, (i % 2 ? 0.1 : -0.1), 0]; pt.push(p); g.add(U.sphere(0.06, mC, p)); g.add(U.tube(pt[i - 1], p, 0.025, mC)); }
    g.userData = { ring: ring, mg: mg, hs: hs }; g.rotation.set(-0.3, 0.3, 0); return g;
  }
  var m1 = phanTu(), m2 = phanTu();
  m1.position.set(MX, L1, 0); m2.position.set(MX, L2, 0);
  var acid = new T.Group(); acid.add(m1); var kiem = new T.Group(); kiem.add(m2);
  // ion bay quanh: H+ (cam) hàng trên, OH- (lam) hàng dưới
  var mHp = can(0xFFB74D, { emissive: 0xFF8F00, emissiveIntensity: 0.4 }), mOH = can(0x4FC3F7, { emissive: 0x0288D1, emissiveIntensity: 0.3 });
  var tt = new T.Group(), ionA = [], ionK = [], j;
  for (j = 0; j < 6; j++) { var s1 = U.sphere(0.11, mHp, [0, 0, 0]), s2 = U.sphere(0.12, mOH, [0, 0, 0]); tt.add(s1); tt.add(s2); ionA.push(s1); ionK.push(s2); }
  function oDd(y, mau) { var m = can(mau, { transparent: true, opacity: 0.12, depthWrite: false }); tt.add(U.box(9.2, 2.3, 1.6, m, [0, y, 0])); }
  oDd(L1, 0xE8D0B0); oDd(L2, 0xBFDDF2);
  tt.add(U.box(11, 0.1, 3, can(0x1E262E), [0, -2.95, 0]));
  var VT = new T.Vector3();
  function bay(ion, j, tg, L, rungKy) {
    var R = 1.5 + 0.35 * j, a = tg * (0.45 + 0.1 * j) * (j % 2 ? 1 : -1) + j * 1.1;
    return [Math.cos(a) * R * 1.35, L + Math.sin(a) * 0.9 * (R / 3.6) * (1 + 0.2 * Math.sin(tg + j)), Math.sin(a * 1.3) * 0.4];
  }
  function capNhat(tg) {
    var u = (tg % 12) / 12, fade = u < 0.92 ? 1 : 1 - sm((u - 0.92) / 0.08);
    // hàng acid: H+ thế chỗ Mg2+, vòng sang màu ô liu
    var s = sm((u - 0.25) / 0.2) * fade, ud = u < 0.92 ? sm((u - 0.2) / 0.25) : 0;
    m1.updateMatrixWorld(true);
    ionA.forEach(function (io, k) {
      var p = bay(io, k, tg, L1);
      if (k < 2) { VT.set(0, (k ? -1 : 1) * 0.25, 0); m1.localToWorld(VT); io.position.set(p[0] + (VT.x - p[0]) * s, p[1] + (VT.y - p[1]) * s, p[2] + (VT.z - p[2]) * s); io.visible = !(s > 0.98 && u < 0.93); }
      else io.position.set(p[0], p[1], p[2]);
    });
    var ud1 = m1.userData; ud1.hs.forEach(function (h) { h.visible = s > 0.98 && u < 0.93; });
    var mgS = u < 0.92 ? 1 - sm((u - 0.3) / 0.15) : sm((u - 0.92) / 0.08);
    ud1.mg.position.set(0, 0.3 * ud, 2.2 * ud); ud1.mg.scale.setScalar(Math.max(0.001, mgS));
    var cs = sm((u - 0.35) / 0.25) * fade; cc.copy(VERDE).lerp(OLIU, cs); ud1.ring.color.copy(cc);
    // hàng kiềm: OH- không thế được Mg, vòng vẫn xanh
    ionK.forEach(function (io, k) { var p = bay(io, k, tg + 3, L2); io.position.set(p[0], p[1], p[2]); });
  }
  capNhat(0);
  var boPhan = [
    { so: 1, id: 'acid', ten: 'Chlorophyll → pheophytin (acid)', obj: acid, neo: [MX - 0.4, L1 + 1.2, 0], tach: [0, 0.9, 0], chucNang: 'Chlorophyll trong môi trường acid bị biến đổi thành pheophytin vàng xanh hoặc nâu.' },
    { so: 2, id: 'kiem', ten: 'Chlorophyll (môi trường kiềm)', obj: kiem, neo: [MX - 0.4, L2 - 1.4, 0], tach: [0, -0.5, 0], chucNang: 'Ghi chú lớp: bổ sung kiềm vào nước chần để khắc phục chlorophyll phân hủy (Cần kiểm tra loại kiềm).' },
  ];
  return {
    ten: 'Chlorophyll đổi thành pheophytin', camera: { pos: [0.4, 0.4, 13.8], target: [0, -0.05, 0] }, khoangCachMax: 20,
    boPhan: boPhan, trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFB74D', 'H⁺ (môi trường acid)'], ['#4FC3F7', 'OH⁻ (môi trường kiềm)']],
    buoc: [
      { ten: 'Chlorophyll màu xanh, ion Mg ở tâm vòng', pha: [], bp: 'acid' },
      { ten: 'Môi trường acid: H⁺ thế chỗ Mg ở tâm', pha: [], bp: 'acid' },
      { ten: 'Thành pheophytin màu vàng xanh hoặc nâu', pha: [], bp: 'acid' },
      { ten: 'Môi trường kiềm: chlorophyll giữ màu xanh', pha: [], bp: 'kiem' },
    ],
  };
};
