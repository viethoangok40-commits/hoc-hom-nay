/* Mô hình: MÀNG LỌC – TẬP TRUNG NỒNG ĐỘ VÀ FOULING – bài CNTP-Ngay01, Cảnh 4.2.
   NGUỒN BÀI (khẳng định của bài, Lê Văn Việt Mẫn và cs. 2011, tr.106–107): tập trung nồng độ (concentration polarization) là cấu tử dồn ở bề mặt màng làm giảm lưu lượng, khắc phục bằng khuấy hoặc tăng áp;
   fouling là cấu tử hấp phụ làm tắc mao dẫn (hoặc tương tác với màng), khắc phục bằng vệ sinh màng.
   KIẾN THỨC NỀN (đã tra): tập trung nồng độ là lớp chất tan tích tụ sát mặt màng; fouling là chất bám, hấp phụ hoặc chặn lỗ (Du 2020, PMC7073750).
   Cách vẽ của album (không phải số đo): màng cắt ngang với 6 lỗ; hạt cam là cấu tử bị giữ, giọt xanh là phần đi qua; cột lưu lượng chỉ định tính; tốc độ tích tụ và tắc rút ngắn. Chỉ vẽ biện pháp khuấy
   và vệ sinh màng, không vẽ tăng áp. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['mang-tap-trung-fouling'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.1, roughness: 0.5 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  var mM = can(0x8E7CC3), mC = can(0xFFA726, { emissive: 0xE65100, emissiveIntensity: 0.35 }), mF = can(0xE53935, { emissive: 0xB71C1C, emissiveIntensity: 0.45 }), mW = can(0x4FC3F7, { emissive: 0x0277BD, emissiveIntensity: 0.4 }), mKh = can(0xB0BEC5, { metalness: 0.65 });
  var YM = 1.9, W = 6.2, D = 1.8, NL = 6, i, k;
  var mang = new T.Group(), lopDon = new T.Group(), foul = new T.Group(), luuG = new T.Group(), tt = new T.Group(), khuayG = new T.Group();
  var lo = []; for (i = 0; i < NL; i++) lo.push(-2.5 + i * 1.0);
  // màng: các khối giữa hai lỗ liền nhau (khe rộng 0,26)
  var moc = [-W / 2].concat(lo.reduce(function (a, x) { a.push(x - 0.13, x + 0.13); return a; }, []), [W / 2]);
  for (i = 0; i < moc.length; i += 2) mang.add(U.box(moc[i + 1] - moc[i], 0.55, D, mM, [(moc[i] + moc[i + 1]) / 2, YM, 0]));
  tt.add(U.box(W + 0.2, 2.5, D + 0.15, mo(0xBFDDF2, 0.07), [0, YM + 1.5, 0]));
  tt.add(U.box(W + 0.2, 1.35, D + 0.15, mo(0xBFDDF2, 0.07), [0, 0.9, 0]));
  tt.add(U.box(10, 0.08, 4, can(0x1E262E), [0.5, 0.1, 0]));
  var cau = [], nc = 90;
  for (k = 0; k < nc; k++) { var s = U.sphere(0.11, mC, [0, 0, 0]); lopDon.add(s); cau.push(s); }
  var tac = [];
  for (i = 0; i < NL; i++) for (k = 0; k < 2; k++) { var f = U.sphere(0.13, mF, [lo[i], YM + 0.16 - k * 0.3, 0.45 - 0.1 * k]); foul.add(f); tac.push({ m: f, ng: ((i * 2 + k) * 0.618) % 1 }); }
  var giot = []; for (k = 0; k < 42; k++) { var g = U.sphere(0.075, mW, [0, 0, 0]); tt.add(g); giot.push(g); }
  // cánh khuấy phía trên
  khuayG.add(U.tube([0, 1.6, 0], [0, 0, 0], 0.06, mKh)); khuayG.add(U.box(1.7, 0.2, 0.08, mKh, [0, 0, 0])); khuayG.position.set(0, YM + 1.35, 0); tt.add(khuayG);
  // cột lưu lượng bên phải
  var ong = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 3.2, 20), mo(0xFFFFFF, 0.14)); ong.position.set(3.45, 2.1, 0); luuG.add(ong);
  var muc = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 3.2, 20), can(0x66BB6A, { emissive: 0x2E7D32, emissiveIntensity: 0.55 })); muc.geometry.translate(0, 1.6, 0); muc.position.set(3.45, 0.5, 0); luuG.add(muc);
  var st = { t: null, don: 0, tac: 0, q: 0, goc: 0 };
  function capNhat(tg, e, val) {
    var kh = (val ? val.khuay : 0) / 100, rua = val ? val.rua > 0.5 : false, dt = st.t === null ? 0 : Math.max(0, tg - st.t); st.t = tg;
    var dich = rua ? 0 : Math.max(0.12, 1 - kh); st.don += (dich - st.don) * Math.min(1, dt / 3);
    st.tac = rua ? Math.max(0, st.tac - dt / 3) : Math.min(1, st.tac + dt / 28);
    var luu = rua ? 0 : Math.max(0.08, 1 - 0.5 * st.don - 0.42 * st.tac);
    st.q += dt * luu; st.goc += dt * kh * 7;
    for (k = 0; k < nc; k++) {
      var px = ((k * 0.618034) % 1) * (W - 0.4) - (W - 0.4) / 2, pz = ((k * 0.754877) % 1) * (D - 0.3) - (D - 0.3) / 2;
      var gan = (k / nc) < 0.68 * st.don + 0.04, tang = (k % 3);
      var yg = YM + 0.4 + tang * 0.2, yx = YM + 0.7 + ((k * 0.569) % 1) * 1.65;
      var xoay = kh * Math.sin(st.goc + k) * 0.35;
      cau[k].position.set(px + (gan ? Math.sin(tg * 2 + k) * 0.03 : Math.sin(tg * 0.9 + k) * 0.18 + xoay), gan ? yg : yx + Math.cos(tg * 1.1 + k) * 0.12, pz);
      cau[k].visible = !rua || k % 4 === 0;
    }
    tac.forEach(function (o) { var on = st.tac > o.ng * 0.9 + 0.05; o.m.visible = on; });
    for (k = 0; k < 42; k++) {
      var l = k % NL, u = ((st.q * 0.7 + (k * 0.618) % 1) % 1 + 1) % 1, biChan = tac[l * 2].m.visible && tac[l * 2 + 1].m.visible;
      giot[k].visible = !rua && !biChan && (k / 42) < luu + 0.1;
      giot[k].position.set(lo[l] + (u > 0.62 ? Math.sin(k) * (u - 0.62) * 0.7 : 0), YM + 0.55 - u * 1.75, 0.45 * Math.cos(k * 1.7));
    }
    khuayG.rotation.y = st.goc; muc.scale.y = Math.max(0.001, luu);
  }
  capNhat(0, 0, { khuay: 0, rua: 0 });
  return {
    ten: 'Màng: tập trung nồng độ và fouling', camera: { pos: [1.2, 4.4, 12.4], target: [0.1, 2.2, 0] }, khoangCachMax: 18,
    dieuKhien: [{ id: 'khuay', nhan: 'Khuấy', min: 0, max: 100, buoc: 1, mac: 0, don: '', chu: function (v) { return v < 3 ? 'tắt' : v < 50 ? 'nhẹ' : 'mạnh'; } }, { id: 'rua', nhan: 'Vệ sinh màng', min: 0, max: 1, buoc: 1, mac: 0, don: '', chu: function (v) { return v > 0.5 ? 'đang rửa' : 'không'; } }],
    boPhan: [
      { so: 1, id: 'mang', ten: 'Màng có mao dẫn', obj: mang, neo: [-2.8, YM - 0.4, 1.0], tach: [0, 0, 1.4], chucNang: 'Phần đi qua theo các mao dẫn của màng.' },
      { so: 2, id: 'tapt', ten: 'Cấu tử dồn ở bề mặt (tập trung nồng độ)', obj: lopDon, neo: [-2.3, YM + 1.2, 1.0], tach: [0, 1.2, 0], chucNang: 'Cấu tử dồn ở bề mặt màng làm giảm lưu lượng; khắc phục bằng khuấy hoặc tăng áp.' },
      { so: 3, id: 'fouling', ten: 'Fouling: tắc mao dẫn', obj: foul, neo: [1.5, YM - 0.6, 0.9], tach: [0, -0.3, 1.9], chucNang: 'Cấu tử hấp phụ làm tắc mao dẫn; khắc phục bằng vệ sinh màng.' },
      { so: 4, id: 'luuluong', ten: 'Lưu lượng qua màng', obj: luuG, neo: [3.5, 3.9, 0], tach: [1.2, 0, 0], chucNang: 'Giảm khi có tập trung nồng độ và fouling.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFA726', 'Cấu tử bị giữ'], ['#E53935', 'Cấu tử làm tắc mao dẫn']],
    buoc: [
      { ten: 'Cấu tử dồn ở bề mặt màng, lưu lượng giảm', pha: [], bp: 'tapt' },
      { ten: 'Khuấy: lớp dồn tan bớt, lưu lượng tăng lại', pha: [], bp: 'tapt' },
      { ten: 'Cấu tử hấp phụ làm tắc mao dẫn: fouling, khuấy không gỡ được', pha: [], bp: 'fouling' },
      { ten: 'Vệ sinh màng để gỡ chỗ tắc', pha: [], bp: 'fouling' },
    ],
  };
};
