const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  validateTaskCreation,
  validateTaskUpdate,
  validateTaskStatusUpdate,
} = require("../middleware/taskValidation");

const router = express.Router();

router.get("/tasks", authMiddleware, taskController.getAllTasks);
router.post(
  "/tasks",
  authMiddleware,
  validateTaskCreation,
  taskController.createTask
);
router.put(
  "/tasks/:id",
  authMiddleware,
  validateTaskUpdate,
  taskController.updateTask
);
router.put(
  "/tasks/:id/status",
  authMiddleware,
  validateTaskStatusUpdate,
  taskController.updateTaskStatus
);
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
