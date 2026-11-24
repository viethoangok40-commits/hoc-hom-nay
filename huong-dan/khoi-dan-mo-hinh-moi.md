# Khối dán cho ba mô hình tháo-lắp mới (Ngày 09–10)
Ngày 18/11/2026. Dùng để ô CNTP thay khối `[MÔ PHỎNG … hoạt-hình]` cũ trong bài. Câu khẳng định, các dòng `bước`, `nguồn`, `giới hạn` giữ nguyên như bài hiện có; chỉ đổi dòng mở (id → mã mô hình, kiểu → tháo-lắp), bỏ dòng `- hình:` và thêm các dòng `- bộ phận:`. Dưới đây là phần đầu khối (đến hết dòng bộ phận). Chưa commit.

**Việc ô CNTP cần xem khi dán**
- noi-co-dac-chan-khong, chú thích 17: ảnh slide cắt chữ ở "Thá…", hình là cột cao → nhiều khả năng "tháp ngưng tụ", không phải "thùng". Sửa chữ trong bài (Cảnh 4.2, 4.3, 4.4, bước 5, quiz) hoặc giữ "Cần kiểm tra".
- co-dac-lien-tuc, chú thích 6: đã đối chiếu ảnh, đọc rõ "thiết bị chưng cất"; bỏ chữ "chưa chắc" ở bước 4 và khối giới hạn.
- Các dòng `bước` hiện có khớp số bước của mô hình (6, 6, 5).

## noi-hai-vo (CNTP-Ngay09_2026-11-10_cncb-album.md)
```
[MÔ PHỎNG: noi-hai-vo | kiểu: tháo-lắp | chỗ: phải | khẳng định: Theo chú thích trên slide, nồi chần – hấp hai vỏ làm việc gián đoạn có vỏ trong 1 chứa nguyên liệu, vỏ ngoài 2, phòng hơi 3 ở giữa nhận hơi qua ống dẫn 4, nước ngưng thoát qua van 6, cùng van hơi an toàn 7, áp kế 8, giá đỡ 9, tay quay 10 và bánh quay răng khía 11 | chức năng: giải thích | nhìn: mặt cắt nồi hai vỏ hiện dần theo sáu nhóm bộ phận]
- bộ phận: Vỏ trong | mã: votrong | chức năng: Chứa nguyên liệu. | vì sao ở đó: Chú thích slide 1; nguyên liệu nằm trong vỏ trong (Cảnh 2.2).
- bộ phận: Vỏ ngoài | mã: vongoai | chức năng: Bao quanh vỏ trong, tạo khoảng giữa hai vỏ. | vì sao ở đó: Chú thích slide 2; tên nồi hai vỏ.
- bộ phận: Phòng hơi | mã: phonghoi | chức năng: Khoảng giữa hai vỏ, nơi hơi đi vào (suy từ chú thích). | vì sao ở đó: Hơi nằm cách ly nguyên liệu nên không trộn vào nguyên liệu (Cảnh 2.3).
- bộ phận: Ống dẫn hơi | mã: ongdan | chức năng: Dẫn hơi vào phòng hơi (suy từ chú thích). | vì sao ở đó: Chú thích slide 4; vị trí ống là cách vẽ của album.
- bộ phận: Ống tháo | mã: ongtao | chức năng: Ống tháo; slide ghi "nước không ngưng", Cần kiểm tra vì có thể là OCR của "khí không ngưng". | vì sao ở đó: Chú thích slide 5; vị trí ống là cách vẽ của album.
- bộ phận: Van tháo nước ngưng | mã: vannuoc | chức năng: Tháo nước ngưng ra khỏi phòng hơi. | vì sao ở đó: Nước ngưng tích ở đáy phòng hơi nên van ở đáy (Cảnh 2.3, kiến thức thêm).
- bộ phận: Van hơi an toàn | mã: vanat | chức năng: Van hơi an toàn, giới hạn áp suất hơi (hiểu theo tên gọi). | vì sao ở đó: Chú thích slide 7; vị trí do album vẽ.
- bộ phận: Áp kế | mã: apke | chức năng: Theo dõi áp suất hơi (hiểu theo tên gọi). | vì sao ở đó: Chú thích slide 8; vị trí do album vẽ.
- bộ phận: Giá đỡ | mã: giado | chức năng: Giữ nồi. | vì sao ở đó: Chú thích slide 9.
- bộ phận: Tay quay | mã: tayquay | chức năng: Gợi ý nghiêng nồi để tháo liệu (suy luận từ hình, Cần kiểm tra). | vì sao ở đó: Chú thích slide 10; vị trí do album vẽ.
- bộ phận: Bánh quay răng khía | mã: banhrang | chức năng: Đi cùng tay quay (Cần kiểm tra chức năng). | vì sao ở đó: Chú thích slide 11; vị trí do album vẽ.
```

