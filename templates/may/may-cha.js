/* Máy mẫu: MÁY CHÀ CÁNH ĐẬP – bài CNTP-Ngay03 "Chà…", Cảnh 1.5 (slide GV Chương 5 slide 7; Lê Mỹ Hồng 2005; đối chiếu US 4.518.621).
   ĐỐI CHIẾU NGUỒN (bộ phận có nhãn chỉ gồm thứ bài nêu): 1 phễu (Ý6: "vào phễu ở đầu máy") · 2 rây tròn cố định (Ý4, Ý5) · 3 trục + cánh đập (Ý1 trục inox + cánh gỗ nẹp cao su/thép/roi thép;
   Ý2 nghiêng 1,5–2° → xoắn ốc; Ý3 700 v/ph) · 4 máng hứng bột chà (Ý6) · 5 cửa bã (Ý6, và hình "→ cửa bã"). Ý6 là phần bài ghi "tự bổ sung, slide không ghi" → mô hình cần "Cần kiểm tra"
   ở khối giới hạn của thẻ. KHÔNG có nhãn cho động cơ và vỏ máy (bài không nêu): động cơ là vật trang trí; vỏ bao quanh rây chỉ để hình cân đối.
   Hạt: pha 0 rơi qua phễu → 1 xoắn ốc dọc buồng chà → 2 (bột) ép qua lỗ rây / (bã) dồn về cuối máy → 3 → 4 ra máng hứng / cửa bã. Tỉ lệ hạt bột : bã chỉ minh họa. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['may-cha'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, PI = Math.PI;
  var R_RAY = 0.62, R_VO = 0.72, L = 1.3, X_PHEU = -1.1, X_CUOI = 1.15;
  var Y_SAN_MANG = -0.94, Y_ONG = -1.06;
  function bong(m) { m.castShadow = true; m.receiveShadow = true; return m; }
  function lathe(pts, seg, mat) { return new T.Mesh(new T.LatheGeometry(pts.map(function (p) { return new T.Vector2(p[0], p[1]); }), seg || 64), mat); }
  function ngang(geo) { geo.rotateZ(PI / 2); return geo; } // trục hình trụ nằm dọc x

  // lỗ rây: ảnh alpha (đen = lỗ) lặp theo chu vi và chiều dài
  var cv = document.createElement('canvas'); cv.width = cv.height = 64;
  var g2 = cv.getContext('2d'); g2.fillStyle = '#fff'; g2.fillRect(0, 0, 64, 64); g2.fillStyle = '#000'; g2.beginPath(); g2.arc(32, 32, 13, 0, PI * 2); g2.fill();
  var lo = new T.CanvasTexture(cv); lo.wrapS = lo.wrapT = T.RepeatWrapping; lo.repeat.set(40, 24);

  // 1 – phễu nạp
  var pheu = new T.Group();
  var ph = bong(lathe([[0.44, 1.55], [0.14, 0.8], [0.14, 0.2]], 64, M.inox({ roughness: 0.15, side: T.DoubleSide }))); ph.position.x = X_PHEU; ph.userData.xuyen = 0.28; pheu.add(ph);
  var mep = bong(new T.Mesh(new T.TorusGeometry(0.44, 0.02, 10, 64), M.inox({ roughness: 0.15 }))); mep.rotation.x = PI / 2; mep.position.set(X_PHEU, 1.55, 0); pheu.add(mep);

  // 2 – rây tròn cố định (lưới lỗ) + hai vòng đỡ
  var ray = new T.Group();
  var rm = bong(new T.Mesh(ngang(new T.CylinderGeometry(R_RAY, R_RAY, 2 * L, 96, 1, true)), M.inox({ roughness: 0.3, side: T.DoubleSide, alphaMap: lo, alphaTest: 0.5 })));
  rm.userData.xuyen = 0.3; ray.add(rm);
  [-L, L].forEach(function (x) { var v = bong(new T.Mesh(new T.TorusGeometry(R_RAY, 0.025, 12, 96), M.inox({ roughness: 0.2 }))); v.rotation.y = PI / 2; v.position.x = x; ray.add(v); });

  // 3 – trục + cánh đập (nghiêng ~8° trong hình – vẽ phóng đại từ 1,5–2° cho nhìn thấy)
  var truc = new T.Group();
  var tr = bong(new T.Mesh(ngang(new T.CylinderGeometry(0.08, 0.08, 3.6, 40)), M.inox({ roughness: 0.18 }))); tr.position.x = -0.3; truc.add(tr);
  var go = M.son(0xB98A55, { roughness: 0.7, metalness: 0 }), su = M.son(0x16181B, { roughness: 0.9, metalness: 0 });
  [-0.7, -0.3, 0.1, 0.5, 0.9].forEach(function (x, s) {
    for (var c = 0; c < 2; c++) {
      var arm = new T.Group(); arm.rotation.x = s * PI / 3 + c * PI;
      var b = bong(new T.Mesh(new T.BoxGeometry(0.34, 0.48, 0.035), go)); b.position.set(x, 0.34, 0); b.rotation.y = 0.14; arm.add(b);
      var n = bong(new T.Mesh(new T.BoxGeometry(0.34, 0.03, 0.05), su)); n.position.set(x, 0.58, 0); n.rotation.y = 0.14; arm.add(n);
      var cu = bong(new T.Mesh(new T.CylinderGeometry(0.018, 0.018, 0.18, 12), M.inox())); cu.position.set(x, 0.16, 0); arm.add(cu);
      truc.add(arm);
    }
  });

  // 4 – vỏ máy (hở đáy) + máng hứng bột chà + ống ra
  var vo = new T.Group();
  var vm = bong(new T.Mesh(ngang(new T.CylinderGeometry(R_VO, R_VO, 2 * L + 0.04, 96, 1, true, 3 * PI / 2 + 0.6, 2 * PI - 1.2)), M.inox({ roughness: 0.28, side: T.DoubleSide })));
  vm.userData.xuyen = 0.12; vo.add(vm);
  var banKinh = [[-0.92, -0.50], [-0.30, -1.02], [0.30, -1.02], [0.92, -0.50], [0.86, -0.50], [0.26, -0.96], [-0.26, -0.96], [-0.86, -0.50]];
  function duc(pts, depth, cx) { var sh = new T.Shape(); pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); }); var g = new T.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false }); g.rotateY(-PI / 2); g.translate(cx + depth / 2, 0, 0); return bong(new T.Mesh(g, M.inox({ roughness: 0.3, side: T.DoubleSide }))); }
  var mang = duc(banKinh, 2.5, 0); mang.userData.xuyen = 0.2; vo.add(mang);
  [-1.27, 1.27].forEach(function (x) { var e = duc([[-0.92, -0.50], [-0.30, -1.02], [0.30, -1.02], [0.92, -0.50]], 0.05, x - 0.025); e.userData.xuyen = 0.2; vo.add(e); });
  var ong = bong(new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 1.35, 32, 1, true), M.inox({ roughness: 0.15, side: T.DoubleSide }))); ong.rotation.x = PI / 2; ong.position.set(0, Y_ONG, 0.82); ong.userData.xuyen = 0.25; vo.add(ong);
  var vach = new T.Mesh(new T.CylinderGeometry(0.082, 0.082, 0.07, 32), M.son(0xFF6A3D, { emissive: ctx.lin(0xFF6A3D), emissiveIntensity: 0.6 })); vach.rotation.x = PI / 2; vach.position.set(0, Y_ONG, 1.48); vo.add(vach);

  // 5 – cửa thải bã: ống xiên từ cuối buồng chà xuống thùng
  var cuaba = new T.Group();
  var P0 = new T.Vector3(1.3, -0.05, 0), P1 = new T.Vector3(1.75, -0.85, 0), dirB = P1.clone().sub(P0), lenB = dirB.length();
  var oc = bong(new T.Mesh(new T.CylinderGeometry(0.2, 0.2, lenB, 40, 1, true), M.inox({ roughness: 0.2, side: T.DoubleSide })));
  oc.position.copy(P0.clone().add(P1).multiplyScalar(0.5)); oc.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dirB.clone().normalize()); oc.userData.xuyen = 0.25; cuaba.add(oc);
  var vb = new T.Mesh(new T.CylinderGeometry(0.205, 0.205, 0.07, 32), M.son(0x8A6A45, { emissive: ctx.lin(0x8A6A45), emissiveIntensity: 0.5 }));
  vb.position.copy(P1.clone().add(new T.Vector3(0, 0.02, 0))); vb.quaternion.copy(oc.quaternion); cuaba.add(vb);

  // 6 – động cơ + giá đỡ
  var dc = new T.Group();
  var dm = bong(new T.Mesh(ngang(new T.CylinderGeometry(0.34, 0.34, 0.8, 48)), M.son(0x2E5A8A, { metalness: 0.4, roughness: 0.4 }))); dm.position.x = -2.4; dc.add(dm);
  var qa = bong(new T.Mesh(ngang(new T.CylinderGeometry(0.1, 0.1, 0.45, 24)), M.inox())); qa.position.x = -1.85; dc.add(qa);
  for (var f = 0; f < 6; f++) { var ca = bong(new T.Mesh(new T.BoxGeometry(0.03, 0.62, 0.62), M.son(0x24476E))); ca.position.set(-2.62 + f * 0.1, 0, 0); ca.scale.set(1, 1.0, 1.0); ca.rotation.x = 0; dc.add(ca); }
  var gia = bong(new T.Mesh(new T.BoxGeometry(0.9, 0.9, 0.6), M.son(0x23303B))); gia.position.set(-2.4, -0.75, 0); dc.add(gia);

  // trang trí: tủ máy, thùng hứng bã, cốc hứng bột chà
  var tu = new T.Group();
  var tm = bong(new T.Mesh(new T.BoxGeometry(3.95, 1.14, 1.5), M.son(0x23303B))); tm.position.set(-0.925, -1.77, 0); tu.add(tm);
  var thung = bong(new T.Mesh(new T.CylinderGeometry(0.34, 0.3, 0.8, 40, 1, true), M.inox({ side: T.DoubleSide, roughness: 0.4 }))); thung.position.set(1.78, -1.95, 0); tu.add(thung);
  var coc = bong(new T.Mesh(new T.CylinderGeometry(0.26, 0.22, 0.5, 40, 1, true), M.inox({ side: T.DoubleSide, roughness: 0.4 }))); coc.position.set(0, -1.93, 1.5); tu.add(coc);

  var boPhan = [
    { so: 1, id: 'pheu', ten: 'Phễu nạp liệu', obj: pheu, neo: [X_PHEU - 0.3, 1.45, 0.1], tach: [-0.35, 1.0, 0],
      chucNang: 'Nguyên liệu (đã chần hoặc xé nhỏ) vào phễu ở đầu máy.' },
    { so: 2, id: 'ray', ten: 'Rây tròn cố định (lỗ 0,5–1,5 mm)', obj: ray, neo: [0.35, R_RAY, 0.04], tach: [0, 1.05, 0],
      chucNang: 'Rây tròn cố định bằng đồng hay thép không gỉ, lỗ 0,5; 0,75; 1,0; 1,5 mm. Thịt quả mềm lọt qua lỗ; phần không lọt (vỏ, hạt, xơ) ở lại. Chọn lỗ: nước quả đục Ø 0,50–0,75 mm; cà chua cô đặc, mứt chuối, mứt dứa Ø 1,0–1,5 mm.' },
    { so: 3, id: 'truc', ten: 'Trục và cánh đập', obj: truc, xoay: true, truc: 'x', neo: [-1.58, 0.1, 0], tach: [0, 0.35, 1.45],
      chucNang: 'Trục quay bằng thép không gỉ (khoảng 700 v/ph), gắn cánh đập bằng gỗ có nẹp cao su, hoặc cánh đập thép, hoặc roi thép; cánh hất nguyên liệu văng ra và ép vào mặt rây. Cánh lắp nghiêng 1,5–2° so với đường sinh của trục (hình 3D vẽ nghiêng phóng đại cho dễ thấy): nguyên liệu đi theo đường xoắn ốc và bã được đùn ra ở cuối máy.' },
    { so: 4, id: 'mang', ten: 'Máng hứng bột chà', obj: vo, neo: [0.2, -0.8, 0.88], tach: [0, -0.4, 0],
      chucNang: 'Thịt quả mềm lọt qua lỗ rây rơi xuống máng hứng bột chà.' },
    { so: 5, id: 'cuaba', ten: 'Cửa bã', obj: cuaba, neo: [1.55, -0.45, 0], tach: [0.5, -0.1, 0],
      chucNang: 'Phần không lọt rây (vỏ, hạt, xơ) được cánh nghiêng đẩy dần theo đường xoắn ốc tới cửa bã ở cuối máy.' },
  ];
  var trangTri = [tu, dc];

  // ---------- hạt ----------
  function rgb(hex) { var c = ctx.lin(hex); return [c.r, c.g, c.b]; }
  var MAU = { qua: rgb('#F59E42'), bot: rgb('#FF6A3D'), ba: rgb('#8A6A45') };
  var THOI = [0.9, 1.7, 0.5, 0.8, 0.8];
  function lerp(a, b, u) { return a + (b - a) * u; }
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  function mix(a, b, m) { return [lerp(a[0], b[0], m), lerp(a[1], b[1], m), lerp(a[2], b[2], m)]; }
  var hat = {
    tiLeBot: 0.7,
    sinh: function (S, i) {
      S.song[i] = 1; S.pha[i] = 0; S.u[i] = 0; S.j[i] = Math.random();
      S.beo[i] = Math.random() < this.tiLeBot ? 1 : 0;
      S.k[i] = -0.45 + Math.random() * 1.4;                 // vị trí dọc trục nơi hạt bột lọt qua rây
      S.th[i] = Math.random() * PI * 2; S.r0[i] = Math.random() * 0.09; S.a0[i] = Math.random() * PI * 2;
    },
    buoc: function (S, i, dt, omega) {
      var p = S.pha[i], j = S.j[i], bot = S.beo[i], xs = S.k[i];
      var u = S.u[i] + dt / (THOI[p] * (0.8 + 0.4 * j));
      if (p >= 1) S.th[i] += omega * dt * 0.55;            // khối nguyên liệu quay theo cánh nhưng chậm hơn trục
      var th = S.th[i];
      if (u >= 1) { if (p < 4) { S.pha[i] = p + 1; S.u[i] = 0; return this.buoc(S, i, 0, 0); } S.song[i] = 0; S.s[i] = 0; return; }
      S.u[i] = u;
      var rt = 0.18 + 0.34 * j, x, y, z, c = MAU.qua, gl = 0;
      if (p === 0) { x = X_PHEU + S.r0[i] * Math.cos(S.a0[i]); z = S.r0[i] * Math.sin(S.a0[i]); y = lerp(1.5, 0.25, u); }
      else if (p === 1) {
        var m = Math.min(1, u / 0.25), sm = m * m * (3 - 2 * m), tx = bot ? xs : X_CUOI - 0.05, r = rt * sm;
        x = lerp(X_PHEU, tx, ease(u)); y = r * Math.sin(th) + 0.25 * (1 - sm); z = r * Math.cos(th);
      } else if (bot) {
        if (p === 2) { var r2 = lerp(rt, R_RAY + 0.04, ease(u)); x = xs; y = r2 * Math.sin(th); z = r2 * Math.cos(th); c = mix(MAU.qua, MAU.bot, u); gl = 0.7 * u; }
        else {
          c = MAU.bot; gl = 0.7;
          if (p === 3) {
            var d = (((-PI / 2 - th) % (2 * PI)) + 3 * PI) % (2 * PI) - PI, a = th + d * ease(Math.min(1, u / 0.6));
            x = lerp(xs, xs * 0.85, u); if (u < 0.6) { y = (R_RAY + 0.05) * Math.sin(a); z = (R_RAY + 0.05) * Math.cos(a); } else { y = lerp(-(R_RAY + 0.05), Y_SAN_MANG, (u - 0.6) / 0.4); z = 0; }
          } else {
            if (u < 0.5) { var e = ease(u / 0.5); x = lerp(xs * 0.85, 0, e); y = Y_SAN_MANG; z = (j - 0.5) * 0.18 * (1 - e); }
            else if (u < 0.82) { var e2 = (u - 0.5) / 0.32; x = 0; y = lerp(Y_SAN_MANG, Y_ONG, Math.min(1, e2 * 3)); z = lerp(0.1, 1.48, e2) * 0.98; }
            else { var e3 = (u - 0.82) / 0.18; x = 0; z = 1.5; y = lerp(Y_ONG, -1.75, e3 * e3); }
          }
        }
      } else {
        c = mix(MAU.qua, MAU.ba, p === 2 ? u : 1); gl = 0;
        if (p === 2) { var r3 = lerp(rt, 0.5, u); x = lerp(X_CUOI - 0.05, X_CUOI + 0.08, u); y = r3 * Math.sin(th); z = r3 * Math.cos(th); }
        else if (p === 3) { var e4 = ease(u), r4 = 0.5 * (1 - e4); x = lerp(X_CUOI + 0.08, 1.75, e4); y = lerp(0, -0.85, e4) + r4 * Math.sin(th) * (1 - e4); z = r4 * Math.cos(th); }
        else { x = 1.75 + (j - 0.5) * 0.12; z = (j - 0.5) * 0.12; y = lerp(-0.85, -1.62, u * u); }
      }
      S.x[i] = x; S.y[i] = y; S.z[i] = z; S.cr[i] = c[0]; S.cg[i] = c[1]; S.cb[i] = c[2]; S.gl[i] = gl;
      S.s[i] = p === 0 ? 0.9 : (bot ? 1 : 1.15);
    },
  };

  return {
    ten: 'Máy chà cánh đập (chà cà chua, chuối, dứa…)',
    camera: { pos: [4.6, 2.0, 6.2], target: [-0.1, -0.35, 0] },
    boPhan: boPhan, trangTri: trangTri, hat: hat, omega: 3.0,
    chuThichDoThi: 'Số hạt ra mỗi cửa',
    chuThichMau: [['#FF6A3D', 'Bột chà (qua rây)'], ['#8A6A45', 'Bã (ra cuối máy)']],
    buoc: [
      { ten: 'Nguyên liệu (đã chần hoặc xé nhỏ) vào phễu ở đầu máy', pha: [0], bp: 'pheu' },
      { ten: 'Cánh đập quay ~700 v/ph hất nguyên liệu văng ra, đi theo đường xoắn ốc', pha: [1], bp: 'truc' },
      { ten: 'Thịt quả mềm bị ép lọt qua lỗ rây', pha: [2], beo: 1, bp: 'ray' },
      { ten: 'Bột chà rơi xuống máng hứng', pha: [3, 4], beo: 1, bp: 'mang' },
      { ten: 'Phần không lọt (vỏ, hạt, xơ) được đẩy dần tới cửa bã ở cuối máy', pha: [2, 3, 4], beo: 0, bp: 'cuaba' },
    ],
  };
};
