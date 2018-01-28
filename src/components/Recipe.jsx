import React, { Component } from 'react';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const recipe = this.props.recipe;
    if (!recipe) { return null };
    return (
      <div className="recipe-container"
           onClick={() => this.props.onRecipeSelect(recipe)}>
        <h2>{recipe.strMeal}</h2>
        <div className="recipe-image-container">
          <img src={recipe.strMealThumb} className="recipe-image" alt={recipe.strMeal} />
        </div>
      </div>
    )
  }
}