import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLessonProgressTable1769015080087 implements MigrationInterface {
    name = 'AlterLessonProgressTable1769015080087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP COLUMN "progress_percent"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD "progress_percent" smallint`);
    }

}
