import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});

export const cmsPool = new Pool({
    host: '10.6.131.206', //process.env.CMS_DB_HOST,
    user: 'postgres', //process.env.CMS_DB_USER,
    password: 'cms-password', //process.env.CMS_DB_PASSWORD,
    database: 'cmsdb', //process.env.CMS_DB_NAME,
    port: 5432
});

export default pool;

