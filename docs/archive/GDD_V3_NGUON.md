# TU TIÊN IDLE MMO — GDD V3.0
## Thiết kế thế giới phân cấp và nền dữ liệu toàn game

Ngày cập nhật: 17/10/2026. Ngôn ngữ: Tiếng Việt. Trạng thái: thiết kế nền để duyệt và triển khai; chưa phải bộ số đã thử nghiệm cân bằng.

Nguồn: PDF `Tu_Tien_Idle_MMO_GDD.md.pdf` do người dùng cung cấp, 30 trang; phần V2.0 dán trong hội thoại; yêu cầu bổ sung lối chơi theo vòng hoạt động của IdleMMO và thế giới từ địa điểm nhỏ tới vùng, quốc, tinh vực, giới. Tài liệu này là bản mở rộng độc lập, giữ bản PDF nguồn. Nội dung mới ưu tiên hơn bản trích nguồn ở cuối khi có quy tắc xung đột. Cảm hứng tham khảo: https://wiki.idle-mmo.com/getting-started/introduction và https://wiki.idle-mmo.com/economy-and-trading/market ; các thông số V3 là thiết kế riêng.

## 1. Quyết định nền và phạm vi

- Có 9 đại cảnh giới, mỗi cảnh giới 10 tầng; có 45 địa điểm chiến đấu lõi, 135 quái thường, 45 Boss bí cảnh, 45 công pháp, 15 pháp bảo, 135 bộ trang bị và 810 mẫu món rời.
- Bộ nền kèm theo có 242 vật phẩm ngoài trang bị và pháp bảo: 45 linh thảo + 45 khoáng + 45 tinh hồn + 45 đan cốt lõi + 15 phù + 15 bảo thạch + 9 nguyên liệu đột phá + 5 vật phẩm tiện ích + 18 nguyên liệu tinh luyện.
- Có 135 ô kỹ năng Boss: kỹ năng đặc trưng giữ tên từ PDF; hai kỹ năng còn lại là mẫu V3 có tên theo từng Boss. Đây là nền cơ chế có thể thay thế theo ID, chưa phải 135 kỹ năng độc quyền đã biên soạn hoàn chỉnh.
- ID, quan hệ dữ liệu và đơn vị là nền ổn định. Giá trị cân bằng được phép điều chỉnh có phiên bản, không ghi trực tiếp vào mã giao diện.
- Một nhân vật có một hoạt động chính. Game xử lý tiến trình khi người chơi vắng mặt, kết hợp kinh tế và nội dung cộng đồng trên máy chủ.
- Chưa mặc định PvP cướp đồ, hệ VIP tăng sức mạnh hoặc thu phí. Những hệ này ngoài phạm vi nền hiện tại.

## 2. Cấu trúc thế giới chính thức

**Từ nhỏ đến lớn: Địa điểm → Vùng → Quốc gia → Tinh vực → Giới.**

Nhân Giới, Linh Giới, Tiên Giới là ba nút gốc cùng cấp. Tiên Giới có tiến trình cao hơn nhưng không chứa Linh Giới; Linh Giới không chứa Nhân Giới. Không có một tinh vực chứa nhiều giới. Không dùng cùng trường dữ liệu cho cảnh giới tu luyện và địa giới.

| Cấp | Ý nghĩa | Dữ liệu trực tiếp |
|---|---|---|
| Địa điểm | Đơn vị nhỏ nhất có thể vào và chọn hoạt động | Quái, điểm nghề, NPC, cổng bí cảnh |
| Vùng | Nhóm địa điểm gần nhau | Điều kiện vùng, khí hậu, điểm dịch chuyển |
| Quốc gia | Chủ thể quản lý nhiều vùng | Phường thị, danh vọng, tuyến nhiệm vụ |
| Tinh vực | Không gian lớn chứa nhiều quốc gia | Tuyến liên quốc, cổng tinh vực |
| Giới | Cấp thế giới cao nhất | Luật giới, điều kiện phi thăng |

45 map hiện tại đều là **địa điểm có thể chơi**, không phải tổng số nút ở tất cả cấp. Nền V3 định nghĩa 3 giới, 8 tinh vực, 8 quốc gia, 18 vùng và 45 địa điểm. Đây là phần thế giới đã khai triển, không phải giới hạn sức chứa; một tinh vực có thể mới mở một quốc gia và được thêm nhiều quốc gia sau.

Chuỗi điển hình: Nhân Giới → Thiên Nam Tinh Vực → Việt Quốc → Thất Huyền Sơn Vực → Vô Danh Thôn.

### 2.1. Phân bố tiến trình

| Giới | Cảnh giới chính | Địa điểm | Cổng vượt giới |
|---|---|---|---|
| Nhân Giới | Luyện Khí, Trúc Cơ, Kim Đan, Nguyên Anh | M01–M20 | Hoàn thành M20, đột phá Hóa Thần |
| Linh Giới | Hóa Thần, Luyện Hư, Hợp Thể, Đại Thừa | M21–M40 | Hoàn thành M40, đột phá Chân Tiên |
| Tiên Giới | Chân Tiên | M41–M45 | Nội dung tiếp diễn sau M45 để mở rộng |

**Thay đổi có chủ đích so với PDF:** các khu Hóa Thần và Luyện Hư được xếp vào Linh Giới để ba giới có ranh giới rõ; trong PDF chỉ nhóm Hợp Thể ghi rõ Linh Giới. Ma Giới, Hôi Giới và Quảng Hàn Giới được hiểu là tên cổ/tiểu không gian trong hệ ba giới; không tự thêm giới gốc thứ tư. Nếu bổ sung thế giới thứ tư, dùng ID mới và phiên bản mở rộng.

Tên cũ như Chu Tước Tinh, Man Hoang Thế Giới, Huyết Thiên Đại Lục có quy mô vượt một địa điểm. Giữ `legacy_name`, còn tên địa điểm hiển thị thêm vị trí cụ thể. Hành tinh/đại lục có thể lưu ở mô tả địa lý; chưa thêm thành cấp bắt buộc trong cây năm cấp mà người dùng yêu cầu.

### 2.2. Quy tắc quan hệ

Mỗi quốc chỉ thuộc một tinh vực; mỗi vùng chỉ thuộc một quốc; mỗi địa điểm chỉ thuộc một vùng. Cây không được có chu trình. Cổng dịch chuyển là cạnh giao thông riêng, không thay đổi quan hệ cha con. Địa điểm có thể có nhiều hoạt động và bí cảnh; một Boss lõi gắn một địa điểm. Không suy ra cha con bằng thứ tự ID.

### 2.3. Di chuyển và mở khóa

- M1 mở khi tạo nhân vật. Tầng 1/3/5/7/9 là **khuyến nghị** cho năm map của mỗi cảnh giới, không phải khóa cứng theo lực chiến.
- Mở map kế tiếp sau nhiệm vụ khám phá và chiến thắng Boss cột mốc ở map trước. Map đầu cảnh giới mới còn yêu cầu đã đột phá đúng cảnh giới.
- Mở lối đi sau lần khám phá đầu tiên; có thể quay lại khu cũ để làm nghề và giao dịch.
- Đi giữa địa điểm cùng vùng: mặc định 30 giây; khác vùng cùng quốc: 120 giây; khác quốc cùng tinh vực: 300 giây; khác tinh vực cùng giới: 900 giây. Đây là thời gian cơ sở giữa các điểm cổng liên quan, không phải khoảng cách địa lý thực.
- Chuyến liên giới lần đầu là nhiệm vụ phi thăng. Sau đó qua cổng đã mở: 1.800 giây, yêu cầu tài nguyên chuyến đi.
- Ngự kiếm +50% tốc độ nghĩa là thời gian chia 1,5; không trực tiếp giảm 50% thời gian. Buff tốc độ tính một lần.
- Di chuyển chiếm hoạt động chính; có thể xếp vào hàng đợi. Không hái thuốc/đánh quái ở nơi đến trước khi hoàn tất hành trình.
- Vùng an toàn có NPC và chợ; vùng nguy hiểm có lịch luyện. Mỗi map cần ít nhất một chỗ nghỉ để nhân vật hồi phục sau thất bại.

## 3. Nhân vật, linh căn và cảnh giới

### 3.1. Chỉ số nền

Số gốc giữ từ V2/PDF, dùng bảng đầy đủ ở phụ lục. Công thức tầng: `Base(r,l) = round_half_up(Base(r,1) × [1 + 0,12 × (l−1)])`. Tầng 10 = 208%, tăng tuyến tính; không lũy thừa 1,12. Bảng `cultivation.json` gồm đủ 90 dòng.

Cảnh giới có 10 thanh tu vi: tầng 1 tới tầng 9 đầy thanh thì lên tầng, tầng 10 đầy thanh thì sẵn sàng đột phá. Tổng 10 thanh đúng tổng EXP của cảnh giới. Dùng trọng số 1..10: thanh l = floor(T×l×(l+1)/110) − floor(T×(l−1)×l/110). Khi đột phá chuyển sang tầng 1 của cảnh giới sau, tu vi cảnh giới mới bằng 0; EXP dư không tự chuyển nếu chưa thiết kế quy tắc chuyển đổi.

Mốc thời gian V2 là mục tiêu trải nghiệm cần kiểm chứng, không phải cam kết thời gian đạt cảnh giới. Không dùng trực tiếp phần thưởng quái hiện tại để khẳng định đạt Luyện Khí sau 2 giờ.

### 3.2. Linh căn và lối tu

Giữ xác suất Kim/Mộc/Thủy/Hỏa/Thổ mỗi loại 19%, dị linh căn tổng 5%. Trong nhóm dị căn, Lôi/Băng/Phong chia đều, quay nhóm rồi quay nhánh để tránh sai tổng do làm tròn.

Linh căn là đặc tính nhân vật, còn Kiếm Tu/Pháp Tu/Thể Tu là hướng trang bị; cho phép đổi hướng ngoài chiến đấu. Kim Đan/Hóa Thần/Hợp Thể là mốc mở tiến hóa. Không tự động đổi căn khi thăng giới. Các tỷ lệ “+25% ra đồ hiếm” trong bản gốc cần biểu diễn là **trọng số tương đối**, rồi chuẩn hóa cả bảng phẩm chất về 100%; không cộng 25 điểm phần trăm vào từng phẩm chất.

Đề xuất phẩm linh căn Phàm/Địa/Thiên/Tiên tăng hiệu quả buff căn theo 1/1,1/1,2/1,35; giá trị là dự kiến. Không nhân các tỷ lệ đã chạm trần. Mỗi nhân vật có một căn chính; căn phụ tối đa hai, mở theo mốc và chỉ hưởng 40% buff căn phụ. Việc tẩy căn phải cho xem căn mới và chọn giữ cũ/nhận mới; nguyên liệu mất khi quay, không mất tiến trình nghề.

### 3.3. Cơ chế cảnh giới đặc biệt

Giữ các ý tưởng V2: Ngự kiếm, phẩm Kim Đan, Nguyên Anh bảo mệnh, Ngũ Hành, Tâm Ma và Pháp Tắc. Quy tắc bổ sung:

- Buff nền phẩm Kim Đan chỉ áp dụng HP/Công/Thủ gốc; không nhân xác suất và không được nâng phẩm lặp để cộng dồn.
- Nguyên Anh cứu mạng một lần theo ngày server; không cùng kích hoạt với pháp bảo/công pháp hồi sinh trong một đòn. Ưu tiên bảo mệnh trang bị → công pháp → Nguyên Anh.
- Tâm Ma chỉ tích khi hoạt động thuộc nhóm tu luyện/lịch luyện. Đầy thanh tạo lời mời khiêu chiến, không tự ép trận làm gián đoạn kế hoạch offline. Mỗi lần thắng nhận buff 12 giờ, làm mới thời hạn thay vì cộng tầng.
- Bốn Pháp Tắc là nhánh phát triển độc lập từ Hợp Thể; bảng điểm chi tiết và chi phí cần vòng thiết kế riêng. Không mặc định cộng thẳng cả bốn nhánh.

## 4. Vòng hoạt động Idle MMO

### 4.1. Trạng thái và tài nguyên

Luồng trạng thái: Rảnh → Di chuyển/Chuẩn bị → Đang hoạt động → Hoàn tất/Tạm dừng → Rảnh. Chiến đấu có trạng thái Hồi phục hoặc Rút lui riêng. Một hoạt động chính; linh điền là sản xuất phụ có chu kỳ độc lập và vẫn tính theo thời gian server.

- Thời gian treo không thao tác tối đa 8 giờ từ lần xác nhận kế hoạch gần nhất; không được làm mới vì một lệnh đồng bộ nền.
- Hàng đợi ba bước, dùng chung ngân sách 8 giờ; không phải ba bước × 8 giờ.
- Hoạt động có thể chỉ định số lượt, thời gian hoặc điều kiện dừng. Giao diện hiển thị chi phí dự kiến và điều kiện không bảo đảm như vật phẩm hiếm.
- Chi phí lượt sản xuất trừ nguyên tử lúc bắt đầu lượt. Thưởng một lần lúc hoàn tất. Hủy giữa lượt mất chi phí lượt đang làm; giao diện cần công bố trước.
- Đủ túi mới bắt đầu lượt; nếu vật phẩm hiếm bất ngờ làm đầy túi, đẩy phần dư vào hộp nhận tạm, không xóa thưởng. Hộp tạm tối đa 100 dòng, không hết hạn trong bản nền; đầy hộp thì chặn bắt đầu lượt mới.
- Không đủ nguyên liệu thì dừng bước hiện tại và cả hàng đợi; không tự mua đồ hoặc đổi hoạt động thay người chơi.
- Quay lại nhận báo cáo; nhận báo cáo không tạo thưởng lần hai. Lưu `claim_id` duy nhất.

### 4.2. Hoạt động cơ bản

| Hoạt động | Chu kỳ cơ sở | Đầu ra | Điều kiện dừng |
|---|---|---|---|
| Bế quan | 60 giây | Tu vi | Đầy thanh đột phá hoặc hết thời gian |
| Hái thuốc | 5 giây | 1 linh thảo +1 điểm nghề | Túi đầy/thời hạn |
| Đào khoáng | 8 giây | 1 quặng +1 điểm nghề | Hết độ bền/thời hạn |
| Tinh luyện | Theo công thức | Tinh thiết/linh dịch | Thiếu vật liệu |
| Luyện đan | 30+10×(bậc−1) giây | Đan, điểm nghề | Thiếu vật liệu |
| Luyện khí | 60+15×(bậc−1) giây | Trang bị ngẫu nhiên phẩm | Thiếu vật liệu |
| Lịch luyện | Theo mô phỏng trận | EXP, tiền, vật liệu | Rút lui/hết thuốc |
| Thám hiểm | 300 giây | Khám phá, kỳ ngộ | Theo số lượt |

Bế quan cần bảng tốc độ EXP riêng theo cảnh giới và công trình, chưa gán tốc độ giả để khớp thời gian. Thám hiểm cần bảng kỳ ngộ riêng. Hai hoạt động này có hợp đồng dữ liệu nhưng bảng phần thưởng là phần cần bổ sung trước khi phát hành.

Tốc độ nghề: `duration = max(1 giây, base_duration / (1 + tổng tăng tốc))`. Hỏa căn “giảm 20% thời gian” được chuẩn hóa thành nhân thời gian 0,8 ở nhóm điều chỉnh thời lượng riêng. Giới hạn tổng giảm thời gian hiệu dụng 70%. Hiển thị đúng sự khác nhau giữa tăng tốc và giảm thời gian.

## 5. Chiến đấu và công thức

### 5.1. Ô kỹ năng

Giữ giới hạn bản PDF: tối đa **5 công pháp và 5 pháp bảo**. Mỗi công pháp có nội tại và chủ động theo mô tả; không đổi thành 3 chủ động +2 bị động như đề xuất hội thoại trước. Chỉ hiệu ứng của công pháp đang trang bị hoạt động. Ô công pháp mở theo Luyện Khí tầng 1/3/5, Trúc Cơ và Kim Đan; ô pháp bảo mở theo Luyện Khí, Trúc Cơ, Kim Đan, Nguyên Anh, Hóa Thần.

Công pháp dùng linh lực; đánh thường không tốn. Linh lực tối đa =100+20×(bậc cảnh giới−1), hồi 2% tối đa/giây khi chiến đấu. Chi phí chuẩn công pháp 10% tối đa, tối thiểu 1; ngoại lệ hồi sinh không tốn linh lực và chỉ kiểm tra điều kiện. Pháp bảo có năng lượng 0–100 riêng, hồi 10/giây trong chiến đấu, tiêu hao 100/lần, mở trận bằng 0. Cả năng lượng và hồi chiêu đều phải đủ.

Một nhân vật chỉ thi triển một kỹ năng mỗi thời điểm; cách nhau ít nhất 0,5 giây, kỹ năng có thời gian niệm ưu tiên thời gian niệm. Kỹ năng chưa sẵn sàng được bỏ qua sang lựa chọn tiếp theo. Câm lặng cấm kỹ năng chủ động, không xóa nội tại đã có. Các cơ chế reset CD không tạo năng lượng và không làm mới kỹ năng reset khác; một chuỗi reset chỉ xử lý một lần, ngăn vòng lặp vô hạn.

### 5.2. Thứ tự tính

1. HP/Công/Thủ gốc tầng → cộng chỉ số phẳng (trang bị, đan vĩnh viễn) → nhân nhóm % cộng dồn cùng loại → buff cuối riêng.
2. Kiểm tra trúng: clamp(chính xác công − né tránh thủ, 10%, 99%). Hai giá trị là cùng đơn vị, không nhân xác suất lần nữa.
3. Thủ hiệu dụng = Thủ ×(1−phá giáp)×(1−xuyên giáp).
4. Sát thương trước giảm cuối = Công × hệ số skill × K/(Thủ hiệu dụng+K).
5. Nhân bạo kích nếu trúng bạo, nhân khắc hệ, nhân nhóm sát thương cuối.
6. Nhân (1−giảm sát thương); tiêu hao khiên trước HP. Làm tròn xuống một lần ở cuối mỗi gói, tối thiểu 1 với gói sát thương dương.

Đề xuất `K = 5 × Thủ gốc tầng 1 của cảnh giới người tấn công`, thay `500×bậc` của V2. Ví dụ Luyện Khí K=150; Chân Tiên K=2.500.000.000. K này là phương án cần kiểm thử, không khẳng định đã cân bằng. Trong phụ bản đồng bộ dùng K của bộ chỉ số đã đồng bộ.

Bạo thực = clamp(bạo công−kháng bạo thủ,0%,80%). Tốc đánh tối đa 5/s, né hiệu dụng theo công thức trúng, xuyên giáp tối đa 80%, phá giáp tối đa 60%, giảm sát thương tối đa 75%, giảm CD tối đa 50%, hút máu tối đa 40% sát thương HP thực gây ra. Không hút máu từ sát thương vào khiên, phản đòn hoặc sát thương tự gây. “+100% xuyên giáp” trong công pháp cuối game bị áp trần; cần cân bằng lại để tránh chỉ số thừa.

Sát thương chuẩn bỏ qua Thủ, xuyên/phá giáp và giảm sát thương chung; vẫn bị khiên hấp thụ và chịu giới hạn Boss. Không tự bạo/khắc hệ trừ khi kỹ năng ghi rõ. Phản đòn tính theo HP+khiên thực mất do gói gốc, không phản đòn qua lại. Các thay đổi so với V2 là quy tắc mới cần thử nghiệm.

Ngũ Hành từ Hóa Thần: Kim→Mộc→Thổ→Thủy→Hỏa→Kim; khắc ×1,35, bị khắc ×0,75, trung tính ×1. Lôi/Băng/Phong/Ám/Thần Thức không tự suy ra quan hệ khắc; kỹ năng đa hệ phải chỉ định một hệ sát thương chính.

### 5.3. Hiệu ứng

| Mã | Quy tắc chuẩn hóa V3 |
|---|---|
| BURN | 2% HP tối đa/giây/tầng, 5 giây, tối đa 3 tầng; tổng lên Boss ≤500% Công nguồn/giây |
| POISON | 1,5% HP tối đa/giây/tầng, sát thương qua Thủ, 8 giây, tối đa 5 tầng; tổng trước Thủ lên Boss ≤500% Công nguồn/giây; giảm hồi máu 40% không cộng tầng |
| BLEED | 80% Công/giây/tầng, 4 giây, tối đa 3 tầng; ×2 chỉ khi mục tiêu có trạng thái di chuyển được hệ thống xác định |
| ARMOR_BREAK | Mặc định giảm 30% Thủ trong 6 giây; lấy mức mạnh nhất, không cộng thẳng các nguồn |
| STUN | Cấm hành động; khiên còn tồn tại chặn STUN mới, không tự xóa STUN cũ |
| FREEZE | Cấm hành động, tăng hệ số bạo nhận vào 0,25; không tự tăng xác suất bị bạo |
| SILENCE | Cấm công pháp/pháp bảo chủ động, vẫn đánh thường |
| LIFESTEAL | Áp trần chung; tính trên phần HP thực mất; POISON và phản đòn không kích hút máu |
| SHIELD | Nhiều nguồn lấy khiên mạnh nhất còn lại; không cộng tổng; ghi nguồn và thời hạn |
| REFLECT | Không bạo, không hút máu, không phản tiếp; áp trần phản 40% |

Hiệu ứng phụ như HASTE, hồi sinh, cướp buff, cấm hồi máu được khai báo riêng trong schema; mười hiệu ứng trên là bộ lõi chứ không giới hạn toàn bộ cơ chế. Tỷ lệ áp hiệu ứng = tỷ lệ gốc ×(1−kháng hiệu ứng), tối đa 95%, tối thiểu 0%; bỏ qua kiểm tra với buff tự thân. Cùng nguồn làm mới thời hạn và thêm tầng tới trần; nguồn khác lưu riêng nhưng tổng tầng toàn mục tiêu vẫn bị giới hạn.

Boss chịu khống chế lần đầu 100% thời lượng, lần hai 50%, lần ba 25% trong cửa sổ 20 giây; sau mỗi lần kết thúc có 3 giây miễn khống chế cứng. Câm lặng lên Boss tối đa 2 giây. Tỷ lệ này cần mô phỏng cùng bộ kỹ năng cuối game.

### 5.4. Tự động hóa chiến thuật và thất bại

Cho phép ưu tiên dùng thuốc dưới 40% HP, dùng khiên khi Boss niệm tuyệt kỹ, dùng giải độc khi ≥2 tầng độc, rút lui dưới 15% HP nếu thuốc chưa sẵn sàng. Thuốc hồi phục dùng chung CD 30 giây. Không tự dùng đan tăng chỉ số vĩnh viễn hoặc đan đột phá.

Chết ở lịch luyện: về chỗ nghỉ, không mất cảnh giới, không rơi trang bị; mất phần thưởng trận chưa hoàn tất, tạm dừng hàng đợi. Nguyên Anh bảo mệnh giữ quy tắc suy yếu V2; phải hiển thị thời hạn. PvP chưa nằm trong bản nền.

## 6. Boss, bí cảnh và cộng đồng

45 Boss trong dữ liệu là Boss cá nhân, vào chủ động. Bỏ ràng buộc 12h/18h/21h đối với Boss cá nhân của PDF. Lịch giờ có thể dùng cho Boss thế giới riêng, không dùng chung HP và bảng thưởng cá nhân.

- Mỗi ngày thêm 3 lượt nhận thưởng, kho tối đa 9; dùng chung cho toàn bộ bí cảnh cá nhân. Đổi ngày theo Asia/Ho_Chi_Minh lúc 00:00.
- Vào trận giữ chỗ một lượt; thắng trừ lượt và trao thưởng cùng giao dịch; thua trả chỗ giữ. Không được dùng cùng lượt ở hai thiết bị.
- Trận tối đa 180 giây; sau 120 giây Boss tăng sát thương 50%. Không có thưởng vô hạn bằng cách cố kéo dài trận.
- Ba kỹ năng mỗi Boss gồm đặc trưng, phòng vệ, tuyệt kỹ; dữ liệu hiện là bản nháp cơ chế. Kỹ năng 1 mặc định CD12s/niệm2s, kỹ năng 2 khiên10% HP trong6s/CD24s, kỹ năng 3 sát thương400% Công/CD30s/niệm3s.
- Mô tả kỹ năng đặc trưng gốc có trong trích nguồn; không tự dùng hệ số mặc định 200% thay mọi kỹ năng hồi sinh/hồi máu. Bộ chạy phải phân nhánh theo mechanic, và các mechanic chưa đủ tham số phải bị chặn phát hành.
- Tổ đội 3–5 người: người chơi đăng ký bộ kỹ năng trước, hệ thống mô phỏng chung, mỗi người có lượt thưởng riêng. Vai trò chống chịu/gây sát thương/hỗ trợ dựa trên cấu hình.
- Boss thế giới: dùng cửa sổ đăng ký, đánh giá đóng góp gồm sát thương, hồi máu hữu hiệu và hấp thụ có giới hạn. Không thưởng riêng theo đòn kết liễu. Số Boss và lịch giờ cụ thể là nội dung mở rộng, chưa nằm trong 45 Boss lõi.

## 7. Đột phá và pity

Giữ loại nguyên liệu, số lượng, tỉ lệ và ngưỡng pity trong PDF. Pity đếm **lượt thắng có nhận thưởng** liên tiếp không rơi vật liệu tương ứng; đảm bảo 1 món ở lượt N nếu N−1 lượt trước không rơi. Rơi tự nhiên cũng đặt lại bộ đếm. Không bảo đảm toàn bộ số lượng cần thiết sau N lượt. Không tăng pity ở lượt đánh thử/thua.

Điều kiện đột phá: tầng10 đầy thanh + nhiệm vụ cảnh giới + đủ đan + đủ nguyên liệu. Hiển thị xác suất, phần mất khi thất bại và điểm bảo hiểm trước khi xác nhận. Đề xuất xác suất gốc 50%, điểm thất bại +10 điểm phần trăm/lần, đan cộng theo bảng nguồn; tổng tối đa100%. Một lần thất bại tiêu hao 1 đan và phí linh thạch, không mất nguyên liệu Boss. Nguyên liệu Boss chỉ tiêu khi đột phá thành công. Giá phí chưa chốt. Toàn bộ là quy tắc V3 cần cân bằng.

Mốc Chân Tiên→Đạo Tổ có vật liệu trong PDF nhưng **Đạo Tổ chưa nằm trong 9 cảnh giới**. V3 giữ vật liệu M45 làm nội dung tiếp diễn; khóa nút đột phá Đạo Tổ, không âm thầm tạo cảnh giới thứ10 chưa có bảng số.

## 8. Trang bị và công thức sinh chỉ số

Tên năm bậc mỗi cảnh giới giữ từ PDF. Mỗi bậc có Kiếm Trang/Pháp Bào/Chiến Giáp, mỗi bộ sáu món. 810 là số **mẫu vật phẩm**, không phải số lượng vật phẩm tồn tại trên server; phẩm chất là thuộc tính của instance, không tạo thêm ID mẫu.

Bảng PDF ghi tổng bộ Cam ở hai đầu mỗi cảnh giới. V3 chuyển tổng Cam/3 thành chuẩn Trắng, nội suy hình học cho ba bậc giữa: `W(j)=round((Cam_min/3) × (Cam_max/Cam_min)^((j−1)/4))`. Sau đó nhân hướng tu: Kiếm 1/1/1; Pháp HP0,9/Công1,15/Thủ0,9; Thể HP1,35/Công0,75/Thủ1,3. Các hệ số hướng tu là mới.

| Vị trí | Tỉ trọng HP | Tỉ trọng Công | Tỉ trọng Thủ |
|---|---|---|---|
| Vũ khí | 0% | 65% | 0% |
| Mũ | 15% | 0% | 20% |
| Áo | 40% | 0% | 45% |
| Hộ uyển | 5% | 25% | 15% |
| Giày | 20% | 0% | 15% |
| Ngọc bội | 20% | 10% | 5% |

