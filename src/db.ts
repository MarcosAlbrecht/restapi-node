import { Pool } from "pg";

const connectionString = 'postgres://dqjjumbi:9PVMTX0j-1fJV772gnQ1f1ol_-8v1UPu@babar.db.elephantsql.com/dqjjumbi';

const db = new Pool({connectionString});

export default db;