// on click run "getDinner" function for a random dinner
$("#randomFood-btn").on("click", function () {
  getDinner();
});
// on click run "selectDinner" function from user input
$("#select-dinner").on("click", function () {
  var userFood = $("#user-input").val();
  if (!userFood) return;
  selectDinner(userFood);
});
// this is the function that will run if the user inputs a food item
function selectDinner(userFood) {
  var queryFood =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userFood;
  $.ajax({
    url: queryFood,
    type: "GET",
  }).then(function (food) {
    randomNum = Math.floor(Math.random() * 11);
    // set dinner equal to the "food.meals[random number between 0 and 10]" array
    var dinner = food.meals[randomNum];
    var dinnerId = dinner.idMeal;

    // set our variables that we get when we make our ajax call
    var foodTitle = dinner.strMeal;
    var foodImage = dinner.strMealThumb;
    var foodLink = dinner.strYoutube;
    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(foodTitle, foodImage, foodLink);
    // this is where we'll make our second ajax call based on id to get ingredients
    selectIngredients(dinnerId);
  });
}
// this function makes a second API call so it can get the list of ingredients since our first api call doesn't
function selectIngredients(dinnerId) {
  var queryIngredients =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + dinnerId;
  $.ajax({
    url: queryIngredients,
    type: "GET",
  }).then(function (food) {
    var dinner = food.meals[0];
    var foodPrep = dinner.strInstructions;

    // this is where our function will make another ajax call to get ingredients from id
    selectDescription(foodPrep);
    // this is where our ingredients/measurements come together to make one list
    combineLists(dinner);
    $("#user-input").val("");
    // make landing page display
    $("#onload-display").css("display", "none");
    $("#meal-display").css("display", "block");
  });
}
// I know this looks like unneeded code but I left it as a function so if I wanted to set
// new element properties I could change them here in the future.
function selectDescription(foodPrep) {
  $("#meal-prep").text(foodPrep);
}
// this is the ajax call that runs on random button click and sets the variables passed to our other functions
function getDinner() {
  var queryFood = "https://www.themealdb.com/api/json/v1/1/random.php";
  $.ajax({
    url: queryFood,
    type: "GET",
  }).then(function (food) {
    // set dinner equal to the "food.meals[0]" array
    var dinner = food.meals[0];

    // set our variables that we get when we make our ajax call
    var foodTitle = dinner.strMeal;
    var foodImage = dinner.strMealThumb;
    var foodPrep = dinner.strInstructions;
    var foodLink = dinner.strYoutube;

    // this is where all of our function calls will be at the end of the ajax call
    makeDinner(foodTitle, foodImage, foodPrep, foodLink);
    // this is where our ingredients and measurements come together to make one list
    combineLists(dinner);
  });
}
// tester code --------------------------------------------------------------------------------------------------------------------
function combineLists(dinner) {
  $("#food-measurements").empty();
  // this is where our function will create the measurements array
  var totalMeasurements = [];
  var ticker = 0;
  var measurementNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dinner) {
    if (dinner[key]) {
      var keyNum = key;
      var value = dinner[key];

      if (dinner[key].trim() == "") return;

      var measurementName = "strMeasure" + `${measurementNum}`;
      if (`${keyNum}` === `${measurementName}`) {
        totalMeasurements.push(`${value}`);

        ticker++;
        measurementNum++;
      }
    }
  }
  // this is where our function will create the ingredients array
  var totalIngredients = [];
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dinner) {
    if (dinner[key]) {
      var keyNum = key;
      var value = dinner[key];

      var ingredientName = "strIngredient" + `${ingredientNum}`;
      if (`${keyNum}` === `${ingredientName}`) {
        totalIngredients.push(`${value}`);

        ticker++;
        ingredientNum++;
      }
    }
  }
  // this is where our code will combine the lists together to make one list and display it on the screen
  for (var i = 0; i < totalMeasurements.length; i++) {
    var listItem = totalMeasurements[i] + " " + totalIngredients[i];
    $("#food-measurements").append($("<li>").text(listItem));
  }
}
// end of tester code -------------------------------------------------------------------------------------------------------------
// this is the actual function that compiles our ajax call data and displays it to the screen
function makeDinner(mealTitle, mealImage, mealPrep, mealLink) {
  $("#meal-title").text(mealTitle);
  $("#meal-image").attr("src", mealImage);
  $("#meal-prep").text(mealPrep);
  $("#meal-link")
    .attr("href", mealLink)
    .attr("rel", "opener")
    .attr("target", "_blank")
    .text("Click here to watch a demo video");
  // make landing page display
  $("#onload-display").css("display", "none");
  $("#meal-display").css("display", "block");
}
// start of zachs code / drink calls
// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------
// event listeners for random drink generator
$("#random-Dronk-btn").on("click", function () {
  getDronk();
});
// function containing ajax call for random drink
function getDronk() {
  const queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  $.ajax({
    method: "GET",
    url: queryDrink,
  }).then(function (dronk) {
    var dronks = dronk.drinks[0];

    //   set our variables that we get when we make our ajax call
    var dronkTitle = dronks.strDrink;
    var dronkAlcoholic = dronks.strAlcoholic;
    var dronkCategory = dronks.strCategory;
    var dronkImage = dronks.strDrinkThumb;
    var dronkGlass = dronks.strGlass;
    var dronkPrep = dronks.strInstructions;

    // calls function which appends drink info into html
    makeDronk(
      dronkTitle,
      dronkAlcoholic,
      dronkCategory,
      dronkImage,
      dronkGlass,
      dronkPrep
    );

    // this is where our function will create the ingredients list for our recipe
    combineDronkLists(dronks);
    // make landing page display
    $("#onload-display").css("display", "none");
    // shows drink card once item is searched
    $("#dronk-display").css("display", "block");
  });
}

