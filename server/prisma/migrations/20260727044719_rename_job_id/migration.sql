/*
  Warnings:

  - The primary key for the `application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `application` table. All the data in the column will be lost.
  - The primary key for the `job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `job` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `applicationId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - The required column `jobId` was added to the `Job` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_userId_fkey`;

-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_postedById_fkey`;

-- AlterTable
ALTER TABLE `application` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `applicationId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`applicationId`);

-- AlterTable
ALTER TABLE `job` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `jobId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`jobId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_postedById_fkey` FOREIGN KEY (`postedById`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`jobId`) ON DELETE RESTRICT ON UPDATE CASCADE;
