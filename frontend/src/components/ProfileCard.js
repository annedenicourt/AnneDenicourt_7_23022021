import avatar from '../assets/avatar2.png'
import '../styles/ProfileCard.css'
import { Link } from 'react-router-dom';


function ProfileCard({name, image, job}) {

    return (
        <div className="ms-2 ">
            <div className="col bg-dark p-3 rounded mb-4">
                <div className="text-center text-white">
                    <div className='avatar2 rounded-circle mx-auto p-1 bg-light'>
                        { image === null ?
                        <img src={avatar} alt="avatar"/> 
                        : <img src={image} alt="avatar"/>
                	    }
                    </div>
                    <h4 className="mt-4">Bienvenue</h4>
                    <h6 className="mt-4">{name}</h6>
                    <div className="fst-italic">{job}</div>
                    <Link className="link_profil text-white" to="/profil"><div className="mt-4">Voir mon profil</div></Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard