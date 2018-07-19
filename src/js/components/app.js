import React from 'react';
import { hot } from 'react-hot-loader';
import img from '../../images/webpack-logo.svg';

const App = () => (
  <div className="container">
    <h1>Webpack4-React Starter</h1>
    <img src={img} alt="weback-logo" />
    <footer>
      <small>
        Developed by{' '}
        <a href="https://github.com/silvestrevivo" target="_blank" rel="noreferrer noopener">
          @silvestrevivo
        </a>
      </small>
    </footer>
  </div>
);

export default hot(module)(App);
