# Đối chiếu tiến độ Vạn Đạo v0.10.0 với GDD V3

Ngày kiểm tra: 18/10/2026 (giờ Việt Nam).

Nguồn đối chiếu: Tu_Tien_Idle_MMO_GDD_V3(1).zip, tài liệu Tu_Tien_Idle_MMO_GDD_V3.md và các bảng JSON đi kèm. SHA-256 của tài liệu: f1f55404c5e48322f258b6a12bf2be34f9adb74126e9d734af0ce6e54353232a.

## Kết luận

Bản hiện tại là bản chơi thử cá nhân có vòng hoạt động chạy được. Chưa phải MMO hoàn chỉnh và chưa hoàn thành GDD. Đủ danh mục không có nghĩa đã đủ hiệu ứng, nguồn kiếm, cân bằng hoặc nội dung chơi. Không gán phần trăm hoàn thành vì GDD chưa chia trọng số công việc.

Các yêu cầu mới trong hội thoại được ưu tiên hơn GDD cũ: Luyện Khí có 10 tầng, tám cảnh giới sau có bốn giai đoạn; chiến đấu auto tối đa bốn giờ; bản đồ dùng zoom để chuyển mức chi tiết; bố cục mobile năm tab đã chỉnh theo yêu cầu. Đây là thay đổi có chủ đích, không tính là thiếu so với bản cũ.

## Kiểm kê dữ liệu và khả năng sử dụng

| Nội dung | Dữ liệu hiện có | Thực tế trong game |
|---|---:|---|
| Giới / tinh vực / quốc / vùng / địa điểm | 3 / 8 / 8 / 18 / 45 | Có bản đồ, địa điểm, di chuyển, mở khóa và zoom. Thời gian di chuyển vẫn là 8 giây thử nghiệm, chưa theo khoảng cách GDD. |
| Quái / Boss / ô kỹ năng Boss | 135 / 45 / 135 | Có ảnh, chỉ số, trận auto, Boss niệm chiêu, khiên, một số hiệu ứng. Chưa đủ toàn bộ cơ chế và cân bằng. |
| Cảnh giới | 9 | Tiến trình theo yêu cầu mới: 42 mốc gồm 10 tầng Luyện Khí và 32 giai đoạn. Đột phá đang bảo đảm thành công khi đầy tu vi. |
| Công pháp / pháp bảo | 45 / 15 | Công pháp học, nâng cấp, gắn tối đa bốn kỹ năng. Chạy hệ số sát thương và cơ chế hỗ trợ đơn giản; nội tại chưa đúng đầy đủ. Pháp bảo mới có dữ liệu, chưa có trang bị/chiến đấu. |
| Bộ trang bị / mẫu món | 135 / 810 | Có mặc, thay, tháo, chỉ số, so sánh chênh lệch và chế tạo mẫu theo công thức. Chưa có instance/roll phẩm riêng, Set4/Set6, cường hóa, khảm, tẩy dòng. Đồ rơi thường vẫn ưu tiên Kiếm Tu. |
| Vật phẩm ngoài trang bị | 242 | Mở danh mục tìm kiếm/lọc loại; hiển thị nguồn, công thức, trạng thái sở hữu. Không phải 242 món đều đã có công dụng. |
| Linh thảo / quặng / tinh hồn | 45 / 45 / 45 | Hái, đào và nhận tinh hồn từ Boss; dùng làm đầu vào công thức. Chưa có phân phối loot đầy đủ theo từng quái. |
| Nguyên liệu tinh luyện | 18 | Có công thức, tiêu hao và đầu ra thật. |
| Đan tu vi / đan tăng chỉ số | 9 / 27 | Dùng được khi đủ cảnh giới và sở hữu. Tu vi: 10 viên/ngày tổng các loại; đan ATK/HP/DEF: 30 viên/mỗi loại theo nguồn cảnh giới, giữ bonus khi lên cảnh giới. HP pill tăng HP tối đa, không hồi HP. |
| Các món còn chờ cơ chế/nguồn | 53 | 9 đan đột phá, 15 phù, 15 bảo thạch, 9 nguyên liệu đột phá và 5 tiện ích. Có danh mục; công dụng/nguồn chưa hoàn chỉnh được ghi rõ, không tiêu hao giả. |
| Công thức | 873 | 45 đan + 18 tinh luyện + 810 trang bị. Bộ chạy xử lý đầu vào, phí, thời gian và xác suất; output trang bị vào kho trang bị. Chưa có phẩm ngẫu nhiên, nguồn học công thức và trừ/giữ nguyên liệu lúc bắt đầu như hợp đồng GDD. |
| Hồi phục trong auto | Một loại demo riêng | Hồi Xuân Đan là thuốc thử nghiệm ngoài 242 món GDD, hồi 40% HP, CD 10 giây; không phải đan HP vĩnh viễn. Chưa dùng Hồi Huyết Tán đúng bộ tiện ích GDD; GDD dự kiến CD chung 30 giây. |

Danh mục 242 item, 810 mẫu trang bị, 135 quái và 45 công pháp đã được so sánh trực tiếp với gói gốc và trùng khớp. Không tạo lại ID hay đổi tên âm thầm trong lần cập nhật này.

## Đánh giá theo hệ thống

