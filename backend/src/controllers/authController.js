const UserModel = require("../models/userModel");

const authController = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const newUser = await UserModel.createUser(email, password);
      res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Неверный email или пароль" });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Неверный email или пароль" });
      }

      req.session.user_id = user.user_id;

      res.json({ message: "Авторизация успешна" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Ошибка сервера");
      }
      res.json({ message: "Выход выполнен успешно" });
    });
  },
};

module.exports = authController;
