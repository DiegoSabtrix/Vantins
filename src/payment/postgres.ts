import { Pool } from 'pg';

const schema = [
  `CREATE TABLE IF NOT EXISTS payments (
    id text PRIMARY KEY, request_id text NOT NULL UNIQUE, stripe_intent_id text UNIQUE,
    reference text NOT NULL, payment_type text NOT NULL, full_name text NOT NULL,
    email text NOT NULL, phone text NOT NULL, notes text, amount_cents integer NOT NULL,
    fee_cents integer NOT NULL DEFAULT 0, total_cents integer NOT NULL,
    status text NOT NULL DEFAULT 'creating', consent_at text NOT NULL,
    created_at text NOT NULL, updated_at text NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS stripe_events (
    id text PRIMARY KEY, payment_id text NOT NULL, type text NOT NULL, received_at text NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS payment_notifications (
    id text PRIMARY KEY, payment_id text NOT NULL, kind text NOT NULL,
    recipient text NOT NULL, provider_id text, sent_at text,
    UNIQUE (payment_id, kind, recipient)
  )`,
];

export type PaymentDB = {
  prepare(sql: string): {
    bind(...values: unknown[]): {
      first<T>(): Promise<T | null>;
      run(): Promise<{ meta: { changes: number } }>;
    };
  };
};

let pool: Pool | undefined;
let initialized: Promise<void> | undefined;

function database(url: string): Pool {
  pool ??= new Pool({ connectionString: url, max: 5, connectionTimeoutMillis: 5000 });
  return pool;
}

function translate(sql: string): string {
  let index = 0;
  const ignore = /^\s*INSERT OR IGNORE INTO\s/i.test(sql);
  const statement = sql.replace(/^\s*INSERT OR IGNORE INTO\s/i, 'INSERT INTO ')
    .replace(/\?/g, () => `$${++index}`);
  return ignore ? `${statement} ON CONFLICT DO NOTHING` : statement;
}

export function postgresDB(url: string): PaymentDB {
  const client = database(url);
  return {
    prepare(sql) {
      return {
        bind(...values) {
          async function query() {
            initialized ??= (async () => {
              for (const statement of schema) await client.query(statement);
            })().catch((error) => { initialized = undefined; throw error; });
            await initialized;
            return client.query(translate(sql), values);
          }
          return {
            async first<T>() { return (await query()).rows[0] as T | undefined ?? null; },
            async run() { return { meta: { changes: (await query()).rowCount ?? 0 } }; },
          };
        },
      };
    },
  };
}
