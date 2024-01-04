$(document).ready(function () {
  let allIngredients = [];
  // Your options data
  var drinksData = [
    "Absinthe",
    "Acid phosphate",
    "Agave syrup",
    "Allspice",
    "Amaretto",
    "Amaro Abano",
    "Amaro Montenegro",
    "Angostura",
    "Angostura bitters",
    "Apple juice",
    "Apple brandy",
    "Apricot brandy",
    "Blanco tequila",
    "Bourbon",
    "Brandy",
    "Brown sugar",
    "Cachaca",
    "Campari",
    "Carpano Punt e Mes",
    "Celery salt",
    "Champagne",
    "Cherry",
    "Cherry liqueur",
    "Cinnamon",
    "Cinnamon syrup",
    "Cloves",
    "Cointreau",
    "Cream",
    "Creme de Banane",
    "Creme de Cacao",
    "Creme de violette",
    "Cynar",
    "DOM Benedictine",
    "Dubonnet",
    "Drambuie",
    "Dry gin",
    "Dry vermouth",
    "Falernum",
    "Ginger",
    "Ginger ale",
    "Ginger beer",
    "Ginger syrup",
    "Gin",
    "Grapefruit",
    "Grapefruit juice",
    "Grapefruit liqueur",
    "Grand Marnier",
    "Grenadine",
    "Honey",
    "Honey syrup",
    "Hpnotiq",
    "Hot coffee",
    "Irish whiskey",
    "Islay Scotch",
    "Jalapeno",
    "Kina Lillet",
    "Kirschwasser",
    "Lemonade",
    "Lemon",
    "Lemon bitters",
    "Lemon juice",
    "Lemon peel",
    "Lillet",
    "Lime",
    "Lime cordial",
    "Lime juice",
    "Lime peel",
    "Mango",
    "Maple syrup",
    "Mezcal",
    "Mint",
    "Nutmeg",
    "Nicaraguan Rum",
    "Orange",
    "Orange bitters",
    "Orange juice",
    "Orange peel",
    "Orgeat",
    "Passion fruit",
    "Passion fruit juice",
    "Peach",
    "Peach bitters",
    "Peach schnapps",
    "Peychaud's Bitters",
    "Pineapple",
    "Pineapple juice",
    "Port",
    "Powdered sugar",
    "Raspberry",
    "Raw egg",
    "Raw sugar",
    "Reposado Tequila",
    "Rhubarb",
    "Rhubarb bitters",
    "Rye",
    "Rye whiskey",
    "Sage",
    "Salt",
    "Scotch",
    "Scotch whisky",
    "Sherry",
    "Simple syrup",
    "Sloe gin",
    "Soda water",
    "Sour mix",
    "Strawberry",
    "Strawberry syrup",
    "Sweet red vermouth",
    "Sweet sherry",
    "Sugar",
    "Tabasco sauce",
    "Tequila",
    "Tomato juice",
    "Triple sec",
    "Turbinado sugar",
    "Vanilla",
    "Vanilla syrup",
    "Vermouth",
    "Vodka",
    "Vodka Citron",
    "Water",
    "Whiskey",
    "White rum",
    "Worcestershire Sauce",
    "Yellow Chartreuse"
  ];

  // Clear existing options in the select element
  $("#multiple-checkboxes").empty();

  // Populate the select element with options
  drinksData.forEach(function (drink, index) {
    $("#multiple-checkboxes").append(
      $("<option>", {
        value: index + 1,
        text: drink,
      })
    );
  });

  // Initialize the multi-select dropdown
  new MultiSelectTag("multiple-checkboxes", {
    rounded: false,
    shadow: true,
    placeholder: "Search an ingredient",
    
    onChange: function (values) {
      allIngredients = values;
      updateSelectedIngredients(values);
    },
  });

  // Function to update the selected ingredients in the display box
  function updateSelectedIngredients(selectedValues) {
    var selectedIngredientsHtml = selectedValues
      .map(function (option) {
        var drinkIndex = parseInt(option.value) - 1;
        var selectedDrink = drinksData[drinkIndex];
        /*console.log(
          "Value:",
          option.value,
          "Index:",
          drinkIndex,
          "Selected Drink:",
          selectedDrink
        );*/
        return '<div class="selected-item">' + selectedDrink + "</div>";
      })
      .join("");
    $("#selected-ingredients .list-of-ing").html(selectedIngredientsHtml);
    console.log(allIngredients);
  }
});