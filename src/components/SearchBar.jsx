import React, { Component } from 'react';
import Modal from 'react-modal';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = { term: '', isOpen: false };
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
  }

  toggleSearch() {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.requestRecipes(this.state.term);
    this.setState({ term: '' });
    this.toggleSearch();
  }

  render() {
    return (
      <div className="search-container">
        <div className="search-trigger" onClick={() => { this.toggleSearch() }}>
          <i className="fa fa-2x fa-search" aria-hidden="true"></i>
        </div>
        <Modal isOpen={ this.state.isOpen } className="search-modal">
          <div className="search-nav">
            <button onClick={ () => this.toggleSearch() }>
              <i className="fa fa-3x fa-arrow-circle-left" aria-hidden="true"></i>
            </button>
            <form onSubmit={this.onFormSubmit} >
              <input type="text" value={this.state.term} onChange={this.onInputChange}></input>
              <button type="submit"><i className="fa fa-2x fa-search" aria-hidden="true"></i></button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}