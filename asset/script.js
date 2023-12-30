$(document).ready(function(){

 
    
    let ingredients = ["vodka", "lime"]
    let ingredientsString = ingredients.toString().split('').join('')
    const apiKey = '&X-Api-Key=lFLKoDXCUTiqMPOwDMT5Ng==bewV4VzaZPxzBIMu'
    

    let  cocktailNameUrl = "https://api.api-ninjas.com/v1/cocktail?ingredients=" + ingredientsString + apiKey



    function renderCocktailImage (url) {
        
        fetch(url)
                .then(function (response) {
                    return response.json()
                }).then(function (data) {
                console.log(data.drinks)
                cocktailDrink = data.drinks
                if(cocktailDrink) {
                    let cocktailResults = $("<div>")
                    cocktailResults.attr("class", "results-container")
                    let cocktailImageEl = $("<img>")
                    cocktailImageEl.attr({"src": data.drinks[0].strDrinkThumb, "class": "cocktail-image"})
                    let cocktailNameEl = $("<h1>")
                    cocktailNameEl.text(data.drinks[0].strDrink)
                    cocktailResults.append(cocktailImageEl, cocktailNameEl)
                    $(document.body).prepend(cocktailResults)
                }
            })
               

    }

    const fetchCocktailName = async ()=>{
        const response = await fetch(cocktailNameUrl)
        const data = await response.json()
        console.log(data)
        for(i = 0; i < data.length; i++){

            let replacedCocktailName = data[i].name.replaceAll(',', '')
            // console.log(replacedCocktailName)
            let cocktailNameString = "s=" + replacedCocktailName
            let cocktailImgUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?" + cocktailNameString
            renderCocktailImage(cocktailImgUrl)
            
            
            
        }
    }

    fetchCocktailName()




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