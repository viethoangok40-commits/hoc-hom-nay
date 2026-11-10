#!/usr/bin/env node
// Thu nhỏ ảnh môi trường .hdr (Radiance RGBE) bằng trung bình khối – dùng làm HDRI nhẹ cho cảnh máy.
//   node tools/thu-nho-hdr.mjs vao.hdr ra.hdr [hệ số=4]
// Đọc RGBE có/không nén RLE; ghi RGBE không nén (three.js RGBELoader đọc được).
import fs from 'node:fs';

const [, , vao, ra, hs = '4'] = process.argv;
const F = Math.max(1, parseInt(hs, 10));
const buf = fs.readFileSync(vao);
let p = 0;
const line = () => { let s = ''; while (buf[p] !== 0x0a) s += String.fromCharCode(buf[p++]); p++; return s; };
if (!/^#\?(RADIANCE|RGBE)/.test(line())) throw new Error('không phải file Radiance .hdr');
for (let l = line(); l !== ''; l = line()) { /* bỏ phần đầu: FORMAT, EXPOSURE… */ }
const m = line().match(/^-Y (\d+) \+X (\d+)$/); if (!m) throw new Error('chỉ hỗ trợ hướng -Y H +X W');
const H = +m[1], W = +m[2];
const px = new Float32Array(W * H * 3);
const sc = new Uint8Array(W * 4);
for (let y = 0; y < H; y++) {
  if (buf[p] === 2 && buf[p + 1] === 2 && ((buf[p + 2] << 8) | buf[p + 3]) === W) { // RLE mới: 4 kênh tách
    p += 4;
    for (let c = 0; c < 4; c++) for (let x = 0; x < W;) {
      let n = buf[p++];
      if (n > 128) { n -= 128; const v = buf[p++]; while (n--) sc[(x++) * 4 + c] = v; } else while (n--) sc[(x++) * 4 + c] = buf[p++];
    }
  } else { sc.set(buf.subarray(p, p + W * 4)); p += W * 4; }
  for (let x = 0; x < W; x++) { const e = sc[x * 4 + 3], f = e ? Math.pow(2, e - 136) : 0, o = (y * W + x) * 3; px[o] = sc[x * 4] * f; px[o + 1] = sc[x * 4 + 1] * f; px[o + 2] = sc[x * 4 + 2] * f; }
}
const w = Math.floor(W / F), h = Math.floor(H / F), out = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  let r = 0, g = 0, b = 0;
  for (let j = 0; j < F; j++) for (let i = 0; i < F; i++) { const o = ((y * F + j) * W + (x * F + i)) * 3; r += px[o]; g += px[o + 1]; b += px[o + 2]; }
  r /= F * F; g /= F * F; b /= F * F;
  const v = Math.max(r, g, b), q = (y * w + x) * 4;
  if (v < 1e-32) continue;
  const e = Math.ceil(Math.log2(v)) + (v === Math.pow(2, Math.ceil(Math.log2(v))) ? 1 : 0), k = 256 / Math.pow(2, e);
  out[q] = Math.min(255, r * k); out[q + 1] = Math.min(255, g * k); out[q + 2] = Math.min(255, b * k); out[q + 3] = e + 128;
}
fs.writeFileSync(ra, Buffer.concat([Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${h} +X ${w}\n`, 'latin1'), out]));
console.log(`${W}×${H} → ${w}×${h}, ${Math.round(fs.statSync(ra).size / 1024)} KB → ${ra}`);
