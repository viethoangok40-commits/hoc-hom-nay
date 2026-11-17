# D009 · Đường đẳng nhiệt hấp phụ ẩm (moisture sorption isotherm)

- **Mã bài:** D009 · R&D Food Lab · Nền tảng (m0) · Tuần 1 · Bài 4/5
- **Ngày:** 06/11/2026
- **Bản:** viết lại theo KHUNG v3 (11/11/2026) từ nội dung D009 đã kiểm chứng ngày 08/11/2026, bổ sung 2 nguồn mở ngày 11/11/2026
- **Số chương:** 7 · mỗi chương 8–12 phút · tổng khoảng 70–85 phút (đọc + làm bài)

> **Câu hỏi thật:** Bơ đậu phộng 15% ẩm và sữa bột 8% ẩm đều có aw 0,70 (D008). Vậy nếu ta để một gói bánh quy giòn hở trong kho nồm, nó sẽ hút bao nhiêu nước thì mới dừng, và khi nào nó hết giòn? Để trả lời cần một đồ thị nối aw với lượng nước, và biết đồ thị đó không chạy giống nhau theo hai chiều.

**Sau bài này bạn tự làm được:**
1. Đọc một đường đẳng nhiệt: từ aw tra ra độ ẩm cân bằng, nhận ra ba vùng và giải thích vì sao đường cong vút lên ở aw cao.
2. Giải thích vì sao đường hấp phụ và đường giải hấp không trùng nhau (hiệu ứng chai mực), và hệ quả khi làm công thức.
3. Dùng BET và GAB để tính độ ẩm lớp đơn M0 và độ ẩm cân bằng, rồi ước lượng hạn dùng của sản phẩm giòn theo độ thấm của bao bì.

[NHỚ LẠI]
1. Hoạt độ nước aw khác độ ẩm ở chỗ nào? | từ: D008 | đáp: Độ ẩm đếm lượng nước, aw đo mức nước sẵn sàng tham gia phản ứng và cho vi sinh vật.
2. Nếu không khí và mẫu đã cân bằng, ERH 70% cho biết aw bằng bao nhiêu? | từ: D008 | đáp: aw = 0,70, vì %ERH = aw × 100.
3. Nước đi theo chiều nào giữa hai chỗ có aw khác nhau? | từ: D008 | đáp: Từ aw cao sang aw thấp.
[/NHỚ LẠI]

---

## Chương 1 – Đường đẳng nhiệt: biết aw thì đọc ra lượng nước

[HỎI TRƯỚC: Một gói bánh quy giòn (aw 0,30) bị để hở trong phòng có không khí aw tương đương 0,80. Theo D008 nước đi từ aw cao sang aw thấp. Bánh sẽ hút nước đến lúc nào thì dừng? | đáp: Đến khi aw của bánh bằng 0,80, cân bằng với không khí. | vì sao: Khi hai bên cùng aw thì không còn chênh lệch thế hóa học để đẩy nước. Nhưng lúc đó bánh chứa bao nhiêu nước thì phải tra đường đẳng nhiệt của chính bánh.]

### Cảnh 1.1 – Đường đẳng nhiệt nối aw với độ ẩm cân bằng ở một nhiệt độ cố định

- **Thẻ:** Định nghĩa
- {{đường đẳng nhiệt hấp phụ ẩm|Đường đẳng nhiệt hấp phụ ẩm}} là đồ thị của {{EMC|độ ẩm cân bằng}} (equilibrium moisture content, EMC) theo aw, ở một nhiệt độ không đổi. Pantuso và cộng sự (2019) nêu mục đích: thiết kế thiết bị sấy, chọn bao bì, dự đoán chất lượng khi bảo quản.
- Trục ngang là aw từ 0 đến 1 (cũng là {{ERH}} chia 100). Trục đứng là lượng nước, thường tính bằng g nước trên g chất khô, tức {{cơ sở khô}} như ở D007.
- Mỗi điểm là một trạng thái cân bằng: để mẫu trong không khí có RH tương ứng đủ lâu thì nó đạt đúng độ ẩm đó.
- Nhớ: Biết aw thì đọc ra EMC, cùng nhiệt độ.

### Cảnh 1.2 – Đường cong có ba vùng, và vút lên ở aw cao

- **Thẻ:** Cơ chế
- Thực phẩm khô thường có đường cong chữ S kéo dài. Ở aw thấp, nước bám vào các nhóm phân cực trên bề mặt thành lớp đơn. Ở aw trung bình, các lớp nước xếp chồng lên. Ở aw cao, nước ngưng tụ trong lỗ và hòa tan chất tan như đường, muối, nên đường vút lên (Dai và cs., 2025).
- Hệ quả thực tế: ở vùng cuối, chỉ tăng thêm ít aw đã kéo theo rất nhiều nước.
[MÔ PHỎNG: gab-duong-cong | kiểu: thanh-trượt | chỗ: phải | khẳng định: Theo mô hình GAB, độ ẩm cân bằng không tăng đều theo aw: cùng tăng 0,1 aw, ở vùng cao nước tăng nhiều hơn hẳn ở vùng giữa, và K càng gần 1 thì càng vút lên | chức năng: giải thích | nhìn: giá trị EMC ở aw 0,4 và 0,5 so với 0,8 và 0,9]
- dự đoán: Mẫu hút thêm nhiều nước hơn khi aw tăng từ 0,4 lên 0,5 hay từ 0,8 lên 0,9? | chọn: Từ 0,4 lên 0,5; Từ 0,8 lên 0,9 | đáp: Từ 0,8 lên 0,9 | vì sao: Với M0 = 0,06, C = 10, K = 0,8 mẫu thêm khoảng 0,014 g/g ở bước 0,4 lên 0,5 nhưng khoảng 0,048 g/g ở bước 0,8 lên 0,9, gấp hơn 3 lần.
- biến: a | nhãn: aw của không khí quanh mẫu | đơn vị: aw | min: 0 | max: 0.9 | bước: 0.05 | mặc định: 0.5
- chọn: K = 0,60 {K: 0.6, max: 0.9}; K = 0,80 {K: 0.8, max: 0.9}; K = 0,95 {K: 0.95, max: 0.9}
- hằng: mo = 0.06 ; c = 10
- tính: tu = mo * c * K * a ; mau = (1 - K * a) * (1 - K * a + c * K * a) ; emc = tu / mau
- ra: emc | nhãn: EMC (g nước / g chất khô) | chữ số: 3
- nguồn: Phương trình GAB m = m0·cG·K·aw / [(1 − K·aw)(1 − K·aw + cG·K·aw)] (Giannakourou và cs., J Food Sci 2026, phương trình 4, đã mở 11/11/2026); M0 = 0,06 (mo) và C = 10 (c) là số giả định của bài (Chương 4); ba vùng theo Dai và cs. (2025)
- giới hạn: Mô hình minh họa, không phải số đo của một thực phẩm. M0 và C cố định ở số giả định, chỉ đổi K và aw. GAB chỉ dùng được tới aw khoảng 0,8–0,9 (Pantuso và cs., 2019), nên thanh trượt dừng ở 0,9; với K = 0,95 kết quả ở aw cao rất nhạy và không nên đọc như số thật. Vì sao thực phẩm thật có K nào là do mẫu, không suy ra từ mô phỏng.
[/MÔ PHỎNG]
- Nhớ: Vùng giữa thoải, vùng cuối vút lên: ít aw, nhiều nước.

