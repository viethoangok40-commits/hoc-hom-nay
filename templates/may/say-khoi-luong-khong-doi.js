/* Mô hình: SẤY TỦ ĐẾN KHỐI LƯỢNG KHÔNG ĐỔI – bài D007, Cảnh 3.2.
   NGUỒN BÀI (khẳng định của bài): tủ sấy không khí 100–105 °C dùng cho phần lớn thực phẩm, trừ thực phẩm giàu đường và chất béo (FAO, Greenfield & Southgate 2003); ví dụ Chen và cs. 2022: sấy 2–5 g mẫu ở 105 °C
   trong 2–4 giờ, để nguội, cân, rồi sấy lại từng chu kỳ 1 giờ đến khi khối lượng đổi dưới 2 mg (khối lượng không đổi).
   Cách vẽ của album (không phải số đo): hình tủ sấy, chỗ để nguội, cân; thời gian rút còn vài giây mỗi lượt; chiều cao các cột lịch sử cân chỉ để thấy khối lượng giảm rồi gần như đứng yên, KHÔNG phải số đo;
   bốn lượt cân là ví dụ của album. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['say-khoi-luong-khong-doi'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.1, roughness: 0.45 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var mKim = can(0xB0BEC5, { metalness: 0.65, roughness: 0.3 }), mVo = can(0x546E7A, { metalness: 0.45 }), mHoi = can(0xE1F5FE, { emissive: 0x81D4FA, emissiveIntensity: 0.6 });
  var XT = -2.75, XN = 0.05, XC = 2.6, Y = 1.05, i, k;
  var tusay = new T.Group(), nguoi = new T.Group(), canG = new T.Group(), lichsu = new T.Group(), tt = new T.Group(), dia = new T.Group();
  // tủ sấy: vỏ 5 mặt hở phía trước, cửa kính, dây nhiệt
  tusay.add(U.box(2.6, 0.18, 1.9, mVo, [XT, 0.35, 0])); tusay.add(U.box(2.6, 0.18, 1.9, mVo, [XT, 2.75, 0])); tusay.add(U.box(0.18, 2.4, 1.9, mVo, [XT - 1.22, 1.55, 0])); tusay.add(U.box(0.18, 2.4, 1.9, mVo, [XT + 1.22, 1.55, 0])); tusay.add(U.box(2.6, 2.4, 0.12, mVo, [XT, 1.55, -0.9]));
  tusay.add(U.box(2.3, 2.2, 0.05, mo(0xFFCC80, 0.1), [XT, 1.55, 0.92]));
  var mDay = can(0x5D4037, { emissive: 0xFF3D00, emissiveIntensity: 0.2 });
  for (i = 0; i < 6; i++) tusay.add(U.tube([XT - 1.0 + i * 0.4, 0.52, -0.7], [XT - 1.0 + i * 0.4, 0.52, 0.7], 0.04, mDay));
  tusay.add(U.box(2.2, 0.05, 1.5, mKim, [XT, 0.82, 0]));
  // chỗ để nguội
  nguoi.add(U.box(1.7, 0.12, 1.4, mKim, [XN, 0.82, 0])); nguoi.add(U.box(0.2, 0.6, 0.2, mVo, [XN, 0.48, 0])); nguoi.add(U.box(1.5, 0.12, 1.2, mVo, [XN, 0.18, 0]));
  // cân
  canG.add(U.box(1.9, 0.6, 1.5, can(0x37474F), [XC, 0.35, 0])); canG.add(U.box(1.5, 0.08, 1.2, mKim, [XC, 0.82, 0])); canG.add(U.box(0.9, 0.26, 0.04, can(0xA5D6A7, { emissive: 0x2E7D32, emissiveIntensity: 0.4 }), [XC, 0.36, 0.77]));
  // đĩa mẫu di chuyển
  dia.add(new T.Mesh(new T.CylinderGeometry(0.55, 0.45, 0.22, 32), mKim));
  var mMau = can(0xA1887F), mau = U.sphere(0.36, mMau, [0, 0.16, 0]); mau.scale.set(1, 0.5, 1); dia.add(mau); tt.add(dia);
  var hoi = []; for (k = 0; k < 26; k++) { var h = U.sphere(0.065, mHoi, [0, 0, 0]); tt.add(h); hoi.push(h); }
  // cột lịch sử cân (bốn lượt), hai cột cuối gần bằng nhau
  var CAO = [2.4, 1.45, 1.24, 1.23], cot = [];
  for (i = 0; i < 4; i++) { var m = new T.Mesh(new T.BoxGeometry(0.34, 1, 0.34), can(i < 3 ? 0xFFB74D : 0x66BB6A, { emissive: i < 3 ? 0xE65100 : 0x2E7D32, emissiveIntensity: 0.4 })); m.geometry.translate(0, 0.5, 0); m.position.set(XC - 0.75 + i * 0.5, 2.0, -0.6); lichsu.add(m); cot.push(m); }
  lichsu.add(U.box(2.3, 0.05, 0.5, mKim, [XC, 1.97, -0.6]));
  var vach = U.box(2.3, 0.025, 0.1, can(0xFFEB3B, { emissive: 0xFBC02D, emissiveIntensity: 0.8 }), [XC, 2.0 + 1.23, -0.35]); lichsu.add(vach);
  tt.add(U.box(11, 0.08, 4, can(0x1E262E), [0, 0, 0]));
  var DAI = [6.0, 3.6, 3.6, 3.6], LU = 3.4;                          // thời gian trong tủ (lượt đầu dài hơn), nguội + cân
  var TONG = DAI.reduce(function (s, d) { return s + d + LU; }, 0) + 3;
  function capNhat(tg) {
    var t = tg % TONG, luot = 0, dau = 0;
    while (luot < 4 && t >= dau + DAI[luot] + LU) { dau += DAI[luot] + LU; luot++; }
    var xong = luot >= 4, r = xong ? 0 : t - dau, trongTu = !xong && r < DAI[luot];
    var x, y = Y - 0.06, nong = trongTu ? 1 : 0;
    if (xong) x = XC;
    else if (trongTu) { var tu0 = luot === 0 ? XT : XC; var v = sm(r / 0.7); x = tu0 + (XT - tu0) * v; y += Math.sin(Math.PI * v) * (luot ? 1.9 : 0); }
    else { var s = r - DAI[luot]; if (s < 0.6) { var a = sm(s / 0.6); x = XT + (XN - XT) * a; y += Math.sin(Math.PI * a) * 0.9; } else if (s < 1.8) x = XN; else if (s < 2.4) { var b = sm((s - 1.8) / 0.6); x = XN + (XC - XN) * b; y += Math.sin(Math.PI * b) * 0.9; } else x = XC; }
    dia.position.set(x, y, 0);
    var daCan = xong ? 4 : (r - DAI[luot] > 2.5 ? luot + 1 : luot);
    for (i = 0; i < 4; i++) cot[i].scale.y = i < daCan ? CAO[i] : 0.001;
    vach.visible = daCan >= 4;
    // nước bay hơi: nhiều ở lượt đầu, rất ít ở lượt cuối
    var nhieu = [26, 9, 3, 0][Math.min(3, luot)], tien = trongTu ? r / DAI[luot] : 1, n = trongTu && r > 0.7 ? Math.round(nhieu * (1 - 0.6 * tien)) : 0;
    for (k = 0; k < 26; k++) { var u = (tg * 0.6 + k / 26) % 1; hoi[k].visible = k < n; hoi[k].position.set(XT + Math.sin(k * 2.4) * 0.7 * (0.4 + u), 1.15 + u * 1.45, Math.cos(k * 1.7) * 0.5); }
    mDay.emissiveIntensity = 0.2 + 1.3 * nong;
    var kho = xong ? 1 : Math.min(1, (luot + (trongTu ? tien : 1)) / 3); mau.scale.set(1 - 0.22 * kho, 0.5 - 0.14 * kho, 1 - 0.22 * kho); mMau.color.setHex(0xA1887F).lerp(new T.Color(0x6D4C41), kho);
  }
  capNhat(0);
  return {
    ten: 'Sấy tủ đến khối lượng không đổi', camera: { pos: [0.7, 3.9, 14.0], target: [-0.15, 1.9, 0] }, khoangCachMax: 20,
    boPhan: [
      { so: 1, id: 'tusay', ten: 'Tủ sấy 100–105 °C', obj: tusay, neo: [XT - 0.9, 3.1, 0], tach: [-0.9, 0.3, 0], chucNang: 'Tủ sấy không khí dùng cho phần lớn thực phẩm, trừ loại giàu đường và chất béo.' },
      { so: 2, id: 'denguoi', ten: 'Để nguội', obj: nguoi, neo: [XN, 1.7, 0], tach: [0, 0.8, 0], chucNang: 'Để mẫu nguội trước khi cân.' },
      { so: 3, id: 'can', ten: 'Cân', obj: canG, neo: [XC + 1.2, 0.6, 0.8], tach: [0.9, 0, 0], chucNang: 'Cân sau mỗi lượt sấy.' },
      { so: 4, id: 'lichsu', ten: 'Các lần cân đến khối lượng không đổi', obj: lichsu, neo: [XC + 0.6, 4.7, -0.6], tach: [0.6, 0.9, 0], chucNang: 'Sấy lặp từng chu kỳ đến khi khối lượng đổi dưới 2 mg thì dừng.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#FFB74D', 'Lần cân khi khối lượng còn giảm'], ['#66BB6A', 'Lần cân gần như không đổi']],
    buoc: [
      { ten: 'Sấy 2–5 g mẫu ở 105 °C trong 2–4 giờ', pha: [], bp: 'tusay' },
      { ten: 'Để nguội rồi cân', pha: [], bp: 'can' },
      { ten: 'Sấy lại từng chu kỳ 1 giờ, để nguội, cân', pha: [], bp: 'denguoi' },
      { ten: 'Dừng khi khối lượng đổi dưới 2 mg: khối lượng không đổi', pha: [], bp: 'lichsu' },
    ],
  };
};
