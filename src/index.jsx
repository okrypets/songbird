import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = (props) => {  
  const { name } = props;
    return <div>Hello {name}</div>;  
}

App.propTypes = {
  name: PropTypes.string
}

App.defaultProps = {
  name: 'Jane'
};

const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('app');
ReactDOM.render(<AppWithHot />, mountNode);