### Cảnh 1.3 – Mỗi thực phẩm có một đường riêng

- **Thẻ:** Hiểu sai thường gặp
- Brunauer (1940) phân năm dạng đường. Trong thực phẩm hay gặp dạng II (chữ S) và dạng III (dạng J: ít nước ở aw thấp, rất nhiều ở aw cao, điển hình của thực phẩm giàu đường kết tinh). Dai và cs. (2025) gọi đường của FOS và inulin là dạng sigmoid, nhóm "IIa" theo cách gọi của họ.
- Cùng aw nhưng hai thực phẩm khác nhau có EMC khác nhau: bơ đậu phộng 15% và sữa bột 8% cùng aw 0,70 (FDA, 1984). Đừng dùng đường của sản phẩm này cho sản phẩm khác.
- Nhớ: Mỗi thực phẩm một đường, mỗi đường một nhiệt độ.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao đường đẳng nhiệt phải ghi kèm nhiệt độ. | đáp: Vì aw tăng theo nhiệt độ (D008). Ở cùng độ ẩm, nhiệt độ khác thì aw khác, nên đường cong khác.]

[QUIZ]
1. Trục đứng của đường đẳng nhiệt thường là:
  - A) aw
  - B) EMC, g nước trên g chất khô
  - C) Thời gian
  - đáp: B
  - vì sao: aw nằm ở trục ngang; không có trục thời gian vì mỗi điểm là trạng thái cân bằng. Sai A và C.
2. Ở vùng aw cao đường dốc lên vì:
  - A) Nước bám chặt hơn vào bề mặt
  - B) Nước ngưng tụ trong lỗ và hòa tan chất tan
  - C) Mẫu lạnh đi
  - đáp: B
  - vì sao: Dai và cs. (2025). Bám chặt vào bề mặt là vùng aw thấp; nhiệt độ cố định cả đường. Sai A và C.
3. Với GAB (M0 = 0,06; C = 10; K = 0,8), mẫu thêm nước nhiều hơn ở bước nào?
  - A) 0,4 lên 0,5
  - B) 0,8 lên 0,9
  - C) Như nhau
  - đáp: B
  - vì sao: Khoảng 0,014 g/g so với 0,048 g/g (xem mô phỏng). Sai C: đường cong không phải đường thẳng.
4. [TỰ LUẬN] Vì sao biết aw của hai sản phẩm giống nhau vẫn chưa đủ để nói chúng chứa cùng lượng nước? | mẫu: Vì mỗi sản phẩm có đường đẳng nhiệt riêng, cùng aw cho EMC khác nhau (bơ đậu phộng 15% và sữa bột 8% cùng aw 0,70).
[/QUIZ]

[TÓM: Đường đẳng nhiệt nối aw với EMC ở nhiệt độ cố định | Dạng S có ba vùng và vút lên ở aw cao | Mỗi thực phẩm có đường riêng]

---

## Chương 2 – Hiện tượng trễ: đường đi lên khác đường đi xuống

[HỎI TRƯỚC: Mẫu A được sấy từ ẩm xuống aw 0,60. Mẫu B khô, được cho hút ẩm lên aw 0,60. Hai mẫu cùng aw 0,60 có cùng lượng nước không? | đáp: Thường là không. Mẫu A đi theo đường giải hấp nên giữ nhiều nước hơn. | vì sao: Hai nhánh hấp phụ và giải hấp không trùng nhau. Chương này giải thích vì sao.]

### Cảnh 2.1 – Hai nhánh không trùng nhau tạo thành vòng trễ

- **Thẻ:** Định nghĩa
- {{hấp phụ và giải hấp|Hấp phụ}} đi từ khô lên ẩm, giải hấp đi từ ẩm xuống khô. Hai đường tạo vòng kín gọi là vòng trễ ({{hiện tượng trễ}}, hysteresis).
- Dai và cs. (2025): cả hai nhánh của FOS và inulin đều dạng chữ S; nhánh giải hấp trơn, nhánh hấp phụ của FOS có ba điểm uốn và của inulin có năm; vòng trễ lớn ở vùng aw thấp (ngưỡng cụ thể xem bài gốc).
- Schiraldi và cs. (2012) coi trễ là hiện tượng thật, không phải do máy đo sai. Họ cũng lưu ý nước kém linh động cần rất lâu để cân bằng, nên mỗi điểm đo phải chờ đủ lâu.
- Nhớ: Cùng aw, nhánh giải hấp chứa nhiều nước hơn.

### Cảnh 2.2 – Hiệu ứng chai mực: cổ hẹp giữ nước của khoang rộng lại

- **Thẻ:** Cơ chế
- Cơ sở là {{phương trình Kelvin}}: nước ngưng tụ trong lỗ nhỏ ở aw thấp hơn trong lỗ lớn. Ở mỗi RH có một bán kính tới hạn r: lỗ nhỏ hơn r đầy nước, lỗ lớn hơn r chứa khí; r tăng khi RH tăng (Pöllmann, Reinelt và Briesen, 2022).
- Lỗ thật có khoang rộng và cổ hẹp, như cái chai mực ({{hiệu ứng chai mực}}). Khi hấp phụ, nước vào mọi chỗ và lấp đầy từ nhỏ đến lớn. Khi giải hấp, cổ hẹp đầy nước chặn không cho nước trong khoang rộng bay đi; chỉ khi RH giảm đến mức đường kính hẹp nhất của lỗ nhỏ hơn đường kính tới hạn thì cả lỗ mới trống.
[MÔ PHỎNG: chai-muc | kiểu: hoạt-hình | chỗ: phải | khẳng định: Ở cùng RH trung bình, lỗ có cổ hẹp chứa ít nước khi hấp phụ nhưng đầy nước khi giải hấp, vì cổ hẹp giữ nước của khoang rộng lại | chức năng: giải thích | nhìn: so khung 2 với khung 4]
- hình: hoat-hinh/chai-muc.svg
- bước: 1 | chữ: RH thấp: lỗ khô, chỉ có màng nước mỏng bám thành. | vì sao: Bán kính tới hạn còn nhỏ hơn cổ lỗ.
- bước: 2 | chữ: RH tăng đến mức trung bình: cổ hẹp đầy nước trước, khoang rộng vẫn chứa khí. | vì sao: Bán kính tới hạn đã đủ lớn cho cổ hẹp nhưng chưa đủ cho khoang rộng.
- bước: 3 | chữ: RH cao: bán kính tới hạn vượt khoang rộng, cả lỗ đầy nước. | vì sao: Lỗ nào nhỏ hơn bán kính tới hạn đều đầy nước.
- bước: 4 | chữ: RH giảm về mức trung bình: khoang rộng vẫn đầy nước vì cổ hẹp đầy nước chặn lối thoát. So khung 2: cùng RH nhưng nhiều nước hơn. | vì sao: Muốn nước trong khoang thoát, cổ phải trống trước.
- bước: 5 | chữ: RH giảm rất thấp: bán kính tới hạn nhỏ hơn cổ, cổ trống, nước trong khoang thoát hết. | vì sao: Vòng trễ khép lại khi lỗ trống hoàn toàn.
- nguồn: Pöllmann A., Reinelt M., Briesen H. (2022), Materials 15(17):6031, mục 2.5 (lý thuyết chai mực, phương trình Kelvin) và mục 3 (silica gel: không trễ dưới RH 30%, trễ trong khoảng 30–80%; đã mở 11/11/2026); Schiraldi và cs. (2012)
- giới hạn: Mô hình minh họa, không phải số đo. Chỉ vẽ một lỗ lý tưởng một cổ; vật liệu thật có rất nhiều lỗ lớn nhỏ nên chỉ có trễ từng phần phụ thuộc lịch sử RH. Nghiên cứu nguồn dùng silica gel làm chất mẫu, không phải thực phẩm; thực phẩm polymer còn có các nguyên nhân khác (Cần kiểm tra). Nhãn RH chỉ định tính, không gắn số.
[/MÔ PHỎNG]
- Nhớ: Lỗ chai mực vào dễ, ra khó.

