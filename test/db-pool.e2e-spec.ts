import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { sql } from 'drizzle-orm';
import { Client } from 'pg';
import { Database, DbModule, DRIZZLE } from '@db/db.module';

/**
 * Regression for the 2026-09-01 crash: an idle pooled connection dropped
 * (ENETUNREACH), the pool emitted 'error' with no listener, and Node exited.
 * Terminating the backend from outside reproduces the same idle-client error.
 */
describe('Database pool (e2e)', () => {
  let moduleRef: TestingModule;
  let db: Database;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule],
    }).compile();
    db = moduleRef.get<Database>(DRIZZLE);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('survives an idle connection being killed and reconnects', async () => {
    const { rows } = await db.execute<{ pid: number }>(sql`select pg_backend_pid() as pid`);

    const admin = new Client({ connectionString: process.env.DATABASE_URL });
    await admin.connect();
    await admin.query('select pg_terminate_backend($1)', [rows[0].pid]);
    await admin.end();
    // Give the pool a moment to receive the error on the now-idle client.
    await new Promise((resolve) => setTimeout(resolve, 200));

    const after = await db.execute<{ ok: number }>(sql`select 1 as ok`);
    expect(after.rows[0].ok).toBe(1);
  });
});
