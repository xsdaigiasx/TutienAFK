# Mỹ thuật giai đoạn 1 — M01 đến M10

Phạm vi chơi để tập trung phát triển và kiểm chứng giai đoạn 1: M01–M10, tương ứng Luyện Khí và Trúc Cơ. Bản cập nhật 0.11.0 hoàn thành phần nền địa điểm và hệ ảnh vật phẩm; không có nghĩa toàn bộ gameplay giai đoạn 1 đã hoàn tất. Các chức năng còn thiếu của GDD vẫn theo báo cáo tiến độ v0.10.0.

## Bộ nền

Mỗi địa điểm có một ảnh 1536×1024 riêng. Nền được dùng ở trang địa điểm, khu chiến đấu và cửa sổ xem ảnh. Bản đồ toàn thế giới giữ vai trò chỉ đường, không bị thay bằng ảnh địa điểm. M11–M45 chưa có nền địa điểm riêng trong đợt này; dùng ảnh Giới hiện có làm dự phòng. Không xóa bản lưu hoặc khóa lại tiến trình cũ.

| Map | Địa điểm | Dấu hiệu |
|---|---|---|
| M01 | Vô Danh Thôn | Mái tranh, tre, cầu gỗ, dòng suối |
| M02 | Thanh Ngưu Trấn | Phố ngói, cầu đá, cổng hình trâu |
| M03 | Thất Huyền Môn | Sơn môn, núi dựng, bậc thang |
| M04 | Hắc Phong Sơn | Nham thạch tối, cầu dây, sơn trại |
| M05 | Thái Nam Cốc | Thung lũng xanh, chợ tu sĩ, vườn thuốc |
| M06 | Hoàng Phong Cốc | Vách núi vàng, tông môn, cây thu |
| M07 | Huyết Sắc Cấm Địa | Rừng đỏ, cổng phong ấn, đầm tối |
| M08 | Yểm Nguyệt Tông | Hồ trăng bạc, đình trắng, hoa nhạt |
| M09 | Vạn Khôi Sơn | Công xưởng núi, khôi lỗi, bánh xe nước |
| M10 | Việt Kinh Thành | Kinh thành, kênh nước, hoàng cung đỏ vàng |

## Chín bậc hình vật phẩm

Bậc ảnh theo **cảnh giới xuất xứ**. Phẩm chất Trắng/Lục/Lam/Tím/Cam/Đỏ là trục độc lập, chưa có roll instance hoặc sáu biến thể phẩm chất trong đợt này. Không dùng độ sáng của ảnh để thay đổi chỉ số hay giả lập phẩm hiếm.

| Bậc | Cảnh giới | Chất liệu / màu / độ nổi bật |
|---|---|---|
| 1 | Luyện Khí | Sắt mộc, gỗ, vải, da; đất và xanh trầm, không hào quang |
| 2 | Trúc Cơ | Thép sáng, chỉ ngọc, ngọc nhỏ; xanh ngọc tiết chế |
| 3 | Kim Đan | Bạc và viền vàng, đá hổ phách, linh quang ấm |
| 4 | Nguyên Anh | Bạch ngọc, kim loại lam, bảo thạch xanh, linh hồn lam |
| 5 | Hóa Thần | Bạch kim, lam ngọc, linh văn, hình khối mạnh hơn |
| 6 | Luyện Hư | Tím hư không, bạc tối, lõi và vòng hư không |
| 7 | Hợp Thể | Ngọc lục, vàng tiên, vân long, lõi xanh vàng |
| 8 | Đại Thừa | Trắng ngà, đỏ vàng, hoa văn uy nghi, hào quang đỏ vàng |
| 9 | Chân Tiên | Ngọc pha lê, vàng cổ, tinh quang và mô-típ Thế Giới Thụ |

Mỗi bậc là một atlas 6 cột ×5 hàng: 30 hình, tổng 270 hình. 18 hình trang bị/bậc: Kiếm Tu, Pháp Tu, Thể Tu, mỗi hướng sáu ô. 12 hình còn lại: thảo dược, quặng, tinh hồn, năm nhóm đan, tinh thiết, linh dịch, phù và bảo thạch.

Các mẫu cùng cảnh giới, hướng tu và vị trí dùng chung hình. Ví dụ năm mẫu kiếm Kiếm Tu trong Luyện Khí dùng chung một hình; đây không phải 810 hình trang bị vẽ riêng. Các linh thảo/quặng/tinh hồn cùng bậc cũng dùng hình đại diện theo nhóm; tên và số liệu riêng giữ từ GDD. Tiện ích và vật phẩm không phân cảnh giới dùng hình đại diện chung, không tự tạo thêm điều kiện cảnh giới.

## Tệp và cách dùng

- `assets/stage1-v011/map_001.webp` … `map_010.webp`: nền riêng.
- `assets/stage1-v011/tier_01.webp` … `tier_09.webp`: chín atlas có alpha trong suốt.
- `data/location_visuals.json`: ánh xạ ID map sang nền.
- `data/item_art.json`: ánh xạ 810 template trang bị +242 item GDD +1 thuốc demo, tổng 1.053 ID.
- `docs/art-assets-v011.json`: prompt đầy đủ, kích thước và thông tin ảnh cuối dùng trong game.

Hàng atlas 1/2/3: Kiếm Tu/Pháp Tu/Thể Tu; cột lần lượt vũ khí, mũ, áo, hộ uyển, giày, ngọc bội. Hàng4: linh thảo, quặng, tinh hồn, đan tu vi, đan đột phá, đan công. Hàng5: đan HP, đan thủ, tinh thiết, linh dịch, phù, bảo thạch.

Dùng trường `rows`, `columns`, `row`, `column`, `cell_aspect` trong manifest. Không mặc định mọi atlas có cùng kích thước; ô ảnh được giữ đúng tỷ lệ để tránh kéo méo. Không cần cắt ảnh thủ công.

Ảnh được tạo bằng công cụ ImageGen tích hợp, sau đó chỉ chuyển mã sang WebP để dùng trong game; không vẽ lại, cắt, ghép hay xóa nền bằng script. Các ảnh gốc tạo sinh được giữ riêng. Tổng 19 WebP khoảng 9,8 MiB, chỉ tải bộ bậc được hiển thị trên trang.

## Kiểm tra

46 kiểm tra tự động và build đã qua. Có kiểm đủ 10 nền khác nhau, đúng tên map, đủ 1.053 ID, đúng ba hướng/sáu ô/chín bậc, đúng tọa độ atlas và tỷ lệ nguồn. Đã kiểm đọc được 19 WebP và alpha trong suốt của cả chín atlas. Các ảnh tạo sinh đã được xem; chưa có kiểm tra giao diện trực tiếp trên điện thoại.
