# VẠN ĐẠO — TU TIÊN IDLE MMO · GDD V4.4

Ngày cập nhật: 18/10/2026. Bản game đối chiếu: 0.21.0. Giai đoạn phát triển hiện tại: M01–M10.

Tài liệu kế thừa đầy đủ GDD V3 trong `archive/GDD_V3_NGUON.md`, các bảng dữ liệu trong `../data/` và cập nhật yêu cầu mới nhất của người dùng. Quy định V4 ưu tiên khi khác V3. Bảng số chưa được mô phỏng cân bằng được ghi là đề xuất; ghi nhận thiết kế không đồng nghĩa tính năng đã có trong game.

## 1. Phạm vi và trạng thái

Toàn game có 9 cảnh giới, 45 địa điểm, 135 quái, 45 Boss với 135 ô kỹ năng, 45 công pháp, 15 pháp bảo, 9 bộ/54 mẫu trang bị và 242 vật phẩm ngoài trang bị. Giai đoạn 1 tập trung hoàn thiện M01–M10; dữ liệu M11–M45 giữ để mở rộng, không coi là nội dung đã hoàn thiện.

Bản chơi hiện là SPA chạy trình duyệt, lưu localStorage và xuất/nhập JSON. Chưa có máy chủ MMO, tài khoản hoặc đồng bộ nhiều thiết bị. Thuật toán client và số lớn dùng Number là giới hạn của prototype.

| Hệ thống | Đã có trong 0.21.0 | Phần tiếp theo |
|---|---|---|
| Cảnh giới | Luyện Khí 10 tầng; 8 cảnh giới sau 4 giai đoạn | Đột phá có nguyên liệu, xác suất và bảo hiểm |
| Bản đồ | 3 giới, 45 địa điểm, quãng đường theo mét, tốc độ, truyền tống và 2 tiếp điểm phi thăng | Hoàn thiện nội dung và cân bằng M01–M10 |
| Chiến đấu | Auto tối đa 4 giờ; random 3 quái/map; Boss, 5 kỹ năng lần lượt, MP, né, chí mạng, đan và số nổi HP/MP | Tương khắc ngũ hành 20% và cân bằng đầy đủ |
| Trang bị | 9 bậc, 6 phẩm, instance riêng, random 3–6 dòng, mặc/thay/tháo và so sánh mọi dòng | Kỹ năng vàng/đỏ, Set4/Set6, cường hóa/khảm và cân bằng |
| Linh thú | Cộng HP/ATK/DEF vào chủ; HP/MP, EXP và cấp riêng | Kỹ năng, đa dạng loài và cân bằng |
| Túi đồ | Icon, số lượng, lọc/bán nhanh bằng tích nhiều phẩm; Bách khoa toàn thư | Sắp xếp và hoàn thiện kinh tế |
| Mỹ thuật | Ảnh quái đơn lẻ, Boss; 10 nền M01–M10; icon 9 bậc; 6 skin | Tiếp tục hoàn thiện theo nội dung mở |
| Nghề và đan | Thu thập, chế tạo, đan tu vi/HP/ATK/DEF | MP, thuốc nhiều bậc, bảng phẩm và kinh tế hoàn chỉnh |
| MMO | Chưa có | Server, lưu nguyên tử, thị trường, tổ đội, tông môn |

## 2. Thế giới và tiến trình

Cấu trúc: Địa điểm → Vùng → Quốc gia → Tinh vực → Giới. Ba giới cùng cấp: Nhân Giới M01–M20, Linh Giới M21–M40, Tiên Giới M41–M45. Tên và ID lấy nguyên từ `world.json`, đối chiếu `appendix_a.json`; không đổi tên dữ liệu âm thầm.

Chọn ghim bản đồ mở trang địa điểm: yêu cầu, 3 quái, Boss, tài nguyên, đồ rơi và nút Chiến đấu. Nếu đang nơi khác, nút Đến chiến đấu tạo chuyến đi; chỉ mở chiến đấu khi đến nơi, không tự bật auto. Map chưa mở xem thông tin được nhưng không khai thác hay chiến đấu.

Giết Boss cột mốc và đạt yêu cầu tu luyện để mở đường. Không dùng tốc độ để vượt khóa map. Giai đoạn 1 phải hoàn thiện vòng khám phá → chiến đấu → nhặt đồ → chế tạo → đột phá tới M10.

### 2.1. Quãng đường và tốc độ — hiện hành 0.21.0

Có 42 tuyến hai chiều cùng giới, không có đường bộ qua M20–M21 hoặc M40–M41. Khoảng cách khai báo bằng mét, cố định theo tuyến; đi xa cộng các chặng. Thời gian còn lại = ceil(số mét còn lại / tốc độ nhân vật m/s). Chỉ số speed tăng theo tầng/cảnh giới và trang bị; không nhân thêm hệ số cảnh giới ngoài chỉ số thực. Tốc độ ban đầu 5 m/s. Các tuyến được cân theo khoảng 45 giây ở chỉ số tiến trình khuyến nghị (mục tiêu 30–60 giây); đồ/tốc độ nhân vật có thể làm thay đổi thời gian.

Marker nhân vật nội suy qua từng chặng theo mét đã đi, cả chiều ngược. Camera lưu theo thế giới, giữ góc nhìn khi thu nhỏ và đến đích. Không vẽ dây/đường nối giữa các map hoặc từ nhãn đến ghim. Điểm hiện tại luôn có nhãn. Dừng giữa đường giữ map xuất phát; đến đích mới đổi map thực. Save/offline giữ tiến độ, áp giới hạn 8 giờ; bản lưu cũ được chuyển đơn vị một lần và giữ phí đã trả.

### 2.2. Truyền tống — đã triển khai trong 0.13.1

Mỗi địa điểm hiện có một trận. Khi đến đích lần đầu, trận được kích hoạt cho nhân vật; chỉ xem map hoặc mở khóa bằng Boss chưa tính là đến. Truyền tống giữa hai map cùng giới, đích đã kích hoạt và đủ điều kiện mở map/cảnh giới.

Phí thử nghiệm = `ceil(50 + số mét × 2 / 56,25)` linh thạch; nghi thức3giây, không phụ thuộc tốc độ. Hiển thị trước khi bấm. Trừ phí một lần khi bắt đầu; tải lại không trừ thêm. Dừng thì không hoàn phí, được ghi rõ trên giao diện. Không dùng truyền tống thường để vượt giới hoặc vượt khóa map.

### 2.3. Tiếp điểm phi thăng — đã triển khai trong 0.13.1

