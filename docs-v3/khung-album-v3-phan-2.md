# KHUNG ALBUM v3, PHẦN 2: mô phỏng tương tác và kho thuật ngữ
Ngày 10/11/2026. Là phần nối tiếp của `khung-album-v3.md` (cùng thắng khi mâu thuẫn với các tài liệu cũ). Hoàng đã duyệt hướng này ngày 10/11. Mục 7 và 8 của khung gốc được bổ sung bằng mục 11–13 dưới đây; thẻ cũ không đổi.

## 11. Mô phỏng tương tác (`[MÔ PHỎNG]`)
Yêu cầu của Hoàng: bài nào cũng có mô phỏng bấm được cho các ý chính (kể cả hoạt độ nước, máy móc, thiết bị), không bài nào lặp bài nào, và phải hợp lý với nội dung chứ không vẽ cho đẹp.

### 11.1 Năm điều kiện bắt buộc
1. Mỗi mô phỏng gắn với đúng một khẳng định có trong bài (`khẳng định:`). Không có khẳng định thì không làm.
2. Số liệu và quy luật lấy từ nguồn đã trích trong bài. Không tự bịa đường cong hay con số. Chỗ nào chỉ là mô hình đơn giản hóa thì ghi rõ "mô hình minh họa, không phải số đo".
3. Chiều thay đổi phải đúng khoa học, kiểm với công thức hoặc số liệu gốc trước khi giao.
4. Chỉ hiện tham số có trong bài. Không thêm thanh trượt cho đẹp.
5. Phần chưa có nguồn chắc (ví dụ giới hạn độ tan) ghi vào "Cần kiểm tra" ngay trong khối `Giới hạn` của mô phỏng.

### 11.2 Chống lặp
- Mỗi mô phỏng có `id` riêng và một khẳng định riêng. Soạn bài ghi vào `hinh-da-dung.md` (mục "Mô phỏng đã dùng") và đọc mục đó trước khi thiết kế mô phỏng mới.
- Hai bài có cùng `id` hoặc cùng khẳng định thì `--nghiem` báo lỗi (giống ảnh trùng).
- Bộ chạy (code) dùng chung, nội dung (tham số, công thức, bộ phận, khẳng định) viết riêng cho từng bài.
- Cách tương tác đổi theo bản chất của ý: đại lượng liên tục dùng thanh trượt; thiết bị dùng tháo lắp; quy trình dùng sắp xếp; phán đoán dùng dự đoán trước. Không để mọi bài chỉ có thanh trượt.

### 11.3 Cú pháp
```
[MÔ PHỎNG: <id> | kiểu: thanh-trượt | chỗ: phải | khẳng định: <câu> | chức năng: giải thích | nhìn: <đâu>]
- dự đoán: <câu hỏi> | chọn: <A>; <B> | đáp: <A> | vì sao: <lý do>
- biến: <tên> | đơn vị: % | min: 0 | max: 60 | bước: 1 | mặc định: 10
- chọn: <tên A> {M: 342.30, i: 1, max: 60}; <tên B> {M: 58.44, i: 2, max: 26}
- hằng: nước = 18.015
- tính: nw = (100 - p) / nước ; nh = i * p / M ; aw = nw / (nw + nh)
- ra: aw | nhãn: aw lý tưởng | chữ số: 3
- ngưỡng: <tên> {aw: 0.92} ; ...   (hiện còn/dừng khi ra >= ngưỡng)
- nguồn: <url hoặc tên nguồn đã mở>
- giới hạn: <điều mô phỏng KHÔNG nói được; chỗ chưa có nguồn thì ghi "Cần kiểm tra">
[/MÔ PHỎNG]
```
Quy tắc bộ dựng:
- Các dòng `- khóa: …` là cấu hình; thiếu `khẳng định`, `chức năng`, `nguồn` hoặc `giới hạn` thì cảnh báo kèm số dòng và không hiện mô phỏng (giống `[HÌNH]`).
- Công thức trong `tính:` chỉ gồm số, tên biến, `+ - * / ^`, ngoặc, và hàm `ln exp min max sqrt`. Bộ dựng phải tự viết bộ tính biểu thức an toàn, KHÔNG dùng `eval` hay `new Function`.
- Một mô phỏng ≤ 1 hình ở Cảnh đó (mô phỏng được tính như một hình).
- Chuyển động chỉ khi người học bấm hoặc kéo; không animation tự chạy; tôn trọng `prefers-reduced-motion`.
- Mọi kết quả cũng hiện dạng chữ và bảng (đọc được khi không dùng chuột, đọc được khi tắt script).
- Nền trơn, đơn sắc theo biến màu của giao diện; trạng thái "còn/dừng" không chỉ phân biệt bằng màu (đặc / viền rỗng + chữ).
- Mẫu chuẩn về giao diện và hành vi: `mo-phong-aw-thu.html` (bản thử cho D008 Chương 3–4, đã chạy được ở 1280 và 390 px).

