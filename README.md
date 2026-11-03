# HỌC HÔM NAY

Trang học: **https://viethoangok40-commits.github.io/hoc-hom-nay/**

Mỗi file `*-album.md` trong `bai/` được dựng thành một trang album đọc kiểu bảng đen phấn (một file HTML duy nhất: hình, font nhúng sẵn, chạy offline). Trang chủ mở ngay bài của hôm nay (giờ Việt Nam); hai bài cùng ngày thì hiện hai nút to; chưa có bài thì mở bài mới nhất. Bên dưới là danh sách mọi bài, mới nhất trên cùng.

## Thêm bài
1. Chép file `*-album.md` vào `bai/`.
2. Hình ghi trong dòng `[HÌNH: ten.svg | …]` đặt vào `assets/bai/<mã bài>/` (thiếu hình nào thì bộ dựng tự vẽ hình phấn thay thế). Mô hình 3D: `[3D: ten.glb | …]`.
3. Push lên `main` → GitHub Action `.github/workflows/build.yml` tự dựng và đăng lên GitHub Pages.

## Tự lấy bài từ Google Drive
Workflow `.github/workflows/lay-bai.yml` chạy lúc **06:30, 07:30, 08:30, 12:30 giờ Việt Nam** (và chạy tay được ở tab Actions): tải mọi file `*-album.md` trong các thư mục Drive công khai ghi ở `drive.json` (bỏ qua .docx, .pdf…), chép file mới/đổi vào `bai/`, dựng, commit và đăng Pages.

## Định dạng hình
- `[HÌNH: <url trang nguồn> | file gợi ý | loại | chỗ | hiện | cùng ý | nhấn]` – tự tải hình (Wikimedia Commons: file gốc từ trang `File:`; ảnh > 2,5 MB lấy bản 1600 px) vào `assets/bai/<mã bài>/`, ghi nguồn + giấy phép dưới hình.
- `[HÌNH: tu-ve <tên>.svg | …]` – tự vẽ hình phấn nếu chưa có file.
- `[3D: PubChem CID 962 | PDB 1CRN | kiểu | hiện | …]` – tải tọa độ (PubChem/RCSB), dựng mô hình xoay được bằng 3Dmol.js (kiểu: que, cầu, que-cầu, băng, dây).
- Không tải được thì hiện khung ghi tên nguồn, trang vẫn chạy.

## Đọc bài
- Điện thoại: chạm nửa phải màn hình = ý sau, nửa trái = lùi; vuốt trái/phải cũng được.
- Máy tính: → hoặc Space = ý sau, ← = lùi, M = mục lục, B = bài khác.
- Nút **📚 Bài khác** (cạnh ☰ trên thanh trên cùng, có ở trang chủ lẫn từng trang bài): mở danh sách mọi bài, lọc Tất cả / Bàn học CNTP / R&D Food Lab, mới nhất trên cùng; chạm bài nào mở bài đó. Bộ dựng nhúng danh sách vào mỗi bài và ghi `bai/danh-sach.json` để bài cũ vẫn thấy bài mới.

## Dựng thử trên máy
```
node build-album.mjs          # ra _site/
```
Cần Node 20+. Không có gói phụ thuộc.

## Giấy phép
- Font Be Vietnam Pro – SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).
- three.js r147 – MIT (`assets/vendor/three-LICENSE.txt`).
- 3Dmol.js 2.5.5 – BSD-3-Clause (`assets/vendor/3Dmol-LICENSE.txt`).
