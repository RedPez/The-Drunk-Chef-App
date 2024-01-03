$(document).ready(function () {
  let allIngredients = [];
  // Your options data
  var drinksData = [
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
    "Vermouth",
    "Cherry Liqueur",
    "Orange Liqueur",
    "Blackberry Liqueur",
    "Campari",
    "Aperol",
    "Amaretto",
    "Bitters",
    "Curacao",
    "Triple Sec",
    "Soda Water",
    "Cream",
    "Egg White",
    "Lime Juice",
    "Lemon Juice",
    "Orange Juice",
    "Pineapple Juice",
    "Mint",
    "Strawberry Syrup",
    "Raspberry Syrup",
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
    rounded: true,
    shadow: true,
    placeholder: "Search",
    tagColor: {
      textColor: "#327b2c",
      borderColor: "#92e681",
      bgColor: "#eaffe6",
    },
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
