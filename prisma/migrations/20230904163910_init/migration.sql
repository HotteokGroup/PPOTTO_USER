-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nickName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `profileImage` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_nickName_key`(`nickName`),
    INDEX `nickName`(`nickName`),
    INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserIdentityVerification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `verificationType` ENUM('EMAIL') NOT NULL,
    `emailAddress` VARCHAR(191) NULL,
    `verificationCode` VARCHAR(191) NOT NULL,
    `failCount` INTEGER NOT NULL DEFAULT 0,
    `verifiedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TermsOfService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `isEssential` BOOLEAN NOT NULL DEFAULT true,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTermsOfServiceAgreement` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `termsOfServiceId` INTEGER NOT NULL,
    `isAgreed` BOOLEAN NOT NULL DEFAULT false,
    `agreedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `userId`(`userId`),
    INDEX `termsOfServiceId`(`termsOfServiceId`),
    INDEX `userId_termsOfServiceId`(`userId`, `termsOfServiceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSocialAuthentication` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `type` ENUM('GOOGLE', 'APPLE') NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `userId`(`userId`),
    INDEX `key_type`(`key`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserIdentityVerification` ADD CONSTRAINT `UserIdentityVerification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTermsOfServiceAgreement` ADD CONSTRAINT `UserTermsOfServiceAgreement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTermsOfServiceAgreement` ADD CONSTRAINT `UserTermsOfServiceAgreement_termsOfServiceId_fkey` FOREIGN KEY (`termsOfServiceId`) REFERENCES `TermsOfService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSocialAuthentication` ADD CONSTRAINT `UserSocialAuthentication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
