import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { hot } from 'react-hot-loader';

import './assets/style/style.scss';

import AppContainer from './components/AppContainer/AppContainer';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => {
    return (
      <AppContainer />
    );  
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);