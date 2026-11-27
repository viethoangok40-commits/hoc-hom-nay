/* Mô hình: ĐỊNH LUẬT RAOULT – CHẤT TAN PHA LOÃNG NƯỚC – bài D008, Cảnh 3.1.
   NGUỒN BÀI (khẳng định của bài): chất tan pha loãng nước nên còn ít phân tử nước tự do để bay hơi (Kuna); với chất tan không bay hơi, p = x_nước × p0 (LibreTexts, Lower, Chem1);
   trong dung dịch lý tưởng aw ≈ x_nước (suy ra từ aw = p/p0).
   KIẾN THỨC NỀN (đã tra): LibreTexts Chem1 (Lower) mục 8.7 giải thích các tính chất phụ thuộc số hạt (trong đó có hạ áp suất hơi) là do chất tan "pha loãng" dung môi (không phải vì chất tan chiếm mặt thoáng
   như cách nói phổ biến); hơi nước trong bình kín ở cân bằng động: phân tử rời mặt nước và quay về liên tục.
   Cách vẽ của album (không phải số đo): hai bình kín cùng nhiệt độ; 120 hạt trong mỗi khối lỏng; hạt chất tan thay một phần hạt nước theo đúng tỉ lệ phần mol do người học chọn (0–30%);
   số phân tử hơi vẽ tỉ lệ với aw (30 ở nước tinh khiết); cột aw từ 0 đến 1; kích thước, chuyển động là minh họa. Chất tan vẽ như hạt không phân ly (muối phân ly xem Cảnh 3.2). */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['raoult-pha-loang'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  var mW = can(0x4FC3F7, { emissive: 0x0277BD, emissiveIntensity: 0.35 }), mS = can(0xFFB300, { emissive: 0xE65100, emissiveIntensity: 0.35 }), mV = can(0xE1F5FE, { emissive: 0x81D4FA, emissiveIntensity: 0.6 });
  var N = 120, NV = 30, RB = 1.35, HL = 2.0, X1 = -1.9, X2 = 1.9;
  // vị trí hạt trong khối lỏng (lưới xoắn đều trong hình trụ, cố định)
  var slot = [], i;
  for (i = 0; i < N; i++) { var r = (RB - 0.18) * Math.sqrt(((i * 0.618034) % 1)), a = i * 2.399963; slot.push([Math.cos(a) * r, 0.18 + (HL - 0.3) * (((i * 0.754877) % 1)), Math.sin(a) * r]); }
  // thứ tự thay hạt nước bằng hạt chất tan (rải đều)
  var thuTu = []; for (i = 0; i < N; i++) thuTu.push(i); function ngau(n) { var v = Math.sin((n + 1) * 12.9898) * 43758.5453; return v - Math.floor(v); } thuTu.sort(function (p, q) { return ngau(p) - ngau(q); });
  var hang = []; for (i = 0; i < N; i++) hang[thuTu[i]] = i;
  var tt = new T.Group();
  function binh(x) {
    var g = new T.Group();
    var thanh = new T.Mesh(new T.CylinderGeometry(RB, RB, 4.1, 40, 1, true), mo(0xCFE8F5, 0.16)); thanh.position.set(x, 2.05, 0); g.add(thanh);
    var nap = new T.Mesh(new T.CylinderGeometry(RB + 0.06, RB + 0.06, 0.14, 40), can(0x90A4AE, { metalness: 0.5 })); nap.position.set(x, 4.17, 0); g.add(nap);
    var day = new T.Mesh(new T.CylinderGeometry(RB + 0.02, RB + 0.02, 0.08, 40), can(0x607D8B)); day.position.set(x, 0, 0); g.add(day);
    var nuoc = new T.Mesh(new T.CylinderGeometry(RB - 0.04, RB - 0.04, HL, 40), mo(0x1E88E5, 0.16)); nuoc.position.set(x, HL / 2 + 0.04, 0); g.add(nuoc);
    var w = [], s = [], v = [], k;
    for (k = 0; k < N; k++) { var m = U.sphere(0.085, mW, [0, 0, 0]); g.add(m); w.push(m); var q = U.sphere(0.14, mS, [0, 0, 0]); g.add(q); s.push(q); }
    for (k = 0; k < NV; k++) { var h = U.sphere(0.085, mV, [0, 0, 0]); g.add(h); v.push(h); }
    return { g: g, w: w, s: s, v: v, x: x };
  }
  var tk = binh(X1), dd = binh(X2);
  // cột aw (0 đến 1) cạnh mỗi bình
  function cot(x) {
    var ong = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 3.0, 20), mo(0xFFFFFF, 0.14)); ong.position.set(x, 1.5, 0.4); tt.add(ong);
    var muc = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 3.0, 20), can(0x66BB6A, { emissive: 0x2E7D32, emissiveIntensity: 0.5 })); muc.geometry.translate(0, 1.5, 0); muc.position.set(x, 0, 0.4); tt.add(muc);
    var vach = new T.Mesh(new T.TorusGeometry(0.18, 0.022, 8, 24), can(0xFFEB3B, { emissive: 0xFBC02D, emissiveIntensity: 0.6 })); vach.rotation.x = Math.PI / 2; vach.position.set(x, 3.0, 0.4); tt.add(vach);
    return muc;
  }
  var c1 = cot(X1 + RB + 0.28), c2 = cot(X2 - RB - 0.28);
  tt.add(U.box(10, 0.08, 4.2, can(0x1E262E), [0, -0.1, 0]));
  function ve(b, nS, aw, tg, pha) {
    var k;
    for (k = 0; k < N; k++) {
      var p = slot[k], jx = Math.sin(tg * 3.1 + k * 1.3 + pha) * 0.05, jy = Math.cos(tg * 2.7 + k + pha) * 0.05, jz = Math.sin(tg * 2.2 + k * 0.7) * 0.05, tan = hang[k] < nS;
      b.w[k].visible = !tan; b.s[k].visible = tan;
      (tan ? b.s[k] : b.w[k]).position.set(b.x + p[0] + jx, p[1] + jy, p[2] + jz);
    }
    var nv = Math.round(NV * aw);
    for (k = 0; k < NV; k++) {
      // mỗi phân tử hơi rời mặt nước, bay trong khoảng trên rồi quay về (cân bằng động)
      var u = ((tg * (0.09 + 0.004 * (k % 7)) + k * 0.137) % 1), len = Math.sin(Math.PI * u), rr = (RB - 0.2) * Math.sqrt((k * 0.618034) % 1), aa = k * 2.399963 + tg * 0.15;
      b.v[k].visible = k < nv;
      b.v[k].position.set(b.x + Math.cos(aa) * rr, HL + 0.12 + len * (1.55 - 0.5 * ((k * 0.31) % 1)), Math.sin(aa) * rr);
    }
  }
  function capNhat(tg, e, val) {
    var f = val ? val.x / 100 : 0.1, nS = Math.round(f * N), aw = 1 - nS / N;
    ve(tk, 0, 1, tg, 0); ve(dd, nS, aw, tg, 2);
    c1.scale.y = 1; c2.scale.y = Math.max(0.001, aw);
  }
  capNhat(0, 0, { x: 10 });
  return {
    ten: 'Chất tan pha loãng nước (Raoult)', camera: { pos: [0.4, 3.2, 12.6], target: [0, 1.9, 0] }, khoangCachMax: 18,
    dieuKhien: [{ id: 'x', nhan: 'Phần mol chất tan (bình phải)', min: 0, max: 30, buoc: 1, mac: 10, don: '', chu: function (v) { var n = Math.round(v / 100 * N), aw = 1 - n / N; return v + '% → aw ≈ ' + aw.toFixed(2).replace('.', ','); } }],
    boPhan: [
      { so: 1, id: 'tinhkhiet', ten: 'Nước tinh khiết (p₀, aw = 1)', obj: tk.g, neo: [X1 - 0.4, 4.55, 0], tach: [-0.9, 0, 0], chucNang: 'Mốc so sánh: áp suất hơi của nước tinh khiết là p₀, aw = 1,00.' },
      { so: 2, id: 'dungdich', ten: 'Dung dịch (p = x × p₀)', obj: dd.g, neo: [X2 + 0.4, 4.55, 0], tach: [0.9, 0, 0], chucNang: 'Chất tan pha loãng nước nên còn ít phân tử nước tự do để bay hơi; trong dung dịch lý tưởng aw ≈ x nước.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFB300', 'Hạt chất tan'], ['#4FC3F7', 'Phân tử nước (trắng sáng: hơi nước)']],
    buoc: [
      { ten: 'Bình kín: phân tử nước rời mặt thoáng và quay về liên tục', pha: [], bp: 'tinhkhiet' },
      { ten: 'Thêm chất tan không bay hơi: nước bị pha loãng', pha: [], bp: 'dungdich' },
      { ten: 'Còn ít phân tử nước tự do để bay hơi, áp suất hơi giảm', pha: [], bp: 'dungdich' },
      { ten: 'Dung dịch lý tưởng: aw ≈ phần mol của nước', pha: [], bp: 'dungdich' },
    ],
  };
};
