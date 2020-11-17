// on click run "getDinner" function and "getDronk" function
$("#submit-btn").on("click", function () {
  getDinner();
  getDronk();
});

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

    makeDinner(mealTitle, mealImage, mealPrep, mealLink);
  });
}

function makeDinner(mealTitle, mealImage, mealPrep, mealLink) {
  $("#meal-title").text(mealTitle);
  $("#meal-image").attr("src", mealImage);
  $("#meal-prep").text(mealPrep);
  $("#meal-link")
    .attr("href", mealLink)
    .text("Click here to watch a demo video");
}

getDronk();
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
