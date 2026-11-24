/* Máy mẫu: NỒI CÔ ĐẶC CHÂN KHÔNG GIÁN ĐOẠN MỘT NỒI – bài CNTP-Ngay10, Cảnh 4.2 (slide Chương 7, hình "Thiết bị cô đặc chân không gián đoạn 1 nồi", 20 chú thích).
   ĐỐI CHIẾU ẢNH SLIDE (Drive, ngày 18/11/2026): 1 khoang áo hơi · 2 áo hơi · 3 hơi vào · 4 cửa nạp liệu · 5 nhiệt kế · 6 cửa kính sáng (đọc rõ trên ảnh) · 7 chân không kế · 8 kính quan sát · 9 vòi rửa kính quan sát
   · 10 van xả khí · 11 van bổ sung nguyên liệu · 12 van lấy mẫu · 13 nước ngưng · 14 cửa tháo liệu · 15 trục giảm tốc · 16 áp kế · 17 "Thá… ngưng tụ" · 18 bơm ly tâm · 19 bơm chân không · 20 nước lạnh.
   ⚠ 17: dòng chú thích bị cắt mép phải ảnh, chỉ thấy "Thá" rồi xuống dòng "ngưng tụ"; hình vẽ 17 là CỘT CAO đứng cạnh nồi, nối với đỉnh nồi bằng ống cong → nhiều khả năng là "THÁP ngưng tụ", không phải "thùng". Mô hình vẽ một cột cao;
   tên mặc định "Thiết bị ngưng tụ (17)"; bài đang ghi "thùng ngưng tụ" → CNTP cần xem lại chữ (đề nghị "tháp"). Chữ 6 "cửa kính sáng" đọc rõ, không còn nghi.
   Trên ảnh: 15 ở ĐỈNH nồi (cụm trục + động cơ), 18 và 19 là hai bơm ở đáy bên phải, 20 là ống nước lạnh đi lên bên phải cột 17, 13 là ống nước ngưng ở đáy bên trái.
   VỊ TRÍ, hình dạng, đường ống là cách vẽ của album. Ống hơi từ nồi sang 17 và ống nối bơm KHÔNG có nhãn trong bài: vật trang trí (đường đi do ảnh gợi ý, bài ghi là suy luận). */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['noi-co-dac-chan-khong'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI, CX = -1.6;
  var ink = function (o) { return M.inox(Object.assign({ roughness: 0.25, side: T.DoubleSide }, o || {})); };
  function can(x) { return M.son(x, { metalness: 0.3, roughness: 0.45 }); }
  function ong(a, b, r) { var m = U.tube(a, b, r || 0.055, ink({ roughness: 0.2 }), true); m.userData.xuyen = 0.28; return m; }
  function dongHo(p) { var g = new T.Group(); g.add(U.cyl(0.17, 0.06, M.inox({ roughness: 0.25 }), [0, 0, 0], 'z')); g.add(U.cyl(0.14, 0.065, M.son(0xF4F4F0, { roughness: 0.6 }), [0, 0, 0.003], 'z')); var k = U.box(0.02, 0.11, 0.012, M.son(0xD9342C), [0.03, 0.03, 0.04]); k.rotation.z = -0.6; g.add(k); g.position.set(p[0], p[1], p[2]); return g; }
  function kinh(p) { var g = new T.Group(); g.add(U.torus(0.17, 0.03, M.inox({ roughness: 0.2 }), [0, 0, 0], null)); g.add(U.cyl(0.16, 0.03, M.nuoc(0x9FD4FF, 0.35), [0, 0, 0], 'z')); g.position.set(p[0], p[1], p[2]); return g; }
  function van(p, hex) { var g = new T.Group(); g.add(U.sphere(0.09, can(0x2E5A8A), [0, 0, 0])); g.add(U.cyl(0.018, 0.2, M.inox(), [0, 0.16, 0], 'y')); g.add(U.box(0.2, 0.03, 0.03, can(hex || 0xD9542C), [0, 0.27, 0])); g.position.set(p[0], p[1], p[2]); return g; }
  // 1 – khoang (thân trụ phía trên + mái vòm), vị trí theo ảnh: nhãn 1 chỉ vào thân trụ trên
  var kh = new T.Group();
  var khm = U.lathe([[0.75, 0.15], [0.75, 1.1], [0.62, 1.35], [0.3, 1.55], [0.0, 1.6]], ink({ roughness: 0.3 }), 72); khm.userData.xuyen = 0.28; kh.add(khm);
  kh.add(U.torus(0.75, 0.03, M.inox(), [0, 0.15, 0], 'y')); kh.add(U.torus(0.75, 0.03, M.inox(), [0, 1.1, 0], 'y'));
  // 2 – áo hơi: đáy chảo hai lớp, khoảng giữa tô cam
  var ao = new T.Group();
  var Pi = [[0.75, 0.15], [0.7, -0.2], [0.5, -0.55], [0.2, -0.75]], Po = [[0.87, 0.2], [0.82, -0.2], [0.62, -0.62], [0.28, -0.9]];
  var a1 = U.lathe([[0, -0.78]].concat(Pi.slice().reverse()), ink({ roughness: 0.2 }), 72); a1.userData.xuyen = 0.28; ao.add(a1);
  var a2 = U.lathe([[0, -0.92]].concat(Po.slice().reverse()), ink({ roughness: 0.3 }), 72); a2.userData.xuyen = 0.22; ao.add(a2);
  var a3 = U.lathe(Pi.concat(Po.slice().reverse()), M.nuoc(0xFF9A4A, 0.26), 72); a3.userData.xuyen = 0.16; ao.add(a3);
  // 3 – hơi vào (ống từ trái vào áo hơi)   13 – nước ngưng (ống đáy áo hơi)
  var hv = new T.Group(); hv.add(ong([-3.0, 0.0, 0], [-2.4, 0.0, 0], 0.06)); hv.add(U.cone(0.09, 0.0, 0.2, M.son(0xE8EEF5, { emissive: ctx.lin(0xE8EEF5), emissiveIntensity: 0.6 }), [-2.85, 0.0, 0], 'x'));
  var nn = new T.Group(); nn.add(ong([-2.05, -0.74, 0], [-2.05, -1.4, 0], 0.05)); nn.add(ong([-2.05, -1.4, 0], [-2.8, -1.4, 0], 0.05));
  // 4 – cửa nạp liệu (nắp trên mái vòm bên trái)   11 – van bổ sung nguyên liệu   5 – nhiệt kế   6 – cửa kính sáng   8 – kính quan sát   9 – vòi rửa   7 – chân không kế
  var cn = new T.Group(); var cnb = U.cyl(0.16, 0.12, can(0x7A8794), [0, 0, 0], 'y'); cn.add(cnb); cn.add(U.torus(0.16, 0.025, M.inox(), [0, 0.06, 0], 'y')); cn.position.set(-2.05, 1.12, 0.2); cn.rotation.z = 0.5;
  var vb = new T.Group(); vb.add(ong([-3.0, 0.45, -0.35], [-2.35, 0.45, -0.35], 0.05)); vb.add(van([-2.75, 0.45, -0.35], 0x2E8A57));
  var nk = new T.Group(); nk.add(U.cyl(0.02, 0.7, M.son(0xE8EEF5), [-1.95, 1.4, 0.35], 'y')); nk.add(U.sphere(0.045, M.son(0xD9342C), [-1.95, 1.05, 0.35]));
  var ks = kinh([-1.15, 1.25, 0.45]); ks.rotation.x = -0.6; var cks = new T.Group(); cks.add(ks);
  var kq = new T.Group(); kq.add(kinh([-1.6, 0.8, 0.78]));
  var vr = new T.Group(); vr.add(ong([-2.15, 0.95, 0.6], [-1.78, 0.84, 0.76], 0.025)); vr.add(U.cyl(0.04, 0.05, M.inox(), [-2.15, 0.95, 0.6], 'x'));
  var ck = new T.Group(); ck.add(U.cyl(0.025, 0.4, M.inox(), [-0.95, 1.2, 0.0], 'y')); ck.add(dongHo([-0.95, 1.55, 0.0]));
  // 10 – van xả khí   12 – van lấy mẫu (bên phải thân)   14 – cửa tháo liệu (đáy)
  var vx = new T.Group(); vx.add(ong([-0.85, 0.5, 0], [-0.55, 0.5, 0], 0.04)); vx.add(van([-0.55, 0.5, 0], 0xD9342C));
  var vl = new T.Group(); vl.add(ong([-0.8, 0.0, 0.1], [-0.5, 0.0, 0.1], 0.04)); vl.add(van([-0.5, 0.0, 0.1], 0xF2C230));
  var ct = new T.Group(); ct.add(U.cyl(0.14, 0.1, can(0x7A8794), [0, -0.98, 0], 'y')); ct.add(U.cone(0.14, 0.06, 0.22, can(0x2E5A8A), [0, -1.12, 0], 'y'));
  // 15 – trục giảm tốc (cụm đỉnh nồi)   16 – áp kế (trên ống hơi vào)
  var tg = new T.Group(); tg.add(U.cyl(0.03, 0.4, M.inox(), [0, 1.7, 0], 'y')); tg.add(U.box(0.5, 0.35, 0.4, can(0x24476E), [0, 1.95, 0])); tg.add(U.cyl(0.18, 0.5, can(0x2E5A8A), [0, 2.35, 0], 'y'));
  var ak = new T.Group(); ak.add(U.cyl(0.02, 0.5, M.inox(), [-2.75, 0.25, 0], 'y')); ak.add(dongHo([-2.75, 0.6, 0.15]));
  // 17 – thiết bị ngưng tụ: CỘT CAO (theo ảnh)
  var CT = 1.5, tn = new T.Group();
  var tnm = U.lathe([[0.42, -1.2], [0.42, 1.9], [0.3, 2.05], [0.0, 2.1]], ink({ roughness: 0.3 }), 64, [CT, 0, 0]); tnm.userData.xuyen = 0.25; tn.add(tnm);
  tn.add(U.torus(0.42, 0.03, M.inox(), [CT, -0.4, 0], 'y')); tn.add(U.torus(0.42, 0.03, M.inox(), [CT, 0.9, 0], 'y'));
  // 18 – bơm ly tâm   19 – bơm chân không (hai bơm ở đáy, mỗi bơm có động cơ)
  function bom(x, y, hex) { var g = new T.Group(); g.add(U.cyl(0.3, 0.26, can(hex), [x, y, 0], 'z')); g.add(U.cyl(0.09, 0.2, M.inox(), [x, y, 0.2], 'z')); g.add(U.cyl(0.2, 0.55, can(0x24476E), [x - 0.5, y, 0], 'x')); g.add(U.box(0.5, 0.1, 0.4, can(0x23303B), [x - 0.1, y - 0.36, 0])); return g; }
  var b18 = bom(2.6, -1.9, 0x2E5A8A), b19 = bom(0.6, -1.9, 0x5A2E8A);
  // 20 – nước lạnh: ống đi lên bên phải cột rồi vào đỉnh cột
  var nl = new T.Group(); nl.add(ong([2.45, -1.7, 0], [2.45, 2.35, 0], 0.045)); nl.add(ong([2.45, 2.35, 0], [CT + 0.1, 2.35, 0], 0.045));
  [-1.2, -0.4, 0.4, 1.2, 2.0].forEach(function (y) { nl.add(U.cone(0.07, 0.0, 0.2, M.son(0x3AA0FF, { emissive: ctx.lin(0x3AA0FF), emissiveIntensity: 0.7 }), [2.45, y, 0], 'y')); });
  // trang trí không nhãn: ống hơi từ nồi sang cột 17, ống nối đáy cột – bơm, chân đỡ nồi
  var tt = new T.Group();
  tt.add(ong([-1.0, 1.3, 0], [-1.0, 2.7, 0], 0.09)); tt.add(ong([-1.0, 2.7, 0], [CT, 2.7, 0], 0.09)); tt.add(ong([CT, 2.7, 0], [CT, 2.1, 0], 0.09));
  tt.add(ong([CT, -1.2, 0], [CT, -1.9, 0], 0.07)); tt.add(ong([CT, -1.9, 0], [0.9, -1.9, 0], 0.06)); tt.add(ong([CT, -1.7, 0], [2.3, -1.9, 0], 0.06));
  tt.add(U.box(0.14, 2.1, 0.5, can(0x2B3844), [CX - 1.0, -1.1, 0])); tt.add(U.box(0.14, 2.1, 0.5, can(0x2B3844), [CX + 1.0, -1.1, 0])); tt.add(U.box(2.4, 0.12, 0.5, can(0x2B3844), [CX, -0.4, -0.0]));
  tt.add(U.box(8.0, 0.08, 1.4, can(0x1E262E), [-0.1, -2.3, 0]));
  [kh, ao, ct, tg].forEach(function (g) { g.position.x += CX; }); // 4 khối này dựng theo tâm nồi; các khối khác đã dùng tọa độ tuyệt đối
  var boPhan = [
    { so: 1, id: 'khoang', ten: 'Khoang áo hơi', obj: kh, neo: [CX - 0.75, 0.7, 0], tach: [-0.9, 0.3, 0], chucNang: 'Khoang áo hơi (theo chú thích).' },
    { so: 2, id: 'aohoi', ten: 'Áo hơi', obj: ao, neo: [CX - 0.8, -0.45, 0.2], tach: [-0.6, -0.6, 0.5], chucNang: 'Áo hơi.' },
    { so: 3, id: 'hoivao', ten: 'Hơi vào', obj: hv, neo: [-2.9, 0.12, 0], tach: [-0.6, 0.3, 0], chucNang: 'Hơi vào.' },
    { so: 4, id: 'cuanap', ten: 'Cửa nạp liệu', obj: cn, neo: [CX - 0.45, 1.3, 0.2], tach: [-0.7, 0.8, 0], chucNang: 'Cửa nạp liệu.' },
    { so: 5, id: 'nhietke', ten: 'Nhiệt kế', obj: nk, neo: [CX - 0.35, 1.7, 0.35], tach: [-0.4, 0.9, 0], chucNang: 'Nhiệt kế.' },
    { so: 6, id: 'cuakinh', ten: 'Cửa kính sáng', obj: cks, neo: [CX + 0.45, 1.45, 0.5], tach: [0.4, 0.8, 0.3], chucNang: 'Cửa kính sáng.' },
    { so: 7, id: 'chankhongke', ten: 'Chân không kế', obj: ck, neo: [CX + 0.65, 1.75, 0.1], tach: [0.6, 0.9, 0], chucNang: 'Chân không kế.' },
    { so: 8, id: 'kinhqs', ten: 'Kính quan sát', obj: kq, neo: [CX, 0.8, 0.95], tach: [0, 0, 1.0], chucNang: 'Kính quan sát.' },
    { so: 9, id: 'voirua', ten: 'Vòi rửa kính quan sát', obj: vr, neo: [CX - 0.55, 1.05, 0.7], tach: [-0.5, 0.3, 0.6], chucNang: 'Vòi rửa kính quan sát.' },
    { so: 10, id: 'vanxakhi', ten: 'Van xả khí', obj: vx, neo: [CX + 1.05, 0.7, 0], tach: [0.8, 0.5, 0], chucNang: 'Van xả khí.' },
    { so: 11, id: 'vanbosung', ten: 'Van bổ sung nguyên liệu', obj: vb, neo: [-2.75, 0.75, -0.35], tach: [-0.5, 0.4, -0.5], chucNang: 'Van bổ sung nguyên liệu.' },
    { so: 12, id: 'vanlaymau', ten: 'Van lấy mẫu', obj: vl, neo: [CX + 1.05, 0.28, 0.1], tach: [0.8, -0.1, 0.4], chucNang: 'Van lấy mẫu.' },
    { so: 13, id: 'nuocngung', ten: 'Nước ngưng', obj: nn, neo: [-2.4, -1.1, 0], tach: [-0.6, -0.5, 0], chucNang: 'Nước ngưng.' },
    { so: 14, id: 'cuatao', ten: 'Cửa tháo liệu', obj: ct, neo: [CX + 0.25, -1.1, 0], tach: [0, -0.7, 0], chucNang: 'Cửa tháo liệu.' },
    { so: 15, id: 'trucgt', ten: 'Trục giảm tốc', obj: tg, neo: [CX + 0.3, 2.1, 0.2], tach: [0, 1.0, 0], chucNang: 'Trục giảm tốc.' },
    { so: 16, id: 'apke', ten: 'Áp kế', obj: ak, neo: [-2.75, 0.85, 0.1], tach: [-0.5, 0.8, 0.4], chucNang: 'Áp kế.' },
    { so: 17, id: 'thapngung', ten: 'Thiết bị ngưng tụ (17)', obj: tn, neo: [CT + 0.42, 1.2, 0.2], tach: [0.9, 0.4, 0], chucNang: 'Thiết bị ngưng tụ (cần kiểm tra: tháp hay thùng).' },
    { so: 18, id: 'bomlt', ten: 'Bơm ly tâm', obj: b18, neo: [2.6, -1.55, 0.3], tach: [0.9, -0.3, 0], chucNang: 'Bơm ly tâm.' },
    { so: 19, id: 'bomck', ten: 'Bơm chân không', obj: b19, neo: [0.6, -1.55, 0.3], tach: [0, -0.7, 0.8], chucNang: 'Bơm chân không.' },
    { so: 20, id: 'nuoclanh', ten: 'Nước lạnh', obj: nl, neo: [2.45, 0.2, 0.1], tach: [0.8, 0.3, 0], chucNang: 'Nước lạnh.' },
  ];
  var X0 = CX;
  // hạt: A = hơi cấp → áo hơi → nước ngưng (13);  B = hơi bốc ra từ dịch → sang cột 17 → ngưng (đường B là SUY LUẬN, bài ghi vậy)
  var A = [
    { p: [[-3.0, 0.0, 0], [-2.4, 0.0, 0]], c: ['#E8EEF5'], gl: 0.6, rung: [0, 0.04, 0.04], tuyen: true, t: 0.9 },
    { p: [[-2.4, 0.0, 0], [-2.3, -0.3, 0.05], [-2.1, -0.65, 0]], c: ['#E8EEF5', '#3AA0FF'], gl: 0.6, rung: [0.06, 0, 0.3], t: 1.3 },
    { p: [[-2.1, -0.65, 0], [-2.05, -0.74, 0], [-2.05, -1.4, 0]], c: ['#3AA0FF'], gl: 0.7, rung: [0.02, 0, 0.04], t: 1.0 },
    { p: [[-2.05, -1.4, 0], [-2.8, -1.4, 0]], c: ['#3AA0FF'], gl: 0.7, t: 0.9, tuyen: true },
    { p: [[-2.8, -1.4, 0], [-3.3, -1.4, 0]], c: ['#3AA0FF'], gl: 0.7, t: 0.6, tuyen: true },
  ];
  var B = [
    { p: [[X0, -0.35, 0], [X0, 0.7, 0]], c: ['#CFE6FF'], gl: 0.5, rung: [0.7, 0, 0.7], t: 1.3 },
    { p: [[X0, 0.9, 0], [X0 + 0.5, 1.3, 0], [-1.0, 1.4, 0], [-1.0, 2.7, 0]], c: ['#CFE6FF'], gl: 0.5, rung: [0.1, 0, 0.1], t: 1.3 },
    { p: [[-1.0, 2.7, 0], [CT, 2.7, 0], [CT, 2.1, 0]], c: ['#CFE6FF'], gl: 0.5, rung: [0.03, 0, 0.03], t: 1.2, tuyen: true },
    { p: [[CT, 2.0, 0], [CT, -1.0, 0]], c: ['#CFE6FF', '#3AA0FF'], gl: 0.6, rung: [0.5, 0, 0.5], t: 1.6 },
    { p: [[CT, -1.0, 0], [CT, -1.7, 0]], c: ['#3AA0FF'], gl: 0.7, rung: [0.05, 0, 0.05], t: 0.8, mo: true },
  ];
  return {
    ten: 'Nồi cô đặc chân không gián đoạn một nồi', camera: { pos: [1.6, 1.7, 9.6], target: [-0.1, 0.0, 0] },
    xuyenMacDinh: true, boPhan: boPhan, trangTri: [tt], hat: ctx.hatTuyen({ tiLe: 0.5, A: A, B: B }), omega: 1.6,
    chuThichDoThi: 'Số hạt kết thúc hành trình',
    chuThichMau: [['#E8EEF5', 'Hơi cấp vào áo hơi'], ['#3AA0FF', 'Nước ngưng'], ['#CFE6FF', 'Hơi bốc ra từ dịch (đường sang cột 17 là suy luận)']],
    buoc: [
      { ten: 'Nồi và áo hơi: hơi vào, nước ngưng ra', pha: [0, 1, 2, 3, 4], beo: 1, bp: 'aohoi' },
      { ten: 'Nạp và tháo', pha: [], bp: 'cuanap' },
      { ten: 'Quan sát', pha: [], bp: 'nhietke' },
      { ten: 'Đo', pha: [], bp: 'chankhongke' },
      { ten: 'Hơi thứ sang thiết bị ngưng tụ', pha: [0, 1, 2, 3, 4], beo: 0, bp: 'thapngung' },
      { ten: 'Bơm', pha: [], bp: 'bomck' },
    ],
  };
};
