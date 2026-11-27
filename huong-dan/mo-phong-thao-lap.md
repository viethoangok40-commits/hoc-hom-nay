# `[MÔ PHỎNG … kiểu: tháo-lắp]`: cú pháp, kho đăng ký, danh sách cần làm
Ngày 16/11/2026. Viết để Hoàng dán vào dự án (phần A dán vào `khung-album-v3-phan-2.md` mục 11.4 và 11.7; phần B và C là tài liệu tra cứu). Chưa commit.
Chưa nói gì về giao diện (390 px, bố cục, màu): phần này chỉ là cú pháp, kiểm tra và dữ liệu.

---
## PHẦN A. Cú pháp và luật (dán vào khung phần 2)

### A1. Thay dòng `tháo-lắp` trong bảng 11.4 bằng
| Kiểu | Dùng khi | Cấu hình riêng |
|---|---|---|
| `tháo-lắp` | thiết bị, máy; xem được bộ phận, tháo rời, chạy nguyên liệu qua máy | các dòng `- bộ phận: <tên> \| mã: <mã> \| chức năng: … \| vì sao ở đó: …` (một dòng cho MỖI bộ phận của mô hình) và các dòng `- bước: n \| chữ: …` (một dòng cho MỖI bước vận hành của mô hình) |

### A2. Thêm mục 11.7 "Mô hình tháo-lắp 3D"
```
[MÔ PHỎNG: <id> | kiểu: tháo-lắp | chỗ: phải | khẳng định: <câu> | chức năng: giải thích | nhìn: <đâu>]
- bộ phận: <tên đúng bài giảng> | mã: <mã bộ phận trong mô hình> | chức năng: … | vì sao ở đó: …
- bước: 1 | chữ: …
- nguồn: <nguồn đã mở>
- giới hạn: <điều mô hình không nói được; chỗ chưa có nguồn ghi "Cần kiểm tra">
[/MÔ PHỎNG]
```
1. **Ghép theo id.** `<id>` của mô phỏng chính là tên mô hình trong kho đăng ký `templates/may/<id>.js`. Bài khai báo toàn bộ chữ; mô hình chỉ cho hình 3D và chuyển động.
2. **Chữ trên mô hình là chữ của bài.** Tên bộ phận, chức năng, "vì sao ở đó" và các bước vận hành hiện trong mô hình lấy từ các dòng `bộ phận` và `bước` của thẻ, không dùng chữ viết sẵn trong mô hình.
3. **Mô hình chỉ có bộ phận có trong nguồn.** Bài phải ghi đủ mọi bộ phận (mã) và đủ số bước của mô hình. Thứ nguồn không nêu (động cơ, khung, phễu…) chỉ là vật trang trí không nhãn và không được khẳng định gì. Muốn thêm bộ phận có nhãn thì phải có nguồn.
4. **Ghép trên trang theo câu khẳng định.** Bộ gắn so khớp NGUYÊN VĂN câu khẳng định hiển thị trên trang với câu khai báo trong bài (chuẩn hóa khoảng trắng). Vì vậy mỗi mô hình một câu khẳng định, không trùng trong toàn album (đã là luật chung của mục 11.2).
5. **Báo lỗi to, có tên bài và số dòng.** Khi dựng, mọi lỗi dưới đây in `✗✗ LỖI MÔ PHỎNG THÁO-LẮP <bài> dòng <n>: …` ra màn hình, ẩn mô hình khỏi trang, và với `--nghiem` làm dựng thất bại (mã thoát 2):
   - id trùng giữa các thẻ hoặc giữa các bài;
   - câu khẳng định trùng (so không phân biệt hoa thường và dấu);
   - mã bộ phận không có trong mô hình (thông báo kèm danh sách mã hợp lệ), mã lặp, thiếu "chức năng", thiếu bộ phận;
   - số dòng `bước` không bằng số bước của mô hình;
   - chưa có mô hình cho id (ghi vào hàng đợi `mo-hinh-can-lam.md` trong thư mục dựng).

   Khi mở trang, mọi trường hợp **không khớp** (câu khẳng định trên trang khác câu khai báo; không có dữ liệu cho id; trùng khẳng định) hiện một khung đỏ `role="alert"` ngay tại khối đó kèm tên bài và dòng, đồng thời `console.error`. Khối không bao giờ bị bỏ qua âm thầm.
