const pool = require("../config/db");

class UserModel {
  static async createUser(email, password) {
    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
      [email, password]
    );
    return result.rows[0];
  }

  static async findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
}

module.exports = UserModel;
