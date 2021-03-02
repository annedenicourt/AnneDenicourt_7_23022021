import Home from './Home';
import Register from './Register';
import Profil from './Profil';
import '../styles/App.css';
import Forum from './Forum';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return ( 
    <BrowserRouter>     
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/forum" component={Forum}/>
            <Route path="/profil" component={Profil}/>
        </Switch>
    </BrowserRouter>
    );
}





export default App;