| Liên giới | Điểm xuất phát | Điểm tiếp nhận | Điều kiện thử nghiệm |
|---|---|---|---|
| Nhân → Linh | M20 Trụy Ma Cốc | M21 Chu Tước Tinh - Xích Viêm Hoang Địa | Hóa Thần trở lên, thắng Boss M20, đã mở M21 |
| Linh → Tiên | M40 Phi Thăng Lôi Trì | M41 Bắc Hàn Tiên Cung | Chân Tiên, thắng Boss M40, đã mở M41 |

Phải có mặt đúng điểm xuất phát và chủ động thực hiện nghi thức30giây. Không tự đổi giới khi chỉ đột phá cảnh giới hoặc nhấn tab giới. Lần đầu thành công lưu tiếp điểm đã khai thông; có thể hạ giới theo chiều ngược tại đúng điểm tiếp nhận. Cần đi tới tiếp điểm rồi qua giới, sau đó mới tiếp tục tới map mong muốn; không gộp thành một chuyến xuyên nhiều giới.

Tiếp điểm có ký hiệu◇ trên nhãn map và mục tra cứu trong bản đồ; trang địa điểm có điều kiện và nút nghi thức. Bản lưu cũ đang ở giới cao giữ nguyên vị trí và được ghi nhận các tiếp điểm trước đó để có thể quay về.

## 3. Chín bậc cảnh giới và vật phẩm

| Bậc | Cảnh giới | Map chính |
|---|---|---|
| I | Luyện Khí | M01–M05 |
| II | Trúc Cơ | M06–M10 |
| III | Kim Đan | M11–M15 |
| IV | Nguyên Anh | M16–M20 |
| V | Hóa Thần | M21–M25 |
| VI | Luyện Hư | M26–M30 |
| VII | Hợp Thể | M31–M35 |
| VIII | Đại Thừa | M36–M40 |
| IX | Chân Tiên | M41–M45 |

Luyện Khí giữ 10 tầng. Từ Trúc Cơ dùng Sơ kỳ, Trung kỳ, Hậu kỳ, Viên mãn. Bảng `cultivation.json` trong nguồn game là dữ liệu tiến trình hiện hành; quy tắc 90 tầng của V3 đã được thay thế. Giữ tổng EXP khi chuyển bản lưu cũ, không xóa tiến trình.

Trang bị, đan và nguyên liệu có bậc I–IX tương ứng. Bậc là yêu cầu tiến trình; phẩm chất là chất lượng trong cùng bậc. Những nhóm vật phẩm nhiều map trong một cảnh giới vẫn có tên/mẫu riêng; không đổi thành bậc X–XLV. Item tiện ích toàn cục được đánh dấu dùng chung nếu không thuộc bậc cụ thể.

## 4. Thuộc tính nhân vật

| Khóa đề xuất | Hiển thị | Ý nghĩa |
|---|---|---|
| hp / maxHP | HP | Sinh lực hiện tại/tối đa |
| mp / maxMP | MP | Linh lực hiện tại/tối đa |
| attack | ATK | Công kích |
| defense | DEF | Phòng ngự |
| critRate | Tỉ lệ chí mạng | Xác suất bạo kích |
| critDamage | Sát thương chí mạng | 150% nghĩa là nhân 1,5 |
| attackSpeed | Tốc đánh | Đòn đánh thường/giây |
| speed | Tốc độ | Tốc di chuyển và tìm mục tiêu |
| agility | Nhanh nhẹn | Tạo né tránh |
| accuracy | Chính xác | Đối kháng né tránh |
| dodge | Né tránh | Bonus né trực tiếp |
| elementDamage | Sát thương ngũ hành | Bonus riêng Kim/Mộc/Thủy/Hỏa/Thổ |
| elementResist | Kháng ngũ hành | Kháng riêng từng hệ |
| hpRegen / mpRegen | Hồi phục | Lượng hồi theo thời gian |
| cooldownReduction | Giảm hồi chiêu | Rút ngắn chờ kỹ năng |
| damageReduction | Giảm thương | Giảm sát thương thông thường |

Bonus xác suất dùng điểm phần trăm: +2% chí mạng là +2 điểm phần trăm. Chỉ số phẳng, bonus % và hệ số cuối phải tách trường dữ liệu. Cộng nguồn gốc + trang bị + đan + linh thú một lần; áp các nhóm % theo thứ tự xác định. Không nhân hai lần cùng nguồn.

Đề xuất né: `Pné = clamp(0; 50%; dodge + 0,30 × agility/(agility + accuracyĐịch + 100×bậcĐịch))`. Đây là công thức khởi đầu cần mô phỏng, không áp thẳng cho toàn bộ dữ liệu cuối game trước kiểm chứng. Đòn đã né không chí mạng và không kích hoạt hiệu ứng cần đánh trúng.

Tốc độ là thuộc tính thực của nhân vật, đơn vị m/s, lấy từ cùng bộ chỉ số HP/ATK/DEF ở từng tầng/cảnh giới. Thời gian di chuyển = quãng đường cố định / tốc độ hiện tại. Không có hệ số tốc độ bản đồ hay hệ số nhân cảnh giới ngoài bộ chỉ số. Lên tầng/cảnh giới tăng chỉ số speed thì nhân vật đi nhanh hơn; xem mục2.1. Tốc đánh là thuộc tính riêng. Ảnh hưởng của tốc độ lên thời gian tìm quái là thiết kế cho đợt sau, chưa triển khai.

## 5. Ngũ hành và công pháp

Mỗi công pháp khai báo một hệ sát thương chính, MP tiêu hao, hồi chiêu, hệ số, điều kiện và hiệu ứng. Chỉ nội tại công pháp đang gắn có hiệu lực trong thiết kế đích; bonus kỹ năng prototype hiện còn đơn giản. Giới hạn đích kế thừa V3 là 5 công pháp và 5 pháp bảo; demo hiện chưa có đầy đủ các ô và pháp bảo.

| Hệ | Thiên hướng | Khắc |
|---|---|---|
| Kim | Xuyên giáp, chí mạng | Mộc |
| Mộc | Hồi phục, độc | Thổ |
| Thủy | Làm chậm, khống chế | Hỏa |
| Hỏa | Sát thương bùng nổ, thiêu đốt | Kim |
| Thổ | Hộ thuẫn, phòng ngự | Thủy |

Khắc hệ ×1,20; bị khắc ×0,80; cùng hệ/không có quan hệ ×1. Thay hoàn toàn ×1,35/×0,75 của V3. Tính theo hệ kỹ năng và hệ phòng thủ mục tiêu, mỗi gói sát thương một lần. Công pháp và quái có hệ ngay từ đầu; không chờ Hóa Thần mới có quan hệ cơ bản. Hóa Thần có thể mở nâng cấp cơ chế nhưng không tự đổi mức 20%.

