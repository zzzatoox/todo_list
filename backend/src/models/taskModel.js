const pool = require("../config/db");

class TaskModel {
  static async getAllTasks(user_id) {
    const result = await pool.query(
      `
      SELECT tasks.task_id, tasks.title, tasks.description, tasks.created_at, tasks.updated_at, tasks.due_date,
             task_statuses.name, task_priorities.name
      FROM tasks
      JOIN task_statuses ON tasks.status_id = task_statuses.status_id
      JOIN task_priorities ON tasks.priority_id = task_priorities.priority_id
      WHERE tasks.user_id = $1
    `,
      [user_id]
    );
    return result.rows;
  }

  static async createTask(
    user_id,
    title,
    description = null,
    due_date = null,
    status_id = 1,
    priority_id = 1
  ) {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, due_date, status_id, priority_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, title, description, due_date, status_id, priority_id]
    );
    return result.rows[0];
  }

  static async updateTask(task_id, title, description, due_date, priority_id) {
    const result = await pool.query(
      "UPDATE tasks SET title = $2, description = $3, due_date = $4, priority_id = $5, updated_at = CURRENT_TIMESTAMP WHERE task_id = $1 RETURNING *",
      [task_id, title, description, due_date, priority_id]
    );
    return result.rows[0];
  }

  static async updateTaskStatus(task_id, status_id) {
    const result = await pool.query(
      `UPDATE tasks
       SET status_id = $1, updated_at = CURRENT_TIMESTAMP
       WHERE task_id = $2 RETURNING *`,
      [status_id, task_id]
    );
    return result.rows[0];
  }

  static async deleteTask(task_id) {
    const result = await pool.query(
      "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
      [task_id]
    );
    return result.rows[0];
  }
}

module.exports = TaskModel;
