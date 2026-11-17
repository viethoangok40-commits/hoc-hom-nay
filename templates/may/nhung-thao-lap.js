/* Gắn mô hình tháo-lắp 3D vào các khối [MÔ PHỎNG … kiểu: tháo-lắp] của trang bài v3, KHÔNG sửa album-v3.html.
   Bộ dựng chèn: <script id="hhn-tl" type="application/json"> (danh sách mô hình của bài: id, bài, dòng, câu khẳng định, bộ phận, bước) + đoạn mã này.
   Cách ghép: GHÉP THEO CÂU KHẲNG ĐỊNH. Khối .sim do mẫu trang bài dựng; đoạn mã này lấy chữ khẳng định hiển thị trong khối và so KHỚP NGUYÊN VĂN
   (sau khi chuẩn hóa khoảng trắng) với câu khai báo trong bài. Dấu ẩn data-tl-id (bộ dựng gắn vào câu khẳng định) chỉ để nhận ra khối nào là tháo-lắp,
   nhờ đó "không khớp" luôn bị phát hiện thay vì bỏ qua âm thầm.
   Lỗi (hiện khung đỏ role=alert trong trang + console.error, có tên bài và dòng): không có dữ liệu cho id; câu khẳng định trên trang khác câu khai báo;
   trùng khẳng định trong bài (dự phòng khi mẫu trang không giữ dấu id).
   Chữ thay thế luôn có sẵn (đọc được khi không có WebGL). Chỉ tải three.js khi bấm. */
