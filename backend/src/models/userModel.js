const pool = require("../config/db");

class UserModel {
  static async createUser(email, password) {
    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ('${email}', '${password}') RETURNING *`
    );
    return result.rows[0];
  }

  static async findUserByEmail(email, password) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    );
    return result.rows[0];
  }
}

module.exports = UserModel;
