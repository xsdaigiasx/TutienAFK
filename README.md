# Vạn Đạo — Tu Tiên Idle · 0.20.0

Game tu tiên idle tiếng Việt, ưu tiên điện thoại. SPA HTML/CSS/JavaScript, lưu localStorage và xuất/nhập JSON. Chưa có backend MMO.

- Bản chơi: https://van-dao-idle-test.genialshrew64.chatgpt.site
- Thiết kế hiện hành: [GDD V4.3](docs/GDD_V4.md); kế thừa [GDD V3](docs/archive/GDD_V3_NGUON.md).
- Danh mục: 9 cảnh giới, 45 map, 135 quái, 45 Boss, 54 mẫu trang bị thuộc 9 bộ, 242 item. Giai đoạn hoàn thiện hiện tại: M01–M10.

## Đã có

5 tab Động phủ/Tu hành/Chiến đấu/Bản đồ/Menu; auto thường tối đa 4 giờ, Boss, thiết lập chiến thuật và báo cáo tổng; chế tạo và đan vĩnh viễn; 6 skin; quái đơn lẻ và nền M01–M10. Pet cộng HP/ATK/DEF, có HP/MP, cấp và EXP riêng.

## Mục 2 — Bản đồ

- 2.1: 42 tuyến cùng giới có khoảng cách cố định theo mét. Thời gian giây = quãng đường mét / chỉ số tốc độ m/s của nhân vật; tốc độ nhận cả bonus trang bị. Hiện các chặng, tiến độ, ETA; lưu/tải giữ quãng đường.
- 2.2: Truyền tống tới trận đã kích hoạt, cùng giới. Phí thử ceil(50 + khoảng cách mét × 2/56,25), nghi thức 3 giây; trừ một lần lúc khởi hành, dừng không hoàn phí.
- 2.3: Phi thăng M20→M21 (Hóa Thần + Boss M20), M40→M41 (Chân Tiên + Boss M40). Phải đến đúng tiếp điểm; nghi thức 30 giây, có hạ giới sau khai thông.

## Mục 5 — Trang bị và item

- 5.1: 9 bậc I–IX cho 54 mẫu trang bị thuộc 9 bộ và 242 item; tiện ích có nhãn Dùng chung.
- 5.2: 6 phẩm trắng/lục/lam/tím/vàng/đỏ. Đồ nhận mới có 3–6 dòng random, không trùng stat key, lưu riêng từng instance. Hai món cùng mẫu có thể tồn tại. Đồ cũ giữ HP/ATK/DEF; cam đổi nhãn vàng.
- 5.3: Menu → Sổ trang bị hoặc Túi đồ → Trang bị → Sổ trang bị. Lọc bậc/vị trí/tên, xem theo phẩm và chỉ số; xem mẫu không nhận đồ. Túi thật lọc bậc/phẩm/vị trí; danh mục item lọc bậc/phẩm/loại.
- 5.4: So sánh mọi dòng với đúng instance đang mặc; bảng 19 chỉ số. HP/ATK/DEF, chí mạng, tốc đánh, tốc độ, giảm thương và giảm CD có hiệu lực. Bảng số và tỉ lệ phẩm còn thử nghiệm.

## Còn thiếu

Tương khắc ngũ hành 20% và các hiệu ứng công pháp nâng cao, tốc độ tìm quái, proc vàng/đỏ, Set4/Set6, cường hóa/khảm, pháp bảo, hoàn thiện nhiệm vụ/loot/đột phá/kinh tế M01–M10 và backend MMO. Các dòng MP/né/ngũ hành đã có trong dữ liệu và bảng chỉ số, chưa đồng nghĩa cơ chế chiến đấu đã hoàn tất. Kho tối đa 1.800 món; chưa có hòm nhận tạm khi loot đầy.

## Chạy và kiểm tra

Không cần cài thư viện. Node 20+ để test/build; Python 3 cho dev.

```sh
npm test
npm run build
npm run dev
```

Dev: http://localhost:3000. Build: dist/ với 209 ảnh đang dùng. 109 kiểm thử đã qua, có kiểm cả 324 tổ hợp mẫu/phẩm. Chưa QA trực tiếp trên điện thoại.