(function () {
  'use strict';
  var node = document.getElementById('hhn-tl'); if (!node) return;
  var L; try { L = JSON.parse(node.textContent); } catch (e) { console.error('[tháo-lắp] không đọc được dữ liệu hhn-tl: ' + e.message); return; }
  var byId = {}; L.forEach(function (s) { byId[s.id] = s; });
  var q = {}, V = { three: '../vendor/three-r147.min.js', addons: '../vendor/three-addons-r147.js', may: '../may/may.js', dir: '../may/', hdr: '../vendor/hdri/studio_small_09_256.hdr' };
  function need(src) {
    if (!src) return Promise.resolve();
    if (q[src]) return q[src];
    return (q[src] = new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.async = true; s.onload = ok; s.onerror = function () { delete q[src]; no(new Error('không tải được ' + src)); }; document.head.appendChild(s); }));
  }
  function norm(t) { return String(t || '').normalize('NFC').replace(/\s+/g, ' ').trim(); }
  function plain(h) { var d = document.createElement('div'); d.innerHTML = h; return norm(d.textContent); }
  function coWebgl() { try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
  function claimText(box) { // chữ khẳng định hiển thị: bỏ nhãn "Khẳng định:", dòng "Nhìn vào" và dấu ẩn
    var cl = box.querySelector('.claim'); if (!cl) return null;
    var c = cl.cloneNode(true); [].forEach.call(c.querySelectorAll('.mu,.tl-id,br'), function (n) { n.remove(); });
    var b = c.querySelector('b'); if (b && /khẳng định/i.test(b.textContent)) b.remove();
    return norm(c.textContent);
  }
  function loi(box, S, why) {
    var where = S ? 'bài ' + S.bai + ', dòng ' + S.dong : 'không rõ bài/dòng';
    var msg = 'LỖI mô hình tháo-lắp' + (S ? ' "' + S.id + '"' : '') + ' (' + where + '): ' + why;
    console.error('[tháo-lắp] ' + msg);
    var w = document.createElement('div'); w.className = 'tl tl-loi'; w.setAttribute('role', 'alert');
    w.innerHTML = '<p><b>LỖI mô hình tháo-lắp</b> (' + where + ')</p><p></p><p class="mu">Mô hình 3D của khối này không mở được cho tới khi sửa lỗi trên.</p>';
    w.children[1].textContent = why;
    box.insertBefore(w, box.querySelector('.lim') || null);
  }
  function moMo(S, btn, msg) {
    if (!coWebgl()) { msg.textContent = 'Máy này không mở được WebGL – hãy đọc danh sách bộ phận và các bước bên dưới.'; return; }
    msg.textContent = 'Đang tải mô hình 3D…'; btn.disabled = true;
    need(window.THREE ? '' : V.three).then(function () { return need(window.THREE && window.THREE.OrbitControls ? '' : V.addons); })
      .then(function () { return need(window.HHN_MAY ? '' : V.may); })
      .then(function () { return need(window.HHN_MAY_LIB && window.HHN_MAY_LIB[S.ma] ? '' : V.dir + S.ma + '.js'); })
      .then(function () {
        var bp = {}; S.bp.forEach(function (b) { bp[b.id] = { ten: plain(b.ten), chucNang: plain(b.chuc), viSao: plain(b.viSao || '') }; });
        msg.textContent = ''; btn.disabled = false;
        window.HHN_MAY.mo(document.body, { ma: S.ma, phongCach: 'ban-ve', buoc: S.buoc.map(plain), boPhan: bp, hdr: V.hdr, reduce: !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches), onClose: function () { try { btn.focus(); } catch (e) {} } });
      })
      .catch(function (e) { btn.disabled = false; msg.textContent = 'Không mở được mô hình 3D (' + e.message + '). Đọc bản chữ bên dưới.'; });
  }
  function mount(box, S) {
    var w = document.createElement('div'); w.className = 'tl';
    w.innerHTML = '<h4>Mô hình tháo lắp 3D</h4>' +
      '<p><button type="button" class="tlb">Mở mô hình 3D</button> <span class="mu tlm" role="status"></span></p>' +
      '<p class="mu">Trong mô hình: kéo thanh <b>Ghép – Tách</b> (phím T) để tháo rời; chạm một bộ phận hoặc bấm phím số để xem chức năng; <b>Chạy</b> (Space) hoặc <b>Từng bước</b> (N) để xem nguyên liệu đi qua máy; Esc để đóng.</p>' +
      '<h5>Bộ phận</h5><ol class="tlbp">' + S.bp.map(function (b) { return '<li><b>' + b.ten + '.</b> ' + b.chuc + (b.viSao ? ' <span class="mu">Vì sao ở đó: ' + b.viSao + '</span>' : '') + '</li>'; }).join('') + '</ol>' +
      '<h5>Các bước vận hành</h5><ol class="tlbu">' + S.buoc.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ol>';
    box.insertBefore(w, box.querySelector('.lim') || null);
    var btn = w.querySelector('.tlb'), msg = w.querySelector('.tlm');
    btn.addEventListener('click', function () { moMo(S, btn, msg); });
  }
  function gan(box) {
    if (box.getAttribute('data-tl')) return;
    var text = claimText(box); if (text === null) return;
    var mk = box.querySelector('.claim [data-tl-id]'), S = null, why = '';
    if (mk) { // khối này là tháo-lắp (có dấu id): bắt buộc khớp câu khẳng định
      var id = mk.getAttribute('data-tl-id'); S = byId[id];
      if (!S) why = 'trang không có dữ liệu cho id "' + id + '"';
      else if (norm(S.khangPlain) !== text) why = 'câu khẳng định hiển thị trên trang ("' + text.slice(0, 80) + '…") KHÁC câu khai báo trong bài ("' + norm(S.khangPlain).slice(0, 80) + '…")';
    } else { // mẫu trang không giữ dấu id → ghép dự phòng theo khẳng định; trùng thì báo lỗi
      var hits = L.filter(function (x) { return norm(x.khangPlain) === text; });
      if (!hits.length) return;
      if (hits.length > 1) why = 'trùng câu khẳng định giữa ' + hits.map(function (x) { return x.bai + ' dòng ' + x.dong; }).join(' và '); else S = hits[0];
    }
    box.setAttribute('data-tl', '1');
    if (why) loi(box, S, why); else mount(box, S);
  }
  function quet() { [].forEach.call(document.querySelectorAll('section.sim:not([data-tl])'), gan); }
  quet();
  try { new MutationObserver(quet).observe(document.body, { childList: true, subtree: true }); } catch (e) { setInterval(quet, 800); }
})();
