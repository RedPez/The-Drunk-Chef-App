
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