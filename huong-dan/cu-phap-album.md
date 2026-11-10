# Cú pháp file `*-album.md`

Hướng dẫn viết bài cho bộ dựng `build-album.mjs`. Thư mục `huong-dan/` không được dựng thành trang.
File bài đặt trong `bai/`, tên kết thúc bằng `-album.md`.

## Tên file và loại bài
- `CNTP-…-album.md` → nhãn **Bàn học CNTP** (cam).
- `D0…-album.md` → nhãn **R&D Food Lab** (xanh dương).
- Ngày học lấy từ tên file (`…_2026-11-03_…`) hoặc dòng `Ngày: 03/11/2026` ở đầu bài.

## Khung bài
```markdown
# Mã · Môn – Chủ đề bài

## Chương 1 – Tên chương
*Dòng nghiêng đầu chương: thời gian, lý do (tùy chọn)*

### Cảnh 1.1 – Tên cảnh
- **Câu mở:** câu hỏi gợi mở
- **Ý 1:** nội dung ý thứ nhất
- **Ý 2:** nội dung ý thứ hai
- **Thẻ nguồn:** Tác giả, năm, trang
```
Ý viết gạch đầu dòng thường (`- nội dung`) cũng được, mỗi gạch là một bước.

## Chữ trên bảng
Các dòng ngắn hiện trên bảng cạnh hình, dòng mới nhất được tô sáng. Được gắn vào **ý đứng ngay trước nó**, hiện ra khi đọc tới ý đó. Viết kiểu nào cũng được:

**Một dòng**, tách các dòng bảng bằng ` / `:
```markdown
- **Ý 1:** Ly tâm dùng lực ly tâm để phân riêng…
  - Chữ trên bảng: Ly tâm: phân riêng / Động lực: lực ly tâm
```
```markdown
- **Chữ trên bảng:** F = m·R·ω² / Lực tỷ lệ với ω²
```

**Xuống dòng**: đầu mục `Chữ trên bảng:` để trống, các dòng ngay bên dưới (thụt vào, gạch đầu dòng hoặc dòng thường) là chữ trên bảng, tới **dòng trống** thì hết:
```markdown
Chữ trên bảng:
Nước + nhóm phân cực (–OH, ion) → bị giữ
Giữ càng chặt → càng khó ép, khó sấy
```
```markdown
- **Chữ trên bảng:**
  - Ép → nước tự do
  - Sấy lâu mới ra → nước liên kết
```
Khối "xuống dòng" cũng dừng ở tiêu đề `#`, dòng hình `[HÌNH: …]`/`[3D: …]`, hoặc một gạch đầu dòng có nhãn in đậm (`- **Ý 2:** …`).

## Vật thể kính 3D của chương
Mỗi bìa chương có một vật thể thủy tinh xoay nhẹ, chọn **tự động theo tên chương** (ưu tiên từ trên xuống):

| Từ khóa trong tên chương | Vật thể |
|---|---|
| quy trình | bánh răng |
| vi sinh, vi khuẩn, tế bào, nấm men, lên men, lactic… | tế bào |
| sữa, nhũ tương, kem, béo, whey, casein, ly tâm… | giọt sữa |
| chất lượng, ISO, HACCP, an toàn, quản lý | khiên (có dấu tích) |
| phân tử, protein, enzyme, độ ẩm, trích ly, membrane… | phân tử |

Tên chương **không khớp** từ khóa nào → chương đó **không có vật thể**, chỉ giữ nền kính.

**Ghi đè** bằng một dòng nghiêng đặt ở bất kỳ đâu trong chương (thường ngay dưới tiêu đề chương):
```markdown
## Chương 3 – Mở đầu môn học
*Vật thể: bánh răng*
```
Giá trị được dùng (viết có dấu hay không dấu đều được):
`giọt sữa` · `tế bào` · `phân tử` · `khiên` · `bánh răng` · `không` (tắt vật thể dù tên chương khớp từ khóa).
Dòng ghi đè không hiện ra trong bài. Viết sai giá trị thì bộ dựng báo trong log và quay về chọn tự động.

Tông màu nền: chương có chữ chất lượng/ISO/HACCP/ATTP/kiểm soát/đảm bảo/cải tiến/hoạch định → tím → xanh lá nhạt; còn lại → navy → xanh.
Phân tử: nếu bài có `[3D: PubChem CID …]`, vật thể dùng chính phân tử đó; không có thì là phân tử nước.

## Hình và mô hình 3D
- `[HÌNH: <url trang nguồn> | file gợi ý | loại | chỗ | hiện | cùng ý | nhấn]`: tự tải hình (Wikimedia Commons…), ghi nguồn + giấy phép.
- `[HÌNH: tu-ve <tên>.svg | chỗ | hiện | cùng ý | nhấn]`: hình phấn tự vẽ nếu chưa có file.
- `[3D: PubChem CID 962 | PDB 1CRN | kiểu | hiện | cùng ý | nhấn]`: mô hình phân tử xoay được.
- `cùng ý: 2` gắn hình vào Ý 2. Hình raster và SVG lớn được đổi sang WebP ≤ 1200 px và tải lười.

## Gói phong cách
Một dòng nghiêng **ở đầu bài** (trước chương đầu tiên) chọn phong cách cho cả bài; đặt **trong một chương** thì ghi đè riêng chương đó:
```markdown
# CNTP · Công nghệ chế biến – Tách và cô

*Phong cách: hud*

## Chương 3 – Phân riêng bằng membrane
*Phong cách: ban-ve*
```
| Tên | Trông thế nào |
|---|---|
| `kinh` (mặc định) | kính 3D trên gradient sâu (công nghệ: navy → xanh; chất lượng: tím → xanh lá nhạt) |
| `hud` | nền navy tối, lưới mờ, nhãn A–B–C nối đường chỉ, vòng phóng to |
| `ban-ve` | nền xám đậm, nét trắng mảnh, số đỏ trong chấm tròn nối đường chỉ |
| `mat-cat` | nền nâu ấm, hình cắt ngang (gạch chéo), đường chú thích nét đứt tới biểu đồ |
| `y-hoc` | tông tím/hồng, mũi tên dòng chảy, các giai đoạn xếp dọc nối mũi tên |

