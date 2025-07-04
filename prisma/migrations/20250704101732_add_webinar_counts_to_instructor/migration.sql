/*
  Warnings:

  - You are about to drop the column `category` on the `Webniar` table. All the data in the column will be lost.
  - You are about to drop the column `instructor` on the `Webniar` table. All the data in the column will be lost.
  - You are about to drop the column `instructorTitle` on the `Webniar` table. All the data in the column will be lost.
  - Added the required column `instructorId` to the `Webniar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webniar" DROP COLUMN "category",
DROP COLUMN "instructor",
DROP COLUMN "instructorTitle",
ADD COLUMN     "instructorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalWebinars" INTEGER NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "avatar" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "upcomingWebinars" INTEGER NOT NULL DEFAULT 0,
    "completedWebinars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- AddForeignKey
ALTER TABLE "Webniar" ADD CONSTRAINT "Webniar_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
