# BÁO CÁO DỰNG ALBUM v3

Nhánh `thu-the-moi-v2`. Không commit, không push, không đụng `main`. Hai workflow GitHub vẫn `disabled_manually`.
Mọi bản dựng thử nằm ở `_preview/v3/` (đã có trong `.gitignore`) hoặc `%TEMP%`. Hình tải về cho bài thử nằm ở `%TEMP%\v3-assets` (dùng cờ `--assets=`), không ghi vào `assets/bai/` của repo.

## 0. Sửa ngày (làm trước)
`build-album.mjs` dòng 396–398: đọc thêm dòng `- **Ngày:** dd/mm/yyyy` ở phần đầu bài; không có ngày hợp lệ thì **báo lỗi**, không lấy mtime. Dựng 9 bài bằng bản `main` + sửa này: D007=2026-11-03, D008=2026-11-04, D009=2026-11-06, D010=2026-11-07; CNTP 02–06/11 đúng.

## 1. Đã xong
- **Parser thẻ v3**: `[TÓM: a|b|c]`, `[NHỚ LẠI]…[/NHỚ LẠI]`, `[BẢN ĐỒ]` (mỗi dòng `A --quan hệ--> B`), `- **Thẻ:** …`, `- Nhớ: …`, trường `khẳng định:` / `chức năng:` / `nhìn:` của `[HÌNH]` và `[3D]`, `[SỐ LIỆU]` + bảng ngay dưới. Thẻ lạ hiện như chữ thường. Bài được coi là v3 khi có `[TÓM]`, `[NHỚ LẠI]`, `[BẢN ĐỒ]` hoặc dòng `- **Thẻ:**`.
- **Giao diện v3** `templates/album-v3.html` (bám `docs-v3/khung-album-mau.html`): nền trơn sáng/tối theo hệ thống; mục lục cố định trái; chữ trái, hình phải (điện thoại một cột); chế độ "Từng ý" (mặc định, phím mũi tên) và "Cả chương"; dòng "Chương x/N · Ý y/M · khoảng z phút" và thanh tiến độ; hộp ẩn bấm hiện (`<details>`); quiz tự chấm kèm lý do; `localStorage` bọc try/catch; ôn rải 1/3/7/21 ngày; đồ thị SVG từ `[SỐ LIỆU]` (cột, cột ngang, đường) có bảng số thay thế; bản đồ khái niệm đơn sắc; 3Dmol chỉ tải khi bấm "Xem 3D". Không animation, không glass, không vật thể 3D chung.
- **Bỏ autoFig ở v3**: hình thiếu thì bỏ qua và ghi cảnh báo có số dòng. Hình thiếu `khẳng định` hoặc `chức năng` thì không hiện. Ảnh không tải được thì chỉ hiện liên kết nguồn, không vẽ thay.
- **Cờ `--nghiem`**: trùng hình giữa các bài (so với `bai/*-album.md` và `hinh-da-dung.md` nếu có), hình thiếu khẳng định/chức năng, chương > 4 cảnh, cảnh > 3 đoạn, cảnh > 1 hình, tiêu đề cảnh < 5 từ, chương thiếu `[TÓM]` hoặc `[QUIZ]`, chữ/dòng ngoài 55–80 (đọc `max-width` của CSS), cỡ chữ < 18px / giãn dòng < 1,6, tương phản dưới AA (đọc biến màu của template, 4 bộ: tối/sáng × R&D/CNTP), có animation hoặc backdrop-filter. Có lỗi thì thoát mã 2.
- **Album cũ dựng y hệt**: xem mục 4.
- **Kiểm bằng Playwright** (Chrome hệ thống, sáng + tối, 74 trang/lượt): xem mục 3.

## 2. `--nghiem` trên D008-album-v3.md
```
--nghiem D008-album-v3.md: 3 LỖI
  ✗ Cảnh 4.3: 2 hình (> 1)
  ✗ Chương 8: thiếu [QUIZ]
  ✗ Chương 9: thiếu [QUIZ]
```
Đạt các mục: trùng hình (0), hình thiếu khẳng định/chức năng (0), chương > 4 cảnh (0), cảnh > 3 đoạn (0), tiêu đề < 5 từ (0), thiếu `[TÓM]` (0), chữ/dòng, tương phản AA, animation. Đây là lỗi **nội dung của bài**, tôi không sửa file bài. Cảnh báo khi dựng:
```
D008-album-v3.md dòng 157: không tải được mô hình 3D pubchem 5988  (NCBI chặn địa chỉ IP này)
D008-album-v3.md dòng 356: không tải được ảnh https://pmc.ncbi.nlm.nih.gov/articles/PMC8997551/  (trang không có og:image)
```
6 ảnh Wikimedia tải được. Hai chỗ trên chỉ hiện liên kết nguồn.

