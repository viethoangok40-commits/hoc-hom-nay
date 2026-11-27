/* Mô hình: HIỆU ỨNG CHAI MỰC (vòng trễ hấp phụ – giải hấp) – bài D009, Cảnh 2.2. Thay hoạt hình 2D hoat-hinh/chai-muc.svg.
   NGUỒN BÀI (khẳng định của bài): ở cùng RH trung bình, lỗ có cổ hẹp chứa ít nước khi hấp phụ nhưng đầy nước khi giải hấp, vì cổ hẹp giữ nước của khoang rộng lại. Bán kính tới hạn tăng theo RH (phương trình Kelvin):
   lỗ nào nhỏ hơn bán kính tới hạn đều đầy nước. Nguồn: Pöllmann, Reinelt, Briesen 2022, Materials 15(17):6031 mục 2.5 và 3; Schiraldi và cs. 2012.
   Cách vẽ của album (không phải số đo): chai thủy tinh một cổ, hai ngưỡng RH (cổ đầy ở khoảng 35%, khoang đầy ở khoảng 65%) chỉ để mô hình có hành vi định tính; bài ghi "nhãn RH chỉ định tính, không gắn số",
   nên mô hình KHÔNG hiển thị số RH (thanh trượt hiện chữ thấp, trung bình, cao). Lịch sử RH quyết định trạng thái: kéo thanh RH lên rồi xuống để thấy vòng trễ. Chưa kéo thanh thì RH tự dao động lên rồi xuống. Một lỗ lý tưởng, nước vẽ bằng khối co giãn. */
