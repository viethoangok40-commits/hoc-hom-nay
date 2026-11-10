#!/usr/bin/env node
// HỌC HÔM NAY – dựng album đọc từ bai/*.md thành trang HTML (mỗi bài MỘT file: nhúng hình, font, 3D; chạy offline)
// và trang chủ index.html (mở bài của hôm nay theo giờ Việt Nam).
//
//   node build-album.mjs              dựng vào _site/
//   node build-album.mjs --ra=DIR     dựng vào DIR
//   node build-album.mjs bai/x.md     chỉ dựng file này (vẫn tạo trang chủ đủ mọi bài)
//
// Hình của bài: assets/bai/<mã bài>/<tên>.svg|png|jpg|glb|gltf (hoặc cạnh file .md). Thiếu hình → tự vẽ hình phấn (lib/hinh-tu-ve.mjs).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { ROOT, fontCss, threeJs, molJs, esc, inl, deAccent, jsonForScript } from './lib/nhung.mjs';
import { autoFig } from './lib/hinh-tu-ve.mjs';
import { prefetch, creditHtml } from './lib/nguon-ngoai.mjs';
import { tachHinh } from './lib/anh.mjs';

// thư viện 3D chép ra <ra>/vendor/ và tải lười từ trang bài (bai/*.html → ../vendor/)
const VENDOR_FILES = { three: ['three.min.js', 'three-r147.min.js'], gltf: ['GLTFLoader.js', 'GLTFLoader-r147.js'], mol: ['3Dmol-min.js', '3Dmol-2.5.5.min.js'] };
const VENDOR_URL = Object.fromEntries(Object.entries(VENDOR_FILES).map(([k, [, to]]) => [k, '../vendor/' + to]));
// cảnh máy: addon three.js r147 (examples/js, MIT) gộp một file theo thứ tự phụ thuộc + bộ máy + module từng máy + HDRI nhỏ (CC0)
const ADDONS = ['Pass.js', 'CopyShader.js', 'EffectComposer.js', 'RenderPass.js', 'ShaderPass.js', 'LuminosityHighPassShader.js', 'UnrealBloomPass.js', 'SimplexNoise.js', 'SSAOShader.js', 'SSAOPass.js', 'OrbitControls.js', 'RGBELoader.js', 'RoomEnvironment.js'];
const HDRI = path.join(ROOT, 'assets', 'vendor', 'hdri', 'studio_small_09_256.hdr');
Object.assign(VENDOR_URL, { addons: '../vendor/three-addons-r147.js', may: '../may/may.js', mayDir: '../may/', hdr: '../vendor/hdri/studio_small_09_256.hdr' });
const addonsJs = () => ADDONS.map((f) => `/* ${f} – three.js r147 examples/js (MIT) */\n` + fs.readFileSync(path.join(ROOT, 'assets', 'vendor', 'three-addons', f), 'utf8')).join('\n;\n');
const safeScript = (s) => '<script>' + s.replace(/<\/script/gi, '<\\/script') + '</script>';
function mayJs(mas) { // bản offline: nhúng addon + bộ máy + module các máy có trong bài
  return safeScript(addonsJs()) + safeScript(fs.readFileSync(path.join(ROOT, 'templates', 'may', 'may.js'), 'utf8')) +
    mas.map((m) => safeScript(fs.readFileSync(path.join(ROOT, 'templates', 'may', m + '.js'), 'utf8'))).join('');
}

const IN = path.join(ROOT, 'bai');
const TPL = path.join(ROOT, 'templates', 'album.html');
const HOME_TPL = path.join(ROOT, 'templates', 'index.html');
const p2 = (n) => String(n).padStart(2, '0');
const vnNow = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date());