## 3. Kiểm giao diện (Playwright) và ảnh chụp
| Cỡ | Tương phản AA (lỗi) | Animation / canvas nền | Cuộn ngang | Vùng bấm < 44px | Hình trùng | Chữ/dòng (min · tb · max) | Lỗi JS |
|---|---|---|---|---|---|---|---|
| 1280 | 0 | 0 | không | 0 | 0 | 46 · 62 · 79 | 0 |
| 1600 | 0 | 0 | không | 0 | 0 | 46 · 62 · 79 | 0 |
| 390 | 0 | 0 | không | 0 | 0 | 30 · 37 · 42 (màn hẹp) | 0 |
(đã kiểm cả sáng lẫn tối; 8 hình, 0 trùng.) Thử riêng 3Dmol bằng một phân tử giả: trước khi bấm `$3Dmol` chưa nạp, 0 yêu cầu tải thư viện; sau khi bấm nạp thư viện và có canvas.

Ảnh chụp, thư mục `D:\Git\hoc-hom-nay\_preview\v3\anh-chup\`:
- 1280: `01-mo-dau-1280-dark.png`, `02-chuong4-y1-1280-dark.png`, `03-chuong8-ban-do-1280-dark.png`, `04-chuong1-ca-chuong-1280-dark.png` (thêm `05`–`08`, `09-3dmol-sau-khi-bam-1280.png`)
- 1600: `01-…-1600-dark.png` đến `04-…-1600-dark.png`
- 390: `01-…-390-dark.png` đến `04-…-390-dark.png` và bản sáng `…-390-light.png` (thêm `05`–`08`)
- số liệu: `ket-qua-kiem.json`; bản dựng: `_preview/v3/site/bai/2026-11-04-rnd-d008-hoat-do-nuoc-water-activity-aw.html`

## 4. Album cũ dựng lại có y hệt không (so mã băm)
So 9 bài (CNTP-Ngay01–05, D007–D010) + trang chủ + `danh-sach.json`, bản thường và bản `tai-ve`: **20/20 tệp trùng mã băm** (SHA-256, bỏ trường `built`), giữa bộ dựng mới và bản "trước v3" (cùng `templates/`, `lib/`, hình).
Lưu ý: so với bản `main` thì các trang khác nhau vì working tree vốn đã có các sửa dở trước lượt này (`templates/album.html`, `kinh.*`…). Khác biệt đó không do v3, nên "bản trước v3" được tạo bằng cách gỡ đúng các sửa v3 của lượt này khỏi `build-album.mjs` (script: `%TEMP%\pw-test\go-v3.cjs`).

## 5. Chưa xong / hạn chế
- `[MÁY]` (cảnh máy 3D) chưa có trong giao diện v3: chỉ hiện ảnh tĩnh nếu có.
- Mô hình PubChem và ảnh PMC của D008-v3 chưa kiểm được vì bị chặn trên máy này; kiểm 3D bằng phân tử giả.
- Bản đồ khái niệm xếp theo tầng đơn giản: bản đồ dày có thể có đường cắt nhau; luôn có danh sách quan hệ dạng chữ để thay thế.
- Chưa cập nhật `huong-dan/cu-phap-album.md` cho cú pháp v3.
- Chưa kiểm bằng trình đọc màn hình thật; `aria`/`title`/`desc` đã có.
- Đo "chữ/dòng" trung bình ở 1280/1600 là 62; vài đoạn ngắn cho số trung bình thấp hơn 55 (ví dụ dòng cuối ngắn).

## 6. Lựa chọn tự quyết
1. Template mới là `templates/album-v3.html`; `album-v2.html` giữ nguyên cho bài chỉ dùng thẻ v2 cũ.
2. `--nghiem` không còn "ép mọi bài dùng v2". Nó chỉ kiểm bài v3; bài cũ vẫn dựng như trước và được báo "bỏ qua kiểm nghiêm".
3. "Hình" khi đếm `> 1 hình/cảnh` là `[HÌNH]/[3D]/[MÁY]`; `[SỐ LIỆU]` và `[BẢN ĐỒ]` tính riêng (nếu tính thì cảnh 4.1 cũng vi phạm).
4. Các thẻ `[VÍ DỤ GIẢI]`, `[TỰ GIẢI THÍCH]`, `[QUIZ]`, `[TÓM]` nằm sau cảnh cuối của chương được gom thành "phần luyện tập" cuối chương, đúng thứ tự khung mục 4.
5. Màu nhấn CNTP: cam `#E8A04A` (tối) / `#8F5200` (sáng) để đạt AA; R&D xanh dương như trang mẫu.
6. Thêm cờ `--assets=DIR` để dựng thử không ghi hình vào `assets/bai/` của repo.
7. Không nhúng font web (trang mẫu dùng "Segoe UI"/system-ui) để trang nhẹ: bản D008-v3 bài thường 112 KB.

