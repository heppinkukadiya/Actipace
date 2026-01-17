/*
  Warnings:

  - You are about to drop the column `paymentProvider` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `paypalCaptureId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `paypalOrderId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `paypalPayerId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Purchase_paypalCaptureId_key` ON `Purchase`;

-- DropIndex
DROP INDEX `Purchase_paypalOrderId_key` ON `Purchase`;

-- AlterTable
ALTER TABLE `Purchase` DROP COLUMN `paymentProvider`,
    DROP COLUMN `paypalCaptureId`,
    DROP COLUMN `paypalOrderId`,
    DROP COLUMN `paypalPayerId`;
