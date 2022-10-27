const nasaApiKey = "KsxQAhnaBa3ta5xtopfizfRFJXijS51NGnJLeb5g";



function getNasaData() {
    userDate = $("#userDate")[0].value;
    if (userDate > moment().format("YYYY-MM-DD")) {
        // need a modal error
        alert("Enter today or earlier!");
        return;
    } else if (userDate < moment("1995-06-16").format("YYYY-MM-DD")) {
        // need a modal error
        alert("Enter day after June 16th 1995")
        return;
    } else {
            inputDate = moment(userDate).format("YYYY-MM-DD");
            nasaLink = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey + "&date=" + inputDate
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
}

function getQuote() {
    var zenQuote = "https://api.quotable.io/random?tags=inspirational"
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
})

$("#random-button").on("click", function (event) {
    event.preventDefault();
    getRandomDate();
})