Chia số nguyên theo phần dư lớn nhất, ưu tiên thứ tự vị trí trong bảng khi hòa; tổng sáu món bằng đúng tổng bộ Trắng. Nhân phẩm chất từng món sau phân bổ: Trắng1/Lục1,2/Lam1,5/Tím2/Cam3/Đỏ3,5, làm tròn half-up. Sai số tổng sau nhân phẩm có thể vài đơn vị, cần lưu rõ đây là tổng các món đã làm tròn. Đỏ tách Cam, sửa việc bản PDF gộp Cam/Đỏ ×3.

Dòng chính xác/tốc đánh/bạo/né là dòng phụ riêng; chưa tự sinh vào 810 món để tránh chồng nhiều hệ số chưa kiểm thử. Set4 và Set6 giữ ý tưởng PDF, áp trần chỉ số toàn game. Chỉ đếm cùng set_id; không ghép bậc khác thành một bộ. Đề xuất set cơ bản hoạt động khi đủ số món, độ mạnh theo phẩm thấp nhất trong bộ; công thức nâng set theo phẩm cần duyệt trước khi phát hành.

Cường hóa, khảm đá và tẩy dòng cần schema sẵn: enhancement_level, sockets, affixes. Bản nền để mặc định0/[]/[]; không viết ngay thông số tăng vô hạn. Instance ID tách template ID, trang bị đã sở hữu giữ roll; cập nhật cân bằng thay bảng cơ sở theo phiên bản công bố.

## 9. Vật phẩm, nghề và sản xuất

Tên 45 đan cốt lõi và giá trị giữ PDF. “Bổ Huyết Đan”, “Bất Tử Đan” trong bảng gốc là **đan tăng HP vĩnh viễn**, không nhầm thuốc hồi HP tức thời. Hồi Huyết Tán là vật phẩm hồi phục mới, tách ID.

Giới hạn mặc định: đan tu vi10 viên/ngày, mỗi loại đan tăng chỉ số vĩnh viễn tối đa30 viên theo cảnh giới xuất xứ. Nâng phẩm không đặt lại số viên. Bonus phẳng đã dùng được giữ khi lên cảnh giới; không bị nhân lại như chỉ số gốc mới. Đan tu vi bị từ chối nếu đang chờ đột phá và không còn chỗ chứa EXP.

Ba nhóm nghề: thu thập (hái thuốc/đào khoáng), luyện đan, luyện khí; lưu điểm hái thuốc và đào khoáng riêng dù UI gom nhóm. Mỗi lượt thu thập thành công +1; luyện đan +3 nếu thành công/+1 nếu thất bại; rèn +5. Chuyên môn đang chọn chỉ tăng hiệu suất, không khóa nghề còn lại. Đổi chuyên môn CD24h, phí dự kiến1.000 linh thạch.

Giữ năm mốc thuần thục: 0–500,501–2.500,2.501–10.000,10.001–50.000,>50.000. Điểm nghề là số nguyên, không có khoảng hở. Tỉ lệ chất lượng rèn gốc Sơ Học Trắng80/Lục20. Các cấp cao phải có bảng phân phối tổng100%; không áp nguyên văn các mức +15% mà không chuẩn hóa. Công thức tinh luyện cơ sở thành công100%; luyện đan60%; rèn luôn ra một món nhưng phẩm ngẫu nhiên.

Trong bộ dữ liệu có 45 công thức đan,18 công thức tinh luyện và810 công thức trang bị. Đầu vào, số lượng, thời gian, phí được khai báo đầy đủ ở mức nháp. Công thức phù, bảo thạch, vật phẩm tiện ích và nguyên liệu đột phá chưa có trong bộ; không cho chế tạo qua công thức giả. Nguyên liệu Boss đặc biệt không giao dịch; tinh hồn Boss thông thường được giao dịch.

Buff nghề Thông Thần +0,05% HP vĩnh viễn mỗi đan cực phẩm trong PDF có nguy cơ vô hạn: V3 đề xuất tổng tối đa5% HP từ cơ chế này, lưu bộ đếm theo nhân vật. Độ bền công cụ khởi điểm1.000, mỗi lượt hoàn tất−1, về0 dừng; có thể sửa ở NPC, chi phí cần bảng kinh tế.

## 10. Phường thị và kinh tế

Dùng một đơn vị linh thạch nguyên trên sổ cái; linh thạch trung/thượng phẩm có thể là cách hiển thị quy đổi, không mặc định ba nguồn tiền độc lập. Mọi biến động có transaction_id, nguồn, đích và lý do.

Chợ có lệnh mua/bán; bán giữ vật phẩm ở ký gửi, mua giữ tổng tiền. Ưu tiên giá tốt rồi thời gian đặt; khớp tại giá lệnh đang nằm trên sổ. Bán thu phí niêm yết1% giá chào, tối thiểu1; khi khớp thuế3% doanh thu phần khớp. Hủy trả phần hàng/tiền còn lại, không hoàn phí đã thu. Lệnh mua chưa thu phí riêng trong V3. Mọi giá và phí là dự kiến.

Bắt đầu10 ô lệnh, hạn72 giờ. Chặn tự khớp cùng tài khoản. Chưa mở gửi tiền/vật phẩm trực tiếp để giảm nhu cầu xử lý giao dịch không có giá. Nguồn tiền: lịch luyện, nhiệm vụ có giới hạn, bán NPC. Nơi tiêu: phí nghề, chợ, sửa công cụ, dịch chuyển, động phủ. Theo dõi tiền tạo/tiêu/ngày và lượng vật liệu tồn trước khi cân bằng.

Không ghi đè số tiền bằng dữ liệu trình duyệt. Một lệnh giao dịch chỉ có một kết quả dù gửi lại nhiều lần. Nhận thưởng nhiệm vụ/Boss và tiêu lượt diễn ra nguyên tử.

## 11. Động phủ và tông môn

Động phủ gồm Tụ Linh Trận, Linh Điền, Đan Phòng, Luyện Khí Phòng, Tàng Bảo Các. Mỗi công trình schema level0–10; bảng chi phí chưa chốt. Hiệu suất bế quan dự kiến +3%/cấp Tụ Linh; kho+20 ô/cấp Tàng Bảo; linh điền +1 ô/cấp. Linh điền chu kỳ30 phút, 1 hạt→3 thảo dược, tiêu hạt khi gieo, chỉ thu khi chín; hạt giống là nhóm cần bổ sung trước khi bật tính năng trồng. Không âm thầm dùng thảo dược như hạt nếu chưa có công thức.

Tông môn khởi điểm30 người; chức vụ Tông Chủ/Trưởng Lão/Đệ Tử. Kho riêng, nhật ký gửi/rút, giới hạn theo quyền và ngày. Nghiên cứu, nhiệm vụ đóng góp và Boss tông môn dùng tài nguyên chung; không rút từ túi cá nhân khi chưa đóng góp. Chưa cố định số cấp, giá nâng và buff để tránh thêm thông số chưa kiểm chứng. Chuyển quyền tông chủ và xóa tông môn phải có quy trình riêng.

## 12. Nhiệm vụ, lựa chọn đạo và hướng dẫn

Mỗi map có một tuyến nhiệm vụ chính; dùng quest_map_001..045. Mẫu tuyến ba bước: khám phá địa điểm → hoàn thành mục tiêu nghề/chiến đấu → đánh Boss. Các mẫu chỉ là khung; lời thoại chi tiết cần viết từng map, không coi 45 ID là 45 tuyến đã hoàn chỉnh.

Chính/Ma dùng hai bộ đếm riêng và một danh vọng địa phương. Chọn đáp án nhận thưởng một lần theo quest_id; sửa lời thoại không cho nhận lại. Hai nhánh có đường quay lại để tránh khóa mất công pháp duy nhất. Ba hội thoại nguồn được giữ ở trích nguồn; cần giảm thưởng10.000 EXP đầu game sau mô phỏng vì tương đương10% tổng tu vi Luyện Khí.

Giờ đầu đề xuất: tạo tên và linh căn → nhận đồ trắng → đánh Dã Trư → hái5 Hoàng Tinh Thảo → học tinh luyện/luyện đan → nhận công pháp → thử Boss M1 → mở map2 → đặt hàng đợi. Chợ mở khi hoàn tất hướng dẫn; không yêu cầu online dài liên tục. Không buộc người chơi đánh Boss thế giới đúng giờ để lên cảnh giới.

## 13. Giao diện

Máy tính: thanh nhân vật trên cùng, menu trái, hoạt động ở giữa, hàng đợi/kết quả bên phải. Điện thoại: một cột, năm mục dưới Tu Luyện/Bản Đồ/Chiến Đấu/Túi/Khác; hàng đợi mở dạng ngăn kéo. Không nhồi45 map vào một danh sách phẳng.

Bản đồ có breadcrumb Giới > Tinh vực > Quốc > Vùng > Địa điểm. Bấm nút cha để thu nhỏ, bấm con để đi sâu. Trạng thái chưa khám phá/đã biết/bị khóa/có thể đến/đang đứng phải khác nhau. Hiển thị thời gian đi, điều kiện thiếu và hoạt động có sẵn trước khi xác nhận.

Màn hình hoạt động hiện chu kỳ, chi phí/lượt, sản lượng kỳ vọng, giờ kết thúc, lý do tạm dừng; sản lượng ngẫu nhiên ghi “ước tính”. Chiến đấu có nhật ký kỹ năng, thanh niệm Boss, hiệu ứng, nút rút lui và bộ chiến thuật. Bảng số lớn hiển thị rút gọn nhưng có giá trị chính xác khi xem chi tiết.

## 14. Kiến trúc dữ liệu và lưu tiến trình

- schema_version=1 cho cấu trúc khởi đầu, content_version=3.0.0 cho nội dung, balance_version=0.1.0 cho bộ số nháp. Không ép cả ba cùng tăng.
- ID nội dung ổn định; tên là trường có thể sửa/dịch. Không tái sử dụng ID đã bỏ; dùng retired=true và replacement_id nếu cần.
- Chỉ số lớn, EXP, tiền và số lượng có thể vượt giới hạn JavaScript được lưu chuỗi số nguyên thập phân trong JSON, dùng số nguyên chính xác ở máy chủ. Không chuyển qua Number để cộng tiền/EXP.
- Tỉ lệ dùng basis point:10.000=100%; hệ số dùng chuỗi thập phân. Thời gian server UTC, lịch ngày Asia/Ho_Chi_Minh. Không dùng giờ máy khách tính thưởng.
- Nhân vật lưu cultivation_id, floor, exp_current_bar, location_id, root_ids, skill_loadout, inventory_instances, currencies, profession_points, quest_flags, pity_counters, active_action, action_queue và revision.
- Active_action lưu id, started_at, last_settled_at, deadline_at, content_version_snapshot, input_reservations và rng_state/cursor ở server. Đổi bộ kỹ năng khi đang đánh chỉ hiệu lực từ trận sau.
- Snapshot nội dung áp dụng cho lượt đã bắt đầu. Sau lượt đó dùng phiên bản mới; không trộn nửa lượt hai phiên bản. Trang bị đã sinh giữ instance và roll; thay template phải có chính sách cập nhật/migration rõ.
- Đóng trình duyệt vẫn tiến triển do server tính. Bản offline HTML chỉ kiểm thử một người, không thể làm sổ cái MMO đáng tin cậy.
- Đồng thời hai thiết bị dùng revision/khóa hoạt động; server từ chối thao tác cũ. RNG và chống nhận thưởng hai lần do server quản lý.

## 15. Kiểm chứng và điều kiện phát hành

Các bảng JSON/CSV là nền dữ liệu, không phải toàn bộ bộ máy game. Chưa thể tuyên bố cân bằng chỉ từ số lượng dòng.

1. Kiểm ID duy nhất, toàn bộ khóa ngoại đúng, cây địa lý không chu trình và mỗi địa điểm có một đường lên giới.
2. Kiểm90 tầng, tổng EXP đúng, tầng10=208% theo làm tròn; không tràn số.
3. Kiểm135 bộ×6 món=810, tổng phân bổ mỗi bộ bằng tổng mục tiêu Trắng.
4. Mô phỏng ba hướng tu tại từng map, ít nhất1.000 trận/cấu hình, ghi thời gian hạ quái, tỉ lệ sống, chi phí thuốc, EXP/giờ và tiền ròng/giờ.
5. So sánh8 giờ chạy liên tục với8 giờ tính vắng mặt bằng cùng seed; kết quả phải giống nếu không có tương tác ngoài.
6. Gửi lại cùng giao dịch nhận thưởng100 lần vẫn chỉ thưởng một lần. Kiểm tranh chấp chợ và tiêu lượt trên hai thiết bị.
7. Pity phải đúng ở lượt ngưỡng, reset đúng sau rơi tự nhiên; xác suất 0,2% là0,002, không phải0,2.
8. Cơ chế cướp buff, hồi sinh, resetCD, miễn tử, cấm hồi máu phải có tham số triển khai và kiểm thử trước khi bật.

Mục tiêu nháp: quái vừa sức hạ trong6–15 giây ở bộ đồ chuẩn; Boss vừa sức60–120 giây; build khắc chế có lợi nhưng không bắt buộc duy nhất một công pháp. Đây là tiêu chí cần mô phỏng, chưa phải kết quả đo.

## 16. Thứ tự thực hiện

A. Duyệt tên, phân cấp và các thay đổi so với nguồn. B. Hoàn tất bảng hiệu ứng/công thức/loot còn thiếu. C. Xây mô phỏng chiến đấu và kinh tế dùng cả45 map. D. Làm bản chơi5 map nhưng nạp toàn bộ danh mục. E. Thử giao dịch/tổ đội rồi mới mở dần các giới. Nội dung bị khóa vẫn có ID từ đầu; không tạo lại ID khi mở.

## 17. Hướng dẫn dùng gói dữ liệu

- `world.json`: cây địa lý và45 địa điểm; không dùng chỉ số `recommended_floor` như điều kiện khóa cứng.
- `cultivation.json`:9 cảnh giới và90 tầng/giá EXP chính xác.
- `combat_entities.json`:135 quái,45 Boss,135 kỹ năng nháp; phần thưởng M1–M9 giữ số hội thoại V2, M10 trở đi là ngoại suy mới, chưa khớp thời gian mục tiêu.
- `equipment.json` và `equipment_810.csv`:135 bộ,810 mẫu trang bị; chỉ số trắng sinh theo quy tắc nêu trên.
- `items_and_recipes.json` và `items_242.csv`:242 vật phẩm ngoài trang bị,873 công thức nháp.
- `arts_and_relics.json`:45 công pháp và15 pháp bảo; mới chuẩn hóa danh mục/CD/hệ số sát thương trực tiếp công pháp. Toàn bộ nội tại và hiệu ứng đặc biệt vẫn xem trích nguồn; chưa có đầy đủ effect graph để chạy game.
- `monsters_135.csv`, `boss_skills_135.csv`:bảng kiểm chi tiết.
- `validation_report.json`:kết quả kiểm cấu trúc thực tế của gói; không phải kết quả mô phỏng cân bằng.
- Phụ lục cuối GDD giữ toàn văn trích xuất nguồn PDF để đối chiếu; xuống dòng ở bảng nguồn có thể khác bản PDF.

## 18. Những phần chưa khóa và cần thiết kế tiếp

Tên quốc/vùng mới, phân bổ giới và tên242 vật phẩm mới là **bản đề xuất nền**, được định danh để duyệt; chưa phải người dùng đã duyệt từng tên. Chỉ số gốc giữ nguồn không đồng nghĩa đã cân bằng. Danh mục còn cần: loot chi tiết cho mỗi quái/Boss, nguồn công thức, kinh tế NPC, chi phí phi thăng/động phủ, cơ chế từng kỹ năng Boss mới, effect graph45 công pháp/15 pháp bảo, nhiệm vụ45 map, bảng tỷ lệ phẩm rèn, tốc độ bế quan, kỳ ngộ, hạt giống, công cụ và các nội dung cộng đồng. Những phần này chưa có đủ dữ liệu thì khóa tính năng tương ứng; không tự điền thành giá trị “chính thức”.

## Phụ lục A. Cây thế giới và toàn bộ45 địa điểm

Tên quốc/vùng/tinh vực bổ sung thuộc thiết kế V3. Tên địa điểm gốc từ PDF được giữ cột riêng.

| ID | Địa điểm V3 | Tên gốc | Vùng | Quốc | Tinh vực | Giới | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| map_001 | Vô Danh Thôn | Vô Danh Thôn | Thất Huyền Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Luyện Khí tầng 1 |
| map_002 | Thanh Ngưu Trấn | Thanh Ngưu Trấn | Thất Huyền Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Luyện Khí tầng 3 |
| map_003 | Thất Huyền Môn | Thất Huyền Môn | Thất Huyền Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Luyện Khí tầng 5 |
| map_004 | Hắc Phong Sơn | Hắc Phong Sơn | Thái Nam Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Luyện Khí tầng 7 |
| map_005 | Thái Nam Cốc | Thái Nam Cốc | Thái Nam Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Luyện Khí tầng 9 |
| map_006 | Hoàng Phong Cốc | Hoàng Phong Cốc | Hoàng Phong Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Trúc Cơ tầng 1 |
| map_007 | Huyết Sắc Cấm Địa | Huyết Sắc Cấm Địa | Hoàng Phong Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Trúc Cơ tầng 3 |
| map_008 | Yểm Nguyệt Tông | Yểm Nguyệt Tông | Hoàng Phong Sơn Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Trúc Cơ tầng 5 |
| map_009 | Vạn Khôi Sơn | Vạn Khôi Sơn | Việt Kinh Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Trúc Cơ tầng 7 |
| map_010 | Việt Kinh Thành | Việt Kinh Thành | Việt Kinh Vực | Việt Quốc | Thiên Nam Tinh Vực | Nhân Giới | Trúc Cơ tầng 9 |
| map_011 | Thiên Tinh Nội Hải | Thiên Tinh Nội Hải | Loạn Tinh Nội Hải | Thiên Tinh Liên Quốc | Loạn Tinh Tinh Vực | Nhân Giới | Kim Đan tầng 1 |
| map_012 | Vạn Yêu Cốc | Vạn Yêu Cốc | Loạn Tinh Nội Hải | Thiên Tinh Liên Quốc | Loạn Tinh Tinh Vực | Nhân Giới | Kim Đan tầng 3 |
| map_013 | Bích Linh Đảo | Bích Linh Đảo | Loạn Tinh Nội Hải | Thiên Tinh Liên Quốc | Loạn Tinh Tinh Vực | Nhân Giới | Kim Đan tầng 5 |
| map_014 | Hư Thiên Điện | Hư Thiên Điện | Phong Bạo Ngoại Hải | Thiên Tinh Liên Quốc | Loạn Tinh Tinh Vực | Nhân Giới | Kim Đan tầng 7 |
| map_015 | Ngoại Hải Phong Bạo | Ngoại Hải Phong Bạo | Phong Bạo Ngoại Hải | Thiên Tinh Liên Quốc | Loạn Tinh Tinh Vực | Nhân Giới | Kim Đan tầng 9 |
| map_016 | Mộ Lan Thảo Nguyên | Mộ Lan Thảo Nguyên | Mộ Lan Biên Vực | Đại Tấn Hoàng Triều | Đại Tấn Tinh Vực | Nhân Giới | Nguyên Anh tầng 1 |
| map_017 | Thiên Lan Thánh Điện | Thiên Lan Thánh Điện | Mộ Lan Biên Vực | Đại Tấn Hoàng Triều | Đại Tấn Tinh Vực | Nhân Giới | Nguyên Anh tầng 3 |
| map_018 | Âm Minh Chi Địa | Âm Minh Chi Địa | Mộ Lan Biên Vực | Đại Tấn Hoàng Triều | Đại Tấn Tinh Vực | Nhân Giới | Nguyên Anh tầng 5 |
| map_019 | Côn Ngô Sơn | Côn Ngô Sơn | Trụy Ma Sơn Vực | Đại Tấn Hoàng Triều | Đại Tấn Tinh Vực | Nhân Giới | Nguyên Anh tầng 7 |
| map_020 | Trụy Ma Cốc | Trụy Ma Cốc | Trụy Ma Sơn Vực | Đại Tấn Hoàng Triều | Đại Tấn Tinh Vực | Nhân Giới | Nguyên Anh tầng 9 |
| map_021 | Chu Tước Tinh - Xích Viêm Hoang Địa | Chu Tước Tinh | Chu Tước Nam Vực | Chu Tước Linh Quốc | Chu Tước Tinh Vực | Linh Giới | Hóa Thần tầng 1 |
| map_022 | Vũ Tiên Môn | Vũ Tiên Môn | Chu Tước Nam Vực | Chu Tước Linh Quốc | Chu Tước Tinh Vực | Linh Giới | Hóa Thần tầng 3 |
| map_023 | Vực Ngoại Chiến Trường | Vực Ngoại Chiến Trường | Chu Tước Nam Vực | Chu Tước Linh Quốc | Chu Tước Tinh Vực | Linh Giới | Hóa Thần tầng 5 |
| map_024 | Yêu Linh Chi Địa | Yêu Linh Chi Địa | Băng Phong Bắc Vực | Chu Tước Linh Quốc | Chu Tước Tinh Vực | Linh Giới | Hóa Thần tầng 7 |
| map_025 | Băng Phong Cốc | Băng Phong Cốc | Băng Phong Bắc Vực | Chu Tước Linh Quốc | Chu Tước Tinh Vực | Linh Giới | Hóa Thần tầng 9 |
| map_026 | Thiên Vận Tông | Thiên Vận Tông | Thiên Vận Đạo Vực | Thiên Vận Cổ Quốc | La Thiên Tinh Vực | Linh Giới | Luyện Hư tầng 1 |
| map_027 | Lôi Tiên Điện | Lôi Tiên Điện | Thiên Vận Đạo Vực | Thiên Vận Cổ Quốc | La Thiên Tinh Vực | Linh Giới | Luyện Hư tầng 3 |
| map_028 | Vẫn Tiên Hoang Nguyên | Vẫn Tiên Hoang Nguyên | Thiên Vận Đạo Vực | Thiên Vận Cổ Quốc | La Thiên Tinh Vực | Linh Giới | Luyện Hư tầng 5 |
| map_029 | Ma Vân Hải | Ma Vân Hải | Táng Tiên Cổ Vực | Thiên Vận Cổ Quốc | La Thiên Tinh Vực | Linh Giới | Luyện Hư tầng 7 |
| map_030 | Táng Tiên Trì | Táng Tiên Trì | Táng Tiên Cổ Vực | Thiên Vận Cổ Quốc | La Thiên Tinh Vực | Linh Giới | Luyện Hư tầng 9 |
| map_031 | Thiên Uyên Thành | Thiên Uyên Thành | Thiên Uyên Biên Vực | Thiên Uyên Liên Quốc | Phong Nguyên Tinh Vực | Linh Giới | Hợp Thể tầng 1 |
| map_032 | Minh Hà Chi Địa | Minh Hà Chi Địa | Thiên Uyên Biên Vực | Thiên Uyên Liên Quốc | Phong Nguyên Tinh Vực | Linh Giới | Hợp Thể tầng 3 |
| map_033 | Man Hoang - Cự Thú Cốc | Man Hoang Thế Giới | Thiên Uyên Biên Vực | Thiên Uyên Liên Quốc | Phong Nguyên Tinh Vực | Linh Giới | Hợp Thể tầng 5 |
| map_034 | Mộc Tộc Lãnh Địa | Mộc Tộc Lãnh Địa | Quảng Hàn Cổ Vực | Thiên Uyên Liên Quốc | Phong Nguyên Tinh Vực | Linh Giới | Hợp Thể tầng 7 |
| map_035 | Quảng Hàn - Nguyệt Ảnh Đài | Quảng Hàn Giới | Quảng Hàn Cổ Vực | Thiên Uyên Liên Quốc | Phong Nguyên Tinh Vực | Linh Giới | Hợp Thể tầng 9 |
| map_036 | Huyết Thiên - Huyết Nguyên | Huyết Thiên Đại Lục | Huyết Thiên Chiến Vực | Huyết Thiên Ma Quốc | Huyết Thiên Tinh Vực | Linh Giới | Đại Thừa tầng 1 |
| map_037 | Ma Nguyên Hải | Ma Nguyên Hải | Huyết Thiên Chiến Vực | Huyết Thiên Ma Quốc | Huyết Thiên Tinh Vực | Linh Giới | Đại Thừa tầng 3 |
| map_038 | Tiểu Cực Cung | Tiểu Cực Cung | Huyết Thiên Chiến Vực | Huyết Thiên Ma Quốc | Huyết Thiên Tinh Vực | Linh Giới | Đại Thừa tầng 5 |
| map_039 | Đăng Tiên Đài | Đăng Tiên Đài | Đăng Tiên Thánh Vực | Huyết Thiên Ma Quốc | Huyết Thiên Tinh Vực | Linh Giới | Đại Thừa tầng 7 |
| map_040 | Phi Thăng Lôi Trì | Phi Thăng Lôi Trì | Đăng Tiên Thánh Vực | Huyết Thiên Ma Quốc | Huyết Thiên Tinh Vực | Linh Giới | Đại Thừa tầng 9 |
| map_041 | Bắc Hàn Tiên Cung | Bắc Hàn Tiên Cung | Bắc Hàn Cung Vực | Bắc Hàn Tiên Quốc | Bắc Hàn Tinh Vực | Tiên Giới | Chân Tiên tầng 1 |
| map_042 | Minh Hàn Tiên Phủ | Minh Hàn Tiên Phủ | Bắc Hàn Cung Vực | Bắc Hàn Tiên Quốc | Bắc Hàn Tinh Vực | Tiên Giới | Chân Tiên tầng 3 |
| map_043 | Man Hoang Tiên Vực - Bạch Trạch Lâm | Man Hoang Tiên Vực | Bắc Hàn Cung Vực | Bắc Hàn Tiên Quốc | Bắc Hàn Tinh Vực | Tiên Giới | Chân Tiên tầng 5 |
| map_044 | Hôi Giới - Tử Khí Cốc | Hôi Giới | Thiên Đình Ngoại Vực | Bắc Hàn Tiên Quốc | Bắc Hàn Tinh Vực | Tiên Giới | Chân Tiên tầng 7 |
| map_045 | Nam Thiên Môn | Nam Thiên Môn | Thiên Đình Ngoại Vực | Bắc Hàn Tiên Quốc | Bắc Hàn Tinh Vực | Tiên Giới | Chân Tiên tầng 9 |

## Phụ lục B. Chỉ số nhân vật vàEXP

Giá trị không viết tắt; EXP và chỉ số lớn lưu dạng chuỗi trong JSON.

| Cảnh giới | HP tầng1 | Công tầng1 | Thủ tầng1 | Tốc đánh | Tổng EXP |
|---|---|---|---|---|---|
| Luyện Khí | 1.000 | 80 | 30 | 1 | 100.000 |
| Trúc Cơ | 12.000 | 650 | 220 | 1.1 | 2.500.000 |
| Kim Đan | 120.000 | 5.500 | 1.800 | 1.25 | 80.000.000 |
| Nguyên Anh | 1.200.000 | 45.000 | 15.000 | 1.4 | 2.500.000.000 |
| Hóa Thần | 10.000.000 | 350.000 | 110.000 | 1.55 | 80.000.000.000 |
| Luyện Hư | 85.000.000 | 2.800.000 | 900.000 | 1.7 | 2.500.000.000.000 |
| Hợp Thể | 700.000.000 | 22.000.000 | 7.500.000 | 1.9 | 80.000.000.000.000 |
| Đại Thừa | 6.000.000.000 | 180.000.000 | 60.000.000 | 2.1 | 2.500.000.000.000.000 |
| Chân Tiên | 50.000.000.000 | 1.500.000.000 | 500.000.000 | 2.5 | 80.000.000.000.000.000 |

