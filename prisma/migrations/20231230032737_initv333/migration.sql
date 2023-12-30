/*
  Warnings:

  - The primary key for the `patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `patientChartId` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `patientProfileId` on the `patient` table. All the data in the column will be lost.
  - You are about to alter the column `civilStatus` on the `patientprofile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `diagnosisId` on the `visit` table. All the data in the column will be lost.
  - You are about to drop the column `vitalsId` on the `visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitId]` on the table `Diagnosis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `PatientChart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `PatientProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `PatientProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vitalsId]` on the table `Vitals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Patient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `patientId` to the `PatientChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `patientprofile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `vitalsId` to the `Vitals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_physicianId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_patientChartId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_patientProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_diagnosisId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_opdRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_vitalsId_fkey`;

-- DropForeignKey
ALTER TABLE `vitals` DROP FOREIGN KEY `Vitals_nurseId_fkey`;

-- AlterTable
ALTER TABLE `diagnosis` ADD COLUMN `visitId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patient` DROP PRIMARY KEY,
    DROP COLUMN `patientChartId`,
    DROP COLUMN `patientId`,
    DROP COLUMN `patientProfileId`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `patientchart` ADD COLUMN `patientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patientprofile` ADD COLUMN `patientId` VARCHAR(191) NOT NULL,
    MODIFY `civilStatus` ENUM('SINGLE', 'MARRIED', 'WIDOWED', 'SEPARATED') NOT NULL,
    MODIFY `occupation` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `alertMedication` VARCHAR(191) NULL,
    MODIFY `allergies` VARCHAR(191) NULL,
    MODIFY `isSmoking` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isCovidVaccinated` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isDengvaxiaVaccinated` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `visit` DROP COLUMN `diagnosisId`,
    DROP COLUMN `vitalsId`;

-- AlterTable
ALTER TABLE `vitals` ADD COLUMN `vitalsId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Diagnosis_visitId_key` ON `Diagnosis`(`visitId`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientChart_patientId_key` ON `PatientChart`(`patientId`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientProfile_patientId_key` ON `PatientProfile`(`patientId`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientProfile_email_key` ON `PatientProfile`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Vitals_vitalsId_key` ON `Vitals`(`vitalsId`);

-- AddForeignKey
ALTER TABLE `PatientProfile` ADD CONSTRAINT `PatientProfile_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientChart` ADD CONSTRAINT `PatientChart_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_opdRecordId_fkey` FOREIGN KEY (`opdRecordId`) REFERENCES `OpdRecord`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_physicianId_fkey` FOREIGN KEY (`physicianId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitals` ADD CONSTRAINT `Vitals_nurseId_fkey` FOREIGN KEY (`nurseId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitals` ADD CONSTRAINT `Vitals_vitalsId_fkey` FOREIGN KEY (`vitalsId`) REFERENCES `Visit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
