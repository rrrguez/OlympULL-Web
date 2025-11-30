import pool from "../db.js";

const Users = {
    async findOne({ username }) {
        const query = `SELECT * FROM t_users WHERE username = $1`;
        const values = [username];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    },

    async create({ username, password, type }) {
        const query = `
            INSERT INTO t_users (id, username, password, type)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [id, username, password, type];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query(`SELECT * FROM t_users`);
        return result.rows;
    },

    async delete(id) {
        await pool.query(`DELETE FROM t_users WHERE id = $1`, [id]);
    }
};

export default Users;
