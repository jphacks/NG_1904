import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition'
import Home from './pages/Home';
import Result from './pages/Result';
import Select from './pages/Select';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';

import PropTypes from 'prop-types'
import { Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <AnimatedSwitch 
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper">
          
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/select" component={Select}/>
        <Route exact path="/result" component={Result}/>
        <Route exact path="/detail" component={Detail}/>
        <Route component={NotFound}/>
      </AnimatedSwitch>
    </HashRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;