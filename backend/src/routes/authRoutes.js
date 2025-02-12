const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация пользователей
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Пользователь уже существует или некорректные данные
 *       500:
 *         description: Ошибка сервера
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Авторизация успешна
 *       400:
 *         description: Неверный email или пароль
 *       500:
 *         description: Ошибка сервера
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход из системы
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Выход выполнен успешно
 *       500:
 *         description: Ошибка сервера
 */
router.post("/logout", authController.logout);

module.exports = router;
