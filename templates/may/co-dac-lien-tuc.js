/* Máy mẫu: SƠ ĐỒ CÔ ĐẶC LIÊN TỤC DƯỚI ÁP SUẤT KHÍ QUYỂN – bài CNTP-Ngay10, Cảnh 5.1 (slide Chương 7, 7 chú thích).
   ĐỐI CHIẾU ẢNH SLIDE (Drive, ngày 18/11/2026): 1 thùng chứa dịch cần cô đặc · 2 bơm · 3 thiết bị gia nhiệt dạng tấm bản · 4 thiết bị đun nóng · 5 thiết bị bốc hơi · 6 thiết bị chưng cất · 7 thiết bị ngưng tụ.
   Chữ "thiết bị chưng cất" (6) đọc RÕ trên ảnh, hình là cột đứng chứa vật liệu đệm → hết nghi ngờ OCR. Ảnh còn có nhãn "Sản phẩm" (không đánh số) ở đầu ra bên trái của 3.
   Theo mũi tên trên ảnh: 1 → 2 → 3 → 4 → (ống nối lên đỉnh) 5; từ đáy phễu 5 dịch quay lại qua 3 rồi ra "Sản phẩm"; hơi từ đỉnh 5 sang chân cột 6; đỉnh 6 nối lên 7.
   Mũi tên trên ảnh nhỏ, chụp từ màn chiếu: đường nối là CẦN KIỂM TRA bằng bản gốc. Không có số liệu nhiệt độ, áp suất, lưu lượng. Mô hình KHÔNG khẳng định hơn bảy bộ phận có nhãn; ống nối là vật trang trí. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['co-dac-lien-tuc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  var ink = function (o) { return M.inox(Object.assign({ roughness: 0.25, side: T.DoubleSide }, o || {})); };
  function can(x) { return M.son(x, { metalness: 0.3, roughness: 0.45 }); }
  function ong(pts, r) { var g = new T.Group(); for (var i = 1; i < pts.length; i++) { var t = U.tube([pts[i - 1][0], pts[i - 1][1], 0], [pts[i][0], pts[i][1], 0], r || 0.045, ink({ roughness: 0.2 }), true); t.userData.xuyen = 0.28; g.add(t); } pts.slice(1, -1).forEach(function (q) { var b = U.sphere(r || 0.045, ink(), [q[0], q[1], 0]); b.userData.xuyen = 0.28; g.add(b); }); return g; }
  // 1 – thùng chứa dịch
  var th = new T.Group(); var thm = U.box(0.8, 0.9, 0.8, ink({ roughness: 0.35 }), [-3.6, -0.55, 0]); thm.userData.xuyen = 0.3; th.add(thm);
  th.add(U.box(0.84, 0.05, 0.84, M.inox(), [-3.6, -0.08, 0])); th.add(U.cyl(0.16, 0.3, M.nuoc(0xF5D78A, 0.5), [-3.6, -0.6, 0], 'y'));
  // 2 – bơm
  var bo = new T.Group(); bo.add(U.cyl(0.26, 0.24, can(0x2E5A8A), [-2.75, -0.95, 0], 'z')); bo.add(U.cyl(0.08, 0.2, M.inox(), [-2.75, -0.95, 0.2], 'z')); bo.add(U.cyl(0.17, 0.5, can(0x24476E), [-2.75, -0.95, -0.4], 'z'));
  // 3 – thiết bị gia nhiệt dạng tấm bản: chồng bản mỏng giữa hai tấm ép
  var tb = new T.Group(); for (var i = 0; i < 16; i++) { var pl = U.box(0.045, 0.62, 0.6, M.inox({ roughness: 0.25 }), [-2.3 + i * 0.105, -0.98, 0]); pl.userData.xuyen = 0.4; tb.add(pl); }
  tb.add(U.box(0.1, 0.7, 0.66, can(0x7A8794), [-2.38, -0.98, 0])); tb.add(U.box(0.1, 0.7, 0.66, can(0x7A8794), [-0.65, -0.98, 0]));
  tb.add(U.cyl(0.02, 1.9, M.inox(), [-1.5, -0.7, 0.28], 'x')); tb.add(U.cyl(0.02, 1.9, M.inox(), [-1.5, -1.26, 0.28], 'x'));
  // 4 – thiết bị đun nóng: ống đứng hai lớp (vỏ + ống trong)
  var dn = new T.Group(); var dnm = U.cyl(0.14, 1.9, ink({ roughness: 0.3 }), [-0.2, 0.05, 0], 'y', true); dnm.userData.xuyen = 0.3; dn.add(dnm);
  dn.add(U.cyl(0.055, 1.94, M.nuoc(0xF5D78A, 0.6), [-0.2, 0.05, 0], 'y')); dn.add(U.torus(0.14, 0.025, M.inox(), [-0.2, -0.85, 0], 'y')); dn.add(U.torus(0.14, 0.025, M.inox(), [-0.2, 0.95, 0], 'y'));
  // 5 – thiết bị bốc hơi: thân trụ đáy phễu
  var bh = new T.Group(); var bhm = U.lathe([[0.0, -0.58], [0.1, -0.55], [0.4, 0.0], [0.4, 0.8], [0.3, 0.9], [0.0, 0.92]], ink({ roughness: 0.3 }), 64, [1.3, 0, 0]); bhm.userData.xuyen = 0.28; bh.add(bhm);
  bh.add(U.torus(0.4, 0.025, M.inox(), [1.3, 0.0, 0], 'y'));
  // 6 – thiết bị chưng cất: cột đứng chứa vật liệu đệm (vẽ bằng lưới lỗ)
  var lo = U.luoi(8, 22, 12), cc = new T.Group();
  var ccm = U.cyl(0.35, 2.0, ink({ roughness: 0.3, alphaMap: lo, alphaTest: 0.5 }), [3.0, -0.2, 0], 'y', true, 48); ccm.userData.xuyen = 0.5; cc.add(ccm);
  cc.add(U.cyl(0.36, 0.08, M.inox(), [3.0, 0.82, 0], 'y')); cc.add(U.cyl(0.36, 0.08, M.inox(), [3.0, -1.22, 0], 'y'));
  // 7 – thiết bị ngưng tụ: bình đứng phía trên bên phải
  var ng = new T.Group(); var ngm = U.cyl(0.27, 1.1, ink({ roughness: 0.25 }), [3.0, 1.9, 0], 'y', true); ngm.userData.xuyen = 0.3; ng.add(ngm);
  ng.add(U.cyl(0.28, 0.06, M.inox(), [3.0, 2.45, 0], 'y')); ng.add(U.cyl(0.28, 0.06, M.inox(), [3.0, 1.35, 0], 'y')); ng.add(U.cyl(0.05, 0.95, M.nuoc(0x3AA0FF, 0.5), [3.0, 1.9, 0], 'y'));
  var boPhan = [
    { so: 1, id: 'thung', ten: 'Thùng chứa dịch cần cô đặc', obj: th, neo: [-3.6, -0.1, 0.4], tach: [0, 0.6, 0], chucNang: 'Thùng chứa dịch cần cô đặc.' },
    { so: 2, id: 'bom', ten: 'Bơm', obj: bo, neo: [-2.75, -0.62, 0.3], tach: [0, -0.7, 0.7], chucNang: 'Bơm.' },
    { so: 3, id: 'tamban', ten: 'Thiết bị gia nhiệt dạng tấm bản', obj: tb, neo: [-1.5, -0.6, 0.4], tach: [0, -0.7, 0.7], chucNang: 'Thiết bị gia nhiệt dạng tấm bản.' },
    { so: 4, id: 'dunnong', ten: 'Thiết bị đun nóng', obj: dn, neo: [-0.2, 1.0, 0.2], tach: [0, 0.7, 0.4], chucNang: 'Thiết bị đun nóng.' },
    { so: 5, id: 'bochoi', ten: 'Thiết bị bốc hơi', obj: bh, neo: [1.3, 0.95, 0.4], tach: [0.2, 0.8, 0.4], chucNang: 'Thiết bị bốc hơi.' },
    { so: 6, id: 'chungcat', ten: 'Thiết bị chưng cất', obj: cc, neo: [3.0, 0.85, 0.4], tach: [0, -0.4, 0.8], chucNang: 'Thiết bị chưng cất.' },
    { so: 7, id: 'ngungtu', ten: 'Thiết bị ngưng tụ', obj: ng, neo: [3.0, 2.5, 0.3], tach: [0.8, 0.5, 0], chucNang: 'Thiết bị ngưng tụ.' },
  ];
  // ống nối (không nhãn) và đường "Sản phẩm" (nhãn không đánh số trên ảnh)
  var tt = new T.Group();
  [[[-3.2, -0.95], [-2.95, -0.95]], [[-2.55, -0.95], [-2.4, -0.95]], [[-0.65, -0.85], [-0.2, -0.85], [-0.2, -0.9]], [[-0.2, 0.95], [-0.2, 1.2], [1.1, 1.2], [1.1, 0.8]],
   [[1.3, -0.58], [1.3, -1.12], [-0.65, -1.12]], [[1.3, 0.92], [1.3, 1.5], [2.2, 1.5], [2.2, -0.95], [2.65, -0.95]], [[3.0, 0.86], [3.0, 1.35]], [[-2.2, -1.3], [-2.2, -1.9]]]
    .forEach(function (p) { tt.add(ong(p)); });
  tt.add(U.box(9.0, 0.08, 1.4, can(0x1E262E), [0.1, -2.1, 0]));
  // hạt: A = dịch (loãng → nóng → đặc → ra "Sản phẩm");  B = hơi bay ra từ 5 → 6 → 7 (đường theo mũi tên trên ảnh)
  var A = [
    { p: [[-3.6, -0.3, 0], [-3.6, -0.95, 0], [-2.75, -0.95, 0], [-2.3, -0.95, 0], [-0.7, -0.85, 0]], c: ['#F5D78A'], rung: [0, 0.05, 0.1], t: 2.0 },
    { p: [[-0.7, -0.85, 0], [-0.2, -0.85, 0], [-0.2, 0.9, 0]], c: ['#F5D78A', '#FFB020'], gl: [0, 0.4], rung: [0.03, 0, 0.03], t: 1.6 },
    { p: [[-0.2, 0.9, 0], [-0.2, 1.2, 0], [1.1, 1.2, 0], [1.1, 0.8, 0], [1.3, 0.4, 0]], c: ['#FFB020'], gl: 0.4, rung: [0.04, 0.04, 0.04], t: 1.6 },
    { p: [[1.3, 0.4, 0], [1.3, -0.5, 0], [1.3, -1.12, 0]], c: ['#FFB020', '#B8741A'], rung: [0.2, 0, 0.2], t: 1.2 },
    { p: [[1.3, -1.12, 0], [-0.7, -1.12, 0], [-2.2, -1.12, 0], [-2.2, -1.9, 0]], c: ['#B8741A'], rung: [0, 0.03, 0.05], t: 2.0, tuyen: true },
  ];
  var B = [
    { p: [[1.3, 0.2, 0], [1.3, 0.8, 0]], c: ['#DDEBFF'], gl: 0.5, rung: [0.3, 0, 0.3], t: 1.0 },
    { p: [[1.3, 0.8, 0], [1.3, 1.5, 0], [2.2, 1.5, 0]], c: ['#DDEBFF'], gl: 0.5, rung: [0.03, 0.03, 0.03], t: 1.2, tuyen: true },
    { p: [[2.2, 1.5, 0], [2.2, -0.95, 0], [2.65, -0.95, 0]], c: ['#DDEBFF'], gl: 0.5, rung: [0.03, 0, 0.03], t: 1.6, tuyen: true },
    { p: [[3.0, -0.95, 0], [3.0, 0.8, 0]], c: ['#DDEBFF'], gl: 0.5, rung: [0.5, 0, 0.5], t: 1.6 },
    { p: [[3.0, 0.8, 0], [3.0, 1.0, 0], [3.0, 1.7, 0]], c: ['#DDEBFF', '#3AA0FF'], gl: 0.6, rung: [0.03, 0.03, 0.03], t: 1.4, mo: true },
  ];
  return {
    ten: 'Sơ đồ cô đặc liên tục dưới áp suất khí quyển', camera: { pos: [0.9, 1.8, 15.8], target: [0.55, 0.1, 0] },
    xuyenMacDinh: true, boPhan: boPhan, trangTri: [tt], hat: ctx.hatTuyen({ tiLe: 0.55, A: A, B: B }), omega: 1.4,
    chuThichDoThi: 'Số hạt kết thúc hành trình',
    chuThichMau: [['#F5D78A', 'Dịch (loãng, nóng dần)'], ['#B8741A', 'Dịch đã đặc (ra "Sản phẩm")'], ['#DDEBFF', 'Hơi bay ra từ thiết bị bốc hơi (theo mũi tên trên ảnh)']],
    buoc: [
      { ten: 'Dịch từ thùng chứa, qua bơm, vào gia nhiệt tấm bản', pha: [0], beo: 1, bp: 'thung' },
      { ten: 'Thiết bị đun nóng', pha: [1], beo: 1, bp: 'dunnong' },
      { ten: 'Thiết bị bốc hơi: nước bay hơi, dịch đặc dần', pha: [2, 3], bp: 'bochoi' },
      { ten: 'Thiết bị chưng cất và thiết bị ngưng tụ', pha: [2, 3, 4], beo: 0, bp: 'chungcat' },
      { ten: 'Dịch đặc ra khỏi hệ thống', pha: [4], beo: 1, bp: 'tamban' },
    ],
  };
};
