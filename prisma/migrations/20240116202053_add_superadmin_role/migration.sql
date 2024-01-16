-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('superAdmin', 'admin', 'student', 'professor') NOT NULL DEFAULT 'student';
