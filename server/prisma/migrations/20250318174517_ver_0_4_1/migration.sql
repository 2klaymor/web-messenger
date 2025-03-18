/*
  Warnings:

  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `ownerName` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetName` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts" (
    "ownerName" TEXT NOT NULL,
    "targetName" TEXT NOT NULL,
    "displayName" TEXT,

    PRIMARY KEY ("ownerName", "targetName"),
    CONSTRAINT "contacts_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "users" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_targetName_fkey" FOREIGN KEY ("targetName") REFERENCES "users" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("displayName") SELECT "displayName" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
