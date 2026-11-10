# KHUNG ALBUM v3: một khung cho mọi bài (R&D Food Lab và Bàn học CNTP)
Ngày 08/11/2026. File này thắng `dac-ta-album-v2-khoa-hoc-hoc-tap.md` và `quy-tac-chat-luong-album.md` nếu mâu thuẫn. Giao diện chuẩn nằm ở trang mẫu `khung-album-mau.html` (đã duyệt bằng mắt trước khi dựng thật).

Hai bên cùng theo file này:
- Bên soạn bài (Claude trên cloud): viết `.md` đúng khung, đúng cú pháp thẻ ở mục 7.
- Bên dựng (Claude Code trên máy Hoàng): sửa `build-album.mjs` và `templates/` theo mục 6, 7, 8.

## 1. Chẩn đoán album đang online (D008, đọc từ HTML công khai 08/11/2026)
- 60 slide, trong đó 46 "bảng phấn" cùng một khuôn, 138 bước hiện dần: mỗi cảnh trông như nhau nên không có chỗ nào để nhớ ("khó nhớ").
- 40 hình SVG tự vẽ chen vào, 9 ảnh thật. Hình tự vẽ chiếm đa số nên nhiều hình không đi kèm một khẳng định cụ thể.
- Một giao diện "kính 3D" (một vật thể 3D) dùng chung cho mọi bài, tức là cùng một hình lặp ở mọi chủ đề.
- Không có thanh mục lục cố định, không có chỉ báo "đang ở chương nào", không có hộp câu hỏi trong bài.
- Điểm tốt cần giữ: trang chỉ mục (nền xanh đậm, thẻ màu theo loại), ảnh thật có ghi nguồn và giấy phép.

## 2. Bằng chứng → quyết định thiết kế
Đã mở đọc phần tóm tắt/abstract các nguồn dưới đây trong phiên này, trừ chỗ ghi khác. Phần lớn nghiên cứu là bài học ngắn trong phòng thí nghiệm; đây là chỗ suy ra cho album, không phải bằng chứng trực tiếp trên sinh viên công nghệ thực phẩm.

