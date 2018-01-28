
import React, { Component } from 'react';
import background from '../home-background.jpg';
import logo from '../logo.png';

export default class Header extends Component {
  render() {
    const style = {
      backgroundImage: `url(${background})`
    };
    return (
      <div className="header-container" style={style}>
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    )
  }
}