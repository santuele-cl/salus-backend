/*
  Warnings:

  - You are about to drop the column `prescription` on the `visit` table. All the data in the column will be lost.
  - You are about to drop the column `treatment` on the `visit` table. All the data in the column will be lost.
  - You are about to drop the `diagnosis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_physicianId_fkey`;

-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_visitId_fkey`;

-- AlterTable
ALTER TABLE `visit` DROP COLUMN `prescription`,
    DROP COLUMN `treatment`;

-- DropTable
DROP TABLE `diagnosis`;

-- CreateTable
CREATE TABLE `Evaluation` (
    `id` VARCHAR(191) NOT NULL,
    `physicianId` VARCHAR(191) NULL,
    `visitId` VARCHAR(191) NOT NULL,
    `physicalExamination` VARCHAR(191) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `treatment` VARCHAR(191) NOT NULL,
    `prescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Evaluation_visitId_key`(`visitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_physicianId_fkey` FOREIGN KEY (`physicianId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
