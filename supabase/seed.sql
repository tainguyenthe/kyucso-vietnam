-- Seed sample heroes
INSERT INTO heroes (full_name, birth_year, death_year, birth_place, era, rank, unit, achievements, biography, status) VALUES
('Võ Thị Sáu', 1933, 1952, 'Bà Rịa - Vũng Tàu', 'chong-phap', 'Chiến sĩ', 'Lực lượng vũ trang Đất Đỏ', 'Anh hùng Lực lượng vũ trang nhân dân. Người nữ anh hùng trẻ tuổi nhất Việt Nam.', 'Sinh năm 1933 tại huyện Đất Đỏ, tỉnh Bà Rịa. Từ năm 14 tuổi đã tham gia hoạt động cách mạng, ném lựu đạn tiêu diệt nhiều tên giặc. Bị bắt và anh dũng hy sinh tại Côn Đảo ngày 23/1/1952.', 'published'),

('Nguyễn Văn Trỗi', 1940, 1964, 'Quảng Nam', 'chong-my', 'Chiến sĩ biệt động', 'Biệt động Sài Gòn', 'Anh hùng Lực lượng vũ trang nhân dân. Chiến sĩ biệt động thành kiên cường.', 'Sinh năm 1940 tại Điện Bàn, Quảng Nam. Là công nhân thợ điện, gia nhập lực lượng biệt động Sài Gòn. Thực hiện nhiệm vụ đánh mìn cầu Công Lý. Bị bắt và anh dũng hy sinh ngày 15/10/1964.', 'published'),

('Phan Đình Giót', 1922, 1954, 'Hà Tĩnh', 'chong-phap', 'Tiểu đội phó', 'Đại đoàn 316', 'Anh hùng Lực lượng vũ trang nhân dân. Lấy thân mình lấp lỗ châu mai trong chiến dịch Điện Biên Phủ.', 'Sinh năm 1922 tại Cẩm Xuyên, Hà Tĩnh. Trong trận đánh đồi Him Lam ngày 13/3/1954, anh đã dũng cảm lấy thân mình lấp lỗ châu mai để đồng đội xông lên tiêu diệt cứ điểm.', 'published'),

('Nguyễn Viết Xuân', 1933, 1964, 'Vĩnh Phúc', 'chong-my', 'Chính trị viên đại đội', 'Trung đoàn pháo phòng không', 'Anh hùng Lực lượng vũ trang nhân dân. Nổi tiếng với câu nói "Nhằm thẳng quân thù mà bắn!".', 'Sinh năm 1933 tại Vĩnh Tường, Vĩnh Phúc. Trong trận chiến đấu ngày 18/11/1964, dù bị thương nặng vẫn chỉ huy đơn vị chiến đấu với lời hô "Nhằm thẳng quân thù mà bắn!".', 'published'),

('Tô Vĩnh Diện', 1924, 1953, 'Thanh Hóa', 'chong-phap', 'Tiểu đội trưởng', 'Đại đoàn 312', 'Anh hùng Lực lượng vũ trang nhân dân. Lấy thân mình chèn pháo trong chiến dịch Điện Biên Phủ.', 'Sinh năm 1924 tại Nông Cống, Thanh Hóa. Trong quá trình kéo pháo vào trận địa Điện Biên Phủ, anh đã lấy thân mình chèn pháo trên dốc núi để cứu khẩu pháo cho đơn vị.', 'published'),

('Bế Văn Đàn', 1931, 1953, 'Cao Bằng', 'chong-phap', 'Chiến sĩ', 'Trung đoàn 174, Đại đoàn 316', 'Anh hùng Lực lượng vũ trang nhân dân. Lấy thân mình làm giá súng.', 'Sinh năm 1931 tại Quang Trung, Hòa An, Cao Bằng. Trong trận chiến đấu tại Mường Pồn ngày 12/12/1953, dù bị thương nặng vẫn lấy thân mình làm giá súng cho đồng đội chiến đấu.', 'published'),