Gói áp cho trang bài (màu nền, hạt bụi, khung thẻ, kiểu số, kiểu "chữ trên bảng") **và** cho cảnh máy mở từ chương đó.
Viết `ban ve`, `bản vẽ`, `Mặt cắt`… đều được. Sai tên → bộ dựng báo trong log, giữ phong cách bài.

## Cảnh mô phỏng máy
Một dòng hình đặc biệt, đặt như `[HÌNH: …]` (gạch con dưới một ý, hoặc dòng riêng trong cảnh):
```markdown
- **Ý 3:** Ly tâm đĩa: nhiều đĩa hình nón cụt xếp chồng.
  - [MÁY: ly-tam-dia | nhãn: tất cả | bước: Sữa vào ống nạp giữa; Lên qua lỗ đĩa; Béo vào tâm → cửa ra phần nhẹ | cùng ý: 3]
```
| Phần | Ý nghĩa |
|---|---|
| `<mã-máy>` (bắt buộc, đứng đầu) | tên module `templates/may/<mã>.js` – hiện có: `ly-tam-dia` |
| `nhãn: tất cả` · `nhãn: 1, 3, 5` | hiện nhãn số trên những bộ phận nào (mặc định: tất cả) |
| `bước: a; b; c` | chữ các bước bên trái, **tách bằng dấu `;`** (trong chữ được dùng `→`); bỏ trống → dùng bước mặc định của máy |
| `cùng ý: 3` · `chỗ: trái` | gắn vào ý nào, đặt bên nào – như `[HÌNH: …]` |

Trong bài, khung hình hiện **sơ đồ tĩnh** của máy (`templates/may/<mã>.svg`) + nút **▶ Mở cảnh máy 3D**. Bấm nút mới tải three.js và mở cảnh toàn màn hình.
Không có WebGL hoặc mất mạng → hiện sơ đồ tĩnh kèm lời giải thích. Bản tải về offline nhúng sẵn mọi thứ.

**Điều khiển trong cảnh máy**

| Nút | Phím | Việc |
|---|---|---|
| thanh Ghép – Tách | `T` | tách rời / lắp lại các bộ phận |
| Xuyên thấu | `X` | vỏ trong suốt để nhìn dòng chảy bên trong |
| Chạy / Dừng | `Space` | chạy liên tục |
| Từng bước | `N` | dừng và tiến ¼ giây mô phỏng mỗi lần bấm |
| Tốc độ | `+` `−` | 0,25× – 3× |
| Thả sản phẩm | `D` | thả một mẻ hạt vào cửa nạp |
| Chất lượng: Cao / Vừa | `Q` | Vừa: ít hạt hơn, không SSAO, độ nét thấp hơn |
| Góc nhìn | `R` | đặt lại camera |
| (chuột kéo / cuộn) | `1`–`9` | xoay, phóng camera · chọn bộ phận theo số |
| Đóng | `Esc` | về lại bài |

Chạm vào một bộ phận (hoặc số của nó) → hiện tên + chức năng. Khung hình tụt dưới 30 fps khi đang ở Cao → tự hạ xuống Vừa (bấm `Q` để đổi lại).
`prefers-reduced-motion`: cảnh không tự chạy, camera không trôi; bấm Chạy để xem.

**Thêm một máy mới:** tạo `templates/may/<mã>.js` đăng ký `HHN_MAY_LIB['<mã>'] = function (THREE, ctx) { return { … } }` với:
`ten`, `camera {pos, target}`, `boPhan: [{ so, id, ten, chucNang, obj (THREE.Group), neo [x,y,z] (điểm nhãn), tach [dx,dy,dz], xoay? }]`,
`hat: { sinh(S, i), buoc(S, i, dt, omega) }` (ghi vị trí `S.x/y/z`, màu `S.cr/cg/cb`, độ sáng `S.gl`, cỡ `S.s`; `S.song[i] = 0` khi hạt ra khỏi máy),
`buoc: [{ ten, pha: [số pha], beo?, bp: id bộ phận }]`, tùy chọn `tach(e)`, `tuyen` (đường mũi tên cho gói y-hoc), `trangTri`.
Vật liệu lấy từ `ctx.mat.inox()`, `ctx.mat.kinh()`, `ctx.mat.son(màu)`; mesh vỏ đặt `userData.xuyen = độ mờ` để nút Xuyên thấu làm trong suốt.
Kèm `templates/may/<mã>.svg` làm sơ đồ tĩnh. Mẫu đầy đủ: `templates/may/ly-tam-dia.js`.

## Phần cuối bài (tên mục cố định)
`## Tổng kết` · `## Trắc nghiệm cuối ngày` · `## Đáp án` · `## Đối chiếu…` · `## Từ điển thuật ngữ` · `## Nguồn tham khảo` · `## Cần kiểm tra lại`.
Trắc nghiệm: câu đánh số `1.`, phương án `   - A. …`; đáp án `- Câu 1: **B** – giải thích` dưới nhóm in đậm `**Chương 1**` hoặc `**Trắc nghiệm cuối ngày**`.

## Dựng thử
```
npm ci
node build-album.mjs        # ra _site/; mở _site/bai/<bài>.html?selftest để tự kiểm tra
```
