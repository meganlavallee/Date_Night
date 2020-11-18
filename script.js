// on click run "getDinner" function for a random dinner
$("#randomFood-btn").on("click", function () {
    getDinner();
});
// on click run "selectDinner" function from user input
$("#select-dinner").on("click", function () {
    var userFood = $("#user-input").val();
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
        // set dinner equal to the "food.meals[random number between 0 and 10]" array
        randomNum = Math.floor(Math.random() * 11);
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

        selectDescription(foodPrep);
        // this is where our function will create the ingridents list for our recipe
        listIngredient(dinner);
        // this is where our function will create the ingridents list for our recipe
        listMeasurements(dinner);
        $("#user-input").val("");
        $("meal-display").css("display", "block");
    });
}
// I know this looks like unneeded code but I left it as a function so if I wanted to set
// new element properties I could change them here in the future.
function selectDescription(foodPrep) {
    $("#meal-prep").text(foodPrep);
}

function getDinner() {
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
    var ingredientNum = 1;
    // this for loop is used for looking through dinner and checking for ingridents
    for (const key in dinner) {
        if (dinner[key]) {
            var keyNum = key;
            var value = dinner[key];

            var ingredientName = "strIngredient" + `${ingredientNum}`;
            if (`${keyNum}` === `${ingredientName}`) {
                $("#food-ingredients").append($("<li>").text(value));
                ingredientNum++;
                console.log(value);
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

    $("meal-display").css("display", "block");
}

// event listeners for random drink generator
$("#random-Dronk-btn").on("click", function () {
    getDronk();
});

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

        makeDronk(
            dronkTitle,
            dronkAlcoholic,
            dronkCategory,
            dronkImage,
            dronkGlass,
            dronkPrep
        );

        // this is where our function will create the ingridents list for our recipe
        listDronkIngredients(dronks);
        // this is where our function will create the ingridents list for our recipe
        listDronkMeasurements(dronks);
    });
}

$("#dronk-btn").on("click", function () {
    var userDronkInput = $("#dronk-input").val().trim();
    var userDronk = userDronkInput.toLowerCase();
    console.log(userDronkInput);
    console.log(userDronk);
    if (userDronkInput = " "){ 
        return;
    }else{
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
        if (userDronk === "rum"){
            var randomNum = "";
            randomNum = Math.floor(Math.random() * 22);
        } else if (userDronk === "vodka") {
            var randomNum = "";
            randomNum = Math.floor(Math.random() * 85);
        } else if (userDronk === "tequila") {
            var randomNum = "";
            randomNum = Math.floor(Math.random() * 25);
        } else if (userDronk === "gin") {
            var randomNum = "";
            randomNum = Math.floor(Math.random() * 100);
        }
        var dronks = dronk.drinks[randomNum];
        var dronkID = dronks.idDrink;
        findDronk(dronkID);
    });
}
function findDronk(dronkID) {
    const queryDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${dronkID}`;

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

        makeDronk(
            dronkTitle,
            dronkAlcoholic,
            dronkCategory,
            dronkImage,
            dronkGlass,
            dronkPrep
        );
        // this is where our function will create the ingridents list for our recipe
        listDronkIngredients(dronks);
        // this is where our function will create the ingridents list for our recipe
        listDronkMeasurements(dronks);
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
function listDronkIngredients(dronks) {
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

function listDronkMeasurements(dronks) {
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
