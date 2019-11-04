import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import { createStore } from 'redux';
import mousehatApp from './reducers/reducers'

const store = createStore(mousehatApp);

ReactDOM.render(<App store={store} />, document.getElementById('root'));