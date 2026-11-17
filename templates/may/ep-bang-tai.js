/* Máy mẫu: ÉP BĂNG TẢI – bài CNTP-Ngay03, Cảnh 3.5 Ý2 và Ý4 (Lê Văn Việt Mẫn và cs. 2011, tr.177–178).
   ĐỐI CHIẾU NGUỒN: hai băng tải song song cùng chiều, khe hẹp ở giữa; băng trên NÉN và điều khiển tốc độ, băng dưới có lỗ nhỏ chịu lực và LỌC; dịch thoát qua băng dưới; cuối băng có dao cạo tách bã;
   (hình trong bài mô tả "khối nguyên liệu mỏng dần"). Ý4: năng suất lớn nhưng khó vệ sinh, bảo trì, đầu tư đắt; dùng nhiều cho trái cây.
   Bộ phận có nhãn: 1 băng trên · 2 băng dưới · 3 dao cạo bã. KHÔNG có nhãn cho phễu, khay hứng, máng bã, con lăn và động cơ (bài không nêu): vật trang trí.
   Băng chạy và con lăn quay do capNhat (theo thời gian mô phỏng). */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ep-bang-tai'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI, W = 1.4, XL = -1.35, XR = 1.35;
  function bangTex(rep, mau1, mau2) { var cv = document.createElement('canvas'); cv.width = 128; cv.height = 16; var g = cv.getContext('2d'); g.fillStyle = mau1; g.fillRect(0, 0, 128, 16); g.fillStyle = mau2; g.fillRect(0, 0, 18, 16); var t = new T.CanvasTexture(cv); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep, 1); return t; }
  var texT = bangTex(14, '#3A4B5C', '#566B80'), texD = bangTex(14, '#4B5563', '#6B7A8C');
  var mT = M.son(0xFFFFFF, { map: texT, roughness: 0.7, metalness: 0.1 }), mD = M.son(0xFFFFFF, { map: texD, roughness: 0.7, metalness: 0.1 });
  var roll = []; function lan(g, x, y, r) { var c = U.cyl(r, W + 0.2, M.inox({ roughness: 0.3 }), [x, y, 0], 'z'); g.add(c); roll.push(c); return c; }
  // 3 – băng dưới: chạy ngang, mặt trên y=0, có lỗ (vạch tối trên mặt)
  var duoi = new T.Group();
  duoi.add(U.box(XR - XL, 0.05, W, mD, [0, -0.025, 0])); duoi.add(U.box(XR - XL, 0.05, W, mD, [0, -0.45, 0]));
  lan(duoi, XL, -0.235, 0.235); lan(duoi, XR, -0.235, 0.235);
  var holes = U.box(XR - XL - 0.2, 0.012, W - 0.2, M.son(0x0B0F14, { roughness: 0.9 }), [0, 0.006, 0]); duoi.add(holes);
  // 2 – băng trên: lòng băng nghiêng, khe hẹp dần về phải
  var ang = Math.atan2(0.55 - 0.09, XR - 0.15 - XL), trenG = new T.Group();
  var chay = Math.hypot(XR - 0.15 - XL, 0.55 - 0.09);
  var lower = U.box(chay, 0.05, W, mT, [(XL + XR - 0.15) / 2, (0.55 + 0.09) / 2 + 0.025, 0]); lower.rotation.z = -ang; trenG.add(lower);
  var upper = U.box(chay, 0.05, W, mT, [(XL + XR - 0.15) / 2, (0.55 + 0.09) / 2 + 0.5, 0]); upper.rotation.z = -ang; trenG.add(upper);
  lan(trenG, XL + 0.05, 0.55 + 0.27 + 0.025 - 0.02, 0.27); lan(trenG, XR - 0.15, 0.09 + 0.27 + 0.02, 0.27);
  // 1 – phễu cấp liệu lên đầu băng dưới
  var pheu = new T.Group(); pheu.add(U.lathe([[0.45, 1.65], [0.14, 1.1], [0.14, 0.95]], M.inox({ roughness: 0.15, side: T.DoubleSide }), 48, [-1.1, 0, 0]));
  pheu.children[0].userData.xuyen = 0.28;
  // 4 – khay hứng dịch dưới băng dưới
  var khay = new T.Group(), mk = M.inox({ roughness: 0.3, side: T.DoubleSide });
  var kd = U.duc([[-0.95, -0.55], [-0.6, -1.0], [0.6, -1.0], [0.95, -0.55], [0.9, -0.55], [0.57, -0.96], [-0.57, -0.96], [-0.9, -0.55]], 2.6, 0, mk); kd.userData.xuyen = 0.22; khay.add(kd);
  khay.add(U.tube([-0.7, -0.99, 0.1], [-0.7, -0.99, 1.5], 0.07, M.inox({ roughness: 0.15, side: T.DoubleSide }), true));
  khay.add(U.cyl(0.078, 0.07, M.son(0xFFB020, { emissive: ctx.lin(0xFFB020), emissiveIntensity: 0.6 }), [-0.7, -0.99, 1.5], 'z'));
  // 5 – dao cạo bã, 6 – máng thải
  var dao = new T.Group(); var bl = U.box(0.45, 0.03, W - 0.05, M.son(0xD9542C), [XR + 0.08, -0.05, 0]); bl.rotation.z = 0.7; dao.add(bl);
  var mang = new T.Group(); var ct = U.tube([XR + 0.05, -0.2, 0], [1.95, -0.95, 0], 0.22, M.inox({ roughness: 0.2, side: T.DoubleSide }), true); ct.userData.xuyen = 0.25; mang.add(ct);
  // 7 – con lăn dẫn động + động cơ
  var dc = new T.Group(); dc.add(U.cyl(0.3, 0.6, M.son(0x2E5A8A, { metalness: 0.4, roughness: 0.4 }), [XL - 0.6, -0.235, 1.1], 'z')); dc.add(U.box(0.5, 0.5, 0.4, M.son(0x24476E), [XL - 0.6, -0.235, 0.8]));
  [-1, 1].forEach(function (s) { dc.add(U.box(3.3, 0.1, 0.08, M.son(0x2B3844), [0, -0.235, s * (W / 2 + 0.2)])); });
  var tu = U.box(3.6, 1.1, 1.9, M.son(0x23303B), [0.0, -1.84, 0]);
  var thung = U.cyl(0.34, 0.7, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [2.0, -2.0, 0], 'y', true), coc = U.cyl(0.26, 0.5, M.inox({ side: T.DoubleSide, roughness: 0.4 }), [-0.7, -2.0, 1.5], 'y', true);
  var boPhan = [
    { so: 1, id: 'tren', ten: 'Băng trên (nén)', obj: trenG, neo: [0.35, 0.72, 0.7], tach: [0, 1.0, 0], chucNang: 'Hai băng tải song song cùng chiều, khe hẹp ở giữa; băng trên NÉN nguyên liệu và điều khiển tốc độ.' },
    { so: 2, id: 'duoi', ten: 'Băng dưới (có lỗ, lọc)', obj: duoi, neo: [-0.1, -0.02, 0.72], tach: [0, -0.3, 0], chucNang: 'Băng dưới có lỗ nhỏ, chịu lực và LỌC; dịch thoát qua băng dưới.' },
    { so: 3, id: 'dao', ten: 'Dao cạo bã', obj: dao, neo: [XR + 0.1, 0.1, 0.72], tach: [0.4, 0.4, 0], chucNang: 'Cuối băng có dao cạo tách bã.' },
  ];
  var A = [
    { p: [[-1.1, 1.6, 0], [-1.1, 1.0, 0]], c: ['#F5D78A'], rung: [0.12, 0, 1.0] },
    { p: [[-1.1, 0.95, 0], [-1.1, 0.05, 0], [0.3, 0.1, 0]], c: ['#F5D78A', '#FFB020'], gl: [0, 0.5], rung: [0.1, 0.03, 1.1], t: 1.8, tuyen: false },
    { p: [[0.3, 0.01, 0], [0.3, -0.5, 0]], c: ['#FFB020'], gl: 0.7, rung: [1.4, 0, 1.1], t: 0.5 },
    { p: [[0.3, -0.5, 0], [0.0, -0.96, 0], [-0.7, -0.96, 0]], c: ['#FFB020'], gl: 0.7, rung: [0.8, 0, 0.4], t: 1.2 },
    { p: [[-0.7, -0.96, 0], [-0.7, -0.99, 1.5], [-0.7, -1.9, 1.5]], c: ['#FFB020'], gl: 0.7, t: 1.2, tuyen: true },
  ];
  var B = [
    A[0],
    { p: [[-1.1, 0.95, 0], [-1.1, 0.05, 0], [XR, 0.03, 0]], c: ['#F5D78A', '#9B7B4A'], rung: [0.1, 0.02, 1.1], t: 2.8 },
    { p: [[XR, 0.03, 0], [XR + 0.1, -0.1, 0]], c: ['#9B7B4A'], rung: [0.05, 0, 1.0], t: 0.5 },
    { p: [[XR + 0.1, -0.2, 0], [1.95, -0.95, 0]], c: ['#9B7B4A'], rung: [0.1, 0, 0.5], t: 0.9 },
    { p: [[1.95, -0.95, 0], [2.0, -1.7, 0]], c: ['#9B7B4A'], rung: [0.2, 0, 0.3], t: 0.6 },
  ];
  function capNhat(tg) { texT.offset.x = -tg * 0.5; texD.offset.x = -tg * 0.5; roll.forEach(function (c, i) { c.rotation.x = tg * 1.5; }); }
  return {
    ten: 'Máy ép băng tải', camera: { pos: [4.8, 1.9, 6.4], target: [0.1, -0.45, 0] },
    boPhan: boPhan, trangTri: [tu, thung, coc, pheu, khay, mang, dc], hat: ctx.hatTuyen({ tiLe: 0.55, A: A, B: B }), omega: 0, capNhat: capNhat,
    chuThichDoThi: 'Số hạt ra mỗi nơi', chuThichMau: [['#FFB020', 'Dịch ép (qua băng dưới)'], ['#9B7B4A', 'Bã (dao cạo)']],
    buoc: [
      { ten: 'Nguyên liệu vào khe hẹp giữa hai băng tải chạy cùng chiều', pha: [0, 1], bp: 'tren' },
      { ten: 'Băng trên nén; dịch thoát qua lỗ của băng dưới', pha: [2, 3, 4], beo: 1, bp: 'duoi' },
      { ten: 'Cuối băng, dao cạo tách bã', pha: [2, 3, 4], beo: 0, bp: 'dao' },
    ],
  };
};
