import { Pool } from "pg"

declare global {
    var pgPool: Pool | undefined
}

export const pool = 
    global.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
        connectionLimit: 10,
        idleTimeoutMillis:20000,
        connectionTimeoutMillis: 5000    
    })
