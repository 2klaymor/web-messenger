/*
  Warnings:

  - The primary key for the `chat_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `chat_users` table. All the data in the column will be lost.
  - Added the required column `userName` to the `chat_users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chat_users" (
    "userName" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,

    PRIMARY KEY ("userName", "chatId"),
    CONSTRAINT "chat_users_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chat_users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chat_users" ("chatId") SELECT "chatId" FROM "chat_users";
DROP TABLE "chat_users";
ALTER TABLE "new_chat_users" RENAME TO "chat_users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
