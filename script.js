var quertyURL: "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"

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