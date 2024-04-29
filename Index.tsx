import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';


const Main = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra el componente principal de tu aplicación
AppRegistry.registerComponent('my-app', () => Main);

