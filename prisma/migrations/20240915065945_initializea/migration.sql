-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "Image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "Image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" ALTER COLUMN "Image" DROP NOT NULL;
