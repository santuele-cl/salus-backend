/*
  Warnings:

  - You are about to drop the column `followUpCheckUpId` on the `diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `initialCheckUpId` on the `diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `opdRecordId` on the `visit` table. All the data in the column will be lost.
  - You are about to drop the `opdrecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `treatment` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Made the column `hpi` on table `visit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `opdrecord` DROP FOREIGN KEY `OpdRecord_patientChartId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_opdRecordId_fkey`;

-- AlterTable
ALTER TABLE `diagnosis` DROP COLUMN `followUpCheckUpId`,
    DROP COLUMN `initialCheckUpId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `clinicalDepartmentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `visit` DROP COLUMN `opdRecordId`,
    ADD COLUMN `patientChartId` VARCHAR(191) NULL,
    ADD COLUMN `serviceDepartmentId` VARCHAR(191) NULL,
    ADD COLUMN `treatment` VARCHAR(191) NOT NULL,
    MODIFY `hpi` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `opdrecord`;

-- CreateTable
CREATE TABLE `ClinicalDepartment` (
    `id` VARCHAR(191) NOT NULL,
    `clinicalDeptName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ClinicalDepartment_clinicalDeptName_key`(`clinicalDeptName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesDepartment` (
    `id` VARCHAR(191) NOT NULL,
    `roleName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServicesDepartment_roleName_key`(`roleName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_clinicalDepartmentId_fkey` FOREIGN KEY (`clinicalDepartmentId`) REFERENCES `ClinicalDepartment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_patientChartId_fkey` FOREIGN KEY (`patientChartId`) REFERENCES `PatientChart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_serviceDepartmentId_fkey` FOREIGN KEY (`serviceDepartmentId`) REFERENCES `ServicesDepartment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
