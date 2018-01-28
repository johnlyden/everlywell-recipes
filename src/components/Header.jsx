
import React, { Component } from 'react';
import background from '../home-background.jpg';
import logo from '../logo.png';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.onFavoritesClick = this.onFavoritesClick.bind(this);
  }

  onFavoritesClick() {
    // call fetch recipes
    // pass array of favorits
  }


  maybeRenderFavorites() {
    if (!this.props.favorites.length) { return null };
    return (
      <div className="favorites-alert" onClick={this.onFavoritesClick}>
        <i className={`fa fa-3x fa-heart is-favorite`} aria-hidden="true"></i>
        <span className="view-fav">View your favorites</span>
      </div>
    );
  }
  render() {
    const style = {
      backgroundImage: `url(${background})`
    };
    return (
      <div className="header-container" style={style}>
        { this.maybeRenderFavorites() }
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    )
  }
}