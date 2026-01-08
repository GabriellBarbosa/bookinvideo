import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseModuleTable1767834539590 implements MigrationInterface {
    name = 'CreateCourseModuleTable1767834539590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "title" character varying(200) NOT NULL, "slug" character varying(160) NOT NULL, "description" text, "position" integer NOT NULL, "is_published" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4c195db0718e8845a6e09075ebc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0090425128642596da188fd823" ON "course_modules" ("course_id", "slug") `);
        await queryRunner.query(`ALTER TABLE "course_modules" ADD CONSTRAINT "FK_81644557c2401f37fe9e884e884" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_modules" DROP CONSTRAINT "FK_81644557c2401f37fe9e884e884"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0090425128642596da188fd823"`);
        await queryRunner.query(`DROP TABLE "course_modules"`);
    }

}