(window.HHN_MAY_LIB = window.HHN_MAY_LIB || {})['chai-muc'] = function (T, ctx) {
  'use strict';
  var M = ctx.mat, U = ctx.u, V2 = T.Vector2;
  function can(x, o) { return M.son(x, Object.assign({ metalness: 0.05, roughness: 0.4 }, o || {})); }
  function mo(x, op, o) { return can(x, Object.assign({ transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide }, o || {})); }
  function lathe(pts, mat) { return new T.Mesh(new T.LatheGeometry(pts.map(function (p) { return new V2(p[0], p[1]); }), 48), mat); }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var TN = 0.35, TK = 0.65;                                          // ngưỡng RH định tính: cổ hẹp, khoang rộng
  // chai (chỉ vỏ thủy tinh): khoang rộng cao 2.6, cổ hẹp từ 2.6 đến 4.3
  var vo = [[0.01, 0], [0.9, 0.05], [1.3, 0.8], [1.3, 1.6], [0.9, 2.3], [0.4, 2.6], [0.36, 2.8], [0.36, 4.3]];
  var glassCham = lathe(vo.slice(0, 6), mo(0xCFE8F5, 0.22)), glassCo = lathe(vo.slice(5), mo(0xCFE8F5, 0.22));
  // màng nước mỏng bám thành (luôn có khi RH > 0)
  var film = lathe(vo.map(function (p) { return [Math.max(0.01, p[0] - 0.04), p[1]]; }), mo(0x4FC3F7, 0.1));
  // nước đầy khoang (co theo trục y từ đáy) và đầy cổ
  var wC = lathe([[0.01, 0.03], [0.82, 0.08], [1.2, 0.8], [1.2, 1.6], [0.82, 2.3], [0.33, 2.58], [0.01, 2.58]], mo(0x1E88E5, 0.62));
  var wN = new T.Mesh(new T.CylinderGeometry(0.31, 0.31, 1.7, 24), mo(0x1E88E5, 0.62)); wN.geometry.translate(0, 0.85, 0); wN.position.y = 2.6;
  var cham = new T.Group(), co = new T.Group(), nuoc = new T.Group();
  cham.add(glassCham); cham.add(wC); co.add(glassCo); co.add(wN); nuoc.add(film);
  cham.userData.xuyen = 0.22; co.userData.xuyen = 0.22;
  // thang RH: ống đo bên trái, muc xanh dâng theo RH, hai vạch ngưỡng (không ghi số)
  var tt = new T.Group(), ong = new T.Mesh(new T.CylinderGeometry(0.16, 0.16, 4.3, 20), mo(0xDDEEFF, 0.2)); ong.position.set(-3.3, 2.15, 0); tt.add(ong);
  var muc = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 4.3, 20), can(0x4FC3F7, { emissive: 0x0288D1, emissiveIntensity: 0.5 })); muc.geometry.translate(0, 2.15, 0); muc.position.set(-3.3, 0, 0); tt.add(muc);
  [[TN, 0xFFEB3B], [TK, 0xFF7043]].forEach(function (p) { var r = new T.Mesh(new T.TorusGeometry(0.22, 0.02, 8, 24), can(p[1], { emissive: p[1], emissiveIntensity: 0.4 })); r.rotation.x = Math.PI / 2; r.position.set(-3.3, p[0] * 4.3, 0); tt.add(r); });
  tt.add(U.box(9, 0.08, 4, can(0x1E262E), [0, -0.05, 0]));
  var st = { rh: 0, neck: 0, cham: 0, tay: null, auto: true };
  function capNhat(tg, e, val) {
    var rh;
    if (val && st.tay === null) st.tay = val.rh;
    if (val && val.rh !== st.tay) st.auto = false;                  // người học đã kéo thanh RH
    if (st.auto) { var u = (tg % 20) / 20; rh = u < 0.45 ? sm(u / 0.45) : u < 0.5 ? 1 : u < 0.95 ? 1 - sm((u - 0.5) / 0.45) : 0; } else rh = val ? val.rh / 100 : 0;
    st.rh = rh;
    var tn = st.neck, tc = st.cham;
    if (rh >= TN) tn = 1; else if (rh < TN - 0.02) tn = 0;                                   // cổ chỉ rỗng khi RH xuống dưới ngưỡng cổ
    if (rh >= TK && st.neck > 0.9) tc = 1; else if (rh < TN - 0.02 && st.neck < 0.05) tc = 0;  // khoang chỉ rỗng khi cổ đã trống
    var k = 0.06;
    st.neck += (tn - st.neck) * k; st.cham += (tc - st.cham) * k;
    wN.scale.y = Math.max(0.001, st.neck); wC.scale.y = Math.max(0.001, st.cham);
    film.material.opacity = 0.05 + 0.35 * sm(rh * 2);
    muc.scale.y = Math.max(0.001, rh);
  }
  capNhat(0, 0, { rh: 0 });
  return {
    ten: 'Hiệu ứng chai mực', camera: { pos: [0.8, 2.4, 10.5], target: [-0.6, 2.0, 0] }, khoangCachMax: 16,
    dieuKhien: [{ id: 'rh', nhan: 'Độ ẩm tương đối RH', min: 0, max: 100, buoc: 1, mac: 0, don: '', chu: function (v) { return v < 15 ? 'thấp' : v < 45 ? 'khá thấp' : v < 75 ? 'trung bình' : v < 92 ? 'cao' : 'rất cao'; } }],
    boPhan: [
      { so: 1, id: 'cohep', ten: 'Cổ hẹp', obj: co, neo: [0.9, 4.0, 0], tach: [0.8, 0.8, 0], chucNang: 'Đầy nước khi bán kính tới hạn đủ lớn cho cổ; giữ nước của khoang rộng lại khi RH giảm.' },
      { so: 2, id: 'khoangrong', ten: 'Khoang rộng', obj: cham, neo: [1.7, 1.2, 0], tach: [0.9, 0, 0], chucNang: 'Chỉ đầy khi RH đủ cao; khi RH giảm, nước chỉ thoát sau khi cổ hẹp trống.' },
      { so: 3, id: 'mangmong', ten: 'Màng nước mỏng', obj: nuoc, neo: [-1.4, 0.4, 0], tach: [-0.8, 0, 0], chucNang: 'Ở RH thấp lỗ khô, chỉ có màng nước mỏng bám thành.' },
    ],
    trangTri: [tt], capNhat: capNhat, omega: 0,
    hat: { sinh: function (S, i) { S.song[i] = 0; S.s[i] = 0; }, buoc: function (S, i) { S.song[i] = 0; S.s[i] = 0; } },
    chuThichMau: [['#1E88E5', 'Nước trong lỗ'], ['#FFEB3B', 'Vạch ngưỡng cổ hẹp (vạch cam: khoang rộng)']],
    buoc: [
      { ten: 'RH thấp: lỗ khô, chỉ có màng nước mỏng bám thành', pha: [], bp: 'mangmong' },
      { ten: 'RH trung bình khi tăng: cổ hẹp đầy trước, khoang rộng còn khí', pha: [], bp: 'cohep' },
      { ten: 'RH cao: cả lỗ đầy nước', pha: [], bp: 'khoangrong' },
      { ten: 'RH giảm về trung bình: khoang vẫn đầy vì cổ đầy chặn lối thoát', pha: [], bp: 'khoangrong' },
      { ten: 'RH giảm rất thấp: cổ trống, nước trong khoang thoát hết', pha: [], bp: 'cohep' },
    ],
  };
};
