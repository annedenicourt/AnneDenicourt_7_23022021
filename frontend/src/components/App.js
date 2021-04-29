import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Profil from './Profil';
import Forum from './Forum';
import ProfileUser from './ProfileUser';
import Dashboard from './Dashboard/Dashboard';
import Users from './Dashboard/Users';
import Database from './Dashboard/Database';
require('dotenv').config();

function App() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role)

    if(!token) {
        return (
            <BrowserRouter>     
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>)
    } else if(role === 'Moderator') {
        return ( 
            <BrowserRouter>     
                <Switch>
                    <Route path="/admin/dashboard" exact component={Dashboard}/>
                    <Route path="/admin/users" component={Users}/>
                    <Route path="/admin/database" component={Database}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/forum" component={Forum}/>
                    <Route path="/profil" component={Profil}/>
                    <Route path="/user/:id" component={ProfileUser}/>
                </Switch>
            </BrowserRouter>
        );
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