| Cảnh giới | Tầng | HP | Công | Thủ | EXP thanh |
|---|---|---|---|---|---|
| Luyện Khí | 1 | 1.000 | 80 | 30 | 1.818 |
| Luyện Khí | 2 | 1.120 | 90 | 34 | 3.636 |
| Luyện Khí | 3 | 1.240 | 99 | 37 | 5.455 |
| Luyện Khí | 4 | 1.360 | 109 | 41 | 7.272 |
| Luyện Khí | 5 | 1.480 | 118 | 44 | 9.091 |
| Luyện Khí | 6 | 1.600 | 128 | 48 | 10.909 |
| Luyện Khí | 7 | 1.720 | 138 | 52 | 12.728 |
| Luyện Khí | 8 | 1.840 | 147 | 55 | 14.545 |
| Luyện Khí | 9 | 1.960 | 157 | 59 | 16.364 |
| Luyện Khí | 10 | 2.080 | 166 | 62 | 18.182 |
| Trúc Cơ | 1 | 12.000 | 650 | 220 | 45.454 |
| Trúc Cơ | 2 | 13.440 | 728 | 246 | 90.909 |
| Trúc Cơ | 3 | 14.880 | 806 | 273 | 136.364 |
| Trúc Cơ | 4 | 16.320 | 884 | 299 | 181.818 |
| Trúc Cơ | 5 | 17.760 | 962 | 326 | 227.273 |
| Trúc Cơ | 6 | 19.200 | 1.040 | 352 | 272.727 |
| Trúc Cơ | 7 | 20.640 | 1.118 | 378 | 318.182 |
| Trúc Cơ | 8 | 22.080 | 1.196 | 405 | 363.636 |
| Trúc Cơ | 9 | 23.520 | 1.274 | 431 | 409.091 |
| Trúc Cơ | 10 | 24.960 | 1.352 | 458 | 454.546 |
| Kim Đan | 1 | 120.000 | 5.500 | 1.800 | 1.454.545 |
| Kim Đan | 2 | 134.400 | 6.160 | 2.016 | 2.909.091 |
| Kim Đan | 3 | 148.800 | 6.820 | 2.232 | 4.363.636 |
| Kim Đan | 4 | 163.200 | 7.480 | 2.448 | 5.818.182 |
| Kim Đan | 5 | 177.600 | 8.140 | 2.664 | 7.272.727 |
| Kim Đan | 6 | 192.000 | 8.800 | 2.880 | 8.727.273 |
| Kim Đan | 7 | 206.400 | 9.460 | 3.096 | 10.181.818 |
| Kim Đan | 8 | 220.800 | 10.120 | 3.312 | 11.636.364 |
| Kim Đan | 9 | 235.200 | 10.780 | 3.528 | 13.090.909 |
| Kim Đan | 10 | 249.600 | 11.440 | 3.744 | 14.545.455 |
| Nguyên Anh | 1 | 1.200.000 | 45.000 | 15.000 | 45.454.545 |
| Nguyên Anh | 2 | 1.344.000 | 50.400 | 16.800 | 90.909.091 |
| Nguyên Anh | 3 | 1.488.000 | 55.800 | 18.600 | 136.363.636 |
| Nguyên Anh | 4 | 1.632.000 | 61.200 | 20.400 | 181.818.182 |
| Nguyên Anh | 5 | 1.776.000 | 66.600 | 22.200 | 227.272.727 |
| Nguyên Anh | 6 | 1.920.000 | 72.000 | 24.000 | 272.727.273 |
| Nguyên Anh | 7 | 2.064.000 | 77.400 | 25.800 | 318.181.818 |
| Nguyên Anh | 8 | 2.208.000 | 82.800 | 27.600 | 363.636.364 |
| Nguyên Anh | 9 | 2.352.000 | 88.200 | 29.400 | 409.090.909 |
| Nguyên Anh | 10 | 2.496.000 | 93.600 | 31.200 | 454.545.455 |
| Hóa Thần | 1 | 10.000.000 | 350.000 | 110.000 | 1.454.545.454 |
| Hóa Thần | 2 | 11.200.000 | 392.000 | 123.200 | 2.909.090.909 |
| Hóa Thần | 3 | 12.400.000 | 434.000 | 136.400 | 4.363.636.364 |
| Hóa Thần | 4 | 13.600.000 | 476.000 | 149.600 | 5.818.181.818 |
| Hóa Thần | 5 | 14.800.000 | 518.000 | 162.800 | 7.272.727.273 |
| Hóa Thần | 6 | 16.000.000 | 560.000 | 176.000 | 8.727.272.727 |
| Hóa Thần | 7 | 17.200.000 | 602.000 | 189.200 | 10.181.818.182 |
| Hóa Thần | 8 | 18.400.000 | 644.000 | 202.400 | 11.636.363.636 |
| Hóa Thần | 9 | 19.600.000 | 686.000 | 215.600 | 13.090.909.091 |
| Hóa Thần | 10 | 20.800.000 | 728.000 | 228.800 | 14.545.454.546 |
| Luyện Hư | 1 | 85.000.000 | 2.800.000 | 900.000 | 45.454.545.454 |
| Luyện Hư | 2 | 95.200.000 | 3.136.000 | 1.008.000 | 90.909.090.909 |
| Luyện Hư | 3 | 105.400.000 | 3.472.000 | 1.116.000 | 136.363.636.364 |
| Luyện Hư | 4 | 115.600.000 | 3.808.000 | 1.224.000 | 181.818.181.818 |
| Luyện Hư | 5 | 125.800.000 | 4.144.000 | 1.332.000 | 227.272.727.273 |
| Luyện Hư | 6 | 136.000.000 | 4.480.000 | 1.440.000 | 272.727.272.727 |
| Luyện Hư | 7 | 146.200.000 | 4.816.000 | 1.548.000 | 318.181.818.182 |
| Luyện Hư | 8 | 156.400.000 | 5.152.000 | 1.656.000 | 363.636.363.636 |
| Luyện Hư | 9 | 166.600.000 | 5.488.000 | 1.764.000 | 409.090.909.091 |
| Luyện Hư | 10 | 176.800.000 | 5.824.000 | 1.872.000 | 454.545.454.546 |
| Hợp Thể | 1 | 700.000.000 | 22.000.000 | 7.500.000 | 1.454.545.454.545 |
| Hợp Thể | 2 | 784.000.000 | 24.640.000 | 8.400.000 | 2.909.090.909.091 |
| Hợp Thể | 3 | 868.000.000 | 27.280.000 | 9.300.000 | 4.363.636.363.636 |
| Hợp Thể | 4 | 952.000.000 | 29.920.000 | 10.200.000 | 5.818.181.818.182 |
| Hợp Thể | 5 | 1.036.000.000 | 32.560.000 | 11.100.000 | 7.272.727.272.727 |
| Hợp Thể | 6 | 1.120.000.000 | 35.200.000 | 12.000.000 | 8.727.272.727.273 |
| Hợp Thể | 7 | 1.204.000.000 | 37.840.000 | 12.900.000 | 10.181.818.181.818 |
| Hợp Thể | 8 | 1.288.000.000 | 40.480.000 | 13.800.000 | 11.636.363.636.364 |
| Hợp Thể | 9 | 1.372.000.000 | 43.120.000 | 14.700.000 | 13.090.909.090.909 |
| Hợp Thể | 10 | 1.456.000.000 | 45.760.000 | 15.600.000 | 14.545.454.545.455 |
| Đại Thừa | 1 | 6.000.000.000 | 180.000.000 | 60.000.000 | 45.454.545.454.545 |
| Đại Thừa | 2 | 6.720.000.000 | 201.600.000 | 67.200.000 | 90.909.090.909.091 |
| Đại Thừa | 3 | 7.440.000.000 | 223.200.000 | 74.400.000 | 136.363.636.363.636 |
| Đại Thừa | 4 | 8.160.000.000 | 244.800.000 | 81.600.000 | 181.818.181.818.182 |
| Đại Thừa | 5 | 8.880.000.000 | 266.400.000 | 88.800.000 | 227.272.727.272.727 |
| Đại Thừa | 6 | 9.600.000.000 | 288.000.000 | 96.000.000 | 272.727.272.727.273 |
| Đại Thừa | 7 | 10.320.000.000 | 309.600.000 | 103.200.000 | 318.181.818.181.818 |
| Đại Thừa | 8 | 11.040.000.000 | 331.200.000 | 110.400.000 | 363.636.363.636.364 |
| Đại Thừa | 9 | 11.760.000.000 | 352.800.000 | 117.600.000 | 409.090.909.090.909 |
| Đại Thừa | 10 | 12.480.000.000 | 374.400.000 | 124.800.000 | 454.545.454.545.455 |
| Chân Tiên | 1 | 50.000.000.000 | 1.500.000.000 | 500.000.000 | 1.454.545.454.545.454 |
| Chân Tiên | 2 | 56.000.000.000 | 1.680.000.000 | 560.000.000 | 2.909.090.909.090.909 |
| Chân Tiên | 3 | 62.000.000.000 | 1.860.000.000 | 620.000.000 | 4.363.636.363.636.364 |
| Chân Tiên | 4 | 68.000.000.000 | 2.040.000.000 | 680.000.000 | 5.818.181.818.181.818 |
| Chân Tiên | 5 | 74.000.000.000 | 2.220.000.000 | 740.000.000 | 7.272.727.272.727.273 |
| Chân Tiên | 6 | 80.000.000.000 | 2.400.000.000 | 800.000.000 | 8.727.272.727.272.727 |
| Chân Tiên | 7 | 86.000.000.000 | 2.580.000.000 | 860.000.000 | 10.181.818.181.818.182 |
| Chân Tiên | 8 | 92.000.000.000 | 2.760.000.000 | 920.000.000 | 11.636.363.636.363.636 |
| Chân Tiên | 9 | 98.000.000.000 | 2.940.000.000 | 980.000.000 | 13.090.909.090.909.091 |
| Chân Tiên | 10 | 104.000.000.000 | 3.120.000.000 | 1.040.000.000 | 14.545.454.545.454.546 |

## Phụ lục C.135 quái thường

Q1 giữ chỉ số nguồn. Q2/Q3 sinh theo tỉ trọng V2, làm tròn half-up. Tên trùng vẫn là ID riêng theo map. Số thưởng ngoại suy là nháp, không dùng làm cam kết thời gian lên cấp.

| ID | Tên | Map | HP | Công | Thủ | EXP | Linh thạch |
|---|---|---|---|---|---|---|---|
| monster_001_1 | Dã Trư | map_001 | 500 | 45 | 15 | 5 | 2 |
| monster_001_2 | Thảo Mãng | map_001 | 375 | 65 | 10 | 5 | 2 |
| monster_001_3 | Sơn Tặc | map_001 | 750 | 34 | 21 | 5 | 2 |
| monster_002_1 | Thanh Lang | map_002 | 850 | 75 | 25 | 8 | 4 |
| monster_002_2 | Hắc Hùng | map_002 | 638 | 109 | 16 | 8 | 4 |
| monster_002_3 | Đạo Phỉ | map_002 | 1.275 | 56 | 35 | 8 | 4 |
| monster_003_1 | Phản Đồ | map_003 | 1.450 | 125 | 45 | 14 | 7 |
| monster_003_2 | Thiết Thi | map_003 | 1.088 | 181 | 29 | 14 | 7 |
| monster_003_3 | Độc Chu | map_003 | 2.175 | 94 | 63 | 14 | 7 |
| monster_004_1 | Sơn Tinh | map_004 | 2.500 | 210 | 75 | 22 | 12 |
| monster_004_2 | Ác Điểu | map_004 | 1.875 | 305 | 49 | 22 | 12 |
| monster_004_3 | Cuồng Đồ | map_004 | 3.750 | 158 | 105 | 22 | 12 |
| monster_005_1 | Tán Tu Ác Bá | map_005 | 4.200 | 350 | 130 | 35 | 20 |
| monster_005_2 | Yêu Hồ | map_005 | 3.150 | 508 | 85 | 35 | 20 |
| monster_005_3 | Huyết Bức | map_005 | 6.300 | 263 | 182 | 35 | 20 |
| monster_006_1 | Hộ Sơn Thú | map_006 | 9.000 | 680 | 250 | 80 | 45 |
| monster_006_2 | Mộc Khôi Lỗi | map_006 | 6.750 | 986 | 163 | 80 | 45 |
| monster_006_3 | Kiếm Tu | map_006 | 13.500 | 510 | 350 | 80 | 45 |
| monster_007_1 | Huyết Nha | map_007 | 15.500 | 1.150 | 420 | 130 | 75 |
| monster_007_2 | Thực Nhân Hoa | map_007 | 11.625 | 1.668 | 273 | 130 | 75 |
| monster_007_3 | Độc Mãng | map_007 | 23.250 | 863 | 588 | 130 | 75 |
| monster_008_1 | Huyễn Âm Nữ | map_008 | 26.500 | 1.950 | 720 | 210 | 120 |
| monster_008_2 | Song Đầu Xà | map_008 | 19.875 | 2.828 | 468 | 210 | 120 |
| monster_008_3 | Ám Thú | map_008 | 39.750 | 1.463 | 1.008 | 210 | 120 |
| monster_009_1 | Thiết Khôi Lỗi | map_009 | 45.000 | 3.300 | 1.250 | 350 | 200 |
| monster_009_2 | Cơ Quan Thú | map_009 | 33.750 | 4.785 | 813 | 350 | 200 |
| monster_009_3 | Âm Thi | map_009 | 67.500 | 2.475 | 1.750 | 350 | 200 |
| monster_010_1 | Hắc Sát Vệ | map_010 | 78.000 | 5.600 | 2.100 | 560 | 320 |
| monster_010_2 | Huyết Thị | map_010 | 58.500 | 8.120 | 1.365 | 560 | 320 |
| monster_010_3 | Tà Trưởng Lão | map_010 | 117.000 | 4.200 | 2.940 | 560 | 320 |
| monster_011_1 | Băng Hải Quy | map_011 | 150.000 | 9.500 | 3.500 | 924 | 496 |
| monster_011_2 | Lôi Ngư | map_011 | 112.500 | 13.775 | 2.275 | 924 | 496 |
| monster_011_3 | Hải Tộc | map_011 | 225.000 | 7.125 | 4.900 | 924 | 496 |
| monster_012_1 | Phong Nhận Điêu | map_012 | 255.000 | 16.000 | 6.000 | 1.525 | 769 |
| monster_012_2 | Kim Giáp Hạt | map_012 | 191.250 | 23.200 | 3.900 | 1.525 | 769 |
| monster_012_3 | Ngưu Yêu | map_012 | 382.500 | 12.000 | 8.400 | 1.525 | 769 |
| monster_013_1 | Độc Long Giao | map_013 | 435.000 | 27.500 | 10.200 | 2.516 | 1.192 |
| monster_013_2 | Huyết Đằng | map_013 | 326.250 | 39.875 | 6.630 | 2.516 | 1.192 |
| monster_013_3 | Khoáng Nô | map_013 | 652.500 | 20.625 | 14.280 | 2.516 | 1.192 |
| monster_014_1 | Băng Khôi Lỗi | map_014 | 740.000 | 46.500 | 17.500 | 4.151 | 1.847 |
| monster_014_2 | Hỏa Điểu | map_014 | 555.000 | 67.425 | 11.375 | 4.151 | 1.847 |
| monster_014_3 | Hư Thiên Vệ | map_014 | 1.110.000 | 34.875 | 24.500 | 4.151 | 1.847 |
| monster_015_1 | Hải Xà Vương | map_015 | 1.250.000 | 79.000 | 30.000 | 6.849 | 2.863 |
| monster_015_2 | Phong Tinh | map_015 | 937.500 | 114.550 | 19.500 | 6.849 | 2.863 |
| monster_015_3 | Cự Quái | map_015 | 1.875.000 | 59.250 | 42.000 | 6.849 | 2.863 |
| monster_016_1 | Mộ Lan Pháp Sư | map_016 | 2.400.000 | 140.000 | 52.000 | 11.300 | 4.438 |
| monster_016_2 | Lang Kỵ | map_016 | 1.800.000 | 203.000 | 33.800 | 11.300 | 4.438 |
| monster_016_3 | Vu Tộc | map_016 | 3.600.000 | 105.000 | 72.800 | 11.300 | 4.438 |
| monster_017_1 | Thánh Điện Vệ | map_017 | 4.100.000 | 240.000 | 88.000 | 18.646 | 6.878 |
| monster_017_2 | Linh Mộc Nhân | map_017 | 3.075.000 | 348.000 | 57.200 | 18.646 | 6.878 |
| monster_017_3 | Quang Thú | map_017 | 6.150.000 | 180.000 | 123.200 | 18.646 | 6.878 |
| monster_018_1 | Âm Hồn Thú | map_018 | 7.000.000 | 410.000 | 150.000 | 30.765 | 10.661 |
| monster_018_2 | La Sát Quỷ | map_018 | 5.250.000 | 594.500 | 97.500 | 30.765 | 10.661 |
| monster_018_3 | Bạch Cốt Tinh | map_018 | 10.500.000 | 307.500 | 210.000 | 30.765 | 10.661 |
| monster_019_1 | Ngân Sí Dạ Xoa | map_019 | 12.000.000 | 700.000 | 255.000 | 50.763 | 16.525 |
| monster_019_2 | Luyện Thi | map_019 | 9.000.000 | 1.015.000 | 165.750 | 50.763 | 16.525 |
| monster_019_3 | Kim Từ Mộc | map_019 | 18.000.000 | 525.000 | 357.000 | 50.763 | 16.525 |
| monster_020_1 | Hắc Ám Ma Tu | map_020 | 20.500.000 | 1.200.000 | 435.000 | 83.758 | 25.613 |
| monster_020_2 | Không Gian Bạo | map_020 | 15.375.000 | 1.740.000 | 282.750 | 83.758 | 25.613 |
| monster_020_3 | Ma Yêu | map_020 | 30.750.000 | 900.000 | 609.000 | 83.758 | 25.613 |
| monster_021_1 | Chu Tước Vệ | map_021 | 40.000.000 | 2.200.000 | 800.000 | 138.201 | 39.701 |
| monster_021_2 | Hỏa Linh Thú | map_021 | 30.000.000 | 3.190.000 | 520.000 | 138.201 | 39.701 |
| monster_021_3 | Viêm Ma | map_021 | 60.000.000 | 1.650.000 | 1.120.000 | 138.201 | 39.701 |
| monster_022_1 | Tiên Di Tộc | map_022 | 68.000.000 | 3.700.000 | 1.350.000 | 228.032 | 61.536 |
| monster_022_2 | Phù Văn Khôi | map_022 | 51.000.000 | 5.365.000 | 877.500 | 228.032 | 61.536 |
| monster_022_3 | Kiếm Hồn | map_022 | 102.000.000 | 2.775.000 | 1.890.000 | 228.032 | 61.536 |
| monster_023_1 | Tinh Không Thú | map_023 | 115.000.000 | 6.300.000 | 2.300.000 | 376.252 | 95.381 |
| monster_023_2 | Hư Không Dạ Xoa | map_023 | 86.250.000 | 9.135.000 | 1.495.000 | 376.252 | 95.381 |
| monster_023_3 | Trùng Ma | map_023 | 172.500.000 | 4.725.000 | 3.220.000 | 376.252 | 95.381 |
| monster_024_1 | Cổ Yêu Tướng | map_024 | 195.000.000 | 10.700.000 | 3.900.000 | 620.816 | 147.841 |
| monster_024_2 | Huyết Mạch Yêu | map_024 | 146.250.000 | 15.515.000 | 2.535.000 | 620.816 | 147.841 |
| monster_024_3 | Đằng Xà | map_024 | 292.500.000 | 8.025.000 | 5.460.000 | 620.816 | 147.841 |
| monster_025_1 | Tuyết Vực Nhân | map_025 | 330.000.000 | 18.200.000 | 6.600.000 | 1.024.347 | 229.153 |
| monster_025_2 | Hàn Băng Giao | map_025 | 247.500.000 | 26.390.000 | 4.290.000 | 1.024.347 | 229.153 |
| monster_025_3 | Tuyết Điêu | map_025 | 495.000.000 | 13.650.000 | 9.240.000 | 1.024.347 | 229.153 |
| monster_026_1 | Thiên Vận Đệ Tử | map_026 | 650.000.000 | 35.000.000 | 12.500.000 | 1.690.173 | 355.187 |
| monster_026_2 | Mệnh Khôi | map_026 | 487.500.000 | 50.750.000 | 8.125.000 | 1.690.173 | 355.187 |
| monster_026_3 | Tinh Thú | map_026 | 975.000.000 | 26.250.000 | 17.500.000 | 1.690.173 | 355.187 |
| monster_027_1 | Lôi Chiến Hồn | map_027 | 1.100.000.000 | 60.000.000 | 21.200.000 | 2.788.785 | 550.540 |
| monster_027_2 | Tử Lôi Thú | map_027 | 825.000.000 | 87.000.000 | 13.780.000 | 2.788.785 | 550.540 |
| monster_027_3 | Điện Nhân | map_027 | 1.650.000.000 | 45.000.000 | 29.680.000 | 2.788.785 | 550.540 |
| monster_028_1 | Hoang Cổ Khôi | map_028 | 1.850.000.000 | 102.000.000 | 36.000.000 | 4.601.496 | 853.337 |
| monster_028_2 | Tâm Ma Ảnh | map_028 | 1.387.500.000 | 147.900.000 | 23.400.000 | 4.601.496 | 853.337 |
| monster_028_3 | Oán Linh | map_028 | 2.775.000.000 | 76.500.000 | 50.400.000 | 4.601.496 | 853.337 |
| monster_029_1 | Ma Hải Giao | map_029 | 3.150.000.000 | 173.000.000 | 61.000.000 | 7.592.468 | 1.322.672 |
| monster_029_2 | Hắc Thủy Xà | map_029 | 2.362.500.000 | 250.850.000 | 39.650.000 | 7.592.468 | 1.322.672 |
| monster_029_3 | Ma Linh | map_029 | 4.725.000.000 | 129.750.000 | 85.400.000 | 7.592.468 | 1.322.672 |
| monster_030_1 | Cổ Tiên Thi | map_030 | 5.350.000.000 | 295.000.000 | 104.000.000 | 12.527.572 | 2.050.142 |
| monster_030_2 | Tiên Huyết Thảo | map_030 | 4.012.500.000 | 427.750.000 | 67.600.000 | 12.527.572 | 2.050.142 |
| monster_030_3 | Phệ Trùng | map_030 | 8.025.000.000 | 221.250.000 | 145.600.000 | 12.527.572 | 2.050.142 |
| monster_031_1 | Dị Tộc Thám Tử | map_031 | 10.500.000.000 | 560.000.000 | 200.000.000 | 20.670.494 | 3.177.720 |
| monster_031_2 | Giác Si Tộc | map_031 | 7.875.000.000 | 812.000.000 | 130.000.000 | 20.670.494 | 3.177.720 |
| monster_031_3 | Phản Đồ | map_031 | 15.750.000.000 | 420.000.000 | 280.000.000 | 20.670.494 | 3.177.720 |
| monster_032_1 | Minh Hà Quỷ | map_032 | 17.800.000.000 | 950.000.000 | 340.000.000 | 34.106.315 | 4.925.466 |
| monster_032_2 | Âm Phong Thú | map_032 | 13.350.000.000 | 1.377.500.000 | 221.000.000 | 34.106.315 | 4.925.466 |
| monster_032_3 | Hoàng Tuyền Xà | map_032 | 26.700.000.000 | 712.500.000 | 476.000.000 | 34.106.315 | 4.925.466 |
| monster_033_1 | Man Hoang Cự Thú | map_033 | 30.200.000.000 | 1.600.000.000 | 580.000.000 | 56.275.420 | 7.634.473 |
| monster_033_2 | Kim Mao Hầu | map_033 | 22.650.000.000 | 2.320.000.000 | 377.000.000 | 56.275.420 | 7.634.473 |
| monster_033_3 | Diễm Chu | map_033 | 45.300.000.000 | 1.200.000.000 | 812.000.000 | 56.275.420 | 7.634.473 |
| monster_034_1 | Thụ Nhân | map_034 | 51.500.000.000 | 2.750.000.000 | 980.000.000 | 92.854.443 | 11.833.432 |
| monster_034_2 | Đằng Giáp Binh | map_034 | 38.625.000.000 | 3.987.500.000 | 637.000.000 | 92.854.443 | 11.833.432 |
| monster_034_3 | Thanh Mộc Linh | map_034 | 77.250.000.000 | 2.062.500.000 | 1.372.000.000 | 92.854.443 | 11.833.432 |
| monster_035_1 | Quảng Hàn Vệ | map_035 | 87.500.000.000 | 4.680.000.000 | 1.660.000.000 | 153.209.831 | 18.341.820 |
| monster_035_2 | Tinh Khôi | map_035 | 65.625.000.000 | 6.786.000.000 | 1.079.000.000 | 153.209.831 | 18.341.820 |
| monster_035_3 | Nguyệt Thố | map_035 | 131.250.000.000 | 3.510.000.000 | 2.324.000.000 | 153.209.831 | 18.341.820 |
| monster_036_1 | Hoàng Tộc Ma | map_036 | 170.000.000.000 | 9.000.000.000 | 3.200.000.000 | 252.796.220 | 28.429.821 |
| monster_036_2 | Huyết Thú | map_036 | 127.500.000.000 | 13.050.000.000 | 2.080.000.000 | 252.796.220 | 28.429.821 |
| monster_036_3 | Thiên Ngoại Ma | map_036 | 255.000.000.000 | 6.750.000.000 | 4.480.000.000 | 252.796.220 | 28.429.821 |
| monster_037_1 | Ma Long | map_037 | 290.000.000.000 | 15.300.000.000 | 5.400.000.000 | 417.113.764 | 44.066.223 |
| monster_037_2 | Hắc Ám Tinh Linh | map_037 | 217.500.000.000 | 22.185.000.000 | 3.510.000.000 | 417.113.764 | 44.066.223 |
| monster_037_3 | Thực Nhật Thú | map_037 | 435.000.000.000 | 11.475.000.000 | 7.560.000.000 | 417.113.764 | 44.066.223 |
| monster_038_1 | Cửu Vĩ Tuyết Hồ | map_038 | 490.000.000.000 | 26.000.000.000 | 9.200.000.000 | 688.237.710 | 68.302.646 |
| monster_038_2 | Băng Phượng | map_038 | 367.500.000.000 | 37.700.000.000 | 5.980.000.000 | 688.237.710 | 68.302.646 |
| monster_038_3 | Hàn Vệ | map_038 | 735.000.000.000 | 19.500.000.000 | 12.880.000.000 | 688.237.710 | 68.302.646 |
| monster_039_1 | Bán Tiên Khôi | map_039 | 835.000.000.000 | 44.200.000.000 | 15.600.000.000 | 1.135.592.222 | 105.869.101 |
| monster_039_2 | Hộ Đạo Nhân | map_039 | 626.250.000.000 | 64.090.000.000 | 10.140.000.000 | 1.135.592.222 | 105.869.101 |
| monster_039_3 | Thiên Binh | map_039 | 1.252.500.000.000 | 33.150.000.000 | 21.840.000.000 | 1.135.592.222 | 105.869.101 |
| monster_040_1 | Cửu Thiên Lôi Linh | map_040 | 1.420.000.000.000 | 75.000.000.000 | 26.500.000.000 | 1.873.727.166 | 164.097.107 |
| monster_040_2 | Kiếp Lôi Thú | map_040 | 1.065.000.000.000 | 108.750.000.000 | 17.225.000.000 | 1.873.727.166 | 164.097.107 |
| monster_040_3 | Lôi Ảnh | map_040 | 2.130.000.000.000 | 56.250.000.000 | 37.100.000.000 | 1.873.727.166 | 164.097.107 |
| monster_041_1 | Tiên Cung Cảnh | map_041 | 2.800.000.000.000 | 145.000.000.000 | 50.000.000.000 | 3.091.649.824 | 254.350.515 |
| monster_041_2 | Hàn Tiên Hạc | map_041 | 2.100.000.000.000 | 210.250.000.000 | 32.500.000.000 | 3.091.649.824 | 254.350.515 |
| monster_041_3 | Tiên Khôi | map_041 | 4.200.000.000.000 | 108.750.000.000 | 70.000.000.000 | 3.091.649.824 | 254.350.515 |
| monster_042_1 | Huyền Tiên Ác Thi | map_042 | 4.750.000.000.000 | 246.000.000.000 | 85.000.000.000 | 5.101.222.210 | 394.243.299 |
| monster_042_2 | Oán Linh | map_042 | 3.562.500.000.000 | 356.700.000.000 | 55.250.000.000 | 5.101.222.210 | 394.243.299 |
| monster_042_3 | Pháp Thú | map_042 | 7.125.000.000.000 | 184.500.000.000 | 119.000.000.000 | 5.101.222.210 | 394.243.299 |
| monster_043_1 | Chân Linh Hậu Duệ | map_043 | 8.100.000.000.000 | 420.000.000.000 | 145.000.000.000 | 8.417.016.646 | 611.077.113 |
| monster_043_2 | Bạch Trạch | map_043 | 6.075.000.000.000 | 609.000.000.000 | 94.250.000.000 | 8.417.016.646 | 611.077.113 |
| monster_043_3 | Kỳ Lân | map_043 | 12.150.000.000.000 | 315.000.000.000 | 203.000.000.000 | 8.417.016.646 | 611.077.113 |
| monster_044_1 | Hôi Tiên Chiến Sĩ | map_044 | 13.800.000.000.000 | 715.000.000.000 | 246.000.000.000 | 13.888.077.466 | 947.169.525 |
| monster_044_2 | Phệ Tiên Ma | map_044 | 10.350.000.000.000 | 1.036.750.000.000 | 159.900.000.000 | 13.888.077.466 | 947.169.525 |
| monster_044_3 | Tử Khí | map_044 | 20.700.000.000.000 | 536.250.000.000 | 344.400.000.000 | 13.888.077.466 | 947.169.525 |
| monster_045_1 | Kim Giáp Vệ | map_045 | 23.500.000.000.000 | 1.220.000.000.000 | 420.000.000.000 | 22.915.327.819 | 1.468.112.763 |
| monster_045_2 | Trảm Tiên Tướng | map_045 | 17.625.000.000.000 | 1.769.000.000.000 | 273.000.000.000 | 22.915.327.819 | 1.468.112.763 |
| monster_045_3 | Thần Thú | map_045 | 35.250.000.000.000 | 915.000.000.000 | 588.000.000.000 | 22.915.327.819 | 1.468.112.763 |

