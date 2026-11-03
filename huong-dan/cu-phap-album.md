# Cú pháp file `*-album.md`

Hướng dẫn viết bài cho bộ dựng `build-album.mjs`. Thư mục `huong-dan/` không được dựng thành trang.
File bài đặt trong `bai/`, tên kết thúc bằng `-album.md`.

## Tên file và loại bài
- `CNTP-…-album.md` → nhãn **Bàn học CNTP** (cam).
- `D0…-album.md` → nhãn **R&D Food Lab** (xanh dương).
- Ngày học lấy từ tên file (`…_2026-11-03_…`) hoặc dòng `Ngày: 03/11/2026` ở đầu bài.

## Khung bài
```markdown
# Mã · Môn – Chủ đề bài

## Chương 1 – Tên chương
*Dòng nghiêng đầu chương: thời gian, lý do (tùy chọn)*

### Cảnh 1.1 – Tên cảnh
- **Câu mở:** câu hỏi gợi mở
- **Ý 1:** nội dung ý thứ nhất
- **Ý 2:** nội dung ý thứ hai
- **Thẻ nguồn:** Tác giả, năm, trang
```
Ý viết gạch đầu dòng thường (`- nội dung`) cũng được, mỗi gạch là một bước.

## Chữ trên bảng
Các dòng ngắn hiện trên bảng cạnh hình, dòng mới nhất được tô sáng. Được gắn vào **ý đứng ngay trước nó**, hiện ra khi đọc tới ý đó. Viết kiểu nào cũng được:

**Một dòng**, tách các dòng bảng bằng ` / `:
```markdown
- **Ý 1:** Ly tâm dùng lực ly tâm để phân riêng…
  - Chữ trên bảng: Ly tâm: phân riêng / Động lực: lực ly tâm
```
```markdown
- **Chữ trên bảng:** F = m·R·ω² / Lực tỷ lệ với ω²
```

**Xuống dòng**: đầu mục `Chữ trên bảng:` để trống, các dòng ngay bên dưới (thụt vào, gạch đầu dòng hoặc dòng thường) là chữ trên bảng, tới **dòng trống** thì hết:
```markdown
Chữ trên bảng:
Nước + nhóm phân cực (–OH, ion) → bị giữ
Giữ càng chặt → càng khó ép, khó sấy
```
```markdown
- **Chữ trên bảng:**
  - Ép → nước tự do
  - Sấy lâu mới ra → nước liên kết
```
Khối "xuống dòng" cũng dừng ở tiêu đề `#`, dòng hình `[HÌNH: …]`/`[3D: …]`, hoặc một gạch đầu dòng có nhãn in đậm (`- **Ý 2:** …`).

## Vật thể kính 3D của chương
Mỗi bìa chương có một vật thể thủy tinh xoay nhẹ, chọn **tự động theo tên chương** (ưu tiên từ trên xuống):

| Từ khóa trong tên chương | Vật thể |
|---|---|
| quy trình | bánh răng |
| vi sinh, vi khuẩn, tế bào, nấm men, lên men, lactic… | tế bào |
| sữa, nhũ tương, kem, béo, whey, casein, ly tâm… | giọt sữa |
| chất lượng, ISO, HACCP, an toàn, quản lý | khiên (có dấu tích) |
| phân tử, protein, enzyme, độ ẩm, trích ly, membrane… | phân tử |

Tên chương **không khớp** từ khóa nào → chương đó **không có vật thể**, chỉ giữ nền kính.

**Ghi đè** bằng một dòng nghiêng đặt ở bất kỳ đâu trong chương (thường ngay dưới tiêu đề chương):
```markdown
## Chương 3 – Mở đầu môn học
*Vật thể: bánh răng*
```
Giá trị được dùng (viết có dấu hay không dấu đều được):
`giọt sữa` · `tế bào` · `phân tử` · `khiên` · `bánh răng` · `không` (tắt vật thể dù tên chương khớp từ khóa).
Dòng ghi đè không hiện ra trong bài. Viết sai giá trị thì bộ dựng báo trong log và quay về chọn tự động.

Tông màu nền: chương có chữ chất lượng/ISO/HACCP/ATTP/kiểm soát/đảm bảo/cải tiến/hoạch định → tím → xanh lá nhạt; còn lại → navy → xanh.
Phân tử: nếu bài có `[3D: PubChem CID …]`, vật thể dùng chính phân tử đó; không có thì là phân tử nước.

## Hình và mô hình 3D
- `[HÌNH: <url trang nguồn> | file gợi ý | loại | chỗ | hiện | cùng ý | nhấn]`: tự tải hình (Wikimedia Commons…), ghi nguồn + giấy phép.
- `[HÌNH: tu-ve <tên>.svg | chỗ | hiện | cùng ý | nhấn]`: hình phấn tự vẽ nếu chưa có file.
- `[3D: PubChem CID 962 | PDB 1CRN | kiểu | hiện | cùng ý | nhấn]`: mô hình phân tử xoay được.
- `cùng ý: 2` gắn hình vào Ý 2. Hình raster và SVG lớn được đổi sang WebP ≤ 1200 px và tải lười.

## Phần cuối bài (tên mục cố định)
`## Tổng kết` · `## Trắc nghiệm cuối ngày` · `## Đáp án` · `## Đối chiếu…` · `## Từ điển thuật ngữ` · `## Nguồn tham khảo` · `## Cần kiểm tra lại`.
Trắc nghiệm: câu đánh số `1.`, phương án `   - A. …`; đáp án `- Câu 1: **B** – giải thích` dưới nhóm in đậm `**Chương 1**` hoặc `**Trắc nghiệm cuối ngày**`.

## Dựng thử
```
npm ci
node build-album.mjs        # ra _site/; mở _site/bai/<bài>.html?selftest để tự kiểm tra
```