### Cảnh 2.3 – Cách làm ra sản phẩm quyết định nó nằm trên nhánh nào

- **Thẻ:** Hiểu sai thường gặp
- Labuza (1971, báo cáo NASA): thực phẩm được làm bằng cách thêm chất giữ ẩm đến aw cần thiết (giải hấp) chứa nhiều ẩm hơn thực phẩm được sấy rồi cho hút ẩm lại tới cùng aw (hấp phụ); báo cáo ghi chênh lệch là rất lớn.
- Cùng báo cáo: thực phẩm ẩm trung bình chuẩn bị theo kiểu giải hấp bị oxy hóa lipid nhanh hơn 3–6 lần so với kiểu hấp phụ, vì chất xúc tác linh động hơn.
- Nhớ: Chỉ ghi "aw 0,60" là thiếu; ghi thêm sản phẩm đi theo nhánh nào.

[VÍ DỤ GIẢI]
- Bước 1: Đề: một thanh ngũ cốc làm theo cách (a) trộn siro tới aw 0,60 và cách (b) sấy khô rồi để hút ẩm tới aw 0,60. Hai thanh cùng aw 0,60. Thanh nào chứa nhiều nước hơn? | vì sao: Thanh (a) nằm trên nhánh giải hấp, thanh (b) trên nhánh hấp phụ.
- Bước 2: Thanh (a) chứa nhiều nước hơn. | vì sao: Ở cùng aw, nhánh giải hấp nằm trên (Labuza, 1971).
- Bỏ trống: Theo Labuza, oxy hóa lipid của kiểu giải hấp nhanh hơn kiểu hấp phụ khoảng ____ lần | đáp: 3–6
- Tự làm: Vì sao hai sản phẩm cùng aw đo được nhưng làm theo hai quy trình lại có thể có hạn dùng khác nhau? | đáp: Vì chúng nằm trên hai nhánh khác nhau, chứa lượng nước khác nhau ở cùng aw nên tốc độ hỏng khác nhau.
[/VÍ DỤ GIẢI]

[TỰ GIẢI THÍCH: Hãy tự nói bằng lời của mình hiệu ứng chai mực và nó giải thích được điều gì. | đáp: Lỗ có cổ hẹp và khoang rộng: nước vào lấp đầy từ nhỏ đến lớn, nhưng khi giải hấp cổ hẹp đầy nước chặn nước trong khoang thoát ra, nên ở cùng RH nhánh giải hấp chứa nhiều nước hơn nhánh hấp phụ.]

[QUIZ]
1. Ở cùng aw, nhánh nào có độ ẩm cao hơn?
  - A) Hấp phụ
  - B) Giải hấp
  - C) Như nhau
  - đáp: B
  - vì sao: Labuza (1971); Dai và cs. (2025). Sai C: đó là điều vòng trễ phủ nhận.
2. Hiệu ứng chai mực dựa trên phương trình nào?
  - A) Raoult
  - B) Kelvin
  - C) Arrhenius
  - đáp: B
  - vì sao: Kelvin mô tả ngưng tụ trong lỗ nhỏ (Pöllmann và cs., 2022). Raoult (D008) nói về chất tan, không phải hình học lỗ. Sai A.
3. Trong hoạt hình, vì sao khoang rộng vẫn đầy nước ở khung 4?
  - A) Vì RH vẫn cao
  - B) Vì cổ hẹp đầy nước chặn lối thoát
  - C) Vì mẫu hút thêm nước
  - đáp: B
  - vì sao: RH ở khung 4 chỉ trung bình; chặn bởi cổ hẹp. Sai A và C.
4. [TỰ LUẬN] Hiệu ứng chai mực nói gì về hình dạng lỗ, và vì sao hình dạng đó làm giải hấp khó hơn hấp phụ? | mẫu: Lỗ có khoang rộng và cổ hẹp; khi giải hấp cổ hẹp đầy nước chặn nước trong khoang thoát, nên phải giảm RH sâu hơn mới trống.
[/QUIZ]

[TÓM: Hai nhánh hấp phụ và giải hấp không trùng nhau, nhánh giải hấp chứa nhiều nước hơn | Chai mực: cổ hẹp giữ nước của khoang rộng (Kelvin) | Cách làm sản phẩm quyết định nhánh và độ bền]

---

## Chương 3 – BET, GAB và độ ẩm lớp đơn

[HỎI TRƯỚC: Nếu mỗi nhóm phân cực trên bề mặt thực phẩm giữ một phân tử nước thì có một lượng nước vừa phủ kín bề mặt thành một lớp. Theo bạn lượng đó lớn hay nhỏ so với tổng độ ẩm? | đáp: Thường nhỏ, vài phần trăm chất khô. | vì sao: Bề mặt hấp phụ chỉ là một phần của khối thực phẩm; phần nước còn lại nằm ở các lớp trên và trong lỗ.]

### Cảnh 3.1 – BET mở rộng thuyết đơn lớp sang nhiều lớp, nhưng chỉ khớp ở aw thấp