Chờ Hoàng duyệt trước khi commit/push.

---

## 7. Mô phỏng và thuật ngữ (bước 3 của mục 13, khung phần 2)
Làm đúng mục 11 và 12 của `docs-v3/khung-album-v3-phan-2.md`, không làm gì ngoài đó. Không commit, không push, không đụng workflow (vẫn `disabled_manually`).

### Đã xong
- **`[MÔ PHỎNG: <id> | kiểu: … | chỗ | khẳng định | chức năng | nhìn]` … `[/MÔ PHỎNG]`** (cú pháp 11.3) với hai kiểu **thanh-trượt** và **dự-đoán**. Các dòng `- dự đoán / biến / chọn / hằng / tính / ra / ngưỡng / nguồn / giới hạn` được đọc đủ. Thiếu `khẳng định`, `chức năng`, `nguồn` hoặc `giới hạn` thì cảnh báo kèm số dòng và không hiện mô phỏng. Kiểu tháo-lắp, bỏ-vào-máy, sắp-xếp, tính-thử (và kiểu lạ) chỉ báo "kiểu … chưa hỗ trợ", không làm.
- **Bộ tính biểu thức tự viết** (`parseExpr`/`evalAst`): chỉ số, tên biến, `+ - * / ^`, ngoặc, `ln exp min max sqrt`. Không dùng `eval` hay `new Function`. Công thức được dựng thành cây cú pháp lúc build, trang chỉ duyệt cây. Biến chưa khai báo, hàm hoặc ký tự lạ bị từ chối lúc build.
- **Hành vi mô phỏng** (theo `mo-phong-aw-thu.html`): dự đoán trước, rồi thanh trượt; chọn A/B (giới hạn trượt riêng từng lựa chọn); bảng "Tính từng bước"; so sánh các lựa chọn ở cùng giá trị; đối chiếu ngưỡng "còn" (thanh đặc) hoặc "dừng" (viền rỗng + chữ), có bảng thay thế đồ thị; khối Giới hạn và Nguồn luôn hiện. Chuyển động chỉ khi bấm hoặc kéo, không animation.
- **`{{chữ|tên chuẩn}}`**: ghép với Mã, Tên, Tên khác (không phân biệt hoa thường, bỏ dấu). Bấm hoặc Enter mở khung trượt bên phải (điện thoại: khung dưới đáy), có tên Việt/Anh, ký hiệu, định nghĩa ngắn, công thức, nguồn, "Xuất hiện ở", nút "Mở trang đầy đủ"; Esc hoặc nút Đóng thoát và trả tiêu điểm. Chưa có trang thì hiện như chữ thường.
- **Kho `tu-dien/`**: `tu-dien/*.md` → `tu-dien/<mã>.html` và `tu-dien/index.html` (tra theo chữ cái). "Xuất hiện ở" tự quét mọi album (ghi cả chương). Thư mục lấy từ `tu-dien/` của repo hoặc cờ `--tu-dien=DIR`. Không có kho thì không sinh gì.
- **`--nghiem` thêm** (11.5): mô phỏng thiếu khẳng định/chức năng/nguồn/giới hạn; id hoặc khẳng định trùng (giữa các bài và mục "Mô phỏng đã dùng" của `hinh-da-dung.md`, bỏ qua dòng của chính bài); công thức ngoài danh sách; Cảnh quá 1 hình (tính cả mô phỏng); kiểu chưa hỗ trợ. (12.3): thuật ngữ đánh dấu mà chưa có trang; trang thiếu `Ngắn` hoặc `Nguồn`; trùng Mã hoặc Tên khác; `{{…}}` trong tiêu đề hoặc `[TÓM]`.

