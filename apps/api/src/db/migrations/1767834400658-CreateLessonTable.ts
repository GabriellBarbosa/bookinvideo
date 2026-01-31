import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessonTable1767834400658 implements MigrationInterface {
    name = 'CreateLessonTable1767834400658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lessons_video_provider_enum" AS ENUM('youtube')`);
        await queryRunner.query(`CREATE TYPE "public"."lessons_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(160) NOT NULL, "course_id" uuid NOT NULL, "module_id" uuid NOT NULL, "title" character varying(200) NOT NULL, "description" text, "video_provider" "public"."lessons_video_provider_enum", "video_id" character varying, "video_url" character varying, "duration_seconds" integer, "position" integer NOT NULL, "is_free" boolean NOT NULL DEFAULT false, "status" "public"."lessons_status_enum" NOT NULL DEFAULT 'draft', "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_622924f19a22f523e0163a21b1" ON "lessons" ("course_id", "slug") `);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_622924f19a22f523e0163a21b1"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`DROP TYPE "public"."lessons_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lessons_video_provider_enum"`);
    }

}
