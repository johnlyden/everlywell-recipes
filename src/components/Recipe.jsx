import React, { Component } from 'react';

/** class representing a Recipe component */
export default class Recipe extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * handle click of recipe - call recipeSelect action creator and pass selected recipe
   */
  handleClick() {
    this.props.onRecipeSelect(this.props.recipe);
  }

  render() {
    const recipe = this.props.recipe;
    if (!recipe) { return null };
    return (
      <div className="recipe-container"
           onClick={this.handleClick}>
        <h2>{recipe.strMeal}</h2>
        <div className="recipe-image-container">
          <img src={recipe.strMealThumb} className="recipe-image" alt={recipe.strMeal} />
        </div>
      </div>
    )
  }
}