6. Trang luôn có bản chữ của bộ phận và các bước (đọc được khi không có WebGL). Mô hình 3D chỉ tải khi bấm "Mở mô hình 3D". Điều khiển trong mô hình: `T` tách/ghép, `X` xuyên thấu, `Space` chạy, `N` từng bước, số `1…9` chọn bộ phận, `Esc` đóng.
7. Giới hạn đã biết: trang tải về offline (`tai-ve/`) chưa nhúng được mô hình 3D, chỉ có bản chữ; hạt trong mô hình có tỉ lệ minh họa, không phải số đo, nên khối `giới hạn` phải nói rõ.

---
## PHẦN B. Kho đăng ký hiện có (`templates/may/`)
Đối chiếu ngày 16/11/2026 với chữ trong `bai/`. Cột cuối nói chỗ nào bài chưa nêu.

| id | Mã bộ phận (theo thứ tự) | Số bước | Dùng cho | Đối chiếu nguồn |
|---|---|---|---|---|
| `may-cha` | `pheu` `ray` `truc` `mang` `cuaba` | 5 | CNTP-Ngay03 Cảnh 1.5 | Khớp Ý1–Ý6. Ý6 (nguyên lý vận hành) bài ghi "tự bổ sung, slide không ghi" → thẻ phải ghi "Cần kiểm tra". Đã bỏ nhãn "động cơ". |
| `ep-khung-ban` | `cot` `ban` `bia` `luc` `ranh` `khay` `cua` `tui` | 6 | CNTP-Ngay03 Cảnh 3.2 | Bộ phận 1–7 đúng chú thích slide. `tui` (túi lọc vải) và "4 trục đứng, áp từ dưới lên" bài ghi "tự bổ sung" → Cần kiểm tra. Bài không nêu chức năng riêng của `bia` (bản bìa) → Cần kiểm tra. |
| `ep-truc-vit` | `buong` `vit` `cua` | 4 | CNTP-Ngay03 Cảnh 3.6 | Khớp Ý1–Ý3. Đã bỏ nhãn phễu, máng, động cơ. "Hai trục vít" bài ghi "suy ra" → chưa dựng. |
| `ep-hai-truc` | `trai` `phai` `khe` | 2 | CNTP-Ngay03 Cảnh 3.5 Ý1 | Khớp Ý1 (trục có rãnh dọc, khe hẹp, nhiều trục nối tiếp, hai trục quay ngược chiều theo mô tả hình). Đã bỏ nhãn phễu, khay, dao gạt, khung. |
| `ep-bang-tai` | `tren` `duoi` `dao` | 3 | CNTP-Ngay03 Cảnh 3.5 Ý2 | Khớp Ý2 (băng trên nén, băng dưới có lỗ lọc, dao cạo). Đã bỏ nhãn phễu, khay, máng, con lăn, động cơ. "Băng tải gói" và "trục – băng tải" (Ý3, Ý4) chưa dựng. |
| `thung-quay-chan` | `be` `thung` | 4 | CNTP-Ngay05 Cảnh 2.3 Ý1 | Khớp Ý1 (nước chần 70–100 °C; thùng ngang đục lỗ, xoay, thanh gạt). Hạt "chất tan" là minh họa tổn thất; đường đi qua lỗ thùng là suy ra → Cần kiểm tra. Đã bỏ nhãn phễu, ống hơi, máng, động cơ. |
| `ly-tam-dia` | `than` `dia` | 6 | CNTP-Ngay01 Cảnh 1.4 | Đã rút về 2 nhãn bài nêu (thân trụ, chồng đĩa hình nón cụt) ngày 18/11. Ống nạp, cửa ra, đế là vật trang trí. Hạt minh họa. |
| `noi-hai-vo` | `votrong` `vongoai` `phonghoi` `ongdan` `ongtao` `vannuoc` `vanat` `apke` `giado` `tayquay` `banhrang` | 6 | CNTP-Ngay09 Cảnh 2.2 | 11 chú thích slide. Chú thích 5 "Cần kiểm tra". Vị trí do album vẽ. Khối dán: `khoi-dan-mo-hinh-moi.md`. |
| `noi-co-dac-chan-khong` | 20 mã (xem khối dán) | 6 | CNTP-Ngay10 Cảnh 4.2 | Đối chiếu ảnh slide 18/11: 6 đọc rõ; 17 nhiều khả năng là "tháp". |
| `co-dac-lien-tuc` | `thung` `bom` `tamban` `dunnong` `bochoi` `chungcat` `ngungtu` | 5 | CNTP-Ngay10 Cảnh 5.1 | Đối chiếu ảnh slide 18/11: 6 đọc rõ "chưng cất". Đường nối theo mũi tên nhỏ trên ảnh, Cần kiểm tra. |
| `di-nguyen-khang-the` | `dinguyen` `khangthe` | 3 | CNTP-Ngay11 Cảnh 5.1 | Cơ chế khớp hình (kiến thức nền: Abcam, Akbar 2019): chén của kháng thể ôm khớp mấu dị nguyên, protein khác không khớp. Khối dán: `khoi-dan-di-nguyen-khang-the.md`. |
| `phan-ung-maillard` | `amin` `duongkhu` `melanoidin` `caramel` | 5 | CNTP-Ngay10 Cảnh 3.2 | Hàng trên Maillard (–NH₂ + –CHO, tách nước, melanoidin), hàng dưới caramel hóa. Phân tử rút gọn; nguồn nền PMC12154226. Khối dán: `khoi-dan-phan-ung-maillard.md`. |
| `chlorophyll-pheophytin` | `acid` `kiem` | 4 | CNTP-Ngay09 Cảnh 4.1 | H⁺ thế Mg ở tâm vòng porphyrin, vòng sang ô liu; hàng kiềm đối chứng. Nguồn nền PMC12248490. Khối dán: `khoi-dan-chlorophyll-pheophytin.md`. |
| `ca-pectin` | `khongvoi` `covoi` | 4 | CNTP-Ngay09 Cảnh 4.2 | Ca²⁺ nối hai chuỗi pectin (hộp trứng) so với không nước vôi. Nguồn nền PMID 36198382. Khối dán: `khoi-dan-khuech-tan-ca-pectin.md`. |
| `khuech-tan-chat-tan` | `nuoc` `nuocduong` | 4 | CNTP-Ngay09 Cảnh 4.3 | Chất tan ra nước chần so với nước đường độ khô gần quả (vào bằng ra). Không vẽ quả teo. Khối dán cùng file. |
| `oxy-hoa-lipid` | `axitbeo` `oxy` `kimloai` `goctudo` | 4 | D010 Cảnh 3.1 | Chuỗi gốc tự do trên 3 phân tử axit béo (khởi đầu, gắn O₂, lấy H, lan truyền). Nguồn nền PMC2868362. Khối dán: `khoi-dan-oxy-hoa-lipid.md`. |
| `phan-tu-nuoc` | `oxy` `hydro` `lienket` | 3 | D006 Cảnh 1.2 | Phân tử nước hình chữ V, đám mây δ−/δ+, electron lệch về O. Khối dán: `khoi-dan-d006-nuoc.md`. |
| `mang-lien-ket-hydro` | `phantunuoc` `lienkethydro` | 3 | D006 Cảnh 4.1 | 8 phân tử nối bằng liên kết hydro, nóng lên thì đứt và bay hơi. Khối dán cùng file. |
| `ho-hoa-tinh-bot` | `tinhthe` `vodinhhinh` `amylose` `nuoc` | 4 | D014 Cảnh 2.2 | Hạt tinh bột trương, xoắn kép tháo ra, amylose rỉ ra. Thay khối hoạt-hình ho-hoa-bon-buoc. Nguồn: Ratnayake và Jackson 2006; Chiodetti 2024; Teng 2025. Khối dán: `khoi-dan-d014-ho-hoa.md`. |
| `chai-muc` | `cohep` `khoangrong` `mangmong` | 5 | D009 Cảnh 2.2 | Thay hoạt hình 2D chai-muc.svg. Thanh RH (chữ định tính, không số) kéo lên rồi xuống để thấy vòng trễ; nước có nhớ lịch sử. Khối dán: `khoi-dan-d009-chai-muc.md`. Engine: tùy chọn dieuKhien (thanh trượt) trong may.js. |
| `raoult-pha-loang` | `tinhkhiet` `dungdich` | 4 | D008 Cảnh 3.1 | Hai bình kín, thanh phần mol chất tan 0–30%, chất tan pha loãng nước (LibreTexts 8.7), cột aw. Khối dán: `khoi-dan-d008-raoult.md`. |
| `hop-kin-erh` | `mau` `khongkhi` `cambien` | 4 | D008 Cảnh 2.2 | Hộp kín, cân bằng động, cột RH chạm vòng aw×100; thanh aw 0,20–0,95. Cần bấm Chạy. Khối dán: `khoi-dan-d008-hop-kin.md`. |

