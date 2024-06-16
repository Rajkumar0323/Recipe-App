import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";
import { GiHamburgerMenu } from "react-icons/gi";
import Favourite from "./fav";

const App = () => {
  const APP_ID = `d5c044f0`;
  const APP_KEY = `b14e871b4f29f5082c11d19a68c9afa0`;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("paratha");
  const [favorite, setFavorite] = useState([]);
  const [favVis, setFavVis] = useState(false);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const toggleFavorite = (recipe) => {
    setFavorite((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.uri === recipe.uri);
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.uri !== recipe.uri);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  const toggleFavVis = () => {
    setFavVis((prevFavVis) => !prevFavVis);
  };

  return (
    <div className="App">
      <div className="Navbar">
        <form className="search-form" onSubmit={getSearch}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="fav-action">
          <button onClick={toggleFavVis} className="fav-btn">
            Favourite <GiHamburgerMenu />
          </button>
        </div>
      </div>
      {favVis ? (
        <div className="favorites">
          {favorite.map((recipe) => (
            <Favourite
              key={recipe.uri}
              title={recipe.label}
              calories={recipe.calories}
              image={recipe.image}
              ingredients={recipe.ingredients}
            />
          ))}
        </div>
      ) : (
        <div className="recipes">
          {recipes.map(({ recipe }) => (
            <Recipe
              key={recipe.uri}
              title={recipe.label}
              calories={recipe.calories}
              image={recipe.image}
              ingredients={recipe.ingredients}
              isFavorited={favorite.some((fav) => fav.uri === recipe.uri)}
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