Linh căn là thiên hướng, không khóa học công pháp khác hệ. Kim/Mộc/Thủy/Hỏa/Thổ mỗi loại 19%, dị căn tổng 5% là thiết kế kế thừa; demo hiện hiển thị Kim cố định. Lôi/Băng/Phong không tự suy ra vòng khắc mới; phải có khai báo riêng. Kỹ năng chưa phân hệ được để trung tính, không đoán chỉ bằng tên.

Thứ tự chiến đấu đích: kiểm MP/hồi chiêu → kiểm trúng/né → sát thương gốc và DEF → bonus sát thương/kháng hệ → chí mạng → tương khắc → giảm thương → khiên → HP. Trừ MP một lần khi thi triển hợp lệ; thiếu MP thì dùng đòn thường. Hồi MP không vượt tối đa. Sát thương chuẩn không tự bạo hay khắc nếu kỹ năng không ghi rõ. Công thức DEF của prototype và đề xuất K của V3 cần thống nhất ở đợt cân bằng, không giả nhận đã triển khai.

## 6. Phẩm chất và dòng trang bị

| Màu | Phẩm chất đề xuất | Số dòng thuộc tính | Dòng kỹ năng thêm | Hệ số cơ bản đề xuất |
|---|---|---|---|---|
| Trắng | Phàm | 3 | Không | 1,00 |
| Lục | Hoàng | 3–4 | Không | 1,15 |
| Xanh lam | Huyền | 4 | Không | 1,35 |
| Tím | Địa | 4–5 | Không | 1,60 |
| Vàng | Thiên | 5–6 | 1 | 1,90 |
| Đỏ | Tiên | 6 | 1 mạnh hơn | 2,30 |

Màu, 3–6 dòng và kỹ năng vàng/đỏ là yêu cầu người dùng. Tên phẩm, hệ số, xác suất và giá trị kỹ năng là đề xuất cần thử cân bằng. Vàng thay tên màu Cam trong thiết kế trước; bản lưu cam cũ cần ánh xạ, không mất món. Hệ số mới đã áp cho đồ nhận trong0.14.0; đồ cũ giữ chỉ số đóng băng theo mục6.1. Hệ số chỉ áp lên giá trị cơ bản đã định nghĩa, không nhân tiếp mọi dòng xác suất.

Giữ 6 vị trí thực tế của dữ liệu: Vũ khí, Mũ, Áo, Quần, Giày, Ngọc bội. Nhẫn/dây chuyền trong minh họa hội thoại trước chưa phải vị trí đã chốt; không tự thêm hai ô mới.

| Vị trí | Dòng chính bắt buộc | Nhóm dòng phụ |
|---|---|---|
| Vũ khí/kiếm | ATK | Chí mạng, ST chí mạng, tốc đánh, chính xác, ST ngũ hành |
| Mũ | MP | HP, MP, kháng chí mạng, hồi MP, kháng hệ |
| Áo | HP | DEF, giảm thương, kháng hệ, hồi HP, nhanh nhẹn |
| Quần | DEF | Chính xác, chí mạng, HP, MP, tốc đánh |
| Giày | Tốc độ | Nhanh nhẹn, né, HP, DEF, chính xác |
| Ngọc bội | Né tránh | Hồi MP, kháng hệ, giảm hồi chiêu, ATK |

Số dòng bao gồm dòng chính. Random không lặp cùng stat key trong một món; dòng chính đã có thì loại khỏi pool phụ. Pool phải đủ 6 dòng hợp lệ cho món đỏ. Roll số dòng trước, chọn dòng rồi roll giá trị theo bậc, mẫu và phẩm. Boss rơi một món: Tiên 1%, Thiên 5%, Địa 10%, Huyền 15%, Hoàng 25%, Phàm 44%. Quái thường thử 20% rơi đồ và 30% rơi vật phẩm độc lập.

Mỗi món có instance_id riêng ngoài template_id. Hai kiếm cùng mẫu được cùng tồn tại trong túi và có roll khác. Chốt roll khi sinh, lưu nguyên số dòng, giá trị, kỹ năng, phiên bản bảng cân bằng; không random lại khi mở túi/tải game. Mặc/thay/tháo tham chiếu instance, dùng template cho tên, hình và yêu cầu. Trang bị cũ phải migration sang instance, giữ phẩm/chỉ số đã có theo chính sách tương thích, không reroll ngầm.

Kỹ năng đặc biệt nằm ngoài 3–6 dòng: điều kiện, xác suất, hiệu ứng, thời lượng, hồi chiêu, MP nếu có và nhóm hồi chiêu chung. Không tạo vòng kích hoạt đệ quy. Ví dụ nháp: kiếm vàng 10% Hỏa Trảm khi đánh trúng, CD8s; áo vàng tạo khiên khi HP dưới30%, CD45s; giày đỏ né thành công tăng tốc đánh4s, CD12s. Đồ tháo ra mất quyền kích hoạt; tháo/mặc không reset cooldown. Cùng nhóm hiệu ứng dùng chung CD; không đổi đồ để lặp proc.

So sánh đúng vị trí đang mặc và yêu cầu sử dụng. Hiện chênh lệch tất cả dòng, kể cả dòng bị mất: +15 ATK, −120 HP, +2% chí mạng. Kỹ năng dùng mô tả cũ/mới, không quy thành lực chiến giả. Khi tháo món tăng HP/MP, kẹp tài nguyên hiện tại vào max mới.

### 6.1. Lịch sử triển khai 0.14.0 — đã được thay thế bởi 0.17–0.21

Các số mẫu, vị trí, pool và trạng thái MP/loot dưới đây chỉ ghi lại bản cũ. Trạng thái hiện tại: 9 bộ / 54 mẫu; mỗi bậc một bộ, không phân hướng tu; dòng gốc kiếm ATK, mũ MP, áo HP, quần DEF, giày tốc độ, ngọc bội né. Pool phụ 22 key không trùng, hỗ trợ HP/MP/DEF%; MP, né và lịch skill đã hoạt động theo ghi chú 0.18 phía dưới.