- **Thẻ:** Định nghĩa
- Năm 1938 Brunauer, Emmett và Teller mở rộng thuyết đơn lớp của Langmuir sang hấp phụ nhiều lớp, thành {{mô hình BET}} (Pantuso và cs., 2019). Dạng thường dùng: m = m0·c·aw / [(1 − aw)(1 − aw + c·aw)] (Giannakourou và cs., 2026, phương trình 3).
- Dạng tuyến tính để tìm M0 và C: aw / [M(1 − aw)] = 1/(M0·C) + [(C − 1)/(M0·C)]·aw, trong đó M0 là {{độ ẩm lớp đơn}}. Pantuso và cs. (2019): BET chỉ khớp tốt ở áp suất tương đối dưới khoảng 0,35. Với bột cá, Giannakourou và cs. (2026) thấy BET và mô hình tuyến tính dùng được dưới aw 0,65.
- Nhớ: BET cho M0 và C ở aw thấp.

### Cảnh 3.2 – GAB thêm tham số K để dùng được tới aw 0,8–0,9

- **Thẻ:** Định nghĩa
- {{mô hình GAB}} (Guggenheim–Anderson–de Boer) có ba tham số m0, C, K: m = m0·C·K·aw / [(1 − K·aw)(1 − K·aw + C·K·aw)] (Giannakourou và cs., 2026, phương trình 4). Pantuso và cs. (2019): GAB sửa BET bằng cách coi các phân tử từ lớp thứ hai trở đi ở một trạng thái giống nhau nhưng khác nước lỏng, mô tả tốt hơi nước trong thực phẩm tới aw khoảng 0,8–0,9.
- Khi K = 1, GAB trở thành BET. Giannakourou và cs. (2026): GAB khớp tốt nhất trên toàn dải aw cho bột cá của họ.
- Nhớ: GAB = BET + K.

### Cảnh 3.3 – M0 là lượng nước phủ kín một lớp, nên là mục tiêu độ ẩm cho sản phẩm khô

- **Thẻ:** Cơ chế
- M0 là lượng nước vừa phủ kín một lớp trên các nhóm hấp phụ. Theo Dai và cs. (2025), M0 được coi là độ ẩm lý tưởng để tránh thay đổi chất lượng sản phẩm; nhóm lấy M0 từ tham số a của GAB và MGAB.
- Đừng nhầm M0 với độ ẩm toàn phần: M0 chỉ là phần nước bám sát bề mặt, còn độ ẩm toàn phần gồm cả nước ở các lớp trên.
- Nhớ: M0 = nước phủ vừa kín một lớp.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao GAB dùng được tới aw cao hơn BET. | đáp: Vì thêm tham số K cho phép các lớp từ thứ hai trở đi ở trạng thái khác nước lỏng, nên mô tả vùng nhiều lớp tốt hơn.]

[QUIZ]
1. M0 là:
  - A) Độ ẩm khi aw bằng 1
  - B) Lượng nước phủ kín một lớp trên các nhóm hấp phụ
  - C) Độ ẩm tối đa an toàn
  - đáp: B
  - vì sao: Pantuso và cs. (2019). Sai A và C: M0 không phải mốc của aw cao hay ngưỡng an toàn.
2. BET chỉ khớp tốt ở áp suất tương đối (theo Pantuso và cs.):
  - A) Dưới khoảng 0,35
  - B) 0,5–0,9
  - C) Mọi giá trị
  - đáp: A
  - vì sao: Pantuso và cs. (2019). Sai C: mô hình có miền hợp lệ.
3. GAB khác BET ở điểm nào?
  - A) Không có M0
  - B) Thêm K, dùng được tới khoảng 0,8–0,9
  - C) Chỉ cho khí
  - đáp: B
  - vì sao: Pantuso và cs. (2019). Sai A: GAB vẫn có m0.
4. [TỰ LUẬN] M0 khác độ ẩm toàn phần ở chỗ nào? | mẫu: M0 là phần nước phủ kín một lớp trên bề mặt hấp phụ; độ ẩm toàn phần gồm cả các lớp nước phía trên và nước trong lỗ.
[/QUIZ]

[TÓM: BET cho M0 và C ở aw thấp | GAB thêm K, dùng tới 0,8–0,9 | M0 là nước phủ vừa kín một lớp]

---

## Chương 4 – Bài tính có lời giải: M0 và C từ ba điểm, rồi dự đoán bằng GAB

[HỎI TRƯỚC: Bạn có ba điểm đo EMC ở aw 0,10; 0,20; 0,30. Theo bạn dạng tuyến tính nào của BET sẽ cho hai số M0 và C chỉ bằng một đường thẳng? | đáp: Vẽ aw / [M(1 − aw)] theo aw. | vì sao: Dạng tuyến tính BET có vế phải là hàm bậc nhất của aw, nên độ dốc và giao trục tung chứa M0 và C.]

### Cảnh 4.1 – Hai số đọc từ đường thẳng cho M0 và C (số liệu là đề bài giả định)

- **Thẻ:** Ví dụ số
- Số liệu là đề bài, không phải thí nghiệm thật. {{EMC}} (g/g chất khô): 0,035 ở aw 0,10; 0,054 ở 0,20; 0,070 ở 0,30.
- Mỗi điểm chuyển thành y = aw / [M(1 − aw)], rồi ta vẽ y theo aw và đọc độ dốc, giao trục tung để có {{độ ẩm lớp đơn|M0}} và C.
[VÍ DỤ GIẢI]
- Bước 1: Tính y: aw 0,10 → 0,10 / (0,035 × 0,90) = 3,175; aw 0,20 → 0,20 / (0,054 × 0,80) = 4,630; aw 0,30 → 0,30 / (0,070 × 0,70) = 6,122. | vì sao: Đưa số liệu về dạng tuyến tính BET.
- Bước 2: Đường thẳng qua điểm đầu và cuối: độ dốc = (6,122 − 3,175) / (0,30 − 0,10) ≈ 14,74; giao trục tung = 3,175 − 14,74 × 0,10 ≈ 1,70. | vì sao: Độ dốc và giao tung là hai số chứa M0 và C.
- Bước 3: Độ dốc + giao = 1/M0 = 16,44 nên M0 ≈ 0,061 g/g; C = độ dốc / giao + 1 ≈ 9,7. | vì sao: Độ dốc = (C − 1)/(M0·C), giao = 1/(M0·C), cộng lại được 1/M0.
- Bỏ trống: Dùng M0 = 0,061, C = 9,7, mô hình hợp lệ tới aw khoảng ____ | đáp: 0,35
- Tự làm: Nếu điểm đo thứ tư có aw 0,50, có nên đưa vào đường thẳng BET không? | đáp: Không, vì BET chỉ khớp dưới khoảng 0,35.
[/VÍ DỤ GIẢI]
- Nhớ: Cộng độ dốc và giao tung ra 1/M0.

### Cảnh 4.2 – GAB dự đoán độ ẩm cân bằng ở aw mới

