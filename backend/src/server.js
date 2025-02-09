const express = require("express");
const session = require("express-session");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
