const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config();
require("./mail/transporter");

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ msg: "PONG" });
});

app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected successfully...");
    // process the queued jobs after DB Connection
    require("./queue/worker");
  })
  .catch((error) => console.log(error));

const PORT = 4000;

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));
