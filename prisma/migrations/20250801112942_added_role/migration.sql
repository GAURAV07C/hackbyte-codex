-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'LEAD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" DEFAULT 'USER';
