import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessonProgressTable1767835071524 implements MigrationInterface {
    name = 'CreateLessonProgressTable1767835071524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson_progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "last_position_seconds" integer, "progress_percent" smallint, "completed_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e6223ebbc5f8f5fce40e0193de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f34e3a227170e0ce674e0afb58" ON "lesson_progress" ("user_id", "lesson_id") `);
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_0d9292b3eb40707950eeeba9617" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_980e74721039ebe210fee2eeca2" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_980e74721039ebe210fee2eeca2"`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_0d9292b3eb40707950eeeba9617"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f34e3a227170e0ce674e0afb58"`);
        await queryRunner.query(`DROP TABLE "lesson_progress"`);
    }

}