### Kết quả thử
- **Mẫu thử** (nằm ở `_preview/v3b/src/`, ngoài các thư mục thật): đoạn D008 có `[MÔ PHỎNG: aw-raoult | thanh-trượt]`, một mô phỏng `dự-đoán` (aw-salmonella) và 6 trang thuật ngữ mẫu. `--nghiem`: bài **ĐẠT**, kho thuật ngữ **ĐẠT**.
- **Số liệu mô phỏng** (kiểm bằng trình duyệt): đường 10% → aw 0,994; muối 10% → 0,936; muối 26% (mức tối đa) → 0,822 và không nhóm vi sinh nào "còn"; đường 40% → 0,966 (khớp ví dụ 0,966 trong D008). Thanh trượt của muối bị chặn ở 26. Trước khi đoán thì phần tính ẩn. Dự đoán sai cho "Chưa đúng. Đáp án: …", đúng cho "Đúng. …".
- **Khung trượt**: mở bằng Enter, tiêu đề đúng, có "Xuất hiện ở", liên kết trang đầy đủ đúng; Esc đóng và tiêu điểm về đúng thuật ngữ.
- **Bài cố ý sai** (`_preview/v3b/src/loi/`): 14 lỗi đều bị bắt (công thức `**`, hàm `eval`, biến chưa khai báo, thiếu giới hạn/tính/ra, id trùng với `hinh-da-dung.md`, kiểu tháo-lắp, `{{}}` trong tiêu đề và `[TÓM]`, thuật ngữ chưa có trang, 2 hình/Cảnh). Kho thuật ngữ sai: bắt trùng Mã, thiếu Ngắn, thiếu Nguồn, trùng Tên khác.
- **Playwright** (14 trang/lượt, sáng + tối): 

| Cỡ | AA (lỗi) | Animation | Cuộn ngang | Vùng bấm < 44px | Lỗi JS |
|---|---|---|---|---|---|
| 1280 | 0 | 0 | không | 0 | 0 |
| 1600 | 0 | 0 | không | 0 | 0 |
| 390 | 0 | 0 | không | 0 | 0 |

  Lần đầu có 1 trang thuật ngữ cuộn ngang ở 390 px do URL dài; đã sửa bằng `overflow-wrap`.
