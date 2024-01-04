  $(document).ready(function () {

    let savedCocktailNames = []


// below pull saved information from local storage
 if (localStorage.getItem("savedCocktailNames")){
    let initialSavedCocktailName = JSON.parse(localStorage.getItem("savedCocktailNames"))
    if (Array.isArray(initialSavedCocktailName)){
      savedCocktailNames = initialSavedCocktailName
    } 
    } 

    const favImages = [
    "./images/image-5.jpg",
    "./images/image-6.jpg",
    "./images/image-7.jpg",
    "./images/image-8.jpg",
    "./images/image-9.jpg",
    "./images/image-10.jpg",
    "./images/image-11.jpg",
    "./images/image-12.jpg",
    "./images/image-13.jpg",
    "./images/image-14.jpg",
    "./images/image-15.jpg",
    "./images/image-16.jpg",
    "./images/image-17.jpg",
    "./images/image-18.jpg",
    "./images/image-19.jpg",
    "./images/image-20.jpg",
    "./images/image-21.jpg",
    "./images/image-22.jpg",
    "./images/image-23.jpg",
    "./images/image-24.jpg",
    "./images/image-25.jpg"
    ]
    
    function getRandom(){
    return Math.floor(Math.random() * favImages.length)
    }
    
    let shuffledFavImages = favImages.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    console.log(shuffledFavImages)
    
    savedCocktailNames.forEach(function(element, index){
    
     
    
    async function renderFavCocktailInformation (favUrl, favCocktails, favIngredients, favRecipe, favCocktailImages) {
        
        let replacedCocktailName = favCocktails.replace(/[^a-zA-Z0-9]/g, "-");
         console.log(replacedCocktailName)
    
      // This has been commented out - there is a container in the html
        //   let cocktailResults = $("<div>");
        // cocktailResults.attr("class", "results-container");
        let resultsRows = $(".favCardRows");
        // Creates columns 
        let resultsColumns = $("<div>");
        resultsColumns.attr("class", "col");
        // Creates card container
        let resultsCard = $("<div>");
        resultsCard.attr("class", "card h-100 result-card");
        // Card image
        let cocktailImageEl = $("<img>");
        cocktailImageEl.attr({
          src: favCocktailImages,
          class: "card-img-top w-auto h-auto",
          // width: "50%", - we have width set in bootstrap class
          alt: "image of cocktail",
        });
        // Creates card body
        let cardBody = $("<div>");
        cardBody.attr("class", "card-body");
        // Card title
        let cocktailNameEl = $("<h5>"); // changed to match bootstrap
        cocktailNameEl.text(favCocktails);
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
       
    
    
    
        // Modal
    
        let cocktailModalFade = $("<div>");
        cocktailModalFade.prop({
          class: "modal fade",
          id: replacedCocktailName,
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
          "data-bs-dismiss": "modal",
        });
        modalCloseButton.html("&times");
        let modalTitle = $("<h2>");
        modalTitle.attr("class", "modal-title fs-2");
        modalTitle.text(favCocktails);
    
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
          src: favCocktailImages,
          width: "100%"
        })
        let modalIngredientsContainer = $("<div>")
        modalIngredientsContainer.attr("class", "ingredients-container")
        let modalIngredientsTitle = $("<h4>");
        modalIngredientsTitle.text("Ingredients");
        let modalCocktailIngredientsUlEl = $("<ul>")
        let modalCocktailIngredients = favIngredients
        modalCocktailIngredients.forEach(function(ingredient){
        let ingredientLiEl = $("<li>")
        ingredientLiEl.attr("class", "ing-list");
        ingredientLiEl.text(ingredient)
        modalCocktailIngredientsUlEl.append(ingredientLiEl)
        })
        let cocktailRecipe = favRecipe
        let modalRecipeContainer = $("<div>")
        modalRecipeContainer.attr("class", "recipe-container")
        let modalRecipeTitle = $("<h4>");
        modalRecipeTitle.text("Recipe");
        let modalRecipeEl = $("<p>")
        modalRecipeEl.text(cocktailRecipe)

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
  buttonsDiv.append(cocktailResultsButton);
  cardBody.append(cocktailNameEl, cardText, buttonsDiv);
  resultsCard.append(cocktailImageEl, cardBody);
  resultsColumns.append(resultsCard);
  resultsRows.append(resultsColumns, cocktailModalFade);
   
    let response = await fetch(favUrl)
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
        
    }
    
    const fetchFavCocktailName = async () => {
      const favApiKey = "&X-Api-Key=lFLKoDXCUTiqMPOwDMT5Ng==bewV4VzaZPxzBIMu";  
    
      const favCocktailNameUrl =
        "https://api.api-ninjas.com/v1/cocktail?name=" +
        element +
        favApiKey;
    console.log(favCocktailNameUrl)
    
    
      const response = await fetch(favCocktailNameUrl);
      const data = await response.json();
      console.log(data);
        let favCocktailName = data[0].name
        let newFavCocktailName = favCocktailName.replaceAll(",", "")
        console.log(newFavCocktailName)
    
        let favCocktailIngredients = data[0].ingredients
        let favCocktailInstructions = data[0].instructions
    
        let selectFavImage
    
        if (shuffledFavImages[index]){
          selectFavImage = shuffledFavImages[index]
        } else {
          selectFavImage = shuffledFavImages[getRandom()]
        }
    
    
        let favCocktailSearch = newFavCocktailName + " cocktail recipe"
        let favYoutubeUrl = "https://www.googleapis.com/youtube/v3/search?"
        let typeFav = "type=video"
        let partFav = "&part=snippet"
        let embedFav = "&videoEmbeddable=true"
        let limitFav = "&maxResults=1"
        let favVidQuery = "&q=" + favCocktailSearch
        let favYoutubeApiKey = "&key=AIzaSyCMrakuq-q97OBgPm54uLa7iaSXkqw7JqE"
      console.log(favVidQuery)
    
    
        let favCocktailVideoUrl = favYoutubeUrl + typeFav + favYoutubeApiKey + favVidQuery + limitFav + partFav + embedFav
        console.log(favCocktailVideoUrl)
    
        renderFavCocktailInformation(favCocktailVideoUrl, favCocktailName, favCocktailIngredients, favCocktailInstructions, selectFavImage)
    };
    
    fetchFavCocktailName();
    
    })
    
    
    })



  