## Phụ lục D.45 Boss và135 ô kỹ năng

HP/Công/Thủ giữ từ PDF, không suy Boss bằng một hệ số chung vì nguồn có làm tròn riêng. Ba kỹ năng có tham số mẫu; các mechanic đặc biệt phải bổ sung tham số trước khi chạy.

| ID | Tên | Map | HP | Công | Thủ | Đặc trưng |
|---|---|---|---|---|---|---|
| boss_001 | Hắc Phong Trại Chủ | map_001 | 6.000 | 220 | 60 | Bổ Củi |
| boss_002 | Bách Độc Ngô Công | map_002 | 10.200 | 360 | 100 | Phun Độc |
| boss_003 | Mặc Gia Cự Nhân | map_003 | 17.500 | 600 | 180 | Địa Chấn |
| boss_004 | Xích Diễm Hổ Vương | map_004 | 30.000 | 1.000 | 300 | Hỏa Trảo |
| boss_005 | Thanh Nhan Lão Tổ | map_005 | 50.000 | 1.700 | 520 | Hút Huyết |
| boss_006 | Mặc Giao Nhân | map_006 | 110.000 | 3.200 | 1.000 | Độc Vụ |
| boss_007 | Huyết Sắc Yêu Vương | map_007 | 185.000 | 5.500 | 1.700 | Huyết Hải |
| boss_008 | Cực Âm Đạo Nhân | map_008 | 320.000 | 9.200 | 2.900 | Hàn Âm Chưởng |
| boss_009 | Thiên Cơ Khôi Lỗi Vương | map_009 | 540.000 | 15.800 | 5.000 | Cơ Quan Pháo |
| boss_010 | Việt Quốc Hắc Hoàng Đế | map_010 | 930.000 | 27.000 | 8.400 | Hoàng Quyền |
| boss_011 | Phúc Hải Yêu Giao | map_011 | 1.800.000 | 45.000 | 14.000 | Cuồng Lôi |
| boss_012 | Kim Giao Vương | map_012 | 3.100.000 | 76.000 | 24.000 | Kim Lân Giáp |
| boss_013 | Lục Đạo Phân Thân | map_013 | 5.200.000 | 130.000 | 41.000 | Lục Đạo Luân Hồi |
| boss_014 | Hư Thiên Băng Hoàng | map_014 | 8.900.000 | 220.000 | 70.000 | Tuyệt Đối Đóng Băng |
| boss_015 | Thâm Hải Cự Chương | map_015 | 15.000.000 | 380.000 | 120.000 | Xúc Tu Quấn Quanh |
| boss_016 | Mộ Lan Thần Sư | map_016 | 28.800.000 | 670.000 | 210.000 | Vu Chú |
| boss_017 | Thiên Lan Thánh Thú | map_017 | 49.200.000 | 1.150.000 | 350.000 | Thánh Quang |
| boss_018 | Quỷ Vương Âm Minh | map_018 | 84.000.000 | 1.950.000 | 600.000 | Phệ Hồn |
| boss_019 | Ngân Sí Thi Vương | map_019 | 144.000.000 | 3.350.000 | 1.020.000 | Thi Độc Bạo |
| boss_020 | Cổ Ma Chân Thân | map_020 | 246.000.000 | 5.750.000 | 1.750.000 | Ma Âm Quán Nhĩ |
| boss_021 | Chu Tước Tử | map_021 | 480.000.000 | 10.500.000 | 3.200.000 | Chu Tước Viêm |
| boss_022 | Vũ Tiên Tàn Hồn | map_022 | 816.000.000 | 17.800.000 | 5.400.000 | Phá Giáp Kiếm |
| boss_023 | Hư Không Phệ Hồn Thú | map_023 | 1.380.000.000 | 30.200.000 | 9.200.000 | Không Gian Trảm |
| boss_024 | Cổ Yêu Đại Thánh | map_024 | 2.340.000.000 | 51.500.000 | 15.600.000 | Cuồng Hóa |
| boss_025 | Băng Phách Hàn Nữ | map_025 | 3.960.000.000 | 87.500.000 | 26.500.000 | Vĩnh Hằng Băng |
| boss_026 | Thiên Vận Lão Tổ | map_026 | 7.800.000.000 | 168.000.000 | 50.000.000 | Đoạt Vận |
| boss_027 | Lôi Tiên Tàn Niệm | map_027 | 13.200.000.000 | 288.000.000 | 85.000.000 | Cửu Thiên Lôi |
| boss_028 | Thượng Cổ Ma Quân | map_028 | 22.200.000.000 | 490.000.000 | 144.000.000 | Tâm Ma Dẫn |
| boss_029 | Ma Hải Chi Chủ | map_029 | 37.800.000.000 | 830.000.000 | 245.000.000 | Hắc Thủy Thực |
| boss_030 | Táng Tiên Thi Hoàng | map_030 | 64.200.000.000 | 1.420.000.000 | 416.000.000 | Bất Tử Thi |
| boss_031 | Dị Tộc Đại Tướng | map_031 | 126.000.000.000 | 2.700.000.000 | 800.000.000 | Trảm Linh Đao |
| boss_032 | Minh Hà Lão Tổ | map_032 | 213.000.000.000 | 4.560.000.000 | 1.360.000.000 | Minh Hà Thủy |
| boss_033 | Man Hoang Thú Vương | map_033 | 362.000.000.000 | 7.750.000.000 | 2.320.000.000 | Thú Vương Hống |
| boss_034 | Mộc Tộc Thánh Tổ | map_034 | 618.000.000.000 | 13.200.000.000 | 3.920.000.000 | Vạn Mộc Hồi Xuân |
| boss_035 | Bắc Minh Côn Bằng | map_035 | 1.050.000.000.000 | 22.500.000.000 | 6.650.000.000 | Thôn Thiên |
| boss_036 | Huyết Quang Ma Tổ | map_036 | 2.040.000.000.000 | 43.200.000.000 | 12.800.000.000 | Huyết Thần Trảm |
| boss_037 | Ma Nguyên Chân Tổ | map_037 | 3.480.000.000.000 | 73.500.000.000 | 21.600.000.000 | Hắc Ám Thôn Phệ |
| boss_038 | Băng Phượng Chi Linh | map_038 | 5.880.000.000.000 | 125.000.000.000 | 36.800.000.000 | Tuyệt Đối Độ Không |
| boss_039 | Bán Tiên Lão Quái | map_039 | 10.020.000.000.000 | 212.000.000.000 | 62.500.000.000 | Tiên Phàm Cách |
| boss_040 | Cửu Thiên Lôi Đế | map_040 | 17.040.000.000.000 | 360.000.000.000 | 106.000.000.000 | Thiên Kiếp Phạt |
| boss_041 | Bắc Hàn Tiên Quân | map_041 | 33.600.000.000.000 | 700.000.000.000 | 200.000.000.000 | Tiên Quân Uy |
| boss_042 | Minh Hàn Đạo Tổ | map_042 | 57.000.000.000.000 | 1.180.000.000.000 | 340.000.000.000 | Trảm Tam Thi |
| boss_043 | Chân Linh Bạch Trạch | map_043 | 97.200.000.000.000 | 2.010.000.000.000 | 580.000.000.000 | Thấu Thị |
| boss_044 | Hôi Giới Chi Chủ | map_044 | 165.600.000.000.000 | 3.430.000.000.000 | 985.000.000.000 | Tử Khí Thực |
| boss_045 | Thiên Đình Giám Sát Sứ | map_045 | 282.000.000.000.000 | 5.850.000.000.000 | 1.680.000.000.000 | Pháp Tắc Xóa Sổ |

| ID kỹ năng | Tên | Cơ chế | CD giây | Niệm giây | Nguồn |
|---|---|---|---|---|---|
| bskill_001_1 | Bổ Củi | BLEED | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_001_2 | Hắc Phong Trại Chủ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_001_3 | Hắc Phong Trại Chủ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_002_1 | Phun Độc | POISON | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_002_2 | Bách Độc Ngô Công: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_002_3 | Bách Độc Ngô Công: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_003_1 | Địa Chấn | STUN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_003_2 | Mặc Gia Cự Nhân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_003_3 | Mặc Gia Cự Nhân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_004_1 | Hỏa Trảo | BURN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_004_2 | Xích Diễm Hổ Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_004_3 | Xích Diễm Hổ Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_005_1 | Hút Huyết | LIFESTEAL | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_005_2 | Thanh Nhan Lão Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_005_3 | Thanh Nhan Lão Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_006_1 | Độc Vụ | POISON | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_006_2 | Mặc Giao Nhân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_006_3 | Mặc Giao Nhân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_007_1 | Huyết Hải | BLEED | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_007_2 | Huyết Sắc Yêu Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_007_3 | Huyết Sắc Yêu Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_008_1 | Hàn Âm Chưởng | FREEZE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_008_2 | Cực Âm Đạo Nhân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_008_3 | Cực Âm Đạo Nhân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_009_1 | Cơ Quan Pháo | ARMOR_BREAK | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_009_2 | Thiên Cơ Khôi Lỗi Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_009_3 | Thiên Cơ Khôi Lỗi Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_010_1 | Hoàng Quyền | SILENCE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_010_2 | Việt Quốc Hắc Hoàng Đế: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_010_3 | Việt Quốc Hắc Hoàng Đế: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_011_1 | Cuồng Lôi | STUN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_011_2 | Phúc Hải Yêu Giao: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_011_3 | Phúc Hải Yêu Giao: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_012_1 | Kim Lân Giáp | REFLECT | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_012_2 | Kim Giao Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_012_3 | Kim Giao Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_013_1 | Lục Đạo Luân Hồi | PENETRATION | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_013_2 | Lục Đạo Phân Thân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_013_3 | Lục Đạo Phân Thân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_014_1 | Tuyệt Đối Đóng Băng | FREEZE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_014_2 | Hư Thiên Băng Hoàng: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_014_3 | Hư Thiên Băng Hoàng: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_015_1 | Xúc Tu Quấn Quanh | STUN_POISON | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_015_2 | Thâm Hải Cự Chương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_015_3 | Thâm Hải Cự Chương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_016_1 | Vu Chú | SILENCE_BURN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_016_2 | Mộ Lan Thần Sư: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_016_3 | Mộ Lan Thần Sư: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_017_1 | Thánh Quang | SHIELD | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_017_2 | Thiên Lan Thánh Thú: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_017_3 | Thiên Lan Thánh Thú: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_018_1 | Phệ Hồn | LIFESTEAL | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_018_2 | Quỷ Vương Âm Minh: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_018_3 | Quỷ Vương Âm Minh: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_019_1 | Thi Độc Bạo | POISON | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_019_2 | Ngân Sí Thi Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_019_3 | Ngân Sí Thi Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_020_1 | Ma Âm Quán Nhĩ | SILENCE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_020_2 | Cổ Ma Chân Thân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_020_3 | Cổ Ma Chân Thân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_021_1 | Chu Tước Viêm | BURN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_021_2 | Chu Tước Tử: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_021_3 | Chu Tước Tử: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_022_1 | Phá Giáp Kiếm | ARMOR_BREAK | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_022_2 | Vũ Tiên Tàn Hồn: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_022_3 | Vũ Tiên Tàn Hồn: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_023_1 | Không Gian Trảm | TRUE_DAMAGE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_023_2 | Hư Không Phệ Hồn Thú: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_023_3 | Hư Không Phệ Hồn Thú: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_024_1 | Cuồng Hóa | HASTE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_024_2 | Cổ Yêu Đại Thánh: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_024_3 | Cổ Yêu Đại Thánh: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_025_1 | Vĩnh Hằng Băng | FREEZE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_025_2 | Băng Phách Hàn Nữ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_025_3 | Băng Phách Hàn Nữ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_026_1 | Đoạt Vận | STEAL_BUFF | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_026_2 | Thiên Vận Lão Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_026_3 | Thiên Vận Lão Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_027_1 | Cửu Thiên Lôi | STUN_BURN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_027_2 | Lôi Tiên Tàn Niệm: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_027_3 | Lôi Tiên Tàn Niệm: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_028_1 | Tâm Ma Dẫn | REFLECT | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_028_2 | Thượng Cổ Ma Quân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_028_3 | Thượng Cổ Ma Quân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_029_1 | Hắc Thủy Thực | POISON_SILENCE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_029_2 | Ma Hải Chi Chủ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_029_3 | Ma Hải Chi Chủ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_030_1 | Bất Tử Thi | REVIVE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_030_2 | Táng Tiên Thi Hoàng: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_030_3 | Táng Tiên Thi Hoàng: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_031_1 | Trảm Linh Đao | ARMOR_BREAK_BLEED | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_031_2 | Dị Tộc Đại Tướng: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_031_3 | Dị Tộc Đại Tướng: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_032_1 | Minh Hà Thủy | ANTI_HEAL | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_032_2 | Minh Hà Lão Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_032_3 | Minh Hà Lão Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_033_1 | Thú Vương Hống | STUN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_033_2 | Man Hoang Thú Vương: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_033_3 | Man Hoang Thú Vương: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_034_1 | Vạn Mộc Hồi Xuân | REGEN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_034_2 | Mộc Tộc Thánh Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_034_3 | Mộc Tộc Thánh Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_035_1 | Thôn Thiên | HP_STRIKE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_035_2 | Bắc Minh Côn Bằng: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_035_3 | Bắc Minh Côn Bằng: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_036_1 | Huyết Thần Trảm | LIFESTEAL | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_036_2 | Huyết Quang Ma Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_036_3 | Huyết Quang Ma Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_037_1 | Hắc Ám Thôn Phệ | SILENCE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_037_2 | Ma Nguyên Chân Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_037_3 | Ma Nguyên Chân Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_038_1 | Tuyệt Đối Độ Không | FREEZE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_038_2 | Băng Phượng Chi Linh: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_038_3 | Băng Phượng Chi Linh: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_039_1 | Tiên Phàm Cách | REFLECT | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_039_2 | Bán Tiên Lão Quái: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_039_3 | Bán Tiên Lão Quái: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_040_1 | Thiên Kiếp Phạt | HP_STRIKE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_040_2 | Cửu Thiên Lôi Đế: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_040_3 | Cửu Thiên Lôi Đế: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_041_1 | Tiên Quân Uy | WEAKEN | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_041_2 | Bắc Hàn Tiên Quân: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_041_3 | Bắc Hàn Tiên Quân: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_042_1 | Trảm Tam Thi | STUN_DISPEL | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_042_2 | Minh Hàn Đạo Tổ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_042_3 | Minh Hàn Đạo Tổ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_043_1 | Thấu Thị | EVASION | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_043_2 | Chân Linh Bạch Trạch: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_043_3 | Chân Linh Bạch Trạch: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_044_1 | Tử Khí Thực | HP_DOT | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_044_2 | Hôi Giới Chi Chủ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_044_3 | Hôi Giới Chi Chủ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |
| bskill_045_1 | Pháp Tắc Xóa Sổ | DISPEL_STRIKE | 12 | 2 | Tên nguồn, cơ chế nháp |
| bskill_045_2 | Thiên Đình Giám Sát Sứ: Hộ Thể | SHIELD | 24 | 1 | Mẫu V3 |
| bskill_045_3 | Thiên Đình Giám Sát Sứ: Quyết Sát | BURST | 30 | 3 | Mẫu V3 |

## Phụ lục E. Nguyên liệu đột phá

| Mốc | Nguyên liệu | Cần | Boss map | Tỉ lệ | Pity1 món |
|---|---|---|---|---|---|
| Luyện Khí → Trúc Cơ | Trúc Cơ Đạo Thạch | 3 | 5 | 35% | 3 |
| Trúc Cơ → Kim Đan | Thiên Linh Quả Vương | 5 | 10 | 20% | 5 |
| Kim Đan → Nguyên Anh | Vạn Năm Dưỡng Hồn Mộc | 3 | 15 | 12% | 8 |
| Nguyên Anh → Hóa Thần | Ngũ Hành Linh Tinh Bản Nguyên | 2 | 20 | 8% | 12 |
| Hóa Thần → Luyện Hư | Hư Không Hạt Nhân | 2 | 25 | 5% | 15 |
| Luyện Hư → Hợp Thể | Thượng Cổ Ma Huyết | 1 | 30 | 3% | 20 |
| Hợp Thể → Đại Thừa | Hỗn Độn Chi Nguyên | 1 | 35 | 1,5% | 30 |
| Đại Thừa → Chân Tiên | Hồng Mông Tử Khí | 1 | 40 | 0,5% | 50 |
| Chân Tiên → Đạo Tổ (chưa mở) | Chư Thiên Pháp Tắc Ấn | 1 | 45 | 0,2% | 100 |

## Phụ lục F.45 công pháp và15 pháp bảo

Tên và hồi chiêu từ nguồn; kỹ năng đặc biệt chưa chuẩn hóa hoàn toàn thành dữ liệu thực thi.

| ID | Công pháp | Cảnh giới | CD giây | Hệ số sát thương trực tiếp |
|---|---|---|---|---|
| art_001 | Trường Xuân Công | Luyện Khí | 14 | 0 |
| art_002 | Khống Hạc Công | Luyện Khí | 10 | 1.6 |
| art_003 | Liệt Hỏa Quyết | Luyện Khí | 12 | 1.8 |
| art_004 | Huyền Băng Chưởng | Luyện Khí | 15 | 1.5 |
| art_005 | Thanh Phong Kiếm Quyết | Luyện Khí | 11 | 2.1 |
| art_006 | Thanh Nguyên Kiếm Quyết | Trúc Cơ | 15 | 3.2 |
| art_007 | Đại Lực Ngưu Ma Kinh | Trúc Cơ | 20 | 0 |
| art_008 | Bách Độc Chân Kinh | Trúc Cơ | 16 | 2.2 |
| art_009 | Huyết Ảnh Độn Pháp | Trúc Cơ | 18 | 2.8 |
| art_010 | Linh Quy Hưởng Thọ Công | Trúc Cơ | 22 | 0 |
| art_011 | Tử Tiêu Thần Lôi Quyết | Kim Đan | 18 | 4 |
| art_012 | Băng Phách Hàn Quang | Kim Đan | 20 | 3.5 |
| art_013 | Thiên Cơ Khôi Lỗi Thuật | Kim Đan | 25 | 0 |
| art_014 | Hư Thiên Ma Công | Kim Đan | 20 | 4.2 |
| art_015 | Thanh Liên Kiếm Điển | Kim Đan | 16 | 3.8 |
| art_016 | Đại Diễn Quyết | Nguyên Anh | 20 | 5 |
| art_017 | Mộ Lan Vu Tộc Bí Kinh | Nguyên Anh | 18 | 4.5 |
| art_018 | Côn Ngô Kiếm Trận | Nguyên Anh | 15 | 5.5 |
| art_019 | Huyết Hải Ma Kinh | Nguyên Anh | 28 | 4.8 |
| art_020 | Lục Dục Ma Công | Nguyên Anh | 24 | 0 |
| art_021 | Ngũ Hành Hóa Thần Quyết | Hóa Thần | 16 | 6.5 |
| art_022 | Chu Tước Phần Thiên Kinh | Hóa Thần | 22 | 7.5 |
| art_023 | Vũ Tiên Pháp Tắc | Hóa Thần | 19 | 7 |
| art_024 | Tinh Không Thú Biến | Hóa Thần | 30 | 0 |
| art_025 | Hư Vô Đại Pháp | Hóa Thần | 24 | 0 |
| art_026 | Đạo Tâm Chủng Ma Đại Pháp | Luyện Hư | 22 | 0 |
| art_027 | Thiên Vận Mệnh Thuật | Luyện Hư | 25 | 0 |
| art_028 | Lôi Tiên Truyền Thừa | Luyện Hư | 20 | 9.5 |
| art_029 | Vẫn Tiên Cổ Kinh | Luyện Hư | 26 | 8.5 |
| art_030 | Tâm Ma Trảm Đạo Quyết | Luyện Hư | 24 | 9 |
| art_031 | Phạm Thánh Chân Ma Công | Hợp Thể | 30 | 0 |
| art_032 | Minh Hà Huyết Kinh | Hợp Thể | 25 | 12 |
| art_033 | Man Hoang Cổ Tượng Công | Hợp Thể | 22 | 0 |
| art_034 | Mộc Tộc Trường Sinh Quyết | Hợp Thể | 35 | 0 |
| art_035 | Quảng Hàn Tiên Kinh | Hợp Thể | 28 | 11 |
| art_036 | Cửu Chuyển Luân Hồi Quyết | Đại Thừa | 40 | 0 |
| art_037 | Huyết Thiên Ma Tôn Kinh | Đại Thừa | 24 | 18 |
| art_038 | Tiểu Cực Hàn Tinh Quyết | Đại Thừa | 28 | 14 |
| art_039 | Đăng Tiên Pháp Tắc Quyết | Đại Thừa | 26 | 16 |
| art_040 | Cửu Tiêu Kiếp Lôi Quyết | Đại Thừa | 30 | 17.5 |
| art_041 | Thời Gian Pháp Tắc Chân Kinh | Chân Tiên | 25 | 0 |
| art_042 | Không Gian Tạo Hóa Quyết | Chân Tiên | 28 | 25 |
| art_043 | Bắc Hàn Tiên Cung Đế Kinh | Chân Tiên | 35 | 30 |
| art_044 | Hồng Mông Khai Thiên Kinh | Chân Tiên | 45 | 40 |
| art_045 | Bất Tử Bất Diệt Tiên Công | Chân Tiên | 180 | 0 |

| ID | Pháp bảo | Cảnh giới | CD giây |
|---|---|---|---|
| relic_001 | Hoàng Phong Kỳ | Luyện Khí | 12 |
| relic_002 | Kim Quang Đao | Luyện Khí | 10 |
| relic_003 | Huyết Văn Kiếm | Trúc Cơ | 14 |
| relic_004 | Huyền Vũ Thuẫn | Trúc Cơ | 18 |
| relic_005 | Thanh Trúc Phong Vân Kiếm | Kim Đan | 15 |
| relic_006 | Hư Thiên Đỉnh | Kim Đan | 22 |
| relic_007 | Phong Lôi Sí | Nguyên Anh | 20 |
| relic_008 | Cửu Khúc Linh Tham Trượng | Nguyên Anh | 25 |
| relic_009 | Ngũ Hành Hoàn | Hóa Thần | 18 |
| relic_010 | Trảm Tiên Hồ Lô | Hóa Thần | 20 |
| relic_011 | Phá Hư Thương | Luyện Hư | 16 |
| relic_012 | Hoàng Tuyền Đồ | Hợp Thể | 24 |
| relic_013 | Côn Ngô Kiếm | Hợp Thể | 20 |
| relic_014 | Hỗn Độn Chung | Đại Thừa | 35 |
| relic_015 | Chưởng Thiên Bình | Chân Tiên | 45 |

## Phụ lục G.135 bộ trang bị

Tổng chỉ số dưới đây là chuẩn Trắng sau hệ số hướng tu. CSV810 món có phân bổ từng vị trí.

