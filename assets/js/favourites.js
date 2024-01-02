
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



  

  // By the end of this we should be able to click on the favourites icon and have it save the card title to local storage. Upon visiting the favourites page, any favourited cards should display using a combination of the above code that brings up the cocktail name and another function that takes the cocktail name as a parameter to fetch the cocktail data from the API info and display the card. Then we add the same on-click functionality to open moda as homepage.