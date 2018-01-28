import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import configureStore from '../configureStore';
import { addFavoritesFromStorage } from '../actions';
import App from './App';

const store = configureStore();

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }
  render() {
    return (
      <Provider store={store}>
        <App context={store}/>
      </Provider>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    // addFavoritesFromStorage
  };
}

// export default connect(null, mapDispatchToProps)(Root);