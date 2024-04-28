import React from "react";
import RecipeBook from "./RecipeBook";

const App = () => {
  return (
    <div>
      <header>
        <h1 className="heading">Recipe Book</h1>
      </header>
      <main>
        <RecipeBook />
      </main>
      <footer>
        <p>&copy; 2023 Recipe Book</p>
      </footer>
    </div>
  );
};

export default App;