- **5.1 Bậc:** 810 mẫu trang bị có trường tierI–IX, 90mẫu/bậc; 242item có tier và quality rõ ràng. Tiện ích dùng chung để tier0, không ép thành bậcI. Bậc không đồng nghĩa màu phẩm.
- **5.2 Phẩm:** trắngPhàm / lụcHoàng / lamHuyền / tímĐịa / vàngThiên / đỏTiên; hệ số thử1 /1,15 /1,35 /1,6 /1,9 /2,3. Số dòng3 /3–4 /4 /4–5 /5–6 /6. Màu hiển thị kèm chữ, không chỉ phân biệt bằng màu.
- **5.3 Sổ trang bị:** 810mẫu, lọc tên/bộ, bậc, vị trí, hướng tu; chọn phẩm để xem minh họa, phân trang24mẫu. Mỗi thẻ có chỉ số chính; chi tiết có các dòng minh họa, yêu cầu và nguồn. Đây là danh mục, không tặng mẫu khi xem. Túi thật lọc theo bậc/phẩm/vị trí; danh mục item thêm lọc bậc/phẩm.
- **5.4 Dòng chỉ số:** mỗi món nhận mới có ID riêng, templateId, tier, quality, affixes và rollVersion. Bản đầu dùng templateID cho instance đầu nếu chưa sở hữu; bản sao dùng hậu tố~serial. Mặc đồ tham chiếu instance, không mẫu. Mỗi lần nhận/chế tạo chốt roll một lần; mở túi, đổi đồ và tải lại không reroll. Không lặp statkey trong cùng món.

Dòng chính: vũ khíATK, mũDEF, áoHP, hộ uyểnATK, giàytốc độ, ngọc bộiMP. Dòng phụ theo pool riêng từng vị trí; có HP/MP/ATK/DEF, chí mạng, STchí mạng, tốc đánh, tốc độ, nhanh nhẹn, chính xác, né, giảm thương, giảmCD, sát thương5hệ và kháng hệ. Giá trị là bảng thử, chưa cân bằng cuối game.

Các chỉ số HP/ATK/DEF, chí mạng, STchí mạng, tốc đánh, tốc độ, giảm thương và giảmCD đã tham gia cơ chế hiện hành. MP là chỉ số tối đa, chưa có tài nguyên MP nhân vật tiêu hao trong chiến đấu. Nhanh nhẹn/chính xác/né và các dòng hệ đã cộng vào bảng chỉ số nhưng pipeline né/tương khắc chưa triển khai. UI ghi rõ trạng thái. **Kỹ năng đặc biệt vàng/đỏ chưa triển khai**, không suy từ 5–6dòng thành proc đã hoạt động.

Roll phẩm thử của nguồn nhận đồ hiện tại: trắng80%, lục14%, lam4%, tím1,5%, vàng0,4%, đỏ0,1%. Không cam kết đây là tỉ lệ bản chính thức. Đồ rơi thường/Boss hiện vẫn chọn bộKiếmTu; các hướng khác có công thức. Khi hết mẫu chưa sở hữu, có thể nhận thêm bản sao với roll riêng; luyện khí theo công thức cũng có thể tạo lại mẫu. Kho hiện giới hạn1800món; quá giới hạn dừng chế tạo trước khi tiêu hao. Khi kho đầy, phần trang bị của loot chưa được lưu/hòm nhận tạm chưa có; không coi đây là hệ loot hoàn thiện.

Bản lưu trước0.14: chuyển đồ đang có sang legacyinstance, đóng băng đúng HP/ATK/DEF theo hệ số cũ (lục1,2/lam1,5/tím2/cam3/đỏ3,5); cam đổi nhãn vàng nhưng không giảm chỉ số. Không tự thêm dòng random vào đồ cũ. Chuyển đổi lặp không nhân đôi đồ hay chỉ số.

71kiểm thử và build đã qua, gồm4860tổ hợp mẫu/phẩm, instance trùng mẫu, roll giữ qua reload, slot/so sánh đúng món, speed→ETA, chuyển đồ cam cũ và bộ lọc/preview/UI. Chưa QA trực tiếp trên điện thoại.

## 7. Đan dược, nguyên liệu và chế tạo

Chín bậc dùng chung với cảnh giới. Phân biệt đan tăng HP/MP tối đa với thuốc hồi HP/MP tức thời. Đan tăng tu vi, thuộc tính và đột phá yêu cầu đúng điều kiện bậc; thuốc hồi cấp thấp vẫn dùng được nhưng hồi ít so với lượng tối đa cấp cao. Không tự dùng đan vĩnh viễn trong auto.

Giữ giới hạn prototype: đan tu vi tổng 10 viên/ngày Việt Nam; đan vĩnh viễn mỗi nguồn/loại tối đa30 viên, bonus giữ khi lên cảnh giới. Ngày server sẽ thay đồng hồ client khi có backend. Hồi Xuân Đan demo hồi40% HP, CD10s là cấu hình hiện hành, khác CD thuốc30s đề xuất V3. Chưa chốt dùng 10s hay30s cho bản cân bằng chính thức.

Nguyên liệu gồm linh thảo, quặng, tinh hồn, vật liệu tinh luyện. Map ưu tiên đầu vào cùng bậc; công thức đặc biệt được dùng thêm bậc trước khi khai báo rõ. Công thức định nghĩa đủ đầu vào, phí, thời gian, tỉ lệ và output. Trang bị đầu ra phải là instance. Không hiển thị thao tác tiêu hao nếu công dụng chưa được triển khai.

## 8. Linh thú

Tham chiến và còn HP: cộng HP tối đa, ATK, DEF cho chủ nhân đúng một lần. Không thêm một đòn pet thường riêng sau khi đã cộng ATK để tránh đếm đôi theo mô hình hiện hành. HP/MP riêng của pet được lưu để mở kỹ năng sau; hiện không chịu thêm sát thương lan tự động.

Nhân vật nhận nguyên EXP quái; pet nhận thêm EXP riêng = max(1, round(EXP quái ×20%)). Không chia bớt EXP chủ. Chỉ pet đang tham chiến và còn HP nhận EXP trận. Cấp/EXP pet độc lập cảnh giới chủ; tăng cấp cập nhật đóng góp ngay. Prototype mỗi50EXP/cấp, HP=120+40×cấp, MP=50+10×cấp, ATK=5×cấp, DEF=2×cấp; đây là bảng thử.

Có kết duyên, cho ăn, huấn luyện, cho nghỉ; hồi tài nguyên ngoài chiến đấu. Khi cho nghỉ, bỏ bonus và kẹp HP chủ. Kỹ năng pet riêng sẽ xây sau, cần khai báo MP/CD/đối tượng và không trừ MP chủ. Chưa mặc định tạo nhiều pet cùng ra trận.

## 9. Hoạt động và auto chiến đấu

Một hoạt động chính. Auto thường chọn ngẫu nhiên một trong 3 quái tại map, không cố định theo quái đang xem. Thời gian tối đa4h/phiên; offline hoạt động khác tối đa8h. Không tự tiếp tục phiên mới.

