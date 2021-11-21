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
import Context from './lib/Context';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <Context ref={(c) => { this.context = c; }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Explore context={() => this.context}/>
            </Route>
            <Route path="/explore">
              <Explore context={() => this.context}/>
            </Route>
            <Route path="/categories">
              <Categories context={() => this.context}/>
            </Route>
            <Route path="/foryou">
              <ForYou context={() => this.context}/>
            </Route>
            <Route path="/analitics">
              <Analitics context={() => this.context}/>
            </Route>
            <Route path="/terms">
              <Terms context={() => this.context}/>
            </Route>
            <Route path="/aboutus">
              <AboutUs context={() => this.context}/>
            </Route>
            <Route path="/editprofile">
              <EditProfile context={() => this.context}/>
            </Route>
            <Route exact path="/404">
              <PageNotFound context={() => this.context}/>
            </Route>
            <Route exact path="/contactus">
              <ContactUs context={() => this.context}/>
            </Route>
            <Route path="/notification">
              <Notifications context={() => this.context}/>
            </Route>
            <Route path="/myProfile">
              <MyProfile context={() => this.context}/>
            </Route>
            <Route path="/newProject">
              <NewProject context={() => this.context}/>
            </Route>
            <Route path="/project">
              <Project context={() => this.context}/>
            </Route>
          </Switch>
        </Router>
      </Context>
    );
  }
}

export default App;