// ============================================================ ĐỌC MARKDOWN
const SPECIAL = [
  ['tongket', /^tổng kết/i], ['endquiz', /^trắc nghiệm/i], ['dapan', /^đáp án/i], ['doichieu', /^đối chiếu/i],
  ['tudien', /^từ điển/i], ['nguon', /^nguồn tham khảo|^nguồn$/i], ['kiemtra', /^cần kiểm tra/i],
];
const reFig = /^\[(HÌNH|HINH|3D|MÔ HÌNH|MO HINH|MÁY|MAY)\s*:\s*([^\]]+)\]\s*$/i;
// [MÁY: <mã-máy> | nhãn: tất cả | 1, 3, 5 | bước: chữ bước 1; chữ bước 2; … | chỗ | cùng ý] → cảnh mô phỏng máy (templates/may/<mã>.js)
function parseMay(body) {
  const parts = body.split('|').map((x) => x.trim()).filter(Boolean);
  const f = { may: true, ma: '', nhanSo: null, buoc: null, src: '', file: '', loai: '', kieu: '', cho: '', hien: '', cungY: 0, nhan: '', is3d: false, tuVe: false, mols: [] };
  f.ma = deAccent(parts.shift() || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  for (const p of parts) {
    const kv = p.match(/^([^:]{1,16}):\s*(.*)$/); if (!kv) continue;
    const k = deAccent(kv[1]).toLowerCase().trim(), v = kv[2].trim();
    if (k === 'nhan') f.nhanSo = /tat ca|het|all/i.test(deAccent(v)) ? null : (v.match(/\d+/g) || []).map(Number);
    else if (k === 'buoc') f.buoc = v.split(/\s*;\s*/).map((x) => x.trim()).filter(Boolean); // chỉ tách bằng ";" (chữ bước được có "→")
    else if (k === 'cho') f.cho = deAccent(v).toLowerCase();
    else if (k === 'cung y') f.cungY = parseInt(v, 10) || 0;
  }
  return f;
}
// Định dạng hình (đều được):
//   [HÌNH: <url trang nguồn> | file gợi ý | loại | chỗ | hiện | cùng ý | nhấn]   → tải hình gốc, ghi nguồn + giấy phép
//   [HÌNH: tu-ve <tên>.svg | chỗ | hiện | cùng ý | nhấn]                        → tự vẽ nếu chưa có
//   [HÌNH: <tên>.svg | chỗ: trái | hiện: vẽ nét | cùng ý: 1 | nhấn: …]          → kiểu cũ
//   [3D: PubChem CID 962 | PDB 1CRN | kiểu | hiện | cùng ý | nhấn]                → tải tọa độ, dựng mô hình xoay được (3Dmol.js)
//   [3D: <tên>.glb|.gltf | …]                                                     → mô hình glTF (three.js)
const KEYS = { 'cho': 'cho', 'hien': 'hien', 'cung y': 'cungY', 'nhan': 'nhan', 'file': 'file', 'tep': 'file', 'file goi y': 'file', 'ten file': 'file', 'loai': 'loai', 'kieu': 'kieu', 'khang dinh': 'khang', 'chuc nang': 'chucnang', 'nhin': 'nhan' }; // v3: khẳng định / chức năng / nhìn (= nhấn)
const RE_CHO = /^(trai|phai|giua|thay bang|tren|duoi|ben trai|ben phai)$/;
const RE_HIEN = /^(ve net|mo dan|truot vao|dung tung buoc|chuyen dong|xoay|hien ngay|dung yen)$/;
const RE_LOAI = /^(anh|anh chup|so do|hinh ve|bieu do|minh hoa|anh hien vi|ban do|do thi|hinh)\b/;
const RE_KIEU = /\b(que|cau|bang|day|stick|sphere|cartoon|ribbon|line|ball|space|dac)\b/;
function parseFig(s) {
  const m = s.trim().match(reFig); if (!m) return null;
  if (/^M(Á|A)Y$/i.test(m[1])) return parseMay(m[2]);
  const is3d = /3D|MÔ HÌNH|MO HINH/i.test(m[1]);
  const parts = m[2].split('|').map((x) => x.trim()).filter(Boolean);
  const f = { src: '', file: '', loai: '', kieu: '', cho: '', hien: '', cungY: 0, nhan: '', khang: '', chucnang: '', is3d, tuVe: false, mols: [] };
  const set = (k, v) => {
    const d = deAccent(v).toLowerCase().trim();
    if (k === 'cho') f.cho = d; else if (k === 'hien') f.hien = d.replace(/\s+/g, '-'); else if (k === 'cungY') f.cungY = parseInt(v, 10) || 0;
    else if (k === 'kieu') f.kieu = d; else f[k] = v.trim();
  };
  const pos = [];
  for (const p of parts) {
    if (is3d) {
      const c = p.match(/pub\s*chem\s*(?:cid)?\s*[:#]?\s*(\d+)/i) || p.match(/^cid\s*[:#]?\s*(\d+)$/i);
      if (c) { f.mols.push({ db: 'pubchem', id: c[1] }); continue; }
      const d = p.match(/\b(?:pdb|rcsb)\s*(?:id)?\s*[:#]?\s*([0-9][A-Za-z0-9]{3})\b/i);
      if (d) { f.mols.push({ db: 'pdb', id: d[1].toUpperCase() }); continue; }
    }
    const kv = p.match(/^([^:/]{1,16}):\s*(.*)$/);
    if (kv) { const k = KEYS[deAccent(kv[1]).toLowerCase().trim()]; if (k) { set(k, kv[2]); continue; } }
    pos.push(p);
  }
  let first = pos.length && !f.mols.length ? pos.shift() : '';
  if (/^https?:\/\//i.test(first)) f.src = first;
  else if (/^tu[- ]?ve\s+/i.test(deAccent(first))) { f.tuVe = true; f.file = first.replace(/^\S+\s+/, '').trim(); }
  else if (first) f.file = first;
  // các giá trị không nhãn: nhận theo nội dung, còn lại theo thứ tự (loại → nhấn)
  for (const p of pos) {
    const d = deAccent(p).toLowerCase().trim();
    if (!f.file && /^[\w.-]+\.(svg|png|jpe?g|gif|webp|glb|gltf)$/i.test(p)) f.file = p;
    else if (RE_CHO.test(d) && !f.cho) f.cho = d;
    else if (RE_HIEN.test(d) && !f.hien) f.hien = d.replace(/\s+/g, '-');
    else if (/^\d{1,2}$/.test(d) && !f.cungY) f.cungY = +d;
    else if (is3d && RE_KIEU.test(d) && !f.kieu) f.kieu = d;
    else if (!is3d && RE_LOAI.test(d) && !f.loai) f.loai = p;
    else if (!f.nhan) f.nhan = p;
    else f.nhan += ' · ' + p;
  }
  if (/\.(glb|gltf)$/i.test(f.file)) f.is3d = true;
  if (!f.file && f.src) f.file = '';
  return f;
}
function tableRows(lines) {
  const rows = lines.filter((l) => /^\s*\|.*\|\s*$/.test(l)).map((l) => l.trim().slice(1, -1).split('|').map((c) => c.trim()));
  return rows.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)));
}
function mdBlocks(lines) {
  const out = []; let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---+\s*$/.test(l)) { i++; continue; }
    if (/^\s*\|/.test(l)) { const blk = []; while (i < lines.length && /^\s*\|/.test(lines[i])) blk.push(lines[i++]); const rows = tableRows(blk); if (rows.length) out.push('<table class="tb"><thead><tr>' + rows[0].map((c) => `<th>${inl(c)}</th>`).join('') + '</tr></thead><tbody>' + rows.slice(1).map((r) => '<tr>' + r.map((c) => `<td>${inl(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>'); continue; }
    if (/^#{3,6}\s/.test(l)) { out.push(`<h3>${inl(l.replace(/^#+\s*/, ''))}</h3>`); i++; continue; }
    if (/^\s*([-*]|\d+\.)\s/.test(l)) {
      const ordered = /^\s*\d+\./.test(l); const items = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        const x = lines[i];
        if (!/^\s{2,}/.test(x)) items.push({ t: x.replace(/^\s*([-*]|\d+\.)\s+/, ''), sub: [] });
        else items[items.length - 1].sub.push(x.trim().replace(/^([-*]|\d+\.)\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      const subs = (it) => it.sub.filter((s) => !reFig.test(s));
      out.push(`<${tag}>` + items.map((it) => `<li>${reFig.test(it.t) ? '' : inl(it.t)}${subs(it).length ? '<ul>' + subs(it).map((s) => `<li>${inl(s)}</li>`).join('') + '</ul>' : ''}</li>`).join('') + `</${tag}>`);
      continue;
    }
    if (reFig.test(l.trim())) { i++; continue; }
    const para = [l.trim()]; i++;
    while (i < lines.length && lines[i].trim() && !/^\s*(\||[-*]\s|\d+\.\s|#|\[)/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inl(para.join(' '))}</p>`);
  }
  return out.join('\n');
}
function numbered(lines) {
  const items = [], rest = [];
  for (const l of lines) {
    const m = l.match(/^\s{0,1}(\d+)\.\s+(.*)$/);
    if (m) items.push(m[2]);
    else if (/^\s{2,}\S/.test(l) && items.length) items[items.length - 1] += ' ' + l.trim();
    else if (l.trim() && !/^---+$/.test(l.trim()) && !reFig.test(l.trim())) rest.push(l.trim());
  }
  return { items, rest };
}
function parseQuiz(lines) {
  const qs = []; let q = null;
  for (const l of lines) {
    const mq = l.match(/^(\d+)\.\s+(.*)$/), mo = l.match(/^\s+[-*]\s+([A-F])[.)]\s*(.*)$/);
    if (mq) { q = { q: mq[2].trim(), opts: [] }; qs.push(q); } else if (mo && q) q.opts.push(mo[2].trim()); else if (q && /^\s{3,}\S/.test(l) && !q.opts.length) q.q += ' ' + l.trim();
  }
  return qs.filter((x) => x.opts.length >= 2);
}
// "Chữ trên bảng" – mọi kiểu đầu mục: "Chữ trên bảng: a / b", "- **Chữ trên bảng:** a / b", "  - Chữ trên bảng:" (+ các dòng dưới)
const RE_BOARD = /^\s*(?:[-*]\s+)?(?:\*\*)?Chữ trên bảng\s*(?::\s*\*\*|\*\*\s*:|:)\s*(.*)$/i;
function parseScene(title, lines, v3 = false) {
  const mt = title.match(/^(?:Cảnh\s+)?(\d+(?:\.\d+)*)\s*[–—-]\s*(.+)$/);
  const sc = { num: mt ? mt[1] : '', title: (mt ? mt[2] : title).trim(), raw: title, steps: [], figs: [], cite: '', guide: '', quiz: null, notes: [], vai: '', nho: '' };
  if (v3) { // v3: "- **Thẻ:** vai trò" và "- Nhớ: câu cần thuộc" tách riêng; các gạch đầu dòng còn lại = đoạn
    lines = lines.filter((l) => {
      const mv = l.match(/^\s*[-*]\s+\*\*Thẻ\s*:\*\*\s*(.*)$/i); if (mv) { sc.vai = mv[1].trim(); return false; }
      const mn = l.match(/^\s*[-*]\s+Nhớ\s*:\s*(.*)$/); if (mn) { sc.nho = mn[1].trim(); return false; }
      return true;
    });
  }
  const hasQuiz = lines.some((l, i) => /^\d+\.\s/.test(l) && /^\s+[-*]\s+[A-D][.)]/.test(lines[i + 1] || ''));
  let item = null, boardTo = null; const pending = [];
  const step = (s) => { sc.steps.push(s); item = s; };
  for (const l of lines) {
    // "Chữ trên bảng" kiểu xuống dòng: gom các dòng ngay dưới (thụt vào / gạch đầu dòng / dòng thường) tới dòng trống
    if (boardTo) {
      const t = l.trim(), body = t.replace(/^[-*]\s+/, '');
      const end = !t || /^#/.test(t) || /^---+$/.test(t) || reFig.test(body) || /^[-*]\s+\*\*[^*]+?:?\*\*:?/.test(t) || RE_BOARD.test(t);
      if (!end) { boardTo.board.push(...body.split(/\s+\/\s+/).map((x) => x.trim()).filter(Boolean)); continue; }
      boardTo = null;
    }
    if (!hasQuiz) {
      const bh = l.match(RE_BOARD);
      if (bh) {
        const tgt = item || sc.steps[sc.steps.length - 1];
        const rest = bh[1].trim();
        if (tgt) { if (rest) tgt.board.push(...rest.split(/\s+\/\s+/).map((x) => x.trim()).filter(Boolean)); else boardTo = tgt; }
        else console.warn(`  ("Chữ trên bảng" ở cảnh ${sc.num || title} nằm trước mọi ý – bỏ qua)`);
        continue;
      }
    }
    if (!l.trim() || /^---+\s*$/.test(l)) continue;
    const top = /^[-*]\s/.test(l), sub = /^\s{2,}[-*]\s/.test(l);
    if (top) {
      const body = l.replace(/^[-*]\s+/, '');
      const f = parseFig(body); if (f) { pending.push({ f, step: item }); continue; }
      const m = body.match(/^\*\*(.+?):\*\*\s*(.*)$/) || body.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
      if (m) {
        const lab = m[1].trim(), text = m[2].trim(), dl = deAccent(lab).toLowerCase();
        const my = lab.match(/^Ý\s*(\d+)(?:\s*[–—-]\s*(.+))?$/i);
        if (my) step({ type: 'idea', k: +my[1], tag: my[2] || '', text, board: [], cites: [] });
        else if (/^cau mo/.test(dl)) step({ type: 'hook', text, board: [], cites: [] });
        else if (/^the nguon/.test(dl)) { sc.cite = text; item = null; }
        else if (/^cau dan chuyen/.test(dl)) { sc.guide = text; item = null; }
        else if (/^cau hoi dao sau/.test(dl)) step({ type: 'deep', tag: lab, text, board: [], cites: [] });
        else if (/^chu tren bang/.test(dl) && item) item.board.push(...text.split(/\s+\/\s+/));
        else step({ type: 'note', tag: lab, text, board: [], cites: [] });
      } else step({ type: 'idea', k: 0, tag: '', text: body.trim(), board: [], cites: [] });
      continue;
    }
    if (sub && item && !hasQuiz) {
      const body = l.trim().replace(/^[-*]\s+/, '');
      const f = parseFig(body); if (f) { pending.push({ f, step: item }); continue; }
      const m = body.match(/^(Chữ trên bảng|Thẻ nguồn|Nguồn)\s*:\s*(.*)$/i);
      if (m && /bảng/i.test(m[1])) item.board.push(...m[2].split(/\s+\/\s+/));
      else if (m) item.cites.push(m[2]);
      else item.text += '\n• ' + body;
      continue;
    }
    if (reFig.test(l.trim())) { pending.push({ f: parseFig(l), step: null }); continue; }
    if (hasQuiz && (/^\d+\.\s/.test(l) || /^\s+[-*]\s/.test(l) || /^\s{3,}\S/.test(l))) continue;
    if (/^\*[^*].*\*$/.test(l.trim()) && /đáp án/i.test(l)) continue;
    if (/^\s{2,}\S/.test(l) && item) { item.text += ' ' + l.trim(); continue; }
    const m = l.trim().match(/^\*\*(.+?):\*\*\s*(.*)$/);
    sc.notes.push(m ? { tag: m[1], text: m[2] } : { tag: '', text: l.trim() });
  }
  if (hasQuiz) {
    sc.quiz = { qs: parseQuiz(lines) };
    const pm = sc.title.match(/(\d+)\s*câu[^)]*?đạt\s*(?:từ\s*)?(\d+)(?:\s*\/\s*\d+)?/i);
    if (pm) sc.quiz.pass = +pm[2];
  }
  for (const { f, step: s } of pending) {
    let tgt = f.cungY ? sc.steps.find((x) => x.type === 'idea' && x.k === f.cungY) || null : null;
    sc.figs.push({ f, step: tgt || s });
  }
  return sc;
}
// ============================================================ THẺ HỌC TẬP MỚI (v2) – CHỈ PHÂN TÍCH, CHƯA VẼ
// [HỎI TRƯỚC: câu hỏi | đáp: … | vì sao: …]   [TỰ GIẢI THÍCH: câu | đáp: …]          (một dòng)
// [VÍ DỤ GIẢI] … [/VÍ DỤ GIẢI]   [QUIZ] … [/QUIZ]   [ÔN RẢI: lịch: 1,3,7,21] … [/ÔN RẢI]   (nhiều dòng)
// [SỐ LIỆU: tên | loại: … | x: … | y: … | nguồn: url] + bảng markdown ngay dưới
// Các dòng thẻ được TÁCH khỏi nội dung trước khi phân tích chương/cảnh (bài cũ không có thẻ → không đổi gì). Kết quả: A.the.
const THE_MOI = { 'hoi truoc': 'hoi-truoc', 'tu giai thich': 'tu-giai-thich', 'vi du giai': 'vi-du-giai', 'quiz': 'quiz', 'on rai': 'on-rai', 'so lieu': 'so-lieu', 'tom': 'tom', 'nho lai': 'nho-lai', 'ban do': 'ban-do', 'mo phong': 'mo-phong' };
const THE_MOT_DONG = new Set(['hoi-truoc', 'tu-giai-thich', 'tom']), THE_NHIEU_DONG = new Set(['vi-du-giai', 'quiz', 'on-rai', 'nho-lai', 'ban-do', 'mo-phong']);
// [BẢN ĐỒ] mỗi dòng "A --quan hệ--> B"
const RE_CANH = /^\s*(?:[-*]\s+)?(.+?)\s*--\s*(.+?)\s*-->\s*(.+?)\s*$/;
function theBanDo(lines) { return lines.map((l) => l.match(RE_CANH)).filter(Boolean).map((m) => ({ a: m[1].trim(), rel: m[2].trim(), b: m[3].trim() })); }
const RE_THE_MO = /^\s*(?:[-*]\s+)?\[\s*([^\]:/|]+?)\s*(?::\s*([^\]]*))?\]\s*$/;
const RE_THE_DONG = /^\s*(?:[-*]\s+)?\[\s*\/\s*([^\]]+?)\s*\]\s*$/;
const theTen = (s) => THE_MOI[deAccent(s).toLowerCase().replace(/\s+/g, ' ').trim()];
// "câu chính | khóa: giá trị | khóa: giá trị" → { main, kv:{khóa không dấu: giá trị} }
function theArgs(s) {
  const out = { main: '', kv: {} };
  for (const p of String(s || '').split('|').map((x) => x.trim()).filter(Boolean)) {
    const m = p.match(/^([^:]{1,14}):\s*(.*)$/);
    if (m) out.kv[deAccent(m[1]).toLowerCase().trim()] = m[2].trim(); else out.main = out.main ? out.main + ' | ' + p : p;
  }
  return out;
}
function theViDu(lines) {
  const steps = [];
  for (const l of lines) {
    const m = l.trim().replace(/^[-*]\s+/, '').match(/^(Bước\s*\d+|Bỏ trống|Tự làm)\s*:\s*(.*)$/i);
    if (!m) { if (l.trim() && steps.length) steps[steps.length - 1].text += ' ' + l.trim(); continue; }
    const cut = m[2].indexOf('|'), txt = (cut < 0 ? m[2] : m[2].slice(0, cut)).trim(), a = theArgs(cut < 0 ? '' : m[2].slice(cut + 1)), d = deAccent(m[1]).toLowerCase();
    steps.push({ loai: /^bo trong/.test(d) ? 'bo-trong' : /^tu lam/.test(d) ? 'tu-lam' : 'buoc', nhan: m[1].trim(), text: txt, viSao: a.kv['vi sao'] || '', dap: a.kv['dap'] || '' });
  }
  return steps;
}
function theQuiz(lines) {
  const qs = []; let q = null;
  for (const l of lines) {
    const mq = l.match(/^\s*(\d+)\.\s+(.*)$/), mo = l.match(/^\s+[-*]\s+([A-F])[.)]\s*(.*)$/), mk = l.match(/^\s+[-*]\s+(đáp|vì sao)\s*:\s*(.*)$/i);
    if (mq) {
      const tl = /^\[\s*TỰ LUẬN\s*\]\s*/i.test(mq[2]), a = theArgs(mq[2].replace(/^\[\s*TỰ LUẬN\s*\]\s*/i, ''));
      q = { loai: tl ? 'tu-luan' : 'trac-nghiem', q: a.main, opts: [], ans: -1, expl: '', mau: a.kv['mau'] || '' }; qs.push(q);
    } else if (q && mo) q.opts.push(mo[2].trim());
    else if (q && mk) { if (/^đáp/i.test(mk[1])) q.ans = 'ABCDEF'.indexOf(mk[2].trim().charAt(0).toUpperCase()); else q.expl = mk[2].trim(); }
  }
  return qs;
}
function theOnRai(lines) {
  return lines.map((l) => l.match(/^\s*\d+\.\s+(.*)$/)).filter(Boolean).map((m) => { const a = theArgs(m[1]); return { q: a.main, tu: a.kv['tu'] || '', dap: a.kv['dap'] || '' }; });
}
function tachTheMoi(lines, file) {
  const kept = [], the = []; let heading = '';
  const canh = (n, msg) => console.warn(`  (${path.basename(file)} dòng ${n}: ${msg})`);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i], mh = l.match(/^#{1,6}\s+(.*)$/);
    if (mh) heading = mh[1].trim();
    const mo = mh ? null : l.match(RE_THE_MO), ten = mo ? theTen(mo[1]) : undefined;
    if (!ten) { kept.push(l); continue; }
    const a = theArgs(mo[2]), t = { the: ten, line: i + 1, heading, main: a.main, kv: a.kv };
    if (ten === 'tom') { t.items = String(mo[2] || '').split('|').map((x) => x.trim()).filter(Boolean); if (t.items.length !== 3) canh(i + 1, `[TÓM] cần đúng 3 ý, có ${t.items.length}`); the.push(t); continue; }
    if (THE_MOT_DONG.has(ten)) { if (!a.main) canh(i + 1, `thẻ ${mo[1]} thiếu câu hỏi`); the.push(t); continue; }
    if (ten === 'so-lieu') { // bảng markdown ngay dưới (cho phép 1 dòng trống)
      let j = i + 1; while (j < lines.length && !lines[j].trim()) j++;
      const tb = []; while (j < lines.length && /^\s*\|/.test(lines[j])) tb.push(lines[j++]);
      const rows = tableRows(tb);
      if (rows.length < 2) canh(i + 1, 'SỐ LIỆU không có bảng số ngay dưới thẻ'); else t.table = { head: rows[0], rows: rows.slice(1) };
      the.push(t); if (t.table) i = j - 1; continue;
    }
    const body = []; let j = i + 1, closed = false;
    for (; j < lines.length; j++) {
      const c = lines[j].match(RE_THE_DONG);
      if (c && theTen(c[1]) === ten) { closed = true; break; }
      if (/^#{1,6}\s/.test(lines[j])) break; // quên thẻ đóng → dừng ở đầu mục kế tiếp
      body.push(lines[j]);
    }
    if (!closed) canh(i + 1, `thiếu [/${mo[1].trim()}] – lấy đến hết mục`);
    if (ten === 'vi-du-giai') t.steps = theViDu(body);
    else if (ten === 'quiz') t.qs = theQuiz(body);
    else if (ten === 'nho-lai') t.qs = theOnRai(body);
    else if (ten === 'ban-do') t.edges = theBanDo(body);
    else if (ten === 'mo-phong') { t.sim = parseSim(a, body, i + 2, i + 1, file); for (const e of t.sim.errs) canh(e.n, e.m); }
    else if (ten === 'on-rai') { t.qs = theOnRai(body); t.lich = (a.kv['lich'] || '1,3,7,21').split(/[,\s]+/).map(Number).filter(Boolean); }
    the.push(t); i = closed ? j : j - 1;
  }
  return { lines: kept, the };
}
const RE_VAT_LINE = /^\*{1,2}\s*vat the\s*:\s*([^*]+?)\s*\*{1,2}$/i; // so tr\u00EAn ch\u1EEF \u0111\u00E3 b\u1ECF d\u1EA5u
// gói phong cách: *Phong cách: kinh|hud|ban-ve|mat-cat|y-hoc* (đầu bài; trong chương = ghi đè chương đó)
const RE_PC_LINE = /^\*{1,2}\s*phong cach\s*:\s*([^*]+?)\s*\*{1,2}$/i; // so trên chữ đã bỏ dấu
const PC_TEN = { 'kinh': 'kinh', 'hud': 'hud', 'ban ve': 'ban-ve', 'mat cat': 'mat-cat', 'y hoc': 'y-hoc' };
function docPhongCach(line, noi) {
  const m = deAccent(line.trim()).match(RE_PC_LINE); if (!m) return undefined;
  const v = PC_TEN[m[1].toLowerCase().replace(/[-_]+/g, ' ').replace(/[^a-z ]/g, '').trim().replace(/\s+/g, ' ')];
  if (!v) { console.warn(`  (${noi}: "Phong cách: ${m[1]}" không hiểu – dùng: kinh, hud, ban-ve, mat-cat, y-hoc)`); return null; }
  return v;
}
const VAT_TEN = { 'giot sua': 'giot-sua', 'te bao': 'te-bao', 'vi khuan': 'te-bao', 'phan tu': 'phan-tu', 'khien': 'khien', 'banh rang': 'banh-rang', 'khong': null };
function parseAlbum(src, file) {
  src = src.normalize('NFC');
  const lines0 = src.replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
  const { lines, the } = tachTheMoi(lines0, file);
  let h1 = ''; const pre = [], secs = []; let cur = null;
  for (const l of lines) {
    if (!h1 && /^# /.test(l) && !cur) { h1 = l.slice(2).trim(); continue; }
    const m = l.match(/^## (.+)$/);
    if (m) { cur = { title: m[1].trim(), lines: [] }; secs.push(cur); continue; }
    (cur ? cur.lines : pre).push(l);
  }
  const A = { h1, meta: [], intro: [], chapters: [], summary: [], summaryFig: null, endQuiz: [], answers: {}, glossary: null, sources: [], sourcesNote: [], checks: [], checksNote: [], dossier: null, extra: [], phongCach: 'kinh', the, dong: lines0 };
  for (let i = pre.length - 1; i >= 0; i--) { const v = docPhongCach(pre[i], 'Đầu bài'); if (v !== undefined) { if (v) A.phongCach = v; pre.splice(i, 1); } }
  A.meta = tableRows(pre).filter((r) => r.length >= 2 && !/^mục$/i.test(r[0]));
  // v3: bài dùng thẻ [TÓM]/[NHỚ LẠI]/[BẢN ĐỒ] hoặc dòng "- **Thẻ:** …" → đọc thêm meta dạng gạch đầu dòng "- **Khóa:** giá trị"
  A.v3 = the.some((t) => ['tom', 'nho-lai', 'ban-do', 'mo-phong'].includes(t.the)) || lines0.some((l) => /^\s*[-*]\s+\*\*Thẻ\s*:\*\*/i.test(l));
  if (A.v3) {
    for (const l of pre) { const m = l.match(/^\s*[-*]\s+\*\*(.+?):\*\*\s*(.*)$/); if (m) A.meta.push([m[1].trim(), m[2].trim()]); }
    const q = pre.find((l) => /^\s*>/.test(l));
    A.cauHoi = q ? q.replace(/^\s*>\s*/, '').replace(/^\*\*Câu hỏi thật:\*\*\s*/i, '') : '';
    A.mucTieu = pre.filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s+/, ''));
  }
  for (const para of pre.filter((l) => !/^\s*\|/.test(l)).join('\n').split(/\n\s*\n/)) {
    const p = para.trim(); if (!p || /^---+$/.test(p)) continue;
    const m = p.match(/^\*\*(.+?):\*\*\s*([\s\S]*)$/);
    A.intro.push(m ? { tag: m[1], text: m[2].replace(/\n/g, ' ') } : { tag: '', text: p.replace(/\n/g, ' ') });
  }
  let chN = 0;
  for (const s of secs) {
    const sp = (SPECIAL.find(([, re]) => re.test(s.title)) || [])[0];
    if (sp === 'tongket') { const { items, rest } = numbered(s.lines); A.summary = items.length ? items : rest; const fl = s.lines.find((l) => reFig.test(l.trim())); if (fl) A.summaryFig = parseFig(fl); }
    else if (sp === 'endquiz') A.endQuiz = parseQuiz(s.lines);
    else if (sp === 'dapan') {
      let g = '_';
      for (const l of s.lines) {
        const mg = l.trim().match(/^\*\*(.+?)\*\*$/); if (mg) { g = mg[1].trim(); continue; }
        const ma = l.match(/^\s*[-*]\s*Câu\s*(\d+)\s*:\s*\*{0,2}([A-F])\*{0,2}\s*[–—:-]?\s*(.*)$/i);
        if (ma) (A.answers[g] = A.answers[g] || {})[+ma[1]] = { ans: 'ABCDEF'.indexOf(ma[2].toUpperCase()), expl: ma[3].trim() };
      }
    } else if (sp === 'doichieu') { const r = tableRows(s.lines); if (r.length) A.dossier = { head: r[0], rows: r.slice(1) }; }
    else if (sp === 'tudien') { const r = tableRows(s.lines); if (r.length) A.glossary = { head: r[0], rows: r.slice(1) }; }
    else if (sp === 'nguon') { const { items, rest } = numbered(s.lines); A.sources = items; A.sourcesNote = rest; }
    else if (sp === 'kiemtra') { const { items, rest } = numbered(s.lines); A.checks = items; A.checksNote = rest; }
    else {
      chN++;
      const mc = s.title.match(/^Chương\s+(\d+)\s*[–—:-]\s*(.+)$/i);
      const ch = { n: mc ? +mc[1] : chN, title: mc ? mc[2].trim() : s.title, raw: s.title, isChap: !!mc, meta: '', intro: [], scenes: [], vat: undefined };
      // dòng ghi đè vật thể kính: *Vật thể: giọt sữa|tế bào|phân tử|khiên|bánh răng|không* (đặt đâu trong chương cũng được)
      s.lines = s.lines.filter((l) => {
        const pcv = docPhongCach(l, 'Chương ' + ch.n); if (pcv !== undefined) { if (pcv) ch.phongCach = pcv; return false; }
        const mv = deAccent(l.trim()).match(RE_VAT_LINE); if (!mv) return true; // so khớp trên chữ bỏ dấu: "Vật thể" = "Vat the"
        const v = VAT_TEN[mv[1].toLowerCase().replace(/[^a-z ]/g, '').trim().replace(/\s+/g, ' ')];
        if (v === undefined) console.warn(`  (Chương ${ch.n}: "Vật thể: ${mv[1]}" không hiểu – dùng: giọt sữa, tế bào, phân tử, khiên, bánh răng, không)`);
        else ch.vat = v;
        return false;
      });
      const blocks = []; let b = { title: null, lines: [] }; blocks.push(b);
      for (const l of s.lines) { const m = l.match(/^###\s+(.+)$/); if (m) { b = { title: m[1].trim(), lines: [] }; blocks.push(b); } else b.lines.push(l); }
      const head = blocks.shift();
      for (const l of head.lines) { const x = l.trim(); if (!x || /^---+$/.test(x)) continue; if (!ch.meta && /^\*[^*].*\*$/.test(x)) ch.meta = x.slice(1, -1); else ch.intro.push(x); }
      if (!blocks.length && ch.intro.length) { blocks.push({ title: ch.title, lines: head.lines.filter((l) => !(ch.meta && l.trim() === '*' + ch.meta + '*')) }); ch.intro = []; }
      blocks.forEach((bl, k) => { const sc = parseScene(bl.title, bl.lines, A.v3); if (!sc.num) sc.num = `${ch.n}.${k + 1}`; ch.scenes.push(sc); });
      if (!mc && ch.scenes.every((sc) => !sc.steps.length && !sc.quiz)) { chN--; A.extra.push({ title: s.title, html: mdBlocks(s.lines) }); continue; }
      A.chapters.push(ch);
    }
  }
  for (const ch of A.chapters) {
    const ans = A.answers[`Chương ${ch.n}`] || A.answers[ch.title] || {}; let k = 0;
    for (const sc of ch.scenes) if (sc.quiz) for (const q of sc.quiz.qs) { k++; const a = ans[k]; if (a) { q.ans = a.ans; q.expl = a.expl; } }
  }
  const endAns = A.answers['Trắc nghiệm cuối ngày'] || Object.entries(A.answers).find(([g]) => /trắc nghiệm|cuối/i.test(g))?.[1] || {};
  A.endQuiz.forEach((q, i) => { const a = endAns[i + 1]; if (a) { q.ans = a.ans; q.expl = a.expl; } });

  const metaGet = (re) => (A.meta.find((r) => re.test(deAccent(r[0]).toLowerCase())) || [])[1] || '';
  const stem = path.basename(file).replace(/\.md$/i, '').replace(/\s*\(\d+\)$/, '');
  A.stem = stem;
  A.code = (A.v3 ? metaGet(/^ma bai/).split(/\s+·\s+/)[0].trim() : metaGet(/^ma bai/)) || stem.replace(/-album$/i, '');
  const hm = h1.match(/^(.+?)\s+·\s+(.+?)\s+[–—]\s+(.+)$/) || h1.match(/^(.+?)\s+[–—]\s+(.+)$/);
  A.course = hm && hm.length === 4 ? hm[2] : '';
  A.topic = hm ? hm[hm.length - 1] : (h1 || stem);
  A.title = h1 || stem;
  let dm = (A.code + ' ' + stem).match(/(20\d\d)-(\d\d)-(\d\d)/);
  if (!dm) { const v = (metaGet(/^ngay/) || (pre.join('\n').match(/\*\*Ngày:\*\*\s*(.+)/i) || [])[1] || '').match(/(\d{1,2})\/(\d{1,2})\/(20\d\d)/); if (v) dm = [null, v[3], p2(v[2]), p2(v[1])]; }
  if (!dm) throw new Error(`${path.basename(file)}: không đọc được ngày (tên file có YYYY-MM-DD hoặc dòng "Ngày: dd/mm/yyyy")`);
  A.date = `${dm[1]}-${dm[2]}-${dm[3]}`;
  const mm = A.code.match(/^([A-Za-z][A-Za-z&]*)[-_]/) || stem.match(/^([A-Za-z][A-Za-z&]*)[-_]/);
  A.mon = (mm ? mm[1] : '') || (/R&D|Food Lab/i.test(src.slice(0, 2000)) ? 'RnD' : 'Chung');
  return A;
}
const slug = (s) => deAccent(s).toLowerCase().replace(/^ch(?:uong)?\s*\d+\s*/, '').replace(/&/g, 'n').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function pageName(A) {
  let t = slug(A.topic); if (t.length > 60) t = t.slice(0, 60).replace(/-[^-]*$/, '');
  return `${A.date}-${slug(A.mon) || 'chung'}-${t || 'bai-hoc'}.html`;
}

// ============================================================ HÌNH
function figDirs(mdFile, A) {
  const d = path.dirname(mdFile), base = A.stem.replace(/-album$/i, '');
  const dirs = [path.join(ROOT, 'assets', 'bai', base), path.join(ROOT, 'assets', 'bai', A.code), path.join(ROOT, 'assets', 'bai', A.stem), path.join(d, base), path.join(d, A.stem), d];
  try {
    for (const z of fs.readdirSync(d)) {
      if (!/\.zip$/i.test(z) || ![base, A.code].some((k) => z.toLowerCase().startsWith(k.toLowerCase().slice(0, 18)))) continue;
      const dst = path.join(os.tmpdir(), 'hoc-hom-nay', z.replace(/\W+/g, '_'));
      if (!fs.existsSync(dst)) { fs.mkdirSync(dst, { recursive: true }); execFileSync(process.platform === 'win32' ? 'C:/Windows/System32/tar.exe' : 'unzip', process.platform === 'win32' ? ['-xf', path.join(d, z), '-C', dst] : ['-q', path.join(d, z), '-d', dst], { stdio: 'ignore' }); }
      dirs.push(dst);
    }
  } catch (e) { console.warn('  (không mở được gói zip hình: ' + e.message + ')'); }
  return [...new Set(dirs)].filter((x) => { try { return fs.statSync(x).isDirectory(); } catch { return false; } });
}
function findFile(dirs, name) {
  const want = path.basename(name).toLowerCase();
  for (const d of dirs) {
    const stack = [[d, 0]];
    while (stack.length) {
      const [x, depth] = stack.pop(); let ents; try { ents = fs.readdirSync(x, { withFileTypes: true }); } catch { continue; }
      for (const e of ents) {
        if (e.isFile() && e.name.toLowerCase() === want) return path.join(x, e.name);
        if (e.isDirectory() && depth < 2 && !/^(node_modules|\.git|_site)$/.test(e.name)) stack.push([path.join(x, e.name), depth + 1]);
      }
    }
  }
  return null;
}
function cleanSvg(svg, pfx) {
  svg = svg.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[^[>]*(\[[\s\S]*?\])?\s*>/gi, '') // DOCTYPE có thể kèm [<!ENTITY …>].replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, '').replace(/(href\s*=\s*["'])\s*javascript:[^"']*/gi, '$1#');
  for (const id of new Set([...svg.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]))) {
    const e = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    svg = svg.replace(new RegExp(`(\\sid\\s*=\\s*["'])${e}(["'])`, 'g'), `$1${pfx}${id}$2`).replace(new RegExp(`url\\(\\s*#${e}\\s*\\)`, 'g'), `url(#${pfx}${id})`).replace(new RegExp(`(href\\s*=\\s*["'])#${e}(["'])`, 'g'), `$1#${pfx}${id}$2`);
  }
  return svg.trim();
}
function inlineGltf(file) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8')), d = path.dirname(file);
  for (const arr of [j.buffers || [], j.images || []]) for (const b of arr) if (b.uri && !/^data:/.test(b.uri)) {
    const p = path.join(d, decodeURIComponent(b.uri)), ext = path.extname(p).toLowerCase();
    b.uri = `data:${ext === '.png' ? 'image/png' : /\.jpe?g/.test(ext) ? 'image/jpeg' : 'application/octet-stream'};base64,` + fs.readFileSync(p).toString('base64');
  }
  return Buffer.from(JSON.stringify(j)).toString('base64');
}
let figSeq = 0;
function loadLocal(file, id, F) {
  if (/\.svg$/i.test(file)) return { kind: 'svg', svg: cleanSvg(fs.readFileSync(file, 'utf8'), id + '-'), path: file };
  if (/\.(png|jpe?g|gif|webp)$/i.test(file)) return { kind: 'img', path: file, src: '' }; // lib/anh.mjs: WebP ≤1200px, file riêng (tải lười) hoặc nhúng (bản offline)
  if (/\.glb$/i.test(file)) { F.has3d = true; return { kind: '3d', fmt: 'glb', b64: fs.readFileSync(file).toString('base64') }; }
  if (/\.gltf$/i.test(file)) { F.has3d = true; return { kind: '3d', fmt: 'gltf', b64: inlineGltf(file) }; }
  return null;
}
function nguonBox(f) {
  const links = f.src ? [[f.src, (() => { try { const u = new URL(f.src); return decodeURIComponent(u.hostname + u.pathname).slice(0, 80); } catch { return f.src; } })()]]
    : f.mols.map((m) => (m.db === 'pdb' ? [`https://www.rcsb.org/structure/${m.id}`, `RCSB PDB ${m.id}`] : [`https://pubchem.ncbi.nlm.nih.gov/compound/${m.id}`, `PubChem CID ${m.id}`]));
  const a = links.map(([u, t]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ');
  return { kind: 'nguon', html: `<b>${f.is3d ? 'Mô hình 3D' : 'Hình'}${f.nhan ? ': ' + esc(f.nhan) : ''}</b><br>${a}<br><small>Chưa tải được – mở link để xem tại nguồn.</small>` };
}
// v2: số dòng (trong file .md) của thẻ hình nhắc tới `needle`, để cảnh báo chỉ đúng chỗ; mỗi lần gọi đi tiếp tới lần xuất hiện kế
function dongThe(F, needle) {
  if (!needle) return '?';
  const from = F.lastLine[needle] || 0;
  for (let i = from; i < F.A.dong.length; i++) if (F.A.dong[i].includes(needle) && /^\s*(?:[-*]\s+)?\[/.test(F.A.dong[i])) { F.lastLine[needle] = i + 1; return i + 1; }
  F.lastLine[needle] = 0; return '?';
}
const canhHinh = (F, needle, msg) => console.warn(`  (${F.A.stem}.md dòng ${dongThe(F, needle)}: ${msg})`);
function resolveFig(f, ctx, dirs, F) {
  const key = f.may ? 'may|' + f.ma + '|' + JSON.stringify([f.nhanSo, f.buoc]) : [f.src, f.file, f.mols.map((m) => m.db + m.id).join(','), f.nhan || '', (ctx.board || []).join('/')].join('|');
  const needle = f.may ? f.ma : (f.file || f.src || (f.mols[0] && f.mols[0].id) || '');
  if (F.byKey[key]) { if (F.v2) canhHinh(F, needle, `hình "${needle}" dùng lần thứ 2 – đặc tả: mỗi hình tối đa 1 lần trong album`); if (F.v3) F.trung.push(needle); return F.byKey[key]; }
  if (F.v3 && !f.may && (!f.khang || !f.chucnang)) { // v3: thiếu khẳng định hoặc chức năng thì không hiện hình
    canhHinh(F, needle, `hình "${needle}" thiếu ${[!f.khang && 'khẳng định', !f.chucnang && 'chức năng'].filter(Boolean).join(' và ')} → không hiện hình`);
    F.thieuKC.push(needle); F.boQua.push(needle); return null;
  }
  const id = 'h' + (++figSeq);
  let fig = null;
  if (f.may) { // cảnh mô phỏng máy: module templates/may/<mã>.js + ảnh tĩnh templates/may/<mã>.svg (xem trước / dự phòng)
    const js = path.join(ROOT, 'templates', 'may', f.ma + '.js'), svg = path.join(ROOT, 'templates', 'may', f.ma + '.svg');
    if (!fs.existsSync(js)) { console.warn(`  (chưa có máy "${f.ma}" – thêm templates/may/${f.ma}.js)`); fig = { kind: 'nguon', html: `<b>Cảnh máy "${esc(f.ma)}"</b><br><small>Chưa có mô-đun máy này.</small>` }; }
    else { fig = { kind: 'may', ma: f.ma, nhanSo: f.nhanSo, buoc: f.buoc, poster: fs.existsSync(svg) ? cleanSvg(fs.readFileSync(svg, 'utf8'), id + '-') : '' }; if (!F.v2) F.may.add(f.ma); }
    Object.assign(fig, { file: '', cho: f.cho, hien: '', nhan: '', credit: '' });
    F.figs[id] = fig; F.byKey[key] = id; return id;
  }
  if (f.src) {
    fig = f.local ? loadLocal(f.local, id, F) : null;
    if (!fig) { fig = nguonBox(f); F.loiNguon.push(f.src); if (F.v3) canhHinh(F, needle, `không tải được ảnh ${f.src} → chỉ hiện liên kết nguồn, không vẽ thay`); }
  } else if (f.mols.length) {
    if (f.molData) { fig = { kind: 'mol', fmt: f.molData.fmt, data: fs.readFileSync(f.molData.file, 'utf8'), kieu: f.kieu }; F.has3dmol = true; }
    else { fig = nguonBox(f); F.loiNguon.push(f.mols.map((m) => m.db + ' ' + m.id).join('/')); if (F.v3) canhHinh(F, needle, `không tải được mô hình 3D ${f.mols.map((m) => m.db + ' ' + m.id).join('/')} → chỉ hiện liên kết nguồn, không vẽ thay`); }
  } else {
    const found = f.file ? findFile(dirs, f.file) : null;
    fig = found ? loadLocal(found, id, F) : null;
    if (!fig && F.v2) { // v2: KHÔNG tự vẽ thẻ dự phòng – bỏ qua thẻ và báo số dòng
      canhHinh(F, needle, `thẻ hình "${f.file || '(không tên)'}" chưa có file ảnh/SVG trong assets/bai/ → bỏ qua, không vẽ hình thay thế`);
      F.boQua.push(f.file || '(không tên)'); return null;
    }
    if (!fig) {
      const svg = autoFig({ file: f.file || 'hinh', nhan: f.nhan, board: ctx.board });
      fig = { kind: 'auto', svg };
      if (f.tuVe && f.file && /\.svg$/i.test(f.file)) { // [HÌNH: tu-ve x.svg] → lưu hình tự vẽ vào assets của bài
        fs.mkdirSync(F.dir, { recursive: true });
        fs.writeFileSync(path.join(F.dir, path.basename(f.file)), svg.replace('<svg ', '<svg ') + '\n', 'utf8');
        F.tuVe.push(f.file);
      } else F.missing.add(f.file || '(không tên)');
    }
  }
  if (F.v2 && !f.nhan) canhHinh(F, needle, `hình "${needle}" thiếu chú thích 1 câu "nhìn vào đâu" (trường nhấn)`);
  Object.assign(fig, { file: f.file, cho: f.cho, hien: f.hien, nhan: (F.v2 && f.nhan) ? inl(f.nhan) : f.nhan, credit: creditHtml(f.credit) }, F.v3 ? { khang: inl(f.khang), chucnang: f.chucnang.trim().toLowerCase() } : {});
  F.figs[id] = fig; F.byKey[key] = id;
  return id;
}
// --assets=DIR: gốc thư mục hình (dựng thử không ghi vào assets/bai/ của repo)
const ASSET_ARG = process.argv.find((a) => a.startsWith('--assets='));
const assetDir = (A) => path.join(ASSET_ARG ? path.resolve(ASSET_ARG.slice(9)) : path.join(ROOT, 'assets', 'bai'), A.stem.replace(/-album$/i, ''));
function figsToFetch(A) {
  const out = [];
  for (const ch of A.chapters) for (const sc of ch.scenes) if (!sc.quiz) for (const x of sc.figs) out.push(x.f);
  if (A.summaryFig) out.push(A.summaryFig);
  return out;
}

// ============================================================ THẺ HỌC TẬP v2 → DỮ LIỆU CHO templates/album-v2.html
// Mỗi thẻ gắn vào cảnh/chương có tiêu đề (### / ##) gần nhất phía trên nó; thẻ nằm dưới mục khác (vd "## Ôn rải") → nhóm cuối bài.
function theRa(A, xf = inl, xp = xf) { // xf: chữ trong thẻ (v3: nối {{thuật ngữ}}); xp: chỗ không được có {{ }} ([TÓM])
  const of = new Map(), end = new Map(), byRaw = new Map(), x = (v) => xf(v || ''), plain = (s) => String(s).replace(/\*\*/g, '');
  for (const ch of A.chapters) { byRaw.set(ch.raw, ch); for (const sc of ch.scenes) byRaw.set(sc.raw, sc); }
  const conv = (t) => {
    switch (t.the) {
      case 'hoi-truoc': case 'tu-giai-thich': return { k: t.the, q: x(t.main), dap: x(t.kv.dap), viSao: x(t.kv['vi sao']) };
      case 'vi-du-giai': return { k: t.the, title: x(t.main), steps: t.steps.map((s) => ({ loai: s.loai, nhan: s.nhan, text: x(s.text), viSao: x(s.viSao), dap: x(s.dap) })) };
      case 'quiz': return { k: 'quiz', id: 'q' + t.line, title: 'Kiểm tra truy hồi – ' + plain(t.heading.replace(/^(?:Cảnh\s+)?[\d.]+\s*[–—-]\s*/, '')), qs: t.qs.map((q) => ({ loai: q.loai, q: x(q.q), opts: q.opts.map(inl), ans: q.ans, expl: x(q.expl), mau: x(q.mau) })) };
      case 'on-rai': return { k: 'on-rai', id: 'r' + t.line, lich: t.lich, qs: t.qs.map((q) => ({ q: x(q.q), tu: esc(q.tu), dap: x(q.dap) })) };
      case 'nho-lai': return { k: 'nho-lai', qs: t.qs.map((q) => ({ q: x(q.q), tu: esc(q.tu), dap: x(q.dap) })) };
      case 'tom': return { k: 'tom', items: t.items.map((v) => xp(stripT(v))) };
      case 'mo-phong': {
        const s = t.sim, bad = s.errs.length ? s.errs : null; if (bad) return { k: 'mo-phong', id: esc(s.id), bad, line: s.line, khangRaw: s.khang };
        return { k: 'mo-phong', id: esc(s.id), kieu: s.kieu, line: s.line, khangRaw: s.khang, bad: null, khang: x(s.khang), chucnang: s.chucnang.trim().toLowerCase(), nhin: x(s.nhin),
          du: s.du && { q: x(s.du.q), opts: s.du.opts.map(esc), dapIdx: s.du.dapIdx, viSao: x(s.du.viSao) },
          hat: s.kieu === 'hat' ? { vung: s.vung.map((v) => ({ ten: esc(v.ten), nen: !!v.nen })), ranh: s.ranh, do: s.do && { nhan: esc(s.do.nhan), chia: s.do.chia }, hat: s.vung.map((v) => v.hat), gd: Object.fromEntries(Object.entries(s.gd).map(([k, v]) => [k, x(v)])) } : null,
          hh: s.kieu === 'hoat-hinh' ? { svg: cleanSvg(s.svg, 'hh' + s.id.replace(/\W/g, '') + '-'), steps: s.buoc.sort((p, q) => p.n - q.n).map((b) => ({ n: b.n, chu: x(b.chu), viSao: x(b.viSao) })) } : null,
          bien: s.bien && { ten: esc(s.bien.ten), nhan: esc(s.bien.nhan || ''), donvi: esc(s.bien.donvi), min: s.bien.min, max: s.bien.max, buoc: s.bien.buoc, mac: s.bien.mac }, hang: s.hang,
          chon: s.chon.map((c) => ({ ten: esc(c.ten), f: c.f })), tinh: s.tinh.map((u) => ({ ten: esc(u.ten), src: esc(u.src), ast: u.ast })), ra: s.ra.map((r) => ({ ten: r.ten, nhan: esc(r.nhan), so: r.so })),
          nguong: s.nguong.map((g) => ({ ten: esc(g.ten), plain: g.ten, k: g.k })), nguon: x(s.nguon), gioiHan: x(s.gioiHan) };
      }
      case 'ban-do': return { k: 'ban-do', edges: t.edges.map((e) => ({ a: esc(e.a), rel: esc(e.rel), b: esc(e.b) })) };
      case 'so-lieu': return t.table ? { k: 'so-lieu', name: esc(t.main), loai: t.kv.loai || '', x: esc(t.kv.x || ''), y: esc(t.kv.y || ''), nguon: esc(t.kv.nguon || ''), head: t.table.head.map(inl), rows: t.table.rows.map((r) => r.map(inl)) } : null;
    }
    return null;
  };
  for (const t of A.the) {
    const it = conv(t); if (!it) continue;
    const tgt = byRaw.get(t.heading);
    if (tgt) { if (!of.has(tgt)) of.set(tgt, []); of.get(tgt).push(it); }
    else { const k = plain(t.heading || 'Ghi chú'); if (!end.has(k)) end.set(k, []); end.get(k).push(it); }
  }
  return { of, end: [...end].map(([title, items]) => ({ title: esc(title), plainTitle: title, items })) };
}
const TPL2 = path.join(ROOT, 'templates', 'album-v2.html');

// ============================================================ BỘ TÍNH BIỂU THỨC AN TOÀN (cho [MÔ PHỎNG: … - tính:])
// Chỉ số, tên biến, + - * / ^, ngoặc và hàm ln exp min max sqrt. KHÔNG dùng eval hay new Function: dựng cây cú pháp, trang chỉ duyệt cây.
const EXPR_FN = new Set(['ln', 'exp', 'min', 'max', 'sqrt']);
function parseExpr(src) {
  const toks = []; let i = 0;
  while (i < src.length) {
    const c = src[i]; if (/\s/.test(c)) { i++; continue; }
    const mn = src.slice(i).match(/^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/); if (mn) { toks.push({ t: 'n', v: parseFloat(mn[0]) }); i += mn[0].length; continue; }
    const mi = src.slice(i).match(/^[\p{L}_][\p{L}\p{N}_]*/u); if (mi) { toks.push({ t: 'i', v: mi[0] }); i += mi[0].length; continue; }
    if ('+-*/^(),'.includes(c)) { toks.push({ t: c }); i++; continue; }
    throw new Error(`ký tự "${c}" không được phép trong công thức (chỉ số, tên biến, + - * / ^, ngoặc, ln exp min max sqrt)`);
  }
  let p = 0; const vars = new Set(), peek = () => (toks[p] ? toks[p].t : '$'), take = (t) => { if (peek() !== t) throw new Error(`công thức "${src}": thiếu "${t}"`); return toks[p++]; };
  const expr = () => { let a = term(); while (peek() === '+' || peek() === '-') { const o = toks[p++].t; a = { o, a, b: term() }; } return a; };
  const term = () => { let a = unary(); while (peek() === '*' || peek() === '/') { const o = toks[p++].t; a = { o, a, b: unary() }; } return a; };
  const unary = () => { if (peek() === '-') { p++; return { neg: unary() }; } return power(); };
  const power = () => { const a = atom(); if (peek() === '^') { p++; return { o: '^', a, b: unary() }; } return a; };
  const atom = () => {
    const k = peek();
    if (k === 'n') return { n: toks[p++].v };
    if (k === 'i') {
      const name = toks[p++].v;
      if (peek() === '(') {
        if (!EXPR_FN.has(name)) throw new Error(`hàm "${name}" không được phép (chỉ ln, exp, min, max, sqrt)`);
        p++; const args = [expr()]; while (peek() === ',') { p++; args.push(expr()); } take(')');
        if ((name === 'min' || name === 'max') ? args.length < 2 : args.length !== 1) throw new Error(`hàm "${name}" sai số đối số`);
        return { f: name, args };
      }
      vars.add(name); return { v: name };
    }
    if (k === '(') { p++; const a = expr(); take(')'); return a; }
    throw new Error(`công thức "${src}": cú pháp sai`);
  };
  const ast = expr(); if (p < toks.length) throw new Error(`công thức "${src}": thừa "${toks[p].t === 'n' || toks[p].t === 'i' ? toks[p].v : toks[p].t}"`);
  return { ast, vars };
}
function evalAst(a, sc) {
  if (a.n !== undefined) return a.n;
  if (a.v !== undefined) { if (!(a.v in sc)) throw new Error('biến chưa có: ' + a.v); return sc[a.v]; }
  if (a.neg) return -evalAst(a.neg, sc);
  if (a.f) { const v = a.args.map((z) => evalAst(z, sc)); return a.f === 'ln' ? Math.log(v[0]) : a.f === 'exp' ? Math.exp(v[0]) : a.f === 'sqrt' ? Math.sqrt(v[0]) : a.f === 'min' ? Math.min(...v) : Math.max(...v); }
  const l = evalAst(a.a, sc), r = evalAst(a.b, sc);
  return a.o === '+' ? l + r : a.o === '-' ? l - r : a.o === '*' ? l * r : a.o === '/' ? l / r : Math.pow(l, r);
}
// ============================================================ [MÔ PHỎNG] (KHUNG v3 phần 2, mục 11)
const SIM_KIEU = new Set(['thanh-truot', 'du-doan', 'hat', 'hoat-hinh']); // kiểu đã làm; tháo-lắp, bỏ-vào-máy, sắp-xếp, tính-thử: chưa hỗ trợ → cảnh báo
const HAT_GD = { dau: 'dau', chuyen: 'chuyen', 'can bang': 'can-bang' }; // giai đoạn của kiểu hạt (chữ hiện theo trạng thái số hạt)
function checkSvgHoatHinh(svg) { // 11.6: SVG hoạt hình phải có title + desc; không script, không liên kết ngoài; không tự chạy/lặp vô hạn
  const m = [];
  if (!/<title[\s>]/i.test(svg)) m.push('SVG thiếu <title>'); if (!/<desc[\s>]/i.test(svg)) m.push('SVG thiếu <desc>');
  if (/<script[\s>]/i.test(svg) || /\son[a-z]+\s*=\s*["']/i.test(svg) || /javascript:/i.test(svg)) m.push('SVG có script hoặc sự kiện onXxx');
  if (/<foreignObject[\s>]/i.test(svg) || /(?:xlink:)?href\s*=\s*["'](?!#)/i.test(svg) || /url\(\s*["']?(?!#)/i.test(svg) || /@import/i.test(svg)) m.push('SVG có liên kết ngoài hoặc foreignObject (chỉ cho phép tham chiếu #id trong file)');
  if (/repeatCount\s*=\s*["']indefinite/i.test(svg) || /repeatDur\s*=\s*["']indefinite/i.test(svg) || /animation-iteration-count\s*:\s*infinite/i.test(svg) || /\bautoplay\b/i.test(svg)) m.push('SVG có autoplay hoặc lặp vô hạn không điều khiển được');
  return m;
}
const numKv = (s) => { const o = {}; for (const p of String(s || '').split(',')) { const m = p.match(/^\s*([\p{L}_][\p{L}\p{N}_]*)\s*:\s*(-?\d+(?:\.\d+)?)\s*$/u); if (m) o[m[1]] = parseFloat(m[2]); } return o; };
const RE_ITEM = /([^{};]+?)\s*\{([^{}]*)\}/g;
function parseSim(a, body, ln0, hdrLine, file = '') {
  const errs = [], err = (n, m) => errs.push({ n, m });
  const S = { id: (a.main || '').trim(), kieu: deAccent(a.kv.kieu || '').toLowerCase().trim().replace(/[\s_]+/g, '-'), khang: a.kv['khang dinh'] || '', chucnang: a.kv['chuc nang'] || '', nhin: a.kv.nhin || '', line: hdrLine,
    du: null, bien: null, chon: [], hang: {}, tinh: [], ra: [], nguong: [], nguon: '', gioiHan: '', errs, vung: [], ranh: '', do: null, gd: {}, hinh: '', hinhLine: 0, buoc: [], svg: '' };
  const cfg = [];
  body.forEach((l, j) => { const m = l.match(/^\s*[-*]\s+([^:]{1,14}):\s*(.*)$/); if (m) cfg.push({ k: deAccent(m[1]).toLowerCase().trim(), v: m[2].trim(), n: ln0 + j }); else if (l.trim() && cfg.length) cfg[cfg.length - 1].v += ' ' + l.trim(); });
  const kvs = (segs) => { const o = {}; for (const p of segs) { const m = p.match(/^([^:]{1,12}):\s*(.*)$/); if (m) o[deAccent(m[1]).toLowerCase().trim()] = m[2].trim(); } return o; };
  const need = (s) => deAccent(s).toLowerCase().replace(/\s+/g, ' ').trim();
  for (const c of cfg) {
    const segs = c.v.split('|').map((x) => x.trim());
    if (c.k === 'du doan') {
      const kv = kvs(segs.slice(1)), opts = (kv.chon || '').split(';').map((x) => x.trim()).filter(Boolean), di = opts.findIndex((o) => need(o) === need(kv.dap || ''));
      if (opts.length < 2) err(c.n, 'dự đoán cần "chọn: A; B" (ít nhất 2 lựa chọn)'); else if (di < 0) err(c.n, `dự đoán: "đáp" không trùng lựa chọn nào (${kv.dap || 'trống'})`);
      S.du = { q: segs[0], opts, dap: opts[di] || '', dapIdx: di, viSao: kv['vi sao'] || '' };
    } else if (c.k === 'bien') {
      const kv = kvs(segs.slice(1)), n = (k) => (kv[k] !== undefined && kv[k] !== '' && isFinite(+kv[k]) ? +kv[k] : null);
      const b = { ten: segs[0], nhan: kv.nhan || '', donvi: kv['don vi'] || '', min: n('min'), max: n('max'), buoc: n('buoc') ?? 1, mac: n('mac dinh') };
      if (!/^[\p{L}_][\p{L}\p{N}_]*$/u.test(b.ten)) err(c.n, `tên biến "${b.ten}" không hợp lệ (chữ, số, gạch dưới)`);
      if (b.min === null || b.max === null) err(c.n, 'biến cần min và max là số'); else { if (b.mac === null) b.mac = b.min; if (b.max <= b.min) err(c.n, 'biến: max phải lớn hơn min'); }
      S.bien = b;
    } else if (c.k === 'chon') { for (const m of c.v.matchAll(RE_ITEM)) S.chon.push({ ten: m[1].trim(), f: numKv(m[2]) }); if (!S.chon.length) err(c.n, 'chọn: dạng "<tên> {M: 1, i: 2, max: 60}; …"'); }
    else if (c.k === 'hang') { for (const p of c.v.split(';').map((x) => x.trim()).filter(Boolean)) { const m = p.match(/^([\p{L}_][\p{L}\p{N}_]*)\s*=\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)$/u); if (m) S.hang[m[1]] = parseFloat(m[2]); else err(c.n, `hằng "${p}": dạng "tên = số"`); } }
    else if (c.k === 'tinh') {
      const known = new Set([...(S.bien ? [S.bien.ten] : []), ...Object.keys(S.hang), ...S.chon.flatMap((o) => Object.keys(o.f)), ...S.tinh.map((u) => u.ten)]);
      for (const p of c.v.split(';').map((x) => x.trim()).filter(Boolean)) {
        const m = p.match(/^([\p{L}_][\p{L}\p{N}_]*)\s*=\s*(.+)$/u); if (!m) { err(c.n, `tính "${p}": dạng "tên = công thức"`); continue; }
        try { const { ast, vars } = parseExpr(m[2]); const lạ = [...vars].filter((v) => !known.has(v)); if (lạ.length) err(c.n, `công thức "${m[2]}" dùng "${lạ.join(', ')}" chưa khai báo (biến, hằng, chọn, hoặc dòng tính trước đó)`); else { S.tinh.push({ ten: m[1], src: m[2].trim(), ast }); known.add(m[1]); } }
        catch (e) { err(c.n, e.message); }
      }
    } else if (c.k === 'ra') { const kv = kvs(segs.slice(1)); S.ra.push({ ten: segs[0], nhan: kv.nhan || segs[0], so: kv['chu so'] !== undefined && isFinite(+kv['chu so']) ? Math.max(0, Math.min(6, +kv['chu so'])) : 3, line: c.n }); }
    else if (c.k === 'nguong') { for (const m of c.v.matchAll(RE_ITEM)) S.nguong.push({ ten: m[1].trim(), k: numKv(m[2]) }); if (!S.nguong.length) err(c.n, 'ngưỡng: dạng "<tên> {aw: 0.92}; …"'); }
    else if (c.k === 'vung') { const kv = kvs(segs.slice(1)), h = kv.hat === undefined ? NaN : +kv.hat; if (!segs[0]) err(c.n, 'vùng cần có tên'); if (!(Number.isInteger(h) && h >= 0 && h <= 300)) err(c.n, `vùng "${segs[0]}": "hạt" phải là số nguyên từ 0 đến 300`); else S.vung.push({ ten: segs[0], hat: h, nen: kv.nen || '' }); }
    else if (c.k === 'ranh gioi') { const v = deAccent(c.v).toLowerCase().trim(); if (v === 'qua lai' || v === 'chan') S.ranh = v === 'chan' ? 'chan' : 'qua-lai'; else err(c.n, `ranh giới "${c.v}": chỉ nhận "qua lại" hoặc "chặn"`); }
    else if (c.k === 'do') { const m = c.v.match(/^(.+?)\s*=\s*(.+)$/), r = m && deAccent(m[2]).toLowerCase().replace(/\s+/g, ' ').trim().match(/^so hat trong vung\s*\/\s*(\d+(?:\.\d+)?)$/); if (!r) err(c.n, 'đo: dạng "<nhãn> = số hạt trong vùng / <số>"'); else S.do = { nhan: m[1].trim(), chia: +r[1] }; }
    else if (c.k === 'giai doan') { const g = HAT_GD[deAccent(segs[0]).toLowerCase().trim()], kv = kvs(segs.slice(1)); if (!g) err(c.n, `giai đoạn "${segs[0]}": chỉ nhận đầu, chuyển, cân bằng`); else if (!kv.chu) err(c.n, `giai đoạn "${segs[0]}" thiếu "chữ:"`); else S.gd[g] = kv.chu; }
    else if (c.k === 'hinh') { S.hinh = c.v.trim(); S.hinhLine = c.n; }
    else if (c.k === 'buoc') { const kv = kvs(segs.slice(1)), n = Number(segs[0]); if (!Number.isInteger(n) || n < 1) err(c.n, `bước "${segs[0]}" phải là số nguyên từ 1`); else if (!kv.chu) err(c.n, `bước ${n} thiếu "chữ:"`); else if (S.buoc.some((b) => b.n === n)) err(c.n, `bước ${n} bị lặp`); else S.buoc.push({ n, chu: kv.chu, viSao: kv['vi sao'] || '' }); }
    else if (c.k === 'nguon') S.nguon = (S.nguon ? S.nguon + ' ' : '') + c.v;
    else if (c.k === 'gioi han') S.gioiHan = (S.gioiHan ? S.gioiHan + ' ' : '') + c.v;
    else err(c.n, `khóa "${c.k}" không hiểu (dùng: dự đoán, biến, chọn, hằng, tính, ra, ngưỡng, vùng, ranh giới, đo, giai đoạn, hình, bước, nguồn, giới hạn)`);
  }
  if (!S.id) err(hdrLine, 'mô phỏng thiếu id');
  for (const [k, lab] of [['khang', 'khẳng định'], ['chucnang', 'chức năng'], ['nguon', 'nguồn'], ['gioiHan', 'giới hạn']]) if (!String(S[k]).trim()) err(hdrLine, `mô phỏng "${S.id}" thiếu ${lab}`);
  if (!SIM_KIEU.has(S.kieu)) err(hdrLine, `kiểu "${a.kv.kieu || '(trống)'}" chưa hỗ trợ (đã làm: thanh-trượt, dự-đoán)`);
  else {
    const calc = !!(S.bien || S.tinh.length || S.ra.length);
    if (S.kieu === 'du-doan' && !S.du) err(hdrLine, `kiểu dự-đoán cần dòng "- dự đoán: …"`);
    if (S.kieu === 'hat') {
      if (S.vung.length < 2) err(hdrLine, 'kiểu hạt cần ít nhất 2 dòng "- vùng: <tên> | hạt: <số>"');
      if (S.vung.reduce((s, v) => s + v.hat, 0) > 400) err(hdrLine, 'kiểu hạt: tổng số hạt không quá 400');
      if (!S.ranh) S.ranh = 'qua-lai';
    }
    if (S.kieu === 'hoat-hinh') {
      if (!S.hinh) err(hdrLine, 'kiểu hoạt-hình cần dòng "- hình: hoat-hinh/<id>.svg"');
      if (!S.buoc.length) err(hdrLine, 'kiểu hoạt-hình cần ít nhất một dòng "- bước: n | chữ: …"');
      if (S.hinh) {
        const stem = path.basename(file, '.md').replace(/\s*\(\d+\)$/, ''), cand = [path.join(path.dirname(file), S.hinh), path.join(ASSET_ARG ? path.resolve(ASSET_ARG.slice(9)) : path.join(ROOT, 'assets', 'bai'), stem.replace(/-album$/i, ''), S.hinh), path.join(ROOT, S.hinh)];
        const f = cand.find((p) => fs.existsSync(p));
        if (!f) err(S.hinhLine, `hoạt-hình: không thấy file SVG "${S.hinh}" (tìm cạnh file bài, trong assets/bai/<mã bài>/ và ở gốc repo)`);
        else {
          const svg = fs.readFileSync(f, 'utf8'); for (const m of checkSvgHoatHinh(svg)) err(S.hinhLine, `${S.hinh}: ${m}`);
          const gs = [...new Set([...svg.matchAll(/data-buoc\s*=\s*["'](\d+)["']/g)].map((m) => +m[1]))].sort((p, q) => p - q), bs = S.buoc.map((b) => b.n).sort((p, q) => p - q);
          if (!gs.length) err(S.hinhLine, `${S.hinh}: SVG không có nhóm <g data-buoc="n">`);
          else if (gs.join(',') !== bs.join(',')) err(S.hinhLine, `${S.hinh}: data-buoc trong SVG (${gs.join(', ')}) không khớp các dòng "bước" (${bs.join(', ')})`);
          S.svg = svg;
        }
      }
    }
    if (S.kieu === 'thanh-truot' || calc) {
      if (!S.bien) err(hdrLine, 'thiếu dòng "- biến: …"'); if (!S.tinh.length) err(hdrLine, 'thiếu dòng "- tính: …"'); if (!S.ra.length) err(hdrLine, 'thiếu dòng "- ra: …"');
      const names = new Set(S.tinh.map((u) => u.ten)); for (const r of S.ra) if (!names.has(r.ten)) err(r.line, `ra "${r.ten}" không có trong các dòng tính`);
      for (const g of S.nguong) if (S.ra[0] && !(S.ra[0].ten in g.k)) err(hdrLine, `ngưỡng "${g.ten}" cần khóa "${S.ra[0].ten}" (đại lượng ra)`);
      if (!errs.length) { try { const sc = { ...S.hang, ...(S.chon[0] ? S.chon[0].f : {}), [S.bien.ten]: S.bien.mac }; for (const u of S.tinh) sc[u.ten] = evalAst(u.ast, sc); if (!isFinite(sc[S.ra[0].ten])) err(hdrLine, `kết quả "${S.ra[0].ten}" không hữu hạn ở giá trị mặc định`); } catch (e) { err(hdrLine, e.message); } }
    }
  }
  return S;
}
// ============================================================ THUẬT NGỮ {{…}} VÀ KHO tu-dien/ (KHUNG v3 phần 2, mục 12)
const TD_ARG = process.argv.find((a) => a.startsWith('--tu-dien='));
const TD_DIR = TD_ARG ? path.resolve(TD_ARG.slice(10)) : path.join(ROOT, 'tu-dien');
const tdKey = (s) => deAccent(String(s)).toLowerCase().replace(/\s+/g, ' ').trim();
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const RE_TD = /\{\{([^{}]+?)\}\}/g;
const stripT = (s) => String(s).replace(RE_TD, (m, b) => b.split('|')[0].trim()); // bỏ {{ }} (tiêu đề cảnh, [TÓM])
let TD = { terms: new Map(), idx: new Map(), errs: [] }, TDX = { used: new Set(), xh: new Map() };
function parseTerm(file) {
  const L = fs.readFileSync(file, 'utf8').normalize('NFC').replace(/^﻿/, '').replace(/\r/g, '').split('\n'), base = path.basename(file, '.md');
  const T = { file: base + '.md', ten: '', ma: '', khac: [], anh: '', ngan: '', congThuc: '', kyHieu: '', sections: [], nguon: [], errs: [] };
  let cur = null;
  for (const l of L) {
    const h1 = l.match(/^#\s+(.+)$/), h2 = l.match(/^##\s+(.+)$/);
    if (h1 && !T.ten && !cur) { T.ten = h1[1].trim(); continue; }
    if (h2) { cur = { title: h2[1].trim(), lines: [] }; T.sections.push(cur); continue; }
    if (cur) { cur.lines.push(l); continue; }
    const m = l.match(/^\s*[-*]\s+\*\*(.+?):\*\*\s*(.*)$/); if (!m) continue;
    const k = deAccent(m[1]).toLowerCase().trim(), v = m[2].trim();
    if (k === 'ma') T.ma = v; else if (k === 'ten khac') T.khac = v.split(/[;,]/).map((x) => x.trim()).filter(Boolean); else if (k === 'anh') T.anh = v; else if (k === 'ngan') T.ngan = v; else if (k === 'cong thuc') T.congThuc = v; else if (k === 'ky hieu') T.kyHieu = v;
  }
  if (!T.ma) T.ma = base; T.ma = deAccent(T.ma).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!T.ten) T.ten = base;
  const ns = T.sections.find((s) => /^nguon/.test(deAccent(s.title).toLowerCase()));
  T.nguon = ns ? ns.lines.map((l) => l.replace(/^\s*(?:[-*]|\d+\.)\s+/, '').trim()).filter(Boolean) : [];
  if (!T.ngan) T.errs.push(`${T.file}: thiếu "Ngắn"`);
  if (!T.nguon.length) T.errs.push(`${T.file}: thiếu mục "Nguồn" (hoặc mục trống)`);
  return T;
}
function loadTuDien(dir) {
  const D = { terms: new Map(), idx: new Map(), errs: [] };
  if (!fs.existsSync(dir)) return D;
  for (const f of fs.readdirSync(dir).filter((x) => /\.md$/i.test(x)).sort()) {
    const T = parseTerm(path.join(dir, f)); D.errs.push(...T.errs);
    if (D.terms.has(T.ma)) { D.errs.push(`${T.file}: trùng Mã "${T.ma}" với ${D.terms.get(T.ma).file}`); continue; }
    D.terms.set(T.ma, T);
  }
  for (const T of D.terms.values()) for (const [k, kind] of [[T.ma, 'Mã'], [T.ten, 'Tên'], ...T.khac.map((x) => [x, 'Tên khác'])]) {
    const key = tdKey(k); if (!key) continue; const o = D.idx.get(key);
    if (o && o !== T.ma) D.errs.push(`${T.file}: ${kind} "${k}" trùng với trang ${D.terms.get(o).file}`); else D.idx.set(key, T.ma);
  }
  return D;
}
function termify(html, rel = '../tu-dien/') { // {{chữ|tên chuẩn}} → liên kết (chưa có trang: chữ thường; --nghiem báo lỗi)
  if (!html.includes('{{')) return html;
  return html.replace(RE_TD, (m, b) => {
    const [shown, canon] = b.split('|').map((x) => x.trim()), ma = TD.idx.get(tdKey(unesc(canon || shown)));
    if (!ma) return shown;
    TDX.used.add(ma); return `<a class="tu" href="${rel}${ma}.html" data-tu="${ma}">${shown}</a>`;
  });
}
function quetXuatHien(parsed) { // ma → [{t, href}]: tự quét mọi album, ghi chương
  const xh = new Map();
  for (const { A, name } of parsed) {
    if (!A.v3) continue; let chap = '', seen = new Set();
    for (const l of A.dong) {
      const hc = l.match(/^##\s+Chương\s+(\d+)/i); if (hc) chap = hc[1];
      for (const m of l.matchAll(RE_TD)) {
        const [shown, canon] = m[1].split('|').map((x) => x.trim()), ma = TD.idx.get(tdKey(canon || shown)); if (!ma) continue;
        const key = ma + '|' + chap; if (seen.has(key)) continue; seen.add(key);
        if (!xh.has(ma)) xh.set(ma, []); xh.get(ma).push({ t: A.title.replace(/\*\*/g, '') + (chap ? ' · Chương ' + chap : ''), href: '../bai/' + name + (chap ? '#/c' + chap : '') });
      }
    }
  }
  return xh;
}
const TU_CSS = `:root{--bg:#1E2B25;--panel:#263830;--line:#3A4F45;--text:#EAF0EC;--muted:#A9BDB2;--accent:#7FB2E5}
@media (prefers-color-scheme: light){:root{--bg:#F6F4EE;--panel:#FFFFFF;--line:#D9D5C8;--text:#1D2924;--muted:#51625A;--accent:#1F5F99}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:18px/1.65 "Segoe UI",system-ui,-apple-system,sans-serif}
main{max-width:760px;margin:0 auto;padding:20px 16px 72px}a{color:var(--accent)}
.back{display:inline-flex;align-items:center;min-height:44px}
h1{font-size:30px;line-height:1.25;margin:6px 0 4px}h2{font-size:21px;margin:28px 0 8px}
.mu{color:var(--muted);font-size:16px;margin:0 0 12px}.ngan{font-size:20px;line-height:1.5;margin:10px 0 14px;max-width:62ch}
.ct{background:var(--panel);border:1px dashed var(--line);border-radius:10px;padding:10px 14px;font-weight:600;margin:10px 0}
p,li{max-width:68ch;overflow-wrap:anywhere}li{margin:4px 0}.box{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:6px 18px 12px;margin:18px 0}
table.tb{border-collapse:collapse;width:100%;font-size:16px}table.tb th,table.tb td{border:1px solid var(--line);padding:6px 10px;text-align:left}
a.tu{text-decoration:underline dotted;text-underline-offset:3px}
.az{display:flex;flex-wrap:wrap;gap:4px 8px;margin:10px 0 4px}.az a{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;font-weight:700;border:1.5px solid var(--accent);border-radius:10px;text-decoration:none}
.lst{list-style:none;padding:0;margin:0}.lst li{border-top:1px solid var(--line);padding:6px 0}.lst a{font-weight:600;display:inline-flex;align-items:center;min-height:44px}
@media (max-width:640px){h1{font-size:25px}main{padding:16px 16px 64px}}`;
const tuPage = (title, body) => `<!doctype html>\n<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark light"><title>${esc(title)}</title><style>${TU_CSS}</style></head><body><main>${body}</main></body></html>\n`;
function dungTuDien(OUT, xh) {
  if (!TD.terms.size) return 0;
  fs.mkdirSync(path.join(OUT, 'tu-dien'), { recursive: true });
  const sav = TDX.used; TDX.used = new Set();
  for (const T of TD.terms.values()) {
    let b = `<a class="back" href="index.html">← Chỉ mục thuật ngữ</a><h1>${inl(T.ten)}</h1>`;
    const meta = [T.anh && `<b>Tiếng Anh:</b> ${inl(T.anh)}`, T.khac.length && `<b>Tên khác:</b> ${T.khac.map(inl).join('; ')}`, T.kyHieu && `<b>Ký hiệu:</b> ${inl(T.kyHieu)}`].filter(Boolean);
    if (meta.length) b += `<p class="mu">${meta.join(' · ')}</p>`;
    if (T.ngan) b += `<p class="ngan">${termify(inl(T.ngan), '')}</p>`;
    if (T.congThuc) b += `<div class="ct">${inl(T.congThuc)}</div>`;
    for (const s of T.sections) {
      if (/^nguon/.test(deAccent(s.title).toLowerCase())) continue;
      if (!s.lines.some((l) => l.trim())) continue;
      b += `<h2>${inl(s.title)}</h2>${termify(mdBlocks(s.lines), '')}`;
    }
    const ns = T.sections.find((s) => /^nguon/.test(deAccent(s.title).toLowerCase())); if (ns) b += `<h2>${inl(ns.title)}</h2>${mdBlocks(ns.lines)}`;
    const x = xh.get(T.ma) || []; b += `<h2>Xuất hiện ở</h2>` + (x.length ? `<ul>${x.map((i) => `<li><a href="${i.href}">${esc(i.t)}</a></li>`).join('')}</ul>` : '<p class="mu">Chưa có bài nào đánh dấu thuật ngữ này.</p>');
    fs.writeFileSync(path.join(OUT, 'tu-dien', T.ma + '.html'), tuPage(T.ten + ' · thuật ngữ', b), 'utf8');
  }
  TDX.used = sav;
  const letters = new Map();
  for (const T of [...TD.terms.values()].sort((p, q) => deAccent(p.ten).toLowerCase().localeCompare(deAccent(q.ten).toLowerCase()))) { const c = (deAccent(T.ten).trim()[0] || '#').toUpperCase(), L = /[A-Z]/.test(c) ? c : '#'; if (!letters.has(L)) letters.set(L, []); letters.get(L).push(T); }
  let b = `<h1>Thuật ngữ</h1><p class="mu">${TD.terms.size} thuật ngữ. Bấm để mở trang đầy đủ.</p><nav class="az" aria-label="Tra theo chữ cái">${[...letters.keys()].map((c) => `<a href="#k-${c === '#' ? 'khac' : c}">${c}</a>`).join('')}</nav>`;
  for (const [c, ts] of letters) b += `<h2 id="k-${c === '#' ? 'khac' : c}">${c}</h2><ul class="lst">${ts.map((T) => `<li><a href="${T.ma}.html">${inl(T.ten)}</a>${T.anh ? ` <span class="mu">(${inl(T.anh)})</span>` : ''}<br><span class="mu">${inl(T.ngan)}</span></li>`).join('')}</ul>`;
  fs.writeFileSync(path.join(OUT, 'tu-dien', 'index.html'), tuPage('Thuật ngữ', b), 'utf8');
  return TD.terms.size;
}
// dữ liệu khung trượt cho các thuật ngữ bài dùng
function tuData(xh) {
  const o = {};
  for (const ma of TDX.used) { const T = TD.terms.get(ma); if (!T) continue;
    o[ma] = { ten: inl(T.ten), anh: inl(T.anh), kyHieu: inl(T.kyHieu), ngan: inl(T.ngan), congThuc: inl(T.congThuc), nguon: T.nguon.slice(0, 4).map(inl), xh: (xh.get(ma) || []).map((i) => ({ t: esc(i.t), href: i.href })) }; }
  return o;
}

// ============================================================ GIAO DIỆN v3 (KHUNG v3, templates/album-v3.html)
// Mỗi cảnh = một khối ý. Thẻ gắn vào cảnh/chương gần nhất phía trên; [HỎI TRƯỚC] → chương; [VÍ DỤ GIẢI]/[TỰ GIẢI THÍCH]/[QUIZ]/[TÓM] → "phần luyện tập" cuối chương
// (đúng thứ tự khung: hỏi trước → khối ý → ví dụ → tự giải thích → quiz → tóm). [SỐ LIỆU] và [BẢN ĐỒ] ở lại cảnh chứa chúng.
const TPL3 = path.join(ROOT, 'templates', 'album-v3.html');
const VAI = { 'dinh nghia': ['def', 'Định nghĩa'], 'co che': ['mech', 'Cơ chế'], 'vi du so': ['num', 'Ví dụ số'], 'hieu sai thuong gap': ['warn', 'Hiểu sai thường gặp'], 'tu kiem tra': ['check', 'Tự kiểm tra'] };
const vaiOf = (s) => VAI[deAccent(s || '').toLowerCase().replace(/\s+/g, ' ').trim()] || null; // vai trò lạ → null (hiện như chữ thường)
function chuongV3(A, T) {
  return A.chapters.map((ch) => {
    const own = T.of.get(ch) || []; let hoi = own.find((i) => i.k === 'hoi-truoc') || null, tom = own.find((i) => i.k === 'tom') || null;
    const extras = own.filter((i) => !['hoi-truoc', 'tom', 'so-lieu', 'ban-do', 'mo-phong'].includes(i.k));
    const scenes = ch.scenes.map((sc) => {
      const its = T.of.get(sc) || [], charts = [], maps = [], sims = [];
      for (const it of its) {
        if (it.k === 'so-lieu') charts.push(it); else if (it.k === 'ban-do') maps.push(it); else if (it.k === 'mo-phong') sims.push(it);
        else if (it.k === 'hoi-truoc' && !hoi) hoi = it; else if (it.k === 'tom') tom = it; else if (it.k !== 'hoi-truoc') extras.push(it);
      }
      return { sc, charts, maps, sims };
    });
    return { ch, hoi, extras, tom, scenes };
  });
}
const inlT = (s) => termify(inl(s)); // chữ trong bài v3: {{thuật ngữ}} → liên kết bấm được
const inlP = (s) => inl(stripT(s));  // tiêu đề: không có {{ }}
function v3Data(A, F, dirs, T) {
  const x = (v) => inlT(v || '');
  const endItems = T.end.flatMap((g) => g.items);
  const chapters = chuongV3(A, T).map(({ ch, hoi, extras, tom, scenes }) => ({
    n: ch.n, title: inlP(ch.title), plain: stripT(ch.title), hoi, extras, tom: tom ? tom.items : [],
    blocks: scenes.map(({ sc, charts, maps, sims }, k) => {
      const vai = vaiOf(sc.vai);
      const paras = sc.steps.map((s) => (s.type === 'note' && s.tag ? `<b>${esc(s.tag)}:</b> ` : '') + inlT(s.text).replace(/\n• /g, '<br>• ')).concat(sc.notes.map((n) => inlT(n.text)));
      const figs = []; for (const { f } of sc.figs) { const id = resolveFig(f, { board: [] }, dirs, F); if (id !== null) figs.push(id); }
      return { id: `c${ch.n}-${k + 1}`, num: sc.num, title: inlP(sc.title), plain: stripT(sc.title), vai: vai ? vai[0] : '', vaiLabel: vai ? vai[1] : esc(sc.vai || ''), paras, nho: x(sc.nho), figs, charts, maps, sims: sims.filter((s) => !s.bad) };
    }),
  }));
  const onRai = endItems.filter((i) => i.k === 'on-rai');
  const nhoLai = endItems.filter((i) => i.k === 'nho-lai').flatMap((i) => i.qs);
  return {
    chapters, nhoLai,
    cover: { cauHoi: x(A.cauHoi), mucTieu: (A.mucTieu || []).map(x), meta: A.meta.filter((r) => !/^ma bai/.test(deAccent(r[0]).toLowerCase())).map((r) => [inl(r[0]), inl(r.slice(1).join(' | '))]) },
    onRai: { lich: (onRai[0] && onRai[0].lich) || [1, 3, 7, 21], qs: onRai.flatMap((i) => i.qs) },
  };
}
// --- --nghiem: kiểm tra theo KHUNG v3 (trả về danh sách lỗi; rỗng = đạt)
const lumHex = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const tuongPhan = (a, b) => { const [x, y] = [lumHex(a), lumHex(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
function kiemMau(tpl) { // đọc biến màu trong templates/album-v3.html, kiểm AA (4,5:1) cho cặp chữ/nền ở sáng, tối và nhấn CNTP
  const css = (tpl.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '', loi = [];
  const tok = (s) => Object.fromEntries([...(s || '').matchAll(/--([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
  const first = (re) => { const m = css.match(re); return m ? tok(m[1]) : {}; };
  const dark = first(/:root\s*\{([^}]*)\}/), light = first(/@media\s*\(prefers-color-scheme:\s*light\)\s*\{\s*:root\s*\{([^}]*)\}/);
  const cDark = first(/body\[data-mon="CNTP"\]\s*\{([^}]*)\}/), cLight = first(/@media\s*\(prefers-color-scheme:\s*light\)\s*\{\s*body\[data-mon="CNTP"\]\s*\{([^}]*)\}/);
  const sets = { 'tối (R&D)': dark, 'sáng (R&D)': { ...dark, ...light }, 'tối (CNTP)': { ...dark, ...cDark }, 'sáng (CNTP)': { ...dark, ...light, ...cLight } };
  for (const [ten, t] of Object.entries(sets)) {
    const cap = [['text', 'bg'], ['text', 'panel'], ['muted', 'bg'], ['muted', 'panel'], ['accent', 'bg'], ['accent', 'panel'], ['bg', 'accent'], ['ok', 'panel'], ['no', 'panel'],
      ...['r-def', 'r-mech', 'r-num', 'r-warn', 'r-check'].flatMap((r) => [[r, 'bg'], [r, 'panel']])];
    for (const [a, b] of cap) { if (!t[a] || !t[b]) { loi.push(`màu ${ten}: thiếu biến --${a} hoặc --${b}`); continue; } const c = tuongPhan(t[a], t[b]); if (c < 4.5) loi.push(`tương phản ${ten}: --${a} ${t[a]} trên --${b} ${t[b]} = ${c.toFixed(2)}:1 (< 4,5:1 AA)`); }
  }
  const fs18 = css.match(/body\s*\{[^}]*font:\s*(\d+(?:\.\d+)?)px\/(\d+(?:\.\d+)?)/);
  if (!fs18) loi.push('không đọc được cỡ chữ/giãn dòng của body'); else { if (+fs18[1] < 18) loi.push(`cỡ chữ ${fs18[1]}px < 18px`); if (+fs18[2] < 1.6) loi.push(`giãn dòng ${fs18[2]} < 1,6`); }
  const ch = css.match(/\.khoi\s+p\s*\{[^}]*max-width:\s*(\d+)ch/);
  if (!ch) loi.push('không đọc được max-width (ch) của đoạn chữ .khoi p'); else if (+ch[1] < 55 || +ch[1] > 80) loi.push(`chữ/dòng ${ch[1]}ch ngoài 55–80`);
  if (/@keyframes|animation\s*:|backdrop-filter/.test(css)) loi.push('có animation hoặc backdrop-filter (glass) trong CSS – bị cấm');
  return loi;
}
function hinhDaDung(A, mdFile) { // khóa hình (url nguồn / PubChem CID) đã dùng ở các bài khác trong bai/ và trong hinh-da-dung.md (nếu có)
  const refs = new Map(), norm = (u) => u.replace(/^http:/i, 'https:').replace(/[?#].*$/, '').replace(/\/+$/, '').toLowerCase();
  const base = (s) => s.replace(/\.md$/i, '').replace(/-album(-v3)?$/i, '').replace(/\s*\(\d+\)$/, '').toLowerCase();
  const scan = (txt, where, anyUrl, skipCode) => {
    for (const l of txt.split(/\r?\n/)) {
      if (skipCode && l.includes(skipCode)) continue;
      const m = l.match(/^\s*(?:[-*]\s+)?\[(?:HÌNH|HINH)\s*:\s*(https?:\/\/[^\s|\]]+)/i); if (m && !refs.has(norm(m[1]))) refs.set(norm(m[1]), where);
      const c = l.match(/^\s*(?:[-*]\s+)?\[3D\s*:[^\]]*?pub\s*chem\s*(?:cid)?\s*[:#]?\s*(\d+)/i); if (c && !refs.has('pubchem:' + c[1])) refs.set('pubchem:' + c[1], where);
      if (anyUrl) for (const u of l.match(/https?:\/\/[^\s|)\]>]+/g) || []) if (!refs.has(norm(u))) refs.set(norm(u), where);
    }
  };
  const self = base(path.basename(mdFile));
  if (fs.existsSync(IN)) for (const f of fs.readdirSync(IN).filter((x) => /\.md$/i.test(x) && /-album/i.test(x))) { if (base(f) === self || path.join(IN, f) === mdFile) continue; scan(fs.readFileSync(path.join(IN, f), 'utf8'), f, false); }
  for (const p of [path.join(ROOT, 'hinh-da-dung.md'), path.join(IN, 'hinh-da-dung.md'), path.join(ROOT, 'rd-food-lab', 'hinh-da-dung.md'), path.join(ROOT, 'docs-v3', 'hinh-da-dung.md')]) if (fs.existsSync(p)) scan(fs.readFileSync(p, 'utf8'), path.relative(ROOT, p), true, A.code);
  return { refs, norm };
}
function moPhongDaDung(A, mdFile) { // id và khẳng định mô phỏng đã dùng ở bài khác (bai/*-album.md) và trong mục "Mô phỏng đã dùng" của hinh-da-dung.md
  const ids = new Map(), khang = new Map(), base = (s) => s.replace(/\.md$/i, '').replace(/-album(-v3)?$/i, '').replace(/\s*\(\d+\)$/, '').toLowerCase(), self = base(path.basename(mdFile));
  const add = (id, kh, where) => { if (id && !ids.has(tdKey(id))) ids.set(tdKey(id), where); if (kh && !khang.has(tdKey(kh))) khang.set(tdKey(kh), where); };
  if (fs.existsSync(IN)) for (const f of fs.readdirSync(IN).filter((x) => /\.md$/i.test(x) && /-album/i.test(x))) {
    if (base(f) === self || path.join(IN, f) === mdFile) continue;
    for (const l of fs.readFileSync(path.join(IN, f), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*(?:[-*]\s+)?\[MÔ PHỎNG\s*:\s*([^|\]]+?)\s*[|\]]/i); if (m) add(m[1], (l.match(/khẳng định\s*:\s*([^|\]]+)/i) || [])[1], f); }
  }
  for (const p of [path.join(ROOT, 'hinh-da-dung.md'), path.join(IN, 'hinh-da-dung.md'), path.join(ROOT, 'rd-food-lab', 'hinh-da-dung.md'), path.join(ROOT, 'docs-v3', 'hinh-da-dung.md')]) {
    if (!fs.existsSync(p)) continue; let on = false;
    for (const l of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      if (/^#{1,6}\s/.test(l)) on = /mô phỏng đã dùng/i.test(l);
      else if (on && /^\s*-\s+/.test(l)) { const c = l.replace(/^\s*-\s+/, '').split('|').map((x) => x.trim()); if (c.length >= 4 && !(A.code && c[0].toLowerCase() === A.code.toLowerCase())) add(c[1], c[3], path.relative(ROOT, p)); }
    }
  }
  return { ids, khang };
}
function kiemNghiem(A, T, F, mdFile) {
  const loi = [], dong = (needle) => { const i = A.dong.findIndex((l) => needle && l.includes(needle) && /^\s*(?:[-*]\s+)?\[/.test(l)); return i < 0 ? '?' : i + 1; };
  const ten = path.basename(mdFile), words = (s) => s.replace(/\*\*|\*|`/g, '').trim().split(/\s+/).filter(Boolean).length;
  const { refs, norm } = hinhDaDung(A, mdFile), seen = new Map(), simDaDung = moPhongDaDung(A, mdFile), simTrong = new Set();
  A.dong.forEach((l, i) => { // 12.3: thuật ngữ chưa có trang; {{ }} trong tiêu đề Cảnh/Chương hoặc [TÓM]
    for (const m of l.matchAll(RE_TD)) { const [sh, ca] = m[1].split('|').map((v) => v.trim()); if (!TD.idx.has(tdKey(ca || sh))) loi.push(`${ten} dòng ${i + 1}: thuật ngữ "${m[0]}" chưa có trang trong tu-dien/`); }
    if (l.includes('{{') && /^#{1,6}\s/.test(l)) loi.push(`${ten} dòng ${i + 1}: {{…}} nằm trong tiêu đề`);
    if (l.includes('{{') && /^\s*\[TÓM\s*:/i.test(l)) loi.push(`${ten} dòng ${i + 1}: {{…}} nằm trong [TÓM]`);
  });
  for (const { ch, extras, tom, scenes } of chuongV3(A, T)) {
    if (ch.scenes.length > 4) loi.push(`Chương ${ch.n}: ${ch.scenes.length} cảnh (> 4)`);
    if (!tom) loi.push(`Chương ${ch.n}: thiếu [TÓM: …]`);
    if (!extras.some((i) => i.k === 'quiz')) loi.push(`Chương ${ch.n}: thiếu [QUIZ]`);
    for (const { sc, sims } of scenes) {
      const np = sc.steps.length + sc.notes.length;
      if (np > 3) loi.push(`Cảnh ${sc.num}: ${np} đoạn (> 3)`);
      const nh = sc.figs.length + sims.length;
      if (nh > 1) loi.push(`Cảnh ${sc.num}: ${nh} hình (> 1${sims.length ? ', tính cả mô phỏng' : ''})`);
      for (const s of sims) { // 11.5: thiếu trường, công thức sai, kiểu chưa hỗ trợ, id/khẳng định trùng
        for (const e of s.bad || []) loi.push(`${ten} dòng ${e.n}: ${e.m}`);
        const idk = tdKey(unesc(s.id)), kk = tdKey(s.khangRaw || '');
        if (simDaDung.ids.has(idk)) loi.push(`${ten} dòng ${s.line}: mô phỏng id "${unesc(s.id)}" đã dùng ở ${simDaDung.ids.get(idk)}`);
        else if (simTrong.has(idk)) loi.push(`${ten} dòng ${s.line}: mô phỏng id "${unesc(s.id)}" bị lặp trong cùng bài`);
        if (kk && simDaDung.khang.has(kk)) loi.push(`${ten} dòng ${s.line}: khẳng định của mô phỏng "${unesc(s.id)}" đã dùng ở ${simDaDung.khang.get(kk)}`);
        else if (kk && simTrong.has('k:' + kk)) loi.push(`${ten} dòng ${s.line}: khẳng định của mô phỏng "${unesc(s.id)}" lặp trong cùng bài`);
        simTrong.add(idk); if (kk) simTrong.add('k:' + kk);
      }
      if (words(sc.title) < 5) loi.push(`Cảnh ${sc.num}: tiêu đề chỉ ${words(sc.title)} từ (< 5): "${sc.title}"`);
      for (const { f } of sc.figs) {
        const key = f.src ? norm(f.src) : f.mols.length ? 'pubchem:' + f.mols[0].id : '', lbl = f.file || f.src || (f.mols[0] && f.mols[0].id) || '?', ln = dong(f.src || (f.mols[0] && f.mols[0].id) || f.file);
        if (!f.may && (!f.khang || !f.chucnang)) loi.push(`${ten} dòng ${ln}: hình "${lbl}" thiếu ${[!f.khang && 'khẳng định', !f.chucnang && 'chức năng'].filter(Boolean).join(' và ')}`);
        if (key && refs.has(key)) loi.push(`${ten} dòng ${ln}: hình "${lbl}" đã dùng ở ${refs.get(key)}`);
        if (key && seen.has(key)) loi.push(`${ten} dòng ${ln}: hình "${lbl}" trùng với hình ở dòng ${seen.get(key)} trong cùng bài`); else if (key) seen.set(key, ln);
      }
    }
  }
  loi.push(...kiemMau(fs.readFileSync(TPL3, 'utf8')).map((m) => 'giao diện: ' + m));
  return loi;
}

// ============================================================ DỰNG
async function renderAlbum(A, mdFile, extra = {}) {
  figSeq = 0;
  const dirs = figDirs(mdFile, A);
  const F = { figs: {}, byKey: {}, missing: new Set(), has3d: false, has3dmol: false, dir: assetDir(A), loiNguon: [], tuVe: [], may: new Set(), v2: !!extra.v2, A, lastLine: {}, boQua: [], v3: !!extra.v3, thieuKC: [], trung: [] };
  if (F.v3) TDX.used = new Set();
  const V2 = F.v2 ? theRa(A, F.v3 ? inlT : inl, F.v3 ? inlP : inl) : null;
  const v2Of = (o) => (F.v2 && !F.v3 ? { v2: V2.of.get(o) || [] } : {});
  const Q =(q) => ({ q: inl(q.q), opts: q.opts.map(inl), ans: q.ans ?? -1, expl: q.expl ? inl(q.expl) : '' });
  const chapters = F.v3 ? [] : A.chapters.map((ch) => ({
    n: ch.n, num: ch.isChap ? 'Chương ' + ch.n : String(ch.n), title: inl(ch.title), plain: ch.title, meta: inl(ch.meta), intro: ch.intro.map(inl), ...v2Of(ch),
    scenes: ch.scenes.map((sc, k) => {
      const id = `c${ch.n}-${k + 1}`;
      if (sc.quiz) return { id, num: sc.num, title: inl(sc.title), plain: sc.title, quiz: { pass: sc.quiz.pass || 0, qs: sc.quiz.qs.map(Q) }, notes: sc.notes.map((x) => ({ tag: esc(x.tag), text: inl(x.text) })), ...v2Of(sc) };
      const steps = sc.steps.map((s) => ({ t: s.type, tag: esc(s.tag || ''), html: inl(s.text).replace(/\n• /g, '<br>• '), board: s.board.map(inl), cite: s.cites.map(inl).join(' · '), figs: [] }));
      for (const x of sc.notes) steps.push({ t: /công thức/i.test(x.tag) ? 'formula' : 'note', tag: esc(x.tag), html: inl(x.text), board: [], cite: '', figs: [] });
      const sceneFigs = [];
      for (const { f, step } of sc.figs) {
        const idx = step ? sc.steps.indexOf(step) : -1;
        const fid = resolveFig(f, { board: step ? step.board : [] }, dirs, F);
        if (fid === null) continue; // v2: thẻ hình không có nguồn → bỏ qua
        if (idx >= 0) steps[idx].figs.push(fid); else sceneFigs.push(fid);
      }
      if (!steps.length && !(F.v2 && (V2.of.get(sc) || []).length)) steps.push({ t: 'note', tag: '', html: inl(sc.title), board: [], cite: '', figs: [] });
      const cho = (sc.figs[0] && sc.figs[0].f.cho) || '';
      return { id, num: sc.num, title: inl(sc.title), plain: sc.title, steps, figs: sceneFigs, cho: /phai/.test(cho) ? 'phai' : 'trai', cite: inl(sc.cite), guide: sc.guide ? '→ ' + inl(sc.guide) : '', ...v2Of(sc) };
    }),
  }));
  const data = {
    key: 'album:' + A.code, code: esc(A.code), title: inl(A.title), course: esc(A.course), topic: inl(A.topic), date: A.date, mon: esc(A.mon),
    meta: A.meta.map((r) => [inl(r[0]), inl(r.slice(1).join(' | '))]), intro: A.intro.map((x) => ({ tag: esc(x.tag), text: inl(x.text) })),
    chapters, summary: A.summary.map(inl), summaryFig: A.summaryFig ? resolveFig(A.summaryFig, { board: [] }, dirs, F) : null,
    endQuiz: A.endQuiz.map(Q),
    glossary: A.glossary ? { head: A.glossary.head.map(inl), rows: A.glossary.rows.map((r) => r.map(inl)) } : null,
    sources: A.sources.map(inl), sourcesNote: A.sourcesNote.map(inl), checks: A.checks.map(inl), checksNote: A.checksNote.map(inl),
    dossier: A.dossier ? { head: A.dossier.head.map(inl), rows: A.dossier.rows.map((r) => r.map(inl)) } : null,
    extra: F.v2 ? A.extra.filter((e) => e.html) : A.extra, figs: F.figs, built: vnNow(),
    self: extra.self || '', ds: extra.ds || [], // nút "📚 Bài khác": tên file trang này + danh sách mọi bài (mới nhất trên)
    taiVe: extra.offline ? '' : '../tai-ve/' + (extra.self || ''), // bản tải về chạy offline
    vendor: extra.offline ? {} : VENDOR_URL, // thư viện 3D tải lười (bản offline: nhúng sẵn)
    phongCach: { bai: A.phongCach, chapters: Object.fromEntries(A.chapters.filter((c) => c.phongCach).map((c) => [c.n, c.phongCach])) },
  };
  if (F.v3) { data.v3 = v3Data(A, F, dirs, V2); data.tu = tuData(TDX.xh); } // giao diện v3 (KHUNG v3); khung trượt thuật ngữ
  else if (F.v2) data.v2 = { end: V2.end }; // giao diện v2: khối thẻ học tập cuối bài; chapters[].v2 / scenes[].v2 đã gắn ở trên
  if (extra.offline && F.may.size) data.vendor = { hdr: 'data:application/octet-stream;base64,' + fs.readFileSync(HDRI).toString('base64') };
  const media = await tachHinh(F.figs, { outDir: extra.outDir, offline: !!extra.offline });
  let html = fs.readFileSync(F.v3 ? TPL3 : F.v2 ? TPL2 : TPL, 'utf8');
  let kinhCss = F.v2 ? '' : fs.readFileSync(path.join(ROOT, 'templates', 'phong-cach.css'), 'utf8'), kinhJs = '';
  if (extra.kinh && !F.v2) {
    data.kinh = kinhData(A, F);
    if (extra.offline) data.kinh.three = null; // bản offline: three.js nhúng sẵn bên dưới (window.THREE có ngay)
    kinhCss = fs.readFileSync(path.join(ROOT, 'templates', 'kinh.css'), 'utf8') + '\n' + kinhCss;
    kinhJs = '<script>' + fs.readFileSync(path.join(ROOT, 'templates', 'kinh.js'), 'utf8').replace(/<\/script/gi, '<\\/script') + '</script>';
    html = html.replace('<body>', `<body class="kinh tone-${data.kinh.tone} pc-${A.phongCach}" data-pc="${A.phongCach}">`);
  }
  html = html.replace('__KINH_CSS__', () => kinhCss).replace('__KINH_JS__', () => kinhJs);
  html = html.replace('__TITLE__', () => esc(A.title.replace(/\*\*/g, ''))).replace('__FONTS__', () => fontCss()).replace('__DATA__', () => jsonForScript(data)).replace('__VENDOR__', () => (extra.offline ? ((F.has3d || (extra.kinh && !F.v2) || F.may.size ? threeJs() : '') + (F.has3dmol ? molJs() : '') + (F.may.size ? mayJs([...F.may]) : '')) : ''));
  const qs =chapters.flatMap((c) => c.scenes.filter((s) => s.quiz).flatMap((s) => s.quiz.qs)).concat(data.endQuiz);
  const stats = { chapters: chapters.length, scenes: chapters.reduce((a, c) => a + c.scenes.length, 0), quiz: qs.length, quizNoAns: qs.filter((q) => q.ans < 0).length, figs: Object.keys(F.figs).length, figsTuVe: F.missing.size + F.tuVe.length, has3d: F.has3d, has3dmol: F.has3dmol, loiNguon: F.loiNguon.length, kb: Math.round(Buffer.byteLength(html) / 1024) };
  if (F.v3) { const cs = data.v3.chapters; Object.assign(stats, { giaoDien: 'v3', chapters: cs.length, scenes: cs.reduce((a, c) => a + c.blocks.length, 0), quiz: cs.reduce((a, c) => a + c.extras.filter((e) => e.k === 'quiz').reduce((b, e) => b + e.qs.length, 0), 0), quizNoAns: 0, hinhBoQua: F.boQua.length, theV2: A.the.length }); }
  else if (F.v2) Object.assign(stats, { giaoDien: 'v2', hinhBoQua: F.boQua.length, theV2: A.the.length });
  stats.anh = media;
  return { html, stats, missing: [...F.missing], F };
}

// ============================================================ GIAO DIỆN KÍNH 3D
// Tông màu theo chương: chất lượng (tím → xanh lá nhạt) hay công nghệ (navy → xanh). Vật thể thủy tinh theo nội dung chương.
const RE_CHAT_LUONG = /chất lượng|quality|QLCL|QMS|ISO|HACCP|GMP|ATTP|an toàn thực phẩm|kiểm soát|đảm bảo|cải tiến|hoạch định/i;
// thứ tự = ưu tiên khi tên chương khớp nhiều nhóm
const VAT = [
  ['banh-rang', /quy trình|process/i],
  ['te-bao', /vi sinh|vi khuẩn|tế bào|nấm men|nấm mốc|probiotic|lactic|lên men|vsv/i],
  ['giot-sua', /sữa|nhũ tương|kem|giọt|váng|béo|whey|casein|ly tâm/i],
  ['khien', /chất lượng|quality|ISO|HACCP|an toàn|quản lý/i],
  ['phan-tu', /phân tử|hóa|protein|enzyme|nước tự do|nước liên kết|độ ẩm|đường|lipid|axit|liên kết|pubchem|trích ly|membrane/i],
];
function kinhData(A, F) {
  const textOf = (ch) => [ch.title, ch.meta, ...ch.scenes.map((s) => s.title + ' ' + s.steps.map((x) => x.text).join(' '))].join(' ');
  const lessonTone = RE_CHAT_LUONG.test(A.course + ' ' + A.topic) ? 'chat-luong' : 'cong-nghe';
  const chapters = {};
  A.chapters.forEach((ch, i) => {
    const t = textOf(ch);
    const tone = RE_CHAT_LUONG.test(ch.title) ? 'chat-luong' : (/tiếng anh|ielts/i.test(ch.title) ? lessonTone : (RE_CHAT_LUONG.test(t.slice(0, 4000)) && lessonTone === 'chat-luong' ? 'chat-luong' : lessonTone));
    // ưu tiên dòng ghi đè *Vật thể: …* (kể cả "không"); không có thì dò theo tên chương; không khớp → không hiện vật thể (chỉ nền kính)
    const vat = ch.vat !== undefined ? ch.vat : ((VAT.find(([, re]) => re.test(ch.title)) || [null])[0]);
    chapters[ch.n] = { tone, vat };
  });
  const sdf = Object.values(F.figs).find((f) => f.kind === 'mol' && f.fmt === 'sdf');
  return { tone: lessonTone, chapters, three: '../vendor/three-r147.min.js', mol: sdf ? sdf.data : null };
}

async function main() {
  const args = process.argv.slice(2);
  const ra = args.find((a) => a.startsWith('--ra='));
  const OUT = path.resolve(ra ? ra.slice(5) : path.join(ROOT, '_site'));
  const only = args.filter((a) => !a.startsWith('--')).map((f) => path.resolve(f));
  const kinh = !args.includes('--giao-dien=phan'); // mặc định: giao diện kính 3D; --giao-dien=phan → bảng phấn cũ
  // --nghiem: ép MỌI bài dùng giao diện v2 (nền trơn, không tự vẽ hình dự phòng). Không có cờ: chỉ bài có thẻ v2 mới dùng v2, bài cũ giữ nguyên.
  const nghiem = args.includes('--nghiem'); // kiểm theo KHUNG v3 (chỉ bài dùng thẻ v3); có lỗi → thoát mã 2
  let nghiemLoi = 0;
  fs.mkdirSync(path.join(OUT, 'bai'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'tai-ve'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'vendor'), { recursive: true }); // thư viện 3D tách file riêng → trang bài tải lười
  for (const [from, to] of Object.values(VENDOR_FILES)) {
    const src = path.join(ROOT, 'assets', 'vendor', from);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, 'vendor', to));
  }
  // cảnh máy (tải lười): addon gộp, HDRI, bộ máy + module từng máy
  fs.writeFileSync(path.join(OUT, 'vendor', 'three-addons-r147.js'), addonsJs(), 'utf8');
  fs.mkdirSync(path.join(OUT, 'vendor', 'hdri'), { recursive: true }); fs.copyFileSync(HDRI, path.join(OUT, 'vendor', 'hdri', path.basename(HDRI)));
  fs.mkdirSync(path.join(OUT, 'may'), { recursive: true });
  for (const f of fs.readdirSync(path.join(ROOT, 'templates', 'may')).filter((x) => x.endsWith('.js'))) fs.copyFileSync(path.join(ROOT, 'templates', 'may', f), path.join(OUT, 'may', f));
  const all = fs.existsSync(IN) ? fs.readdirSync(IN).filter((f) => /\.md$/i.test(f)).sort().map((f) => path.join(IN, f)) : [];
  for (const f of only) if (!all.includes(f)) all.push(f); // file chỉ định ngoài bai/ (dựng thử)
  // Lượt 1: đọc mọi bài → danh sách (để trang bài nào cũng có nút "📚 Bài khác" đủ mọi bài)
  const items = [], parsed = []; let failed = 0;
  for (const md of all) {
    try {
      const A = parseAlbum(fs.readFileSync(md, 'utf8'), md);
      const name = pageName(A);
      const mdName = path.basename(md);
      if (A.the.length) console.log(`  thẻ v2 trong ${mdName}: ` + Object.entries(A.the.reduce((o, t) => (o[t.the] = (o[t.the] || 0) + 1, o), {})).map(([k, v]) => k + ' ×' + v).join(', ') + ' → giao diện ' + (A.v3 ? 'v3' : 'v2'));
      const nhom = /^CNTP-/i.test(mdName) ? 'cntp' : /^D0/i.test(mdName) ? 'rnd' : '';
      items.push({ f: 'bai/' + name, date: A.date, mon: A.mon, nhom, topic: A.topic.replace(/\*\*/g, '').replace(/^Ch(?:ương)?\s*\d+\s*/i, '').trim(), title: A.title.replace(/\*\*/g, ''), md: mdName });
      parsed.push({ md, A, name });
    } catch (e) { failed++; console.error(`LỖI ${path.basename(md)}: ${e.stack || e.message}`); }
  }
  TD = loadTuDien(TD_DIR); TDX.xh = quetXuatHien(parsed); // kho thuật ngữ và "Xuất hiện ở" (tự quét mọi album)
  for (const m of TD.errs) console.warn(`  (tu-dien: ${m})`);
  const thuTu = { cntp: 0, rnd: 1, '': 2 };
  items.sort((a, b) => b.date.localeCompare(a.date) || thuTu[a.nhom] - thuTu[b.nhom] || a.md.localeCompare(b.md));
  // Lượt 2: dựng từng bài
  for (const { md, A, name } of parsed) {
    if (only.length && !only.includes(path.resolve(md))) continue;
    try {
      await prefetch(figsToFetch(A), assetDir(A));
      const v2 = A.the.length > 0, v3 = !!A.v3; // bài cũ (không có thẻ v2/v3) dựng y hệt trước
      const { html, stats, missing, F } = await renderAlbum(A, md, { self: name, ds: items, kinh, v2, v3, outDir: OUT });
      fs.writeFileSync(path.join(OUT, 'bai', name), html, 'utf8');
      if (nghiem) {
        if (!v3) console.log(`   --nghiem: ${path.basename(md)} là bài cũ (chưa theo khung v3) → bỏ qua kiểm nghiêm`);
        else { const loi = kiemNghiem(A, theRa(A, inlT, inlP), F, md); nghiemLoi += loi.length; console.log(`   --nghiem ${path.basename(md)}: ${loi.length ? loi.length + ' LỖI' : 'ĐẠT'}` + loi.map((m) => '\n     ✗ ' + m).join('')); }
      }
      const off = await renderAlbum(A, md, { self: name, ds: items, kinh, v2, v3, outDir: OUT, offline: true });
      fs.writeFileSync(path.join(OUT, 'tai-ve', name), off.html, 'utf8');
      const nang = stats.kb > 1536 ? `  ⚠ trang > 1,5 MB trước khi tải 3D` : '';
      console.log(`ĐÃ DỰNG ${path.basename(md)} → bai/${name} (${stats.kb} KB${nang}) + tai-ve/ (${off.stats.kb} KB, offline)\n   ${JSON.stringify(stats)}${missing.length ? `\n   tự vẽ thay ${missing.length} hình chưa có: ${missing.join(', ')}` : ''}`);
    } catch (e) { failed++; console.error(`LỖI ${path.basename(md)}: ${e.stack || e.message}`); }
  }
  const nTd = dungTuDien(OUT, TDX.xh);
  if (nTd) { console.log(`Thuật ngữ: ${nTd} trang → tu-dien/ (+ index.html)`); if (nghiem) { console.log(`   --nghiem tu-dien: ${TD.errs.length ? TD.errs.length + ' LỖI' : 'ĐẠT'}` + TD.errs.map((m) => '\n     ✗ ' + m).join('')); nghiemLoi += TD.errs.length; } }
  // danh sách mới nhất cho các trang bài (trang bài đọc file này; mở offline thì dùng danh sách nhúng sẵn)
  fs.writeFileSync(path.join(OUT, 'bai', 'danh-sach.json'), JSON.stringify({ items, built: vnNow() }), 'utf8');
  let home = fs.readFileSync(HOME_TPL, 'utf8');
  home = home.replace('__FONTS__', () => fontCss()).replace('__DATA__', () => jsonForScript({ items, built: vnNow() }));
  fs.writeFileSync(path.join(OUT, 'index.html'), home, 'utf8');
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  console.log(`Trang chủ: index.html (${items.length} bài) → ${OUT}`);
  if (failed) { console.error(`${failed} bài lỗi`); process.exitCode = 1; }
  if (nghiemLoi) { console.error(`--nghiem: ${nghiemLoi} lỗi theo khung v3`); process.exitCode = 2; }
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
