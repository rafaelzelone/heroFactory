/*
  Warnings:

  - You are about to drop the column `nickname` on the `heroes` table. All the data in the column will be lost.
  - Added the required column `hero_name` to the `heroes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `heroes` DROP COLUMN `nickname`,
    ADD COLUMN `hero_name` VARCHAR(191) NOT NULL;
