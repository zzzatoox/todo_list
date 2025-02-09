const authMiddleware = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }
  req.user_id = req.session.user_id;
  next();
};

module.exports = authMiddleware;
