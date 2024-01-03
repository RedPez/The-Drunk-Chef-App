// Add all JS to do with page functionality here incl. modal, search and favourites page functions

// Calling the the API with selectedIngredients
$(document).ready(function () {
  let images = [
    "./assets/images/cocktail1.jpg",
    "./assets/images/cocktail2.jpeg",
    "./assets/images/cocktail3.jpg",
    "./assets/images/cocktail4.jpg",
    "./assets/images/cocktail5.jpg",
    "./assets/images/cocktail6.jpg",
    "./assets/images/cocktail7.jpg",
    "./assets/images/cocktail8.jpg",
    "./assets/images/cocktail9.jpg",
    "./assets/images/cocktail10.jpg",
    "./assets/images/cocktail11.jpg",
    "./assets/images/cocktail12.jpg",
    "./assets/images/cocktail13.jpg",
    "./assets/images/cocktail14.jpg",
    "./assets/images/cocktail15.jpg",
  ];

  let shuffledImages = images.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  let count = 0;

  function renderCocktailInformation(
    url,
    cocktails,
    ingredients,
    recipe,
    cocktailImages,
    uniqueID
  ) {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let replacedCocktailName =
          cocktails.replaceAll(",", "").split(" ")[0] + uniqueID;

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
        // Card image
        let cocktailImageEl = $("<img>");
        cocktailImageEl.attr({
          src: cocktailImages,
          class: "card-img-top w-auto h-auto",
          // width: "50%", - we have width set in bootstrap class
          alt: "image of cocktail",
        });
        // Creates card body
        let cardBody = $("<div>");
        cardBody.attr("class", "card-body");
        // Card title
        let cocktailNameEl = $("<h5>"); // changed to match bootstrap
        cocktailNameEl.text(cocktails);
        cocktailNameEl.attr("class", "card-title");
        // Testing card text
        let cardText = $("<p>");
        cardText.attr("class", "card-text");
        cardText.text(
          "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
        );
        // Div that contains both fav and open modal buttons
        let buttonsDiv = $("<div>");
        buttonsDiv.attr("class", "btns-div");
        // Card button to open modal - changed to match html format
        let cocktailResultsButton = $("<button>");
        cocktailResultsButton.attr({
          type: "button",
          class: "btn btn-dark",
          "data-bs-toggle": "modal",
          "data-bs-target": "#myModal",
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

        // Modal

        let cocktailModalFade = $("<div>");
        cocktailModalFade.attr({
          class: "modal fade",
          id: "myModal",
          role: "dialog",
        });
        let cocktailModalDialog = $("<div>");
        cocktailModalDialog.attr(
          "class",
          "modal-dialog modal-dialog-scrollable"
        );
        let cocktailModalContent = $("<div>");
        cocktailModalContent.attr("class", "modal-content");
        let cocktailModalHeader = $("<div>");
        cocktailModalHeader.attr("class", "modal-header");
        let modalCloseButton = $("<button>");
        modalCloseButton.attr({
          type: "button",
          class: "close",
          "data-bs-dismiss": "modal",
        });
        modalCloseButton.html("&times");
        let modalTitle = $("<h4>");
        modalTitle.attr("class", "modal-title fs-5");
        modalTitle.text(cocktails);

        //Modal Body
        let modalBody = $("<div>");
        modalBody.attr("class", "modal-body");
        let modalImageIngredientsContainer = $("<div>");
        modalImageIngredientsContainer.attr(
          "class",
          "image-ingredient-container"
        );
        let modalImageContainer = $("<div>");
        modalImageContainer.attr("class", "image-container");
        let modalCocktailImage = $("<img>");
        modalCocktailImage.attr({
          class: "image-container",
          alt: "Cocktail Image",
          src: cocktailImages,
          width: "100%",
        });
        let modalIngredientsContainer = $("<div>");
        modalIngredientsContainer.attr("class", "ingredients-container");
        let modalCocktailIngredients = ingredients;
        let ingredientLiEl = $("<li>");
        ingredientLiEl.text(modalCocktailIngredients);
        let cocktailRecipe = recipe;
        let modalRecipeContainer = $("<div>");
        modalRecipeContainer.attr("class", "recipe-container");
        let modalRecipeEl = $("<h4>");
        modalRecipeEl.text(cocktailRecipe);
        let modalVideoContainer = $("<div>");
        modalVideoContainer.attr("class", "modal-vid-container");
        let modalVideoheader = $("<h3>");
        modalVideoheader.text("Video Tutorial");
        let modalCocktailVideo = $("<iframe>");
        modalCocktailVideo.attr({
          width: "100%",
          height: "100%",
          src: "https://www.youtube.com/embed/" + data.items[0].id.videoId,
          title: "Cocktail Recipe Tutorial",
          frameborder: "0",
          allowfullscreen: "autoplay",
        });

        //Modal append inside body
        modalVideoContainer.append(modalVideoheader, modalCocktailVideo);
        modalRecipeContainer.append(modalRecipeEl);
        modalIngredientsContainer.append(ingredientLiEl);
        modalImageContainer.append(modalCocktailImage);
        modalImageIngredientsContainer.append(
          modalImageContainer,
          modalIngredientsContainer
        );
        modalBody.append(
          modalImageIngredientsContainer,
          modalRecipeContainer,
          modalVideoContainer
        );
        cocktailModalHeader.append(modalCloseButton, modalTitle);
        cocktailModalContent.append(cocktailModalHeader, modalBody);
        cocktailModalDialog.append(cocktailModalContent);
        cocktailModalFade.append(cocktailModalDialog);

        // Results append inside cards
        favRecipeBtn.append(starIcon);
        buttonsDiv.append(cocktailResultsButton, favRecipeBtn);
        cardBody.append(cocktailNameEl, cardText, buttonsDiv);
        resultsCard.append(cocktailImageEl, cardBody);
        resultsColumns.append(resultsCard);
        resultsRows.append(resultsColumns, cocktailModalFade);

        // Need to create the onclick functionality to open modal
      });
  }

  const fetchCocktailName = async () => {
    let ingredients = Object.values($(".selected-item"))
      .map((el) => el.innerText)
      .filter((el) => el)
      .join(",");
    const apiKey = "&X-Api-Key=lFLKoDXCUTiqMPOwDMT5Ng==bewV4VzaZPxzBIMu";

    let cocktailNameUrl =
      "https://api.api-ninjas.com/v1/cocktail?ingredients=" +
      ingredients +
      apiKey;
    console.log(cocktailNameUrl);
    const response = await fetch(cocktailNameUrl);
    const data = await response.json();
    console.log(data);
    for (i = 0; i < data.length; i++) {
      let cocktailName = data[i].name;
      let newCocktailName = cocktailName.replaceAll(",", "");
      console.log(newCocktailName);
      let cocktailIngredients = data[i].ingredients;
      let cocktailInstructions = data[i].instructions;
      let images = shuffledImages[i];
      let uniqueCount = count++;
      console.log(uniqueCount);

      let cocktailSearch = newCocktailName + " cocktail recipe";
      let youtubeUrl = "https://www.googleapis.com/youtube/v3/search?";
      let type = "type=video";
      let part = "&part=snippet";
      let embed = "&videoEmbeddable=true";
      let limit = "&maxResults=1";
      let vidQuery = "&q=" + cocktailSearch;
      let youtubeApiKey = "&key=AIzaSyABRyK6henjgsK62noksLvB6xWzfASJ-9c";
      console.log(vidQuery);

      let cocktailVideoUrl =
        youtubeUrl + type + youtubeApiKey + vidQuery + limit + part + embed;

      renderCocktailInformation(
        cocktailVideoUrl,
        cocktailName,
        cocktailIngredients,
        cocktailInstructions,
        images,
        uniqueCount
      );
    }
  };
  $("#search-btn").on("click", fetchCocktailName);
});
