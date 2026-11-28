/* Mô hình: CHẦN TẦNG SÔI – bài CNTP-Ngay09, Cảnh 3.2 (thay hoạt hình 2D q9-chan-tang-soi).
   NGUỒN BÀI: slide chỉ ghi tên thiết bị; nguyên lý tầng sôi là kiến thức thêm của người soạn (bài ghi rõ, Cần kiểm tra). Mô hình không khẳng định gì hơn bài.
   Cách vẽ của album: buồng trụ đứng, đáy phân phối đục lỗ, hộp gió, miếng nguyên liệu hình khối và hạt tròn; độ cao lơ lửng, tốc độ không phải số đo. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['chan-tang-soi'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.25, roughness: 0.45 }, o || {})); }
  var R = 1.45, i;
  var buong = new T.Group();
  buong.add(U.cyl(R, 3.5, M.nuoc(0xCBE6FA, 0.13), [0, 0.75, 0], 'y', true, 56));
  [-1.0, 0.75, 2.5].forEach(function (y) { buong.add(U.torus(R, 0.055, M.inox(), [0, y, 0], 'y')); });
  [0.7, 2.45, 4.0, 5.55].forEach(function (a) { buong.add(U.cyl(0.03, 3.5, M.inox(), [Math.cos(a) * R, 0.75, Math.sin(a) * R], 'y')); });
  var day = new T.Group();
  var tam = U.cyl(R, 0.08, M.inox({ roughness: 0.4, alphaMap: U.luoi(16, 16, 17), alphaTest: 0.5, side: T.DoubleSide }), [0, -1.04, 0], 'y', false, 56); day.add(tam); day.add(U.torus(R, 0.09, M.inox(), [0, -1.04, 0], 'y'));
  // hộp gió và ống cấp chất lưu nóng
  var dong = new T.Group();
  var hop = U.cone(0.8, R, 0.7, M.inox({ roughness: 0.3, side: T.DoubleSide }), [0, -1.45, 0], 'y', true); hop.userData.xuyen = 0.35; dong.add(hop);
  dong.add(U.cyl(0.8, 0.07, M.inox(), [0, -1.8, 0], 'y')); dong.add(U.tube([-3.0, -1.55, 0], [-1.0, -1.55, 0], 0.2, can(0x9C4A2A))); dong.add(U.torus(0.22, 0.06, M.inox(), [-1.15, -1.55, 0], 'x'));
  var mui = [], mMui = can(0xFF8A3D, { emissive: 0xFF6A00, emissiveIntensity: 0.9 });
  for (i = 0; i < 14; i++) { var a = i * 2.399963, rr = 1.15 * Math.sqrt((i + 0.5) / 14), g = new T.Group(); g.add(U.cone(0.075, 0.005, 0.18, mMui, [0, 0.09, 0], 'y', false, 12)); g.add(U.cyl(0.022, 0.2, mMui, [0, -0.08, 0], 'y')); g.userData = { x: Math.cos(a) * rr, z: Math.sin(a) * rr, o: (i * 0.618) % 1 }; dong.add(g); mui.push(g); }
  // nguyên liệu: miếng khối và hạt tròn
  var nl = new T.Group(), ds = [], N = 90;
  var mau = [can(0x5DBB46, { metalness: 0, roughness: 0.6 }), can(0xF08A24, { metalness: 0, roughness: 0.6 }), can(0xF4D35E, { metalness: 0, roughness: 0.6 })];
  for (i = 0; i < N; i++) {
    var t = i % 3, m = t === 0 ? U.sphere(0.12, mau[0], [0, 0, 0]) : U.box(0.19, 0.19, 0.19, mau[t], [0, 0, 0]);
    var aa = i * 2.399963, r = 1.25 * Math.sqrt((i + 0.5) / N);
    m.userData = { x: Math.cos(aa) * r, z: Math.sin(aa) * r, nam: -0.88 + 0.17 * (i % 3), cao: -0.45 + 2.0 * ((i * 0.754877) % 1), f: 1.3 + 1.4 * ((i * 0.41) % 1), q: i * 1.7 };
    nl.add(m); ds.push(m);
  }
  var tt = new T.Group(); tt.add(U.box(7.5, 0.07, 4, can(0x1B232C), [-0.4, -2.34, 0]));
  [[-0.95, 0.95], [0.95, 0.95], [-0.95, -0.95], [0.95, -0.95]].forEach(function (q) { tt.add(U.cyl(0.08, 0.55, can(0x39485A), [q[0] * 0.7, -2.05, q[1] * 0.7], 'y')); });
  var DAI = 4.5;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function capNhat(tg) {
    var u = tg % (DAI * 4), gio = sm((u - DAI) / 1.5) * (1 - sm((u - DAI * 4 + 1.5) / 1.5)), noi = sm((u - DAI * 1.4) / 3) * (1 - sm((u - DAI * 4 + 1.5) / 1.5));
    for (var i = 0; i < N; i++) {
      var d = ds[i].userData, s = Math.sin(tg * d.f + d.q), c = Math.cos(tg * d.f * 0.8 + d.q * 2);
      ds[i].position.set(d.x * (1 - 0.1 * noi) + noi * 0.17 * c, d.nam + noi * (d.cao - d.nam + 0.32 * s), d.z * (1 - 0.1 * noi) + noi * 0.17 * s);
      ds[i].rotation.set(noi * (tg * d.f + d.q) , d.q + noi * tg * 0.9, noi * tg * d.f * 0.6);
    }
    for (i = 0; i < mui.length; i++) { var e = mui[i].userData, v = (tg * 0.55 + e.o) % 1; mui[i].position.set(e.x, -1.45 + v * 1.9, e.z); mui[i].scale.setScalar(Math.max(0.001, gio * Math.sin(PI * v))); }
  }
  capNhat(DAI * 2.8);
  return {
    ten: 'Chần tầng sôi', camera: { pos: [3.6, 2.5, 9.6], target: [-0.15, 0.1, 0] }, khoangCachMax: 17,
    boPhan: [
      { so: 1, id: 'buong', ten: 'Buồng đứng', obj: buong, neo: [R, 2.1, 0], tach: [0, 1.4, 0], chucNang: 'Chứa nguyên liệu.' },
      { so: 2, id: 'nguyenlieu', ten: 'Miếng nguyên liệu', obj: nl, neo: [-1.2, 0.6, 0.6], tach: [1.9, 0.3, 0], chucNang: 'Lơ lửng và đảo trộn.' },
      { so: 3, id: 'day', ten: 'Đáy phân phối', obj: day, neo: [1.4, -1.04, 0.35], tach: [1.5, -0.1, 0], chucNang: 'Cho chất lưu đi qua.' },
      { so: 4, id: 'dong', ten: 'Dòng chất lưu nóng', obj: dong, neo: [-2.5, -1.4, 0.2], tach: [-0.7, -0.15, 0.9], chucNang: 'Đi từ dưới lên.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    buocHienTai: function (tg) { return Math.floor(tg / DAI) % 4; },
    chuThichMau: [['#FF8A3D', 'Dòng chất lưu nóng'], ['#5DBB46', 'Nguyên liệu']],
    buoc: [
      { ten: 'Nguyên liệu nằm trên đáy phân phối', pha: [], bp: 'day' },
      { ten: 'Chất lưu nóng thổi từ dưới lên', pha: [], bp: 'dong' },
      { ten: 'Nguyên liệu lơ lửng và đảo trộn', pha: [], bp: 'nguyenlieu' },
      { ten: 'Nhận nhiệt từ mọi phía', pha: [], bp: 'nguyenlieu' },
    ],
  };
};
