import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Game from './components/Game';
import CreatePlayer from './components/CreatePlayer';
import Boards from './components/Boards';

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path="/" component={CreatePlayer} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
