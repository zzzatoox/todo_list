const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  validateTaskCreation,
  validateTaskUpdate,
  validateTaskStatusUpdate,
} = require("../middleware/taskValidation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Управление задачами
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить список всех задач пользователя
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список задач
 *       401:
 *         description: Неавторизован
 */
router.get("/tasks", authMiddleware, taskController.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок задачи
 *               description:
 *                 type: string
 *                 description: Описание задачи
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Дата выполнения задачи
 *               status_id:
 *                 type: integer
 *                 description: ID статуса задачи
 *               priority_id:
 *                 type: integer
 *                 description: ID приоритета задачи
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Задача успешно создана
 *       400:
 *         description: Некорректные данные
 *       401:
 *         description: Неавторизован
 */
router.post(
  "/tasks",
  authMiddleware,
  validateTaskCreation,
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача успешно получена
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Задача не найдена
 */
router.get("/tasks/:id", authMiddleware, taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Обновить задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок задачи
 *               description:
 *                 type: string
 *                 description: Описание задачи
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Дата выполнения задачи
 *               status_id:
 *                 type: integer
 *                 description: ID статуса задачи
 *               priority_id:
 *                 type: integer
 *                 description: ID приоритета задачи
 *     responses:
 *       200:
 *         description: Задача успешно обновлена
 *       400:
 *         description: Некорректные данные
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Задача не найдена
 */
router.put(
  "/tasks/:id",
  authMiddleware,
  validateTaskUpdate,
  taskController.updateTask
);

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     summary: Обновить статус задачи
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_id:
 *                 type: integer
 *                 description: Новый ID статуса задачи (от 1 до 5)
 *             required:
 *               - status_id
 *     responses:
 *       200:
 *         description: Статус задачи успешно обновлен
 *       400:
 *         description: Некорректные данные
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Задача не найдена
 */
router.put(
  "/tasks/:id/status",
  authMiddleware,
  validateTaskStatusUpdate,
  taskController.updateTaskStatus
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача успешно удалена
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Задача не найдена
 */
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
