import React, { Component } from 'react';
import Recipe from './Recipe';

/** class representing RecipeList Component */
export default class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Returns array of Recipe components
   * maps over list of recipes passed down and returns array of Recipes
   */
  renderRecipes() {
    if (!this.props.recipes.length) { return <h2>Loading...</h2> };
    return this.props.recipes.map( (recipe, index) => {
      return <Recipe key={index}
                     recipe={recipe} 
                     onRecipeSelect={this.props.onRecipeSelect}/> 
    });
  }

  render() {
    return (
      <div className="recipe-list-container">
        <ul className="recipe-list">
          {this.renderRecipes()}
        </ul>
      </div>
    )
  }
}