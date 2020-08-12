require("dotenv").config(); //for env file to load up

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();
// allow my application to be consumed
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

// Middlewares
app.use(express.json()); //replacing bodyParser

//routes midddlewares
app.use("/api/user", registerRoute); //url example = api/user/register
app.use("/api/user", loginRoute);
app.use("/api/secrets", secretsRoute);
// app.use('/api/secrets', postRoute)
let port = 8080 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}....`));
