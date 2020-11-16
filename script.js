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

