-- Add missing DELETE policies for admin operations

-- Battlefields: admins can delete
CREATE POLICY "Admins can delete battlefields" ON battlefields FOR DELETE
  USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Stories: admins can delete
CREATE POLICY "Admins can delete stories" ON stories FOR DELETE
  USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Profiles: admins can delete users
CREATE POLICY "Admins can delete profiles" ON profiles FOR DELETE
  USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
