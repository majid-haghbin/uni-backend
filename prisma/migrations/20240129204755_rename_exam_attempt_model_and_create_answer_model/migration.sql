/*
  Warnings:

  - You are about to drop the `examattempt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `examattempt` DROP FOREIGN KEY `ExamAttempt_examID_fkey`;

-- DropForeignKey
ALTER TABLE `examattempt` DROP FOREIGN KEY `ExamAttempt_studentID_fkey`;

-- DropTable
DROP TABLE `examattempt`;

-- CreateTable
CREATE TABLE `Attempt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` VARCHAR(191) NOT NULL,
    `examID` INTEGER NOT NULL,
    `studentID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NULL,
    `choiceID` INTEGER NULL,
    `attemptID` INTEGER NOT NULL,
    `questionID` INTEGER NOT NULL,

    UNIQUE INDEX `Answer_choiceID_key`(`choiceID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attempt` ADD CONSTRAINT `Attempt_examID_fkey` FOREIGN KEY (`examID`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attempt` ADD CONSTRAINT `Attempt_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_choiceID_fkey` FOREIGN KEY (`choiceID`) REFERENCES `Choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_attemptID_fkey` FOREIGN KEY (`attemptID`) REFERENCES `Attempt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionID_fkey` FOREIGN KEY (`questionID`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
