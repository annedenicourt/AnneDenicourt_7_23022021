import '../styles/Profil.css'
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import avatar from '../assets/avatar.jpg'

function Profil() {
        return  (
        <div className="bg-profil"> 
        <Banner />
        <div className="card col-5 mx-auto" >
                <div className='avatar mx-auto pt-4'><img src={avatar} className="rounded-circle" alt="avatar"/></div>
                <button className="btn btn-secondary mt-5">Ajouter une photo de profil</button>
                <input type="file" accept=".png, .jpg, .jpeg"/>
                <div className="card-body">
                        <h5 className="card-title">Informations</h5>
                        <div className="card-text border-bottom mb-2">Nom/Pseudo</div>
                        <div className="card-text text-muted mb-4 d-flex justify-content-between align-items-center">Mon superpseudo<button className='btn btn-light btn-sm'><i className="bi bi-pencil me-1"></i>Modifier</button></div>
                        <div className="card-text border-bottom mb-2">Email</div>
                        <div className="card-text text-muted mb-4 d-flex justify-content-between align-items-center">adresse@gmail.com<button className='btn btn-light btn-sm'><i className="bi bi-pencil me-1"></i>Modifier</button></div>
                        <div className="card-text border-bottom mb-2">Poste</div>
                        <div className="card-text text-muted mb-4 d-flex justify-content-between align-items-center">Poste occupé<button className='btn btn-light btn-sm'><i className="bi bi-pencil me-1"></i>Modifier</button></div>
                        <div className="card-text border-bottom mb-2">Service</div>
                        <div className="card-text text-muted mb-4 d-flex justify-content-between align-items-center">Service travaillé<button className='btn btn-light btn-sm'><i className="bi bi-pencil me-1"></i>Modifier</button></div>
                        <div className="card-text border-bottom mb-2">Mon compte</div>
                        <div className="card-text text-muted mb-4"><i className="bi bi-x-circle me-2"></i>Supprimer mon compte</div>
                </div>
        </div>
        <div className="text-center mt-5 mb-5"><button className="btn btn-light"><Link className="text-dark" to="/forum">Accès forum</Link></button></div>
        <Footer />
        </div>)
}
  
export default Profil
