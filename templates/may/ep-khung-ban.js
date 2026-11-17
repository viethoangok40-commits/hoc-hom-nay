/* Máy mẫu: THIẾT BỊ ÉP KHUNG BẢN (gián đoạn) – bài CNTP-Ngay03, Cảnh 3.2 (Lê Văn Việt Mẫn và cs. 2011, tr.175–176, hình H.2.1.12.1).
   ĐỐI CHIẾU NGUỒN: bộ phận 1–7 đúng chú thích slide (1 trục đỡ; 2 bản ép; 3 bản bìa; 4 hướng tác động của lực ép; 5 lối thoát dịch ép từ các bản ép; 6 khay chứa dịch ép; 7 cửa thoát dịch ép).
   Bộ phận 8 (túi lọc vải) và nguyên lý "giữ bằng 4 trục đứng, áp thủy lực từ một đầu, thường từ dưới lên" nằm ở Ý2 mà bài ghi "tự bổ sung" → Cần kiểm tra ở khối giới hạn.
   Bản bìa (3): bài chỉ nêu tên, KHÔNG nêu chức năng riêng. Xà ngang trên, đế, pittông, chai hứng: vẽ cho hình đứng vững, bài không nêu, không có nhãn.
   "Phải tăng áp dần dần, từng giai đoạn" (Ý4): chu kỳ 4 bậc là minh họa, số bậc không phải số liệu của bài. Hạt: dịch qua vải → rãnh → kênh thu → khay → cửa thoát; bã nằm lại trong túi. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['ep-khung-ban'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, PI = Math.PI;
  var H_COVER = 0.16, H_PLATE = 0.1, H_BAG0 = 0.12, TOP0 = 0.95, TRAY_FLOOR = -0.75, ROD_BASE = -1.3, PX = 0.84;
  var KIND = ['c', 'b', 'p', 'b', 'p', 'b', 'p', 'b', 'p', 'b', 'c']; // cover, bag, plate, …, cover
  function bong(m) { m.castShadow = true; m.receiveShadow = true; return m; }
  function box(w, h, d, mat) { return bong(new T.Mesh(new T.BoxGeometry(w, h, d), mat)); }
  function cyl(r, h, mat, seg) { return bong(new T.Mesh(new T.CylinderGeometry(r, r, h, seg || 32), mat)); }

  // trạng thái bố cục (đọc bởi hạt): yc[u] = tâm đơn vị u; hb = bề dày túi; bottom/top = mặt dưới/mặt trên cả chồng
  var Ly = { yc: [], hb: H_BAG0, bottom: 0, top: 0, c: 0, e: 0 };
  function hOf(u, hb) { return KIND[u] === 'c' ? H_COVER : KIND[u] === 'p' ? H_PLATE : hb; }
  function bocuc(c, e) {
    var hb = H_BAG0 * (1 - 0.5 * c), gap = 0.12 * e, t = TOP0 + 0.4 * e; Ly.top = t;
    for (var u = 10; u >= 0; u--) { var h = hOf(u, hb); Ly.yc[u] = t - h / 2; t -= h + gap; }
    Ly.bottom = t + gap; Ly.hb = hb; Ly.c = c; Ly.e = e;
  }
  bocuc(0, 0);

  // 1 – trục đỡ: 4 cột, đế, xà ngang trên (xà nâng lên khi tách)
  var trucDo = new T.Group();
  var mCot = M.inox({ roughness: 0.25 });
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { var c = cyl(0.06, 3.54, mCot, 24); c.position.set(s[0] * PX, -0.57, s[1] * PX); trucDo.add(c); });
  var de = box(2.1, 0.12, 2.1, M.son(0x2B3844)); de.position.y = -1.36; trucDo.add(de);
  var xa = box(2.1, 0.14, 2.1, M.son(0x2B3844)); xa.position.y = 1.12; trucDo.add(xa);

  // 2 – bản ép (4 bản cứng có rãnh; mỗi bản có 4 chấu trượt trên cột) · 3 – bản bìa (2 tấm đầu)
  function chau(h, mat, g) { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { var c = cyl(0.1, h, mat, 24); c.position.set(s[0] * PX, 0, s[1] * PX); g.add(c); }); }
  var banEp = new T.Group(), banBia = new T.Group(), tam = [], bia = [];
  var mBan = M.inox({ roughness: 0.3 }), mBia = M.son(0x3A4B5C, { metalness: 0.5, roughness: 0.4 });
  KIND.forEach(function (k, u) {
    if (k === 'p') { var g = new T.Group(); g.add(box(1.4, H_PLATE, 1.4, mBan)); chau(H_PLATE, mBan, g); g.userData.u = u; banEp.add(g); tam[u] = g; }
    if (k === 'c') { var g2 = new T.Group(); g2.add(box(1.5, H_COVER, 1.5, mBia)); chau(H_COVER, mBia, g2); g2.userData.u = u; banBia.add(g2); bia[u] = g2; }
  });

  // 8 – túi lọc vải chứa nguyên liệu (5 túi xen giữa các bản)
  var tui = new T.Group(), tuiM = [];
  var mTui = M.son(0xE6D9B8, { roughness: 0.95, metalness: 0 });
  [1, 3, 5, 7, 9].forEach(function (u) { var b = box(1.34, 1, 1.34, mTui); b.userData.xuyen = 0.35; b.userData.u = u; tui.add(b); tuiM[u] = b; });

  // 5 – lối thoát dịch: rãnh trên mặt các bản (dọc theo z) + kênh thu hồi thẳng đứng ở mép trước
  var ranh = new T.Group(), ranhNhom = [];
  var mRanh = M.son(0x2E9BFF, { emissive: ctx.lin(0x2E9BFF), emissiveIntensity: 0.55, roughness: 0.4 });
  [0, 2, 4, 6, 8].forEach(function (u) { var g = new T.Group(); [-0.5, -0.25, 0, 0.25, 0.5].forEach(function (x) { var r = box(0.045, 0.012, 1.3, mRanh); r.position.x = x; g.add(r); }); g.userData.u = u; ranh.add(g); ranhNhom[u] = g; });
  var kenh = box(1.34, 1, 0.05, M.kinh({ color: 0x9CCBFF, transmission: 0.75, roughness: 0.15, thickness: 0.1 })); kenh.position.z = 0.8; kenh.userData.xuyen = 0.3; ranh.add(kenh);

  // 4 – pittông thủy lực + mũi tên hướng lực
  var luc = new T.Group();
  var thanPt = cyl(0.32, 0.88, M.son(0x2E5A8A, { metalness: 0.5, roughness: 0.35 }), 48); thanPt.position.y = -1.86; luc.add(thanPt);
  var can = cyl(0.13, 1, M.inox({ roughness: 0.15 }), 32); luc.add(can);
  var mMuiTen = M.son(0xFFD23F, { emissive: ctx.lin(0xFFC21A), emissiveIntensity: 0.8, roughness: 0.4 });
  var mt = new T.Group(); mt.position.set(1.18, -0.95, 0);
  var tmt = cyl(0.03, 0.75, mMuiTen, 16); tmt.position.y = -0.1; mt.add(tmt);
  var dau = bong(new T.Mesh(new T.ConeGeometry(0.11, 0.25, 24), mMuiTen)); dau.position.y = 0.4; mt.add(dau);
  luc.add(mt);

  // 6 – khay chứa dịch ép · 7 – cửa thoát (ống ra phía +x)
  var khay = new T.Group(), mKhay = M.inox({ roughness: 0.3, side: T.DoubleSide });
  var san = box(2.2, 0.03, 1.9, mKhay); san.position.y = TRAY_FLOOR - 0.015; san.userData.xuyen = 0.4; khay.add(san);
  [[0, 0.95, 2.2, 0.04], [0, -0.95, 2.2, 0.04], [1.1, 0, 0.04, 1.9], [-1.1, 0, 0.04, 1.9]].forEach(function (w) { var t = box(w[2] || 0.04, 0.2, w[3] || 0.04, mKhay); t.position.set(w[0], TRAY_FLOOR + 0.1, w[1]); t.userData.xuyen = 0.4; khay.add(t); });
  var cua = new T.Group();
  var ong = bong(new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.65, 32, 1, true), M.inox({ roughness: 0.15, side: T.DoubleSide }))); ong.rotation.z = PI / 2; ong.position.set(1.42, -0.78, 0); ong.userData.xuyen = 0.28; cua.add(ong);
  var vanh = new T.Mesh(new T.CylinderGeometry(0.077, 0.077, 0.06, 32), M.son(0xFFB020, { emissive: ctx.lin(0xFFB020), emissiveIntensity: 0.6 })); vanh.rotation.z = PI / 2; vanh.position.set(1.72, -0.78, 0); cua.add(vanh);

  // trang trí: chai hứng dịch
  var chai = bong(new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.62, 40, 1, true), M.inox({ side: T.DoubleSide, roughness: 0.4 }))); chai.position.set(1.75, -2.03, 0);
  var trangTri = [chai];

  var boPhan = [
    { so: 1, id: 'cot', ten: 'Trục đỡ', obj: trucDo, neo: [PX, 0.9, PX], tach: [0, 0, 0],
      chucNang: 'Trục đỡ giữ các bản ép (bài ghi nguyên lý này là "tự bổ sung": các bản được giữ bằng 4 trục đứng).' },
    { so: 2, id: 'ban', ten: 'Bản ép (có rãnh)', obj: banEp, neo: [0.72, 0, 0.72], tach: [0, 0, 0],
      chucNang: 'Bản cứng có rãnh, đặt xen giữa các túi lọc vải. Lực ép thủy lực tác dụng từ một đầu (thường từ dưới lên) ép chồng bản lại.' },
    { so: 3, id: 'bia', ten: 'Bản bìa', obj: banBia, neo: [0.75, 0, 0.75], tach: [0, 0, 0],
      chucNang: 'Tên bộ phận theo hình H.2.1.12.1; bài không nêu chức năng riêng của bản bìa (Cần kiểm tra).' },
    { so: 4, id: 'luc', ten: 'Hướng tác động của lực ép', obj: luc, neo: [1.18, -0.78, 0], tach: [0, 0, 0],
      chucNang: 'Lực ép tác dụng theo hướng mũi tên. Phải tăng áp dần dần, từng giai đoạn để tăng hiệu suất và hạn chế nguyên liệu rò qua khe giữa hai bản.' },
    { so: 5, id: 'ranh', ten: 'Lối thoát dịch ép từ các bản ép', obj: ranh, neo: [0, 0.3, 0.84], tach: [0, 0, 0],
      chucNang: 'Dịch khuếch tán qua túi lọc, chạy theo rãnh trên bản tới kênh thu hồi rồi xuống khay.' },
    { so: 6, id: 'khay', ten: 'Khay chứa dịch ép', obj: khay, neo: [-1.1, TRAY_FLOOR + 0.12, 0.95], tach: [0, -0.55, 0],
      chucNang: 'Chứa dịch ép từ kênh thu hồi rơi xuống.' },
    { so: 7, id: 'cua', ten: 'Cửa thoát dịch ép', obj: cua, neo: [1.5, -0.7, 0], tach: [0.45, -0.55, 0],
      chucNang: 'Dịch ép ra khỏi khay qua cửa thoát.' },
    { so: 8, id: 'tui', ten: 'Túi lọc vải chứa nguyên liệu', obj: tui, neo: [-0.7, 0, 0.7], tach: [0, 0, 0],
      chucNang: 'Nguyên liệu cho vào túi lọc vải (cotton), đặt xen giữa các bản có rãnh (bài ghi là "tự bổ sung": Cần kiểm tra). Tốn nhiều lao động chuẩn bị, ép, tháo bã, làm sạch.' },
  ];
  var bpBy = {}; boPhan.forEach(function (b) { bpBy[b.id] = b; });

  // chu kỳ ép: 4 bậc tăng áp rồi nhả; c ∈ [0,1]
  var CHU_KY = 12, BAC = [0.25, 0.5, 0.75, 1.0];
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function apSuat(tg) {
    var ph = (tg % CHU_KY) / CHU_KY; if (ph >= 0.92) return 1 - sm((ph - 0.92) / 0.08);
    var t = ph / 0.92 * 4, i = Math.min(3, Math.floor(t)), f = t - i, pre = i ? BAC[i - 1] : 0;
    return pre + (BAC[i] - pre) * sm(f / 0.35);
  }
  function capNhat(tg, e) {
    var c = apSuat(tg) * (1 - e); bocuc(c, e);
    KIND.forEach(function (k, u) {
      var y = Ly.yc[u];
      if (k === 'p') tam[u].position.y = y; else if (k === 'c') bia[u].position.y = y;
      else { tuiM[u].position.y = y; tuiM[u].scale.y = Ly.hb; }
      if (ranhNhom[u]) ranhNhom[u].position.y = y + hOf(u, Ly.hb) / 2 + 0.007;
    });
    xa.position.y = 1.12 + 0.55 * e;
    var dai = Math.max(0.02, Ly.bottom - ROD_BASE); can.scale.y = dai; can.position.y = ROD_BASE + dai / 2;
    var san0 = TRAY_FLOOR - 0.55 * e, cao = Ly.top + 0.1 - san0; kenh.scale.y = cao; kenh.position.y = san0 + cao / 2;
    bpBy.ban.neo[1] = Ly.yc[4]; bpBy.bia.neo[1] = Ly.yc[10]; bpBy.tui.neo[1] = Ly.yc[3]; bpBy.ranh.neo[1] = (san0 + Ly.top) / 2;
  }
  capNhat(0, 0);

  // ---------- hạt ----------
  function rgb(hex) { var c = ctx.lin(hex); return [c.r, c.g, c.b]; }
  var MAU = { bot: rgb('#E6C46B'), dich: rgb('#FFB020'), ba: rgb('#9B7B4A') };
  var THOI = [1.0, 1.1, 1.5, 0.9, 2.2];
  function lerp(a, b, u) { return a + (b - a) * u; }
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  function mix(a, b, m) { return [lerp(a[0], b[0], m), lerp(a[1], b[1], m), lerp(a[2], b[2], m)]; }
  var hat = {
    tiLeDich: 0.78,
    sinh: function (S, i) {
      S.song[i] = 1; S.pha[i] = 0; S.u[i] = 0; S.j[i] = Math.random();
      S.beo[i] = Math.random() < this.tiLeDich ? 1 : 0;
      S.k[i] = Math.floor(Math.random() * 5);                   // túi thứ mấy (0–4)
      S.a0[i] = (Math.random() - 0.5) * 1.05; S.th[i] = (Math.random() - 0.5) * 0.85; // x, z trong túi
    },
    buoc: function (S, i, dt) {
      var p = S.pha[i], j = S.j[i], dich = S.beo[i], kb = S.k[i];
      var u = S.u[i] + dt / (THOI[p] * (0.8 + 0.4 * j));
      if (u >= 1) { if (p < 4) { S.pha[i] = p + 1; S.u[i] = 0; return this.buoc(S, i, 0); } S.song[i] = 0; S.s[i] = 0; return; }
      S.u[i] = u;
      var x0 = S.a0[i], z0 = S.th[i], ub = 2 * kb + 1, yb = Ly.yc[ub], surf = Ly.yc[ub - 1] + hOf(ub - 1, Ly.hb) / 2 + 0.02;
      var gx = Math.max(-0.5, Math.min(0.5, Math.round(x0 / 0.25) * 0.25));
      var x = x0, y = yb, z = z0, c = MAU.bot, gl = 0, s = 1;
      if (p === 0) { y = yb + (j - 0.5) * Ly.hb * 0.5; }
      else if (dich) {
        if (p === 1) { var e1 = ease(u); x = lerp(x0, gx, e1); y = lerp(yb, surf, e1); c = mix(MAU.bot, MAU.dich, u); gl = 0.7 * u; }
        else if (p === 2) { x = gx; y = surf; z = lerp(z0, 0.8, ease(u)); c = MAU.dich; gl = 0.7; }
        else if (p === 3) { x = gx; z = 0.8 + (j - 0.5) * 0.03; y = lerp(surf, TRAY_FLOOR + 0.02, u * u); c = MAU.dich; gl = 0.7; }
        else {
          c = MAU.dich; gl = 0.7; z = 0.8;
          if (u < 0.45) { var e2 = ease(u / 0.45); x = lerp(gx, 1.0, e2); z = lerp(0.8, 0.05, e2); y = TRAY_FLOOR + 0.02; }
          else if (u < 0.8) { var e3 = (u - 0.45) / 0.35; x = lerp(1.0, 1.72, e3); z = 0; y = -0.78; }
          else { var e4 = (u - 0.8) / 0.2; x = 1.75; z = 0; y = lerp(-0.78, -1.9, e4 * e4); }
        }
      } else { // bã: nằm lại trong túi, sẫm màu, mờ dần
        c = mix(MAU.bot, MAU.ba, Math.min(1, p / 2 + u / 2)); y = yb + (j - 0.5) * Ly.hb * 0.3; s = p >= 3 ? Math.max(0, 1 - u * (p === 3 ? 0.4 : 1.5)) : 1;
      }
      S.x[i] = x; S.y[i] = y; S.z[i] = z; S.cr[i] = c[0]; S.cg[i] = c[1]; S.cb[i] = c[2]; S.gl[i] = gl; S.s[i] = s;
    },
  };

  return {
    ten: 'Thiết bị ép khung bản (ép gián đoạn)',
    camera: { pos: [4.5, 1.7, 5.6], target: [0, -0.4, 0] },
    boPhan: boPhan, trangTri: trangTri, hat: hat, omega: 0, capNhat: capNhat,
    chuThichDoThi: 'Số hạt ra mỗi nơi',
    chuThichMau: [['#FFB020', 'Dịch ép (ra cửa thoát)'], ['#9B7B4A', 'Bã (vải lọc giữ lại)']],
    buoc: [
      { ten: 'Nguyên liệu cho vào túi lọc vải, đặt xen giữa các bản có rãnh', pha: [0], bp: 'tui' },
      { ten: 'Lực ép thủy lực tác dụng từ một đầu, tăng áp từng giai đoạn: dịch bị ép qua vải', pha: [1], bp: 'luc' },
      { ten: 'Dịch chạy theo rãnh trên bản tới kênh thu hồi', pha: [2], beo: 1, bp: 'ranh' },
      { ten: 'Dịch rơi xuống khay', pha: [3], beo: 1, bp: 'khay' },
      { ten: 'Dịch ra khỏi khay qua cửa thoát', pha: [4], beo: 1, bp: 'cua' },
      { ten: 'Bã nằm lại trong túi lọc vải (tháo bã sau mỗi mẻ)', pha: [2, 3, 4], beo: 0, bp: 'tui' },
    ],
  };
};
