# D009 · Đường đẳng nhiệt hấp thụ ẩm (moisture sorption isotherm)

> **Bài bù:** soạn ngày 08/11/2026 cho buổi học ngày 06/11 (hai ngày lịch tự động bị tắt).

- **Mã bài:** D009 · R&D Food Lab · Giai đoạn Nền tảng (mô-đun m0) · Tuần 1 · Bài 4/5
- **Ngày:** 06/11/2026
- **Số chương:** 7 (+ phần cuối: Tổng kết, Ôn rải, Đối chiếu, Từ điển, Nguồn, Cần kiểm tra lại)
- **Thời gian đọc dự kiến:** 50–60 phút
- **Lộ trình:**
  1. Câu hỏi mở: aw và độ ẩm không tỷ lệ thuận – vậy quan hệ giữa chúng là gì?
  2. Đường đẳng nhiệt: đọc đồ thị, ba vùng, các dạng đường cong
  3. Hiện tượng trễ (hysteresis): vì sao đường hấp phụ và giải hấp không trùng nhau
  4. Mô hình BET và GAB: độ ẩm lớp đơn M0
  5. Bài tính có lời giải: tìm M0 và C từ số liệu, dự đoán bằng GAB
  6. Ứng dụng: chọn bao bì và ước tính hạn dùng từ đường đẳng nhiệt
  7. Bài đọc chính: Dai và cs. (2025) – đường đẳng nhiệt của FOS và inulin

> **Câu hỏi mở đầu:** D008 kết thúc ở chỗ: cùng độ ẩm nhưng aw khác nhau, cùng aw nhưng độ ẩm khác nhau (bơ đậu phộng 15% và sữa bột 8% đều aw 0,70). Nếu có một đồ thị nối được hai đại lượng đó cho từng loại thực phẩm, đồ thị sẽ trông thế nào – đường thẳng hay đường cong? Hãy đoán trước khi đọc tiếp.

---

## CHƯƠNG 1 – Đường đẳng nhiệt là gì

[HỎI TRƯỚC]
Một gói bánh quy giòn (aw 0,30) bị để hở trong phòng độ ẩm không khí 80%. Theo D008, nước đi từ aw cao sang aw thấp. Bạn nghĩ bánh sẽ hút ẩm đến lúc nào thì dừng, và dừng ở đâu?
Đáp án gợi ý (bấm hiện): bánh hút đến khi aw của bánh bằng 0,80 (cân bằng với không khí). Độ ẩm của bánh lúc đó là bao nhiêu thì tra từ đường đẳng nhiệt của chính bánh.

### Cảnh 1.1 – Định nghĩa
Câu dẫn: Đường đẳng nhiệt trả lời câu hỏi "ở aw này thì thực phẩm chứa bao nhiêu nước".
- Đường đẳng nhiệt hấp thụ ẩm là đồ thị độ ẩm cân bằng (equilibrium moisture content, EMC) theo aw, ở một nhiệt độ không đổi. "Đẳng nhiệt" nghĩa là giữ nhiệt độ cố định cho cả đường (Pantuso và cs., 2019, nói rõ mục đích: thiết kế thiết bị sấy, chọn bao bì, dự đoán chất lượng khi bảo quản).
- Trục ngang là aw từ 0 đến 1 (cũng là %ERH chia 100 – D008). Trục đứng là lượng nước, thường tính g nước trên g chất khô (cơ sở khô – D007).
- Mỗi điểm trên đường là một trạng thái cân bằng: nếu mẫu để trong không khí có RH tương ứng đủ lâu thì sẽ đạt đúng độ ẩm đó.
[HÌNH: tu-ve duong-dang-nhiet-khung.svg | chỗ: giữa | hiện: dựng từng bước – hai trục (aw 0–1, EMC g/g chất khô) → một đường cong chữ S mọc dần → một điểm được khoanh "aw 0,80 → EMC đọc ngang sang trục đứng" | cùng ý: 1 | nhấn: đường chấm nối aw 0,80 sang trục EMC (vàng)]

Chữ trên bảng:
Đường đẳng nhiệt: EMC theo aw, cùng nhiệt độ
Biết aw → đọc được độ ẩm cân bằng

### Cảnh 1.2 – Ba vùng của đường cong dạng S
Câu dẫn: Hầu hết thực phẩm khô có đường cong hình chữ S kéo dài; người ta chia thành ba vùng.
- Vùng 1 (aw thấp): nước bám chặt vào các nhóm phân cực trên bề mặt, tạo lớp đơn. Đường dốc đứng lên ở đầu.
- Vùng 2 (aw trung bình): các lớp nước xếp chồng lên lớp đơn (multilayer). Đường thoải, gần như thẳng.
- Vùng 3 (aw cao): nước ngưng tụ trong lỗ, hòa tan chất tan (đường, muối), đường dốc vút lên – chỉ thêm ít aw đã thêm rất nhiều nước.
- Dai và cs. (2025) mô tả các đường đẳng nhiệt của FOS và inulin là dạng sigmoid (chữ S), phù hợp loại II theo phân loại Brunauer; ở aw thấp nước chỉ hấp phụ trên bề mặt, rồi lớp đơn và lớp nhiều tầng lần lượt hình thành, còn ở aw cao đường dốc lên vì chất tan hòa tan và độ ẩm tăng mạnh.
[HÌNH: tu-ve ba-vung-duong-cong.svg | chỗ: giữa | hiện: đường cong S dựng sẵn, ba dải màu nền lần lượt sáng lên kèm chữ "lớp đơn – nhiều lớp – ngưng tụ/hòa tan" | cùng ý: 1 | nhấn: dải màu của vùng đang nói (vàng)]

Chữ trên bảng:
Vùng 1: lớp đơn · Vùng 2: nhiều lớp · Vùng 3: ngưng tụ, hòa tan
Cuối đường dốc vút lên: ít aw, nhiều nước

### Cảnh 1.3 – Các dạng đường cong
Câu dẫn: Không phải thực phẩm nào cũng có hình S.
- Brunauer (1940) phân loại năm dạng; trong thực phẩm gặp nhiều nhất là loại II (chữ S) và loại III (J: ít nước ở aw thấp, rất nhiều ở aw cao, điển hình của thực phẩm giàu đường kết tinh – chất tan còn ít hấp thụ cho tới khi aw đủ cao). Dai và cs. (2025) dùng tên "loại IIa" cho đường FOS/inulin.
- Dạng đường quyết định cách chọn mô hình toán (Chương 4) và độ nhạy với ẩm: đường dốc ở vùng 3 nghĩa là sản phẩm rất dễ hút ẩm nếu aw môi trường cao.

