import { Component } from 'react';
import logo from '../../assets/icon-left-font-monochrome-white2.png'
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return  (
            <div className="bg-homepage"> 
               <NavLink to="/forum"><img className="border-bottom mt-3 pb-2" width='100%' src={logo} alt="logo groupomania" /></NavLink>
                <nav className="nav-pills navbar-dark mt-5">
                    <ul className="navbar-nav">
                        <li className="nav-item mb-3"><NavLink className="button_nav nav-link text-center fw-bold" to="/admin/dashboard"><i className="bi bi-layout-text-window-reverse me-3"></i>DASHBOARD</NavLink></li>
                        <li className="nav-item mb-3"><NavLink className="button_nav nav-link text-center fw-bold" to="/admin/users"><i className="bi bi-person-fill me-3"></i>USERS</NavLink></li>
                        <li className="nav-item mb-3"><NavLink className="button_nav nav-link text-center fw-bold" to="/admin/database"><i className="bi bi-server me-3"></i>DATABASE</NavLink></li>
                        <li className="nav-item mt-5 mb-3"><NavLink className="button_nav nav-link text-center fw-bold" to="/forum">Retour forum</NavLink></li>
                    </ul>
                </nav>        
            </div>
        )
    }
}
export default Sidebar;
