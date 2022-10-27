const nasaApiKey = "KsxQAhnaBa3ta5xtopfizfRFJXijS51NGnJLeb5g";

function getNasaData() {
    // this takes the date in the input (random or date picker) and the using the NASA photo of the day to retur a photo and caption
    userDate = $("#userDate")[0].value;
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

function getQuote() {
    // this uses the quotable API to pull an inspirational tagged quote and apply it to the html
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
    // button listener for the search button
    event.preventDefault();
    userDate = $("#userDate")[0].value;
    // validate the date is between known Nasa Photo of Day allowed values
    if (userDate > moment().format("YYYY-MM-DD")) {
        // date in the future error
        var modalTitle = "Date Error";
        var modalBody = "Date must be today's date or earlier!";
        alertModal(modalTitle, modalBody);
        return;
    } else if (userDate < moment("1995-06-16").format("YYYY-MM-DD")) {
        // date too early (before this APOD existed)
        var modalTitle = "Date Error";
        var modalBody = "Date must be after June 16th 1995!";
        alertModal(modalTitle, modalBody);
        return;
    } else {
        // if within range make the section visible and get data from the 2 api's
        $(".quoteImage").addClass("visible");
        getNasaData();
        getQuote();
    }
})

$("#random-button").on("click", function (event) {
    // handles the on click of the random button
    event.preventDefault();
    getRandomDate();
})

function getRandomDate() {
    // get random date between the first of January 1997 and todays date
    const minValue = new Date(1997,0,1);
    const maxValue = new Date();
    var randomDate = new Date(minValue.getTime() + Math.random() * (maxValue.getTime() - minValue.getTime()))
    // add date into text input field
    $("#userDate")[0].value = moment(randomDate).format("YYYY-MM-DD");
    $("#userDate")[0].textcontent = moment(randomDate).format("YYYY-MM-DD");
    // make visible the sections and call the 2 funcitons to return Nasa photo/caption on quaotable quote
    $(".quoteImage").addClass("visible");
    getNasaData();
    getQuote();
}

function alertModal(title, body) {
    // Display error message to the user in a modal
    $('#alert-modal-title').html(title); //sets title of modal
    $('#alert-modal-body').html(body); // sets body of the modal
    $('#alert-modal').modal('show'); // shows the modal window
  }

  // localStorage.savedDate = $("#userDate")[0].value;
  // $("#dropdown-buttons").append('<button class="dropdown-item" type="button">' + userDate + '</button>');
  //  for (let i = 0; i< savedDate.length; i++) {
  //    localStorage.getItem([i])
  //  }