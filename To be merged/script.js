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
  
    for (const ingredient of cocktail.ingredients) {
        const listItem = document.createElement('ul');
        listItem.innerText = ingredient;
        listItem.classList.add('text-center');
        ingredientsList.appendChild(listItem);
    }

    // Populate recipe text
    const recipeText = document.getElementById('recipeTextContainer');
    recipeText.innerHTML = `<div class="text-center"><h3><strong>Recipe</strong></h3>${cocktail.recipe}</div>`;

    // Populate video
    const videoContainer = document.getElementById('video');
    videoContainer.innerHTML = cocktail.video;
    modal.style.display = 'block';
}



