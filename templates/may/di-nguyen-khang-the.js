/* Mô hình: DỊ NGUYÊN VÀ KHÁNG THỂ – bài CNTP-Ngay11, Cảnh 5.1 (slide "Khái quát chung về chất gây dị ứng").
   NGUỒN BÀI: dị nguyên (kháng nguyên) vào cơ thể → hệ miễn dịch nhận biết và sinh kháng thể "có đặc tính kết hợp với chính kháng nguyên ấy". Bài chỉ có HAI bộ phận có nhãn: dị nguyên · kháng thể.
   KIẾN THỨC NỀN (đã tra, chỉ dùng để vẽ đúng, KHÔNG thành khẳng định của bài): kháng thể hình chữ Y; hai đầu của Fab mang vị trí gắn kháng nguyên (paratope) giống hệt nhau, ôm khớp một đoạn nhỏ
   của kháng nguyên gọi là epitope bằng liên kết yếu không cộng hóa trị; vì hình khớp nên mỗi kháng thể chỉ gắn chất có epitope phù hợp (Abcam "Antibody basics"; Akbar 2019 bioRxiv; Sela-Culang 2013 PMC6963682).
   Hình dạng, kích thước, số lượng, chuyển động là cách vẽ của album. "Protein khác" (có mấu vuông không khớp) là vật trang trí minh họa chữ "chính kháng nguyên ấy". Không có IgE, tế bào mast (slide không nêu). */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['di-nguyen-khang-the'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, PI = U.PI, DC = T.DoubleSide;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.1, roughness: 0.5 }, o || {})); }
  var GOLD = 0xFFC21A, AB = 0x4FC3F7, OFF = 0x2A7FA6;
  var AY = 0.8, EY = 0.33, AX = 0.0; // tâm dị nguyên, nửa khoảng cách hai mấu
  // dị nguyên: cầu protein có HAI mấu tam giác giống hệt nhau (epitope)
  var dn = new T.Group();
  dn.add(U.sphere(0.7, can(0xE0603A), [AX, AY, 0]));
  for (var i = 0; i < 12; i++) { var a = i * 2.399, y = 1 - (i + 0.5) / 6, r = Math.sqrt(Math.max(0, 1 - y * y)); dn.add(U.sphere(0.1, can(0xC94B2A), [AX + Math.cos(a) * r * 0.72, AY + y * 0.72, Math.sin(a) * r * 0.72])); }
  [1, -1].forEach(function (s) { var m = U.cone(0.17, 0.0, 0.26, can(GOLD, { emissive: ctx.lin(GOLD), emissiveIntensity: 0.35 }), [AX + 0.76, AY + s * EY, 0], 'x', false, 3); dn.add(m); });
  // kháng thể: chữ Y, hai tay có đầu "chén" tam giác ôm khớp mấu
  function kthe() {
    var g = new T.Group(), m = can(AB), chen = [];
    g.add(U.tube([0.7, 0, 0], [0.12, 0, 0], 0.06, m)); g.add(U.sphere(0.07, m, [0.12, 0, 0]));
    [1, -1].forEach(function (s) {
      g.add(U.tube([0.12, 0, 0], [-0.3, s * EY, 0], 0.055, m));
      var c = U.cone(0.0, 0.2, 0.24, can(OFF, { side: DC }), [-0.4, s * EY, 0], 'x', true, 3); c.material = c.material.clone(); c.material.side = DC; g.add(c); chen.push(c);
    });
    g.userData.chen = chen; return g;
  }
  var A1 = kthe(), A2 = kthe(); A1.position.set(3.2, AY, 0); A2.position.set(3.2, -1.6, 0.3);
  var kt = new T.Group(); kt.add(A1); kt.add(A2);
  // trang trí: protein khác với mấu vuông (không khớp chén tam giác) + nền
  var tt = new T.Group(), PY = -1.6;
  tt.add(U.sphere(0.6, can(0x8E7CC3), [AX, PY, 0.3]));
  [1, -1].forEach(function (s) { tt.add(U.box(0.24, 0.24, 0.24, can(0x2EC4B6), [AX + 0.64, PY + s * EY, 0.3])); });
  tt.add(U.box(9, 0.06, 5, can(0x1E262E), [1.2, -2.5, 0]));
  var DOCK = AX + 0.76 + 0.2 + 0.4;                        // x của kháng thể khi chén ôm mấu
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  function sang(g, on) { g.userData.chen.forEach(function (c) { c.material.color.set(on ? GOLD : OFF); c.material.emissive.set(on ? GOLD : 0x000000); c.material.emissiveIntensity = on ? 0.6 : 0; }); }
  function capNhat(tg) {
    var u = (tg % 9) / 9, x1, x2, y2 = -1.6, r2 = 0;
    // kháng thể 1: lại gần → ôm khớp hai mấu → giữ → rời ra
    if (u < 0.35) x1 = 3.2 - (3.2 - DOCK) * ease(u / 0.35); else if (u < 0.8) x1 = DOCK; else x1 = DOCK + (3.2 - DOCK) * ease((u - 0.8) / 0.2);
    A1.position.x = x1; A1.position.y = AY + (u < 0.35 ? 0.15 * Math.sin(u * 20) * (1 - u / 0.35) : 0); sang(A1, u >= 0.33 && u < 0.82);
    // kháng thể 2: tới protein khác, chén không ôm được mấu vuông → bật ra, lắc rồi đi
    var near = AX + 0.64 + 0.12 + 0.55;
    if (u < 0.3) x2 = 3.2 - (3.2 - near) * ease(u / 0.3); else if (u < 0.7) { x2 = near + (3.2 - near) * ease((u - 0.3) / 0.4); r2 = 0.25 * Math.sin((u - 0.3) * 25) * (1 - (u - 0.3) / 0.4); } else x2 = 3.2;
    A2.position.set(x2, y2, 0.3); A2.rotation.z = r2; sang(A2, false);
  }
  var boPhan = [
    { so: 1, id: 'dinguyen', ten: 'Dị nguyên', obj: dn, neo: [AX, AY + 0.85, 0], tach: [-1.0, 0, 0], chucNang: 'Chất xâm nhập cơ thể, được hệ miễn dịch nhận biết.' },
    { so: 2, id: 'khangthe', ten: 'Kháng thể', obj: kt, neo: [DOCK + 0.5, AY + 0.4, 0], tach: [0.8, 0.5, 0], chucNang: 'Kháng thể kết hợp với chính kháng nguyên ấy.' },
  ];
  return {
    ten: 'Dị nguyên và kháng thể', camera: { pos: [1.5, 0.7, 8.5], target: [1.3, -0.3, 0] },
    boPhan: boPhan, trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFC21A', 'Kháng thể đã kết hợp (chén ôm khớp mấu)'], ['#2A7FA6', 'Kháng thể chưa kết hợp']],
    buoc: [
      { ten: 'Dị nguyên xâm nhập cơ thể', pha: [], bp: 'dinguyen' },
      { ten: 'Hệ miễn dịch nhận biết và sinh kháng thể', pha: [], bp: 'khangthe' },
      { ten: 'Kháng thể kết hợp với chính kháng nguyên ấy', pha: [], bp: 'dinguyen' },
    ],
  };
};