### Chữ chép được vào thẻ (chỉ phần bài nêu; "vì sao ở đó" phải điền từ nguồn, không có thì ghi "Cần kiểm tra")
`may-cha` (Cảnh 1.5):
```
- bộ phận: Phễu nạp liệu | mã: pheu | chức năng: Nguyên liệu (đã chần hoặc xé nhỏ) vào phễu ở đầu máy. | vì sao ở đó: Cần kiểm tra
- bộ phận: Rây tròn cố định (lỗ 0,5–1,5 mm) | mã: ray | chức năng: Rây tròn cố định bằng đồng hay thép không gỉ, lỗ 0,5; 0,75; 1,0; 1,5 mm. Thịt quả mềm lọt qua lỗ; phần không lọt (vỏ, hạt, xơ) ở lại. | vì sao ở đó: Cần kiểm tra
- bộ phận: Trục và cánh đập | mã: truc | chức năng: Trục thép không gỉ (khoảng 700 v/ph) gắn cánh đập (gỗ có nẹp cao su, thép hoặc roi thép); cánh nghiêng 1,5–2° so với đường sinh của trục nên nguyên liệu đi xoắn ốc và bã được đùn ra cuối máy. | vì sao ở đó: Cần kiểm tra
- bộ phận: Máng hứng bột chà | mã: mang | chức năng: Thịt quả mềm lọt qua lỗ rây rơi xuống máng hứng bột chà. | vì sao ở đó: Cần kiểm tra
- bộ phận: Cửa bã | mã: cuaba | chức năng: Phần không lọt rây được cánh nghiêng đẩy dần theo đường xoắn ốc tới cửa bã ở cuối máy. | vì sao ở đó: Cần kiểm tra
- bước: 1 | chữ: Nguyên liệu (đã chần hoặc xé nhỏ) vào phễu ở đầu máy
- bước: 2 | chữ: Cánh đập quay ~700 v/ph hất nguyên liệu văng ra, đi theo đường xoắn ốc
- bước: 3 | chữ: Thịt quả mềm bị ép lọt qua lỗ rây
- bước: 4 | chữ: Bột chà rơi xuống máng hứng
- bước: 5 | chữ: Phần không lọt (vỏ, hạt, xơ) được đẩy dần tới cửa bã ở cuối máy
```
Với các mô hình còn lại, chữ `chức năng` và `bước` đã nằm sẵn trong từng module (đúng câu bài) và `mã`/số bước lấy ở bảng trên; thiếu hoặc sai thì bộ dựng báo ngay kèm danh sách mã hợp lệ.

