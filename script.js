// on click run "getDinner" function and "getDrank" function
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

    // this for loop is used for looking through dinner and checking for ingridents
    for (const i in dinner) {
      checkIngridents = dinner[i];

      if (dinner[i]) {
        var item = dinner[i];
        console.log(item);
      }
    }
    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(mealTitle, mealImage, mealPrep, mealLink);
  });
}
function listIngridents() {
  // this is where our function will create the ingridents list for our recipe
}

function listMeasurements() {
  // this is where our function will create the measurements
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
    console.log(dronk);
    console.log(dronk.drinks[0].strIngredient1);
  });
}
