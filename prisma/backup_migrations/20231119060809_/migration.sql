/*
  Warnings:

  - You are about to drop the column `userId` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_userId_fkey`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `userId`;
