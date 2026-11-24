/* Mô hình: PHÂN TỬ NƯỚC – điện tích từng phần – bài D006, Cảnh 1.2.
   NGUỒN BÀI (khẳng định của bài): phân tử nước gồm một oxy và hai hydro dùng chung electron không đều, electron bị hút về hạt nhân oxy nhiều hơn (OpenStax Biology 2e, mục 2.2 và 2.1); đó là liên kết cộng hóa trị phân cực;
   oxy mang điện tích âm từng phần (δ−), mỗi hydro mang điện tích dương từng phần (δ+); phân tử hình chữ V, góc O–H khoảng 105° trong nước lỏng (Kuna).
   Cách vẽ của album (không phải số đo): chiều dài liên kết, kích thước nguyên tử, đám mây xanh và đỏ biểu thị mật độ electron, hai chấm vàng là cặp electron dùng chung nằm lệch về phía oxy;
   chuyển động lắc nhẹ. Không vẽ cặp electron tự do trên oxy (bài không nêu). */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['phan-tu-nuoc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false }); }
  var mO = can(0xE53935), mH = can(0xF2F5F7), mB = can(0xB9C0C7), mE = can(0xFFEB3B, { emissive: 0xFFC107, emissiveIntensity: 0.9 });
  var A = 105 * Math.PI / 180 / 2, BL = 1.5;                         // nửa góc, độ dài liên kết (đơn vị vẽ)
  var H1 = [Math.sin(A) * BL, -Math.cos(A) * BL, 0], H2 = [-Math.sin(A) * BL, -Math.cos(A) * BL, 0];
  var oxy = new T.Group(), hydro = new T.Group(), lk = new T.Group(), cloud = new T.Group();
  oxy.add(U.sphere(0.62, mO, [0, 0, 0]));
  hydro.add(U.sphere(0.36, mH, H1)); hydro.add(U.sphere(0.36, mH, H2));
  lk.add(U.tube([0, 0, 0], H1, 0.07, mB)); lk.add(U.tube([0, 0, 0], H2, 0.07, mB));
  // đám mây electron: δ− (xanh) lớn quanh O, δ+ (đỏ) nhỏ quanh mỗi H
  var cO = U.sphere(1.25, mo(0x4FC3F7, 0.2), [0, 0, 0]); cloud.add(cO);
  var c1 = U.sphere(0.6, mo(0xFF7043, 0.22), H1), c2 = U.sphere(0.6, mo(0xFF7043, 0.22), H2); cloud.add(c1); cloud.add(c2);
  // cặp electron dùng chung của hai liên kết, nằm lệch về phía O (khoảng 50% độ dài từ tâm O, ngoài mặt cầu O, gần O hơn H)
  var e = [], k;
  for (k = 0; k < 4; k++) { var s = U.sphere(0.1, mE, [0, 0, 0]); lk.add(s); e.push(s); }
  var tt = new T.Group(); tt.add(U.box(8, 0.08, 4, can(0x1E262E), [0, -2.6, 0]));
  function capNhat(tg) {
    var b, h, f, i;
    for (b = 0; b < 2; b++) {
      h = b ? H2 : H1;
      for (i = 0; i < 2; i++) { f = 0.5 + 0.03 * Math.sin(tg * 3 + b + i * 3); var off = (i ? 1 : -1) * 0.12;
        e[b * 2 + i].position.set(h[0] * f + off * Math.cos(A), h[1] * f - off * 0.2, off * 1.6); }
    }
    cO.scale.setScalar(1 + 0.04 * Math.sin(tg * 2)); c1.scale.setScalar(1 + 0.05 * Math.sin(tg * 2 + 1)); c2.scale.setScalar(1 + 0.05 * Math.sin(tg * 2 + 2));
    var w = 0.05 * Math.sin(tg * 0.9);
    [oxy, hydro, lk, cloud].forEach(function (g) { g.rotation.y = w * 2; g.rotation.z = w; });
  }
  capNhat(0);
  return {
    ten: 'Phân tử nước và điện tích từng phần', camera: { pos: [0.8, 0.6, 7.2], target: [0, -0.5, 0] },
    boPhan: [
      { so: 1, id: 'oxy', ten: 'Oxy (δ−)', obj: oxy, neo: [0, 0.9, 0], tach: [0, 0.8, 0], chucNang: 'Hút electron dùng chung mạnh hơn nên mang điện tích âm từng phần (δ−).' },
      { so: 2, id: 'hydro', ten: 'Hai hydro (δ+)', obj: hydro, neo: [1.6, -1.6, 0], tach: [0.9, -0.5, 0], chucNang: 'Mỗi hydro mang điện tích dương từng phần (δ+).' },
      { so: 3, id: 'lienket', ten: 'Liên kết O–H phân cực', obj: lk, neo: [-1.2, -0.7, 0], tach: [-0.9, 0.3, 0], chucNang: 'Hai nguyên tử dùng chung electron không đều; electron bị hút về oxy nhiều hơn (liên kết cộng hóa trị phân cực).' },
    ],
    trangTri: [tt, cloud], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#4FC3F7', 'Vùng giàu electron (δ−)'], ['#FF7043', 'Vùng nghèo electron (δ+)']],
    buoc: [
      { ten: 'Một oxy và hai hydro dùng chung electron', pha: [], bp: 'lienket' },
      { ten: 'Electron bị hút lệch về oxy nhiều hơn', pha: [], bp: 'oxy' },
      { ten: 'Oxy mang δ−, mỗi hydro mang δ+; phân tử hình chữ V', pha: [], bp: 'hydro' },
    ],
  };
};
