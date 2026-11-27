/* Mô hình: HỘP KÍN CÂN BẰNG VÀ ERH – bài D008, Cảnh 2.2.
   NGUỒN BÀI (khẳng định của bài, IFT/FDA): đặt thực phẩm trong hộp kín, chờ cân bằng rồi đo độ ẩm tương đối của khoảng không phía trên (ERH); khi cân bằng thật %ERH = aw × 100;
   RH là của không khí, aw là của thực phẩm, chúng chỉ trùng nhau (chia 100) khi đã cân bằng thật. FDA (1984): đĩa hoặc hộp kín, cảm biến gắn phía trên mẫu.
   KIẾN THỨC NỀN (đã tra): cân bằng là cân bằng động, hơi nước rời mẫu và quay về liên tục; khi số ra bằng số vào thì RH không đổi (Food Online "Measuring Water Activity for Product Quality" cùng ý đo
   RH khoảng không khi đã cân bằng).
   Cách vẽ của album (không phải số đo): mẫu là khối bánh, 40 phân tử hơi ứng với RH 100%; không khí ban đầu khô hơn mẫu (RH 20%); thời gian cân bằng rút còn vài giây (thật cần vài giờ);
   mẫu đủ lớn nên aw của mẫu coi như không đổi; cột RH có vòng vàng đánh dấu aw × 100. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['hop-kin-erh'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.5 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  var mV = can(0xE1F5FE, { emissive: 0x81D4FA, emissiveIntensity: 0.6 }), mRa = can(0x4FC3F7, { emissive: 0x0288D1, emissiveIntensity: 0.6 }), mVao = can(0xFF8A65, { emissive: 0xD84315, emissiveIntensity: 0.55 });
  var NMAX = 40, MAT = 1.15;                                      // số phân tử ứng với RH 100%, cao độ mặt trên của mẫu
  var mau = new T.Group(), khi = new T.Group(), cambien = new T.Group(), tt = new T.Group();
  // mẫu thực phẩm: khối bánh với nước bên trong
  mau.add(U.box(2.9, 0.9, 1.9, can(0xC68E4E, { transparent: true, opacity: 0.72 }), [0, 0.7, 0]));
  mau.add(U.box(2.95, 0.12, 1.95, can(0x8D5A2B), [0, 1.14, 0]));
  var trong = [], k;
  for (k = 0; k < 36; k++) { var s = U.sphere(0.075, mRa, [((k * 0.618) % 1) * 2.6 - 1.3, 0.38 + ((k * 0.755) % 1) * 0.62, ((k * 0.569) % 1) * 1.6 - 0.8]); mau.add(s); trong.push(s); }
  tt.add(U.box(3.5, 0.14, 2.5, can(0xB0BEC5, { metalness: 0.6 }), [0, 0.18, 0]));  // đĩa đựng mẫu
  // hộp kín trong suốt + nắp
  tt.add(U.box(4.4, 3.8, 3.0, mo(0xCFE8F5, 0.09), [0, 2.0, 0]));
  tt.add(U.box(4.55, 0.16, 3.15, can(0x78909C, { metalness: 0.5 }), [0, 3.98, 0]));
  tt.add(U.box(9, 0.08, 4.4, can(0x1E262E), [0.6, 0.02, 0]));
  // hơi nước trong khoảng không phía trên
  var hoi = [];
  for (k = 0; k < NMAX; k++) { var h = U.sphere(0.085, mV, [0, 0, 0]); khi.add(h); hoi.push(h); }
  // phân tử đang qua mặt mẫu: đi ra (xanh) và quay về (cam)
  var ra = [], vao = [];
  for (k = 0; k < 6; k++) { var a = U.sphere(0.095, mRa, [0, 0, 0]); khi.add(a); ra.push(a); var b = U.sphere(0.095, mVao, [0, 0, 0]); khi.add(b); vao.push(b); }
  // cảm biến trên nắp và cột đọc RH bên phải
  cambien.add(U.cyl ? U.cyl(0.16, 0.7, can(0x37474F, { metalness: 0.6 }), [1.4, 3.55, 0], 'y') : U.box(0.32, 0.7, 0.32, can(0x37474F), [1.4, 3.55, 0]));
  cambien.add(U.tube([1.4, 3.95, 0], [1.4, 4.35, 0], 0.045, can(0x263238))); cambien.add(U.tube([1.4, 4.35, 0], [3.2, 4.35, 0], 0.045, can(0x263238))); cambien.add(U.tube([3.2, 4.35, 0], [3.2, 3.7, 0], 0.045, can(0x263238)));
  var ong = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 3.2, 20), mo(0xFFFFFF, 0.16)); ong.position.set(3.2, 2.1, 0); cambien.add(ong);
  var muc = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 3.2, 20), can(0x66BB6A, { emissive: 0x2E7D32, emissiveIntensity: 0.55 })); muc.geometry.translate(0, 1.6, 0); muc.position.set(3.2, 0.5, 0); cambien.add(muc);
  var vach = new T.Mesh(new T.TorusGeometry(0.28, 0.03, 8, 28), can(0xFFEB3B, { emissive: 0xFBC02D, emissiveIntensity: 0.7 })); vach.rotation.x = Math.PI / 2; vach.position.set(3.2, 0.5, 0); cambien.add(vach);
  var st = { n: 0.2 * NMAX, t: null };
  function capNhat(tg, e, val) {
    var aw = (val ? val.aw : 70) / 100, dt = st.t === null ? 0 : tg - st.t; st.t = tg;
    if (dt < 0) { st.n = 0.2 * NMAX; dt = 0; }
    var dich = aw * NMAX; st.n += (dich - st.n) * Math.min(1, dt / 3.5);
    var hien = Math.round(st.n);
    for (k = 0; k < NMAX; k++) {
      var px = ((k * 0.618) % 1) * 3.5 - 1.75, py = 1.5 + ((k * 0.755) % 1) * 2.1, pz = ((k * 0.569) % 1) * 2.3 - 1.15;
      hoi[k].visible = k < hien;
      hoi[k].position.set(px + Math.sin(tg * 1.7 + k) * 0.22, py + Math.cos(tg * 1.3 + k * 2) * 0.18, pz + Math.sin(tg * 1.1 + k * 3) * 0.15);
    }
    // số đang đi ra tỉ lệ với aw của mẫu; số đang quay về tỉ lệ với RH hiện tại: cân bằng khi hai số bằng nhau
    var nRa = Math.round(6 * aw), nVao = Math.round(6 * st.n / NMAX);
    for (k = 0; k < 6; k++) {
      var u = (tg * 0.45 + k / 6) % 1;
      ra[k].visible = k < nRa; ra[k].position.set(-1.2 + k * 0.45, MAT + 0.1 + u * 1.2, 1.05);
      vao[k].visible = k < nVao; vao[k].position.set(-0.98 + k * 0.45, MAT + 0.1 + (1 - u) * 1.2, 1.05);
    }
    var soTrong = Math.round(36 * aw); for (k = 0; k < 36; k++) trong[k].visible = k < soTrong;
    muc.scale.y = Math.max(0.001, st.n / NMAX); vach.position.y = 0.5 + 3.2 * aw;
  }
  capNhat(0, 0, { aw: 70 });
  return {
    ten: 'Hộp kín cân bằng và ERH', camera: { pos: [1.7, 3.8, 13.2], target: [0.7, 2.15, 0] }, khoangCachMax: 19,
    dieuKhien: [{ id: 'aw', nhan: 'aw của thực phẩm', min: 20, max: 95, buoc: 1, mac: 70, don: '', chu: function (v) { return (v / 100).toFixed(2).replace('.', ',') + ' → ERH ' + v + '%'; } }],
    boPhan: [
      { so: 1, id: 'mau', ten: 'Thực phẩm (aw)', obj: mau, neo: [-1.7, 0.9, 1.0], tach: [-1.2, 0, 0], chucNang: 'Mẫu trong hộp kín; aw là tính chất của thực phẩm.' },
      { so: 2, id: 'khongkhi', ten: 'Hơi nước phía trên mẫu', obj: khi, neo: [-1.5, 3.5, 0], tach: [-0.4, 1.0, 0], chucNang: 'Khoảng không phía trên mẫu; chờ đến khi cân bằng thì đo độ ẩm tương đối.' },
      { so: 3, id: 'cambien', ten: 'Cảm biến và số đọc RH', obj: cambien, neo: [3.5, 4.5, 0], tach: [1.0, 0.4, 0], chucNang: 'Cảm biến gắn phía trên mẫu; khi cân bằng %ERH = aw × 100.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#4FC3F7', 'Nước rời mẫu'], ['#FF8A65', 'Nước quay về mẫu']],
    buoc: [
      { ten: 'Đặt thực phẩm trong hộp kín, cảm biến phía trên mẫu', pha: [], bp: 'mau' },
      { ten: 'Chưa cân bằng: nước rời mẫu nhiều hơn quay về, RH tăng dần', pha: [], bp: 'khongkhi' },
      { ten: 'Cân bằng: số rời bằng số về, RH không đổi', pha: [], bp: 'khongkhi' },
      { ten: 'Đọc ERH: khi cân bằng thật, %ERH = aw × 100', pha: [], bp: 'cambien' },
    ],
  };
};
