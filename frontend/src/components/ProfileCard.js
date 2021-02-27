import avatar from '../assets/avatar2.png'
import '../styles/ProfileCard.css'

function ProfileCard() {

    return (
        <div className="ms-2 ">
            <div className="col bg-dark p-3 rounded mb-4">
                <div className="text-center text-white">
                    <div className='avatar2 rounded-circle mx-auto p-1 bg-light'><img src={avatar} alt="avatar"/></div>
                    <h6 className="mt-4">John Doe</h6>
                    <div className="mt-4">Voir mon profil</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard