import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665678067093 implements MigrationInterface {
    name = 'migration1665678067093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_goods_good" ("cartId" integer NOT NULL, "goodId" integer NOT NULL, CONSTRAINT "PK_3dbc2e1d2f6ec3ef0770f414e35" PRIMARY KEY ("cartId", "goodId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1cfeeb5211f9be0ab1c97df1fe" ON "cart_goods_good" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92d39b8938235b7056bcd61465" ON "cart_goods_good" ("goodId") `);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_goods_good" ADD CONSTRAINT "FK_1cfeeb5211f9be0ab1c97df1fe3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_goods_good" ADD CONSTRAINT "FK_92d39b8938235b7056bcd61465c" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_goods_good" DROP CONSTRAINT "FK_92d39b8938235b7056bcd61465c"`);
        await queryRunner.query(`ALTER TABLE "cart_goods_good" DROP CONSTRAINT "FK_1cfeeb5211f9be0ab1c97df1fe3"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92d39b8938235b7056bcd61465"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cfeeb5211f9be0ab1c97df1fe"`);
        await queryRunner.query(`DROP TABLE "cart_goods_good"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