## noi-co-dac-chan-khong (CNTP-Ngay10_2026-11-10_cncb-album.md)
```
[MÔ PHỎNG: noi-co-dac-chan-khong | kiểu: tháo-lắp | chỗ: phải | khẳng định: Theo chú thích trên slide, thiết bị cô đặc chân không gián đoạn một nồi có áo hơi (1 khoang áo hơi, 2 áo hơi, 3 hơi vào, 13 nước ngưng), cửa nạp và tháo liệu (4, 11, 14, 12), dụng cụ quan sát và đo (5, 6, 8, 9, 7, 16), trục giảm tốc 15, thùng ngưng tụ 17 với nước lạnh 20 và van xả khí 10, cùng bơm chân không 19 và bơm ly tâm 18 | chức năng: giải thích | nhìn: nồi có áo hơi, thùng ngưng tụ và hai bơm hiện dần theo sáu nhóm chú thích kèm bảng số bên dưới]
- bộ phận: Khoang áo hơi | mã: khoang | chức năng: Tên theo chú thích slide; trên ảnh nhãn 1 chỉ vào thân trụ phía trên nồi. | vì sao ở đó: Chú thích slide 1.
- bộ phận: Áo hơi | mã: aohoi | chức năng: Hơi nhả nhiệt đun dịch trong nồi (Cảnh 4.3, suy từ chú thích). | vì sao ở đó: Chú thích slide 2; trên ảnh nhãn 2 chỉ vào đáy chảo.
- bộ phận: Hơi vào | mã: hoivao | chức năng: Hơi nước vào áo hơi. | vì sao ở đó: Chú thích slide 3; vị trí ống là cách vẽ của album.
- bộ phận: Cửa nạp liệu | mã: cuanap | chức năng: Nạp dịch vào nồi. | vì sao ở đó: Chú thích slide 4.
- bộ phận: Nhiệt kế | mã: nhietke | chức năng: Cho biết nhiệt độ (Cảnh 4.3). | vì sao ở đó: Chú thích slide 5.
- bộ phận: Cửa kính sáng | mã: cuakinh | chức năng: Cửa kính sáng cho người vận hành nhìn (Cảnh 4.3). Chữ đã đối chiếu ảnh slide, đọc rõ. | vì sao ở đó: Chú thích slide 6.
- bộ phận: Chân không kế | mã: chankhongke | chức năng: Cho biết độ chân không (Cảnh 4.3). | vì sao ở đó: Chú thích slide 7.
- bộ phận: Kính quan sát | mã: kinhqs | chức năng: Nhìn mức dịch và trạng thái sôi (Cảnh 4.3). | vì sao ở đó: Chú thích slide 8.
- bộ phận: Vòi rửa kính quan sát | mã: voirua | chức năng: Giữ kính trong (Cảnh 4.3). | vì sao ở đó: Chú thích slide 9.
- bộ phận: Van xả khí | mã: vanxakhi | chức năng: Van xả khí (chức năng cụ thể Cần kiểm tra). | vì sao ở đó: Chú thích slide 10.
- bộ phận: Van bổ sung nguyên liệu | mã: vanbosung | chức năng: Bổ sung nguyên liệu khi đang cô (Cảnh 4.3). | vì sao ở đó: Chú thích slide 11.
- bộ phận: Van lấy mẫu | mã: vanlaymau | chức năng: Lấy mẫu để kiểm tra khi đang cô (Cảnh 4.3). | vì sao ở đó: Chú thích slide 12.
- bộ phận: Nước ngưng | mã: nuocngung | chức năng: Nước ngưng của hơi cấp thoát ra từ áo hơi (Cảnh 4.3). | vì sao ở đó: Chú thích slide 13.
- bộ phận: Cửa tháo liệu | mã: cuatao | chức năng: Tháo liệu khỏi nồi. | vì sao ở đó: Chú thích slide 14.
- bộ phận: Trục giảm tốc | mã: trucgt | chức năng: Trục giảm tốc (chức năng Cần kiểm tra; trên ảnh nằm ở đỉnh nồi). | vì sao ở đó: Chú thích slide 15.
- bộ phận: Áp kế | mã: apke | chức năng: Đo áp suất (Cần kiểm tra: áp suất hơi hay áp suất trong nồi). | vì sao ở đó: Chú thích slide 16.
- bộ phận: Tháp ngưng tụ | mã: thapngung | chức năng: Ngưng hơi bốc ra từ dịch (Cảnh 4.3). Cần kiểm tra: ảnh slide cắt chữ ở "Thá…" và hình vẽ là cột cao, nhiều khả năng là "tháp" chứ không phải "thùng". | vì sao ở đó: Chú thích slide 17.
- bộ phận: Bơm ly tâm | mã: bomlt | chức năng: Bơm ly tâm (công dụng Cần kiểm tra). | vì sao ở đó: Chú thích slide 18.
- bộ phận: Bơm chân không | mã: bomck | chức năng: Hút khí không ngưng để giữ áp suất thấp (Cảnh 4.3, suy từ tên gọi). | vì sao ở đó: Chú thích slide 19.
- bộ phận: Nước lạnh | mã: nuoclanh | chức năng: Làm ngưng hơi ở thiết bị ngưng tụ (Cảnh 4.3). | vì sao ở đó: Chú thích slide 20.
```

