import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665841914470 implements MigrationInterface {
    name = 'migration1665841914470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "roleId" integer NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "goodId" integer, "cartId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "good" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "desc" character varying NOT NULL, "except" character varying, "price" integer NOT NULL, "howUse" character varying, "volume" character varying, "vendorCode" character varying NOT NULL, "count" smallint NOT NULL DEFAULT '0', "mainPhotoId" integer, "categoryId" integer, CONSTRAINT "PK_0aceec75d523693a51fad812e2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "tagId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characteristic" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "tagId" integer, CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "good_images_image" ("goodId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_db3676377afea183243c42049dd" PRIMARY KEY ("goodId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5567cd9106b3176afb530abca" ON "good_images_image" ("goodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0cba732277acafa197c252f5d" ON "good_images_image" ("imageId") `);
        await queryRunner.query(`CREATE TABLE "good_tags_tag" ("goodId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_ebe4fdcdd1fcc75aca6a4de5639" PRIMARY KEY ("goodId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42c0b1841a47a848cdd42f38b4" ON "good_tags_tag" ("goodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af1cdeff2dbe1911014ef2afbf" ON "good_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_471d9964b51ccae51159ce0d1ff" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_8822e16d1a9006cc65c69eafedb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good" ADD CONSTRAINT "FK_8b14b27ce1823c5246cd61b4bf4" FOREIGN KEY ("mainPhotoId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good" ADD CONSTRAINT "FK_87d29fce743b048a9deaa5cb67e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_b982b0bfd4ec294fa164a4522a8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristic" ADD CONSTRAINT "FK_4789a80db07a20396700c24f45a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good_images_image" ADD CONSTRAINT "FK_f5567cd9106b3176afb530abcaf" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "good_images_image" ADD CONSTRAINT "FK_f0cba732277acafa197c252f5d9" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "good_tags_tag" ADD CONSTRAINT "FK_42c0b1841a47a848cdd42f38b49" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "good_tags_tag" ADD CONSTRAINT "FK_af1cdeff2dbe1911014ef2afbf9" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "good_tags_tag" DROP CONSTRAINT "FK_af1cdeff2dbe1911014ef2afbf9"`);
        await queryRunner.query(`ALTER TABLE "good_tags_tag" DROP CONSTRAINT "FK_42c0b1841a47a848cdd42f38b49"`);
        await queryRunner.query(`ALTER TABLE "good_images_image" DROP CONSTRAINT "FK_f0cba732277acafa197c252f5d9"`);
        await queryRunner.query(`ALTER TABLE "good_images_image" DROP CONSTRAINT "FK_f5567cd9106b3176afb530abcaf"`);
        await queryRunner.query(`ALTER TABLE "characteristic" DROP CONSTRAINT "FK_4789a80db07a20396700c24f45a"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_b982b0bfd4ec294fa164a4522a8"`);
        await queryRunner.query(`ALTER TABLE "good" DROP CONSTRAINT "FK_87d29fce743b048a9deaa5cb67e"`);
        await queryRunner.query(`ALTER TABLE "good" DROP CONSTRAINT "FK_8b14b27ce1823c5246cd61b4bf4"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_8822e16d1a9006cc65c69eafedb"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_471d9964b51ccae51159ce0d1ff"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af1cdeff2dbe1911014ef2afbf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42c0b1841a47a848cdd42f38b4"`);
        await queryRunner.query(`DROP TABLE "good_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0cba732277acafa197c252f5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f5567cd9106b3176afb530abca"`);
        await queryRunner.query(`DROP TABLE "good_images_image"`);
        await queryRunner.query(`DROP TABLE "characteristic"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "good"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
