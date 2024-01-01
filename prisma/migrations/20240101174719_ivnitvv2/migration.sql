-- DropForeignKey
ALTER TABLE `evaluation` DROP FOREIGN KEY `Evaluation_visitId_fkey`;

-- DropForeignKey
ALTER TABLE `vitals` DROP FOREIGN KEY `Vitals_visitId_fkey`;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitals` ADD CONSTRAINT `Vitals_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
