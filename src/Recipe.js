import React, { useState } from "react";
import style from "./recipe.module.css";
import { FiHeart } from "react-icons/fi";

const Recipe = ({ title, calories, image, ingredients, isFavorited, onToggleFavorite }) => {
  return (
    <div className={style.recipe}>
      <div className={style.header}>
        <h1>{title}</h1>
        <button onClick={onToggleFavorite} className={style.favorite}>
          <FiHeart className={`${style.heart} ${isFavorited ? style.favorited : ''}`} />
        </button>
      </div>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories: {calories}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
