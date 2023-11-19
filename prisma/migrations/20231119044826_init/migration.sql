/*
  Warnings:

  - You are about to drop the column `role` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleName` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Role_role_key` ON `role`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `role`,
    ADD COLUMN `roleName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_roleName_key` ON `Role`(`roleName`);
