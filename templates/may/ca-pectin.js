/* Mô hình: ION CANXI GIỮ PECTIN KHI CHẦN – bài CNTP-Ngay09, Cảnh 4.2/4.3 (slide "Những bất lợi khi chần – hấp" và cách khắc phục; ghi chú lớp: thêm ít nước vôi để ít bị mềm nhũn).
   NGUỒN BÀI (khẳng định của bài): chần thường làm mềm nhũn một số rau quả; thêm ít nước vôi trong khi chần thì rau quả ít bị mềm nhũn. Bài ghi "ion canxi làm cứng vách tế bào" là kiến thức thêm cần đối chiếu.
   KIẾN THỨC NỀN (đã tra, chỉ để vẽ đúng): pectin là chuỗi dài mang nhóm carboxyl (COO-) giữ các tế bào dính nhau; ion Ca2+ nối hai chuỗi pectin qua nhóm carboxyl (cầu muối, mô hình "hộp trứng"/egg-box) nên vách bền hơn;
   khi chần nóng, pectin bị khử este rồi phân hủy nên mô mềm (Huang 2023 PMID 36198382, hộp trứng và độ cứng quả; Ni, Lin, Barrett 2005; Sundararajan 1993 ISU về kết cấu đậu). Hai chuỗi, số nhóm, vị trí Ca2+ là cách vẽ
   rút gọn của album; chuỗi tách ra ở hàng trên là hình ảnh cho "mềm nhũn", không có số đo. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ca-pectin'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  var mC = can(0x6FBF73), mO = can(0xE53935), mCa = can(0xFFD54F, { emissive: 0xFF8F00, emissiveIntensity: 0.35 }), mB = can(0xB9C0C7);
  var L1 = 1.45, L2 = -1.45, NR = 9, DX = 0.55, X0 = -(NR - 1) * DX / 2;
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  // một chuỗi pectin: NR gốc, mỗi gốc một nhóm carboxyl hướng về phía chuỗi kia (hướng s = +1 xuống, -1 lên)
  function chuoi(s) {
    var g = new T.Group(), prev = null, i;
    for (i = 0; i < NR; i++) {
      var p = [X0 + i * DX, (i % 2 ? 0.07 : -0.07), 0]; g.add(U.sphere(0.14, mC, p)); if (prev) g.add(U.tube(prev, p, 0.04, mB)); prev = p;
      var o = [p[0], p[1] + s * 0.3, 0.05]; g.add(U.sphere(0.09, mO, o)); g.add(U.tube(p, o, 0.03, mB));
    }
    return g;
  }
  function hang() {
    var g = new T.Group(), a = chuoi(-1), b = chuoi(1); a.position.y = 0.5; b.position.y = -0.5; g.add(a); g.add(b); g.userData = { a: a, b: b, ca: [] };
    return g;
  }
  var h1 = hang(), h2 = hang(); h1.position.y = L1; h2.position.y = L2;
  // Ca2+ nối hai chuỗi ở hàng dưới (gốc 1, 3, 5, 7)
  var caG = new T.Group(); [1, 3, 5, 7].forEach(function (i) { var c = U.sphere(0.17, mCa, [X0 + i * DX, 0, 0.03]); caG.add(c); caG.add(U.tube([X0 + i * DX, 0.19, 0.04], [X0 + i * DX, 0.5 - 0.3 + 0.0, 0.05], 0.02, mCa)); caG.add(U.tube([X0 + i * DX, -0.19, 0.04], [X0 + i * DX, -0.5 + 0.3, 0.05], 0.02, mCa)); });
  h2.add(caG);
  var khongVoi = new T.Group(); khongVoi.add(h1); var coVoi = new T.Group(); coVoi.add(h2);
  var tt = new T.Group();
  function oDd(y, mau) { tt.add(U.box(9.2, 2.3, 1.6, can(mau, { transparent: true, opacity: 0.12, depthWrite: false }), [0, y, 0])); }
  oDd(L1, 0xBFDDF2); oDd(L2, 0xE8E4C0);
  function bep(y) { var m = can(0x3A2A26, { emissive: 0xFF5A1F, emissiveIntensity: 0.05 }); tt.add(U.box(9.4, 0.14, 1.8, m, [0, y - 1.27, 0])); return m; }
  var bp1 = bep(L1), bp2 = bep(L2);
  tt.add(U.box(11, 0.1, 3, can(0x1E262E), [0, -2.95, 0]));
  function capNhat(tg) {
    var u = (tg % 12) / 12, fade = u < 0.92 ? 1 : 1 - sm((u - 0.92) / 0.08);
    var Tn = u < 0.2 ? sm((u - 0.05) / 0.15) : u < 0.75 ? 1 : u < 0.9 ? 1 - 0.9 * sm((u - 0.75) / 0.15) : 0.1 * (1 - sm((u - 0.9) / 0.1));
    var tach = 0.4 * sm((u - 0.3) / 0.35) * fade, r = 0.06 * Tn;
    var d = h1.userData; d.a.position.set(Math.sin(tg * 5.1) * r, 0.5 + tach + Math.sin(tg * 6.3) * r, 0); d.b.position.set(Math.sin(tg * 4.7 + 1) * r, -0.5 - tach + Math.sin(tg * 5.9 + 2) * r, 0);
    var e = h2.userData, jx = Math.sin(tg * 5.1) * r * 0.5, jy = Math.sin(tg * 6.3) * r * 0.5; e.a.position.set(jx, 0.5 + jy, 0); e.b.position.set(jx, -0.5 + jy, 0); caG.position.set(jx, jy, 0);
    bp1.emissiveIntensity = bp2.emissiveIntensity = 0.05 + 1.2 * Tn;
  }
  capNhat(0);
  return {
    ten: 'Ion canxi giữ pectin khi chần', camera: { pos: [0.3, 0.4, 13.8], target: [0, -0.05, 0] }, khoangCachMax: 20,
    boPhan: [
      { so: 1, id: 'khongvoi', ten: 'Chần không thêm nước vôi', obj: khongVoi, neo: [-2.2, L1 + 1.1, 0], tach: [0, 0.9, 0], chucNang: 'Chần làm mềm nhũn một số rau quả (slide Những bất lợi khi chần – hấp).' },
      { so: 2, id: 'covoi', ten: 'Chần có thêm nước vôi (ion Ca²⁺)', obj: coVoi, neo: [-2.2, L2 - 1.4, 0], tach: [0, -0.5, 0], chucNang: 'Ghi chú lớp: thêm ít nước vôi khi chần để rau quả ít bị mềm nhũn.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFD54F', 'Ion Ca²⁺ nối hai chuỗi'], ['#E53935', 'Nhóm carboxyl của pectin']],
    buoc: [
      { ten: 'Pectin là chuỗi mang nhóm carboxyl, giữ các tế bào dính nhau', pha: [], bp: 'khongvoi' },
      { ten: 'Chần nóng: không có nước vôi, hai chuỗi rời nhau, rau mềm nhũn', pha: [], bp: 'khongvoi' },
      { ten: 'Có nước vôi: ion Ca²⁺ nối hai chuỗi qua nhóm carboxyl', pha: [], bp: 'covoi' },
      { ten: 'Chần nóng: chuỗi vẫn nối nhờ Ca²⁺, rau ít nhũn', pha: [], bp: 'covoi' },
    ],
  };
};