| ID bộ | Tên | Map | HP | Công | Thủ |
|---|---|---|---|---|---|
| set_001_sword | Thanh Phong Kiếm Trang | map_001 | 600 | 50 | 17 |
| set_001_spell | Thanh Phong Pháp Bào | map_001 | 540 | 58 | 15 |
| set_001_body | Thanh Phong Chiến Giáp | map_001 | 810 | 38 | 22 |
| set_002_sword | Huyền Thiết Kiếm Trang | map_002 | 921 | 77 | 26 |
| set_002_spell | Huyền Thiết Pháp Bào | map_002 | 829 | 89 | 23 |
| set_002_body | Huyền Thiết Chiến Giáp | map_002 | 1.243 | 58 | 34 |
| set_003_sword | Trảm Yêu Kiếm Trang | map_003 | 1.414 | 119 | 41 |
| set_003_spell | Trảm Yêu Pháp Bào | map_003 | 1.273 | 137 | 37 |
| set_003_body | Trảm Yêu Chiến Giáp | map_003 | 1.909 | 89 | 53 |
| set_004_sword | Truy Phong Kiếm Trang | map_004 | 2.171 | 184 | 64 |
| set_004_spell | Truy Phong Pháp Bào | map_004 | 1.954 | 212 | 58 |
| set_004_body | Truy Phong Chiến Giáp | map_004 | 2.931 | 138 | 83 |
| set_005_sword | Lưu Vân Kiếm Trang | map_005 | 3.333 | 283 | 100 |
| set_005_spell | Lưu Vân Pháp Bào | map_005 | 3.000 | 325 | 90 |
| set_005_body | Lưu Vân Chiến Giáp | map_005 | 4.500 | 212 | 130 |
| set_006_sword | Ngự Phong Kiếm Trang | map_006 | 6.000 | 467 | 167 |
| set_006_spell | Ngự Phong Pháp Bào | map_006 | 5.400 | 537 | 150 |
| set_006_body | Ngự Phong Chiến Giáp | map_006 | 8.100 | 350 | 217 |
| set_007_sword | Tử Điện Kiếm Trang | map_007 | 9.434 | 722 | 265 |
| set_007_spell | Tử Điện Pháp Bào | map_007 | 8.491 | 830 | 239 |
| set_007_body | Tử Điện Chiến Giáp | map_007 | 12.736 | 542 | 345 |
| set_008_sword | Bạch Hồng Kiếm Trang | map_008 | 14.832 | 1.116 | 422 |
| set_008_spell | Bạch Hồng Pháp Bào | map_008 | 13.349 | 1.283 | 380 |
| set_008_body | Bạch Hồng Chiến Giáp | map_008 | 20.023 | 837 | 549 |
| set_009_sword | Phá Quân Kiếm Trang | map_009 | 23.321 | 1.725 | 671 |
| set_009_spell | Phá Quân Pháp Bào | map_009 | 20.989 | 1.984 | 604 |
| set_009_body | Phá Quân Chiến Giáp | map_009 | 31.483 | 1.294 | 872 |
| set_010_sword | Thiên Đạo Kiếm Trang | map_010 | 36.667 | 2.667 | 1.067 |
| set_010_spell | Thiên Đạo Pháp Bào | map_010 | 33.000 | 3.067 | 960 |
| set_010_body | Thiên Đạo Chiến Giáp | map_010 | 49.500 | 2.000 | 1.387 |
| set_011_sword | Thanh Trúc Kiếm Trang | map_011 | 66.667 | 4.333 | 1.833 |
| set_011_spell | Thanh Trúc Pháp Bào | map_011 | 60.000 | 4.983 | 1.650 |
| set_011_body | Thanh Trúc Chiến Giáp | map_011 | 90.000 | 3.250 | 2.383 |
| set_012_sword | Kinh Lôi Kiếm Trang | map_012 | 104.339 | 6.716 | 2.847 |
| set_012_spell | Kinh Lôi Pháp Bào | map_012 | 93.905 | 7.723 | 2.562 |
| set_012_body | Kinh Lôi Chiến Giáp | map_012 | 140.858 | 5.037 | 3.701 |
| set_013_sword | Phá Hải Kiếm Trang | map_013 | 163.299 | 10.408 | 4.422 |
| set_013_spell | Phá Hải Pháp Bào | map_013 | 146.969 | 11.969 | 3.980 |
| set_013_body | Phá Hải Chiến Giáp | map_013 | 220.454 | 7.806 | 5.749 |
| set_014_sword | Trảm Giao Kiếm Trang | map_014 | 255.577 | 16.131 | 6.868 |
| set_014_spell | Trảm Giao Pháp Bào | map_014 | 230.019 | 18.551 | 6.181 |
| set_014_body | Trảm Giao Chiến Giáp | map_014 | 345.029 | 12.098 | 8.928 |
| set_015_sword | Cửu Chuyển Kiếm Trang | map_015 | 400.000 | 25.000 | 10.667 |
| set_015_spell | Cửu Chuyển Pháp Bào | map_015 | 360.000 | 28.750 | 9.600 |
| set_015_body | Cửu Chuyển Chiến Giáp | map_015 | 540.000 | 18.750 | 13.867 |
| set_016_sword | Thất Tinh Kiếm Trang | map_016 | 733.333 | 41.667 | 18.333 |
| set_016_spell | Thất Tinh Pháp Bào | map_016 | 660.000 | 47.917 | 16.500 |
| set_016_body | Thất Tinh Chiến Giáp | map_016 | 990.000 | 31.250 | 23.833 |
| set_017_sword | Trảm Ma Kiếm Trang | map_017 | 1.154.195 | 64.550 | 29.118 |
| set_017_spell | Trảm Ma Pháp Bào | map_017 | 1.038.776 | 74.233 | 26.206 |
| set_017_body | Trảm Ma Chiến Giáp | map_017 | 1.558.163 | 48.413 | 37.853 |
| set_018_sword | Côn Ngô Kiếm Trang | map_018 | 1.816.590 | 100.000 | 46.248 |
| set_018_spell | Côn Ngô Pháp Bào | map_018 | 1.634.931 | 115.000 | 41.623 |
| set_018_body | Côn Ngô Chiến Giáp | map_018 | 2.452.397 | 75.000 | 60.122 |
| set_019_sword | Bạch Đế Kiếm Trang | map_019 | 2.859.136 | 154.919 | 73.455 |
| set_019_spell | Bạch Đế Pháp Bào | map_019 | 2.573.222 | 178.157 | 66.110 |
| set_019_body | Bạch Đế Chiến Giáp | map_019 | 3.859.834 | 116.189 | 95.492 |
| set_020_sword | Nguyên Anh Kiếm Trang | map_020 | 4.500.000 | 240.000 | 116.667 |
| set_020_spell | Nguyên Anh Pháp Bào | map_020 | 4.050.000 | 276.000 | 105.000 |
| set_020_body | Nguyên Anh Chiến Giáp | map_020 | 6.075.000 | 180.000 | 151.667 |
| set_021_sword | Chu Tước Kiếm Trang | map_021 | 8.000.000 | 400.000 | 200.000 |
| set_021_spell | Chu Tước Pháp Bào | map_021 | 7.200.000 | 460.000 | 180.000 |
| set_021_body | Chu Tước Chiến Giáp | map_021 | 10.800.000 | 300.000 | 260.000 |
| set_022_sword | Vũ Tiên Kiếm Trang | map_022 | 12.649.111 | 617.152 | 317.277 |
| set_022_spell | Vũ Tiên Pháp Bào | map_022 | 11.384.200 | 709.725 | 285.549 |
| set_022_body | Vũ Tiên Chiến Giáp | map_022 | 17.076.300 | 462.864 | 412.460 |
| set_023_sword | Trảm Thần Kiếm Trang | map_023 | 20.000.000 | 952.190 | 503.322 |
| set_023_spell | Trảm Thần Pháp Bào | map_023 | 18.000.000 | 1.095.019 | 452.990 |
| set_023_body | Trảm Thần Chiến Giáp | map_023 | 27.000.000 | 714.143 | 654.319 |
| set_024_sword | Tinh Không Kiếm Trang | map_024 | 31.622.777 | 1.469.115 | 798.462 |
| set_024_spell | Tinh Không Pháp Bào | map_024 | 28.460.499 | 1.689.482 | 718.616 |
| set_024_body | Tinh Không Chiến Giáp | map_024 | 42.690.749 | 1.101.836 | 1.038.001 |
| set_025_sword | Vạn Kiếm Kiếm Trang | map_025 | 50.000.000 | 2.266.667 | 1.266.667 |
| set_025_spell | Vạn Kiếm Pháp Bào | map_025 | 45.000.000 | 2.606.667 | 1.140.000 |
| set_025_body | Vạn Kiếm Chiến Giáp | map_025 | 67.500.000 | 1.700.000 | 1.646.667 |
| set_026_sword | Phá Hư Kiếm Trang | map_026 | 86.666.667 | 3.833.333 | 2.166.667 |
| set_026_spell | Phá Hư Pháp Bào | map_026 | 78.000.000 | 4.408.333 | 1.950.000 |
| set_026_body | Phá Hư Chiến Giáp | map_026 | 117.000.000 | 2.875.000 | 2.816.667 |
| set_027_sword | Lôi Tiên Kiếm Trang | map_027 | 136.501.917 | 5.910.585 | 3.454.428 |
| set_027_spell | Lôi Tiên Pháp Bào | map_027 | 122.851.725 | 6.797.173 | 3.108.985 |
| set_027_body | Lôi Tiên Chiến Giáp | map_027 | 184.277.588 | 4.432.939 | 4.490.756 |
| set_028_sword | Vẫn Tiên Kiếm Trang | map_028 | 214.993.540 | 9.113.482 | 5.507.571 |
| set_028_spell | Vẫn Tiên Pháp Bào | map_028 | 193.494.186 | 10.480.504 | 4.956.814 |
| set_028_body | Vẫn Tiên Chiến Giáp | map_028 | 290.241.279 | 6.835.112 | 7.159.842 |
| set_029_sword | Thiên Vận Kiếm Trang | map_029 | 338.619.582 | 14.052.003 | 8.781.002 |
| set_029_spell | Thiên Vận Pháp Bào | map_029 | 304.757.624 | 16.159.803 | 7.902.902 |
| set_029_body | Thiên Vận Chiến Giáp | map_029 | 457.136.436 | 10.539.002 | 11.415.303 |
| set_030_sword | Thái Hư Kiếm Trang | map_030 | 533.333.333 | 21.666.667 | 14.000.000 |
| set_030_spell | Thái Hư Pháp Bào | map_030 | 480.000.000 | 24.916.667 | 12.600.000 |
| set_030_body | Thái Hư Chiến Giáp | map_030 | 720.000.000 | 16.250.000 | 18.200.000 |
| set_031_sword | Thiên Uyên Kiếm Trang | map_031 | 933.333.333 | 36.666.667 | 23.333.333 |
| set_031_spell | Thiên Uyên Pháp Bào | map_031 | 840.000.000 | 42.166.667 | 21.000.000 |
| set_031_body | Thiên Uyên Chiến Giáp | map_031 | 1.260.000.000 | 27.500.000 | 30.333.333 |
| set_032_sword | Trảm Linh Kiếm Trang | map_032 | 1.486.159.408 | 56.496.453 | 37.153.985 |
| set_032_spell | Trảm Linh Pháp Bào | map_032 | 1.337.543.467 | 64.970.921 | 33.438.587 |
| set_032_body | Trảm Linh Chiến Giáp | map_032 | 2.006.315.201 | 42.372.340 | 48.300.181 |
| set_033_sword | Quảng Hàn Kiếm Trang | map_033 | 2.366.431.913 | 87.050.432 | 59.160.798 |
| set_033_spell | Quảng Hàn Pháp Bào | map_033 | 2.129.788.722 | 100.107.997 | 53.244.718 |
| set_033_body | Quảng Hàn Chiến Giáp | map_033 | 3.194.683.083 | 65.287.824 | 76.909.037 |
| set_034_sword | Thái Ất Kiếm Trang | map_034 | 3.768.101.840 | 134.128.381 | 94.202.546 |
| set_034_spell | Thái Ất Pháp Bào | map_034 | 3.391.291.656 | 154.247.638 | 84.782.291 |
| set_034_body | Thái Ất Chiến Giáp | map_034 | 5.086.937.484 | 100.596.286 | 122.463.310 |
| set_035_sword | Nhất Niệm Kiếm Trang | map_035 | 6.000.000.000 | 206.666.667 | 150.000.000 |
| set_035_spell | Nhất Niệm Pháp Bào | map_035 | 5.400.000.000 | 237.666.667 | 135.000.000 |
| set_035_body | Nhất Niệm Chiến Giáp | map_035 | 8.100.000.000 | 155.000.000 | 195.000.000 |
| set_036_sword | Huyết Thiên Kiếm Trang | map_036 | 10.000.000.000 | 350.000.000 | 250.000.000 |
| set_036_spell | Huyết Thiên Pháp Bào | map_036 | 9.000.000.000 | 402.500.000 | 225.000.000 |
| set_036_body | Huyết Thiên Chiến Giáp | map_036 | 13.500.000.000 | 262.500.000 | 325.000.000 |
| set_037_sword | Trảm Đạo Kiếm Trang | map_037 | 16.068.568.379 | 541.138.623 | 401.714.209 |
| set_037_spell | Trảm Đạo Pháp Bào | map_037 | 14.461.711.541 | 622.309.416 | 361.542.788 |
| set_037_body | Trảm Đạo Chiến Giáp | map_037 | 21.692.567.312 | 405.853.967 | 522.228.472 |
| set_038_sword | Cửu Kiếp Kiếm Trang | map_038 | 25.819.888.975 | 836.660.027 | 645.497.224 |
| set_038_spell | Cửu Kiếp Pháp Bào | map_038 | 23.237.900.078 | 962.159.031 | 580.947.502 |
| set_038_body | Cửu Kiếp Chiến Giáp | map_038 | 34.856.850.116 | 627.495.020 | 839.146.391 |
| set_039_sword | Đăng Tiên Kiếm Trang | map_039 | 41.488.865.153 | 1.293.568.728 | 1.037.221.629 |
| set_039_spell | Đăng Tiên Pháp Bào | map_039 | 37.339.978.638 | 1.487.604.037 | 933.499.466 |
| set_039_body | Đăng Tiên Chiến Giáp | map_039 | 56.009.967.957 | 970.176.546 | 1.348.388.118 |
| set_040_sword | Bán Tiên Kiếm Trang | map_040 | 66.666.666.667 | 2.000.000.000 | 1.666.666.667 |
| set_040_spell | Bán Tiên Pháp Bào | map_040 | 60.000.000.000 | 2.300.000.000 | 1.500.000.000 |
| set_040_body | Bán Tiên Chiến Giáp | map_040 | 90.000.000.000 | 1.500.000.000 | 2.166.666.667 |
| set_041_sword | Bắc Hàn Kiếm Trang | map_041 | 116.666.666.667 | 3.333.333.333 | 2.833.333.333 |
| set_041_spell | Bắc Hàn Pháp Bào | map_041 | 105.000.000.000 | 3.833.333.333 | 2.550.000.000 |
| set_041_body | Bắc Hàn Chiến Giáp | map_041 | 157.500.000.000 | 2.500.000.000 | 3.683.333.333 |
| set_042_sword | Minh Hàn Kiếm Trang | map_042 | 190.728.143.161 | 5.322.394.779 | 4.618.285.233 |
| set_042_spell | Minh Hàn Pháp Bào | map_042 | 171.655.328.845 | 6.120.753.996 | 4.156.456.710 |
| set_042_body | Minh Hàn Chiến Giáp | map_042 | 257.482.993.267 | 3.991.796.084 | 6.003.770.803 |
| set_043_sword | Trảm Tiên Kiếm Trang | map_043 | 311.804.782.231 | 8.498.365.856 | 7.527.726.527 |
| set_043_spell | Trảm Tiên Pháp Bào | map_043 | 280.624.304.008 | 9.773.120.734 | 6.774.953.874 |
| set_043_body | Trảm Tiên Chiến Giáp | map_043 | 420.936.456.012 | 6.373.774.392 | 9.786.044.485 |
| set_044_sword | Tru Tiên Kiếm Trang | map_044 | 509.742.404.089 | 13.569.497.419 | 12.270.066.444 |
| set_044_spell | Tru Tiên Pháp Bào | map_044 | 458.768.163.680 | 15.604.922.032 | 11.043.059.800 |
| set_044_body | Tru Tiên Chiến Giáp | map_044 | 688.152.245.520 | 10.177.123.064 | 15.951.086.377 |
| set_045_sword | Hồng Mông Kiếm Trang | map_045 | 833.333.333.333 | 21.666.666.667 | 20.000.000.000 |
| set_045_spell | Hồng Mông Pháp Bào | map_045 | 750.000.000.000 | 24.916.666.667 | 18.000.000.000 |
| set_045_body | Hồng Mông Chiến Giáp | map_045 | 1.125.000.000.000 | 16.250.000.000 | 26.000.000.000 |

## Phụ lục H.242 vật phẩm ngoài trang bị

Những tên tài nguyên chưa có trong nguồn được đề xuất mới. Tinh hồn được đặt theo Boss nguồn; không phải nguyên liệu đột phá bảo hiểm.

| ID | Tên | Nhóm | Nguồn map/Boss/cảnh giới | Giao dịch |
|---|---|---|---|---|
| herb_001 | Hoàng Tinh Thảo | herb | map_001 | Có |
| ore_001 | Thiết Khoáng | ore | map_001 | Có |
| soul_001 | Hắc Phong Trại Chủ · Tinh Hồn | soul | map_001 | Có |
| herb_002 | Thanh Ngưu Diệp | herb | map_002 | Có |
| ore_002 | Thanh Đồng Khoáng | ore | map_002 | Có |
| soul_002 | Bách Độc Ngô Công · Tinh Hồn | soul | map_002 | Có |
| herb_003 | Thất Huyền Chi | herb | map_003 | Có |
| ore_003 | Huyền Thiết Khoáng | ore | map_003 | Có |
| soul_003 | Mặc Gia Cự Nhân · Tinh Hồn | soul | map_003 | Có |
| herb_004 | Hắc Phong Căn | herb | map_004 | Có |
| ore_004 | Hắc Phong Thiết | ore | map_004 | Có |
| soul_004 | Xích Diễm Hổ Vương · Tinh Hồn | soul | map_004 | Có |
| herb_005 | Thái Nam Hoa | herb | map_005 | Có |
| ore_005 | Thái Nam Tinh Đồng | ore | map_005 | Có |
| soul_005 | Thanh Nhan Lão Tổ · Tinh Hồn | soul | map_005 | Có |
| herb_006 | Hoàng Phong Linh Thảo | herb | map_006 | Có |
| ore_006 | Hoàng Phong Linh Thiết | ore | map_006 | Có |
| soul_006 | Mặc Giao Nhân · Tinh Hồn | soul | map_006 | Có |
| herb_007 | Huyết Sắc Liên | herb | map_007 | Có |
| ore_007 | Huyết Văn Khoáng | ore | map_007 | Có |
| soul_007 | Huyết Sắc Yêu Vương · Tinh Hồn | soul | map_007 | Có |
| herb_008 | Yểm Nguyệt Lan | herb | map_008 | Có |
| ore_008 | Nguyệt Ngân Khoáng | ore | map_008 | Có |
| soul_008 | Cực Âm Đạo Nhân · Tinh Hồn | soul | map_008 | Có |
| herb_009 | Vạn Khôi Đằng | herb | map_009 | Có |
| ore_009 | Khôi Lỗi Tinh Thiết | ore | map_009 | Có |
| soul_009 | Thiên Cơ Khôi Lỗi Vương · Tinh Hồn | soul | map_009 | Có |
| herb_010 | Việt Kinh Ngọc Chi | herb | map_010 | Có |
| ore_010 | Việt Kinh Kim Tinh | ore | map_010 | Có |
| soul_010 | Việt Quốc Hắc Hoàng Đế · Tinh Hồn | soul | map_010 | Có |
| herb_011 | Thiên Tinh Tảo | herb | map_011 | Có |
| ore_011 | Thiên Tinh Hải Ngân | ore | map_011 | Có |
| soul_011 | Phúc Hải Yêu Giao · Tinh Hồn | soul | map_011 | Có |
| herb_012 | Vạn Yêu Huyết Chi | herb | map_012 | Có |
| ore_012 | Yêu Cốt Linh Khoáng | ore | map_012 | Có |
| soul_012 | Kim Giao Vương · Tinh Hồn | soul | map_012 | Có |
| herb_013 | Bích Linh Tham | herb | map_013 | Có |
| ore_013 | Bích Linh Đồng | ore | map_013 | Có |
| soul_013 | Lục Đạo Phân Thân · Tinh Hồn | soul | map_013 | Có |
| herb_014 | Hư Thiên Băng Liên | herb | map_014 | Có |
| ore_014 | Hư Thiên Hàn Thiết | ore | map_014 | Có |
| soul_014 | Hư Thiên Băng Hoàng · Tinh Hồn | soul | map_014 | Có |
| herb_015 | Phong Bạo Hải Chi | herb | map_015 | Có |
| ore_015 | Phong Bạo Lôi Khoáng | ore | map_015 | Có |
| soul_015 | Thâm Hải Cự Chương · Tinh Hồn | soul | map_015 | Có |
| herb_016 | Mộ Lan Thanh Thảo | herb | map_016 | Có |
| ore_016 | Mộ Lan Thanh Kim | ore | map_016 | Có |
| soul_016 | Mộ Lan Thần Sư · Tinh Hồn | soul | map_016 | Có |
| herb_017 | Thiên Lan Thánh Liên | herb | map_017 | Có |
| ore_017 | Thiên Lan Quang Tinh | ore | map_017 | Có |
| soul_017 | Thiên Lan Thánh Thú · Tinh Hồn | soul | map_017 | Có |
| herb_018 | Âm Minh U Lan | herb | map_018 | Có |
| ore_018 | Âm Minh Hồn Thiết | ore | map_018 | Có |
| soul_018 | Quỷ Vương Âm Minh · Tinh Hồn | soul | map_018 | Có |
| herb_019 | Côn Ngô Kim Chi | herb | map_019 | Có |
| ore_019 | Côn Ngô Kim Từ Thạch | ore | map_019 | Có |
| soul_019 | Ngân Sí Thi Vương · Tinh Hồn | soul | map_019 | Có |
| herb_020 | Trụy Ma Hồn Thảo | herb | map_020 | Có |
| ore_020 | Trụy Ma Hắc Kim | ore | map_020 | Có |
| soul_020 | Cổ Ma Chân Thân · Tinh Hồn | soul | map_020 | Có |
| herb_021 | Chu Tước Viêm Hoa | herb | map_021 | Có |
| ore_021 | Chu Tước Viêm Tinh | ore | map_021 | Có |
| soul_021 | Chu Tước Tử · Tinh Hồn | soul | map_021 | Có |
| herb_022 | Vũ Tiên Linh Chi | herb | map_022 | Có |
| ore_022 | Vũ Tiên Phù Kim | ore | map_022 | Có |
| soul_022 | Vũ Tiên Tàn Hồn · Tinh Hồn | soul | map_022 | Có |
| herb_023 | Hư Không Tinh Thảo | herb | map_023 | Có |
| ore_023 | Hư Không Tinh Thiết | ore | map_023 | Có |
| soul_023 | Hư Không Phệ Hồn Thú · Tinh Hồn | soul | map_023 | Có |
| herb_024 | Yêu Linh Huyết Liên | herb | map_024 | Có |
| ore_024 | Yêu Linh Huyết Kim | ore | map_024 | Có |
| soul_024 | Cổ Yêu Đại Thánh · Tinh Hồn | soul | map_024 | Có |
| herb_025 | Băng Phách Tuyết Liên | herb | map_025 | Có |
| ore_025 | Băng Phách Hàn Tinh | ore | map_025 | Có |
| soul_025 | Băng Phách Hàn Nữ · Tinh Hồn | soul | map_025 | Có |
| herb_026 | Thiên Vận Mệnh Thảo | herb | map_026 | Có |
| ore_026 | Thiên Vận Mệnh Kim | ore | map_026 | Có |
| soul_026 | Thiên Vận Lão Tổ · Tinh Hồn | soul | map_026 | Có |
| herb_027 | Tử Lôi Tiên Chi | herb | map_027 | Có |
| ore_027 | Tử Lôi Tinh Thạch | ore | map_027 | Có |
| soul_027 | Lôi Tiên Tàn Niệm · Tinh Hồn | soul | map_027 | Có |
| herb_028 | Vẫn Tiên Hồn Hoa | herb | map_028 | Có |
| ore_028 | Vẫn Tiên Cổ Thiết | ore | map_028 | Có |
| soul_028 | Thượng Cổ Ma Quân · Tinh Hồn | soul | map_028 | Có |
| herb_029 | Ma Vân Hắc Liên | herb | map_029 | Có |
| ore_029 | Ma Vân Hắc Tinh | ore | map_029 | Có |
| soul_029 | Ma Hải Chi Chủ · Tinh Hồn | soul | map_029 | Có |
| herb_030 | Táng Tiên Huyết Thảo | herb | map_030 | Có |
| ore_030 | Táng Tiên Huyết Khoáng | ore | map_030 | Có |
| soul_030 | Táng Tiên Thi Hoàng · Tinh Hồn | soul | map_030 | Có |
| herb_031 | Thiên Uyên Đạo Chi | herb | map_031 | Có |
| ore_031 | Thiên Uyên Đạo Kim | ore | map_031 | Có |
| soul_031 | Dị Tộc Đại Tướng · Tinh Hồn | soul | map_031 | Có |
| herb_032 | Minh Hà U Liên | herb | map_032 | Có |
| ore_032 | Minh Hà U Thiết | ore | map_032 | Có |
| soul_032 | Minh Hà Lão Tổ · Tinh Hồn | soul | map_032 | Có |
| herb_033 | Man Hoang Long Huyết Thảo | herb | map_033 | Có |
| ore_033 | Man Hoang Long Tinh | ore | map_033 | Có |
| soul_033 | Man Hoang Thú Vương · Tinh Hồn | soul | map_033 | Có |
| herb_034 | Mộc Tộc Trường Sinh Diệp | herb | map_034 | Có |
| ore_034 | Mộc Linh Thanh Tinh | ore | map_034 | Có |
| soul_034 | Mộc Tộc Thánh Tổ · Tinh Hồn | soul | map_034 | Có |
| herb_035 | Quảng Hàn Nguyệt Chi | herb | map_035 | Có |
| ore_035 | Quảng Hàn Nguyệt Thạch | ore | map_035 | Có |
| soul_035 | Bắc Minh Côn Bằng · Tinh Hồn | soul | map_035 | Có |
| herb_036 | Huyết Thiên Ma Liên | herb | map_036 | Có |
| ore_036 | Huyết Thiên Ma Kim | ore | map_036 | Có |
| soul_036 | Huyết Quang Ma Tổ · Tinh Hồn | soul | map_036 | Có |
| herb_037 | Ma Nguyên Thực Nhật Hoa | herb | map_037 | Có |
| ore_037 | Ma Nguyên Ám Tinh | ore | map_037 | Có |
| soul_037 | Ma Nguyên Chân Tổ · Tinh Hồn | soul | map_037 | Có |
| herb_038 | Tiểu Cực Hàn Tâm Thảo | herb | map_038 | Có |
| ore_038 | Tiểu Cực Băng Tủy | ore | map_038 | Có |
| soul_038 | Băng Phượng Chi Linh · Tinh Hồn | soul | map_038 | Có |
| herb_039 | Đăng Tiên Ngọc Liên | herb | map_039 | Có |
| ore_039 | Đăng Tiên Ngọc Tinh | ore | map_039 | Có |
| soul_039 | Bán Tiên Lão Quái · Tinh Hồn | soul | map_039 | Có |
| herb_040 | Cửu Tiêu Lôi Chi | herb | map_040 | Có |
| ore_040 | Cửu Tiêu Lôi Tinh | ore | map_040 | Có |
| soul_040 | Cửu Thiên Lôi Đế · Tinh Hồn | soul | map_040 | Có |
| herb_041 | Bắc Hàn Tiên Liên | herb | map_041 | Có |
| ore_041 | Bắc Hàn Tiên Kim | ore | map_041 | Có |
| soul_041 | Bắc Hàn Tiên Quân · Tinh Hồn | soul | map_041 | Có |
| herb_042 | Minh Hàn Đạo Thảo | herb | map_042 | Có |
| ore_042 | Minh Hàn Đạo Tinh | ore | map_042 | Có |
| soul_042 | Minh Hàn Đạo Tổ · Tinh Hồn | soul | map_042 | Có |
| herb_043 | Bạch Trạch Tiên Chi | herb | map_043 | Có |
| ore_043 | Bạch Trạch Tiên Ngọc | ore | map_043 | Có |
| soul_043 | Chân Linh Bạch Trạch · Tinh Hồn | soul | map_043 | Có |
| herb_044 | Hôi Giới Tử Khí Hoa | herb | map_044 | Có |
| ore_044 | Hôi Giới Tử Tinh | ore | map_044 | Có |
| soul_044 | Hôi Giới Chi Chủ · Tinh Hồn | soul | map_044 | Có |
| herb_045 | Nam Thiên Hồng Mông Liên | herb | map_045 | Có |
| ore_045 | Nam Thiên Hồng Mông Thạch | ore | map_045 | Có |
| soul_045 | Thiên Đình Giám Sát Sứ · Tinh Hồn | soul | map_045 | Có |
| pill_01_1 | Hoàng Long Đan | cultivation_pill | cultivation_01 | Có |
| pill_01_2 | Trúc Cơ Đan | breakthrough_pill | cultivation_01 | Có |
| pill_01_3 | Long Hổ Đan | attack_pill | cultivation_01 | Có |
| pill_01_4 | Bổ Huyết Đan | hp_pill | cultivation_01 | Có |
| pill_01_5 | Thiết Cốt Đan | defense_pill | cultivation_01 | Có |
| pill_02_1 | Hợp Khí Đan | cultivation_pill | cultivation_02 | Có |
| pill_02_2 | Kết Đan Linh Dược | breakthrough_pill | cultivation_02 | Có |
| pill_02_3 | Xích Dương Đan | attack_pill | cultivation_02 | Có |
| pill_02_4 | Huyền Nguyên Đan | hp_pill | cultivation_02 | Có |
| pill_02_5 | Kim Cang Đan | defense_pill | cultivation_02 | Có |
| pill_03_1 | Kết Kim Đan | cultivation_pill | cultivation_03 | Có |
| pill_03_2 | Phá Anh Đan | breakthrough_pill | cultivation_03 | Có |
| pill_03_3 | Tử Dương Đan | attack_pill | cultivation_03 | Có |
| pill_03_4 | Long Huyết Đan | hp_pill | cultivation_03 | Có |
| pill_03_5 | Huyền Vũ Đan | defense_pill | cultivation_03 | Có |
| pill_04_1 | Ngưng Anh Đan | cultivation_pill | cultivation_04 | Có |
| pill_04_2 | Vấn Đỉnh Đan | breakthrough_pill | cultivation_04 | Có |
| pill_04_3 | Thiên Hỏa Đan | attack_pill | cultivation_04 | Có |
| pill_04_4 | Bất Tử Đan | hp_pill | cultivation_04 | Có |
| pill_04_5 | Bàn Thạch Đan | defense_pill | cultivation_04 | Có |
| pill_05_1 | Hóa Thần Đan | cultivation_pill | cultivation_05 | Có |
| pill_05_2 | Phá Hư Đan | breakthrough_pill | cultivation_05 | Có |
| pill_05_3 | Chu Tước Đan | attack_pill | cultivation_05 | Có |
| pill_05_4 | Huyết Hải Đan | hp_pill | cultivation_05 | Có |
| pill_05_5 | Bất Động Đan | defense_pill | cultivation_05 | Có |
| pill_06_1 | Luyện Hư Đan | cultivation_pill | cultivation_06 | Có |
| pill_06_2 | Dung Hợp Đan | breakthrough_pill | cultivation_06 | Có |
| pill_06_3 | Lôi Viêm Đan | attack_pill | cultivation_06 | Có |
| pill_06_4 | Hoang Cổ Đan | hp_pill | cultivation_06 | Có |
| pill_06_5 | Hư Không Đan | defense_pill | cultivation_06 | Có |
| pill_07_1 | Hợp Đạo Đan | cultivation_pill | cultivation_07 | Có |
| pill_07_2 | Độ Kiếp Đan | breakthrough_pill | cultivation_07 | Có |
| pill_07_3 | Thái Dương Đan | attack_pill | cultivation_07 | Có |
| pill_07_4 | Chân Linh Đan | hp_pill | cultivation_07 | Có |
| pill_07_5 | Hỗn Độn Đan | defense_pill | cultivation_07 | Có |
| pill_08_1 | Đại Thừa Đan | cultivation_pill | cultivation_08 | Có |
| pill_08_2 | Phi Thăng Tiên Đan | breakthrough_pill | cultivation_08 | Có |
| pill_08_3 | Phần Thiên Đan | attack_pill | cultivation_08 | Có |
| pill_08_4 | Niết Bàn Đan | hp_pill | cultivation_08 | Có |
| pill_08_5 | Bất Diệt Đan | defense_pill | cultivation_08 | Có |
| pill_09_1 | Cửu Chuyển Tiên Đan | cultivation_pill | cultivation_09 | Có |
| pill_09_2 | Kim Tiên Tạo Hóa Đan | breakthrough_pill | cultivation_09 | Có |
| pill_09_3 | Tiên Diễm Đan | attack_pill | cultivation_09 | Có |
| pill_09_4 | Hồng Mông Đan | hp_pill | cultivation_09 | Có |
| pill_09_5 | Tiên Cốt Đan | defense_pill | cultivation_09 | Có |
| talisman_001 | Hỏa Cầu Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_002 | Băng Châm Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_003 | Kim Kiếm Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_004 | Mộc Linh Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_005 | Thổ Thuẫn Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_006 | Lôi Kích Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_007 | Tịnh Hóa Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_008 | Hồi Xuân Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_009 | Tật Hành Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_010 | Ẩn Tức Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_011 | Phá Giáp Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_012 | Trấn Hồn Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_013 | Hộ Mệnh Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_014 | Na Di Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| talisman_015 | Phong Ma Phù | talisman | công thức/nhiệm vụ cần bổ sung | Có |
| gem_001 | Kim Linh Thạch · Sơ Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_002 | Kim Linh Thạch · Trung Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_003 | Kim Linh Thạch · Cao Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_004 | Mộc Linh Thạch · Sơ Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_005 | Mộc Linh Thạch · Trung Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_006 | Mộc Linh Thạch · Cao Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_007 | Thủy Linh Thạch · Sơ Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_008 | Thủy Linh Thạch · Trung Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_009 | Thủy Linh Thạch · Cao Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_010 | Hỏa Linh Thạch · Sơ Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_011 | Hỏa Linh Thạch · Trung Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_012 | Hỏa Linh Thạch · Cao Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_013 | Thổ Linh Thạch · Sơ Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_014 | Thổ Linh Thạch · Trung Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| gem_015 | Thổ Linh Thạch · Cao Cấp | gem | công thức/nhiệm vụ cần bổ sung | Có |
| breakmat_01 | Trúc Cơ Đạo Thạch | breakthrough_material | boss_005 | Không |
| breakmat_02 | Thiên Linh Quả Vương | breakthrough_material | boss_010 | Không |
| breakmat_03 | Vạn Năm Dưỡng Hồn Mộc | breakthrough_material | boss_015 | Không |
| breakmat_04 | Ngũ Hành Linh Tinh Bản Nguyên | breakthrough_material | boss_020 | Không |
| breakmat_05 | Hư Không Hạt Nhân | breakthrough_material | boss_025 | Không |
| breakmat_06 | Thượng Cổ Ma Huyết | breakthrough_material | boss_030 | Không |
| breakmat_07 | Hỗn Độn Chi Nguyên | breakthrough_material | boss_035 | Không |
| breakmat_08 | Hồng Mông Tử Khí | breakthrough_material | boss_040 | Không |
| breakmat_09 | Chư Thiên Pháp Tắc Ấn | breakthrough_material | boss_045 | Không |
| utility_01 | Hồi Huyết Tán | utility | công thức/nhiệm vụ cần bổ sung | Có |
| utility_02 | Hồi Nguyên Tán | utility | công thức/nhiệm vụ cần bổ sung | Có |
| utility_03 | Thanh Độc Tán | utility | công thức/nhiệm vụ cần bổ sung | Có |
| utility_04 | Tẩy Tủy Đan | utility | công thức/nhiệm vụ cần bổ sung | Không |
| utility_05 | Bổ Thiên Đan | utility | công thức/nhiệm vụ cần bổ sung | Không |
| processed_01_1 | Luyện Khí · Tinh Thiết | processed_material | cultivation_01 | Có |
| processed_01_2 | Luyện Khí · Linh Dịch | processed_material | cultivation_01 | Có |
| processed_02_1 | Trúc Cơ · Tinh Thiết | processed_material | cultivation_02 | Có |
| processed_02_2 | Trúc Cơ · Linh Dịch | processed_material | cultivation_02 | Có |
| processed_03_1 | Kim Đan · Tinh Thiết | processed_material | cultivation_03 | Có |
| processed_03_2 | Kim Đan · Linh Dịch | processed_material | cultivation_03 | Có |
| processed_04_1 | Nguyên Anh · Tinh Thiết | processed_material | cultivation_04 | Có |
| processed_04_2 | Nguyên Anh · Linh Dịch | processed_material | cultivation_04 | Có |
| processed_05_1 | Hóa Thần · Tinh Thiết | processed_material | cultivation_05 | Có |
| processed_05_2 | Hóa Thần · Linh Dịch | processed_material | cultivation_05 | Có |
| processed_06_1 | Luyện Hư · Tinh Thiết | processed_material | cultivation_06 | Có |
| processed_06_2 | Luyện Hư · Linh Dịch | processed_material | cultivation_06 | Có |
| processed_07_1 | Hợp Thể · Tinh Thiết | processed_material | cultivation_07 | Có |
| processed_07_2 | Hợp Thể · Linh Dịch | processed_material | cultivation_07 | Có |
| processed_08_1 | Đại Thừa · Tinh Thiết | processed_material | cultivation_08 | Có |
| processed_08_2 | Đại Thừa · Linh Dịch | processed_material | cultivation_08 | Có |
| processed_09_1 | Chân Tiên · Tinh Thiết | processed_material | cultivation_09 | Có |
| processed_09_2 | Chân Tiên · Linh Dịch | processed_material | cultivation_09 | Có |

