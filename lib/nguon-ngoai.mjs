// Tải hình và tọa độ phân tử từ nguồn ngoài vào assets của bài (chỉ tải một lần; lần sau dùng lại từ file .nguon.json).
//   - Wikimedia Commons: trang File:… → file gốc (SVG hoặc ảnh ≤ 2,5 MB; ảnh lớn hơn lấy bản 1600 px) + tác giả + giấy phép
//   - Trang khác: link thẳng tới ảnh, hoặc ảnh og:image của trang
//   - PubChem CID → SDF 3D (không có thì 2D);  RCSB PDB → .pdb (không có thì .cif)
// Lỗi gì cũng không làm hỏng việc dựng: gắn f.fail để trang hiện khung ghi tên nguồn.
import fs from 'node:fs';
import path from 'node:path';
import { deAccent, esc } from './nhung.mjs';

const UA = 'hoc-hom-nay/1.0 (https://github.com/viethoangok40-commits/hoc-hom-nay; album hoc tap)';
const MAX_ORIG = 2.5 * 1024 * 1024;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function req(u, { tries = 3, as = 'buf', timeout = 30000 } = {}) {
  let err;
  for (let i = 0; i < tries; i++) {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeout);
    try {
      const r = await fetch(u, { headers: { 'user-agent': UA, accept: '*/*' }, redirect: 'follow', signal: ac.signal });
      if (r.status === 404 || r.status === 400 || r.status === 410) { const e = new Error('HTTP ' + r.status); e.final = true; throw e; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const ct = r.headers.get('content-type') || '';
      if (/misuse\.ncbi\.nlm\.nih\.gov/.test(r.url)) { const e = new Error('NCBI chặn truy cập từ địa chỉ IP này'); e.final = true; throw e; }
      const body = as === 'json' ? await r.json() : as === 'text' ? await r.text() : Buffer.from(await r.arrayBuffer());
      return { body, ct, url: r.url };
    } catch (e) { err = e; if (e.final) break; await sleep(1200 * (i + 1)); } finally { clearTimeout(t); }
  }
  throw err;
}
const safeName = (s) => deAccent(s).replace(/\s+/g, '_').replace(/[^\w.-]+/g, '-').replace(/-+/g, '-').replace(/^[-.]+|[-.]+$/g, '').slice(0, 90) || 'hinh';
const stripTags = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
const extOfCt = (ct) => (/svg/.test(ct) ? 'svg' : /png/.test(ct) ? 'png' : /jpe?g/.test(ct) ? 'jpg' : /gif/.test(ct) ? 'gif' : /webp/.test(ct) ? 'webp' : '');
function withExt(name, ext) { const b = name.replace(/\.(svg|png|jpe?g|gif|webp|tiff?|bmp)$/i, ''); return ext ? `${b}.${ext}` : name; }

function commonsTitle(u) {
  try {
    const x = new URL(u);
    if (/wikimedia\.org|wikipedia\.org/.test(x.hostname)) {
      let m = decodeURIComponent(x.pathname).match(/\/wiki\/((?:File|Tập_tin|Tập tin|Image):.+)$/i);
      if (m) return 'File:' + m[1].replace(/^[^:]+:/, '').replace(/_/g, ' ');
      if (x.searchParams.get('title')) return x.searchParams.get('title').replace(/_/g, ' ');
      m = decodeURIComponent(x.pathname).match(/\/upload\.wikimedia\.org|\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/i);
      if (/upload\.wikimedia\.org/.test(x.hostname)) { const p = decodeURIComponent(x.pathname).split('/'); const i = p.indexOf('thumb'); const fn = i >= 0 ? p[i + 3] : p[p.length - 1]; if (fn) return 'File:' + fn.replace(/_/g, ' '); }
    }
  } catch { /* không phải URL */ }
  return null;
}
export function creditHtml(c) {
  if (!c) return '';
  const a = (u, t) => (u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t));
  const parts = [];
  if (c.ten) parts.push(esc(c.ten));
  if (c.tacGia) parts.push(esc(c.tacGia));
  parts.push(a(c.nguon, c.trang || 'trang nguồn'));
  if (c.giayPhep) parts.push(a(c.giayPhepUrl, c.giayPhep));
  if (c.ban === 'thu nhỏ') parts.push('bản thu nhỏ 1600 px');
  return 'Nguồn: ' + parts.join(' · ');
}

