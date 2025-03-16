/*
  Warnings:

  - You are about to drop the `_ReceivedMessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isGroup` on the `chats` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_ReceivedMessages_B_index";

-- DropIndex
DROP INDEX "_ReceivedMessages_AB_unique";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN "contentType" TEXT;
ALTER TABLE "attachments" ADD COLUMN "metadata" TEXT;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "users" ADD COLUMN "avatarUrl" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ReceivedMessages";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "message_read_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "messageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" DATETIME,
    "deliveredAt" DATETIME,
    CONSTRAINT "message_read_status_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_read_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contact_groups" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chat_participants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "permissions" TEXT,
    CONSTRAINT "chat_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chat_participants_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chat_participants" ("chatId", "id", "joinedAt", "role", "userId") SELECT "chatId", "id", "joinedAt", "role", "userId" FROM "chat_participants";
DROP TABLE "chat_participants";
ALTER TABLE "new_chat_participants" RENAME TO "chat_participants";
CREATE UNIQUE INDEX "chat_participants_userId_chatId_key" ON "chat_participants"("userId", "chatId");
CREATE TABLE "new_chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "type" TEXT NOT NULL DEFAULT 'DIRECT',
    "avatarUrl" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_chats" ("avatarUrl", "createdAt", "id", "name", "updatedAt") SELECT "avatarUrl", "createdAt", "id", "name", "updatedAt" FROM "chats";
DROP TABLE "chats";
ALTER TABLE "new_chats" RENAME TO "chats";
CREATE TABLE "new_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "displayName" TEXT,
    "notes" TEXT,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "groupId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "contact_groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("blocked", "contactId", "createdAt", "displayName", "id", "updatedAt", "userId") SELECT "blocked", "contactId", "createdAt", "displayName", "id", "updatedAt", "userId" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
CREATE UNIQUE INDEX "contacts_userId_contactId_key" ON "contacts"("userId", "contactId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "message_read_status_messageId_userId_key" ON "message_read_status"("messageId", "userId");