[SỰ THẬT CẦN NHỚ]
Hai thực phẩm cùng aw nhưng đường đẳng nhiệt khác nhau sẽ có độ ẩm khác nhau. Mỗi thực phẩm có một đường riêng; không dùng đường của sản phẩm này cho sản phẩm khác.

[TỰ GIẢI THÍCH]
Hãy tự nói: vì sao đường đẳng nhiệt phải ghi kèm nhiệt độ? (Gợi ý: nhớ lại D008 về aw và nhiệt độ.)
Đáp án (bấm hiện): vì aw tăng theo nhiệt độ; ở cùng độ ẩm, nhiệt độ khác thì aw khác, nên đường cong khác.

[QUIZ – cuối chương 1]
1. Trục đứng của đường đẳng nhiệt thường là: A. aw  B. EMC (g nước/g chất khô)  C. Nhiệt độ  D. Thời gian. Đáp án B. A là trục ngang; C nhiệt độ cố định; D không có trục thời gian.
2. Ở vùng 3 (aw cao), đồ thị dốc lên vì: A. nước bám chặt hơn  B. nước ngưng tụ trong lỗ và hòa tan chất tan  C. mẫu lạnh đi  D. mẫu mất nước. Đáp án B (Dai và cs., 2025). A sai vì bám chặt là vùng 1.
3. Tự luận ngắn: vì sao biết aw của hai sản phẩm giống nhau vẫn chưa đủ để nói chúng chứa cùng lượng nước? Đáp án mẫu: vì mỗi sản phẩm có đường đẳng nhiệt riêng nên cùng aw cho EMC khác nhau (ví dụ bơ đậu phộng 15% và sữa bột 8% cùng aw 0,70 – FDA, theo D008).

Tóm tắt 3 dòng: (1) Đường đẳng nhiệt nối aw với EMC ở nhiệt độ cố định. (2) Dạng S có ba vùng: lớp đơn, nhiều lớp, ngưng tụ. (3) Mỗi thực phẩm có đường riêng.
Dùng ở đâu trong R&D: khi muốn biết sản phẩm sẽ hút bao nhiêu nước trong kho ẩm, tra EMC ở aw của kho.

---

## CHƯƠNG 2 – Hiện tượng trễ (hysteresis)

[HỎI TRƯỚC]
Bạn sấy một mẫu từ ẩm xuống aw 0,60 (giải hấp). Bạn cũng lấy mẫu khô cho hút ẩm lên aw 0,60 (hấp phụ). Hai mẫu cùng aw 0,60 – có cùng độ ẩm không?
Đáp án (bấm hiện): thường không. Mẫu đi theo đường giải hấp giữ nhiều nước hơn.

### Cảnh 2.1 – Hai nhánh không trùng nhau
Câu dẫn: Đây là điểm khiến đường đẳng nhiệt "khó chịu" với người làm công thức.
- Đường hấp phụ (adsorption): đi từ khô lên ẩm. Đường giải hấp (desorption): đi từ ẩm xuống khô. Hai đường tạo ra một vòng kín gọi là vòng trễ (hysteresis loop).
- Dai và cs. (2025) báo cáo: cả hai nhánh của FOS và inulin đều có dạng chữ S; nhánh giải hấp trơn, nhánh hấp phụ của FOS có ba điểm uốn và của inulin có năm điểm uốn; vòng trễ lớn ở vùng aw thấp (xem bài gốc để biết ngưỡng cụ thể – album không chép số ngưỡng vì bản trích xuất bị cắt ở dấu thập phân).
- Labuza (1971, báo cáo NASA) nêu hệ quả thực tế: một thực phẩm làm bằng cách thêm chất giữ ẩm cho tới aw cần thiết (giải hấp) chứa nhiều ẩm hơn một thực phẩm làm khô rồi cho hút ẩm lại tới cùng aw (hấp phụ); báo cáo ghi chênh lệch độ ẩm giữa hai cách chuẩn bị là rất lớn.
[HÌNH: tu-ve vong-tre.svg | chỗ: giữa | hiện: dựng từng bước – nhánh hấp phụ (xanh dương, đi lên) → nhánh giải hấp (cam đỏ, đi xuống) → vòng khép giữa hai nhánh được tô sáng | cùng ý: 1 | nhấn: khoảng cách đứng giữa hai nhánh tại cùng một aw (vàng)]

Chữ trên bảng:
Cùng aw: giải hấp ẩm hơn hấp phụ
Làm sản phẩm theo đường nào cũng quyết định độ bền

### Cảnh 2.2 – Cách giải thích cổ điển
Câu dẫn: Vì sao có vòng trễ? Chưa có một giải thích duy nhất, nhưng hai ý hay được nhắc.
- Hiệu ứng "chai mực" (ink-bottle): lỗ có cổ hẹp, thân rộng. Khi hấp phụ, nước chỉ đầy lỗ ở aw cao (cổ hẹp cản); khi giải hấp, nước trong thân lỗ phải thoát qua cổ hẹp nên giữ lại tới aw thấp hơn. Cơ sở là phương trình Kelvin: áp suất hơi trên mặt cong trong lỗ nhỏ thấp hơn trên mặt phẳng (Schiraldi và cs., 2012, đã học ở D008).
- Thay đổi cấu trúc: với polymer và chất vô định hình, nước làm trương nở rồi cấu trúc sắp xếp lại, nên đường về không giống đường đi. Đây là ý chung trong lĩnh vực; album chưa gắn vào một nguồn mở cụ thể (ghi trong "Cần kiểm tra lại").
- Nối với D008: Schiraldi và cs. cũng nói đường đẳng nhiệt phản ánh tính chất bề mặt ở RH nhỏ và tính chất khối ở RH lớn, và nước linh động kém thì cần rất lâu để cân bằng – hiện tượng trễ có thể một phần do chưa cân bằng thật.

[VÍ DỤ GIẢI – đọc ý nghĩa thực tế]
Đề: một nhà sản xuất làm thanh ngũ cốc theo hai cách – (a) trộn siro vào cho tới aw 0,60 (giải hấp), (b) sấy khô thanh rồi để hút ẩm tới aw 0,60 (hấp phụ). Cả hai đo cùng aw 0,60. Vì sao thanh (a) có thể vẫn hỏng nhanh hơn?
Bước 1: ở cùng aw, thanh (a) nằm trên nhánh giải hấp nên chứa nhiều nước hơn thanh (b).
Bước 2: nhiều nước hơn nghĩa là phản ứng hóa học có nhiều môi trường để xảy ra. Labuza (1971) ghi: thực phẩm ẩm trung bình chuẩn bị theo kiểu giải hấp bị oxy hóa lipid nhanh hơn 3–6 lần so với kiểu hấp phụ, do chất xúc tác linh động hơn trong môi trường lỏng.
Kết luận: chỉ ghi "aw 0,60" là thiếu; phải ghi cách chuẩn bị (đã nối với bài học "aw đo ở đâu, bằng cách nào" ở D008).