| Phát hiện | Nguồn | Quyết định |
|---|---|---|
| Bộ nhớ làm việc giữ khoảng 4 mẩu thông tin (3–5), không phải 7 | Cowan 2001, Behav Brain Sci 24:87; Cowan 2010 | Mỗi chương tối đa 4 khối ý; mỗi khối ý một khẳng định |
| Tự kiểm tra và ôn rải là hai kỹ thuật hiệu quả cao; đọc lại, tô đậm hiệu quả thấp | Dunlosky 2013 | Mỗi chương có câu hỏi mở đầu, tự giải thích, quiz; mỗi bài có phần Nhớ lại và lịch ôn |
| Ôn rải ở lớp học thật: d = 0,54 (22 báo cáo, 31 hiệu ứng) | Mawson & Kang 2025, Behav Sci | Phần Nhớ lại đầu bài lấy câu từ 2 bài gần nhất; lịch ôn 1, 3, 7, 21 ngày |
| Chi tiết hấp dẫn nhưng không liên quan làm giảm học (Mayer 2008); hình trang trí tăng tải nhận thức theo EEG nhưng không luôn thay đổi điểm (Scharinger 2024) | Mayer, Griffith et al. 2008; Rey 2012; Scharinger 2024; Tislar & Steelman 2021 | Cấm hình trang trí, nền động, vật thể 3D lặp. Kết quả không thống nhất, nhưng không có lý do giữ nhiễu |
| Hình sai cơ chế làm giảm suy luận của người học, một phần qua tăng tải nhận thức | Zhang et al. 2026, Front Psychol | Mỗi hình phải được kiểm đúng cơ chế trước khi gắn thẻ |
| Gợi ý trực quan (cue) giúp: nhớ d = 0,27; vận dụng d = 0,34 | Xie et al. 2017, PLoS ONE | Mỗi hình có đúng một dấu chỉ "nhìn vào đâu" |
| Tổng hợp 40 nghiên cứu: gợi ý thị giác g = 0,26; gộp nhiều loại gợi ý lại có hiệu ứng âm (g = −0,64, bối cảnh video trực tuyến) | Ma et al. 2026, Front Psychol | Một hình chỉ một kiểu gợi ý; không chồng mũi tên, màu, viền, chữ nhấp nháy |
| Hình tĩnh có chú thích giảm xử lý thừa so với hoạt hình có lời kể | Mayer, Hegarty, Mayer & Campbell 2005 | Ưu tiên hình tĩnh có chú thích; chỉ dựng từng bước khi người học bấm |
| Đặt chữ sát hình giúp tích hợp chữ và hình (hiệu ứng spatial contiguity) | Johnson & Mayer 2012; Castro-Alonso et al. 2021 | Hai cột: chữ trái, hình phải ngay cạnh đoạn đang nói; trên điện thoại hình đặt ngay sau đoạn |
| Viết giải thích trong lúc dừng giữa bài học đa phương tiện có lợi | Lawson & Mayer 2021 | Có mục "Tự giải thích" ở mỗi chương |
| Xếp chồng "chia đoạn do người học điều khiển + gợi ý" tăng mức tương tác (thời gian xem, số lần làm quiz), không tăng điểm quiz | Doherty 2022, PLoS ONE | Giữ chia đoạn vì dễ theo dõi, nhưng không coi đó là thứ làm tăng điểm; sức nặng nằm ở nội dung và câu hỏi |
| Khi nội dung và cách dạy đã tốt, định dạng đa phương tiện (nhiều/ít hình) có thể không đổi kết quả (một thí nghiệm, 129 người) | Schmidt et al. 2025, Front Psychol | Dành công sức cho giảng giải và câu hỏi trước, hình ảnh sau. Hình ít nhưng đúng |
| Hình thực tế không nhất thiết gây hại; sơ đồ trừu tượng không phải lúc nào cũng dễ hơn | Skulmowski 2024 | Dùng ảnh thật khi cần nhận ra vật thật; dùng sơ đồ khi cần thấy quan hệ |
| Loại hình phải hợp trình độ: người mới dựa nhiều vào hình mô tả (representational), người giỏi hưởng lợi từ hình giải thích và hình tổ chức | Qiu et al. 2026, Front Psychol (đọc tiếng Trung khoa học) | Hoàng đang học nền tảng: ưu tiên ảnh/sơ đồ mô tả rõ, thêm sơ đồ tổ chức (bản đồ khái niệm) ở cuối chương |
| Phân loại chức năng hình minh họa: trang trí, mô tả, tổ chức, diễn giải, biến đổi | Levin, Anglin & Carney 1987 (kiến thức nền; chưa mở lại bản gốc trong phiên này) | Mỗi hình khai báo chức năng; chức năng "trang trí" bị loại |

## 3. Khung một bài (giống nhau ở mọi album)
```
Bìa            Câu hỏi thật + 3 mục tiêu ("sau bài này bạn tự làm được…") + thời lượng
Nhớ lại        3 câu hỏi từ 2 bài gần nhất (chưa xem đáp án thì tự trả lời)
Bản đồ bài     Danh sách chương (mục lục cố định bên trái)
Chương 1..N    xem mục 4
Bản đồ khái niệm   sơ đồ nối các khái niệm của cả bài ([BẢN ĐỒ])
Ôn rải         8–12 câu trộn chương + bài trước, lịch ôn 1/3/7/21 ngày
Từ điển · Nguồn · Cần kiểm tra lại · verified
```

## 4. Khung một chương (đơn vị học 8–12 phút)
Thứ tự cố định:
1. Đoán trước: một câu hỏi thực tế, bấm để xem gợi ý và đáp án (`[HỎI TRƯỚC]`).
2. Khối ý × 1 đến 4 (mục 5). Chia chương mới nếu cần quá 4 khối ý.
3. Ví dụ có lời giải: từng bước kèm "vì sao", sau đó một bài điền chỗ trống và một bài tự làm (`[VÍ DỤ GIẢI]`).
4. Tự giải thích: "Hãy tự nói vì sao…" kèm đáp án ẩn (`[TỰ GIẢI THÍCH]`).
5. Tự kiểm tra: 3–5 câu, đáp án kèm lý do vì sao các phương án sai (`[QUIZ]`).
6. Chương này bạn nhớ: đúng 3 gạch đầu dòng (`[TÓM]`).

