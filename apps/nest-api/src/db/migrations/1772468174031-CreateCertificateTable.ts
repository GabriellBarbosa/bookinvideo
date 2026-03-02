import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCertificateTable1772468174031 implements MigrationInterface {
    name = 'CreateCertificateTable1772468174031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_id" character varying(32) NOT NULL, "user_id" uuid NOT NULL, "course_id" uuid NOT NULL, "recipient_name" character varying(140) NOT NULL, "course_title" character varying(140) NOT NULL, "workload_hours" integer NOT NULL, "completed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "issued_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "revoked_at" TIMESTAMP WITH TIME ZONE, "revoke_reason" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e4c7e31e2144300bea7d89eb165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "certificates_user_id_course_id_unique" ON "certificates" ("user_id", "course_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "certificates_public_id_unique" ON "certificates" ("public_id") `);
        await queryRunner.query(`ALTER TABLE "certificates" ADD CONSTRAINT "FK_88f90b1b9c635c14271e509cec0" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificates" ADD CONSTRAINT "FK_3b6a412073ea28153dc20a843b4" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificates" DROP CONSTRAINT "FK_3b6a412073ea28153dc20a843b4"`);
        await queryRunner.query(`ALTER TABLE "certificates" DROP CONSTRAINT "FK_88f90b1b9c635c14271e509cec0"`);
        await queryRunner.query(`DROP INDEX "public"."certificates_public_id_unique"`);
        await queryRunner.query(`DROP INDEX "public"."certificates_user_id_course_id_unique"`);
        await queryRunner.query(`DROP TABLE "certificates"`);
    }

}
