import React, { Component } from 'react';
import Modal from 'react-modal';

export default class RecipeModal extends Component {
  constructor(props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);

    this.state = {
      isFavorite: false
    }
  }

  componentWillMount() {
    // specify what should be hidden when Modal renders
    Modal.setAppElement('body');
  }

  /**
   * Returns a nested array with ingredients and measurements, ex [["1 whole", "chicken"], ["2 chopped", "tomatos"]]
   * Each meal that is returned from API is strucutred such that ingredients and the amount of each ingredient are separate properties
   * 
   * exampleResponse = {
   *  "strMeal": "Chicken Dinner Meal"
   *  "strIngredient1": "chicken",
   *  "strIngredient2": "Tomatos",
   *  "strMeasure1": "1 whole",
   *  "strMeasure2": "2 diced"
   *  }
   * 
   */
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

  /**
   * Returns <ul> with formatted measurements and ingredients
   * @param { Array } ingredientArray result of formatIngredients
   */
  renderIngredients(ingredientArray) {
    const ingredients = ingredientArray.map( (ingredient, i) => {
      return <li key={`ingredient${i}`}>{`${ingredient[0]} ${ingredient[1]}`}</li>
    })
    return (
      <ul className="ingredients-list">{ingredients}</ul>
    );
  }

  /**
   * Returns instructions for recipe
   */
  renderDirections() {
    return (
      <p>{this.props.selectedRecipe.strInstructions}</p>
    )
  }

  /**
   * Toggles adding/removing recipe from array of favorites
   * @param { Object } e event 
   */
  toggleFavorite(e) {
    if (e.target.classList.contains('is-favorite')) {
      this.props.removeFromFavorites(this.props.selectedRecipe);
    } else {
      this.props.addToFavorites(this.props.selectedRecipe);
    }
  }

  /**
   * Returns boolean to see if the recipe is already marked as a favorite
   */
  checkFavorites() {
    const recipeID = this.props.selectedRecipe.idMeal;
    const favorites = this.props.favoriteRecipes;

    return favorites.some( (recipe) => {
      return recipe.idMeal === recipeID
    });
  }

  /**
   * Calls requestClose action creator
   */
  handleCloseClick() {
    this.props.onRequestClose();
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
              <button onClick={ this.handleCloseClick }>
                <i className="fa fa-3x fa-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button className="like-container" onClick={ this.toggleFavorite }>
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