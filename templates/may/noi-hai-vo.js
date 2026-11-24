/* Máy mẫu: NỒI HAI VỎ (nồi chần – hấp làm việc gián đoạn) – bài CNTP-Ngay09, Cảnh 2.2 (slide 10 cô Trần Thị Nhung, buổi 10/11/2026).
   ĐỐI CHIẾU NGUỒN (chú thích slide, 11 bộ phận): 1 vỏ trong · 2 vỏ ngoài · 3 phòng hơi · 4 ống dẫn hơi · 5 ống tháo (slide ghi "nước không ngưng", có thể OCR của "khí không ngưng": CẦN KIỂM TRA)
   · 6 van tháo nước ngưng · 7 van hơi an toàn · 8 áp kế · 9 giá đỡ · 10 tay quay · 11 bánh quay răng khía.
   Bài nêu: nguyên liệu trong vỏ trong, hơi vào phòng hơi giữa hai vỏ (suy từ chú thích), nước ngưng thoát qua van 6; tay quay + bánh răng "gợi ý nghiêng nồi" (suy luận từ hình, slide không ghi).
   VỊ TRÍ, kích thước, hình dạng mọi bộ phận là cách vẽ của album (không phải bản sao hình slide). KHÔNG có nhãn cho nắp, cánh khuấy, động cơ (bài chỉ nhắc hình có động cơ ở nắp): vật trang trí. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['noi-hai-vo'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI, DC = { side: T.DoubleSide };
  var Pi = [[0.2, -0.84], [0.4, -0.8], [0.62, -0.62], [0.76, -0.3], [0.8, 0.0], [0.8, 0.62]];
  var Po = [[0.2, -1.04], [0.4, -1.0], [0.7, -0.8], [0.9, -0.4], [1.0, 0.0], [1.0, 0.62]];
  function can(x) { return M.son(x, { metalness: 0.3, roughness: 0.45 }); }
  function dongHo(p) { // áp kế: mặt tròn hướng +z
    var g = new T.Group(); g.add(U.cyl(0.19, 0.07, M.inox({ roughness: 0.25 }), [0, 0, 0], 'z')); g.add(U.cyl(0.155, 0.075, M.son(0xF4F4F0, { roughness: 0.6 }), [0, 0, 0.003], 'z'));
    var kim = U.box(0.02, 0.13, 0.012, M.son(0xD9342C), [0.03, 0.04, 0.045]); kim.rotation.z = -0.6; g.add(kim); g.position.set(p[0], p[1], p[2]); return g;
  }
  // 1 – vỏ trong (chứa nguyên liệu)
  var vt = new T.Group();
  var vtm = U.lathe([[0, -0.85]].concat(Pi.slice(0, 5), [[0.8, 0.85]]), M.inox({ roughness: 0.2, side: T.DoubleSide }), 72); vtm.userData.xuyen = 0.3; vt.add(vtm);
  vt.add(U.torus(0.8, 0.03, M.inox({ roughness: 0.2 }), [0, 0.85, 0], 'y'));
  // 2 – vỏ ngoài (+ nắp vòng trên của phòng hơi)
  var vn = new T.Group();
  var vnm = U.lathe([[0, -1.05]].concat(Po), M.inox({ roughness: 0.3, side: T.DoubleSide }), 72); vnm.userData.xuyen = 0.22; vn.add(vnm);
  var cap = U.lathe([[0.8, 0.62], [1.0, 0.62]], M.inox({ roughness: 0.3, side: T.DoubleSide }), 72); cap.userData.xuyen = 0.4; vn.add(cap);
  // 3 – phòng hơi: khoảng giữa hai vỏ (khối trong mờ màu cam để thấy chỗ hơi nằm)
  var ph = new T.Group();
  var phm = U.lathe(Pi.concat(Po.slice().reverse()), M.nuoc(0xFF9A4A, 0.28), 72); phm.userData.xuyen = 0.18; ph.add(phm);
  // 4 – ống dẫn hơi (vào phòng hơi từ bên phải)
  var od = new T.Group();
  od.add(U.tube([2.6, 0.25, 0], [0.98, 0.25, 0], 0.07, M.inox({ roughness: 0.2, side: T.DoubleSide }), true));
  od.add(U.torus(0.1, 0.025, M.inox(), [1.0, 0.25, 0], 'x')); od.add(U.cyl(0.11, 0.04, M.inox(), [1.9, 0.25, 0], 'x'));
  // 5 – ống tháo (bên trái, dưới phòng hơi)
  var ot = new T.Group();
  ot.add(U.tube([-0.95, -0.72, -0.3], [-1.7, -0.72, -0.3], 0.055, M.inox({ roughness: 0.2, side: T.DoubleSide }), true));
  ot.add(U.cyl(0.07, 0.05, M.inox(), [-1.7, -0.72, -0.3], 'x'));
  // 6 – van tháo nước ngưng (đáy phòng hơi, bên phải)
  var vn6 = new T.Group();
  vn6.add(U.tube([0.5, -0.99, 0], [0.5, -1.45, 0], 0.055, M.inox({ roughness: 0.2, side: T.DoubleSide }), true));
  vn6.add(U.sphere(0.12, can(0x2E5A8A), [0.5, -1.45, 0])); vn6.add(U.tube([0.5, -1.45, 0], [1.25, -1.45, 0], 0.055, M.inox({ side: T.DoubleSide }), true));
  vn6.add(U.cyl(0.02, 0.28, M.inox(), [0.5, -1.3, 0.0], 'y')); vn6.add(U.cyl(0.11, 0.03, can(0xD9542C), [0.5, -1.17, 0], 'y'));
  [od, ot, vn6].forEach(function (g) { g.traverse(function (o) { if (o.isMesh && o.userData.xuyen === undefined) o.userData.xuyen = 0.28; }); });
  // 7 – van hơi an toàn (trên phòng hơi)
  var va = new T.Group();
  va.add(U.cyl(0.07, 0.16, can(0x7A8794), [0.9, 0.7, 0], 'y')); va.add(U.cyl(0.1, 0.22, can(0xD9542C), [0.9, 0.89, 0], 'y')); va.add(U.sphere(0.06, M.inox(), [0.9, 1.04, 0]));
  // 8 – áp kế (trên ống dẫn hơi)
  var ak = new T.Group(); ak.add(U.cyl(0.025, 0.5, M.inox(), [1.5, 0.5, 0], 'y')); ak.add(dongHo([1.5, 0.84, 0]));
  // 9 – giá đỡ (ba chân)
  var gd = new T.Group();
  [0.45, 0.45 + 2.0944, 0.45 + 4.1888].forEach(function (a) { gd.add(U.tube([0.82 * Math.cos(a), -0.78, 0.82 * Math.sin(a)], [1.25 * Math.cos(a), -2.2, 1.25 * Math.sin(a)], 0.06, can(0x2B3844))); });
  gd.add(U.torus(1.08, 0.03, can(0x2B3844), [0, -1.45, 0], 'y'));
  // 11 – bánh quay răng khía (bánh răng bên hông) · 10 – tay quay
  var br = new T.Group(); br.add(U.cyl(0.07, 0.2, M.inox(), [0, 0, 1.05], 'z')); br.add(U.cyl(0.3, 0.1, can(0x2E5A8A), [0, 0, 1.15], 'z'));
  for (var k = 0; k < 24; k++) { var a = k / 24 * PI * 2, t = U.box(0.07, 0.1, 0.1, can(0x2E5A8A)); t.position.set(Math.cos(a) * 0.33, Math.sin(a) * 0.33, 1.15); t.rotation.z = a; br.add(t); }
  br.position.set(-0.2, -0.2, 0);
  var tq = new T.Group(); tq.add(U.tube([0, 0, 1.15], [0.0, -0.7, 1.4], 0.03, M.inox(), true)); tq.add(U.torus(0.27, 0.03, can(0xD9542C), [0, -0.7, 1.45], 'z'));
  for (var s = 0; s < 4; s++) { var sp = U.box(0.02, 0.54, 0.02, can(0xD9542C), [0, -0.7, 1.45]); sp.rotation.z = s * PI / 4; tq.add(sp); }
  tq.position.set(-0.2, -0.2, 0);
  // vật trang trí không nhãn: giá nắp, cánh khuấy, động cơ ở nắp
  var tt = new T.Group();
  tt.add(U.box(2.1, 0.06, 0.12, can(0x2B3844), [0, 0.95, 0]));
  tt.add(U.cyl(0.035, 1.3, M.inox(), [0, 0.35, 0], 'y')); tt.add(U.box(0.9, 0.05, 0.16, M.inox(), [0, -0.5, 0]));
  tt.add(U.cyl(0.2, 0.45, can(0x2E5A8A), [0, 1.25, 0], 'y')); tt.add(U.box(0.4, 0.14, 0.3, can(0x24476E), [0, 1.0, 0]));
  var boPhan = [
    { so: 1, id: 'votrong', ten: 'Vỏ trong', obj: vt, neo: [-0.8, 0.5, 0], tach: [0, 1.4, 0], chucNang: 'Chứa nguyên liệu.' },
    { so: 2, id: 'vongoai', ten: 'Vỏ ngoài', obj: vn, neo: [-1.0, 0.05, 0], tach: [-1.2, 0, 0], chucNang: 'Bao quanh vỏ trong.' },
    { so: 3, id: 'phonghoi', ten: 'Phòng hơi', obj: ph, neo: [0.9, -0.4, 0], tach: [1.0, 0.4, 0], chucNang: 'Khoảng giữa hai vỏ, nơi hơi đi vào.' },
    { so: 4, id: 'ongdan', ten: 'Ống dẫn hơi', obj: od, neo: [2.0, 0.25, 0], tach: [0.7, 0.4, 0], chucNang: 'Dẫn hơi vào phòng hơi.' },
    { so: 5, id: 'ongtao', ten: 'Ống tháo', obj: ot, neo: [-1.4, -0.72, -0.3], tach: [-0.6, 0, -0.3], chucNang: 'Ống tháo (Cần kiểm tra chữ trên slide).' },
    { so: 6, id: 'vannuoc', ten: 'Van tháo nước ngưng', obj: vn6, neo: [0.9, -1.45, 0.1], tach: [0.5, -0.6, 0], chucNang: 'Tháo nước ngưng.' },
    { so: 7, id: 'vanat', ten: 'Van hơi an toàn', obj: va, neo: [0.9, 1.0, 0], tach: [0, 0.9, 0], chucNang: 'Van hơi an toàn.' },
    { so: 8, id: 'apke', ten: 'Áp kế', obj: ak, neo: [1.5, 0.95, 0.1], tach: [0.5, 0.7, 0], chucNang: 'Áp kế.' },
    { so: 9, id: 'giado', ten: 'Giá đỡ', obj: gd, neo: [-0.9, -1.8, 0.9], tach: [0, -0.8, 0], chucNang: 'Giá đỡ.' },
    { so: 10, id: 'tayquay', ten: 'Tay quay', obj: tq, neo: [-0.2, -1.0, 1.7], tach: [0, -0.4, 0.8], chucNang: 'Tay quay.' },
    { so: 11, id: 'banhrang', ten: 'Bánh quay răng khía', obj: br, neo: [-0.2, -0.2, 1.5], tach: [0, 0.2, 0.8], chucNang: 'Bánh quay răng khía.' },
  ];
  // hạt: A (hơi → nước ngưng, nằm ở phòng hơi) và B (nguyên liệu, nằm ở vỏ trong) – hai đường tách biệt
  var A = [
    { p: [[2.6, 0.25, 0], [1.0, 0.25, 0]], c: ['#E8EEF5'], gl: 0.6, rung: [0, 0.04, 0.04], tuyen: true, t: 1.0 },
    { p: [[1.0, 0.25, 0], [0.92, 0.5, 0.1]], c: ['#E8EEF5'], gl: 0.6, rung: [0.06, 0.2, 0.5], t: 1.0 },
    { p: [[0.92, 0.4, 0], [0.95, -0.2, 0], [0.8, -0.7, 0]], c: ['#E8EEF5', '#3AA0FF'], gl: 0.6, rung: [0.05, 0, 0.5], t: 1.5 },
    { p: [[0.8, -0.7, 0], [0.5, -0.98, 0], [0.5, -1.45, 0]], c: ['#3AA0FF'], gl: 0.7, rung: [0.03, 0, 0.05], t: 1.0 },
    { p: [[0.5, -1.45, 0], [1.25, -1.45, 0], [1.25, -2.0, 0]], c: ['#3AA0FF'], gl: 0.7, t: 1.0, tuyen: true },
  ];
  var B = [
    { p: [[-0.2, 1.4, 0], [-0.2, 0.3, 0]], c: ['#9BD36A'], rung: [0.4, 0, 0.4], t: 0.9 },
    { p: [[-0.2, 0.3, 0], [0.2, -0.3, 0]], c: ['#9BD36A'], quay: { ax: 'y', r: [0.55, 0.6], k: 0.8 }, t: 1.6 },
    { p: [[0.2, -0.3, 0], [0.0, -0.55, 0]], c: ['#9BD36A'], quay: { ax: 'y', r: [0.55, 0.5], k: 0.8 }, t: 1.6 },
    { p: [[0.0, -0.55, 0], [0.1, -0.35, 0]], c: ['#9BD36A'], quay: { ax: 'y', r: [0.5, 0.55], k: 0.8 }, t: 1.6 },
    { p: [[0.1, -0.35, 0], [0.0, -0.6, 0]], c: ['#9BD36A'], quay: { ax: 'y', r: [0.55, 0.4], k: 0.8 }, t: 1.2, mo: true },
  ];
  return {
    ten: 'Nồi hai vỏ (chần – hấp làm việc gián đoạn)', camera: { pos: [4.8, 2.0, 6.4], target: [0.4, -0.45, 0] },
    xuyenMacDinh: true, boPhan: boPhan, trangTri: [tt], hat: ctx.hatTuyen({ tiLe: 0.45, A: A, B: B }), omega: 1.2,
    chuThichDoThi: 'Số hạt kết thúc hành trình',
    chuThichMau: [['#E8EEF5', 'Hơi (vào phòng hơi, không chạm nguyên liệu)'], ['#3AA0FF', 'Nước ngưng (ra qua van 6)'], ['#9BD36A', 'Nguyên liệu (trong vỏ trong)']],
    buoc: [
      { ten: 'Vỏ trong chứa nguyên liệu, vỏ ngoài bao quanh', pha: [0, 1, 2, 3, 4], beo: 0, bp: 'votrong' },
      { ten: 'Hơi vào qua ống dẫn hơi, lấp đầy phòng hơi', pha: [0, 1], beo: 1, bp: 'phonghoi' },
      { ten: 'Nước ngưng thoát qua van tháo nước ngưng', pha: [2, 3, 4], beo: 1, bp: 'vannuoc' },
      { ten: 'Van hơi an toàn và áp kế', pha: [], bp: 'vanat' },
      { ten: 'Giá đỡ', pha: [], bp: 'giado' },
      { ten: 'Tay quay và bánh quay răng khía', pha: [], bp: 'tayquay' },
    ],
  };
};
