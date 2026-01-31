import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1767731709671 implements MigrationInterface {
    name = 'AlterUserTable1767731709671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider_user_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider_user_id" DROP NOT NULL`);
    }

}
