// Add all JS to do with page functionality here incl. modal, search and favourites page functions

// Calling the the API with selectedIngredients
$(document).ready(function () {

  let ingredients = ["vodka", "lime"];
  let ingredientsString = ingredients.toString().split("").join("");
  const apiKey = "&X-Api-Key=lFLKoDXCUTiqMPOwDMT5Ng==bewV4VzaZPxzBIMu";

  let cocktailNameUrl =
    "https://api.api-ninjas.com/v1/cocktail?ingredients=" +
    ingredientsString +
    apiKey;

  let images = [
    "./images/cocktails1.jpg",
    "./images/cocktail2.jpeg",
    "./images/cocktail3.jpg",
    "./images/cocktail4.jpg",
    "./images/cocktail5.jpg",
    "./images/cocktail6.jpg",
    "./images/cocktail7.jpg",
    "./images/cocktail8.jpg",
    "./images/cocktail9.jpg",
    "./images/cocktail10.jpg",
    "./images/cocktail11.jpg",
    "./images/cocktail12.jpg",
    "./images/cocktail13.jpg",
    "./images/cocktail14.jpg",
    "./images/cocktail15.jpg",
  ];

  
  let shuffledImages = images.sort(function (a, b) {
    return 0.5 - Math.random();
  });

let count = 0;

  function renderCocktailInformation (url, cocktails, ingredients, recipe, cocktailImages, uniqueID) {

    fetch(url)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
      
       let replacedCocktailName = cocktails.replaceAll(",", "").split(" ")[0] + uniqueID

    // This has been commented out - there is a container in the html
      //   let cocktailResults = $("<div>");
      // cocktailResults.attr("class", "results-container");
      let resultsRows = $(".cardRows");
      // Creates columns 
      let resultsColumns = $("<div>");
      resultsColumns.attr("class", "col");
      // Creates card container
      let resultsCard = $("<div>");
      resultsCard.attr("class", "card h-100 result-card");
      // Creates card body
      let cardBody = $("<div>");
      cardBody.attr("class", "card-body");
      // Card image
      let cocktailImageEl = $("<img>");
      cocktailImageEl.attr({
        src: cocktailImages,
        class: "card-img-top w-auto h-auto",
        // width: "50%", - we have width set in bootstrap class
        alt: "",
      });
      // Card title
      let cocktailNameEl = $("<h5>"); // changed to match bootstrap
      cocktailNameEl.text(cocktails);
      cocktailNameEl.attr("class", "card-title");
      // Testing card text
      let cardText = $("<p>");
      cardText.attr("class", "card-text");
      cardText.text("This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.");
      // Div that contains both fav and open modal buttons
      let buttonsDiv = $("<div>");
      buttonsDiv.attr("class", "btns-div");
      // Card button to open modal - changed to match html format
      let cocktailResultsButton = $("<a>");
      cocktailResultsButton.attr({
        href: "#",
        class: "btn btn-dark",
        "data-toggle": "modal",
        "data-target": "#myModal",
      });
      cocktailResultsButton.text("View Recipe");
      // Card save to favourites button
      let favRecipeBtn = $("<a>");
      favRecipeBtn.attr({
        class: "fav-btn",
        href: "#",
    });
      // Star icon
      let starIcon = $("<i>");
      starIcon.attr("class", "fa-regular fa-star");

      // Results append inside cards
      resultsRows.append(resultsColumns);
      resultsColumns.append(resultsCard);
      resultsCard.append(cocktailImageEl, cardBody);
      cardBody.append(cocktailNameEl,cardText,cocktailResultsButton,buttonsDiv);
      buttonsDiv.append(cocktailResultsButton,favRecipeBtn);
      favRecipeBtn.append(starIcon);


      // Modal

      let cocktailModalFade = $("<div>");
      cocktailModalFade.attr({
        class: "modal fade",
        id: "myModal",
        role: "dialog",
      });
      let cocktailModalDialog = $("<div>");
      cocktailModalDialog.attr("class", "modal-dialog modal-dialog-scrollable");
      let cocktailModalContent = $("<div>");
      cocktailModalContent.attr("class", "modal-content");
      let cocktailModalHeader = $("<div>");
      cocktailModalHeader.attr("class", "modal-header");
      let modalCloseButton = $("<button>");
      modalCloseButton.attr({
        type: "button",
        class: "close",
        "data-dismiss": "modal",
      });
      modalCloseButton.html("&times");
      let modalTitle = $("<h4>");
      modalTitle.attr("class", "modal-title");
      modalTitle.text(cocktails);

      //Modal Body
      let modalBody = $("<div>");
      modalBody.attr("class", "modal-body");
      let modalImageIngredientsContainer = $("<div>");
      modalImageIngredientsContainer.attr("class", "image-ingredient-container");
      let modalImageContainer = $("<div>")
      modalImageContainer.attr("class", "image-container");
      let modalCocktailImage = $("<img>")
      modalCocktailImage.attr({
        class: "image-container",
        alt: "Cocktail Image",
        src: cocktailImages,
        width: "100%"
      })
      let modalIngredientsContainer = $("<div>")
      modalIngredientsContainer.attr("class", "ingredients-container")
      let modalCocktailIngredients = ingredients
      let ingredientLiEl = $("<li>")
      ingredientLiEl.text(modalCocktailIngredients)
      let cocktailRecipe = recipe
      let modalRecipeContainer = $("<div>")
      modalRecipeContainer.attr("class", "recipe-container")
      let modalRecipeEl = $("<h4>")
      modalRecipeEl.text(cocktailRecipe)
      let modalVideoContainer = $("<div>")
      modalVideoContainer.attr("class", "modal-vid-container")
      let modalVideoheader = $("<h3>")
      modalVideoheader.text("Video Tutorial")
      let modalCocktailVideo = $("<iframe>")
      modalCocktailVideo.attr(
        {
            width: "100%",
            height: "100%",
            src: "https://www.youtube.com/embed/" + data.items[0].id.videoId,
            title: "Cocktail Recipe Tutorial",
            frameborder: "0",
            allowfullscreen: "autoplay"

          }
      )
      
      //Modal append inside body
      modalVideoContainer.append(modalVideoheader, modalCocktailVideo)
      modalRecipeContainer.append(modalRecipeEl)
      modalIngredientsContainer.append(ingredientLiEl)
      modalImageContainer.append(modalCocktailImage)
      modalImageIngredientsContainer.append(modalImageContainer, modalIngredientsContainer)
      modalBody.append(modalImageIngredientsContainer, modalRecipeContainer, modalVideoContainer)
      cocktailModalHeader.append(modalCloseButton, modalTitle);
      cocktailModalContent.append(cocktailModalHeader, modalBody);
      cocktailModalDialog.append(cocktailModalContent);
      cocktailModalFade.append(cocktailModalDialog);
      
// Need to create the onclick functionality to open modal
      $(document.body).prepend(cocktailModalFade);
    
    })
  }

      


  const fetchCocktailName = async () => {
    const response = await fetch(cocktailNameUrl);
    const data = await response.json();
    console.log(data);
    for (i = 0; i < data.length; i++) {
      let cocktailName = data[i].name
      let newCocktailName = cocktailName.replaceAll(",", "")
      console.log(newCocktailName)
      let cocktailIngredients = data[i].ingredients
      let cocktailInstructions = data[i].instructions
      let images = shuffledImages[i]
      let uniqueCount = count++
      console.log(uniqueCount)
      


      let cocktailSearch = newCocktailName + " cocktail recipe"
      let youtubeUrl = "https://www.googleapis.com/youtube/v3/search?"
      let type = "type=video"
      let part = "&part=snippet"
      let embed = "&videoEmbeddable=true"
      let limit = "&maxResults=1"
      let vidQuery = "&q=" + cocktailSearch
      let youtubeApiKey = "&key=AIzaSyC7wHq1P-HrvJpFQf-ivJ_fHfAFFVO1BA4"
    console.log(vidQuery)
  

      let cocktailVideoUrl = youtubeUrl + type + youtubeApiKey + vidQuery + limit + part + embed

      renderCocktailInformation(cocktailVideoUrl, cocktailName, cocktailIngredients, cocktailInstructions, images, uniqueCount)
    }
  };

  fetchCocktailName();

});