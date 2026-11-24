# CNTP-Ngay16 · QLCL & VH ATTP – Chương 5 ISO 22000:2018 (đọc trước): cấu trúc mười điều khoản, hai vòng PDCA, PRP – OPRP – CCP và kế hoạch kiểm soát mối nguy

- **Mã bài:** CNTP-Ngay16_2026-11-24_qlcl · Bàn học CNTP · Hệ thống QLCL & VH ATTP
- **Ngày:** 24/11/2026
- **Bản:** album v3 soạn tự động sáng 24/11/2026. Lúc soạn, thư mục Drive Bàn học CNTP không có ảnh slide mới sau 19/11 (vẫn chưa có slide QLCL 19/11, chưa có slide CNCB hôm nay). Buổi CNCB hôm nay đã có hai bài đọc trước (CNTP-Ngay14, CNTP-Ngay15), nên bài này chuẩn bị cho buổi QLCL kế tiếp 26/11/2026. Theo ghi chú lớp, môn đi Chương 3 PRP → Chương 4 HACCP → Chương 5 ISO 22000; đây là bài ĐỌC TRƯỚC Chương 5, nguồn chính là mục lục ISO 22000:2018 (bản xem trước của DIN), trang tiêu chuẩn trên iso.org, hướng dẫn áp dụng ISO 22000:2018 của NQA và bảng so sánh PRP/OPRP/CCP của FSA (MyHACCP); chỗ nào là suy luận hay kiến thức thêm đều ghi rõ
- **Chuẩn bị cho:** buổi QLCL 26/11/2026 (nếu cô vẫn giảng tiếp HACCP thì dùng Chương 4 của bài này để nối HACCP với ISO 22000); thêm một chương IELTS Listening
- **Số chương:** 5 + ôn rải · mỗi chương 8–12 phút · tổng khoảng 70 phút

> **Câu hỏi thật:** Nhà máy của bạn đã có GMP, SSOP và kế hoạch HACCP. Vậy ISO 22000 còn đòi thêm gì, và vì sao trong ISO 22000 lại xuất hiện một loại biện pháp thứ ba tên là OPRP, nằm giữa chương trình tiên quyết và CCP?

**Sau bài này bạn tự làm được:**
1. Nói ISO 22000:2018 là gì, áp dụng cho ai, mười điều khoản của nó và tình trạng hiện hành tính đến 24/11/2026.
2. Vẽ lại hai vòng PDCA của ISO 22000:2018 và xếp đúng các điều khoản vào Plan, Do, Check, Act.
3. Phân biệt PRP, OPRP và CCP theo năm tiêu chí (gắn mối nguy, tiêu chí, validation, giám sát, xử lý khi mất kiểm soát); nối 12 bước HACCP với điều 8.5; phân biệt khắc phục với hành động khắc phục; và làm một bài IELTS Listening về vườn rau cộng đồng.

[NHỚ LẠI]
1. Chất béo trong chảo chiên hư hỏng theo chuỗi phản ứng nào theo giáo trình Lê Văn Việt Mẫn? | từ: CNTP-N15-C2 | đáp: Thủy phân triglyceride tạo acid béo tự do, rồi oxy hóa tạo hydroperoxide và aldehyde, ketone, rồi polymer hóa tạo hợp chất phân tử lượng cao, nên dầu nhớt và sậm màu dần.
2. Vì sao khi nướng ở áp suất khí quyển nhiệt độ tâm sản phẩm không vượt quá 100 °C? | từ: CNTP-N15-C4 | đáp: Vì tâm vẫn còn nước đang bốc hơi; ở áp suất khí quyển nước sôi ở 100 °C nên nhiệt cấp vào dùng để bốc hơi chứ không nâng nhiệt độ tâm lên cao hơn.
3. Bảo ôn đồ hộp sau thanh trùng kéo dài tối thiểu bao lâu theo giáo trình Lê Mỹ Hồng và để làm gì? | từ: CNTP-N14-C3 | đáp: Ít nhất 15 ngày, để phát hiện hộp hư hỏng (phồng, rò, đục) trước khi xuất xưởng.
[/NHỚ LẠI]

---

## Chương 1 – ISO 22000:2018 là gì và được xây theo khung nào

[HỎI TRƯỚC: Một trang trại sản xuất thức ăn chăn nuôi có áp dụng được ISO 22000:2018 không, hay tiêu chuẩn này chỉ dành cho nhà máy chế biến thực phẩm? | đáp: Áp dụng được. | vì sao: ISO 22000 dành cho mọi tổ chức trong chuỗi thực phẩm bất kể quy mô, và bản 2018 đưa cả nhà sản xuất thức ăn chăn nuôi vào phạm vi (Cảnh 1.1).]

### Cảnh 1.1 – ISO 22000:2018 quy định yêu cầu cho hệ thống quản lý an toàn thực phẩm của mọi tổ chức trong chuỗi thực phẩm và tích hợp các nguyên tắc HACCP của Codex

- **Thẻ:** Định nghĩa
- Tên đầy đủ: ISO 22000:2018 "Food safety management systems — Requirements for any organization in the food chain", tức yêu cầu đối với {{hệ thống quản lý an toàn thực phẩm|iso-22000}} cho bất kỳ tổ chức nào trong chuỗi thực phẩm. Trang tiêu chuẩn trên iso.org (mở 24/11/2026) viết: tiêu chuẩn quy định yêu cầu cho hệ thống quản lý an toàn thực phẩm (FSMS), tích hợp các nguyên tắc {{HACCP|haccp}} và các bước áp dụng do Ủy ban {{Codex|codex-alimentarius}} xây dựng.
- Hướng dẫn của NQA: ISO 22000 áp dụng cho mọi tổ chức trong chuỗi thực phẩm, bất kể quy mô và độ phức tạp, kể cả tổ chức tham gia trực tiếp hay gián tiếp; bản 2018 đưa thêm nhà sản xuất thức ăn chăn nuôi và thức ăn cho động vật vào phạm vi. Mục đích chính là bảo đảm thực phẩm an toàn khi tiêu dùng.
- Lịch sử (theo NQA): bản đầu ra năm 2005 sau một loạt khủng hoảng thực phẩm (bò điên, rượu vang pha ethylene glycol) và vì chuỗi cung ứng toàn cầu hóa; soát xét bắt đầu 09/2014; bản 2018 công bố tháng 6/2018.
- Nhớ: ISO 22000:2018 = yêu cầu FSMS cho MỌI tổ chức trong chuỗi thực phẩm (kể cả thức ăn chăn nuôi) · tích hợp nguyên tắc HACCP và các bước của Codex · bản 1: 2005, bản 2: 06/2018.

### Cảnh 1.2 – Bản 2018 dùng cấu trúc cấp cao mười điều khoản giống ISO 9001 trong đó điều 4 đến 10 là yêu cầu và điều 8 chứa phần HACCP

- **Thẻ:** Cơ chế
- Bản 2018 theo {{cấu trúc cấp cao}} (Annex SL) gồm mười điều khoản: 1 Phạm vi; 2 Tài liệu viện dẫn; 3 Thuật ngữ và định nghĩa; 4 Bối cảnh của tổ chức; 5 Lãnh đạo; 6 Hoạch định; 7 Hỗ trợ; 8 Vận hành; 9 Đánh giá kết quả thực hiện; 10 Cải tiến (mục lục ISO 22000:2018, bản xem trước của DIN). Đây cũng là bảy nhóm yêu cầu của {{ISO 9001|iso-9001}} mà bạn gặp ở bài CNTP-Ngay02, nên hai hệ thống tích hợp dễ.
- Yêu cầu phải đáp ứng nằm ở điều 4 đến 10. Theo NQA, khác nhiều tiêu chuẩn hệ thống quản lý khác, tổ chức phải đáp ứng mọi yêu cầu này và không được tuyên bố điều khoản nào là "không áp dụng"; phần lõi gồm các nguyên tắc HACCP của Codex nằm chủ yếu ở điều 8. NQA cũng ghi ISO 22000 không có tài liệu viện dẫn bắt buộc (điều 2 để trống), khác ISO 9001.
- Ngoài mười điều, bản 2018 có phần mở đầu riêng (nguyên tắc FSMS, cách tiếp cận theo quá trình, PDCA, tư duy dựa trên rủi ro) và hai phụ lục: Phụ lục A đối chiếu Codex HACCP với ISO 22000, Phụ lục B đối chiếu với bản 2005 (mục lục DIN và NQA).
- Nhớ: 10 điều: Phạm vi · Viện dẫn · Thuật ngữ · Bối cảnh · Lãnh đạo · Hoạch định · Hỗ trợ · Vận hành · Đánh giá · Cải tiến · yêu cầu ở điều 4–10 · HACCP nằm trong điều 8.

### Cảnh 1.3 – Bản 2018 giữ bốn yếu tố chính của bản 2005 và thêm bảy nguyên tắc quản lý chung của ISO

- **Thẻ:** Định nghĩa
- Bốn yếu tố chính (key elements) mà trang ISO và slide chương 3 của cô đều nhắc: trao đổi thông tin tương tác, quản lý hệ thống, {{chương trình tiên quyết|chuong-trinh-tien-quyet}}, các nguyên tắc HACCP. Đây chính là vòng bốn khối quanh logo ISO 22000 trên slide tiêu đề Chương 3 (ghi chép QLCL 05/11).
- Theo NQA, bản 2018 giữ bốn yếu tố đó và thêm bảy {{nguyên tắc quản lý chung|nguyen-tac-quan-ly-chat-luong}} của ISO: hướng vào khách hàng, sự lãnh đạo, sự tham gia của mọi người, tiếp cận theo quá trình, cải tiến, quyết định dựa trên bằng chứng, quản lý mối quan hệ. Bảy nguyên tắc này trùng bảy nguyên tắc QLCL đã học ở bài CNTP-Ngay02 (câu ôn tập 6).
- Nhớ: 4 yếu tố (thông tin tương tác · quản lý hệ thống · PRP · nguyên tắc HACCP) + 7 nguyên tắc quản lý (khách hàng · lãnh đạo · con người · quá trình · cải tiến · bằng chứng · mối quan hệ).

### Cảnh 1.4 – Tính đến 24/11/2026 ISO 22000:2018 vẫn là bản hiện hành nhưng ISO đã báo sẽ có bản thay thế nên khi thi phải theo bản cô dạy

