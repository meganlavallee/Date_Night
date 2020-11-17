// on click run "getDinner" function and "getDrank" function
$("#randomFood-btn").on("click", function () {
  makeDinner();
});
$("#select-dinner").on("click", function () {
  var userFood = $("#user-input").val();
  selectDinner(userFood);
});

function makeDinner() {
  var queryFood = "https://www.themealdb.com/api/json/v1/1/random.php";
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
    var foodTitle = dinner.strMeal;
    var foodImage = dinner.strMealThumb;
    var foodPrep = dinner.strInstructions;
    var foodLink = dinner.strYoutube;

    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(foodTitle, foodImage, foodPrep, foodLink);
    // this is where our function will create the ingridents list for our recipe
    listIngredient(dinner);
    // this is where our function will create the ingridents list for our recipe
    listMeasurements(dinner);
  });
}
function listIngredient(dinner) {
  $("#food-ingredients").empty();
  $("#food-title").text(foodTitle);
  $("#food-image").attr("src", foodImage);
  $("#food-prep").text(foodPrep);
  $("#food-link")
    .attr("href", foodLink)
    .text("Click here to watch a demo video");

  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dinner) {
    if (dinner[key]) {
      var keyNum = key;
      var value = dinner[key];

      var ingredientName = "strIngredient" + `${ingredientNum}`;
      if (`${keyNum}` === `${ingredientName}`) {
        $("#food-ingredient").append($("<li>").text(value));
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

    makeDronk(
      dronkTitle,
      dronkAlcoholic,
      dronkCategory,
      dronkImage,
      dronkGlass,
      dronkPrep
    );
    // this is where our function will create the ingridents list for our recipe
    listIngredient(dronks);
    // this is where our function will create the ingridents list for our recipe
    listMeasurements(dronks);
  });
}

function makeDronk(
  dronkTitle,
  dronkAlcoholic,
  dronkCategory,
  dronkImage,
  dronkGlass,
  dronkPrep
) {
  $("#dronk-title").text(dronkTitle);
  $("#dronk-alcoholic").text(dronkAlcoholic);
  $("#dronk-category").text(dronkCategory);
  $("#dronk-image").attr("src", dronkImage + "/preview");
  $("#dronk-glass").text(dronkGlass);
  $("#dronk-prep").text(dronkPrep);
}
function listIngredient(dronks) {
  $("#dronk-ingredients").empty();
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dronks) {
    if (dronks[key]) {
      var keyNum = key;
      var value = dronks[key];

      var ingredientName = "strIngredient" + `${ingredientNum}`;
      if (`${keyNum}` === `${ingredientName}`) {
        $("#dronk-ingredients").append($("<li>").text(value));
        ingredientNum++;
      }
    }
  }
}

function listMeasurements(dronks) {
  $("#dronk-measurements").empty();
  // this is where our function will create the measurements
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dronks) {
    if (dronks[key]) {
      var keyNum = key;
      var value = dronks[key];

      if (dronks[key].trim() == " ") return;

      var measurementName = "strMeasure" + `${ingredientNum}`;
      if (`${keyNum}` === `${measurementName}`) {
        $("#dronk-measurements").append($("<li>").text(value));
        ingredientNum++;
      }
    }
  }
}
