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

-- Seed sample battlefields
INSERT INTO battlefields (name, description, location, era, category, panorama_url, thumbnail_url, status) VALUES
('Chiến trường Điện Biên Phủ', 'Trận đánh quyết định kết thúc cuộc kháng chiến chống Pháp. Diễn ra từ 13/3 đến 7/5/1954.', 'Điện Biên', 'chong-phap', 'chien-dich', NULL, NULL, 'published'),

('Địa đạo Củ Chi', 'Hệ thống đường hầm dài hơn 200km, là căn cứ kháng chiến quan trọng trong chiến tranh chống Mỹ.', 'TP. Hồ Chí Minh', 'chong-my', 'dia-dao', NULL, NULL, 'published'),

('Thành cổ Quảng Trị', 'Di tích lịch sử 81 ngày đêm bảo vệ Thành cổ Quảng Trị năm 1972.', 'Quảng Trị', 'chong-my', 'di-tich', NULL, NULL, 'published'),

('Đường Trường Sơn', 'Con đường huyền thoại nối liền hậu phương miền Bắc với tiền tuyến miền Nam.', 'Quảng Bình - Tây Nguyên', 'chong-my', 'chien-dich', NULL, NULL, 'published'),

('Khe Sanh', 'Chiến trường khốc liệt trong cuộc Tổng tiến công Mậu Thân 1968.', 'Quảng Trị', 'chong-my', 'tran-danh', NULL, NULL, 'published'),

('Đồi A1 - Điện Biên Phủ', 'Cứ điểm quan trọng nhất của quân Pháp tại Điện Biên Phủ, nơi diễn ra nhiều trận đánh khốc liệt.', 'Điện Biên', 'chong-phap', 'tran-danh', NULL, NULL, 'published');
