import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1767832428004 implements MigrationInterface {
    name = 'CreateCourseTable1767832428004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(160) NOT NULL, "title" character varying(200) NOT NULL, "short_description" character varying(300), "description" text, "thumbnail_url" character varying(2048), "intro_video_url" character varying(2048), "estimated_hours" integer, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a" UNIQUE ("slug"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a3bb2d01cfa0f95bc5e034e1b7" ON "courses" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a3bb2d01cfa0f95bc5e034e1b7"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
