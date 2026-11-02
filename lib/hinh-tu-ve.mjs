// Dự phòng: tự vẽ hình phấn khi file hình được nhắc trong [HÌNH: ...] không có kèm.
// Chọn kiểu hình theo tên file + phần "nhấn", lấy chữ từ "Chữ trên bảng" của ý đi kèm.
import { esc, deAccent } from './nhung.mjs';

const C = { chalk: '#F2EFE6', dim: '#B9C7BD', yel: '#F2C94C', red: '#E86A5A', blu: '#7FB8E0', grn: '#8FD18B', org: '#F2994A' };
const W = 640, H = 420;

function accent(nhan) {
  const n = deAccent(nhan || '').toLowerCase();
  if (/xanh duong|xanh lam/.test(n)) return C.blu;
  if (/xanh la/.test(n)) return C.grn;
  if (/cam do|do\b/.test(n)) return C.red;
  if (/\bcam\b/.test(n)) return C.org;
  return C.yel;
}
const clean = (s) => String(s || '').replace(/\s*\((vàng|xanh dương|xanh lá|cam đỏ|cam|đỏ|xanh lam)\)\s*/gi, ' ').replace(/\s+/g, ' ').trim();
function cut(s, n) { s = clean(s); return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s; }
function txt(x, y, s, size, fill, extra = '') {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="middle" font-family="'Be Vietnam Pro','Segoe UI',Arial,sans-serif" ${extra}>${esc(s)}</text>`;
}
const st = (color = C.chalk, w = 4) => `fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

function labelsFrom(board, nhan) {
  const raw = (board || []).join(' / ');
  let parts = raw.split(/\s*(?:·|\/|;|\+)\s*/).map((x) => x.replace(/^\d+\s+đối tượng:\s*/i, '').replace(/^[^:]{1,18}:\s*/, (m) => m)).map(clean).filter(Boolean);
  if (parts.length < 2 && nhan) parts = [clean(nhan)];
  return parts;
}
function countWord(name) {
  const n = deAccent(name).toLowerCase();
  const m = { hai: 2, ba: 3, bon: 4, nam: 5, sau: 6 };
  for (const k of Object.keys(m)) if (new RegExp('(^|-)' + k + '(-|$)').test(n)) return m[k];
  return 0;
}

const kinds = [
  ['quiz', /quiz|trac-nghiem|kiem-tra/],
  ['nhietke', /nhiet-ke|nhiet-do/],
  ['congthuc', /cong-thuc|phuong-trinh|formula/],
  ['dongho', /dong-ho|thoi-gian|phut/],
  ['cot', /cot-|so-dem|bieu-do|do-thi|flux|tro-luc|chart/],
  ['canhbao', /canh-bao|ngon-lua|nguy/],
  ['rotor', /ly-tam|ong-quay|quay|dia|rotor|vanh/],
  ['mang', /mang|membrane|loc|vach|bot-tro|tap-trung|khuech-tan/],
  ['ly', /(^|-)ly-|nuoc|vang|sua|coc|oi\b/],
  ['dong', /tau|oto|dong-chay|duong|ngang|dong-/],
  ['the', /(^|-)the-|bai-doc|tu-vung|bai-mau|kinh-lup|gian-do/],
  ['hop', /bon-|ba-|hai-|nam-|tong-ket|thang|muc-dich|tieu-chi|yeu-to|ung-dung|doi-tuong/],
];
export function pickKind(file, nhan) {
  const n = deAccent(file + ' ' + (nhan || '')).toLowerCase().replace(/\.(svg|png|jpe?g|gif|webp)$/, '');
  for (const [k, re] of kinds) if (re.test(n)) return k;
  return 'hop';
}

const draw = {
  nhietke(a, ctx) {
    const mark = clean(ctx.nhan).match(/[−-]?\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+)?\s*°C/) || clean((ctx.board || []).join(' ')).match(/[−-]?\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+)?\s*°C/);
    return `<g class="buoc"><rect x="290" y="34" width="60" height="270" rx="30" ${st()} class="ve"/><circle cx="320" cy="330" r="46" ${st()} class="ve"/></g>
<g class="buoc">${[80, 120, 160, 200, 240].map((y) => `<line x1="350" y1="${y}" x2="372" y2="${y}" ${st(C.dim, 3)} class="ve"/>`).join('')}</g>
<g class="buoc dong-len"><line x1="320" y1="320" x2="320" y2="130" ${st(a, 14)} class="ve"/><circle cx="320" cy="330" r="30" fill="${a}" opacity=".85"/></g>
<g class="buoc"><line x1="250" y1="130" x2="380" y2="130" ${st(a, 4)} stroke-dasharray="8 8"/>${txt(470, 140, mark ? mark[0] : cut(ctx.nhan, 14), 34, a)}</g>`;
  },
  congthuc(a, ctx) {
    const f = (ctx.board && ctx.board.find((l) => /=/.test(l))) || (ctx.board || [])[0] || clean(ctx.nhan);
    const size = f.length > 22 ? 40 : 58;
    return `<g class="buoc"><path d="M90 90 Q320 70 550 92 Q560 210 548 318 Q320 332 92 316 Q80 200 90 90Z" ${st(C.dim, 3)} class="ve"/></g>
<g class="buoc">${txt(320, 215, cut(f, 34), size, C.chalk)}</g>
<g class="buoc"><path d="M150 250 Q320 266 490 248" ${st(a, 5)} class="ve"/></g>`;
  },
  dongho(a) {
    return `<g class="buoc"><circle cx="320" cy="200" r="150" ${st()} class="ve"/>${Array.from({ length: 12 }, (_, i) => { const t = (i * Math.PI) / 6; return `<line x1="${(320 + 128 * Math.sin(t)).toFixed(1)}" y1="${(200 - 128 * Math.cos(t)).toFixed(1)}" x2="${(320 + 142 * Math.sin(t)).toFixed(1)}" y2="${(200 - 142 * Math.cos(t)).toFixed(1)}" ${st(C.dim, 3)} class="ve"/>`; }).join('')}</g>
<g class="buoc"><line x1="320" y1="200" x2="320" y2="120" ${st(C.chalk, 6)} class="ve"/></g>
<g class="buoc dong-quay" style="transform-origin:320px 200px"><line x1="320" y1="200" x2="410" y2="200" ${st(a, 5)} class="ve"/></g><circle cx="320" cy="200" r="8" fill="${a}"/>`;
  },
  cot(a, ctx) {
    const nums = (clean(ctx.nhan) + ' ' + (ctx.board || []).join(' ')).match(/[+−-]?\d+(?:[.,]\d+)?\s*%?/g) || [];
    const hs = [90, 150, 230];
    return `<g class="buoc"><path d="M110 330 L540 330 M110 330 L110 60" ${st(C.dim, 4)} class="ve"/></g>
${hs.map((h, i) => `<g class="buoc dong-len"><rect x="${170 + i * 120}" y="${330 - h}" width="70" height="${h}" ${st(i === 2 ? a : C.chalk, 4)} class="ve"/>${i === 2 && nums.length ? txt(205 + i * 120, 330 - h - 16, nums[nums.length - 1].trim(), 30, a) : ''}</g>`).join('')}`;
  },
  canhbao(a) {
    return `<g class="buoc"><path d="M320 60 L520 340 L120 340 Z" ${st(a, 6)} class="ve"/></g><g class="buoc"><line x1="320" y1="150" x2="320" y2="250" ${st(a, 12)} class="ve"/><circle cx="320" cy="292" r="9" fill="${a}"/></g>`;
  },
  rotor(a) {
    return `<g class="buoc"><circle cx="320" cy="200" r="150" ${st()} class="ve"/><circle cx="320" cy="200" r="95" ${st(C.dim, 3)} stroke-dasharray="10 10" class="ve"/></g>
<g class="buoc dong-quay" style="transform-origin:320px 200px">${[0, 1, 2, 3].map((i) => { const t = (i * Math.PI) / 2; return `<line x1="320" y1="200" x2="${(320 + 140 * Math.cos(t)).toFixed(1)}" y2="${(200 + 140 * Math.sin(t)).toFixed(1)}" ${st(a, 5)} class="ve"/>`; }).join('')}<circle cx="452" cy="200" r="10" fill="${C.blu}"/><circle cx="188" cy="200" r="10" fill="${C.blu}"/><circle cx="320" cy="270" r="6" fill="${C.chalk}"/></g>
<circle cx="320" cy="200" r="14" fill="${a}"/>`;
  },
  mang(a) {
    const big = [[180, 130], [140, 210], [210, 270], [170, 320], [230, 170]];
    const small = [[150, 160], [200, 230], [250, 300], [120, 280]];
    return `<g class="buoc"><line x1="330" y1="50" x2="330" y2="360" ${st(C.chalk, 6)} stroke-dasharray="18 12" class="ve"/></g>
<g class="buoc">${big.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" ${st(a, 4)} class="ve"/>`).join('')}</g>
<g class="buoc dong-phai">${small.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.blu}"/>`).join('')}</g>
<g class="buoc"><path d="M380 200 L520 200 M500 184 L520 200 L500 216" ${st(C.blu, 4)} class="ve"/></g>`;
  },
  ly(a) {
    return `<g class="buoc"><path d="M230 80 L410 80 L380 340 L260 340 Z" ${st()} class="ve"/></g>
