# Tin báo cho hai ô chat (24/11/2026)

Bối cảnh: ô thiết kế 3D đã làm xong 9 mô hình tháo-lắp mới + chỉnh engine. Các khối `[MÔ PHỎNG … tháo-lắp]` đã được chèn vào `bai/` ở worktree thiết kế (chưa commit). Bài trên Drive là bản gốc, nên phải chèn cùng khối vào Drive, nếu không lần đồng bộ sau sẽ xóa mô hình.

## 1) Gửi ô CNTP (Ngày 09, 10, 11)
```
Ô thiết kế 3D báo: đã có mô hình tháo-lắp cho các bài của ô CNTP. Việc cần làm trên bản gốc ở Drive (không đổi chữ của bài, chỉ thêm/thay khối):

Ngày 09 (CNTP-Ngay09):
- Cảnh 2.2: thay khối [MÔ PHỎNG: q9-noi-hai-vo | hoạt-hình] bằng khối noi-hai-vo trong huong-dan/khoi-dan-mo-hinh-moi.md (bỏ dòng "- hình:", thêm các dòng "- bộ phận:").
- Cảnh 4.1: thêm khối chlorophyll-pheophytin (huong-dan/khoi-dan-chlorophyll-pheophytin.md), đặt trước dòng "- Nhớ: Câu 2".
- Cảnh 4.2: thêm khối ca-pectin; Cảnh 4.3: thêm khối khuech-tan-chat-tan (cả hai trong huong-dan/khoi-dan-khuech-tan-ca-pectin.md). Mỗi cảnh chỉ một hình.

Ngày 10 (CNTP-Ngay10):
- Cảnh 3.2: thêm khối phan-ung-maillard (huong-dan/khoi-dan-phan-ung-maillard.md), đặt trước "- Nhớ: Caramel hóa".
- Cảnh 4.2 và 5.1: thay khối hoạt-hình bằng noi-co-dac-chan-khong và co-dac-lien-tuc (khoi-dan-mo-hinh-moi.md).
- Xem lại chú thích 17 ở Cảnh 4.2–4.4: ảnh slide cho thấy nhiều khả năng là "tháp ngưng tụ", không phải "thùng ngưng tụ". Chú thích 6 ở Cảnh 5.1 đọc rõ là "thiết bị chưng cất" nên bỏ chữ "chưa chắc".

Ngày 11 (CNTP-Ngay11):
- Cảnh 5.1: thêm khối di-nguyen-khang-the (huong-dan/khoi-dan-di-nguyen-khang-the.md), đặt trước dòng "- Nhớ: Dị nguyên".
- Chương 3–4 chưa có mô hình vì chưa có dữ liệu (FATTOM, nhân đôi vi khuẩn). Nếu có số liệu có nguồn thì báo ô thiết kế.

Chỗ nào ghi "Cần kiểm tra" trong khối thì giữ nguyên, đừng xóa. Sau khi dán chạy: node build-album.mjs --nghiem.
```

## 2) Gửi ô R&D (D010, và mọi bài D sau này)
```
Ô thiết kế 3D báo: đã có mô hình tháo-lắp oxy-hoa-lipid cho D010 Cảnh 3.1 (huong-dan/khoi-dan-oxy-hoa-lipid.md). Cần chèn khối này vào bản gốc D010 trên Drive, đặt trước dòng "- Nhớ: Ôi không chỉ là mùi", không đổi chữ nào của bài. Nếu không chèn vào Drive thì lần đồng bộ sau sẽ xóa mô hình.
Quy tắc khi viết bài D mới có cơ chế phân tử/sinh học/vật lý: mỗi Cảnh "Thẻ: Cơ chế" nên có một khối [MÔ PHỎNG … kiểu: tháo-lắp] kèm dòng "- bộ phận:", "- bước:", "- nguồn:", "- giới hạn:". Chỉ một hình mỗi cảnh. Chỗ nào chưa có nguồn thì ghi "Cần kiểm tra", đừng bịa. Báo ô thiết kế id cơ chế để dựng mô hình trước khi bài lên.
Ứng viên còn lại ở D010: Cảnh 2.2 (Maillard có đỉnh). D009 trở về D006 chưa rà.
```
