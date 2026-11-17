/* Máy mẫu: ÉP HAI TRỤC (ép trục / roller) – bài CNTP-Ngay03, Cảnh 3.5 Ý1 (Lê Văn Việt Mẫn và cs. 2011, tr.177–178, hình H.2.1.12.4).
   ĐỐI CHIẾU NGUỒN: các trục trụ bằng kim loại nặng, bề mặt có rãnh dọc; nguyên liệu qua khe hẹp giữa hai trục bị ép, dịch thoát ra; thường nhiều trục nối tiếp (như máy ép mía nhiều trục);
   hai trục quay ngược chiều (theo mô tả hình trong bài).
   Bộ phận có nhãn: 1 trục trái · 2 trục phải · 3 khe hẹp. KHÔNG có nhãn cho phễu, khay hứng, dao gạt/máng bã, khung và động cơ (bài không nêu cho máy ép trục): vật trang trí.
   Hạt "bã" chỉ minh họa phần còn lại sau khi ép. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ep-hai-truc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI, RR = 0.55, CX = 0.6, CY = 0.1, LZ = 1.5;
  function truc(dx) {
    var g = new T.Group(); g.add(U.cyl(RR, LZ, M.inox({ roughness: 0.3 }), null, 'z', false, 64)); g.add(U.cyl(0.1, LZ + 0.5, M.inox({ roughness: 0.2 }), null, 'z'));
    for (var k = 0; k < 16; k++) { var a = k / 16 * PI * 2, r = U.box(0.05, 0.06, LZ, M.inox({ roughness: 0.4 })); r.position.set(Math.cos(a) * RR, Math.sin(a) * RR, 0); r.rotation.z = a; g.add(r); }
    g.userData.dx = dx; return g;
  }
  var tr = truc(-1), ph = truc(1); // tr: trục trái, ph: trục phải
  var pheu = new T.Group(); var pm = U.lathe([[0.55, 1.75], [0.12, 1.15], [0.12, 0.95]], M.inox({ roughness: 0.15, side: T.DoubleSide }), 48, [0, 0, 0]); pm.userData.xuyen = 0.28; pheu.add(pm);
  var khe = new T.Group(); khe.add(U.box(0.035, 0.42, LZ - 0.1, M.son(0xFFD23F, { emissive: ctx.lin(0xFFC21A), emissiveIntensity: 0.8 }), [0, CY, 0]));
  var khay = new T.Group(), mk = M.inox({ roughness: 0.3, side: T.DoubleSide });
  var kd = U.duc([[-1.1, -0.65], [-0.6, -1.05], [0.3, -1.05], [0.6, -0.65], [0.55, -0.65], [0.28, -1.0], [-0.58, -1.0], [-1.05, -0.65]], 1.9, 0, mk); kd.userData.xuyen = 0.25; khay.add(kd);
  khay.add(U.tube([-0.9, -1.03, 0], [-0.9, -1.03, 1.5], 0.07, M.inox({ roughness: 0.15, side: T.DoubleSide }), true));
  khay.add(U.cyl(0.078, 0.07, M.son(0xFFB020, { emissive: ctx.lin(0xFFB020), emissiveIntensity: 0.6 }), [-0.9, -1.03, 1.5], 'z'));
  var bat = new T.Group(); var bt = U.tube([0.3, -0.7, 0], [1.9, -1.1, 0], 0.22, M.inox({ roughness: 0.2, side: T.DoubleSide }), true); bt.userData.xuyen = 0.25; bat.add(bt);
  var dao = U.box(0.5, 0.04, LZ - 0.1, M.son(0xD9542C), [1.0, 0.3, 0]); dao.rotation.z = -0.6; bat.add(dao);
  var khung = new T.Group(); [-1, 1].forEach(function (s) { var t = U.box(2.7, 2.5, 0.1, M.son(0x2B3844), [0, 0.0, s * 0.95]); t.userData.xuyen = 0.3; khung.add(t); });
  khung.add(U.cyl(0.28, 0.6, M.son(0x2E5A8A, { metalness: 0.4, roughness: 0.4 }), [-0.6 - 0.8, 0.1, 1.4], 'z')); khung.add(U.box(0.5, 0.5, 0.4, M.son(0x24476E), [-1.4, 0.1, 1.1]));
  var tu = U.box(3.4, 1.05, 1.9, M.son(0x23303B), [0.3, -1.85, 0]);
  var thung = U.cyl(0.34, 0.7, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [2.0, -2.0, 0], 'y', true), coc = U.cyl(0.26, 0.5, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [-0.9, -2.0, 1.5], 'y', true);
  var boPhan = [
    { so: 1, id: 'trai', ten: 'Trục trái (có rãnh dọc)', obj: tr, neo: [-CX - RR, CY + 0.2, 0.7], tach: [-0.9, 0, 0], chucNang: 'Trục trụ bằng kim loại nặng, bề mặt có rãnh dọc. Thường đặt nhiều trục nối tiếp để tăng hiệu quả (như máy ép mía nhiều trục).' },
    { so: 2, id: 'phai', ten: 'Trục phải (có rãnh dọc)', obj: ph, neo: [CX + RR, CY + 0.2, 0.7], tach: [0.9, 0, 0], chucNang: 'Quay ngược chiều với trục trái; bề mặt có rãnh dọc.' },
    { so: 3, id: 'khe', ten: 'Khe hẹp giữa hai trục', obj: khe, neo: [0, CY + 0.7, 0.75], tach: [0, 0.55, 0], chucNang: 'Nguyên liệu qua khe hẹp giữa hai trục bị ép, dịch thoát ra.' },
  ];
  var A = [
    { p: [[0, 1.7, 0], [0, 0.95, 0]], c: ['#F5D78A'], rung: [0.12, 0, 0.9] },
    { p: [[0, 0.95, 0], [0, CY + 0.02, 0]], c: ['#F5D78A', '#FFB020'], rung: [0.1, 0, 0.9], t: 1.0 },
    { p: [[0, CY, 0], [0.12, -0.35, 0], [-0.15, -0.62, 0]], c: ['#FFB020'], gl: 0.7, rung: [0.2, 0, 1.3], t: 0.7 },
    { p: [[-0.15, -0.62, 0], [-0.3, -0.98, 0], [-0.9, -1.0, 0]], c: ['#FFB020'], gl: 0.7, rung: [0.2, 0, 0.5], t: 1.0 },
    { p: [[-0.9, -1.0, 0], [-0.9, -1.03, 1.5], [-0.9, -1.9, 1.5]], c: ['#FFB020'], gl: 0.7, t: 1.2, tuyen: true },
  ];
  var B = [
    A[0], A[1],
    { p: [[0, CY, 0], [0.05, -0.35, 0], [0.4, -0.65, 0]], c: ['#9B7B4A'], rung: [0.1, 0, 1.3], t: 0.7 },
    { p: [[0.4, -0.65, 0], [1.9, -1.1, 0]], c: ['#9B7B4A'], rung: [0.15, 0, 1.2], t: 1.0 },
    { p: [[1.9, -1.1, 0], [2.0, -1.7, 0]], c: ['#9B7B4A'], rung: [0.2, 0, 0.3], t: 0.6 },
  ];
  function capNhat(tg) { tr.rotation.z = -tg * 1.6; ph.rotation.z = tg * 1.6; }
  tr.position.set(-CX, CY, 0); ph.position.set(CX, CY, 0);
  return {
    ten: 'Máy ép hai trục (ép trục)', camera: { pos: [4.6, 1.9, 6.3], target: [0.2, -0.45, 0] },
    boPhan: boPhan, trangTri: [tu, thung, coc, pheu, khay, bat, khung], hat: ctx.hatTuyen({ tiLe: 0.55, A: A, B: B }), omega: 0, capNhat: capNhat,
    chuThichDoThi: 'Số hạt ra mỗi nơi', chuThichMau: [['#FFB020', 'Dịch ép (xuống khay)'], ['#9B7B4A', 'Phần còn lại sau khi ép (minh họa)']],
    buoc: [
      { ten: 'Nguyên liệu đi vào khe hẹp giữa hai trục có rãnh', pha: [0, 1], bp: 'khe' },
      { ten: 'Hai trục quay ngược chiều ép nguyên liệu qua khe; dịch thoát ra', pha: [2, 3, 4], bp: 'khe' },
    ],
  };
};