- **Thẻ:** Ví dụ số
- Giả sử {{mô hình GAB|GAB}} có M0 = 0,06 g/g, C = 10, K = 0,8. Tính EMC ở aw 0,50 theo M = M0·C·K·aw / [(1 − K·aw)(1 − K·aw + C·K·aw)].
[VÍ DỤ GIẢI]
- Bước 1: K·aw = 0,8 × 0,50 = 0,40. | vì sao: Gộp tích K·aw xuất hiện hai lần.
- Bước 2: Mẫu số = (1 − 0,40) × (1 − 0,40 + 10 × 0,40) = 0,60 × 4,60 = 2,76. | vì sao: Thay K·aw và C·K·aw vào công thức.
- Bước 3: Tử số = 0,06 × 10 × 0,8 × 0,50 = 0,24; M = 0,24 / 2,76 ≈ 0,087 g/g. | vì sao: Chia tử cho mẫu.
- Bỏ trống: Ở aw 0,70 thì EMC khoảng ____ g/g | đáp: 0,126
- Tự làm: Kho có không khí 70% RH. Bao bì làm aw bên trong chỉ đạt 0,50. Nếu mẫu chuyển từ aw 0,50 lên 0,70, nó hút thêm bao nhiêu g nước trên 100 g chất khô? | đáp: 0,126 − 0,087 = 0,039 g/g, tức 3,9 g trên 100 g chất khô.
[/VÍ DỤ GIẢI]
- Nhớ: Luôn kiểm tra miền aw hợp lệ của mô hình.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao cộng độ dốc và giao trục tung lại cho 1/M0. | đáp: Độ dốc là (C − 1)/(M0·C) và giao là 1/(M0·C); cộng lại ra ((C − 1) + 1)/(M0·C) = C/(M0·C) = 1/M0.]

[QUIZ]
1. M0 tính được trong Cảnh 4.1 khoảng bao nhiêu?
  - A) 0,0061 g/g
  - B) 0,061 g/g
  - C) 0,61 g/g
  - đáp: B
  - vì sao: 1/M0 = 14,74 + 1,70 = 16,44, nên M0 ≈ 0,0608. Sai A và C: lệch một bậc.
2. GAB (M0 = 0,06; C = 10; K = 0,8) cho EMC ở aw 0,50 khoảng:
  - A) 0,030
  - B) 0,087
  - C) 0,24
  - đáp: B
  - vì sao: 0,24 / 2,76 = 0,087. Sai C: 0,24 mới chỉ là tử số.
3. [TỰ LUẬN] Vì sao không nên dùng BET tuyến tính cho điểm aw 0,50? | mẫu: BET chỉ khớp tốt dưới khoảng 0,35 (Pantuso và cs., 2019).
[/QUIZ]

[TÓM: Tuyến tính hóa BET cho M0 và C từ độ dốc và giao tung | GAB cho EMC theo aw bằng ba tham số | Luôn kiểm tra miền aw hợp lệ]

---

## Chương 5 – Bao bì và hạn dùng của sản phẩm giòn

[HỎI TRƯỚC: Hai gói bánh giống nhau, một trong túi màng tốt, một trong túi màng thủng nhẹ, cùng đặt trong kho nồm. Điều gì quyết định gói nào hết giòn trước? | đáp: Tốc độ hơi nước đi qua màng, và độ dốc đường đẳng nhiệt của bánh. | vì sao: Hơi nước đi vào theo chênh lệch aw giữa kho và gói; còn mỗi đơn vị aw tăng kéo theo bao nhiêu nước thì do đường đẳng nhiệt.]

### Cảnh 5.1 – Nước đi qua màng theo chênh lệch aw, nên aw trong gói tăng dần

- **Thẻ:** Cơ chế
- Giannakourou và cs. (2026) mô tả nước đi qua màng bao bì theo chênh lệch áp suất hơi nước hai phía màng (Fick và Henry). Viết bằng aw: Ws · dm/dt = (k/x) · A · p0 · (aw,e − aw). Ở đây m là độ ẩm (g/g chất khô), Ws là khối lượng chất khô (g), {{độ thấm hơi nước|k/x}} là độ thấm của màng (g/(ngày·m²·mmHg)), A là diện tích màng (m²), p0 là áp suất hơi bão hòa của nước (mmHg), aw,e là aw cân bằng với RH bên ngoài, aw là aw của thực phẩm, cũng là RH bên trong gói.
- Nếu đường đẳng nhiệt trong vùng làm việc xấp xỉ đường thẳng m = b·aw + c (mô hình tuyến tính trong bài đó, phương trình 2) thì dm = b·daw. Lấy tích phân từ aw ban đầu đến {{aw giới hạn chất lượng|aw giới hạn}} a_c ta được thời gian t = ln[(aw,e − a_i) / (aw,e − a_c)] / [(k/x)·(A/Ws)·(p0/b)]. Bước tích phân này là suy ra của album từ hai phương trình trên, không chép nguyên văn từ bài.
- Giới hạn a_c do người làm sản phẩm chọn theo tiêu chí chất lượng. Ví dụ Giannakourou và cs. dùng giới hạn đo bằng chỉ số peroxide cho bột cá; còn aw dưới 0,6 được xem là ổn định vi sinh cho thực phẩm khô.
- Nhớ: b ở mẫu số: đường đẳng nhiệt càng dốc, aw trong gói tăng càng chậm.

[VÍ DỤ GIẢI]
- Bước 1: Đề (số giả định): a_i = 0,30; a_c = 0,60; kho aw,e = 0,80; k/x = 0,01 g/(ngày·m²·mmHg); A = 0,03 m²; Ws = 50 g; p0 = 23,76 mmHg; b = 0,12 g/g trên mỗi đơn vị aw. Tính ln[(0,80 − 0,30)/(0,80 − 0,60)] = ln 2,5 ≈ 0,916. | vì sao: Đó là phần chênh lệch aw trong công thức.
- Bước 2: Hệ số = 0,01 × (0,03 / 50) × (23,76 / 0,12) = 0,01 × 0,0006 × 198 ≈ 1,19 × 10⁻³ ngày⁻¹. | vì sao: Gộp độ thấm, hình học gói và độ dốc đường đẳng nhiệt.
- Bước 3: t = 0,916 / 1,19 × 10⁻³ ≈ 771 ngày, khoảng 2,1 năm. | vì sao: t = tử chia hệ số.
- Bỏ trống: Nếu màng thủng nhẹ làm độ thấm tăng 10 lần thì t ≈ ____ ngày | đáp: Khoảng 77 ngày
- Tự làm: Giữ nguyên mọi thứ, tăng khối lượng chất khô Ws lên gấp đôi (gói to hơn, cùng diện tích màng). Hạn dùng thay đổi thế nào? | đáp: Tăng gấp đôi, vì Ws nằm ở mẫu số của hệ số (A/Ws).
[/VÍ DỤ GIẢI]

### Cảnh 5.2 – Hạn dùng tỉ lệ nghịch với độ thấm hơi nước của màng

