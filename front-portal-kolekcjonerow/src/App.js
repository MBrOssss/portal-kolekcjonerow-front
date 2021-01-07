import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/login.component';
import Home from './components/home.component';
import AuthService from './services/auth.service';
import Header from './components/header';
import Offert from './components/offerts.component';
import Mocs from './components/mocs.component';
import OffertDetails from './components/offertDetails';
import MocDetails from './components/mocDetails';
import OffertAdd from './components/offertAdd';
import OffertEdit from './components/offertEdit';
import MocAdd from './components/mocAdd';
import MocEdit from './components/mocEdit';

class App extends Component {
  componentDidMount() {
		const user = AuthService.getCurrentUser();

		// if (user) {
		// 	this.setState({
		// 		currentUser        : AuthService.getCurrentUser(),
		// 		showModeratorBoard : user.roles.includes('ROLE_MODERATOR'),
		// 		showAdminBoard     : user.roles.includes('ROLE_ADMIN')
		// 	});
		// }
	}
  render(){
    return (
      <div>
        <Header/>
        <BrowserRouter>

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/Oferty' component={Offert} exact />
          <Route path='/Login' component={Login} exact />
          <Route path='/Mocs' component={Mocs} exact />
          <Route path='/OffertDetails' component={OffertDetails} />
          <Route path='/MocDetails' component={MocDetails} />
          <Route path='/OffertAdd' component={OffertAdd} />
          <Route path='/OffertEdit' component={OffertEdit} />
          <Route path='/MocAdd' component={MocAdd} />
          <Route path='/MocEdit' component={MocEdit} />
        </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
