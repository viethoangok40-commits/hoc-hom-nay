/* Mô hình: CÁC LỚP NƯỚC QUANH ĐẠI PHÂN TỬ – bài D007, Cảnh 1.3.
   NGUỒN BÀI (khẳng định của bài, theo Kuna): nước liên kết gắn vào vị trí phân cực hoặc ion trên tinh bột, pectin, protein; lớp sát đại phân tử bị giữ chặt nhất, lớp ngoài giữ lỏng dần và kém trật tự hơn;
   nước liên kết thường được định nghĩa theo cách đo.
   KIẾN THỨC NỀN (đã tra): nghiên cứu nước hydrat hóa protein phân biệt nước liên kết mạnh và liên kết yếu (Hishida 2023, PMC10364084).
   Cách vẽ của album (không phải số đo): đại phân tử là chuỗi cong với các chỗ phân cực đỏ/xanh; ba vùng nước, số phân tử, thanh "mức lấy nước ra" và thứ tự rời đi (nước tự do trước, lớp ngoài sau, lớp sát gần như
   không rời) chỉ để thấy mức giữ chặt khác nhau; không có số đo năng lượng hay nhiệt độ. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['lop-nuoc-lien-ket'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  var mK = can(0x8D6E63), mAm = can(0xEF5350, { emissive: 0xB71C1C, emissiveIntensity: 0.35 }), mDu = can(0x5C6BC0, { emissive: 0x283593, emissiveIntensity: 0.35 });
  var mO1 = can(0x0D47A1, { emissive: 0x0D47A1, emissiveIntensity: 0.3 }), mO2 = can(0x1E88E5), mO3 = can(0x81D4FA), mH = can(0xF5F7F9);
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var chuoi = new T.Group(), i, k;
  function duong(t) { return [-3.2 + 6.4 * t, 1.9 + 0.35 * Math.sin(t * 7.5), 0.35 * Math.sin(t * 5.1)]; }
  var prev = null, sites = [];
  for (i = 0; i <= 26; i++) { var p = duong(i / 26); chuoi.add(U.sphere(0.2, mK, p)); if (prev) chuoi.add(U.tube(prev, p, 0.13, mK)); prev = p; }
  for (i = 0; i < 14; i++) {
    var t = (i + 0.5) / 14, c = duong(t), a = i * 2.2, dir = [0, Math.cos(a), Math.sin(a)], q = [c[0], c[1] + dir[1] * 0.3, c[2] + dir[2] * 0.3];
    chuoi.add(U.sphere(0.12, i % 2 ? mAm : mDu, q)); sites.push({ c: c, d: dir, am: i % 2 });
  }
  function nuoc(mO) { var g = new T.Group(); g.add(U.sphere(0.12, mO, [0, 0, 0])); g.add(U.sphere(0.065, mH, [0.1, 0.1, 0])); g.add(U.sphere(0.065, mH, [-0.1, 0.1, 0])); return g; }
  var lop1 = new T.Group(), lop2 = new T.Group(), tudo = new T.Group(), W = [];
  function them(grp, mO, tang, n) {
    for (k = 0; k < n; k++) {
      var m = nuoc(mO), s = sites[k % sites.length], r, base, ang;
      if (tang === 1) { r = 0.6; ang = (k >= sites.length ? 0.55 : -0.12); base = [s.c[0] + (k >= sites.length ? 0.22 : -0.04), s.c[1] + Math.cos(Math.atan2(s.d[2], s.d[1]) + ang) * r, s.c[2] + Math.sin(Math.atan2(s.d[2], s.d[1]) + ang) * r]; }
      else if (tang === 2) { r = 1.02 + 0.1 * ((k * 0.618) % 1); var b = k * 2.399963, c2 = duong((k + 0.5) / n); base = [c2[0], c2[1] + Math.cos(b) * r, c2[2] + Math.sin(b) * r]; }
      else { var b3 = k * 2.399963, r3 = 1.65 + 0.85 * ((k * 0.7548776) % 1); base = [-3.4 + 6.8 * ((k * 0.618034) % 1), 1.9 + Math.cos(b3) * r3 * 0.8, Math.sin(b3) * r3]; }
      grp.add(m); W.push({ g: m, base: base, tang: tang, s: s, k: k, ph: k * 1.7 + tang, roi: (k * 0.5698) % 1 });
    }
  }
  them(lop1, mO1, 1, 22); them(lop2, mO2, 2, 26); them(tudo, mO3, 3, 30);
  var tt = new T.Group(); tt.add(U.box(10, 0.08, 5, can(0x1E262E), [0, -0.95, 0]));
  function capNhat(tg, e, val) {
    var f = val ? val.lay / 100 : 0;
    W.forEach(function (w) {
      var bien = w.tang === 1 ? 0.018 : w.tang === 2 ? 0.07 : 0.2, toc = w.tang === 1 ? 2 : w.tang === 2 ? 3 : 3.6;
      // ngưỡng rời đi: tự do 0–55%, lớp ngoài 45–90%, lớp sát chỉ vài phân tử rời ở sát 100%
      var ng = w.tang === 3 ? 0.55 * w.roi : w.tang === 2 ? 0.45 + 0.45 * w.roi : 0.93 + 0.6 * w.roi, di = sm((f - ng) / 0.08);
      var jx = Math.sin(tg * toc + w.ph) * bien, jy = Math.cos(tg * toc * 0.83 + w.ph * 2) * bien, jz = Math.sin(tg * toc * 0.71 + w.ph * 3) * bien;
      w.g.position.set(w.base[0] + jx, w.base[1] + jy + di * 3.2, w.base[2] + jz);
      w.g.scale.setScalar(Math.max(0.001, 1 - di));
      if (w.tang === 1) { var th = Math.atan2(w.s.d[2], w.s.d[1]); w.g.rotation.set(th + (w.s.am ? 0 : Math.PI), 0, 0); }
      else if (w.tang === 2) w.g.rotation.set(w.ph + 0.35 * Math.sin(tg * 1.3 + w.ph), 0.5 * Math.sin(tg + w.ph), 0.4 * Math.sin(tg * 1.7 + w.ph));
      else w.g.rotation.set(tg * 1.5 + w.ph, tg * 1.1 + w.ph * 2, w.ph);
    });
  }
  capNhat(0, 0, { lay: 0 });
  return {
    ten: 'Các lớp nước quanh đại phân tử', camera: { pos: [0.8, 3.0, 11.2], target: [0, 1.85, 0] }, khoangCachMax: 17,
    dieuKhien: [{ id: 'lay', nhan: 'Mức lấy nước ra', min: 0, max: 100, buoc: 1, mac: 0, don: '', chu: function (v) { return v < 5 ? 'chưa' : v < 55 ? 'nước tự do rời' : v < 92 ? 'lớp ngoài rời' : 'còn lớp sát'; } }],
    boPhan: [
      { so: 1, id: 'daiphantu', ten: 'Đại phân tử và chỗ phân cực', obj: chuoi, neo: [-3.4, 1.8, 0], tach: [0, 0, 0], chucNang: 'Tinh bột, pectin, protein có các vị trí phân cực hoặc ion để nước gắn vào.' },
      { so: 2, id: 'lopsat', ten: 'Lớp nước sát (giữ chặt nhất)', obj: lop1, neo: [-1.2, 3.0, 0.4], tach: [0, 0.6, 0.6], chucNang: 'Lớp nước sát đại phân tử bị giữ chặt nhất, rất khó lấy ra.' },
      { so: 3, id: 'lopngoai', ten: 'Lớp ngoài (giữ lỏng dần)', obj: lop2, neo: [1.5, 3.4, 0.4], tach: [0, 1.2, 0.8], chucNang: 'Các lớp ngoài giữ lỏng dần và kém trật tự hơn.' },
      { so: 4, id: 'tudo', ten: 'Nước tự do bên ngoài', obj: tudo, neo: [3.4, 4.1, 0], tach: [1.2, 1.6, 0], chucNang: 'Ở xa đại phân tử, chuyển động tự do hơn.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#0D47A1', 'Nước lớp sát'], ['#81D4FA', 'Nước tự do']],
    buoc: [
      { ten: 'Đại phân tử có các chỗ phân cực hoặc ion', pha: [], bp: 'daiphantu' },
      { ten: 'Nước gắn sát vào đó, bị giữ chặt nhất', pha: [], bp: 'lopsat' },
      { ten: 'Lớp ngoài giữ lỏng dần và kém trật tự hơn', pha: [], bp: 'lopngoai' },
      { ten: 'Lấy nước ra: nước ngoài đi trước, lớp sát rất khó lấy', pha: [], bp: 'lopsat' },
    ],
  };
};