- **Thẻ:** Hiểu sai thường gặp
- Trạng thái (trang iso.org mở 24/11/2026): ISO 22000:2018 "Published" (ấn bản 2), được xem xét và xác nhận lại năm 2023 nên vẫn hiện hành, và "dự kiến được thay bằng ISO/DIS 22000 trong vài tháng tới". Theo SGS (02/2026), năm 2024 đã thêm Sửa đổi 1 về hành động vì khí hậu. Khi thi, trả lời theo bản 2018 (bản cô dạy) trừ khi cô nói khác.
- Hiểu sai 1: "có ISO 22000 là có FSSC 22000". {{FSSC 22000|fssc-22000}} = ISO 22000 + PRP theo ngành (bộ ISO/TS 22002, nay chuyển sang ISO 22002-x theo SGS) + yêu cầu bổ sung (bài CNTP-Ngay02).
- Hiểu sai 2: "ISO 22000 thay cho HACCP". ISO 22000 chứa HACCP bên trong (điều 8.5) và bọc thêm phần quản lý hệ thống, PRP, truy xuất, ứng phó khẩn cấp, đánh giá nội bộ, xem xét của lãnh đạo.
- Nhớ: Bản hiện hành = ISO 22000:2018 (xác nhận lại 2023, sửa đổi 1:2024, sắp có bản mới) · FSSC = ISO 22000 + PRP theo ngành + yêu cầu bổ sung · ISO 22000 chứa HACCP chứ không thay HACCP.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao việc ISO 22000:2018 dùng chung cấu trúc mười điều khoản với ISO 9001 lại có lợi cho một nhà máy đã có ISO 9001. | đáp: Hai tiêu chuẩn có cùng khung (bối cảnh, lãnh đạo, hoạch định, hỗ trợ, vận hành, đánh giá, cải tiến) nên những phần chung như chính sách, kiểm soát tài liệu, đánh giá nội bộ, xem xét của lãnh đạo có thể làm một lần cho cả hai hệ thống; nhà máy chỉ cần thêm phần riêng của an toàn thực phẩm, chủ yếu ở điều 8 (PRP, phân tích mối nguy, kế hoạch kiểm soát mối nguy). NQA nêu đúng lý do này: cấu trúc Annex SL giúp tích hợp dễ với ISO 9001, ISO 14001, ISO 45001.]

[QUIZ]
1. ISO 22000:2018 áp dụng cho ai?
  - A) Chỉ nhà máy chế biến thực phẩm lớn
  - B) Mọi tổ chức trong chuỗi thực phẩm, bất kể quy mô, kể cả sản xuất thức ăn chăn nuôi
  - C) Chỉ nhà hàng
  - D) Chỉ cơ quan quản lý nhà nước
  - đáp: B
  - vì sao: Trang ISO và NQA ghi áp dụng cho mọi tổ chức trong chuỗi thực phẩm, và bản 2018 thêm thức ăn chăn nuôi; sai A: tổ chức nhỏ cũng áp dụng được; sai D: cơ quan nhà nước không phải đối tượng chứng nhận.
2. Điều khoản nào của ISO 22000:2018 chứa phần lõi HACCP (phân tích mối nguy, kế hoạch kiểm soát mối nguy)?
  - A) Điều 4
  - B) Điều 6
  - C) Điều 8
  - D) Điều 10
  - đáp: C
  - vì sao: Mục lục ghi 8.5 Kiểm soát mối nguy; sai A: bối cảnh tổ chức; sai B: hoạch định hệ thống; sai D: cải tiến.
3. Thứ tự đúng của điều 4 đến 10 là?
  - A) Bối cảnh – Lãnh đạo – Hoạch định – Hỗ trợ – Vận hành – Đánh giá – Cải tiến
  - B) Lãnh đạo – Bối cảnh – Vận hành – Hoạch định – Hỗ trợ – Cải tiến – Đánh giá
  - C) Hoạch định – Vận hành – Hỗ trợ – Bối cảnh – Lãnh đạo – Đánh giá – Cải tiến
  - D) Bối cảnh – Hỗ trợ – Lãnh đạo – Vận hành – Hoạch định – Cải tiến – Đánh giá
  - đáp: A
  - vì sao: Đúng mục lục ISO 22000:2018; sai B, C, D: đảo thứ tự.
4. Bốn yếu tố chính của ISO 22000 (vòng quanh logo trên slide chương 3) gồm?
  - A) Trao đổi thông tin tương tác, quản lý hệ thống, chương trình tiên quyết, nguyên tắc HACCP
  - B) Giá, chất lượng, giao hàng, dịch vụ
  - C) GMP, GAP, GDP, GTP
  - D) Lãnh đạo, tài chính, nhân sự, marketing
  - đáp: A
  - vì sao: Trang ISO và slide chương 3 nêu bốn yếu tố này; sai C: đó là các PRP.
5. Tính đến 24/11/2026, trạng thái của ISO 22000:2018 theo trang iso.org là?
  - A) Đã bị hủy từ 2020
  - B) Vẫn hiện hành (xác nhận lại 2023) và dự kiến được thay bằng bản mới đang ở giai đoạn DIS
  - C) Chưa được công bố
  - D) Đã được thay bằng ISO 22000:2025
  - đáp: B
  - vì sao: Trang iso.org ghi Published, xác nhận lại 2023, dự kiến thay bằng ISO/DIS 22000; sai D: chưa có bản mới công bố lúc soạn.
6. [TỰ LUẬN] Trình bày khái niệm, phạm vi áp dụng và cấu trúc của ISO 22000:2018. | mẫu: ISO 22000:2018 quy định yêu cầu cho hệ thống quản lý an toàn thực phẩm, áp dụng cho mọi tổ chức trong chuỗi thực phẩm bất kể quy mô, kể cả thức ăn chăn nuôi; tích hợp nguyên tắc HACCP và các bước của Codex với bốn yếu tố (trao đổi thông tin tương tác, quản lý hệ thống, PRP, nguyên tắc HACCP) và bảy nguyên tắc quản lý. Cấu trúc cấp cao 10 điều: phạm vi, viện dẫn, thuật ngữ, bối cảnh, lãnh đạo, hoạch định, hỗ trợ, vận hành, đánh giá kết quả, cải tiến; yêu cầu ở điều 4–10, HACCP ở điều 8.5.
[/QUIZ]

[TÓM: ISO 22000 2018 quy định yêu cầu hệ thống quản lý an toàn thực phẩm cho mọi tổ chức trong chuỗi thực phẩm và tích hợp HACCP của Codex | Cấu trúc mười điều khoản giống ISO 9001 với yêu cầu ở điều 4 đến 10 và HACCP nằm trong điều 8 | Bốn yếu tố chính cộng bảy nguyên tắc quản lý và bản 2018 vẫn hiện hành nhưng sắp có bản thay thế]

---

## Chương 2 – Hai vòng PDCA và tư duy dựa trên rủi ro

[HỎI TRƯỚC: Slide buổi 1 nói PDCA là "linh hồn" của ISO 22000. Vậy trong ISO 22000:2018 có một vòng PDCA hay nhiều hơn? | đáp: Hai vòng lồng nhau. | vì sao: Theo NQA, ngoài vòng PDCA của tổ chức theo cấu trúc cấp cao, còn một vòng PDCA thứ hai cho các quá trình vận hành nằm trong điều 8 (Cảnh 2.1 và 2.2).]

### Cảnh 2.1 – Vòng PDCA của tổ chức xếp điều 4 đến 7 vào Plan, điều 8 vào Do, điều 9 vào Check và điều 10 vào Act

- **Thẻ:** Cơ chế
- Hướng dẫn NQA vẽ vòng {{PDCA|pdca}} của tổ chức (hoạch định và kiểm soát ở cấp tổ chức) như sau: Plan gồm điều 4 Bối cảnh, 5 Lãnh đạo, 6 Hoạch định, 7 Hỗ trợ (kể cả kiểm soát quá trình, sản phẩm, dịch vụ do bên ngoài cung cấp); Do là điều 8 Vận hành; Check là điều 9 Đánh giá kết quả thực hiện; Act là điều 10 Cải tiến.
- Cách nhớ (của album): bốn điều đầu là "chuẩn bị" (hiểu mình, cam kết, đặt mục tiêu, lo nguồn lực), một điều "làm", một điều "đo" (theo dõi, đánh giá nội bộ, xem xét của lãnh đạo theo mục lục 9.1–9.3), một điều "sửa và nâng" (10.1 sự không phù hợp và hành động khắc phục, 10.2 cải tiến liên tục, 10.3 cập nhật hệ thống).
[MÔ PHỎNG: q16-hai-vong-pdca | kiểu: hoạt-hình | chỗ: phải | khẳng định: Theo hướng dẫn áp dụng ISO 22000:2018 của NQA, tiêu chuẩn có hai vòng PDCA lồng nhau: vòng của tổ chức xếp điều 4 đến 7 vào Plan, điều 8 vào Do, điều 9 vào Check và điều 10 vào Act, còn vòng vận hành nằm gọn trong điều 8 đi từ PRP và phân tích mối nguy qua thực hiện kế hoạch, thẩm tra tới cập nhật PRP và kế hoạch kiểm soát mối nguy | chức năng: tổ chức | nhìn: bốn khối hiện lần lượt, hai khối đầu là vòng ngoài, hai khối sau là vòng trong điều 8]
- hình: hoat-hinh/q16-hai-vong-pdca.svg
- bước: 1 | chữ: Vòng tổ chức, Plan: điều 4 bối cảnh, 5 lãnh đạo, 6 hoạch định, 7 hỗ trợ. | vì sao: NQA xếp bốn điều này vào Plan của FSMS.
- bước: 2 | chữ: Vòng tổ chức, Do là điều 8 vận hành, Check là điều 9 đánh giá kết quả, Act là điều 10 cải tiến. | vì sao: Mỗi điều còn lại ứng với một chữ của PDCA.
- bước: 3 | chữ: Vòng vận hành trong điều 8, Plan: PRP, truy xuất, ứng phó khẩn cấp, phân tích mối nguy, validation, kế hoạch kiểm soát mối nguy, hoạch định thẩm tra. | vì sao: Đây là phần hoạch định an toàn thực phẩm ở cấp quá trình theo NQA.
- bước: 4 | chữ: Vòng vận hành, Do: thực hiện kế hoạch, kiểm soát theo dõi đo lường và sự không phù hợp; Check: thẩm tra và phân tích kết quả; Act: cập nhật PRP và kế hoạch. | vì sao: Vòng trong khép lại bằng cập nhật nên kế hoạch HACCP không đứng yên.
- nguồn: NQA, ISO 22000:2018 Food Safety Management System Implementation Guide (PDF, mục PDCA cycle, đã mở 24/11/2026); mục lục ISO 22000:2018 (bản xem trước DIN, đã mở); sơ đồ tự vẽ
- giới hạn: Sơ đồ chữ, rút gọn tên điều khoản; cách xếp điều khoản vào từng chữ PDCA là cách trình bày của NQA (tiêu chuẩn gốc có hình riêng ở mục 0.3.2 chưa xem được). Cần kiểm tra: slide của cô có thể vẽ khác.
[/MÔ PHỎNG]
- Nhớ: Vòng ngoài: P = điều 4, 5, 6, 7 · D = điều 8 · C = điều 9 · A = điều 10.

