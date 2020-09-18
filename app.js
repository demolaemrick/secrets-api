require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors());


//Import routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const secretsRoute = require("./routes/secrets")

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((err) => {
    console.log(err);
  });


//routes midddlewares
app.use("/api/user", registerRoute); 
app.use("/api/user", loginRoute);
app.use("/api/secrets", secretsRoute);

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}....`));