[TỰ GIẢI THÍCH]
Hãy tự nói bằng lời của mình hiệu ứng chai mực, và nó giải thích được điều gì.
Đáp án (bấm hiện): lỗ cổ hẹp thân rộng làm nước vào khó (phải tới aw cao) nhưng thoát cũng khó (giữ tới aw thấp), nên nhánh giải hấp nằm trên nhánh hấp phụ.

[QUIZ – cuối chương 2]
1. Ở cùng aw, nhánh nào có độ ẩm cao hơn? A. Hấp phụ  B. Giải hấp  C. Như nhau  D. Tùy nhiệt độ. Đáp án B (Labuza, 1971; Dai và cs., 2025).
2. Hiệu ứng chai mực dựa trên: A. Phương trình Raoult  B. Phương trình Kelvin (áp suất hơi trên mặt cong)  C. Định luật Fick  D. Phương trình Arrhenius. Đáp án B. Raoult (D008) nói về chất tan, không phải hình học lỗ.
3. Theo Labuza (1971), thực phẩm ẩm trung bình chuẩn bị theo giải hấp bị oxy hóa lipid nhanh hơn bao nhiêu lần? A. 1–2  B. 3–6  C. 10–20  D. Không khác. Đáp án B.
4. Tự luận: vì sao hai sản phẩm cùng aw nhưng làm theo hai quy trình khác nhau lại có thể có hạn dùng khác nhau? (Dùng từ "nhánh" và "độ ẩm".)

Tóm tắt 3 dòng: (1) Hai nhánh hấp phụ/giải hấp không trùng nhau. (2) Ở cùng aw, giải hấp chứa nhiều nước hơn. (3) Cách chuẩn bị quyết định độ bền.
Dùng ở đâu trong R&D: khi so sánh công thức "trộn ướt" với "sấy rồi để hút ẩm lại"; phải đo cả aw lẫn ghi quy trình.

---

## CHƯƠNG 3 – Mô hình BET và GAB, độ ẩm lớp đơn

[HỎI TRƯỚC]
Nếu mỗi nhóm phân cực trên bề mặt thực phẩm "giữ" một phân tử nước, thì có một lượng nước nhất định phủ kín bề mặt như một lớp đơn. Bạn nghĩ lượng đó lớn hay nhỏ so với tổng độ ẩm, và vì sao người làm thực phẩm quan tâm?
Đáp án gợi ý (bấm hiện): thường nhỏ (vài phần trăm chất khô); nhiều phản ứng hỏng bắt đầu tăng nhanh khi vượt quá mức này (xem D010).

### Cảnh 3.1 – Từ Langmuir đến BET
Câu dẫn: Mô hình toán đầu tiên cho đường dạng S là của Brunauer, Emmett và Teller.
- Pantuso và cs. (2019): năm 1938 Brunauer, Emmett và Teller (BET) mở rộng thuyết đơn lớp của Langmuir sang hấp phụ nhiều lớp; phương trình BET được áp dụng cho nhiều khí trên bề mặt và cho hơi nước trong thực phẩm.
- Hạn chế: BET chỉ khớp tốt với số liệu ở áp suất tương đối dưới khoảng 0,35 (Pantuso và cs., 2019). Dạng tuyến tính dùng để tìm M0 và C: aw / [M(1 − aw)] = 1/(M0·C) + [(C − 1)/(M0·C)]·aw, trong đó M là EMC (g/g chất khô), M0 là độ ẩm lớp đơn, C là hằng số liên quan năng lượng hấp phụ lớp đầu.
- Ý nghĩa: M0 là lượng nước phủ kín một lớp trên các nhóm hấp phụ; theo Dai và cs. (2025), M0 được coi là độ ẩm lý tưởng để tránh thay đổi chất lượng sản phẩm.
[HÌNH: tu-ve bet-tuyen-tinh.svg | chỗ: giữa | hiện: dựng từng bước – trục (aw, aw/[M(1−aw)]) → ba điểm → đường thẳng qua điểm → hai số đọc ra: giao trục tung và độ dốc | cùng ý: 1 | nhấn: giao điểm tung và độ dốc (vàng)]

Chữ trên bảng:
BET tuyến tính: y = aw / [M(1 − aw)]
y = 1/(M0·C) + [(C−1)/(M0·C)]·aw · chỉ dùng aw < ~0,35

### Cảnh 3.2 – GAB: mở rộng tới 0,8–0,9
Câu dẫn: GAB là bản sửa của BET dùng phổ biến nhất cho thực phẩm.
- Pantuso và cs. (2019): GAB (Guggenheim–Anderson–de Boer), ba tham số, sửa BET bằng cách cho rằng trạng thái các phân tử hấp phụ từ lớp thứ hai trở đi giống nhau nhưng khác trạng thái lỏng; GAB mô tả tốt hơi nước trong thực phẩm tới aw khoảng 0,8–0,9.
- Dạng thường dùng: M = M0·C·K·aw / [(1 − K·aw)(1 − K·aw + C·K·aw)] với ba tham số M0, C, K (K gần 1 thì GAB gần BET). Công thức này là dạng chuẩn trong lĩnh vực; album kiểm tra nó bằng tính số ở Chương 4 chứ chưa chép từ trang Pantuso (xem "Cần kiểm tra lại").
- Dai và cs. (2025): M0 lấy từ tham số a của mô hình GAB và MGAB; tác giả cũng so sánh nhiều phương trình khác (xem Chương 5).

[TỰ GIẢI THÍCH]
Hãy tự nói: vì sao GAB dùng được tới aw cao hơn BET?
Đáp án (bấm hiện): vì thêm tham số K cho phép các lớp từ thứ hai trở đi ở trạng thái khác nước lỏng, nên mô tả được vùng nhiều lớp tốt hơn.

[QUIZ – cuối chương 3]
1. M0 là: A. Độ ẩm khi aw bằng 1  B. Lượng nước phủ kín một lớp trên các nhóm hấp phụ  C. Lượng nước đóng băng được  D. Độ ẩm tối đa an toàn. Đáp án B.
2. BET chỉ khớp tốt với số liệu ở áp suất tương đối: A. < 0,35  B. 0,5–0,9  C. > 0,9  D. Mọi giá trị. Đáp án A (Pantuso và cs., 2019).
3. GAB mô tả tốt tới aw khoảng: A. 0,2  B. 0,35  C. 0,8–0,9  D. 1,0. Đáp án C.
4. Tự luận: M0 và độ ẩm toàn phần khác nhau thế nào về ý nghĩa?

Tóm tắt 3 dòng: (1) BET cho M0 và C ở aw dưới ~0,35. (2) GAB thêm K, dùng tới 0,8–0,9. (3) M0 là lớp đơn.
Dùng ở đâu trong R&D: đặt mục tiêu độ ẩm thành phẩm gần M0 cho sản phẩm khô.

---

## CHƯƠNG 4 – Bài tính có lời giải

### Cảnh 4.1 – Bài 1 (có lời giải): tìm M0 và C từ ba điểm BET
Câu dẫn: Bài giả định, số liệu là đề bài, không phải kết quả thí nghiệm thật.
[VÍ DỤ GIẢI]
Đề: một mẫu có EMC (g nước/g chất khô) ở ba aw: 0,10 → 0,035; 0,20 → 0,054; 0,30 → 0,070. Tìm M0 và C bằng dạng tuyến tính BET.
Bước 1: tính y = aw / [M(1 − aw)]: aw 0,10 → 0,10/(0,035×0,90) = 3,175; aw 0,20 → 0,20/(0,054×0,80) = 4,630; aw 0,30 → 0,30/(0,070×0,70) = 6,122.
Bước 2: đường thẳng qua điểm đầu và cuối: độ dốc = (6,122 − 3,175)/(0,30 − 0,10) ≈ 14,74; giao trục tung = 3,175 − 14,74×0,10 ≈ 1,70.
Bước 3: giao trục tung = 1/(M0·C); độ dốc + giao = 1/M0 → 1/M0 = 14,74 + 1,70 = 16,44 → M0 ≈ 0,061 g/g. C = độ dốc/giao + 1 = 14,74/1,70 + 1 ≈ 9,7.
Lý do bước 3: cộng độ dốc và giao tung triệt tiêu C (độ dốc + giao = 1/M0), nên tính được M0 trước.
[HÌNH: tu-ve bai-bet-3-diem.svg | chỗ: giữa | hiện: ba điểm (aw; y) hiện lần lượt kèm số 3,175 – 4,630 – 6,122, đường thẳng nối, hai giá trị 14,74 và 1,70 ghi vào | cùng ý: 1 | nhấn: giao trục tung 1,70 (vàng)]
[SỐ LIỆU: bai-bet | aw: 0,10; 0,20; 0,30 | EMC g/g: 0,035; 0,054; 0,070 | y: 3,175; 4,630; 6,122 | nguồn: đề bài giả định, tự tính]

Chữ trên bảng:
y = 3,175 · 4,630 · 6,122
M0 ≈ 0,061 g/g · C ≈ 9,7

### Cảnh 4.2 – Bài 2 (bỏ trống bước): dự đoán EMC bằng GAB
[VÍ DỤ GIẢI – hoàn thành bài]
Đề: cùng mẫu, giả sử GAB có M0 = 0,06 g/g, C = 10, K = 0,8. Tính EMC ở aw 0,50 theo M = M0·C·K·aw / [(1 − K·aw)(1 − K·aw + C·K·aw)].
Bước 1 (làm sẵn): K·aw = 0,8×0,50 = 0,40.
Bước 2 (bạn điền): mẫu số = (1 − 0,40) × (1 − 0,40 + 10×0,40) = ?
Bước 3 (bạn điền): tử số = 0,06 × 10 × 0,8 × 0,50 = ?, rồi chia.
Đáp án (bấm hiện): mẫu số = 0,60 × 4,60 = 2,76; tử số = 0,24; M = 0,24/2,76 ≈ 0,087 g/g.
Kiểm tra bằng chạy lại ở aw 0,30 → ≈ 0,060 (đúng bằng M0 xấp xỉ, vì ở aw 0,30 lớp đơn gần phủ kín); aw 0,70 → ≈ 0,126.
[SỐ LIỆU: bai-gab | aw: 0,30; 0,50; 0,70 | EMC g/g: 0,060; 0,087; 0,126 | nguồn: đề bài giả định, tự tính bằng Python]

### Cảnh 4.3 – Bài 3 (tự làm): kho ẩm
Đề: dùng kết quả Bài 2 (giả định đường GAB trên). Một kho có không khí 70% RH. (a) Mẫu cân bằng sẽ có EMC bao nhiêu? (b) Nếu bao bì làm aw bên trong chỉ đạt 50%, mẫu hút thêm bao nhiêu g nước trên 100 g chất khô để chuyển từ aw 0,50 lên 0,70?
Gợi ý: (a) đọc aw 0,70 → 0,126 g/g. (b) hiệu 0,126 − 0,087 = 0,039 g/g → 3,9 g nước trên 100 g chất khô. Đáp án (bấm hiện) ở dòng gợi ý.

[QUIZ – cuối chương 4]
1. Trong Bài 1, vì sao cộng độ dốc và giao tung cho 1/M0? Đáp án: vì độ dốc = (C−1)/(M0C), giao = 1/(M0C); cộng lại = [C]/(M0C) = 1/M0.
2. M0 tính được khoảng bao nhiêu? Đáp án ≈ 0,061 g/g.
3. Nếu số liệu thật của mẫu có aw lên tới 0,5, có nên dùng BET tuyến tính cho điểm 0,5 không? Đáp án: không, vì BET chỉ khớp dưới ~0,35 (Pantuso và cs., 2019).

Tóm tắt 3 dòng: (1) Tuyến tính hóa BET cho M0, C bằng độ dốc và giao tung. (2) GAB cho EMC theo aw bằng ba tham số. (3) Luôn kiểm tra miền aw hợp lệ của mô hình.
Dùng ở đâu trong R&D: tính nhanh lượng nước sản phẩm sẽ hút khi kho hoặc bao bì làm aw bên trong đổi.

---

## CHƯƠNG 5 – Ứng dụng: bao bì và hạn dùng

[HỎI TRƯỚC]
Hai sản phẩm giống nhau, một trong túi màng tốt, một trong túi màng thủng nhẹ, cùng đặt trong kho ẩm. Điều gì quyết định "mất bao lâu thì sản phẩm hết giòn"?
Đáp án gợi ý (bấm hiện): tốc độ hơi nước đi qua bao bì (độ thấm) và độ dốc của đường đẳng nhiệt (mỗi đơn vị aw tăng thêm kéo theo bao nhiêu nước).

