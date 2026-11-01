import { Global, Inject, Injectable, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE');
const PG_POOL = Symbol('PG_POOL');
const logger = new Logger('Database');
export type Database = NodePgDatabase<typeof schema>;

@Injectable()
class PoolLifecycle implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Pool => {
        const pool = new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
          ssl: config.get('DATABASE_SSL') === 'true' ? { rejectUnauthorized: true } : undefined,
        });
        // An idle client losing its connection (network blip, RDS maintenance)
        // makes the pool emit 'error'; with no listener that kills the process
        // (it did on 2026-09-01). pg-pool has already discarded the dead client
        // by then, so logging is enough — the next query opens a fresh one.
        pool.on('error', (err) => logger.error(`Idle database client error: ${err.message}`));
        return pool;
      },
    },
    {
      provide: DRIZZLE,
      inject: [PG_POOL],
      useFactory: (pool: Pool): Database => drizzle(pool, { schema }),
    },
    PoolLifecycle,
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
