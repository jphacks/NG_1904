import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Select from './pages/Select';
import NotFound from './pages/NotFound';

import PropTypes from 'prop-types'
import { Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/select" component={Select}/>
        <Route exact path="/result" component={Result}/>
        <Route component={NotFound}/>
      </Switch>
    </HashRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;