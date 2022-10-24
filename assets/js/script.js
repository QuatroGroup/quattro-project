const nasaApiKey = "KsxQAhnaBa3ta5xtopfizfRFJXijS51NGnJLeb5g";

var userDate = $("#userDate");
var inputDate = moment(userDate).format("YYYY-MM-DD");

nasaLink = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey + "&date=" + inputDate
// zenQuote = "https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random"
zenQuote = "https://api.quotable.io/random?tags=inspirational"

function getNasaData() {
    fetch(nasaLink).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $("#nasaImage")[0].src = data.url;
                $("#nasaCaption")[0].textContent = data.explanation;
                $("#nasaTitle")[0].textContent = data.title;
            })
        }
    })
}

function getQuote() {
    fetch(zenQuote).then(function (responseQ) {
        if (responseQ.ok) {
            responseQ.json().then(function (dataQ) {
                $("#randomQuote")[0].textContent = dataQ.content;
                $("#randomAuthor")[0].textContent = "~ " + dataQ.author;
            })
        }
    })
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    $(".quoteImage").addClass("visible");
    getNasaData();
    getQuote();

    // $("form")[0].reset();
})