### 11.4 Các kiểu (bộ dựng làm dần, kiểu nào chưa có thì cảnh báo, không tự vẽ thay)
| Kiểu | Dùng khi | Cấu hình riêng |
|---|---|---|
| `thanh-trượt` | đại lượng liên tục (aw theo nồng độ, nhiệt độ tiệt trùng) | `biến`, `tính`, `ra`, `ngưỡng` |
| `dự-đoán` | ý dễ hiểu sai; người học chọn trước khi xem | dòng `- dự đoán:` (dùng được trong mọi kiểu) |
| `tháo-lắp` | thiết bị, máy | `- bộ phận: <tên> | chức năng: … | vì sao ở đó: …`; nút "Mở ra" tách bộ phận; bấm bộ phận hiện tên, chức năng, lý do |
| `bỏ-vào-máy` | máy xử lý nguyên liệu (nghiền, chà, trộn) | `- nguyên liệu: …`, `- thông số: …`, `- kết quả: <bảng tra thông số → kết quả có nguồn>` (kết quả lấy từ bảng hoặc quy luật có nguồn, KHÔNG mô phỏng vật lý tự chế) |
| `sắp-xếp` | quy trình có thứ tự | `- bước: …` ; người học xếp rồi chấm, kèm vì sao |
| `tính-thử` | ví dụ số | `biến`, `tính`, bước giải hiện từng dòng |

Thẻ `[MÁY]` cũ vẫn dựng được như trước ở album cũ (không đổi). Trong bài v3 dùng `[MÔ PHỎNG … kiểu: tháo-lắp | bỏ-vào-máy]`.

### 11.5 Kiểm tra `--nghiem` thêm
- mô phỏng thiếu `khẳng định`, `chức năng`, `nguồn`, `giới hạn`;
- `id` hoặc khẳng định trùng giữa các bài (đọc cả `hinh-da-dung.md`);
- công thức dùng ký tự hoặc hàm ngoài danh sách cho phép;
- Cảnh có hơn 1 hình tính cả mô phỏng;
- kiểu chưa hỗ trợ.

### 11.6 Hoạt hình cơ chế (bổ sung 10/11/2026, theo yêu cầu của Hoàng)
Yêu cầu: mọi nguyên lý vật lý, hóa học, sinh học và nhất là máy móc phải có hình động minh họa đi đôi với phần chữ (ví dụ vi khuẩn tiết enzyme, máy nghiền vận hành), miễn là phù hợp với nội dung.

Hai kiểu mới, cùng nằm trong `[MÔ PHỎNG]`:
- `kiểu: hoạt-hình`: chuỗi bước của một cơ chế hay một máy đang chạy (vi khuẩn tiết enzyme, enzyme cắt cơ chất, dòng nguyên liệu qua máy). Soạn bài viết file SVG `hoat-hinh/<id>.svg`, mỗi bước là một nhóm `<g data-buoc="n">`, có thể chứa chuyển động bằng SMIL hoặc CSS. Bộ dựng lo bộ điều khiển và chú thích; soạn bài lo hình và nội dung.
- `kiểu: hạt`: các hạt chuyển động ngẫu nhiên theo vùng (khuếch tán, thẩm thấu, hơi nước giữa không khí và thực phẩm). Mẫu chuẩn: `hoat-hinh-aw-thu.html`.

