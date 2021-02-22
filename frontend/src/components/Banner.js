import logo from '../assets/icon-left-font-monochrome-white2.png'
import '../styles/Banner.css'
import { NavLink } from 'react-router-dom';

function Banner() {
	return  <div className='banner ps-4 pe-4 mb-5'>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <NavLink className="nav-link" to="/"><img src={logo} height="50" alt='Groupomania'/></NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item"><NavLink className="nav-link fw-bold" to="/login">SE CONNECTER</NavLink></li>
                                <li className="nav-item ms-4"><NavLink className="nav-link fw-bold" to="/forum">FORUM</NavLink></li>
                                <li className="nav-item ms-4"><NavLink className="nav-link fw-bold" to="/profil">MON PROFIL<i className="bi bi-person-circle ms-2"></i></NavLink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
}

export default Banner