Sau nút Auto mở chuẩn bị: thời gian, số đan sử dụng tối đa, ngưỡng HP dùng đan, bật/tắt kỹ năng, ngưỡng rút lui, dừng khi hết đan. Tiêu hao dùng stock thật; cooldown giữ qua tải lại. MP/thuốc MP bổ sung khi hệ MP triển khai.

Trên trận luôn hiện map, tên quái/Boss, HP hai bên; Chi tiết bên trái bật/tắt thống kê. Số nổi hiển thị trừ/cộng HP/MP, không có danh sách lịch sử chiêu phía dưới. Thưởng cộng một lần khi hạ mục tiêu; báo cáo gộp xuất hiện khi kết thúc/dừng/rút lui. Đọc lại báo cáo không nhận thưởng lần nữa.

## 10. Giao diện và asset

Ưu tiên điện thoại6,3inch tỉ lệ16:9; kiểm theo viewport CSS thực tế, không suy ra kích thước chỉ từ inch. Không tràn ngang, nút vừa chạm, tên không bị hình che.

Năm tab: Động phủ / Tu hành / Chiến đấu / Bản đồ / Menu. Động phủ: ảnh nhân vật, cảnh giới và linh căn → hoạt động → tab con nhân vật/công pháp/linh thú. Loại thẻ thông tin và lối vào chức năng trùng. Menu tập trung túi, nhiệm vụ, báo cáo, phường thị, cài đặt/bản lưu.

Thông tin nhanh HP/MP/ATK/DEF; mở Thuộc tính chi tiết cho các dòng còn lại. Túi hiển thị icon+số lượng+bậc, viền/tên màu phẩm và nhãn chữ để không lệ thuộc màu. Chạm mở thông tin/nguồn/bán/chế tạo/luyện đan. Trang phục nằm trong Bách khoa toàn thư, xem thử/mặc theo điều kiện cảnh giới; skin không tự cộng sức mạnh.

135 quái dùng hình đơn lẻ có padding, giữ tỉ lệ và contain; Boss có ảnh riêng. Nền mỗi map M01–M10; nguyên liệu/trang bị có hình theo9bậc, bậc cao hoành tráng dần nhưng không quá rối. Tên quái phải là text hiển thị thật, không chỉ có trong alt ảnh.

## 11. Dữ liệu và kiểm thử triển khai

Giữ template ID hiện có, bổ sung trường thay vì đổi ID. Đề xuất schema instance: instance_id, template_id, tier, quality, affixes[{stat,value,unit}], special_skill_id, roll_version, created_at. Bản lưu cần schema_version và migration lặp an toàn; không nhân đôi đồ/thưởng hoặc mất skin, phẩm và pet.

Các test cần cho đợt mới: 3–6 dòng đúng phẩm; không trùng; vàng/đỏ có proc; roll giữ qua reload; hai món cùng mẫu tồn tại; so sánh đúng slot; cộng stat một lần; HP/MP clamp; MP/CD; né/chí mạng; tương khắc1,2/0,8/1; tốc độ không vượt khóa map; petEXP riêng; cooldown proc qua đổi đồ; online/offline cùng seed. Bản0.14.0 hiện có71 test pass và build tĩnh; đã kiểm instance/roll/so sánh/migration theo mục6.1. Các test MP, né/ngũ hành và proc cần triển khai cùng các cơ chế còn thiếu. Chưa QA trực tiếp điện thoại.

MMO cần server quyết định thời gian/RNG/thưởng, revision và giao dịch nguyên tử, idempotency cho claim, khóa tài sản khi giao dịch. Dùng số nguyên chính xác hoặc decimal cho chỉ số/tiền cuối game; client chỉ hiển thị. Các hệ thị trường, tông môn, hàng đợi, công trình động phủ, danh vọng, pháp tắc và lịch Boss vẫn theo V3 khi không xung đột, thuộc lộ trình sau.

## 12. Lộ trình thực hiện

1. Instance, roll3–6dòng, 9bậc/6phẩm, sổ trang bị và UI so sánh đã có ở0.14.0; tiếp tục cân bằng và kiểm tra trên điện thoại.
2. Hoàn thiện nguồn rơi và proc vàng/đỏ, Set4/Set6 và cường hóa/khảm.
3. MP, công pháp ngũ hành, khắc20%, né/chính xác, tốc độ tìm quái; tốc độ di chuyển đã có ở mục2.1.
4. Hoàn thiện M01–M10: loot, nghề, nhiệm vụ, đột phá, kinh tế và cân bằng.
5. QA điện thoại; mô phỏng build, offline và lưu/tải; sau đó mở rộng backend/MMO.

## 13. Nhật ký thay đổi so với V3

- 9 cảnh giới giữ nguyên; thay90tầng bằng Luyện Khí10tầng +8×4giai đoạn.
- Giai đoạn1 tập trungM01–M10.
- Vật phẩm9bậc; tách bậc và phẩm; màu vàng thay cam; phẩm có3–6dòng và kỹ năng vàng/đỏ.
- Thêm MP, ngũ hành, tốc độ, nhanh nhẹn và mô hình đối kháng chính xác/né.
- Khắc hệ đổi thành+20%/−20%, có từ đầu.
- Linh thú cộng chỉ số và nhận EXP riêng; giữ HP/MP riêng cho kỹ năng sau.
- UI compact, bản đồ tab chính, kho skin, quái đơn lẻ và tên hiển thị rõ.
- GDD V3 giữ nguyên làm nguồn lịch sử, không dùng các bảng cũ xung đột để ghi đè V4.

### Giao diện chi tiết trang bị · 0.14.1

Tên món đặt đầu khung, dùng màu phẩm; bỏ nhãn màu/phẩm lặp trong chi tiết. Kế tiếp là BậcI · Luyện Khí Kỳ (tương tự các cảnh giới), chỉ số gọn theo dòng, tên và giá trị đặt cạnh nhau; sau đó Thuộc tính bộ. Bỏ hậu tố Trang khi hiển thị tên bộ, giữ nguyên ID. Ảnh thu nhỏ bên cạnh; nguồn/so sánh có thể mở thêm. Mẫu tra cứu có nhãn chưa sở hữu; hiệu ứng bộ chưa mở thì ghi rõ, không tạo bonus giả.

### Thẻ trang bị theo ảnh tham chiếu · 0.14.2

