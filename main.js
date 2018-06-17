var topics = ["cat", "great dane", "monkey", "otter", "shark", "dolphin", "british shorthair", "english mastiff", "cardinal", "tabby"] 
console.log(topics);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=SFh6tH497Mis1yuqSkLJp9TpTgStg7Cz&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("success got data", response);
    });

    renderButtons();

    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("topic");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding the movie from the textbox to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        console.log(topics);

      });