# D007 · Nước tự do, nước liên kết và độ ẩm

- **Mã bài:** D007 · R&D Food Lab · Giai đoạn Nền tảng (mô-đun m0) · Tuần 1 · Bài 2/5
- **Ngày:** 03/11/2026
- **Số chương:** 8 (+ phần cuối: Tổng kết, Trắc nghiệm, Đối chiếu, Từ điển, Nguồn, Cần kiểm tra lại)
- **Thời gian đọc dự kiến:** 45–60 phút
- **Lộ trình:**
  1. Câu hỏi mở: cùng là nước, sao có phần ép ra được, có phần không?
  2. Ba "trạng thái" nước theo giáo trình: tự do, bị giữ, liên kết
  3. Nhìn nước bằng máy: LF-NMR và thời gian hồi phục T2
  4. Độ ẩm: định nghĩa, cơ sở ướt – cơ sở khô, cách đo
  5. Áp dụng: sấy bã đậu nành (okara) – một phụ phẩm thật
  6. Bài tính: từ cân sấy đến cân bằng khối lượng máy sấy
  7. Bài đọc chính: Wiesman (2026) – "Beyond Moisture Content"
  8. Tiếng Anh: thuật ngữ và câu mẫu

> **Câu hỏi mở đầu:** Một mẻ bã đậu nành vừa ra khỏi máy lọc sữa có khoảng 79% nước. Sấy 5 giờ ở 80 °C, độ ẩm mới xuống 57%; nhưng chỉ thêm 2 giờ nữa nó đã gần khô hẳn. Vì sao nước "chịu đi" nhanh chậm khác nhau như vậy – và con số độ ẩm có kể hết câu chuyện không?

---

## CHƯƠNG 1 – Cùng là nước, nhưng không giống nhau

### Cảnh 1.1 – Nối từ bài D006
Câu dẫn: Bài trước mình đã thấy phân tử nước phân cực và tạo liên kết hydro. Hôm nay hỏi tiếp: khi nước nằm trong thực phẩm, nó "ở" đâu?
- Ở D006, oxy mang điện tích âm từng phần, hydro mang điện tích dương từng phần, nên nước bám vào ion và nhóm phân cực.
[3D: PubChem CID 962 | kiểu: que-bi | hiện: xoay chậm, tô sáng δ− ở O và δ+ ở H | chỗ: phải | cùng ý: 1]
- Trong thực phẩm, các "chỗ bám" đó chính là nhóm phân cực và nhóm ion của tinh bột, pectin, protein (Kuna, e-PG Pathshala).
[3D: PubChem CID 5793 | kiểu: que-bi | hiện: tô sáng 5 nhóm –OH của glucose (đơn vị của tinh bột) | chỗ: trái | cùng ý: 2]
- Phân tử bị hút càng chặt thì càng khó đi ra khi ép, cắt hay sấy. Đó là ý chính của cả bài.

Chữ trên bảng:
Nước + nhóm phân cực (–OH, ion) → bị giữ
Giữ càng chặt → càng khó ép, khó sấy