Phần đầu nền tối: tên món mang màu phẩm, loại/hướng tu, ảnh bên phải và chỉ số chính thật hiển thị lớn. Phần thân nền sáng: bậc/cảnh giới, dòng phụ gọn, thuộc tính bộ, nguồn và thao tác. Không thêm điểm lực chiến, dải sát thương hay hiệu ứng bộ giả từ ảnh mẫu. Không lặp chỉ số chính trong danh sách dòng phụ. Nhãn màu vẫn chỉ có ở bộ chọn phẩm, không đặt trong chi tiết món.

### 6.2. Cân chỉnh đồ nhận mới · 0.15.0 (rollVersion2)

Bảng whiteHP/ATK/DEF cũ chỉ phục vụ bảo toàn đồ cũ, không làm chuẩn cho roll mới. Roll mới dùng chỉ số nền nhân vật tại mốc yêu cầu của map, không nhân lũy tiến theo số thứ tự map. Các map cùng mốc sử dụng có thể có cùng ngân sách sức mạnh, khác tên/bộ/roll.

| Vị trí | Dòng chính | Ngân sách trắng trước roll |
|---|---|---|
| Vũ khí | ATK | 25% ATK nhân vật ở mốc sử dụng |
| Mũ | MP | 22% DEF |
| Áo | HP | 18% HP |
| Hộ uyển | ATK | 12% ATK |
| Giày | Tốc độ | 5% tốc độ |
| Ngọc bội | HP | 10% HP |

Điều chỉnh hướng tu: KiếmTu ATK×1,1/HP×1/DEF×0,95; PhápTu ATK×1/HP×0,95/DEF×0,9; ThểTu ATK×0,9/HP×1,15/DEF×1,15. Nhân phẩm đúng một lần; dòng chính roll90–110%. Ngọc bội mới ưu tiênHP trong giai đoạn MP nhân vật chưa tiêu hao; món MP đã có giữ nguyên.

Dòng phụ phẳng: HP3,5%, ATK3,5%, DEF4%, speed1,5% chỉ số nền; áp hướng tu và phẩm. Dòng phụ xác suất: chí mạng0,6điểm%, STchí mạng2,5điểm%, giảmCD0,5điểm%, giảm thương0,4điểm%; tốc đánh1,5% tốc đánh nền. Roll phụ85–115%, rồi áp phẩm; không tăng dòng xác suất theo cấp/map để tránh bùng chỉ số. Phần trăm hiển thị là điểm phần trăm cộng, không nhân thêm lần nữa.

Pool mới chỉ gồm các stat đang tác dụng: HP/ATK/DEF/speed, chí mạng, STchí mạng, tốc đánh, giảmCD, giảm thương. Mỗi slot có6key hợp lệ, nên món đỏ vẫn đủ6dòng không trùng. Tạm không roll dòng MP, né/chính xác/nhanh nhẹn hoặc hệ khi cơ chế chưa mở. Instance rollVersion1 và legacy giữ nguyên, không reroll hay giảm chỉ số đang sở hữu. Preview và thẻ danh mục dùng chung mẫu minh họa để chỉ số khớp khi mở chi tiết. Bảng mới vẫn là bản cân chỉnh thử, chưa coi là cân bằng toàn game.

### 7.1. Sổ luyện đan và nhiều mẻ · 0.15.0 (mục8.1 tiến độ)

Tu hành→Luyện đan mở sổ công thức ngay trên màn nghề. Có55công thức:45đan,9LinhDịch,1HồiXuânĐan. 36đan có công dụng hiện hành,9đanđộtphá hiện công thức nhưng khóa nút luyện vì hệ đột phá chính thức chưa mở. HồiXuânĐan giữ IDpotion là vật phẩm tích hợp ngoài danh mục242item; tổng số công thức toàn dữ liệu hiện874.

Lọc theo bậc, nhóm và tên đan/nguyên liệu; phân trang8công thức. Hiện số nguyên liệu có/cần, phí, thời gian và xác suất mỗi mẻ; chạm nguyên liệu xem thẻ và nơi kiếm. LinhDịch có công thức tinh luyện ngay trong sổ, cộngEXP Luyệnđan thay vì Luyệnkhí. Từ thẻ item có lối vào lọc các công thức liên quan.

Chọn1–100mẻ. Khi bắt đầu kiểm tổng nguyên liệu/phí, cảnh giới và công dụng. Hiện không dự trữ trước: mỗi mẻ hoàn tất kiểm lại nguyên liệu/phí và trừ đúng một lần; thất bại vẫn tiêu hao, không tạo output. Dừng giữa chừng giữ phần chưa dùng; nếu túi thay đổi gây thiếu thì dừng với báo cáo phần thực tế. Tiến trình, số mẻ thành công/thất bại và output lưu trong session, reload/offline tiếp tục phần còn lại; một báo cáo tổng cuối phiên.

Ví dụ vòng đầu:3HoàngTinhThảo+2linhthạch→1LinhDịch (10giây,100%);5HoàngTinhThảo+1LinhDịch+10linhthạch→HoàngLongĐan (30giây,60%);5HoàngTinhThảo+10linhthạch→HồiXuânĐan (8giây,100%). Đan dùng đúng giới hạn đang có trong GDD, không đổi giá trị đan đã dùng hay bonus vĩnh viễn trong lần cập nhật này.

### 10.1. Thẻ item thống nhất · 0.15.0

Trang bị, đan, nguyên liệu và vật phẩm tiện ích đều dùng đầu nền tối (tên màu phẩm, loại, ảnh, chỉ số chính hoặc số lượng thật) và thân nền sáng (bậc, công dụng, nguồn, công thức và thao tác). Không thêm điểm lực chiến giả. Resource mở từ map cũng dùng thẻ này, giữ nút thu thập/khai khoáng. Không ghi nhãn màu lặp trong chi tiết.

Kiểm tra0.15.0:79test và build qua, gồm4.860tổ hợp roll, ngân sách stat, tương thích đồ cũ, công thức theo bậc, chuỗi tinh luyện→đan, luyện nhiều mẻ/thấtbại/dừng/reload và UI. Chưa QA trực tiếp trên điện thoại.

### Nhãn phẩm và trang bị dùng chung · 0.15.1

Tên phẩm hiển thị Phàm phẩm/Hoàng phẩm/Huyền phẩm/Địa phẩm/Thiên phẩm/Tiên phẩm, bỏ tên màu khỏi nhãn và bộ chọn. Vẫn giữ màu ở tên và viền. Bỏ bộ lọc/nhãn PhápTu–ThểTu–KiếmTu; các mẫu giữ tên/ID để không mất đồ nhưng không phân loại hay giới hạn theo hướng tu. Roll mới version3 dùng chung ngân sách theo slot, mốc sử dụng và phẩm, không còn hệ số theo class. Loot và luyện khí có thể chọn mọi mẫu tại map thay vì chỉ nhóm sword. Instance version1/2 giữ chỉ số đã chốt.