- **Ảnh chụp** (`D:\Git\hoc-hom-nay\_preview\v3b\anh-chup\`, mỗi cỡ 1280/1600/390; 390 có cả bản sáng): `10-mo-phong-thanh-truot`, `11-mo-phong-muoi-22`, `12-mo-phong-du-doan`, `13-khung-truot-thuat-ngu`, `14-trang-thuat-ngu`, `15-chi-muc-thuat-ngu`; số liệu: `ket-qua-kiem2.json`. Bản dựng: `_preview/v3b/site/`.
- **Album cũ dựng lại, so mã băm**: 9 bài + trang chủ + `danh-sach.json`, bản thường và `tai-ve`: **20/20 tệp trùng mã băm** với bản dựng bằng bộ dựng trước v3, không tệp thừa. D008-album-v3 đầy đủ vẫn ra đúng 3 lỗi `--nghiem` cũ.

### Hạn chế và tự quyết
- `chỗ:` của mô phỏng được đọc nhưng bỏ qua: mô phỏng luôn hiện rộng hết bề ngang dưới khối ý (hai cột trong cột hình hẹp quá chật).
- "Xuất hiện ở" trong trang `tu-dien/` và khung trượt dùng liên kết `../bai/<trang>#/c<N>`. Bản `tai-ve/` (offline) giữ khung trượt nhưng nút "Mở trang đầy đủ" cần có thư mục `tu-dien/` bên cạnh.
- Trang chủ `index.html` chưa có liên kết sang `tu-dien/` (giữ nguyên để mã băm album cũ không đổi).
- Trang `tu-dien/` dùng CSS riêng (cùng bảng màu); chưa có thanh tìm kiếm chữ.
- Vùng bấm của `{{…}}` trong dòng chữ là liên kết nội dòng (miễn trừ 44px theo quy tắc liên kết trong đoạn văn); các nút và nút "Mở trang đầy đủ" đều ≥ 44px.
- `--tu-dien=` và `--assets=` chỉ để dựng thử; kho thật là `tu-dien/` trong repo (chưa tồn tại). Chưa quyết cách đưa từ Drive, theo khung mục 12.3.
- 6 trang thuật ngữ và đoạn D008 thử là **mẫu để thử bộ dựng**, không phải nội dung chính thức; chưa chép vào `tu-dien/` hay `bai/`.
- Không sửa `hinh-da-dung.md`; mục "Mô phỏng đã dùng" vẫn ghi `aw-raoult` là "chưa vào bài".

Chờ Hoàng duyệt trước khi commit/push.


---

## 8. Kiểu `hạt` và `hoạt-hình`, nhãn của biến, dựng D008-album-v3 đầy đủ (mục 11.6)
Làm đúng mục 11.6 của `docs-v3/khung-album-v3-phan-2.md` và mẫu `hoat-hinh-aw-thu.html`. Không commit, không push, không đụng workflow (vẫn `disabled_manually`).

### Đã xong
- **`kiểu: hạt`**: đọc `- vùng: <tên> | hạt: <số> | nền: …`, `- ranh giới: qua lại|chặn`, `- đo: <nhãn> = số hạt trong vùng / <số>`, `- giai đoạn: đầu|chuyển|cân bằng | chữ: …` (như bài D008 mới dùng). Hạt chuyển động ngẫu nhiên theo vùng (hạt giống cố định); mặc định **đứng yên**, chỉ chạy khi bấm. Có Chạy/Tạm dừng, Một bước, Làm lại, tốc độ; chữ chú thích đổi theo trạng thái (đầu, đang chuyển, cân bằng) và nằm ngay dưới hình; bảng "Số liệu đang đếm" (số đo từng vùng, số lần hạt đi qua mỗi chiều, dòng thuần). Điện thoại xếp các vùng theo chiều dọc; đổi bố cục giữa chừng thì giữ nguyên trạng thái (hạt lưu tọa độ tương đối trong vùng). `prefers-reduced-motion`: ẩn nút Chạy, chỉ chạy từng bước. Có `title`/`desc`, màu theo biến giao diện, vùng "nền" phân biệt bằng nền và tên vùng.
- **`kiểu: hoạt-hình`**: đọc `- hình: hoat-hinh/<id>.svg` (tìm cạnh file bài, trong `assets/bai/<mã bài>/`, ở gốc repo) và `- bước: n | chữ: … | vì sao: …`. Nhúng SVG đã làm sạch; mỗi bước là nhóm `<g data-buoc="n">` (hiện dồn từ bước 1 đến bước n); SMIL dừng sẵn, chỉ chạy khi bấm; có Chạy/Tạm dừng (tự sang bước kế rồi dừng ở bước cuối), Bước trước/Bước tiếp, Làm lại, tốc độ; chú thích bước và danh sách các bước dạng chữ luôn hiện.
- **`biến` nhận `nhãn:`**: nhãn hiện làm tên thanh trượt (D008: "Khối lượng chất tan trong 100 g dung dịch: 10 %"); không có nhãn thì dùng tên biến.
- **`--nghiem` thêm (cuối mục 11.6)**: `hoạt-hình` thiếu file SVG; `data-buoc` không khớp các dòng `bước`; SVG thiếu `<title>` hoặc `<desc>`; SVG có script, `onXxx`, liên kết ngoài hoặc `foreignObject`; có `autoplay` hoặc lặp vô hạn (`repeatCount`/`repeatDur="indefinite"`, `animation-iteration-count: infinite`); thiếu khẳng định/nguồn/giới hạn. Với `hạt`: cần ≥ 2 vùng, `hạt` là số nguyên 0–300 (tổng ≤ 400), `ranh giới`, `đo`, `giai đoạn` đúng dạng.

### Kết quả
- **`--nghiem` trên `docs-v3/D008-album-v3.md` + kho `docs-v3/tu-dien/` (18 trang): bài ĐẠT, kho thuật ngữ ĐẠT.** Còn một cảnh báo khi dựng (không phải lỗi `--nghiem`): ảnh Hình 2 của Małecki 2022 (dòng 375) không tải được từ PMC, chỉ hiện liên kết nguồn, không vẽ thay.
- **Hành vi** (trình duyệt): hạt lúc đầu aw 0,80 và 0,30, mọi bộ đếm bằng 0, đang dừng; sau 2,5 giây chạy aw ≈ 0,68 và 0,42, dòng thuần +12 vào bánh (nhiều lần vào hơn lần ra); Làm lại về 0,80/0 ; 0 animation CSS. Hoạt-hình thử: lúc đầu chỉ nhóm 1 hiện và SMIL đang dừng; Bước tiếp/Bước trước đúng; Chạy tự sang bước 3 rồi dừng. Thanh trượt của D008 có nhãn đúng và cho aw 0,994 (đường 10%).
- **Bài cố ý sai** (`_preview/v3c/src/loi/`): bắt đủ SVG thiếu title/desc, có script, liên kết ngoài, lặp vô hạn, `data-buoc` lệch; thiếu file SVG; hạt chỉ 1 vùng, `ranh giới`, `đo`, `giai đoạn` sai; thiếu giới hạn.
- **Playwright** (39 trang/lượt, sáng + tối): 

| Cỡ | AA (lỗi) | Animation | Cuộn ngang | Vùng bấm < 44px | Lỗi JS |
|---|---|---|---|---|---|
| 1280 | 0 | 0 | không | 0 | 0 |
| 1600 | 0 | 0 | không | 0 | 0 |
| 390 | 0 | 0 | không | 0 | 0 |

  39 trang gồm cả 29 bước của D008 (hai mô phỏng: thanh-trượt kèm dự-đoán, và hạt), khung trượt thuật ngữ, trang thuật ngữ và hoạt-hình thử.
- **Lỗi tìm ra khi thử, đã sửa**: khung nhìn đổi (ví dụ chụp toàn trang) làm mô phỏng hạt tự làm lại từ đầu; nay giữ nguyên trạng thái.
- **Ảnh chụp** (`D:\Git\hoc-hom-nay\_preview\v3c\anh-chup\`, mỗi cỡ 1280/1600/390; 390 có cả bản sáng): `20-d008-hat-sau-khi-chay`, `21-d008-hat-ban-dau`, `22-d008-thanh-truot-nhan`, `23-d008-khung-thuat-ngu`, `24-hoat-hinh-buoc-2`, `25-trang-thuat-ngu-index`; số liệu: `ket-qua-kiem3.json`. Bản dựng D008: `_preview/v3c/site/`; bài thử hoạt-hình: `_preview/v3c/site-hh/`.
- **Album cũ dựng lại, so mã băm**: 9 bài + trang chủ + `danh-sach.json`, bản thường và `tai-ve`: **20/20 tệp trùng mã băm**, không tệp thừa.

### Hạn chế và tự quyết
- Hoạt-hình **hiện dồn** (bước n hiện mọi nhóm có `data-buoc` ≤ n); nếu soạn bài muốn mỗi bước thay hẳn hình trước, cần quy ước thêm. File SVG hoạt-hình chỉ có bản thử ngắn (`enzyme-cat.svg`, nội dung minh họa, chưa phải bài chính thức); `docs-v3` chưa có SVG hoạt-hình thật.
- SMIL chỉ được dừng/chạy bằng `pauseAnimations`; hoạt hình viết bằng CSS bị tạm dừng bằng `animation-play-state` khi chưa bấm Chạy (bộ kiểm Playwright vẫn tính chúng là animation nếu có).
- Giai đoạn "cân bằng" của hạt được xét khi chênh lệch số hạt giữa các vùng ≤ 9% tổng (tối thiểu 4 hạt), tương tự mẫu thử; với `ranh giới: chặn` không bao giờ coi là cân bằng.
- Chỉ đếm hạt đổi vùng giữa các vùng kề nhau (và bước nhảy bất kỳ giữa hai vùng).
- Ảnh PMC (Hình 2 Małecki) vẫn chưa tải được trên máy này; cần soạn bài thay nguồn hoặc đưa file ảnh vào `assets/bai/`.
- `docs-v3-day-du.zip` ở gốc repo là file có sẵn của Hoàng, tôi không đụng.

Chờ Hoàng duyệt trước khi commit/push.