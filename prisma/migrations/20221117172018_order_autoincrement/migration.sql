-- AlterTable
CREATE SEQUENCE "bookmark_order_seq";
ALTER TABLE "BookMark" ALTER COLUMN "order" SET DEFAULT nextval('bookmark_order_seq');
ALTER SEQUENCE "bookmark_order_seq" OWNED BY "BookMark"."order";
