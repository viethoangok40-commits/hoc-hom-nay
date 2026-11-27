/* Mô hình: PEROXIDASE LÀ ENZYME CHỈ THỊ CỦA CHẦN – bài CNTP-Ngay05, Cảnh 1.3.
   NGUỒN BÀI (khẳng định của bài, LVVM tr.222): rau quả chứa nhiều enzyme (lipoxygenase, polyphenoloxidase, polygalacturonase, chlorophyllase...), mỗi enzyme bị vô hoạt ở nhiệt độ khác nhau; hai enzyme bền nhiệt
   nhất là peroxidase rồi catalase; sau chần kiểm tra peroxidase, không phát hiện thì chần đạt yêu cầu; peroxidase là enzyme chỉ thị vì bền nhiệt nhất và phép phát hiện đơn giản.
   KIẾN THỨC NỀN (chỉ để vẽ đúng): enzyme là protein gấp cuộn có trung tâm hoạt động; nhiệt làm mất cấu trúc gấp cuộn (biến tính) nên mất hoạt tính.
   Cách vẽ của album (không phải số đo): mỗi cụm là chuỗi gấp cuộn, đốm sáng là trung tâm hoạt động; thanh "mức xử lý nhiệt" không gắn nhiệt độ hay thời gian; thứ tự giữa các enzyme khác với nhau bài không nêu
   nên mô hình chỉ giữ đúng: các enzyme khác mất trước, catalase sau, peroxidase sau cùng. Đèn thử đỏ/xanh là cách vẽ, không phải màu thuốc thử thật. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['enzyme-chi-thi'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var seed = 11; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var N = 34, i, k;
  // một enzyme: các đốt nối nhau; vị trí gấp (cuộn chặt) và vị trí duỗi (chuỗi lỏng)
  function enzyme(mau, cx, cy) {
    var g = new T.Group(), mt = can(mau), gap = [], duoi = [], hat = [], noi = [], mS = can(0xFFF176, { emissive: 0xFFEB3B, emissiveIntensity: 1.0 }), p = [0, 0, 0], q = [-0.85, 0.2, 0];
    for (k = 0; k < N; k++) {
      var a = k * 0.62, r = 0.42 + 0.14 * Math.sin(k * 1.9), yy = -0.45 + 0.9 * (k / N);
      gap.push([Math.cos(a) * r * Math.sqrt(1 - yy * yy * 2.4 > 0 ? 1 - yy * yy * 2.4 : 0.15), yy, Math.sin(a) * r * 0.8]);
      q = [-0.78 + 1.56 * (k / (N - 1)) + 0.12 * (rnd() - 0.5), 0.55 * Math.sin(k * 0.47) + 0.25 * (rnd() - 0.5), 0.35 * Math.sin(k * 0.8)];
      duoi.push(q);
      var s = U.sphere(0.095, mt, [0, 0, 0]); g.add(s); hat.push(s);
    }
    for (k = 0; k < N - 1; k++) { var seg = new T.Mesh(new T.CylinderGeometry(0.045, 0.045, 1, 6), mt); g.add(seg); noi.push(seg); }
    var site = U.sphere(0.17, mS, [0, 0, 0.38]); g.add(site); g.position.set(cx, cy, 0);
    return { g: g, gap: gap, duoi: duoi, hat: hat, noi: noi, site: site, ph: cx };
  }
  var UP = new T.Vector3(0, 1, 0), V = new T.Vector3(), W = new T.Vector3();
  function ve(e, mo_, tg) {
    var pos = [];
    for (k = 0; k < N; k++) { var a = e.gap[k], b = e.duoi[k], rung = 0.015 + 0.05 * mo_; var x = a[0] + (b[0] - a[0]) * mo_ + Math.sin(tg * 3 + k + e.ph) * rung, y = a[1] + (b[1] - a[1]) * mo_ + Math.cos(tg * 2.6 + k * 2) * rung, z = a[2] + (b[2] - a[2]) * mo_; e.hat[k].position.set(x, y, z); pos.push([x, y, z]); }
    for (k = 0; k < N - 1; k++) { V.set(pos[k][0], pos[k][1], pos[k][2]); W.set(pos[k + 1][0], pos[k + 1][1], pos[k + 1][2]); var d = W.clone().sub(V), L = d.length(); e.noi[k].position.copy(V).addScaledVector(d, 0.5); e.noi[k].scale.set(1, Math.max(0.001, L), 1); e.noi[k].quaternion.setFromUnitVectors(UP, d.normalize()); }
    e.site.scale.setScalar(Math.max(0.001, 1 - sm(mo_ * 1.6))); e.site.position.set(0, 0, 0.42);
  }
  var khacG = new T.Group(), catG = new T.Group(), perG = new T.Group(), thu = new T.Group(), tt = new T.Group();
  var khac = [enzyme(0x66BB6A, -3.15, 3.05), enzyme(0x26A69A, -3.15, 1.25)], cat = enzyme(0x7E57C2, -0.95, 2.15), per = enzyme(0xEF6C00, 1.2, 2.15);
  khac.forEach(function (e) { khacG.add(e.g); }); catG.add(cat.g); perG.add(per.g);
  // đèn thử peroxidase
  var mDen = can(0xE53935, { emissive: 0xE53935, emissiveIntensity: 0.8 });
  thu.add(new T.Mesh(new T.CylinderGeometry(0.34, 0.34, 1.9, 24, 1, true), mo(0xE1F5FE, 0.25))); thu.children[0].position.set(3.15, 2.15, 0);
  var nuoc = new T.Mesh(new T.CylinderGeometry(0.29, 0.29, 1.3, 24), mDen); nuoc.position.set(3.15, 1.88, 0); thu.add(nuoc);
  tt.add(U.box(10, 0.1, 3.4, can(0x1E262E), [0, 0.25, 0]));
  function capNhat(tg, e, val) {
    var h = val ? val.nhiet / 100 : 0;
    khac.forEach(function (en, j) { ve(en, sm((h - (0.2 + 0.1 * j)) / 0.15), tg); });
    ve(cat, sm((h - 0.52) / 0.16), tg); ve(per, sm((h - 0.76) / 0.16), tg);
    var con = h < 0.86; mDen.color.setHex(con ? 0xE53935 : 0x43A047); mDen.emissive.setHex(con ? 0xE53935 : 0x43A047);
  }
  capNhat(0, 0, { nhiet: 0 });
  return {
    ten: 'Peroxidase là enzyme chỉ thị', camera: { pos: [0.4, 3.4, 13.8], target: [-0.1, 2.15, 0] }, khoangCachMax: 20,
    dieuKhien: [{ id: 'nhiet', nhan: 'Mức xử lý nhiệt khi chần', min: 0, max: 100, buoc: 1, mac: 0, don: '', chu: function (v) { return v < 20 ? 'chưa đủ' : v < 52 ? 'enzyme khác mất' : v < 76 ? 'catalase mất' : v < 86 ? 'còn peroxidase' : 'hết peroxidase: đạt'; } }],
    boPhan: [
      { so: 1, id: 'khac', ten: 'Các enzyme khác', obj: khacG, neo: [-3.5, 3.9, 0], tach: [-0.9, 0, 0], chucNang: 'Lipoxygenase, polyphenoloxidase, polygalacturonase, chlorophyllase… mỗi loại mất hoạt tính ở nhiệt độ khác nhau.' },
      { so: 2, id: 'catalase', ten: 'Catalase', obj: catG, neo: [-1.2, 3.1, 0], tach: [0, 0.9, 0], chucNang: 'Bền nhiệt thứ hai sau peroxidase.' },
      { so: 3, id: 'peroxidase', ten: 'Peroxidase (bền nhiệt nhất)', obj: perG, neo: [1.3, 3.1, 0], tach: [0, 0.9, 0.8], chucNang: 'Bền nhiệt nhất và dễ phát hiện nên làm enzyme chỉ thị.' },
      { so: 4, id: 'phepthu', ten: 'Phép thử peroxidase sau chần', obj: thu, neo: [3.2, 3.4, 0], tach: [1.1, 0, 0], chucNang: 'Không phát hiện peroxidase thì chần đạt yêu cầu.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFF176', 'Trung tâm hoạt động (còn hoạt tính)'], ['#E53935', 'Còn phát hiện peroxidase']],
    buoc: [
      { ten: 'Rau quả chứa nhiều enzyme, mỗi loại có độ bền nhiệt riêng', pha: [], bp: 'khac' },
      { ten: 'Catalase bền hơn các enzyme khác', pha: [], bp: 'catalase' },
      { ten: 'Peroxidase bền nhiệt nhất nên mất hoạt tính sau cùng', pha: [], bp: 'peroxidase' },
      { ten: 'Không còn phát hiện peroxidase: chần đạt yêu cầu', pha: [], bp: 'phepthu' },
    ],
  };
};
