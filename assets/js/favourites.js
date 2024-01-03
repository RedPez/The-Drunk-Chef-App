
/* Assuming favourite button will be like: 
<div class="card-body">
<button class="btn btn-outline-warning favorite-button position-absolute top-0 end-0 m-2" onclick="toggleFavorite(this)">
<i class="fas fa-star"></i> </button> */
    

// JavaScript function to handle favorite button click
function toggleFavorite(button) {
        
    const cardInfo = {
      title: button.parentElement.querySelector('.card-title').innerText,
      description: button.parentElement.querySelector('.card-text').innerText,
      
    };

    // Checking if the recipe is already in favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.title === cardInfo.title);

    if (isFavorite) {
      // If it's already a favorite, remove it
      favorites = favorites.filter(fav => fav.title !== cardInfo.title);
    } else {
      // If it's not a favorite, add it
      favorites.push(cardInfo);
    }

    // Update the local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Visually indicate the favorite state on the button for better user experience
    button.classList.toggle('btn-warning', !isFavorite);
  }

  $(document).ready(function () {

    let savedCocktailNames = ["baby, you're driving", "caipiroska", "porn star martini", 
    "velvet fog", "baby, you're driving", "caipiroska", "porn star martini", 
    "velvet fog", "baby, you're driving", "caipiroska", "porn star martini", 
    "velvet fog"]
    
    const favImages = [
      "./images/card-image1.png",
      "./images/card-image2.png",
      "./images/card-image3.png",
      "./images/card-image4.png",
      "./images/card-image5.png",
      "./images/card-image6.png",
      "./images/card-image7.png",
      "./images/card-image8.png",
      "./images/card-image9.png",
      "./images/card-image10.png"
    ]
    
    function getRandom(){
    return Math.floor(Math.random() * favImages.length)
    }
    
    let shuffledFavImages = favImages.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    console.log(shuffledFavImages)
    
    savedCocktailNames.forEach(function(element, index){
    
     
    
    function renderFavCocktailInformation (favUrl, favCocktails, favIngredients, favRecipe, favCocktailImages) {
    
      fetch(favUrl)
      .then(function (response) {
          return response.json()
      }).then(function (data) {
        
        
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
        cardText.text("This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.");
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
        let modalTitle = $("<h4>");
        modalTitle.attr("class", "modal-title fs-5");
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
        let modalCocktailIngredientsUlEl = $("<ul>")
        let modalCocktailIngredients = favIngredients
        modalCocktailIngredients.forEach(function(ingredient){
          let ingredientLiEl = $("<li>")
        ingredientLiEl.text(ingredient)
        modalCocktailIngredientsUlEl.append(ingredientLiEl)
        })
        let cocktailRecipe = favRecipe
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
        modalIngredientsContainer.append(modalCocktailIngredientsUlEl)
        modalImageContainer.append(modalCocktailImage)
        modalImageIngredientsContainer.append(modalImageContainer, modalIngredientsContainer)
        modalBody.append(modalImageIngredientsContainer, modalRecipeContainer, modalVideoContainer)
        cocktailModalHeader.append(modalCloseButton, modalTitle);
        cocktailModalContent.append(cocktailModalHeader, modalBody);
        cocktailModalDialog.append(cocktailModalContent);
        cocktailModalFade.append(cocktailModalDialog);
    
        // Results append inside cards
        buttonsDiv.append(cocktailResultsButton);
        cardBody.append(cocktailNameEl, cardText, buttonsDiv);
        resultsCard.append(cocktailImageEl, cardBody)
        resultsColumns.append(resultsCard);
        resultsRows.append(resultsColumns, cocktailModalFade);
        
      
      })
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
        let favYoutubeApiKey = "&key=AIzaSyC7wHq1P-HrvJpFQf-ivJ_fHfAFFVO1BA4"
      console.log(favVidQuery)
    
    
        let favCocktailVideoUrl = favYoutubeUrl + typeFav + favYoutubeApiKey + favVidQuery + limitFav + partFav + embedFav
        console.log(favCocktailVideoUrl)
    
        renderFavCocktailInformation(favCocktailVideoUrl, favCocktailName, favCocktailIngredients, favCocktailInstructions, selectFavImage)
    };
    
    fetchFavCocktailName();
    
    
    
    
    
    })
    
    
    
    })



  

  // By the end of this we should be able to click on the favourites icon and have it save the card title to local storage. Upon visiting the favourites page, any favourited cards should display using a combination of the above code that brings up the cocktail name and another function that takes the cocktail name as a parameter to fetch the cocktail data from the API info and display the card. Then we add the same on-click functionality to open moda as homepage.