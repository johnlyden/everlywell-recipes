import React, { Component } from 'react';
import Modal from 'react-modal';

export default class RecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false
    }
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  formatIngredients() {
    const recipe = this.props.selectedRecipe;
    // pluck ingredient name key/values from recipe Object.  ex [["strIngredient1", "Chicken"]]
    const ingredientNames = Object.entries(recipe).filter( ([key, value]) => {
      return key.startsWith('strIngredient');
    });
    // pluck ingredient amount key/values from recipe Object. ex [["strMeasure1", "1 whole"]]
    const ingredientAmounts = Object.entries(recipe).filter( ([key, value]) => {
      return key.startsWith('strMeasure');
    });
    // zip up arrays to create array with ingredient name and amount ex [["1 whole", "Chicken"]]
    const formattedIngredients = ingredientAmounts.map( (e, i) => {
      return [e[1], ingredientNames[i][1]]
    }).filter( key => key.indexOf("") < 0 ); // remove empty values

    return formattedIngredients;
  }

  renderIngredients(ingredientArray) {
    const ingredients = ingredientArray.map( (ingredient) => {
      return <li key={ingredient[1]}>{`${ingredient[0]} ${ingredient[1]}`}</li>
    })
    return (
      <ul className="ingredients-list">{ingredients}</ul>
    );
  }

  renderDirections() {
    return (
      <p>{this.props.selectedRecipe.strInstructions}</p>
    )
  }

  
  render() {
    if (!this.props.modalIsOpen) {
      return <div></div>;
    }

    const favClass = this.checkFavorites() ? 'is-favorite' : '';
    const recipe = this.props.selectedRecipe;

    return (
        <Modal
            isOpen={ this.props.modalIsOpen }>
          <div className="recipe-modal">
            <div className="modal-nav">
              <button onClick={ () => this.props.onRequestClose() }>
                <i className="fa fa-3x fa-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button className="like-container" onClick={ (e) => this.toggleFavorite(e) }>
                <i className={`fa fa-3x fa-heart ${favClass}`} aria-hidden="true"></i>
              </button>
            </div>
            <div className="detail-image-container">
              <img src={recipe.strMealThumb} className="recipe-image" alt={recipe.strMeal} />
            </div>
            <h2>{recipe.strMeal}</h2>
            { this.renderIngredients(this.formatIngredients()) }
            <h3>Instructions</h3>
            { this.renderDirections() }
          </div>
        </Modal>
    );
  }
}