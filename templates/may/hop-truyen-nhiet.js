/* Mô hình: NHIỆT ĐI VÀO TÂM HỘP KHI THANH TRÙNG – bài CNTP-Ngay05, Cảnh 4.2.
   NGUỒN BÀI (khẳng định của bài, Lê Mỹ Hồng 2005, chương 4): t1 là thời gian nhiệt đi từ môi trường qua bao bì vào tâm, t2 là thời gian giữ ở nhiệt độ thanh trùng; trong t1 một số vi sinh vật đã bị diệt nên
   t thực tế < t1 + t2; tâm hộp đạt nhiệt độ thanh trùng chậm hơn thiết bị khoảng 13–15 phút với sản phẩm lỏng (đối lưu), khoảng 40 phút với sản phẩm đặc (dẫn nhiệt), khoảng 28 phút với loại vừa đặc vừa lỏng.
   KIẾN THỨC NỀN (đã tra, USDA FSIS "Module 6 – Principles of Thermal Processing"): sản phẩm dẫn nhiệt có điểm nguội nhất ở tâm hình học; sản phẩm đối lưu thường nguội nhất ở khoảng 1/4 chiều cao từ đáy (có thể khác).
   Cách vẽ của album (không phải số đo): hai hộp cắt dọc trong cùng môi trường nóng; 1 giây trên màn hình ≈ 2 phút; hộp lỏng dùng mốc 14 phút (giữa khoảng 13–15), hộp đặc 40 phút; màu từ xanh (nguội) sang đỏ
   (đạt nhiệt độ thanh trùng) là định tính, không có số nhiệt độ; dòng đối lưu và mặt nóng lan dần là minh họa. Không vẽ loại vừa đặc vừa lỏng và giai đoạn làm nguội. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['hop-truyen-nhiet'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.55 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var PAL = [], i, k, c0 = new T.Color(0x1E5AA8), c1 = new T.Color(0xFDD835), c2 = new T.Color(0xE53935);
  for (i = 0; i < 14; i++) { var u = i / 13, c = new T.Color(); if (u < 0.5) c.copy(c0).lerp(c1, u * 2); else c.copy(c1).lerp(c2, (u - 0.5) * 2); var m = can(0xffffff); m.color.copy(c); m.emissive = c.clone(); m.emissiveIntensity = 0.35; PAL.push(m); }
  function mau(t) { return PAL[Math.max(0, Math.min(13, Math.round(t * 13)))]; }
  var XL = -2.15, XD = 2.15, R = 1.25, H = 3.0, Y0 = 0.5, mKim = can(0xCFD8DC, { metalness: 0.75, roughness: 0.28 });
  var tt = new T.Group(), long = new T.Group(), dac = new T.Group(), nguoi = new T.Group(), tg3 = new T.Group();
  function vo(g, x) { var s = new T.Mesh(new T.CylinderGeometry(R, R, H, 40, 1, true, Math.PI / 2, Math.PI), mKim); s.material.side = T.DoubleSide; s.position.set(x, Y0 + H / 2, 0); g.add(s);
    [Y0, Y0 + H].forEach(function (y) { var r = new T.Mesh(new T.TorusGeometry(R, 0.06, 8, 48), mKim); r.rotation.x = Math.PI / 2; r.position.set(x, y, 0); g.add(r); }); }
  vo(long, XL); vo(dac, XD);
  // hộp lỏng: phân tử đi theo vòng đối lưu (lên sát thành, xuống ở giữa)
  var hl = []; for (k = 0; k < 90; k++) { var s = U.sphere(0.095, PAL[0], [0, 0, 0]); long.add(s); hl.push(s); }
  // hộp đặc: lát cắt dọc gồm các khối nhỏ đứng yên, mặt nóng lan từ ngoài vào
  var cube = [], NX = 11, NY = 13;
  for (i = 0; i < NX; i++) for (k = 0; k < NY; k++) { var b = U.box(2 * R / NX - 0.025, H / NY - 0.025, 0.18, PAL[0], [XD - R + (i + 0.5) * 2 * R / NX, Y0 + (k + 0.5) * H / NY, 0]); dac.add(b); var dx = Math.min(i + 0.5, NX - i - 0.5) / (NX / 2), dy = Math.min(k + 0.5, NY - k - 0.5) / (NY / 2); cube.push({ m: b, d: Math.min(dx, dy) }); }
  // đánh dấu điểm nguội nhất
  var mVong = can(0xFFFFFF, { emissive: 0xFFFFFF, emissiveIntensity: 0.8 });
  [[XL, Y0 + H * 0.25], [XD, Y0 + H * 0.5]].forEach(function (p) { var v = new T.Mesh(new T.TorusGeometry(0.28, 0.035, 8, 32), mVong); v.position.set(p[0], p[1], 0.65); nguoi.add(v); });
  // thanh thời gian: vạch 14 phút và 40 phút trên cùng một thang 0–44 phút
  var X0 = -3.4, DAI = 6.8, YT = 4.35;
  tg3.add(U.box(DAI, 0.09, 0.2, can(0x455A64), [0, YT, 0]));
  var chay = new T.Mesh(new T.BoxGeometry(1, 0.17, 0.24), can(0xFF7043, { emissive: 0xD84315, emissiveIntensity: 0.55 })); chay.geometry.translate(0.5, 0, 0); chay.position.set(X0, YT, 0); tg3.add(chay);
  var den = []; [[14, 0x4FC3F7], [40, 0xFFB74D]].forEach(function (p) { var d = U.sphere(0.2, can(p[1], { emissive: p[1], emissiveIntensity: 0.2 }), [X0 + DAI * p[0] / 44, YT + 0.32, 0]); d.material = d.material.clone(); tg3.add(d); den.push(d); });
  // bể gia nhiệt
  tt.add(U.box(8.4, 0.16, 3.2, can(0x5D4037, { emissive: 0xFF3D00, emissiveIntensity: 0.55 }), [0, 0.2, 0]));
  tt.add(U.box(8.4, 3.55, 3.2, mo(0xFF8A65, 0.05), [0, 2.05, 0]));
  tt.add(U.box(10, 0.08, 4.4, can(0x1E262E), [0, 0.02, 0]));
  function capNhat(tg) {
    var phut = (tg * 2) % 48, p = Math.min(phut, 44);
    var tl = Math.min(1, p / 14), td = p / 40;
    for (k = 0; k < 90; k++) {
      var f = (tg * 0.16 + (k * 0.618) % 1) % 1, ben = k % 2 ? 1 : -1, z = ((k * 0.7548776) % 1) * 0.35 - 0.1, lech = 0.12 * ((k * 0.569) % 1);
      var x, y, top = Y0 + H - 0.2 - lech, bot = Y0 + 0.2 + lech, ngoai = R - 0.17 - lech, trong = 0.2 + lech;
      if (f < 0.38) { x = ben * ngoai; y = bot + (top - bot) * (f / 0.38); }
      else if (f < 0.5) { x = ben * (ngoai - (ngoai - trong) * ((f - 0.38) / 0.12)); y = top; }
      else if (f < 0.88) { x = ben * trong; y = top - (top - bot) * ((f - 0.5) / 0.38); }
      else { x = ben * (trong + (ngoai - trong) * ((f - 0.88) / 0.12)); y = bot; }
      var gan = Math.max(0, 1 - Math.hypot(x, y - (Y0 + H * 0.25)) / 0.9);
      hl[k].position.set(XL + x, y, z); hl[k].material = mau(sm(tl) * (1 - 0.35 * gan * (1 - tl)));
    }
    cube.forEach(function (o) { var v = sm((td * 1.55 - o.d) / 0.55); o.m.material = mau(td >= 1 ? 1 : v * 0.97); });
    chay.scale.x = Math.max(0.001, DAI * p / 44);
    den[0].material.emissiveIntensity = p >= 14 ? 1.1 : 0.12; den[1].material.emissiveIntensity = p >= 40 ? 1.1 : 0.12;
    den[0].scale.setScalar(p >= 14 ? 1.25 : 1); den[1].scale.setScalar(p >= 40 ? 1.25 : 1);
  }
  capNhat(0);
  return {
    ten: 'Nhiệt đi vào tâm hộp', camera: { pos: [0.5, 3.9, 12.8], target: [0, 2.35, 0] }, khoangCachMax: 19,
    boPhan: [
      { so: 1, id: 'long', ten: 'Sản phẩm lỏng (đối lưu)', obj: long, neo: [XL - 1.35, 3.0, 0], tach: [-1.0, 0, 0], chucNang: 'Truyền nhiệt bằng đối lưu; tâm đạt nhiệt độ thanh trùng chậm hơn thiết bị khoảng 13–15 phút.' },
      { so: 2, id: 'dac', ten: 'Sản phẩm đặc (dẫn nhiệt)', obj: dac, neo: [XD + 1.35, 3.0, 0], tach: [1.0, 0, 0], chucNang: 'Truyền nhiệt bằng dẫn nhiệt, vào tâm chậm nhất; chậm hơn thiết bị khoảng 40 phút.' },
      { so: 3, id: 'diemnguoi', ten: 'Chỗ nóng chậm nhất', obj: nguoi, neo: [XD + 0.4, Y0 + H * 0.5, 1.1], tach: [0, 0, 1.4], chucNang: 'Nơi cần đạt nhiệt độ thanh trùng sau cùng.' },
      { so: 4, id: 'thoigian', ten: 'Thời gian truyền nhiệt t₁', obj: tg3, neo: [X0 - 0.1, YT + 0.45, 0], tach: [0, 0.9, 0], chucNang: 'Thời gian nhiệt đi từ môi trường qua bao bì vào tâm; đèn xanh khoảng 14 phút, đèn cam khoảng 40 phút.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#1E5AA8', 'Còn nguội'], ['#E53935', 'Đạt nhiệt độ thanh trùng']],
    buoc: [
      { ten: 'Nhiệt đi từ môi trường qua bao bì vào hộp', pha: [], bp: 'thoigian' },
      { ten: 'Sản phẩm lỏng: đối lưu, tâm nóng nhanh hơn', pha: [], bp: 'long' },
      { ten: 'Sản phẩm đặc: dẫn nhiệt, tâm nóng chậm nhất', pha: [], bp: 'dac' },
      { ten: 'Trong lúc truyền nhiệt đã có vi sinh vật bị diệt: t thực tế < t₁ + t₂', pha: [], bp: 'diemnguoi' },
    ],
  };
};
