/* Giao diện mới cho trang bài v3 (đi kèm bai.css). Chỉ đọc trang đã dựng và tiến độ trong localStorage; không đổi chữ của bài.
   1) Quiz hiện từng câu ở chế độ "Từng ý". 2) Cuối chương (bước Tóm tắt) cho biết câu nào đã nhớ, câu nào cần ôn. 3) Trang mở đầu có thẻ "Học tiếp" và lối về trang chủ. */
(function () {
  'use strict';
  var view = document.getElementById('view'), node = document.getElementById('data');
  if (!view || !node) return;
  var D; try { D = JSON.parse(node.textContent); } catch (e) { return; }
  var CH = (D.v3 && D.v3.chapters) || [], KEY = 'album3:' + (D.code || 'bai');
  function doc() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function el(t, c, txt) { var n = document.createElement(t); if (c) n.className = c; if (txt != null) n.textContent = txt; return n; }
  function nut(txt, cls) { var b = el('button', cls || '', txt); b.type = 'button'; return b; }
  function tuTung() { var b = document.getElementById('mY'); return !b || b.getAttribute('aria-pressed') === 'true'; }
  function chuong() { var m = (location.hash || '').match(/^#\/?c(\d+)/); return m ? +m[1] - 1 : -1; }

  function quiz(sec) {
    var qs = [].filter.call(sec.children, function (x) { return x.classList.contains('q'); });
    if (qs.length < 2 || !tuTung()) return;
    var i = 0, cham = el('div', 'gdm-cham'), nav = el('div', 'gdm-qnav'), truoc = nut('← Câu trước'), sau = nut('Câu tiếp →', 'pri'), dots = [];
    cham.setAttribute('role', 'group'); cham.setAttribute('aria-label', 'Chọn câu hỏi');
    var tl = {}; // trạng thái trong lượt này
    qs.forEach(function (q, k) {
      var d = nut(''); d.setAttribute('aria-label', 'Câu ' + (k + 1)); d.addEventListener('click', function () { i = k; ve(); }); cham.appendChild(d); dots.push(d);
      q.addEventListener('click', function (e) {
        var o = e.target.closest && e.target.closest('button.opt'); if (!o) return;
        tl[k] = o.classList.contains('ok') ? 'dung' : o.classList.contains('no') ? 'sai' : 'xong'; ve();
      });
    });
    function ve() {
      qs.forEach(function (q, k) { q.classList.toggle('gdm-an', k !== i); });
      dots.forEach(function (d, k) { d.className = tl[k] || ''; d.setAttribute('aria-current', String(k === i)); d.setAttribute('aria-label', 'Câu ' + (k + 1) + (tl[k] === 'dung' ? ', đúng' : tl[k] === 'sai' ? ', chưa đúng' : '')); });
      truoc.style.visibility = i ? 'visible' : 'hidden'; sau.style.visibility = i < qs.length - 1 ? 'visible' : 'hidden';
    }
    truoc.addEventListener('click', function () { if (i) { i--; ve(); } });
    sau.addEventListener('click', function () { if (i < qs.length - 1) { i++; ve(); } });
    nav.appendChild(truoc); nav.appendChild(sau);
    sec.insertBefore(cham, qs[0]); sec.insertBefore(nav, qs[qs.length - 1].nextSibling); ve();
  }

  function mucNam(tom) {
    var c = chuong(); if (c < 0 || !CH[c] || !tuTung()) return;
    var S = doc(), box = el('section', 'gdm-nam'), ul = el('ul'), co = false;
    CH[c].extras.forEach(function (e, ei) {
      if (e.k !== 'quiz') return;
      var res = ((S.quiz || {})[e.id] || {}).res || {};
      e.qs.forEach(function (q, k) {
        if (q.loai !== 'trac-nghiem' || !(q.ans >= 0)) return;
        co = true;
        var t = document.createElement('div'); t.innerHTML = q.q;
        var li = el('li'), st = res[k] === 1 ? 'dung' : res[k] === 0 ? 'sai' : '';
        li.appendChild(el('span', null, t.textContent));
        li.appendChild(el('span', 'gdm-muc ' + st, st === 'dung' ? 'Đã nhớ' : st === 'sai' ? 'Cần ôn' : 'Chưa làm'));
        ul.appendChild(li);
      });
    });
    if (!co) return;
    box.appendChild(el('h3', null, 'Bạn nắm chương này tới đâu')); box.appendChild(ul); tom.parentNode.insertBefore(box, tom);
  }

  function moDau() {
    var h = view.querySelector('h1'); if (!h || !/^(#\/?(cover)?)?$/.test(location.hash || '')) return;
    var seen = Object.keys(doc().seen || {}), tiep = null;
    for (var c = 0; c < CH.length && !tiep; c++) if (!seen.some(function (k) { return k.indexOf('c' + c + ':') === 0; })) tiep = c;
    var daHoc = seen.some(function (k) { return /^c\d+:/.test(k); });
    var hero = el('div', 'gdm-hero'), chu = el('div');
    if (tiep === null) { chu.appendChild(el('b', null, 'Bạn đã xem qua các chương')); chu.appendChild(el('span', null, 'Giờ là lúc ôn lại.')); }
    else { chu.appendChild(el('b', null, (daHoc ? 'Học tiếp: ' : 'Bắt đầu: ') + 'Chương ' + CH[tiep].n)); chu.appendChild(el('span', null, CH[tiep].plain || '')); }
    var b = nut(tiep === null ? 'Ôn rải' : daHoc ? 'Học tiếp' : 'Học ngay');
    b.addEventListener('click', function () { location.hash = tiep === null ? '#/rev' : '#/c' + (tiep + 1); });
    hero.appendChild(chu); hero.appendChild(b); view.insertBefore(hero, h.nextSibling ? h.nextSibling.nextSibling : null);
    [].forEach.call(view.children, function (x) { if (x.classList.contains('btnrow')) x.classList.add('gdm-thua'); }); // thẻ đầu trang đã là nút chính
  }

  var dang = false;
  function ap() {
    if (dang) return; dang = true;
    [].forEach.call(view.querySelectorAll('section.quiz:not([data-gdm])'), function (s) { s.setAttribute('data-gdm', '1'); quiz(s); });
    var tom = view.querySelector('section.tom:not([data-gdm])'); if (tom) { tom.setAttribute('data-gdm', '1'); mucNam(tom); }
    if (!view.querySelector('.gdm-hero') && view.querySelector('section.hook:not(.rv)') && /^(#\/?(cover)?)?$/.test(location.hash || '')) moDau();
    dang = false;
  }
  new MutationObserver(ap).observe(view, { childList: true });
  ap();
})();