### Cảnh 2.2 – Bên trong điều 8 có vòng PDCA thứ hai cho các quá trình vận hành đi từ PRP và phân tích mối nguy tới thẩm tra và cập nhật

- **Thẻ:** Cơ chế
- NQA: "ngoài vòng PDCA của tổ chức… còn một vòng PDCA khác phải cùng tồn tại, bao trùm các quá trình vận hành trong hệ thống an toàn thực phẩm". Plan (an toàn thực phẩm): PRP, hệ thống truy xuất, chuẩn bị và ứng phó tình huống khẩn cấp, phân tích mối nguy, xác nhận giá trị sử dụng biện pháp kiểm soát, kế hoạch kiểm soát mối nguy (kế hoạch HACCP/OPRP), hoạch định thẩm tra.
- Do: thực hiện kế hoạch, kiểm soát việc theo dõi và đo lường, kiểm soát sự không phù hợp của sản phẩm và quá trình. Check: các hoạt động {{thẩm tra|kiem-tra-xac-nhan}} và phân tích kết quả thẩm tra. Act: cập nhật thông tin ban đầu và tài liệu quy định PRP cùng kế hoạch kiểm soát mối nguy. Các mục này khớp tên điều 8.2 đến 8.9 trong mục lục.
- Nhớ: Vòng trong (điều 8): P = PRP, truy xuất, khẩn cấp, phân tích mối nguy, validation, kế hoạch, hoạch định thẩm tra · D = thực hiện, kiểm soát đo lường, không phù hợp · C = thẩm tra · A = cập nhật.

### Cảnh 2.3 – ISO 22000:2018 xét rủi ro ở hai cấp là rủi ro của tổ chức và mối nguy an toàn thực phẩm trong quá trình vận hành

- **Thẻ:** Định nghĩa
- Phần mở đầu bản 2018 có mục 0.3.3 "Tư duy dựa trên rủi ro" chia hai: 0.3.3.2 quản lý rủi ro của tổ chức và 0.3.3.3 phân tích mối nguy ở các quá trình vận hành (mục lục theo NQA). Cấp tổ chức nằm ở điều 6.1 "Hành động giải quyết rủi ro và cơ hội"; cấp vận hành là phân tích mối nguy ở điều 8.5.2.
- NQA định nghĩa rủi ro theo bản 2018 là "ảnh hưởng của sự không chắc chắn", ảnh hưởng có thể tích cực hay tiêu cực, và rủi ro không còn chỉ ở cấp vận hành mà ở mọi mặt của hệ thống có thể ảnh hưởng an toàn thực phẩm. Tiêu chuẩn không bắt dùng một phương pháp đánh giá rủi ro cụ thể nhưng yêu cầu mô tả và lưu phương pháp đã dùng.
- Ví dụ của album để phân biệt: "nhà cung cấp bao bì duy nhất có thể ngừng giao hàng" là rủi ro cấp tổ chức (điều 6.1); "mảnh kim loại từ lưỡi dao gãy sau công đoạn cắt" là mối nguy cấp vận hành (điều 8.5.2). Cách tính khả năng × hậu quả trên slide 12/11 dùng cho cấp vận hành.
- Nhớ: Rủi ro 2 cấp: tổ chức (6.1, rủi ro và cơ hội) · vận hành (8.5.2, phân tích mối nguy) · rủi ro = ảnh hưởng của sự không chắc chắn.

### Cảnh 2.4 – Điều 4 yêu cầu hiểu bối cảnh và các bên quan tâm trước rồi mới xác định phạm vi và xây hệ thống

- **Thẻ:** Cơ chế
- NQA: điều 4 đi theo thứ tự 4.1 hiểu tổ chức và {{bối cảnh của tổ chức}} (vấn đề bên trong và bên ngoài) → 4.2 hiểu nhu cầu và mong đợi của {{bên quan tâm}} → 4.3 xác định phạm vi hệ thống → 4.4 xây hệ thống quản lý an toàn thực phẩm; đầu ra của 4.1 và 4.2 dùng để quyết định 4.3. Phạm vi phải được duy trì dưới dạng thông tin dạng văn bản.
- Ví dụ NQA kể: bên ngoài gồm luật quốc gia và quốc tế, đối thủ, nhà cung cấp, xu hướng tiêu dùng; bên trong gồm cơ cấu, năng lực nhân sự, văn hóa an toàn thực phẩm. Bên quan tâm có thể là cổ đông, cơ quan quản lý, khách hàng, người lao động, nhà cung cấp, nhà phân phối, người tiêu dùng; NQA gợi ý công cụ SWOT hay PEST để phân tích bối cảnh.
- Nhớ: 4.1 bối cảnh → 4.2 bên quan tâm → 4.3 phạm vi (có văn bản) → 4.4 hệ thống.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao ISO 22000:2018 cần thêm vòng PDCA thứ hai bên trong điều 8 thay vì chỉ có một vòng của tổ chức. | đáp: Vòng của tổ chức chạy chậm (theo chu kỳ đánh giá nội bộ, xem xét của lãnh đạo) và nói về hệ thống nói chung; còn mối nguy trong sản xuất thay đổi theo từng nguyên liệu, từng mẻ, nên kế hoạch HACCP/OPRP cần vòng riêng: hoạch định biện pháp, làm và giám sát, thẩm tra, rồi cập nhật ngay khi có thông tin mới. Hai vòng lồng nhau giúp vừa quản lý chiến lược vừa kiểm soát mối nguy hằng ngày.]

[QUIZ]
1. Trong vòng PDCA của tổ chức theo NQA, phần Plan gồm các điều nào?
  - A) Điều 4, 5, 6, 7
  - B) Chỉ điều 6
  - C) Điều 8 và 9
  - D) Điều 1, 2, 3
  - đáp: A
  - vì sao: NQA xếp bối cảnh, lãnh đạo, hoạch định, hỗ trợ vào Plan; sai B: điều 6 chỉ là một phần; sai D: điều 1–3 không chứa yêu cầu.
2. Điều 9 Đánh giá kết quả thực hiện ứng với chữ nào của vòng PDCA tổ chức?
  - A) Plan
  - B) Do
  - C) Check
  - D) Act
  - đáp: C
  - vì sao: Điều 9 gồm theo dõi, đánh giá nội bộ, xem xét của lãnh đạo, tức là kiểm tra; sai D: Act là điều 10 cải tiến.
3. Mục nào thuộc phần Plan của vòng PDCA vận hành (trong điều 8)?
  - A) Phân tích mối nguy và kế hoạch kiểm soát mối nguy
  - B) Xem xét của lãnh đạo
  - C) Cải tiến liên tục
  - D) Chính sách an toàn thực phẩm
  - đáp: A
  - vì sao: NQA liệt kê PRP, truy xuất, khẩn cấp, phân tích mối nguy, validation, kế hoạch, hoạch định thẩm tra vào Plan vòng trong; sai B, C, D: thuộc vòng tổ chức (điều 9, 10, 5).
4. Phần Act của vòng vận hành là?
  - A) Mua thêm thiết bị
  - B) Cập nhật thông tin ban đầu và tài liệu quy định PRP cùng kế hoạch kiểm soát mối nguy
  - C) Tuyển dụng
  - D) Đánh giá nội bộ
  - đáp: B
  - vì sao: Đúng tên điều 8.6; sai D: đánh giá nội bộ là điều 9.2 của vòng tổ chức.
5. "Nhà cung cấp bao bì duy nhất có thể ngừng giao hàng" là loại rủi ro nào theo cách chia hai cấp?
  - A) Rủi ro cấp tổ chức, xử lý ở điều 6.1
  - B) Mối nguy sinh học ở điều 8.5.2
  - C) Không phải rủi ro
  - D) Giới hạn tới hạn
  - đáp: A
  - vì sao: Đây là bất định ảnh hưởng tới khả năng của hệ thống chứ không phải tác nhân trong thực phẩm (ví dụ của album); sai B: mối nguy là tác nhân sinh, hóa, lý trong thực phẩm.
6. Thứ tự đúng trong điều 4 là?
  - A) Phạm vi → bối cảnh → bên quan tâm → hệ thống
  - B) Bối cảnh → bên quan tâm → phạm vi → hệ thống
  - C) Hệ thống → phạm vi → bối cảnh → bên quan tâm
  - D) Bên quan tâm → hệ thống → phạm vi → bối cảnh
  - đáp: B
  - vì sao: 4.1 → 4.2 → 4.3 → 4.4 như NQA trình bày; sai A: phạm vi được quyết định từ bối cảnh và bên quan tâm nên phải đứng sau.
7. [TỰ LUẬN] Trình bày hai vòng PDCA trong ISO 22000:2018. | mẫu: Vòng tổ chức: Plan gồm điều 4 bối cảnh, 5 lãnh đạo, 6 hoạch định, 7 hỗ trợ; Do là điều 8 vận hành; Check là điều 9 đánh giá kết quả; Act là điều 10 cải tiến. Vòng vận hành nằm trong điều 8: Plan gồm PRP, truy xuất, ứng phó khẩn cấp, phân tích mối nguy, xác nhận giá trị sử dụng, kế hoạch kiểm soát mối nguy (HACCP/OPRP), hoạch định thẩm tra; Do gồm thực hiện kế hoạch, kiểm soát theo dõi đo lường, kiểm soát sự không phù hợp; Check là thẩm tra và phân tích kết quả; Act là cập nhật PRP và kế hoạch.
[/QUIZ]

[TÓM: Vòng PDCA của tổ chức xếp điều 4 đến 7 vào Plan còn điều 8 9 10 lần lượt là Do Check Act | Vòng PDCA vận hành nằm trong điều 8 từ PRP và phân tích mối nguy qua thẩm tra tới cập nhật kế hoạch | Rủi ro được xét ở hai cấp là tổ chức theo điều 6.1 và mối nguy vận hành theo điều 8.5.2]