- **Thẻ:** Cơ chế
- Từ công thức ở Cảnh 5.1, khi mọi thứ khác giữ nguyên, t tỉ lệ nghịch với k/x. Chọn màng là một quyết định kỹ thuật chứ không phải chuyện bao bì đẹp hay xấu.
[MÔ PHỎNG: han-dung-mang | kiểu: thanh-trượt | chỗ: phải | khẳng định: Khi mọi thứ khác giữ nguyên, hạn dùng của sản phẩm giòn tỉ lệ nghịch với độ thấm hơi nước của màng | chức năng: giải thích | nhìn: số ngày hạn dùng khi k/x gấp 10 lần]
- dự đoán: Màng thấm hơi nước gấp 10 lần thì hạn dùng thành bao nhiêu? | chọn: Còn 1/10; Còn 1/2; Không đổi | đáp: Còn 1/10 | vì sao: Độ thấm k/x nằm ở mẫu số của t, nên tăng 10 lần thì t giảm 10 lần (771 ngày còn khoảng 77 ngày).
- biến: kx | nhãn: Độ thấm hơi nước của màng k/x | đơn vị: g/(ngày·m²·mmHg) | min: 0.001 | max: 0.1 | bước: 0.001 | mặc định: 0.01
- hằng: ai = 0.30 ; ac = 0.60 ; ae = 0.80 ; ds = 0.03 ; ws = 50 ; po = 23.76 ; b = 0.12
- tính: t = ln((ae - ai) / (ae - ac)) / (kx * (ds / ws) * (po / b))
- ra: t | nhãn: Hạn dùng ước lượng (ngày) | chữ số: 0
- nguồn: Phương trình truyền nước qua màng (phương trình 9) và mô hình tuyến tính (phương trình 2) của Giannakourou và cs. (J Food Sci 2026, đã mở 11/11/2026); công thức t là phép tích phân của album (Cảnh 5.1); các số a_i, a_c, aw,e, A (ds), Ws (ws), p0 (po), b là số giả định của Cảnh 5.1
- giới hạn: Mô hình minh họa với số giả định, không phải dự đoán hạn dùng của một sản phẩm thật. Chỉ đúng khi đường đẳng nhiệt xấp xỉ thẳng trong vùng làm việc và nước đi qua màng là bước chậm nhất (Giannakourou và cs. giả định sức cản khuếch tán trong thực phẩm không đáng kể). Bỏ qua nhiệt độ thay đổi, mối hàn, lỗ thủng, và phản ứng hóa học khác; Cần kiểm tra p0 = 23,76 mmHg ở 25 °C với bảng hơi nước.
[/MÔ PHỎNG]
- Nhớ: Màng thấm gấp 10 lần, hạn dùng còn 1/10.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao độ dốc b của đường đẳng nhiệt nằm ở mẫu số trong công thức hạn dùng. | đáp: b lớn nghĩa là mỗi đơn vị aw tăng cần hấp thụ nhiều nước hơn; hơi nước vào với tốc độ do màng quyết định, nên cần thời gian dài hơn để đẩy aw lên tới a_c, hạn dùng dài hơn.]

[QUIZ]
1. Màng thấm hơi nước gấp 10 lần, các yếu tố khác giữ nguyên. Hạn dùng:
  - A) Gấp 10
  - B) Còn 1/10
  - C) Không đổi
  - đáp: B
  - vì sao: t tỉ lệ nghịch với k/x. Sai A: ngược chiều. Sai C: màng là yếu tố điều khiển tốc độ nước vào.
2. Sản phẩm có đường đẳng nhiệt dốc hơn (b lớn), a_c như nhau:
  - A) Hạn dùng dài hơn
  - B) Hạn dùng ngắn hơn
  - C) Không liên quan
  - đáp: A
  - vì sao: b nằm ở mẫu số của hệ số, nên b lớn thì hệ số nhỏ, t lớn. Sai B và C.
3. [TỰ LUẬN] Nêu hai cách kéo dài hạn dùng của sản phẩm giòn trong kho ẩm theo công thức. | mẫu: Chọn màng có k/x thấp hơn; giảm diện tích màng hoặc tăng khối lượng chất khô mỗi gói; hạ aw ban đầu của sản phẩm.
[/QUIZ]

[TÓM: Nước vào gói theo chênh lệch aw qua màng | Khi đường đẳng nhiệt thẳng, t = ln của tỉ số chênh lệch aw chia cho (k/x)(A/Ws)(p0/b) | Màng thấm gấp 10 lần thì hạn dùng còn 1/10]

---

## Chương 6 – Đọc bài báo chính: Dai và cs. (2025)

[HỎI TRƯỚC: Bột chất xơ FOS và inulin hấp thụ hơi nước thế nào ở nhiều nhiệt độ, và vì sao người thiết kế bao bì cần biết? | đáp: Cần đường đẳng nhiệt của nguyên liệu để chọn điều kiện sấy, kho và bao bì. | vì sao: Mỗi nguyên liệu một đường (Chương 1).]

### Cảnh 6.1 – Thẻ bài đọc: đường đẳng nhiệt của bột FOS và inulin

- **Thẻ:** Định nghĩa
- Dai B., Chen R., Wei Z., Wu J., Li X., Cerqueira M.A. (2025). "Moisture Sorption Isotherms of Fructooligosaccharide and Inulin Powders and Their Gelling Competence in Delaying the Retrogradation of Rice Starch". Gels 11, DOI 10.3390/gels11100817, CC BY (đọc toàn văn qua PMC12563539). Loại bài: nghiên cứu thực nghiệm.
- Mục tiêu theo tác giả: dự đoán hạn dùng, xác định độ ẩm lớp đơn và điều kiện bảo quản phù hợp, gợi ý thiết kế sấy và bao bì.
- Nhớ: Bài đọc kiểm tra những gì vừa học: hai nhánh, M0, GAB.

### Cảnh 6.2 – Họ thấy hai nhánh đều dạng S và vòng trễ lớn ở aw thấp

- **Thẻ:** Cơ chế
- Cả hai nhánh hấp phụ và giải hấp đều dạng sigmoid; nhánh giải hấp trơn; nhánh hấp phụ của FOS có ba điểm uốn, của inulin có năm; vòng trễ lớn ở aw thấp.
- M0 ước lượng từ tham số a của GAB và MGAB; ở aw cao độ ẩm tăng mạnh do hòa tan các thành phần đường.
- Nhớ: Số M0 cụ thể xem bảng trong bài gốc; album không chép số.

### Cảnh 6.3 – Phản biện: bột chất xơ không phải thực phẩm hoàn chỉnh

- **Thẻ:** Hiểu sai thường gặp
- Đây là bột FOS và inulin, không phải một thực phẩm nhiều thành phần; đường của sản phẩm thật sẽ khác. Vòng trễ lớn không có nghĩa mẫu "hỏng": nó cho biết bảo quản theo nhánh nào ảnh hưởng độ ẩm ở cùng aw.
- Gọi nhóm "IIa" là cách của nhóm tác giả, không phải tên chuẩn duy nhất.
- Nhớ: Đọc số trong bảng gốc trước khi dùng cho thiết kế.

