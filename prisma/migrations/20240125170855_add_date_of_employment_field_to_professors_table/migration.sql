/*
  Warnings:

  - You are about to drop the column `family` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `professor` table. All the data in the column will be lost.
  - Added the required column `dateOfEmployment` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professor` DROP COLUMN `family`,
    DROP COLUMN `name`,
    ADD COLUMN `dateOfEmployment` VARCHAR(191) NOT NULL;
