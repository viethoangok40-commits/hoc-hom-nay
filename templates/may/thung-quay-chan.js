/* Máy mẫu: THÙNG QUAY CHẦN BẰNG NƯỚC NÓNG (ngâm) – bài CNTP-Ngay05, Cảnh 2.3 Ý1 (Lê Văn Việt Mẫn và cs. 2011, tr.226–230).
   ĐỐI CHIẾU NGUỒN: nước chần 70–100 °C, ngâm nguyên liệu; thiết bị hình trụ nằm ngang, thân đục lỗ, xoay quanh trục, bên trong có thanh gạt đẩy nguyên liệu đi dọc thân trụ.
   Bộ phận có nhãn: 1 nước chần (bể ngâm) · 2 thùng quay đục lỗ + thanh gạt. KHÔNG có nhãn cho phễu, ống hơi, máng xả, động cơ (bài không nêu): chỉ là vật trang trí.
   Hạt vàng (chất tan) là MINH HỌA tổn thất dinh dưỡng khi chần nước nóng (bài có bảng tổn thất vitamin C theo phương pháp chần; hơi nước ít tổn thất hơn);
   đường đi qua lỗ thùng vào nước là suy ra, bài không mô tả → Cần kiểm tra. Tỉ lệ hạt chỉ minh họa. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['thung-quay-chan'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, PI = Math.PI;
  var R_T = 0.62, L = 1.4, Y_NUOC = -0.1;
  function bong(m) { m.castShadow = true; m.receiveShadow = true; return m; }
  function ngang(geo) { geo.rotateZ(PI / 2); return geo; }
  function duc(pts, depth, cx, mat, shadow) {
    var sh = new T.Shape(); pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); });
    var g = new T.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false }); g.rotateY(-PI / 2); g.translate(cx + depth / 2, 0, 0);
    var m = new T.Mesh(g, mat); if (shadow) bong(m); return m;
  }

  // lỗ trên thân thùng (alpha: đen = lỗ)
  var cv = document.createElement('canvas'); cv.width = cv.height = 64;
  var g2 = cv.getContext('2d'); g2.fillStyle = '#fff'; g2.fillRect(0, 0, 64, 64); g2.fillStyle = '#000'; g2.beginPath(); g2.arc(32, 32, 17, 0, PI * 2); g2.fill();
  var lo = new T.CanvasTexture(cv); lo.wrapS = lo.wrapT = T.RepeatWrapping; lo.repeat.set(30, 16);

  // 1 – phễu nạp + ống xiên vào đầu thùng
  var pheu = new T.Group();
  var ph = bong(new T.Mesh(new T.LatheGeometry([[0.4, 1.55], [0.13, 0.95]].map(function (p) { return new T.Vector2(p[0], p[1]); }), 48), M.inox({ roughness: 0.15, side: T.DoubleSide })));
  ph.position.x = -2.05; ph.userData.xuyen = 0.28; pheu.add(ph);
  var P0 = new T.Vector3(-2.05, 0.95, 0), P1 = new T.Vector3(-1.38, 0.12, 0), dirP = P1.clone().sub(P0);
  var ong = bong(new T.Mesh(new T.CylinderGeometry(0.13, 0.13, dirP.length(), 32, 1, true), M.inox({ roughness: 0.15, side: T.DoubleSide })));
  ong.position.copy(P0.clone().add(P1).multiplyScalar(0.5)); ong.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dirP.clone().normalize()); ong.userData.xuyen = 0.28; pheu.add(ong);

  // 2 – bể nước chần (vỏ + khối nước) trên khung
  var be = new T.Group();
  var vi = [[-0.95, 0.0], [-0.95, -0.5], [-0.6, -1.0], [0.6, -1.0], [0.95, -0.5], [0.95, 0.0], [0.89, 0.0], [0.89, -0.48], [0.57, -0.95], [-0.57, -0.95], [-0.89, -0.48], [-0.89, 0.0]];
  var vo = duc(vi, 3.1, 0, M.inox({ roughness: 0.3, side: T.DoubleSide }), true); vo.userData.xuyen = 0.18; be.add(vo);
  [-1.55, 1.55].forEach(function (x) { var e = duc([[-0.95, 0.0], [-0.95, -0.5], [-0.6, -1.0], [0.6, -1.0], [0.95, -0.5], [0.95, 0.0]], 0.05, x - 0.025, M.inox({ roughness: 0.3, side: T.DoubleSide }), true); e.userData.xuyen = 0.18; be.add(e); });
  var nuocM = new T.MeshStandardMaterial({ color: ctx.lin(0x3AA0FF), transparent: true, opacity: 0.3, roughness: 0.1, metalness: 0, depthWrite: false, envMapIntensity: 0.6 });
  var nuoc = duc([[-0.88, Y_NUOC], [-0.88, -0.49], [-0.56, -0.94], [0.56, -0.94], [0.88, -0.49], [0.88, Y_NUOC]], 3.0, 0, nuocM, false); be.add(nuoc);

  // 3 – thùng quay đục lỗ + 2 thanh gạt xoắn + vành răng + 2 vành đỡ
  var thung = new T.Group();
  var tm = bong(new T.Mesh(ngang(new T.CylinderGeometry(R_T, R_T, 2 * L, 96, 1, true)), M.inox({ roughness: 0.3, side: T.DoubleSide, alphaMap: lo, alphaTest: 0.5 }))); tm.userData.xuyen = 0.3; thung.add(tm);
  [-L, L].forEach(function (x) { var v = bong(new T.Mesh(new T.TorusGeometry(R_T, 0.03, 12, 96), M.inox({ roughness: 0.2 }))); v.rotation.y = PI / 2; v.position.x = x; thung.add(v); });
  [0, PI].forEach(function (a0) {
    var pts = []; for (var i = 0; i <= 160; i++) { var t = i / 160, a = a0 + t * PI * 2 * 2.4; pts.push(new T.Vector3(-L + 0.06 + t * (2 * L - 0.12), 0.57 * Math.sin(a), 0.57 * Math.cos(a))); }
    var vit = bong(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 320, 0.04, 8, false), M.son(0xF2994A, { metalness: 0.2, roughness: 0.45 }))); thung.add(vit);
  });
  var vanh = bong(new T.Mesh(new T.TorusGeometry(R_T + 0.03, 0.05, 12, 96), M.son(0x3A4B5C, { metalness: 0.7, roughness: 0.35 }))); vanh.rotation.y = PI / 2; vanh.position.x = -0.9; thung.add(vanh);

  // vật trang trí (bài không nêu, KHÔNG có nhãn): ống cấp hơi chạy dọc đáy bể + họng phun
  var hoi = new T.Group(), mHoi = M.son(0xD9542C, { metalness: 0.4, roughness: 0.4 });
  var oh = bong(new T.Mesh(ngang(new T.CylinderGeometry(0.05, 0.05, 3.3, 24)), mHoi)); oh.position.set(0.05, -0.86, 0); hoi.add(oh);
  for (var h = 0; h < 8; h++) { var hp = bong(new T.Mesh(new T.ConeGeometry(0.045, 0.1, 14), mHoi)); hp.position.set(-1.2 + h * 0.34, -0.78, 0); hoi.add(hp); }

  // 5 – máng xả (đầu phải)
  var mang = new T.Group();
  var Q0 = new T.Vector3(1.42, 0.02, 0), Q1 = new T.Vector3(2.15, -0.55, 0), dirQ = Q1.clone().sub(Q0);
  var mg = bong(new T.Mesh(new T.CylinderGeometry(0.2, 0.2, dirQ.length(), 40, 1, true, PI * 0.5, PI), M.inox({ roughness: 0.2, side: T.DoubleSide })));
  mg.position.copy(Q0.clone().add(Q1).multiplyScalar(0.5)); mg.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dirQ.clone().normalize());
  mg.rotateY(PI); mg.userData.xuyen = 0.3; mang.add(mg);
  var vg = new T.Mesh(new T.CylinderGeometry(0.205, 0.205, 0.05, 32, 1, true, PI * 0.5, PI), M.son(0x35D562, { emissive: ctx.lin(0x35D562), emissiveIntensity: 0.5, side: T.DoubleSide }));
  vg.position.copy(Q1); vg.quaternion.copy(mg.quaternion); mang.add(vg);

  // 6 – động cơ + hộp số + bánh răng ăn vành răng
  var dc = new T.Group();
  var dm = bong(new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.7, 48), M.son(0x2E5A8A, { metalness: 0.4, roughness: 0.4 }))); dm.rotation.x = PI / 2; dm.position.set(-0.9, -0.05, -1.6); dc.add(dm);
  var hs = bong(new T.Mesh(new T.BoxGeometry(0.55, 0.5, 0.45), M.son(0x24476E))); hs.position.set(-0.9, -0.05, -1.1); dc.add(hs);
  var tr = bong(new T.Mesh(new T.CylinderGeometry(0.045, 0.045, 0.5, 16), M.inox())); tr.rotation.x = PI / 2; tr.position.set(-0.9, 0.0, -0.85); dc.add(tr);
  var bx = bong(new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.08, 24), M.son(0x3A4B5C, { metalness: 0.7, roughness: 0.35 }))); bx.rotation.x = PI / 2; bx.position.set(-0.9, 0.0, -0.68); dc.add(bx);
  var gd = bong(new T.Mesh(new T.BoxGeometry(0.7, 0.6, 0.7), M.son(0x23303B))); gd.position.set(-0.9, -0.65, -1.5); dc.add(gd);

  // trang trí: khung đỡ bể, thùng chứa rau chần
  var tu = bong(new T.Mesh(new T.BoxGeometry(3.4, 1.34, 1.6), M.son(0x23303B))); tu.position.set(0, -1.67, 0);
  var thungChua = bong(new T.Mesh(new T.CylinderGeometry(0.34, 0.3, 0.7, 40, 1, true), M.inox({ side: T.DoubleSide, roughness: 0.4 }))); thungChua.position.set(2.2, -2.0, 0);
  var trangTri = [tu, thungChua, pheu, hoi, mang, dc];

  var boPhan = [
    { so: 1, id: 'be', ten: 'Nước chần 70–100 °C (bể ngâm)', obj: be, neo: [1.1, -0.65, 0.95], tach: [0, -0.55, 0],
      chucNang: 'Nước chần ở 70–100 °C; nguyên liệu được ngâm trong nước nóng.' },
    { so: 2, id: 'thung', ten: 'Thùng quay đục lỗ và thanh gạt', obj: thung, xoay: true, truc: 'x', neo: [0.3, R_T, 0.05], tach: [0, 1.05, 0],
      chucNang: 'Thiết bị hình trụ nằm ngang, thân đục lỗ, xoay quanh trục; bên trong có thanh gạt đẩy nguyên liệu đi dọc thân trụ.' },
  ];

  // ---------- hạt ----------
  function rgb(hex) { var c = ctx.lin(hex); return [c.r, c.g, c.b]; }
  var MAU = { tho: rgb('#6F8A43'), chan: rgb('#35D562'), tan: rgb('#E9F27A') };
  var THOI = [0.9, 3.4, 0.5, 1.0, 0.9];
  function lerp(a, b, u) { return a + (b - a) * u; }
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  function mix(a, b, m) { return [lerp(a[0], b[0], m), lerp(a[1], b[1], m), lerp(a[2], b[2], m)]; }
  var hat = {
    tiLeRau: 0.72,
    sinh: function (S, i) {
      S.song[i] = 1; S.pha[i] = 0; S.u[i] = 0; S.j[i] = Math.random();
      S.beo[i] = Math.random() < this.tiLeRau ? 1 : 0;
      S.k[i] = -0.5 + Math.random() * 1.3;                // chỗ chất tan thoát qua lỗ
      S.th[i] = Math.random() * PI * 2; S.r0[i] = Math.random() * 0.08; S.a0[i] = Math.random() * PI * 2;
    },
    buoc: function (S, i, dt, omega) {
      var p = S.pha[i], j = S.j[i], rau = S.beo[i], xs = S.k[i];
      var u = S.u[i] + dt / (THOI[p] * (0.85 + 0.3 * j));
      if (p >= 1) S.th[i] += (omega + 1.1) * dt * (0.7 + 0.6 * j);   // lăn trong thùng, nhanh hơn một chút so với thùng
      var th = S.th[i];
      if (u >= 1) { if (p < 4) { S.pha[i] = p + 1; S.u[i] = 0; return this.buoc(S, i, 0, 0); } S.song[i] = 0; S.s[i] = 0; return; }
      S.u[i] = u;
      var x, y, z, c = MAU.tho, gl = 0, s = 1;
      var lan = function (r) { var yy = -0.42 + r * 0.45 * Math.sin(th + j * 5), zz = r * Math.cos(th); return [Math.max(-0.56, yy), zz]; };
      if (p === 0) { var a = ease(u); x = lerp(-2.05, -1.38, a) + S.r0[i] * Math.cos(S.a0[i]); y = lerp(1.45, 0.12, a); z = S.r0[i] * Math.sin(S.a0[i]); if (a < 0.45) { y = lerp(1.45, 1.0, a / 0.45); x = -2.05 + S.r0[i] * Math.cos(S.a0[i]); } }
      else if (p === 1) {
        var tx = rau ? 1.25 : xs, ee = ease(u), yz = lan(0.15 + 0.35 * j);
        x = lerp(-1.3, tx, rau ? u : ee); y = lerp(0.12, yz[0], Math.min(1, u * 4)); z = yz[1];
        c = rau ? mix(MAU.tho, MAU.chan, u) : mix(MAU.tho, MAU.tan, Math.min(1, u * 1.4)); gl = rau ? 0.5 * u : 0.6 * u;
      } else if (rau) {
        c = MAU.chan; gl = 0.5;
        if (p === 2) { var e2 = ease(u), yz2 = lan(0.3); x = lerp(1.25, 1.45, e2); y = lerp(yz2[0], 0.02, e2); z = lerp(yz2[1], 0, e2); }
        else if (p === 3) { var e3 = u * u * 0.5 + u * 0.5; x = lerp(1.45, 2.15, e3); y = lerp(0.02, -0.55, e3); z = (j - 0.5) * 0.08; }
        else { x = 2.15 + (j - 0.5) * 0.12; z = (j - 0.5) * 0.12; y = lerp(-0.55, -1.62, u * u); }
      } else {
        c = MAU.tan; gl = 0.6; var yz3 = lan(0.4);
        if (p === 2) { var e5 = ease(u), r = lerp(0.4, 0.72, e5); x = xs; y = lerp(yz3[0], -0.62, e5); z = (yz3[1] >= 0 ? 1 : -1) * Math.min(0.72, Math.abs(yz3[1]) + e5 * 0.3); }
        else if (p === 3) { x = xs + (j - 0.5) * 0.5 * u; y = lerp(-0.62, -0.78, ease(u)); z = (j - 0.5) * 1.1 * u + (th > PI ? 0.3 : -0.3) * (1 - u); c = mix(MAU.tan, MAU.tan, 1); }
        else { x = xs + (j - 0.5) * 0.5; y = -0.78 - 0.12 * u; z = (j - 0.5) * 1.1; s = Math.max(0, 1 - u); gl = 0.6 * (1 - u); }
      }
      S.x[i] = x; S.y[i] = y; S.z[i] = z; S.cr[i] = c[0]; S.cg[i] = c[1]; S.cb[i] = c[2]; S.gl[i] = gl; S.s[i] = p === 0 ? 1.15 : (rau ? 1.5 : 0.9) * s;
    },
  };

  return {
    ten: 'Thùng quay chần bằng nước nóng (ngâm)',
    camera: { pos: [5.7, 2.2, 6.9], target: [0.1, -0.5, 0] },
    boPhan: boPhan, trangTri: trangTri, hat: hat, omega: 0.8,
    chuThichDoThi: 'Số hạt ra mỗi nơi',
    chuThichMau: [['#35D562', 'Rau đã chần (ra máng xả)'], ['#E9F27A', 'Chất tan (minh họa; Cần kiểm tra)']],
    buoc: [
      { ten: 'Nguyên liệu vào đầu thùng quay, ngâm trong nước chần', pha: [0], bp: 'thung' },
      { ten: 'Thùng xoay quanh trục; thanh gạt đẩy nguyên liệu đi dọc thân trụ', pha: [1], beo: 1, bp: 'thung' },
      { ten: 'Chất tan hòa vào nước chần (minh họa tổn thất; đường đi qua lỗ là suy ra, Cần kiểm tra)', pha: [1, 2, 3, 4], beo: 0, bp: 'be' },
      { ten: 'Nguyên liệu ra khỏi thùng', pha: [2, 3, 4], beo: 1, bp: 'thung' },
    ],
  };
};
