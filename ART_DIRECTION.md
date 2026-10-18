# Bản đồ ba Giới — bản 0.2

Nhân Giới giữ nguyên ảnh do người dùng cung cấp, với lục địa, sơn mạch, làng và biển.

Hai ảnh mới được tạo bằng công cụ ImageGen tích hợp, lưu tại assets/spirit-floating-islands.webp và assets/immortal-planets.webp. Các ảnh là nền mỹ thuật; nhãn, cấp, bộ lọc và điều kiện mở khóa được vẽ/xử lý bằng giao diện. Tọa độ trong world_visuals.json đặt nhãn dưới cụm đảo hoặc hành tinh tương ứng.

## Linh Giới: prompt

Use case: stylized-concept. Asset type: landscape background image for a 2D pixel art Vietnamese xianxia mobile idle game world map. Primary request: the Spirit Realm consists ENTIRELY of floating islands suspended above a vast cloudy sky, no ocean, no ground continent. Wide 3:2 composition, readable chunky 2D pixel art like classic 16-bit JRPG overworld with simple silhouettes, restrained details, jade cyan and lavender clouds, warm gold temples. Four distinct floating island archipelagos occupy roughly left lower quarter, left upper middle, right lower middle, and upper right quarter: green ancient forest islands; purple mist temple islands; red autumn celestial fortress islands; luminous white-gold high sanctum islands. Each archipelago has one main island and four smaller satellite islands. Show exposed rocky undersides, sparse waterfalls falling into clouds, a few airy bridges and glowing portal gates connecting archipelagos logically. Islands at different sky altitudes. Elevated three-quarter top-down game map view. Leave open clouds around island groups for UI labels added later. Clean restrained pixel clusters, clear island silhouettes, absolutely no text, lettering, numbers, captions, logo, UI panels, watermark, characters, or spaceship. This is scenic background art, all navigation data will be HTML overlays.

Ánh xạ: Xích Viêm Phù Đảo = cụm đỏ bên phải phía dưới; Thiên Vận Không Đảo = cụm tím bên trái phía trên; Thiên Uyên Vân Đảo = cụm xanh bên trái phía dưới; Đăng Tiên Thánh Đảo = cụm vàng trắng bên phải phía trên.

## Tiên Giới: prompt

Use case: stylized-concept. Asset type: landscape background for the IMMORTAL REALM world map of a mobile 2D pixel-art xianxia idle game. Primary request: a beautiful star field with exactly five clear separate spherical fantasy planets representing ascending tiers of immortal cultivation, no ground map or floating islands. Wide 3:2 composition. Classic 16-bit JRPG pixel art with large deliberate crisp pixel clusters, simple readable silhouettes and restrained ornament. Five planets arranged on a winding ascending journey: a small icy cyan planet at 14 percent width 73 percent height; a pale blue ringed planet at 33 percent width 42 percent height; a medium green ancient forest planet at 52 percent width 65 percent height; a dark violet mist planet at 70 percent width 31 percent height; a larger luminous golden-white celestial capital planet at 86 percent width 18 percent height. All five planets fully inside image, clearly spaced, planet sizes grow gently along progression, no overlap. Very small traditional Chinese heavenly pagodas perched subtly on the surface of the final gold planet. Deep navy indigo cosmos, sparse pixel stars and understated nebulae, a faint glowing star trail connecting the five worlds. Pixel-art game map, NOT photorealistic astronomy, no spacecraft or sci-fi machines. Leave dark negative space near planets for HTML labels to be added later. Absolutely no text, numbers, symbols resembling letters, logos, watermark, UI or frames.

Ánh xạ: Bắc Hàn Tinh → Minh Hàn Tinh → Man Hoang Tinh → Hôi Linh Tinh → Nam Thiên Chủ Tinh. Năm cấp hành tinh là thang tiến trình địa lý trong prototype, còn chỉ số cảnh giới của nhân vật vẫn lấy từ GDD.

