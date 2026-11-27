/* Mô hình: HỆ LỌC – VÁCH NGĂN, BỘT TRỢ LỌC, CHÊNH LỆCH ÁP SUẤT – bài CNTP-Ngay01, Cảnh 2.2.
   NGUỒN BÀI (khẳng định của bài, Lê Văn Việt Mẫn và cs. 2011, tr.92–93): vách ngăn có ba dạng (hạt, tấm, vật xốp); bột trợ lọc thông dụng nhất là diatomite (kieselguhr), chủ yếu SiO2;
   động lực lọc là chênh lệch áp suất ΔP = P1 − P2, tạo bằng áp suất thủy tĩnh, bơm hoặc hút chân không.
   KIẾN THỨC NỀN (chỉ để vẽ đúng, KHÔNG thành khẳng định của bài): bột trợ lọc tạo lớp bã xốp giữ hạt rắn mà vẫn cho dịch chảy qua.
   Cách vẽ của album (không phải số đo): vách ngăn vẽ dạng tấm có lỗ; hạt trắng là bột trợ lọc, hạt nâu là chất rắn lơ lửng, giọt xanh là dịch lọc; tốc độ giọt tỷ lệ định tính với ΔP;
   lớp bã dày dần rồi đặt lại. Không vẽ trở lực tăng khi bã dày. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['loc-tro-loc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.1, roughness: 0.5 }, o || {})); }
  function mo(x, op) { return can(x, { transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }); }
  function tru(r, h, mat, y, ho) { var m = new T.Mesh(new T.CylinderGeometry(r, r, h, 48, 1, !!ho), mat); m.position.y = y; return m; }
  var mKim = can(0x90A4AE, { metalness: 0.65, roughness: 0.3 }), mTro = can(0xF5F5F0), mRan = can(0x8D5524), mGiot = can(0x4FC3F7, { emissive: 0x0277BD, emissiveIntensity: 0.4 });
  var R = 1.7, YV = 1.9, i, k;
  var vach = new T.Group(), tro = new T.Group(), apG = new T.Group(), loc = new T.Group(), tt = new T.Group();
  // vách ngăn: vành + các thanh song song (khe là lỗ)
  var vanh = new T.Mesh(new T.TorusGeometry(R, 0.07, 10, 60), mKim); vanh.rotation.x = Math.PI / 2; vanh.position.y = YV; vach.add(vanh);
  for (i = -7; i <= 7; i++) { var x = i * 0.225, h = Math.sqrt(Math.max(0, R * R - x * x)); vach.add(U.tube([x, YV, -h], [x, YV, h], 0.035, mKim)); vach.add(U.tube([-h, YV, x], [h, YV, x], 0.035, mKim)); }
  // lớp bột trợ lọc trên vách
  for (k = 0; k < 150; k++) { var r = (R - 0.14) * Math.sqrt((k * 0.618034) % 1), a = k * 2.399963; tro.add(U.sphere(0.1, mTro, [Math.cos(a) * r, YV + 0.12 + 0.3 * ((k * 0.754877) % 1), Math.sin(a) * r])); }
  // thân lọc, đáy hứng dịch trong
  tt.add(tru(R + 0.08, 2.7, mo(0xCFE8F5, 0.12), YV + 1.3, true)); tt.add(tru(R + 0.16, 0.12, mKim, YV + 2.68, false));
  tt.add(tru(R + 0.08, 1.45, mo(0xCFE8F5, 0.12), 0.82, true)); tt.add(tru(R + 0.12, 0.1, mKim, 0.08, false));
  var nuocTrong = tru(R - 0.02, 1.0, mo(0x4FC3F7, 0.3), 0.6, false); loc.add(nuocTrong);
  var huyenPhu = tru(R - 0.02, 1.7, mo(0xBCAA8A, 0.14), YV + 1.35, false); tt.add(huyenPhu);
  // chất rắn lơ lửng rơi xuống và bị giữ trên lớp trợ lọc
  var ran = []; for (k = 0; k < 70; k++) { var s = U.sphere(0.085, mRan, [0, 0, 0]); tt.add(s); ran.push(s); }
  var giot = []; for (k = 0; k < 30; k++) { var g = U.sphere(0.07, mGiot, [0, 0, 0]); loc.add(g); giot.push(g); }
  // mũi tên áp suất phía trên
  var muiten = [], mAp = can(0xFF7043, { emissive: 0xD84315, emissiveIntensity: 0.5 });
  [[-0.9, 0], [0, 0.6], [0.9, 0], [0, -0.6]].forEach(function (p) { var gg = new T.Group(); gg.add(U.tube([0, 0.75, 0], [0, 0.22, 0], 0.07, mAp)); var c = new T.Mesh(new T.ConeGeometry(0.17, 0.3, 16), mAp); c.rotation.x = Math.PI; c.position.y = 0.1; gg.add(c); gg.position.set(p[0], YV + 2.75, p[1]); apG.add(gg); muiten.push(gg); });
  tt.add(U.box(8, 0.08, 4.6, can(0x1E262E), [0, -0.05, 0]));
  var st = { t: null, q: 0, bam: 0 };
  function capNhat(tg, e, val) {
    var dp = (val ? val.dp : 55) / 100, dt = st.t === null ? 0 : Math.max(0, tg - st.t); st.t = tg;
    st.q += dt * dp; st.bam = (st.bam + dt * dp * 0.055) % 1.15;
    var bam = Math.min(1, st.bam);
    for (k = 0; k < 70; k++) {
      var rr = (R - 0.2) * Math.sqrt((k * 0.569) % 1), a = k * 2.2, dung = YV + 0.45 + 0.28 * ((k * 0.31) % 1), giu = (k / 70) < bam;
      var y = giu ? dung : YV + 0.8 + ((((k * 0.618) % 1) - st.q * 0.12) % 1 + 1) % 1 * 1.5;
      ran[k].position.set(Math.cos(a) * rr + (giu ? 0 : Math.sin(tg + k) * 0.08), y, Math.sin(a) * rr);
    }
    for (k = 0; k < 30; k++) {
      var u = ((st.q * 0.55 + k / 30) % 1 + 1) % 1, r2 = (R - 0.3) * Math.sqrt((k * 0.618) % 1), a2 = k * 2.399963;
      giot[k].visible = dp > 0.02; giot[k].position.set(Math.cos(a2) * r2, YV + 0.35 - u * 1.55, Math.sin(a2) * r2); giot[k].scale.set(1, 1 + 0.5 * dp, 1);
    }
    muiten.forEach(function (m) { m.scale.setScalar(Math.max(0.001, 0.35 + 0.75 * dp)); m.visible = dp > 0.02; });
  }
  capNhat(0, 0, { dp: 55 });
  return {
    ten: 'Hệ lọc: vách ngăn, trợ lọc, ΔP', camera: { pos: [1.0, 4.9, 12.0], target: [0, 2.45, 0] }, khoangCachMax: 18,
    dieuKhien: [{ id: 'dp', nhan: 'Chênh lệch áp suất ΔP', min: 0, max: 100, buoc: 1, mac: 55, don: '', chu: function (v) { return v < 3 ? 'bằng 0' : v < 40 ? 'nhỏ' : v < 75 ? 'vừa' : 'lớn'; } }],
    boPhan: [
      { so: 1, id: 'vachngan', ten: 'Vách ngăn', obj: vach, neo: [-2.2, YV, 0], tach: [-1.2, 0, 0], chucNang: 'Vách ngăn có thể ở dạng hạt, dạng tấm hoặc vật xốp.' },
      { so: 2, id: 'trolocbot', ten: 'Bột trợ lọc (diatomite)', obj: tro, neo: [2.2, YV + 0.45, 0], tach: [1.5, 0.3, 0], chucNang: 'Bột trợ lọc thông dụng nhất là diatomite, chủ yếu SiO₂.' },
      { so: 3, id: 'chenhap', ten: 'Chênh lệch áp suất ΔP', obj: apG, neo: [-1.6, YV + 3.7, 0], tach: [0, 0.9, 0], chucNang: 'Động lực lọc là ΔP = P₁ − P₂, tạo bằng áp suất thủy tĩnh, bơm hoặc hút chân không.' },
      { so: 4, id: 'dichloc', ten: 'Dịch lọc', obj: loc, neo: [2.2, 0.8, 0], tach: [0, -0.2, 1.4], chucNang: 'Phần lỏng đi qua lớp lọc và vách ngăn.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#8D5524', 'Chất rắn lơ lửng'], ['#4FC3F7', 'Dịch lọc']],
    buoc: [
      { ten: 'Huyền phù nằm trên vách ngăn', pha: [], bp: 'vachngan' },
      { ten: 'Bột trợ lọc tạo lớp xốp, chất rắn bị giữ lại', pha: [], bp: 'trolocbot' },
      { ten: 'Chênh lệch áp suất ΔP đẩy phần lỏng đi qua', pha: [], bp: 'chenhap' },
      { ten: 'Dịch lọc chảy ra phía dưới vách', pha: [], bp: 'dichloc' },
    ],
  };
};
