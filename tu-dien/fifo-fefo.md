# FIFO và FEFO

- **Mã:** fifo-fefo
- **Tên khác:** FIFO; FEFO; vào trước xuất trước; hết hạn trước xuất trước
- **Anh:** First In First Out; First Expired First Out
- **Ngắn:** Hai cách xuất kho: FIFO theo thứ tự nhập, FEFO theo thứ tự hết hạn; slide 3.3.5 chọn một trong hai.

## Định nghĩa
- Theo slide GMP mục 3.3.5, kiểm soát bảo quản và phân phối quản lý hạn dùng bằng FIFO (vào trước xuất trước) hoặc FEFO (hết hạn trước xuất trước).
- FIFO xếp theo ngày nhập; FEFO xếp theo hạn dùng còn lại nên lô hết hạn trước được xuất trước.
- Hai cách cho kết quả như nhau khi lô vào trước cũng là lô hết hạn trước.

## Ví dụ số
- Mô hình giả định của album: lô A hạn 60 ngày, lô B hạn 20 ngày, mỗi lô xuất hết trong 15 ngày thì FIFO làm lô B quá hạn 10 ngày, FEFO còn dư 5 ngày.

## Hiểu sai thường gặp
- FEFO không phải lúc nào cũng tốt hơn: khi thứ tự nhập trùng thứ tự hết hạn, hai cách như nhau.

## Liên quan
- {{GMP}} · {{GHP}}

## Nguồn
- Slide môn Hệ thống QLCL & VH ATTP buổi 05/11/2026, ghi chép lớp (ban-hoc-cntp/ghi-chep/qlcl-buoi-2026-11-05.md)

## Cần kiểm tra
- Slide chỉ nêu tên và nghĩa, không có mô hình số; ví dụ số là giả định của album.