### Hành trang, hành động và chiến đấu · 0.16.0

Quy tắc hiện hành cho đồ nhận mới: một dòng gốc cố định theo vị trí (kiếm ATK, nón MP, áo HP, quần DEF, giày speed, ngọc bội dodge), nằm trong tổng 3–6 dòng. Dòng phụ vẫn random. Ngân sách gốc Phàm phẩm: vũ khí 25% ATK tại mức yêu cầu map; áo 18% HP; nón 20% MP gốc (MP = 25% HP); quần 22% DEF; giày 5% speed; bội 1% né. Nhân hệ số phẩm một lần. Đồ cũ không reroll; hộ uyển cũ chuyển vị trí quần và giữ stat.

Hành trang dùng ảnh/icon, số lượng, bậc ở góc phải trên và khung màu phẩm. Không hiện tên trên ô. Icon chỉ số gốc hiện giá trị và chênh lệch ↑/↓ so với đúng món đang mặc cùng vị trí; chi tiết hiện cả dòng bị mất. Trang bị bán từng instance, giá làm tròn(20 × bậc² × hệ số phẩm), không bán món đang mặc. Vật phẩm dùng số lượng bán được kiểm tra với kho thực.

Chuyển hoặc dừng hoạt động phải xác nhận. Hủy không thay phiên hoặc tiêu hao tài nguyên; hoạt động vẫn tiếp diễn khi đang hỏi. Áp dụng cả auto, luyện chế, khai thác, thiền tu và di chuyển. Đường được cân bằng lại để mỗi tuyến cạnh nhau khoảng 120 giây tại mức yêu cầu map cao hơn. Khoảng cách cố định, speed nhân vật quyết định thời gian. Lưu chuyến đi phiên bản cũ chuyển theo phần trăm tiến độ, không thu lại phí truyền tống.

Auto mới mặc định dùng đan và chạy bốn giờ; giữ tùy chọn người chơi đã lưu. Tử vong trừ floor(10% tu vi hiện đang tích lũy), không tụt cảnh giới; báo cáo ghi số mất riêng và không trừ lại khi tải game. Dừng tự nguyện, hết giờ hoặc rút lui khi còn HP không bị phạt.

Màn chiến đấu dùng năm icon kỹ năng dưới nhân vật thay khối danh sách cũ; hiển thị CD và bấm xem thông tin. Engine, học/gắn kỹ năng và bản lưu đều nhận năm ô. Né tránh đã áp lên đòn thường và sát thương kỹ năng không phải sát thương chuẩn; không áp lên DoT hoặc true damage. MP mới tăng chỉ số tối đa; tiêu hao/hồi MP chiến đấu vẫn chưa triển khai. 89 test và build tĩnh; chưa QA điện thoại thật.

### Rút gọn trang bị · 0.17.0

Yêu cầu mới thay thế cơ cấu 135 bộ/810 mẫu cũ: mỗi bậc có đúng một bộ gồm kiếm, nón, áo, quần, giày và ngọc bội. Tổng 9 bộ/54 mẫu; sáu phẩm giữ nguyên. Bộ I–IX lần lượt là Thanh Phong, Ngự Phong, Thanh Trúc, Thất Tinh, Chu Tước, Phá Hư, Thiên Uyên, Huyết Thiên và Bắc Hàn. Tất cả map thuộc cùng cảnh giới dùng cùng bộ trong loot/luyện khí. Ngân sách và yêu cầu mặc tính tại map đầu cảnh giới; không sinh thêm bộ theo map hoặc hướng tu. Sổ công thức mới chỉ giữ 54 công thức trang bị.

Chuyển đồ cũ theo bậc + vị trí. Giữ instance ID, phẩm, giá trị roll và vị trí đang mặc; chỉ ánh xạ template sang mẫu chung. Các bản sao vẫn tồn tại riêng. Chỉ số white cũ và định nghĩa công thức đang chạy được giữ để đọc bản lưu, không nằm trong danh mục hoạt động. Luyện chế đang chạy giữ đúng thời gian/phí/nguyên liệu cũ và trả mẫu mới tương ứng. Hiệu ứng bộ vẫn chưa mở.

Ảnh quần đã thay icon tạm bằng PNG trong suốt; renderer dùng ảnh này ở mọi nơi. 93 test, gồm migration tất cả 756 mẫu bị bỏ, loot/luyện khí 45 map và tiếp tục công thức cũ. Chưa QA điện thoại thật.

### Chiến đấu theo lượt thời gian và quản lý trang bị · 0.18.0

1. UI: tên chi tiết quái lấy entity.name; chỉ số dạng dòng; nhân vật động phủ dẫn sang Tu hành; thanh hoạt động chỉ có khi đang thực hiện. Đồ đang mặc không xuất hiện trong túi. Bán theo phẩm xác nhận danh sách snapshot và giá, không bán đồ đang mặc hoặc món mới vào sau khi mở hộp.
2. RollVersion5: giữ một dòng gốc cố định theo vị trí, tổng 3–6 dòng theo phẩm. Dòng phụ chọn từ toàn bộ statInfo (22 key), loại key gốc và không trùng key. HP/MP/DEF có cả dạng phẳng và dạng phần trăm; né là tỉ lệ %. Dạng phẳng và % là hai dòng khác nhau. Dòng % nhân tổng phẳng một lần; không nhân lặp khi mặc lại. Mẫu công bố tất cả khoảng min ~ max theo phẩm, đồ đã nhận giữ số đã chốt.
3. Mỗi hành động chiến đấu (skill hoặc đòn thường) cách 1/attackSpeed giây, chung một lịch; tối đa 5 lượt/giây. Duyệt 5 ô lần lượt, bỏ qua skill đang CD/thiếu MP; nếu không có skill hợp lệ thì đánh thường. Không thi triển toàn bộ skill và thêm đòn thường trong cùng lượt. Lịch hero/enemy có timestamp dưới giây; tiếp tục đúng qua save/load và khi đổi tốc đánh.
4. MP là tài nguyên lưu thật. Chi phí từng skill khai báo mp_cost, khoảng 5% MP gốc cảnh giới; hỗ trợ khoảng 6%. Hồi 1% MP tối đa/giây trong combat, 4% ngoài combat; không vượt cap. Thiếu MP không trừ âm hoặc tạo CD miễn phí. Bản lưu cũ chưa có MP khởi tạo đầy theo chỉ số tối đa sau migration.
5. Nhanh nhẹn trang bị cộng né (0,01 điểm phần trăm/điểm bonus). Chính xác giảm né mục tiêu 0,05 điểm phần trăm/điểm. Quái striker và Boss có evasion_bp; sát thương thường/skill có thể bị né, true damage/DoT giữ ngoại lệ. ST Kim/Mộc/Thủy/Hỏa/Thổ cộng theo hệ đòn, công pháp khai báo element; kháng hệ giảm sát thương không phải true damage. Chưa có chu trình tương khắc 20% và toàn bộ hiệu ứng ngũ hành.
6. Mỗi quái: 20% thử trang bị, 30% thử vật phẩm độc lập. Chọn mẫu trong sáu món cùng bậc ngẫu nhiên; vật phẩm gồm thảo dược/khoáng tại map/Hồi Xuân Đan. Boss: 1 món, phân phối Tiên 1%, Thiên 5%, Địa 10%, Huyền 15%, Hoàng 25%, Phàm 44%. Không còn thưởng trang bị mặc định mỗi ba quái. Rơi đầy kho vẫn theo giới hạn hiện tại (chưa có hòm tạm).
7. Luyện khí hiển thị 54 công thức chọn trang bị và công thức tinh luyện nguyên liệu; lọc bậc/vị trí, 1–100 mẻ. Nguyên liệu/phí trừ từng mẻ hoàn tất, có kiểm điều kiện, xác nhận khi đổi hoạt động. Phiên công thức cũ vẫn tiếp tục theo chính sách 0.17.0.
8. 105 kiểm thử tự động và build tĩnh. Bao gồm tất cả range/roll, phần trăm một lần, thiếu MP, thứ tự skill, nửa giây/lượt, lưu phiên tốc đánh cao, bảng phẩm chính xác, loot ngẫu nhiên, bulk-sale và UI mô phỏng. Chưa kiểm trực tiếp trên điện thoại.

