import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { createStore } from 'redux';
import mousehatApp from './reducers/reducers'

library.add(fab, fas, far);

const store = createStore(mousehatApp);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
