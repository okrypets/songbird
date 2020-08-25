import React from 'react';
import ReactDOM from 'react-dom';

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