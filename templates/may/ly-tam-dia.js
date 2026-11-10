/* Máy mẫu: LY TÂM ĐĨA (tách béo sữa) – module cho templates/may/may.js
   Bộ phận (số – tên): 1 chén xoay · 2 ống nạp giữa · 3 chồng đĩa nón cụt có lỗ · 4 cửa ra phần nhẹ · 5 cửa ra phần nặng
   Hạt (tọa độ trụ r, θ, y; quay cùng chén):
     pha 0 xuống ống nạp → 1 ra ngoài dưới đĩa phân phối → 2 lên qua lỗ đĩa → 3 vào khe giữa hai đĩa, tách:
     béo (nhẹ) đổi vàng, chạy vào tâm · nước (nặng) đổi xanh, văng ra thành → 4 ra cửa ra phần nhẹ / phần nặng */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ly-tam-dia'] = function (T, ctx) {
  'use strict';
  var N_DIA = 10, R_IN = 0.2, R_OUT = 0.82, DOC = 0.75, Y0 = -0.62, KHE = 0.085, R_LO = 0.5, SO_LO = 6;
  var Y_ONG_TREN = 1.75, Y_ONG_DUOI = -0.74, Y_RA_NHE = 1.12, Y_RA_NANG = 0.92;
  function yDia(k, r) { return Y0 + k * KHE + (R_OUT - r) * DOC; }          // mặt đĩa thứ k tại bán kính r
  function yKhe(k, r) { return yDia(k, r) + KHE * 0.5; }                     // giữa khe k (giữa đĩa k và k+1)
  function yPhanPhoi(r) { return -0.72 - (r - 0.07) / 0.48 * 0.08; }
  function yDayChen(r) { return -1.02 + (r - 0.1) / 0.85 * 0.25; }
  function yDuoi(r) { return (yPhanPhoi(r) + yDayChen(r)) / 2; }            // khe dưới đĩa phân phối
  function yNonTren(r) { return 0.22 + (0.95 - r) / 0.61 * 0.54; }           // nắp nón trên của chén
  var M = ctx.mat;

  function lathe(pts, seg, mat) { var g = new T.LatheGeometry(pts.map(function (p) { return new T.Vector2(p[0], p[1]); }), seg || 96); return new T.Mesh(g, mat); }
  function bong(m) { m.castShadow = true; m.receiveShadow = true; return m; }

  // 1 – chén xoay (vỏ inox) + trục + đế máy (đế không đánh số)
  var chen = new T.Group();
  var vo = bong(lathe([[0.1, -1.02], [0.95, -0.77], [0.975, -0.74], [0.975, 0.2], [0.95, 0.22], [0.34, 0.76], [0.34, 1.0], [0.37, 1.02]], 128, M.inox({ side: T.DoubleSide })));
  vo.userData.xuyen = 0.14; chen.add(vo);
  var gan = bong(new T.Mesh(new T.TorusGeometry(0.975, 0.018, 12, 128), M.inox({ roughness: 0.18 }))); gan.rotation.x = Math.PI / 2; gan.position.y = -0.27; gan.userData.xuyen = 0.25; chen.add(gan);
  var truc = bong(new T.Mesh(new T.CylinderGeometry(0.075, 0.09, 0.7, 32), M.inox({ roughness: 0.3 }))); truc.position.y = -1.36; chen.add(truc);
  var de = new T.Group();
  var than = bong(new T.Mesh(new T.CylinderGeometry(0.42, 0.55, 0.62, 64), M.son(0x2E3A46))); than.position.y = -2.0; de.add(than);
  var chan = bong(new T.Mesh(new T.CylinderGeometry(0.75, 0.8, 0.08, 64), M.son(0x1E262E))); chan.position.y = -2.34; de.add(chan);

  // 2 – ống nạp giữa (đứng yên) + phễu
  var ong = new T.Group();
  var ongM = M.inox({ roughness: 0.12, side: T.DoubleSide });
  var o1 = bong(new T.Mesh(new T.CylinderGeometry(0.07, 0.07, Y_ONG_TREN - Y_ONG_DUOI, 40, 1, true), ongM)); o1.position.y = (Y_ONG_TREN + Y_ONG_DUOI) / 2; o1.userData.xuyen = 0.22; ong.add(o1);
  var pheu = bong(lathe([[0.07, Y_ONG_TREN], [0.24, Y_ONG_TREN + 0.22], [0.25, Y_ONG_TREN + 0.24]], 64, ongM)); pheu.userData.xuyen = 0.22; ong.add(pheu);

  // 3 – chồng đĩa nón cụt có lỗ + đĩa phân phối (quay cùng chén)
  var dia = new T.Group(), diaList = [];
  var diaM = M.inox({ roughness: 0.22, side: T.DoubleSide }), loM = M.son(0x0B0F14, { roughness: 0.6 });
  for (var k = 0; k < N_DIA; k++) {
    var d = new T.Group();
    var t = 0.012, pts = [[R_OUT, yDia(k, R_OUT)], [R_IN, yDia(k, R_IN)], [R_IN, yDia(k, R_IN) + t], [R_OUT, yDia(k, R_OUT) + t], [R_OUT, yDia(k, R_OUT)]];
    var s = bong(lathe(pts, 112, diaM)); s.userData.xuyen = 0.32; d.add(s);
    for (var h = 0; h < SO_LO; h++) { // lỗ phân phối: đĩa tròn tối nằm trên mặt nón
      var a = h / SO_LO * Math.PI * 2, lo = new T.Mesh(new T.CylinderGeometry(0.034, 0.034, t + 0.006, 20), loM);
      lo.position.set(Math.cos(a) * R_LO, yDia(k, R_LO) + t / 2, Math.sin(a) * R_LO);
      var n = new T.Vector3(Math.cos(a) * DOC, 1, Math.sin(a) * DOC).normalize(); lo.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), n); d.add(lo);
    }
    d.userData.k = k; dia.add(d); diaList.push(d);
  }
  var phanPhoi = bong(lathe([[0.075, -0.72], [0.55, -0.8], [0.56, -0.79], [0.08, -0.7]], 96, M.inox({ roughness: 0.28, side: T.DoubleSide }))); phanPhoi.userData.xuyen = 0.3; dia.add(phanPhoi);

  // 4 – cửa ra phần nhẹ (váng béo – lấy ở tâm, ống ra phía +x) · 5 – cửa ra phần nặng (sữa gầy – lấy ở thành, ống ra phía −x)
  function cuaRa(y, rVong, huong, mauVach) {
    var g = new T.Group(), m = M.inox({ roughness: 0.15 });
    var vong = bong(new T.Mesh(new T.CylinderGeometry(rVong, rVong, 0.1, 48, 1, true), M.inox({ roughness: 0.15, side: T.DoubleSide }))); vong.position.y = y; vong.userData.xuyen = 0.25; g.add(vong);
    var L = 1.5 - rVong, p = bong(new T.Mesh(new T.CylinderGeometry(0.055, 0.055, L, 32, 1, true), M.inox({ roughness: 0.15, side: T.DoubleSide })));
    p.rotation.z = Math.PI / 2; p.position.set(huong * (rVong + L / 2), y, 0); p.userData.xuyen = 0.25; g.add(p);
    var vach = new T.Mesh(new T.CylinderGeometry(0.062, 0.062, 0.08, 32), M.son(mauVach, { emissive: ctx.lin(mauVach), emissiveIntensity: 0.6 }));
    vach.rotation.z = Math.PI / 2; vach.position.set(huong * 1.44, y, 0); g.add(vach);
    var mieng = new T.Mesh(new T.TorusGeometry(0.06, 0.014, 10, 32), m); // không đổ bóng (vòng bóng nhỏ trên sàn trông như lỗi) mieng.rotation.y = Math.PI / 2; mieng.position.set(huong * 1.5, y, 0); g.add(mieng);
    return g;
  }
  var raNhe = cuaRa(Y_RA_NHE, 0.15, 1, 0xF2C230), raNang = cuaRa(Y_RA_NANG, 0.3, -1, 0x3BA7E6);

  var boPhan = [
    { so: 1, id: 'chen', ten: 'Chén xoay', obj: chen, xoay: true, neo: [0.975, -0.2, 0], tach: [0, -0.4, 0],
      chucNang: 'Quay 4.000–10.000 vòng/phút, tạo lực ly tâm F = m·R·ω². Phần nặng bị ép ra sát thành chén.' },
    { so: 2, id: 'ong', ten: 'Ống nạp giữa', obj: ong, neo: [0, 1.62, 0.07], tach: [0, 0.95, 0],
      chucNang: 'Dẫn sữa nguyên liệu (đã gia nhiệt ≈ 60 °C) xuống đáy chén, đứng yên, không quay.' },
    { so: 3, id: 'dia', ten: 'Chồng đĩa nón cụt có lỗ', obj: dia, xoay: true, neo: [0.62, yDia(N_DIA - 1, 0.62), 0], tach: [0, 0.25, 0],
      chucNang: 'Chia sữa thành nhiều lớp mỏng trong khe đĩa, rút ngắn quãng lắng. Sữa lên qua các lỗ thẳng hàng rồi vào khe.' },
    { so: 4, id: 'nhe', ten: 'Cửa ra phần nhẹ (váng béo)', obj: raNhe, neo: [1.2, Y_RA_NHE + 0.06, 0], tach: [0.2, 0.8, 0],
      chucNang: 'Hạt béo nhẹ hơn dồn vào tâm, theo khe quanh ống nạp lên và ra ở đây: cream (váng sữa).' },
    { so: 5, id: 'nang', ten: 'Cửa ra phần nặng (sữa gầy)', obj: raNang, neo: [-1.2, Y_RA_NANG + 0.06, 0], tach: [-0.2, 0.55, 0],
      chucNang: 'Pha nước nặng hơn văng ra thành, đi theo nắp nón lên và ra ở đây: sữa gầy (< 0,05 % béo).' },
  ];
  var trangTri = [de];

  // khi tách: các đĩa giãn cách ra (đĩa trên lên cao hơn)
  function tach(e) { diaList.forEach(function (d) { d.position.y = d.userData.k * 0.1 * e; }); }

  // ---------- hạt ----------
  function rgb(hex) { var c = ctx.lin(hex); return [c.r, c.g, c.b]; }
  var MAU = { sua: rgb('#EFEADF'), beo: rgb('#FFC21A'), nuoc: rgb('#2EA8FF') }; // sữa kem · béo vàng · nước (sữa gầy) xanh
  var SANG = 0.9; // độ phát sáng khi đã tách pha (bloom)
  var THOI = [1.1, 0.45, 0.45, 1.4, 1.35]; // giây mỗi pha ở tốc độ 1
  function lerp(a, b, u) { return a + (b - a) * u; }
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  var hat = {
    tiLeBeo: 0.35,
    sinh: function (S, i) {
      S.song[i] = 1; S.pha[i] = 0; S.u[i] = 0; S.j[i] = Math.random();
      S.beo[i] = Math.random() < this.tiLeBeo ? 1 : 0;
      S.k[i] = Math.floor(Math.random() * (N_DIA - 1));
      S.th[i] = Math.floor(Math.random() * SO_LO) / SO_LO * Math.PI * 2;  // đi lên ở lỗ nào
      S.r0[i] = Math.random() * 0.045; S.a0[i] = Math.random() * Math.PI * 2;
    },
    buoc: function (S, i, dt, omega) {
      var p = S.pha[i], j = S.j[i], k = S.k[i], beo = S.beo[i];
      var tg = THOI[p] * (p === 2 ? (0.6 + 0.12 * k) : 1) * (0.8 + 0.4 * j);
      var u = S.u[i] + dt / tg;
      if (p >= 1) S.th[i] += omega * dt;
      var th = S.th[i], r, y, x, z, c = MAU.sua, cart = false, gl = 0;
      if (u >= 1) { if (p < 4) { S.pha[i] = p + 1; S.u[i] = 0; return this.buoc(S, i, 0, 0); } S.song[i] = 0; S.s[i] = 0; return; }
      S.u[i] = u;
      if (p === 0) { r = S.r0[i]; th = S.a0[i]; y = lerp(Y_ONG_TREN + 0.1, Y_ONG_DUOI, u); }
      else if (p === 1) { r = lerp(0.07, R_LO, u); y = yDuoi(r) + (j - 0.5) * 0.02; th += (j - 0.5) * 0.25 * (1 - u); }
      else if (p === 2) { r = R_LO + (j - 0.5) * 0.03; y = lerp(yDuoi(R_LO), yKhe(k, R_LO), u); }
      else if (p === 3) {
        var e = ease(u); r = lerp(R_LO, beo ? 0.23 : 0.86, e); y = yKhe(k, Math.min(r, R_OUT)) - (r > R_OUT ? (r - R_OUT) * DOC * 0.4 : 0) + (j - 0.5) * 0.02;
        var to = beo ? MAU.beo : MAU.nuoc, m = Math.min(1, u * 1.6); c = [lerp(MAU.sua[0], to[0], m), lerp(MAU.sua[1], to[1], m), lerp(MAU.sua[2], to[2], m)]; gl = SANG * m;
      } else if (beo) { // pha 4 – béo: lên theo khe quanh ống nạp rồi ra ống phía +x
        c = MAU.beo; gl = SANG;
        if (u < 0.55) { var a1 = u / 0.55; r = lerp(0.23, 0.16 + j * 0.03, Math.min(1, a1 * 3)); y = lerp(yKhe(k, 0.23), Y_RA_NHE, a1); }
        else { var a2 = (u - 0.55) / 0.45; cart = true; var sx = 0.16 * Math.cos(th), sz = 0.16 * Math.sin(th);
          var b = Math.min(1, a2 * 4); x = lerp(sx, 0.16, b) + a2 * 1.34; z = lerp(sz, (j - 0.5) * 0.06, b); y = Y_RA_NHE + (j - 0.5) * 0.05; }
      } else { // pha 4 – nước: lên theo thành, theo nắp nón vào cổ chén, ra ống phía −x
        c = MAU.nuoc; gl = SANG;
        if (u < 0.35) { var b1 = u / 0.35; r = 0.9 + j * 0.05; y = lerp(yKhe(k, 0.84) - 0.05, 0.2, b1); }
        else if (u < 0.7) { var b2 = (u - 0.35) / 0.35; r = lerp(0.9, 0.31, b2); y = yNonTren(r) - 0.035; }
        else { var b3 = (u - 0.7) / 0.3; cart = true; var qx = 0.31 * Math.cos(th), qz = 0.31 * Math.sin(th), bb = Math.min(1, b3 * 4);
          x = lerp(qx, -0.31, bb) - b3 * 1.19; z = lerp(qz, (j - 0.5) * 0.06, bb); y = lerp(0.78, Y_RA_NANG, bb) + (j - 0.5) * 0.05; }
      }
      if (!cart) { x = Math.cos(th) * r; z = Math.sin(th) * r; }
      S.x[i] = x; S.y[i] = y; S.z[i] = z; S.cr[i] = c[0]; S.cg[i] = c[1]; S.cb[i] = c[2]; S.gl[i] = gl;
      S.s[i] = (p >= 3 && beo ? 1.2 : 1) * (p === 0 ? 0.85 : 1);
    },
  };

  // đường chỉ hướng dòng chảy (gói y-hoc): mỗi tuyến là dãy điểm [x,y,z]
  var a0 = 0.9, tuyen = [
    [[0, Y_ONG_TREN, 0], [0, Y_ONG_DUOI, 0]],
    [[0.07, yDuoi(0.07), 0], [R_LO, yDuoi(R_LO), 0], [R_LO, yKhe(4, R_LO), 0]],
    [[R_LO * Math.cos(a0), yKhe(4, R_LO), R_LO * Math.sin(a0)], [0.23 * Math.cos(a0), yKhe(4, 0.23), 0.23 * Math.sin(a0)], [0.16 * Math.cos(a0), Y_RA_NHE, 0.16 * Math.sin(a0)], [1.5, Y_RA_NHE, 0]],
    [[R_LO * Math.cos(-a0), yKhe(4, R_LO), R_LO * Math.sin(-a0)], [0.86 * Math.cos(-a0), yKhe(4, 0.84), 0.86 * Math.sin(-a0)], [0.9 * Math.cos(-a0), 0.2, 0.9 * Math.sin(-a0)], [0.31 * Math.cos(-a0), 0.74, 0.31 * Math.sin(-a0)], [-1.5, Y_RA_NANG, 0]],
  ];

  return {
    ten: 'Máy ly tâm đĩa (tách béo sữa)',
    camera: { pos: [6.0, 1.75, 6.9], target: [0, -0.22, 0] },
    boPhan: boPhan, trangTri: trangTri, tach: tach, hat: hat, omega: 2.4, tuyen: tuyen,
    // pha hạt → bước (mặc định); [MÁY: … | bước: a; b; …] thay chữ theo thứ tự
    buoc: [
      { ten: 'Sữa vào ống nạp giữa', pha: [0], bp: 'ong' },
      { ten: 'Xuống đáy, tỏa ra dưới đĩa phân phối', pha: [1], bp: 'dia' },
      { ten: 'Lên qua các lỗ đĩa thẳng hàng', pha: [2], bp: 'dia' },
      { ten: 'Vào khe giữa các đĩa: tách hai pha', pha: [3], bp: 'dia' },
      { ten: 'Béo (nhẹ, vàng) vào tâm → cửa ra phần nhẹ', pha: [4], beo: 1, bp: 'nhe' },
      { ten: 'Nước (nặng, xanh) văng ra thành → cửa ra phần nặng', pha: [4], beo: 0, bp: 'nang' },
    ],
    chuThichDoThi: 'Số hạt ở mỗi cửa ra',
  };
};
