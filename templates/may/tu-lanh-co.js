/* Mô hình: TỦ LẠNH CƠ – bài CNTP-Ngay17, Cảnh 3.1.
   NGUỒN BÀI (Lê Văn Việt Mẫn và cs., 2011, mục 2.1.20, tr.276 và hình 2.1.20.1): bốn bộ phận là bộ phận bốc hơi, máy nén, bộ phận ngưng tụ, van giãn nở; môi chất lạnh lỏng hóa hơi ở áp suất thấp trong bộ phận bốc hơi
   và làm giảm nhiệt độ chất làm lạnh, hơi qua máy nén tăng áp suất, vào bộ phận ngưng tụ thành lỏng, qua van giãn nở giảm áp rồi bắt đầu chu kỳ mới; hình ghi khu vực áp suất thấp và khu vực áp suất cao.
   Cách vẽ của album (không theo hình sách, không phải số đo): hai ống xoắn gấp khúc cho hai bộ phận trao đổi nhiệt, vỏ trụ cho máy nén, hai hình nón châu đầu cho van; vị trí và đường chia áp suất vẽ theo logic chu trình.
   Hạt là môi chất lạnh, màu và độ phát sáng chỉ để phân biệt lỏng, hơi và hai mức áp suất. Ống nối, đường chia, đế là vật trang trí. Không vẽ bên trong máy nén và van, không vẽ chất làm lạnh. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['tu-lanh-co'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  var ink = function (o) { return M.inox(Object.assign({ roughness: 0.25, side: T.DoubleSide }, o || {})); };
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.3, roughness: 0.45 }, o || {})); }
  // đoạn ống gấp khúc trong mặt phẳng z = 0, trong suốt khi bật xuyên thấu
  function ong(pts, r, mat) {
    var g = new T.Group();
    for (var i = 1; i < pts.length; i++) { var t = U.tube([pts[i - 1][0], pts[i - 1][1], 0], [pts[i][0], pts[i][1], 0], r, mat ? mat() : ink(), true); t.userData.xuyen = 0.3; g.add(t); }
    pts.slice(1, -1).forEach(function (q) { var b = U.sphere(r, mat ? mat() : ink(), [q[0], q[1], 0]); b.userData.xuyen = 0.3; g.add(b); });
    return g;
  }
  var BH = [[-1.8, -1.2], [-3.3, -1.2], [-3.3, -0.55], [-1.8, -0.55], [-1.8, 0.1], [-3.3, 0.1], [-3.3, 0.75], [-1.8, 0.75], [-1.8, 1.4]];
  var NT = [[1.8, 1.4], [3.3, 1.4], [3.3, 0.75], [1.8, 0.75], [1.8, 0.1], [3.3, 0.1], [3.3, -0.55], [1.8, -0.55], [1.8, -1.2]];
  // 1 – bộ phận bốc hơi
  var bochoi = ong(BH, 0.13, function () { return ink({ color: ctx.lin(0x9FD3FF), roughness: 0.3 }); });
  // 2 – máy nén: vỏ trụ nằm ngang, hai vành
  var maynen = new T.Group();
  var vo = U.cyl(0.48, 0.9, ink({ roughness: 0.35 }), [0, 1.4, 0], 'x', true); vo.userData.xuyen = 0.28; maynen.add(vo);
  [-0.46, 0.46].forEach(function (x) { maynen.add(U.torus(0.48, 0.05, can(0x2E5A8A), [x, 1.4, 0], 'x')); });
  maynen.add(U.box(0.7, 0.14, 0.7, can(0x24476E), [0, 0.86, 0]));
  // 3 – bộ phận ngưng tụ
  var ngungtu = ong(NT, 0.13, function () { return ink({ color: ctx.lin(0xFFC49A), roughness: 0.3 }); });
  // 4 – van giãn nở: hai hình nón châu đầu và tay vặn
  var van = new T.Group();
  var n1 = U.cone(0.34, 0.09, 0.36, can(0xC9A227), [0, -1.2, 0], 'x', true); n1.position.x = 0.18;
  var n2 = U.cone(0.34, 0.09, 0.36, can(0xC9A227), [0, -1.2, 0], 'x', true); n2.position.x = -0.18; n2.rotation.y = Math.PI;
  n1.material.side = n2.material.side = T.DoubleSide; n1.userData.xuyen = n2.userData.xuyen = 0.35; van.add(n1); van.add(n2);
  van.add(U.cyl(0.035, 0.42, M.inox(), [0, -0.96, 0], 'y')); van.add(U.torus(0.17, 0.035, can(0xC0392B), [0, -0.72, 0], 'y'));
  var boPhan = [
    { so: 1, id: 'bochoi', ten: 'Bộ phận bốc hơi', obj: bochoi, neo: [-3.3, 0.45, 0.2], tach: [-0.9, 0, 0.3], chucNang: 'Môi chất lạnh lỏng chuyển thành hơi ở áp suất thấp, làm giảm nhiệt độ chất làm lạnh.' },
    { so: 2, id: 'maynen', ten: 'Máy nén', obj: maynen, neo: [0, 1.95, 0.2], tach: [0, 0.8, 0.3], chucNang: 'Tăng áp suất hơi môi chất.' },
    { so: 3, id: 'ngungtu', ten: 'Bộ phận ngưng tụ', obj: ngungtu, neo: [3.3, 0.45, 0.2], tach: [0.9, 0, 0.3], chucNang: 'Hơi môi chất chuyển thành lỏng.' },
    { so: 4, id: 'vangiano', ten: 'Van giãn nở', obj: van, neo: [0, -1.42, 0.35], tach: [0, -0.5, 0.9], chucNang: 'Giảm áp môi chất lỏng.' },
  ];
  // trang trí: ống nối, đường đứt chia hai khu vực áp suất (ghi chữ theo hình 2.1.20.1 mà bài dẫn), đế
  var tt = new T.Group();
  [[[-1.8, 1.4], [-0.45, 1.4]], [[0.45, 1.4], [1.8, 1.4]], [[1.8, -1.2], [0.36, -1.2]], [[-0.36, -1.2], [-1.8, -1.2]]].forEach(function (p) { tt.add(ong(p, 0.075)); });
  var mDut = can(0xE8EEF4, { transparent: true, opacity: 0.7 });
  for (var y = -1.9; y <= 2.4; y += 0.28) if (!((y > 0.7 && y < 2.0) || (y > -1.55 && y < -0.55))) tt.add(U.box(0.035, 0.16, 0.035, mDut, [0, y, -0.15]));
  function chu(t, x, yy) {
    var cv = document.createElement('canvas'); cv.width = 384; cv.height = 128; var g = cv.getContext('2d');
    g.font = '600 46px "Be Vietnam Pro", system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#F2F6FA'; t.forEach(function (d, i) { g.fillText(d, 192, 36 + i * 58); });
    var tx = new T.CanvasTexture(cv), sp = new T.Sprite(new T.SpriteMaterial({ map: tx, transparent: true, depthWrite: false })); sp.scale.set(1.5, 0.5, 1); sp.position.set(x, yy, 0); return sp;
  }
  tt.add(chu(['Khu vực', 'áp suất thấp'], -0.95, 0.1)); tt.add(chu(['Khu vực', 'áp suất cao'], 0.95, 0.1));
  tt.add(U.box(8.6, 0.08, 1.4, can(0x1E262E), [0, -2.1, 0]));
  // hạt môi chất lạnh đi một vòng: bốc hơi → máy nén → ngưng tụ → tới van → qua van về đầu vào bộ phận bốc hơi
  function p3(l) { return l.map(function (q) { return [q[0], q[1], 0]; }); }
  var duong = [
    { p: p3(BH), c: ['#2F8FE0', '#CDEBFF'], gl: [0, 0.5], rung: [0.07, 0.07, 0.12], t: 4.0, tuyen: true, s: 2.2 },
    { p: p3([[-1.8, 1.4], [-0.45, 1.4], [0.45, 1.4], [1.8, 1.4]]), c: ['#CDEBFF', '#FFD3B0'], gl: 0.5, rung: [0.1, 0.14, 0.14], t: 1.8, tuyen: true, s: 2.2 },
    { p: p3(NT), c: ['#FFD3B0', '#E0662F'], gl: [0.5, 0], rung: [0.07, 0.07, 0.12], t: 4.0, tuyen: true, s: 2.2 },
    { p: p3([[1.8, -1.2], [0.36, -1.2]]), c: ['#E0662F'], rung: [0.04, 0.06, 0.06], t: 1.1, tuyen: true, s: 2.2 },
    { p: p3([[0.36, -1.2], [0, -1.2], [-0.36, -1.2], [-1.8, -1.2]]), c: ['#E0662F', '#2F8FE0'], rung: [0.04, 0.06, 0.06], t: 1.4, tuyen: true, s: 2.2 },
  ];
  var B = duong.map(function (d) { return Object.assign({}, d); });
  return {
    ten: 'Tủ lạnh cơ: vòng môi chất lạnh', camera: { pos: [0.6, 1.3, 13.2], target: [0, 0.2, 0] }, khoangCachMax: 19,
    xuyenMacDinh: true, boPhan: boPhan, trangTri: [tt], hat: ctx.hatTuyen({ tiLe: 1, A: duong, B: B }), omega: 0,
    chuThichDoThi: 'Số hạt hết một vòng',
    chuThichMau: [['#2F8FE0', 'Môi chất lỏng, áp suất thấp (xanh nhạt phát sáng: hơi)'], ['#E0662F', 'Môi chất lỏng, áp suất cao (cam nhạt phát sáng: hơi)']],
    buoc: [
      { ten: 'Bộ phận bốc hơi: lỏng thành hơi ở áp suất thấp', pha: [0], bp: 'bochoi' },
      { ten: 'Máy nén: hơi được tăng áp suất', pha: [1], bp: 'maynen' },
      { ten: 'Bộ phận ngưng tụ: hơi thành lỏng', pha: [2], bp: 'ngungtu' },
      { ten: 'Van giãn nở: giảm áp, bắt đầu chu kỳ mới', pha: [3, 4], bp: 'vangiano' },
    ],
  };
};