## 5. Khối ý (đơn vị nhỏ nhất, mỗi Cảnh là một khối ý)
- Tiêu đề là một câu khẳng định đầy đủ ("Hoạt độ nước là tỉ số…"), không phải nhãn ("Định nghĩa aw").
- Thẻ vai trò, đúng 5 loại và mỗi loại một màu cố định: Định nghĩa (xanh dương), Cơ chế (xanh lá), Ví dụ số (vàng), Hiểu sai thường gặp (cam đỏ), Tự kiểm tra (tím). Màu chỉ mang nghĩa vai trò, không trang trí.
- Thân: tối đa 3 đoạn, mỗi đoạn tối đa 4 câu. Thuật ngữ mới định nghĩa ngay lần đầu.
- Đúng 1 dòng "Nhớ:" (câu hoặc công thức cần thuộc), thay cho "Chữ trên bảng".
- Tối đa 1 hình, hoặc không có hình nếu hình không giải thích được ý.

## 6. Hình ảnh: một hình một khẳng định
1. Mỗi hình khai báo: khẳng định nó chứng minh (một câu), chức năng (mô tả, tổ chức, giải thích, biến đổi), nguồn đã mở, giấy phép, và "nhìn vào đâu". Thiếu một mục thì không dựng.
2. Chọn loại theo điều cần thấy: vật thật cần nhận ra → ảnh thật; quan hệ hay cơ chế → sơ đồ; số liệu → đồ thị có trục, đơn vị, nguồn; cấu trúc phân tử → 3D (bấm mới tải, mặc định tĩnh).
3. Phép thử "che chú thích": che chú thích đi, hình còn nói được khẳng định không? Không thì bỏ hình.
4. Không trùng: mỗi hình (theo url nguồn hoặc mã băm) chỉ xuất hiện một lần trong toàn bộ các album. Soạn bài đọc `rd-food-lab/hinh-da-dung.md` trước khi tìm hình và ghi thêm hình mới vào đó sau khi dùng. Bộ dựng chạy thêm kiểm tra trùng và báo lỗi nếu hai bài dùng cùng hình.
5. Một chương tối đa 3–4 hình. Nếu cả chương không có hình giải thích được thì không có hình.
6. Cấm: nền trang trí, vật thể 3D lặp, hạt/bong bóng chuyển động, thẻ mờ (glass), hộp ba ô chữ chung chung, hình AI không rõ nguồn, hình đẹp nhưng sai cơ chế.
7. Sơ đồ tự vẽ chỉ khi có cơ chế hoặc số thật; vẽ SVG tĩnh có `title` và `desc`; mỗi hình một kiểu gợi ý duy nhất.

## 7. Cú pháp `.md` (đã thống nhất với Claude Code ngày 04/11; phần in đậm là bổ sung)
Cấu trúc: `# Tiêu đề`, `## Chương N – tên`, `### Cảnh N.M – <câu khẳng định đầy đủ>`.
- `[HỎI TRƯỚC: câu hỏi | đáp: ngắn | vì sao: giải thích]`
- `[TỰ GIẢI THÍCH: Hãy tự nói vì sao… | đáp: …]`
- `[VÍ DỤ GIẢI] … [/VÍ DỤ GIẢI]` với các dòng `- Bước k: việc | vì sao: lý do`, `- Bỏ trống: … | đáp: …`, `- Tự làm: đề | đáp: …`
- `[QUIZ] … [/QUIZ]`: `1. câu`, `  - A) …`, `  - đáp: B`, `  - vì sao: …; sai A: …`; tự luận: `1. [TỰ LUẬN] câu | mẫu: …`
- `[ÔN RẢI: lịch: 1,3,7,21] … [/ÔN RẢI]`: `1. câu | từ: D008-C2 | đáp: …`
- `[SỐ LIỆU: tên | loại: đường | x: aw | y: % đơn vị | nguồn: url]` rồi bảng markdown `| x | y |`
- **`[TÓM: ý 1 | ý 2 | ý 3]`** (đúng 3 ý, cuối mỗi chương)
- **`[NHỚ LẠI] 1. câu | từ: D007-C3 | đáp: … [/NHỚ LẠI]`** (đầu bài)
- **`[BẢN ĐỒ] khái niệm A --quan hệ--> khái niệm B [/BẢN ĐỒ]`** (mỗi dòng một cạnh; bộ dựng vẽ sơ đồ nút–mũi tên đơn sắc, đây là sơ đồ tổ chức thật chứ không phải thẻ chữ)
- **`[HÌNH: url | file | loại | chỗ | … | khẳng định: <câu> | chức năng: mô tả/tổ chức/giải thích/biến đổi | nhìn: <đâu>]`** và tương tự cho `[3D: …]`. Thiếu `khẳng định` hoặc `chức năng` thì bộ dựng cảnh báo và không hiện hình.
- Dòng `- Nhớ: …` mỗi Cảnh (thay "Chữ trên bảng").
- Thẻ không biết thì hiện như chữ thường, album cũ dựng được như trước.