Cú pháp:
```
[MÔ PHỎNG: <id> | kiểu: hoạt-hình | khẳng định: <câu> | chức năng: giải thích | nhìn: <đâu>]
- hình: hoat-hinh/<id>.svg
- bước: 1 | chữ: <chú thích bước 1, một câu> | vì sao: <lý do, tuỳ chọn>
- bước: 2 | chữ: …
- nguồn: <nguồn đã mở của cơ chế>
- giới hạn: <điều hình đã đơn giản hóa; chỗ chưa chắc ghi "Cần kiểm tra">
[/MÔ PHỎNG]
```
Với `kiểu: hạt` các dòng cấu hình là: `- vùng: <tên> | hạt: <số> | …`, `- ranh giới: <qua lại|chặn>`, `- đo: <đại lượng đếm từ số hạt>`, cùng `nguồn`, `giới hạn`. Bộ dựng đọc cấu hình, không chạy mã do soạn bài viết.

Luật cho mọi hoạt hình:
1. Chỉ chạy khi người học bấm. Mặc định đang dừng, không tự chạy, không lặp vô hạn để "cho vui".
2. Có đủ điều khiển: Chạy/Tạm dừng, Một bước (Bước tiếp/Bước trước), Làm lại, tốc độ. Chú thích bước bằng chữ hiện đồng bộ với hình (chữ nằm ngay trên hoặc dưới hình).
3. Mỗi bước chỉ thay đổi một điều chính. Dùng một kiểu gợi ý duy nhất cho mỗi hình.
4. Hình động phải khớp với đoạn chữ của Cảnh: chú thích dùng đúng thuật ngữ của bài; cơ chế phải đúng với nguồn đã trích. Hình đã đơn giản hóa thì ghi rõ "mô hình minh họa" ở khối giới hạn.
5. `prefers-reduced-motion`: mở ở chế độ từng bước, không tự chuyển động.
6. Luôn có bản chữ thay thế (danh sách các bước, và số đo nếu có) và `title`/`desc` cho hình.
7. Màu đơn sắc theo biến giao diện; không dựa vào màu để phân biệt; AA.
8. Lý do giữ điều khiển: tài liệu về học bằng hoạt hình (Mayer, Hegarty, Mayer & Campbell 2005; Mayer và Moreno về chia đoạn) cho thấy hoạt hình hiệu quả nhất khi người học tự điều khiển nhịp và có lời chú thích, còn hoạt hình tự chạy liên tục dễ làm quá tải. Kết quả thay đổi theo nội dung, nên mỗi hoạt hình vẫn phải qua kiểm đúng cơ chế.
9. Máy móc: một máy có thể có cả `hoạt-hình` (vận hành: nguyên liệu vào, qua bộ phận, ra) và `tháo-lắp` (bộ phận và chức năng) nhưng tính chung là một hình của Cảnh. Cơ chế vận hành lấy từ giáo trình hoặc tài liệu thiết bị, không tự suy.

`--nghiem` thêm: `hoạt-hình` thiếu file SVG, thiếu `data-buoc` khớp với các dòng `bước`, SVG thiếu `title` hoặc `desc`, SVG có script hoặc liên kết ngoài, hoạt hình có `autoplay`/lặp vô hạn không điều khiển được, thiếu `khẳng định`/`nguồn`/`giới hạn`.

## 12. Thuật ngữ bấm được (`{{…}}`) và kho `tu-dien/`
Yêu cầu của Hoàng: bấm vào thuật ngữ chuyên ngành thì hiện trang về nó.

