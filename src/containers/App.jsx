import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../App.css';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import RecipeModal from '../components/RecipeModal';

/** class representing App component */
class App extends Component {
  constructor(props) {
    super(props);

    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.showFavoriteRecipes = this.showFavoriteRecipes.bind(this);
    this.removeRecipeFromFavorites = this.removeRecipeFromFavorites.bind(this);
  }

  componentDidMount() {
    // check if favorites stored in localStorage
    if (localStorage.getItem('everlywellRecipes') !== null) {
      const favorites = JSON.parse(localStorage.getItem('everlywellRecipes'));
      // load these favorites
      this.loadFavoritesFromLocalStorage(favorites);
    }
    // request random recipes
    this.props.actions.requestRecipes();
  }

   /**
   * 
   * @param { Array } favorites array of recipe objects
   */
  loadFavoritesFromLocalStorage(favorites) {
    this.props.actions.addFavoritesFromStorage(favorites);
  }

  /**
   * Calls action creator to showh favorites in RecipeList
   */
  showFavoriteRecipes() {
    this.props.actions.showFavorites(this.props.favorites);
  }

  /**
   * Adds new favorite recipe to favorites stored in LocalStorage
   * @param { Object } recipe 
   */
  updateLocalStorage(recipe) {
    const hasCurrentFavs = JSON.parse(localStorage.getItem('everlywellRecipes'));
    const currentFavorites = hasCurrentFavs ? hasCurrentFavs : [];
    const updatedFavorites = currentFavorites.concat(recipe);
    localStorage.setItem('everlywellRecipes', JSON.stringify(updatedFavorites));
  }

  /**
   * Calls to method and action creator to remove recipe from localStorage and application state
   * @param { Object } recipe 
   */
  removeRecipeFromFavorites(recipe) {
    this.props.actions.removeFromFavorites(recipe);
    this.removeFromLocalStorage(recipe);
  }

  /**
   * Removes specified recipe from localStorage object
   * @param { Object } recipe 
   */
  removeFromLocalStorage(recipe) {
    const currentFavs = JSON.parse(localStorage.getItem('everlywellRecipes'));
    const updatedFavs = currentFavs.filter( (el) => {
      return el.idMeal !== recipe.idMeal;
    });
    localStorage.setItem('everlywellRecipes', JSON.stringify(updatedFavs));
  }

  render() {
    return (
      <div className="app-container">
        <Header favorites={this.props.favorites} 
          loadFavoriteRecipes= { this.showFavoriteRecipes }/>
        <RecipeList
          recipes={ this.props.recipes } 
          onRecipeSelect={ selectedRecipe => this.props.actions.openModal({selectedRecipe}) }/>
        <SearchBar 
          requestRecipes={this.props.actions.requestRecipes}
        />
        <RecipeModal 
          modalIsOpen={this.props.modalIsOpen}
          selectedRecipe={this.props.selectedRecipe}
          onRequestClose={this.props.actions.closeModal}
          addToFavorites={this.props.actions.addToFavorites}
          removeFromFavorites={this.removeRecipeFromFavorites}
          favoriteRecipes={this.props.favorites}
          updateLocalStorage={this.updateLocalStorage}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    modalIsOpen: state.modal.modalIsOpen,
    recipes: state.recipes,
    selectedRecipe: state.modal.selectedRecipe,
    favorites: state.favorites
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);