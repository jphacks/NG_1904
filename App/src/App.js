import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Record from './pages/Record';

export default function App() {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/record" component={Record}/>
        {/*<Route component={NotFound}/>*/}
      </Switch>
    </HashRouter>
  );

}