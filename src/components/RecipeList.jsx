import React, { Component } from 'react';
import Recipe from './Recipe';

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  renderRecipes() {
    if (!this.props.recipes.length) { return <h2>Sorry we didn't find any matches</h2> };
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