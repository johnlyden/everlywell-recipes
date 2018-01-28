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