app.js: giao diện; engine.js: luật chơi; map-layout.js: bản đồ; data/: bảng game; assets/: hình; tests/: kiểm thử; docs/: thiết kế. Không đưa bản lưu cá nhân hoặc thông tin xác thực vào repository.

## Mục8.1 — Luyện đan · 0.15.1

Tu hành→Luyện đan:55công thức (45đan,9LinhDịch,1HồiXuânĐan), lọc bậc/nhóm/tên, chọn1–100mẻ. Mỗi công thức hiện nguyên liệu có/cần, phí, thời gian và xác suất. 9đanđộtphá khóa chế tạo vì công dụng chưa mở. Kiểm lại và tiêu hao từng mẻ khi hoàn tất; thất bại vẫn tiêu hao, dừng không mất phần chưa dùng. Lưu/tải tiếp tục mẻ còn lại, báo cáo thành công/thấtbại một lần.

Đồ nhận mới dùng ngân sách theo chỉ số nhân vật ở mốc sử dụng; giảm dòng phụ xác suất, không bám mức white cũ tăng đột biến. Chỉ roll stat đang có hiệu lực; đồ đã sở hữu giữ rollVersion1/legacy. Thẻ trang bị/item/nguồn tài nguyên dùng chung kiểu đầu tối–thân sáng.

0.15.1: tên phẩm chỉ ghi Phàm phẩm/Hoàng phẩm/Huyền phẩm/Địa phẩm/Thiên phẩm/Tiên phẩm. Bỏ bộ lọc và nhãn hướng tu; roll mới dùng chung ngân sách theo vị trí, bậc và phẩm. Các ID mẫu và đồ đã nhận giữ nguyên. Loot/luyện khí có thể nhận tất cả mẫu tại map.

## Bản 0.16.0

1. Bán từng instance trang bị trong chi tiết đồ; đồ đang mặc cần tháo trước. Giá = làm tròn(20 × bậc² × hệ số phẩm). Vật phẩm bán theo số lượng và kho thực tế.
2. Xác nhận trước khi chuyển hoặc dừng hoạt động, gồm luyện chế và di chuyển. Hủy giữ phiên, vật liệu, tiền và thiết lập auto hiện tại. Tiến trình vẫn chạy khi hộp xác nhận đang mở.
3. Đồ nhận mới có đúng một dòng gốc cố định: kiếm ATK, nón MP, áo HP, quần DEF, giày tốc độ, ngọc bội né tránh. Dòng gốc tính trong tổng 3–6 dòng theo phẩm, các dòng phụ roll và lưu riêng. Đồ cũ giữ giá trị; vị trí hộ uyển chuyển sang quần. Quần hiện dùng icon riêng thay sprite hộ uyển cũ.
4. Hành trang ẩn tên trên ô, có icon chỉ số gốc, giá trị và chênh lệch ↑/↓. Bậc góc phải trên, phẩm qua khung. Chi tiết so sánh đủ cả các dòng tăng và mất.
5. Khoảng cách 42 tuyến cố định bằng tốc độ gốc tại mức yêu cầu map cao hơn / 30; hai map cạnh nhau khoảng 120 giây ở mức đó. Trang bị và tăng cấp vẫn giảm ETA qua speed thực. Chuyến cũ giữ tỉ lệ tiến độ, phí đã trả không thu lại.
6. Auto mặc định dùng đan, 14.400 giây. Chết mất floor(tu vi hiện tại × 10%), không hạ cảnh giới; ghi riêng trong tổng kết, chỉ trừ một lần. Dừng/đủ giờ/rút lui khi còn HP không mất tu vi.
7. Năm ô icon kỹ năng dưới nhân vật trên màn chiến đấu, hồi chiêu và bấm xem thông tin; tối đa năm kỹ năng tự dùng. Né tránh áp lên đòn thường và sát thương kỹ năng thường; sát thương chuẩn và sát thương theo thời gian không né. MP hiện cộng vào chỉ số tối đa, chưa có tiêu hao MP kỹ năng.

Kiểm tra bản này: 89 test Node (có luồng UI mô phỏng DOM), build tĩnh. Chưa kiểm trực tiếp trên điện thoại.

## Bản 0.17.0 — Một bộ mỗi bậc

