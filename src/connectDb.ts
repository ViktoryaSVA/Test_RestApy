import { Pool, PoolClient } from 'pg';
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
});

async function createTable(): Promise<void> {
    const client: PoolClient = await pool.connect();
    const query: string = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        salary VARCHAR(255) NOT NULL,
        currency VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        sub_department VARCHAR(255) NOT NULL,
        on_contract VARCHAR(255)
    )
  `;

    await client.query(query);
    client.release();
}

export { pool, createTable };
