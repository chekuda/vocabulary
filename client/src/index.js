import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import 'jquery/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Home from './pages/Home/Home';
import Vocabulary from './pages/Vocabulary/Vocabulary';
import Thanks from './pages/Thanks/Thanks';
import Summaries from './pages/Summaries/Summaries';
import UpdateGlosary from './pages/UpdateGlosary/UpdateGlosary';
import AddPage from './pages/AddPage/AddPage';
import Login from './pages/Login/Login';
import Verifytf from './components/verifywt/verifywt';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import SignUp from './pages/SignUp/SignUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
  <Verifytf>
    <Switch>
      <Route path='/login' component={ Login }/>
      <Route path='/signup' component={ SignUp }/>
      <PrivateRoute exact path='/' component={ Home }/>
      <PrivateRoute path='/vocabulary' component={ Vocabulary }/>
      <PrivateRoute path='/thanks' component={ Thanks }/>
      <PrivateRoute path='/summaries' component={ Summaries }/>
      <PrivateRoute path='/updateglosary' component={ UpdateGlosary }/>
      <PrivateRoute path='/addpage' component={ AddPage }/>
      {/* <Route path='/projects/:project' component={ Projects }/> */}
    </Switch>
  </Verifytf>
</BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