| Hệ thống | Trạng thái | Khoảng trống chính |
|---|---|---|
| Giao diện và bản đồ | Có bản chơi thử | Cần thử thực tế trên màn hình 6,3 inch 16:9; chưa có QA trực tiếp trên điện thoại. |
| Vòng hoạt động | Có bản chơi thử | Một hoạt động, offline, dừng, tổng kết đã có; chưa có hàng đợi ba bước, giới hạn túi và hộp nhận tạm. |
| Chiến đấu thường / Boss | Một phần | Có random ba quái/map, auto bốn giờ, chiến thuật HP/đan/kỹ năng; thiếu linh lực nhân vật, khắc hệ, kháng hiệu ứng, diminishing returns, lịch và lượt thưởng Boss. |
| Công pháp / pháp bảo | Một phần / chưa mở | GDD tối đa 5 công pháp + 5 pháp bảo; demo hiện 4 công pháp, chưa có pháp bảo. Bonus công pháp đang cộng đơn giản, chưa tách đúng chỉ hiệu ứng món đang gắn. |
| Linh căn | Hiển thị thử nghiệm | Hiện Kim cố định; chưa có quay căn 19/19/19/19/19/5, phẩm căn, căn phụ và nội tại nghề/chiến đấu. |
| Cảnh giới / đột phá | Một phần | Thiếu nhiệm vụ cảnh giới, đan và vật liệu bắt buộc, xác suất, bảo hiểm thất bại, pity vật liệu Boss. |
| Nghề / kinh tế | Một phần | Chạy thu thập và chế tạo; điểm nghề, bảng phẩm, độ bền, chuyên môn và cân bằng giá còn khác GDD. |
| Linh thú | Bản thử theo yêu cầu mới | Có HP/MP, đánh thường, EXP, cấp, cho ăn/huấn luyện; kỹ năng riêng và bảng cân bằng chưa làm. |
| Nhiệm vụ | Khung tân thủ | Có 5 mục tiêu; chưa có 45 tuyến map, chat NPC, nhánh Chính/Ma và danh vọng. |
| Động phủ | Giao diện nhân vật | Chưa có 5 công trình, nâng cấp, linh điền và hạt giống. |
| Hệ đặc biệt cảnh giới | Chưa triển khai đầy đủ | Ngự kiếm, phẩm Kim Đan, Nguyên Anh bảo mệnh, Tâm Ma và Pháp Tắc. |
| Cộng đồng | Chưa có | Tổ đội, tông môn, Boss thế giới và chợ lệnh mua/bán. |
| Máy chủ MMO | Chưa có | Nhân vật và tài sản đang lưu trình duyệt; chưa có tài khoản, đồng bộ nhiều thiết bị, khóa revision, RNG/server time và sổ cái giao dịch. |
| Số lớn / kiểm chứng cân bằng | Chưa đạt điều kiện phát hành | Engine đang dùng Number; chưa dùng số nguyên chính xác toàn bộ. Chưa mô phỏng 1.000 trận/cấu hình trên 45 map, seed online/offline hay kiểm tranh chấp nhiều thiết bị. |

## Phần bổ sung trong v0.10.0

- Từ trang địa điểm có nút Chiến đấu / Đến chiến đấu. Nếu ở map khác, hoàn tất hành trình rồi mở màn chiến đấu đúng map. Không tự bật săn và không vượt khóa map.
- Túi đồ có danh mục 242 item, tìm theo tên, lọc nhóm, phân trang 24 món để tránh giao diện dài và nặng.
- Thêm dùng 36 đan có tham số rõ trong GDD và giới hạn tiêu thụ tương ứng; giữ bộ đếm trong bản lưu. Giờ ngày dùng Asia/Ho_Chi_Minh từ đồng hồ máy khách, chưa phải giờ server đáng tin cậy.
- Công thức trang bị tạo món vào owned; bản lưu cũ có template trang bị trong bag được chuyển sang kho trang bị mà không nhân đôi.
- Món không giao dịch không có nút bán. Món chưa có nguồn/công dụng được ghi rõ thay vì mô tả như đã hoàn thành.

## Ưu tiên đề xuất tiếp theo

1. Hoàn tất một vòng chơi M01–M05: nguồn item/loot, nhiệm vụ, đột phá có nguyên liệu và pity, điểm nghề theo đúng GDD.
2. Hoàn thiện công pháp, linh lực và pháp bảo; thống nhất công thức sát thương và hiệu ứng, rồi mô phỏng ba hướng tu.
3. Thêm instance trang bị, phẩm chất và Set4/Set6, sau đó mới mở cường hóa/khảm theo bảng được duyệt.
4. Chuẩn bị số nguyên chính xác, tài khoản, lưu server và giao dịch nguyên tử trước khi phát triển chợ/tổ đội/tông môn.
5. QA trực tiếp mobile, kiểm offline cùng seed, cân bằng EXP/giờ và chi phí/giờ trước khi gọi là bản phát hành.

## Kiểm tra lần này

44 kiểm tra tự động và build tĩnh đã qua. Có kiểm giới hạn đan/ngày Việt Nam, đầy thanh tu vi, cap 30 viên, giữ bonus sau tải lại/lên cảnh giới, trang bị chế tạo đúng kho, chuyển dữ liệu cũ và luồng chọn map → di chuyển → chiến đấu. Các kiểm tra này không thay thế kiểm cân bằng hoặc kiểm thử trực tiếp trên điện thoại.