---
## PHẦN C. Danh sách `mo-hinh-can-lam` (thiết bị trong bài chưa có mô hình tháo-lắp)
Tệp `mo-hinh-can-lam.md` do bộ dựng tự sinh chỉ liệt kê id mà một bài ĐÃ khai báo nhưng chưa có mô hình. Bảng dưới là hàng đợi dự kiến theo kiểm kê (cột "Đã đọc" cho biết tôi đã đọc nguyên văn Cảnh hay mới thấy tên hình).

| id đề xuất | Bài · Cảnh | Thiết bị (bộ phận theo nguồn) | Đã đọc | Lưu ý nguồn |
|---|---|---|---|---|
| `ep-thuy-luc` | N03 · 3.3 | 11 bộ phận theo slide: gói nguyên liệu; giá chặn trên; cột trụ; miệng nạp liệu có nắp; động cơ băng nâng; băng nâng; thùng chứa nguyên liệu; mâm quay; pittông thủy lực; giá nạp liệu; khung của hệ thống thủy lực. Nguyên lý Pascal F₁/A₁ = F₂/A₂. | có | Vai trò mâm quay và trình tự vận hành bài ghi "suy ra" → Cần kiểm tra. Áp làm việc cam, chanh ≈ 250 at; dứa 55–60 %. |
| `ep-hinh-tru` | N03 · 3.4 Ý1–Ý2 | ống trụ có lỗ nhỏ; bản cứng di động; nhiều sợi dây giữa bản di động và đầu cuối ống (thành kênh mao dẫn khi nén); ngừng, quay ống, làm tơi, nén tiếp | có | — |
| `ep-tank-khi-nen` | N03 · 3.4 Ý3–Ý4 | tank trụ nằm ngang, chia hai ngăn bằng màng chất dẻo; khí nén đẩy màng; lỗ ở vùng nén; kênh tháo bã; hình có 5 bước: nạp, bơm khí, ép tiếp, quay làm tơi, tháo bã | có | Năng suất "3.600 kg/mẻ…" bản OCR sai chữ số → Cần kiểm tra. |
| `ep-truc-bang-tai` | N03 · 3.5 Ý3–Ý4 | một băng tải đi qua khe giữa hai trục rỗng, một trục có lỗ; dịch qua lỗ trục vào kênh thu | có | "Băng tải gói" (Ý3) bài ghi "suy ra từ tên hình" → Cần kiểm tra. |
| `ep-hai-truc-vit` | N03 · 3.6 Ý5 | hai vít song song ăn khớp | có | Bài ghi "suy ra từ sơ đồ" → Cần kiểm tra trước khi dựng. |
| `chan-hoi-nuoc-duong-ham` | N05 · 2.3 Ý4 | đường hầm hơi nước; băng tải dài đến 15 m, rộng 1,0–1,5 m, chia ba khu vực; nạp liệu qua van xoay hoặc nắp thủy lực | có | Hình có nhấn "khu vực giữ nhiệt". |
| `chan-phun-nuoc-nong` | N05 · 2.3 Ý2 | đường hầm; băng tải lưới qua vùng gia nhiệt, giữ nhiệt, làm nguội; nước nóng phun từ vòi dưới trần, chảy xuống qua băng tải, thu lại dùng lại | có | Làm nguội bằng nước lạnh hoặc không khí lạnh (phải vô trùng, làm ẩm). |
| `chan-iqb` | N05 · 2.4 Ý1–Ý2 | một lớp nguyên liệu trên băng tải; thiết bị nâng vào đường hầm gia nhiệt; thiết bị nâng thứ hai (thời gian lưu = thời gian chần); đường hầm làm nguội phun sương | có | — |
| `chan-tang-soi` | N05 · 2.4 Ý3 | hơi nước trộn không khí thổi từ dưới lên qua tấm lưới, nguyên liệu lơ lửng | có | Tốc độ "4,x m/s": bản OCR không rõ chữ số → Cần kiểm tra. |
| `ly-tam-ong` | N01 · 1.4 Ý3 | ly tâm ống: bán kính 10–15 cm, 15.000–50.000 vòng/phút | có | Bài chỉ nêu số liệu, KHÔNG nêu cấu tạo → cần nguồn cấu tạo trước khi dựng. |
| `ong-lang-ba-lop` · `lang-rang-cao` | N03 · 4.1, 4.3 | tên hình trong bài: ống lắng ba lớp, thiết bị lắng răng cao | chưa | Cần đọc Cảnh 4.1 và 4.3 để lấy bộ phận. |
| `loc-chan-khong` | N03 · 4.5 | tên hình trong bài: lọc chân không | chưa | Cần đọc Cảnh 4.5. |
| `duong-ham-thanh-trung` · `thuy-luc-hydrolock` · `thung-quay-tiet-trung` · `retort` | N05 · 6.2, 6.3 | tên hình trong bài | chưa | Cần đọc Cảnh 6.2–6.3 (giáo trình tr.241–250). |
| `may-do-aw` | D008-v3 · 5.1 | buồng kín và cảm biến (bài có ảnh Haar-Hygrometer ở Cảnh 5.1) | chưa | Cần đọc nguyên văn Cảnh 5.1 và 5.2. |