[TỰ GIẢI THÍCH: Nhánh hấp phụ của FOS có nhiều điểm uốn hơn nhánh giải hấp trơn. Theo bạn điều đó cho thấy gì? | đáp: Đây là suy luận của album, không phải kết luận của tác giả: khi nước vào mẫu đi qua nhiều bước chuyển (ví dụ hòa tan từng phần) nên đường gấp khúc; khi nước ra, mẫu đã ướt hoàn toàn nên đường trơn.]

[QUIZ]
1. Dai và cs. (2025) mô tả đường của FOS và inulin:
  - A) Dạng J
  - B) Sigmoid (nhóm "IIa" theo họ)
  - C) Đường thẳng
  - đáp: B
  - vì sao: Dai và cs. (2025). Sai A và C.
2. M0 trong bài được ước lượng từ:
  - A) Tham số K của GAB
  - B) Tham số a của GAB và MGAB
  - C) Độ nhớt
  - đáp: B
  - vì sao: Dai và cs. (2025). Sai A: K là tham số khác.
3. [TỰ LUẬN] Vì sao đường đẳng nhiệt của bột chất xơ có ích cho người thiết kế bao bì? | mẫu: Nó cho biết nguyên liệu hút bao nhiêu nước ở aw của kho, từ đó chọn màng, điều kiện sấy và kho.
[/QUIZ]

[TÓM: FOS và inulin có đường dạng S | Vòng trễ lớn ở aw thấp, nhánh hấp phụ nhiều điểm uốn | M0 từ tham số a của GAB và MGAB]

---

## Chương 7 – Tiếng Anh: thuật ngữ và câu mẫu

### Cảnh 7.1 – Sáu cụm từ cốt lõi của đường đẳng nhiệt

- **Thẻ:** Định nghĩa
- moisture sorption isotherm · equilibrium moisture content (EMC) · monolayer moisture content.
- hysteresis · BET and GAB models · water vapor permeability.
- Nhớ: Sáu cụm này xuất hiện trong spec sheet và bài báo.

### Cảnh 7.2 – Hai câu mẫu cho báo cáo đường đẳng nhiệt

- **Thẻ:** Định nghĩa
- "The adsorption and desorption isotherms were sigmoidal, with large hysteresis at low water activity." Hai đường hấp phụ và giải hấp đều dạng sigmoid, có vòng trễ lớn ở aw thấp. (Viết lại từ ý của Dai và cs., 2025, không trích nguyên văn.)
- "The GAB model describes water sorption in foods satisfactorily up to water activities of about 0.8–0.9." Mô hình GAB mô tả tốt sự hấp thụ nước tới aw khoảng 0,8–0,9 (ý của Pantuso và cs., 2019).
- Nhớ: Báo cáo đường đẳng nhiệt luôn kèm nhiệt độ.

[QUIZ]
1. Câu tiếng Anh nào đúng nhất cho "vòng trễ lớn ở aw thấp"?
  - A) Large hysteresis occurred at low water activity.
  - B) Large hysteresis occurred at low water activities temperature.
  - C) The hysteresis is water low.
  - đáp: A
  - vì sao: A đúng ngữ pháp và đủ ý. B thừa từ "temperature" và sai số nhiều; C sai trật tự từ.
2. [TỰ LUẬN] Viết một câu tiếng Anh giải thích vì sao cần ghi nhiệt độ khi báo cáo một đường đẳng nhiệt. | mẫu: Water activity increases with temperature, so an isotherm is only valid at the temperature at which it was measured.
[/QUIZ]

[TÓM: Học sáu cụm gốc | Câu báo cáo đúng có hysteresis, aw và nhiệt độ | Tự viết câu về GAB để nhớ lâu]

---

## Ôn rải

[ÔN RẢI: lịch: 1,3,7,21]
1. Đường đẳng nhiệt nối đại lượng nào với đại lượng nào? | từ: D009-C1 | đáp: EMC (g nước/g chất khô) theo aw, ở một nhiệt độ cố định.
2. Vì sao đường vút lên ở aw cao? | từ: D009-C1 | đáp: Nước ngưng tụ trong lỗ và hòa tan chất tan.
3. Vì sao bơ đậu phộng 15% ẩm và sữa bột 8% ẩm cùng aw 0,70? | từ: D008-C1 | đáp: Mỗi thực phẩm có đường đẳng nhiệt riêng, nước bị giữ ở mức như nhau.
4. Ở cùng aw nhánh nào chứa nhiều nước hơn? | từ: D009-C2 | đáp: Nhánh giải hấp.
5. Giải thích bằng lời hiệu ứng chai mực. | từ: D009-C2 | đáp: Cổ hẹp đầy nước chặn nước trong khoang rộng thoát ra khi giải hấp.
6. Nước đi theo chiều nào giữa hai chỗ aw khác nhau? | từ: D008-C2 | đáp: Từ aw cao sang aw thấp.
7. M0 nghĩa là gì? | từ: D009-C3 | đáp: Lượng nước phủ kín một lớp trên các nhóm hấp phụ.
8. GAB khác BET ở đâu? | từ: D009-C3 | đáp: Thêm K, dùng tới khoảng 0,8–0,9.
9. Màng thấm gấp 10 lần thì hạn dùng thay đổi thế nào? | từ: D009-C5 | đáp: Còn 1/10.
10. Nước đi từ không khí kho aw 0,80 vào bánh aw 0,30; dừng khi nào? | từ: D008-C2 | đáp: Khi aw của bánh bằng 0,80; độ ẩm lúc đó đọc từ đường đẳng nhiệt của bánh.
[/ÔN RẢI]

**Bài sau, D010:** Nếu giữ aw ở một giá trị, các phản ứng hỏng có chậm đồng đều không? Bản đồ ổn định: oxy hóa lipid, phản ứng Maillard, enzyme và vi sinh vật thay đổi thế nào theo aw.

---

## Từ điển thuật ngữ

