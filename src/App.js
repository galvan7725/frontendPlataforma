import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Wrapper from './core/Wrapper';
import './App.css';


const App = () => (
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>
);

export default App;