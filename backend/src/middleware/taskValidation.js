const { body, validationResult } = require("express-validator");

exports.validateTaskCreation = [
  body("title")
    .notEmpty()
    .withMessage("Заголовок должен быть заполнен")
    .isLength({ max: 100 })
    .withMessage("Заголовок не должен превышать 100 символов"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Описание не должно превышать 255 символов"),
  body("due_date").optional().isISO8601().withMessage("Неверный формат даты"),
  body("status_id")
    .optional()
    .isInt({ min: 1, max: 2 })
    .withMessage("Статус должен быть числом от 1 до 2"),
  body("priority_id")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("Приоритет должен быть числом от 1 до 3"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateTaskUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Заголовок должен быть заполнен")
    .isLength({ max: 100 })
    .withMessage("Заголовок не должен превышать 100 символов"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Описание не должно превышать 255 символов"),
  body("due_date").optional().isISO8601().withMessage("Неверный формат даты"),
  body("priority_id")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("Приоритет должен быть числом от 1 до 3"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateTaskStatusUpdate = [
  body("status_id")
    .isInt({ min: 1, max: 2 })
    .withMessage("Статус должен быть числом от 1 до 2"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
