import logo from '../assets/icon-left-font-monochrome-white2.png'
import '../styles/Banner.css'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

function Banner() {

    function handleLogout() {
        Swal.fire({
            title: "Êtes-vous sûr(e) ?",
            text: "Une fois déconnecté(e), vous ne pourrez plus accéder au forum",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: 'Me déconnecter',
            denyButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
          })
          .then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Vous avez été déconnecté(e)");
                localStorage.clear();
                return (window.location.href = '/')
            }
          });
    }

	return (
        <div className='row banner ps-4 pe-4 mb-5'>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <NavLink className="nav-link" to="/forum"><img src={logo} height="50" alt='Groupomania'/></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/forum">FORUM</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/profil">MON PROFIL<i className="bi bi-person-circle ms-2"></i></NavLink></li>
                            <li className="logout nav-item nav-link fw-bold" onClick={handleLogout}>SE DECONNECTER</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )  
}

export default Banner
