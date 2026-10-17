# VẠN ĐẠO — Tu Tiên Idle · Prototype 0.2

Giao diện tiếng Việt cho điện thoại màn hình dọc, dựa trên dữ liệu GDD V3. Không phụ thuộc thư viện ngoài, không tải font/CDN. Ảnh bản đồ do người dùng cung cấp.

## Chơi thử ngay

Trong gói ZIP bàn giao, giải nén và mở **CHOI_THU.html** trong Chrome/Edge/Safari. Khi lấy mã nguồn từ GitHub, chạy `node scripts/standalone.mjs` để tạo file này. File này chứa sẵn ảnh và dữ liệu, không cần máy chủ. Nếu ứng dụng quản lý tệp điện thoại chỉ cho xem trước HTML, hãy mở bằng trình duyệt hoặc dùng bản web trên Vercel. Một số trình duyệt không lưu localStorage khi mở file cục bộ; dùng Cài đặt → Xuất bản lưu để giữ tiến trình.

Không mở index.html bằng file://: bản mã nguồn dùng module và fetch JSON nên cần địa chỉ web.

## Đưa mã nguồn lên GitHub → Vercel

1. Mã nguồn được đặt tại gốc repository xsdaigiasx/TutienAFK. package.json và vercel.json cùng nằm tại gốc.
2. Trong Vercel, tạo project từ repository GitHub đó.
3. Cấu hình đã nằm trong vercel.json: Framework Preset **Other**, Build Command **npm run build**, Output Directory **dist**, Root Directory là thư mục chứa package.json.
4. Deploy. Không cần biến môi trường hay token trong mã nguồn cho bản giao diện này.
5. Cập nhật mã nguồn trên nhánh đã liên kết để Vercel triển khai lại.

Tài liệu chính thức tham chiếu:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/builds

Repository bàn giao: https://github.com/xsdaigiasx/TutienAFK

Chưa triển khai Vercel: cần import repository này vào tài khoản Vercel của bạn.

## Chạy và kiểm tra trên máy phát triển

Cần Node.js 20+ để build/test; Python 3 để chạy lệnh dev mặc định. Không có package cần cài thêm.

- npm run dev → http://localhost:3000
- npm test → kiểm tra game engine và các màn hình qua DOM giả lập.
- npm run build → xuất website tĩnh vào dist/.
- node scripts/standalone.mjs → tạo lại CHOI_THU.html sau khi sửa mã nguồn.

## Những gì đã hoạt động

- Khung dọc ưu tiên 360–480px, thanh điều hướng cố định, khoảng đệm an toàn dưới màn hình. Máy tính có khung game bên phải và tiêu đề trang trí bên trái.
- Động phủ, bản đồ, nhân vật, hành trang, nhiệm vụ, công pháp, phường thị và chiến đấu.
- Chọn một hoạt động chính: tu luyện, săn quái, hái thuốc, luyện đan hoặc di chuyển.
- Tự đánh quái, nhận linh thạch/tu vi, nhặt trang bị sau mỗi 3 quái, hồi phục sau thất bại.
- Boss có chỉ số từ GDD; chiến thắng mở map kế tiếp. Địa điểm đầu cảnh giới mới kiểm tra cảnh giới khi di chuyển.
- 45 địa điểm theo 3 Giới. Nhân Giới dùng bản đồ lục địa gốc; Linh Giới dùng 4 cụm đảo trên không, mỗi cụm 5 địa điểm; Tiên Giới dùng 5 hành tinh cấp I–V, mỗi hành tinh gắn một địa điểm cuối game. Bấm ghim hoặc bộ lọc để xem địa điểm trong từng cụm đảo/hành tinh. Điều kiện mở map vẫn theo Boss và cảnh giới.
- world_visuals.json là lớp địa lý hiển thị bổ sung: không đổi ID hay quan hệ GDD gốc. Tên và cấp hành tinh là thiết kế mới trong prototype, chưa phải các đại cảnh giới mới. Ảnh và vị trí ghim là minh họa.
- Trang bị có tăng HP/công/thủ; học công pháp; dùng hồi máu; mua bán NPC; nhận thưởng nhiệm vụ một lần.
- Đổi tên, lưu tự động trên trình duyệt, xuất/nhập JSON có kiểm tra cấu trúc, xác nhận trước khi tạo lại nhân vật.
- Tiến trình offline tính tối đa 8 giờ khi quay lại.

## Quy tắc demo và giới hạn

Đây là prototype tương tác một người chơi, chưa phải MMO có server.

- Thời gian di chuyển rút xuống 8 giây. Tu luyện +6 tu vi/giây, hái thuốc mỗi 5 giây, luyện đan mỗi 8 giây.
- Luyện Hồi Xuân Đan: 5 Hoàng Tinh Thảo + 10 linh thạch. Hồi 40% HP. Công thức demo khác bảng nghề đầy đủ trong GDD.
- Mỗi cấp công pháp +8 công kích; chưa triển khai đầy đủ hiệu ứng của 45 công pháp, 15 pháp bảo và 135 kỹ năng Boss.
- Tu vi đầy cần bấm Đột phá; đột phá bảo đảm thành công trong demo. EXP dư không tự chuyển.
- Dữ liệu danh mục từ GDD có sẵn trong data/, nhưng chưa thể chơi hết các hệ thống chỉ vì có danh mục.
- Lưu dựa trên đồng hồ và localStorage phía client, có thể sửa; không phù hợp cho kinh tế hoặc phần thưởng MMO thật. Số cực lớn cuối game hiện dùng Number, cần chuyển số nguyên chính xác trên server trước khi cân bằng cuối game.
- GitHub dùng quản lý mã nguồn và danh mục thiết kế. Không ghi trạng thái người chơi/token vào GitHub. Vercel phục vụ giao diện; giai đoạn MMO tiếp theo cần API xác thực và database cho nhân vật, thời gian server, giao dịch và chống nhận thưởng lặp.
- Chưa có đăng nhập thật, chat, tổ đội, bang hội, PvP hoặc đồng bộ nhiều thiết bị. Không hiển thị số người online giả.

## Kiểm tra bàn giao

12 kiểm tra tự động: dữ liệu GDD, giới hạn hoạt động, đột phá, trang bị, nhiệm vụ nhận một lần, thu thập/chế tạo, chiến đấu/thất bại, Boss/di chuyển, offline 8 giờ, kiểm tra bản lưu địa lý đủ 25 địa điểm Linh/Tiên Giới, chuyển tab ảnh nền, lọc cụm đảo/hành tinh và thao tác các màn hình. Build website tĩnh đã chạy thành công. Chưa kiểm tra hình ảnh trên trình duyệt/điện thoại thật trong môi trường bàn giao này.

## Cấu trúc

- index.html / style.css / app.js: giao diện và xử lý thao tác.
- engine.js: tiến trình, chiến đấu, trang bị, nhiệm vụ và kiểm tra bản lưu.
- data/: danh mục gốc GDD V3.
- assets/world-map.png: bản đồ Nhân Giới người dùng gửi.
- assets/spirit-floating-islands.webp / assets/immortal-planets.webp: hai ảnh mới tạo bằng ImageGen tích hợp cho Linh Giới / Tiên Giới.
- data/world_visuals.json: cấp hành tinh, cụm phù đảo, ánh xạ địa điểm và tọa độ ghim.
- ART_DIRECTION.md: mô tả hình ảnh và prompt tạo ảnh.
- scripts/: build tĩnh và đóng gói HTML chơi thử.
- tests/: kiểm tra tự động.
- vercel.json: cấu hình triển khai.
- CHOI_THU.html: bản độc lập để chơi thử.
