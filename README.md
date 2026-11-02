# HỌC HÔM NAY

Trang học: **https://viethoangok40-commits.github.io/hoc-hom-nay/**

Mỗi file `*-album.md` trong `bai/` được dựng thành một trang album đọc kiểu bảng đen phấn (một file HTML duy nhất: hình, font nhúng sẵn, chạy offline). Trang chủ mở ngay bài của hôm nay (giờ Việt Nam); hai bài cùng ngày thì hiện hai nút to; chưa có bài thì mở bài mới nhất. Bên dưới là danh sách mọi bài, mới nhất trên cùng.

## Thêm bài
1. Chép file `*-album.md` vào `bai/`.
2. Hình ghi trong dòng `[HÌNH: ten.svg | …]` đặt vào `assets/bai/<mã bài>/` (thiếu hình nào thì bộ dựng tự vẽ hình phấn thay thế). Mô hình 3D: `[3D: ten.glb | …]`.
3. Push lên `main` → GitHub Action `.github/workflows/build.yml` tự dựng và đăng lên GitHub Pages.

## Đọc bài
- Điện thoại: chạm nửa phải màn hình = ý sau, nửa trái = lùi; vuốt trái/phải cũng được.
- Máy tính: → hoặc Space = ý sau, ← = lùi, M = mục lục.

## Dựng thử trên máy
```
node build-album.mjs          # ra _site/
```
Cần Node 20+. Không có gói phụ thuộc.

## Giấy phép
- Font Be Vietnam Pro – SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).
- three.js r147 – MIT (`assets/vendor/three-LICENSE.txt`).