## Linh Giới 0.2.1 — đại phù lục

Tạo bằng ImageGen tích hợp. Ảnh sử dụng: assets/spirit-floating-continents.webp. Kiến trúc nhỏ, địa hình lớn và nhiều lớp đảo xa gần.

undefined


## 0.2.2 — Ảnh được chọn và Thế Giới Thụ

Linh Giới dùng nguyên ảnh người dùng gửi, không vẽ lại: assets/spirit-realm-user-map.png. Tiên Giới tạo mới bằng ImageGen tích hợp: assets/immortal-world-tree.webp. Các tinh vực là các miền tinh không bao quanh cây trung tâm. Không dùng hình cầu hành tinh.

Prompt Tiên Giới:

undefined


## 0.4 — atlas theo địa điểm

Ba ảnh tạo bằng ImageGen tích hợp: assets/human-atlas-v04.webp, assets/spirit-atlas-v04.webp, assets/immortal-atlas-v04.webp. Tất cả ở tỷ lệ dọc 2:3 cho màn hình điện thoại. Nhân Giới và Linh Giới có 20 cảnh theo thứ tự Phụ lục A, Tiên Giới có 5 cảnh quanh Thế Giới Thụ. Nhãn tên và yêu cầu tu luyện do HTML vẽ, không ghi chữ vào ảnh. `data/map_nodes.json` giữ vị trí ghim.

### human — prompt

Create a production-ready 2D PIXEL ART vertical game world map for the HUMAN REALM of a Vietnamese xianxia idle game. PORTRAIT 2:3 aspect, 1024x1536 style. This is a compact mobile atlas with EXACTLY TWENTY distinct playable landmark scenes laid out in TWO COLUMNS and TEN ROWS, on a continuous coherent landscape with winding paths, rivers, mountains, coastline and sea. Not a UI screenshot, no boxes, no grid lines, no text or labels. Every scene is small and simple enough to read on a phone. Scene centers at x=25% and 75%; row centers y=12%,21%,30%,39%,48%,57%,66%,75%,84%,93%. Leave a narrow quiet area directly ABOVE each scene for HTML map labels added later. Read order row1 left/right = map1/map2, row2 =3/4, through row10=19/20. Mandatory scene list: 1 humble nameless rural village with farms; 2 small market town with a green ox statue; 3 seven-peaked mountain martial sect temple; 4 dark windy black mountain fortress; 5 peaceful green southern valley; 6 yellow-wind canyon sect; 7 blood-red forbidden forest gateway; 8 moon-worship temple; 9 mountain of puppet towers and workshops; 10 walled imperial city; 11 inland blue sea dotted with small star-shaped reefs; 12 valley of many beast statues and wild forest; 13 emerald spirit island; 14 mysterious ruined heavenly palace; 15 stormy outer sea whirlpool; 16 rolling grassland encampment; 17 white-blue sacred temple on grassland; 18 dark ghostly underworld marsh; 19 ancient bronze peak with stone ruins; 20 deep corrupted demon-fall ravine with crimson portal. Progress terrain logically from gentle villages at top through sect mountains, coast and islands in middle, grasslands and haunted mountains at bottom. Match the list positions exactly, all twenty distinct scenes visible, not fewer. Old-school crisp 16-bit JRPG pixel clusters, jade greens, ochre paths, blue water, painterly atmospheric depth only at distant edges. No planets, no sci-fi, no characters, NO writing, numbers, letters, watermark or UI.

### spirit — prompt