### Kho, chỉ số, hiệu ứng và đơn vị di chuyển · 0.20.0

- Lọc là nút mở hộp chọn bậc/phẩm/vị trí, chỉ áp khi bấm Áp dụng; Bỏ lọc trả về toàn bộ đồ chưa mặc. Bán nhanh mở chọn phẩm rồi xem số món/tổng giá và xác nhận; giữ chính sách snapshot và không bán đồ đang mặc.
- Động phủ có tab Nhân vật chứa trang bị và chỉ số. Chỉ số bỏ khỏi Tu hành; Tu hành giữ nghề/cảnh giới/đột phá. Tốc đánh (lượt/giây) và thời gian một lượt là nghịch đảo, gộp cùng một dòng; không tạo thêm hai chỉ số độc lập.
- Thông số trận mặc định ẩn, bật bằng nút Chi tiết bên trái. Bỏ danh sách lịch sử chiêu khỏi màn chiến đấu; thay bằng số nổi −HP/+HP/−MP/+MP và né/bạo kích trên actor. Log giới hạn vẫn là dữ liệu nội bộ; serial sự kiện tránh trùng/phát lại, hiệu ứng tạm không lưu vào bản save. Reduced-motion dùng mờ thay dịch chuyển.
- Đơn vị hiện hành: mét và m/s. Bảng speed được cân bằng về mốc Luyện Khí 5 m/s; tốc độ và dòng speed trang bị cũ chia 24 một lần khi thiếu speedUnit. Các stat khác giữ nguyên. Dòng tốc độ mới giữ số lẻ để giày không bị làm tròn tối thiểu 1 m/s.
- Mỗi tuyến cùng giới liền kề có distance_m cố định = speed gốc ở mức yêu cầu map cao hơn × 45. Thời gian thực = ceil(distance_m/speed hiện tại), nằm khoảng 30–60 giây ở mức phù hợp và nhanh hơn khi tăng speed. Các chặng xa cộng khoảng cách; không điều chỉnh khoảng cách theo người chơi.
- Journey version4 dùng distanceM/travelledM. Chuyến cũ giữ tỉ lệ đã đi và phí cũ, không thu lại phí. Teleport mới ceil(50 + distance_m × 2/56,25), 3 giây; phi thăng 30 giây và các điều kiện tiếp điểm giữ nguyên. Trường dặm cũ chỉ dùng đọc lịch sử/tính phí cũ khi migration.
- 109 kiểm thử và build tĩnh; chưa kiểm trực tiếp trên điện thoại.

## Lịch sử 0.20.0 — Bản đồ và quản lý túi (đường nối đã bỏ trong 0.21.0)
Đường nét đứt dùng tọa độ nút map; vị trí nhân vật dùng quãng đường tích lũy theo từng chặng (hỗ trợ cả chiều ngược). Điểm phi thăng không nối bằng đường bộ. Camera lưu theo thế giới, không đổi khóa khi nhân vật đến map mới.

Túi có Trang bị và Vật phẩm, cùng thao tác lọc/bán nhanh theo phẩm. Chốt danh sách và số lượng tại bước xem xác nhận; xác thực toàn bộ trước khi bán. Danh mục tham khảo và trang phục nằm trong Bách khoa toàn thư.

## 0.21.0 — Quy định UI hiện hành

1. Bán nhanh ở cả Trang bị và Vật phẩm dùng các ô tích chọn Phàm/Hoàng/Huyền/Địa/Thiên/Tiên phẩm, có thể chọn nhiều phẩm. Đếm số món theo bộ lọc tab hiện tại; không có đồ thì ô bị khóa. Không chọn phẩm thì không chuyển bước. Xác nhận tổng số món, các phẩm và tổng giá trước khi bán. Chốt danh sách/số lượng, không bán thêm đồ nhận sau đó; đồ mặc và đồ không bán được giữ lại.
2. Bản đồ bỏ toàn bộ dây nối hiển thị. Giữ marker di chuyển theo tiến độ, tọa độ thống nhất và camera theo thế giới.
3. Bấm nhân vật ở Động phủ mở Cảnh giới & đột phá, có nút Thiền tu luyện. Các tab Nhân vật/Công pháp/Linh thú vẫn dùng riêng. Động phủ và màn đột phá có thanh tu vi, số hiện tại/tổng và phần trăm, cập nhật theo nhịp game.
4. Bách khoa toàn thư gồm Trang bị/Vật phẩm/Trang phục; túi chỉ chứa Trang bị/Vật phẩm sở hữu.
5. Kiểm thử Node và build tĩnh là xác nhận kỹ thuật; chưa QA trực tiếp trên điện thoại. Chưa triển khai MMO, kỹ năng đặc biệt phẩm Thiên/Tiên, hiệu ứng bộ và toàn bộ vòng tương khắc 20%.