---

## Chương 3 – PRP, OPRP và CCP: ba loại biện pháp kiểm soát

[HỎI TRƯỚC: Khâu khử trùng một thiết bị cắt thịt nguội được phân tích là thiết yếu để kiểm soát E. coli O157, và sau khâu này không còn bước nào diệt vi khuẩn nữa. Nhưng khâu này không có một con số giới hạn đo tức thời như nhiệt độ thanh trùng. Nó là PRP, OPRP hay CCP? | đáp: Thường được xếp là OPRP. | vì sao: Ví dụ của FSA (MyHACCP): một chương trình tiên quyết được phân tích mối nguy xác định là thiết yếu cho một mối nguy cụ thể thì gọi là OPRP (Cảnh 3.2).]

### Cảnh 3.1 – Chương trình tiên quyết tạo môi trường vệ sinh chung cho thực phẩm an toàn và không gắn riêng với mối nguy nào

- **Thẻ:** Định nghĩa
- Bảng so sánh của FSA (MyHACCP, dựa trên Thông báo của Ủy ban châu Âu 2016/C 278/01): {{PRP|chuong-trinh-tien-quyet}} là biện pháp tạo môi trường cho thực phẩm an toàn, không đặc hiệu cho mối nguy nào; xây dựng dựa trên kinh nghiệm, tài liệu hướng dẫn hay phân tích mối nguy; không có tiêu chí; giám sát "khi phù hợp và khả thi"; thẩm tra việc thực hiện theo lịch.
- Validation của PRP không nhất thiết do chính cơ sở làm: ví dụ nhà sản xuất hóa chất tẩy rửa đã xác nhận hiệu quả sản phẩm, cơ sở chỉ cần làm theo hướng dẫn và giữ thông số kỹ thuật (FSA). Trong ISO 22000:2018, PRP nằm ở điều 8.2; PRP theo ngành có bộ ISO/TS 22002 (ví dụ 22002-1 cho chế biến, theo NQA).
- Nhớ: PRP = nền vệ sinh chung · không riêng mối nguy · không tiêu chí · điều 8.2 · ví dụ GMP, SSOP.

### Cảnh 3.2 – OPRP là biện pháp kiểm soát mà phân tích mối nguy chọn ra cho một mối nguy đáng kể và được theo dõi bằng tiêu chí hành động đo hoặc quan sát được

- **Thẻ:** Định nghĩa
- {{OPRP}} (chương trình tiên quyết vận hành), theo cách diễn đạt của NQA: các biện pháp kiểm soát được phân tích mối nguy xác định là thiết yếu để ngăn ngừa hoặc giảm tới {{mức chấp nhận được}} khả năng đưa vào, nhiễm hay phát triển của một {{mối nguy đáng kể|moi-nguy-dang-ke}} trong sản phẩm hay môi trường làm việc. OPRP được kiểm soát bằng {{tiêu chí hành động}} cùng đo hoặc quan sát; NQA nhận xét OPRP đặc thù cho từng tổ chức hơn PRP.
- Tiêu chí hành động (action criterion) là quy định đo được hoặc quan sát được để giám sát một OPRP, đặt ra để đánh giá OPRP còn trong kiểm soát không (NQA). Khác giới hạn tới hạn ở chỗ được phép là quan sát, ví dụ "bề mặt sạch nhìn thấy, không còn vụn" (ví dụ của album). Ví dụ của FSA: khử trùng thiết bị là thiết yếu để kiểm soát E. coli O157 khi không còn bước kiểm soát nào phía sau, nên khử trùng đó là OPRP.
- Mức chấp nhận được (acceptable level): mức của mối nguy không được vượt trong thành phẩm (NQA). Mọi biện pháp, kể cả OPRP và CCP, đều nhắm đưa mối nguy về dưới mức này.
- Nhớ: OPRP = biện pháp thiết yếu cho mối nguy đáng kể, chọn ra từ phân tích mối nguy · theo dõi bằng tiêu chí hành động (đo HOẶC quan sát) · đặc thù từng cơ sở.

### Cảnh 3.3 – CCP cũng kiểm soát mối nguy đáng kể nhưng có giới hạn tới hạn đo được và khi mất kiểm soát thì sản phẩm được xử lý theo cách đã định sẵn

- **Thẻ:** Cơ chế
- NQA (theo bản 2018): {{CCP|ccp}} là bước trong quá trình tại đó áp dụng biện pháp kiểm soát thiết yếu để ngăn hoặc giảm mối nguy đáng kể tới mức chấp nhận được; {{giới hạn tới hạn|gioi-han-toi-han}} và phép đo cho phép áp dụng khắc phục. Bảng FSA: OPRP và CCP giống nhau ở chỗ đều đặc hiệu cho mối nguy, đều quyết định từ phân tích mối nguy có tính đến PRP, đều phải validation, giám sát thường có hồ sơ, đều thẩm tra cả việc thực hiện lẫn việc đạt mục tiêu kiểm soát mối nguy.
- Khác nhau ở hai chỗ (FSA): tiêu chí (OPRP: tiêu chí đo hoặc quan sát được; CCP: giới hạn tới hạn đo được) và xử lý khi mất kiểm soát (CCP: khắc phục định sẵn trên sản phẩm, có thể thêm hành động khắc phục trên quá trình; OPRP: hành động khắc phục trên quá trình, sản phẩm xét từng trường hợp). Cả hai đều lưu hồ sơ.
[MÔ PHỎNG: q16-prp-oprp-ccp | kiểu: hoạt-hình | chỗ: phải | khẳng định: Theo bảng so sánh của FSA dựa trên Thông báo 2016/C 278/01 của Ủy ban châu Âu, PRP không gắn với mối nguy riêng và không có tiêu chí, còn OPRP và CCP đều gắn với mối nguy đáng kể nhưng OPRP dùng tiêu chí đo hoặc quan sát được trong khi CCP dùng giới hạn tới hạn đo được và khi mất kiểm soát CCP xử lý sản phẩm theo cách định sẵn | chức năng: tổ chức | nhìn: ba khối PRP, OPRP, CCP hiện lần lượt rồi khối cuối so sánh cách xử lý khi mất kiểm soát]
- hình: hoat-hinh/q16-prp-oprp-ccp.svg
- bước: 1 | chữ: PRP tạo môi trường vệ sinh chung, không gắn với mối nguy riêng, không có tiêu chí. | vì sao: Bảng FSA, hàng phạm vi và tiêu chí.
- bước: 2 | chữ: OPRP được chọn từ phân tích mối nguy cho mối nguy đáng kể, theo dõi bằng tiêu chí hành động đo hoặc quan sát được. | vì sao: Bảng FSA và định nghĩa tiêu chí hành động theo NQA.
- bước: 3 | chữ: CCP cũng được chọn từ phân tích mối nguy cho mối nguy đáng kể nhưng có giới hạn tới hạn đo được. | vì sao: Bảng FSA, hàng tiêu chí.
- bước: 4 | chữ: Khi mất kiểm soát: CCP xử lý sản phẩm theo cách định sẵn; OPRP chủ yếu khắc phục quá trình, sản phẩm xét từng trường hợp; cả hai ghi hồ sơ. | vì sao: Bảng FSA, hàng mất kiểm soát.
- nguồn: Food Standards Agency, MyHACCP "Operational Prerequisite Programmes (OPRPs)" (bảng so sánh lấy từ Commission Notice 2016/C 278/01, đã mở 24/11/2026); NQA ISO 22000:2018 Implementation Guide mục Terms and definitions; sơ đồ tự vẽ
- giới hạn: Bảng FSA là hướng dẫn của Liên minh châu Âu và Vương quốc Anh, không phải nguyên văn ISO 22000; định nghĩa OPRP, CCP lấy qua cách diễn đạt của NQA vì chưa mở được điều 3 của tiêu chuẩn. Ví dụ "bề mặt sạch nhìn thấy" là của album. Cần kiểm tra: cách cô trình bày bảng so sánh.
[/MÔ PHỎNG]
- Nhớ: Giống: đều cho mối nguy đáng kể, đều validation, giám sát, thẩm tra · Khác: OPRP tiêu chí hành động (đo hoặc quan sát) – CCP giới hạn tới hạn (đo được) · mất kiểm soát CCP xử lý sản phẩm định sẵn.

### Cảnh 3.4 – OPRP không phải PRP hạng hai vì nó cũng phải được xác nhận giá trị sử dụng, giám sát và thẩm tra như CCP

- **Thẻ:** Hiểu sai thường gặp
- Hiểu sai 1: "OPRP chỉ là PRP được đặt tên kêu hơn". NQA ghi rõ cả CCP và OPRP đều cần giám sát, xác nhận giá trị sử dụng và thẩm tra; bảng FSA cũng ghi OPRP phải được validation, trong khi PRP không nhất thiết. Khác biệt cốt lõi: PRP chung cho mọi mối nguy, OPRP nhắm một mối nguy đáng kể cụ thể.
- Hiểu sai 2: "thứ gì quan trọng cũng nên làm CCP cho chắc". Theo mục lục, điều 8.5.2.4 là "lựa chọn và phân loại biện pháp kiểm soát": sau phân tích mối nguy, tổ chức phải xếp mỗi biện pháp thiết yếu vào OPRP hoặc CCP. Biện pháp không có giới hạn đo tức thời nên xếp OPRP (suy luận của album từ bảng FSA), ép thành CCP sẽ không giám sát đúng được.
- Hiểu sai 3 (về chữ): "OPRP" trong tài liệu tiếng Việt còn được gọi là chương trình tiên quyết vận hành hay chương trình tiên quyết hoạt động (kiến thức thêm, cần đối chiếu bài giảng); thi theo chữ cô dùng.
- Nhớ: OPRP ≠ PRP hạng hai · OPRP và CCP đều validation, giám sát, thẩm tra · điều 8.5.2.4 phân loại biện pháp thành OPRP hoặc CCP.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao kiểm soát dị ứng bằng cách vệ sinh dây chuyền giữa hai sản phẩm (một có lạc, một không) thường hợp với OPRP hơn CCP. | đáp: Vệ sinh chuyển đổi sản phẩm là biện pháp thiết yếu cho một mối nguy đáng kể cụ thể (chất gây dị ứng từ lạc) nên không chỉ là PRP chung; nhưng kết quả thường được đánh giá bằng quan sát (bề mặt sạch nhìn thấy, đúng quy trình) hoặc phép thử mất thời gian, khó có một giới hạn tới hạn đo tức thời như nhiệt độ. Vì vậy theo bảng FSA nó hợp với OPRP: tiêu chí đo hoặc quan sát được, sai thì khắc phục quá trình và xét lô sản phẩm từng trường hợp. Đây là ví dụ suy luận của album, cần đối chiếu bài giảng.]