Cơ chế không phải thiết bị (khuếch tán, thẩm thấu, vòng trễ, enzyme…) dùng các kiểu `hoạt-hình`, `hạt`, `thanh-trượt` đã có, không nằm trong danh sách này.

---
## PHẦN D. Việc cho ô CNTP xem lại (phiên thiết kế KHÔNG sửa)
### `ly-tam-dia` (CNTP-Ngay01 Cảnh 1.4)
Module có sẵn từ trước trong repo, không do phiên thiết kế viết, chưa đối chiếu nguồn. Cảnh 1.4 của bài chỉ nêu: ly tâm đĩa có thân trụ khoảng 20–100 cm, nhiều đĩa hình nón cụt xếp chồng; ứng dụng tách béo sữa (sữa gầy còn dưới 0,05 % béo). Nguồn ghi trong Cảnh: Lê Văn Việt Mẫn và cs., 2011, tr.84–85, 87.

Các chi tiết trong `templates/may/ly-tam-dia.js` mà Cảnh 1.4 KHÔNG nêu (cần có nguồn đã mở hoặc bỏ khỏi mô hình trước khi gắn thẻ `[MÔ PHỎNG … tháo-lắp]`):
- tốc độ "4.000–10.000 vòng/phút" của chén (bài chỉ nêu 15.000–50.000 vòng/phút cho ly tâm ỐNG, không phải đĩa);
- sữa nguyên liệu "đã gia nhiệt ≈ 60 °C";
- "lỗ phân phối thẳng hàng" trên các đĩa, "đĩa phân phối", "ống nạp giữa", "cửa ra phần nhẹ / phần nặng" và đường đi cụ thể của béo (vào tâm) và nước (ra thành): bài không mô tả cấu tạo bên trong;
- tên 5 bộ phận (chén xoay, ống nạp giữa, chồng đĩa, cửa ra phần nhẹ, cửa ra phần nặng) bài không liệt kê: chỉ có "nhiều đĩa hình nón cụt xếp chồng" trong "thân trụ";
- số đĩa (10) và tỉ lệ hạt béo 35 % là minh họa, không phải số đo.

Đề nghị: ô CNTP đọc lại Cảnh 1.4 và nguồn tr.84–87 để quyết (a) bổ sung nguồn cho từng chi tiết, hoặc (b) rút bộ phận có nhãn về đúng thứ bài nêu rồi để phần còn lại thành vật trang trí không nhãn, như đã làm cho 6 module kia. Khi đó mã bộ phận và số bước (hiện `chen` `ong` `dia` `nhe` `nang`; 6 bước) sẽ đổi, nên bài chưa nên gắn thẻ tháo-lắp cho `ly-tam-dia` trước khi quyết.
