// Add all JS to do with page functionality here incl. modal, search and favourites page functions

$(document).ready(function () {
  // Array of options with categories
  var optionsArray = [
    {
      label: "Base",
      children: [
        "Vodka",
        "Gin",
        "Rum",
        "Tequila",
        "Whiskey",
        "Brandy",
        "Scotch",
        "Bourbon",
        "Cognac",
        "Mezcal",
        "Sake",
        "Absinthe",
        "Beer",
        "Wine",
        "Champagne",
        "Prosecco",
        "Sherry",
        "Brandy",
        "Cider",
      ],
    },
    {
      label: "Modifiers",
      children: [
        "Vermouth",
        "Cherry Liqueur",
        "Orange Liqueur",
        "Balckberry Liqueur",
        "Campari",
        "Aperol",
        "Amaretto",
        "Bitters",
        "Curacao",
        "Triple Sec",
        "Soda Water",
        "Cream",
        "Egg White",
        ,
      ],
    },
    {
      label: "Flavourings & Colourings",
      children: [
        "Lime Juice",
        "Lemon Juice",
        "Orange Juice",
        "Pineapple Juice",
        "Mint",
        "Strawberry Syrup",
        "Rasperry Syrup",
      ],
    },
  ];

  // Populate the select element with options and groups
  optionsArray.forEach(function (group) {
    var optgroup = $("<optgroup>", { label: group.label });

    group.children.forEach(function (option) {
      optgroup.append(
        $("<option>", {
          value: option.toLowerCase(), // Use lowercase for consistency
          text: option,
        })
      );
    });

    $("#multiple-checkboxes").append(optgroup);
  });

  // Initialise the multi-select dropdown
  $("#multiple-checkboxes").multiselect({
    includeSelectAllOption: true, // Remove "Select All" option
    selectAllText: "Select All / Clear All", // cutomise the "Select All" text
    maxSelect: 4, // Limit selection to 4 choices
  });

  // Capture change event on the multi-select dropdown
  $("#multiple-checkboxes").change(function () {
    // Clear the content of the display box
    $("#selected-ingredients").empty();

    // Get the selected items and append them to the display box
    $("#multiple-checkboxes option:selected").each(function () {
      $("#selected-ingredients").append(
        '<div class="selected-item">' + $(this).text() + "</div>"
      );
    });
  });

  // Button click event to trigger API request
});

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
    "./images/cocktail1.jpg",
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


let count = 0

  function renderCocktailInformation (url, cocktails, ingredients, recipe, cocktailImages, uniqueID) {

    fetch(url)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
      
       let replacedCocktailName = cocktails.replaceAll(",", "").split(" ")[0] + uniqueID


    
        let cocktailResults = $("<div>");
      cocktailResults.attr("class", "results-container");
      let cocktailImageEl = $("<img>");
      cocktailImageEl.attr({
        src: cocktailImages,
        class: "cocktail-image",
        width: "20%",
      });
      let cocktailNameEl = $("<h1>");
      cocktailNameEl.text(cocktails);
      let cocktailResultsButton = $("<button>");
      cocktailResultsButton.attr({
        type: "button",
        class: "btn btn-info btn-lg",
        "data-toggle": "modal",
        "data-target": "#myModal",
      });
      cocktailResultsButton.text("Expand");

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
      
      //Results append inside body
      cocktailResults.append(
        cocktailImageEl,
        cocktailNameEl,
        cocktailResultsButton
      );

      $(document.body).prepend(cocktailResults, cocktailModalFade);
       

       
    
    
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
      let youtubeApiKey = "&key=AIzaSyDAmUN4LtVyfzxkZ57-cquOz6_h1RgKBag"
    console.log(vidQuery)
  

      let cocktailVideoUrl = youtubeUrl + type + youtubeApiKey + vidQuery + limit + part + embed

      renderCocktailInformation(cocktailVideoUrl, cocktailName, cocktailIngredients, cocktailInstructions, images, uniqueCount)
    }
  };
  fetchCocktailName();





});
