// Add all JS to do with page functionality here incl. modal, search and favourites page functions

// Calling the the API with selectedIngredients
$(document).ready(function () {
  let images = [
    "./assets/images/image-5.jpg",
    "./assets/images/image-6.jpg",
    "./assets/images/image-7.jpg",
    "./assets/images/image-8.jpg",
    "./assets/images/image-9.jpg",
    "./assets/images/image-10.jpg",
    "./assets/images/image-11.jpg",
    "./assets/images/image-12.jpg",
    "./assets/images/image-13.jpg",
    "./assets/images/image-14.jpg",
    "./assets/images/image-15.jpg",
    "./assets/images/image-16.jpg",
    "./assets/images/image-17.jpg",
    "./assets/images/image-18.jpg",
    "./assets/images/image-19.jpg",
    "./assets/images/image-20.jpg",
    "./assets/images/image-21.jpg",
    "./assets/images/image-22.jpg",
    "./assets/images/image-23.jpg",
    "./assets/images/image-24.jpg",
    "./assets/images/image-25.jpg"
  ];

  let shuffledImages = images.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  let count = 0;

  async function renderCocktailInformation(
    url,
    cocktails,
    ingredients,
    recipe,
    cocktailImages,
    uniqueID
  ) {
    let sanitizedCocktailName = cocktails.replace(/[^a-zA-Z0-9]/g, "-");
    let replacedCocktailName = sanitizedCocktailName + uniqueID
    let uniqueFavBtnTag = cocktails.replaceAll(",", "").split(" ")[0] + uniqueID + "fav"
    let uniqueFavBtnId = "#" + uniqueFavBtnTag
     console.log(replacedCocktailName)

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
    cardText.text("Click the button below to view your recipe!");
    // Div that contains both fav and open modal buttons
    let buttonsDiv = $("<div>");
    buttonsDiv.attr("class", "btns-div");
    // Card button to open modal - changed to match html format
    let cocktailResultsButton = $("<button>");
    cocktailResultsButton.attr({
      type: "button",
      class: "btn btn-dark",
      "data-bs-toggle": "modal",
      "data-bs-target": "#" + replacedCocktailName,
    });
    cocktailResultsButton.text("View Recipe");
    // Card save to favourites button
    let favRecipeBtn = $("<button>");
    favRecipeBtn.attr({
      class: "fav-btn",
      id: uniqueFavBtnTag
  });
    // Star icon
    let starIcon = $("<i>");
    starIcon.attr("class", "fa-regular fa-star");

   // Modal container
   let cocktailModalFade = $("<div>");
   cocktailModalFade.prop({
     class: "modal fade",
     id: replacedCocktailName,
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
   let modalTitle = $("<h2>");
   modalTitle.attr("class", "modal-title fs-2");
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
   let modalIngredientsTitle = $("<h4>");
   modalIngredientsTitle.text("Ingredients");
   let modalCocktailIngredientsUlEl = $("<ul>");
   let modalCocktailIngredients = ingredients;
   modalCocktailIngredients.forEach(function (ingredient) {
     let ingredientLiEl = $("<li>");
     ingredientLiEl.attr("class", "ing-list");
     ingredientLiEl.text(ingredient);
     modalCocktailIngredientsUlEl.append(ingredientLiEl);
   });
   let cocktailRecipe = recipe;
   let modalRecipeContainer = $("<div>");
   modalRecipeContainer.attr("class", "recipe-container");
   let modalRecipeTitle = $("<h4>");
   modalRecipeTitle.text("Recipe");
   let modalRecipeEl = $("<p>");
   modalRecipeEl.text(cocktailRecipe);

   //Modal append inside body
  modalRecipeContainer.append(modalRecipeTitle, modalRecipeEl);
  modalIngredientsContainer.append(
    modalIngredientsTitle,
    modalCocktailIngredientsUlEl
  );
  modalImageContainer.append(modalCocktailImage);
  modalImageIngredientsContainer.append(
    modalImageContainer,
    modalIngredientsContainer
  );
  modalBody.append(
    modalImageIngredientsContainer,
    modalRecipeContainer
  );
  cocktailModalHeader.append(modalTitle, modalCloseButton);
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
   
    let response = await fetch(url)
    if (response.ok) { 
      let data = await response.json()
      let modalVideoContainer = $("<div>");
      modalVideoContainer.attr("class", "modal-vid-container");
      let modalVideoheader = $("<h3>");
      modalVideoheader.text("Video Tutorial");
      let modalCocktailVideo = $("<iframe>");
      modalCocktailVideo.attr({
        src: "https://www.youtube.com/embed/" + data.items[0].id.videoId,
        title: "Cocktail Recipe Tutorial",
        frameborder: "0",
        allowfullscreen: "autoplay",
      });
      modalVideoContainer.append(modalVideoheader, modalCocktailVideo);
      modalBody.append(
        modalVideoContainer
      );
    } 
      
  

      

        
  // click button added to the fav-btn to enable cocktail name to be saved to local storage
  $(document).on("click", uniqueFavBtnId, function(){

    $(this).find("i").toggleClass("fa-regular fa-solid");

    let savedCocktailNames = []

    if (localStorage.getItem("savedCocktailNames")){
      savedCocktailNames = JSON.parse(localStorage.getItem("savedCocktailNames"))
      
      let list = JSON.parse(localStorage.getItem("savedCocktailNames"))
      let exist = false

    for(var i = 0; i < list.length; i++)
        if(list[i] == cocktails) {
            exist = true;
        }

        if(!exist){
          savedCocktailNames.push(cocktails)
        } 
    } else {
      savedCocktailNames = [cocktails]
    }

    
    localStorage.setItem("savedCocktailNames", JSON.stringify(savedCocktailNames))
  
  })

    
       
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
    if (data.length === 0){
      console.log("error")
      let errorText = $("<p>")
      errorText.text("Error: No cocktails recipes found. Please reselect ingredients")
      $("#warning-txt").append(errorText)
    }
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
      let youtubeApiKey = "&key=AIzaSyDp-I7TIZUI3EJOgyCkDzFbfkURX3cvkt0";
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
  $("#search-btn").on("click", function(){
    $(".cardRows").empty()
    $("#warning-txt").empty();
    fetchCocktailName()
  } );
});

// test
