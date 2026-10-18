# Vạn Đạo v0.12.0 — ảnh quái, giao diện và kho trang phục

## Ảnh quái

135 quái thường được tách từ PNG gốc trong Phu_Luc_C_Quai_Pixel(1).zip, thành 135 WebP riêng tại assets/monsters-single-v012. Dùng alpha để phân vùng hình thực tế, lấy cả phần vượt đường chia ô, thêm ít nhất 18 px đệm, giữ nguyên số pixel và nén lossless. Không phóng ảnh nguồn rồi gọi là tăng độ phân giải.

Kiểm tra toàn bộ: 7.116.633 pixel có alpha >32 trong nguồn đều còn trong tập ảnh tách, mỗi pixel được gán một lần; cả 135 ảnh có mép đệm trong suốt. Một số nét/chi tiết thiếu sẵn trong PNG gốc không được tự vẽ lại. Chi tiết lấy khung có trong monster-extraction-v012.json, script tái tạo là scripts/extract-monsters.py cùng ảnh và manifest PNG gốc.

45 Boss đã là ảnh riêng nên giữ nguyên nguồn. Cả Boss/quái dùng img với object-fit:contain; bỏ lấy ô sprite bằng background-size và bỏ phóng bằng transform. Quái pixel dùng image-rendering:pixelated, hình không nằm dưới tên/HP. Ảnh hiển thị trong danh sách, khu chiến đấu, chi tiết và linh thú theo kích thước riêng có giới hạn.

## CSS và nút

Thay stylesheet cũ khoảng 43 KB bằng stylesheet mới khoảng 26 KB; bỏ các lớp ghi đè từ v0.2 đến v0.11. Gom biến màu, typography, nút chính/nút phụ, form, ảnh, túi đồ, chiến đấu, bản đồ và modal thành các nhóm có trách nhiệm riêng.

Khung game tối đa430 px, không đặt chiều rộng tối thiểu cho nội dung; grid dùng minmax(0,1fr). Menu dưới có safe-area. Modal giới hạn theo chiều cao viewport và có thanh tiêu đề cố định trong modal. Bản đồ vẫn giữ camera vuốt/zoom, thu phóng nhãn và cập nhật chiều cao còn trống bằng engine hiện tại.

Cỡ chạm nút thường36 px, menu46 px; nút bản đồ và nhãn được xử lý riêng để không phình theo CSS nút toàn cục. Ở máy hẹp giảm lưới hành trang còn bốn cột. Không dùng zoom CSS để thu nhỏ cả trang.

Chưa có kiểm tra trình duyệt trực tiếp trên điện thoại 6,3 inch16:9 trong lần này. Các kiểm tra DOM/logic và kích thước khai báo không thay thế đánh giá trực tiếp trên thiết bị.

## Phẩm chất

Trắng: xám sáng; Lục: xanh lá; Lam: xanh dương; Tím: tím; Cam: cam vàng; Đỏ: đỏ hồng. Có nhãn chữ kèm màu, không chỉ dùng màu. Màu áp dụng trên viền ô, tên món đang mặc, nhãn phẩm và chỉ số trong chi tiết.

gearQuality lưu riêng theo template đang sở hữu; đồ cũ mặc định Trắng và không bị quay phẩm lại. Hệ số Trắng/Lục/Lam/Tím/Cam/Đỏ lần lượt1/1,2/1,5/2/3/3,5, làm tròn half-up cho từng chỉ số; engine tính mặc đồ và so sánh cùng một hàm. Giới hạn prototype hiện vẫn mỗi template một món, chưa phải hệ instance nhiều bản sao.

Đồ mới từ loot/rèn dùng bảng khởi điểm Trắng80%/Lục20% của GDD. Chưa tự đặt bảng rơi phẩm cao cho nghề cấp cao. Sáu màu đã sẵn sàng cho dữ liệu phẩm; không giả đổi màu theo bậc cảnh giới. Phẩm chất độc lập với bộ ảnh chín cảnh giới.

## Kho trang phục

Trong Túi càn khôn → Trang phục: xem trước, mặc và lưu lựa chọn. Skin thay ảnh ở Động phủ, khung chiến đấu và dấu nhân vật trên bản đồ. Không tăng chỉ số, không tiêu linh thạch; chỉ mở theo cảnh giới.

| Skin | Cảnh giới yêu cầu |
|---|---|
| Thanh Phong Đạo Bào | Luyện Khí |
| Mặc Trúc Kiếm Y | Luyện Khí |
| Ngự Phong Kiếm Y | Trúc Cơ |
| Nguyệt Ảnh Pháp Y | Trúc Cơ |
| Thiên Huyền Thần Y | Hóa Thần |
| Tinh Hà Tiên Bào | Chân Tiên |

Sáu hình toàn thân độc lập được tạo bằng ImageGen tích hợp, giữ alpha và chuyển mã sang WebP chất lượng94. File assets/skins-v012, ánh xạ data/skins.json; prompt đầy đủ docs/skin-prompts-v012.json. Skin bị khóa vẫn xem trước được; mặc bị kiểm tra trong logic, không chỉ vô hiệu hóa nút giao diện. Bản lưu cũ được nhận skin mặc định; thay trang phục không sửa trang bị chiến đấu.

## Kiểm tra

51 kiểm tra tự động và build đã qua: ảnh riêng, khoảng đệm, đủ180 ánh xạ quái/Boss, sáu skin, khóa cảnh giới, lưu/tải lại trang phục, không thay chỉ số vì skin, hệ số phẩm, so sánh/mặc/tháo theo phẩm và giữ bản lưu cũ. Các kiểm tra chuyển map, zoom, auto và vật phẩm vẫn qua.