Danh mục hiện hành chỉ có 9 bộ, mỗi bộ 6 món (54 mẫu). Mỗi bậc dùng bộ tại map đầu tiên của cảnh giới; cả 5 map trong bậc cùng rơi và luyện ra bộ đó. Công thức mới còn 54 công thức trang bị. Các phẩm và roll riêng từng món giữ nguyên.

Đồ cũ ánh xạ theo bậc/vị trí sang mẫu chung; giữ instance ID, đồ đang mặc, phẩm và mọi giá trị đã roll. Mẫu cũ chưa có registry được đóng băng theo số liệu white cũ. Công thức cũ đang chạy vẫn dùng nguyên liệu, phí và thời gian ban đầu; kết quả là mẫu chung. Dữ liệu tương thích không xuất hiện trong danh mục mới.

Quần dùng ảnh PNG trong suốt tại assets/equipment-v017/cultivator-pants.png, thay icon tạm. Ảnh hiển thị qua cùng bộ renderer ở túi, ô đang mặc, chi tiết và danh mục. Đã kiểm ảnh và alpha, kiểm UI mô phỏng; chưa QA trên điện thoại thật.

## Bản 0.18.0 — Lượt chiến đấu, MP và kho đồ

1. Chi tiết quái/Boss lấy đúng tên thực thể. Bảng chỉ số và thông số quái chuyển thành dòng. Bấm nhân vật ở động phủ mở Tu hành; ẩn thanh hoạt động khi không có phiên.
2. Túi trang bị không hiện món đang mặc. Bán theo phẩm có bước xem số món/tổng tiền và xác nhận; chỉ bán snapshot món chưa mặc, không tự kéo món mới rơi vào đợt bán.
3. Sổ trang bị công bố toàn bộ dòng phụ và khoảng min ~ max theo phẩm. Đồ mới dùng rollVersion5: một dòng gốc + dòng phụ trong toàn bộ 22 key, tổng 3–6 dòng theo phẩm, không lặp key. HP và HP% là hai dạng khác nhau; tương tự MP/DEF. Đồ cũ giữ nguyên roll.
4. HP/MP/DEF % nhân tổng phẳng đúng một lần. Nhanh nhẹn tăng né; chính xác giảm né mục tiêu. Dòng ST hệ tăng sát thương đòn/skill thuộc hệ; kháng hệ giảm sát thương không phải true damage. Tương khắc 20% và bộ hiệu ứng ngũ hành đầy đủ vẫn chưa triển khai.
5. Kỹ năng theo thứ tự 5 ô, mỗi lượt dùng một skill sẵn sàng/đủ MP; nếu không có thì đánh thường. Khoảng cách lượt = 1/tốc đánh (tối đa 5 lượt/giây). Có nút đổi thứ tự ô. Mỗi công pháp có mp_cost riêng khoảng 5% MP gốc bậc (6% với hỗ trợ), không lấy theo MP tối đa sau trang bị. Hồi MP 1% tối đa/giây trong chiến đấu, 4% ngoài chiến đấu; hiển thị MP hiện tại và tối đa. MP/cursor/CD/thời điểm lượt giữ qua reload.
6. Mỗi quái thường thử độc lập 20% rơi trang bị, 30% rơi vật phẩm; vật phẩm chọn ngẫu nhiên giữa thảo dược map, khoáng map và Hồi Xuân Đan. Không còn cứ ba quái nhận đồ. Boss nhận một trang bị ngẫu nhiên; Tiên/Thiên/Địa/Huyền/Hoàng/Phàm lần lượt 1/5/10/15/25/44%. Soul Boss giữ như trước.
7. Tu hành→Luyện khí có 54 công thức chọn món, lọc bậc/vị trí, số mẻ 1–100 và mục tinh luyện nguyên liệu. Hiện nguyên liệu có/cần, phí, thời gian, xác suất. Bấm mẫu đồ có đường sang công thức tương ứng.

Kiểm tra: 105 test tự động, gồm phân phối phẩm Boss, lượt nửa giây, MP, phần trăm, mọi dòng roll, bán theo snapshot, UI mô phỏng, loot ngẫu nhiên và lưu phiên có hơn 28.800 lần hạ quái. Chưa QA trên điện thoại thật.