[QUIZ]
1. Đặc điểm nào đúng với PRP theo bảng FSA?
  - A) Không đặc hiệu cho mối nguy nào và không có tiêu chí
  - B) Có giới hạn tới hạn đo được
  - C) Luôn phải do chính cơ sở xác nhận giá trị sử dụng
  - D) Chỉ dùng cho một mối nguy cụ thể
  - đáp: A
  - vì sao: PRP tạo môi trường vệ sinh chung; sai B: đó là CCP; sai C: FSA nói validation PRP không nhất thiết do cơ sở làm; sai D: đó là OPRP và CCP.
2. Tiêu chí hành động (action criterion) dùng để giám sát loại biện pháp nào?
  - A) PRP
  - B) OPRP
  - C) CCP
  - D) Chính sách an toàn thực phẩm
  - đáp: B
  - vì sao: NQA định nghĩa tiêu chí hành động là quy định đo hoặc quan sát được để giám sát OPRP; sai C: CCP dùng giới hạn tới hạn.
3. Điểm GIỐNG nhau giữa OPRP và CCP là?
  - A) Cả hai đều không cần validation
  - B) Cả hai đều đặc hiệu cho mối nguy đáng kể và đều phải validation, giám sát, thẩm tra
  - C) Cả hai đều dùng giới hạn tới hạn
  - D) Cả hai đều không cần hồ sơ
  - đáp: B
  - vì sao: Bảng FSA và NQA; sai C: OPRP dùng tiêu chí hành động; sai D: cả hai đều ghi hồ sơ.
4. Khi một CCP mất kiểm soát, bảng FSA mô tả cách xử lý sản phẩm là?
  - A) Không cần làm gì với sản phẩm
  - B) Khắc phục định sẵn trên sản phẩm, có thể thêm hành động khắc phục trên quá trình
  - C) Chỉ ghi hồ sơ
  - D) Chỉ báo khách hàng
  - đáp: B
  - vì sao: FSA ghi "pre-set corrections on the product" cho CCP; sai A, C: thiếu xử lý sản phẩm.
5. Điều khoản nào của ISO 22000:2018 yêu cầu lựa chọn và phân loại biện pháp kiểm soát (thành OPRP hay CCP)?
  - A) 4.3
  - B) 7.5
  - C) 8.5.2.4
  - D) 9.2
  - đáp: C
  - vì sao: Mục lục ghi 8.5.2.4 Selection and categorization of control measure(s); sai A: phạm vi; sai B: thông tin dạng văn bản; sai D: đánh giá nội bộ.
6. Theo ví dụ của FSA, khử trùng thiết bị là thiết yếu để kiểm soát E. coli O157 và không còn bước kiểm soát nào sau đó. Biện pháp này được gọi là?
  - A) PRP thông thường
  - B) OPRP
  - C) Mức chấp nhận được
  - D) Bên quan tâm
  - đáp: B
  - vì sao: FSA gọi PRP được xác định là thiết yếu cho một mối nguy cụ thể là OPRP; sai A: đã vượt mức PRP chung vì nhắm một mối nguy.
7. [TỰ LUẬN] So sánh PRP, OPRP và CCP theo các tiêu chí: gắn với mối nguy, cách xác định, validation, tiêu chí, xử lý khi mất kiểm soát. | mẫu: PRP tạo môi trường vệ sinh chung, không gắn mối nguy riêng, dựa trên kinh nghiệm và tài liệu hướng dẫn, validation không nhất thiết do cơ sở làm, không có tiêu chí, mất kiểm soát thì sửa PRP. OPRP và CCP gắn với mối nguy đáng kể, xác định qua phân tích mối nguy có tính đến PRP, đều phải validation, giám sát có hồ sơ và thẩm tra. OPRP dùng tiêu chí hành động đo hoặc quan sát được, mất kiểm soát thì hành động khắc phục quá trình và xét sản phẩm từng trường hợp; CCP dùng giới hạn tới hạn đo được, mất kiểm soát thì xử lý sản phẩm theo cách định sẵn và có thể khắc phục quá trình.
[/QUIZ]

[TÓM: PRP là nền vệ sinh chung không gắn với mối nguy riêng và không có tiêu chí | OPRP và CCP đều được chọn từ phân tích mối nguy cho mối nguy đáng kể và đều phải validation giám sát thẩm tra | OPRP dùng tiêu chí hành động đo hoặc quan sát được còn CCP dùng giới hạn tới hạn đo được và xử lý sản phẩm định sẵn khi mất kiểm soát]

---

## Chương 4 – Kế hoạch kiểm soát mối nguy, ba việc trước trong sau và xử lý khi không đạt

[HỎI TRƯỚC: Trong ISO 22000:2018, kế hoạch HACCP có còn là một văn bản riêng chỉ chứa CCP không? | đáp: Không; ISO 22000:2018 gọi là kế hoạch kiểm soát mối nguy (kế hoạch HACCP/OPRP), chứa cả CCP lẫn OPRP. | vì sao: Mục lục ghi điều 8.5.4 Hazard control plan (HACCP/OPRP plan) và 8.5.4.3 hệ thống giám sát tại CCP và cho OPRP (Cảnh 4.1).]

### Cảnh 4.1 – Điều 8.5 đi lại các bước HACCP của Codex từ bước chuẩn bị tới phân tích mối nguy rồi gom CCP và OPRP vào một kế hoạch kiểm soát mối nguy

- **Thẻ:** Cơ chế
- Mục lục điều 8.5 "Kiểm soát mối nguy": 8.5.1 các bước ban đầu để phân tích mối nguy (đặc tính nguyên liệu, thành phần và vật liệu tiếp xúc; đặc tính thành phẩm; mục đích sử dụng; sơ đồ quy trình và xác nhận tại chỗ; mô tả quá trình và môi trường); 8.5.2 phân tích mối nguy (nhận diện mối nguy và xác định mức chấp nhận được; đánh giá mối nguy; lựa chọn và phân loại biện pháp kiểm soát); 8.5.3 xác nhận giá trị sử dụng biện pháp kiểm soát; 8.5.4 {{kế hoạch kiểm soát mối nguy}}.
- Trong 8.5.4: 8.5.4.2 xác định giới hạn tới hạn và tiêu chí hành động; 8.5.4.3 hệ thống giám sát tại CCP và cho OPRP; 8.5.4.4 hành động khi giới hạn tới hạn hoặc tiêu chí hành động không đạt; 8.5.4.5 thực hiện kế hoạch. Như vậy mỗi nguyên tắc HACCP có "bản sao" song song cho OPRP.
- Đối chiếu với 12 bước trên slide 12/11 (suy luận của album từ tên điều khoản; Phụ lục A của tiêu chuẩn có bảng đối chiếu chính thức nhưng chưa mở được): bước 2–5 ↔ 8.5.1; bước 6 ↔ 8.5.2; bước 7 ↔ 8.5.2.4; bước 8 ↔ 8.5.4.2; bước 9 ↔ 8.5.4.3; bước 10 ↔ 8.5.4.4 và 8.9; bước 11 ↔ 8.5.3 và 8.8; bước 12 ↔ 7.5 thông tin dạng văn bản.
- Nhớ: 8.5.1 bước ban đầu → 8.5.2 phân tích mối nguy (8.5.2.4 phân loại) → 8.5.3 validation → 8.5.4 kế hoạch kiểm soát mối nguy (giới hạn tới hạn VÀ tiêu chí hành động; giám sát CCP VÀ OPRP).

### Cảnh 4.2 – Validation làm trước, giám sát làm trong lúc chạy và thẩm tra làm sau nên ba việc trả lời ba câu hỏi khác nhau

- **Thẻ:** Định nghĩa
- NQA tóm ba định nghĩa theo thời điểm: {{validation|xac-nhan-gia-tri-su-dung}} là có được bằng chứng rằng biện pháp kiểm soát có khả năng kiểm soát hiệu quả mối nguy đáng kể, làm TRƯỚC hoạt động ("đánh giá tương lai"); {{giám sát|giam-sat-ccp}} là chuỗi quan sát hay đo theo kế hoạch để đánh giá quá trình có chạy như dự định không, làm TRONG hoạt động ("đánh giá hiện tại"); thẩm tra là xác nhận bằng bằng chứng khách quan rằng yêu cầu đã được đáp ứng, làm SAU hoạt động ("đánh giá quá khứ").
- Cách nhớ này khớp phần đã học ở bài CNTP-Ngay13 (Codex: validation trước khi áp dụng kế hoạch; thẩm tra do người khác người giám sát), và khớp mục lục ISO: 8.5.3 validation đứng trước 8.5.4 kế hoạch, còn 8.8 thẩm tra đứng sau 8.7 kiểm soát theo dõi và đo lường.
[MÔ PHỎNG: q16-truoc-trong-sau | kiểu: hoạt-hình | chỗ: phải | khẳng định: Theo cách NQA tóm các định nghĩa của ISO 22000:2018, xác nhận giá trị sử dụng làm trước hoạt động để biết biện pháp có đủ sức kiểm soát mối nguy, giám sát làm trong hoạt động để biết quá trình có chạy như dự định, còn thẩm tra làm sau hoạt động để xác nhận yêu cầu đã được đáp ứng | chức năng: giải thích | nhìn: ba mốc trước, trong, sau hiện lần lượt rồi khối ví dụ thanh trùng gắn mỗi mốc với một việc cụ thể]
- hình: hoat-hinh/q16-truoc-trong-sau.svg
- bước: 1 | chữ: Trước: validation hỏi biện pháp có đủ sức kiểm soát mối nguy đáng kể không (đánh giá tương lai). | vì sao: NQA: validation áp dụng trước hoạt động.
- bước: 2 | chữ: Trong: giám sát hỏi quá trình có đang chạy như dự định không (đánh giá hiện tại). | vì sao: NQA: giám sát áp dụng trong hoạt động và cho thông tin để hành động kịp.
- bước: 3 | chữ: Sau: thẩm tra hỏi yêu cầu đã được đáp ứng chưa (đánh giá quá khứ). | vì sao: NQA: thẩm tra áp dụng sau hoạt động.
- bước: 4 | chữ: Ví dụ thanh trùng: thí nghiệm chứng minh chế độ đủ mạnh; máy ghi nhiệt độ từng mẻ; người khác xem nhật ký và hiệu chuẩn nhiệt kế. | vì sao: Ví dụ của album nối với bài CNTP-Ngay12 và CNTP-Ngay13.
- nguồn: NQA, ISO 22000:2018 Implementation Guide, mục Terms and definitions (Monitoring, Validation, Verification), đã mở 24/11/2026; mục lục ISO 22000:2018 (bản xem trước DIN); sơ đồ tự vẽ
- giới hạn: Ba chữ "tương lai, hiện tại, quá khứ" là cách tóm của NQA, không phải nguyên văn tiêu chuẩn; trong thực tế validation còn làm lại khi có thay đổi. Ví dụ thanh trùng là của album. Cần kiểm tra: cách cô dịch validation và verification.
[/MÔ PHỎNG]
- Nhớ: Validation = TRƯỚC (đủ sức không?) · giám sát = TRONG (đang chạy đúng không?) · thẩm tra = SAU (đã đáp ứng chưa?).

