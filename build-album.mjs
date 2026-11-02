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
import { ROOT, fontCss, threeJs, esc, inl, deAccent, jsonForScript } from './lib/nhung.mjs';
import { autoFig } from './lib/hinh-tu-ve.mjs';

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
const reFig = /^\[(HÌNH|HINH|3D|MÔ HÌNH|MO HINH)\s*:\s*([^\]]+)\]\s*$/i;
function parseFig(s) {
  const m = s.trim().match(reFig); if (!m) return null;
  const parts = m[2].split('|').map((x) => x.trim());
  const f = { file: parts[0], cho: '', hien: '', cungY: 0, nhan: '' };
  for (const p of parts.slice(1)) {
    const kv = p.match(/^([^:]+):\s*(.*)$/); if (!kv) continue;
    const k = deAccent(kv[1]).toLowerCase().trim();
    if (k === 'cho') f.cho = deAccent(kv[2]).toLowerCase(); else if (k === 'hien') f.hien = deAccent(kv[2]).toLowerCase().replace(/\s+/g, '-');
    else if (k === 'cung y') f.cungY = parseInt(kv[2], 10) || 0; else if (k === 'nhan') f.nhan = kv[2];
  }
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
function parseScene(title, lines) {
  const mt = title.match(/^(?:Cảnh\s+)?(\d+(?:\.\d+)*)\s*[–—-]\s*(.+)$/);
  const sc = { num: mt ? mt[1] : '', title: (mt ? mt[2] : title).trim(), steps: [], figs: [], cite: '', guide: '', quiz: null, notes: [] };
  const hasQuiz = lines.some((l, i) => /^\d+\.\s/.test(l) && /^\s+[-*]\s+[A-D][.)]/.test(lines[i + 1] || ''));
  let item = null; const pending = [];
  const step = (s) => { sc.steps.push(s); item = s; };
  for (const l of lines) {
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
function parseAlbum(src, file) {
  const lines = src.replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
  let h1 = ''; const pre = [], secs = []; let cur = null;
  for (const l of lines) {
    if (!h1 && /^# /.test(l) && !cur) { h1 = l.slice(2).trim(); continue; }
    const m = l.match(/^## (.+)$/);
    if (m) { cur = { title: m[1].trim(), lines: [] }; secs.push(cur); continue; }
    (cur ? cur.lines : pre).push(l);
  }
  const A = { h1, meta: [], intro: [], chapters: [], summary: [], summaryFig: null, endQuiz: [], answers: {}, glossary: null, sources: [], sourcesNote: [], checks: [], checksNote: [], dossier: null, extra: [] };
  A.meta = tableRows(pre).filter((r) => r.length >= 2 && !/^mục$/i.test(r[0]));
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
      const ch = { n: mc ? +mc[1] : chN, title: mc ? mc[2].trim() : s.title, isChap: !!mc, meta: '', intro: [], scenes: [] };
      const blocks = []; let b = { title: null, lines: [] }; blocks.push(b);
      for (const l of s.lines) { const m = l.match(/^###\s+(.+)$/); if (m) { b = { title: m[1].trim(), lines: [] }; blocks.push(b); } else b.lines.push(l); }
      const head = blocks.shift();
      for (const l of head.lines) { const x = l.trim(); if (!x || /^---+$/.test(x)) continue; if (!ch.meta && /^\*[^*].*\*$/.test(x)) ch.meta = x.slice(1, -1); else ch.intro.push(x); }
      if (!blocks.length && ch.intro.length) { blocks.push({ title: ch.title, lines: head.lines.filter((l) => !(ch.meta && l.trim() === '*' + ch.meta + '*')) }); ch.intro = []; }
      blocks.forEach((bl, k) => { const sc = parseScene(bl.title, bl.lines); if (!sc.num) sc.num = `${ch.n}.${k + 1}`; ch.scenes.push(sc); });
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
  A.code = metaGet(/^ma bai/) || stem.replace(/-album$/i, '');
  const hm = h1.match(/^(.+?)\s+·\s+(.+?)\s+[–—]\s+(.+)$/) || h1.match(/^(.+?)\s+[–—]\s+(.+)$/);
  A.course = hm && hm.length === 4 ? hm[2] : '';
  A.topic = hm ? hm[hm.length - 1] : (h1 || stem);
  A.title = h1 || stem;
  let dm = (A.code + ' ' + stem).match(/(20\d\d)-(\d\d)-(\d\d)/);
  if (!dm) { const v = metaGet(/^ngay/).match(/(\d{1,2})\/(\d{1,2})\/(20\d\d)/); if (v) dm = [null, v[3], p2(v[2]), p2(v[1])]; }
  const mt = fs.statSync(file).mtime;
  A.date = dm ? `${dm[1]}-${dm[2]}-${dm[3]}` : `${mt.getFullYear()}-${p2(mt.getMonth() + 1)}-${p2(mt.getDate())}`;
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
  svg = svg.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[\s\S]*?>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
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
function resolveFig(f, ctx, dirs, F) {
  const key = f.file + '|' + (f.nhan || '') + '|' + (ctx.board || []).join('/');
  if (F.byKey[key]) return F.byKey[key];
  const id = 'h' + (++figSeq), found = findFile(dirs, f.file);
  let fig;
  if (found && /\.svg$/i.test(found)) fig = { kind: 'svg', svg: cleanSvg(fs.readFileSync(found, 'utf8'), id + '-') };
  else if (found && /\.(png|jpe?g|gif|webp)$/i.test(found)) { const ext = path.extname(found).slice(1).toLowerCase().replace('jpg', 'jpeg'); fig = { kind: 'img', src: `data:image/${ext};base64,` + fs.readFileSync(found).toString('base64') }; }
  else if (found && /\.glb$/i.test(found)) { fig = { kind: '3d', fmt: 'glb', b64: fs.readFileSync(found).toString('base64') }; F.has3d = true; }
  else if (found && /\.gltf$/i.test(found)) { fig = { kind: '3d', fmt: 'gltf', b64: inlineGltf(found) }; F.has3d = true; }
  else { fig = { kind: 'auto', svg: autoFig({ file: f.file, nhan: f.nhan, board: ctx.board }) }; F.missing.add(f.file); }
  Object.assign(fig, { file: f.file, cho: f.cho, hien: f.hien, nhan: f.nhan });
  F.figs[id] = fig; F.byKey[key] = id;
  return id;
}

// ============================================================ DỰNG
function renderAlbum(A, mdFile) {
  figSeq = 0;
  const dirs = figDirs(mdFile, A);
  const F = { figs: {}, byKey: {}, missing: new Set(), has3d: false };
  const Q = (q) => ({ q: inl(q.q), opts: q.opts.map(inl), ans: q.ans ?? -1, expl: q.expl ? inl(q.expl) : '' });
  const chapters = A.chapters.map((ch) => ({
    n: ch.n, num: ch.isChap ? 'Chương ' + ch.n : String(ch.n), title: inl(ch.title), plain: ch.title, meta: inl(ch.meta), intro: ch.intro.map(inl),
    scenes: ch.scenes.map((sc, k) => {
      const id = `c${ch.n}-${k + 1}`;
      if (sc.quiz) return { id, num: sc.num, title: inl(sc.title), plain: sc.title, quiz: { pass: sc.quiz.pass || 0, qs: sc.quiz.qs.map(Q) }, notes: sc.notes.map((x) => ({ tag: esc(x.tag), text: inl(x.text) })) };
      const steps = sc.steps.map((s) => ({ t: s.type, tag: esc(s.tag || ''), html: inl(s.text).replace(/\n• /g, '<br>• '), board: s.board.map(inl), cite: s.cites.map(inl).join(' · '), figs: [] }));
      for (const x of sc.notes) steps.push({ t: /công thức/i.test(x.tag) ? 'formula' : 'note', tag: esc(x.tag), html: inl(x.text), board: [], cite: '', figs: [] });
      const sceneFigs = [];
      for (const { f, step } of sc.figs) {
        const idx = step ? sc.steps.indexOf(step) : -1;
        const fid = resolveFig(f, { board: step ? step.board : [] }, dirs, F);
        if (idx >= 0) steps[idx].figs.push(fid); else sceneFigs.push(fid);
      }
      if (!steps.length) steps.push({ t: 'note', tag: '', html: inl(sc.title), board: [], cite: '', figs: [] });
      const cho = (sc.figs[0] && sc.figs[0].f.cho) || '';
      return { id, num: sc.num, title: inl(sc.title), plain: sc.title, steps, figs: sceneFigs, cho: /phai/.test(cho) ? 'phai' : 'trai', cite: inl(sc.cite), guide: sc.guide ? '→ ' + inl(sc.guide) : '' };
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
    extra: A.extra, figs: F.figs, built: vnNow(),
  };
  let html = fs.readFileSync(TPL, 'utf8');
  html = html.replace('__TITLE__', () => esc(A.title.replace(/\*\*/g, ''))).replace('__FONTS__', () => fontCss()).replace('__DATA__', () => jsonForScript(data)).replace('__VENDOR__', () => (F.has3d ? threeJs() : ''));
  const qs = chapters.flatMap((c) => c.scenes.filter((s) => s.quiz).flatMap((s) => s.quiz.qs)).concat(data.endQuiz);
  const stats = { chapters: chapters.length, scenes: chapters.reduce((a, c) => a + c.scenes.length, 0), quiz: qs.length, quizNoAns: qs.filter((q) => q.ans < 0).length, figs: Object.keys(F.figs).length, figsTuVe: F.missing.size, has3d: F.has3d, kb: Math.round(Buffer.byteLength(html) / 1024) };
  return { html, stats, missing: [...F.missing] };
}

function main() {
  const args = process.argv.slice(2);
  const ra = args.find((a) => a.startsWith('--ra='));
  const OUT = path.resolve(ra ? ra.slice(5) : path.join(ROOT, '_site'));
  const only = args.filter((a) => !a.startsWith('--')).map((f) => path.resolve(f));
  fs.mkdirSync(path.join(OUT, 'bai'), { recursive: true });
  const all = fs.existsSync(IN) ? fs.readdirSync(IN).filter((f) => /\.md$/i.test(f)).sort().map((f) => path.join(IN, f)) : [];
  const items = []; let failed = 0;
  for (const md of all) {
    try {
      const A = parseAlbum(fs.readFileSync(md, 'utf8'), md);
      const name = pageName(A);
      items.push({ f: 'bai/' + name, date: A.date, mon: A.mon, title: A.title.replace(/\*\*/g, ''), md: path.basename(md) });
      if (only.length && !only.includes(path.resolve(md))) continue;
      const { html, stats, missing } = renderAlbum(A, md);
      fs.writeFileSync(path.join(OUT, 'bai', name), html, 'utf8');
      console.log(`ĐÃ DỰNG ${path.basename(md)} → bai/${name}\n   ${JSON.stringify(stats)}${missing.length ? `\n   tự vẽ thay ${missing.length} hình chưa có: ${missing.join(', ')}` : ''}`);
    } catch (e) { failed++; console.error(`LỖI ${path.basename(md)}: ${e.stack || e.message}`); }
  }
  items.sort((a, b) => b.date.localeCompare(a.date) || a.md.localeCompare(b.md));
  let home = fs.readFileSync(HOME_TPL, 'utf8');
  home = home.replace('__FONTS__', () => fontCss()).replace('__DATA__', () => jsonForScript({ items, built: vnNow() }));
  fs.writeFileSync(path.join(OUT, 'index.html'), home, 'utf8');
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  console.log(`Trang chủ: index.html (${items.length} bài) → ${OUT}`);
  if (failed) { console.error(`${failed} bài lỗi`); process.exitCode = 1; }
}
main();
