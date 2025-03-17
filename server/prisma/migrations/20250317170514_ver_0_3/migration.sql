/*
  Warnings:

  - You are about to drop the column `blocked` on the `user_relations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "targetUserId" INTEGER NOT NULL,
    "displayName" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "user_relations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_relations_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_relations" ("displayName", "id", "isFavorite", "targetUserId", "userId") SELECT "displayName", "id", "isFavorite", "targetUserId", "userId" FROM "user_relations";
DROP TABLE "user_relations";
ALTER TABLE "new_user_relations" RENAME TO "user_relations";
CREATE UNIQUE INDEX "user_relations_userId_targetUserId_key" ON "user_relations"("userId", "targetUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
