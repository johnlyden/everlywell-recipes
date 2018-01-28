import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2>app</h2>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

/**
 * Bind all actions to props
 * @param { Function } dispatch 
 */
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);