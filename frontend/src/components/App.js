import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Profil from './Profil';
import Forum from './Forum';
import ProfileUser from './ProfileUser';
import Test from './Test';


function App() {
    const token = localStorage.getItem("token");
    console.log(token)

    if(!token) {
        return (
            <BrowserRouter>     
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/test" component={Test}/>
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
                <Route path="/test" component={Test}/>
            </Switch>
        </BrowserRouter>
    );
}
export default App;
