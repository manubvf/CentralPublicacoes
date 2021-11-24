// Containers
import AboutUs from './container/AboutUs';
import PageNotFound from './container/PageNotFound';
import ContactUs from './container/ContactUs';
import Terms from './container/Terms';
import Analitics from './container/Analitics';
import EditProfile from './container/EditProfile';
import Explore from './container/Explore';
import ForYou from './container/ForYou';
import Categories from './container/Categories';
import Notifications from './container/Notifications';
import MyProfile from './container/MyProfile';
import NewProject from './container/NewProject';
import Project from './container/Project';

// Components
import Report from './components/Report';
import Login from './components/Login';
import SignUp from './components/SignUp';
import LoaderComponent from './components/LoaderComponent';

// External
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import React from 'react';

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          id: null,
          showReport: false, 
          showLogin: false, 
          showSignup: false,
          loading: false,
      }
  }

  handleReport = (id) => this.setState({ showReport: !this.state.showReport, id });
  handleLogin = () => this.setState({ showLogin: !this.state.showLogin });
  handleSignup = () => this.setState({ showSignup: !this.state.showSignup });
  handleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { id, showReport, showLogin, showSignup, loading } = this.state;
    return (
      <div>
        {loading && <LoaderComponent/>}
        {showLogin && <Login handleClose={this.handleLogin} openSignUp={this.handleSignup} context={this}/>}
        {showSignup && <SignUp handleClose={this.handleSignup} openLogin={this.handleLogin}/>}
        {showReport && <Report handleClose={this.handleReport} projectId={id}/>}

        <Router>
          <Switch>
            <Route exact path="/">
              <Explore context={this}/>
            </Route>
            <Route path="/explore">
              <Explore context={this}/>
            </Route>
            <Route path="/categories">
              <Categories context={this}/>
            </Route>
            <Route path="/foryou">
              <ForYou context={this}/>
            </Route>
            <Route path="/analitics">
              <Analitics context={this}/>
            </Route>
            <Route path="/terms">
              <Terms context={this}/>
            </Route>
            <Route path="/aboutus">
              <AboutUs context={this}/>
            </Route>
            <Route path="/editprofile">
              <EditProfile context={this}/>
            </Route>
            <Route exact path="/404">
              <PageNotFound context={this}/>
            </Route>
            <Route exact path="/contactus">
              <ContactUs context={this}/>
            </Route>
            <Route path="/notification">
              <Notifications context={this}/>
            </Route>
            <Route path="/myProfile">
              <MyProfile context={this}/>
            </Route>
            <Route path="/newProject">
              <NewProject context={this} />
            </Route>
            <Route path="/project">
              <Project context={this}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
