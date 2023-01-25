const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-Parser");

const app = express();

const userRoute = require("./route/userRoute");
const sauceRoute = require("./route/sauceRoute");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
