// Add all JS to do with page functionality here incl. modal, search and favourites page functions

$(document).ready(function(){

 
    
    let ingredients = ["vodka", "lime"]
    let ingredientsString = ingredients.toString().split('').join('')
    const apiKey = '&X-Api-Key=lFLKoDXCUTiqMPOwDMT5Ng==bewV4VzaZPxzBIMu'
    

    let  cocktailNameUrl = "https://api.api-ninjas.com/v1/cocktail?ingredients=" + ingredientsString + apiKey

    let images = ["./images/cocktail1.jpg", "./images/cocktail2.jpeg", "./images/cocktail3.jpg", "./images/cocktail4.jpg", "./images/cocktail5.jpg", "./images/cocktail6.jpg", "./images/cocktail7.jpg", "./images/cocktail8.jpg", "./images/cocktail9.jpg", "./images/cocktail10.jpg", "./images/cocktail11.jpg", "./images/cocktail12.jpg", "./images/cocktail13.jpg", "./images/cocktail14.jpg", "./images/cocktail15.jpg"]

    let shuffledImages = images.sort(function(a, b){
        return 0.5 - Math.random()
    })


    const fetchCocktailName = async ()=>{
        const response = await fetch(cocktailNameUrl)
        const data = await response.json()
        console.log(data)
        for(i = 0; i < data.length; i++){

            let replacedCocktailName = data[i].name.replaceAll(',', '')
            // let cocktailNameId = data[i].name.replaceAll(',', '').replaceAll(' ', '-') 
            // console.log(cocktailNameId)
            // console.log(replacedCocktailName)
            // let cocktailNameString = "s=" + replacedCocktailName
            // let cocktailImgUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?" + cocktailNameString
            // renderCocktailImage(cocktailImgUrl)

            // Below Code display results
            let cocktailResults = $("<div>")
            cocktailResults.attr("class", "results-container")
            let cocktailImageEl = $("<img>")
            cocktailImageEl.attr({"src": shuffledImages[i], "class": "cocktail-image", "width": "20%"})
            let cocktailNameEl = $("<h1>")
            cocktailNameEl.text(replacedCocktailName)
            let cocktailResultsButton = $("<button>")
            cocktailResultsButton.attr({"type": "button", "class": "btn btn-info btn-lg", "data-toggle": "modal", "data-target": "#myModal"})
            cocktailResultsButton.text("Expand")

            // Modal
            let cocktailModalFade = $("<div>")
            cocktailModalFade.attr({"class": "modal fade", "id": "myModal", "role": "dialog"})
            let cocktailModalDialog = $("<div>")
            cocktailModalDialog.attr("class", "modal-dialog")
            let cocktailModalContent = $("<div>")
            cocktailModalContent.attr("class", "modal-content")
            let cocktailModalHeader = $("<div>")
            cocktailModalHeader.attr("class", "modal-header")
            let modalCloseButton = $("<button>")
            modalCloseButton.attr({"type": "button", "class": "close", "data-dismiss": "modal"})
            modalCloseButton.html("&times")
            let modalTitle = $("<h4>")
            modalTitle.attr("class", "modal-title")
            modalTitle.text(replacedCocktailName)
            let modalBody = $("<div>")
            modalBody.attr("class", "modal-body")
            let exampleText = $("<p>")
            exampleText.text("testing")


            modalBody.append(exampleText)
            cocktailModalHeader.append(modalCloseButton, modalTitle)
            cocktailModalContent.append(cocktailModalHeader, modalBody)
            cocktailModalDialog.append(cocktailModalContent)
            cocktailModalFade.append(cocktailModalDialog)
            cocktailResults.append(cocktailImageEl, cocktailNameEl, cocktailResultsButton)
            $(document.body).prepend(cocktailResults, cocktailModalFade)
            
            
        }
    }
    fetchCocktailName()



    
    

    // function renderCocktailImage (url) {
        
    //     fetch(url)
    //             .then(function (response) {
    //                 return response.json()
    //             }).then(function (data) {
    //             console.log(data.drinks)
    //             cocktailDrink = data.drinks
    //             if(cocktailDrink) {
    //                 let cocktailResults = $("<div>")
    //                 cocktailResults.attr("class", "results-container")
    //                 let cocktailImageEl = $("<img>")
    //                 cocktailImageEl.attr({"src": data.drinks[0].strDrinkThumb, "class": "cocktail-image"})
    //                 let cocktailNameEl = $("<h1>")
    //                 cocktailNameEl.text(data.drinks[0].strDrink)
    //                 cocktailResults.append(cocktailImageEl, cocktailNameEl)
    //                 $(document.body).prepend(cocktailResults)
    //             }
    //         })
               

    // }

    // const fetchCocktailName = async ()=>{
    //     const response = await fetch(cocktailNameUrl)
    //     const data = await response.json()
    //     console.log(data)
    //     for(i = 0; i < data.length; i++){

    //         let replacedCocktailName = data[i].name.replaceAll(',', '')
    //         // console.log(replacedCocktailName)
    //         let cocktailNameString = "s=" + replacedCocktailName
    //         let cocktailImgUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?" + cocktailNameString
    //         renderCocktailImage(cocktailImgUrl)
            
            
            
    //     }
    // }

    // fetchCocktailName()




    // Sample data -
const cocktails = [
    {
        name: 'Margarita',
        image: 'margaritaImage.jpg',
        ingredients: ['Tequila', 'Triple sec', 'Lime juice'],
        recipe: 'Mix tequila, triple sec, and lime juice. Serve over ice.',        
        video: '<iframe width="100%" height="100" src="https://www.youtube.com/embed/FE-VFXRZgLI?si=q2bJnVmW_vvhAleg" title="YouTube video player" frameborder="0" allowfullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>'
    },
    
];

// Function to open the modal and populate it with data
    function openModal(cocktailIndex) {
    const modal = document.getElementById('cocktailModal');
    const cocktail = cocktails[cocktailIndex];
    document.getElementById('cocktailName').innerText = cocktail.name;
    document.getElementById('cocktailImage').src = cocktail.image;

    // Populate ingredients list
    const ingredientsList = document.getElementById('ingredientsListContainer');
    ingredientsList.innerHTML = '<h3><strong>Ingredients</strong></h3>';
    for (const ingredient of cocktail.ingredients) {
        const listItem = document.createElement('li');
        listItem.innerText = ingredient;
        ingredientsList.appendChild(listItem);
    }

    // Populate recipe text
    const recipeText = document.getElementById('recipeTextContainer');
    recipeText.innerHTML = `<h3><strong>Recipe</strong></h3>${cocktail.recipe}`;

    // Populate video
    const videoContainer = document.getElementById('video');
    videoContainer.innerHTML = cocktail.video;
    modal.style.display = 'block';
}





//     let youtubeUrl = "https://www.googleapis.com/youtube/v3/search?"
//     let type = "type=video"
//     let part = "&part=snippet"
//     let embed = "&videoEmbeddable=true"
//     let vidName = "&q="
//     let youtubeApiKey = "&key=AIzaSyDhUjUoChQOl2tad0gxSE8SKAwMDYHzEq0"
    
//     let cocktailName = "how to make margarita"

//     let finalUrl = youtubeUrl + type + youtubeApiKey + vidName + cocktailName + part + embed


//     fetch(finalUrl)
//         .then(function (response) {
//             return response.json()
//         }).then(function (data) {
//            console.log(data)})


})