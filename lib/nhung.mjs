// Phần dùng chung: nhúng font, thư viện 3D, xử lý chữ. Đường dẫn tính từ gốc repo.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

export const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');

let _font = null;
/** @font-face Be Vietnam Pro (OFL, assets/fonts) – woff2 nhúng base64 để chạy offline */
export function fontCss() {
  if (_font) return _font;
  const dir = path.join(ROOT, 'assets', 'fonts');
  const css = fs.readFileSync(path.join(dir, 'fonts.css'), 'utf8');
  _font = css.replace(/url\(([\w.-]+\.woff2)\)/g, (m, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(dir, f)).toString('base64')})`)
    .replace(/font-display:\s*swap/g, 'font-display: block');
  return _font;
}

/** three.js r147 + GLTFLoader (assets/vendor) – chỉ chèn khi bài có mô hình 3D */
export function threeJs() {
  const v = path.join(ROOT, 'assets', 'vendor');
  if (!fs.existsSync(path.join(v, 'three.min.js'))) { console.warn('  (thiếu assets/vendor/three.min.js – bỏ qua 3D)'); return ''; }
  const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
  return '<script>' + safe(fs.readFileSync(path.join(v, 'three.min.js'), 'utf8')) + '</script>\n<script>' + safe(fs.readFileSync(path.join(v, 'GLTFLoader.js'), 'utf8')) + '</script>';
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** markdown trong dòng: **đậm**, *nghiêng*, `mã`, [chữ](link), link trần */
export function inl(s) {
  s = esc(s);
  const links = [];
  const keep = (h) => { links.push(h); return `\u0000${links.length - 1}\u0000`; };
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, t, u) => keep(`<a href="${u}" target="_blank" rel="noopener">${t}</a>`));
  s = s.replace(/(https?:\/\/[^\s<)]+[^\s<).,;:])/g, (u) => keep(`<a href="${u}" target="_blank" rel="noopener">${u}</a>`));
  s = s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  s = s.replace(/(^|[\s(“"'])\*(?!\s)([^*]+?)(?<!\s)\*(?=[\s).,;:”"'!?]|$)/g, '$1<i>$2</i>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\u0000(\d+)\u0000/g, (m, i) => links[+i]);
  return s;
}

export function deAccent(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').normalize('NFC');
}

export function stamp(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const LS = new RegExp(String.fromCharCode(0x2028), 'g'), PS = new RegExp(String.fromCharCode(0x2029), 'g');
export const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(LS, '\\u2028').replace(PS, '\\u2029');