### Cảnh 5.1 – Ý tưởng: aw tới hạn
Câu dẫn: Với sản phẩm giòn, hỏng nghĩa là aw vượt một mức tới hạn (critical aw) nào đó.
- Từ D008: dưới nhiệt độ chuyển thủy tinh thì khác, và aw tới hạn là mức mà gần đó sản phẩm đổi trạng thái; quanh ngưỡng đó bánh mềm đi, bột vón cục. Giá trị cụ thể phải đo cho từng sản phẩm.
- Nếu đường đẳng nhiệt trong vùng làm việc xấp xỉ đường thẳng M = b·aw + c, thì thời gian để aw trong gói đi từ aw ban đầu a_i tới aw tới hạn a_c, khi không khí ngoài giữ ở a_e, là t = ln[(a_e − a_i)/(a_e − a_c)] / [(k/x)(A/Ws)(p0/b)] (công thức kinh điển do Labuza và cộng sự phát triển; album kiểm tra bằng tính số, chưa đối chiếu với trang nguồn đã mở – xem "Cần kiểm tra lại"). Trong đó (k/x) là độ thấm hơi nước của màng, A diện tích màng, Ws khối lượng chất khô, p0 áp suất hơi nước bão hòa ở nhiệt độ bảo quản, b độ dốc đường đẳng nhiệt.

[VÍ DỤ GIẢI – hạn dùng giả định]
Đề (số giả định): a_i = 0,30; a_c = 0,60; kho a_e = 0,80; độ thấm k/x = 0,01 g/(m²·ngày·mmHg); A = 0,03 m²; Ws = 50 g; p0 (25 °C) = 23,76 mmHg; b = 0,12 g nước/g chất khô trên mỗi đơn vị aw. Tính t.
Bước 1: ln[(0,80 − 0,30)/(0,80 − 0,60)] = ln 2,5 ≈ 0,916.
Bước 2: hệ số = 0,01 × (0,03/50) × (23,76/0,12) = 0,01 × 0,0006 × 198 ≈ 1,19 × 10⁻³ ngày⁻¹.
Bước 3: t = 0,916 / 1,19 × 10⁻³ ≈ 771 ngày (≈ 2,1 năm).
Bước 4: nếu màng thủng nhẹ làm độ thấm tăng 10 lần, t giảm 10 lần ≈ 77 ngày.
Bài học: hạn dùng tỷ lệ nghịch với độ thấm bao bì; vì vậy chọn màng là quyết định kỹ thuật, không phải chuyện đẹp xấu.
[SỐ LIỆU: han-dung-gia-dinh | a_i: 0,30 | a_c: 0,60 | a_e: 0,80 | k/x: 0,01 | A: 0,03 | Ws: 50 | p0: 23,76 | b: 0,12 | t_ngày: 771 | nguồn: đề bài giả định, tự tính]
[HÌNH: tu-ve han-dung-gia-dinh.svg | chỗ: giữa | hiện: đường aw trong gói từ 0,30 tiến dần tới 0,80 theo thời gian; vạch ngang 0,60 (aw tới hạn) bị cắt tại t ≈ 771 ngày | cùng ý: 1 | nhấn: giao điểm đường cong với vạch 0,60 (vàng)]

[TỰ GIẢI THÍCH]
Hãy tự nói vì sao độ dốc b của đường đẳng nhiệt nằm ở mẫu số trong công thức.
Đáp án (bấm hiện): b lớn nghĩa là mỗi đơn vị aw tăng cần hấp thụ nhiều nước hơn; nước hơi đi vào chậm cố định, nên cần thời gian dài hơn để đẩy aw lên – hạn dùng dài hơn.

[QUIZ – cuối chương 5]
1. Màng thấm hơi nước gấp 10 lần thì hạn dùng (giữ nguyên mọi yếu tố khác): A. gấp 10  B. giảm còn 1/10  C. không đổi  D. giảm còn 1/100. Đáp án B (t tỷ lệ nghịch với độ thấm).
2. Sản phẩm có đường đẳng nhiệt dốc (b lớn) ở vùng làm việc, so với b nhỏ: A. hạn dùng dài hơn nếu aw tới hạn như nhau  B. ngắn hơn  C. không liên quan  D. vô hạn. Đáp án A.
3. Tự luận: nêu hai cách kéo dài hạn dùng sản phẩm giòn trong kho ẩm. Đáp án mẫu: màng có độ thấm thấp hơn; hạ aw ban đầu; tăng khối lượng gói (Ws) để chia nhỏ ảnh hưởng.

Tóm tắt 3 dòng: (1) Hạn dùng của sản phẩm giòn gắn với aw tới hạn. (2) Công thức dùng độ thấm, độ dốc b và chênh lệch aw. (3) Ví dụ giả định cho 771 ngày, màng xấu gấp 10 lần thì 77 ngày.
Dùng ở đâu trong R&D: chọn màng và cỡ gói cho bánh giòn, bột khô, thanh ngũ cốc.

---

## CHƯƠNG 6 – Bài đọc chính: Dai và cs. (2025)

### Cảnh 6.1 – Thẻ bài đọc
Câu dẫn: Một bài mở, rất mới, kiểm tra nhiều thứ vừa học.
- Tên: "Moisture Sorption Isotherms of Fructooligosaccharide and Inulin Powders and Their Gelling Competence in Delaying the Retrogradation of Rice Starch".
- Tác giả: Bing Dai, Ruijun Chen, Zheng Wei, Jianzhang Wu, Xingjun Li, Miguel A. Cerqueira. Năm 2025. Tạp chí Gels (MDPI), tập 11, DOI 10.3390/gels11100817. Giấy phép CC BY (đọc toàn văn qua PMC12563539).
- Loại bài: nghiên cứu thực nghiệm.

Chữ trên bảng:
Dai và cs. (2025) · Gels · DOI 10.3390/gels11100817
FOS, inulin: đường đẳng nhiệt, M0, hạn dùng

