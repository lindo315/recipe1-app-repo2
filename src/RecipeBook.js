import React, { useState } from "react";
import reciperData from "./reciperData.json";

// This is the Recipe component. It displays a single recipe card with details
// like the name, description, time, image, ingredients, and dietary information.
// It also has a button to mark the recipe as a favorite or remove it from favorites.
const Recipe = ({ recipe, onFavorite }) => {
  // Destructure the recipe object to get its properties
  const { id, name, description, time, imageName, ingredients, dietary } =
    recipe;

  // Use the useState hook to manage the isFavorite state for this recipe
  const [isFavorite, setIsFavorite] = useState(false);

  // This function toggles the isFavorite state and calls the onFavorite prop
  // function with the recipe id, so the parent component can handle adding/removing
  // the recipe from the favorites list
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(id);
  };

  // Render the recipe card with its details and the favorite button
  return (
    <div className="recipe-card">
      <div className="food-image">
        <img src={imageName} alt={name} />
      </div>
      <div className="food-info">
        <h3 className="title">{name}</h3>
        <p className="description">{description}</p>
        <p className="info">Time: {time}</p>
        {/* <h4 className="info">Ingredients:</h4>

        {ingredients.map((ingredient, index) => (
          <li className="info" key={index}>
            {ingredient}
          </li>
        ))} */}

        <p className="dietary">Dietary: {dietary.join(", ")}</p>
        <button className="fav-btn" onClick={handleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

// This is the main RecipeBook component that manages the state of the recipe book
const RecipeBook = () => {
  // Use multiple useState hooks to manage the state of recipes, search term,
  // filters, favorites, and whether to show only favorites or not
  const [recipes, setRecipes] = useState(reciperData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // This function updates the searchTerm state when the user types in the search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // This function adds or removes a filter from the filters state
  const handleFilter = (filter) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  // This function clears all the applied filters
  const handleClearFilters = () => {
    setFilters([]);
  };

  const handleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter((id) => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };

  const handleShowFavorites = () => {
    setShowFavoritesOnly((prevState) => !prevState);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (
      searchTerm &&
      !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.length > 0 &&
      !filters.every((filter) => recipe.dietary.includes(filter))
    ) {
      return false;
    }

    if (showFavoritesOnly && !favorites.includes(recipe.id)) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <nav className="nav-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <button
            onClick={() => handleFilter("Vegetarian")}
            className={
              filters.includes("Vegetarian")
                ? "filter-button active"
                : "filter-button"
            }
          >
            Vegetarian
          </button>
          <button
            onClick={() => handleFilter("Keto")}
            className={
              filters.includes("Keto")
                ? "filter-button active"
                : "filter-button"
            }
          >
            Keto
          </button>
          <button
            onClick={() => handleFilter("Gluten-free")}
            className={
              filters.includes("Gluten-free")
                ? "filter-button active"
                : "filter-button"
            }
          >
            Gluten-free
          </button>
          <button
            onClick={() => handleFilter("Dessert")}
            className={
              filters.includes("Dessert")
                ? "filter-button active"
                : "filter-button"
            }
          >
            Dessert
          </button>
          <button onClick={handleClearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>
        <div className="favorites-container">
          <button
            onClick={handleShowFavorites}
            className={
              showFavoritesOnly ? "favorites-button active" : "favorites-button"
            }
          >
            {showFavoritesOnly ? "Show All" : "Show Favorites"}
          </button>
        </div>
      </nav>

      <div className="recipe-book-container">
        {filteredRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} onFavorite={handleFavorite} />
        ))}
      </div>
    </div>
  );
};
export default RecipeBook;
