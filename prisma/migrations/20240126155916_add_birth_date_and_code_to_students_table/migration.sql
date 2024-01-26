/*
  Warnings:

  - Added the required column `birthDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `birthDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `code` VARCHAR(191) NOT NULL;
