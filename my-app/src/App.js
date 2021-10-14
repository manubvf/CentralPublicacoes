import AboutUs from './container/AboutUs';
import ContactUs from './container/ContactUs';
import Terms from './container/Terms';
import Analitics from './container/Analitics';
import Explore from './container/Explore';
import ForYou from './container/ForYou';
import Categories from './container/Categories';
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
        <Route exact path="/aboutus">
          <AboutUs/>
        </Route>
        <Route exact path="/contactus">
          <ContactUs/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
