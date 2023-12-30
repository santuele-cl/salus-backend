/*
  Warnings:

  - You are about to drop the `servicesdepartment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clinicalDeptHead` to the `ClinicalDepartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_serviceDepartmentId_fkey`;

-- AlterTable
ALTER TABLE `clinicaldepartment` ADD COLUMN `clinicalDeptHead` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `servicesdepartment`;

-- CreateTable
CREATE TABLE `ServiceDepartment` (
    `id` VARCHAR(191) NOT NULL,
    `serviceDeptName` VARCHAR(191) NOT NULL,
    `serviceDeptHead` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServiceDepartment_serviceDeptName_key`(`serviceDeptName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_serviceDepartmentId_fkey` FOREIGN KEY (`serviceDepartmentId`) REFERENCES `ServiceDepartment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