| Term | IPA | Loại từ | Nghĩa Anh | Nghĩa Việt | Ví dụ Anh – Việt |
|---|---|---|---|---|---|
| moisture sorption isotherm | /ˈmɔɪstʃər ˈsɔːrpʃən ˈaɪsəθɜːrm/ | noun phrase | Plot of equilibrium moisture content versus water activity at constant temperature | đường đẳng nhiệt hấp phụ ẩm | The isotherm was measured at 25 °C. – Đường đẳng nhiệt được đo ở 25 °C. |
| equilibrium moisture content (EMC) | /ˌiːkwɪˈlɪbriəm ˈmɔɪstʃər ˈkɒntent/ | noun phrase | Moisture content of a sample in equilibrium with air of a given humidity | độ ẩm cân bằng | EMC rises steeply at high water activity. – EMC tăng mạnh ở aw cao. |
| adsorption | /ædˈsɔːrpʃən/ | noun | Uptake of molecules onto a surface | hấp phụ | Adsorption starts from a dry sample. – Hấp phụ bắt đầu từ mẫu khô. |
| desorption | /diːˈsɔːrpʃən/ | noun | Release of adsorbed molecules | giải hấp | Desorption starts from a wet sample. – Giải hấp bắt đầu từ mẫu ẩm. |
| hysteresis | /ˌhɪstəˈriːsɪs/ | noun | Difference between the adsorption and desorption branches | hiện tượng trễ | Hysteresis was large at low water activity. – Hiện tượng trễ lớn ở aw thấp. |
| ink-bottle effect | /ɪŋk ˈbɒtəl ɪˈfekt/ | noun phrase | Hysteresis explained by pores with narrow necks and wide cavities | hiệu ứng chai mực | The ink-bottle effect explains the delayed emptying of pores. – Hiệu ứng chai mực giải thích việc lỗ trống chậm. |
| monolayer moisture content (M0) | /ˈmɒnoʊˌleɪər ˈmɔɪstʃər ˈkɒntent/ | noun phrase | Amount of water forming one molecular layer on the sorption sites | độ ẩm lớp đơn | M0 is a target moisture for dry foods. – M0 là độ ẩm mục tiêu cho thực phẩm khô. |
| BET model | /biː iː tiː ˈmɒdəl/ | noun phrase | Multilayer adsorption model of Brunauer, Emmett and Teller | mô hình BET | The BET model fits only at low water activity. – BET chỉ khớp ở aw thấp. |
| GAB model | /dʒiː eɪ biː ˈmɒdəl/ | noun phrase | Three-parameter multilayer sorption model | mô hình GAB | The GAB model works up to about 0.8–0.9. – GAB dùng tới khoảng 0,8–0,9. |
| water vapor permeability | /ˈwɔːtər ˈveɪpər ˌpɜːrmiəˈbɪləti/ | noun phrase | Rate at which water vapor passes through a film | độ thấm hơi nước | Low water vapor permeability extends shelf life. – Độ thấm hơi nước thấp kéo dài hạn dùng. |
| sigmoid | /ˈsɪɡmɔɪd/ | adjective | S-shaped | hình chữ S | The isotherm was sigmoid. – Đường đẳng nhiệt có hình chữ S. |

---

## Nguồn tham khảo

**Tài liệu (đã mở đọc; ngày ghi sau mỗi nguồn)**
- Dai B., Chen R., Wei Z., Wu J., Li X., Cerqueira M.A. (2025). *Gels*, 11. DOI: 10.3390/gels11100817. https://pmc.ncbi.nlm.nih.gov/articles/PMC12563539/ – CC BY (08/11/2026). Bài đọc chính.
- Pantuso F.S., Gómez Castro M.L., Larregain C.C., Coscarello E., Aguerre R.J. (2019). Kinetic Approach to Multilayer Sorption: Equations of Isotherm and Applications. IntechOpen. DOI: 10.5772/intechopen.82669. https://www.intechopen.com/chapters/64977 – CC BY 3.0 (08/11/2026).
- Labuza T.P. (1971). Analysis of Storage Stability of Intermediate Moisture Foods. Báo cáo cuối cùng, hợp đồng NASA NAS 9-10658, MIT. Báo cáo chính phủ Hoa Kỳ (08/11/2026).
- Giannakourou M., Semenoglou I., Dermesonlouoglou E., Taoukis P. (2026). Analytical Prediction of Water Activity Evolution for Shelf Life Modeling of Packaged Dehydrated Foods. *Journal of Food Science*, 91(8):e71408. DOI: 10.1111/1750-3841.71408. https://pmc.ncbi.nlm.nih.gov/articles/PMC13507950/ – giấy phép CC BY-NC-ND 4.0 (11/11/2026). Dùng cho phương trình BET, GAB, mô hình tuyến tính, truyền nước qua màng.
- Pöllmann A., Reinelt M., Briesen H. (2022). Investigation of the Kinetics of Hysteresis Effects in Silica Gel. *Materials*, 15(17):6031. DOI: 10.3390/ma15176031. https://pmc.ncbi.nlm.nih.gov/articles/PMC9457172/ – CC BY 4.0 (11/11/2026). Dùng cho lý thuyết chai mực và phương trình Kelvin.
- Schiraldi A., Fessas D., Signorelli M. (2012). Water Activity in Biological Systems – A Review. *Pol. J. Food Nutr. Sci.*, 62(1), 5–13. DOI: 10.2478/v10222-011-0033-5 (D008).
- U.S. FDA (1984). Water Activity (aw) in Foods – Inspection Technical Guide No. 39 (D008).

**Hình**
- Không dùng ảnh. Hai hoạt hình/mô phỏng (gab-duong-cong, chai-muc, han-dung-mang) là hình tự dựng gắn với phương trình hoặc cơ chế trích ở trên, nêu giới hạn ngay trong từng khối.

---

## Cần kiểm tra lại

1. Ngưỡng aw của vòng trễ lớn và các giá trị M0 cụ thể của FOS và inulin trong Dai và cs. (2025) chưa chép; cần xem bảng bài gốc.
2. Công thức hạn dùng t là tích phân của album từ phương trình 2 và 9 của Giannakourou và cs. (2026), chưa đối chiếu một giáo trình in; cần kiểm khi học trên lớp.
3. p0 = 23,76 mmHg ở 25 °C là số giả định trong bài tính; cần đối chiếu bảng áp suất hơi nước.
4. Nhóm "IIa" là cách gọi của Dai và cs.; chưa mở bản gốc Brunauer (1940).
5. Giải thích thay đổi cấu trúc polymer gây trễ chưa gắn nguồn mở; hoạt hình chai mực chỉ minh họa cơ chế lỗ (nghiên cứu nguồn dùng silica gel).
6. Số 3–6 lần oxy hóa lipid và mức chênh độ ẩm giữa hai nhánh theo Labuza (1971): báo cáo nêu "rất lớn", chưa chép số chênh.
7. BET khớp "dưới 0,35" (Pantuso) và "dưới 0,65" (Giannakourou, riêng bột cá) là hai kết quả khác nhau theo vật liệu; chưa rõ nên nói khoảng chung.
8. Giấy phép CC BY-NC-ND của Giannakourou và cs. (2026): album chỉ tóm tắt bằng lời, không chép nguyên văn.
9. Phiên âm IPA chưa đối chiếu từ điển chuẩn.
10. Ba mô phỏng/hoạt hình cần kiểm khi dựng: biến K trong `chọn` của gab-duong-cong, SVG chai-muc dùng `currentColor` và CSS animation, thang số của han-dung-mang.

verified: false — Bản v3 chờ Hoàng duyệt; số tính chạy lại bằng Python 11/11/2026 (EMC 0,060/0,087/0,126; 771 và 77 ngày; M0 ≈ 0,061; C ≈ 9,7).
