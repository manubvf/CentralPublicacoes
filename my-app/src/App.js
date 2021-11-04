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
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Explore/>
        </Route>
        <Route path="/explore">
          <Explore/>
        </Route>
        <Route path="/categories">
          <Categories/>
        </Route>
        <Route path="/foryou">
          <ForYou/>
        </Route>
        <Route path="/analitics">
          <Analitics/>
        </Route>
        <Route path="/terms">
          <Terms/>
        </Route>
        <Route path="/aboutus">
          <AboutUs/>
        </Route>
        <Route path="/editprofile">
          <EditProfile/>
        </Route>
        <Route exact path="/404">
          <PageNotFound/>
        </Route>
        <Route exact path="/contactus">
          <ContactUs/>
        </Route>
        <Route path="/notification">
          <Notifications/>
        </Route>
        <Route path="/myProfile">
          <MyProfile/>
        </Route>
        <Route path="/newProject">
          <NewProject/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
