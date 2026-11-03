// Tách hình nặng khỏi trang bài để trang nhẹ khi mở (tải lười):
//  - ảnh raster (jpg/png/gif/webp) và SVG lớn (> 40 KB, thường là hình tải từ nguồn) → WebP, cạnh dài tối đa 1200 px
//  - dữ liệu mô hình 3D (PDB/SDF lớn, GLB) → file riêng
// Bản "tải về offline" nhúng lại mọi thứ (data: URI) để chạy không cần mạng.
// Cần gói sharp (optionalDependencies) để đổi WebP; không có sharp thì chép nguyên file gốc ra ngoài.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const SVG_NHUNG_TOI_DA = 40 * 1024; // SVG phấn tự vẽ (vài KB, có hiệu ứng vẽ nét) giữ nhúng
const MAX = 1200;
let sharp = null, daThu = false;
async function getSharp() {
  if (daThu) return sharp; daThu = true;
  try { sharp = (await import('sharp')).default; } catch { console.warn('  (chưa có gói sharp → ảnh giữ định dạng gốc, không thu nhỏ; chạy: npm install)'); }
  return sharp;
}
const cache = new Map(); // khóa nội dung → { buf, ext, mime }
const hash = (b) => crypto.createHash('sha1').update(b).digest('hex').slice(0, 12);

async function toWebp(buf, isSvg) {
  const s = await getSharp();
  if (!s) return null;
  const img = s(buf, isSvg ? { density: 220 } : {});
  return img.rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: !isSvg }).webp({ quality: 80, effort: 5 }).toBuffer();
}
async function convert(buf, kind) {
  const k = kind + ':' + hash(buf);
  if (cache.has(k)) return cache.get(k);
  let out = null;
  try { const w = await toWebp(buf, kind === 'svg'); if (w) out = { buf: w, ext: 'webp', mime: 'image/webp' }; } catch (e) { console.warn('  (không đổi được sang WebP: ' + e.message + ')'); }
  if (!out) out = kind === 'svg' ? { buf, ext: 'svg', mime: 'image/svg+xml' } : { buf, ext: kind === 'jpeg' ? 'jpg' : kind, mime: 'image/' + kind };
  cache.set(k, out); return out;
}
function writeOut(outDir, buf, ext) {
  const name = hash(buf) + '.' + ext, dir = path.join(outDir, 'bai', 'anh');
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, name); if (!fs.existsSync(f)) fs.writeFileSync(f, buf);
  return 'anh/' + name;
}
const dataUri = (mime, buf) => `data:${mime};base64,` + buf.toString('base64');

/** Biến đổi bảng hình của một bài. offline=true → nhúng; false → file riêng trong <outDir>/bai/anh/. Trả về thống kê. */
export async function tachHinh(figs, { outDir, offline }) {
  const st = { webp: 0, ngoai: 0, kbTruoc: 0, kbSau: 0 };
  for (const fig of Object.values(figs)) {
    if (fig.kind === 'img' && fig.path) {
      const raw = fs.readFileSync(fig.path), ext = path.extname(fig.path).slice(1).toLowerCase().replace('jpg', 'jpeg');
      const c = await convert(raw, ext); st.kbTruoc += raw.length; st.kbSau += c.buf.length; if (c.ext === 'webp') st.webp++;
      if (offline) fig.src = dataUri(c.mime, c.buf); else { fig.src = writeOut(outDir, c.buf, c.ext); fig.lazy = true; st.ngoai++; }
      delete fig.path;
    } else if (fig.kind === 'svg' && Buffer.byteLength(fig.svg) > SVG_NHUNG_TOI_DA) {
      const raw = fig.path ? fs.readFileSync(fig.path) : Buffer.from(fig.svg, 'utf8'), c = await convert(raw, 'svg');
      st.kbTruoc += raw.length; st.kbSau += c.buf.length; if (c.ext === 'webp') st.webp++;
      Object.assign(fig, { kind: 'img' }); delete fig.svg; delete fig.raw;
      if (offline) fig.src = dataUri(c.mime, c.buf); else { fig.src = writeOut(outDir, c.buf, c.ext); fig.lazy = true; st.ngoai++; }
    } else if (fig.kind === 'mol' && !offline && fig.data && fig.data.length > 16 * 1024) {
      fig.url = writeOut(outDir, Buffer.from(fig.data, 'utf8'), fig.fmt); delete fig.data; st.ngoai++;
    } else if (fig.kind === '3d' && !offline && fig.b64) {
      fig.url = writeOut(outDir, Buffer.from(fig.fmt === 'gltf' ? Buffer.from(fig.b64, 'base64').toString('utf8') : fig.b64, fig.fmt === 'gltf' ? 'utf8' : 'base64'), fig.fmt); delete fig.b64; st.ngoai++;
    }
    delete fig.raw; delete fig.path;
  }
  st.kbTruoc = Math.round(st.kbTruoc / 1024); st.kbSau = Math.round(st.kbSau / 1024);
  return st;
}