// event listener for button to search drinks with specific ingredient
$("#dronk-btn").on("click", function () {
  // variables to allow input to pass through api call which also stops
  // user from running function if input is empty
  var userDronkInput = $("#dronk-input").val().trim();
  var userDronk = userDronkInput.toLowerCase();
  if (userDronkInput == "") {
    return;
  } else {
    selectDronk(userDronk);
  }
});
// generate drink by liquor selected
function selectDronk(userDronk) {
  const queryDrink =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userDronk;

  $.ajax({
    method: "GET",
    url: queryDrink,
  }).then(function (dronk) {
    // check if user input returns an ingredient. if
    // it does not match, it will call dronkName function
    if (dronk == "" || dronk == null || dronk == undefined) {
      dronkName(userDronk);
    } else {
      // variable which pulls length of drink array so it can randomize
      // return based on user input
      var dronkLen = dronk.drinks.length;
      var randomNum = "";
      randomNum = Math.floor(Math.random() * dronkLen);
      var dronks = dronk.drinks[randomNum];
      // variable to run separate ajax call and find drink details to
      // generate in html
      var dronkID = dronks.idDrink;
      findDronk(dronkID);
    }
  });
}

// finds drink based on ID passed through and dynamically creates info
// in html
function findDronk(dronkID) {
  const queryDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${dronkID}`;

  $.ajax({
    method: "GET",
    url: queryDrink,
  }).then(function (dronk) {
    //   set our variables that we get when we make our ajax call
    var dronks = dronk.drinks[0];
    var dronkTitle = dronks.strDrink;
    var dronkAlcoholic = dronks.strAlcoholic;
    var dronkCategory = dronks.strCategory;
    var dronkImage = dronks.strDrinkThumb;
    var dronkGlass = dronks.strGlass;
    var dronkPrep = dronks.strInstructions;

    // this is the function called to create drink info in html
    makeDronk(
      dronkTitle,
      dronkAlcoholic,
      dronkCategory,
      dronkImage,
      dronkGlass,
      dronkPrep
    );
    // this is where our function will create the ingredients list for our recipe
    combineDronkLists(dronks);
    // make landing page display
    $("#onload-display").css("display", "none");
    $("#dronk-display").css("display", "block");
  });
}
// function to search for specific drink name and details
function dronkName(userDronk) {
  const queryDrink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userDronk}`;

  $.ajax({
    method: "GET",
    url: queryDrink,
  }).then(function (dronk) {
    console.log(dronk);
    //   set our variables that we get when we make our ajax call
    var dronks = dronk.drinks[0];
    var dronkTitle = dronks.strDrink;
    var dronkAlcoholic = dronks.strAlcoholic;
    var dronkCategory = dronks.strCategory;
    var dronkImage = dronks.strDrinkThumb;
    var dronkGlass = dronks.strGlass;
    var dronkPrep = dronks.strInstructions;

    // this is the function called to create drink info in html
    makeDronk(
      dronkTitle,
      dronkAlcoholic,
      dronkCategory,
      dronkImage,
      dronkGlass,
      dronkPrep
    );
    // this is where our function will create the ingredients list for our recipe
    combineDronkLists(dronks);
    // make landing page display
    $("#onload-display").css("display", "none");
    $("#dronk-display").css("display", "block");
  });
}
// takes all info gathered from ajax call to fill html elements
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
  $("#dronk-image").attr("src", dronkImage);
  $("#dronk-glass").text(dronkGlass);
  $("#dronk-prep").text(dronkPrep);
}
// modeled after tester code created by the one and only Rick <3
function combineDronkLists(dronks) {
  $("#dronk-measurements").empty();
  // this is where our function will create the measurements array
  var totalMeasurements = [];
  var ticker = 0;
  var measurementNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dronks) {
    if (dronks[key]) {
      var keyNum = key;
      var value = dronks[key];

      if (dronks[key].trim() == "") return;

      var measurementName = "strMeasure" + `${measurementNum}`;
      if (`${keyNum}` === `${measurementName}`) {
        totalMeasurements.push(`${value}`);

        ticker++;
        measurementNum++;
      }
    }
  }
  // this is where our function will create the ingredients array
  var totalIngredients = [];
  var ingredientNum = 1;
  // this for loop is used for looking through dinner and checking for ingridents
  for (const key in dronks) {
    if (dronks[key]) {
      var keyNum = key;
      var value = dronks[key];

      var ingredientName = "strIngredient" + `${ingredientNum}`;
      if (`${keyNum}` === `${ingredientName}`) {
        totalIngredients.push(`${value}`);

        ticker++;
        ingredientNum++;
      }
    }
  }
  // this is where our code will combine the lists together to make one list and display it on the screen
  for (var i = 0; i < totalIngredients.length; i++) {
    if (!totalMeasurements[i]){
      var listItem = totalIngredients[i];
    }else {
      var listItem = totalMeasurements[i] + " " + totalIngredients[i];
    }
    $("#dronk-measurements").append($("<li>").text(listItem));
  }
}
