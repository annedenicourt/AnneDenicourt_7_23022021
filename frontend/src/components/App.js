import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Profil from './Profil';
import Forum from './Forum';
import ProfileUser from './ProfileUser';

function App() {
    const token = localStorage.getItem("token");
    console.log(token)

    if(!token) {
        return (
            <BrowserRouter>     
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>)
      }
    return ( 
        <BrowserRouter>     
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/forum" component={Forum}/>
                <Route path="/profil" component={Profil}/>
                <Route path="/user/:id" component={ProfileUser}/>
            </Switch>
        </BrowserRouter>
    );
}
export default App;
