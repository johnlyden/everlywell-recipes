
import React, { Component } from 'react';
import background from '../home-background.jpg';
import logo from '../logo.png';

/** class representing a Header Component */
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * If there are favorites, render an indicator in the header and a mechanism to load them
   */
  maybeRenderFavorites() {
    if (!this.props.favorites.length) { return null };
    return (
      <div className="favorites-alert" onClick={this.props.loadFavoriteRecipes}>
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