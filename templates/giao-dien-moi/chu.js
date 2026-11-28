/* Giao diện mới cho trang chủ: thay phần hiển thị bằng lộ trình học, dựng từ dữ liệu #data của trang chủ và tiến độ thật trong localStorage (khóa album3:<mã bài>).
   Không sửa templates/index.html. Không có dữ liệu tiến độ thì không hiện dấu đã học. */
(function () {
  'use strict';
  var node = document.getElementById('data'); if (!node) return;
  var D; try { D = JSON.parse(node.textContent); } catch (e) { return; }
  var items = (D.items || []).slice(); if (!items.length) return; // chưa có bài: giữ nguyên trang cũ
  function el(t, c, txt) { var n = document.createElement(t); if (c) n.className = c; if (txt != null) n.textContent = txt; return n; }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  var LOAI = { cntp: 'Bàn học CNTP', rnd: 'R&D Food Lab', khac: 'Khác' };
  var today; try { today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); } catch (e) { today = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10); }
  function ngay(ymd) { var a = ymd.split('-'); return a[2] + '/' + a[1]; }
  function nhom(it) { return it.nhom || (/^CNTP-/i.test(it.md || '') ? 'cntp' : /^D0/i.test(it.md || '') ? 'rnd' : 'khac'); }
  items.forEach(function (it) {
    it.g = nhom(it); it.ten = it.topic || it.title;
    var S = null; try { S = JSON.parse(get('album3:' + it.code)); } catch (e) { }
    var seen = (S && S.seen) || {};
    it.tt = seen.end || seen.rev ? 'xong' : Object.keys(seen).some(function (k) { return /^c\d+:/.test(k); }) ? 'dang' : '';
    it.on = 0; // số mốc ôn đã đến hạn mà chưa đánh dấu
    if (S && S.first) { var goc = new Date(S.first); goc.setHours(0, 0, 0, 0); [1, 3, 7, 21].forEach(function (d) { if (Date.now() >= goc.getTime() + d * 864e5 && !(S.done || {})[d]) it.on++; }); }
  });
  var moi = items.filter(function (x) { return x.date <= today; })[0] || items[0];
  var dang = items.filter(function (x) { return x.tt === 'dang'; })[0];
  [].slice.call(document.body.children).forEach(function (c) { if (c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE') c.remove(); }); // bỏ hẳn giao diện cũ (kể cả khung iframe tự mở bài)
  document.body.classList.add('gdm');
  var main = el('main', 'gdm-main'); document.body.insertBefore(main, document.body.firstChild);
  var dau = el('header'); dau.appendChild(el('div', 'gdm-nhan', 'HỌC HÔM NAY')); dau.appendChild(el('h1', null, 'Lộ trình của bạn')); main.appendChild(dau);
  function the(it, nhan, chuNut, lop) {
    var a = el('a', 'gdm-hero ' + it.g + ' ' + (lop || '')); a.href = it.f;
    var t = el('span'); t.appendChild(el('small', null, nhan + ' · ' + LOAI[it.g] + ' · ' + ngay(it.date))); t.appendChild(el('b', null, it.ten));
    a.appendChild(t); a.appendChild(el('span', 'gdm-di', chuNut)); return a;
  }
  var cungNgay = items.filter(function (x) { return x.date === moi.date; });
  cungNgay.forEach(function (it) { main.appendChild(the(it, moi.date === today ? 'Bài hôm nay' : 'Bài mới nhất', it.tt === 'dang' ? 'Học tiếp' : 'Học ngay')); });
  if (dang && cungNgay.indexOf(dang) < 0) main.appendChild(the(dang, 'Đang học dở', 'Học tiếp', 'phu'));
  var canOn = items.filter(function (x) { return x.on > 0; });
  if (canOn.length) {
    var s = el('section', 'gdm-on'); s.appendChild(el('h2', null, 'Đến hạn ôn (' + canOn.length + ' bài)'));
    canOn.slice(0, 5).forEach(function (it) { var a = el('a', it.g); a.href = it.f + '#/rev'; a.appendChild(el('span', null, it.ten)); a.appendChild(el('em', null, 'Ôn ngay')); s.appendChild(a); });
    main.appendChild(s);
  }
  var tab = el('div', 'gdm-tab'); tab.setAttribute('role', 'group'); tab.setAttribute('aria-label', 'Chọn lộ trình'); main.appendChild(tab);
  var duong = el('div'); main.appendChild(duong);
  var nhoms = ['cntp', 'rnd', 'khac'].filter(function (g) { return items.some(function (x) { return x.g === g; }); });
  function ve(g) {
    [].forEach.call(tab.children, function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-g') === g)); });
    duong.textContent = '';
    var ds = items.filter(function (x) { return x.g === g; }), xong = ds.filter(function (x) { return x.tt === 'xong'; }).length;
    duong.appendChild(el('p', 'gdm-dem', ds.length + ' bài · bạn đã đi hết ' + xong + ' bài trên máy này · mới nhất ở trên'));
    var ol = el('ol', 'gdm-duong ' + g);
    ds.forEach(function (it, k) {
      var li = el('li', it.tt), a = el('a'); a.href = it.f;
      var so = (it.md || '').match(/^(?:CNTP-Ngay(\d+)|(D\d+))/i);
      a.appendChild(el('span', 'gdm-cham', it.tt === 'xong' ? '✓' : so ? (so[1] || so[2]) : String(ds.length - k)));
      var c = el('span', 'gdm-o'); c.appendChild(el('b', null, it.ten)); c.appendChild(el('small', null, ngay(it.date) + (it.tt === 'xong' ? ' · đã đi hết' : it.tt === 'dang' ? ' · đang học' : '') + (it.date > today ? ' · bài chuẩn bị trước' : '')));
      a.appendChild(c); li.appendChild(a); ol.appendChild(li);
    });
    duong.appendChild(ol); set('hoc-hom-nay:lo-trinh', g);
  }
  nhoms.forEach(function (g) { var b = el('button', g, LOAI[g]); b.type = 'button'; b.setAttribute('data-g', g); b.addEventListener('click', function () { ve(g); }); tab.appendChild(b); });
  var nho = get('hoc-hom-nay:lo-trinh'); ve(nhoms.indexOf(nho) >= 0 ? nho : moi.g);
  main.appendChild(el('p', 'gdm-chan', items.length + ' bài · dựng lúc ' + D.built + ' (giờ Việt Nam). Tiến độ chỉ lưu trên máy này.'));
  addEventListener('pageshow', function (e) { if (e.persisted) location.reload(); }); // quay lại từ trang bài: đọc lại tiến độ
})();