## Bản 0.20.0 — Kho gọn, chỉ số tại động phủ và hiệu ứng tài nguyên

1. Túi trang bị có nút Lọc; chọn bậc/phẩm/vị trí trong hộp rồi Áp dụng hoặc Bỏ lọc. Nút Bán nhanh mở chọn phẩm trước, sau đó mới xem số món/tổng tiền và xác nhận bán. Không hiện sẵn các ô chọn ở kho.
2. Chỉ số nhân vật nằm ở Động phủ→Nhân vật, dưới trang bị. Bấm ảnh nhân vật trở về tab này; Tu hành giữ nghề/cảnh giới/đột phá. Tốc đánh và thời gian lượt là hai đại lượng nghịch đảo, gộp một dòng (2/s tương ứng 0,5 giây/lượt).
3. Chi tiết trận mặc định ẩn; nút Chi tiết bên trái bật/tắt chỉ số và tổng kết đang chạy. Không hiện lịch sử chiêu bên dưới. HP mất/hồi và MP mất/hồi hiển thị số nổi trên nhân vật/quái, có hiệu ứng né/bạo kích; nội bộ vẫn giữ log giới hạn để lấy sự kiện và kiểm thử. Mỗi sự kiện có serial, không phát lại lịch sử khi chuyển tab/tải game, hiệu ứng tự mờ sau 1,8 giây và hỗ trợ giảm chuyển động.
4. Dùng SI: speed m/s, route distance_m, journey distanceM/travelledM, thời gian = distance/speed. Bảng tốc độ được cân bằng lại (mốc đầu 5 m/s), dòng tốc độ cũ chia 24 một lần qua speedUnit. Không thay các dòng chỉ số khác.
5. Mỗi tuyến cạnh nhau bằng tốc độ gốc tại mức yêu cầu map cao hơn × 45 giây. Quãng đường cố định; giày và tăng cấp vẫn giảm thời gian thực. Đi xa cộng các chặng, khóa map và tiếp điểm liên giới giữ nguyên.
6. Chuyến cũ phiên bản 2/3/không nhãn đổi sang version4 theo phần trăm đã đi. Giữ phí truyền tống đã trả bằng cơ sở giá legacy; không trừ lần nữa. Giá mới theo mét được hiệu chỉnh để không tăng phí chỉ vì đổi đơn vị.

109 kiểm tra tự động, build tĩnh. Có kiểm chuyển đổi tốc độ một lần, chuyến dở/phiên truyền tống, luồng Lọc/Bán nhanh, vị trí chỉ số, chi tiết trận và số nổi không bị nhân đôi/phát lại. Chưa QA điện thoại thật.

### Bản 0.20.0
- Bản đồ có đường nét đứt nối các map liền nhau trong cùng thế giới. Nhân vật nội suy vị trí theo mét đã đi qua từng đoạn đường; góc nhìn được giữ theo thế giới khi đổi trang hoặc đến đích. Nhãn địa điểm hiện tại vẫn hiện khi thu nhỏ.
- Cả hai tab Trang bị / Vật phẩm đều có Lọc và Bán nhanh; bán theo bộ lọc và phẩm đã chọn, có xác nhận số lượng/giá. Đồ đang mặc và vật phẩm không thể giao dịch được bảo vệ; đồ nhận thêm sau xác nhận không bị bán kèm.
- Sổ trang bị đổi thành Bách khoa toàn thư, chứa Trang bị, Vật phẩm và Trang phục. Túi chỉ chứa đồ sở hữu.
- Kiểm tra: 112 bài kiểm thử Node qua; chưa kiểm tra trực tiếp trên điện thoại.

### Bản 0.21.0
- Bán nhanh tích nhiều phẩm ở cả tab Trang bị và Vật phẩm, xem xác nhận trước khi bán.
- Bỏ dây nối bản đồ, giữ vị trí nhân vật di chuyển theo tiến độ và góc nhìn.
- Bấm nhân vật ở Động phủ mở tu luyện/đột phá; thêm thanh tu vi ở Động phủ và màn đột phá.
- GDD hiện hành: docs/GDD_V4.md (V4.4, game 0.21.0). Các ghi chú phiên bản cũ được giữ làm lịch sử.
