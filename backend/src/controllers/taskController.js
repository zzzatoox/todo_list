const TaskModel = require("../models/taskModel");

const taskController = {
  async getAllTasks(req, res) {
    const user_id = req.user_id;
    try {
      const tasks = await TaskModel.getAllTasks(user_id);

      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async createTask(req, res) {
    const { title, description, due_date, status_id, priority_id } = req.body;
    const user_id = req.user_id;
    try {
      const newTask = await TaskModel.createTask(
        user_id,
        title,
        description,
        due_date,
        status_id,
        priority_id
      );
      res.json(newTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async getTaskById(req, res) {
    const { id } = req.params;
    const user_id = req.user_id;

    try {
      const task = await TaskModel.getTaskById(user_id, id);

      if (!task) {
        return res.status(404).json({ message: "Задача не найдена" });
      }

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async updateTask(req, res) {
    const { id } = req.params;
    const { title, description, due_date, priority_id } = req.body;

    try {
      const updatedTask = await TaskModel.updateTask(
        id,
        title,
        description,
        due_date,
        priority_id
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      res.json(updatedTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async updateTaskStatus(req, res) {
    const { id } = req.params;
    const { status_id } = req.body;
    try {
      const updatedTask = await TaskModel.updateTaskStatus(id, status_id);
      res.json(updatedTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async deleteTask(req, res) {
    const { id } = req.params;

    try {
      const deletedTask = await TaskModel.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      res.json({ message: "Задача успешно удалена", task: deletedTask });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },
};

module.exports = taskController;