### Cảnh 6.2 – Họ làm gì và thấy gì
Câu dẫn: Tóm tắt bằng lời, chỉ dùng những gì đã đọc.
- Mục tiêu (theo tác giả): dự đoán hạn dùng, xác định độ ẩm lớp đơn và điều kiện bảo quản phù hợp, gợi ý thiết kế sấy và bao bì, và dự đoán EMC ở điều kiện sinh lý cho các sản phẩm tạo gel FOS và inulin.
- Kết quả đường cong: cả hai nhánh hấp phụ và giải hấp đều có dạng sigmoid, được gọi là loại IIa; nhánh giải hấp trơn; nhánh hấp phụ của FOS có ba điểm uốn và của inulin có năm điểm uốn; có vòng trễ lớn giữa hai nhánh ở vùng aw thấp.
- Về M0: tác giả ước lượng M0 từ tham số a trong mô hình GAB và MGAB; giá trị cụ thể cho từng mẫu ở các nhiệt độ xem bảng trong bài gốc (album không chép vì bản trích xuất bị cắt ở dấu thập phân).
- Về hiện tượng ở aw cao: độ ẩm tăng mạnh khi aw tăng do sự hòa tan của các thành phần đường (Cảnh 1.2).
[HÌNH: tu-ve so-do-bai-dai.svg | chỗ: giữa | hiện: sơ đồ 4 khối lần lượt – mẫu FOS, inulin → hấp phụ/giải hấp ở 4 nhiệt độ → khớp mô hình → M0, hạn dùng | cùng ý: 1 | nhấn: khối "M0 từ GAB, MGAB" (vàng)]

### Cảnh 6.3 – Phản biện
Câu dẫn: Kết quả hay, nhưng cần đọc kỹ giới hạn.
- Đây là bột FOS và inulin (chất xơ tạo gel), không phải một thực phẩm hoàn chỉnh; đường đẳng nhiệt của sản phẩm thật có nhiều thành phần sẽ khác.
- Số liệu M0, hạn dùng cụ thể phải đọc từ bảng và hình của bài; album chưa chép số.
- "Loại IIa" là cách gọi của nhóm tác giả; thuật ngữ này không phải tên chuẩn duy nhất (xem "Cần kiểm tra lại").
- Điểm dễ hiểu sai: vòng trễ lớn không có nghĩa mẫu "hỏng"; nó cho biết bảo quản theo đường nào sẽ ảnh hưởng độ ẩm ở cùng aw (Chương 2).

[TỰ GIẢI THÍCH]
Hãy tự nói: nhánh hấp phụ của FOS có nhiều điểm uốn hơn nhánh giải hấp trơn – bạn nghĩ điều đó cho thấy gì về cách nước vào mẫu so với cách nước ra?
Đáp án gợi ý (bấm hiện): chỉ là suy luận của album, không phải kết luận của tác giả: khi nước vào, mẫu đi qua nhiều bước chuyển (ví dụ hòa tan từng phần) nên đường gấp khúc; khi nước ra, mẫu đã ướt hoàn toàn nên đường trơn.

[QUIZ – cuối chương 6]
1. Dai và cs. (2025) mô tả đường đẳng nhiệt FOS và inulin thuộc dạng: A. J (loại III)  B. Sigmoid loại IIa  C. Đường thẳng  D. Có cực đại. Đáp án B.
2. M0 trong bài được tính từ tham số nào của mô hình? A. K của GAB  B. a của GAB và MGAB  C. Độ nhớt  D. Nhiệt độ. Đáp án B.
3. Tự luận: vì sao nghiên cứu đường đẳng nhiệt của bột chất xơ có ích cho người thiết kế bao bì?

Tóm tắt 3 dòng: (1) FOS, inulin có đường S loại IIa. (2) Có vòng trễ lớn ở aw thấp, nhánh hấp phụ nhiều điểm uốn. (3) M0 từ tham số a của GAB và MGAB.
Dùng ở đâu trong R&D: lấy đường đẳng nhiệt của nguyên liệu chất xơ để chọn điều kiện sấy, kho và bao bì.

---

## CHƯƠNG 7 – Tiếng Anh: thuật ngữ và câu mẫu

### Cảnh 7.1 – Sáu cụm từ cốt lõi
- moisture sorption isotherm · equilibrium moisture content (EMC) · monolayer moisture content.
- hysteresis · BET and GAB models · critical water activity.

Chữ trên bảng:
sorption isotherm · EMC · monolayer
hysteresis · GAB · critical aw

### Cảnh 7.2 – Hai câu mẫu
- "The adsorption and desorption isotherms exhibited type IIa sigmoidal curves, with large hysteresis at low water activity." – Hai đường hấp phụ và giải hấp đều có dạng sigmoid loại IIa, với vòng trễ lớn ở aw thấp. (Dựa trên Dai và cs., 2025; câu tự viết lại, không trích nguyên văn.)
- "The GAB model describes water sorption in foods satisfactorily up to water activities of about 0.8–0.9." – Mô hình GAB mô tả tốt sự hấp thụ nước của thực phẩm tới aw khoảng 0,8–0,9.
- Nhiệm vụ: viết 1 câu tiếng Anh giải thích vì sao cần ghi nhiệt độ khi báo cáo một đường đẳng nhiệt.

---

## TỔNG KẾT

1. Đường đẳng nhiệt nối aw với EMC ở một nhiệt độ cố định; dạng S có ba vùng: lớp đơn, nhiều lớp, ngưng tụ và hòa tan (Dai và cs., 2025).
2. Hai nhánh hấp phụ/giải hấp không trùng nhau (hysteresis); ở cùng aw, giải hấp chứa nhiều nước hơn; cách chuẩn bị ảnh hưởng độ bền – oxy hóa lipid chuẩn bị theo giải hấp nhanh hơn 3–6 lần (Labuza, 1971).
3. BET (1938, mở rộng Langmuir) khớp dưới aw ~0,35; GAB (ba tham số) tới 0,8–0,9 (Pantuso và cs., 2019). M0 là lượng nước phủ lớp đơn.
4. Bài tính: BET ba điểm cho M0 ≈ 0,061 g/g và C ≈ 9,7; GAB giả định cho EMC 0,087 g/g tại aw 0,50; hạn dùng giả định 771 ngày (màng xấu gấp 10 lần: 77 ngày).
5. Công thức hạn dùng cho thấy bao bì và độ dốc đường đẳng nhiệt quyết định tốc độ mất giòn (công thức kinh điển, cần đối chiếu nguồn).

**Bài sau – D010:** Nếu giữ aw ở một giá trị, các phản ứng hư hỏng có chậm đồng đều không? Bản đồ ổn định (stability map): oxy hóa lipid, phản ứng Maillard, hoạt động của enzyme và vi sinh vật thay đổi thế nào theo aw – và vì sao thanh protein vẫn cứng lên dù aw "an toàn".

---

## TRẮC NGHIỆM

