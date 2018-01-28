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
  }

  componentDidMount() {
    // check local storage
    if (localStorage.getItem('everlywellRecipes') !== null) {
      const favorites = JSON.parse(localStorage.getItem('everlywellRecipes'));
      // array of objects
      this.loadFavoritesFromLocalStorage(favorites);
    }
    // if something is in there
    // dispatch an action to add favs to app state
    this.props.actions.requestRecipes();
  }

  updateLocalStorage(recipe) {
    const hasCurrentFavs = JSON.parse(localStorage.getItem('everlywellRecipes'));
    const currentFavorites = hasCurrentFavs ? hasCurrentFavs : [];
    const updatedFavorites = currentFavorites.concat(recipe);
    localStorage.setItem('everlywellRecipes', JSON.stringify(updatedFavorites));
  }

  /**
   * 
   * @param { Array } favorites array of recipe objects
   */
  loadFavoritesFromLocalStorage(favorites) {
    this.props.actions.addFavoritesFromStorage(favorites);
  }

  // when favorites does update - call something to update local storage

  render() {
    return (
      <div className="app-container">
        <Header favorites={this.props.favorites}/>
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
          removeFromFavorites={this.props.actions.removeFromFavorites}
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