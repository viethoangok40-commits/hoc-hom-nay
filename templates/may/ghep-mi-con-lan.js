/* Mô hình: GHÉP MÍ HỘP KIM LOẠI – bài CNTP-Ngay12, Cảnh 3.2 (thay hoạt hình 2D q12-ghep-mi-con-lan).
   NGUỒN BÀI: slide 23, 24 "Các công đoạn ghép mí": cho vào máy ghép (con lăn ép, lực ép), ghép với con lăn cuộn 1, ghép với con lăn cuộn 2. "Móc vào nhau" đọc từ hình mặt cắt, "ép chặt" là cách đọc của album.
   Cách vẽ của album (không phải số đo): hình dạng con lăn, vị trí con lăn ép, hộp quay trên mâm, mặt cắt mí phóng to bên phải với đường nét cuộn dần, kích thước. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ghep-mi-con-lan'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  var ink = function (o) { return M.inox(Object.assign({ roughness: 0.25, side: T.DoubleSide }, o || {})); };
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.45, roughness: 0.35 }, o || {})); }
  var CX = -1.7, R = 1.25, TOP = 0.55, i;
  var hop = new T.Group(), quay = new T.Group(); quay.position.set(CX, 0, 0); hop.add(quay);
  quay.add(U.cyl(R, 2.0, ink(), [0, TOP - 1.0, 0], 'y', true, 64));
  [-0.25, -0.5, -0.75, -1.0, -1.25].forEach(function (y) { quay.add(U.torus(R, 0.018, M.inox(), [0, y, 0], 'y')); });
  quay.add(U.box(0.05, 1.3, 0.02, can(0xD8A12B), [0, -0.65, R + 0.005]));
  quay.add(U.torus(R + 0.05, 0.045, can(0xC9D3DC), [0, TOP, 0], 'y'));
  var nap = new T.Group(), napQ = new T.Group(); nap.add(napQ);
  var gold = function () { return can(0xE2B64A, { side: T.DoubleSide }); };
  napQ.add(U.cyl(R - 0.04, 0.05, gold(), [0, 0.02, 0], 'y', false, 64)); [0.45, 0.85].forEach(function (r) { napQ.add(U.torus(r, 0.022, gold(), [0, 0.055, 0], 'y')); }); napQ.add(U.torus(R + 0.1, 0.05, gold(), [0, 0.07, 0], 'y')); napQ.add(U.box(0.28, 0.02, 0.07, can(0x7A5A17), [0.62, 0.075, 0]));
  // con lăn ép: tì lên mặt nắp, trục từ trên xuống
  var lanep = new T.Group(); lanep.add(U.cyl(0.38, 0.22, can(0x5C6B7A), [CX, TOP + 0.22, 0], 'y')); lanep.add(U.cyl(0.1, 0.9, M.inox(), [CX, TOP + 0.75, 0], 'y')); lanep.add(U.box(0.55, 0.22, 0.55, can(0x2A3744), [CX, TOP + 1.25, 0]));
  // hai con lăn cuộn: rãnh khác nhau, nằm trên tay đòn, tiến vào mép
  function lan(mau, ranh, goc) {
    var g = new T.Group(), dia = new T.Group();
    dia.add(U.lathe([[0.001, -0.17], [0.4, -0.17], [0.46, -0.1], [0.46 - ranh, -0.04], [0.46 - ranh, 0.04], [0.46, 0.1], [0.4, 0.17], [0.001, 0.17]], can(mau, { side: T.DoubleSide }), 56));
    dia.add(U.box(0.5, 0.02, 0.09, M.inox(), [0.1, 0.18, 0])); g.add(dia); g.add(U.cyl(0.08, 0.8, M.inox(), [0, 0.48, 0], 'y'));
    g.add(U.box(0.24, 0.16, 1.5, can(mau), [0, 0.9, -0.65])); g.add(U.cyl(0.12, 2.9, can(0x39485A), [0, -0.5, -1.35], 'y'));
    var vo = new T.Group(); vo.position.set(CX, TOP + 0.04, 0); vo.rotation.y = goc; vo.add(g); return { vo: vo, g: g, dia: dia };
  }
  var L1 = lan(0xE0703A, 0.13, -1.05), L2 = lan(0x2F86C9, 0.05, 1.05);
  // mâm đỡ và lực ép từ dưới lên
  var tt = new T.Group(), mamQ = new T.Group(); mamQ.position.set(CX, 0, 0);
  mamQ.add(U.cyl(R + 0.12, 0.14, can(0x77838F), [0, -1.54, 0], 'y', false, 64)); mamQ.add(U.box(0.5, 0.02, 0.08, can(0xD8A12B), [R - 0.2, -1.46, 0])); tt.add(mamQ);
  tt.add(U.cyl(0.28, 0.65, M.inox(), [CX, -1.95, 0], 'y'));
  var mMui = can(0xFF5A4A, { emissive: 0xD0271A, emissiveIntensity: 0.8 }), muiLuc = new T.Group();
  muiLuc.add(U.cyl(0.07, 0.42, mMui, [0, -0.2, 0], 'y')); muiLuc.add(U.cone(0.18, 0.005, 0.28, mMui, [0, 0.14, 0], 'y', false, 20)); muiLuc.position.set(CX + 1.65, -1.75, 0.4); tt.add(muiLuc);
  tt.add(U.box(9.4, 0.07, 4.6, can(0x1B232C), [0, -2.34, -0.2]));
  // mặt cắt mí phóng to (đùn thành khối): thân màu thép, nắp màu vàng; nội suy qua ba trạng thái
  var THAN = [[[0, -1.5], [0, -0.6], [0, 0.1], [0.28, 0.32], [0.62, 0.35], [0.8, 0.22]], [[0, -1.5], [0, -0.6], [0, 0.28], [0.3, 0.52], [0.62, 0.38], [0.52, 0.05]], [[0, -1.5], [0, -0.6], [0, 0.3], [0.2, 0.47], [0.36, 0.36], [0.33, -0.04]]];
  var NAP = [[[-1.25, 0.62], [-0.35, 0.62], [0.2, 0.62], [0.65, 0.62], [0.98, 0.48], [1.06, 0.2], [0.98, 0.04]], [[-1.25, 0.56], [-0.3, 0.56], [0.35, 0.72], [0.82, 0.5], [0.78, -0.18], [0.32, -0.22], [0.3, 0.18]], [[-1.25, 0.54], [-0.25, 0.54], [0.24, 0.62], [0.56, 0.45], [0.55, -0.18], [0.18, -0.2], [0.17, 0.14]]];
  var cat = new T.Group(); cat.position.set(2.35, -0.1, 0.4); cat.rotation.y = -0.38;
  var mThan = M.inox({ roughness: 0.3 }), mNap = can(0xE2B64A), mT = null, mN = null;
  function dun(a, b, u, day, mat, z) {
    var pts = a.map(function (p, k) { return new T.Vector3(U.lerp(p[0], b[k][0], u), U.lerp(p[1], b[k][1], u), 0); });
    var cv = new T.CatmullRomCurve3(pts, false, 'catmullrom', 0.25), g = new T.Group();
    for (var j = 0; j < 7; j++) { var m = new T.Mesh(new T.TubeGeometry(cv, 60, day, 12, false), mat); m.position.z = z - 0.36 + j * 0.12; g.add(m); }
    [0, 1].forEach(function (s) { var p = cv.getPointAt(s); var c = new T.Mesh(new T.CylinderGeometry(day, day, 0.72 + day, 12), mat); c.rotation.x = PI / 2; c.position.set(p.x, p.y, z); g.add(c); });
    return g;
  }
  var lastS = -1;
  function veCat(s) {
    if (Math.abs(s - lastS) < 0.015) return; lastS = s;
    [mT, mN].forEach(function (g) { if (!g) return; cat.remove(g); g.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); });
    var k = s >= 1 ? 1 : 0, u = s - k;
    mT = dun(THAN[k], THAN[k + 1], u, 0.075, mThan, 0); mN = dun(NAP[k], NAP[k + 1], u, 0.075, mNap, 0); cat.add(mT); cat.add(mN);
  }
  tt.add(cat);
  var DAI = 5.5;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function capNhat(tg) {
    var u = tg % (DAI * 3 + 2.5), a = sm(u / 2.5);
    nap.position.set(CX, TOP + (1 - a) * 0.75, 0); napQ.rotation.y = quay.rotation.y = mamQ.rotation.y = u > 2.5 ? tg * 2.2 : 0;
    lanep.position.y = (1 - sm((u - 1.2) / 1.6)) * 0.75;
    var v1 = sm((u - DAI) / 1.6) * (1 - sm((u - DAI * 2 + 0.9) / 0.9)), v2 = sm((u - DAI * 2) / 1.6) * (1 - sm((u - DAI * 3 - 1.2) / 1.0));
    L1.g.position.z = U.lerp(2.65, R + 0.5, v1); L2.g.position.z = U.lerp(2.65, R + 0.46, v2);
    L1.dia.rotation.y = v1 > 0.95 ? -tg * 6 : 0; L2.dia.rotation.y = v2 > 0.95 ? -tg * 6 : 0;
    veCat(sm((u - DAI - 1.2) / 3) + sm((u - DAI * 2 - 1.2) / 3));
    muiLuc.position.y = -1.78 + 0.12 * Math.abs(Math.sin(tg * 2.5));
  }
  capNhat(DAI * 1.7);
  return {
    ten: 'Ghép mí hộp kim loại', camera: { pos: [1.7, 3.1, 11.0], target: [0.05, -0.25, 0] }, khoangCachMax: 18,
    boPhan: [
      { so: 1, id: 'hop', ten: 'Thân hộp', obj: hop, neo: [CX - R, -0.7, 0.3], tach: [-0.5, -0.1, 0.5], chucNang: 'Vành thân hộp móc với mép nắp.' },
      { so: 2, id: 'nap', ten: 'Nắp', obj: nap, neo: [-0.55, 0.15, 0.7], tach: [0, 0.75, 0.4], chucNang: 'Đặt lên miệng hộp.' },
      { so: 3, id: 'lanep', ten: 'Con lăn ép', obj: lanep, neo: [CX, TOP + 1.35, 0.2], tach: [0, 1.4, 0], chucNang: 'Tì lên nắp.' },
      { so: 4, id: 'cuon1', ten: 'Con lăn cuộn 1', obj: L1.vo, neo: [-3.9, TOP + 1.0, 0.7], tach: [-1.0, 0.3, 0.3], chucNang: 'Cuộn mép nắp và vành thân.' },
      { so: 5, id: 'cuon2', ten: 'Con lăn cuộn 2', obj: L2.vo, neo: [0.4, TOP + 1.0, 0.7], tach: [1.0, 0.9, 0.3], chucNang: 'Ép chặt mối ghép.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    buocHienTai: function (tg) { return Math.min(2, Math.floor((tg % (DAI * 3 + 2.5)) / DAI)); },
    chuThichMau: [['#E2B64A', 'Nắp (mặt cắt phóng to)'], ['#C9D3DC', 'Thân hộp']],
    buoc: [
      { ten: 'Cho vào máy ghép', pha: [], bp: 'lanep' },
      { ten: 'Ghép với con lăn cuộn 1', pha: [], bp: 'cuon1' },
      { ten: 'Ghép với con lăn cuộn 2', pha: [], bp: 'cuon2' },
    ],
  };
};
