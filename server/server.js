const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
app.use(cors());

app.get("/api/api-key", (req, res) => {
  res.send(process.env.apiKey);
})

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:"+process.env.PORT);
});