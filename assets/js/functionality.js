// Add all JS to do with page functionality here incl. modal, search and favourites page functions

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