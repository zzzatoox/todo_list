const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { swaggerSpec, swaggerUi } = require("./config/swagger");
require("dotenv").config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
};

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/test-session", (req, res) => {
  if (req.session.user_id) {
    res.json({ user_id: req.session.user_id, message: "Сессия активна" });
  } else {
    res.status(401).json({ message: "Сессия не найдена" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
