/* Mô hình: CHẤT KHÔ HÒA TAN KHUẾCH TÁN RA NƯỚC CHẦN – bài CNTP-Ngay09, Cảnh 4.2/4.3 (slide "Những bất lợi khi chần – hấp" và cách khắc phục).
   NGUỒN BÀI (khẳng định của bài): tổn thất chất khô hòa tan do khuếch tán vào môi trường chần; dùng nước đường có nồng độ xấp xỉ độ khô của quả thì chênh lệch nồng độ nhỏ nên chất tan ít khuếch tán ra;
   nước chần nhiều thì tổn thất cao hơn.
   KIẾN THỨC NỀN (chỉ để vẽ đúng, KHÔNG thành khẳng định của bài): khuếch tán là chuyển động ngẫu nhiên của phân tử; khi hai bên có nồng độ khác nhau thì số phân tử đi từ nơi đặc sang nơi loãng nhiều hơn chiều ngược lại
   (định luật Fick); khi hai bên cân bằng nồng độ, các phân tử vẫn đổi chỗ nhưng số vào bằng số ra nên không mất thêm. Tế bào vẽ thành hộp, chất tan là hạt cam, số lượng, thời điểm và vị trí là cách vẽ của album;
   không có số đo. Hiện tượng quả teo khi siro quá đặc (slide có nêu) KHÔNG được vẽ. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['khuech-tan-chat-tan'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  var mS = can(0xFFB74D, { emissive: 0xFF8F00, emissiveIntensity: 0.3 }), mW = can(0x7BC96F, { transparent: true, opacity: 0.3, depthWrite: false });
  var L1 = 1.45, L2 = -1.45, NS = 14, NX = 6;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function trong(j) { return [((j % 5) - 2) * 0.45, ((Math.floor(j / 5)) - 1) * 0.38, ((j * 7) % 3 - 1) * 0.2]; }   // vị trí trong tế bào (so với tâm hàng)
  function ngoai(k) { var s = k % 2 ? 1 : -1; return [s * (1.9 + 0.45 * (k % 6)), ((k * 0.37) % 1.7) - 0.85, ((k * 5) % 3 - 1) * 0.25]; } // vị trí trong dịch bên ngoài
  function lane(L, coNgoai) {
    var g = new T.Group(), cell = U.box(2.6, 1.7, 1.0, mW, [0, L, 0]); g.add(cell);
    [[-1.3, 0], [1.3, 0]].forEach(function (p) { g.add(U.box(0.05, 1.7, 1.0, can(0x3E8E41), [p[0], L, 0])); });
    [[0, 0.85], [0, -0.85]].forEach(function (p) { g.add(U.box(2.6, 0.05, 1.0, can(0x3E8E41), [0, L + p[1], 0])); });
    var inn = [], out = [], j;
    for (j = 0; j < NS; j++) { var s = U.sphere(0.1, mS, [0, 0, 0]); g.add(s); inn.push(s); }
    if (coNgoai) for (j = 0; j < NS; j++) { var o = U.sphere(0.1, mS, [0, 0, 0]); g.add(o); out.push(o); }
    g.userData = { inn: inn, out: out, L: L }; return g;
  }
  var g1 = lane(L1, false), g2 = lane(L2, true);
  var tt = new T.Group();
  function oDd(y, mau, op) { tt.add(U.box(9.2, 2.3, 1.6, can(mau, { transparent: true, opacity: op, depthWrite: false }), [0, y, 0])); }
  oDd(L1, 0xBFDDF2, 0.12); oDd(L2, 0xF2D9A0, 0.2);
  tt.add(U.box(11, 0.1, 3, can(0x1E262E), [0, -2.95, 0]));
  function dat(s, p, L, t, k) { s.position.set(p[0] + Math.sin(t * 4 + k * 1.7) * 0.05, L + p[1] + Math.sin(t * 3.3 + k) * 0.05, p[2]); }
  function lerp3(a, b, p) { return [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p]; }
  function capNhat(tg) {
    var u = (tg % 14) / 14, fade = u < 0.92 ? 1 : 1 - sm((u - 0.92) / 0.08), j, p;
    // hàng 1: nước, chất tan chỉ đi ra
    for (j = 0; j < NS; j++) { p = sm((u - (0.1 + 0.045 * j)) / 0.12) * fade; dat(g1.userData.inn[j], lerp3(trong(j), ngoai(j), p), L1, tg, j); }
    // hàng 2: nước đường, bên ngoài đã có chất tan; chỉ đổi chỗ NX cặp, số vào bằng số ra
    var d = g2.userData;
    for (j = 0; j < NS; j++) {
      p = j < NX ? sm((u - (0.12 + 0.08 * j)) / 0.12) * fade : 0;
      dat(d.inn[j], lerp3(trong(j), ngoai(j), p), L2, tg, j);
      dat(d.out[j], lerp3(ngoai(j + NS), j < NX ? trong(j + 7) : ngoai(j + NS), p), L2, tg + 2, j + 5);
    }
  }
  capNhat(0);
  return {
    ten: 'Chất khô hòa tan khuếch tán ra nước chần', camera: { pos: [0.3, 0.4, 13.8], target: [0, -0.05, 0] }, khoangCachMax: 20,
    boPhan: [
      { so: 1, id: 'nuoc', ten: 'Chần trong nước', obj: g1, neo: [-3.6, L1 + 1.1, 0], tach: [0, 0.9, 0], chucNang: 'Chất khô hòa tan khuếch tán vào nước chần nên bị tổn thất (slide Những bất lợi khi chần – hấp).' },
      { so: 2, id: 'nuocduong', ten: 'Chần trong nước đường độ khô gần quả', obj: g2, neo: [-3.0, L2 - 1.4, 0], tach: [0, -0.5, 0], chucNang: 'Chênh lệch nồng độ nhỏ nên chất tan ít khuếch tán ra (slide, cách khắc phục).' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFB74D', 'Chất khô hòa tan'], ['#7BC96F', 'Tế bào rau quả']],
    buoc: [
      { ten: 'Rau quả chứa chất khô hòa tan trong tế bào', pha: [], bp: 'nuoc' },
      { ten: 'Chần trong nước: chất khô hòa tan khuếch tán ra, tổn thất', pha: [], bp: 'nuoc' },
      { ten: 'Nước đường độ khô gần quả: chênh lệch nồng độ nhỏ', pha: [], bp: 'nuocduong' },
      { ten: 'Chất tan vào và ra bằng nhau nên ít tổn thất', pha: [], bp: 'nuocduong' },
    ],
  };
};
