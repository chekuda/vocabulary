import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Home from './pages/Home/Home';
import Vocabulary from './pages/Vocabulary/Vocabulary';
import Thanks from './pages/Thanks/Thanks';
import Summaries from './pages/Summaries/Summaries';
import UpdateGlosary from './pages/UpdateGlosary/UpdateGlosary';
import AddPage from './pages/AddPage/AddPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
  	<Switch>
      <Route exact path='/' component={ Home }/>
      <Route path='/vocabulary' component={ Vocabulary }/>
      <Route path='/thanks' component={ Thanks }/>
      <Route path='/summaries' component={ Summaries }/>
      <Route path='/updateglosary' component={ UpdateGlosary }/>
      <Route path='/addpage' component={ AddPage }/>
      {/* <Route path='/projects/:project' component={ Projects }/> */}
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