## Phụ lục I. Bản trích nguồn PDF để đối chiếu

Phần này giữ nội dung cũ, gồm cả quy tắc đã được V3 thay thế. Không dùng làm cấu hình runtime. Thứ tự ưu tiên: yêu cầu người dùng → thiết kế V3 → phụ lục nguồn.

```text
TÀI LIỆU THIẾT KẾ HỆ THỐNG GAME (GDD): TU
TIÊN IDLE MMO
Thể loại: Idle RPG / MMORPG Tu Tiên​
Quy mô hệ thống: 9 Đại Cảnh Giới | 45 Bản Đồ | 135 Quái Thường | 45 Boss Bí Cảnh | 45
Công Pháp | 15 Pháp Bảo | 135 Bộ Trang Bị | >240 Vật Phẩm & Đan Dược.




MỤC LỤC
   1.​ Hệ Thống Nhân Vật, Linh Căn & Cơ Chế Cảnh Giới
   2.​ Hệ Thống Hiệu Ứng Chiến Đấu (Status Effects) & Công Thức Sát Thương
   3.​ Hệ Thống 45 Bản Đồ, 135 Quái Vật & 45 Boss Bí Cảnh (Full Chỉ Số)
   4.​ Hệ Thống Nguyên Liệu Đột Phá & Tỉ Lệ Rơi Từ Boss (Pity System)
   5.​ Hệ Thống 45 Công Pháp & 15 Pháp Bảo (Kỹ Năng Độc Quyền)
   6.​ Hệ Thống 135 Bộ Trang Bị Theo Cảnh Giới & Hệ Phái
   7.​ Hệ Thống Đan Dược, Vật Phẩm & Độ Thuần Thục Nghề Nghiệp
   8.​ Cốt Truyện & Hội Thoại Nhiệm Vụ Tương Tác (Chat NPC)




1. HỆ THỐNG NHÂN VẬT, LINH CĂN & CƠ CHẾ CẢNH GIỚI

1.1. Bảng Chỉ Số Gốc Nhân Vật & EXP Đột Phá Qua 9 Đại Cảnh Giới
Mỗi Đại Cảnh Giới chia làm 10 tầng nhỏ (Tầng 1 -> Tầng 10 / Đỉnh Phong). Dưới đây là chỉ số
gốc khi đạt Tầng 1 của mỗi Đại Cảnh Giới (Mỗi tầng nhỏ tăng thêm 12% chỉ số gốc của cảnh
giới đó):


 Đại       Bản Đồ    HP Gốc    Công       Thủ       Tốc       Bạo /     Tổng       Thời
 Cảnh                          Gốc        Gốc       Đánh      Kháng     EXP        Gian
 Giới                                                         Bạo       Cần        Idle Dự
                                                                        Đột        Kiến
                                                                        Phá

 1.        Map 1 -   1.000     80         30        1.00 /s   5% / 2% 100.000      ~2 giờ
 Luyện     5
 Khí


[Ngắt trang nguồn]

Đại       Bản Đồ    HP Gốc    Công      Thủ       Tốc       Bạo /   Tổng      Thời
Cảnh                          Gốc       Gốc       Đánh      Kháng   EXP       Gian
Giới                                                        Bạo     Cần       Idle Dự
                                                                    Đột       Kiến
                                                                    Phá

2. Trúc   Map 6 -   12.000    650       220       1.10 /s   8% / 4% 2.500.0   ~12 giờ
Cơ        10                                                        00

3. Kim    Map 11    120.000   5.500     1.800     1.25 /s   12% /   80.000.   ~3 ngày
Đan       - 15                                              7%      000

4.        Map 16    1.200.0   45.000    15.000    1.40 /s   18% /   2.500.0   ~10
Nguyên    - 20      00                                      10%     00.000    ngày
Anh

5. Hóa    Map 21    10.000.   350.000   110.000   1.55 /s   25% /   80.000.   ~1
Thần      - 25      000                                     15%     000.000   tháng

6.        Map 26    85.000.   2.800.0   900.000   1.70 /s   32% /   2.500.0   ~3
Luyện     - 30      000       00                            20%     00.000.   tháng
Hư                                                                  000

7. Hợp    Map 31    700.000   22.000.   7.500.0   1.90 /s   40% /   80.000.   ~6
Thể       - 35      .000      000       00                  28%     000.000   tháng
                                                                    .000

8. Đại    Map 36    6.000.0   180.000   60.000.   2.10 /s   50% /   2.500.0   ~1 năm
Thừa      - 40      00.000    .000      000                 35%     00.000.
                                                                    000.000

9. Chân   Map 41    50.000.   1.500.0   500.000   2.50 /s   65% /   80.000.   >1.5
Tiên      - 45      000.000   00.000    .000                45%     000.000   năm
                                                                    .000.00
                                                                    0


1.2. Hệ Thống Linh Căn Ngẫu Nhiên & Tiến Hóa Theo Cảnh Giới
Khi tạo nhân vật, người chơi quay ngẫu nhiên 1 Linh Căn chủ đạo. Khi đạt Kim Đan, Hóa
Thần, Hợp Thể, người chơi có thể dùng Tẩy Tủy Đan hoặc Bổ Thiên Đan để mở thêm nhánh
Linh Căn phụ hoặc nâng cấp phẩm chất Linh Căn (Phàm -> Địa -> Thiên -> Tiên Phẩm).


[Ngắt trang nguồn]

Loại Linh Căn        Tỉ Lệ Quay            Buff Nghề Nghiệp         Buff Chiến Đấu Nội
                                           (Động Phủ)               Tại (Tăng thêm theo
                                                                    mỗi Đại Cảnh Giới)

Kim Linh Căn         19%                   +25% Tỉ lệ rèn ra        +10% Công kích Vật
                                           Trang bị                 lý/Kiếm hệ, +5%
                                           Lam/Tím/Cam; Giảm        Xuyên giáp (+2%
                                           10% khoáng thạch         Xuyên giáp mỗi cảnh
                                           tiêu hao.                giới).

Mộc Linh Căn         19%                   +30% Tỉ lệ thành         +15% Hiệu quả Hồi
                                           công khi Luyện           máu (từ Skill &
                                           Đan; +15% tỉ lệ x2 số    Đan), Hồi 1% HP tối
                                           lượng đan ra lò.         đa/5 giây.

Thủy Linh Căn        19%                   -25% Thời gian thu       +20% Kháng hiệu
                                           thập Linh thảo / Đào     ứng khống chế,
                                           khoáng; +20% sản         Giảm 10% thời gian
                                           lượng Idle.              hồi chiêu (Cooldown).

Hỏa Linh Căn         19%                   Tăng 20% hỏa lực lò      +20% Sát thương
                                           đan/lò rèn (Giảm         Kỹ năng (Công
                                           20% thời gian chờ        pháp & Pháp bảo),
                                           chế tạo).                +10% Tỉ lệ Bạo kích.

Thổ Linh Căn         19%                   Tăng 30% sức chứa        +30% Giới hạn HP
                                           Kho đồ & Sức chứa        tối đa, +15% Chỉ số
                                           Linh điền trồng thuốc.   Phòng thủ & +10%
                                                                    Giảm sát thương.

Dị Linh Căn (Lôi /   5% (Hiếm)             Cộng gộp +15% hiệu       +25% Tốc độ đánh,
Băng / Phong)                              quả cho cả 3 nghề        +20% Sát thương
                                           (Luyện đan, Rèn đồ,      Bạo kích, đòn đánh
                                           Hái thuốc).              kèm sát thương
                                                                    chuẩn.


1.3. Cơ Chế Đặc Thù Mở Khóa Theo Đại Cảnh Giới
  ●​ Trúc Cơ (Đúc Đạo Đài): Mở khóa Ngự Kiếm Phi Hành (+50% tốc độ di chuyển chạy
     map).
  ●​ Kim Đan (Cửu Phẩm Kim Đan): Dựa vào số lượng nguyên liệu phụ tích lũy khi đột phá
     để chia phẩm Kim Đan (Nhất Phẩm: +50% toàn chỉ số gốc; Cửu Phẩm: +5% toàn chỉ số
     gốc).


[Ngắt trang nguồn]

   ●​ Nguyên Anh (Nguyên Anh Xuất Khiếu): Tăng thẳng +30% HP & Công gốc. Miễn tử 1
      lần/ngày: Khi hết máu, Nguyên Anh tự động xuất khiếu bỏ chạy, giữ nguyên điểm kinh
      nghiệm nhưng bị giảm 30% chỉ số trong 30 phút.
   ●​ Hóa Thần (Ngũ Hành Tương Khắc): Mở khóa hệ thống khắc chế Ngũ Hành (Kim ->
      Mộc -> Thổ -> Thủy -> Hỏa -> Kim). Khắc hệ tăng +35% sát thương, bị khắc giảm
      -25% sát thương.
   ●​ Luyện Hư (Tâm Ma Lịch Kiếp): Treo máy tích lũy thanh Ma Tính. Đầy 100% sẽ triệu
      hồi Tâm Ma (sao chép 110% chỉ số người chơi). Đánh thắng nhận buff Đạo Tâm Kiên
      Định (+25% Bạo kích trong 12h); thua bị tẩu hỏa nhập ma (-5% EXP hiện tại).
   ●​ Hợp Thể - Đại Thừa - Chân Tiên (Lĩnh Ngộ Pháp Tắc): Mở khóa 4 nhánh Pháp Tắc
      (Thời Gian, Không Gian, Hủy Diệt, Sinh Mệnh), cho phép đòn đánh thường có tỉ lệ
      ngưng đọng thời gian hoặc xóa buff của Boss.




2. HỆ THỐNG HIỆU ỨNG CHIẾN ĐẤU (STATUS EFFECTS) &
CÔNG THỨC SÁT THƯƠNG

2.1. Công Thức Tính Sát Thương Chuẩn (Damage Formula)
$$\text{Sát Thương Cơ Bản} = \text{Công} \times \left( 1 - \frac{\text{Thủ Địch} \times (1 -
\text{Xuyên Giáp})}{\text{Thủ Địch} \times (1 - \text{Xuyên Giáp}) + 500 \times \text{Cấp Cảnh
Giới}} \right)$$ $$\text{Sát Thương Cuối} = \text{Sát Thương Cơ Bản} \times \text{Hệ Số Skill}
\times \text{Hệ Số Bạo Kích} \times \text{Hệ Số Ngũ Hành}$$


2.2. Bảng 10 Hiệu Ứng Chiến Đấu (Buff / Debuff)
 Mã Hiệu Ứng        Tên Hiệu Ứng       Hệ Liên Quan       Cơ Chế Tác           Thời Gian &
                                                          Động Chi Tiết        Cộng Dồn

 BURN               Thiêu Đốt          Hỏa                Gây sát thương       Kéo dài 5s (Tối
                                                          chuẩn bằng 2%        đa 3 tầng)
                                                          HP tối đa của
                                                          mục tiêu mỗi
                                                          giây (Tối đa
                                                          không quá
                                                          500% Công của
                                                          người thi
                                                          triển/giây đối với
                                                          Boss).


[Ngắt trang nguồn]

Mã Hiệu Ứng   Tên Hiệu Ứng   Hệ Liên Quan   Cơ Chế Tác         Thời Gian &
                                            Động Chi Tiết      Cộng Dồn

POISON        Trúng Độc      Mộc / Ám       Gây sát thương     Kéo dài 8s (Tối
                                            vật lý bằng 1.5%   đa 5 tầng)
                                            HP tối đa/giây
                                            và giảm 40%
                                            hiệu quả hồi
                                            máu của mục
                                            tiêu.

BLEED         Chảy Máu       Kim / Vật lý   Gây sát thương     Kéo dài 4s (Tối
                                            bằng 80% Công      đa 3 tầng)
                                            kích/giây. Nếu
                                            mục tiêu di
                                            chuyển, sát
                                            thương tăng gấp
                                            đôi.

ARMOR_BREAK   Phá Giáp       Kim / Thể      Giảm trực tiếp     Kéo dài 6s
                                            30% chỉ số         (Không cộng
                                            Phòng Thủ          dồn)
                                            (Thủ) của mục
                                            tiêu.

STUN          Tê Liệt /      Lôi / Thổ      Mục tiêu bị bất    Kéo dài 1.5s –
              Choáng                        động hoàn toàn,    3.0s
                                            không thể đánh
                                            thường hay
                                            dùng kỹ năng.

FREEZE        Đóng Băng      Thủy / Băng    Đóng băng hành     Kéo dài 2.5s
                                            động của mục
                                            tiêu, đồng thời
                                            làm mục tiêu
                                            nhận thêm
                                            +25% Sát
                                            thương Bạo
                                            kích.

SILENCE       Phong Ấn /     Thần Thức      Cấm mục tiêu       Kéo dài 3.5s
              Câm Lặng                      kích hoạt Kỹ
                                            năng Công pháp


[Ngắt trang nguồn]

Mã Hiệu Ứng      Tên Hiệu Ứng     Hệ Liên Quan     Cơ Chế Tác         Thời Gian &
                                                   Động Chi Tiết      Cộng Dồn

                                                   và Pháp bảo
                                                   (Chỉ có thể đánh
                                                   thường).

LIFESTEAL        Thôn Phệ / Hút   Ma Đạo           Chuyển hóa         Tức thì / Duy trì
                 Máu                               35% – 50% sát      theo buff
                                                   thương gây ra
                                                   thành HP hồi
                                                   phục trực tiếp
                                                   cho bản thân.

SHIELD           Linh Khiên Hộ    Thổ / Mộc        Tạo lớp giáp ảo    Kéo dài 6s – 10s
                 Thể                               hấp thụ sát
                                                   thương bằng %
                                                   HP tối đa. Khi
                                                   khiên còn tồn
                                                   tại, miễn nhiễm
                                                   Choáng.

REFLECT          Phản Đòn (Kim    Thể Tu           Phản lại 25% –     Kéo dài 5s – 8s
                 Thân)                             40% sát
                                                   thương gốc
                                                   nhận vào trả
                                                   ngược lại kẻ tấn
                                                   công.




3. HỆ THỐNG 45 BẢN ĐỒ, 135 QUÁI VẬT & 45 BOSS BÍ CẢNH
(FULL CHỈ SỐ)
Quy ước chỉ số 3 loại Quái thường trong mỗi Map:

   ●​ Quái 1 (Cân bằng): $100%$ HP chuẩn | $100%$ Công chuẩn | $100%$ Thủ chuẩn.
      (Đánh thường + BLEED nhẹ).
   ●​ Quái 2 (Sát thương/Phá giáp): $75%$ HP chuẩn | $145%$ Công chuẩn | $65%$ Thủ
      chuẩn. (Kèm hiệu ứng ARMOR_BREAK hoặc BURN).
   ●​ Quái 3 (Trâu bò/Khống chế): $150%$ HP chuẩn | $75%$ Công chuẩn | $140%$ Thủ
      chuẩn. (Kèm hiệu ứng POISON, FREEZE hoặc STUN).


[Ngắt trang nguồn]

3.1. Cảnh Giới 1: Luyện Khí Kỳ (Việt Quốc - Thiên Nam Đại Lục)
Map         Tên Bản Đồ   3 Quái          Chỉ Số          Boss Bí      Chỉ Số Boss
                         Thường (Q1      Chuẩn Quái      Cảnh (12h,   (HP / Công /
                         / Q2 / Q3)      (HP / Công /    18h, 21h)    Thủ) & Kỹ
                                         Thủ)                         Năng

M1          Vô Danh      Dã Trư /        500 / 45 / 15   Hắc Phong    6.000 / 220 /
            Thôn         Thảo Mãng /                     Trại Chủ     60 — Bổ Củi:
                         Sơn Tặc                                      BLEED 4s

M2          Thanh Ngưu   Thanh Lang /    850 / 75 / 25   Bách Độc     10.200 / 360 /
            Trấn         Hắc Hùng /                      Ngô Công     100 — Phun
                         Đạo Phỉ                                      Độc: POISON
                                                                      6s

M3          Thất Huyền   Phản Đồ /       1.450 / 125 /   Mặc Gia Cự   17.500 / 600 /
            Môn          Thiết Thi /     45              Nhân         180 — Địa
                         Độc Chu                                      Chấn: STUN
                                                                      1.5s

M4          Hắc Phong    Sơn Tinh / Ác   2.500 / 210 /   Xích Diễm    30.000 /
            Sơn          Điểu / Cuồng    75              Hổ Vương     1.000 / 300
                         Đồ                                           — Hỏa Trảo:
                                                                      BURN 5s

M5          Thái Nam     Tán Tu Ác Bá    4.200 / 350 /   Thanh Nhan   50.000 /
            Cốc          / Yêu Hồ /      130             Lão Tổ       1.700 / 520
                         Huyết Bức                                    — Hút Huyết:
                                                                      LIFESTEAL
                                                                      40%


3.2. Cảnh Giới 2: Trúc Cơ Kỳ (Thiên Nam Đại Lục)
Map         Tên Bản Đồ   3 Quái          Chỉ Số          Boss Bí      Chỉ Số Boss
                         Thường (Q1      Chuẩn Quái      Cảnh (12h,   (HP / Công /
                         / Q2 / Q3)      (HP / Công /    18h, 21h)    Thủ) & Kỹ
                                         Thủ)                         Năng

M6          Hoàng Phong Hộ Sơn Thú /     9.000 / 680 /   Mặc Giao     110.000 /
            Cốc         Mộc Khôi Lỗi     250             Nhân         3.200 / 1.000
                        / Kiếm Tu                                     — Độc Vụ:


[Ngắt trang nguồn]

Map         Tên Bản Đồ   3 Quái         Chỉ Số          Boss Bí      Chỉ Số Boss
                         Thường (Q1     Chuẩn Quái      Cảnh (12h,   (HP / Công /
                         / Q2 / Q3)     (HP / Công /    18h, 21h)    Thủ) & Kỹ
                                        Thủ)                         Năng

                                                                     POISON +
                                                                     Giảm tốc

M7          Huyết Sắc    Huyết Nha /    15.500 /        Huyết Sắc    185.000 /
            Cấm Địa      Thực Nhân      1.150 / 420     Yêu Vương    5.500 / 1.700
                         Hoa / Độc                                   — Huyết Hải:
                         Mãng                                        BLEED diện
                                                                     rộng

M8          Yểm Nguyệt   Huyễn Âm       26.500 /        Cực Âm Đạo   320.000 /
            Tông         Nữ / Song      1.950 / 720     Nhân         9.200 / 2.900
                         Đầu Xà / Ám                                 — Hàn Âm
                         Thú                                         Chưởng:
                                                                     FREEZE 2s

M9          Vạn Khôi     Thiết Khôi Lỗi 45.000 /        Thiên Cơ     540.000 /
            Sơn          / Cơ Quan      3.300 / 1.250   Khôi Lỗi     15.800 /
                         Thú / Âm Thi                   Vương        5.000 — Cơ
                                                                     Quan Pháo:
                                                                     ARMOR_BREA
                                                                     K

M10         Việt Kinh    Hắc Sát Vệ /   78.000 /        Việt Quốc    930.000 /
            Thành        Huyết Thị /    5.600 / 2.100   Hắc Hoàng    27.000 /
                         Tà Trưởng                      Đế           8.400 —
                         Lão                                         Hoàng
                                                                     Quyền:
                                                                     SILENCE 3s


3.3. Cảnh Giới 3: Kim Đan Kỳ (Loạn Tinh Hải)
Map         Tên Bản Đồ   3 Quái         Chỉ Số          Boss Bí      Chỉ Số Boss
                         Thường (Q1     Chuẩn Quái      Cảnh (12h,   (HP / Công /
                         / Q2 / Q3)     (HP / Công /    18h, 21h)    Thủ) & Kỹ
                                        Thủ)                         Năng

M11         Thiên Tinh   Băng Hải       150K / 9.500    Phúc Hải     1.8M / 45.000
            Nội Hải      Quy / Lôi      / 3.500         Yêu Giao     / 14.000 —


[Ngắt trang nguồn]

Map   Tên Bản Đồ    3 Quái         Chỉ Số         Boss Bí      Chỉ Số Boss
                    Thường (Q1     Chuẩn Quái     Cảnh (12h,   (HP / Công /
                    / Q2 / Q3)     (HP / Công /   18h, 21h)    Thủ) & Kỹ
                                   Thủ)                        Năng

                    Ngư / Hải                                  Cuồng Lôi:
                    Tộc                                        STUN 2s

M12   Vạn Yêu Cốc   Phong Nhận     255K /         Kim Giao     3.1M / 76.000
                    Điêu / Kim     16.000 /       Vương        / 24.000 —
                    Giáp Hạt /     6.000                       Kim Lân
                    Ngưu Yêu                                   Giáp:
                                                               REFLECT
                                                               30%

M13   Bích Linh     Độc Long       435K /         Lục Đạo      5.2M / 130K /
      Đảo           Giao / Huyết   27.500 /       Phân Thân    41.000 —
                    Đằng /         10.200                      Lục Đạo
                    Khoáng Nô                                  Luân Hồi:
                                                               Xuyên giáp
                                                               40%

M14   Hư Thiên      Băng Khôi      740K /         Hư Thiên     8.9M / 220K /
      Điện          Lỗi / Hỏa      46.500 /       Băng Hoàng   70.000 —
                    Điểu / Hư      17.500                      Tuyệt Đối
                    Thiên Vệ                                   Đóng Băng:
                                                               FREEZE 3s

M15   Ngoại Hải     Hải Xà         1.25M /        Thâm Hải     15M / 380K /
      Phong Bạo     Vương /        79.000 /       Cự Chương    120K — Xúc
                    Phong Tinh /   30.000                      Tu Quấn
                    Cự Quái                                    Quanh: STUN
                                                               + POISON


[Ngắt trang nguồn]

3.4. Cảnh Giới 4: Nguyên Anh Kỳ (Đại Tấn Hoàng Triều)
Map         Tên Bản Đồ    3 Quái         Chỉ Số          Boss Bí       Chỉ Số Boss
                          Thường (Q1     Chuẩn Quái      Cảnh (12h,    (HP / Công /
                          / Q2 / Q3)     (HP / Công /    18h, 21h)     Thủ) & Kỹ
                                         Thủ)                          Năng

M16         Mộ Lan Thảo   Mộ Lan Pháp    2.4M / 140K /   Mộ Lan        28.8M / 670K
            Nguyên        Sư / Lang Kỵ   52.000          Thần Sư       / 210K — Vu
                          / Vu Tộc                                     Chú:
                                                                       SILENCE +
                                                                       BURN

M17         Thiên Lan     Thánh Điện    4.1M / 240K /    Thiên Lan     49.2M /
            Thánh Điện    Vệ / Linh Mộc 88.000           Thánh Thú     1.15M / 350K
                          Nhân /                                       — Thánh
                          Quang Thú                                    Quang:
                                                                       SHIELD 30%
                                                                       HP

M18         Âm Minh Chi   Âm Hồn Thú 7.0M / 410K /       Quỷ Vương     84M / 1.95M /
            Địa           / La Sát Quỷ / 150K            Âm Minh       600K — Phệ
                          Bạch Cốt                                     Hồn:
                          Tinh                                         LIFESTEAL
                                                                       50%

M19         Côn Ngô Sơn Ngân Sí Dạ       12M / 700K /    Ngân Sí Thi   144M / 3.35M
                        Xoa / Luyện      255K            Vương         / 1.02M —
                        Thi / Kim Từ                                   Thi Độc Bạo:
                        Mộc                                            POISON x3
                                                                       tầng

M20         Trụy Ma Cốc   Hắc Ám Ma      20.5M / 1.2M    Cổ Ma Chân    246M / 5.75M
                          Tu / Không     / 435K          Thân          / 1.75M —
                          Gian Bạo /                                   Ma Âm Quán
                          Ma Yêu                                       Nhĩ:
                                                                       SILENCE 4s


[Ngắt trang nguồn]

3.5. Cảnh Giới 5: Hóa Thần Kỳ (Chu Tước Tinh Vực)
Map         Tên Bản Đồ     3 Quái        Chỉ Số          Boss Bí       Chỉ Số Boss
                           Thường (Q1    Chuẩn Quái      Cảnh (12h,    (HP / Công /
                           / Q2 / Q3)    (HP / Công /    18h, 21h)     Thủ) & Kỹ
                                         Thủ)                          Năng

M21         Chu Tước       Chu Tước Vệ   40M / 2.2M /    Chu Tước      480M / 10.5M
            Tinh           / Hỏa Linh    800K            Tử            / 3.2M —
                           Thú / Viêm                                  Chu Tước
                           Ma                                          Viêm: BURN
                                                                       4% HP/s

M22         Vũ Tiên Môn    Tiên Di Tộc / 68M / 3.7M /    Vũ Tiên Tàn   816M / 17.8M
                           Phù Văn Khôi 1.35M            Hồn           / 5.4M — Phá
                           / Kiếm Hồn                                  Giáp Kiếm:
                                                                       ARMOR_BREA
                                                                       K 50%

M23         Vực Ngoại      Tinh Không    115M / 6.3M /   Hư Không      1.38B /
            Chiến          Thú / Hư      2.3M            Phệ Hồn       30.2M / 9.2M
            Trường         Không Dạ                      Thú           — Không
                           Xoa / Trùng                                 Gian Trảm:
                                                                       Sát thương
                                                                       chuẩn

M24         Yêu Linh Chi   Cổ Yêu        195M / 10.7M Cổ Yêu Đại       2.34B /
            Địa            Tướng /       / 3.9M       Thánh            51.5M /
                           Huyết Mạch                                  15.6M —
                           Yêu / Đằng                                  Cuồng Hóa:
                           Xà                                          Tăng 100%
                                                                       Tốc đánh

M25         Băng Phong     Tuyết Vực     330M / 18.2M Băng Phách       3.96B /
            Cốc            Nhân / Hàn    / 6.6M       Hàn Nữ           87.5M /
                           Băng Giao /                                 26.5M —
                           Tuyết Điêu                                  Vĩnh Hằng
                                                                       Băng:
                                                                       FREEZE 3.5s


[Ngắt trang nguồn]

3.6. Cảnh Giới 6: Luyện Hư Kỳ (La Thiên Tinh Vực)
Map         Tên Bản Đồ      3 Quái          Chỉ Số         Boss Bí        Chỉ Số Boss
                            Thường (Q1      Chuẩn Quái     Cảnh (12h,     (HP / Công /
                            / Q2 / Q3)      (HP / Công /   18h, 21h)      Thủ) & Kỹ
                                            Thủ)                          Năng

M26         Thiên Vận       Thiên Vận Đệ 650M / 35M /      Thiên Vận      7.8B / 168M /
            Tông            Tử / Mệnh    12.5M             Lão Tổ         50M — Đoạt
                            Khôi / Tinh                                   Vận: Cướp 2
                            Thú                                           buff của
                                                                          người chơi

M27         Lôi Tiên Điện   Lôi Chiến       1.1B / 60M /   Lôi Tiên Tàn   13.2B / 288M
                            Hồn / Tử Lôi    21.2M          Niệm           / 85M — Cửu
                            Thú / Điện                                    Thiên Lôi:
                            Nhân                                          STUN 3s +
                                                                          BURN

M28         Vẫn Tiên        Hoang Cổ        1.85B / 102M   Thượng Cổ      22.2B / 490M
            Hoang           Khôi / Tâm      / 36M          Ma Quân        / 144M —
            Nguyên          Ma Ảnh /                                      Tâm Ma Dẫn:
                            Oán Linh                                      REFLECT
                                                                          40%

M29         Ma Vân Hải      Ma Hải Giao / 3.15B / 173M     Ma Hải Chi     37.8B / 830M
                            Hắc Thủy Xà / 61M              Chủ            / 245M —
                            / Ma Linh                                     Hắc Thủy
                                                                          Thực:
                                                                          POISON +
                                                                          SILENCE

M30         Táng Tiên Trì   Cổ Tiên Thi /   5.35B / 295M   Táng Tiên      64.2B / 1.42B
                            Tiên Huyết      / 104M         Thi Hoàng      / 416M — Bất
                            Thảo / Phệ                                    Tử Thi: Hồi
                            Trùng                                         sinh 1 lần
                                                                          (30% HP)


[Ngắt trang nguồn]

3.7. Cảnh Giới 7: Hợp Thể Kỳ (Phong Nguyên Đại Lục - Linh Giới)
Map         Tên Bản Đồ    3 Quái          Chỉ Số           Boss Bí       Chỉ Số Boss
                          Thường (Q1      Chuẩn Quái       Cảnh (12h,    (HP / Công /
                          / Q2 / Q3)      (HP / Công /     18h, 21h)     Thủ) & Kỹ
                                          Thủ)                           Năng

M31         Thiên Uyên    Dị Tộc Thám     10.5B / 560M     Dị Tộc Đại    126B / 2.7B /
            Thành         Tử / Giác Si    / 200M           Tướng         800M —
                          Tộc / Phản                                     Trảm Linh
                          Đồ                                             Đao:
                                                                         ARMOR_BREA
                                                                         K + BLEED

M32         Minh Hà Chi   Minh Hà Quỷ     17.8B / 950M     Minh Hà Lão   213B / 4.56B
            Địa           / Âm Phong      / 340M           Tổ            / 1.36B —
                          Thú / Hoàng                                    Minh Hà
                          Tuyền Xà                                       Thủy: Cấm
                                                                         hồi máu
                                                                         100%

M33         Man Hoang     Man Hoang       30.2B / 1.6B /   Man Hoang     362B / 7.75B
            Thế Giới      Cự Thú / Kim    580M             Thú Vương     / 2.32B —
                          Mao Hầu /                                      Thú Vương
                          Diễm Chu                                       Hống: STUN
                                                                         3s

M34         Mộc Tộc       Thụ Nhân /      51.5B / 2.75B    Mộc Tộc       618B / 13.2B
            Lãnh Địa      Đằng Giáp       / 980M           Thánh Tổ      / 3.92B —
                          Binh / Thanh                                   Vạn Mộc Hồi
                          Mộc Linh                                       Xuân: Hồi 3%
                                                                         HP/s

M35         Quảng Hàn     Quảng Hàn       87.5B / 4.68B    Bắc Minh      1.050B /
            Giới          Vệ / Tinh       / 1.66B          Côn Bằng      22.5B / 6.65B
                          Khôi / Nguyệt                                  — Thôn
                          Thố                                            Thiên: Hút
                                                                         15% HP tối
                                                                         đa


[Ngắt trang nguồn]

3.8. Cảnh Giới 8: Đại Thừa Kỳ (Ma Giới & Linh Giới Giao Tuyến)
Map         Tên Bản Đồ    3 Quái         Chỉ Số          Boss Bí      Chỉ Số Boss
                          Thường (Q1     Chuẩn Quái      Cảnh (12h,   (HP / Công /
                          / Q2 / Q3)     (HP / Công /    18h, 21h)    Thủ) & Kỹ
                                         Thủ)                         Năng

M36         Huyết Thiên   Hoàng Tộc      170B / 9.0B /   Huyết        2.040B /
            Đại Lục       Ma / Huyết     3.2B            Quang Ma     43.2B / 12.8B
                          Thú / Thiên                    Tổ           — Huyết
                          Ngoại Ma                                    Thần Trảm:
                                                                      LIFESTEAL
                                                                      60%

M37         Ma Nguyên     Ma Long /      290B / 15.3B    Ma Nguyên    3.480B /
            Hải           Hắc Ám Tinh    / 5.4B          Chân Tổ      73.5B / 21.6B
                          Linh / Thực                                 — Hắc Ám
                          Nhật Thú                                    Thôn Phệ:
                                                                      SILENCE 4s

M38         Tiểu Cực      Cửu Vĩ Tuyết   490B / 26.0B    Băng         5.880B /
            Cung          Hồ / Băng      / 9.2B          Phượng Chi   125B / 36.8B
                          Phượng /                       Linh         — Tuyệt Đối
                          Hàn Vệ                                      Độ Không:
                                                                      FREEZE 4s

M39         Đăng Tiên     Bán Tiên       835B / 44.2B    Bán Tiên     10.020B /
            Đài           Khôi / Hộ      / 15.6B         Lão Quái     212B / 62.5B
                          Đạo Nhân /                                  — Tiên Phàm
                          Thiên Binh                                  Cách: Phản
                                                                      đòn 50%

M40         Phi Thăng     Cửu Thiên      1.420B / 75B    Cửu Thiên    17.040B /
            Lôi Trì       Lôi Linh /     / 26.5B         Lôi Đế       360B / 106B
                          Kiếp Lôi Thú                                — Thiên Kiếp
                          / Lôi Ảnh                                   Phạt: Chém
                                                                      30% HP
                                                                      chuẩn


[Ngắt trang nguồn]

3.9. Cảnh Giới 9: Chân Tiên Kỳ (Bắc Hàn Tiên Vực - Tiên Giới)
Map         Tên Bản Đồ     3 Quái         Chỉ Số         Boss Bí        Chỉ Số Boss
                           Thường (Q1     Chuẩn Quái     Cảnh (12h,     (HP / Công /
                           / Q2 / Q3)     (HP / Công /   18h, 21h)      Thủ) & Kỹ
                                          Thủ)                          Năng

M41         Bắc Hàn Tiên   Tiên Cung      2.800B /       Bắc Hàn        33.600B /
            Cung           Cảnh / Hàn     145B / 50B     Tiên Quân      700B / 200B
                           Tiên Hạc /                                   — Tiên Quân
                           Tiên Khôi                                    Uy: Giảm
                                                                        40% Công
                                                                        địch

M42         Minh Hàn       Huyền Tiên     4.750B /       Minh Hàn       57.000B /
            Tiên Phủ       Ác Thi / Oán   246B / 85B     Đạo Tổ         1.180B /
                           Linh / Pháp                                  340B —
                           Thú                                          Trảm Tam
                                                                        Thi: STUN +
                                                                        Xóa buff

M43         Man Hoang      Chân Linh      8.100B /       Chân Linh      97.200B /
            Tiên Vực       Hậu Duệ /      420B / 145B    Bạch Trạch     2.010B /
                           Bạch Trạch /                                 580B —
                           Kỳ Lân                                       Thấu Thị: Né
                                                                        tránh 50%
                                                                        đòn đánh

M44         Hôi Giới       Hôi Tiên       13.800B /      Hôi Giới Chi   165.600B /
                           Chiến Sĩ /     715B / 246B    Chủ            3.430B /
                           Phệ Tiên Ma                                  985B — Tử
                           / Tử Khí                                     Khí Thực:
                                                                        Trừ 5% HP
                                                                        tối đa/s

M45         Nam Thiên      Kim Giáp Vệ    23.500B /      Thiên Đình     282.000B /
            Môn            / Trảm Tiên    1.220B /       Giám Sát Sứ    5.850B /
                           Tướng /        420B                          1.680B —
                           Thần Thú                                     Pháp Tắc
                                                                        Xóa Sổ: Xóa
                                                                        toàn bộ Buff
                                                                        + Gây 1000%


[Ngắt trang nguồn]

 Map            Tên Bản Đồ    3 Quái         Chỉ Số         Boss Bí        Chỉ Số Boss
                              Thường (Q1     Chuẩn Quái     Cảnh (12h,     (HP / Công /
                              / Q2 / Q3)     (HP / Công /   18h, 21h)      Thủ) & Kỹ
                                             Thủ)                          Năng

                                                                           sát thương
                                                                           chuẩn




4. HỆ THỐNG NGUYÊN LIỆU ĐỘT PHÁ & TỈ LỆ RƠI TỪ BOSS
(PITY SYSTEM)
Khi đạt Tầng 10 (Đỉnh Phong) của mỗi Đại Cảnh Giới và đầy 100% EXP, người chơi bắt buộc
phải có Đột Phá Đan (từ Luyện đan) VÀ Nguyên Liệu Đột Phá Đặc Biệt (chỉ rơi từ Boss cuối
của mỗi Đại Cảnh Giới) mới có thể thăng cấp.


 Mốc Đột Phá    Nguyên Liệu Số Lượng         Boss Rơi       Tỉ Lệ Rơi      Bảo Hiểm
 Đại Cảnh       Đặc Biệt Yêu Cần             Nguyên Liệu    Gốc (Drop      (Pity - Chắc
 Giới           Cầu                                         Rate)          chắn rơi 1
                                                                           cái)

 1. Luyện Khí   Trúc Cơ Đạo   3 viên         Boss Map 5:    35.0%          Tối đa 3 lượt
 -> Trúc Cơ     Thạch                        Thanh Nhan                    đánh Boss
                                             Lão Tổ

 2. Trúc Cơ -> Thiên Linh     5 quả          Boss Map 10: 20.0%            Tối đa 5 lượt
 Kim Đan       Quả Vương                     Việt Quốc                     đánh Boss
                                             Hắc Hoàng
                                             Đế

 3. Kim Đan     Vạn Năm       3 khúc         Boss Map 15: 12.0%            Tối đa 8 lượt
 -> Nguyên      Dưỡng Hồn                    Thâm Hải Cự                   đánh Boss
 Anh            Mộc                          Chương

 4. Nguyên      Ngũ Hành      2 viên         Boss Map 20: 8.0%             Tối đa 12
 Anh -> Hóa     Linh Tinh                    Cổ Ma Chân                    lượt đánh
 Thần           Bản Nguyên                   Thân                          Boss

 5. Hóa Thần    Hư Không      2 viên         Boss Map 25: 5.0%             Tối đa 15
 -> Luyện Hư    Hạt Nhân                     Băng Phách                    lượt đánh
                                             Hàn Nữ                        Boss


[Ngắt trang nguồn]

 Mốc Đột Phá    Nguyên Liệu Số Lượng         Boss Rơi       Tỉ Lệ Rơi    Bảo Hiểm
 Đại Cảnh       Đặc Biệt Yêu Cần             Nguyên Liệu    Gốc (Drop    (Pity - Chắc
 Giới           Cầu                                         Rate)        chắn rơi 1
                                                                         cái)

 6. Luyện Hư    Thượng Cổ     1 bình         Boss Map 30: 3.0%           Tối đa 20
 -> Hợp Thể     Ma Huyết                     Táng Tiên Thi               lượt đánh
                                             Hoàng                       Boss

 7. Hợp Thể     Hỗn Độn Chi   1 khối         Boss Map 35: 1.5%           Tối đa 30
 -> Đại Thừa    Nguyên                       Bắc Minh                    lượt đánh
                                             Côn Bằng                    Boss

 8. Đại Thừa    Hồng Mông     1 đạo          Boss Map 40: 0.5%           Tối đa 50
 -> Chân Tiên   Tử Khí                       Cửu Thiên                   lượt đánh
                                             Lôi Đế                      Boss

 9. Chân Tiên   Chư Thiên     1 ấn           Boss Map 45: 0.2%           Tối đa 100
 -> Đạo Tổ      Pháp Tắc Ấn                  Thiên Đình                  lượt đánh
                                             Giám Sát Sứ                 Boss




5. HỆ THỐNG 45 CÔNG PHÁP & 15 PHÁP BẢO (KỸ NĂNG
ĐỘC QUYỀN)
Người chơi được trang bị tối đa 5 Công Pháp và 5 Pháp Bảo cùng lúc.


5.1. Danh Sách 45 Công Pháp Theo 9 Cảnh Giới (Chỉ Số Bị Động & Kỹ
Năng Chủ Động)

Cấp 1: Luyện Khí Kỳ (Map 1 - 5)
   1.​ Trường Xuân Công (Mộc): Bị động +10% HP. Active (CD 14s): Hồi ngay 15% HP tối đa
       và xóa 1 hiệu ứng POISON.
   2.​ Khống Hạc Công (Phong): Bị động +10% Tốc đánh. Active (CD 10s): Chưởng lực đẩy
       lùi quái, gây 160% sát thương vật lý.
   3.​ Liệt Hỏa Quyết (Hỏa): Bị động +12% Công. Active (CD 12s): Phóng cầu lửa gây 180%
       sát thương kèm BURN (2% HP/s trong 4s).
   4.​ Huyền Băng Chưởng (Thủy): Bị động +12% Thủ. Active (CD 15s): Gây 150% sát
       thương và làm chậm 30% tốc đánh địch trong 3s.


[Ngắt trang nguồn]

   5.​ Thanh Phong Kiếm Quyết (Kim): Bị động +15% Công Kiếm. Active (CD 11s): Chém 3
       nhát kiếm khí gây tổng 210% sát thương kèm BLEED.

Cấp 2: Trúc Cơ Kỳ (Map 6 - 10)
   6.​ Thanh Nguyên Kiếm Quyết (Kim): Bị động +20% Công, +8% Bạo. Active (CD 15s):
       Đại Canh Kiếm Trận – Gây 320% sát thương + ARMOR_BREAK (-30% Thủ).
   7.​ Đại Lực Ngưu Ma Kinh (Thổ): Bị động +25% HP, +15% Thủ. Active (CD 20s): Tạo
       SHIELD bằng 25% HP tối đa trong 6s.
   8.​ Bách Độc Chân Kinh (Mộc): Bị động +20% Sát thương độc. Active (CD 16s): Phun
       sương độc gây 220% sát thương + 2 tầng POISON.
   9.​ Huyết Ảnh Độn Pháp (Ám): Bị động +15% Né tránh. Active (CD 18s): Đòn đánh tiếp
       theo gây 280% sát thương và LIFESTEAL 40%.
   10.​Linh Quy Hưởng Thọ Công (Thủy): Bị động +25% Hồi máu. Active (CD 22s): Hồi 4%
       HP/giây trong 5 giây và giảm 20% sát thương nhận vào.

Cấp 3: Kim Đan Kỳ (Map 11 - 15)
   11.​Tử Tiêu Thần Lôi Quyết (Lôi): Bị động +25% Sát thương Kỹ năng. Active (CD 18s):
       Giáng sét gây 400% sát thương + STUN 2.0s.
   12.​Băng Phách Hàn Quang (Băng): Bị động +20% Thủ, +10% Kháng Bạo. Active (CD
       20s): Gây 350% sát thương + FREEZE 2.5s.
   13.​Thiên Cơ Khôi Lỗi Thuật (Kim): Bị động +20% Tốc đánh. Active (CD 25s): Triệu hồi
       Khôi Lỗi (50% chỉ số chủ nhân) đánh phụ trong 10s.
   14.​Hư Thiên Ma Công (Ma): Bị động +30% Sát thương Bạo kích. Active (CD 20s): Gây
       420% sát thương, nếu địch đang BLEED thì chắc chắn Bạo kích.
   15.​Thanh Liên Kiếm Điển (Mộc/Kim): Bị động +25% Công, +15% HP. Active (CD 16s):
       Nở hoa sen kiếm gây 380% sát thương diện rộng + Hồi 10% HP.

Cấp 4: Nguyên Anh Kỳ (Map 16 - 20)
   16.​Đại Diễn Quyết (Thần Thức): Bị động -15% Hồi chiêu, +25% Công. Active (CD 20s):
       Thần Thức Câu Diệt – Gây 500% sát thương + SILENCE 3.5s.
   17.​Mộ Lan Vu Tộc Bí Kinh (Hỏa): Bị động +30% Sát thương đốt. Active (CD 18s): Nguyền
       rủa gây 450% sát thương + BURN 3 tầng + ARMOR_BREAK.
   18.​Côn Ngô Kiếm Trận (Kim): Bị động +35% Công, +15% Xuyên giáp. Active (CD 15s):
       Kiếm trận xoay tròn gây 550% sát thương vật lý.
   19.​Huyết Hải Ma Kinh (Ma): Bị động +40% HP, +15% Hút máu. Active (CD 28s): Tạo biển
       máu gây 480% sát thương và LIFESTEAL 50%.
   20.​Lục Dục Ma Công (Ám): Bị động +20% Bạo kích, +20% Né. Active (CD 24s): Làm rối
       loạn thần trí Boss, giảm 35% Công kích của Boss trong 6s.

Cấp 5: Hóa Thần Kỳ (Map 21 - 25)
   21.​Ngũ Hành Hóa Thần Quyết (Ngũ Hành): Bị động +30% Sát thương khắc hệ. Active
       (CD 16s): Xoay vòng 5 hệ gây 650% sát thương + SHIELD 25% HP.


[Ngắt trang nguồn]

   22.​Chu Tước Phần Thiên Kinh (Hỏa): Bị động +45% Công Hỏa. Active (CD 22s): Triệu
       hồi Chu Tước gây 750% sát thương, kích nổ toàn bộ tầng BURN lập tức.
   23.​Vũ Tiên Pháp Tắc (Kim): Bị động +35% Xuyên giáp. Active (CD 19s): Bắn tia sáng
       xuyên thấu gây 700% sát thương bỏ qua 50% Phòng thủ.
   24.​Tinh Không Thú Biến (Thổ/Thể): Bị động +45% HP, +25% Thủ. Active (CD 30s): Hóa
       thân Cự Thú tăng 50% HP tối đa và REFLECT 35% trong 8s.
   25.​Hư Vô Đại Pháp (Không Gian): Bị động +25% Né tránh. Active (CD 24s): Tiến vào hư
       không miễn nhiễm sát thương trong 2.5s và tăng 50% Công trong 5s.

Cấp 6: Luyện Hư Kỳ (Map 26 - 30)
   26.​Đạo Tâm Chủng Ma Đại Pháp (Ma): Bị động +45% Công, +20% Hút máu. Active (CD
       22s): Gieo hạt giống Tâm ma, sau 5s phát nổ bằng 45% tổng sát thương đã gây ra.
   27.​Thiên Vận Mệnh Thuật (Thần Thức): Bị động +30% Tỉ lệ Bạo kích. Active (CD 25s):
       Trong 5 giây tiếp theo, 100% đòn đánh đều là Bạo kích.
   28.​Lôi Tiên Truyền Thừa (Lôi): Bị động +55% Sát thương Lôi. Active (CD 20s): Cửu Tiêu
       Thần Lôi – Gây 950% sát thương + STUN 3.0s.
   29.​Vẫn Tiên Cổ Kinh (Ám): Bị động +40% Sát thương cuối. Active (CD 26s): Oán khí
       thượng cổ gây 850% sát thương chuẩn + POISON cực độc.
   30.​Tâm Ma Trảm Đạo Quyết (Kim): Bị động +50% Kháng Tâm Ma, +40% Công. Active
       (CD 24s): Chém đứt phòng ngự địch (ARMOR_BREAK 50%) và gây 900% sát thương.

Cấp 7: Hợp Thể Kỳ (Map 31 - 35)
   31.​Phạm Thánh Chân Ma Công (Thể Tu): Bị động +60% HP, +35% Phản đòn. Active (CD
       30s): Pháp Thiên Tượng Địa – Tăng 100% Công, miễn khống chế trong 8s.
   32.​Minh Hà Huyết Kinh (Thủy/Ma): Bị động +50% Công, +25% Hút máu. Active (CD 25s):
       Gây 1.200% sát thương, cấm mục tiêu hồi máu trong 8s.
   33.​Man Hoang Cổ Tượng Công (Thổ): Bị động +80% HP tối đa. Active (CD 22s): Giẫm
       đạp gây sát thương bằng 25% HP tối đa của bản thân + STUN 2.5s.
   34.​Mộc Tộc Trường Sinh Quyết (Mộc): Bị động +60% Hồi phục. Active (CD 35s): Hồi lập
       tức 50% HP tối đa, tạo SHIELD 30% HP và xóa mọi Debuff.
   35.​Quảng Hàn Tiên Kinh (Băng): Bị động +45% Toàn chỉ số. Active (CD 28s): Ánh trăng
       tuyệt đối gây 1.100% sát thương + FREEZE 3.5s.

Cấp 8: Đại Thừa Kỳ (Map 36 - 40)
   36.​Cửu Chuyển Luân Hồi Quyết (Thời Gian): Bị động +65% Toàn chỉ số. Active (CD
       40s): Đưa HP về mức cao nhất trong 5s trước đó và giảm 50% CD các kỹ năng khác.
   37.​Huyết Thiên Ma Tôn Kinh (Ma): Bị động +85% Công kích. Active (CD 24s): Hiến tế
       10% HP hiện tại để chém 1 đòn gây 1.800% sát thương + BLEED.
   38.​Tiểu Cực Hàn Tinh Quyết (Băng): Bị động +75% Thủ & HP. Active (CD 28s): Băng
       phong vạn dặm gây 1.400% sát thương + Giảm 50% Tốc đánh Boss.
   39.​Đăng Tiên Pháp Tắc Quyết (Tiên): Bị động +90% Sát thương Kỹ năng. Active (CD
       26s): Tiên quang chiếu rọi gây 1.600% sát thương chuẩn xuyên mọi lớp giáp.


[Ngắt trang nguồn]

     40.​Cửu Tiêu Kiếp Lôi Quyết (Lôi): Bị động +100% Sát thương Bạo kích. Active (CD 30s):
         Giáng Thiên Kiếp gây 1.750% sát thương + STUN 3.5s.

Cấp 9: Chân Tiên Kỳ (Map 41 - 45)
     41.​Thời Gian Pháp Tắc Chân Kinh: Bị động +120% Toàn chỉ số. Active (CD 25s): Tuế
         Nguyệt Như Đao – Ngưng đọng thời gian của Boss 4s, mọi sát thương gây ra nhân đôi
         (x2).
     42.​Không Gian Tạo Hóa Quyết: Bị động +100% Xuyên giáp & Né tránh. Active (CD 28s):
         Xé rách không gian gây 2.500% sát thương + SILENCE 5s.
     43.​Bắc Hàn Tiên Cung Đế Kinh: Bị động +150% Công & Thủ. Active (CD 35s): Triệu hồi
         Tiên Quân Pháp Tướng đánh 5 đòn liên hoàn (Tổng 3.000% sát thương).
     44.​Hồng Mông Khai Thiên Kinh: Bị động +200% Sát thương Bạo kích. Active (CD 45s):
         Khai Thiên Tích Địa – Đòn đánh duy nhất gây 4.000% sát thương chuẩn.
     45.​Bất Tử Bất Diệt Tiên Công: Bị động +250% HP tối đa. Active / Passive (CD 180s): Khi
         nhận sát thương tử vong, lập tức Hồi sinh với 100% HP và Bất tử 3 giây.




5.2. Danh Sách 15 Pháp Bảo & Kỹ Năng Độc Quyền (Trang Bị Vào 5 Slot)
Pháp bảo có thanh Năng lượng (Linh lực) riêng, tự động tung kỹ năng độc quyền theo chu kỳ.


 STT                Tên Pháp Bảo      Cảnh Giới Mở      Phân Loại          Kỹ Năng Độc
                                                                           Quyền Của
                                                                           Pháp Bảo (Tự
                                                                           Động Thi Triển)

 1                  Hoàng Phong       Luyện Khí         Quần chiến         [Cuồng Phong
                    Kỳ                                                     Quét Lá] (CD
                                                                           12s): Gom toàn
                                                                           bộ quái lại 1
                                                                           điểm, gây 200%
                                                                           sát thương +
                                                                           BLEED.

 2                  Kim Quang Đao Luyện Khí             Phá giáp           [Kim Quang
                                                                           Trảm] (CD 10s):
                                                                           Chém mạnh gây
                                                                           220% sát
                                                                           thương và
                                                                           ARMOR_BREAK
                                                                           (-25% Thủ)
                                                                           trong 5s.


[Ngắt trang nguồn]

STT   Tên Pháp Bảo    Cảnh Giới Mở   Phân Loại        Kỹ Năng Độc
                                                      Quyền Của
                                                      Pháp Bảo (Tự
                                                      Động Thi Triển)

3     Huyết Văn       Trúc Cơ        Hút máu          [Huyết Ảnh
      Kiếm                                            Thực Tâm] (CD
                                                      14s): Đâm
                                                      xuyên mục tiêu
                                                      gây 300% sát
                                                      thương,
                                                      LIFESTEAL
                                                      50% lượng máu.

4     Huyền Vũ        Trúc Cơ        Phòng ngự        [Huyền Vũ Hộ
      Thuẫn                                           Thân] (CD 18s):
                                                      Tạo SHIELD
                                                      bằng 25% HP tối
                                                      đa và phản đòn
                                                      REFLECT 20%
                                                      trong 5s.

5     Thanh Trúc      Kim Đan        Sát thương đơn   [Thiên Kiếm
      Phong Vân                                       Hợp Nhất] (CD
      Kiếm                                            15s): Hóa thành
                                                      cự kiếm vàng
                                                      chém 550% sát
                                                      thương + STUN
                                                      1.5s.

6     Hư Thiên Đỉnh   Kim Đan        Khống chế        [Càn Khôn Trấn
                                                      Áp] (CD 22s):
                                                      Thả đỉnh khổng
                                                      lồ đè bẹp mục
                                                      tiêu, gây 450%
                                                      sát thương +
                                                      STUN 2.5s +
                                                      Giảm 30% Công
                                                      địch.

7     Phong Lôi Sí    Nguyên Anh     Tốc độ / Buff    [Thuấn Di Lôi
      (Cánh)                                          Động] (CD
                                                      20s): Tăng 50%


[Ngắt trang nguồn]

STT   Tên Pháp Bảo    Cảnh Giới Mở   Phân Loại    Kỹ Năng Độc
                                                  Quyền Của
                                                  Pháp Bảo (Tự
                                                  Động Thi Triển)

                                                  Tốc đánh, 30%
                                                  Bạo kích và 30%
                                                  Né tránh trong 6
                                                  giây.

8     Cửu Khúc Linh   Nguyên Anh     Hồi phục     [Mộc Linh Tẩm
      Tham Trượng                                 Bổ] (CD 25s):
                                                  Hồi lập tức 30%
                                                  HP tối đa và xóa
                                                  sạch mọi trạng
                                                  thái bất lợi
                                                  (Debuff).

9     Ngũ Hành Hoàn Hóa Thần         Ngũ hành     [Ngũ Hành Trói
                                                  Buộc] (CD 18s):
                                                  Gây 700% sát
                                                  thương khắc hệ
                                                  + SILENCE 3s +
                                                  BURN 5s.

10    Trảm Tiên Hồ    Hóa Thần       Trảm sát     [Thỉnh Bảo Bối
      Lô                                          Xoay Mình] (CD
                                                  20s): Gây 800%
                                                  sát thương. Nếu
                                                  mục tiêu dưới
                                                  20% HP, sát
                                                  thương nhân ba
                                                  (x3).

11    Phá Hư          Luyện Hư       Xuyên thấu   [Nhất Thương
      Thương                                      Phá Hư] (CD
                                                  16s): Đâm thủng
                                                  không gian gây
                                                  1.000% sát
                                                  thương chuẩn
                                                  (Bỏ qua 100%
                                                  Thủ).


[Ngắt trang nguồn]

STT   Tên Pháp Bảo   Cảnh Giới Mở   Phân Loại   Kỹ Năng Độc
                                                Quyền Của
                                                Pháp Bảo (Tự
                                                Động Thi Triển)

12    Hoàng Tuyền    Hợp Thể        Diện rộng   [Minh Hà Hàng
      Đồ                                        Lâm] (CD 24s):
                                                Cuốn địch vào
                                                tranh, gây 300%
                                                sát thương/giây
                                                trong 4s +
                                                POISON + Cấm
                                                hồi máu.

13    Côn Ngô Kiếm   Hợp Thể        Chí mạng    [Nhất Kiếm Phá
                                                Vạn Pháp] (CD
                                                20s): Xóa toàn
                                                bộ SHIELD của
                                                Boss, gây
                                                1.500% sát
                                                thương Bạo
                                                kích.

14    Hỗn Độn        Đại Thừa       Bảo mạng    [Chung Thanh
      Chung                                     Chấn Vạn Cổ]
                                                (CD 35s): Làm
                                                choáng toàn
                                                màn hình STUN
                                                3.5s và giúp chủ
                                                nhân Bất tử
                                                2.5s.

15    Chưởng Thiên   Chân Tiên      Chí Bảo     [Lục Dịch Tạo
      Bình                                      Hóa] (CD 45s):
                                                Lập tức Reset
                                                100% thời gian
                                                hồi chiêu của 4
                                                Pháp bảo và 5
                                                Công pháp, tăng
                                                100% sát
                                                thương trong 6s.


[Ngắt trang nguồn]

6. HỆ THỐNG 135 BỘ TRANG BỊ THEO CẢNH GIỚI & HỆ PHÁI
  ●​ Quy mô: 9 Đại Cảnh Giới $\times$ 5 Bậc (Mỗi Map 1 Bậc) $\times$ 3 Hệ Phái (Kiếm Tu
     / Pháp Tu / Thể Tu) = 135 Bộ Trang Bị (810 món rời).
  ●​ 6 Món trong 1 Bộ: Vũ Khí (Tăng Công), Mũ (HP + Thủ), Áo Giáp (HP + Thủ), Hộ Uyển
     (Công + Chính xác), Giày (HP + Tốc độ/Né), Ngọc Bội (Bạo kích + Thuộc tính đặc biệt).
  ●​ Hệ số Phẩm chất khi Chế tạo (Rèn đồ):
         ●​ Trắng (Phàm): $1.0\times$ chỉ số | Lục (Hạ): $1.2\times$ | Lam (Trung):
            $1.5\times$ | Tím (Thượng): $2.0\times$ | Cam/Đỏ (Cực phẩm/Tiên phẩm):
            $3.0\times$ chỉ số gốc + Kích hoạt dòng Hiệu ứng Set mạnh nhất.


6.1. Hiệu Ứng Bộ Cố Định Theo 3 Hệ Phái (Set Bonus)
  ●​ Bộ Hệ Kiếm Tu (Chuyên Đánh Thường / Tốc Đánh / Bạo Kích / Chảy Máu):
        ●​ 4 Món: +25% Tốc độ đánh, +20% Tỉ lệ Bạo kích.
        ●​ 6 Món: Đòn đánh thường có 25% tỉ lệ phóng ra Kiếm Khí gây 250% sát thương
           vật lý kèm BLEED và ARMOR_BREAK.
  ●​ Bộ Hệ Pháp Tu (Chuyên Kỹ Năng Công Pháp / Sát Thương Ngũ Hành / Giảm CD):
        ●​ 4 Món: +35% Sát thương Kỹ năng, Giảm 20% Thời gian hồi chiêu (Cooldown).
        ●​ 6 Món: Khi tung kỹ năng Công pháp, có 25% tỉ lệ kích hoạt Pháp Tắc Cộng
           Hưởng (Tự động tung kỹ năng đó thêm 1 lần nữa không tốn CD).
  ●​ Bộ Hệ Thể Tu (Chuyên HP / Phòng Thủ / Khiên Chắn / Phản Đòn):
        ●​ 4 Món: +40% Giới hạn HP tối đa, +25% Giảm sát thương nhận vào.
        ●​ 6 Món: Mở đầu trận nhận SHIELD bằng 30% HP. Luôn duy trì hiệu ứng REFLECT
           phản lại 35% sát thương nhận vào.


6.2. Bảng Tổng Hợp 135 Bộ Trang Bị & Chỉ Số Chuẩn (Tính theo Phẩm
Cam Bậc 1 -> Bậc 5 của từng Cảnh giới)
Cảnh Giới                     Tên 5 Bậc Trang Bị (Áp        Tổng Chỉ Số Cả Bộ 6 Món
                              dụng cho cả 3 đuôi: Kiếm      (Từ Bậc Đầu -> Bậc Cuối
                              Trang / Pháp Bào / Chiến      Cảnh Giới)
                              Giáp)

1. Luyện Khí                  1. Thanh Phong -> 2. Huyền    - Công: +150 $\rightarrow$
                              Thiết -> 3. Trảm Yêu -> 4.    +850
(Bậc 1 -> 5)                  Truy Phong -> 5. Lưu Vân      - HP: +1.800 $\rightarrow$
                                                            +10.000

                                                            - Thủ: +50 $\rightarrow$
                                                            +300


[Ngắt trang nguồn]

Cảnh Giới        Tên 5 Bậc Trang Bị (Áp          Tổng Chỉ Số Cả Bộ 6 Món
                 dụng cho cả 3 đuôi: Kiếm        (Từ Bậc Đầu -> Bậc Cuối
                 Trang / Pháp Bào / Chiến        Cảnh Giới)
                 Giáp)

2. Trúc Cơ       6. Ngự Phong -> 7. Tử Điện      - Công: +1.400 $\rightarrow$
                 -> 8. Bạch Hồng -> 9. Phá       +8.000
(Bậc 6 -> 10)    Quân -> 10. Thiên Đạo           - HP: +18.000 $\rightarrow$
                                                 +110.000

                                                 - Thủ: +500 $\rightarrow$
                                                 +3.200

3. Kim Đan       11. Thanh Trúc -> 12. Kinh      - Công: +13.000
                 Lôi -> 13. Phá Hải -> 14.       $\rightarrow$ +75.000
(Bậc 11 -> 15)   Trảm Giao -> 15. Cửu            - HP: +200.000 $\rightarrow$
                 Chuyển                          +1.200.000

                                                 - Thủ: +5.500 $\rightarrow$
                                                 +32.000

4. Nguyên Anh    16. Thất Tinh -> 17. Trảm Ma    - Công: +125.000
                 -> 18. Côn Ngô -> 19. Bạch      $\rightarrow$ +720.000
(Bậc 16 -> 20)   Đế -> 20. Nguyên Anh            - HP: +2.2M $\rightarrow$
                                                 +13.5M

                                                 - Thủ: +55.000 $\rightarrow$
                                                 +350.000

5. Hóa Thần      21. Chu Tước -> 22. Vũ Tiên     - Công: +1.2M $\rightarrow$
                 -> 23. Trảm Thần -> 24. Tinh    +6.8M
(Bậc 21 -> 25)   Không -> 25. Vạn Kiếm           - HP: +24M $\rightarrow$
                                                 +150M

                                                 - Thủ: +600.000
                                                 $\rightarrow$ +3.8M

6. Luyện Hư      26. Phá Hư -> 27. Lôi Tiên ->   - Công: +11.5M $\rightarrow$
                 28. Vẫn Tiên -> 29. Thiên       +65M
(Bậc 26 -> 30)   Vận -> 30. Thái Hư              - HP: +260M $\rightarrow$
                                                 +1.6B


[Ngắt trang nguồn]

 Cảnh Giới                     Tên 5 Bậc Trang Bị (Áp         Tổng Chỉ Số Cả Bộ 6 Món
                               dụng cho cả 3 đuôi: Kiếm       (Từ Bậc Đầu -> Bậc Cuối
                               Trang / Pháp Bào / Chiến       Cảnh Giới)
                               Giáp)

                                                              - Thủ: +6.5M $\rightarrow$
                                                              +42M

 7. Hợp Thể                    31. Thiên Uyên -> 32. Trảm     - Công: +110M $\rightarrow$
                               Linh -> 33. Quảng Hàn -> 34.   +620M
 (Bậc 31 -> 35)                Thái Ất -> 35. Nhất Niệm       - HP: +2.8B $\rightarrow$
                                                              +18B

                                                              - Thủ: +70M $\rightarrow$
                                                              +450M

 8. Đại Thừa                   36. Huyết Thiên -> 37. Trảm    - Công: +1.05B $\rightarrow$
                               Đạo -> 38. Cửu Kiếp -> 39.     +6.0B
 (Bậc 36 -> 40)                Đăng Tiên -> 40. Bán Tiên      - HP: +30B $\rightarrow$
                                                              +200B

                                                              - Thủ: +750M $\rightarrow$
                                                              +5.0B

 9. Chân Tiên                  41. Bắc Hàn -> 42. Minh Hàn    - Công: +10B $\rightarrow$
                               -> 43. Trảm Tiên -> 44. Tru    +65B
 (Bậc 41 -> 45)                Tiên -> 45. Hồng Mông          - HP: +350B $\rightarrow$
                                                              +2.500B

                                                              - Thủ: +8.5B $\rightarrow$
                                                              +60B




7. HỆ THỐNG ĐAN DƯỢC, VẬT PHẨM & ĐỘ THUẦN THỤC
NGHỀ NGHIỆP

7.1. Tinh Gọn Hệ Thống Đan Dược Theo 9 Cảnh Giới (Tổng 45 Loại Đan
Cốt Lõi)
Để tránh loãng hệ thống, mỗi Đại Cảnh Giới chỉ có 5 Loại Đan Dược cốt lõi (9 Cảnh giới
$\times$ 5 = 45 loại đan).


[Ngắt trang nguồn]

  ●​ Giới hạn cắn thuốc (Anti-Inflation): Các loại đan tăng chỉ số vĩnh viễn (Công, HP, Thủ)
     bị giới hạn sử dụng tối đa 30 viên / mỗi cảnh giới.
  ●​ Đan Tu Vi: Giới hạn uống tối đa 10 viên / ngày (Phẩm chất đan càng cao, EXP nhận
     được trên mỗi viên càng lớn: Hạ phẩm $1\times$, Trung phẩm $1.5\times$, Thượng
     phẩm $2.2\times$, Đan Vân Cực Phẩm $3.5\times$).


Cảnh Giới      1. Đan Tu Vi   2. Đan Đột      3. Đan Công    4. Đan Khí      5. Đan
               (EXP/viên)     Phá (+Tỉ lệ)    Kích (Max      Huyết (Max      Phòng Ngự
                                              30v)           30v)            (Max 30v)

1. Luyện Khí   Hoàng Long     Trúc Cơ Đan     Long Hổ Đan    Bổ Huyết        Thiết Cốt
               Đan (+2.500    (+25% tỉ lệ)    (+15 Công/v)   Đan (+200       Đan (+6
               EXP)                                          HP/v)           Thủ/v)

2. Trúc Cơ     Hợp Khí Đan    Kết Đan Linh    Xích Dương     Huyền           Kim Cang
               (+35.000       Dược (+25%)     Đan (+120      Nguyên Đan      Đan (+45
               EXP)                           Công/v)        (+2.000         Thủ/v)
                                                             HP/v)

3. Kim Đan     Kết Kim Đan    Phá Anh Đan     Tử Dương       Long Huyết      Huyền Vũ
               (+600K EXP)    (+20% tỉ lệ)    Đan (+1.000    Đan (+18.000    Đan (+350
                                              Công/v)        HP/v)           Thủ/v)

4. Nguyên      Ngưng Anh      Vấn Đỉnh        Thiên Hỏa      Bất Tử Đan      Bàn Thạch
Anh            Đan (+12M      Đan (+20% tỉ    Đan (+8.500    (+160.000       Đan (+3.000
               EXP)           lệ)             Công/v)        HP/v)           Thủ/v)

5. Hóa Thần    Hóa Thần       Phá Hư Đan      Chu Tước       Huyết Hải       Bất Động
               Đan (+250M     (+15% tỉ lệ)    Đan (+70K      Đan (+1.5M      Đan (+25.000
               EXP)                           Công/v)        HP/v)           Thủ/v)

6. Luyện Hư    Luyện Hư       Dung Hợp        Lôi Viêm Đan   Hoang Cổ        Hư Không
               Đan (+5.5B     Đan (+15% tỉ    (+600K         Đan (+14M       Đan (+220K
               EXP)           lệ)             Công/v)        HP/v)           Thủ/v)

7. Hợp Thể     Hợp Đạo        Độ Kiếp Đan     Thái Dương     Chân Linh       Hỗn Độn Đan
               Đan (+120B     (+10% tỉ lệ)    Đan (+5M       Đan (+130M      (+2.0M
               EXP)                           Công/v)        HP/v)           Thủ/v)

8. Đại Thừa    Đại Thừa       Phi Thăng       Phần Thiên     Niết Bàn Đan    Bất Diệt Đan
               Đan (+2.8T     Tiên Đan        Đan (+45M      (+1.2B HP/v)    (+18M Thủ/v)
               EXP)           (+10%)          Công/v)


[Ngắt trang nguồn]

 Cảnh Giới        1. Đan Tu Vi    2. Đan Đột     3. Đan Công     4. Đan Khí       5. Đan
                  (EXP/viên)      Phá (+Tỉ lệ)   Kích (Max       Huyết (Max       Phòng Ngự
                                                 30v)            30v)             (Max 30v)

 9. Chân Tiên     Cửu Chuyển      Kim Tiên Tạo   Tiên Diễm       Hồng Mông        Tiên Cốt Đan
                  Tiên Đan        Hóa Đan        Đan (+400M      Đan (+12B        (+160M
                  (+65T EXP)      (+10%)         Công/v)         HP/v)            Thủ/v)


(Ngoài 45 loại đan trên, hệ thống hơn 200 vật phẩm còn bao gồm: 45 loại Linh Thảo, 45 loại
Khoáng Thạch, 45 loại Yêu Đan/Tinh Hồn Boss, 15 loại Phù Lục chiến đấu, 15 loại Đá
Cường Hóa & Bảo Thạch Ngũ Hành).


7.2. Hệ Thống Độ Thuần Thục Nghề Nghiệp (Mastery System)
 Cấp Thuần          Điểm Yêu Cầu        Buff Hái Thuốc     Buff Luyện Đan      Buff Rèn Đồ
 Thục                                   (Thần Nông)        (Đan Sư)            (Luyện Khí Sư)

 1. Sơ Học          0 – 500             Thu thập 5s/lần.   Tỉ lệ thành công:   Ra đồ Trắng
                                                           60%.                (80%), Lục
                                                                               (20%).

 2. Thuần Thục      501 – 2.500         +20% Tốc độ        Giảm 20% tỉ lệ      +15% Tỉ lệ ra
                                        thu thập; 15% tỉ   cháy lò; Mở         đồ Lam; Giảm
                                        lệ x2 thảo dược.   khóa Luyện đan      10% khoáng
                                                           tự động.            thạch tiêu hao.

 3. Tinh Thông      2.501 – 10.000      [Nhãn Lực Linh     [Đan Hương Tứ       [Bách Luyện
                                        Thảo]: 15% rơi     Dật]: 20% tỉ lệ 1   Thành Cương]:
                                        thêm Thảo dược     lò nổ ra 2 viên     Xóa bỏ đồ
                                        hiếm (Tím).        đan; +15% ra        Trắng; +15% tỉ
                                                           Đan Thượng          lệ ra đồ Tím.
                                                           phẩm.

 4. Đại Tông Sư     10.001 – 50.000     [Khí Vận Chi       [Đan Vân Thần       [Thiên Công
                                        Tử]: +25% May      Đan]: 12% tỉ lệ     Khai Vật]:
                                        mắn; 5% đào        luyện ra Đan        +15% tỉ lệ rèn ra
                                        trúng Rương Cổ     Vân (Cực            Trang bị Cam
                                        Tu.                phẩm) hiệu quả      (Cực phẩm) đủ
                                                           gấp 3.5 lần.        hiệu ứng Set.

 5. Thông Thần      > 50.000            [Vạn Vật Sinh      [Vạn Đan Triều      [Khí Linh Hàng
                                        Trưởng]: Sản       Tông]: 100%         Thế]: 8% tỉ lệ
                                                           không cháy lò;      rèn ra Thần Khí


[Ngắt trang nguồn]

Cấp Thuần         Điểm Yêu Cầu       Buff Hái Thuốc    Buff Luyện Đan    Buff Rèn Đồ
Thục                                 (Thần Nông)       (Đan Sư)          (Luyện Khí Sư)

                                     lượng Idle tăng   Mỗi viên đan      Đỏ (Tăng 350%
                                     +50% vĩnh viễn.   Cực phẩm cộng     chỉ số gốc + +1
                                                       vĩnh viễn         Cấp Kỹ năng).
                                                       +0.05% HP.




8. CỐT TRUYỆN & HỘI THOẠI NHIỆM VỤ TƯƠNG TÁC (CHAT
NPC)
Hệ thống nhiệm vụ hiển thị dưới dạng Khung Chat Tương Tác. Lựa chọn của người chơi cộng
điểm Chính Đạo (Tăng HP/Thủ, mở shop Chính phái) hoặc Ma Đạo (Tăng Công/Bạo/Hút máu,
mở chợ đen Ma giáo).


Mẫu Chat 1 – Map 1: Vô Danh Thôn (Luyện Khí Kỳ)
     [NPC - Mặc Đại Phu]: (Ho khụ khụ) "Tiểu tử, 5 cây Hoàng Tinh Thảo trên Hắc
     Phong Sơn lão phu dặn ngươi đã hái về chưa? Khí huyết lão phu suy kiệt lắm
     rồi..."

        ●​ Lựa chọn A [Chính Đạo]: "Dạ thưa Mặc lão, con đã hái đủ. Xin người mau
           sắc thuốc uống!"
              ●​ $\rightarrow$ Phần thưởng: Nhận công pháp Trường Xuân Công,
                  +50 Điểm Chính Đạo, +10.000 EXP.
        ●​ Lựa chọn B [Cảnh Giác / Ma Đạo]: "Mặc lão, Hoàng Tinh Thảo vốn là linh
           dược dẫn khí của tu tiên giả, mạch đập của người lại mạnh hơn cả võ sư.
           Người rốt cuộc muốn luyện tà công gì?"
              ●​ $\rightarrow$ Phần thưởng: Kích hoạt trận chiến ẩn đánh bại Mặc
                  Lão (Tàn Hồn), đoạt lấy Khống Hạc Công, túi trữ vật chứa 1 viên
                  Trúc Cơ Đan và +50 Điểm Ma Đạo.


Mẫu Chat 2 – Map 14: Hư Thiên Điện (Kim Đan Kỳ)
     [NPC - Lục Đạo Cực Thánh]: "Tiểu bối Kim Đan kia! Muốn lấy bảo vật trong Hư
     Thiên Điện thì đi trước mở cạm bẫy Hàn Băng cho bản tọa, sống sót ta chia cho 1
     viên Kết Anh Đan!"


[Ngắt trang nguồn]

       ●​ Lựa chọn A [Nhẫn Nhục]: "Vãn bối tuân mệnh tiền bối!" $\rightarrow$
          Nhận Debuff FREEZE nhẹ trong 10 phút nhưng mở khóa thẳng cổng vào
          đánh Boss Hư Thiên Băng Hoàng với tỉ lệ rơi Hư Thiên Đỉnh +10%.
       ●​ Lựa chọn B [Phản Kháng]: "Lão ma đầu, xem chiêu Thanh Trúc Kiếm của
          ta đây!" $\rightarrow$ Đánh thắng phân thân của Lục Đạo, nhận danh hiệu
          [Nghịch Thiên Phạt Ma] (+5% Công kích vĩnh viễn).


Mẫu Chat 3 – Map 28: Vẫn Tiên Hoang Nguyên (Luyện Hư Kỳ)
    [NPC - Tâm Ma Huyễn Ảnh]: "Ngươi tu hành ngàn năm, cố nhân ở Vô Danh Thôn
    đều đã hóa thành tro bụi. Tu tiên cô độc như vậy để làm gì? Giao thân xác cho ta,
    ta cho ngươi sức mạnh hủy thiên diệt địa!"

       ●​ Lựa chọn A [Trảm Tâm Ma]: "Đạo tâm của ta vững như bàn thạch, tà ma
          ngoại đạo mau tan biến!" $\rightarrow$ Chiến thắng Tâm Ma, nhận công
          pháp Tâm Ma Trảm Đạo Quyết (+50% Kháng Tâm Ma).
       ●​ Lựa chọn B [Dung Hợp Tâm Ma]: "Thiện ác cũng chỉ là một niệm! Ta
          nguyện hóa Ma để bước lên đỉnh cao!" $\rightarrow$ Nhận ngay công pháp
          Đạo Tâm Chủng Ma Đại Pháp, tăng vĩnh viễn +15% Hút máu
          (LIFESTEAL).


[Ngắt trang nguồn]


```