## co-dac-lien-tuc (CNTP-Ngay10_2026-11-10_cncb-album.md)
```
[MÔ PHỎNG: co-dac-lien-tuc | kiểu: tháo-lắp | chỗ: phải | khẳng định: Theo chú thích trên slide, sơ đồ nguyên lý cô đặc liên tục dưới áp suất khí quyển gồm bảy bộ phận theo số: 1 thùng chứa dịch, 2 bơm, 3 gia nhiệt dạng tấm bản, 4 thiết bị đun nóng, 5 thiết bị bốc hơi, 6 thiết bị chưng cất và 7 thiết bị ngưng tụ, trong đó thứ tự nối theo số là suy luận | chức năng: giải thích | nhìn: sơ đồ khối bảy ô nối theo thứ tự số, hơi bay ra từ ô 5 và dịch đặc ra]
- bộ phận: Thùng chứa dịch cần cô đặc | mã: thung | chức năng: Chứa dịch cần cô đặc. | vì sao ở đó: Chú thích slide 1.
- bộ phận: Bơm | mã: bom | chức năng: Đưa dịch đi tiếp (hiểu theo tên gọi). | vì sao ở đó: Chú thích slide 2.
- bộ phận: Thiết bị gia nhiệt dạng tấm bản | mã: tamban | chức năng: Gia nhiệt dạng tấm bản. Trên ảnh dịch đặc quay lại qua đây rồi ra "Sản phẩm" (mũi tên nhỏ, Cần kiểm tra). | vì sao ở đó: Chú thích slide 3.
- bộ phận: Thiết bị đun nóng | mã: dunnong | chức năng: Nâng nhiệt độ dịch (hiểu theo tên gọi). | vì sao ở đó: Chú thích slide 4.
- bộ phận: Thiết bị bốc hơi | mã: bochoi | chức năng: Nước bay hơi, dịch đặc dần (slide mục 1). | vì sao ở đó: Chú thích slide 5.
- bộ phận: Thiết bị chưng cất | mã: chungcat | chức năng: Chữ đã đối chiếu ảnh slide, đọc rõ "chưng cất"; hình là cột đứng. Chức năng cụ thể Cần kiểm tra. | vì sao ở đó: Chú thích slide 6.
- bộ phận: Thiết bị ngưng tụ | mã: ngungtu | chức năng: Ngưng hơi (hiểu theo tên gọi). | vì sao ở đó: Chú thích slide 7.
```

