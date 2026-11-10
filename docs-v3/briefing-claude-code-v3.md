# Giao việc cho Claude Code: dựng bộ dựng album theo KHUNG v3 (một lần, làm một mạch)

Thư mục làm việc duy nhất: `D:\Git\hoc-hom-nay`, nhánh `thu-the-moi-v2`. Không commit, không push, không xóa file ngoài thư mục này. Dựng thử vào thư mục tạm (ví dụ `_tmp-build`).

## Đọc trước (đặt cạnh nhau trong `D:\Git\hoc-hom-nay\docs-v3\`)
1. `khung-album-v3.md`: khung chung, mục 5 đến 8 là yêu cầu cho bộ dựng.
2. `khung-album-mau.html`: giao diện chuẩn (biến màu, kích thước, bố cục đã được duyệt). Dùng nguyên, không tự thiết kế lại.
3. `D008-album-v3.md`: bài mẫu viết đúng khung. Đây là bài thử nghiệm chính.

## Việc cần làm (đã làm một phần ở các bước 1–2 trước đó: `templates/album-v2.html`, cờ `--nghiem`, 6 thẻ mới)
Làm nốt các việc sau trong một lần chạy, không dừng giữa chừng để hỏi:
1. Parser: thêm thẻ `[TÓM: a|b|c]`, `[NHỚ LẠI]…[/NHỚ LẠI]`, `[BẢN ĐỒ]…[/BẢN ĐỒ]` (mỗi dòng `A --quan hệ--> B`), dòng `- **Thẻ:** <Định nghĩa|Cơ chế|Ví dụ số|Hiểu sai thường gặp|Tự kiểm tra>`, dòng `- Nhớ: …`, và các trường `khẳng định:`, `chức năng:`, `nhìn:` của `[HÌNH]` và `[3D]`. `[SỐ LIỆU: …]` đi kèm bảng markdown ngay dưới. Thẻ lạ hiện như chữ thường; album cũ phải dựng ra y hệt trước (so mã băm).
2. Giao diện v2 theo `khung-album-mau.html`: nền trơn sáng/tối theo hệ thống, mục lục cố định trái, hai cột chữ trái hình phải, chế độ "Từng ý" (mặc định) và "Cả chương", dòng tiến độ, hộp ẩn bấm hiện, quiz tự chấm có lý do, lưu bằng localStorage bọc try/catch, mục ôn rải 1/3/7/21 ngày, đồ thị SVG từ `[SỐ LIỆU]` có bảng thay thế, bản đồ khái niệm đơn sắc từ `[BẢN ĐỒ]`, 3Dmol chỉ tải khi bấm.
3. Bỏ hẳn `autoFig` (không tự vẽ thẻ dự phòng) trong v2: hình thiếu thì bỏ qua và ghi cảnh báo kèm số dòng.
4. Cờ `--nghiem`: báo lỗi khi trùng hình giữa các bài (so theo url nguồn trong toàn bộ `*-album.md` hiện có và trong `hinh-da-dung.md` nếu có), hình thiếu `khẳng định` hoặc `chức năng`, chương quá 4 cảnh, cảnh quá 3 đoạn hoặc quá 1 hình, tiêu đề cảnh dưới 5 từ, chương thiếu `[TÓM]` hoặc `[QUIZ]`, chữ/dòng ngoài 55–80, tương phản dưới AA.
5. Dựng `D008-album-v3.md` vào thư mục tạm, chụp màn hình ở 1280, 1600 và 390 px, kiểm tra không cuộn ngang, tương phản đạt, 0 animation nền, số hình trùng bằng 0.
6. Hình `[3D: PubChem CID …]` và ảnh Wikimedia: nếu máy dựng không tải được thì ghi cảnh báo, không tự vẽ thay.

## Báo cáo (viết vào `BAO-CAO-DUNG-ALBUM.md`)
Việc đã xong, việc chưa xong, ảnh chụp ở ba cỡ, kết quả `--nghiem` trên D008-v3, và kết quả dựng lại album cũ (mã băm có giống trước không). Kết thúc bằng một dòng: "Chờ Hoàng duyệt trước khi commit/push".

## Giới hạn
- Dùng Sonnet. Không đọc lại toàn bộ repo; chỉ mở file cần sửa.
- Không đổi cú pháp thẻ ngoài những gì liệt kê ở trên. Nếu hai tài liệu mâu thuẫn, `khung-album-v3.md` thắng.
