/* Mô hình: ĐO aw BẰNG TẾ BÀO KNUDSEN (KTG) – bài D008, Cảnh 7.2.
   NGUỒN BÀI (khẳng định của bài, Schiraldi, Fessas và Signorelli 2012): KTG dùng tế bào Knudsen có lỗ cỡ 1–10 µm; tốc độ mất khối lượng tỷ lệ với áp suất hơi, nên aw = tốc độ mất khối lượng của mẫu / của nước
   tinh khiết; một lần chạy thường 2–3 giờ cho cả đường giải hấp.
   KIẾN THỨC NỀN (đã đọc đoạn trích bài gốc "Water Activity in Biological Systems – A Review", Schiraldi và cs.): thoát Knudsen đẳng nhiệt có dòng khối tỷ lệ tuyến tính với chênh áp suất qua lỗ,
   F ∝ (p_trong − p_ngoài); khi p_ngoài rất nhỏ (chân không) thì F gần tỷ lệ p_trong.
   Cách vẽ của album (không phải số đo): hai tế bào đặt trên hai đĩa cân trong chuông hút chân không, lỗ vẽ to hơn nhiều so với 1–10 µm; thời gian rút còn vài chục giây; aw của mẫu giữ KHÔNG ĐỔI
   trong lúc chạy (thật thì mẫu khô dần nên aw giảm, đó chính là đường giải hấp); cột khối lượng chỉ để so tốc độ, không có đơn vị. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['knudsen-aw'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  function tru(r, h, mat, x, y, ho) { var m = new T.Mesh(new T.CylinderGeometry(r, r, h, 40, 1, !!ho), mat); m.position.set(x, y, 0); return m; }
  var mHoi = can(0xE1F5FE, { emissive: 0x81D4FA, emissiveIntensity: 0.65 }), mNuoc = can(0x1E88E5, { transparent: true, opacity: 0.7 }), mBanh = can(0xC68E4E), mKim = can(0xB0BEC5, { metalness: 0.65, roughness: 0.3 });
  var X1 = -2.1, X2 = 2.1, NP = 28, Y0 = 0.95, TOP = 2.1;
  var tt = new T.Group();
  function teBao(x, laMau) {
    var g = new T.Group();
    g.add(tru(0.9, 1.15, mo(0xCFE8F5, 0.2), x, Y0 + 0.55, true));
    g.add(tru(0.93, 0.08, mKim, x, Y0 - 0.02, false));
    // nắp có lỗ nhỏ: vành khuyên
    var nap = new T.Mesh(new T.RingGeometry(0.13, 0.95, 40), can(0x90A4AE, { metalness: 0.6, side: T.DoubleSide })); nap.rotation.x = -Math.PI / 2; nap.position.set(x, TOP + 0.02, 0); g.add(nap);
    var vanh = new T.Mesh(new T.TorusGeometry(0.15, 0.025, 8, 28), can(0xFFEB3B, { emissive: 0xFBC02D, emissiveIntensity: 0.7 })); vanh.rotation.x = Math.PI / 2; vanh.position.set(x, TOP + 0.04, 0); g.add(vanh);
    var chat = laMau ? U.box(1.15, 0.36, 1.0, mBanh, [x, Y0 + 0.22, 0]) : tru(0.84, 0.36, mNuoc, x, Y0 + 0.2, false); g.add(chat);
    var trong = [], ngoai = [], k;
    for (k = 0; k < 14; k++) { var a = U.sphere(0.065, mHoi, [x, Y0 + 0.7, 0]); g.add(a); trong.push(a); }
    for (k = 0; k < NP; k++) { var b = U.sphere(0.07, mHoi, [x, TOP, 0]); g.add(b); ngoai.push(b); }
    return { g: g, trong: trong, ngoai: ngoai, x: x };
  }
  var ref = teBao(X1, false), mau = teBao(X2, true);
  // đĩa cân + thân cân, cột "khối lượng còn lại" cạnh mỗi tế bào
  var cane = new T.Group(), cot = [];
  [X1, X2].forEach(function (x, i) {
    cane.add(tru(1.05, 0.1, mKim, x, 0.82, false)); cane.add(tru(0.14, 0.45, mKim, x, 0.55, false)); cane.add(U.box(1.8, 0.4, 1.4, can(0x455A64), [x, 0.18, 0]));
    var bx = x + (i ? -1.35 : 1.35);
    cane.add(tru(0.15, 2.6, mo(0xFFFFFF, 0.14), bx, 1.6, false));
    var m = tru(0.1, 2.6, can(i ? 0xFFB74D : 0x42A5F5, { emissive: i ? 0xE65100 : 0x0D47A1, emissiveIntensity: 0.45 }), bx, 0.3, false); m.geometry.translate(0, 1.3, 0); cane.add(m); cot.push(m);
  });
  // chuông hút chân không và đế
  tt.add(U.box(7.6, 3.9, 2.8, mo(0x90CAF9, 0.06), [0, 2.0, 0]));
  tt.add(U.box(8.6, 0.1, 4, can(0x1E262E), [0, -0.08, 0]));
  tt.add(U.tube([3.8, 3.3, 0], [4.7, 3.3, 0], 0.12, mKim));
  var st = { t: null, run: 0 };
  function ve(c, aw, tg) {
    var k, nRa = Math.round(NP * aw), nTrong = Math.round(14 * aw);
    for (k = 0; k < 14; k++) { c.trong[k].visible = k < nTrong; c.trong[k].position.set(c.x + Math.sin(tg * 2.1 + k * 1.9) * 0.6, Y0 + 0.72 + Math.sin(tg * 2.9 + k * 2.7) * 0.28, Math.cos(tg * 1.7 + k) * 0.45); }
    for (k = 0; k < NP; k++) {
      var u = (tg * 0.42 + k / NP) % 1, g = (k * 2.399963) % (Math.PI * 2), xoe = u * u * (0.35 + 0.5 * ((k * 0.618) % 1));
      c.ngoai[k].visible = ((k * 0.7548776) % 1) < aw && nRa > 0;
      c.ngoai[k].position.set(c.x + Math.cos(g) * xoe, TOP - 0.1 + u * 1.55, Math.sin(g) * xoe);
      c.ngoai[k].scale.setScalar(1 - 0.5 * u);
    }
  }
  function capNhat(tg, e, val) {
    var aw = (val ? val.aw : 60) / 100, dt = st.t === null ? 0 : tg - st.t; st.t = tg;
    if (dt < 0) { st.run = 0; dt = 0; }
    st.run += dt; if (st.run > 24) st.run = 0;                  // một vòng cân 24 giây rồi đặt lại
    var tien = Math.min(1, st.run / 22);
    ve(ref, 1, tg); ve(mau, aw, tg);
    cot[0].scale.y = Math.max(0.001, 1 - 0.8 * tien); cot[1].scale.y = Math.max(0.001, 1 - 0.8 * aw * tien);
  }
  capNhat(0, 0, { aw: 60 });
  return {
    ten: 'Đo aw bằng tế bào Knudsen', camera: { pos: [0.5, 3.6, 12.2], target: [0, 1.75, 0] }, khoangCachMax: 18,
    dieuKhien: [{ id: 'aw', nhan: 'aw của mẫu', min: 20, max: 100, buoc: 1, mac: 60, don: '', chu: function (v) { var s = (v / 100).toFixed(2).replace('.', ','); return s + ' × nước'; } }],
    boPhan: [
      { so: 1, id: 'nuoc', ten: 'Tế bào nước tinh khiết', obj: ref.g, neo: [X1 - 1.0, 2.7, 0], tach: [-0.9, 0.5, 0], chucNang: 'Mốc so sánh: tốc độ mất khối lượng của nước tinh khiết.' },
      { so: 2, id: 'mau', ten: 'Tế bào chứa mẫu (lỗ 1–10 µm)', obj: mau.g, neo: [X2 + 1.0, 2.7, 0], tach: [0.9, 0.5, 0], chucNang: 'Hơi nước thoát qua lỗ nhỏ; tốc độ mất khối lượng tỷ lệ với áp suất hơi.' },
      { so: 3, id: 'can', ten: 'Cân và khối lượng còn lại', obj: cane, neo: [-2.4, 0.35, 1.2], tach: [0, -0.2, 1.0], chucNang: 'Theo dõi tốc độ mất khối lượng; aw = tốc độ của mẫu / tốc độ của nước.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#42A5F5', 'Khối lượng còn lại: nước tinh khiết'], ['#FFB74D', 'Khối lượng còn lại: mẫu']],
    buoc: [
      { ten: 'Mỗi tế bào Knudsen có một lỗ rất nhỏ', pha: [], bp: 'mau' },
      { ten: 'Hơi nước thoát qua lỗ nên khối lượng giảm dần', pha: [], bp: 'can' },
      { ten: 'Tốc độ mất khối lượng tỷ lệ với áp suất hơi', pha: [], bp: 'mau' },
      { ten: 'aw = tốc độ mất khối lượng của mẫu chia cho của nước', pha: [], bp: 'nuoc' },
    ],
  };
};
