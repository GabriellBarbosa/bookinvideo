import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLessonTable1769170135729 implements MigrationInterface {
    name = 'AlterLessonTable1769170135729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" ALTER COLUMN "video_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" ALTER COLUMN "video_id" DROP NOT NULL`);
    }

}