### Cảnh 4.3 – Khi không đạt thì khắc phục xử lý ngay chỗ sai còn hành động khắc phục loại bỏ nguyên nhân và sản phẩm có thể không an toàn chỉ được thả khi đánh giá đạt

- **Thẻ:** Hiểu sai thường gặp
- Hiểu sai: coi "khắc phục" và "hành động khắc phục" là một. FSA (MyHACCP) phân biệt: {{khắc phục}} (correction) là hành động loại bỏ sự không phù hợp đã phát hiện; {{hành động khắc phục|hanh-dong-khac-phuc}} (corrective action) là hành động loại bỏ nguyên nhân của sự không phù hợp. Mục lục ISO 22000:2018 cũng tách 8.9.2 khắc phục và 8.9.3 hành động khắc phục.
- Ví dụ của album: một mẻ thanh trùng thiếu nhiệt; cô lập mẻ và xử lý lại là khắc phục; tìm ra van hơi kẹt rồi thay van, thêm lịch bảo trì là hành động khắc phục. Chú ý: trong Codex (bài CNTP-Ngay13) "hành động khắc phục" được dùng rộng, gồm cả việc xử lý sản phẩm.
- Điều 8.9.4 "xử lý sản phẩm có thể không an toàn" gồm 8.9.4.2 đánh giá để thả hàng và 8.9.4.3 xử lý sản phẩm không phù hợp; 8.9.5 rút lại hoặc thu hồi (mục lục). Nghĩa là lô hàng nghi ngờ bị giữ lại, chỉ được thả khi có bằng chứng đánh giá là an toàn; không đạt thì xử lý (tái chế, chuyển mục đích hoặc hủy, như Codex).
- Nhớ: Khắc phục (correction) = sửa chỗ sai đã thấy · hành động khắc phục (corrective action) = diệt nguyên nhân · 8.9.4 giữ hàng nghi ngờ, đánh giá rồi mới thả hoặc xử lý.

### Cảnh 4.4 – Truy xuất nguồn gốc, ứng phó tình huống khẩn cấp và rút lại hay thu hồi là ba yêu cầu điều 8 thêm vào ngoài các nguyên tắc HACCP

- **Thẻ:** Định nghĩa
- Mục lục ISO 22000:2018: 8.3 hệ thống {{truy xuất nguồn gốc}}; 8.4 chuẩn bị và ứng phó tình huống khẩn cấp (8.4.2 xử lý tình huống khẩn cấp và sự cố); 8.9.5 rút lại hoặc {{thu hồi sản phẩm}} (withdrawal/recall). Bảy nguyên tắc HACCP của Codex không có ba mục riêng này, nên đây là phần ISO 22000 bọc thêm quanh HACCP (nhận xét của album từ việc so mục lục với 7 nguyên tắc trên slide 12/11).
- Liên hệ đã học: SSOP của Việt Nam có quy phạm thu hồi sản phẩm (bài CNTP-Ngay04); NQA kể ISO 22005 là tiêu chuẩn riêng về truy xuất trong chuỗi thức ăn chăn nuôi và thực phẩm. Lý do (kiến thức thêm, cần đối chiếu bài giảng): truy xuất cho biết lô nào dùng nguyên liệu nào, đi tới đâu, nên khi phải thu hồi thì thu đúng lô thay vì thu tất cả.
- Nhớ: 8.3 truy xuất · 8.4 ứng phó khẩn cấp · 8.9.5 rút lại hoặc thu hồi · ba phần này ISO 22000 thêm ngoài 7 nguyên tắc HACCP.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao một hệ thống truy xuất tốt làm giảm thiệt hại khi phải thu hồi. | đáp: Nếu biết chính xác lô nguyên liệu nhiễm đã vào những lô thành phẩm nào và các lô đó đã giao cho ai, nhà máy chỉ cần rút lại hoặc thu hồi đúng những lô đó; không có truy xuất thì để an toàn phải thu hồi mọi sản phẩm cùng thời gian, tốn kém hơn nhiều và chậm hơn, trong khi người tiêu dùng vẫn có nguy cơ ăn phải hàng nhiễm. Phần lý giải là của album.]

[QUIZ]
1. Trong ISO 22000:2018, kế hoạch kiểm soát mối nguy (điều 8.5.4) chứa?
  - A) Chỉ CCP
  - B) Cả CCP và OPRP (kế hoạch HACCP/OPRP)
  - C) Chỉ PRP
  - D) Chỉ chính sách
  - đáp: B
  - vì sao: Mục lục ghi Hazard control plan (HACCP/OPRP plan) và giám sát tại CCP và cho OPRP; sai C: PRP ở điều 8.2.
2. Bước 6 "phân tích mối nguy" trong 12 bước HACCP ứng với điều khoản nào (theo tên điều khoản)?
  - A) 8.5.2
  - B) 8.3
  - C) 9.3
  - D) 4.1
  - đáp: A
  - vì sao: 8.5.2 Hazard analysis; sai B: truy xuất; sai C: xem xét của lãnh đạo; sai D: bối cảnh.
3. Theo cách tóm của NQA, việc nào làm TRƯỚC hoạt động?
  - A) Giám sát
  - B) Thẩm tra
  - C) Xác nhận giá trị sử dụng (validation)
  - D) Thu hồi
  - đáp: C
  - vì sao: Validation là "đánh giá tương lai"; sai A: giám sát làm trong; sai B: thẩm tra làm sau.
4. Một mẻ thanh trùng thiếu nhiệt bị cô lập và xử lý lại. Việc này là?
  - A) Khắc phục (correction)
  - B) Hành động khắc phục loại bỏ nguyên nhân (corrective action)
  - C) Validation
  - D) Truy xuất
  - đáp: A
  - vì sao: Xử lý sự không phù hợp đã thấy là khắc phục theo định nghĩa FSA; sai B: chỉ khi tìm và loại bỏ nguyên nhân (ví dụ van hơi kẹt) mới là hành động khắc phục.
5. Mục nào KHÔNG phải yêu cầu ISO 22000 thêm vào ngoài 7 nguyên tắc HACCP theo mục lục?
  - A) Hệ thống truy xuất (8.3)
  - B) Ứng phó tình huống khẩn cấp (8.4)
  - C) Rút lại hoặc thu hồi (8.9.5)
  - D) Thiết lập giới hạn tới hạn
  - đáp: D
  - vì sao: Giới hạn tới hạn đã là nguyên tắc 3 của HACCP; sai A, B, C: đều là phần bọc thêm.
6. Theo mục lục, sản phẩm có thể không an toàn được xử lý thế nào trong điều 8.9.4?
  - A) Bán ngay rồi theo dõi
  - B) Đánh giá để thả hàng, không đạt thì xử lý sản phẩm không phù hợp
  - C) Luôn hủy toàn bộ
  - D) Chỉ ghi chú vào sổ
  - đáp: B
  - vì sao: 8.9.4.2 evaluation for release và 8.9.4.3 disposition; sai C: không phải lúc nào cũng hủy, có thể đánh giá đạt rồi thả hoặc tái chế.
7. [TỰ LUẬN] Phân biệt khắc phục với hành động khắc phục và nêu cách ISO 22000:2018 xử lý sản phẩm có thể không an toàn. | mẫu: Khắc phục (correction, 8.9.2) là hành động loại bỏ sự không phù hợp đã phát hiện, ví dụ cô lập và xử lý lại mẻ thiếu nhiệt; hành động khắc phục (corrective action, 8.9.3) là loại bỏ nguyên nhân để không lặp lại, ví dụ thay van hơi kẹt và thêm lịch bảo trì. Sản phẩm có thể không an toàn (8.9.4) được giữ lại, đánh giá để thả nếu có bằng chứng an toàn, không đạt thì xử lý như tái chế, chuyển mục đích hoặc hủy; nếu đã ra thị trường thì rút lại hoặc thu hồi (8.9.5), nhờ hệ thống truy xuất (8.3) để thu đúng lô.
[/QUIZ]

[TÓM: Điều 8.5 đi lại các bước HACCP và gom CCP với OPRP vào một kế hoạch kiểm soát mối nguy | Validation làm trước còn giám sát làm trong và thẩm tra làm sau | Khắc phục sửa chỗ sai còn hành động khắc phục diệt nguyên nhân và ISO 22000 thêm truy xuất ứng phó khẩn cấp và thu hồi]

---

## Chương 5 – IELTS Listening: Community garden open day

[HỎI TRƯỚC: Trong Listening dạng điền chỗ trống, người nói đọc "at the start we had twelve beds; today there are sixty". Câu hỏi là "Number of raised beds now: ___". Bạn ghi số nào? | đáp: 60 (sixty). | vì sao: Người nói nêu số cũ trước rồi mới nêu số hiện tại; đây là bẫy thông tin gây nhiễu (distractor) quen thuộc của IELTS (Cảnh 5.4).]

### Cảnh 5.1 – Phần đầu bài nghe giới thiệu lịch sử khu vườn với ba con số dễ bị nhầm

