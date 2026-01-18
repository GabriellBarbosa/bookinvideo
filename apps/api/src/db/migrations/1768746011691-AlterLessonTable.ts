import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLessonTable1768746011691 implements MigrationInterface {
    name = 'AlterLessonTable1768746011691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_622924f19a22f523e0163a21b1"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_08403d62f21ebca199442a055b" ON "lessons" ("module_id", "slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_08403d62f21ebca199442a055b"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_622924f19a22f523e0163a21b1" ON "lessons" ("course_id", "slug") `);
    }

}
