var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

$.ajax({
    url: 'queryURL',
    type: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
    },
    error: function (error) {
        console.log(`Error ${error}`);
    }
});
getDronk();
function getDronk(){
// const apikey = "1";
const queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

$.ajax({
    method: "GET",
    url: queryDrink,
}).then(function (dronk) {
    console.log(dronk)
    console.log(dronk.drinks[0].strIngredient1)
})
}