- **Thẻ:** Ví dụ số
- Bài nghe dạng Section 2 (một người nói). Không có tệp âm thanh: hãy nhờ bạn đọc to hoặc dùng công cụ đọc văn bản, nghe MỘT lần rồi mới làm câu hỏi; sau đó mới đọc bản chép dưới đây.
- **Part 1.** "Good morning, everyone, and welcome to the Riverside Community Garden open day. My name is Helen, and I'm one of the volunteer coordinators. Before you walk around, I'd like to tell you a little about how the garden works. The garden was set up eight years ago on land that used to be a car park belonging to the old railway station. When the station closed, local residents asked the council if they could use the space, and the council agreed to rent it to us for just one pound a year. At the start we had only twelve raised beds; today there are sixty, and they are shared by about two hundred members."
- Nhớ: Part 1: tám năm trước · đất cũ là bãi đỗ xe (car park) · thuê 1 bảng/năm · 12 luống lúc đầu → 60 luống bây giờ · khoảng 200 thành viên.

### Cảnh 5.2 – Phần giữa nêu phí thành viên, danh sách chờ, nơi nhận rau và ngày làm việc

- **Thẻ:** Ví dụ số
- **Part 2.** "Membership costs fifteen pounds a year for adults, and it's free for children under sixteen and for people over seventy. Members can rent a raised bed of their own, but there's a waiting list at the moment of about six months, so most new members start by helping in the shared beds near the entrance. Everything grown in the shared beds is given to the food bank in the town centre, which last year received nearly two tonnes of vegetables from us. Working days are Wednesday evenings and Saturday mornings. You don't need to bring any tools, because we keep everything in the shed, but please do bring gloves and wear strong shoes."
- Nhớ: Part 2: người lớn 15 bảng/năm (miễn phí dưới 16 và trên 70) · chờ khoảng 6 tháng · rau luống chung cho food bank (gần 2 tấn năm ngoái) · tối thứ Tư và sáng thứ Bảy · mang găng tay, đi giày chắc.

### Cảnh 5.3 – Phần cuối nêu ba quy định về thuốc phun, nước tưới và ủ phân

- **Thẻ:** Ví dụ số
- **Part 3.** "Now, a few rules. We're an organic garden, so no chemical sprays are allowed. If you have problems with insects, talk to Tom, who runs our pest-control workshops on the first Saturday of every month. Water is the other big issue. We collect rainwater from the roof of the shed in four large tanks, and we ask members to use that first and only use the tap when the tanks are empty. Finally, the composting area is at the far end of the garden, behind the greenhouse. Please put only fruit and vegetable waste there: no meat, no bread and no cooked food, because they attract rats. Right, if you'd like to sign up, the membership forms are on the table by the gate. Enjoy your visit."
- Nhớ: Part 3: hữu cơ, cấm thuốc phun hóa học · Tom dạy trừ sâu thứ Bảy đầu tháng · dùng nước mưa (4 bồn) trước, vòi sau · ủ phân sau nhà kính, chỉ vỏ rau quả, không thịt, bánh mì, đồ nấu chín.

### Cảnh 5.4 – Bẫy lớn nhất của Listening là thông tin bị sửa lại ngay sau khi nói nên phải nghe hết câu rồi mới ghi

- **Thẻ:** Hiểu sai thường gặp
- Ba kiểu bẫy trong bài: số cũ và số mới (12 → 60 luống); điều kiện ngoại lệ (miễn phí cho dưới 16 và trên 70, còn người lớn 15 bảng); danh sách "không" (không cần mang dụng cụ nhưng PHẢI mang găng tay). Ghi ngay từ đầu tiên nghe thấy là mất điểm.
- Chiến lược (kiến thức chung về luyện thi, cần thầy cô IELTS góp ý): đọc trước câu hỏi, đoán loại từ cần điền (số, danh từ, ngày); nghe tín hiệu chuyển ý như "Now, a few rules", "Finally"; với câu giới hạn số từ, kiểm lại chính tả và số ít số nhiều.
- Nhớ: Nghe hết câu rồi mới ghi · cảnh giác "at the start… today", "but", "only", "no" · đọc trước câu hỏi để biết cần số hay chữ.

[TỰ GIẢI THÍCH: Hãy tự nói vì sao với câu "What do new members need to bring?" đáp án là gloves and strong shoes chứ không phải tools. | đáp: Người nói có nhắc tools nhưng trong câu phủ định "You don't need to bring any tools, because we keep everything in the shed", rồi chuyển bằng "but please do bring gloves and wear strong shoes". Từ "but" báo hiệu thông tin cần ghi nằm sau; tools là thông tin gây nhiễu.]

[QUIZ]
1. (Điền NO MORE THAN TWO WORDS) Before the garden was set up, the land was used as a ______.
  - A) railway station
  - B) car park
  - C) school field
  - đáp: B
  - vì sao: Câu bằng chứng: "land that used to be a car park belonging to the old railway station"; sai A: nhà ga là chủ sở hữu bãi đỗ xe, không phải khu đất vườn.
2. How much does the council charge for the land each year?
  - A) One pound
  - B) Fifteen pounds
  - C) Nothing
  - đáp: A
  - vì sao: Câu bằng chứng: "rent it to us for just one pound a year"; sai B: 15 bảng là phí thành viên người lớn.
3. How many raised beds are there now?
  - A) 12
  - B) 60
  - C) 200
  - đáp: B
  - vì sao: "At the start we had only twelve raised beds; today there are sixty"; sai A: số lúc đầu; sai C: số thành viên.
4. Who can join for free?
  - A) Everyone in the first month
  - B) Children under sixteen and people over seventy
  - C) Volunteers who work on Saturdays
  - đáp: B
  - vì sao: Câu bằng chứng: "free for children under sixteen and for people over seventy".
5. How long is the waiting list for a bed of your own?
  - A) About two months
  - B) About six months
  - C) About eight years
  - đáp: B
  - vì sao: "a waiting list at the moment of about six months"; sai C: tám năm là tuổi của khu vườn.
6. Vegetables from the shared beds go to
  - A) members' families
  - B) a food bank in the town centre
  - C) the local market
  - đáp: B
  - vì sao: "Everything grown in the shared beds is given to the food bank in the town centre".
7. When are the working days?
  - A) Wednesday mornings and Saturday evenings
  - B) Wednesday evenings and Saturday mornings
  - C) Weekends only
  - đáp: B
  - vì sao: "Working days are Wednesday evenings and Saturday mornings"; sai A: đảo buổi.
8. Tom's workshops are about
  - A) composting
  - B) collecting rainwater
  - C) pest control
  - đáp: C
  - vì sao: "talk to Tom, who runs our pest-control workshops".
9. Which item may NOT go in the compost?
  - A) Fruit peel
  - B) Vegetable waste
  - C) Bread
  - đáp: C
  - vì sao: "no meat, no bread and no cooked food, because they attract rats"; sai A, B: chỉ rau quả được phép.
10. [TỰ LUẬN] Where is the composting area, and where are the membership forms? (Viết câu tiếng Anh ngắn.) | mẫu: The composting area is at the far end of the garden, behind the greenhouse, and the membership forms are on the table by the gate.
[/QUIZ]

[TÓM: Bài nghe cho số liệu khu vườn gồm 60 luống 200 thành viên phí người lớn 15 bảng và chờ 6 tháng | Ba quy định là cấm thuốc phun hóa học dùng nước mưa trước và chỉ ủ rau quả | Bẫy Listening là số cũ số mới ngoại lệ và câu phủ định nên nghe hết câu rồi mới ghi]

---

## Bản đồ kiến thức

[BẢN ĐỒ]
ISO 22000:2018 --dùng--> cấu trúc cấp cao 10 điều khoản
ISO 22000:2018 --tích hợp--> nguyên tắc HACCP của Codex
Điều 4 đến 7 --là--> Plan của vòng tổ chức
Điều 8 vận hành --chứa--> vòng PDCA vận hành
Phân tích mối nguy --phân loại biện pháp thành--> OPRP hoặc CCP
PRP --là nền cho--> OPRP và CCP
OPRP --theo dõi bằng--> tiêu chí hành động
CCP --theo dõi bằng--> giới hạn tới hạn
Kế hoạch kiểm soát mối nguy --gồm--> CCP và OPRP
Validation --làm trước--> giám sát
Giám sát --làm trước--> thẩm tra
Khắc phục --sửa--> sự không phù hợp đã thấy
Hành động khắc phục --loại bỏ--> nguyên nhân
Truy xuất nguồn gốc --giúp--> thu hồi đúng lô
[/BẢN ĐỒ]

## Ôn rải

Làm không nhìn lại rồi đối chiếu; lịch ôn 1, 3, 7, 21 ngày.

[ÔN RẢI: lịch: 1,3,7,21]
1. Kể mười điều khoản của ISO 22000:2018. | từ: CNTP-N16-C1 | đáp: Phạm vi, tài liệu viện dẫn, thuật ngữ và định nghĩa, bối cảnh, lãnh đạo, hoạch định, hỗ trợ, vận hành, đánh giá kết quả thực hiện, cải tiến.
2. Bốn yếu tố chính của ISO 22000? | từ: CNTP-N16-C1 | đáp: Trao đổi thông tin tương tác, quản lý hệ thống, chương trình tiên quyết, nguyên tắc HACCP.
3. Xếp điều 4–10 vào vòng PDCA của tổ chức. | từ: CNTP-N16-C2 | đáp: Plan = 4, 5, 6, 7; Do = 8; Check = 9; Act = 10.
4. Rủi ro trong ISO 22000:2018 được xét ở hai cấp nào? | từ: CNTP-N16-C2 | đáp: Cấp tổ chức (điều 6.1 rủi ro và cơ hội) và cấp vận hành (điều 8.5.2 phân tích mối nguy).
5. OPRP khác CCP ở hai điểm nào theo bảng FSA? | từ: CNTP-N16-C3 | đáp: Tiêu chí (tiêu chí hành động đo hoặc quan sát được so với giới hạn tới hạn đo được) và xử lý khi mất kiểm soát (CCP xử lý sản phẩm định sẵn; OPRP khắc phục quá trình, sản phẩm xét từng trường hợp).
6. Điều nào phân loại biện pháp kiểm soát thành OPRP hay CCP? | từ: CNTP-N16-C3 | đáp: 8.5.2.4 Lựa chọn và phân loại biện pháp kiểm soát.
7. Validation, giám sát, thẩm tra lần lượt làm lúc nào? | từ: CNTP-N16-C4 | đáp: Trước, trong và sau hoạt động.
8. Khắc phục khác hành động khắc phục thế nào? | từ: CNTP-N16-C4 | đáp: Khắc phục loại bỏ sự không phù hợp đã phát hiện; hành động khắc phục loại bỏ nguyên nhân của nó.
9. Bốn câu của cây quyết định CCP bản 2020 theo Codex? | từ: CNTP-N13-C2 | đáp: PRP kiểm soát được chưa; có biện pháp riêng không; bước sau có xử lý không; chính bước này có kiểm soát riêng được không.
10. Giám sát CCP nên thế nào theo Codex mục 19.9? | từ: CNTP-N13-C3 | đáp: Liên tục khi có thể; không liên tục thì đủ dày để giới hạn lượng sản phẩm bị ảnh hưởng; người giám sát ký hồ sơ.
11. Ba chỉ số chất lượng chất béo chiên trong giáo trình Lê Văn Việt Mẫn? | từ: CNTP-N15-C1 | đáp: Chỉ số acid, chỉ số iodine, chỉ số peroxide.
12. Công thức F₀ theo PNSU trong giáo trình Lê Mỹ Hồng? | từ: CNTP-N14-C2 | đáp: F₀ = D (ở 121,1 °C) nhân tổng số chu kỳ log từ số bào tử ban đầu tới xác suất sống sót chấp nhận được.
[/ÔN RẢI]

