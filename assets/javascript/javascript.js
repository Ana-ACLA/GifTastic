var singers = ["Beyonce", "Rihanna", "Lady Gaga", "Nicki Minaj", "Adele"];
var animateUrl = "";
var staticUrl = ""; 
      // This function handles events where submit button is clicked
      $("#addSinger").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var sing = $("#singer-input").val().trim();
        // The movie from the textbox is then added to our array
        singers.push(sing);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();

      });


      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();


      // Function for displaying buttons
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#singers").empty();

        // Looping through the array of movies
        for (var i = 0; i < singers.length; i++) {

          // Then dynamicaly generating buttons for each singer in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("singing");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", singers[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(singers[i]);
          // Adding the button to the HTML
          $("#singers").append(a);
        }
      }


// Adding click event listen listener to all buttons
    $(document).on('click','button', function() {


      // Grabbing and storing the data-name property value from the button
      var individualsinger = $(this).attr("data-name");

      // Constructing a queryURL using the button name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        individualsinger + "&api_key=dc6zaTOxFJmzC&limit=13";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {

          // storing the data from the AJAX request in the results variable
          var results = response.data;
          console.log(response.data);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var singerDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var singerImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            singerImage.attr("src", results[i].images.fixed_height_still.url);
            singerImage.attr("data-animate", results[i].images.fixed_height.url);
            singerImage.attr("data-still", results[i].images.fixed_height_still.url);
            singerImage.attr("data-state", "still"); // set the image state
            singerImage.addClass("gif");


            // Appending the paragraph and image tag to the singerDiv
            singerDiv.append(p);
            singerDiv.append(singerImage);

            // Prependng the singerDiv to the HTML page in the "#singersHTML" div
            $("#singersHTML").prepend(singerDiv);
          }
        });
        $("#singersHTML").empty();
    });
$(document).on("click", ".gif", function(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });



