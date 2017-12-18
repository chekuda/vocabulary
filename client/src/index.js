import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import Vocabulary from './pages/Vocabulary/Vocabulary';
import Thanks from './pages/Thanks/Thanks';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
  	<Switch>
      <Route exact path='/' component={ Home }/>
      <Route path='/vocabulary' component={ Vocabulary }/>
      <Route path='/thanks' component={ Thanks }/>
      {/* <Route path='/projects/:project' component={ Projects }/> */}
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
