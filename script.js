// on click run "getDinner" function and "getDrank" function
$("#randomFood-btn").on("click", function () {

  getDinner();
});
$("#select-dinner").on("click", function () {
  var userFood = $("#user-input").val()
  selectDinner(userFood);
});

function selectDinner(userFood) {
  var queryFood = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userFood;
  $.ajax({
    url: queryFood,
    type: "GET",
  }).then(function (food) {
    console.log(queryFood);
    console.log(food);
    //   set dinner equal to the "food.meals[0]" array
    var dinner = food.meals[0];
    console.log(dinner);

    //   set our variables that we get when we make our ajax call
    var mealTitle = dinner.strMeal;
    var mealImage = dinner.strMealThumb;
    var mealPrep = dinner.strInstructions;
    var mealLink = dinner.strYoutube;

    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(mealTitle, mealImage, mealPrep, mealLink);
    // this is where our function will create the ingridents list for our recipe
    listIngredient(dinner);
    // this is where our function will create the ingridents list for our recipe
    listMeasurements(dinner);
  });
}
// ajax call to "getDinner()" and set variables needed to run "makeDinner()"
function getDinner() {
  var queryFood = "https://www.themealdb.com/api/json/v1/1/random.php";
  $.ajax({
    url: queryFood,
    type: "GET",
  }).then(function (food) {
    //   set dinner equal to the "food.meals[0]" array
    var dinner = food.meals[0];
    console.log(dinner);

    //   set our variables that we get when we make our ajax call
    var mealTitle = dinner.strMeal;
    var mealImage = dinner.strMealThumb;
    var mealPrep = dinner.strInstructions;
    var mealLink = dinner.strYoutube;

    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(mealTitle, mealImage, mealPrep, mealLink);
    // this is where our function will create the ingridents list for our recipe
    listIngredient(dinner);
    // this is where our function will create the ingridents list for our recipe
    listMeasurements(dinner);
  });
}
function listIngredient(dinner) {
  $("#food-ingredients").empty();
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dinner) {
    if (dinner[key]) {
      var keyNum = key;
      var value = dinner[key];

      var ingredientName = "strIngredient" + `${ingredientNum}`;
      if (`${keyNum}` === `${ingredientName}`) {
        $("#food-ingedients").append($("<li>").text(value));
        ingredientNum++;
      }
    }
  }
}

function listMeasurements(dinner) {
  $("#food-measurements").empty();
  // this is where our function will create the measurements
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dinner) {
    if (dinner[key]) {
      var keyNum = key;
      var value = dinner[key];

      if (dinner[key].trim() == "") return;

      var measurementName = "strMeasure" + `${ingredientNum}`;
      if (`${keyNum}` === `${measurementName}`) {
        $("#food-measurements").append($("<li>").text(value));
        ingredientNum++;
      }
    }
  }
}

function makeDinner(mealTitle, mealImage, mealPrep, mealLink) {
  $("#meal-title").text(mealTitle);
  $("#meal-image").attr("src", mealImage);
  $("#meal-prep").text(mealPrep);
  $("#meal-link")
    .attr("href", mealLink)
    .text("Click here to watch a demo video");
}

function getDronk() {
  // const apikey = "1";
  const queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  $.ajax({
    method: "GET",
    url: queryDrink,
  }).then(function (dronk) {
    var dronks = dronk.drinks[0];
    console.log(dronk);

    //   set our variables that we get when we make our ajax call
    var dronkTitle = dronks.strDrink;
    var dronkAlcoholic = dronks.strAlcoholic;
    var dronkCategory = dronks.strCategory;
    var dronkImage = dronks.strDrinkThumb;
    var dronkGlass = dronks.strGlass;
    var dronkPrep = dronks.strInstructions;

    makeDronk(dronkTitle, dronkAlcoholic, dronkCategory, dronkImage, dronkGlass, dronkPrep);
  });
}

function makeDronk(dronkTitle, dronkAlcoholic, dronkCategory, dronkImage, dronkGlass, dronkPrep) {
  $("#dronk-title").text(dronkTitle);
  $("#dronk-alcoholic").text(dronkAlcoholic);
  $("#dronk-category").text(dronkCategory);
  $("#dronk-image").attr("src", dronkImage);
  $("#dronk-glass").text(dronkGlass)
  $("#dronk-prep").text(dronkPrep);
}
