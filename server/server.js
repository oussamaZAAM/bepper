const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//Send API Key
app.get("/api/api-key", (req, res) => {
  res.send(process.env.apiKey);
})

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:"+process.env.PORT);
});