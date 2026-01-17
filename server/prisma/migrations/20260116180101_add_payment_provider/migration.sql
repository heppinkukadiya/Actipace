/*
  Warnings:

  - A unique constraint covering the columns `[paypalOrderId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paypalCaptureId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Purchase` ADD COLUMN `paymentProvider` ENUM('RAZORPAY', 'PAYPAL') NOT NULL DEFAULT 'RAZORPAY',
    ADD COLUMN `paypalCaptureId` VARCHAR(191) NULL,
    ADD COLUMN `paypalOrderId` VARCHAR(191) NULL,
    ADD COLUMN `paypalPayerId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Purchase_paypalOrderId_key` ON `Purchase`(`paypalOrderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Purchase_paypalCaptureId_key` ON `Purchase`(`paypalCaptureId`);