async function fetchImage(f, dir) {
  const hint = f.file ? safeName(path.basename(f.file)) : '';
  // dùng lại nếu đã tải
  const metas = fs.existsSync(dir) ? fs.readdirSync(dir).filter((x) => x.endsWith('.nguon.json')) : [];
  for (const mf of metas) {
    try { const c = JSON.parse(fs.readFileSync(path.join(dir, mf), 'utf8')); if (c.src === f.src && c.tep && fs.existsSync(path.join(dir, c.tep))) { f.local = path.join(dir, c.tep); f.credit = c; return 'cũ'; } } catch { /* bỏ qua */ }
  }
  fs.mkdirSync(dir, { recursive: true });
  const title = commonsTitle(f.src);
  let buf, ext, credit;
  if (title) {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1600&titles=${encodeURIComponent(title)}`;
    const { body } = await req(api, { as: 'json' });
    const page = Object.values(body?.query?.pages || {})[0];
    const ii = page && page.imageinfo && page.imageinfo[0];
    if (!ii) throw new Error('Commons không có file ' + title);
    const md = ii.extmetadata || {};
    const orig = /svg/.test(ii.mime) || (ii.size || 0) <= MAX_ORIG;
    const pick = orig ? ii.url : (ii.thumburl || ii.url);
    const r = await req(pick);
    buf = r.body; ext = extOfCt(r.ct) || path.extname(new URL(pick).pathname).slice(1).toLowerCase();
    credit = { src: f.src, nguon: ii.descriptionurl || f.src, trang: 'Wikimedia Commons', ten: stripTags(md.ObjectName?.value) || title.replace(/^File:/, ''), tacGia: stripTags(md.Artist?.value), giayPhep: stripTags(md.LicenseShortName?.value) || stripTags(md.UsageTerms?.value), giayPhepUrl: md.LicenseUrl?.value || '', goc: ii.url, ban: orig ? 'gốc' : 'thu nhỏ' };
    if (credit.tacGia.length > 80) credit.tacGia = credit.tacGia.slice(0, 77) + '…';
  } else {
    let r = await req(f.src);
    if (!/^image\//.test(r.ct)) {
      const html = r.body.toString('utf8');
      const og = (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image/i) || [])[1];
      if (!og) throw new Error('trang không có ảnh (og:image)');
      const site = (html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)/i) || [])[1];
      const ttl = (html.match(/<title>([^<]{1,120})<\/title>/i) || [])[1];
      credit = { src: f.src, nguon: f.src, trang: stripTags(site) || new URL(f.src).hostname, ten: stripTags(ttl), giayPhep: 'xem điều khoản tại trang nguồn' };
      r = await req(new URL(og.replace(/&amp;/g, '&'), f.src).href);
      if (!/^image\//.test(r.ct)) throw new Error('og:image không phải ảnh');
    } else credit = { src: f.src, nguon: f.src, trang: new URL(f.src).hostname, giayPhep: 'xem điều khoản tại trang nguồn' };
    buf = r.body; ext = extOfCt(r.ct) || 'jpg';
  }
  if (!buf || !buf.length) throw new Error('file rỗng');
  const name = withExt(hint || safeName(title ? title.replace(/^File:/, '') : new URL(f.src).pathname.split('/').pop() || 'hinh'), ext);
  fs.writeFileSync(path.join(dir, name), buf);
  credit.tep = name;
  fs.writeFileSync(path.join(dir, name + '.nguon.json'), JSON.stringify(credit, null, 2) + '\n', 'utf8');
  f.local = path.join(dir, name); f.credit = credit;
  return 'mới';
}

async function fetchMol(f, dir) {
  fs.mkdirSync(dir, { recursive: true });
  let lastErr;
  for (const m of f.mols) {
    const base = m.db === 'pubchem' ? `pubchem-cid-${m.id}` : `pdb-${m.id}`;
    for (const ext of m.db === 'pubchem' ? ['sdf'] : ['pdb', 'cif']) {
      const p = path.join(dir, `${base}.${ext}`), mp = p + '.nguon.json';
      if (fs.existsSync(p) && fs.existsSync(mp)) { f.molData = { fmt: ext === 'cif' ? 'cif' : ext, file: p }; f.credit = JSON.parse(fs.readFileSync(mp, 'utf8')); return 'cũ'; }
    }
    try {
      if (m.db === 'pubchem') {
        let txt, kieu3d = '3D';
        try { txt = (await req(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${m.id}/record/SDF?record_type=3d`, { as: 'text' })).body; }
        catch { txt = (await req(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${m.id}/record/SDF?record_type=2d`, { as: 'text' })).body; kieu3d = '2D'; }
        if (!/M {2}END|\$\$\$\$/.test(txt)) throw new Error('SDF không hợp lệ');
        let ten = ''; try { ten = (await req(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${m.id}/property/Title/JSON`, { as: 'json' })).body.PropertyTable.Properties[0].Title; } catch { /* không có tên */ }
        const p = path.join(dir, `pubchem-cid-${m.id}.sdf`);
        const credit = { src: `PubChem CID ${m.id}`, ten: ten ? `${ten} (CID ${m.id}, tọa độ ${kieu3d})` : `CID ${m.id} (tọa độ ${kieu3d})`, nguon: `https://pubchem.ncbi.nlm.nih.gov/compound/${m.id}`, trang: 'PubChem (NCBI)', giayPhep: 'dữ liệu công cộng', giayPhepUrl: 'https://www.ncbi.nlm.nih.gov/home/about/policies/' };
        fs.writeFileSync(p, txt, 'utf8'); fs.writeFileSync(p + '.nguon.json', JSON.stringify(credit, null, 2) + '\n', 'utf8');
        f.molData = { fmt: 'sdf', file: p }; f.credit = credit; return 'mới';
      } else {
        let txt, fmt = 'pdb';
        try { txt = (await req(`https://files.rcsb.org/download/${m.id}.pdb`, { as: 'text' })).body; }
        catch { txt = (await req(`https://files.rcsb.org/download/${m.id}.cif`, { as: 'text' })).body; fmt = 'cif'; }
        if (!/ATOM|HETATM|_atom_site/.test(txt)) throw new Error('tọa độ không hợp lệ');
        let ten = ''; try { ten = (await req(`https://data.rcsb.org/rest/v1/core/entry/${m.id}`, { as: 'json' })).body.struct.title; } catch { /* không có tên */ }
        const p = path.join(dir, `pdb-${m.id}.${fmt}`);
        const credit = { src: `PDB ${m.id}`, ten: ten ? `${ten} (PDB ${m.id})` : `PDB ${m.id}`, nguon: `https://www.rcsb.org/structure/${m.id}`, trang: 'RCSB PDB', giayPhep: 'CC0 1.0', giayPhepUrl: 'https://www.rcsb.org/pages/usage-policy' };
        fs.writeFileSync(p, txt, 'utf8'); fs.writeFileSync(p + '.nguon.json', JSON.stringify(credit, null, 2) + '\n', 'utf8');
        f.molData = { fmt, file: p }; f.credit = credit; return 'mới';
      }
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('không có mã PubChem/PDB');
}

/** Tải trước mọi hình/mô hình ngoài của một bài. figs: mảng đối tượng f từ parseFig. */
export async function prefetch(figs, dir, log = console.log) {
  const todo = figs.filter((f) => f.src || (f.mols && f.mols.length));
  const res = { moi: 0, cu: 0, loi: 0 };
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(3, todo.length) }, async () => {
    while (i < todo.length) {
      const f = todo[i++];
      const what = f.src || f.mols.map((m) => `${m.db === 'pdb' ? 'PDB' : 'PubChem CID'} ${m.id}`).join(' / ');
      try { const r = f.src ? await fetchImage(f, dir) : await fetchMol(f, dir); res[r === 'mới' ? 'moi' : 'cu']++; if (r === 'mới') log(`   tải: ${what} → ${path.basename(f.local || f.molData.file)}`); }
      catch (e) { f.fail = e.message; res.loi++; log(`   ! không tải được ${what}: ${e.message}`); }
    }
  }));
  return res;
}
