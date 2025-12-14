async function searchMeals(query) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.meals || [];
}

async function getMealById(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

module.exports = { searchMeals, getMealById };
