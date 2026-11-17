# thời gian phá hủy thập phân

- **Mã:** thoi-gian-pha-huy-thap-phan
- **Tên khác:** D; D-value; decimal reduction time; thời gian giảm 10 lần
- **Anh:** decimal reduction time (D)
- **Ngắn:** Thời gian xử lý ở một nhiệt độ xác định để số vi sinh vật (hoặc hoạt tính enzyme) giảm 10 lần.
- **Công thức:** lg(N₀/N) = t/D

## Định nghĩa
- Theo LVVM (tr.233–234), số tế bào sống sau thời gian t là N = N₀·e^(−kt) nên giảm theo hàm mũ chứ không tuyến tính.
- D là thời gian để N giảm 10 lần, tức lg(N₀/N) = t/D.
- D cũng dùng để nói độ bền nhiệt của enzyme: thời gian ở nhiệt độ xác định để hoạt tính giảm 10 lần.

## Ví dụ số
- Ví dụ giáo trình: mẫu 10⁹ tế bào, D = 1 phút thì sau 1 phút còn 10⁸, sau 9 phút còn 1, sau 10 phút còn 0,1 (xác suất 10% mẫu còn tế bào sống).
- Mẫu 10⁹ tế bào, D = 2 phút, xử lý 10 phút còn 10⁹ × 10^(−10/2) = 10⁴ tế bào (tính lại bằng Python).

## Hiểu sai thường gặp
- Kéo dài thời gian chỉ làm xác suất còn tế bào sống nhỏ dần chứ không bằng 0.
- Giá trị kỳ vọng nhỏ hơn 1 là xác suất, không phải một phần tế bào.

## Liên quan
- {{z}} · {{thời gian xử lý nhiệt tương đương}} · {{tiệt trùng}}

## Nguồn
- Lê Văn Việt Mẫn và cs. (2011), Công nghệ chế biến thực phẩm, NXB ĐHQG TP.HCM, tr.233–234 (OCR)
- Album CNTP-Ngay05 v3 (ban-hoc-cntp/album/CNTP-Ngay05_2026-11-06_cncb-album-v3.md)

## Cần kiểm tra
- Chữ mũ của ví dụ 10⁹ bị OCR làm mất, album dựng lại theo logic.
- Hai giá trị D = 0,5 và 2 phút trong mô phỏng là giả định minh họa.
