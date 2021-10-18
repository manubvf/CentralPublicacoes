import AboutUs from './container/AboutUs';
import Terms from './container/Terms';
import Analitics from './container/Analitics';
import EditProfile from './container/EditProfile';
import Explore from './container/Explore';
import ForYou from './container/ForYou';
import Categories from './container/Categories';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
      </Switch>
    </Router>
  );
}

export default App;
