import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin1',
    password: 'admin123@...',
    database: 'afpcrecer',
});

export async function query(sql, params) {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.execute(sql, params);
		if (conn) conn.release();
		return rows;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.release();
	}
}