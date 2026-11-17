/* Máy mẫu: ÉP TRỤC VÍT (nằm ngang) – bài CNTP-Ngay03, Cảnh 3.6 (Lê Văn Việt Mẫn và cs. 2011, tr.178; Lê Mỹ Hồng 2005 Ch7).
   ĐỐI CHIẾU NGUỒN: buồng ép hình trụ dài có lỗ nhỏ, trong có trục vít inox; chiều cao ren giảm dần từ đầu vào tới đầu ra, đường kính buồng và trục thay đổi sao cho khoảng trống chứa nguyên liệu
   nhỏ dần về đầu ra → áp tăng dần; dịch thoát qua lỗ trên buồng, bã ra lỗ tháo liệu ở cuối; chỉnh áp bằng cỡ lỗ tháo bã hoặc tốc độ vít; ma sát làm khối nóng lên.
   Bộ phận có nhãn: 1 buồng ép · 2 trục vít · 3 cửa tháo bã. KHÔNG có nhãn cho phễu, máng hứng dịch, động cơ (bài không nêu): vật trang trí. "Hai trục vít" bài ghi "suy ra" → chưa dựng. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ep-truc-vit'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI;
  var lo = U.luoi(34, 20, 13);
  // 1 – phễu nạp
  var pheu = new T.Group();
  var ph = U.lathe([[0.44, 1.5], [0.15, 0.95], [0.15, 0.4]], M.inox({ roughness: 0.15, side: T.DoubleSide }), 48, [-1.1, 0, 0]); ph.userData.xuyen = 0.28; pheu.add(ph);
  // 2 – buồng ép: hình côn hẹp dần về cuối (đục lỗ)
  var buong = new T.Group();
  var bm = U.cone(0.4, 0.58, 2.7, M.inox({ roughness: 0.3, side: T.DoubleSide, alphaMap: lo, alphaTest: 0.5 }), [0.0, 0, 0], 'x', true, 80); bm.userData.xuyen = 0.28; buong.add(bm);
  [-1.35, 1.35].forEach(function (x, k) { buong.add(U.torus(k ? 0.4 : 0.58, 0.03, M.inox({ roughness: 0.2 }), [x, 0, 0], 'x')); });
  // 3 – trục vít: lõi côn dày dần + ren xoắn có chiều cao giảm dần
  var vit = new T.Group();
  vit.add(U.cone(0.27, 0.15, 3.1, M.inox({ roughness: 0.2 }), [-0.1, 0, 0], 'x'));
  var pts = []; for (var i = 0; i <= 200; i++) { var t = i / 200, a = t * PI * 2 * 5, r = 0.55 - 0.16 * t; pts.push(new T.Vector3(-1.3 + t * 2.6, r * Math.sin(a), r * Math.cos(a))); }
  vit.add(U.bong(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 400, 0.035, 8, false), M.son(0xF2994A, { metalness: 0.2, roughness: 0.45 }))));
  // 4 – máng hứng dịch + ống ra
  var mang = new T.Group(), mat = M.inox({ roughness: 0.3, side: T.DoubleSide });
  var mm = U.duc([[-0.8, -0.6], [-0.3, -1.05], [0.3, -1.05], [0.8, -0.6], [0.74, -0.6], [0.26, -1.0], [-0.26, -1.0], [-0.74, -0.6]], 2.5, 0, mat); mm.userData.xuyen = 0.2; mang.add(mm);
  var op = U.tube([0, -1.08, 0.1], [0, -1.08, 1.5], 0.075, M.inox({ roughness: 0.15, side: T.DoubleSide }), true); op.userData.xuyen = 0.25; mang.add(op);
  mang.add(U.cyl(0.082, 0.07, M.son(0xFFB020, { emissive: ctx.lin(0xFFB020), emissiveIntensity: 0.6 }), [0, -1.08, 1.48], 'z'));
  // 5 – cửa tháo bã: vòng điều chỉnh + máng nghiêng
  var cua = new T.Group();
  cua.add(U.torus(0.3, 0.05, M.son(0xD9542C, { metalness: 0.4, roughness: 0.4 }), [1.4, 0, 0], 'x'));
  var ct = U.tube([1.4, -0.05, 0], [1.85, -0.8, 0], 0.22, M.inox({ roughness: 0.2, side: T.DoubleSide }), true); ct.userData.xuyen = 0.25; cua.add(ct);
  // 6 – động cơ + hộp số
  var dc = new T.Group();
  dc.add(U.cyl(0.33, 0.8, M.son(0x2E5A8A, { metalness: 0.4, roughness: 0.4 }), [-2.5, 0, 0], 'x'));
  dc.add(U.box(0.6, 0.62, 0.62, M.son(0x24476E), [-1.95, 0, 0]));
  dc.add(U.cyl(0.09, 0.4, M.inox(), [-1.65, 0, 0], 'x'));
  dc.add(U.box(0.9, 0.9, 0.6, M.son(0x23303B), [-2.5, -0.75, 0]));
  var tu = U.box(3.9, 1.1, 1.5, M.son(0x23303B), [-0.7, -1.79, 0]);
  var thung = U.cyl(0.34, 0.7, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [1.9, -2.0, 0], 'y', true);
  var coc = U.cyl(0.26, 0.5, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [0, -2.0, 1.5], 'y', true);
  var boPhan = [
    { so: 1, id: 'buong', ten: 'Buồng ép hình trụ có lỗ', obj: buong, neo: [0.4, 0.46, 0.05], tach: [0, 1.0, 0], chucNang: 'Buồng ép hình trụ dài có lỗ nhỏ, trong có trục vít inox; đường kính buồng và trục thay đổi sao cho khoảng trống chứa nguyên liệu nhỏ dần về đầu ra. Dịch thoát qua lỗ trên buồng.' },
    { so: 2, id: 'vit', ten: 'Trục vít inox', obj: vit, xoay: true, truc: 'x', neo: [-1.7, 0.1, 0], tach: [0, 0.4, 1.4], chucNang: 'Vít quay đẩy nguyên liệu tiến về cuối. Chiều cao ren giảm dần từ đầu vào tới đầu ra nên khoảng trống hẹp dần, nguyên liệu bị nén, áp tăng dần. Ma sát làm khối nóng lên (giảm độ nhớt dịch: có lợi với ép dầu, có hại với vitamin trái cây).' },
    { so: 3, id: 'cua', ten: 'Cửa tháo bã (chỉnh áp)', obj: cua, neo: [1.75, -0.4, 0], tach: [0.5, -0.1, 0], chucNang: 'Bã ra lỗ tháo liệu ở cuối. Chỉnh áp bằng kích thước lỗ tháo bã (nhỏ lại thì áp tăng) hoặc bằng tốc độ trục vít.' },
  ];
  var A = [
    { p: [[-1.1, 1.45, 0], [-1.1, 0.5, 0]], c: ['#F5D78A'], rung: [0.1, 0, 0.1] },
    { p: [[-1.1, 0.3, 0], [0.5, 0.0, 0]], c: ['#F5D78A', '#FFB020'], gl: [0, 0.5], quay: { ax: 'x', r: [0.3, 0.3], k: 0.8 }, t: 1.8 },
    { p: [[0.5, -0.1, 0], [0.5, -0.62, 0]], c: ['#FFB020'], gl: 0.7, rung: [0.7, 0, 0.6], t: 0.5 },
    { p: [[0.5, -0.62, 0], [0.5, -0.98, 0], [0.0, -1.0, 0]], c: ['#FFB020'], gl: 0.7, rung: [0.5, 0, 0.3], t: 1.1 },
    { p: [[0, -1.0, 0], [0, -1.08, 0.2], [0, -1.08, 1.48], [0, -1.9, 1.5]], c: ['#FFB020'], gl: 0.7, t: 1.1, tuyen: true },
  ];
  var B = [
    A[0],
    { p: [[-1.1, 0.3, 0], [1.2, 0.0, 0]], c: ['#F5D78A', '#9B7B4A'], quay: { ax: 'x', r: [0.3, 0.22], k: 0.8 }, t: 2.3 },
    { p: [[1.2, 0, 0], [1.42, -0.02, 0]], c: ['#9B7B4A'], quay: { ax: 'x', r: [0.22, 0.05], k: 0.8 }, t: 0.5 },
    { p: [[1.42, -0.04, 0], [1.85, -0.8, 0]], c: ['#9B7B4A'], rung: [0.1, 0, 0.1], t: 0.9 },
    { p: [[1.85, -0.8, 0], [1.9, -1.7, 0]], c: ['#9B7B4A'], rung: [0.15, 0, 0.15], t: 0.7 },
  ];
  return {
    ten: 'Máy ép trục vít (nằm ngang)', camera: { pos: [5.0, 2.0, 6.4], target: [-0.2, -0.5, 0] },
    boPhan: boPhan, trangTri: [tu, thung, coc, pheu, mang, dc], hat: ctx.hatTuyen({ tiLe: 0.5, A: A, B: B }), omega: 2.0,
    chuThichDoThi: 'Số hạt ra mỗi nơi', chuThichMau: [['#FFB020', 'Dịch ép (qua lỗ buồng)'], ['#9B7B4A', 'Bã (cửa tháo bã)']],
    buoc: [
      { ten: 'Nguyên liệu vào buồng ép, rơi vào ren của vít', pha: [0], bp: 'vit' },
      { ten: 'Vít quay đẩy nguyên liệu về cuối; khoảng trống hẹp dần, áp tăng dần', pha: [1], bp: 'vit' },
      { ten: 'Dịch thoát qua lỗ trên buồng', pha: [2, 3, 4], beo: 1, bp: 'buong' },
      { ten: 'Bã ra lỗ tháo bã ở cuối buồng', pha: [2, 3, 4], beo: 0, bp: 'cua' },
    ],
  };
};