Create a production-ready 2D PIXEL ART vertical game world map for the SPIRIT REALM of a Vietnamese xianxia idle game. PORTRAIT 2:3 aspect, compact mobile atlas. EXACTLY TWENTY separate landmark scenes on floating islands and interconnected sky plateaus over cloud oceans, laid out in TWO COLUMNS and TEN ROWS on a single continuous scenic atlas. Exposed floating cliffs, narrow bridges, portal paths and waterfalls into the clouds. No ground continent, no visible planets, no UI frames, no grid lines, no text. Scene centers at x=25% and 75%; row centers y=12%,21%,30%,39%,48%,57%,66%,75%,84%,93%; leave a quiet strip above each landmark for HTML labels added later. Read order row1 left/right are maps21/22, row2 maps23/24, down to row10 maps39/40. Mandatory scenes in this exact order: 21 vermilion bird shrine on scorched volcanic wasteland; 22 winged immortal sect mountain gate; 23 ruined ancient celestial battlefield; 24 lush spirit-beast forest territory; 25 icy wind canyon; 26 heavenly-fortune sect with astrolabe plaza; 27 purple lightning immortal palace; 28 fallen-immortal desolate plateau with broken pillars; 29 dark demonic cloud sea; 30 sacred pool of buried immortals with pale lotus; 31 immense walled sky city above an abyss; 32 underworld river crossing; 33 savage giant-beast canyon with enormous fossil bones; 34 ancient wood-clan forest settlement; 35 silver moon-shadow altar; 36 blood-red highland fortress; 37 demonic dark sea island; 38 small polar ice palace; 39 golden ascending-immortal terrace; 40 dramatic ascension lightning pool with a high sky portal. Each landmark should be individually recognizable and correctly positioned. Crisp readable 16-bit pixel art with restrained detail, small Chinese xianxia architecture against larger landscape, jade and cyan cloud oceans, biome changes from volcanic red to green, violet, white and gold. Strong floating island identity and coherent logical routes through all twenty sites. NO text, numbers, lettering, watermark, characters, spaceships or interface.

### immortal — prompt

Create a production-ready 2D PIXEL ART vertical map of the IMMORTAL REALM for a Vietnamese xianxia mobile idle game. PORTRAIT 2:3 aspect, a compact readable atlas. Enormous luminous jade-and-gold WORLD TREE at center x=50% y=46%, spreading branches and glowing roots through deep blue star fields. FIVE distinct star regions of irregular floating landmasses surround the tree, NOT spherical planets or bubbles. Exactly five principal visitable landmarks and their positions: at x=22% y=18% a WHITE ICY IMMORTAL PALACE amid frozen mountains, called Northern Cold Palace but render NO text; at x=22% y=63% a mysterious PALE BLUE ICE IMMORTAL MANSION on a snowy mist-shrouded island; at x=50% y=87% a lush WILD WHITE-MARSH FOREST with a majestic white horned beast statue and ancient huge trees; at x=80% y=66% a dark GRAY DEATH-MIST VALLEY with dead black trees and violet ancient ruins; at x=80% y=18% a spectacular GOLDEN SOUTH HEAVEN GATE with ascending stairs and white-gold temples. Keep these five scenes readable, connected to the central world tree by roots or starlight paths. Leave quiet space immediately above the five scene centers for HTML labels. Other background is cosmic clouds, distant tiny islands and sparse stars; no additional major landmarks competing with these five. Classic crisp 16-bit pixel art, coherent pixel clusters, majestic xianxia mood. No writing, names, numbers, UI panels, watermarks, characters, spacecraft, modern technology, spherical or ringed planets.


## Pants equipment · v0.17.0

Built-in ImageGen; final asset: assets/equipment-v017/cultivator-pants.png (1254×1254 RGBA, transparent). Shared by all nine pants templates; tier/quality are conveyed by the surrounding UI. Replaces the temporary vector icon introduced in v0.16.0.

Prompt: one finished inventory equipment sprite for a Vietnamese xianxia RPG; a single pair of ancient Chinese cultivation trousers, front facing and empty with no wearer, full waistband and both legs visible. Dark charcoal cloth, jade-green edging, brown leather belt, antique brass buckle and light protective knee panels. Hand-painted 2D RPG inventory art with strong readable silhouette and restrained detail, matching classic painted sword/robe/boots icons. Centered with transparent padding. No body, person, mannequin, boots, weapons, text, border, glow or scenery.
