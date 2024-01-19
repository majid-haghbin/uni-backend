-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_adminID_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_professorID_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_studentID_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `adminID` INTEGER NULL,
    MODIFY `studentID` INTEGER NULL,
    MODIFY `professorID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_adminID_fkey` FOREIGN KEY (`adminID`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_professorID_fkey` FOREIGN KEY (`professorID`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
