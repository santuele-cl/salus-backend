/*
  Warnings:

  - You are about to drop the `emergenycontact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicalrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personalinformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `emergenycontact` DROP FOREIGN KEY `EmergenyContact_userId_fkey`;

-- DropForeignKey
ALTER TABLE `medicalrecord` DROP FOREIGN KEY `MedicalRecord_userId_fkey`;

-- DropForeignKey
ALTER TABLE `personalinformation` DROP FOREIGN KEY `PersonalInformation_userId_fkey`;

-- DropTable
DROP TABLE `emergenycontact`;

-- DropTable
DROP TABLE `medicalrecord`;

-- DropTable
DROP TABLE `personalinformation`;