**Bài sau:** khi Drive có slide QLCL 19/11 hoặc 26/11, hay slide CNCB 24/11, bài kế tiếp sẽ ôn đúng chữ slide và sửa chỗ khác các bài đọc trước (Ngay13, Ngay14, Ngay15, Ngay16).

---

## Từ điển thuật ngữ

| Term | IPA | Loại từ | Nghĩa Anh | Nghĩa Việt | Ví dụ Anh – Việt |
|---|---|---|---|---|---|
| operational prerequisite programme | /ˌɒpəˈreɪʃənəl priːˈrekwɪzɪt ˈprəʊɡræm/ | n | A control measure, identified by hazard analysis, that is essential for a significant hazard and is monitored by action criteria. | Chương trình tiên quyết vận hành (OPRP). | Cleaning between batches was classified as an OPRP. – Vệ sinh giữa các mẻ được xếp là OPRP. |
| action criterion | /ˈækʃən kraɪˈtɪəriən/ | n | A measurable or observable specification for monitoring an OPRP. | Tiêu chí hành động. | The action criterion was a visibly clean surface. – Tiêu chí hành động là bề mặt sạch nhìn thấy. |
| interested party | /ˈɪntrəstɪd ˈpɑːti/ | n | A person or organisation that can affect or be affected by a decision or activity. | Bên quan tâm. | Regulators are an important interested party. – Cơ quan quản lý là một bên quan tâm quan trọng. |
| traceability | /ˌtreɪsəˈbɪləti/ | n | The ability to follow a product and its ingredients through the food chain. | Truy xuất nguồn gốc. | Good traceability made the recall faster. – Truy xuất tốt giúp thu hồi nhanh hơn. |
| raised bed | /reɪzd bed/ | n | A garden bed built above the ground inside a frame. | Luống trồng nâng cao. | Each member can rent a raised bed. – Mỗi thành viên có thể thuê một luống nâng cao. |
| waiting list | /ˈweɪtɪŋ lɪst/ | n | A list of people who are waiting for something to become available. | Danh sách chờ. | There is a six-month waiting list. – Có danh sách chờ sáu tháng. |
| food bank | /fuːd bæŋk/ | n | A place that gives free food to people in need. | Ngân hàng thực phẩm (nơi phát thực phẩm miễn phí). | The vegetables were given to a food bank. – Rau được tặng cho ngân hàng thực phẩm. |
| compost | /ˈkɒmpɒst/ | n, v | Decayed plant material used to improve soil; to make such material. | Phân ủ; ủ phân. | Only fruit and vegetable waste can be composted. – Chỉ vỏ rau quả được ủ phân. |

---

## Nguồn tham khảo

**Slide và ghi chép lớp (nguồn ưu tiên 1)**
1. Slide QLCL chương 3 buổi 05/11/2026 (vòng bốn khối quanh logo ISO 22000, tháp HACCP trên PRP), ghi chép ban-hoc-cntp/ghi-chep/qlcl-buoi-2026-11-05.md; slide 12 bước và 7 nguyên tắc HACCP buổi 12/11/2026, ghi chép ban-hoc-cntp/ghi-chep/qlcl-buoi-2026-11-12.md; ghi chú buổi 1 "PDCA là linh hồn của ISO 22000" và thứ tự môn Chương 3 → 4 → 5. Chưa có slide Chương 5 (kiểm thư mục Drive Bàn học CNTP lúc soạn, không có ảnh mới sau 19/11).
2. Album CNTP-Ngay02, Ngay04, Ngay12, Ngay13, Ngay14, Ngay15 v3 cho phần nối bài, Nhớ lại và Ôn rải.

**Văn bản đã mở (nguồn ưu tiên 2)**
3. ISO 22000:2018 Food safety management systems — Requirements for any organization in the food chain, mục lục (bản xem trước của DIN, https://www.din.de/de/mitwirken/normenausschuesse/nal/veroeffentlichungen/wdc-beuth:din21:292055119/toc-2868094/download), đã mở 24/11/2026: tên các điều 1–10, 8.1–8.9 và các mục con, Phụ lục A, B.
4. ISO, trang tiêu chuẩn ISO 22000:2018, https://www.iso.org/standard/65464.html, mở 24/11/2026: trạng thái Published (ấn bản 2), xác nhận lại 2023, dự kiến thay bằng ISO/DIS 22000; mô tả tiêu chuẩn và bốn yếu tố chính.
5. NQA, ISO 22000:2018 Food Safety Management System Implementation Guide (PDF), https://www.nqa.com/medialibraries/NQA/NQA-Media-Library/PDFs/NQA-ISO-22000-Implementation-Guide.pdf, đã đọc 12 trang đầu ngày 24/11/2026: lịch sử, phạm vi, Annex SL, hai vòng PDCA, nguyên tắc 2005 và 2018, định nghĩa (mối nguy đáng kể, biện pháp kiểm soát, mức chấp nhận được, tiêu chí hành động, rủi ro, CCP, OPRP, giám sát, validation, thẩm tra), điều 4.
6. Food Standards Agency, MyHACCP "Operational Prerequisite Programmes (OPRPs)", https://myhaccp.food.gov.uk/help/guidance/operational-prerequisite-programmes-oprps, mở 24/11/2026: ví dụ khử trùng thiết bị và bảng so sánh PRP/OPRP/CCP lấy từ Commission Notice 2016/C 278/01, định nghĩa correction và corrective action.
7. SGS, "FSSC 22000 V7: Key Changes, Timeline and Implementation" (02/2026), https://www.sgs.com/en/news/2026/02/fssc-22000-v7-key-changes-timeline-and-implementation: Sửa đổi 1 về khí hậu (2024), bản ISO 22000 mới đang soạn, chuyển ISO/TS 22002 sang ISO 22002-x.

**Kiến thức thêm (cần đối chiếu bài giảng)**
8. Bảng đối chiếu 12 bước với điều 8.5 (suy từ tên điều khoản), các ví dụ của album (nhà cung cấp bao bì, bề mặt sạch nhìn thấy, vệ sinh chuyển đổi sản phẩm có lạc, mẻ thanh trùng thiếu nhiệt và van hơi kẹt), tên tiếng Việt "chương trình tiên quyết hoạt động", chiến lược làm IELTS Listening.
9. Bài nghe Community garden open day do Claude tự viết để luyện tập; mọi tên và số liệu trong bài là hư cấu.

**Hình:** không dùng ảnh slide hay ảnh lớp. Ba hoạt hình (q16-hai-vong-pdca, q16-prp-oprp-ccp, q16-truoc-trong-sau) là sơ đồ chữ tự dựng, mỗi hình gắn một khẳng định, một nguồn và giới hạn. Không dùng bài báo khoa học (không có DOI).

---

## Cần kiểm tra lại

1. Đây là bài ĐỌC TRƯỚC Chương 5 khi chưa có slide: cô có thể vẫn giảng tiếp HACCP ngày 26/11, hoặc dạy ISO 22000 theo TCVN ISO 22000:2018 với chữ khác (ví dụ "chương trình tiên quyết hoạt động", "xác minh", "hành động khắc phục"). Khi có slide, slide thắng bài này.
2. Định nghĩa OPRP, CCP, tiêu chí hành động, mức chấp nhận được, validation, giám sát, thẩm tra lấy qua cách diễn đạt của NQA, chưa mở được điều 3 nguyên văn (trang ISO OBP đòi đăng nhập). Không dùng làm câu trích nguyên văn khi thi.
3. Cách xếp điều khoản vào hai vòng PDCA theo hình của NQA; hình gốc ở mục 0.3.2 tiêu chuẩn chưa xem được.
4. Bảng đối chiếu 12 bước HACCP với điều 8.5 là suy luận từ tên điều khoản; Phụ lục A của tiêu chuẩn có bảng chính thức chưa mở. Riêng bước 1 (lập nhóm) chưa gán điều khoản vì mục lục không có tên "nhóm an toàn thực phẩm".
5. Bảng so sánh PRP/OPRP/CCP là hướng dẫn của EU và FSA (Anh), không phải nguyên văn ISO 22000; nhiều sách tiếng Việt có bảng tương tự nhưng có thể khác chi tiết.
6. Trạng thái ISO 22000 kiểm ngày 24/11/2026: vẫn là bản 2018; ISO báo sắp thay bằng bản mới (đang ở giai đoạn DIS). Kiểm lại trước kỳ thi. Bài không dùng văn bản pháp luật Việt Nam, nên không có luật năm 2026 cần kiểm.
7. Bài nghe tiếng Anh do Claude viết, không có tệp âm thanh; IPA chưa đối chiếu từ điển chuẩn.
8. Tên mã: luật "số file v3 + 1" cho số 13 (đã có CNTP-Ngay13), nên lấy số kế tiếp sau Ngay15 là Ngay16 để không ghi đè.

verified: false — Soạn tự động 24/11/2026 khi chưa có slide QLCL 19/11 và 26/11; khung môn theo ghi chép lớp (Chương 3 → 4 → 5); nội dung theo mục lục ISO 22000:2018 (DIN), trang iso.org, hướng dẫn NQA, bảng FSA MyHACCP và SGS, đều mở trong lần soạn này; kiến thức thêm và suy luận đã ghi rõ; bài không có phép tính; kiểm cấu trúc, thuật ngữ, mô phỏng và SVG bằng script; chưa có xác nhận của cô.
