import React, { Component } from 'react';
import Modal from 'react-modal';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);


    this.state = { term: '', isOpen: false };
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }



  render() {
    return (
      <div className="search-container">
        
      </div>
    )
  }
}