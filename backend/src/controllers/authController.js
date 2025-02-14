const UserModel = require("../models/userModel");

const authController = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Пользователь уже существует" });
      }

      const newUser = await UserModel.createUser(email, password);
      res
        .status(201)
        .json({
          success: true,
          message: "Пользователь успешно зарегистрирован",
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findUserByEmail(email);
      if (!user || user.password !== password) {
        return res
          .status(400)
          .json({ success: false, message: "Неверный email или пароль" });
      }

      req.session.user_id = user.user_id;

      res.json({ success: true, message: "Авторизация успешна" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Ошибка сервера" });
      }
      res.json({ success: true, message: "Выход выполнен успешно" });
    });
  },
};

module.exports = authController;