### Cảnh 1.2 – Thực phẩm nhiều nước đến mức nào
Câu dẫn: Trước khi chia loại, nhớ lại lượng nước trong thực phẩm.
- Theo học liệu Kuna, phần lớn thực phẩm tự nhiên (chưa sấy) chứa tới khoảng 70% khối lượng là nước hoặc hơn; rau quả tới khoảng 95% hoặc hơn.
[HÌNH: tu-ve thanh-ty-le-nuoc.svg | chỗ: giữa | hiện: hai cột mọc dần tới 70% và 95% (xanh dương) | cùng ý: 1 | nhấn: nhãn "≥ 70%", "≤ 95%+"]
- Bã đậu nành tươi trong nghiên cứu của Chen và cộng sự (2022) có độ ẩm 0,7880 g/g, tức 78,8% (cơ sở ướt).
[HÌNH: https://commons.wikimedia.org/wiki/File:Okara_(soybean_pulp).jpg | file gợi ý: okara.jpg | loại: ảnh | chỗ: phải | hiện: trượt vào | cùng ý: 2 | nhấn: khối bã ướt trong túi lọc]

Chữ trên bảng:
Thực phẩm tự nhiên ≥ ~70% nước · rau quả tới ~95%
Bã đậu nành tươi: 78,8% (Chen và cs., 2022)

### Cảnh 1.3 – Thí nghiệm tư duy: ép, cắt, sấy
Câu dẫn: Thử tưởng tượng ba thao tác với một lát dưa chuột.
- Ép nhẹ: một phần nước chảy ra ngay. Đó là nước dễ lấy ra nhất.
- Cắt nhỏ: nước trong tế bào bị vỡ cũng chảy ra. Trước đó nó bị nhốt, chứ không bị "bám" chặt.
- Sấy: còn lại một phần nước rất khó lấy ra, cần nhiều thời gian và năng lượng.
[HÌNH: tu-ve ep-cat-say.svg | chỗ: giữa | hiện: dựng từng bước 3 khung (ép → cắt → sấy), giọt xanh dương giảm dần | cùng ý: 1 | nhấn: khung "sấy" viền cam đỏ]
- Ba thao tác này gợi ra ba nhóm nước mà giáo trình đặt tên. Chương 2 đi vào từng nhóm.

Chữ trên bảng:
Ép → nước tự do · Cắt → nước bị nhốt
Sấy lâu mới ra → nước liên kết

---

## CHƯƠNG 2 – Ba "trạng thái" nước theo giáo trình

### Cảnh 2.1 – Nước tự do (free water)
Câu dẫn: Bắt đầu với loại dễ nhất.
- Kuna định nghĩa nước tự do là nước có thể lấy ra dễ dàng khỏi thực phẩm bằng cách vắt, cắt hoặc ép.
- Nước tự do không bị giữ bởi chất rắn, nên không mang các tính chất đặc biệt của nước liên kết sẽ gặp ở Cảnh 2.3 (không hòa tan, khó đông, gần như không có áp suất hơi).
[HÌNH: tu-ve nuoc-tu-do.svg | chỗ: trái | hiện: các phân tử nước (xanh dương) chạy tự do giữa các khối chất rắn | cùng ý: 1 | nhấn: mũi tên chuyển động]

Chữ trên bảng:
Nước tự do: vắt / cắt / ép là ra
Không bị chất rắn giữ

### Cảnh 2.2 – Nước bị nhốt (entrapped water)
Câu dẫn: Có loại nước không bị hút chặt, nhưng không chạy đi được vì bị giam.
- Theo Kuna, nước bị nhốt nằm bất động trong mao quản hoặc trong tế bào; khi cắt hay làm tổn thương mô, nó được giải phóng và chảy tự do.
- Nước bị nhốt mang tính chất của nước tự do, không mang tính chất của nước liên kết.
[HÌNH: tu-ve te-bao-nhot-nuoc.svg | chỗ: giữa | hiện: dựng từng bước – tế bào nguyên → dao cắt → nước tràn ra | cùng ý: 1 | nhấn: thành tế bào (trắng), nước (xanh dương)]
- Ý quan trọng cho R&D: nước bị nhốt "giữ được" chỉ nhờ cấu trúc. Cấu trúc hỏng (cắt, đông lạnh, nấu) thì nước thoát ra – đó là chỗ sinh ra dịch rỉ.

Chữ trên bảng:
Nước bị nhốt: bị giam trong mao quản/tế bào
Cấu trúc hỏng → nước chảy ra như nước tự do

### Cảnh 2.3 – Nước liên kết (bound water): bốn tính chất
Câu dẫn: Giờ đến loại "cứng đầu" nhất.
- Kuna nhấn mạnh: nước liên kết thường được định nghĩa theo cách đo nó, nên mỗi phương pháp cho một con số khác nhau.
- Tính chất 1: không còn tự do để làm dung môi cho muối và đường.
- Tính chất 2: chỉ đông đá ở nhiệt độ rất thấp, dưới điểm đông của nước.
[HÌNH: tu-ve nhiet-ke-dong-da.svg | chỗ: phải | hiện: nhiệt kế hạ dần; nước tự do hóa đá ở ~0 °C, lớp nước liên kết vẫn lỏng | cùng ý: 3 | nhấn: lớp liên kết màu xanh dương đậm]
- Tính chất 3: hầu như không có áp suất hơi. Tính chất 4: tỷ trọng lớn hơn nước tự do.
- Ví dụ của Kuna: nước trong cây xương rồng hay lá thông không thể ép ra được.

Chữ trên bảng:
Nước liên kết: không hòa tan · khó đông
Hầu như không có áp suất hơi · đặc hơn

### Cảnh 2.4 – Nước bám theo từng lớp
Câu dẫn: Vì sao nước liên kết lại "khác"? Vì nó bám vào bề mặt đại phân tử.
- Theo Kuna, nước gắn vào các vị trí phân cực hoặc ion trên tinh bột, pectin, protein.
- Lớp nước gần đại phân tử nhất bị giữ chặt nhất; các lớp ngoài bị giữ lỏng dần và kém trật tự hơn.
[HÌNH: tu-ve lop-nuoc-quanh-chuoi.svg | chỗ: giữa | hiện: dựng từng bước – chuỗi polymer → lớp 1 (xanh dương đậm) → lớp 2 → lớp 3 nhạt dần | cùng ý: 2 | nhấn: lớp 1 viền vàng]
- Hình dung như bãi đỗ xe: hàng sát cửa (lớp 1) xe đậu kín, khó ra; càng xa cửa càng thưa, xe ra vào dễ.

Chữ trên bảng:
Lớp sát đại phân tử: giữ chặt nhất
Càng ra ngoài: giữ lỏng dần, kém trật tự

### Cảnh 2.5 – Nhìn tận mắt nước trên bề mặt protein
Câu dẫn: Có thể "thấy" nước bám vào protein không? Tinh thể học tia X cho ta một bức ảnh.
- Cấu trúc lysozyme lòng trắng trứng gà PDB 2VB1 (Wang và cộng sự, 2007) có độ phân giải 0,65 Å; bản đồ mật độ điện tử cho thấy tổng cộng 170 phân tử nước.
[3D: PDB 2VB1 | kiểu: ribbon + nước dạng bi | hiện: xoay chậm, zoom vào các phân tử nước bám mặt protein | chỗ: giữa | cùng ý: 1]
- Lưu ý: đây là nước trong tinh thể protein, không phải phép đo "nước liên kết" trong thực phẩm. Hình chỉ giúp hình dung nước có vị trí xác định quanh nhóm phân cực.

Chữ trên bảng:
PDB 2VB1: lysozyme, 0,65 Å, 170 phân tử nước
Minh họa nước bám bề mặt – không phải số đo thực phẩm

### Cảnh 2.6 – Nước trong cơ thịt, cá: ba ngăn
Câu dẫn: Với thịt và cá, các nhà nghiên cứu chia nước theo vị trí trong sợi cơ.
- Tổng quan của Wang, Xie và Chen (2021) về sản phẩm thủy sản chia nước thành ba trạng thái: nước liên kết (gắn chặt vào đại phân tử như protein), nước bị giữ (trong cấu trúc tơ cơ – myofibril) và nước tự do (bên ngoài tơ cơ).
[HÌNH: tu-ve soi-co-3-ngan.svg | chỗ: giữa | hiện: dựng từng bước – sợi cơ → tơ cơ → tô ba vùng nước | cùng ý: 1 | nhấn: nước bị giữ (xanh dương) trong tơ cơ]
- Khi cá, tôm đông – rã nhiều lần, nhiều nghiên cứu ghi nhận nước bị giữ giảm, nước tự do tăng; ví dụ phi lê cá rô phi: số chu kỳ đông – rã tăng thì hao hụt rã đông tăng, khả năng giữ nước giảm (theo tóm tắt bài J Food Sci 2023, DOI 10.1111/1750-3841.16466).

Chữ trên bảng:
Thịt/cá: liên kết · bị giữ (trong tơ cơ) · tự do
Đông – rã nhiều lần: bị giữ → tự do → rỉ dịch

---

## CHƯƠNG 3 – Nhìn nước bằng máy: LF-NMR và T2

### Cảnh 3.1 – Vì sao cần máy
Câu dẫn: Mắt thường chỉ thấy "ướt" hay "khô". Muốn biết nước nào đang ở trạng thái nào, cần một công cụ khác.
- Cộng hưởng từ hạt nhân trường thấp (LF-NMR, còn gọi TD-NMR) đo tín hiệu của proton (¹H) trong nước mà không phá mẫu (Wiesman, 2026).
- Thông số hay dùng là T2 – thời gian hồi phục ngang. Trong một hệ và quy trình đo xác định, T2 ngắn thường ứng với nước bị hạn chế chuyển động hơn; T2 dài ứng với nước linh động hơn.
[HÌNH: tu-ve t2-ngan-dai.svg | chỗ: giữa | hiện: hai đường tắt dần – đường tắt nhanh (T2 ngắn) và tắt chậm (T2 dài) | cùng ý: 2 | nhấn: nhãn "ngắn = bị hạn chế", "dài = linh động"]

Chữ trên bảng:
LF-NMR: đo proton ¹H, không phá mẫu
T2 ngắn → nước bị hạn chế · T2 dài → linh động

### Cảnh 3.2 – Phổ T2 ba đỉnh: T21, T22, T23
Câu dẫn: Khi "trải" tín hiệu ra thành phổ, người ta thường thấy vài đỉnh.
- Trong nghiên cứu bã đậu nành, Chen và cộng sự (2022) gán T21 cho nước liên kết, T22 cho nước bất động (immobilized), T23 cho nước tự do.
- Lúc bắt đầu sấy (0 giờ): T21 khoảng 0,48 ms; T22 khoảng 7,06 ms; T23 khoảng 69,08 ms.
[HÌNH: https://www.mdpi.com/1420-3049/27/14/4421 (Hình 5 – phổ T2) | file gợi ý: chen2022-fig5-pho-t2.png | loại: ảnh | chỗ: phải | hiện: mờ dần | cùng ý: 2 | nhấn: ba đỉnh T21, T22, T23]
- Ba con số cách nhau khoảng 10 lần mỗi bậc – đó là lý do phổ thường vẽ trục thời gian theo thang log.

Chữ trên bảng:
Bã đậu nành, 0 h: T21 ≈ 0,48 · T22 ≈ 7,06 · T23 ≈ 69,08 ms
liên kết · bất động · tự do (Chen và cs., 2022)

### Cảnh 3.3 – Cẩn thận với nhãn "liên kết / bất động / tự do"
Câu dẫn: Nghe gọn gàng, nhưng tổng quan mới nhất cảnh báo đừng hiểu máy móc.
- Wiesman (2026) viết rằng nước trong thực phẩm nhìn chung không tồn tại thành ba loại phân tử được định nghĩa giống nhau ở mọi nơi.
- Tác giả khuyên gọi là môi trường "T2 ngắn, T2 trung bình, T2 dài"; chỉ dùng nhãn cũ khi trích nghiên cứu trước hoặc khi đã định nghĩa rõ cho hệ đó.
[HÌNH: tu-ve doi-nhan-t2.svg | chỗ: giữa | hiện: ba thẻ "liên kết / bất động / tự do" lật thành "T2 ngắn / trung bình / dài" | cùng ý: 2 | nhấn: thẻ mới viền xanh lá]
- Lý do: các "quần thể" đo được chịu ảnh hưởng của tương tác nước – đại phân tử, kích thước khoang, trao đổi giữa các khoang, trao đổi proton, hiệu ứng bề mặt, tín hiệu của lipid, nhiệt độ và cài đặt xung đo.

Chữ trên bảng:
Không phải 3 "loại nước" cố định
Gọi theo T2: ngắn · trung bình · dài (Wiesman, 2026)

### Cảnh 3.4 – Linh động chưa chắc đã "ra được"
Câu dẫn: Một điểm tinh tế mà con số độ ẩm không nói.
- Wiesman (2026) phân biệt độ linh động cục bộ (đo bằng hồi phục T1, T2) với khả năng di chuyển xa (đo bằng tự khuếch tán D).
- Một phân tử nước có thể linh động tại chỗ nhưng vẫn bị giam trong khoang kín – vùng "T2 cao – D thấp".
[HÌNH: tu-ve t2-d-bon-o.svg | chỗ: giữa | hiện: dựng lưới 2×2 (T2 cao/thấp × D cao/thấp), tô sáng ô "T2 cao – D thấp" | cùng ý: 2 | nhấn: ô đó màu vàng]
- Các "rào chắn" có thể là mạng protein, gel polysaccharide, màng, bề mặt dầu, thành tế bào, lỗ nhỏ, kênh cụt, đường đi quanh co.
- Nối với Chương 2: đây chính là cách nói hiện đại của "nước bị nhốt".

Chữ trên bảng:
Linh động tại chỗ ≠ di chuyển được xa
"Giữ lại được" chưa chắc "lấy ra được"

---

## CHƯƠNG 4 – Độ ẩm: định nghĩa và cách đo

### Cảnh 4.1 – Độ ẩm cơ sở ướt và cơ sở khô
Câu dẫn: Trước khi đo, phải thống nhất cách biểu diễn.
- Độ ẩm cơ sở ướt (wet basis): khối lượng nước chia cho tổng khối lượng mẫu. Chen và cộng sự (2022) viết: MC = (m − m_d)/m, với m là khối lượng mẫu, m_d là khối lượng chất khô.
- Độ ẩm cơ sở khô (dry basis): khối lượng nước chia cho khối lượng chất khô, X = (m − m_d)/m_d. Chen dùng cơ sở khô khi tính tỷ số ẩm cho mô hình khuếch tán.
[HÌNH: tu-ve uot-vs-kho.svg | chỗ: giữa | hiện: một khối mẫu tách thành nước (xanh dương) + chất khô (nâu); hai phân số hiện lần lượt | cùng ý: 1 | nhấn: mẫu số khác nhau (vàng)]
- Đổi qua lại: X = w/(1 − w) và w = X/(1 + X) (suy ra trực tiếp từ hai định nghĩa trên).

Chữ trên bảng:
Cơ sở ướt w = nước / tổng · cơ sở khô X = nước / chất khô
X = w/(1 − w) · w = X/(1 + X)

### Cảnh 4.2 – Vì sao R&D hay dùng cơ sở khô khi sấy
Câu dẫn: Khi sấy, mẫu số "tổng khối lượng" thay đổi liên tục; còn chất khô thì gần như không đổi.
- Với cơ sở khô, mẫu số cố định nên lượng nước mất đi tỷ lệ thẳng với độ giảm của X. Với cơ sở ướt, cả tử và mẫu đều giảm nên con số "đánh lừa" cảm giác.
[HÌNH: tu-ve hai-duong-say.svg | chỗ: phải | hiện: hai đường cong w và X giảm theo thời gian, X giảm dốc hơn ở đầu | cùng ý: 1 | nhấn: nhãn "cùng một mẻ sấy"]
- Bài tính Chương 6 sẽ cho thấy: bã đậu nành từ 78,8% xuống 57% (cơ sở ướt) nghe như mới bớt 22 điểm %, nhưng thực ra đã mất khoảng 64% lượng nước ban đầu.

Chữ trên bảng:
Sấy: chất khô không đổi → dùng cơ sở khô
Cơ sở ướt "giảm chậm" dù nước đã đi nhiều

### Cảnh 4.3 – Phương pháp sấy tủ: chuẩn phổ biến nhất
Câu dẫn: Cách đo độ ẩm đơn giản nhất: cân, sấy, cân lại.
- Theo tài liệu FAO "Food Composition Data" (Greenfield & Southgate, 2003), tủ sấy không khí ở 100–105 °C dùng cho phần lớn thực phẩm, trừ thực phẩm giàu đường và chất béo; với hầu hết thực phẩm, sấy tủ được coi là đạt yêu cầu cho cơ sở dữ liệu thành phần.
[HÌNH: https://commons.wikimedia.org/wiki/File:Exsiccator_hg.jpg | file gợi ý: binh-hut-am.jpg | loại: ảnh | chỗ: phải | hiện: trượt vào | cùng ý: 1 | nhấn: lớp silica gel dưới đáy]
- Ví dụ quy trình thật: Chen và cộng sự (2022) sấy 2–5 g mẫu ở 105 °C trong 2–4 giờ, để nguội, cân, rồi sấy lại từng chu kỳ 1 giờ đến khi khối lượng thay đổi dưới 2 mg (khối lượng không đổi).
[HÌNH: tu-ve quy-trinh-say-tu.svg | chỗ: giữa | hiện: dựng từng bước – cân cốc → cân mẫu → sấy 105 °C → làm nguội trong bình hút ẩm → cân → lặp đến Δ < 2 mg | cùng ý: 2 | nhấn: vòng lặp (vàng)]

Chữ trên bảng:
Tủ sấy 100–105 °C (FAO, 2003) · đến khối lượng không đổi
Ví dụ: 2–5 g, 105 °C, lặp đến Δ < 2 mg (Chen và cs., 2022)

### Cảnh 4.4 – Khi sấy tủ đo sai
Câu dẫn: Sấy tủ giả định rằng "mất khối lượng = mất nước". Giả định đó không phải lúc nào cũng đúng.
- FAO (2003) liệt kê hạn chế: đường bị caramel hóa, chất béo không no bị phân hủy, các chất bay hơi khác mất theo.
- Với thực phẩm thực vật, phương pháp chính thức AOAC khuyên sấy ở 70 °C để hạn chế phá hủy carbohydrate; tủ sấy chân không được ưu tiên ở 60–70 °C, nhất là với thực phẩm giàu đường (FAO, 2003).
[HÌNH: tu-ve sai-so-say.svg | chỗ: giữa | hiện: ba mũi tên cam đỏ rời khỏi mẫu: "caramel hóa", "chất béo phân hủy", "chất bay hơi" | cùng ý: 1 | nhấn: biểu tượng cảnh báo]
- Thực phẩm nhiều chất bay hơi (gia vị, phô mai) dùng chưng cất Dean – Stark với dung môi không tan trong nước như toluene, xylene; được AOAC chấp nhận cho gia vị và phô mai; hạn chế là an toàn dung môi (FAO, 2003).

Chữ trên bảng:
Sai số: caramel hóa · béo phân hủy · mất chất bay hơi
Giàu đường → chân không 60–70 °C · nhiều chất bay hơi → Dean – Stark

### Cảnh 4.5 – Karl Fischer, NIR, NMR
Câu dẫn: Ngoài sấy, còn các phương pháp đo theo hóa học hoặc vật lý.
- Chuẩn độ Karl Fischer: hữu ích cho thực phẩm rất ít ẩm và hút ẩm, khó sấy theo cách thường; độ chính xác của nó hiếm khi cần cho cơ sở dữ liệu thành phần (FAO, 2003).
[HÌNH: https://commons.wikimedia.org/wiki/File:KF_Titrator.jpg | file gợi ý: kf-titrator.jpg | loại: ảnh | chỗ: phải | hiện: mờ dần | cùng ý: 1 | nhấn: bình chuẩn độ]
- NIR (phản xạ cận hồng ngoại): dùng nhiều cho hạt ngũ cốc, cần hiệu chuẩn rộng theo phương pháp chuẩn, nhạy với cỡ hạt; chi phí đầu tư cao (FAO, 2003).
- NMR: cần hiệu chuẩn chi tiết; giá trị nhất là đo sự phân bố nước và nhận diện các dạng nước trong thịt (FAO, 2003) – đúng chủ đề Chương 3.

Chữ trên bảng:
Karl Fischer: mẫu rất khô, hút ẩm · NIR: ngũ cốc, cần hiệu chuẩn
NMR: phân bố và dạng nước (thịt)

### Cảnh 4.6 – Độ ẩm, aw và khả năng giữ nước: ba câu hỏi khác nhau
Câu dẫn: Ba khái niệm hay bị lẫn, Wiesman (2026) tách bạch rõ.
- Độ ẩm (đo cân): có bao nhiêu nước – dùng cho thành phần, công thức, cân bằng khối lượng, kiểm soát quy định; nhưng không mô tả nước được tổ chức thế nào.
- Hoạt độ nước aw: mức "sẵn sàng" về nhiệt động của nước, nền cho ổn định vi sinh và nhiều phản ứng. aw và độ linh động phân tử liên quan nhưng khác nhau, nên TD-NMR không thay được phép đo aw.
- Khả năng giữ nước (water-holding capacity – WHC): matrix giữ nước tốt đến đâu dưới một tác động xác định (ly tâm, rỉ dịch, ép, hao hụt khi nấu).
[HÌNH: tu-ve ba-cau-hoi-ve-nuoc.svg | chỗ: giữa | hiện: ba cột lần lượt "Bao nhiêu?" (độ ẩm) – "Sẵn sàng đến đâu?" (aw) – "Giữ được không?" (WHC) | cùng ý: 3 | nhấn: cột aw viền vàng, ghi "Bài D008"]

Chữ trên bảng:
Độ ẩm: bao nhiêu · aw: sẵn sàng đến đâu (D008)
WHC: giữ được dưới tác động nào

---

## CHƯƠNG 5 – Áp dụng: sấy bã đậu nành (okara)

### Cảnh 5.1 – Vì sao chọn bã đậu nành
Câu dẫn: Một sản phẩm thật, nằm ngay trong xu hướng "nâng cấp phụ phẩm" (upcycling).
- Bã đậu nành (okara) là phần còn lại trong túi lọc khi làm sữa đậu nành, đậu phụ.
[HÌNH: https://commons.wikimedia.org/wiki/File:Okara_(soybean_pulp).jpg | file gợi ý: okara.jpg | loại: ảnh | chỗ: trái | hiện: phóng to dần | cùng ý: 1 | nhấn: túi lọc]
- Mẫu trong nghiên cứu Chen và cộng sự (2022) lấy từ một xưởng đậu phụ, độ ẩm ban đầu 0,7880 g/g (cơ sở ướt). Ẩm cao thế này khiến bã khó bảo quản và khó vận chuyển – lý do phải sấy nếu muốn làm nguyên liệu.

Chữ trên bảng:
Okara = bã lọc sữa đậu nành / đậu phụ
Ẩm ban đầu 78,8% (cơ sở ướt)

### Cảnh 5.2 – Thiết kế thí nghiệm
Câu dẫn: Nhóm tác giả theo dõi cả độ ẩm lẫn trạng thái nước trong suốt mẻ sấy.
- Sấy không khí nóng 80 °C; bã trải trên khay 320 × 300 × 28 mm, đảo mỗi 15 phút.
- Lấy mẫu mỗi giờ từ 1 đến 5 giờ, rồi ở 5,5; 6; 6,5 và 7 giờ. Mỗi mẫu đo độ ẩm bằng sấy tủ và đo LF-NMR (phổ T2) cùng ảnh cộng hưởng từ.
[HÌNH: tu-ve thiet-ke-tn-okara.svg | chỗ: giữa | hiện: dòng thời gian 0 → 7 h, các mốc lấy mẫu hiện lần lượt | cùng ý: 2 | nhấn: mốc 5 h và 6,5 h (vàng)]
- Bài không ghi bề dày lớp bã và tốc độ gió – hai thông số ảnh hưởng mạnh tới tốc độ sấy.

Chữ trên bảng:
80 °C, khay 320×300×28 mm, đảo 15 phút
Lấy mẫu 1–5 h, rồi 5,5 · 6 · 6,5 · 7 h

### Cảnh 5.3 – Đường cong sấy
Câu dẫn: Độ ẩm giảm thế nào theo thời gian?
- Độ ẩm từ 0,7880 g/g xuống 0,57 g/g sau 5 giờ, và 0,01 g/g sau 7 giờ.
[HÌNH: https://www.mdpi.com/1420-3049/27/14/4421 (Hình 2 – đường cong sấy) | file gợi ý: chen2022-fig2-duong-cong-say.png | loại: ảnh | chỗ: phải | hiện: mờ dần | cùng ý: 1 | nhấn: đoạn 5–7 h]
- Tốc độ giảm độ ẩm cao nhất ở khoảng 6–6,5 giờ.
[HÌNH: tu-ve cot-do-am-okara.svg | chỗ: trái | hiện: ba cột hạ dần 78,8 → 57 → 1 (%), số đếm chạy | cùng ý: 2 | nhấn: cột 1% xanh lá]

Chữ trên bảng:
78,8% → 57% (5 h) → 1% (7 h)
Giảm nhanh nhất ở 6–6,5 h

### Cảnh 5.4 – Nước nào đi trước?
Câu dẫn: Đây là chỗ LF-NMR "kể" thêm điều mà con số độ ẩm không kể được.
- 0–4 giờ: nước tự do chiếm ưu thế; nước tự do và nước bất động đều giảm; nước liên kết lúc đầu giảm rồi tăng.
- Nước liên kết yếu ra đi trước; các đỉnh còn lại dịch về phía T2 ngắn hơn – nước còn lại bị giữ chặt hơn.
[HÌNH: https://www.mdpi.com/1420-3049/27/14/4421 (Hình 6 – trạng thái nước theo giai đoạn) | file gợi ý: chen2022-fig6-trang-thai-nuoc.png | loại: ảnh | chỗ: phải | hiện: mờ dần | cùng ý: 2 | nhấn: các đỉnh dịch sang trái]
- Khoảng 5 giờ: nước bất động trở thành chủ yếu và xuất hiện đỉnh mới. Khoảng 6,5 giờ: nước liên kết thành dạng chính. 6,5–7 giờ: tác giả ghi nước tự do lại tăng và chiếm ưu thế.
[HÌNH: tu-ve dien-bien-3-dang-nuoc.svg | chỗ: giữa | hiện: dựng từng bước theo 4 mốc 0–4 h · 5 h · 6,5 h · 7 h, mỗi mốc tô dạng nước chiếm ưu thế | cùng ý: 3 | nhấn: mốc 6,5 h (vàng)]

Chữ trên bảng:
Đi trước: nước tự do, nước liên kết yếu
Còn lại: dịch về T2 ngắn → bị giữ chặt hơn

### Cảnh 5.5 – Dự đoán độ ẩm không cần sấy
Câu dẫn: Ý nghĩa thực tế: nếu đo LF-NMR nhanh và không phá mẫu, có thể dùng nó để biết độ ẩm ngay trên dây chuyền không?
- Mô hình theo diện tích đỉnh: y = 1,42 × 10⁻⁵ x₁ − 0,14, R² = 0,98, sai số dự đoán 1,69–8,58%.
- Mô hình theo giá trị xám của ảnh MRI: y = 3,97 × 10⁻³ x₂ + 0,02, R² = 0,93, sai số 1,39–3,48%.
[HÌNH: https://www.mdpi.com/1420-3049/27/14/4421 (Hình 8 – ảnh mật độ proton giả màu) | file gợi ý: chen2022-fig8-anh-gia-mau.png | loại: ảnh | chỗ: phải | hiện: mờ dần | cùng ý: 2 | nhấn: màu nhạt dần theo thời gian sấy]
- Chính tác giả lưu ý: giá trị xám không dự đoán được vật liệu mà nước liên kết chiếm ưu thế.

Chữ trên bảng:
Diện tích đỉnh: R² = 0,98 · giá trị xám: R² = 0,93
Giá trị xám bất lực khi nước liên kết chiếm ưu thế

### Cảnh 5.6 – Đọc phản biện bài áp dụng
Câu dẫn: Bài báo có ích, nhưng phải đọc có phê phán.
- Mục 3.3.2 ghi độ ẩm 16,31 và 1,19 g/g ở 6,5 và 7 giờ, mâu thuẫn với mục 3.1.1 (0,01 g/g ở 7 giờ) – nhiều khả năng là lỗi.
- Một giá trị T23 trong bảng 1 bị in lỗi; khoảng T23 ghi là 29,90–288,67 ms, ngoài ra còn đỉnh T23′ khoảng 487 ms (4 h) và 939 ms (6 h).
- Kết quả "nước tự do tăng lại ở 6,5–7 giờ" khi mẫu gần khô hoàn toàn là điều nên đọc thận trọng: như Wiesman (2026) nhắc, nhãn "tự do" gán theo vị trí đỉnh T2 chưa chắc phản ánh đúng một loại nước.
[HÌNH: tu-ve kinh-lup-bang-so.svg | chỗ: giữa | hiện: kính lúp soi hai con số 0,01 và 1,19 g/g | cùng ý: 1 | nhấn: cam đỏ ở con số mâu thuẫn]

Chữ trên bảng:
Lỗi số: 0,01 vs 1,19 g/g ở 7 h
Nhãn "tự do" theo đỉnh T2 → đọc thận trọng

---

## CHƯƠNG 6 – Bài tính: từ cân sấy đến máy sấy

### Cảnh 6.1 – Bài 1: tính độ ẩm từ phép sấy tủ (số giả định)
Câu dẫn: Bắt đầu như một buổi thực hành.
- Giả định: cốc nhôm đã sấy khô cân được 25,0000 g; cho mẫu bã đậu nành vào, cốc + mẫu = 28,0000 g; sau sấy đến khối lượng không đổi, cốc + mẫu khô = 25,6360 g.
- Bước 1: khối lượng mẫu ướt m = 28,0000 − 25,0000 = 3,0000 g (nằm trong khoảng 2–5 g như Chen dùng).
- Bước 2: khối lượng chất khô m_d = 25,6360 − 25,0000 = 0,6360 g.
- Bước 3: khối lượng nước = 3,0000 − 0,6360 = 2,3640 g.
[HÌNH: tu-ve bang-tinh-say-tu.svg | chỗ: giữa | hiện: dựng từng bước 3 dòng, số đếm chạy | cùng ý: 1 | nhấn: nhãn "GIẢ ĐỊNH" cam đỏ]
- Bước 4: cơ sở ướt w = 2,3640/3,0000 = 0,7880 = 78,80%. Bước 5: cơ sở khô X = 2,3640/0,6360 ≈ 3,717 g nước/g chất khô.

Chữ trên bảng:
w = 2,3640 / 3,0000 = 78,80%
X = 2,3640 / 0,6360 ≈ 3,72 g/g chất khô

### Cảnh 6.2 – Bài 2: 100 kg bã tươi sau 5 giờ sấy
Câu dẫn: Giờ lên quy mô xưởng, dùng số thật của Chen (78,8% → 57%).
- Giả định: 100 kg bã tươi, chất khô không mất trong khi sấy. Nước = 78,8 kg; chất khô = 21,2 kg.
- Ở 57% (cơ sở ướt): khối lượng bã = 21,2 / (1 − 0,57) = 21,2 / 0,43 ≈ 49,30 kg.
- Nước còn lại = 49,30 − 21,2 ≈ 28,10 kg. Nước đã bay hơi = 78,8 − 28,10 ≈ 50,70 kg, tức ≈ 64,3% lượng nước ban đầu.
[HÌNH: tu-ve can-bang-5h.svg | chỗ: giữa | hiện: thanh 100 kg chia 78,8 (xanh dương) + 21,2 (nâu); phần xanh dương co lại còn 28,1 | cùng ý: 3 | nhấn: "≈ 64,3% nước đã đi" (vàng)]
- Cơ sở khô: từ 3,717 xuống 0,57/0,43 ≈ 1,326 g/g – giảm khoảng 64% đúng bằng tỷ lệ nước đã mất, còn cơ sở ướt chỉ giảm từ 78,8 xuống 57.

Chữ trên bảng:
100 kg → 49,3 kg sau 5 h · mất ≈ 50,7 kg nước (≈ 64%)
X: 3,72 → 1,33 g/g; w chỉ 78,8 → 57%

### Cảnh 6.3 – Bài 3: sấy đến độ ẩm mục tiêu và năng lượng hóa hơi
Câu dẫn: Nối với bài D006: cần bao nhiêu nhiệt chỉ để hóa hơi số nước đó?
- Giả định mục tiêu 10% (cơ sở ướt) – con số chọn để luyện tập, không phải quy chuẩn.
- Khối lượng sản phẩm = 21,2 / 0,90 ≈ 23,56 kg; nước còn ≈ 2,36 kg; nước phải bay hơi ≈ 78,8 − 2,36 ≈ 76,44 kg (≈ 97,0% nước ban đầu).
- Nhiệt hóa hơi dùng như D006: khoảng 540 cal/g ở điểm sôi (Kuna) = 540 kcal/kg. Q ≈ 76,44 × 540 ≈ 41.280 kcal ≈ 41.280 × 4,184 ≈ 172.716 kJ ≈ 172,7 MJ.
[HÌNH: tu-ve nang-luong-hoa-hoi.svg | chỗ: giữa | hiện: số đếm chạy tới 172,7 MJ, ngọn lửa cam đỏ | cùng ý: 3 | nhấn: "chỉ phần hóa hơi" (vàng)]
- Đây là mức tối thiểu cho riêng phần hóa hơi, bỏ qua nhiệt làm nóng, thất thoát, và việc sấy ở 80 °C chứ không ở điểm sôi. Thực tế còn tốn hơn – nhất là vì phần nước cuối bị giữ chặt.

Chữ trên bảng:
Về 10%: bay hơi ≈ 76,4 kg nước (giả định)
Hóa hơi ≈ 41.280 kcal ≈ 172,7 MJ (tối thiểu)

### Cảnh 6.4 – Rút ra cho R&D
Câu dẫn: Ba bài tính nói gì?
- Luôn ghi rõ cơ sở ướt hay khô; đổi được hai chiều bằng X = w/(1 − w).
- Khi sấy, tính theo chất khô không đổi – đó là "neo" của mọi cân bằng khối lượng.
- Con số % cơ sở ướt "đánh lừa": 78,8% → 57% nghe ít nhưng đã mất ~64% nước.
[HÌNH: tu-ve ba-bai-hoc.svg | chỗ: giữa | hiện: ba dấu tích xanh lá hiện lần lượt | cùng ý: 1 | nhấn: "chất khô = neo"]

Chữ trên bảng:
Ghi rõ cơ sở · neo vào chất khô
% ướt giảm chậm ≠ nước đi ít

---

## CHƯƠNG 7 – Bài đọc chính: Wiesman (2026)

### Cảnh 7.1 – Thẻ bài đọc
Câu dẫn: Bài đọc chính hôm nay là một tổng quan mới, rất hợp với câu hỏi mở đầu.
- Tên: "Beyond Moisture Content: Time-Domain NMR for Quantifying Molecular Mobility, Water Accessibility and Food Function".
- Tác giả: Zeev Wiesman (Đại học Ben-Gurion vùng Negev, Israel). Tạp chí Molecules, năm 2026, tập 31, số 19, bài 3476. DOI: 10.3390/molecules31193476. Giấy phép CC BY 4.0.
- Loại bài: tổng quan tường thuật, định hướng cơ chế – không phải tổng quan hệ thống hay phân tích gộp.
[HÌNH: tu-ve the-bai-doc.svg | chỗ: giữa | hiện: thẻ sách vẽ phấn với tên, tác giả, năm, DOI hiện lần lượt | cùng ý: 1 | nhấn: DOI (vàng)]

Chữ trên bảng:
Wiesman (2026) · Molecules 31(19):3476
DOI 10.3390/molecules31193476 · CC BY 4.0

### Cảnh 7.2 – Tóm tắt
Câu dẫn: Bài nói gì, bằng một đoạn?
- Độ ẩm là một trong những chỉ tiêu đo thường xuyên nhất, nhưng riêng lượng nước không quyết định hành vi chế biến, độ bền, cấu trúc, khả năng nhả dịch hay cảm quan.
- Tác giả đề xuất thang bậc: lượng nước → trạng thái phân tử → độ linh động cục bộ → ngăn hóa/kết nối → khả năng di chuyển → vận chuyển/nhả → chức năng thực phẩm; và giới thiệu TD-NMR (hồi phục T1, T2 và tự khuếch tán) như công cụ đo các bậc giữa.
[HÌNH: tu-ve thang-bac-wiesman.svg | chỗ: giữa | hiện: dựng từng bậc thang từ dưới lên, bậc "lượng nước" màu trắng, bậc "chức năng" màu vàng | cùng ý: 2 | nhấn: khoảng trống giữa hai đầu thang]

Chữ trên bảng:
Lượng nước → trạng thái → linh động → kết nối
→ di chuyển → nhả dịch → chức năng

### Cảnh 7.3 – Năm ý cốt lõi
Câu dẫn: Năm ý mang về, kèm điều kiện để hiểu đúng.
- Ý 1: Phân tích độ ẩm thông thường thực chất chỉ trả lời một câu hỏi: có bao nhiêu nước. Thực phẩm có độ ẩm tương tự vẫn có thể khác nhau về cấu trúc, hao hụt khi nấu và độ mọng nước.
- Ý 2: Trong một hệ và quy trình đo xác định, T2 ngắn hơn thường cho thấy nước bị hạn chế hơn; nhưng nên gọi "T2 ngắn/trung bình/dài" thay vì "liên kết/bất động/tự do".
- Ý 3: "Nước giữ lại được không nhất thiết là nước tiếp cận được" – cần đo thêm tự khuếch tán D; T2 cao với D thấp nghĩa là linh động tại chỗ nhưng bị giới hạn khi di chuyển xa.
[HÌNH: tu-ve nam-y-wiesman.svg | chỗ: trái | hiện: năm thẻ số 1–5 hiện lần lượt theo từng ý | cùng ý: 1 | nhấn: thẻ đang nói viền vàng]
- Ý 4: Phổ phân bố T2 có được từ biến đổi Laplace ngược – một bài toán "điều kiện kém"; số đỉnh và độ rộng đỉnh phụ thuộc mức chính quy hóa và nhiễu, nên phải báo cáo đầy đủ cách xử lý.
- Ý 5: Ứng dụng đã có ở thịt (cấu trúc – T2 – hao hụt khi nấu), thịt thực vật, gel sữa (tách huyết thanh – syneresis), bánh mì (thoái hóa), thực phẩm đông lạnh, sấy và hoàn nguyên (protein đậu nành tạo kết cấu); ví dụ "độ mọng nước" là trường hợp mẫu, nhưng chuỗi nhân quả đầy đủ vẫn chưa được chứng minh.
- Về số liệu: bài tổng quan này không đưa giá trị T2 bằng số; con số cụ thể trong album lấy từ nghiên cứu bã đậu nành của Chen và cộng sự (2022).

Chữ trên bảng:
Độ ẩm = "bao nhiêu" · T2 = "bị hạn chế đến đâu"
D = "đi được xa không" · phổ T2 phụ thuộc cách xử lý

### Cảnh 7.4 – Phản biện (critique)
Câu dẫn: Đọc tổng quan cũng cần soi giới hạn.
- Tự tác giả thừa nhận: chọn tài liệu theo lối tường thuật, không hệ thống, không có trọng số phân tích gộp.
- Các thành phần hồi phục không ứng một – một với một quần thể hóa học hay không gian; tương quan không phải nhân quả – tránh nói "T2 bằng mức liên kết nước".
- Triển khai công nghiệp còn vướng chuyển giao hiệu chuẩn, trôi tín hiệu, giới hạn bao bì; điều khiển vòng kín bằng TD-NMR mới là cơ hội, chưa phải năng lực đã thiết lập.
[HÌNH: tu-ve kinh-lup-tong-quan.svg | chỗ: phải | hiện: kính lúp lướt qua 3 nhãn cam đỏ | cùng ý: 2 | nhấn: "tương quan ≠ nhân quả"]
- Điểm dễ hiểu sai: TD-NMR không phải cách đo khác của aw. Muốn biết aw vẫn phải đo aw (bài D008).
- Giới hạn với người học: bài thiên về phương pháp đo, ít số liệu, nhiều thuật ngữ vật lý; nên đọc cùng một nghiên cứu cụ thể như Chen (2022) để có con số.

Chữ trên bảng:
Tường thuật, không hệ thống · tương quan ≠ nhân quả
TD-NMR không thay phép đo aw

### Cảnh 7.5 – Câu hỏi đào sâu
Câu dẫn: Ba câu để tự nghĩ – không có đáp án sẵn.
- 1. Nếu hai mẫu chả cá cùng độ ẩm 75% nhưng một mẫu rỉ dịch nhiều hơn khi rã đông, bạn sẽ đo thêm chỉ tiêu nào, và kỳ vọng phổ T2 khác nhau ra sao?
- 2. Trong bài okara, vì sao giai đoạn cuối sấy lại chậm và tốn năng lượng dù lượng nước còn rất ít?
- 3. Khi viết báo cáo dùng LF-NMR, bạn sẽ ghi những thông tin nào để người khác lặp lại được (theo tinh thần của Wiesman)?
[HÌNH: tu-ve ba-cau-hoi.svg | chỗ: giữa | hiện: ba dấu hỏi vàng hiện lần lượt | cùng ý: 1 | nhấn: —]

Chữ trên bảng:
Cùng độ ẩm, khác rỉ dịch → đo gì?
Báo cáo LF-NMR → ghi gì để lặp lại?

---

## CHƯƠNG 8 – Tiếng Anh: thuật ngữ và câu mẫu

### Cảnh 8.1 – Sáu cụm từ cốt lõi
Câu dẫn: Những cụm này sẽ gặp trong mọi bảng thông số (spec sheet) và phương pháp phân tích.
- free water · bound water · entrapped water – ba "trạng thái" nước của Chương 2.
- moisture content (wet basis / dry basis) · constant weight · water-holding capacity.
[HÌNH: tu-ve the-tu-vung.svg | chỗ: giữa | hiện: 6 thẻ lật lần lượt, mặt sau là nghĩa Việt | cùng ý: 1 | nhấn: "wet basis / dry basis" viền vàng]

Chữ trên bảng:
free / bound / entrapped water
moisture content (wb / db) · constant weight · WHC

### Cảnh 8.2 – Hai câu mẫu
Câu dẫn: Đọc to, rồi tự viết một câu tương tự về một sản phẩm khác.
- "The moisture content of fresh okara was 78.8% on a wet basis, which corresponds to about 3.72 g of water per gram of dry matter." – Độ ẩm bã đậu nành tươi là 78,8% theo cơ sở ướt, tương ứng khoảng 3,72 g nước trên mỗi gam chất khô.
- "Bound water does not act as a solvent and freezes only at very low temperatures." – Nước liên kết không đóng vai trò dung môi và chỉ đông đá ở nhiệt độ rất thấp.
[HÌNH: tu-ve cau-mau.svg | chỗ: giữa | hiện: câu tiếng Anh hiện trước, câu Việt mờ dần ra sau | cùng ý: 1 | nhấn: "on a wet basis" (vàng)]
- Nhiệm vụ: viết 1 câu tiếng Anh giải thích vì sao cá đông – rã nhiều lần bị rỉ dịch, dùng "entrapped water" và "water-holding capacity".

Chữ trên bảng:
"…78.8% on a wet basis…"
Viết 1 câu: entrapped water + water-holding capacity

---

## TỔNG KẾT

1. Nước trong thực phẩm không đồng nhất: giáo trình chia thành nước tự do (vắt, cắt, ép là ra), nước bị nhốt (bị giam trong mao quản/tế bào, cấu trúc hỏng thì chảy ra) và nước liên kết (bám nhóm phân cực/ion của tinh bột, pectin, protein) (Kuna).
2. Nước liên kết không làm dung môi, chỉ đông ở nhiệt độ rất thấp, hầu như không có áp suất hơi, đặc hơn nước tự do; lượng của nó phụ thuộc phương pháp đo.
3. LF-NMR đo T2: trong một hệ xác định, T2 ngắn ≈ nước bị hạn chế. Bã đậu nành tươi có T21 ≈ 0,48, T22 ≈ 7,06, T23 ≈ 69,08 ms (Chen và cs., 2022). Nhưng nên gọi "T2 ngắn/trung bình/dài" và không đồng nhất T2 với mức liên kết (Wiesman, 2026).
4. Độ ẩm cơ sở ướt w = nước/tổng; cơ sở khô X = nước/chất khô; X = w/(1 − w). Sấy tủ 100–105 °C đến khối lượng không đổi là phổ biến; thực phẩm giàu đường dùng chân không 60–70 °C, nhiều chất bay hơi dùng Dean – Stark, mẫu rất khô dùng Karl Fischer (FAO, 2003).
5. Okara 78,8% → 57% sau 5 giờ ở 80 °C nghĩa là đã mất ≈ 64% nước; nước dễ đi ra trước, phần còn lại bị giữ chặt hơn nên giai đoạn cuối khó.
6. Độ ẩm trả lời "bao nhiêu", aw trả lời "sẵn sàng đến đâu", WHC trả lời "giữ được không". Bài sau (D008) đi vào aw.

**Bài sau – D008:** Hai loại bánh cùng độ ẩm 20%, sao một loại mốc nhanh còn loại kia thì không? Câu trả lời nằm ở hoạt độ nước aw.

---

## TRẮC NGHIỆM

**Câu 1.** Theo học liệu Kuna, loại nước nào lấy ra được dễ dàng bằng cách vắt, cắt hoặc ép?
A. Nước liên kết  B. Nước tự do  C. Nước kết tinh  D. Nước trong lớp đơn phân tử

**Câu 2.** Tính chất nào KHÔNG phải của nước liên kết theo Kuna?
A. Không làm dung môi cho muối, đường  B. Chỉ đông ở nhiệt độ rất thấp  C. Có áp suất hơi cao hơn nước tự do  D. Tỷ trọng lớn hơn nước tự do

**Câu 3.** Một mẫu có độ ẩm cơ sở ướt 80%. Độ ẩm cơ sở khô là:
A. 0,8 g/g  B. 1,25 g/g  C. 4,0 g/g  D. 5,0 g/g

**Câu 4.** Trong LF-NMR, trong cùng một hệ và quy trình đo, T2 ngắn hơn thường cho thấy:
A. Nước linh động hơn  B. Nước bị hạn chế chuyển động hơn  C. Mẫu có aw cao hơn  D. Mẫu chứa nhiều chất béo hơn

**Câu 5.** Theo FAO (2003), với thực phẩm giàu đường, phương pháp sấy được ưu tiên là:
A. Tủ sấy không khí 130 °C  B. Tủ sấy chân không 60–70 °C  C. Lò vi sóng công suất cao  D. Đèn hồng ngoại 150 °C

**Câu 6.** 100 kg bã đậu nành 78,8% ẩm (cơ sở ướt) sấy xuống 57%. Giả sử chất khô không mất, nước đã bay hơi khoảng:
A. 21,8 kg  B. 28,1 kg  C. 50,7 kg  D. 78,8 kg

**Câu 7.** Wiesman (2026) khuyên gì về nhãn "liên kết / bất động / tự do"?
A. Dùng cho mọi thực phẩm vì đã chuẩn hóa  B. Thay bằng "T2 ngắn / trung bình / dài" trừ khi đã định nghĩa cho hệ cụ thể  C. Thay bằng giá trị aw  D. Chỉ dùng cho thịt

**Câu 8.** Phát biểu nào đúng về TD-NMR theo Wiesman (2026)?
A. Là phương pháp thay thế để đo aw  B. Đo được độ linh động, nhưng không phải cách đo khác của aw  C. Chỉ đo được độ ẩm  D. Cần phá mẫu

### Đáp án và giải thích
1. **B.** Kuna định nghĩa nước tự do là nước lấy ra dễ dàng bằng vắt, cắt, ép (Kuna, e-PG Pathshala).
2. **C.** Kuna ghi nước liên kết "hầu như không có áp suất hơi" – ngược với phương án C (Kuna).
3. **C.** X = w/(1 − w) = 0,80/0,20 = 4,0 g nước/g chất khô (suy từ định nghĩa của Chen và cs., 2022).
4. **B.** Trong hệ xác định, T2 ngắn thường chỉ nước bị hạn chế hơn (Wiesman, 2026). aw là đại lượng khác (Câu 8).
5. **B.** FAO (2003): tủ sấy chân không ưu tiên ở 60–70 °C, nhất là thực phẩm giàu đường; tủ không khí gây caramel hóa đường.
6. **C.** Chất khô 21,2 kg → khối lượng ở 57% = 21,2/0,43 ≈ 49,30 kg → nước còn ≈ 28,10 kg → đã bay hơi ≈ 50,70 kg (số liệu ẩm từ Chen và cs., 2022; giả định chất khô không đổi).
7. **B.** Wiesman (2026) khuyên dùng "short-, intermediate-, long-T2" và chỉ giữ nhãn cũ khi trích nghiên cứu trước hoặc đã định nghĩa rõ.
8. **B.** Tác giả nhấn mạnh aw và độ linh động liên quan nhưng khác nhau; TD-NMR không phải cách đo khác của aw; ưu điểm là không phá mẫu (Wiesman, 2026).

---

## ĐỐI CHIẾU ĐỦ NỘI DUNG

Đã rà từng mục trước khi lưu (03/11/2026).

| # | Mục yêu cầu | Chương · Cảnh |
|---|---|---|
| 1 | Câu hỏi mở thật | Đầu file; 1.2; 5.3 |
| 2 | Nối bài D006 (phân cực, liên kết hydro) | 1.1 |
| 3 | Hàm lượng nước trong thực phẩm | 1.2 |
| 4 | Khái niệm nền: nước tự do | 2.1 |
| 5 | Nước bị nhốt (entrapped) | 2.2 |
| 6 | Nước liên kết – 4 tính chất, phụ thuộc phương pháp đo | 2.3 |
| 7 | Cơ chế: bám vị trí phân cực/ion, theo lớp | 2.4 |
| 8 | Minh họa 3D nước quanh protein (PDB 2VB1) | 2.5 |
| 9 | Nước trong cơ thịt/cá (3 ngăn), đông – rã | 2.6 |
| 10 | LF-NMR, T2 | 3.1, 3.2 |
| 11 | Phê phán nhãn liên kết/bất động/tự do | 3.3 |
| 12 | Linh động vs tiếp cận (T2 – D) | 3.4 |
| 13 | Độ ẩm cơ sở ướt, cơ sở khô, công thức đổi | 4.1, 4.2 |
| 14 | Sấy tủ, khối lượng không đổi | 4.3 |
| 15 | Sai số sấy, chân không, Dean – Stark | 4.4 |
| 16 | Karl Fischer, NIR, NMR | 4.5 |
| 17 | Độ ẩm vs aw vs WHC | 4.6 |
| 18 | Áp dụng sản phẩm thật: okara – bối cảnh | 5.1 |
| 19 | Okara – thiết kế thí nghiệm | 5.2 |
| 20 | Okara – đường cong sấy | 5.3 |
| 21 | Okara – diễn biến trạng thái nước | 5.4 |
| 22 | Okara – mô hình dự đoán | 5.5 |
| 23 | Okara – phản biện | 5.6 |
| 24 | Bài tính 1 (sấy tủ, giả định) đủ 5 bước | 6.1 |
| 25 | Bài tính 2 (cân bằng khối lượng 5 h) | 6.2 |
| 26 | Bài tính 3 (mục tiêu 10%, năng lượng hóa hơi) | 6.3 |
| 27 | Rút ra cho R&D | 6.4 |
| 28 | Bài đọc chính: tên, tác giả, tạp chí, năm, DOI, giấy phép | 7.1 |
| 29 | Tóm tắt bài đọc | 7.2 |
| 30 | 4–5 ý cốt lõi (số liệu: ghi rõ bài không có số, số lấy từ Chen) | 7.3 |
| 31 | Critique | 7.4 |
| 32 | Câu hỏi đào sâu | 7.5 |
| 33 | Thuật ngữ + 1–2 câu mẫu | 8.1, 8.2; Từ điển |
| 34 | Tổng kết + câu mở bài sau | Tổng kết |
| 35 | Trắc nghiệm + đáp án dẫn nguồn | Trắc nghiệm |
| 36 | Mỗi cảnh ≥ 1 hình | Tất cả cảnh 1.1–8.2 |
| 37 | Góc khóa luận | Không đưa vào bài này (đã có ở D006, ~1 lần/tuần) |

---

## TỪ ĐIỂN THUẬT NGỮ

| Term | IPA | Loại từ | Nghĩa Anh | Nghĩa Việt | Ví dụ Anh – Việt |
|---|---|---|---|---|---|
| free water | /friː ˈwɔːtər/ | noun phrase | Water that can be easily removed from food by squeezing, cutting or pressing | nước tự do | Free water drips out when the cucumber is pressed. – Nước tự do chảy ra khi ép dưa chuột. |
| bound water | /baʊnd ˈwɔːtər/ | noun phrase | Water held at polar or ionic sites of macromolecules; does not act as a solvent | nước liên kết | Bound water freezes only at very low temperatures. – Nước liên kết chỉ đông ở nhiệt độ rất thấp. |
| entrapped water | /ɪnˈtræpt ˈwɔːtər/ | noun phrase | Water immobilized in capillaries or cells, released when tissue is damaged | nước bị nhốt | Cutting releases entrapped water from the cells. – Cắt làm nước bị nhốt thoát ra khỏi tế bào. |
| moisture content | /ˈmɔɪstʃər ˈkɒntent/ | noun phrase | The amount of water in a sample, expressed on a wet or dry basis | độ ẩm | The moisture content fell to 57% after five hours. – Độ ẩm giảm còn 57% sau năm giờ. |
| wet basis | /wet ˈbeɪsɪs/ | noun phrase | Water mass divided by total sample mass | cơ sở ướt | Fresh okara contains 78.8% water on a wet basis. – Okara tươi chứa 78,8% nước theo cơ sở ướt. |
| dry basis | /draɪ ˈbeɪsɪs/ | noun phrase | Water mass divided by dry-matter mass | cơ sở khô | On a dry basis, the value is 3.72 g/g. – Theo cơ sở khô, giá trị là 3,72 g/g. |
| constant weight | /ˈkɒnstənt weɪt/ | noun phrase | The point at which repeated drying no longer changes the sample mass beyond a set limit | khối lượng không đổi | Samples were dried to constant weight at 105 °C. – Mẫu được sấy đến khối lượng không đổi ở 105 °C. |
| water-holding capacity | /ˈwɔːtər ˈhoʊldɪŋ kəˈpæsəti/ | noun phrase | The ability of a food matrix to retain water under a defined force or treatment | khả năng giữ nước | Repeated freeze–thaw cycles reduce water-holding capacity. – Đông – rã nhiều lần làm giảm khả năng giữ nước. |
| transverse relaxation time (T2) | /trænzˈvɜːrs ˌriːlækˈseɪʃən taɪm/ | noun phrase | NMR time constant; within a defined system, shorter T2 usually means more restricted water | thời gian hồi phục ngang | A shorter T2 indicates more restricted water. – T2 ngắn hơn cho thấy nước bị hạn chế hơn. |
| low-field NMR | /loʊ fiːld ˌen em ˈɑːr/ | noun phrase | Nuclear magnetic resonance at low magnetic field, used to study water non-destructively | cộng hưởng từ hạt nhân trường thấp | Low-field NMR tracked water changes during drying. – LF-NMR theo dõi biến đổi nước khi sấy. |
| Karl Fischer titration | /kɑːrl ˈfɪʃər taɪˈtreɪʃən/ | noun phrase | Chemical titration for water, useful for very dry or hygroscopic samples | chuẩn độ Karl Fischer | Milk powder is often tested by Karl Fischer titration. – Bột sữa thường được kiểm bằng chuẩn độ Karl Fischer. |
| syneresis | /sɪˈnɪərəsɪs/ | noun | The expulsion of liquid (serum) from a gel | sự tách dịch (rỉ huyết thanh) khỏi gel | Syneresis appears as whey on top of yogurt. – Hiện tượng tách dịch thấy rõ ở lớp whey trên mặt sữa chua. |
| okara | /oʊˈkɑːrə/ | noun | The insoluble soybean residue left after making soy milk or tofu | bã đậu nành | Okara is a high-moisture by-product. – Bã đậu nành là phụ phẩm có độ ẩm cao. |

---

## NGUỒN THAM KHẢO

**Tài liệu (đã mở đọc ngày 03/11/2026)**
- Wiesman Z. (2026). Beyond Moisture Content: Time-Domain NMR for Quantifying Molecular Mobility, Water Accessibility and Food Function. *Molecules*, 31(19), 3476. DOI: 10.3390/molecules31193476. https://pmc.ncbi.nlm.nih.gov/articles/PMC13666914/ – CC BY 4.0. **Bài đọc chính.**
- Chen T., Zhang W., Liu Y., Song Y., Wu L., Liu C., Wang T. (2022). Water Status and Predictive Models of Moisture Content during Drying of Soybean Dregs Based on LF-NMR. *Molecules*, 27(14), 4421. DOI: 10.3390/molecules27144421. https://www.mdpi.com/1420-3049/27/14/4421 – CC BY (metadata trang ghi 3.0).
- Kuna A. Water in food systems. e-PG Pathshala (INFLIBNET/UGC, Ấn Độ). https://ebooks.inflibnet.ac.in/ftp03/chapter/water-in-food-systems – CC BY-NC 4.0. Học liệu đại học, không bình duyệt.
- Greenfield H., Southgate D.A.T. (2003). Food Composition Data: Production, Management and Use, 2nd ed. FAO, Rome. Chương 7 "Review of methods of analysis" – mục Water. https://www.fao.org/4/y4705e/y4705e12.htm – © FAO; chỉ tóm tắt bằng lời.
- Wang X.-Y., Xie J., Chen X.-J. (2021). Applications of Non-invasive and Novel Methods of Low-Field NMR and MRI in Aquatic Products. *Frontiers in Nutrition*, 8, 651804. DOI: 10.3389/fnut.2021.651804. https://pmc.ncbi.nlm.nih.gov/articles/PMC8044990 – CC BY.
- Bài về phi lê cá rô phi đông – rã: J Food Sci (2023), DOI 10.1111/1750-3841.16466 – chỉ dùng phần tóm tắt (abstract) trên chỉ mục PubMed.
- Clark M.A., Douglas M., Choi J. (2018). Biology 2e, mục 2.2 Water. OpenStax – CC BY-NC-SA (nhắc lại từ D006).

**Hình và mô hình 3D**
- Okara (soybean pulp).jpg – Pax Ahimsa Gethen, Wikimedia Commons, CC BY-SA 3.0. https://commons.wikimedia.org/wiki/File:Okara_(soybean_pulp).jpg
- Exsiccator hg.jpg – Hannes Grobe/AWI, Wikimedia Commons, CC BY 3.0. https://commons.wikimedia.org/wiki/File:Exsiccator_hg.jpg
- KF Titrator.jpg – Datamax, Wikimedia Commons, Public domain. https://commons.wikimedia.org/wiki/File:KF_Titrator.jpg
- Chen và cs. (2022), Hình 2, 5, 6, 8 – *Molecules* (MDPI), CC BY; ghi công tác giả và DOI khi dùng.
- PubChem CID 962 (nước), CID 5793 (D-glucose) – NCBI PubChem, dữ liệu công khai.
- RCSB PDB 2VB1 – "HEWL at 0.65 angstrom resolution", Wang J., Dauter M., Alkire R., Joachimiak A., Dauter Z. (2007); https://www.rcsb.org/structure/2VB1 – dữ liệu PDB dùng tự do (CC0).
- Các hình "tu-ve" – tự vẽ cho album.

---

## CẦN KIỂM TRA LẠI

1. Giấy phép bài Chen và cs. (2022): metadata trang ghi CC BY 3.0; MDPI thường dùng CC BY 4.0 – cần xem dòng giấy phép trên PDF trước khi chép hình.
2. Chen (2022) có số mâu thuẫn (mục 3.3.2 ghi 16,31 và 1,19 g/g; mục 3.1.1 ghi 0,01 g/g ở 7 h) và một giá trị T23 in lỗi – album dùng số ở mục 3.1.1 và bảng 1.
3. Chen (2022) không ghi bề dày lớp bã và tốc độ gió; không có tỷ lệ % từng dạng nước theo thời gian (chỉ mô tả định tính) – album không tự suy số.
4. Thông tin bài cá rô phi (DOI 10.1111/1750-3841.16466) chỉ lấy từ tóm tắt, chưa đọc toàn văn.
5. Kuna không cho số liệu định lượng về nước liên kết (nhiệt độ đông, lượng); trang ghi giấy phép theo tên học phần "Food Additives and Food Quality Assurance" khác với "Food Chemistry" (đã ghi ở D006).
6. Con số 540 cal/g là nhiệt hóa hơi ở điểm sôi (Kuna); sấy ở 80 °C thì giá trị thực khác – bài 3 chỉ là ước lượng tối thiểu, mục tiêu 10% ẩm là giả định luyện tập.
7. Phiên âm IPA trong Từ điển chưa đối chiếu với từ điển chuẩn.
8. Phần cuối (≈ 400 ký tự) trang PMC của Wiesman (2026) chưa đọc – có thể chỉ là chú thích/tài liệu tham khảo.

verified: true — Mọi định nghĩa, cơ chế và số liệu đã đối chiếu với các nguồn mở đọc trực tiếp ngày 03/11/2026 (Wiesman 2026 trên PMC, Chen 2022 trên MDPI, học liệu Kuna, FAO 2003 chương 7, Wang 2021, trang RCSB 2VB1, trang Wikimedia Commons của từng hình); các con số tự tính đã chạy lại bằng Python; điểm chưa chắc chắn đưa vào "Cần kiểm tra lại".
