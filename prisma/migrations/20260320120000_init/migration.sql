-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'CONTENT_EDITOR') NOT NULL DEFAULT 'CONTENT_EDITOR',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_role_idx`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `userAgent` VARCHAR(512) NULL,
    `ipAddress` VARCHAR(64) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session_tokenHash_key`(`tokenHash`),
    INDEX `Session_userId_idx`(`userId`),
    INDEX `Session_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetToken_tokenHash_key`(`tokenHash`),
    INDEX `PasswordResetToken_userId_idx`(`userId`),
    INDEX `PasswordResetToken_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `actorId` VARCHAR(191) NULL,
    `actorEmail` VARCHAR(255) NULL,
    `action` VARCHAR(128) NOT NULL,
    `entityType` VARCHAR(64) NULL,
    `entityId` VARCHAR(64) NULL,
    `metadata` JSON NULL,
    `ipAddress` VARCHAR(64) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_actorId_idx`(`actorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enquiry` (
    `id` VARCHAR(191) NOT NULL,
    `leadType` ENUM('GENERAL', 'CONSULTATION', 'READINESS_ASSESSMENT', 'TOOLKIT', 'ACADEMY', 'GRC_PLATFORM') NOT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'CLOSED', 'SPAM') NOT NULL DEFAULT 'NEW',
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `company` VARCHAR(200) NULL,
    `jobTitle` VARCHAR(200) NULL,
    `telephone` VARCHAR(50) NULL,
    `country` VARCHAR(100) NULL,
    `industry` VARCHAR(150) NULL,
    `organizationSize` VARCHAR(100) NULL,
    `subject` VARCHAR(300) NULL,
    `message` TEXT NULL,
    `courseInterest` VARCHAR(300) NULL,
    `areasOfInterest` TEXT NULL,
    `currentStatus` VARCHAR(200) NULL,
    `reason` TEXT NULL,
    `targetTimeframe` VARCHAR(100) NULL,
    `privacyAccepted` BOOLEAN NOT NULL DEFAULT false,
    `honeypotHit` BOOLEAN NOT NULL DEFAULT false,
    `ipAddress` VARCHAR(64) NULL,
    `userAgent` VARCHAR(512) NULL,
    `emailNotified` BOOLEAN NOT NULL DEFAULT false,
    `adminNotes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Enquiry_leadType_idx`(`leadType`),
    INDEX `Enquiry_status_idx`(`status`),
    INDEX `Enquiry_createdAt_idx`(`createdAt`),
    INDEX `Enquiry_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `longDescription` LONGTEXT NOT NULL,
    `status` ENUM('AVAILABLE_NOW', 'COMING_SOON', 'IN_DEVELOPMENT') NOT NULL DEFAULT 'AVAILABLE_NOW',
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `ctaLabel` VARCHAR(100) NULL,
    `ctaHref` VARCHAR(300) NULL,
    `methodology` JSON NULL,
    `deliverables` JSON NULL,
    `coverageAreas` JSON NULL,
    `disclaimer` LONGTEXT NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` VARCHAR(500) NULL,
    `publishStatus` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Service_slug_key`(`slug`),
    INDEX `Service_publishStatus_idx`(`publishStatus`),
    INDEX `Service_sortOrder_idx`(`sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToolkitProduct` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `subtitle` VARCHAR(500) NULL,
    `description` LONGTEXT NOT NULL,
    `status` ENUM('AVAILABLE_NOW', 'COMING_SOON', 'IN_DEVELOPMENT') NOT NULL DEFAULT 'COMING_SOON',
    `contents` JSON NULL,
    `licenceSummary` LONGTEXT NULL,
    `disclaimer` LONGTEXT NULL,
    `ctaLabel` VARCHAR(100) NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` VARCHAR(500) NULL,
    `publishStatus` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ToolkitProduct_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademyCourse` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `summary` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` ENUM('AVAILABLE_NOW', 'COMING_SOON', 'IN_DEVELOPMENT') NOT NULL DEFAULT 'COMING_SOON',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `audience` TEXT NULL,
    `outcomes` JSON NULL,
    `futureFeatures` JSON NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` VARCHAR(500) NULL,
    `publishStatus` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AcademyCourse_slug_key`(`slug`),
    INDEX `AcademyCourse_sortOrder_idx`(`sortOrder`),
    INDEX `AcademyCourse_publishStatus_idx`(`publishStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insight` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `publishStatus` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `publishedAt` DATETIME(3) NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Insight_slug_key`(`slug`),
    INDEX `Insight_publishStatus_publishedAt_idx`(`publishStatus`, `publishedAt`),
    INDEX `Insight_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FAQ` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(500) NOT NULL,
    `answer` TEXT NOT NULL,
    `category` VARCHAR(100) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `publishStatus` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `FAQ_sortOrder_idx`(`sortOrder`),
    INDEX `FAQ_publishStatus_idx`(`publishStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSetting` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `value` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SiteSetting_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomepageSection` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `title` VARCHAR(300) NULL,
    `content` JSON NOT NULL,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `HomepageSection_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeoEntry` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(300) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `ogTitle` VARCHAR(200) NULL,
    `ogDescription` VARCHAR(500) NULL,
    `noindex` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SeoEntry_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RateLimitRecord` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `windowStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    INDEX `RateLimitRecord_key_idx`(`key`),
    INDEX `RateLimitRecord_expiresAt_idx`(`expiresAt`),
    UNIQUE INDEX `RateLimitRecord_key_windowStart_key`(`key`, `windowStart`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrcPlatformContent` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `status` ENUM('AVAILABLE_NOW', 'COMING_SOON', 'IN_DEVELOPMENT') NOT NULL DEFAULT 'IN_DEVELOPMENT',
    `summary` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `features` JSON NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` VARCHAR(500) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

