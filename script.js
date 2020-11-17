// on click run "getDinner" function and "getDrank" function
$("#submit-btn").on("click", getDinner, getDronk);

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
    $("")
    
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
