const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("./mail/transporter");
// process the queued jobs
require("./queue/worker");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

mongoose
  .connect("mongodb://localhost/queuing")
  .then((success) => console.log("Mongodb connected successfully..."))
  .catch((error) => console.log(error));

const PORT = 4000;

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));
