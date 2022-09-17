import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1663402373568 implements MigrationInterface {
    name = 'migration1663402373568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient_to_tag_to_good" ("ingredientToTagToGoodId" SERIAL NOT NULL, "ingredientId" integer NOT NULL, "tagId" integer NOT NULL, "goodId" integer NOT NULL, CONSTRAINT "PK_12896614479d91a91d8ba149608" PRIMARY KEY ("ingredientToTagToGoodId"))`);
        await queryRunner.query(`CREATE TABLE "good" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "desc" character varying NOT NULL, "except" character varying, "price" integer NOT NULL, "howUse" character varying, "volume" character varying, "mainPhotoId" integer, CONSTRAINT "PK_0aceec75d523693a51fad812e2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characteristic_to_tag_to_good" ("id" SERIAL NOT NULL, "characteristicId" integer, "tagId" integer, "goodId" integer, CONSTRAINT "PK_69024764d3d41ab499a52ec9291" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characteristic" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "test" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "good_images_image" ("goodId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_db3676377afea183243c42049dd" PRIMARY KEY ("goodId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5567cd9106b3176afb530abca" ON "good_images_image" ("goodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0cba732277acafa197c252f5d" ON "good_images_image" ("imageId") `);
        await queryRunner.query(`CREATE TABLE "good_categories_category" ("goodId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_00d250eaea044eff8d11df08722" PRIMARY KEY ("goodId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ccac6487787ab6a94ff2b8ac6f" ON "good_categories_category" ("goodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f63a7f3e49f9cec4c9799c6ef5" ON "good_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" ADD CONSTRAINT "FK_26bf2abdfc077cd56cb78c89f9e" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" ADD CONSTRAINT "FK_f2a1da44c0911f3c343af4e2920" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" ADD CONSTRAINT "FK_1b41921425e00a743617ff8b698" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good" ADD CONSTRAINT "FK_8b14b27ce1823c5246cd61b4bf4" FOREIGN KEY ("mainPhotoId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" ADD CONSTRAINT "FK_446a805c892c662c8e36c8b7ab9" FOREIGN KEY ("characteristicId") REFERENCES "characteristic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" ADD CONSTRAINT "FK_7cac4357a7398653b726fa51f86" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" ADD CONSTRAINT "FK_0dcf243ebf95be53eb91f4bffdf" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good_images_image" ADD CONSTRAINT "FK_f5567cd9106b3176afb530abcaf" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "good_images_image" ADD CONSTRAINT "FK_f0cba732277acafa197c252f5d9" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good_categories_category" ADD CONSTRAINT "FK_ccac6487787ab6a94ff2b8ac6fe" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "good_categories_category" ADD CONSTRAINT "FK_f63a7f3e49f9cec4c9799c6ef53" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "good_categories_category" DROP CONSTRAINT "FK_f63a7f3e49f9cec4c9799c6ef53"`);
        await queryRunner.query(`ALTER TABLE "good_categories_category" DROP CONSTRAINT "FK_ccac6487787ab6a94ff2b8ac6fe"`);
        await queryRunner.query(`ALTER TABLE "good_images_image" DROP CONSTRAINT "FK_f0cba732277acafa197c252f5d9"`);
        await queryRunner.query(`ALTER TABLE "good_images_image" DROP CONSTRAINT "FK_f5567cd9106b3176afb530abcaf"`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" DROP CONSTRAINT "FK_0dcf243ebf95be53eb91f4bffdf"`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" DROP CONSTRAINT "FK_7cac4357a7398653b726fa51f86"`);
        await queryRunner.query(`ALTER TABLE "characteristic_to_tag_to_good" DROP CONSTRAINT "FK_446a805c892c662c8e36c8b7ab9"`);
        await queryRunner.query(`ALTER TABLE "good" DROP CONSTRAINT "FK_8b14b27ce1823c5246cd61b4bf4"`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" DROP CONSTRAINT "FK_1b41921425e00a743617ff8b698"`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" DROP CONSTRAINT "FK_f2a1da44c0911f3c343af4e2920"`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_tag_to_good" DROP CONSTRAINT "FK_26bf2abdfc077cd56cb78c89f9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f63a7f3e49f9cec4c9799c6ef5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccac6487787ab6a94ff2b8ac6f"`);
        await queryRunner.query(`DROP TABLE "good_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0cba732277acafa197c252f5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f5567cd9106b3176afb530abca"`);
        await queryRunner.query(`DROP TABLE "good_images_image"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "characteristic"`);
        await queryRunner.query(`DROP TABLE "characteristic_to_tag_to_good"`);
        await queryRunner.query(`DROP TABLE "good"`);
        await queryRunner.query(`DROP TABLE "ingredient_to_tag_to_good"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
