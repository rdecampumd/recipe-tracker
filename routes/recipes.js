const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");
const { searchMeals, getMealById } = require("../services/mealdb");

// search form
router.get("/search", (req, res) => {
  res.render("search", { meals: null, query: "" });
});

// search results
router.get("/results", async (req, res) => {
  const query = req.query.q || "";
  const meals = query ? await searchMeals(query) : [];
  res.render("search", { meals, query });
});

// view one recipe
router.get("/:id", async (req, res) => {
  const meal = await getMealById(req.params.id);
  if (!meal) return res.status(404).send("Recipe not found");
  res.render("show", { meal, error: null });
});

// save recipe w note
router.post("/:id/save", async (req, res) => {
  const meal = await getMealById(req.params.id);
  if (!meal) return res.status(404).send("Recipe not found");

  if (!req.body.note) {
    return res.render("show", {
      meal,
      error: "Please enter a note before saving."
    });
  }

  await Recipe.create({
    mealId: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    thumbnail: meal.strMealThumb,
    note: req.body.note
  });

  res.redirect("/");
});

// delete saved recipe
router.post("/:id/delete", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
