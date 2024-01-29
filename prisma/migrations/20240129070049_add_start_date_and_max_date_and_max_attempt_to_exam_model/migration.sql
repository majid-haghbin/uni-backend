/*
  Warnings:

  - Added the required column `endDate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAttempt` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exam` ADD COLUMN `endDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxAttempt` INTEGER NOT NULL,
    ADD COLUMN `startDate` VARCHAR(191) NOT NULL;
