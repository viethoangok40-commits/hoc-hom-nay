/* Mô hình: THIẾT BỊ CHIÊN BỀ SÂU LIÊN TỤC – bài CNTP-Ngay15, Cảnh 3.2 (thay hoạt hình 2D q15-chien-be-sau-lien-tuc).
   NGUỒN BÀI (Lê Văn Việt Mẫn và cs., 2011, tr.259–261, hình 2.1.18.2): chảo hình hộp chữ nhật, băng chuyền tuần hoàn đưa nguyên liệu ngập trong dầu, lớp gối nước dưới lớp dầu, dầu gia nhiệt ở thiết bị trao đổi nhiệt rồi bơm vào chảo, bơm khác tháo dầu qua lọc và trao đổi nhiệt rồi trả lại.
   Cách vẽ của album (không theo hình sách, không phải số đo): kích thước, đường ống, vị trí bơm, lọc, thiết bị trao đổi nhiệt; hai bơm được gộp trong một bộ phận có nhãn; màu miếng chiên chỉ để thấy chiều đi. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['chao-chien-lien-tuc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  var ink = function (o) { return M.inox(Object.assign({ roughness: 0.28, side: T.DoubleSide }, o || {})); };
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.35, roughness: 0.42 }, o || {})); }
  function ong(pts, r, mat) { var g = new T.Group(); for (var i = 1; i < pts.length; i++) { var t = U.tube(pts[i - 1], pts[i], r, mat || ink({ roughness: 0.2 }), true); t.userData.xuyen = 0.35; g.add(t); } pts.slice(1, -1).forEach(function (q) { var b = U.sphere(r, mat || ink(), q); b.userData.xuyen = 0.35; g.add(b); }); return g; }
  // chảo hình hộp: đáy, hai đầu, thành sau đặc; thành trước là kính để nhìn vào trong
  var chao = new T.Group();
  chao.add(U.box(5.2, 0.12, 1.7, ink(), [0, -0.9, 0]));
  chao.add(U.box(0.1, 1.35, 1.7, ink(), [-2.55, -0.28, 0])); chao.add(U.box(0.1, 1.35, 1.7, ink(), [2.55, -0.28, 0]));
  chao.add(U.box(5.2, 1.35, 0.08, ink({ roughness: 0.4 }), [0, -0.28, -0.82]));
  var kinh = U.box(5.2, 1.35, 0.04, M.nuoc(0xDDF0FF, 0.1), [0, -0.28, 0.83]); chao.add(kinh);
  [0.4, -0.96].forEach(function (y) { chao.add(U.box(5.3, 0.07, 0.07, M.inox(), [0, y, 0.85])); });
  [-2.2, 2.2].forEach(function (x) { [-0.65, 0.65].forEach(function (z) { chao.add(U.box(0.16, 1.1, 0.16, can(0x39485A), [x, -1.5, z])); }); });
  var dau = U.box(5.0, 0.78, 1.58, M.nuoc(0xE8A317, 0.34), [0, -0.19, 0]);
  var goinuoc = new T.Group(); goinuoc.add(U.box(5.0, 0.26, 1.58, M.nuoc(0x2F9BEA, 0.62), [0, -0.71, 0]));
  // băng chuyền: đường đi xuống dầu, chạy ngang trong dầu, đi lên
  var P = [[-3.7, 0.95], [-2.9, 0.9], [-1.9, -0.28], [0, -0.32], [1.9, -0.28], [2.9, 0.9], [3.7, 0.95]];
  var curve = new T.CatmullRomCurve3(P.map(function (q) { return new T.Vector3(q[0], q[1], 0); }), false, 'catmullrom', 0.12);
  var bang = new T.Group(), thanh = [], NS = 46, i;
  for (i = 0; i < NS; i++) { var s = U.box(0.07, 0.035, 1.18, M.inox({ roughness: 0.35 }), [0, 0, 0]); bang.add(s); thanh.push(s); }
  [-0.62, 0.62].forEach(function (z) { var m = new T.Mesh(new T.TubeGeometry(curve, 120, 0.03, 8, false), can(0x77838F)); m.position.z = z; bang.add(m); });
  [P[0], P[2], P[4], P[6]].forEach(function (q) { var r = U.cyl(0.13, 1.34, can(0x4A5866), [q[0], q[1] - 0.15, 0], 'z'); bang.add(r); });
  // miếng nguyên liệu đi theo băng
  var mieng = [], NF = 9, mau0 = new T.Color(0xF3E2A9).convertSRGBToLinear(), mau1 = new T.Color(0xC9781C).convertSRGBToLinear();
  for (i = 0; i < NF; i++) { var g = new T.Group(), mm = can(0xF3E2A9, { metalness: 0, roughness: 0.7 }); for (var k = 0; k < 3; k++) { var c = U.box(0.34, 0.13, 0.2, mm, [0, 0.1, (k - 1) * 0.36]); c.rotation.y = (k - 1) * 0.35 + i; g.add(c); } g.userData.m = mm; bang.add(g); mieng.push(g); }
  // đường dầu phía sau: tháo ở một đầu → bơm → lọc → trao đổi nhiệt → bơm → trả vào chảo
  var bom = new T.Group();
  [[1.7, -1.75], [-2.05, -1.75]].forEach(function (q) { bom.add(U.cyl(0.27, 0.26, can(0x1F6FB2), [q[0], q[1], 1.55], 'z')); bom.add(U.cyl(0.09, 0.2, M.inox(), [q[0], q[1], 1.75], 'z')); bom.add(U.cyl(0.17, 0.46, can(0x174F80), [q[0], q[1], 1.22], 'z')); bom.add(U.box(0.5, 0.1, 0.7, can(0x2A333D), [q[0], q[1] - 0.34, 1.4])); });
  var loc = new T.Group(); var lv = U.cyl(0.32, 0.8, ink(), [0.65, -1.65, 1.55], 'y', true); lv.userData.xuyen = 0.3; loc.add(lv);
  loc.add(U.cyl(0.2, 0.66, can(0x6D5232, { alphaMap: U.luoi(10, 10, 15), alphaTest: 0.5, side: T.DoubleSide }), [0.65, -1.65, 1.55], 'y', true));
  [-1.23, -2.07].forEach(function (y) { loc.add(U.cyl(0.35, 0.07, M.inox(), [0.65, y, 1.55], 'y')); });
  var tdn = new T.Group(); for (i = 0; i < 13; i++) { var pl = U.box(0.045, 0.72, 0.66, i % 2 ? can(0xB8532E) : M.inox(), [-1.15 + i * 0.1, -1.65, 1.55]); pl.userData.xuyen = 0.4; tdn.add(pl); }
  [-1.24, 0.14].forEach(function (x) { tdn.add(U.box(0.09, 0.82, 0.74, can(0x4A5866), [x, -1.65, 1.55])); });
  var tt = new T.Group(); tt.add(dau);
  [[[2.1, -0.9, 0.65], [2.1, -1.75, 0.65], [2.1, -1.75, 1.55], [1.7, -1.75, 1.55]], [[1.45, -1.75, 1.55], [0.95, -1.65, 1.55]], [[0.35, -1.65, 1.55], [0.18, -1.65, 1.55]], [[-1.28, -1.65, 1.55], [-1.8, -1.75, 1.55]], [[-2.05, -1.5, 1.55], [-2.85, -1.2, 1.55], [-2.85, 0.65, 1.55], [-2.3, 0.65, 0.65], [-2.3, 0.1, 0.65]]].forEach(function (p) { tt.add(ong(p, 0.07)); });
  tt.add(U.box(9.2, 0.07, 4.2, can(0x1B232C), [0, -2.34, -0.4]));
  var boPhan = [
    { so: 1, id: 'chao', ten: 'Chảo chiên hình hộp chữ nhật', obj: chao, neo: [-2.5, 0.15, 0.85], tach: [0, 0, 1.2], chucNang: 'Chứa đầy shortening.' },
    { so: 2, id: 'bangchuyen', ten: 'Băng chuyền', obj: bang, neo: [-3.2, 0.95, 0.65], tach: [0, 1.3, 0], chucNang: 'Chuyển động tuần hoàn đưa nguyên liệu vào và tháo sản phẩm ra.' },
    { so: 3, id: 'goinuoc', ten: 'Lớp gối nước', obj: goinuoc, neo: [0.9, -0.72, 0.85], tach: [0, 0.9, 2.4], chucNang: 'Nằm trên đáy chảo, dưới lớp dầu.' },
    { so: 4, id: 'traodoi', ten: 'Thiết bị trao đổi nhiệt', obj: tdn, neo: [-0.6, -1.3, 1.9], tach: [-0.2, -0.1, 1.5], chucNang: 'Gia nhiệt dầu.' },
    { so: 5, id: 'loc', ten: 'Bộ lọc', obj: loc, neo: [0.65, -1.25, 1.9], tach: [0.6, -0.1, 1.5], chucNang: 'Lọc tạp chất cơ học.' },
    { so: 6, id: 'bom', ten: 'Bơm', obj: bom, neo: [1.7, -1.55, 1.9], tach: [1.3, 0, 0.65], chucNang: 'Bơm dầu.' },
  ];
  var duong = [
    { p: [[-2.3, 0.15, 0.65], [-2.2, -0.2, -0.1], [0, -0.1, 0.35], [2.1, -0.4, -0.2]], c: ['#FFD54A'], gl: 0.25, rung: [0.2, 0.3, 0.5], t: 4.0, tuyen: true },
    { p: [[2.1, -0.5, 0.65], [2.1, -1.75, 0.65], [2.1, -1.75, 1.55], [1.7, -1.75, 1.55], [0.9, -1.65, 1.55]], c: ['#B97F14'], rung: [0.04, 0.04, 0.04], t: 1.8, tuyen: true },
    { p: [[0.9, -1.65, 1.55], [0.35, -1.65, 1.55], [0.18, -1.65, 1.55]], c: ['#B97F14', '#E9A91C'], rung: [0.1, 0.3, 0.2], t: 1.2, tuyen: true },
    { p: [[0.18, -1.65, 1.55], [-1.28, -1.65, 1.55]], c: ['#E9A91C', '#FFD54A'], gl: [0, 0.4], rung: [0.05, 0.4, 0.3], t: 1.6, tuyen: true },
    { p: [[-1.28, -1.65, 1.55], [-2.05, -1.75, 1.55], [-2.85, -1.2, 1.55], [-2.85, 0.65, 1.55], [-2.3, 0.65, 0.65], [-2.3, 0.15, 0.65]], c: ['#FFD54A'], gl: 0.4, rung: [0.04, 0.04, 0.04], t: 2.6, tuyen: true },
  ];
  var DAI = 4;
  function capNhat(tg) {
    for (var i = 0; i < NS; i++) { var u = (i / NS + tg * 0.035) % 1, p = curve.getPointAt(u), tn = curve.getTangentAt(u); thanh[i].position.set(p.x, p.y, 0); thanh[i].rotation.z = Math.atan2(tn.y, tn.x); }
    for (i = 0; i < NF; i++) { var v = (i / NF + tg * 0.035) % 1, q = curve.getPointAt(v), d = curve.getTangentAt(v); mieng[i].position.set(q.x, q.y + 0.02, 0); mieng[i].rotation.z = Math.atan2(d.y, d.x); mieng[i].userData.m.color.copy(mau0).lerp(mau1, Math.max(0, Math.min(1, (v - 0.25) / 0.45))); }
  }
  capNhat(0);
  return {
    ten: 'Chiên bề sâu liên tục', camera: { pos: [4.4, 3.4, 11.0], target: [0, -0.6, 0.3] }, khoangCachMax: 19,
    boPhan: boPhan, trangTri: [tt], capNhat: capNhat, hat: ctx.hatTuyen({ tiLe: 1, A: duong, B: duong.map(function (d) { return Object.assign({}, d); }) }), omega: 0,
    buocHienTai: function (tg) { return Math.floor(tg / DAI) % 5; },
    chuThichMau: [['#FFD54A', 'Dầu nóng vào chảo'], ['#B97F14', 'Dầu tháo ra đi lọc']],
    buoc: [
      { ten: 'Dầu được gia nhiệt rồi bơm vào chảo', pha: [], bp: 'traodoi' },
      { ten: 'Băng chuyền đưa nguyên liệu ngập trong dầu', pha: [], bp: 'bangchuyen' },
      { ten: 'Lớp gối nước dưới lớp dầu', pha: [], bp: 'goinuoc' },
      { ten: 'Dầu tháo ra, lọc, gia nhiệt rồi trả lại', pha: [], bp: 'loc' },
      { ten: 'Băng chuyền đưa sản phẩm ra', pha: [], bp: 'bangchuyen' },
    ],
  };
};