('Cù Chính Lan', 1930, 1951, 'Nghệ An', 'chong-phap', 'Chiến sĩ', 'Trung đoàn 57, Đại đoàn 304', 'Anh hùng Lực lượng vũ trang nhân dân. Dùng lưỡi lê đâm xe tăng trong chiến dịch Hòa Bình.', 'Sinh năm 1930 tại Quỳnh Lưu, Nghệ An. Trong chiến dịch Hòa Bình, anh đã dũng cảm nhảy lên xe tăng địch, dùng lưỡi lê và lựu đạn tiêu diệt xe tăng.', 'published'),

('Nguyễn Thị Minh Khai', 1910, 1941, 'Nghệ An', 'chong-phap', 'Bí thư Thành ủy', 'Thành ủy Sài Gòn - Chợ Lớn', 'Nhà cách mạng kiên cường, Bí thư Thành ủy Sài Gòn - Chợ Lớn.', 'Sinh năm 1910 tại Vinh, Nghệ An. Là một trong những nhà cách mạng tiêu biểu, hoạt động ở nhiều nước. Bị bắt và anh dũng hy sinh tại Hóc Môn ngày 28/8/1941.', 'published');

-- Seed sample battlefields with panorama URLs
-- Using public equirectangular panorama images from Wikimedia Commons
INSERT INTO battlefields (name, description, location, era, category, panorama_url, thumbnail_url, markers, status) VALUES
(
  'Chiến trường Điện Biên Phủ',
  'Trận đánh quyết định kết thúc cuộc kháng chiến chống Pháp. Diễn ra từ 13/3 đến 7/5/1954. Chiến thắng Điện Biên Phủ đã chấm dứt hoàn toàn cuộc chiến tranh xâm lược của thực dân Pháp tại Đông Dương.',
  'Điện Biên',
  'chong-phap',
  'chien-dich',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Dien_Bien_Phu_panorama.jpg/2560px-Dien_Bien_Phu_panorama.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dien_Bien_Phu_Museum.jpg/640px-Dien_Bien_Phu_Museum.jpg',
  '[{"id":"dbp-1","longitude":0,"latitude":0,"tooltip":"Sở chỉ huy De Castries","description":"Hầm chỉ huy của tướng De Castries, nơi quân Pháp đầu hàng ngày 7/5/1954"},{"id":"dbp-2","longitude":90,"latitude":-5,"tooltip":"Đồi A1","description":"Cứ điểm quan trọng nhất, nơi diễn ra nhiều trận đánh khốc liệt nhất"},{"id":"dbp-3","longitude":180,"latitude":0,"tooltip":"Cầu Mường Thanh","description":"Cầu bắc qua sông Nậm Rốm, chứng nhân lịch sử của chiến thắng"}]',
  'published'
),
(
  'Địa đạo Củ Chi',
  'Hệ thống đường hầm dài hơn 200km, là căn cứ kháng chiến quan trọng trong chiến tranh chống Mỹ. Được xây dựng từ thời kháng chiến chống Pháp và mở rộng trong kháng chiến chống Mỹ.',
  'TP. Hồ Chí Minh',
  'chong-my',
  'dia-dao',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cu_Chi_tunnel_entrance.jpg/2560px-Cu_Chi_tunnel_entrance.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cuchitunnels.jpg/640px-Cuchitunnels.jpg',
  '[{"id":"cc-1","longitude":0,"latitude":0,"tooltip":"Cửa hầm bí mật","description":"Cửa hầm được ngụy trang khéo léo giữa rừng cây"},{"id":"cc-2","longitude":120,"latitude":-10,"tooltip":"Phòng họp dưới lòng đất","description":"Nơi tổ chức các cuộc họp quan trọng của quân giải phóng"},{"id":"cc-3","longitude":240,"latitude":0,"tooltip":"Bếp Hoàng Cầm","description":"Bếp nấu ăn đặc biệt, khói được dẫn ra xa để tránh bị phát hiện"}]',
  'published'
),
(
  'Thành cổ Quảng Trị',
  'Di tích lịch sử 81 ngày đêm bảo vệ Thành cổ Quảng Trị năm 1972. Hàng ngàn chiến sĩ đã anh dũng hy sinh để bảo vệ thành cổ, trở thành biểu tượng bất khuất của quân và dân ta.',
  'Quảng Trị',
  'chong-my',
  'di-tich',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Quang_Tri_Citadel.jpg/2560px-Quang_Tri_Citadel.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Thanh_co_Quang_Tri.jpg/640px-Thanh_co_Quang_Tri.jpg',
  '[{"id":"qt-1","longitude":0,"latitude":0,"tooltip":"Cổng thành chính","description":"Cổng thành phía Nam, nơi ghi dấu nhiều trận đánh ác liệt"},{"id":"qt-2","longitude":90,"latitude":0,"tooltip":"Đài tưởng niệm","description":"Đài tưởng niệm các chiến sĩ đã hy sinh trong 81 ngày đêm bảo vệ thành cổ"},{"id":"qt-3","longitude":200,"latitude":-5,"tooltip":"Bảo tàng thành cổ","description":"Nơi lưu giữ các hiện vật lịch sử về trận chiến bảo vệ thành cổ"}]',
  'published'
),
(
  'Đường Trường Sơn',
  'Con đường huyền thoại nối liền hậu phương miền Bắc với tiền tuyến miền Nam. Được mở từ ngày 19/5/1959, đường Trường Sơn đã trở thành huyết mạch giao thông chiến lược.',
  'Quảng Bình - Tây Nguyên',
  'chong-my',
  'chien-dich',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ho_Chi_Minh_trail.jpg/2560px-Ho_Chi_Minh_trail.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Truong_Son_road.jpg/640px-Truong_Son_road.jpg',
  '[{"id":"ts-1","longitude":0,"latitude":0,"tooltip":"Km 0 - Điểm xuất phát","description":"Điểm bắt đầu của đường Trường Sơn tại Quảng Bình"},{"id":"ts-2","longitude":150,"latitude":5,"tooltip":"Ngã ba Đồng Lộc","description":"Nơi 10 nữ thanh niên xung phong đã anh dũng hy sinh"},{"id":"ts-3","longitude":270,"latitude":-5,"tooltip":"Trạm giao liên","description":"Một trong hàng trăm trạm giao liên dọc đường Trường Sơn"}]',
  'published'
),
(
  'Khe Sanh',
  'Chiến trường khốc liệt trong cuộc Tổng tiến công Mậu Thân 1968. Quân Mỹ đã huy động lực lượng lớn để bảo vệ căn cứ nhưng cuối cùng phải rút lui.',
  'Quảng Trị',
  'chong-my',
  'tran-danh',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Khe_Sanh_Combat_Base_panorama.jpg/2560px-Khe_Sanh_Combat_Base_panorama.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Khe_Sanh_valley.jpg/640px-Khe_Sanh_valley.jpg',
  '[{"id":"ks-1","longitude":0,"latitude":0,"tooltip":"Sân bay Tà Cơn","description":"Sân bay quân sự của Mỹ tại căn cứ Khe Sanh"},{"id":"ks-2","longitude":120,"latitude":0,"tooltip":"Cao điểm 861","description":"Vị trí phòng thủ quan trọng của quân Mỹ, nơi diễn ra nhiều trận đánh"},{"id":"ks-3","longitude":240,"latitude":5,"tooltip":"Bảo tàng Khe Sanh","description":"Nơi trưng bày các hiện vật chiến tranh tại Khe Sanh"}]',
  'published'
),
(
  'Đồi A1 - Điện Biên Phủ',
  'Cứ điểm quan trọng nhất của quân Pháp tại Điện Biên Phủ. Trận đánh đồi A1 kéo dài 36 ngày đêm, là trận đánh dài nhất và khốc liệt nhất trong toàn chiến dịch.',
  'Điện Biên',
  'chong-phap',
  'tran-danh',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/A1_Hill_Dien_Bien_Phu.jpg/2560px-A1_Hill_Dien_Bien_Phu.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Doi_A1.jpg/640px-Doi_A1.jpg',
  '[{"id":"a1-1","longitude":0,"latitude":0,"tooltip":"Đỉnh đồi A1","description":"Đỉnh đồi, nơi quân ta cắm cờ chiến thắng"},{"id":"a1-2","longitude":90,"latitude":-10,"tooltip":"Hố bộc phá","description":"Hố bộc phá khổng lồ do quân ta đào đường hầm và cho nổ 1 tấn thuốc nổ"},{"id":"a1-3","longitude":180,"latitude":0,"tooltip":"Chiến hào","description":"Hệ thống chiến hào bao vây cứ điểm A1"}]',
  'published'
);