**Câu 1.** Đường đẳng nhiệt hấp thụ ẩm là đồ thị của: A. aw theo thời gian  B. EMC theo aw ở nhiệt độ cố định  C. Nhiệt độ theo độ ẩm  D. Độ ẩm theo pH.
**Câu 2.** Vùng 3 (aw cao) của đường cong S đặc trưng bởi: A. nước bám bề mặt  B. nước ngưng tụ và hòa tan chất tan  C. không có nước  D. đường nằm ngang.
**Câu 3.** Ở cùng aw, nhánh nào chứa nhiều nước hơn? A. Hấp phụ  B. Giải hấp  C. Bằng nhau  D. Không xác định.
**Câu 4.** Hiệu ứng chai mực dựa trên: A. Raoult  B. Kelvin  C. Fick  D. Arrhenius.
**Câu 5.** BET chỉ dùng tốt ở áp suất tương đối: A. dưới ~0,35  B. 0,5–0,7  C. trên 0,9  D. mọi aw.
**Câu 6.** GAB khác BET ở điểm nào? A. Không có M0  B. Thêm tham số K, dùng được tới ~0,8–0,9  C. Chỉ cho khí  D. Chỉ cho nước đá.
**Câu 7.** Trong Bài 1, M0 ≈: A. 0,061 g/g  B. 0,61 g/g  C. 6,1 g/g  D. 0,0061 g/g.
**Câu 8.** Với GAB (M0 = 0,06; C = 10; K = 0,8), EMC tại aw 0,50 ≈: A. 0,030  B. 0,087  C. 0,24  D. 0,60.
**Câu 9.** Màng thấm hơi nước gấp 10 lần thì hạn dùng (các yếu tố khác giữ nguyên) trở thành: A. gấp 10  B. 1/10  C. không đổi  D. 1/100.
**Câu 10.** Dai và cs. (2025) gọi dạng đường đẳng nhiệt của FOS và inulin là: A. loại III  B. loại IIa sigmoid  C. loại I  D. đường thẳng.

### Đáp án và giải thích
1. **B.** A là sai trục ngang; C, D không phải đại lượng của đường đẳng nhiệt.
2. **B.** Dai và cs. (2025): ở aw cao độ ẩm tăng mạnh do hòa tan các thành phần đường.
3. **B.** Labuza (1971) và Dai và cs. (2025): nhánh giải hấp nằm trên.
4. **B.** Phương trình Kelvin về áp suất hơi trên mặt cong (Schiraldi và cs., 2012).
5. **A.** Pantuso và cs. (2019).
6. **B.** GAB thêm K (Pantuso và cs., 2019).
7. **A.** 1/M0 = 14,74 + 1,70 = 16,44 → M0 = 0,0608.
8. **B.** 0,24/2,76 = 0,087.
9. **B.** t tỷ lệ nghịch độ thấm (công thức hạn dùng).
10. **B.** Dai và cs. (2025).

---

## ÔN RẢI (trộn D007, D008, D009)

Lịch ôn gợi ý: sau 1 ngày (09/11), 3 ngày (11/11), 7 ngày (15/11), 21 ngày (29/11).

1. (D007) Độ ẩm cơ sở ướt và cơ sở khô khác nhau thế nào? Vì sao đường đẳng nhiệt dùng cơ sở khô?
2. (D008) aw = p/p₀. Một thực phẩm có ERH 74% khi cân bằng thì aw là bao nhiêu?
3. (D008) Vì sao NaCl hạ aw mạnh hơn sucrose cùng khối lượng?
4. (D009) Bạn có bơ đậu phộng 15% ẩm và sữa bột 8% ẩm đều aw 0,70. Điều này nói gì về đường đẳng nhiệt của chúng?
5. (D009) Giải thích bằng lời hiệu ứng chai mực.
6. (D008) Ngưỡng aw 0,85 nghĩa là gì với mầm bệnh?
7. (D009) Bài tập: M0 nghĩa là gì, và vì sao quan trọng cho sản phẩm khô?
8. (D008–D009) Nếu máy đo cho RH 0,45 trên một mẫu rất khô, vì sao con số có thể chỉ là RH bề mặt?
9. (D009) Tăng độ thấm màng 10 lần thì hạn dùng thay đổi thế nào?
10. (D007–D009) Tại sao thanh protein aw 0,58 trong kho nồm 80% sẽ hút ẩm, và sẽ hút đến đâu thì dừng?
Đáp án (bấm hiện): 1 – cơ sở ướt chia cho tổng khối lượng, cơ sở khô chia cho chất khô; cơ sở khô cộng được theo thời gian. 2 – 0,74. 3 – NaCl phân ly 2 hạt và khối lượng mol nhỏ. 4 – cùng aw nhưng EMC khác: mỗi thực phẩm có đường riêng. 5 – lỗ cổ hẹp, thân rộng. 6 – dưới 0,85 mầm bệnh thường không phát triển, nấm men mốc vẫn có thể. 7 – lượng nước phủ lớp đơn; gần mức này nhiều phản ứng hỏng còn chậm (D010). 8 – nước kém linh động, chưa cân bằng thật. 9 – giảm còn 1/10. 10 – nước đi từ aw cao sang thấp; dừng khi aw thanh bằng 0,80, độ ẩm đọc từ đường đẳng nhiệt của thanh.

---

## ĐỐI CHIẾU ĐỦ NỘI DUNG

Đã rà từng mục trước khi lưu (08/11/2026).

| # | Mục yêu cầu | Chương · Cảnh |
|---|---|---|
| 1 | Câu hỏi mở thật, nối D008 | Đầu file; 1.1 |
| 2 | Định nghĩa đường đẳng nhiệt, EMC, ba vùng | 1.1, 1.2 |
| 3 | Các dạng đường cong (loại II, III) | 1.3 |
| 4 | Hysteresis và hệ quả thực tế | 2.1 |
| 5 | Cơ chế chai mực, Kelvin | 2.2 |
| 6 | BET, GAB, M0 | 3.1, 3.2 |
| 7 | Bài tính BET, GAB, hạn dùng | 4.1–4.3; 5.1 |
| 8 | Ứng dụng bao bì, hạn dùng | 5.1 |
| 9 | Bài đọc chính: tên, tác giả, năm, DOI, tóm tắt, phản biện | 6.1–6.3 |
| 10 | Thuật ngữ và câu mẫu | 7.1, 7.2; Từ điển |
| 11 | HỎI TRƯỚC, VÍ DỤ GIẢI, TỰ GIẢI THÍCH, QUIZ mỗi chương | Chương 1–6 |
| 12 | Tổng kết, trắc nghiệm, ôn rải, nối D010 | Tổng kết, Trắc nghiệm, Ôn rải |