### 12.1 Cú pháp trong bài
- `{{hoạt độ nước}}` hoặc `{{aw|hoạt độ nước}}` (chữ hiển thị | tên chuẩn của thuật ngữ). Chỉ đánh dấu lần đầu xuất hiện trong mỗi chương.
- Trên trang: gạch chân nhẹ, bấm được bằng chuột và bàn phím (Enter), vùng bấm đủ lớn.
- Bấm thì mở khung trượt bên phải (không rời bài): tên Việt và Anh, ký hiệu, định nghĩa ngắn, công thức, nguồn, "Xuất hiện ở: …", và nút "Mở trang đầy đủ". Điện thoại: khung dưới đáy màn hình. Esc hoặc nút đóng để thoát.

### 12.2 Kho thuật ngữ
- Mỗi thuật ngữ một file `tu-dien/<mã>.md`, chỉ viết MỘT lần, mọi bài dùng chung (chống lặp). Mã là chữ không dấu, nối gạch ngang.
- Cấu trúc file:
```
# hoạt độ nước
- **Mã:** hoat-do-nuoc
- **Tên khác:** water activity; aw
- **Anh:** water activity
- **Ngắn:** 1–2 câu (hiện trong khung trượt)
- **Công thức:** aw = p / p₀ (tuỳ chọn)
## Định nghĩa
## Ví dụ số
## Hiểu sai thường gặp
## Liên quan
- {{độ ẩm}} · {{ERH}}
## Nguồn
## Cần kiểm tra
```
- Mỗi trang thuật ngữ phải có nguồn đã mở; ý chưa chắc đưa vào "Cần kiểm tra". Không viết lại định nghĩa đã có ở trang khác, chỉ liên kết `{{…}}`.
- "Xuất hiện ở" do bộ dựng tự quét các album, không viết tay.

### 12.3 Bộ dựng
- Quét `tu-dien/*.md`, dựng `tu-dien/<mã>.html` (dùng cùng giao diện nền trơn) và `tu-dien/index.html` (tra theo chữ cái).
- Ghép `{{…}}` với Mã hoặc Tên khác (không phân biệt hoa thường, bỏ dấu khi so).
- `--nghiem` báo lỗi: thuật ngữ được đánh dấu nhưng chưa có trang; trang thiếu `Ngắn` hoặc `Nguồn`; hai trang cùng Mã hoặc cùng Tên khác; `{{…}}` nằm trong tiêu đề Cảnh hoặc trong khối `[TÓM]`.
- Album cũ không có `{{…}}` thì dựng y như trước (so mã băm).
- Lưu ý đường đi dữ liệu: kho `tu-dien/` hiện nằm trong repo (`D:\Git\hoc-hom-nay\tu-dien\`). Cách đưa lên từ Drive chưa quyết, Hoàng sẽ quyết sau; trong thời gian này tạm đặt file ở project `rd-food-lab/tu-dien/` và bản sao trong `docs-v3`.

## 13. Thứ tự làm (thay mục 10 phần còn lại)
1. Hoàng duyệt bản thử mô phỏng aw và hướng thuật ngữ (đã duyệt hướng 10/11; chờ duyệt cách tương tác sau khi bấm thử).
2. Claude (cloud) cập nhật D008-v3: sửa 3 lỗi `--nghiem`, thêm `[MÔ PHỎNG]` aw và `{{…}}`, viết kho thuật ngữ cho D008 (15–20 trang đầu tiên).
3. Claude Code làm bộ chạy `[MÔ PHỎNG]` (bắt đầu `thanh-trượt` và `dự-đoán`) và `{{…}}`, dựng thử D008-v3 vào thư mục tạm, chụp 1280/1600/390 px, so mã băm album cũ. Không commit, không push.
4. Hoàng duyệt bằng mắt; sau đó mới push và bật lại workflow.
5. Các kiểu còn lại (`tháo-lắp`, `bỏ-vào-máy`, `sắp-xếp`, `tính-thử`) làm khi bài nào cần.
6. Viết lại các bài khác (D006, D007, D009, D010, CNTP) kèm danh sách mô phỏng và thuật ngữ riêng; ghi mô phỏng vào `hinh-da-dung.md`.
