/*
  Warnings:

  - You are about to drop the column `name` on the `exam` table. All the data in the column will be lost.
  - Added the required column `created` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exam` DROP COLUMN `name`,
    ADD COLUMN `created` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `isMultiChoice` BOOLEAN NOT NULL,
    `examID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `questionID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_examID_fkey` FOREIGN KEY (`examID`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_questionID_fkey` FOREIGN KEY (`questionID`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
