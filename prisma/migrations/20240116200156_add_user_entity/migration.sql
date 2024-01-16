/*
  Warnings:

  - You are about to drop the column `family` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `family` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - Added the required column `minimumUnits` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorID` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `family`,
    DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `major` ADD COLUMN `minimumUnits` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `family`,
    DROP COLUMN `name`,
    ADD COLUMN `majorID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `family` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NULL,
    `mobile` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'student', 'professor') NOT NULL DEFAULT 'student',
    `adminID` INTEGER NOT NULL,
    `studentID` INTEGER NOT NULL,
    `professorID` INTEGER NOT NULL,

    UNIQUE INDEX `User_mobile_key`(`mobile`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_adminID_key`(`adminID`),
    UNIQUE INDEX `User_studentID_key`(`studentID`),
    UNIQUE INDEX `User_professorID_key`(`professorID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_adminID_fkey` FOREIGN KEY (`adminID`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_professorID_fkey` FOREIGN KEY (`professorID`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_majorID_fkey` FOREIGN KEY (`majorID`) REFERENCES `Major`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
