#!/usr/bin/env node
// Lấy mọi file *-album.md từ các thư mục Google Drive chia sẻ công khai (drive.json) vào bai/.
// Không cần đăng nhập hay khóa API. Bỏ qua file khác (.docx, .pdf…). Không xóa gì trong bai/.
//
// Liệt kê thư mục bằng 2 cách rồi gộp lại (cách nào lỗi thì dùng cách còn lại):
//   1. https://drive.google.com/embeddedfolderview?id=<ID>  (trang nhúng: liệt kê toàn bộ mục, không phân trang)
//   2. dữ liệu _DRIVE_ivd trong https://drive.google.com/drive/folders/<ID>
// Duyệt cả thư mục con (sâu tối đa 3 cấp). Tải song song 4 file, thử lại 3 lần.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const BAI = path.join(ROOT, 'bai');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'drive.json'), 'utf8'));
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const RE_ALBUM = /-album(\s*\(\d+\))?\.md$/i;
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(u, { tries = 3, text = true } = {}) {
  let err;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(u, { headers: { 'user-agent': UA, 'accept-language': 'vi,en;q=0.8' }, redirect: 'follow' });
      if (r.status === 429 || r.status >= 500) throw new Error('HTTP ' + r.status);
      if (!r.ok) { const e = new Error('HTTP ' + r.status); e.final = true; throw e; }
      return text ? await r.text() : Buffer.from(await r.arrayBuffer());
    } catch (e) { err = e; if (e.final) break; await sleep(1500 * (i + 1)); }
  }
  throw err;
}
const unent = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));

async function listEmbedded(id) {
  const html = await get(`https://drive.google.com/embeddedfolderview?id=${id}`);
  const out = [];
  for (const m of html.matchAll(/<div class="flip-entry" id="entry-([\w-]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]*)<\/div>/g)) {
    out.push({ id: m[1], name: unent(m[3]).trim(), folder: /\/folders\//.test(m[2]) });
  }
  return out;
}
async function listPage(id) {
  const html = await get(`https://drive.google.com/drive/folders/${id}`);
  const m = html.match(/_DRIVE_ivd'\]\s*=\s*'((?:[^'\\]|\\.)*)'/);
  if (!m) return [];
  // giải mã chuỗi JS một lượt: \xHH, \uHHHH, \n, \t, còn lại \X → X
  const json = m[1].replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[\s\S])/g, (a, e) => (e[0] === 'x' && e.length === 3) || (e[0] === 'u' && e.length === 5) ? String.fromCharCode(parseInt(e.slice(1), 16)) : e === 'n' ? '\n' : e === 't' ? '\t' : e);
  let data; try { data = JSON.parse(json); } catch { return []; }
  const rows = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
  return rows.filter((r) => Array.isArray(r) && typeof r[0] === 'string' && typeof r[2] === 'string')
    .map((r) => ({ id: r[0], name: r[2], folder: r[3] === FOLDER_MIME, modified: typeof r[9] === 'number' ? r[9] : 0 }));
}
async function listFolder(id, ten, depth = 0, seen = new Set()) {
  if (seen.has(id) || depth > 3) return [];
  seen.add(id);
  const [a, b] = await Promise.allSettled([listEmbedded(id), listPage(id)]);
  const map = new Map();
  for (const r of [a, b]) if (r.status === 'fulfilled') for (const e of r.value) map.set(e.id, { ...(map.get(e.id) || {}), ...e });
  if (a.status === 'rejected' && b.status === 'rejected') console.warn(`  ! không đọc được thư mục ${ten}: ${a.reason?.message} / ${b.reason?.message}`);
  const counts = `embeddedfolderview ${a.status === 'fulfilled' ? a.value.length : 'lỗi'}, trang thư mục ${b.status === 'fulfilled' ? b.value.length : 'lỗi'}`;
  console.log(`  ${'  '.repeat(depth)}${ten}: ${map.size} mục (${counts})`);
  let files = [];
  for (const e of map.values()) {
    if (e.folder) files = files.concat(await listFolder(e.id, ten + '/' + e.name, depth + 1, seen));
    else files.push({ ...e, from: ten });
  }
  return files;
}
async function download(f) {
  const urls = [`https://drive.usercontent.google.com/download?id=${f.id}&export=download&confirm=t`, `https://drive.google.com/uc?export=download&id=${f.id}`];
  let last;
  for (const u of urls) {
    try {
      const buf = await get(u, { text: false });
      const s = buf.toString('utf8');
      if (/^\s*<!doctype html|^\s*<html/i.test(s)) throw new Error('nhận về trang HTML thay vì file');
      return s.replace(/^﻿/, '');
    } catch (e) { last = e; }
  }
  throw last;
}
async function pool(items, n, fn) {
  const res = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; res[k] = await fn(items[k]); } }));
  return res;
}

const normName = (n) => n.replace(/\s*\(\d+\)(?=\.md$)/i, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim();
async function main() {
  fs.mkdirSync(BAI, { recursive: true });
  console.log('Liệt kê thư mục Drive:');
  let all = [];
  for (const t of CFG.thuMuc) all = all.concat(await listFolder(t.id, t.ten));
  const albums = all.filter((f) => RE_ALBUM.test(f.name));
  console.log(`Tổng ${all.length} file, trong đó ${albums.length} file *-album.md (bỏ qua ${all.length - albums.length} file khác).`);
  // trùng tên giữa các thư mục: giữ bản sửa gần nhất
  const byName = new Map();
  for (const f of albums) { const k = normName(f.name).toLowerCase(); const o = byName.get(k); if (!o || (f.modified || 0) > (o.modified || 0)) byName.set(k, f); }
  const list = [...byName.values()];
  const stat = { thuMuc: CFG.thuMuc.length, tongFile: all.length, album: list.length, moi: 0, doi: 0, giuNguyen: 0, loi: 0, tep: [] };
  await pool(list, 4, async (f) => {
    const name = normName(f.name), dst = path.join(BAI, name);
    try {
      const txt = await download(f);
      const cur = fs.existsSync(dst) ? fs.readFileSync(dst, 'utf8') : null;
      if (cur === txt) { stat.giuNguyen++; return; }
      fs.writeFileSync(dst, txt, 'utf8');
      if (cur === null) stat.moi++; else stat.doi++;
      stat.tep.push(`${cur === null ? 'mới' : 'đổi'}: ${name} (${f.from})`);
    } catch (e) { stat.loi++; console.warn(`  ! lỗi tải ${f.name}: ${e.message}`); }
  });
  for (const l of stat.tep) console.log('  ' + l);
  console.log(`Kết quả: ${stat.album} file album · mới ${stat.moi} · đổi ${stat.doi} · giữ nguyên ${stat.giuNguyen} · lỗi ${stat.loi}`);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Lấy bài từ Google Drive\n- Thư mục: ${CFG.thuMuc.map((t) => t.ten).join(', ')}\n- Tổng ${stat.tongFile} file, ${stat.album} file *-album.md\n- Mới ${stat.moi} · đổi ${stat.doi} · giữ nguyên ${stat.giuNguyen} · lỗi ${stat.loi}\n${stat.tep.map((l) => '  - ' + l).join('\n')}\n`);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `album=${stat.album}\nmoi=${stat.moi}\ndoi=${stat.doi}\nloi=${stat.loi}\n`);
  if (stat.loi && stat.loi === stat.album && stat.album > 0) process.exitCode = 1; // tải hỏng toàn bộ → báo lỗi
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