<g class="buoc dong-len"><path d="M246 170 L394 170 L378 330 L262 330 Z" fill="${a}" opacity=".35"/><path d="M246 170 Q320 186 394 170" ${st(a, 4)} class="ve"/></g>`;
  },
  dong(a) {
    return [110, 200, 290].map((y, i) => `<g class="buoc dong-phai"><path d="M140 ${y} L470 ${y} M444 ${y - 20} L472 ${y} L444 ${y + 20}" ${st(i === 1 ? a : C.chalk, 5)} class="ve"/></g>`).join('');
  },
  the(a, ctx) {
    const ls = labelsFrom(ctx.board, ctx.nhan).slice(0, 3);
    return `<g class="buoc"><rect x="110" y="60" width="420" height="290" rx="18" ${st()} class="ve"/></g>
${ls.map((l, i) => `<g class="buoc">${txt(320, 140 + i * 70, cut(l, 28), i === 0 ? 36 : 28, i === 0 ? a : C.chalk)}</g>`).join('')}
${ls.length ? '' : `<g class="buoc">${[140, 200, 260].map((y) => `<line x1="160" y1="${y}" x2="480" y2="${y}" ${st(C.dim, 3)} class="ve"/>`).join('')}</g>`}`;
  },
  quiz(a) {
    return [0, 1, 2, 3].map((i) => `<g class="buoc"><rect x="150" y="${70 + i * 75}" width="44" height="44" rx="8" ${st()} class="ve"/><line x1="220" y1="${92 + i * 75}" x2="${470 - (i % 2) * 60}" y2="${92 + i * 75}" ${st(C.dim, 4)} class="ve"/>${i === 1 ? `<path d="M158 ${168} L172 ${183} L198 ${150}" ${st(C.grn, 6)} class="ve"/>` : ''}</g>`).join('');
  },
  hop(a, ctx) {
    let ls = labelsFrom(ctx.board, ctx.nhan);
    const n = Math.max(2, Math.min(6, countWord(ctx.file) || ls.length || 3));
    ls = ls.slice(0, n);
    while (ls.length < n) ls.push('');
    const cols = n <= 3 ? n : Math.ceil(n / 2), rows = n <= 3 ? 1 : 2;
    const bw = Math.min(170, (520 - (cols - 1) * 24) / cols), bh = rows === 1 ? 150 : 118;
    const x0 = (W - (cols * bw + (cols - 1) * 24)) / 2, y0 = rows === 1 ? 130 : 70;
    const em = clean(ctx.nhan).toLowerCase();
    return ls.map((l, i) => {
      const c = i % cols, r = Math.floor(i / cols), x = x0 + c * (bw + 24), y = y0 + r * (bh + 26);
      const hot = l && em && (em.includes(l.toLowerCase()) || l.toLowerCase().includes(em.split(' ')[0]));
      const words = cut(l, 30).split(' '); const lines = []; let cur = '';
      for (const w of words) { if ((cur + ' ' + w).trim().length > Math.floor(bw / 14)) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
      if (cur.trim()) lines.push(cur.trim());
      const t = lines.slice(0, 3).map((s, k) => txt(x + bw / 2, y + bh / 2 + 10 + (k - (Math.min(lines.length, 3) - 1) / 2) * 28, s, 26, hot ? a : C.chalk)).join('');
      return `<g class="buoc"><rect x="${x.toFixed(1)}" y="${y}" width="${bw.toFixed(1)}" height="${bh}" rx="16" ${st(hot ? a : C.chalk, hot ? 5 : 4)} class="ve"/>${t}</g>`;
    }).join('');
  },
};

/** Trả về chuỗi <svg> tự vẽ. ctx: { file, nhan, board[] } */
export function autoFig(ctx) {
  const k = pickKind(ctx.file, ctx.nhan);
  const a = accent(ctx.nhan);
  const body = draw[k](a, ctx);
  const cap = clean(ctx.nhan);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" data-kieu="${k}" role="img" aria-label="${esc(cap || ctx.file)}"><g filter="url(#phan)">${body}</g>${cap ? `<g class="buoc">${txt(320, 404, cut(cap, 46), 26, a, 'opacity=".95"')}</g>` : ''}</svg>`;
}
