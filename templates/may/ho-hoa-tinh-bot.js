/* Mô hình: HỒ HÓA HẠT TINH BỘT – bài D014, Cảnh 1.2 và 2.2.
   NGUỒN BÀI (khẳng định của bài, theo Ratnayake và Jackson 2006; Chiodetti và cs. 2024; Teng và cs. 2025): hạt có vùng tinh thể (xoắn kép của nhánh ngoài amylopectin nối bằng liên kết hydro) xen vùng vô định hình
   (chủ yếu amylose và điểm nhánh của amylopectin); khi gia nhiệt trong nhiều nước, nước thấm vào vùng vô định hình trước làm hạt trương, rồi tinh thể mất ổn định, xoắn kép tháo ra, hạt mất lưỡng chiết,
   amylose rỉ ra, các chuỗi không bị cắt ngắn.
   Cách vẽ của album (không phải số đo): hạt hình cầu, 12 đoạn xoắn kép, các chuỗi vô định hình và 5 chuỗi amylose là tượng trưng; các đoạn tháo xoắn thay thế đoạn xoắn bằng chuyển cảnh (hình xoắn thu nhỏ rồi hai
   sợi lỏng hiện ra); chấm xanh là phân tử nước; thứ tự "tinh thể bị phá rồi mới rỉ amylose" là cách sắp xếp của album (bài ghi Cần kiểm tra vì amylose đã tham gia từ giai đoạn đầu). Không vẽ lamella, blocklet,
   vòng sinh trưởng. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ho-hoa-tinh-bot'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false }); }
  var mHel = can(0xE8744F), mHel2 = can(0xF2A07B), mAm = can(0x8FA3B8), mBr = can(0xFFB74D), mAy = can(0xC6E03A, { emissive: 0x7C9A00, emissiveIntensity: 0.35 }), mW = can(0x4FC3F7, { emissive: 0x0288D1, emissiveIntensity: 0.4 });
  var R = 1.7;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function tube(pts, r, mat) { return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(function (p) { return new T.Vector3(p[0], p[1], p[2]); })), 28, r, 6, false), mat); }
  var UP = new T.Vector3(0, 1, 0), k, i, t;
  // điểm trên mặt cầu (Fibonacci)
  function fib(n, N, rr) { var y = 1 - 2 * (n + 0.5) / N, r = Math.sqrt(1 - y * y), a = n * 2.399963; return new T.Vector3(Math.cos(a) * r * rr, y * rr, Math.sin(a) * r * rr); }
  // đoạn xoắn kép (hai sợi xoắn quanh trục y), và dạng tháo xoắn (hai sợi lỏng tách nhau)
  function xoan() {
    var g = new T.Group(); [0, Math.PI].forEach(function (off, s) {
      var pts = []; for (t = 0; t <= 1.0001; t += 0.04) pts.push([0.1 * Math.cos(off + t * 15.7), (t - 0.5) * 0.85, 0.1 * Math.sin(off + t * 15.7)]);
      g.add(tube(pts, 0.032, s ? mHel2 : mHel));
    }); return g;
  }
  function thao() {
    var g = new T.Group(); [-1, 1].forEach(function (s) {
      var pts = []; for (t = 0; t <= 1.0001; t += 0.08) pts.push([s * (0.18 + 0.1 * Math.sin(t * 7 + s)), (t - 0.5) * 0.85, 0.06 * Math.sin(t * 9 + s * 2)]);
      g.add(tube(pts, 0.03, s > 0 ? mHel2 : mHel));
    }); return g;
  }
  var hat = new T.Group();                       // phần trong hạt (co giãn khi trương)
  var tinhthe = new T.Group(), vodinhhinh = new T.Group(), helix = [], unw = [];
  for (k = 0; k < 12; k++) {
    var p = fib(k, 12, R * 0.62), rad = p.clone().normalize(), tan = new T.Vector3().crossVectors(rad, new T.Vector3(0.3, 1, 0.1)).normalize();
    var h = xoan(), u2 = thao(); [h, u2].forEach(function (g) { g.position.copy(p); g.quaternion.setFromUnitVectors(UP, tan); });
    u2.scale.setScalar(0.001); tinhthe.add(h); tinhthe.add(u2); helix.push(h); unw.push(u2);
  }
  // chuỗi vô định hình có điểm nhánh (đứng yên) xen giữa
  for (k = 0; k < 14; k++) {
    var c = fib(k + 3, 17, R * (0.35 + 0.45 * ((k * 0.37) % 1))), pts2 = [], dir = new T.Vector3(Math.sin(k * 1.7), Math.cos(k * 2.3), Math.sin(k * 0.9)).normalize();
    for (t = 0; t <= 1.0001; t += 0.14) pts2.push([c.x + dir.x * (t - 0.5) * 0.7 + 0.06 * Math.sin(t * 11 + k), c.y + dir.y * (t - 0.5) * 0.7 + 0.06 * Math.cos(t * 9 + k), c.z + dir.z * (t - 0.5) * 0.7]);
    vodinhhinh.add(tube(pts2, 0.022, mAm)); var mid = pts2[3]; vodinhhinh.add(U.sphere(0.05, mBr, mid));
  }

  // amylose: 5 chuỗi dài màu vàng xanh, nằm trong vùng vô định hình rồi rỉ ra
  var amylose = new T.Group(), amL = [], ayBase = [];
  for (k = 0; k < 5; k++) {
    var b = fib(k * 2 + 1, 11, R * 0.3), pt = [], dd = new T.Vector3(Math.sin(k * 2.1), Math.cos(k * 1.3), Math.sin(k * 0.7)).normalize();
    for (t = 0; t <= 1.0001; t += 0.1) pt.push([dd.x * (t - 0.5) * 1.5 + 0.07 * Math.sin(t * 13 + k), dd.y * (t - 0.5) * 1.5 + 0.07 * Math.cos(t * 11 + k), dd.z * (t - 0.5) * 1.5]);
    var m = tube(pt, 0.035, mAy); m.position.copy(b); amylose.add(m); amL.push(m); ayBase.push(b.clone());
  }
  // nước
  var nuoc = new T.Group(), W = [], wBase = [], wIn = [];
  for (k = 0; k < 40; k++) {
    var s = U.sphere(0.075, mW, [0, 0, 0]); nuoc.add(s); W.push(s);
    var a = k * 2.399963, y = ((k * 0.61) % 1) * 4.2 - 2.1, rr = 3.0 + ((k * 0.43) % 1) * 1.7;
    wBase.push([Math.cos(a) * rr, y, Math.sin(a) * rr * 0.6]);
    var q = fib(k, 40, R * (0.25 + 0.55 * ((k * 0.29) % 1))); wIn.push([q.x, q.y, q.z]);
  }
  // trang trí: vỏ hạt trong suốt, nước nền, bếp, đế
  var tt = new T.Group(), vo = U.sphere(R, mo(0xF0E6C8, 0.14), [0, 0, 0]); tt.add(vo);
  tt.add(U.box(11, 5.2, 3.6, mo(0xBFDDF2, 0.07), [0, 0, 0]));
  var bepM = can(0x3A2A26, { emissive: 0xFF5A1F, emissiveIntensity: 0.05 }); tt.add(U.box(11.2, 0.14, 3.8, bepM, [0, -2.75, 0])); tt.add(U.box(13, 0.1, 5, can(0x1E262E), [0, -3.0, 0]));
  var TRUOC = [0.15, 0.4], VUA = [0.4, 0.65], RI = [0.65, 0.88];
  function capNhat(tg) {
    var u = (tg % 18) / 18, f = u < 0.92 ? 1 : 1 - sm((u - 0.92) / 0.08), Tn = (u < 0.12 ? 0 : u < 0.2 ? sm((u - 0.12) / 0.08) : u < 0.8 ? 1 : 1 - sm((u - 0.8) / 0.15)) * 1;
    var pw = sm((u - TRUOC[0]) / (TRUOC[1] - TRUOC[0])) * f, sw = pw, pu = sm((u - VUA[0]) / (VUA[1] - VUA[0])) * f, pr = sm((u - RI[0]) / (RI[1] - RI[0])) * f, S = 1 + 0.45 * sw;
    tinhthe.scale.setScalar(S); vodinhhinh.scale.setScalar(S); vo.scale.setScalar(S);
    for (k = 0; k < 12; k++) { helix[k].scale.setScalar(Math.max(0.001, 1 - pu)); helix[k].rotation.y = pu * 6; unw[k].scale.setScalar(Math.max(0.001, pu)); }
    for (k = 0; k < 5; k++) {
      var b = ayBase[k], dirv = new T.Vector3().copy(b).normalize(); if (!dirv.lengthSq()) dirv.set(1, 0, 0);
      var out = pr * (2.2 + 0.6 * k), wob = Math.sin(tg * 2 + k) * 0.05;
      amL[k].position.set(b.x * S + dirv.x * out + wob, b.y * S + dirv.y * out + wob, b.z * S + dirv.z * out);
      amL[k].scale.setScalar(S);
    }
    for (k = 0; k < 40; k++) {
      var base = wBase[k], inn = wIn[k], goes = k < 24 ? sw : 0, jx = Math.sin(tg * (1 + k * 0.07) + k) * 0.12, jy = Math.cos(tg * (1.2 + k * 0.05) + k) * 0.12;
      W[k].position.set(base[0] + (inn[0] * S - base[0]) * goes + jx, base[1] + (inn[1] * S - base[1]) * goes + jy, base[2] + (inn[2] * S - base[2]) * goes);
    }
    bepM.emissiveIntensity = 0.05 + 1.2 * Tn;
  }
  capNhat(0);
  return {
    ten: 'Hồ hóa hạt tinh bột', camera: { pos: [0.5, 0.8, 12.5], target: [0, 0, 0] }, khoangCachMax: 18,
    boPhan: [
      { so: 1, id: 'tinhthe', ten: 'Vùng tinh thể (xoắn kép amylopectin)', obj: tinhthe, neo: [-2.6, 1.9, 0], tach: [-1.0, 0.6, 0], chucNang: 'Các nhánh ngoài của amylopectin xếp thành xoắn kép, nối bằng liên kết hydro; tháo ra khi hồ hóa.' },
      { so: 2, id: 'vodinhhinh', ten: 'Vùng vô định hình (amylose, điểm nhánh)', obj: vodinhhinh, neo: [2.4, 1.9, 0], tach: [1.0, 0.6, 0], chucNang: 'Chủ yếu amylose và các điểm nhánh của amylopectin; nước thấm vào đây trước.' },
      { so: 3, id: 'amylose', ten: 'Amylose', obj: amylose, neo: [3.6, -0.4, 0], tach: [1.0, -0.5, 0], chucNang: 'Rỉ ra khỏi hạt và phân tán trong nước khi hồ hóa; các chuỗi vẫn nguyên độ dài.' },
      { so: 4, id: 'nuoc', ten: 'Nước', obj: nuoc, neo: [-3.8, -1.4, 0], tach: [-1.0, -0.5, 0], chucNang: 'Thấm vào vùng vô định hình trước, làm hạt trương lên.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#E8744F', 'Xoắn kép (vùng tinh thể)'], ['#C6E03A', 'Amylose']],
    buoc: [
      { ten: 'Hạt nguyên: vùng tinh thể xen vùng vô định hình', pha: [], bp: 'tinhthe' },
      { ten: 'Nước thấm vào vùng vô định hình, hạt trương lên', pha: [], bp: 'nuoc' },
      { ten: 'Xoắn kép của tinh thể tháo ra, trật tự mất', pha: [], bp: 'tinhthe' },
      { ten: 'Amylose rỉ ra khỏi hạt; các chuỗi vẫn nguyên độ dài', pha: [], bp: 'amylose' },
    ],
  };
};
