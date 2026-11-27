/* Mô hình: LINH ĐỘNG TẠI CHỖ KHÁC DI CHUYỂN XA (T2 và tự khuếch tán D) – bài D007, Cảnh 2.4.
   NGUỒN BÀI (khẳng định của bài, theo Wiesman 2026): phân biệt độ linh động cục bộ (hồi phục T1, T2) với khả năng di chuyển xa đo bằng tự khuếch tán D; một phân tử có thể linh động tại chỗ nhưng vẫn bị giam
   trong khoang kín (vùng "T2 cao, D thấp"); rào chắn có thể là mạng protein, gel polysaccharide, màng, thành tế bào, lỗ nhỏ, kênh cụt, đường quanh co.
   KIẾN THỨC NỀN (đã tra): tổng quan TD-NMR trong thực phẩm: T2 phản ánh môi trường tại chỗ của proton, còn D cho biết phân tử dịch chuyển được bao xa và bị khoang, vách, đường quanh co hạn chế (PMC13666914).
   Cách vẽ của album (không phải số đo): hai khối cùng lượng nước và cùng tốc độ lắc; bên trái chia thành khoang kín, bên phải thông; quỹ đạo ngẫu nhiên dựng sẵn; vệt vàng là đường đi gần đây của một phân tử được đánh dấu.
   Không vẽ tín hiệu NMR, không có số T2 hay D. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['t2-va-tu-khuech-tan'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  var mW = can(0x4FC3F7, { emissive: 0x0277BD, emissiveIntensity: 0.3 }), mV = can(0xFFD54F, { emissive: 0xFF8F00, emissiveIntensity: 0.7 }), mT = can(0xFFE082, { emissive: 0xFFB300, emissiveIntensity: 0.55 }), mVach = mo(0xA5D6A7, 0.3), mKhung = can(0x66BB6A);
  var X1 = -2.05, X2 = 2.05, W = 3.5, H = 3.0, D = 1.4, NS = 700;
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  // quỹ đạo ngẫu nhiên có phản xạ trong hộp giới hạn
  function quyDao(x0, y0, xa, xb, ya, yb) {
    var p = [x0, y0, (rnd() - 0.5) * D * 0.8], out = [], i, j;
    for (i = 0; i < NS; i++) {
      var lim = [[xa, xb], [ya, yb], [-D / 2 + 0.1, D / 2 - 0.1]];
      for (j = 0; j < 3; j++) { p[j] += (rnd() - 0.5) * 0.4; if (p[j] < lim[j][0]) p[j] = 2 * lim[j][0] - p[j]; if (p[j] > lim[j][1]) p[j] = 2 * lim[j][1] - p[j]; }
      out.push(p.slice());
    }
    return out;
  }
  var kin = new T.Group(), thong = new T.Group(), tt = new T.Group(), mols = [], i, c, r;
  function khung(g, cx) {
    var x0 = cx - W / 2, x1 = cx + W / 2, y0 = 0.4, y1 = 0.4 + H, z = D / 2;
    [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(function (q) { g.add(U.tube([q[0], q[1], -z], [q[0], q[1], z], 0.03, mKhung)); });
    [-z, z].forEach(function (zz) { g.add(U.tube([x0, y0, zz], [x1, y0, zz], 0.03, mKhung)); g.add(U.tube([x0, y1, zz], [x1, y1, zz], 0.03, mKhung)); g.add(U.tube([x0, y0, zz], [x0, y1, zz], 0.03, mKhung)); g.add(U.tube([x1, y0, zz], [x1, y1, zz], 0.03, mKhung)); });
  }
  khung(kin, X1); khung(thong, X2);
  // bên trái: 3 × 2 khoang kín bằng vách
  for (c = 1; c < 3; c++) kin.add(U.box(0.06, H, D, mVach, [X1 - W / 2 + c * W / 3, 0.4 + H / 2, 0]));
  kin.add(U.box(W, 0.06, D, mVach, [X1, 0.4 + H / 2, 0]));
  for (c = 0; c < 3; c++) for (r = 0; r < 2; r++) for (i = 0; i < 7; i++) {
    var xa = X1 - W / 2 + c * W / 3 + 0.14, xb = xa + W / 3 - 0.28, ya = 0.4 + r * H / 2 + 0.14, yb = ya + H / 2 - 0.28;
    mols.push({ g: kin, path: quyDao(xa + rnd() * (xb - xa), ya + rnd() * (yb - ya), xa, xb, ya, yb), danh: c === 1 && r === 0 && i === 0 });
  }
  for (i = 0; i < 42; i++) { var a2 = X2 - W / 2 + 0.12, b2 = X2 + W / 2 - 0.12; mols.push({ g: thong, path: quyDao(a2 + rnd() * (b2 - a2), 0.55 + rnd() * (H - 0.3), a2, b2, 0.52, 0.28 + H), danh: i === 0 }); }
  var vet = [];
  mols.forEach(function (m) {
    m.s = U.sphere(m.danh ? 0.17 : 0.085, m.danh ? mV : mW, [0, 0, 0]); m.g.add(m.s);
    if (m.danh) { m.vet = []; for (var k = 0; k < 90; k++) { var d = U.sphere(0.05, mT, [0, 0, 0]); m.g.add(d); m.vet.push(d); } }
  });
  tt.add(U.box(10, 0.08, 4, can(0x1E262E), [0, -0.05, 0]));
  function diem(path, f) { var a = Math.floor(f) % NS, b = (a + 1) % NS, u = f - Math.floor(f); if (b === 0) u = 0; var p = path[a], q = path[b]; return [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u, p[2] + (q[2] - p[2]) * u]; }
  function capNhat(tg) {
    var f = (tg * 5) % NS;
    mols.forEach(function (m) {
      var p = diem(m.path, f); m.s.position.set(p[0], p[1], p[2]);
      if (m.vet) for (var k = 0; k < m.vet.length; k++) { var g = f - (k + 1) * 1.5; m.vet[k].visible = g >= 0; if (g >= 0) { var q = diem(m.path, g); m.vet[k].position.set(q[0], q[1], q[2]); m.vet[k].scale.setScalar(1 - k / 110); } }
    });
  }
  capNhat(12);
  return {
    ten: 'Linh động tại chỗ khác di chuyển xa', camera: { pos: [0.5, 3.0, 13.2], target: [0, 1.95, 0] }, khoangCachMax: 19,
    boPhan: [
      { so: 1, id: 'khoangkin', ten: 'Khoang kín: T2 cao, D thấp', obj: kin, neo: [X1 - 1.2, 3.85, 0], tach: [-0.9, 0, 0], chucNang: 'Phân tử vẫn linh động tại chỗ nhưng bị giam trong khoang nên không đi xa được.' },
      { so: 2, id: 'thong', ten: 'Không bị ngăn: đi được xa', obj: thong, neo: [X2 + 1.2, 3.85, 0], tach: [0.9, 0, 0], chucNang: 'Không có rào chắn nên phân tử di chuyển được xa (tự khuếch tán lớn hơn).' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFD54F', 'Phân tử được đánh dấu và vệt đường đi'], ['#4FC3F7', 'Phân tử nước']],
    buoc: [
      { ten: 'Hai bên đều có phân tử nước chuyển động tại chỗ như nhau', pha: [], bp: 'khoangkin' },
      { ten: 'Khoang kín: vệt đường đi chỉ quanh quẩn trong một khoang', pha: [], bp: 'khoangkin' },
      { ten: 'Không bị ngăn: vệt đường đi lan ra xa', pha: [], bp: 'thong' },
      { ten: 'Linh động tại chỗ chưa chắc đã di chuyển được xa', pha: [], bp: 'khoangkin' },
    ],
  };
};
