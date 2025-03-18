/*
  Warnings:

  - You are about to drop the `chat_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_read_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_relations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isGroup` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `isEdited` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `replyToId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "chat_members_userId_chatId_key";

-- DropIndex
DROP INDEX "message_read_status_messageId_userId_key";

-- DropIndex
DROP INDEX "user_relations_userId_targetUserId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "chat_members";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "message_read_status";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_relations";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "contacts" (
    "ownerId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "displayName" TEXT,

    PRIMARY KEY ("ownerId", "targetId"),
    CONSTRAINT "contacts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_users" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "chatId"),
    CONSTRAINT "chat_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chat_users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_chats" ("id") SELECT "id" FROM "chats";
DROP TABLE "chats";
ALTER TABLE "new_chats" RENAME TO "chats";
CREATE TABLE "new_messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("chatId", "content", "createdAt", "id", "senderId") SELECT "chatId", "content", "createdAt", "id", "senderId" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "displayName" TEXT,
    "passwordHash" TEXT NOT NULL,
    "lastSeen" DATETIME
);
INSERT INTO "new_users" ("displayName", "id", "lastSeen", "name", "passwordHash") SELECT "displayName", "id", "lastSeen", "name", "passwordHash" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
