/*
  Warnings:

  - Added the required column `created` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Major` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `major` ADD COLUMN `created` BIGINT NOT NULL,
    ADD COLUMN `updated` BIGINT NOT NULL;
