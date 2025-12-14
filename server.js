require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Recipe = require("./models/Recipe");
const recipesRouter = require("./routes/recipes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.render("index", { recipes });
});

app.use("/recipes", recipesRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
});
