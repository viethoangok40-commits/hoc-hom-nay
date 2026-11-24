/* Mô hình: MẠNG LIÊN KẾT HYDRO VÀ ĐIỂM SÔI CỦA NƯỚC – bài D006, Cảnh 4.1 (và Cảnh 3.2).
   NGUỒN BÀI (khẳng định của bài): nước sôi ở khoảng 100 °C, cao hơn nhiều so với dự đoán theo xu hướng nhóm 16 (khoảng −80 °C; OpenStax Chemistry 2e, mục 10.1); chênh lệch được giải thích bằng liên kết hydro:
   muốn nước sôi phải làm đứt cả mạng liên kết đó; trong nước lỏng liên kết hydro liên tục hình thành và đứt, mỗi phân tử tối đa bốn liên kết (OpenStax Biology 2e Hình 2.13; Kuna).
   Cách vẽ của album (không phải số đo): tám phân tử xếp lỏng lẻo, chấm trắng nhỏ dọc đường nối O···H là liên kết hydro, nhiệt độ tăng theo thời gian vẽ, ngưỡng đứt của từng liên kết, hướng bay hơi.
   Không có số nhiệt độ trên mô hình; số 100 °C và −80 °C chỉ nằm trong chữ của bài. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['mang-lien-ket-hydro'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  var mO = can(0xE53935), mH = can(0xF2F5F7), mB = can(0xB9C0C7), mD = can(0x4FC3F7, { emissive: 0x0288D1, emissiveIntensity: 0.6 });
  var A = 105 * Math.PI / 180 / 2, BL = 0.55;
  var hH1 = [Math.sin(A) * BL, -Math.cos(A) * BL, 0], hH2 = [-Math.sin(A) * BL, -Math.cos(A) * BL, 0];
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var N = 8, i, j;
  // tâm, hướng quay cố định của tám phân tử (hình khối lỏng lẻo)
  var base = [], rot = [];
  for (i = 0; i < N; i++) {
    var a = i * 2.399, r = 1.15 + 0.35 * (i % 3);
    base.push([Math.cos(a) * r * 1.35, ((i % 4) - 1.5) * 0.9, Math.sin(a) * r * 0.9]);
    rot.push([i * 1.7, i * 2.3, i * 0.9]);
  }
  var mol = new T.Group(), bonds = new T.Group(), moles = [], Ho = [];
  for (i = 0; i < N; i++) {
    var g = new T.Group(); g.add(U.sphere(0.2, mO, [0, 0, 0])); g.add(U.sphere(0.12, mH, hH1)); g.add(U.sphere(0.12, mH, hH2));
    g.add(U.tube([0, 0, 0], hH1, 0.035, mB)); g.add(U.tube([0, 0, 0], hH2, 0.035, mB));
    g.rotation.set(rot[i][0], rot[i][1], rot[i][2]); g.position.set(base[i][0], base[i][1], base[i][2]); mol.add(g); moles.push(g);
  }
  mol.updateMatrixWorld(true);
  var V = new T.Vector3();
  function hPos(m, k) { V.set(k ? hH2[0] : hH1[0], k ? hH2[1] : hH1[1], 0); moles[m].localToWorld(V); return V.toArray(); }
  // chọn cặp liên kết hydro: mỗi H nối với O gần nhất của phân tử khác (tối đa hai nhận mỗi O)
  var pairs = [], nhan = []; for (i = 0; i < N; i++) nhan.push(0);
  var cand = [];
  for (i = 0; i < N; i++) for (var h = 0; h < 2; h++) { var p = hPos(i, h); for (j = 0; j < N; j++) if (j !== i) { var d = Math.hypot(p[0] - base[j][0], p[1] - base[j][1], p[2] - base[j][2]); cand.push([d, i, h, j]); } }
  cand.sort(function (x, y) { return x[0] - y[0]; });
  var usedH = {}; cand.forEach(function (c) { var key = c[1] + ':' + c[2]; if (usedH[key] || nhan[c[3]] >= 2 || c[0] > 2.6) return; usedH[key] = 1; nhan[c[3]]++; pairs.push({ m: c[1], h: c[2], o: c[3], thr: 0.12 + 0.5 * Math.random() }); });
  // ngưỡng đứt cố định (không dùng ngẫu nhiên lúc chạy để cảnh lặp lại giống nhau)
  pairs.forEach(function (p, k) { p.thr = 0.12 + ((k * 0.37) % 1) * 0.5; p.ph = k * 1.3; });
  pairs.forEach(function (p) { p.dots = []; for (var s = 0; s < 4; s++) { var d = U.sphere(0.045, mD, [0, 0, 0]); bonds.add(d); p.dots.push(d); } });
  var tt = new T.Group(); tt.add(U.box(9, 0.08, 5, can(0x1E262E), [0, -2.4, 0]));
  var dirs = base.map(function (b, k) { return [Math.cos(k * 1.9) * 0.6, 1, Math.sin(k * 1.9) * 0.6]; });
  function capNhat(tg) {
    var u = (tg % 14) / 14, Tn = u < 0.05 ? 0 : u < 0.7 ? (u - 0.05) / 0.65 : 1, boi = sm((u - 0.7) / 0.2), fade = u < 0.92 ? 1 : 1 - sm((u - 0.92) / 0.08), k;
    var jit = (0.03 + 0.28 * Tn * Tn) * fade;
    for (k = 0; k < N; k++) {
      var g = moles[k], e = boi * fade, d = dirs[k];
      g.position.set(base[k][0] + Math.sin(tg * 4.1 + k) * jit + d[0] * 3.2 * e, base[k][1] + Math.sin(tg * 3.3 + k * 2) * jit + d[1] * (1.8 + 0.3 * k % 3) * e, base[k][2] + Math.sin(tg * 5.2 + k * 3) * jit + d[2] * 3.2 * e);
      g.rotation.set(rot[k][0] + tg * 0.2 * (0.3 + Tn), rot[k][1] + tg * 0.25 * (0.3 + Tn), rot[k][2]);
    }
    mol.updateMatrixWorld(true);
    pairs.forEach(function (p) {
      var on = Tn < p.thr + 0.06 * Math.sin(tg * 6 + p.ph) * Tn || (Tn < 0.15 && true); // liên kết còn nối nếu chưa quá ngưỡng, nhấp nháy khi nóng
      on = on && boi < 0.02 && fade > 0.5;
      var a = hPos(p.m, p.h), b = moles[p.o].position;
      p.dots.forEach(function (d, s) { d.visible = on; d.position.set(a[0] + (b.x - a[0]) * (0.25 + s * 0.17), a[1] + (b.y - a[1]) * (0.25 + s * 0.17), a[2] + (b.z - a[2]) * (0.25 + s * 0.17)); });
    });
  }
  capNhat(0);
  return {
    ten: 'Mạng liên kết hydro và điểm sôi của nước', camera: { pos: [0.6, 1.0, 9.2], target: [0, -0.2, 0] },
    boPhan: [
      { so: 1, id: 'phantunuoc', ten: 'Phân tử nước', obj: mol, neo: [-2.8, 1.8, 0], tach: [-0.8, 0.6, 0], chucNang: 'Mỗi phân tử nước tạo tối đa bốn liên kết hydro với các phân tử khác.' },
      { so: 2, id: 'lienkethydro', ten: 'Liên kết hydro', obj: bonds, neo: [2.4, 1.6, 0], tach: [0.8, 0.6, 0], chucNang: 'Muốn nước sôi phải làm đứt cả mạng liên kết hydro, nên nước sôi cao bất thường.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#4FC3F7', 'Liên kết hydro (chấm)'], ['#E53935', 'Nguyên tử oxy']],
    buoc: [
      { ten: 'Các phân tử nước nối nhau bằng liên kết hydro', pha: [], bp: 'lienkethydro' },
      { ten: 'Nóng lên: phân tử chuyển động mạnh, liên kết đứt rồi nối lại', pha: [], bp: 'phantunuoc' },
      { ten: 'Đến điểm sôi mạng liên kết đứt hết, phân tử bay ra thành hơi', pha: [], bp: 'lienkethydro' },
    ],
  };
};
