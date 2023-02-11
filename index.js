const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();
dotenv.config();
app.use(cors());

const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");

// database connection
connection();

// middlewares
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

//Send API Key
app.get("/api/api-key", (req, res) => {
  res.send(process.env.apiKey);
})

//Serve the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:"+process.env.PORT);
});