## 8. Giao diện và bộ dựng (Claude Code)
Chuẩn là `khung-album-mau.html`: dùng nguyên các biến màu, kích thước và bố cục trong đó.
1. Nền trơn theo hai biến sáng/tối (mặc định theo hệ thống), một màu nhấn theo loại (R&D xanh dương, CNTP cam). Không animation nền, không glass, không vật thể 3D chung, không nền lặp.
2. Cột chữ khoảng 60–75 ký tự/dòng, cỡ chữ ≥ 18px, giãn dòng ≥ 1,6. Hình rộng không quá 50% màn hình.
3. Máy tính: mục lục cố định trái; hai cột chữ trái, hình phải (sticky trong lúc đọc khối ý). Điện thoại: một cột, hình ngay sau đoạn.
4. Hai chế độ xem: "Từng ý" (một khối ý một lúc, nút Ý trước/Ý tiếp theo, phím mũi tên) và "Cả chương" (cuộn). Mặc định: Từng ý.
5. Đầu mỗi chương: dòng "Chương x/N · Ý y/4 · khoảng z phút" và thanh tiến độ.
6. Hộp tương tác: đáp án ẩn bấm hiện; quiz tự chấm kèm lý do; lưu kết quả bằng localStorage (bọc try/catch, trang vẫn chạy khi không lưu được); mục "Cần ôn lại" theo lịch 1, 3, 7, 21 ngày.
7. 3Dmol.js chỉ tải khi bấm "Xem 3D"; có nút xoay/dừng; mặc định tĩnh.
8. Đồ thị: SVG hoặc Chart.js từ `[SỐ LIỆU]`, có trục, đơn vị, nguồn, bảng số thay thế cho người đọc màn hình.
9. Bản đồ khái niệm: dựng từ `[BẢN ĐỒ]`, đơn sắc, chữ trong nút.
10. Không tự vẽ thẻ dự phòng cho hình thiếu: bỏ qua và ghi cảnh báo kèm số dòng.
11. Truy cập: tương phản AA (kiểm tự động), `alt`/`title`/`desc` đầy đủ, vùng bấm ≥ 44px, `prefers-reduced-motion`, không phụ thuộc màu để phân biệt vai trò (thẻ có chữ).
12. Kiểm tra tự động khi dựng (cờ `--nghiem`): trùng hình giữa các bài; hình thiếu khẳng định/chức năng; chương > 4 khối ý; khối ý > 3 đoạn; Cảnh có > 1 hình; tiêu đề Cảnh không phải câu khẳng định (dưới 5 từ); chương thiếu `[TÓM]`/`[QUIZ]`; chữ/dòng ngoài 55–80.

## 9. Kiểm tra bằng mắt (người duyệt, cho mỗi bài)
- Đọc riêng các tiêu đề Cảnh theo thứ tự: có kể được cả bài như một chuỗi lập luận không?
- Mỗi hình: che chú thích, còn nói được khẳng định không?
- Không có hình nào xuất hiện ở bài khác.
- Mở bằng điện thoại: không cuộn ngang, hình ngay sau đoạn.
- Số liệu và hình đối chiếu lại nguồn đã mở (bài soạn có dòng `verified`).

## 10. Thứ tự làm (để Claude Code không phải làm lại)
1. Hoàng duyệt trang mẫu (bố cục, màu, thẻ vai trò).
2. Claude Code làm một mạch theo mục 7 và 8, dựng vào thư mục tạm, không commit, không push; ghi `BAO-CAO-DUNG-ALBUM.md`.
3. Claude (cloud) viết lại D008 làm bài mẫu theo mục 3–7, tải lên Drive; Claude Code dựng thử và chụp màn hình ở 1280, 1600 và 390 px.
4. Hoàng duyệt bài mẫu; sau đó mới push.
5. Cập nhật lời dặn hai tác vụ tự động theo file này rồi bật lại.
6. Viết lại D006 (tạo `D006-album.md` từ kịch bản), D007, D009, D010, CNTP-Ngay01–04 theo khung, tải lên Drive.