---

## TỪ ĐIỂN THUẬT NGỮ

| Term | IPA | Loại từ | Nghĩa Anh | Nghĩa Việt | Ví dụ Anh – Việt |
|---|---|---|---|---|---|
| moisture sorption isotherm | /ˈmɔɪstʃər ˈsɔːrpʃən ˈaɪsəθɜːrm/ | noun phrase | Plot of equilibrium moisture content versus water activity at constant temperature | đường đẳng nhiệt hấp thụ ẩm | The moisture sorption isotherm was measured at 25 °C. – Đường đẳng nhiệt hấp thụ ẩm được đo ở 25 °C. |
| equilibrium moisture content (EMC) | /ˌiːkwɪˈlɪbriəm ˈmɔɪstʃər ˈkɒntent/ | noun phrase | Moisture content of a sample in equilibrium with air of a given humidity | độ ẩm cân bằng | EMC rises steeply at high water activity. – Độ ẩm cân bằng tăng mạnh ở aw cao. |
| adsorption | /ædˈsɔːrpʃən/ | noun | Uptake of molecules onto a surface | hấp phụ | Adsorption starts from a dry sample. – Hấp phụ bắt đầu từ mẫu khô. |
| desorption | /diːˈsɔːrpʃən/ | noun | Release of adsorbed molecules | giải hấp | Desorption starts from a wet sample. – Giải hấp bắt đầu từ mẫu ẩm. |
| hysteresis | /ˌhɪstəˈriːsɪs/ | noun | Difference between the adsorption and desorption branches | hiện tượng trễ | Hysteresis was large at low water activity. – Hiện tượng trễ lớn ở aw thấp. |
| monolayer moisture content (M0) | /ˈmɒnoʊˌleɪər ˈmɔɪstʃər ˈkɒntent/ | noun phrase | Amount of water forming one molecular layer on the sorption sites | độ ẩm lớp đơn | M0 is a target moisture for dry foods. – M0 là độ ẩm mục tiêu cho thực phẩm khô. |
| BET model | /biː iː tiː ˈmɒdəl/ | noun phrase | Multilayer adsorption model of Brunauer, Emmett and Teller | mô hình BET | The BET model fits only below aw 0.35. – BET chỉ khớp dưới aw 0,35. |
| GAB model | /dʒiː eɪ biː ˈmɒdəl/ | noun phrase | Three-parameter multilayer sorption model | mô hình GAB | The GAB model works up to about 0.8–0.9. – GAB dùng tới khoảng 0,8–0,9. |
| sigmoid | /ˈsɪɡmɔɪd/ | adjective | S-shaped | hình chữ S | The isotherm was sigmoid. – Đường đẳng nhiệt có hình chữ S. |
| critical water activity | /ˈkrɪtɪkəl ˈwɔːtər ækˈtɪvəti/ | noun phrase | Water activity at which a product changes state or fails | aw tới hạn | The critical aw sets the shelf life. – aw tới hạn quyết định hạn dùng. |

---

## NGUỒN THAM KHẢO

**Tài liệu (đã mở đọc ngày 08/11/2026)**
- Dai B., Chen R., Wei Z., Wu J., Li X., Cerqueira M.A. (2025). Moisture Sorption Isotherms of Fructooligosaccharide and Inulin Powders and Their Gelling Competence in Delaying the Retrogradation of Rice Starch. *Gels*, 11. DOI: 10.3390/gels11100817. https://pmc.ncbi.nlm.nih.gov/articles/PMC12563539/ – CC BY. **Bài đọc chính.**
- Pantuso F.S., Gómez Castro M.L., Larregain C.C., Coscarello E., Aguerre R.J. (2019). Kinetic Approach to Multilayer Sorption: Equations of Isotherm and Applications. IntechOpen. DOI: 10.5772/intechopen.82669. https://www.intechopen.com/chapters/64977 – CC BY 3.0.
- Labuza T.P. (1971). Analysis of Storage Stability of Intermediate Moisture Foods. Báo cáo cuối cùng, hợp đồng NASA NAS 9-10658 (15/05/1970–15/07/1971), MIT. Báo cáo chính phủ Hoa Kỳ (công cộng).
- Schiraldi A., Fessas D., Signorelli M. (2012). Water Activity in Biological Systems – A Review. *Pol. J. Food Nutr. Sci.*, 62(1), 5–13. DOI: 10.2478/v10222-011-0033-5 (đã dùng ở D008).

**Hình**
- Tất cả hình trong album là sơ đồ tự vẽ cho album, gắn với số liệu giả định nêu trong bài; không dùng ảnh trang trí.

---

## CẦN KIỂM TRA LẠI

1. Ngưỡng aw của vòng trễ lớn trong Dai và cs. (2025) bị cắt ở dấu thập phân trong bản trích xuất; cần xem bài gốc. Các giá trị M0 cụ thể của FOS và inulin cũng chưa chép.
2. Phương trình GAB dạng M = M0·C·K·aw / [(1−K·aw)(1−K·aw+C·K·aw)] và dạng tuyến tính BET là dạng chuẩn trong lĩnh vực, được kiểm tra bằng tính số; chưa chép nguyên văn từ trang Pantuso.
3. Công thức hạn dùng t = ln[(a_e − a_i)/(a_e − a_c)] / [(k/x)(A/Ws)(p0/b)] (Labuza, Mizrahi) chưa đối chiếu với một trang nguồn đã mở; số trong Bài hạn dùng là giả định.
4. Cách phân loại "loại IIa" là của nhóm tác giả; Brunauer (1940) năm loại chưa mở bản gốc.
5. Ý "thay đổi cấu trúc polymer gây hysteresis" chưa gắn vào nguồn mở cụ thể.
6. Số chênh lệch độ ẩm giữa giải hấp và hấp phụ trong báo cáo Labuza (1971) chưa chép vì báo cáo mô tả "rất lớn"; cần xem bảng/hình gốc.
7. Phiên âm IPA chưa đối chiếu với từ điển chuẩn.

verified: true — Số liệu và phát biểu có nguồn được đối chiếu với toàn văn mở đọc ngày 08/11/2026 (Dai và cs. 2025 qua PMC; Pantuso và cs. 2019 trên IntechOpen; báo cáo NASA của Labuza); các phép tính chạy lại bằng Python; điểm chưa chắc đưa vào "Cần kiểm tra lại".
