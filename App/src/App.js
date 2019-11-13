import React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Home from './pages/Home';
import Result from './pages/Result';
import Select from './pages/Select';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import './App.scss'

import PropTypes from 'prop-types'
import { Provider } from 'react-redux';

const App = ({ store }) => {
  return (
  <Provider store={store}>
    <HashRouter>
      <Contents />
    </HashRouter>
  </Provider>
  )
};

const routes = [
  { path:"/",Component:Home,transitionClass:"slide" },
  { path:"/home",Component:Home,transitionClass:"slide" },
  { path:"/select",Component:Select,transitionClass:"slide" },
  { path:"/result",Component:Result,transitionClass:"slide" },
  { path:"/detail",Component:Detail,transitionClass:"slide" },
]

const Contents = withRouter(({ location }) => {
  return (
    <TransitionGroup>
      <Switch location={location}>
        {routes.map(({ path, Component,transitionClass }) => (
          <Route key={path} exact path={path}>
            {({ match }) => {
              return (
                <CSSTransition
                  key={path}
                  in={match != null}
                  timeout={400}
                  classNames={transitionClass}
                >
                  <Component />
                </CSSTransition>
              )
            }}
          </Route>              
        ))}
        <Route component={NotFound}/>
      </Switch>
  </TransitionGroup>
  )
});


App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;