$( document ).ready(function() {
var topics = ["internet cat", "cat", "great dane", "monkey", "silly otter", "shark", "grumpy cat", "jumping dolphin", "british shorthair", "nyan cat", "pig", "tabby", "pug"] 
console.log(topics);

window.onload = renderButtons();

    $("body").on("click", "button", function() {
      
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-name");
      console.log(animal);
      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=SFh6tH497Mis1yuqSkLJp9TpTgStg7Cz&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url)
            animalImage.attr("data-state", "still")
            animalImage.addClass("gif");
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalImage);
            console.log(animalImage);
          }
        });
    });

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
          // Adding a data-attributes
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
        var animal = $("#animal-input").val();
        // Adding the animal from the textbox to our array
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", animal);
        a.text(animal);
        $("#buttons-view").append(a);

        // Calling renderButtons which handles the processing of our animal array
        console.log(animal);

      });

      $("body").on("click", "#gifs-appear-here", "gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        event.preventDefault();
	
        // gets the current state of the clicked gif 
        var state = $(this).attr("data-state");
        
        // according to the current state gifs toggle between animate and still 
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });
    });