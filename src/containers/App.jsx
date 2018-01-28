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
  }

  componentDidMount() {
    this.props.actions.requestRecipes();
  }

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